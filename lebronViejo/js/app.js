'use strict';

// Año actual
document.getElementById('year').textContent = new Date().getFullYear();

// Menú móvil
const navToggle = document.getElementById('navToggle');
const links = document.querySelector('.nav-links');
const navEl = document.querySelector('.nav');

// Ajustar padding-top del body para nav fijo según altura real
if (navEl) {
  const setNavHeight = () => {
    document.documentElement.style.setProperty('--nav-h', navEl.offsetHeight + 'px');
    document.body.classList.add('has-fixed-nav');
  };
  setNavHeight();
  window.addEventListener('resize', setNavHeight);
  window.addEventListener('load', setNavHeight);
}

if (navToggle && links) {
  navToggle.addEventListener('click', () => {
    links.classList.toggle('is-open');
  });
}

// Carrito simulado
let cart = 0;
const cartCount = document.getElementById('cartCount');
document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
  btn.addEventListener('click', () => {
    cart += 1;
    if (cartCount) cartCount.textContent = String(cart);
    toast(`Añadido: ${btn.getAttribute('data-add-to-cart')}`);
  });
});

// Toast minimalista usando clase CSS
function toast(text) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = text;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1800);
}

// Ocultar/mostrar nav según dirección de scroll
(function enableHideOnScroll() {
  if (!navEl) return;
  let lastY = window.scrollY || window.pageYOffset || 0;
  let hidden = false;
  const threshold = 10; // comienza rápido
  const delta = 2;      // sensibilidad (px)

  window.addEventListener('scroll', () => {
    const y = window.scrollY || window.pageYOffset || 0;

    // si el menú móvil está abierto, no ocultar
    if (links && links.classList.contains('is-open')) {
      if (hidden) { navEl.classList.remove('is-hidden'); hidden = false; }
      lastY = y;
      return;
    }

    // Mostrar siempre en la parte superior
    if (y <= 0) {
      if (hidden) { navEl.classList.remove('is-hidden'); hidden = false; }
      lastY = 0;
      return;
    }

    if (y > lastY + delta && y > threshold) {
      // Scroll hacia abajo → ocultar
      if (!hidden) { navEl.classList.add('is-hidden'); hidden = true; }
    } else if (y < lastY - delta) {
      // Scroll hacia arriba → mostrar
      if (hidden) { navEl.classList.remove('is-hidden'); hidden = false; }
    }

    lastY = y;
  }, { passive: true });
})();
