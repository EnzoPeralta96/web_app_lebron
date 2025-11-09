CLEANUP / CHANGES APPLIED

Fecha: 2025-11-05
Resumen: pasada automática y manual ligera para corregir problemas de codificación, pequeños ajustes CSS/JSX y preparar el repo para una limpieza profunda.

Cambios aplicados (inmediatos)
- componentes/atomicos/buscador.jsx
  - Normalización de comentarios y eliminación de caracteres rotos.
  - Añadido helper `setValue` para unificar asignación en modo controlado/no-controlado.
  - Reemplazos seguros en handlers para evitar duplicación.

- componentes/moleculas/nav.jsx
  - Corregido texto "Proteínas" (reemplazo de mojibake) y normalización de la búsqueda (NFD + eliminación de diacríticos).

- componentes/atomicos/boton.jsx
  - Corregido comentario con codificación rota.

- assets/css/atomicos/carrusel.css
  - Corregido comentario con codificación rota y validado que no haya sintaxis CSS corrupta.

- assets/css/moleculas/faq.css
  - Reescrito a layout basado en flex-wrap para asegurar 3/2/1 tarjetas por fila y reglas robustas de centrado para última fila.
  - Añado límites `max-width` a tarjetas centradas para evitar estirados.

- Moved/created:
  - archive/ (directorio creado para respaldos futuros)
  - CLEANUP_CHANGES.md (este archivo)

Cambios aplicados - lote 1 (conservadores)
- componentes/atomicos/buscador.jsx
  - Corregido `aria-hidden` en JSX (`aria-hidden={true}`) para mejorar accesibilidad y evitar atributos inválidos.

- componentes/atomicos/tarjetaPFrecuentes.jsx
  - Corregido `aria-hidden` en JSX (`aria-hidden={true}`) y mantenimiento de accesibilidad para lectores.

- componentes/atomicos/tarjeta.jsx
  - Eliminado comentario duplicado y limpiado espacios en blanco finales.

- componentes/moleculas/footer.jsx
  - Corregido cierre de JSX en el mapeo de `bubbles` (paréntesis/corchetes) y restaurado `</div>` faltante para `.bubbles`.


Acciones pendientes (sugeridas)
- Ejecutar el dev server y probar manualmente las interacciones críticas:
  - Buscador: abrir, escribir, seleccionar sugerencias, limpiar (círculo), Escape.
  - FAQ: añadir/quitar tarjetas (1..6+) y comprobar distribución 1/2/3 columnas y centrado de última fila.
  - Carrusel: navegación anterior/siguiente, miniaturas.
  - Footer: enlaces de WhatsApp (abrir) y disposición.
- Revisar otros componentes atomicos para patrones repetidos y factorizar (ej.: manejo de `onChange` en otros inputs).
- Buscar y mover a `archive/` cualquier archivo de respaldo encontrado (.bak, .orig, *.num) antes de borrarlo.

Notas de seguridad / estilo
- No se introdujeron cambios en APIs públicas de componentes (props, eventos). Los cambios son locales y no deberían romper integraciones.
- Se evitó ejecutar scripts (lint/build) por motivos de permisos en PowerShell. Ejecuta `npm run lint` y `npm run dev` localmente para verificar.

Cómo revertir rápidamente
- Todos los cambios son pequeños y están contenidos en archivos individuales. Si querés que revierta algo, especifica el archivo y lo deshago.

Siguientes pasos recomendados
1. Confirmá si querés que aplique la "pasada profunda" completa en lotes de 8 archivos (recomendada). Yo aplicaré y documentaré cada lote.
2. O bien pedime que genere un informe (lista de archivos por prioridad) sin aplicar cambios.


