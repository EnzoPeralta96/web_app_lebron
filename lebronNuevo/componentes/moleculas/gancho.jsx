import "../../assets/css/moleculas/gancho.css";
import Boton from "../atomicos/boton.jsx";
import Buscador from "../atomicos/buscador.jsx";
import hero from "../../assets/img/platon.png";

function Gancho() {
  return (
    <section id="gancho" className="section" style={{ "--gancho-bg": `url(${hero})` }}>
      <section className="container gancho-inner">
        <figure className="gancho-media">
          <img src={hero} alt="Entrenamiento y energía" loading="lazy" />
        </figure>

        <article className="gancho-content">
          <blockquote className="gancho-quote">
            <p>
              “El hombre que no tiene el valor de ejercitar su cuerpo y alcanzar su plenitud física jamás sabrá de lo que es capaz su alma.”
            </p>
            <footer>— Platón</footer>
          </blockquote>
          <blockquote className="gancho-quote">
            <p>
              En Suplementos Lebron, creemos que alcanzar la plenitud del cuerpo es también un camino hacia la grandeza del alma.
              Esta filosofía es el fuego que nos impulsa: acompañar a quienes buscan superarse, con productos que nutren la fuerza, la mente y la constancia.
              Porque cada entrenamiento, cada elección y cada meta, se construyen mejor cuando no estás solo.
              Nosotros estamos con vos, en cada paso de tu evolución.
            </p>
          </blockquote>

          <nav className="gancho-actions" aria-label="Acciones principales">
            <Boton href="#categorias" altText="Vamos">Comprar</Boton>
            <Boton href="#categorias" altText="Ver">Ir a combos</Boton>
          </nav>
          
        </article>
      </section>
    </section>
  );
}

export default Gancho;
