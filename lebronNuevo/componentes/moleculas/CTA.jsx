import "../../assets/css/moleculas/cta.css";
import "../../assets/css/atomicos/boton.css";

function CTA() {
  return (
    <section className="cta-band" aria-label="Llamado a la accion">
      <section className="cta-inner container">
        <header className="cta-header">
          <h3 className="cta-title">Listo para subir tu nivel</h3>
          <p className="cta-sub">Compra hoy con envio gratis desde $50</p>
        </header>
        <nav className="cta-actions" aria-label="Acciones CTA">
          <a className="lb-btn lb-primary lb-57" href="#categorias">
            <span>Comprar ahora</span>
            <span>Vamos</span>
          </a>
          <a className="lb-btn lb-primary lb-57" href="#faq">
            <span>Dudas frecuentes</span>
            <span>Ver</span>
          </a>
        </nav>
      </section>
    </section>
  );
}

export default CTA;

