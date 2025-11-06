import "../../assets/css/atomicos/redesSocialesBoton.css";

// SVG inline icons to avoid external deps
const IconInstagram = () => (
    <svg viewBox="0 0 24 24" aria-hidden={true}>
        <path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
    </svg>
);

const IconWhatsApp = () => (
    <svg viewBox="0 0 24 24" aria-hidden={true}>
        {/* Glyph más nítido en tamaños pequeños (handset dentro de burbuja) */}
        <path fill="currentColor" d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l1.94-1.94a1 1 0 0 1 1.03-.24 11.72 11.72 0 0 0 3.68.59 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1h2.21a1 1 0 0 1 1 1 11.72 11.72 0 0 0 .59 3.68 1 1 0 0 1-.24 1.03l-1.94 1.94z" />
    </svg>
);

function RedesSocialesBoton({
    instagramUrl = "https://www.instagram.com/",
    whatsappUrl = "https://wa.me/",
    className = "",
    include = ["instagram", "whatsapp"],
}) {
    const items = [
        {
            id: "instagram",
            label: "Instagram",
            href: instagramUrl,
            bg: "linear-gradient(-45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)",
            icon: <IconInstagram />,
        },
        {
            id: "whatsapp",
            label: "WhatsApp",
            href: whatsappUrl,
            bg: "#25D366",
            icon: <IconWhatsApp />,
        },
    ];

    const filtered = items.filter(it => include.includes(it.id));
    if (filtered.length === 0) return null;

    return (
        <ul className={`lb-social ${className}`}>
            {filtered.map((it) => (
                <li key={it.id} data-tooltip={it.label} data-social={it.id} style={{ "--bg": it.bg }}>
                    <a href={it.href} aria-label={it.label} target="_blank" rel="noopener noreferrer">
                        {it.icon}
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default RedesSocialesBoton;
