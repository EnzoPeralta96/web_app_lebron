import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "../context/CartContext.jsx";

/* Tus componentes modulares */
import MetodoDePago from "../../componentes/facturacion/MetodoDePago.jsx";
import FormularioTarjeta from "../../componentes/facturacion/FormularioTarjeta.jsx";
import DatosPersonales from "../../componentes/facturacion/DatosPersonales.jsx";
import Cuotas from "../../componentes/facturacion/Cuotas.jsx";
import EnvioRetiro from "../../componentes/facturacion/EnvioRetiro.jsx";
import Resumen from "../../componentes/facturacion/Resumen.jsx";

/* Botón */
import Boton from "../../componentes/atomicos/boton.jsx";

/* CSS */
import "../../assets/css/pages/facturacion.css";

/* MÉTODOS DE PAGO */
const paymentMethods = [
  { id: "efectivo", label: "Efectivo" },
  { id: "transferencia", label: "Transferencia bancaria" },
  { id: "tarjetaDebito", label: "Tarjeta de débito" },
  { id: "tarjetaCredito", label: "Tarjeta de crédito" },
];

/* ZONAS DE ENVÍO */
const shippingZones = [
  {
    id: "cercana",
    label: "Zona céntrica",
    description: "Hasta 5 km del local, sin costo adicional.",
    cost: 0,
  },
  {
    id: "periferica",
    label: "Zona periurbana",
    description: "Entre 5 y 15 km, costo fijo moderado.",
    cost: 450,
  },
  {
    id: "remota",
    label: "Zona remota",
    description: "Más de 15 km, soporta el viaje largo.",
    cost: 900,
  },
];

const defaultShippingOption = "retiro";
const defaultDeliveryZone = "cercana";

/* SANITIZACIÓN Y VALIDACIONES (TODAS LAS ORIGINALES) */
const sanitizeText = (value) =>
  (value || "")
    .replace(/[<>]/g, "")
    .replace(/script/gi, "")
    .trim()
    .slice(0, 60);

const sanitizeDigits = (value) => (value || "").replace(/\D/g, "");
const lettersAndSpaces = /[^\p{L}\s]/gu;

const CARD_NUMBER_AUTO_FOCUS_DIGITS = 16;
const EXPIRY_AUTO_FOCUS_DIGITS = 4;

const sanitizeCardholder = (value) =>
  (value || "")
    .toUpperCase()
    .replace(lettersAndSpaces, "")
    .replace(/\s{2,}/g, " ")
    .replace(/^\s+/, "")
    .slice(0, 40);

const sanitizeContactName = (value) =>
  (value || "")
    .replace(lettersAndSpaces, "")
    .replace(/\s{2,}/g, " ")
    .replace(/^\s+/, "")
    .slice(0, 60);

const sanitizeAddress = (value) =>
  (value || "")
    .replace(/[^A-Za-z0-9\s]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim()
    .slice(0, 100);

const sanitizeContactField = (field, value) => {
  if (field === "nombre") return sanitizeContactName(value);
  if (field === "telefono") return sanitizeDigits(value).slice(0, 15);
  if (field === "direccion") return sanitizeAddress(value);
  return sanitizeText(value);
};

const sanitizeExpiryDigits = (value) => sanitizeDigits(value).slice(0, 4);

const luhnCheck = (digits) => {
  const reversed = (digits || "").split("").reverse();
  const sum = reversed.reduce((acc, curr, index) => {
    const num = Number(curr) || 0;
    const shouldDouble = index % 2 === 1;
    const doubled = shouldDouble ? num * 2 : num;
    return acc + (doubled > 9 ? doubled - 9 : doubled);
  }, 0);
  return sum % 10 === 0;
};

const validateCardField = (field, value) => {
  if (field === "titular") {
    const normalized = (value || "").trim();
    if (!normalized) return "Completá el titular.";
    if (normalized.length < 5) return "Al menos 5 caracteres.";
    if (normalized.length > 40) return "Máximo 40 caracteres.";
    if (!/^[A-ZÁÉÍÓÚÜÑ\s]+$/.test(normalized))
      return "Solo letras y espacios.";
    return "";
  }

  if (field === "numero") {
    if (!value) return "Completá el número de tarjeta.";
    if (value.length < 13) return "Al menos 13 dígitos.";
    if (value.length > 19) return "Máximo 19 dígitos.";
    if (!luhnCheck(value)) return "Número inválido.";
    return "";
  }

  if (field === "vencimiento") {
    if (!value) return "Completá el vencimiento.";
    if (value.length !== 4) return "Usá el formato MM/AA.";

    const month = Number(value.slice(0, 2));
    const year = Number(value.slice(2, 4));

    if (isNaN(month) || month < 1 || month > 12)
      return "Mes inválido.";

    const current = new Date();
    const normalizedYear = 2000 + (year || 0);
    const cardDate = new Date(normalizedYear, month - 1, 1);
    const cutoff = new Date(
      current.getFullYear(),
      current.getMonth(),
      1
    );

    if (cardDate < cutoff) return "La tarjeta está vencida.";
    return "";
  }

  if (field === "cvc") {
    if (!value) return "Ingresá el CVV.";
    if (value.length < 3) return "Al menos 3 dígitos.";
    if (value.length > 4) return "Máximo 4 dígitos.";
    return "";
  }

  return "";
};

const validateContactField = (field, value) => {
  if (field === "nombre") {
    const normalized = (value || "").trim();
    if (!normalized) return "Completá tu nombre.";
    if (normalized.length < 3) return "Mínimo 3 caracteres.";
    if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/.test(normalized))
      return "Solo letras y espacios.";
    return "";
  }

  if (field === "telefono") {
    if (!value) return "Ingresá un teléfono.";
    if (value.length < 8) return "Al menos 8 dígitos.";
    if (value.length > 15) return "Hasta 15 dígitos.";
    return "";
  }

  if (field === "direccion") {
    if (!value) return "Ingresá la dirección.";
    if (value.length < 5) return "Al menos 5 caracteres.";
    if (!/^[A-Za-z0-9\s]+$/.test(value))
      return "Solo letras, números y espacios.";
    return "";
  }

  return "";
};

