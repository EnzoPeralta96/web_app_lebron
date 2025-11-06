import React from "react";
import "../../assets/css/atomicos/boton.css"; // separamos los estilos para mantener limpio el código

export default function Boton({
  children,
  altText,
  variant = "primary", // "primary" | "ghost"
  effect = true,
  onClick,
  type = "button",
  href,
  className = "",
  ariaLabel,
  ...rest
}) {
  const content = effect ? (
    <>
      <span className="text">{children}</span>
      <span>{altText || children}</span>
    </>
  ) : (
    children
  );

  const classes = [
    "lb-btn",
    `lb-${variant}`,
    effect && "lb-57",
    className
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
        role="button"
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel}
      {...rest}
    >
      {content}
    </button>
  );
}
