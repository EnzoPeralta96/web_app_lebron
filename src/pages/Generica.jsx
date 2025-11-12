import { useMemo } from "react";
import { useParams } from "react-router-dom";
import products from "../data/productos.json";
import TarjetaProducto from "../../componentes/atomicos/tarjetaproductos.jsx";
import "../../assets/css/atomicos/tarjetaproducto.css";

export default function Generica() {
  const { nombre } = useParams();

  const { slug, title, items } = useMemo(() => {
    const norm = (s) => (s || "").toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const pretty = (s) => s.replace(/[-_]/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
    const slug = norm(nombre || "");
    const categories = new Set((products || []).map((p) => norm(p.categoria)));

    // Heurística simple de marca desde el nombre
    const brandKeys = [
      "optimum nutrition", "optimum", "universal", "gat", "redcon1", "scivation",
      "dymatize", "gnc", "starlabs", "animal", "on"
    ];
    const getBrand = (name) => {
      const n = norm(name);
      const hit = brandKeys.find((b) => n.includes(b));
      return hit || "";
    };

    let items = [];
    let title = pretty(slug || "Resultados");
    if (categories.has(slug)) {
      // Filtro por categoría exacta
      items = (products || []).filter((p) => norm(p.categoria) === slug);
      title = pretty(slug);
    } else {
      // Búsqueda por nombre o marca que contenga el término
      items = (products || []).filter(
        (p) =>
          norm(p.nombre).includes(slug) ||
          norm(p.marca || "").includes(slug) ||
          getBrand(p.nombre).includes(slug)
      );
      title = `Resultados: ${pretty(slug)}`;
    }

    return { slug, title, items };
  }, [nombre]);

  return (
    <main className="section" style={{ padding: "2rem 1rem" }}>
      <section className="container gen-wrap">
        <header className="gen-header">
          <h2 className="gen-title">{title}</h2>
          <p className="gen-sub">{items.length} productos encontrados</p>
        </header>

        {items.length ? (
          <ul className="gen-grid" role="list">
            {items.map((p) => (
              <li key={p.id} className="gen-grid-item">
                <TarjetaProducto producto={p} categoria={slug} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="gen-empty">No hay productos para esta categoría.</p>
        )}
      </section>
    </main>
  );
}