/* ESTADOS INICIALES */
const initialCardState = {
  titular: "",
  numero: "",
  vencimiento: "",
  cvc: "",
};

const initialCardErrors = {
  titular: "",
  numero: "",
  vencimiento: "",
  cvc: "",
};

const initialContactErrors = {
  nombre: "",
  telefono: "",
  direccion: "",
};

/* ------------------------------------------------- */
/*                 COMPONENTE PRINCIPAL             */
/* ------------------------------------------------- */

export default function Facturacion() {
  const {
    items,
    total,
    couponDiscount,
    totalWithDiscount,
    couponCode,
  } = useCart();

  /* ESTADOS */
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [installments, setInstallments] = useState("1");
  const [shippingOption, setShippingOption] = useState(defaultShippingOption);
  const [deliveryZone, setDeliveryZone] = useState(defaultDeliveryZone);

  const [contact, setContact] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
  });

  const [card, setCard] = useState(initialCardState);
  const [contactErrors, setContactErrors] = useState(initialContactErrors);
  const [cardErrors, setCardErrors] = useState(initialCardErrors);

  const refNumero = useRef(null);
  const refVencimiento = useRef(null);
  const refCvc = useRef(null);

  const [status, setStatus] = useState({ type: "", message: "" });

  /* LÓGICAS DE VISIBILIDAD */
  const cardRequired =
    paymentMethod === "tarjetaCredito" ||
    paymentMethod === "tarjetaDebito";

  const hasContactErrors = Object.values(contactErrors).some(Boolean);
  const hasCardErrors = Object.values(cardErrors).some(Boolean);

  const contactValuesComplete =
    contact.nombre.length >= 3 &&
    contact.telefono.length >= 8 &&
    (shippingOption === "envio"
      ? contact.direccion.length >= 5
      : true);

  const cardValuesComplete = cardRequired
    ? card.titular.length >= 5 &&
      card.numero.length >= 13 &&
      card.vencimiento.length === 4 &&
      card.cvc.length >= 3
    : true;

  const cardSectionComplete =
    cardRequired && cardValuesComplete && !hasCardErrors;

  const personalSectionComplete =
    contactValuesComplete && !hasContactErrors;

  const readyForStage3 =
    contactValuesComplete &&
    !hasContactErrors &&
    (!cardRequired ||
      (cardValuesComplete && !hasCardErrors));

  /* DEFINICIÓN DE ETAPAS */
  const stage = paymentMethod
    ? readyForStage3
      ? 3
      : 2
    : 1;

  const personalStageVisible = cardRequired
    ? cardSectionComplete
    : stage >= 2;

  const cuotasStageVisible =
    paymentMethod === "tarjetaCredito" &&
    personalStageVisible &&
    personalSectionComplete;

  /* CÁLCULOS */
  const subtotal = useMemo(
    () => Math.max(0, totalWithDiscount || 0),
    [totalWithDiscount]
  );

  const paymentDiscount =
    paymentMethod === "transferencia"
      ? subtotal * 0.05
      : 0;

  const zoneData = useMemo(
    () =>
      shippingZones.find((z) => z.id === deliveryZone) ??
      shippingZones[0],
    [deliveryZone]
  );

  const shippingCost =
    shippingOption === "envio" ? zoneData.cost : 0;

  const amountBeforeInterest = Math.max(
    0,
    subtotal + shippingCost - paymentDiscount
  );

  const numericInstallments = Math.min(
    24,
    Math.max(1, Number(installments) || 1)
  );

  const interestRatePerInstallment =
    paymentMethod === "tarjetaCredito" ? 0.018 : 0;

  const interestAmount =
    paymentMethod === "tarjetaCredito" &&
    numericInstallments > 1
      ? amountBeforeInterest *
        interestRatePerInstallment *
        numericInstallments
      : 0;

  const finalTotal = amountBeforeInterest + interestAmount;

  const activeInstallments =
    paymentMethod === "tarjetaCredito"
      ? numericInstallments
      : 1;

  const installmentValue =
    activeInstallments > 1
      ? finalTotal / activeInstallments
      : finalTotal;

  const disableSubmit = stage < 3 || !items.length;

  /* ------------------------------------------------- */
  /*               HANDLERS / EVENTOS                   */
  /* ------------------------------------------------- */

  const handlePaymentMethodSelect = (methodId) => {
    if (methodId === paymentMethod) return;

    setPaymentMethod(methodId);
    setCard(initialCardState);
    setCardErrors(initialCardErrors);

    if (methodId !== "tarjetaCredito") {
      setInstallments("1");
    }

    setStatus({ type: "", message: "" });
  };

  const handleContactChange = (field, rawValue) => {
    const sanitized = sanitizeContactField(field, rawValue);
    setContact((prev) => ({ ...prev, [field]: sanitized }));

    setContactErrors((prev) => ({
      ...prev,
      [field]: validateContactField(field, sanitized),
    }));
  };

  const handleCardChange = (field, rawValue) => {
    const sanitized =
      field === "titular"
        ? sanitizeCardholder(rawValue)
        : field === "numero"
        ? sanitizeDigits(rawValue).slice(0, 19)
        : field === "vencimiento"
        ? sanitizeExpiryDigits(rawValue)
        : sanitizeDigits(rawValue).slice(0, 4);

    const previousValue = card[field] || "";

    setCard((prev) => ({ ...prev, [field]: sanitized }));

    setCardErrors((prev) => ({
      ...prev,
      [field]: validateCardField(field, sanitized),
    }));

    if (
      field === "numero" &&
      previousValue.length < CARD_NUMBER_AUTO_FOCUS_DIGITS &&
      sanitized.length >= CARD_NUMBER_AUTO_FOCUS_DIGITS
    ) {
      if (refVencimiento.current) {
        setTimeout(() => refVencimiento.current?.focus(), 0);
      }
    }

    if (
      field === "vencimiento" &&
      previousValue.length < EXPIRY_AUTO_FOCUS_DIGITS &&
      sanitized.length >= EXPIRY_AUTO_FOCUS_DIGITS
    ) {
      if (refCvc.current) {
        setTimeout(() => refCvc.current?.focus(), 0);
      }
    }
  };

  const handleInstallmentsInput = (rawValue) => {
    const digits = (rawValue || "").replace(/\D/g, "");

    if (!digits) {
      setInstallments("");
      return;
    }

    const normalized = Math.min(
      24,
      Math.max(1, Number(digits))
    );

    setInstallments(String(normalized));
  };

  /* Cuando cambie el método, ajustar cuotas */
  useEffect(() => {
    if (
      paymentMethod !== "tarjetaCredito" &&
      installments !== "1"
    ) {
      setInstallments("1");
    }
  }, [paymentMethod, installments]);

  /* Reset del envío si no se completan etapas */
  useEffect(() => {
    if (stage < 3) {
      setShippingOption(defaultShippingOption);
      setDeliveryZone(defaultDeliveryZone);
    }
  }, [stage]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!items.length) {
      setStatus({
        type: "error",
        message:
          "Agregá productos al carrito antes de completar el pago.",
      });
      return;
    }

    if (stage < 3 || hasContactErrors || hasCardErrors) {
      setStatus({
        type: "error",
        message:
          "Revisá los campos marcados antes de continuar.",
      });
      return;
    }

    setStatus({
      type: "success",
      message:
        "Gracias por tu compra. Validamos los datos y en breve confirmamos el retiro o envío.",
    });
  };

  /* ------------------------------------------------- */
  /*                       RENDER                       */
  /* ------------------------------------------------- */

  return (
    <main className="facturacion-page section">

      <header className="facturacion-hero">
        <p className="eyebrow">Finalizá tu pedido</p>
        <h1>Facturación y pago</h1>
      </header>

      <section className="facturacion-grid">

        {/* FORMULARIO IZQUIERDO */}
        <section
          className="facturacion-form"
          aria-label="Formulario de facturación"
        >
          <form onSubmit={handleSubmit} autoComplete="off">

            {/* ----------- 1) MÉTODO DE PAGO ----------- */}
            <article className="form-stage is-visible">
              <MetodoDePago
                metodoElegido={paymentMethod}
                onSelect={handlePaymentMethodSelect}
              />
            </article>

            {/* ----------- TRANSFERENCIA ----------- */}
            <article
              className={`form-stage transfer-stage ${
                paymentMethod === "transferencia"
                  ? "is-visible"
                  : ""
              }`}
            >
              <section className="transfer-card">
                <p className="transfer-card__title">
                  Datos para transferir
                </p>

                <dl>
                  <section>
                    <dt>Alias</dt>
                    <dd>lebron-suplementos</dd>
                  </section>

                  <section>
                    <dt>CBU</dt>
                    <dd>0000003100070496189659</dd>
                  </section>

                  <section>
                    <dt>Titular</dt>
                    <dd>Lebron Suplementos SA</dd>
                  </section>

                  <section>
                    <dt>Banco</dt>
                    <dd>Mercado Pago</dd>
                  </section>
                </dl>

                <p className="transfer-card__note">
                  Copiá estos datos en tu homebanking o app
                  y confirmá el pago cuando lo completes.
                </p>
              </section>
            </article>

            {/* ----------- 2) DATOS DE TARJETA ----------- */}
            {cardRequired && (
              <article
                className={`form-stage ${
                  stage >= 2 ? "is-visible" : ""
                }`}
              >
                <FormularioTarjeta
                  tarjeta={card}
                  erroresTarjeta={cardErrors}
                  onChange={handleCardChange}
                  refNumero={refNumero}
                  refVencimiento={refVencimiento}
                  refCvc={refCvc}
                />
              </article>
            )}

            {/* ----------- 3) DATOS PERSONALES ----------- */}
            {personalStageVisible && (
              <article
                className={`form-stage ${
                  personalStageVisible ? "is-visible" : ""
                }`}
              >
                <DatosPersonales
                  datos={contact}
                  errores={contactErrors}
                  onChange={handleContactChange}
                  requiereDireccion={
                    shippingOption === "envio"
                  }
                />
              </article>
            )}

            {/* ----------- 4) CUOTAS (si tarjeta crédito) ----------- */}
            {cuotasStageVisible && (
              <article
                className={`form-stage ${
                  cuotasStageVisible ? "is-visible" : ""
                }`}
              >
                <Cuotas
                  cuotas={installments}
                  onChangeCuotas={handleInstallmentsInput}
                  interesPorCuota={interestRatePerInstallment}
                  montoPorCuota={installmentValue}
                  hayInteres={numericInstallments > 1}
                />
              </article>
            )}

            {/* ----------- PLACEHOLDER SI FALTA ETAPA ----------- */}
            {stage < 2 && (
              <p className="stage-placeholder">
                Seleccioná un medio de pago para continuar.
              </p>
            )}

            {/* ----------- 5) RETIRO O ENVÍO ----------- */}
            <article
              className={`form-stage ${
                stage >= 3 ? "is-visible" : "is-disabled"
              }`}
            >
              <EnvioRetiro
                opcionEnvio={shippingOption}
                onCambiarOpcion={setShippingOption}
                zonas={shippingZones}
                zonaSeleccionada={deliveryZone}
                onSeleccionZona={setDeliveryZone}
                etapaActiva={stage >= 3}
              />
            </article>

            {/* ----------- BOTÓN CONFIRMAR ----------- */}
            <section className="facturacion-actions">
              <Boton
                type="submit"
                variant="primary"
                disabled={disableSubmit}
              >
                Confirmar pago
              </Boton>

              {status.message && (
                <p
                  className={`facturacion-status ${
                    status.type
                  }`}
                >
                  {status.message}
                </p>
              )}
            </section>

          </form>
        </section>

        {/* ----------- COLUMNA DERECHA: RESUMEN ----------- */}
        <Resumen
          items={items}
          subtotal={subtotal}
          costoEnvio={shippingCost}
          descuento={paymentDiscount}
          cartDiscount={couponDiscount}
          couponCode={couponCode}
          interes={interestAmount}
          totalFinal={finalTotal}
          cuotasActivas={activeInstallments}
          montoPorCuota={installmentValue}
        />

      </section>
    </main>
  );
}











