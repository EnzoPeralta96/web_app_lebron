import React from "react";
import "../../assets/css/facturacion/DatosPersonales.css";

/**
 * 3. Datos personales del comprador
 * Esta sección aparece cuando ya se completó el medio de pago
 * (y en el caso de tarjetas, después del formulario de tarjeta).
 */

export default function DatosPersonales({
  datos,
  errores,
  onChange,
  requiereDireccion, // true si el usuario eligió "envío"
}) {
  return (
    <fieldset className="facturacion-fieldset">
      <legend>Datos personales</legend>

      <div className="form-grid">

        {/* NOMBRE COMPLETO */}
        <label>
          Nombre completo
          <input
            type="text"
            placeholder="Nombre y apellido"
            value={datos.nombre}
            onChange={(e) => onChange("nombre", e.target.value)}
            maxLength={60}
            minLength={3}
            required
          />
          {errores.nombre && (
            <small className="field-error">{errores.nombre}</small>
          )}
        </label>

        {/* TELÉFONO */}
        <label>
          Teléfono
          <input
            type="tel"
            placeholder="11 6000 0000"
            value={datos.telefono}
            onChange={(e) => onChange("telefono", e.target.value)}
            maxLength={15}
            minLength={8}
            required
          />
          {errores.telefono && (
            <small className="field-error">{errores.telefono}</small>
          )}
        </label>

        {/* DIRECCIÓN */}
        <label>
          Dirección
          <input
            type="text"
            placeholder="Calle 1234, Ciudad"
            value={datos.direccion}
            onChange={(e) => onChange("direccion", e.target.value)}
            maxLength={100}
            minLength={5}
            required={requiereDireccion}
          />
          {errores.direccion && (
            <small className="field-error">{errores.direccion}</small>
          )}
        </label>

      </div>
    </fieldset>
  );
}
