import "../../assets/css/atomicos/boton.css";
import "../../assets/css/moleculas/promocion.css";
import promoNavidad from "../../assets/img/banner6.jpg";

function Promocion() {
  return (
    <section className="promo-banner" aria-label="Promocion navidena">
      <article className="promo-body container">
        <header>
          <p className="promo-eyebrow">Edicion limitada</p>
          <h2 className="promo-title">Edición Black Friday: Combo Planetaria</h2>
          <p className="promo-text">
           Proteína + creatina: la dupla clave para entrenar fuerte, recuperar rápido y progresar semana a semana. <strong>Black Friday 60% OFF.</strong>
          </p>

          <article className="botones">
            <p className="precio-promocion precio-promocion1">
              $65.000
            </p>
            <a className="lb-btn lb-black-friday lb-57 promo-cta" href="#categorias">
              <span>Comprar ahora</span>
              <span>Black Friday</span>
            </a>
          </article>
        </header>
      </article>
      <figure className="promo-media">
        <img src={promoNavidad} alt="Promo de Navidad" loading="lazy" />

      </figure>
    </section>
  );
}

export default Promocion;
