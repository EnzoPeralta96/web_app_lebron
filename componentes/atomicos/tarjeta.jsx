import React, { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/atomicos/tarjeta.css";

export default function Tarjeta({
  titulo = "Nombre del producto",
  subtitulo = "Categoria",
  descripcion = "Descripcion breve del producto o detalle informativo.",
  imagen = "https://unsplash.it/800/800",
  href = "#",
  onClick,
}) {
  const [flipped, setFlipped] = useState(false);

  const toggle = useCallback((e) => {
    if (e) e.preventDefault();
    setFlipped((v) => !v);
  }, []);

  const handleKey = useCallback((e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setFlipped((v) => !v);
    }
  }, []);

  const isRouterLink = useMemo(() => typeof href === "string" && href.startsWith("/"), [href]);
  const interactiveClick = onClick ?? (isRouterLink ? undefined : toggle);
  const interactiveKey = isRouterLink ? undefined : handleKey;

  const Anchor = isRouterLink ? Link : "a";

  return (
    <article
      className={`lb-card ${flipped ? "is-flipped" : ""}`}
      aria-label={`${titulo} ${subtitulo}`}
    >
      <Anchor
        className="lb-card-link"
        {...(isRouterLink ? { to: href } : { href })}
        onClick={interactiveClick}
        onKeyDown={interactiveKey}
      >
        <section className="lb-card-rotator">
          {/* Cara frontal */}
          <figure className="lb-card-face lb-card-front" style={{ "--bg-url": `url("${imagen}")` }}>
            <span className="lb-card-media" aria-hidden={true} />
            <figcaption className="lb-card-caption">
              <p className="lb-card-title">{titulo}</p>
              <span className="lb-card-sub">{subtitulo}</span>
            </figcaption>
          </figure>

          {/* Cara trasera */}
          <aside className="lb-card-face lb-card-back">
            <section className="lb-card-caption">
              <p className="lb-card-title">{titulo}</p>
              <p className="lb-card-desc">{descripcion}</p>
            </section>
          </aside>
        </section>
      </Anchor>
    </article>
  );
}





