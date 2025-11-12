import demoImg from "../../assets/img/starr (1).png";
// Nota: el archivo local tiene paréntesis en el nombre
// Si luego lo renombrás a "proteina2.png", avisá y actualizo la importación
import proteina2 from "../../assets/img/proteina2 (1).png";

import { useCart } from "../../src/context/CartContext.jsx";

export default function TarjetaProducto({ producto = {}, categoria }) {
  const { nombre, precio, marca, /*categoria: cat,*/ tamanos, sabores, imagen, stock, descripcion } = producto || {};
  const price = typeof precio === "number" ? precio.toLocaleString("es-AR") : precio;

  // Imagen de prueba solicitada: usar import directo desde assets
  const cart = useCart();

  return (
    <article className="tp3d-wrap" aria-label={`${nombre} ${categoria || cat || "producto"}`}>
      <section className="tp3d-card" aria-live="polite">
        <header className="tp3d-front">
          <h3 className="tp3d-title">{nombre}</h3>
          <figure className="tp3d-figure">
            {/* En desktop se anima con hover del contenedor */}
            <span className="tp3d-img" aria-hidden="true">
              <img
                src={proteina2}
                alt={nombre}
                loading="lazy"
                onError={(e) => {
                  if (e.currentTarget.src !== demoImg) e.currentTarget.src = demoImg;
                }}
              />
            </span>
            {descripcion && <figcaption className="sr-only">{descripcion}</figcaption>}
          </figure>
          {price && <p className="tp3d-price">$ {price}</p>}
        </header>

        <aside className="tp3d-side" aria-label="Detalles del producto">
          <h4 className="tp3d-side-title">{nombre}</h4>
          <ul className="tp3d-list" role="list">
            {marca && <li><strong>Marca</strong> {marca}</li>}
            {Array.isArray(tamanos) && tamanos.length > 0 && (
              <li><strong>Tamaños</strong> {tamanos.join(", ")}</li>
            )}
            {Array.isArray(sabores) && sabores.length > 0 && (
              <li><strong>Sabores</strong> {sabores.join(", ")}</li>
            )}
            {typeof stock === "number" && <li><strong>Stock</strong> {stock}</li>}
          </ul>
          <button
            className="tp3d-add"
            type="button"
            aria-label={`Agregar ${nombre} al carrito`}
            data-add-to-cart={nombre}
            onClick={() => cart?.addItem?.(producto, 1)}
          >
            Agregar al carrito
          </button>
        </aside>
      </section>
    </article>
  );
}
