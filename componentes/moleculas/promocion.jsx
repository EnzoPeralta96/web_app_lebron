import "../../assets/css/atomicos/boton.css";
import "../../assets/css/moleculas/promocion.css";
import promoNavidad from "../../assets/img/promoNavidad.jpg";

function Promocion() {
  return (
    <section className="promo-banner" aria-label="Promocion navidena">
      <div className="promo-body container">
        <header>
          <p className="promo-eyebrow">Edicion limitada</p>
          <h2 className="promo-title">Feliz Navidad</h2>
          <p className="promo-text">
            Buenos deseos y energia LeBron para cerrar el ano. Aprovecha
            promociones con packs especiales y envios express para que todo
            llegue a tiempo.
          </p>

          <article className="botones">
            <p className="precio-promocion precio-promocion1">
              $65.000
            </p>
            <a className="lb-btn lb-primary lb-57 promo-cta" href="#categorias">
              <span>Comprar ahora</span>
              <span>Feliz Navidad</span>
            </a>
          </article>
        </header>
      </div>
      <figure className="promo-media">
        <img src={promoNavidad} alt="Promo de Navidad" loading="lazy" />

      </figure>
    </section>
  );
}

export default Promocion;
