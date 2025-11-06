import { useState, useCallback, useEffect, useRef } from "react";
import "../../assets/css/atomicos/tarjetaPFrecuentes.css";

// Tarjeta para Preguntas Frecuentes
// Frente: pregunta | Dorso: respuesta
// Efecto: gira con hover y tambien por click/teclado (accesible)
export default function TarjetaPFrecuentes({
  pregunta,
  respuesta,
  className = "",
  tabIndex = 0,
  ctaHref,
  ctaLabel,
}) {
  const [flipped, setFlipped] = useState(false);
  const toggle = useCallback(() => setFlipped((v) => !v), []);
  const rootRef = useRef(null);

  // Cerrar al hacer clic fuera o al hacer scroll
  useEffect(() => {
    const onPointerDown = (e) => {
      const el = rootRef.current;
      if (!el) return;
      if (!el.contains(e.target)) setFlipped(false);
    };
    const onScroll = () => setFlipped(false);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  const rootClass = ["tarjeta-pf", flipped && "is-flipped", className]
    .filter(Boolean)
    .join(" ");

  return (
    <section ref={rootRef} className={rootClass}>
      <section className="tarjeta-pf-inner">
        <article
          className="tarjeta-pf-face tarjeta-pf-front"
          role="button"
          tabIndex={tabIndex}
          aria-label="Ver respuesta"
          onClick={toggle}
          onKeyDown={onKeyDown}
        >
          <h4 className="tarjeta-pf-q">{pregunta}</h4>
          <span className="tarjeta-pf-hint" aria-hidden={true}>
            Pasa el mouse o presiona Enter
          </span>
        </article>

        <article
          className="tarjeta-pf-face tarjeta-pf-back"
          role="button"
          tabIndex={-1}
          aria-label="Ocultar respuesta"
          onClick={toggle}
        >
          <p className="tarjeta-pf-a">{respuesta}</p>
          {ctaHref && ctaLabel && (
            <a
              className="tarjeta-pf-cta"
              href={ctaHref}
              onClick={(e) => e.stopPropagation()}
            >
              {ctaLabel}
            </a>
          )}
        </article>
      </section>
    </section>
  );
}
