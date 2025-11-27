import "../../assets/css/moleculas/mayorista.css";
import RedesSocialesBoton from "../atomicos/redesSocialesBoton.jsx";
import mayorista from "../../assets/img/fondoMayorista.jpg";

function Mayorista() {
    return (
        <section id="mayorista" className="mayorista">
            <h2>¿Querés generar ingresos extras?</h2>
            <p>
                Sumate a nuestro programa de ventas mayoristas y obtené beneficios exclusivos por ser parte de
                nuestra red de distribuidores. No pierdas la oportunidad de expandir tus horizontes y aumentar tus
                ganancias con nosotros.
            </p>

            <section className="mayorista-cuerpo">
                <section className="mayorista-condiciones">
                    <article>
                        <h3>Condiciones:</h3>
                        <ul>
                            <li>Compra mínima de inicio $600.000</li>
                            <li>Posteriormente, un flujo constante de compras</li>
                        </ul>
                    </article>
                    <article>
                        <h3>Beneficios:</h3>
                        <ul>
                            <li>30% de descuento sobre el total de tus compras</li>
                            <li>Acceso anticipado a nuevos lanzamientos</li>
                            <li>Soporte personalizado para distribuidores</li>
                            <li>Materiales digitales para tu promoción</li>
                        </ul>
                    </article>
                </section>
                <section className="mayorista-imagen">
                    <figure>
                        <img src={mayorista} alt="condiciones para ser mayorista" />
                    </figure>
                </section>
            </section>

            <section className="padre-cta">
                <article className="mayorista-cta">
                    <p>
                        ¡Dale! mandanos un mensajito
                    </p>
                    <RedesSocialesBoton include={["whatsapp"]} whatsappUrl="https://wa.me/543816337883" />
                </article>
            </section>

        </section>
    );
}

export default Mayorista;
