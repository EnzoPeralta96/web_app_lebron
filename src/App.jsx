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
import Comprador from "../componentes/moleculas/Comprador.jsx";
import ProductosDestacados from "../componentes/atomicos/productosDestacados.jsx";
import Promocion from "../componentes/moleculas/promocion.jsx";
import Promocion2 from "../componentes/moleculas/promocion2.jsx";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import "../assets/css/atomicos/fondos.css";

import Generica from "./pages/Generica.jsx";
import Marcas from "./pages/Marcas.jsx";
import Carrito from "./pages/Carrito.jsx";
import Detalle from "./pages/detalle.jsx";
import Facturacion from "./pages/facturacion.jsx";
import { CartProvider } from "./context/CartContext.jsx";

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

  const Home = () => (
    <>
      <Header />
      <main>
        <Comprador />
        <Categorias />
        <Carrusel items={carruselItems} intervalo={5000} />
        <Promocion />
        <FAQ />
        <ProductosDestacados />

        <Gancho />
        <Promocion2 />
      </main>
    </>
  );

  // Normalizar base y pathname
  const stripTrailingSlash = (value) =>
    value?.length > 1 && value.endsWith("/") ? value.slice(0, -1) : value;

  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = stripTrailingSlash(base);

  const RouterWithBodyClass = () => {
    const location = useLocation();

    const pathname = stripTrailingSlash(location.pathname);

    useLayoutEffect(() => {
      if (typeof window === "undefined") {
        return;
      }

      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, [location.pathname, location.search, location.hash]);

    // Resolver ruta efectiva independientemente del entorno
    const effectivePath =
      normalizedBase !== "/" && pathname.startsWith(normalizedBase)
        ? pathname.slice(normalizedBase.length) || "/"
        : pathname;

    // Esto detecta correctamente la home incluso si es /web_app_lebron/
    const isHome = effectivePath === "/";

    // APLICAR / QUITAR clases del BODY (versión corregida)
    if (typeof document !== "undefined") {
      document.body.classList.remove(
        "is-inner",
        "has-diagonales"
      );
      document.body.classList.add("has-fondo-estelar");

      if (isHome) {
        document.body.classList.add("has-diagonales");
      } else {
        document.body.classList.add("is-inner");
      }
    }

    return (
      <>
        {/* Fondos animados */}
        <>
          <div className="bg" aria-hidden="true" />
          <div className="bg bg2" aria-hidden="true" />
          <div className="bg bg3" aria-hidden="true" />
          <div className="fondo-stars" aria-hidden="true" />
          <div className="fondo-stars fondo-stars2" aria-hidden="true" />
          <div className="fondo-stars fondo-stars3" aria-hidden="true" />
        </>
        <Nav />
        <NavMobile />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categoria/:nombre" element={<Generica />} />
          <Route path="/marcas" element={<Marcas />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/facturacion" element={<Facturacion />} />
          <Route path="/producto/:id" element={<Detalle />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </>
    );
  };

  return (
    <BrowserRouter basename={base}>
      <CartProvider>
        <RouterWithBodyClass />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
