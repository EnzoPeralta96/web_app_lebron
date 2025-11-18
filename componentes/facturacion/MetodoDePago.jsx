import React from "react";
import "../../assets/css/facturacion/MetodoDePago.css";

/**
 * Selección del medio de pago.
 * Esta es la PRIMERA sección del proceso de facturación.
 */
const metodosDePago = [
  { id: "efectivo", label: "Efectivo" },
  { id: "transferencia", label: "Transferencia bancaria" },
  { id: "tarjetaDebito", label: "Tarjeta de débito" },
  { id: "tarjetaCredito", label: "Tarjeta de crédito" },
];

export default function MetodoDePago({ metodoElegido, onSelect }) {
  return (
    <fieldset className="facturacion-fieldset">
      <legend>1. Medio de pago</legend>

      <div className="payment-methods">
        {metodosDePago.map((metodo) => (
          <button
            key={metodo.id}
            type="button"
            className={`payment-method ${
              metodoElegido === metodo.id ? "is-active" : ""
            }`}
            onClick={() => onSelect(metodo.id)}
            aria-pressed={metodoElegido === metodo.id}
          >
            <span>{metodo.label}</span>
          </button>
        ))}
      </div>
    </fieldset>
  );
}
