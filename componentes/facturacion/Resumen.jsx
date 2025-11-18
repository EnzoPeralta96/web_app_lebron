import React from "react";
import "../../assets/css/facturacion/Resumen.css";
import RedesSocialesBoton from "../atomicos/redesSocialesBoton.jsx";

/**
 * 6. Resumen de facturación (columna derecha)
 * Muestra subtotal, envío, descuentos, intereses, total final y cuotas.
 * Componente semántico y totalmente compatible con tu CSS original.
 */

export default function Resumen({
  items,               // lista de productos
  subtotal,
  costoEnvio,
  descuento,
  cartDiscount = 0,
  couponCode = "",
  interes,
  totalFinal,
  cuotasActivas,       // número de cuotas
  montoPorCuota
}) {
  return (
    <aside className="facturacion-summary" aria-label="Resumen de facturación">

      {/* TARJETA DE AYUDA */}
      <article className="summary-card summary-note">
        <h3>¿Necesitás ayuda?</h3>

        <p className="summary-note-link">
          Escríbenos por WhatsApp a la Casa Central y te ayudamos con tu pedido.
        </p>
        <div className="summary-note-social">
          <RedesSocialesBoton
            include={["whatsapp"]}
            whatsappUrl="https://wa.me/543816337883"
          />
        </div>
      </article>

      {/* TARJETA PRINCIPAL DEL RESUMEN */}
      <article className="summary-card">
        <h2>Resumen</h2>

        {items.length === 0 ? (
          <p className="summary-empty">No hay productos en el carrito.</p>
        ) : (
          <dl>

            {/* SUBTOTAL */}
            <section className="summary-row">
              <dt>Subtotal</dt>
              <dd>$ {subtotal.toLocaleString("es-AR")}</dd>
            </section>

            {cartDiscount > 0 && (
              <p className="summary-coupon-note">
                Cupón {couponCode?.trim().toUpperCase() || "aplicado"}:&nbsp;
                - $ {cartDiscount.toLocaleString("es-AR", { maximumFractionDigits: 2 })}
              </p>
            )}

            {/* ENVÍO */}
            <section className="summary-row">
              <dt>Envío</dt>
              <dd>$ {costoEnvio.toLocaleString("es-AR")}</dd>
            </section>

            {/* DESCUENTO */}
            {descuento > 0 && (
              <section className="summary-row summary-discount">
                <dt>Descuento por transferencia</dt>
                <dd>- $ {descuento.toLocaleString("es-AR", { maximumFractionDigits: 2 })}</dd>
              </section>
            )}

            {/* INTERÉS */}
            {interes > 0 && (
              <section className="summary-row summary-interest">
                <dt>Intereses</dt>
                <dd>$ {interes.toLocaleString("es-AR", { maximumFractionDigits: 2 })}</dd>
              </section>
            )}

            {/* TOTAL FINAL */}
            <section className="summary-row summary-total">
              <dt>Total a pagar</dt>
              <dd>$ {totalFinal.toLocaleString("es-AR", { maximumFractionDigits: 2 })}</dd>
            </section>

            {/* CUOTAS (si aplica) */}
            {cuotasActivas > 1 && (
              <section className="summary-row summary-installment">
                <dt>Cuotas</dt>
                <dd>
                  {cuotasActivas} x $ {montoPorCuota.toLocaleString("es-AR", { maximumFractionDigits: 2 })}
                </dd>
              </section>
            )}

          </dl>
        )}
      </article>



    </aside>
  );
}
