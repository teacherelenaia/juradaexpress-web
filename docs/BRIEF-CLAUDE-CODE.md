# Brief para Claude Code · Mejora integral de juradaexpress.es

> Este archivo y `AUDITORIA-JURADAEXPRESS.md` viven en `docs/` del repositorio `teacherelenaia/juradaexpress-web`. Claude Code (local o en claude.ai/code sobre el repo) hace toda la preparación por sí mismo: basta con pegarle el bloque PROMPT de abajo.

Permisos que Claude Code pedirá y se pueden conceder: leer/escribir archivos del repo, ejecutar `npm`, `npx` y `git` (commit y push en la rama), y abrir el navegador con Playwright. **No** darle claves live de Stripe: con `.env.local` en modo test es suficiente.

---

## PROMPT (pegar tal cual en Claude Code)

```
Eres el desarrollador y diseñador de juradaexpress.es (Next.js 14 App Router + Tailwind 3.4, este repo). Vas a aplicar el plan de mejora descrito en docs/AUDITORIA-JURADAEXPRESS.md. Léelo entero antes de tocar nada; es la fuente de verdad de este encargo.

## Preparación (hazla tú, sin preguntar, antes de la FASE 0)
1. Instala las skills de diseño en el repo, en este orden:
   npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
   npx skills add https://github.com/Leonxlnx/taste-skill --skill "redesign-existing-projects"
   git clone --depth 1 https://github.com/emilkowalski/skills.git /tmp/emil && mkdir -p .claude/skills && cp -r /tmp/emil/skills/emil-design-eng .claude/skills/
   npx impeccable install   (elige instalación en el proyecto, no global)
   Si alguna instalación falla por red, clona el repo correspondiente y copia la carpeta de la skill a .claude/skills/ a mano.
2. Navegador para verificar: usa Playwright MCP si está configurado; si no, instala @playwright/test como devDependency y usa scripts de captura propios (npx playwright install chromium). No pares el trabajo por esto.
3. Crea y usa la rama mejora/rediseno-2026-08. Si ya existe, continúa en ella.
4. Crea .env.local a partir de .env.local.example con valores de prueba para que el build funcione.

## Método de trabajo obligatorio (en este orden, en cada fase)
1. Carga la skill design-taste-frontend y redesign-existing-projects: haz la auditoría previa de lo que vas a tocar y fija la dirección antes de escribir código. La dirección ya está decidida en la sección 3 del documento: conserva la marca navy #0B2545 + dorado #C9A24B, tipografía Newsreader (display) + Manrope (cuerpo) vía next/font/google, neutro cálido stone en vez de slate.
2. Carga emil-design-eng antes de escribir cualquier transición o animación. Reglas: solo transform/opacity/clip-path, 140-250 ms en UI, nunca ease-in, nunca transition:all, scale(0.97) en :active, hovers dentro de @media (hover:hover) and (pointer:fine), prefers-reduced-motion respetado. Un único momento animado autorizado en la home: la línea del proceso que se dibuja al entrar en viewport.
3. Construye la fase completa, sin placeholders ni "resto igual".
4. Ejecuta /impeccable audit y /impeccable critique sobre lo construido, corrige todo en una sola tanda y termina con /impeccable polish. Máximo dos pasadas.
5. Verifica con Playwright MCP: abre cada página tocada en 390, 768 y 1440 px, en ES y en EN, comprueba que no hay errores de consola, que los enlaces internos no dan 404, que el formulario del catálogo valida y envía, y haz captura. Corrige y vuelve a comprobar antes de dar la fase por cerrada.
6. npm run build sin errores ni avisos, commit con mensaje descriptivo en la rama mejora/rediseno-2026-08. Un commit por fase como mínimo.

## Reglas que no se negocian
- No migres de framework ni de Tailwind; no añadas librerías de UI. Motion/framer-motion NO: todo con CSS. Antes de importar nada, comprueba package.json.
- No cambies ninguna URL existente. Si mueves algo, redirect 301 en next.config.mjs.
- No rompas Stripe (app/api/create-checkout-session), Web3Forms ni GA4/CookieConsent.
- Paridad ES/EN: cada cambio de diseño o estructura se replica en /en. Los textos EN los escribes en inglés británico natural, no traducción literal.
- Copy sin clichés de IA (nada de "elevar", "sin fisuras", "de próxima generación"). Lenguaje directo, en primera persona del singular cuando habla Elena ("traduzco, firmo y sello"), como ya hace la web.
- Todo el texto legal, precios, plazos y datos de contacto los tomas del documento; donde falte un dato (NIF, dirección fiscal, URL exacta de Google Business, URLs definitivas de Instagram/Facebook) escribe [[COMPLETAR: qué]] y al final entrega la lista de todos los [[COMPLETAR]].
- Imágenes: usa next/image en todo, priority en el hero, formatos AVIF/WebP (configura images.formats en next.config.mjs), una imagen distinta por página/post. Si necesitas fotos nuevas, descárgalas de Unsplash o Pexels con licencia libre (guarda la URL de origen en docs/CREDITOS-IMAGENES.md), recórtalas al tamaño de uso y comprímelas (< 150 KB cada una).
- Vídeo: si añades clip de stock en "Cómo funciona", < 1,5 MB, muted autoplay loop playsinline con poster, desactivado con prefers-reduced-motion y en móvil con conexión lenta (navigator.connection.saveData).
- Accesibilidad mínima: contraste AA en todo texto, skip-link, foco visible con el color de marca, objetivos táctiles ≥ 44 px, aria en menú móvil, alt descriptivo en cada imagen.

## Fases (haz una, verifica, commit, siguiente)

FASE 0 — Correcciones urgentes (sección 2 del documento)
- Título "¿Empezamos?" invisible (ES y EN): elimina las reglas globales de globals.css que pisan componentes (a{underline}, h1-h3 con color/size, p/ul/ol{my-4}) y sustitúyelas por clases de componente (.btn, .btn-primary, .btn-secondary, .link) aplicadas explícitamente. Revisa cada página después: nada debe cambiar de tamaño o color sin querer.
- Enlace g.page/r/PLACEHOLDER → [[COMPLETAR: URL de la ficha de Google Business]]; hasta tenerla, retira el enlace.
- Testimonios: sustituye el bloque por un componente que solo se renderiza si content/reviews.js tiene reseñas con nombre, fecha y origen; deja el archivo vacío con el formato documentado.
- Separación logo/menú, estado activo en navegación (usePathname), contraste del dorado: brand-gold-600 nunca como color de texto o icono informativo sobre blanco (3.2:1); como texto sobre blanco solo brand-gold-700 (4.8:1) o brand-navy; sobre navy, brand-gold-300 es correcto.
- Fondos: un único fondo base (white) y una sola superficie alternativa (stone-50); elimina el componente Wave y el SectionKicker.
- Meta title/description/H1 de la home según 5.1. Ajusta también los de /en.

FASE 1 — Sistema visual (sección 3)
- next/font con Newsreader (600/700, itálica para "Español ⇆ Inglés") y Manrope (400/500/600/700). Escala tipográfica: display 3.5-4.5 rem con tracking -0.02em y text-wrap:balance; cuerpo 1.0625 rem, medida máx. 68 ch; tabular-nums en precios.
- Tokens en tailwind.config.js: stone como neutro, sombras tintadas con navy (ej. 0 8px 24px -12px rgb(11 37 69 / 0.25)), radios: 0.75 rem contenedores / 0.5 rem controles / botones 0.625 rem.
- Componentes: Button (primary navy, secondary borde navy sin dorado, ghost), SectionHeading (sin kicker), Card solo donde la elevación aporte jerarquía.
- Header: 64 px, logo con gap, nav con estado activo (subrayado dorado 2 px animado con clip-path 180 ms), CTA "Pedir presupuesto" enlazando a /documentos (no a mailto). Móvil: panel deslizante siempre montado con transición 200 ms ease-out / salida 150 ms; incluye idioma y redes.
- Barra inferior fija en móvil (< 768 px) con "WhatsApp" y "Pedir presupuesto"; el botón flotante de WhatsApp desaparece en móvil cuando existe la barra y en escritorio se sitúa a 24 px de la esquina sin tapar contenido.
- CookieConsent: tarjeta compacta inferior izquierda (máx. 420 px), no a ancho completo, con enlace a /politica-cookies.

FASE 2 — Home ES y EN (sección 3)
- Hero: titular serif, subtítulo con los tres datos (validez oficial · 24/48 h · toda España y Reino Unido) en una línea de texto, no chips; dos CTA (Pedir presupuesto → /documentos, WhatsApp). Imagen real de documento con sello + sello SVG que entra con scale .95→1 y opacidad 200 ms.
- "Documentos más habituales": lista editorial en dos columnas (nombre, para qué trámite, precio desde, plazo, enlace a ficha), imagen a un lado en zig-zag.
- "¿Resides en España siendo británico/a?": mantener, enlazar a la nueva página /traduccion-jurada-britanicos-espana.
- "Cómo trabajamos": línea temporal horizontal de 4 pasos (vertical en móvil), momento animado único. Contenedor de vídeo opcional según sección 6.
- "Sobre mí": foto (si no hay, monograma tipográfico serif "E.P." sobre stone-100, no círculo con ring dorado), nº 7310 con enlace al buscador oficial del MAEC, enlace a /sobre-mi.
- Opiniones: componente condicional de la fase 0.
- CTA final: fondo navy, titular blanco (comprobado), foto de firma.
- FAQ: mantener details/summary con icono que rota 180 ms; JSON-LD FAQPage actualizado.
- Bloque "Síguenos" con Instagram y Facebook antes del footer.
- Footer: 3 columnas + fila legal con enlaces a aviso legal, privacidad, cookies; iconos de redes; JSON-LD ProfessionalService ampliado según 5.4.

FASE 3 — Páginas interiores y nuevas (5.2)
- Precios, Documentos, FAQ, Contacto y las 7 fichas: aplicar el sistema visual; cada ficha pasa a 300-500 palabras con estructura: para qué trámites, apostilla sí/no, precio desde, plazo, cómo enviarlo, FAQ propia (3 preguntas) y schema Service + BreadcrumbList.
- Fichas nuevas: permiso de conducir, certificado de empresa/nómina, DNI/pasaporte, testamento y herencia, certificado médico (mismo patrón, precios de content/documents.js; donde no haya precio, "presupuesto cerrado en menos de 2 h").
- Páginas nuevas ES: /sobre-mi, /traduccion-jurada-britanicos-espana, /traductor-jurado-murcia, /como-funciona, /aviso-legal, /politica-privacidad, /politica-cookies (tabla con _ga, _ga_*, duración y finalidad), not-found.js personalizada.
- Páginas nuevas EN: /en/about, /en/sworn-translation-british-residents-spain, /en/how-it-works, /en/legal-notice, /en/privacy-policy, /en/cookie-policy.
- Formulario del catálogo: cláusula informativa RGPD + casilla obligatoria de aceptación + validación inline (sin alert()).
- LanguageSwitcher: mapa completo de rutas ES↔EN, incluidas las nuevas; si no hay equivalente, va a la sección equivalente más cercana, no al home.
- Sitemap: añadir todas las rutas nuevas con lastModified real; hreflang en las nuevas páginas.

FASE 4 — Blog (5.3)
- Refactor mínimo: content/posts.js con campos author, updated, image, tags; app/blog/[slug] con BlogPosting schema, OG por post, breadcrumb, "artículos relacionados" (2 por tags) y CTA final.
- Crear /en/blog y /en/blog/[slug] con content/posts.en.js.
- Escribir los 8 posts de la tabla 5.3 siguiendo sus puntos obligatorios (600-900 palabras, H2 en forma de pregunta, enlaces internos a la ficha de documento, CTA WhatsApp con texto prellenado, imagen propia por post, fechas distintas y realistas entre agosto y octubre de 2026). Marca con [[COMPLETAR]] cualquier dato legal o de precio del que no estés seguro.

FASE 5 — Cierre
- /impeccable audit final de todo el sitio; Lighthouse móvil ≥ 90 en rendimiento, accesibilidad y SEO en home, una ficha y un post.
- npx impeccable detect app content → 0 hallazgos.
- Genera docs/CHANGELOG-2026-08.md con lo hecho por fase, capturas antes/después en docs/capturas/ y la lista de [[COMPLETAR]].
- Haz push de la rama y abre un Pull Request hacia main con ese resumen. No hagas merge: Elena revisa el preview de Vercel y aprueba.

Empieza por la preparación y la FASE 0. Cuando la FASE 0 esté verificada, haz push, para y muéstrame el resultado (con la URL del preview de Vercel si existe) antes de continuar con la FASE 1.
```

---

## Qué revisa Elena tras cada fase

1. Abrir el preview de Vercel de la rama (Vercel lo crea solo al hacer push) en el móvil y en el ordenador.
2. Comprobar especialmente: que "¿Empezamos?" se lee, que los botones ya no van subrayados, que el formulario del catálogo envía, que el pago de prueba de Stripe sigue funcionando.
3. Completar la lista de `[[COMPLETAR]]` (NIF y dirección fiscal para el aviso legal, URL de Google Business, URLs definitivas de Instagram y Facebook).
4. Cuando todo esté bien, aprobar el PR en GitHub y Vercel publicará en juradaexpress.es.
