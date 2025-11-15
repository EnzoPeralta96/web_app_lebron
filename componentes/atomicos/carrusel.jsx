import React, { useState, useEffect } from "react";
import "../../assets/css/atomicos/carrusel.css";

export default function Carrusel({
  items = [],
  autoPlay = true,
  intervalo = 7000,
  className = "",
}) {
  const [index, setIndex] = useState(0);

  const handleNext = () => setIndex((i) => (i + 1) % items.length);
  const handlePrev = () => setIndex((i) => (i - 1 + items.length) % items.length);

  const current = items[index];
  const texto = current?.texto ?? current?.descripcion ?? current?.subtitulo;

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => handleNext(), intervalo);
    return () => clearInterval(timer);
  }, [index, autoPlay, intervalo]);

  if (!items || items.length === 0) return null;

  return (
    <section
      className={`lb-carrusel ${className}`}
      style={{ backgroundImage: `url(${current.img})` }}
      aria-label="Carrusel Lebron"
    >
      <span className="lb-overlay" aria-hidden={true}></span>

      <div className="contenedor-carrusel">
        <article className="lb-row">
          <figure className="lb-main-wrap">
            <img className="lb-main" src={current.img} alt={current.titulo} />
            <nav className="lb-controls" aria-label="Controles del carrusel">
              <button className="lb-prev" onClick={handlePrev} aria-label="Anterior">
                «
              </button>
              <button className="lb-next" onClick={handleNext} aria-label="Siguiente">
                »
              </button>
            </nav>
          </figure>

          <aside className="lb-side" aria-label="Descripción del slide">
            <h3 className="lb-side-title">{current.titulo}</h3>
            {texto && <p className="lb-side-text">{texto}</p>}
          </aside>
        </article>
      </div>

      <footer className="lb-thumbs" aria-label="Miniaturas del carrusel">
        {items.map((s, i) => (
          <figure key={i}>
            <img
              src={s.img}
              alt={`Vista previa de ${s.titulo}`}
              className={i === index ? "active" : ""}
              onClick={() => setIndex(i)}
            />
            <figcaption>{s.titulo}</figcaption>
          </figure>
        ))}
      </footer>
    </section>
  );
}
