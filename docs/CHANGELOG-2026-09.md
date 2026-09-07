# Changelog · Expansión internacional de juradaexpress.es (septiembre 2026)

Trabajo realizado según `docs/BRIEF-INTERNACIONAL-2026-09.md` (fuente de
verdad), en la rama `claude/vibrant-sagan-gw5kig`
([PR #17](https://github.com/teacherelenaia/juradaexpress-web/pull/17)).
El brief pedía la rama `mejora/internacional-2026-09`; el entorno de Claude
Code en la web asigna su propia rama, y el PR y el preview de Vercel
funcionan igual.

**Capturas**: `docs/capturas/2026-09/antes/` (home ES/EN, contacto y precios
a 390 y 1440 px antes del encargo), `docs/capturas/2026-09/despues/` (las
mismas páginas al cerrar), `docs/capturas/2026-09/fase-2` (las 25 páginas
tocadas en las fases 1 y 2, incluidos los 404, a 390/768/1440 px) y
`docs/capturas/2026-09/fase-3` (blog y los seis posts nuevos).

---

## FASE 0 — Datos y reseñas reales

- `content/reviews.js`: las **7 reseñas literales** de la ficha de Google
  Business (5,0 · 7 reseñas a 07/09/2026), con criterio editorial (4
  destacadas: Ona Montes Vivancos, Jesus Gomez, Paul Capelle, Emilia
  Crawley) y publicación de todas en ambos idiomas, en su idioma original.
  Las fechas salen de las etiquetas relativas de Google y pueden bailar un
  día.
- `content/site.js`: `GOOGLE_RATING`, `GOOGLE_REVIEW_COUNT` (se actualizan
  a mano), `SERVICE_COUNTRIES`, `TIMEZONE_NOTE`, `INTERNATIONAL_SHIPPING`,
  `LARGE_PROJECT_CAPACITY` (hasta 500 páginas por semana),
  `USCIS_PAPER_COPY`, `DNV_PACK_PRICE` (null → "presupuesto cerrado en
  menos de 2 h"). `GOOGLE_BUSINESS_URL` unificada: `reviews.js` la importa
  de `site.js`.
- El brief queda guardado en `docs/BRIEF-INTERNACIONAL-2026-09.md`.

## FASE 1 — Layout, metadatos y home (ES y EN)

- **Metadatos globales** internacionales: title por defecto "Traductor
  Jurado Español-Inglés Online | Jurada Express" (55 caracteres) y
  description ≤ 155; réplica EN en `app/en/layout.js`. La home comparte
  segmento con su layout, así que lleva el sufijo de marca explícito.
- **JSON-LD `ProfessionalService`** ampliado (`components/SiteShell.js`):
  `areaServed` ES, GB, IE, US, CA, IN, AU + Worldwide, `knowsLanguage`,
  `contactPoint` con `availableLanguage`, `hasOfferCatalog` con las cuatro
  líneas de servicio enlazadas, `aggregateRating` solo si hay reseñas
  publicables (se lee en build). Schema `Person` completo en `/sobre-mi` y
  `/en/about` (jobTitle, identifier 7310, sameAs a Google y redes,
  worksFor).
- **Home ES/EN**: hero con subtítulo internacional y párrafo en primera
  persona (digital, tarjeta desde cualquier país, PDF firmado, USCIS);
  **franja de confianza** (`components/TrustStrip.js`: MAEC nº 7310, 5,0 en
  Google · 7 reseñas con enlace, entrega 24/48 h, tarjeta internacional);
  sección **"¿Vas a pedir el visado de nómada digital?"** con imagen y
  lista de 5 documentos; enlaces a EEUU e India en la sección británica;
  franja **"Proyectos grandes en plazos cortos"** con la capacidad
  confirmada; "Sobre mí" con países y `TIMEZONE_NOTE`; **tres FAQ nuevas**
  (fuera de España, USCIS, expediente completo) y JSON-LD FAQPage.
- **Opiniones** (`components/Reviews.js`): cabecera con "5,0 · 7 reseñas en
  Google", cuatro reseñas completas sin recortar con etiqueta de idioma y
  botón "Ver las 7 en Google".

## FASE 2 — Páginas nuevas (ES + EN)

- Plantilla `components/ServicePage.js` (H1 único, primer párrafo que
  responde por sí solo a la pregunta de la página, H2 en forma de pregunta,
  tabla de documentos, "Cómo lo hacemos" en 4 pasos estáticos, FAQ con
  JSON-LD FAQPage, schema Service + BreadcrumbList, CTA de WhatsApp con
  texto prellenado específico, enlaces a fichas, precios y catálogo) y
  contenido en `content/servicios/*.js`:
  - `/traduccion-jurada-visado-nomada-digital` ⇄
    `/en/sworn-translation-spain-digital-nomad-visa`
  - `/traduccion-certificada-uscis` ⇄ `/en/certified-translation-uscis`
  - `/traduccion-jurada-estados-unidos` ⇄ `/en/sworn-translation-usa-spain`
  - `/traduccion-jurada-india` ⇄ `/en/sworn-translation-india-spain`
  - `/traduccion-jurada-urgente-grandes-volumenes` ⇄
    `/en/urgent-sworn-translation-large-projects`
- **Navegación**: ítem "Internacional" con desplegable (nómada digital,
  USCIS, Estados Unidos, India, Reino Unido) en escritorio y grupo en el
  menú móvil; sustituye a "Preguntas Frecuentes" para no pasar de 6 ítems
  (las FAQ siguen en el footer). En `/en` el menú, el CTA del header y el
  footer se muestran en inglés. Footer con columna "Clientes
  internacionales". `LanguageSwitcher` con las cinco parejas; sitemap con
  `lastModified` real y hreflang.
- `/contacto` y `/en/contacto`: bloque "Si me escribes desde fuera de
  España" (horario, +34 685 891 214 con WhatsApp desde cualquier país,
  email, pago con tarjeta internacional, entrega PDF + papel según
  `INTERNATIONAL_SHIPPING`). `/precios` y `/en/precios`: filas de USCIS y
  expediente de nómada digital, nota de precios en euros.
- **Correcciones previas a la FASE 3** (revisión de Elena):
  - `<html lang="en">` en todas las páginas `/en/*` mediante **route groups
    con dos root layouts** (`app/(es)/layout.js` y `app/en/layout.js`) sin
    cambiar ninguna URL. Con dos root layouts no puede existir un
    `app/not-found.js` global: cada grupo tiene su `not-found.js` (el EN es
    nuevo) y un catch-all `[...rest]/page.js` que lanza `notFound()`. Todas
    las páginas reales siguen siendo estáticas; solo las URL desconocidas
    se resuelven bajo demanda. Next 14 sirve ese 404 con su propio shell y
    pierde el `lang`, así que `components/HtmlLang.js` lo repone en el
    cliente solo en las páginas 404.
  - Footer localizado en inglés.
  - Titles ≤ 60 (absolutos, sin sufijo de marca; la marca va en OG y
    JSON-LD) y descriptions ≤ 155 en las 10 páginas nuevas.
  - Texto de WhatsApp prellenado y específico en cada página ("Hola
    Elena, estoy preparando el expediente del visado de nómada digital…",
    "Hi Elena, I need a certified translation for USCIS of…", etc.).

## FASE 3 — Blog

- 3 posts ES y 3 EN (700-800 palabras, H2 en forma de pregunta, enlaces
  internos a las páginas de la FASE 2, CTA de WhatsApp prellenado, imagen
  propia por post, fechas entre septiembre y noviembre de 2026):
  - Documentos para el visado de nómada digital: cuáles necesitan apostilla
    y traducción jurada / Spain digital nomad visa documents: which need an
    apostille and a sworn translation.
  - Traducción jurada o traducción certificada: qué pide USCIS y qué pide
    España / Sworn vs certified translation: what USCIS requires and what
    Spain requires.
  - Documentos indios para un visado de España: apostilla del MEA y
    traducción jurada / Indian documents for a Spanish visa: MEA apostille
    and sworn translation.

## FASE 4 — Visibilidad en motores de IA (GEO)

- `public/llms.txt` (formato llmstxt.org) en ES y EN: identidad, datos
  clave, servicios, países y páginas clave con una línea de descripción.
  Enlazado desde `robots.txt`.
- **Decisión sobre rastreadores de IA**: `robots.txt` permite todo el sitio
  a todos los user-agents, incluidos GPTBot, ClaudeBot, PerplexityBot y
  Google-Extended, porque el objetivo del encargo es que los motores de
  respuesta citen la web. Solo se excluye `/api/` (Stripe). Si algún día se
  quiere limitar el uso para entrenamiento sin perder las citas, la vía es
  añadir bloques `User-agent: Google-Extended` / `GPTBot` con `Disallow: /`
  en ese archivo.
- Primer párrafo autónomo tras el H1 en las diez páginas nuevas
  (definición + quién + para qué + plazo).
- **Consistencia de entidad**: "Jurada Express" (con espacio) en title,
  JSON-LD, footer, OG, textos y mensajes de WhatsApp; "JuradaExpress" queda
  solo como logotipo del header/footer y como `alternateName`.

## FASE 5 — Cierre y verificación

- **Lighthouse móvil** (Chromium headless, throttling simulado):

  | Página | Rendimiento | Accesibilidad | Buenas prácticas | SEO |
  |---|---|---|---|---|
  | `/` | 95 | 100 | 100 | 100 |
  | `/traduccion-jurada-visado-nomada-digital` | 98 | 100 | 100 | 100 |
  | `/en/certified-translation-uscis` | 96 | 100 | 100 | 100 |

- `npx impeccable detect app content`: **0 hallazgos** (el único hallazgo
  intermedio, un borde lateral grueso en las notas destacadas, se corrigió).
- Verificación Playwright (`scripts/verify-2026-09.mjs`): todas las páginas
  tocadas a 390/768/1440 px, ES y EN, con 0 errores de consola, 0 enlaces
  internos rotos, contraste de titulares, header a 64 px, barra móvil y 404
  con status esperado. `lang` comprobado en ES, EN y en los dos 404.
- `npm run build` sin errores ni avisos (76 rutas estáticas).
- Sin tocar: URLs existentes, Stripe (`app/api/create-checkout-session`,
  comprobado con una petición de prueba), Web3Forms (solo cambió el asunto
  del email a "Jurada Express") y GA4/CookieConsent.

### Imágenes

Unsplash y Pexels no eran accesibles desde el entorno (política de red),
así que las 12 imágenes nuevas son recortes propios de fotos con licencia
libre ya presentes en el repo (`scripts/crop-image.mjs`). Detalle en
`docs/CREDITOS-IMAGENES.md`.

### Scripts nuevos

- `scripts/verify-2026-09.mjs`: verificación Playwright parametrizable
  (`PAGES_JSON`, `OUT_DIR`, `ALLOW_404`).
- `scripts/crop-image.mjs`: recorte y compresión de imágenes con Chromium.
- `scripts/shot-el.mjs` y `scripts/shot-pages.mjs`: capturas de elementos y
  páginas para revisión visual.

---

## Lista de [[COMPLETAR]] (datos que solo Elena puede aportar)

| Dato | Dónde | Estado |
|---|---|---|
| Día exacto de cada reseña (las fechas salen de "3 days ago", "6 days ago", "1 week ago" leídos el 07/09/2026) | `content/reviews.js` | ⏳ Opcional |
| Tarifa fija del envío internacional en papel | `content/site.js` → `INTERNATIONAL_SHIPPING.price` | ⏳ Opcional; mientras tanto "coste del transportista en el presupuesto" |
| Precio orientativo del pack de nómada digital | `content/site.js` → `DNV_PACK_PRICE` | ⏳ Opcional; mientras tanto "presupuesto cerrado en menos de 2 h" |
| Foto profesional de Elena (sustituye al monograma E.P. en la home y en /sobre-mi) | `app/(es)/page.js`, `app/en/page.js`, `app/(es)/sobre-mi`, `app/en/about` | ⏳ Pendiente |
| URL de origen de las fotos base usadas para los recortes | `docs/CREDITOS-IMAGENES.md` | ⏳ Si se conservan |
| `GOOGLE_RATING` / `GOOGLE_REVIEW_COUNT` | `content/site.js` | ✅ 5,0 · 7 (07/09/2026); actualizar a mano cuando cambien |

## Pendientes que no dependen de código (Google Business Profile)

- Ocultar la dirección "Carril de Los Leales, 10, La Arboleja" (Editar
  perfil → Ubicación → desactivar "Mostrar dirección" → zona de servicio
  España).
- Añadir en "Servicios": "Traducción certificada para USCIS", "Traducción
  jurada para visado de nómada digital", "Proyectos urgentes y grandes
  volúmenes".
- Descripción del perfil con una frase sobre clientes internacionales y
  USCIS. Propuesta: "Traductora jurada de inglés nombrada por el MAEC (nº
  7310). Traducción jurada español-inglés con validez oficial y traducción
  certificada para USCIS, 100 % online: clientes en España, Reino Unido,
  Estados Unidos, India y cualquier país. Presupuesto en menos de 2 h y
  entrega en PDF firmado en 24/48 h."
