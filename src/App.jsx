import Nav from "../componentes/moleculas/nav.jsx";
import NavMobile from "../componentes/moleculas/navMobile.jsx";
import Header from "../componentes/moleculas/header.jsx";
import Categorias from "../componentes/moleculas/Categorias.jsx";
import Beneficios from "../componentes/moleculas/Beneficios.jsx";
import FAQ from "../componentes/moleculas/FAQNew.jsx";
import CTA from "../componentes/moleculas/CTA.jsx";
import Gancho from "../componentes/moleculas/gancho.jsx";
import Footer from "../componentes/moleculas/footer.jsx";
import Carrusel from "../componentes/atomicos/carrusel.jsx";
import Buscador from "../componentes/atomicos/buscador.jsx";
import Comprador from "../componentes/moleculas/Comprador.jsx";

// Imagenes del carrusel (primeras 10)
import c1 from "../assets/img/carrusel/1.png";
import c2 from "../assets/img/carrusel/2.png";
import c3 from "../assets/img/carrusel/3.png";
import c4 from "../assets/img/carrusel/4.png";
import c5 from "../assets/img/carrusel/5.png";
import c6 from "../assets/img/carrusel/6.png";

function App() {
  const carruselItems = [
    {
      img: c1,
      titulo: "Todo cerca tuyo",
      texto:
        "Encontra en LeBron todo lo que necesitas para tu rendimiento: suplementos, asesoramiento y la energia que te acompana dia a dia.",
    },
    {
      img: c2,
      titulo: "Energia al maximo",
      texto:
        "Preentrenos disenados para despertar tu foco, potencia y motivacion. Senti el impulso que te lleva a romper tus propios limites.",
    },
    {
      img: c3,
      titulo: "Todo en suplementacion",
      texto:
        "Proteinas, creatinas y formulas avanzadas para mejorar tu fuerza, recuperacion y resultados. Calidad garantizada en cada producto.",
    },
    {
      img: c4,
      titulo: "Productos nacionales e importados",
      texto:
        "Contamos con las mejores marcas del pais y del mundo. Elegi lo que mejor se adapte a tu entrenamiento, siempre con respaldo LeBron.",
    },
    {
      img: c5,
      titulo: "La mejor atencion",
      texto:
        "Te asesoramos segun tu objetivo y nivel de entrenamiento. Nuestro compromiso: ayudarte a avanzar con confianza y resultados reales.",
    },
    {
      img: c6,
      titulo: "Apoyo deportivo completo",
      texto:
        "Desde el gimnasio hasta el ciclismo y otros deportes: acompanamos tu disciplina con nutricion, energia y pasion por el rendimiento.",
    },
  ];
  return (
    <>
      <Nav />
      <NavMobile />
      <Header />
      <main>
        <Comprador />
        <Categorias />
        <Carrusel items={carruselItems} intervalo={5000} />
        <FAQ />
        <Gancho />
      </main>
      <Footer />
    </>
  );
}

export default App;

