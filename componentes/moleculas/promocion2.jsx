import "../../assets/css/atomicos/boton.css";
import "../../assets/css/moleculas/promocion.css";
import banner8 from "../../assets/img/banner8.png";

function Promocion2() {
  return (
    <section className="promo-banner" aria-label="Promo complementaria Lebron">
      <article className="promo-body container">
        <header>
          <p className="promo-eyebrow">Colección especial</p>
          <h2 className="promo-title">Edición Black Friday: Combo Guerrero</h2>
          <p className="promo-text">
            Amplía tu stash con lanzamientos exclusivos: packs de proteínas y accesorios que se agotan en cuestión de horas.
          </p>

          <article className="botones">
            <p className="precio-promocion precio-promocion1">
              $5000
            </p>
            <a className="lb-btn lb-black-friday lb-57 promo-cta" href="#categorias">
              <span>Explorar ahora</span>
              <span>Black Friday</span>
            </a>
          </article>
        </header>
      </article>
      <figure className="promo-media">
        <img src={banner8} alt="Banner Lebron" loading="lazy" />
      </figure>
    </section>
  );
}

export default Promocion2;
