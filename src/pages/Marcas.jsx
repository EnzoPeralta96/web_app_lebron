import { useMemo } from "react";
import { Link } from "react-router-dom";
import products from "../data/productos.json";

export default function Marcas() {
  const { brands } = useMemo(() => {
    const norm = (s) => (s || "").toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const pretty = (s) => (s || "").replace(/[-_]/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());

    const map = new Map();
    for (const p of products || []) {
      const raw = (p.marca || "").trim();
      if (!raw) continue;
      const key = norm(raw);
      const entry = map.get(key) || { key, name: pretty(raw), count: 0 };
      entry.count += 1;
      map.set(key, entry);
    }
    const list = Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
    return { brands: list };
  }, []);

  return (
    <main className="section" style={{ padding: "2rem 1rem" }}>
      <section className="container" style={{ maxWidth: 960, marginInline: "auto" }}>
        <header style={{ textAlign: "center", marginBottom: "1rem" }}>
          <h2 style={{ margin: 0 }}>Marcas</h2>
          <p style={{ margin: ".25rem 0 0", color: "#cbd5e1" }}>{brands.length} marcas encontradas</p>
        </header>

        <ul style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0,1fr))",
          gap: ".75rem",
        }}>
          {brands.map((b) => (
            <li key={b.key} style={{
              border: "1px solid rgba(255,255,255,.12)",
              background: "rgba(255,255,255,.06)",
              borderRadius: 12,
            }}>
              <Link
                to={`/categoria/${b.key}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: ".9rem 1rem",
                  gap: ".5rem",
                  textDecoration: "none",
                  color: "inherit",
                }}
                aria-label={`Ver productos de ${b.name}`}
              >
                <span style={{ fontWeight: 700 }}>{b.name}</span>
                <span style={{ opacity: 0.75 }}>{b.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

