import "../../assets/css/moleculas/gancho.css";
import Boton from "../atomicos/boton.jsx";
import Buscador from "../atomicos/buscador.jsx";
import hero from "../../assets/img/miyamoto.png";

function Gancho() {
  return (
    <section
      id="gancho"
      className="section"
      style={{ "--gancho-bg": `url(${hero})` }}
    >
      <section className="container gancho-inner">
        <figure className="gancho-media">
          <img src={hero} alt="Entrenamiento y energía" loading="lazy" />
        </figure>

        <article className="gancho-content">
          <blockquote className="gancho-quote">
            <p>
              “La victoria pertenece a quien no negocia con su disciplina.”
            </p>
            <footer>— Musashi Miyamoto</footer>
          </blockquote>
          <blockquote className="gancho-quote">
            <p>
              En Suplementos Lebron, creemos que la disciplina no es un destino: es un camino. Como enseñaba <strong>Miyamoto</strong>, el progreso real se forja en silencio, repetición y constancia. Por eso creamos combos y suplementos pensados para acompañarte en cada etapa: más rendimiento, mejor recuperación y una mente enfocada en avanzar. Porque cada entrenamiento, cada elección y cada meta, pesan menos cuando tenés un equipo detrás. <strong>Estamos con vos, para que hoy entrenes más fuerte y mañana seas mejor que ayer.</strong>
            </p>
          </blockquote>

          <nav className="gancho-actions" aria-label="Acciones principales">
            <Boton variant="black-friday" href="#categorias" altText="Vamos">
              Comprar
            </Boton>
            <Boton variant="black-friday" href="/categoria/combos" altText="Ver">
              Ir a combos
            </Boton>
          </nav>
          
        </article>
      </section>
    </section>
  );
}

export default Gancho;
