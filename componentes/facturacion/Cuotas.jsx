import React from "react";
import "../../assets/css/facturacion/cuotas.css";

/**
 * 4. Selección de cuotas
 * Componente semántico: solo fieldset, section, label, p, article, etc.
 */

export default function Cuotas({
  cuotas,
  onChangeCuotas,
  interesPorCuota,
  montoPorCuota,
  hayInteres,
}) {
  return (
    <fieldset className="facturacion-fieldset">
      <legend>Cuotas y montos</legend>

      {/* Contenedor en 2 columnas, pero con semántica */}
      <section className="cuotas-grid">

        {/* Selección de número de cuotas */}
        <label>
          Cantidad de cuotas
          <input
            type="number"
            min={1}
            max={24}
            value={cuotas}
            onChange={(e) => onChangeCuotas(e.target.value)}
            className="cuotas-input"
            required
          />
        </label>

        {/* Información del cálculo */}
        <article className="cuotas-info">
          {hayInteres ? (
            <>
              <p>
                Interés aproximado:{" "}
                {(interesPorCuota * 100).toFixed(2)}% por cuota.
              </p>

              <p>
                Cada cuota: $
                {montoPorCuota.toLocaleString("es-AR", {
                  maximumFractionDigits: 2,
                })}
              </p>
            </>
          ) : (
            <p>Sin interés adicional para pago en una cuota.</p>
          )}
        </article>

      </section>
    </fieldset>
  );
}
