# Auditoría y plan de mejora · juradaexpress.es

**Fecha:** 25/08/2026 · **Auditado por:** Claude, siguiendo el protocolo del proyecto (Taste Skill → Emil → Impeccable → verificación en navegador)
**Fuente:** repositorio público `teacherelenaia/juradaexpress-web` (Next.js 14 + Tailwind 3.4, desplegado en Vercel), commit `0341e38` de 24/08/2026, construido y capturado en escritorio (1440px) y móvil (390px).

---

## 1. Estado actual en una página

**Lo que funciona y hay que conservar**

- Base técnica sólida: Next.js App Router, sitemap dinámico, metadatos y hreflang ES/EN en las páginas principales, JSON-LD (ProfessionalService y FAQPage), GA4 condicionado al consentimiento, catálogo de documentos con formulario y pago Stripe, 7 páginas de aterrizaje por tipo de documento y 8 posts de blog bien enlazados entre sí.
- Paleta de marca coherente (azul marino `#0B2545` + dorado `#C9A24B`): transmite "oficial y de confianza". Se mantiene.
- Copy claro y honesto, con propuesta de valor concreta (24/48 h, 100% digital, nº de acreditación 7310 visible).
- Cero errores de consola en escritorio y móvil.

**Puntuación Impeccable audit (0-4 por dimensión)**

| # | Dimensión | Nota | Hallazgo clave |
|---|---|---|---|
| 1 | Accesibilidad | 2 | Texto dorado pequeño sobre blanco no llega a 4.5:1; sin skip-link; foco visible solo por defecto del navegador |
| 2 | Rendimiento | 2 | Hero con `<img>` sin optimizar (112 KB JPG 1920×1080), sin `priority`, sin AVIF/WebP; imágenes de 1600×2400 servidas para tarjetas de 400px |
| 3 | Responsive | 3 | Funciona, pero el botón flotante de WhatsApp tapa los sellos del hero en móvil y el banner de cookies cubre los CTA |
| 4 | Theming | 2 | Tokens de color bien, pero reglas globales en `globals.css` (`a { underline }`, `h2 { text-slate-900 }`, `p { my-4 }`) pisan los componentes y provocan bugs visuales |
| 5 | Integridad de implementación | 2 | Patrones genéricos: tres tarjetas iguales en 4 secciones, "kicker" dorado sobre cada título, divisores en onda, testimonios de ejemplo, enlace `PLACEHOLDER` |
| | **Total** | **11/20** | **Aceptable — necesita trabajo significativo, pero sin rehacer nada** |

---

## 2. Errores a corregir ya (P0 / P1)

