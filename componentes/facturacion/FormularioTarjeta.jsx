import React from "react";
import "../../assets/css/facturacion/FormularioTarjeta.css";
import CardBrand from "./CardBrand.jsx";

const formatCardNumberForDisplay = (digits = "") => {
  if (!digits) return "";
  return digits.replace(/(.{4})/g, "$1 ").trim();
};

const formatExpiryForDisplay = (digits = "") => {
  if (!digits) return "";
  const month = digits.slice(0, 2);
  const year = digits.slice(2, 4);
  return year ? `${month}/${year}` : month;
};

/**
 * 2. Formulario de Tarjeta
 * Campos: Titular, Número, Vencimiento, CVC
 * Totalmente semántico y preparado para auto-focus
 */

export default function FormularioTarjeta({
  tarjeta,
  erroresTarjeta,
  onChange,
  refNumero,
  refVencimiento,
  refCvc,
}) {
  const displayCardNumber = formatCardNumberForDisplay(tarjeta.numero);
  const displayExpiry = formatExpiryForDisplay(tarjeta.vencimiento);

  return (
    <fieldset className="facturacion-fieldset">
      <legend>2. Datos de la tarjeta</legend>

      <section className="form-grid">

        {/* TITULAR */}
        <label>
          Titular
          <input
            type="text"
            name="titular"
            inputMode="text"
            autoComplete="cc-name"
            maxLength={40}
            minLength={5}
            value={tarjeta.titular}
            onChange={(e) => onChange("titular", e.target.value)}
            placeholder="NOMBRE Y APELLIDO"
            required
          />
          {erroresTarjeta.titular && (
            <small className="field-error">{erroresTarjeta.titular}</small>
          )}
        </label>

        {/* NÚMERO */}
        <label>
          <div className="card-number-header">
            <span>Número de tarjeta</span>
            <CardBrand number={tarjeta.numero} />
          </div>
          <input
            type="text"
            name="numero"
            inputMode="numeric"
            autoComplete="cc-number"
            maxLength={23}
            ref={refNumero}
            value={displayCardNumber}
            onChange={(e) => onChange("numero", e.target.value)}
            placeholder="1234 5678 9012 3456"
            required
          />
          {erroresTarjeta.numero && (
            <small className="field-error">{erroresTarjeta.numero}</small>
          )}
        </label>

        {/* VENCIMIENTO */}
        <label>
          Vencimiento
          <input
            type="text"
            name="vencimiento"
            inputMode="numeric"
            autoComplete="off"
            maxLength={5}
            ref={refVencimiento}
            value={displayExpiry}
            onChange={(e) => onChange("vencimiento", e.target.value)}
            placeholder="MM/AA"
            required
          />
          {erroresTarjeta.vencimiento && (
            <small className="field-error">{erroresTarjeta.vencimiento}</small>
          )}
        </label>

        {/* CVC */}
        <label>
          Código de seguridad
          <input
            type="password"
            name="cvc"
            inputMode="numeric"
            autoComplete="off"
            maxLength={4}
            minLength={3}
            ref={refCvc}
            value={tarjeta.cvc}
            onChange={(e) => onChange("cvc", e.target.value)}
            placeholder="123"
            required
            onPaste={(e) => e.preventDefault()}
          />
          {erroresTarjeta.cvc && (
            <small className="field-error">{erroresTarjeta.cvc}</small>
          )}
        </label>

      </section>
    </fieldset>
  );
}
