import "../../assets/css/moleculas/faq.css";
import "../../assets/css/moleculas/faq.section.css";
import TarjetaPFrecuentes from "../atomicos/tarjetaPFrecuentes.jsx";

function FAQ() {
  const items = [
    { q: "Como cancelo una compra?", a: "Podes solicitar la cancelacion antes de que el pedido sea despachado. Escribinos por WhatsApp o por correo para gestionar el reembolso." },
    { q: "Hacen envios?", a: "Si, realizamos envios a todo el pais." },
    { q: "Se puede devolver un producto?", a: "Si, aceptamos devoluciones por fallas de fabrica o errores de envio. El producto debe conservar su empaque original y sin abrir." },
    { q: "Que medios de pago aceptan?", a: "Recibimos todas los medios de pagos, efectivo, transfereicia, debito, credito, billetras virtuales y QR " 
    },
    { q: "Dónde puedo encontrarlos?", a: "puedes encontrarnos en nuestras sucursales físicas o en nuestra tienda online. Hacemos envíos a todo el país." 
    },
  ];

  return (
    <section id="faq" className="section">
      <section className="container" aria-labelledby="faq-title">
        <h2 id="faq-title">Preguntas frecuentes</h2>
        <ul className="faq-grid">
          {items.map((it, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={it.q} className="faq-grid-item">
                <TarjetaPFrecuentes
                  pregunta={it.q}
                  respuesta={it.a}
                  ctaHref={isLast ? "#sucursales" : undefined}
                  ctaLabel={isLast ? "Ver sucursales" : undefined}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
}

export default FAQ;
