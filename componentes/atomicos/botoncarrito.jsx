import { Link } from "react-router-dom";
import { useCart } from "../../src/context/CartContext.jsx";
import "../../assets/css/atomicos/botoncarrito.css";

const CartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    role="presentation"
    focusable="false"
    aria-hidden="true"
  >
    <path
      d="M6 6h15l-1.5 9.5H8L6 6z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.5 17.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm7 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
      fill="currentColor"
    />
    <path
      d="M7 6l1-2h7.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

export default function BotonCarrito({
  href = "/carrito",
  ariaLabel = "Ver carrito",
  className = "",
  iconOnly = false,
  ...rest
}) {
  const { count = 0 } = useCart() || {};

  const classes = [
    "lb-cart-btn",
    iconOnly && "lb-cart-btn--icon",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className="lb-cart-icon" aria-hidden="true">
        <CartIcon />
      </span>
      {!iconOnly && <span className="lb-cart-label">Carrito</span>}
      <span className="lb-cart-count" aria-live="polite" aria-atomic="true">
        {count}
      </span>
    </>
  );

  const isRouterLink = typeof href === "string" && href.startsWith("/");

  if (isRouterLink) {
    return (
      <Link to={href} className={classes} aria-label={ariaLabel} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} aria-label={ariaLabel} {...rest}>
      {content}
    </a>
  );
}
