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
`docs/capturas/2026-09/fase-3` (blog y los seis posts nuevos) y
`docs/capturas/2026-09/fase-2b` (hub, páginas de país, menú y post 4).

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

## Comprobaciones posteriores al cierre (07/09/2026)

- **`main` intacto**: `origin/main` sigue en `d41e734`; los commits del
  encargo están solo en `claude/vibrant-sagan-gw5kig` (PR #17, borrador).
- **Recorrido de todas las URL del sitemap**: el preview de Vercel exige
  inicio de sesión (SSO) desde el entorno de Claude Code, así que el
  recorrido se hizo sobre el mismo commit servido en local con
  `next start`. Antes de la FASE 2B (commit `2083688`): las 53 URL
  anteriores al encargo y las 69 URL del sitemap devolvían 200 con el mismo
  path, sin redirecciones. Tras la FASE 2B: las **79 URL** del sitemap
  devuelven 200 con el mismo path (0 fallos, 0 redirecciones). Queda por
  repetir el recorrido sobre el preview cuando Elena lo abra desde su cuenta
  de Vercel.
- El botón flotante de WhatsApp y la barra inferior móvil conservan el
  texto genérico; los textos específicos ("Hola Elena, …" / "Hi Elena, …")
  están solo en los CTA de cada página nueva.

---

## FASE 2B — Hub por países, Irlanda, Canadá y Australia

### 2B.1 Hub `/traduccion-jurada-por-paises` ⇄ `/en/sworn-translation-spain-by-country`

- `content/paises.js` (datos ES/EN) y `app/components/CountryHubPage.js`
  (plantilla). H1 ES "Traducción jurada español-inglés para clientes de
  cualquier país", primer párrafo autónomo, doce tarjetas con el mismo
  componente `CountryCard` (sin banderas ni mapas): Reino Unido, Estados
  Unidos, India, Irlanda, Canadá y Australia enlazan a su página; Nueva
  Zelanda, Sudáfrica, Gibraltar, Pakistán, Nigeria y Filipinas enlazan a su
  sección con ancla (`#nueva-zelanda`, `#sudafrica`, `#gibraltar`,
  `#pakistan`, `#nigeria`, `#filipinas`; en EN `#new-zealand`,
  `#south-africa`, `#gibraltar`, `#pakistan`, `#nigeria`, `#philippines`).
  Cada sección tiene 137-172 palabras y cubre trámites habituales, autoridad
  de apostilla o legalización (fuente oficial enlazada) y la exigencia de
  que el documento llegue en inglés. Cierre "¿Tu país no está? Escríbeme: el
  proceso es el mismo" con CTA. JSON-LD Service (areaServed con los 7 países
  + NZ/ZA/GI/PK/NG/PH + Worldwide) + FAQPage + BreadcrumbList. Enlaces a las
  páginas de documento, nómada digital y USCIS.
- Autoridades comprobadas (07/09/2026, vía búsqueda web con resultado en la
  fuente oficial): Nueva Zelanda, Authentication Unit del Department of
  Internal Affairs (govt.nz); Sudáfrica, DIRCO Legalisation Section y
  registrador del High Court (dirco.gov.za); Gibraltar, Civil Status and
  Registration Office (gibraltar.gov.gi); Pakistán, Ministry of Foreign
  Affairs, Convenio en vigor desde el 9 de marzo de 2023 (mofa.gov.pk);
  Filipinas, DFA Office of Consular Affairs, Convenio desde el 14 de mayo de
  2019 (apostille.gov.ph); Nigeria, no figura en la tabla de la HCCH, así
  que legalización consular, remitiendo al consulado para el circuito exacto.

### 2B.2 Páginas de país (ES + EN, plantilla ServicePage)

| ES | EN | Palabras (main, ES/EN) |
|---|---|---|
| `/traduccion-jurada-irlanda` | `/en/sworn-translation-ireland-spain` | 1.072 / 1.059 |
| `/traduccion-jurada-canada` | `/en/sworn-translation-canada-spain` | 1.233 / 1.250 |
| `/traduccion-jurada-australia` | `/en/sworn-translation-australia-spain` | 1.212 / 1.196 |

(El recuento incluye pasos, FAQ y enlaces de la plantilla, como en las
páginas de la FASE 2; el cuerpo redactado queda dentro de 800-1.100.) Las
tres cubren los dos sentidos, enlazan la fuente oficial en el texto, remiten
al organismo de destino en lo que no se ha podido confirmar y no dan cifras
ni plazos administrativos. Titles ≤ 60 y descriptions ≤ 155 en las ocho
páginas nuevas (hub incluido).

