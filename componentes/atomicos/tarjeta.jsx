import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/atomicos/tarjeta.css";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= breakpoint;
  });

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isMobile;
}

export default function Tarjeta({
  titulo = "Nombre del producto",
  subtitulo = "Categoria",
  descripcion = "Descripcion breve del producto o detalle informativo.",
  imagen = "https://unsplash.it/800/800",
  href = "#",
  onClick,
}) {
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();
  const isRouterLink = useMemo(() => typeof href === "string" && href.startsWith("/"), [href]);
  const isMobile = useIsMobile(768);
  const cardId = useMemo(() => `${href}:${titulo}`, [href, titulo]);

  const outerClickHandler = useCallback((event) => {
    if (flipped && !event.defaultPrevented) {
      const target = event.target;
      if (target instanceof Element && !target.closest(".lb-card")) {
        setFlipped(false);
      }
    }
  }, [flipped]);

  useEffect(() => {
    if (!isMobile || !flipped) return undefined;
    window.addEventListener("click", outerClickHandler);
    return () => window.removeEventListener("click", outerClickHandler);
  }, [isMobile, flipped, outerClickHandler]);

  useEffect(() => {
    setFlipped(false);
  }, [href]);

  useEffect(() => {
    if (!isMobile) return undefined;
    const handleOtherFlip = (event) => {
      if (!event?.detail) return;
      if (event.detail !== cardId) {
        setFlipped(false);
      }
    };
    window.addEventListener("lb-card-flip", handleOtherFlip);
    return () => window.removeEventListener("lb-card-flip", handleOtherFlip);
  }, [cardId, isMobile]);

  const handleLinkClick = (event) => {
    if (!isMobile) return;
    event.preventDefault();
    if (!flipped) {
      setFlipped(true);
      window.dispatchEvent(new CustomEvent("lb-card-flip", { detail: cardId }));
      return;
    }

    if (onClick) {
      onClick(event);
      return;
    }

    const destination = isRouterLink ? href : undefined;
    if (destination && isRouterLink) {
      navigate(destination);
    } else {
      window.location.href = href;
    }
  };

  const handleLinkKey = (event) => {
    if (!isMobile) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleLinkClick(event);
    }
  };

  const toggle = useCallback((event) => {
    if (event) event.preventDefault();
    setFlipped((prev) => !prev);
  }, []);

  const handleKey = useCallback((event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle(event);
    }
  }, [toggle]);

  const Anchor = isRouterLink ? Link : "a";

  return (
    <article
      className={`lb-card ${flipped ? "is-flipped" : ""}`}
      aria-label={`${titulo} ${subtitulo}`}
    >
      <Anchor
        className="lb-card-link"
        {...(isRouterLink ? { to: href } : { href })}
        onClick={isMobile ? handleLinkClick : (onClick ?? (isRouterLink ? undefined : toggle))}
        onKeyDown={isMobile ? handleLinkKey : (isRouterLink ? undefined : handleKey)}
      >
        <section className="lb-card-rotator">
          <figure className="lb-card-face lb-card-front" style={{ "--bg-url": `url("${imagen}")` }}>
            <span className="lb-card-media" aria-hidden={true} />
            <figcaption className="lb-card-caption">
              <p className="lb-card-title">{titulo}</p>
              <span className="lb-card-sub">{subtitulo}</span>
            </figcaption>
          </figure>

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





