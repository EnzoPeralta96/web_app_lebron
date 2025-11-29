import Boton from "../atomicos/boton.jsx";
import "../../assets/css/moleculas/granPromo.css";
import blackBanner from "../../assets/img/banner7.png";


function GranPromo() {
    return (
        <section className="granpromo-banner" aria-label="Eventos Lebron">
            <section className="granpromo-hero" aria-label="Black Friday Lebron">
                <figure className="granpromo-hero__media">
                    <img
                        src={blackBanner}
                        alt="Black Friday Lebron con banner negro"
                        loading="lazy"
                    />
                </figure>
                <article className="granpromo-content">
                    <h2 className="granpromo-title">Black Friday Lebron</h2>
                    <p className="granpromo-text">
                        Rebajas hasta 60 % en combos de proteinas, creatina y accesorios para potenciar tu rutina.
                    </p>
                    <article className="granpromo-meta">
                        <p className="granpromo-shipping">Envios expres y entregas internacionales.</p>
                    </article>
                    <Boton variant="black-friday" href="/categoria/combos" altText="Explorar combos">
                        Ver combos
                    </Boton>
                </article>

            </section>
        </section>
    );
}

export default GranPromo;