**Afirmaciones sobre IRCC y Home Affairs y su fuente.** canada.ca y
homeaffairs.gov.au no eran accesibles directamente desde el entorno
(bloqueo de red); las reglas se confirmaron con búsquedas web cuyo resumen
citaba la página oficial, que es la que se enlaza. Conviene que Elena abra
las cuatro URL antes de publicar:

| Afirmación en la página | Fuente enlazada |
|---|---|
| IRCC: los documentos que no estén en inglés o francés se presentan con traducción; si el traductor no es miembro en activo de una asociación de traductores certificados, hace falta un affidavit del traductor y una copia certificada del original; ni familiares ni representantes pueden traducir | https://ircc.canada.ca/english/helpcentre/answer.asp?qnum=018&top=4 |
| IRCC: qué es el affidavit de traducción (declaración jurada ante autoridad competente de que domina los idiomas y la traducción es exacta) | https://ircc.canada.ca/english/helpcentre/answer.asp?qnum=040&top=4 |
| Canadá aplica el Convenio de La Haya desde el 11 de enero de 2024; apostilla de Global Affairs Canada (federal y mayoría de provincias) o de Alberta, Columbia Británica, Ontario, Quebec y Saskatchewan | https://www.international.gc.ca/gac-amc/about-a_propos/services/authentication-authentification/index.aspx?lang=eng |
| Home Affairs: traducciones al inglés de todo documento en otro idioma; dentro de Australia, traductor acreditado por NAATI; fuera de Australia, sin NAATI pero con nombre completo, dirección, teléfono, cualificaciones y experiencia del traductor | https://immi.homeaffairs.gov.au/help-text/evidence/Pages/et-h0012.aspx |
| Home Affairs: comprobaciones antes de solicitar (traducciones) | https://immi.homeaffairs.gov.au/check-twice-submit-once/visitor-visa |
| Apostilla australiana: DFAT a través de la Australian Passport Office, con cita y verificación en línea | https://www.smartraveller.gov.au/consular-services/notarial-services/documents-in-australia |
| Irlanda: Immigration Service Delivery pide "full and certified translation" con confirmación de exactitud y datos de contacto del traductor | https://www.irishimmigration.ie/how-to-make-a-certified-translation-of-a-document/ |
| Apostilla irlandesa: Department of Foreign Affairs | https://authentications.dfa.ie/ |

Lo que **no** se afirma y se remite al organismo de destino: si IRCC acepta
la certificación de una traductora jurada española sin affidavit (la página
dice claramente que el nombramiento del MAEC no es una membresía de
asociación canadiense y que hay que contar con el affidavit); qué formato
de traducción aceptan las universidades y colegios profesionales
australianos y neozelandeses; si cada organismo irlandés acepta el impreso
multilingüe del Reglamento (UE) 2016/1191 en lugar de la traducción.

### 2B.3 Menú, footer, LanguageSwitcher, sitemap y JSON-LD

- `content/servicios/routes.js`: cuatro pares nuevos (Irlanda, Canadá,
  Australia, hub) y `INTERNATIONAL_MENU_GROUPS` (Servicios: nómada digital ·
  USCIS · urgentes; Por país: Reino Unido · Estados Unidos · India · Irlanda
  · Canadá · Australia · Todos los países → hub).
- `MainNav.js`: desplegable "Internacional" en dos columnas con rótulos de
  grupo; `MobileNav.js`: acordeón "Internacional" con los dos grupos
  (abierto automáticamente cuando la página activa está dentro).
- Footer "Clientes internacionales" = seis países + hub (ES/EN).
- `LanguageSwitcher` y `sitemap.xml` toman los pares de `SERVICE_ROUTES`:
  las cuatro páginas nuevas ES/EN entran con hreflang.
- JSON-LD ProfessionalService: IE, CA y AU en `hasOfferCatalog`
  (`SERVICE_LINES`) y NZ, ZA, GI, PK, NG y PH en `areaServed`
  (`EXTRA_AREA_SERVED` en `content/site.js`).
- `SectionHeading` ahora propaga `id` y otros atributos: los
  `aria-labelledby` de las plantillas apuntan a ids que existen.

### 2B.4 Sin banderas

