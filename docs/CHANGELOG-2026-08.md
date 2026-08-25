# Changelog · Mejora integral de juradaexpress.es (agosto 2026)

Trabajo realizado según `docs/AUDITORIA-JURADAEXPRESS.md` (fuente de verdad)
y `docs/BRIEF-CLAUDE-CODE.md`, en la rama `mejora/rediseno-2026-08`
([PR #16](https://github.com/teacherelenaia/juradaexpress-web/pull/16)).

**Capturas**: `docs/capturas/antes/` (home ES/EN a 390 y 1440 px antes del
rediseño) y `docs/capturas/fase-0` a `fase-4` (después, por fase).

---

## FASE 0 — Correcciones urgentes (P0/P1)

- **«¿Empezamos?» vuelve a leerse** (ES y EN): eliminadas las reglas globales
  de `globals.css` (`a{underline}`, `h1-h3` con color/tamaño, `p/ul/ol{my-4}`)
  que pisaban los componentes. Sustituidas por clases explícitas
  (`.btn-*`, `.link`, `.link-nav`) — **los botones ya no salen subrayados**.
- Enlace roto `g.page/r/PLACEHOLDER` retirado; la URL real queda pendiente
  en `content/reviews.js`.
- **Testimonios de ejemplo eliminados**: sección de opiniones condicional
  (`components/Reviews.js`) que solo se publica con reseñas reales (nombre,
  fecha y origen) en `content/reviews.js`.
- Header con separación logo/menú y **estado activo** de navegación
  (`usePathname`); contraste del dorado corregido (`gold-600` → `gold-700`
  sobre blanco, 4,8:1); foco visible con color de marca; skip-link;
  objetivos táctiles ≥ 44 px.
- Fondos unificados: blanco + `stone-50` (neutro cálido); eliminados el
  divisor de onda y el "kicker" dorado.
- Meta title/description y H1 de la home según 5.1, con equivalente EN.

## FASE 1 — Sistema visual

- **Tipografía** vía `next/font` sin CLS: Newsreader 600/700 + itálica
  (display) y Manrope 400-700 (cuerpo). Cuerpo a 1.0625 rem, titulares con
  `text-wrap: balance` y tracking −0.02em, `tabular-nums` en precios.
- **Tokens**: sombras tintadas con navy, radios 0.75 rem (contenedores) /
  0.625 rem (botones); componentes `SectionHeading` y `Card`;
  `.btn-secondary` con borde navy (el dorado queda como acento único).
- **Header de 64 px** con CTA «Pedir presupuesto» → `/documentos`;
  subrayado dorado de la página activa dibujado con clip-path (180 ms).
- **Móvil**: barra inferior fija (WhatsApp + Pedir presupuesto); flotante de
  WhatsApp solo en escritorio (a 24 px); panel de menú siempre montado
  (entrada 200 ms ease-out, salida 150 ms) con idioma y redes.
- **Cookies**: tarjeta compacta inferior izquierda (máx. 420 px), bilingüe,
  enlazada a las nuevas `/politica-cookies` y `/en/cookie-policy` (tabla de
  `_ga`, `_ga_*`, duración y finalidad).

## FASE 2 — Home ES y EN

- **Hero**: titular serif con «Español ⇆ Inglés» en itálica dorada, los tres
  datos en una línea (sin chips), dos CTA, **foto real de la firma**
  (recorte propio, 81 KB, `priority`) y **sello SVG «Traductora Jurada ·
  Nº 7310»** que entra con scale 0.95→1 + opacidad (200 ms).
- **Documentos más habituales**: lista editorial a dos columnas (documento,
  trámite, precio desde de `content/documents.js`, plazo, enlace a ficha),
  imagen lateral en zig-zag. Fuera las tarjetas repetidas y las secciones
  «Aceptado por» / «Por qué elegir».
- **¿Cómo trabajamos?**: línea temporal de 4 pasos que **se dibuja al entrar
  en viewport** (único momento animado, 600 ms, con `prefers-reduced-motion`).
  Contenedor de vídeo opcional listo (`PROCESS_VIDEO` en `content/site.js`).
  La foto que mostraba «Introducing ChatGPT» se sustituyó por otro encuadre
  de la sesión de la firma.
- **Sobre mí**: monograma serif E.P., nº 7310 enlazado al buscador del MAEC
  y enlace a `/sobre-mi`. FAQ con chevron rotatorio; bloque «Síguenos».
- **Footer**: fila legal, iconos de redes y JSON-LD `ProfessionalService`
  ampliado (founder + credencial MAEC, sameAs, areaServed ES/GB, idiomas,
  horario).
- Páginas adelantadas de FASE 3 para no publicar enlaces rotos:
  `/sobre-mi` + `/en/about`, `/traduccion-jurada-britanicos-espana` +
  `/en/sworn-translation-british-residents-spain`, `/aviso-legal` +
  `/en/legal-notice`, `/politica-privacidad` + `/en/privacy-policy`.

## FASE 3 — Interiores y páginas nuevas

- **12 fichas de documento** (7 reescritas + 5 nuevas: permiso de conducir,
  certificado de empresa/nómina, DNI/pasaporte, testamento y herencia,
  certificado médico) con el patrón completo: 300-500 palabras, para qué
  trámites, apostilla sí/no, precio desde, plazo, cómo enviarlo, FAQ propia
  y schema Service + BreadcrumbList + FAQPage. Datos en `content/fichas.js`,
  plantilla en `components/DocumentPage.js`.
- Páginas nuevas: `/traductor-jurado-murcia` (landing local honesta) y
  `/como-funciona` + `/en/how-it-works`. **404 personalizada** con buscador
  de documentos.
- **Formulario del catálogo**: cláusula informativa RGPD, casilla
  obligatoria de aceptación y validación inline por campo (sin `alert()`),
  con `aria-invalid` y foco al primer error. Catálogo ampliado con 3
  documentos.
- Interiores al sistema (precios con filas nuevas, contacto con Murcia y
  redes, FAQ con chevron, guías generadas desde las fichas).
- `LanguageSwitcher` con mapa completo ES↔EN y fallback a la sección más
  cercana; sitemap con todas las rutas nuevas.

## FASE 4 — Blog

- 6 posts nuevos en español (tabla 5.3): permiso de conducir, casarse en
  España con extranjero, visado del Reino Unido, estudiar en Reino Unido,
  cuánto tarda una traducción jurada y validez del PDF con firma
  electrónica (con la referencia del aviso de la OIL de 6/4/2020 y el
  art. 10 de la Ley 39/2015). 600-900 palabras, H2 en forma de pregunta,
  enlaces a fichas y CTA de WhatsApp prellenado.
- **Blog EN**: `/en/blog` con los 2 posts de la tabla (NIE/TIE y compra de
  vivienda), en `content/posts.en.js`.
- Refactor del blog: `BlogPosting` + BreadcrumbList, OG por post, miga de
  pan, relacionados por tags, CTA final; los 8 posts antiguos ganan autor,
  `updated` y tags, y **ninguna imagen se repite** (9 recortes propios).

## FASE 5 — Cierre y verificación

- **Lighthouse móvil** (home, ficha del permiso de conducir y post de
  plazos): **rendimiento 95-97 · accesibilidad 100 · SEO 100** —
  el único hallazgo (migas de pan distinguibles solo por color) se corrigió
  con subrayado sutil (`.link-crumb`).
- Detector de anti-patrones de Impeccable sobre `app` y `content`:
  **0 hallazgos**.
- Verificación Playwright (`scripts/verify-site.mjs`): 35 páginas × 390/768/
  1440 px, ES y EN — 0 errores de consola, 0 enlaces internos rotos,
  contraste de titulares correcto, header a 64 px, barra móvil/flotante
  correctos, banner de cookies ≤ 420 px, 404 con status esperado.
- Sin tocar: URLs existentes, Stripe (`app/api/create-checkout-session`),
  Web3Forms y GA4/CookieConsent (solo cambió la presentación del banner).

---

## Lista de [[COMPLETAR]] (datos que solo Elena puede aportar)

| Dato | Estado |
|---|---|
| NIF de la titular (48399700H) | ✅ Completado en las 6 páginas legales (25/08/2026) |
| Dirección fiscal (Carril de los Leales, 10, C.P. 30009, La Arboleja, Murcia) | ✅ Completado (25/08/2026) |
| Horario de atención (L-V 09:00-20:00) | ✅ Completado en el JSON-LD del footer (25/08/2026) |
| URL de la ficha de Google Business | ⏳ Pendiente — `content/reviews.js` (activa el enlace de reseñas) y `app/layout.js` (sameAs del JSON-LD) |
| URLs de Instagram y Facebook (`instagram.com/juradaexpress`, `facebook.com/juradaexpress`) | ✅ Confirmadas por Elena (25/08/2026) |

## Pendientes que no dependen de código

- **Reseñas reales**: añadirlas a `content/reviews.js` (formato documentado
  dentro del archivo) y la sección Opiniones aparecerá sola.
- **Foto profesional de Elena**: sustituirá al monograma E.P. en la home y
  en `/sobre-mi`.
- **Vídeo del proceso** (10-15 s, < 1,5 MB): rellenar `PROCESS_VIDEO` en
  `content/site.js`; el contenedor ya está preparado.
- **Proyecto duplicado de Vercel** `juradaexpress-web-ento`: falla en cada
  push por su propia configuración; conviene eliminarlo o desconectarlo del
  repo desde el panel de Vercel.
- Dos posts del blog llevan fecha de septiembre/octubre de 2026 (según el
  brief); si se prefiere que ninguna fecha sea futura, basta cambiar
  `date`/`updated` en `content/posts.js`.
