import "../../assets/css/moleculas/beneficios.css";

function Beneficios() {
  const items = [
    { icon: "?", title: "Energia sostenida", desc: "Enfoque y rendimiento estables, sin picos ni caidas." },
    { icon: "???", title: "Fuerza y volumen", desc: "Ingredientes con respaldo cientifico para progresar." },
    { icon: "??", title: "Recuperacion rapida", desc: "Menor fatiga y mejor rendimiento al dia siguiente." },
    { icon: "?", title: "Calidad verificada", desc: "Buenas practicas, lote analizado y etiquetado claro." },
  ];

  return (
    <section id="beneficios" className="section">
      <section className="container">
        <h2>Beneficios que se sienten</h2>
        <ul className="benefits-grid" role="list">
          {items.map((b) => (
            <li key={b.title} className="benefit-card">
              <span className="benefit-icon" aria-hidden={true}>{b.icon}</span>
              <h4 className="benefit-title">{b.title}</h4>
              <p className="benefit-desc">{b.desc}</p>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

export default Beneficios;
