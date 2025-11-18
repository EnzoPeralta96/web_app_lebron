// componentes/moleculas/Categorias.jsx
import protein from "../../assets/img/protein (1).png";
import alimentos from "../../assets/img/alimentos (2).png";
import creatina from "../../assets/img/creatina (1).png";
import preentreno from "../../assets/img/preenterno2 (1).png";
import amino from "../../assets/img/amino (1).png";
import vitaminas from "../../assets/img/vitaminas (1).png";
import accesorios from "../../assets/img/accesorios (1).png";
import quemadores from "../../assets/img/quemadorr (1).png";
import combosImg from "../../assets/img/platon.png";
import Tarjeta from "../atomicos/tarjeta.jsx";
import "../../assets/css/moleculas/categorias.css";
import products from "../../src/data/productos.json";

export default function Categorias() {
  const categorias = [
    { nombre: "Proteinas", imagen: protein, alt: "Proteinas", slug: "proteinas", descripcion: "Marcas: ON, ENA, Star, UltraTech, Mervick" },
    { nombre: "Alimentos", imagen: alimentos, alt: "Alimentos", slug: "alimentos", descripcion: "Harina de avena, peanut butter, barras, snacks fit" },
    { nombre: "Vitaminas", imagen: vitaminas, alt: "Vitaminas", slug: "vitaminas", descripcion: "Multivitaminicos, Omega 3, Vitamina C y D3" },
    { nombre: "Creatinas", imagen: creatina, alt: "Creatinas", slug: "creatinas", descripcion: "Monohidratada, micronizada. Marcas: ENA, Star, UltraTech" },
    { nombre: "Aminoacidos", imagen: amino, alt: "Aminoacidos", slug: "aminoacidos" },
    { nombre: "Pre-entrenos", imagen: preentreno, alt: "Pre-entrenos", slug: "preentrenos", descripcion: "Energizantes, bombas de oxido nitrico,focus" },
    { nombre: "Quemadores", imagen: quemadores, alt: "Quemadores", slug: "quemadores", descripcion: "L-carnitina, termogenicos, diureticos" },
    { nombre: "Accesorios", imagen: accesorios, alt: "Accesorios", slug: "accesorios", descripcion: "Shakers, cinturones, guantes, munhequeras" },
  ];

  // Mostrar solo categorías que existan en el JSON real
  const available = new Set((products || []).map(p => (p.categoria || "").toLowerCase()));
  const visibles = categorias.filter(cat => available.has(cat.slug));

  return (
    <section id="categorias" className="section">
      <section className="container categories-wrap">
        <h2>Categorias destacadas</h2>
        <section className="categories-grid" aria-label="Listado de categorias">
          {visibles.map((cat) => (
            <Tarjeta
              key={cat.slug}
              titulo={cat.nombre}
              subtitulo={cat.alt}
              descripcion={cat.descripcion}
              imagen={cat.imagen}
              href={`/categoria/${cat.slug}`}
            />
          ))}
        </section>
      </section>
    </section>
  );
}