| Prio | Problema | Dónde | Impacto |
|---|---|---|---|
| P0 | El título **"¿Empezamos?"** del bloque CTA final es invisible: azul oscuro sobre fondo azul oscuro. La regla global `h2 { text-slate-900 }` de `globals.css` gana al bloque `text-white`. | `app/page.js` L416 y `app/en/page.js` (mismo bloque) | El CTA principal de cierre pierde su titular en la web publicada |
| P0 | Enlace **"Ver todas en Google Business" apunta a `https://g.page/r/PLACEHOLDER`** en producción, en ES y EN. | `app/page.js` L401, `app/en/page.js` L408 | Enlace roto en la zona de confianza; señal negativa para usuarios y para Google |
| P1 | **Testimonios de ejemplo** ("María G.", "Javier R.", "Elisa P.") presentados como "reseñas verificadas". | Sección Opiniones ES/EN | Riesgo reputacional y legal (LSSI/consumo); sustituir por reseñas reales de Google o retirar la sección hasta tenerlas |
| P1 | **Faltan las páginas legales**: aviso legal, política de privacidad y política de cookies. Hay banner de cookies con GA4 pero ningún enlace a la política; hay formulario con datos personales sin cláusula RGPD. | Footer, `DocumentCatalog.js` | Obligatorio en España (LSSI-CE, RGPD/LOPDGDD). Google también lo tiene en cuenta para confianza |
| P1 | **Título y meta de la home desalineados con el negocio**: "Traducción Jurada en Murcia \| Traductor Jurado en Murcia" y descripción "ofrecemos la mejor traducción jurada en murcia" (minúscula, repetitiva), mientras el H1 y todo el contenido hablan de servicio nacional/Reino Unido 100% digital. | `app/page.js` metadata | Se compite solo por la búsqueda local y se desaprovecha "traductor jurado inglés" / "traducción jurada online", de mucho más volumen |
| P1 | Botones con **subrayado** (regla global `a { underline }`): "Pedir presupuesto", "Ver precios", "WhatsApp inmediato" y el CTA dorado del header salen subrayados. | Todo el sitio | Aspecto de "web montada", no diseñada |
| P1 | Logo pegado al menú ("JuradaExpressInicio") en escritorio; ningún enlace indica la página activa. | `app/layout.js` header | Navegación poco cuidada |
| P1 | Contraste: `text-brand-gold-600` (#B08935) sobre blanco = 3.2:1 en iconos y textos pequeños (medido). `brand-gold-700` (#8C6D2A) sí cumple con 4.8:1 y es el único dorado válido como texto sobre blanco. | Chips del hero, "Aceptado por", iconos de check | Incumple WCAG AA en texto pequeño |
| P2 | Botón flotante de WhatsApp solapa los sellos del hero en móvil; banner de cookies a ancho completo tapa los CTA en escritorio y móvil. | `CookieConsent.js` | Fricción justo en el momento de conversión |
| P2 | `html, body` con `bg-slate-50` en CSS y `bg-white` en layout: fondos incoherentes entre secciones; ondas divisoras "text-slate-50" que no casan con el fondo siguiente. | `globals.css`, `page.js` | Cortes visuales visibles en las capturas |
| P2 | Sin página 404 personalizada; sin skip-link; sin `prefers-reduced-motion`. | — | Accesibilidad y acabado |
| P2 | Blog sin `BlogPosting`/`Article` schema, sin autor, sin OG por post, sin hreflang; la versión EN no tiene blog. | `app/blog/[slug]/page.js` | Menos visibilidad en Google Discover/EN |
| P2 | El `LanguageSwitcher` manda al home cuando la página no tiene equivalente (blog, fichas de documento). | `LanguageSwitcher.js` | Pérdida de contexto al cambiar de idioma |

---

## 3. Auditoría de diseño (Taste Skill · redesign-existing-projects)

**Diagnóstico:** la web es correcta pero "promedia hacia la plantilla": tipografía del sistema sin carácter, cuatro secciones seguidas con tres tarjetas idénticas (documentos, ventajas, proceso, opiniones), una barra dorada ("kicker") encima de cada H2, ondas SVG como divisores, tarjetas borde+sombra+blanco en todas partes, hero de imagen genérica generada (globo terráqueo + sello) y un avatar "EP" en lugar de la persona real. Nada de esto rompe la web, pero hace que no se distinga de cualquier web de traductor hecha con IA.

**Dirección visual acordada (se conserva la marca):**

- **Tono:** despacho profesional, oficial y cercano. Público: particulares que necesitan un trámite (nacionalidad, extranjería, universidad), británicos residentes en España y pymes. Lo que buscan es *seguridad* (que el organismo lo acepte) y *rapidez*.
- **Paleta:** se mantiene navy + dorado. Se limita el dorado a un único uso por pantalla (acento, no decoración), se elimina como color de texto pequeño y se crea un neutro cálido (`stone`) en lugar del gris frío `slate` para que el dorado no "chirríe".
- **Tipografía (mayor salto de calidad con menor riesgo):** display serif con carácter para titulares — **Newsreader** (Google Fonts, vía `next/font`, sin CLS) — y **Manrope** para cuerpo y UI. El serif aporta el aire "documento oficial / firma y sello" y la combinación con el dorado se lee premium. Cifras de precios con `tabular-nums`.
- **Layout:** eliminar ondas y kickers; alternar secciones en zig-zag (imagen/texto) con anchos distintos; "Cómo trabajamos" como línea temporal horizontal de 4 pasos con un único momento animado (la línea se dibuja al entrar en pantalla); "Documentos" como lista editorial con precio "desde" a la derecha y enlace a su ficha, no tarjetas iguales; "Por qué elegir" integrado en el hero como tres datos en una línea (no otra fila de tarjetas).
- **Hero:** titular serif grande con el par "Español ⇆ Inglés" en itálica dorada; a la derecha, sustituir la imagen generada por una **composición real**: una foto de documento con sello y firma (stock de calidad) con un sello SVG animado que aparece con `scale(0.95)→1` + opacidad. Si más adelante se graba vídeo real, este hueco admite un `<video>` silenciado con poster.
- **Sobre mí:** pasa a ser la sección de mayor confianza (E-E-A-T): foto profesional real (pendiente de Elena; mientras tanto, monograma tipográfico en serif, no un círculo genérico), nº 7310 con enlace al buscador oficial del MAEC, años de experiencia, combinación de idiomas, forma de trabajar.
- **Opiniones:** una sola cita grande real + insignia con la nota de Google y enlace real a la ficha. Sin reseñas reales, la sección no se publica.
- **Móvil:** barra inferior fija con dos acciones (WhatsApp / Pedir presupuesto), menú en panel deslizante con transición 200 ms ease-out, objetivos táctiles ≥ 44 px, banner de cookies compacto en tarjeta inferior izquierda que no tapa los CTA.

---

## 4. Movimiento (Emil Kowalski · emil-design-eng)

Ahora mismo no hay ninguna transición autorizada: los hovers cambian de golpe, el menú móvil aparece/desaparece sin transición y no hay feedback de pulsación. Cambios propuestos:

| Antes | Después | Por qué |
|---|---|---|
| Sin transición en botones y enlaces | `transition: transform 160ms var(--ease-out), background-color 160ms ease` con `--ease-out: cubic-bezier(0.23,1,0.32,1)` | Feedback inmediato sin sensación de lentitud |
| Sin estado `:active` | `transform: scale(0.97)` en `:active` de todos los botones | El botón "escucha" la pulsación |
| Menú móvil con `{open && …}` (aparece de golpe) | Panel siempre montado, `translateY(-8px)`+`opacity:0` → `0/1` en 200 ms ease-out; salida 150 ms | Nada aparece de la nada; salida más rápida que entrada |
| Hover en tarjetas sin gate táctil | Hovers dentro de `@media (hover:hover) and (pointer:fine)` | Evita hovers "pegados" al tocar en móvil |
| Sin entrada de contenido | Un solo momento autorizado: la línea del proceso se dibuja (`clip-path: inset(0 100% 0 0)` → `inset(0)` en 600 ms) al entrar en viewport, una vez | Explica el proceso; no se repite en cada sección |
| Sin `prefers-reduced-motion` | Se conservan opacidad/color; se eliminan desplazamientos | Accesibilidad |

Regla general para Claude Code: solo `transform`, `opacity`, `clip-path`; nada por encima de 300 ms en UI; nunca `ease-in`; nunca `transition: all`.

---

## 5. Contenido y SEO

### 5.1 Estrategia de palabras clave

| Intención | Palabra clave objetivo | Página |
|---|---|---|
| Nacional, principal | traductor jurado inglés · traducción jurada inglés español · traducción jurada online | Home (título/H1 nuevos) |
| Local | traductor jurado Murcia · traducción jurada Murcia | Nueva `/traductor-jurado-murcia` + Contacto |
| Nicho británico (ES) | traducción jurada para británicos en España · NIE traducción jurada · residencia Reino Unido España documentos | Nueva `/traduccion-jurada-britanicos-espana` |
| Nicho británico (EN) | sworn translator Spain · certified Spanish translation for NIE · official translation Spain residency | `/en` reescrita + nuevas `/en/sworn-translation-nie-residency`, `/en/blog` |
| Por documento (ya existen) | partida de nacimiento, título, penales, matrimonio, contrato, validez oficial | Reforzar con contenido real (300-500 palabras, FAQ propia, precio, plazo, apostilla sí/no) |
| Por documento (nuevas) | permiso de conducir · certificado de empresa/nómina · DNI/pasaporte · testamento/herencia · certificado médico | Nuevas fichas |

**Home:** título → «Traductor Jurado de Inglés · Traducción Jurada Online en 24/48 h | JuradaExpress»; meta → «Traductora jurada de inglés nombrada por el MAEC (nº 7310). Traducción jurada español-inglés con validez oficial, 100% online, entrega en 24/48 h en toda España y Reino Unido. Presupuesto en minutos.» H1 → «Traducción jurada Español ⇆ Inglés con validez oficial, en 24/48 h». La sección local de Murcia se mantiene en el cuerpo y en Contacto.

### 5.2 Apartados nuevos

1. **/sobre-mi** (y `/en/about`): trayectoria, acreditación con enlace al listado oficial del MAEC, cómo firma y sella, foto. Es la página que más confianza genera y hoy no existe.
2. **/traduccion-jurada-britanicos-espana** (+ `/en/sworn-translation-british-residents-spain`): guía por trámite (NIE/TIE, empadronamiento, compra de vivienda, matrimonio, carné de conducir, pensión), qué documento, si lleva apostilla, precio desde, plazo.
3. **/traductor-jurado-murcia**: landing local honesta (sin dirección física pública no procede LocalBusiness con mapa; sí "con sede en Murcia, entrega digital y en papel por mensajería").
4. **/como-funciona**: el proceso en detalle con la línea temporal, qué recibe el cliente (PDF firmado con certificado digital + papel), cómo pagar, qué pasa si el organismo pide papel.
5. **Fichas nuevas de documento**: permiso de conducir, certificado de empresa/nómina, DNI/pasaporte, testamento y documentos de herencia, certificado médico.
6. **Legales**: /aviso-legal, /politica-privacidad, /politica-cookies (con la tabla de cookies de GA4) + cláusula informativa en el formulario del catálogo + casilla de aceptación.
7. **404 personalizada** con buscador de documentos y CTA.
8. **Redes sociales**: iconos de Instagram y Facebook en header (móvil: en el panel), footer, página de contacto y `sameAs` del JSON-LD. Bloque "Síguenos" al final de la home y del blog. URLs a confirmar: `https://www.instagram.com/juradaexpress` y `https://www.facebook.com/juradaexpress`.

### 5.3 Blog: 8 posts nuevos (6 ES + 2 EN) con palabra clave y guion

| Slug | Título | Palabra clave | Puntos obligatorios |
|---|---|---|---|
| `traduccion-jurada-permiso-conducir` | Traducción jurada del permiso de conducir: cuándo hace falta y cuánto cuesta | traducción jurada carnet de conducir | Canje de permiso UK→ES tras el Brexit, DGT, precio desde 40 €, plazo 24 h, sin apostilla normalmente |
| `documentos-para-casarse-en-espana-con-extranjero` | Casarse en España con un ciudadano extranjero: documentos que necesitan traducción jurada | documentos matrimonio extranjero España traducción | Certificado de nacimiento, capacidad matrimonial, penales, empadronamiento; Registro Civil; vigencia 3-6 meses |
| `traduccion-jurada-visado-reino-unido` | Traducción jurada para un visado del Reino Unido (Skilled Worker, familiar, estudiante) | traducción jurada visado UK | UKVI exige "certified translation" con datos del traductor; equivalencia con jurada; qué documentos; plazos |
| `estudiar-en-reino-unido-traduccion-expediente` | Estudiar en Reino Unido: traducción jurada del expediente y del título para UCAS y universidades | traducción jurada expediente académico inglés | Bachillerato/EBAU, grado; qué piden las universidades; precio título 50 €, expediente por presupuesto |
| `cuanto-tarda-una-traduccion-jurada` | ¿Cuánto tarda una traducción jurada? Plazos reales por tipo de documento | cuánto tarda traducción jurada | Tabla de plazos; qué retrasa (escaneo, apostilla, sellos); urgencias |
| `traduccion-jurada-digital-firma-electronica` | ¿Es válida una traducción jurada en PDF con firma digital? | traducción jurada digital validez | Orden AUC/ Ministerio: validez de la firma electrónica; cuándo piden papel; cómo se verifica |
| `en/blog/sworn-translation-nie-tie-spain` | Sworn translation for your NIE/TIE application in Spain: what British citizens need | certified translation NIE Spain | Extranjería requirements, apostille vs EU rule, price, 24/48h |
| `en/blog/buying-property-in-spain-documents-translation` | Buying property in Spain: which documents need a sworn translation | sworn translation property purchase Spain | Notary, power of attorney, NIE, bank; when a translation is required |

Cada post: 600-900 palabras, H2 con preguntas reales, un CTA de WhatsApp con mensaje prellenado, enlaces internos a la ficha de documento correspondiente, `BlogPosting` schema con autor Elena Peñaranda, imagen propia (no repetir `real-consejos.jpg` en tres posts como ahora) y fecha real distinta.

### 5.4 Datos estructurados

- `ProfessionalService` → ampliar con `founder` (Person: Elena Peñaranda Ortega, `hasCredential` MAEC 7310), `sameAs` [Instagram, Facebook, WhatsApp, ficha de Google], `areaServed` [ES, GB], `availableLanguage` [es, en], `openingHoursSpecification`.
- `BreadcrumbList` en todas las páginas interiores.
- `BlogPosting` en cada post; `Service` en cada ficha de documento con `offers` (precio desde).
- Sitemap con `lastModified` real e inclusión de las páginas nuevas; `robots.txt` correcto (ya lo está).

---

## 6. Vídeo e imagen (sin material propio todavía)

- **Hero:** no usar vídeo de stock genérico (penaliza LCP y se ve "de banco de imágenes"). Usar una foto real de documento con sello/firma en primer plano (búsqueda en Unsplash/Pexels: "notary stamp document", "official seal signature paper", "passport documents desk") tratada con la paleta (viñeta navy, dorado solo en el sello SVG animado).
- **Sección "Cómo funciona":** preparar un contenedor `<video muted autoplay loop playsinline poster>` con un clip de Pexels de 10-15 s (búsqueda: "signing documents close up", "stamping document") comprimido a WebM/MP4 < 1,5 MB, desactivado en `prefers-reduced-motion` y en conexión lenta; cuando Elena grabe un vídeo propio de 30-45 s (móvil en horizontal, buena luz, mostrando el sello y el envío del PDF) se sustituye sin tocar código.
- **Instagram/Facebook:** además de los iconos, un bloque "Últimas publicaciones" con 3 embeds oficiales de Instagram cargados solo tras aceptar cookies (o, más simple y sin cookies, tres imágenes propias enlazadas al perfil).
- **Fotos de fichas y blog:** una imagen distinta por post/ficha, todas con el mismo tratamiento (encuadre cercano, luz cálida, paleta neutra) para que parezcan de la misma sesión. Formato AVIF/WebP vía `next/image`.
- **Foto de Elena:** es lo que más confianza aporta y no puede sustituirse. Recomendación: retrato profesional con fondo neutro, luz natural, formato vertical 4:5, para "Sobre mí" y la ficha de Google.

---

## 7. Verificación realizada y pendiente

- Realizado aquí: build de producción, capturas de todas las páginas en 1440 y 390 px, comprobación de consola (0 errores), detector de anti-patrones de Impeccable (1 hallazgo: `border-l-4` en `.prose blockquote`), lectura completa del código.
- Pendiente para Claude Code tras implementar: Playwright MCP en cada página ES/EN a 390/768/1440 px, formulario del catálogo (envío y validación), enlaces internos sin 404, Lighthouse ≥ 90 en móvil (rendimiento, accesibilidad, SEO), `npm run build` sin avisos, y contraste con la extensión/CLI de Impeccable (`npx impeccable detect app`).
