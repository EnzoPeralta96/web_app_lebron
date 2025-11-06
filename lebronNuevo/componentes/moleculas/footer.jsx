import logo from "../../assets/img/lebronLogo.png";
import "../../assets/css/moleculas/footer.css";
import "../../assets/css/atomicos/divider.css";
import RedesSocialesBoton from "../atomicos/redesSocialesBoton.jsx";
import TarjetasFooter from "../atomicos/tarjetasfooter.jsx";

function Footer() {

  const bubbles = [
    { size: "4rem", distance: "10rem", position: "10%", time: "6s", delay: "0s" },
    { size: "3rem", distance: "9rem", position: "22%", time: "5.5s", delay: ".4s" },
    { size: "2.75rem", distance: "8.5rem", position: "35%", time: "5s", delay: ".8s" },
    { size: "3.5rem", distance: "10rem", position: "50%", time: "6s", delay: "0.2s" },
    { size: "2.5rem", distance: "8rem", position: "63%", time: "4.8s", delay: ".6s" },
    { size: "3rem", distance: "9.5rem", position: "75%", time: "5.6s", delay: ".3s" },
    { size: "2rem", distance: "7.5rem", position: "85%", time: "4.2s", delay: ".9s" },
    { size: "3.25rem", distance: "10rem", position: "95%", time: "6.2s", delay: ".1s" },
  ];

  return (
    <footer className="footer has-divider divider-top">
      <aside className="bubbles" aria-hidden={true}>
        {bubbles.map((b, i) => (
          <span
            key={i}
            className="bubble"
            style={{
              "--size": b.size,
              "--distance": b.distance,
              "--position": b.position,
              "--time": b.time,
              "--delay": b.delay,
            }}
          />
        ))}
  </aside>

  <section className="content">
        <section className="container footer-grid">
          <section className="foot">
            <a className="logo" href="#" aria-label="Inicio">
              <img className="logo-img" src={logo} alt="Lebron logo" />
            </a>
            <br />
            <br />
            <nav className="foot-social" aria-label="Instagram">
              <RedesSocialesBoton instagramUrl="https://www.instagram.com/" include={["instagram"]} />
            </nav>
          </section>

          <TarjetasFooter />
        </section>
        {/* Social moved into left column (foot) */}
  </section>

  <svg width="0" height="0" aria-hidden={true} style={{ position: "absolute" }}>
        <defs>
          <filter id="blob">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="bluralpha"
            />
            <feComposite in="SourceGraphic" in2="bluralpha" operator="atop" />
          </filter>
        </defs>
      </svg>
    </footer>
  );
}

export default Footer;

