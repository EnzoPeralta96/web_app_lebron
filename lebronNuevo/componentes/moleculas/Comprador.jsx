import React from "react";
import Buscador from "../atomicos/buscador.jsx";
import "../../assets/css/moleculas/comprador.css";

export default function Comprador({
  titulo = "\u00BFQu\u00E9 buscas?",
  placeholder = "Buscar productos...",
  ariaLabel = "Buscar en Lebron",
  className = "",
}) {
  return (
    <section id="comprador" className={["lb-comprador", className].filter(Boolean).join(" ")}>
      <div className="lb-comprador-inner">
        <h2 className="lb-comprador-title">{titulo}</h2>
        <Buscador placeholder={placeholder} ariaLabel={ariaLabel} />
      </div>
    </section>
  );
}
