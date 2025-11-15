import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import products from "../data/productos.json";
import ProductosDestacados from "../../componentes/atomicos/productosDestacados.jsx";
import "../../assets/css/pages/detalle.css";

export default function Detalle() {
  const { id } = useParams();
  const producto = useMemo(() => {
    return (products || []).find((item) => String(item.id) === String(id));
  }, [id]);

  if (!producto) {
    return (
      <main className="detalle-page">
        <p className="detalle-empty">No encontramos ese producto.</p>
      </main>
    );
  }

  const { nombre, descripcion, precio, marca, tamanos, sabores, imagen } = producto;
  const formattedPrice = typeof precio === "number" ? precio.toLocaleString("es-AR") : precio;

  return (
    <main className="detalle-page">
      <header className="detalle-header">
        <Link className="detalle-back" to="/categoria/combos">
          ← Volver a combos
        </Link>
        <h1>{nombre}</h1>
        <p className="detalle-subtitle">{descripcion}</p>
      </header>

      <section className="detalle-grid">
        <figure className="detalle-image">
          <img src={imagen || "/img/lebronLogo.png"} alt={nombre} loading="lazy" />
        </figure>

        <article className="detalle-info">
          <div className="detalle-price">
            <span className="detalle-price__label">Precio</span>
            <strong className="detalle-price__value">$ {formattedPrice}</strong>
          </div>
          <ul className="detalle-meta">
            {marca && (
              <li>
                <span>Marca:</span> {marca}
              </li>
            )}
            {Array.isArray(tamanos) && tamanos.length > 0 && (
              <li>
                <span>Tamaños:</span> {tamanos.join(", ")}
              </li>
            )}
            {Array.isArray(sabores) && sabores.length > 0 && (
              <li>
                <span>Sabores:</span> {sabores.join(", ")}
              </li>
            )}
          </ul>
          <p className="detalle-notes">
            Precio valido abonando en efectivo o transferencia. Consultá por cuotas y
            disponibilidad de stock.
          </p>
        </article>
      </section>

      <section className="detalle-related">
        <ProductosDestacados />
      </section>
    </main>
  );
}
