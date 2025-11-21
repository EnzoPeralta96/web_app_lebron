import "../../assets/css/atomicos/boton.css";
import "../../assets/css/moleculas/promocion2.css";
import anoNuevo from "../../assets/img/ano-nuevo.jpg";

function Promocion2() {
  return (
    <section className="promo2-banner" aria-label="Promocion energia">
      <figure className="promo2-media">
        <img src={anoNuevo} alt="Promo de año nuevo" loading="lazy" />
      </figure>
      <div className="promo2-body container">
        <header>
          <p className="promo2-eyebrow">Nueva colección</p>
          <h2 className="promo2-title">Nuevo año, nuevas metas</h2>
          <p className="promo2-text">
            Impulsa tu progreso desde el inicio con proteínas + creatina en un combo pensado para tus nuevas metas.
          </p>
          <p className="precio-promocion">
            $140.000
          </p>
          <a className="lb-btn lb-primary lb-57 promo2-cta" href="#categorias">
            <span>Ver combos</span>
            <span>Energía Lebron</span>
          </a>
        </header>
      </div>
    </section>
  );
}

export default Promocion2;