- Home ES/EN, sección para británicos: `foto-bandera-uk.jpg` sustituida por
  `escritorio-documentos.jpg` (documentos sobre escritorio) y archivo
  eliminado del repo. Las páginas de británicos no tienen imagen. Revisión
  del resto del sitio: solo dos posts del blog usaban banderas como imagen
  principal (`post-conducir.jpg`, `post-visado-uk.jpg`); ambas sustituidas
  por recortes de documentos con su alt nuevo. Créditos en
  `docs/CREDITOS-IMAGENES.md`.

### 2B.5 Enlazado interno

- Cada página de país enlaza al hub, a nómada digital, a tres páginas de
  documento (nacimiento, penales, título; en EN, como guías en español) y,
  solo Estados Unidos, a USCIS. El hub enlaza a las seis páginas de país,
  DNV, USCIS, urgentes y las tres páginas de documento.
- Home, sección para británicos: última frase "Si vienes de Estados Unidos,
  India, Irlanda, Canadá o Australia, tienes tu propia guía" enlazando al
  hub (ES/EN).

### 2B.6 Blog

- `/blog/traduccion-jurada-para-irse-de-espana-reino-unido-irlanda-canada-australia`
  (18/11/2026) y
  `/en/blog/sworn-translations-leaving-spain-uk-ireland-canada-australia`
  (20/11/2026): qué pide cada país a una traducción hecha desde España
  (UKVI, ISD, IRCC, Home Affairs) con la fuente oficial, cuándo apostillar
  y en qué orden; enlazan a las guías de país y a urgentes. Imágenes
  `post-irse-de-espana.jpg` y `post-leaving-spain.jpg`.

### 2B.7 Verificación

- `public/llms.txt` actualizado con las cuatro páginas nuevas (ES/EN), el
  servicio de traducción certificada para UKVI/ISD/IRCC/Home Affairs y los
  seis países resumidos.
- `npm run build` sin errores ni avisos: 86 rutas estáticas.
- Playwright (`scripts/verify-2026-09.mjs`, capturas en
  `docs/capturas/2026-09/fase-2b/`): 16 páginas (home ES/EN, hub ES/EN,
  Irlanda/Canadá/Australia ES/EN, post 4 ES/EN, los dos posts con imagen
  sustituida, blog ES/EN) a 390/768/1440 px, 0 errores de consola, 0
  enlaces internos rotos, `lang` correcto. Capturas adicionales del
  desplegable de escritorio (ES/EN), del acordeón móvil (ES/EN) y del ancla
  `#pakistan` del hub (aterriza a 96 px del borde superior, con
  `scroll-mt-24`).
- `npx impeccable detect app content`: **0 hallazgos**.
- **Lighthouse móvil**:

  | Página | Rendimiento | Accesibilidad | Buenas prácticas | SEO |
  |---|---|---|---|---|
  | `/traduccion-jurada-por-paises` | 96 | 100 | 100 | 100 |
  | `/traduccion-jurada-canada` | 96 | 100 | 100 | 100 |

- Sin tocar: URLs existentes, Stripe, Web3Forms y GA4/CookieConsent.

---

## Lista de [[COMPLETAR]] (datos que solo Elena puede aportar)

| Dato | Dónde | Estado |
|---|---|---|
| Día exacto de cada reseña (las fechas salen de "3 days ago", "6 days ago", "1 week ago" leídos el 07/09/2026) | `content/reviews.js` | ⏳ Opcional |
| Tarifa fija del envío internacional en papel | `content/site.js` → `INTERNATIONAL_SHIPPING.price` | ⏳ Opcional; mientras tanto "coste del transportista en el presupuesto" |
| Precio orientativo del pack de nómada digital | `content/site.js` → `DNV_PACK_PRICE` | ⏳ Opcional; mientras tanto "presupuesto cerrado en menos de 2 h" |
| Foto profesional de Elena (sustituye al monograma E.P. en la home y en /sobre-mi) | `app/(es)/page.js`, `app/en/page.js`, `app/(es)/sobre-mi`, `app/en/about` | ⏳ Pendiente |
| URL de origen de las fotos base usadas para los recortes | `docs/CREDITOS-IMAGENES.md` | ⏳ Si se conservan |
| Si Elena ofrece el affidavit notarial que exige IRCC a un traductor no certificado en Canadá, y su coste (la nota de la página dice "vemos cómo obtenerlo") | `content/servicios/canada.js` (comentario junto a la nota, ES y EN) | ⏳ Pendiente |
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
