import React from "react";
import "../../assets/css/facturacion/EnvioRetiro.css";

/**
 * 5. Selección de retiro o envío
 * Incluye radios para elegir el método y las zonas disponibles si elige envío.
 * Totalmente semántico y compatible con tus clases CSS.
 */

export default function EnvioRetiro({
  opcionEnvio,       // "retiro" o "envio"
  onCambiarOpcion,   // función para actualizar opción
  zonas,             // array de zonas [{id, label, description, cost}]
  zonaSeleccionada,  // id de la zona elegida
  onSeleccionZona,   // función para seleccionar zona
  etapaActiva        // boolean: true cuando la sección está habilitada
}) {
  return (
    <fieldset
      className={`facturacion-fieldset form-stage ${
        etapaActiva ? "is-visible" : "is-disabled"
      }`}
    >
      <legend>Retiro o envío</legend>

      {/* OPCIONES PRINCIPALES */}
      <section className="shipping-options">
        <label>
          <input
            type="radio"
            name="shipping"
            value="retiro"
            checked={opcionEnvio === "retiro"}
            onChange={() => onCambiarOpcion("retiro")}
          />
          Retiro por el local (sin costo)
        </label>

        <label>
          <input
            type="radio"
            name="shipping"
            value="envio"
            checked={opcionEnvio === "envio"}
            onChange={() => onCambiarOpcion("envio")}
          />
          Envío a domicilio
        </label>
      </section>

      {/* SELECCIÓN DE ZONA – SOLO SI ELIGE ENVÍO */}
      {opcionEnvio === "envio" && (
        <section
          className={`zone-selector ${
            etapaActiva ? "is-visible" : ""
          }`}
          aria-label="Zonas disponibles para envío"
        >
          {zonas.map((zona) => (
            <button
              type="button"
              key={zona.id}
              className={`zone-chip ${
                zonaSeleccionada === zona.id ? "is-active" : ""
              }`}
              onClick={() => onSeleccionZona(zona.id)}
            >
              <strong>{zona.label}</strong>
              <small>{zona.description}</small>
              <span className="zone-cost">
                ${zona.cost.toLocaleString("es-AR")}
              </span>
            </button>
          ))}
        </section>
      )}

      {/* MENSAJE SI LA SECCIÓN ESTÁ DESHABILITADA */}
      {!etapaActiva && (
        <p className="stage-overlay">
          Completá los datos anteriores para activar el retiro o envío.
        </p>
      )}
    </fieldset>
  );
}
