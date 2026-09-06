# Brief para Claude Code · Expansión internacional de juradaexpress.es

> Segundo encargo grande sobre el repo `teacherelenaia/juradaexpress-web`, tras el rediseño de agosto (PR #16, ya en producción). Este archivo vive en `docs/`. Claude Code hace toda la preparación solo: basta con pegarle el bloque PROMPT.

Preparado por Claude (Fable 5.1) el 07/09/2026 a partir de: estado real del código en `main` (commit `d41e734`), la ficha pública de Google Business de Jurada Express (5,0 · 7 reseñas), y la normativa vigente del visado de nómada digital español (Ley 28/2022) y de la traducción certificada para USCIS (8 CFR § 103.2(b)(3)).

Permisos que Claude Code pedirá y se pueden conceder: leer/escribir archivos del repo, ejecutar `npm`, `npx` y `git` (commit y push en la rama), abrir el navegador con Playwright. No darle claves live de Stripe: `.env.local` en modo test es suficiente.

---

## PROMPT (pegar tal cual en Claude Code)

```
Eres el desarrollador y diseñador de juradaexpress.es (Next.js 14 App Router + Tailwind 3.4, este repo). Acabas de terminar el rediseño de agosto de 2026 (docs/AUDITORIA-JURADAEXPRESS.md, docs/BRIEF-CLAUDE-CODE.md y docs/CHANGELOG-2026-08.md documentan lo hecho: léelos antes de empezar para respetar el sistema visual, los componentes y las decisiones ya tomadas). Ahora vas a ejecutar el encargo descrito en docs/BRIEF-INTERNACIONAL-2026-09.md, que es este mismo texto.

OBJETIVO DEL ENCARGO
Jurada Express (Elena Peñaranda Ortega, Traductora-Intérprete Jurada de Inglés nombrada por el MAEC, nº 7310, con sede en Murcia, servicio 100 % online) quiere dejar de presentarse como un servicio "para España y Reino Unido" y posicionarse como traductora jurada español⇆inglés para clientes de cualquier país, con cuatro mensajes nuevos que deben quedar visibles, indexables y comprensibles para Google y para los motores de IA (ChatGPT, Perplexity, Gemini, Copilot):
1. Trabajo con clientes de Estados Unidos, India, Reino Unido, Irlanda, Canadá, Australia y cualquier país: el proceso es digital, el pago es con tarjeta internacional (Stripe) y la entrega es PDF firmado + papel por mensajería si se necesita.
2. Traducción certificada para USCIS (Estados Unidos): traducción completa al inglés con certificación de exactitud y competencia conforme a 8 CFR § 103.2(b)(3), firmada, fechada y con datos de contacto, un certificado por documento.
3. Especialidad en expedientes de visado de nómada digital para España (autorización de residencia para teletrabajo internacional, Ley 28/2022): son expedientes de muchos documentos y es el segmento que más interesa captar.
4. Capacidad para proyectos grandes en plazos cortos (expedientes completos, lotes de documentos, empresas), con plazo cerrado por escrito antes de empezar.
Todo ello sin perder la audiencia actual (particulares y empresas en España y británicos residentes en España), manteniendo la marca, el tono en primera persona de Elena y la calidad visual del rediseño. Y con un principio comercial: el visitante tiene que ver enseguida quién es Elena (cara, nombre, número oficial, reseñas reales) y cómo contactarla desde cualquier huso horario.

## Preparación (hazla tú, sin preguntar)
1. Comprueba que las skills siguen instaladas en .claude/skills/ (design-taste-frontend, redesign-existing-projects, emil-design-eng, impeccable). Si falta alguna, reinstálala como en docs/BRIEF-CLAUDE-CODE.md.
2. Crea y usa la rama mejora/internacional-2026-09. Si ya existe, continúa en ella.
3. .env.local con valores de prueba (STRIPE_SECRET_KEY=sk_test_dummy como mínimo) para que el build funcione.
4. Playwright para verificar, como en el encargo anterior.

## Método de trabajo obligatorio (en cada fase)
1. Carga design-taste-frontend y redesign-existing-projects: audita lo que vas a tocar y fija la dirección antes de escribir código. La dirección visual NO cambia: navy #0B2545 + dorado #C9A24B, Newsreader (display) + Manrope (cuerpo), neutro stone, sombras tintadas con navy, radios y componentes de docs/AUDITORIA-JURADAEXPRESS.md sección 3. Nada de banderas como decoración principal, nada de mapamundis con puntitos, nada de iconos genéricos de "globo". La internacionalidad se comunica con texto, con hechos y con las reseñas, no con clichés visuales.
2. Carga emil-design-eng antes de cualquier transición o animación. Reglas que ya conoces: solo transform/opacity/clip-path, 140-250 ms, nunca ease-in, nunca transition:all, scale(0.97) en :active, hovers solo en @media (hover:hover) and (pointer:fine), prefers-reduced-motion respetado. No añadas nuevos momentos animados de entrada: el único autorizado en la home sigue siendo la línea del proceso.
3. Construye la fase completa, sin placeholders ni "resto igual".
4. /impeccable audit y /impeccable critique sobre lo construido, corrige todo en una sola tanda, /impeccable polish al final. Máximo dos pasadas.
5. Verifica con Playwright cada página tocada en 390, 768 y 1440 px, en ES y en EN: sin errores de consola, sin 404 en enlaces internos, formularios que validan y envían, capturas en docs/capturas/2026-09/. Corrige y vuelve a comprobar antes de cerrar la fase.
6. npm run build sin errores ni avisos y commit descriptivo en la rama. Un commit por fase como mínimo.

## Reglas que no se negocian
- No migres de framework ni de Tailwind; no añadas librerías de UI ni de animación. Comprueba package.json antes de importar nada.
- No cambies ninguna URL existente. Si mueves algo, redirect 301 en next.config.mjs.
- No rompas Stripe (app/api/create-checkout-session), Web3Forms ni GA4/CookieConsent.
- Paridad ES/EN en todo lo nuevo. El inglés de las páginas dirigidas a EEUU e India se escribe en inglés internacional neutro (ortografía británica por coherencia con el resto del sitio, pero sin britanicismos coloquiales); las fechas en formato "7 September 2026"; los precios en euros con nota de que se cobra en euros con tarjeta internacional.
- Copy sin clichés de IA ("elevar", "sin fisuras", "de próxima generación", "en el mundo actual", "desbloquear"). Frases directas, primera persona del singular cuando habla Elena ("traduzco, firmo y sello"), como ya hace la web. Sin promesas que Elena no pueda cumplir: los plazos concretos de proyectos grandes se marcan [[COMPLETAR]] si no están en este documento.
- Nunca inventes reseñas, cifras de clientes, países "atendidos" ni casos de éxito. Solo lo que está en este documento o en el código.
- Nunca afirmes umbrales de ingresos, tasas ni plazos administrativos del visado de nómada digital: cambian cada año y no son competencia de Elena. La web habla de documentos, apostillas y traducción; para requisitos económicos remite al consulado o a un abogado de extranjería.
- Datos legales/contacto: teléfono +34 685 891 214 (WhatsApp), info@juradaexpress.es, https://juradaexpress.es, horario L-V 9:00-20:00 (hora peninsular española, CET/CEST). Nº de traductora jurada 7310 (enlace al buscador oficial del MAEC ya existente en el código). Donde falte un dato, escribe [[COMPLETAR: qué]] y entrega la lista al final.
- Imágenes: next/image, AVIF/WebP, < 150 KB, una imagen distinta por página nueva, licencia libre (Unsplash/Pexels) con la URL de origen en docs/CREDITOS-IMAGENES.md. Para las páginas de EEUU e India NO uses banderas ni monumentos: usa fotos de documentos, escritorios, pasaportes genéricos, sellos, personas trabajando en remoto.
- Accesibilidad mínima como en el encargo anterior: contraste AA, foco visible, objetivos táctiles ≥ 44 px, alt descriptivo.

## FASE 0 — Datos y reseñas reales (sin diseño todavía)

0.1 Reseñas. La ficha de Google Business de Jurada Express tiene hoy 5,0 estrellas y 7 reseñas reales. Rellena content/reviews.js con las 7 reseñas literales (textos tal y como están publicados en Google; no se reescriben, no se corrigen tildes ni puntuación; los saltos de línea se conservan como \n). Las fechas son las que Google mostraba como relativas el 07/09/2026 ("3 days ago", "6 days ago", "1 week ago") pasadas a ISO; si Elena aporta el día exacto, sustitúyelas. El array exacto está en content/reviews.js.

  Criterio editorial para la home: en la sección de opiniones muestra por defecto las 4 más útiles comercialmente (Ona Montes Vivancos, Jesus Gomez, Paul Capelle, Emilia Crawley: hablan de Embajada, procedimientos, rapidez y apostilla) y un botón "Ver las 7 en Google". Las reseñas largas se muestran completas, sin recortar con "…": el detalle es lo que convence. Añade `GOOGLE_RATING = 5.0` y `GOOGLE_REVIEW_COUNT = 7` a content/site.js y úsalos en la franja de confianza y en aggregateRating; deja un comentario indicando que hay que actualizarlos a mano cuando cambien.

0.2 Unifica GOOGLE_BUSINESS_URL. Ahora está duplicada: content/site.js tiene la URL real de la ficha (place_id ChIJPXZn2WGBYw0ROKmS0IqD-rk) y content/reviews.js la exporta como null. Haz que reviews.js la importe de site.js y elimina el duplicado. Comprueba que Reviews.js muestra "Ver todas en Google" enlazando a esa URL y que el layout la sigue incluyendo en sameAs.

0.3 Datos nuevos en content/site.js (constantes exportadas, para que las páginas no los repitan a mano):
   - SERVICE_COUNTRIES: lista con España, Reino Unido, Irlanda, Estados Unidos, Canadá, India, Australia y "cualquier otro país" (ES) / their EN equivalents.
   - TIMEZONE_NOTE: "Horario de atención de 9:00 a 20:00, hora peninsular española (CET/CEST)".
   - INTERNATIONAL_SHIPPING: { available: true, note: "Envío en papel fuera de España disponible por mensajería; el coste del transportista se indica en el presupuesto" }. Precio fijo: [[COMPLETAR: solo si Elena quiere publicar una tarifa; si no, se deja la nota tal cual]].
   - LARGE_PROJECT_CAPACITY: "hasta 500 páginas por semana" (ES) / "up to 500 pages per week" (EN). Es la cifra confirmada por Elena el 07/09/2026: úsala tal cual en la franja de la home, en la página de proyectos urgentes y en la FAQ. Para volúmenes mayores o urgencias, la web dice siempre "pídeme información y te cierro plazo por escrito".
   - USCIS_PAPER_COPY: true — Elena envía copia en papel con firma manuscrita a EEUU si el cliente la necesita (además del PDF firmado).
   - DNV_PACK_PRICE: null → la web dice "presupuesto cerrado en menos de 2 h" hasta que Elena fije una tarifa [[COMPLETAR opcional]].

0.4 Fuente de la verdad del visado de nómada digital, para todas las páginas y posts (no la copies literal; úsala para escribir con propiedad). Documentos que el consulado o la UGE exigen normalmente y que, si no están en español, llevan traducción jurada (y apostilla de La Haya si el país es firmante):
   - Certificado de antecedentes penales del país o países de residencia reciente, apostillado.
   - Contrato de trabajo o carta del empleador extranjero que confirme puesto, salario y autorización expresa para teletrabajar desde España; para autónomos, contratos con clientes extranjeros.
   - Certificado del registro mercantil (o equivalente) que acredite que la empresa extranjera lleva al menos un año de actividad (certificate of incorporation / good standing).
   - Título universitario o de posgrado, o cartas de empleadores anteriores que acrediten tres años de experiencia.
   - Justificantes de ingresos: nóminas, extractos bancarios, facturas, declaraciones fiscales.
   - Certificado de cobertura de Seguridad Social del país de origen (A1 en Reino Unido, certificate of coverage de la SSA en EEUU) o compromiso de alta en España.
   - Seguro médico.
   - Para familiares: certificado de matrimonio o pareja, partidas de nacimiento de hijos, todo apostillado.
   - El pasaporte se aporta en copia y no suele necesitar traducción.
   Mensaje central: los expedientes se deniegan sobre todo por documentación incompleta, traducciones no juradas o apostillas que faltan; Elena revisa la lista, dice qué necesita apostilla, traduce todo el lote con un único plazo y entrega ordenado y nombrado para subir a la plataforma o presentar en el consulado.

0.5 Fuente de la verdad de USCIS. Lo que exige 8 CFR § 103.2(b)(3): traducción completa al inglés (sellos, notas manuscritas y anotaciones incluidos) acompañada de la certificación del traductor de que es completa y exacta y de que es competente para traducir del español al inglés. No se exige notario ni una acreditación concreta; la condición de traductora jurada del MAEC añade credibilidad. Cada documento lleva su propia certificación (nombre, datos de contacto, declaración de competencia y exactitud, firma y fecha). Documentos típicos: certificados de nacimiento, matrimonio y divorcio, antecedentes penales, títulos y expedientes, extractos bancarios, escrituras. Formato de entrega: PDF con firma digital y, si el cliente lo necesita, copia en papel con firma manuscrita enviada por mensajería a Estados Unidos (confirmado por Elena; coste del transportista en el presupuesto). La página debe explicar con claridad la diferencia entre "traducción jurada" (España, firma y sello del MAEC, para organismos españoles) y "certified translation" (EEUU, certificación del traductor, para USCIS y otros organismos), y que Elena hace las dos.

0.6 Fuente de la verdad para India. Clientes indios que tramitan visados de estudios, trabajo, nómada digital o reagrupación familiar en el Consulado de España y necesitan traducción jurada al español de documentos emitidos en inglés en India: certificados de nacimiento y matrimonio, police clearance certificate, títulos y transcripts, cartas de empleador, extractos bancarios. India es firmante del Convenio de La Haya: la apostilla la emite el Ministry of External Affairs (MEA). Aclarar que Elena traduce del inglés: los documentos redactados en hindi u otra lengua india deben llegar ya en versión inglesa oficial. Sentido inverso: documentos españoles al inglés para su uso en India (con apostilla española cuando se pida).

## FASE 1 — Layout, metadatos y home (ES y EN)

1.1 Metadatos globales en app/layout.js. Sustituye "España y Reino Unido" en title/OG/Twitter por un posicionamiento internacional. Propuesta (ajusta longitud ≤ 60 caracteres el title, ≤ 155 la description):
   - title default: "Traductor Jurado Español-Inglés Online | JuradaExpress"
   - description: "Traducción jurada español-inglés con validez oficial y traducción certificada para USCIS. Clientes en España, Reino Unido, EE. UU., India y todo el mundo. Entrega 24/48 h."
   - Réplica EN en app/en/layout.js o donde estén los metadatos EN: "Sworn Spanish-English Translator Online | JuradaExpress" / description equivalente con "sworn translation for Spain, certified translation for USCIS, digital nomad visa documents".
1.2 JSON-LD ProfessionalService del layout: añade areaServed como lista de Country (ES, GB, IE, US, CA, IN, AU) más "Worldwide"; knowsLanguage ["es", "en"]; hasOfferCatalog con las cuatro líneas de servicio (traducción jurada español⇆inglés, traducción certificada USCIS, expediente visado nómada digital, proyectos urgentes y grandes volúmenes) enlazando cada una a su página; availableLanguage en el contactPoint; aggregateRating SOLO si Reviews se renderiza con reseñas completas (lee getPublishableReviews en tiempo de build y omítelo si está vacío). Añade un schema Person para Elena en /sobre-mi (jobTitle "Traductora-Intérprete Jurada de Inglés", identifier 7310, sameAs a la ficha de Google y a las redes, worksFor Jurada Express).
1.3 Hero de la home (ES y EN). Mantén el titular y su itálica dorada. Cambia el subtítulo de una línea a: "Validez oficial · Entrega en 24/48 h · Clientes en España, Reino Unido, EE. UU., India y cualquier país". Cambia el párrafo de apoyo por uno que diga, en primera persona, que todo es digital, que se paga con tarjeta desde cualquier país y que la traducción llega en PDF firmado el mismo día o al siguiente, y que también hace traducción certificada para USCIS. Sin chips, sin banderas. Los dos CTA se mantienen.
1.4 Franja de confianza justo debajo del hero (nueva, ES y EN): una fila sobria de cuatro hechos, tipografía Manrope 500, sin iconos ni tarjetas: "Nombrada por el MAEC · nº 7310", "5,0 en Google · 7 reseñas" (dato leído de una constante, con enlace a la ficha), "Entrega 24/48 h · PDF firmado", "Pago con tarjeta internacional". Si la constante de reseñas está vacía, el segundo hecho se sustituye por "Traducciones válidas ante organismos oficiales".
1.5 Nueva sección "¿Vas a pedir el visado de nómada digital?" (ES) / "Applying for Spain's digital nomad visa?" (EN), colocada después de "Documentos más habituales" y antes de la sección de Reino Unido, con imagen a la izquierda (misma composición zig-zag que ya existe). Copy: tres o cuatro frases sobre que son expedientes de muchos documentos, que la mayoría de denegaciones son por traducciones o apostillas incompletas, que Elena revisa la lista completa y traduce todo el lote con un solo plazo. Lista breve de 5 documentos habituales (del punto 0.4) y CTA "Ver qué documentos necesitas" → /traduccion-jurada-visado-nomada-digital.
1.6 Sección de Reino Unido: mantenerla tal cual, pero retitularla para que no parezca la única audiencia extranjera: "¿Resides en España siendo británico/a?" se conserva; añade una frase final que enlace a las páginas de EEUU e India ("Si vienes de Estados Unidos o de India, tienes tu propia guía").
1.7 Nueva franja "Proyectos grandes en plazos cortos" (ES) / "Large projects, short deadlines" (EN) sobre fondo stone-50, después de "Cómo trabajamos": texto breve en primera persona (expedientes completos, lotes de documentos para empresas o despachos, presupuesto y plazo cerrados por escrito antes de empezar, entrega ordenada y nombrada documento a documento), un dato de capacidad solo si LARGE_PROJECT_CAPACITY no es null, CTA "Contar mi caso por WhatsApp" con texto prellenado. Enlaza a /traduccion-jurada-urgente-grandes-volumenes.
1.8 "Sobre mí" en la home: añade una frase sobre clientes de EEUU e India y una línea con TIMEZONE_NOTE. Si sigue sin haber foto real, mantén el monograma; deja [[COMPLETAR: foto profesional de Elena]] en la lista final.
1.9 Opiniones: con reviews.js relleno, la sección aparece sola. Ajusta Reviews.js para que, además de las tarjetas, muestre en cabecera "5,0 · 7 reseñas en Google" con enlace, y para que las reseñas en inglés se muestren también en la home ES (con lang, hoy se filtran por idioma: cambia el criterio a "mostrar todas en ambas versiones, en su idioma original, con la etiqueta del idioma"). Las reseñas son de clientes reales angloparlantes: verlas en inglés en la home ES es un argumento comercial, no un problema.
1.10 FAQ de la home: añade tres preguntas con respuesta directa de una o dos frases (pensadas para que un motor de IA las cite): "¿Trabajas con clientes fuera de España?", "¿Haces traducciones certificadas para USCIS?", "¿Cuánto tardas en traducir un expediente completo de nómada digital?" (respuesta sin cifra si no hay LARGE_PROJECT_CAPACITY: "plazo único cerrado por escrito; los documentos sueltos, 24/48 h"). Actualiza el JSON-LD FAQPage.

## FASE 2 — Páginas nuevas (ES + EN, con hreflang y LanguageSwitcher)

Usa la plantilla y el sistema visual de las páginas interiores existentes (mira /traduccion-jurada-britanicos-espana y app/components/DocumentPage.js como referencia de estructura, pero estas páginas son de audiencia/servicio, no fichas de documento: 700-1.100 palabras cada una, H1 único, H2 en forma de pregunta donde encaje, lista de documentos, bloque "Cómo lo hacemos" en 4 pasos, FAQ propia de 4-5 preguntas con JSON-LD FAQPage, schema Service + BreadcrumbList, CTA WhatsApp con texto prellenado específico de la página, enlaces internos a las fichas de documento correspondientes y a /precios y /documentos).

2.1 /traduccion-jurada-visado-nomada-digital ⇄ /en/sworn-translation-spain-digital-nomad-visa
   H1 ES: "Traducción jurada para el visado de nómada digital en España". Contenido: qué es el expediente y por qué se deniegan, checklist completa de documentos del punto 0.4 en tabla (documento · ¿apostilla? · ¿traducción jurada? · quién lo emite), qué pasa con los familiares, cómo enviar el lote (una carpeta, nombres claros), qué entrega Elena (PDF firmado por documento + índice), plazo y precio (DNV_PACK_PRICE o "presupuesto cerrado en menos de 2 h"), aviso de que los requisitos económicos los fija la administración y hay que consultarlos con el consulado o un abogado. Palabras clave a cubrir con naturalidad (ES): traducción jurada visado nómada digital, traductor jurado nómada digital España, documentos visado teletrabajo internacional traducción jurada, apostilla antecedentes penales nómada digital. (EN): sworn translation digital nomad visa Spain, Spain digital nomad visa documents translation, certified translator digital nomad visa Spain, apostille criminal record Spain DNV.
2.2 /traduccion-certificada-uscis ⇄ /en/certified-translation-uscis
   H1 EN: "Certified Spanish to English translation for USCIS". Contenido: qué exige 8 CFR § 103.2(b)(3) explicado en llano, qué incluye la certificación de Elena, diferencia jurada vs certified, documentos habituales, cómo se entrega, tiempos, precio (de content/documents.js si aplica; si no, "presupuesto en menos de 2 h"), FAQ (¿hace falta notario? no; ¿acepta USCIS traducciones hechas fuera de EEUU? sí, el requisito es la certificación, no el lugar; ¿qué pasa con sellos y anotaciones? se traducen todos). Palabras clave (EN): USCIS certified translation Spanish, certified translation birth certificate USCIS Spanish, sworn translator Spain USCIS, Spanish to English certified translation immigration. (ES): traducción certificada USCIS, traducción para inmigración Estados Unidos, traductor jurado USCIS.
2.3 /traduccion-jurada-estados-unidos ⇄ /en/sworn-translation-usa-spain
   Página de audiencia para personas de Estados Unidos que se instalan en España (nómada digital, no lucrativa, estudios, nacionalidad, matrimonio, compra de vivienda) y para españoles con trámites en EEUU. Explica los dos sentidos, la apostilla (Secretary of State del estado emisor / U.S. Department of State para federales), el certificate of coverage de la SSA, el huso horario (un encargo enviado por la noche en EEUU está en marcha a primera hora de la mañana en España), pago en euros con tarjeta estadounidense. Enlaza a 2.1 y 2.2. Palabras clave (EN): sworn translator Spain for Americans, official Spanish translation for Spain visa US citizen, apostille translation Spain from USA, Spanish sworn translation American documents.
2.4 /traduccion-jurada-india ⇄ /en/sworn-translation-india-spain
   Página de audiencia para personas de India (estudios, trabajo, nómada digital, reagrupación, homologación de títulos) según el punto 0.6, con la aclaración de que los documentos deben llegar en inglés, la apostilla del MEA, tiempos y pago. Palabras clave (EN): sworn translation Spain Indian documents, Spanish translation Indian birth certificate Spain visa, certified translator Spain student visa India, apostille MEA translation Spain. (ES): traducción jurada documentos India, traducción jurada certificado nacimiento India.
2.5 /traduccion-jurada-urgente-grandes-volumenes ⇄ /en/urgent-sworn-translation-large-projects
   Para particulares con expedientes completos y para empresas, despachos y gestorías: cómo trabaja Elena un lote (revisión previa, lista de apostillas, plazo único por escrito, entrega ordenada, facturación), capacidad (LARGE_PROJECT_CAPACITY o sin cifra), qué NO hace (no subcontrata: firma y sella ella todo), CTA WhatsApp. Palabras clave (ES): traducción jurada urgente, traductor jurado urgente inglés, traducción jurada gran volumen empresas. (EN): urgent sworn translation Spain, bulk sworn translation Spanish English, same day sworn translation Spain.
2.6 Navegación: en MainNav/MobileNav añade un desplegable o enlace "Internacional" que agrupe nómada digital, USCIS, Estados Unidos, India y Reino Unido, sin superar los 6 ítems visibles en escritorio. Footer: columna "Clientes internacionales" con esas cinco páginas. LanguageSwitcher: añade las cinco parejas de rutas. Sitemap: todas las rutas nuevas con lastModified real y hreflang.
2.7 /contacto y /en/contacto: añade un bloque "Si me escribes desde fuera de España" con TIMEZONE_NOTE, el teléfono en formato internacional +34 685 891 214 con nota "WhatsApp funciona desde cualquier país", email, medios de pago (tarjeta internacional vía Stripe) y entrega (PDF firmado; papel según INTERNATIONAL_SHIPPING).
2.8 /precios y /en/precios: añade dos filas o tarjetas: "Traducción certificada para USCIS" y "Expediente visado nómada digital", con precio o "presupuesto cerrado en menos de 2 h", y una nota de que los precios son en euros.

## FASE 3 — Blog (3 posts ES + 3 EN)
Con la estructura de content/posts.js y posts.en.js (author, updated, image, tags, BlogPosting schema, relacionados, CTA), 700-1.000 palabras, H2 en forma de pregunta, enlaces internos a las páginas de la fase 2, fechas realistas entre septiembre y noviembre de 2026:
   1. "Documentos para el visado de nómada digital: cuáles necesitan apostilla y traducción jurada" / "Spain digital nomad visa documents: which need an apostille and a sworn translation".
   2. "Traducción jurada o traducción certificada: qué pide USCIS y qué pide España" / "Sworn vs certified translation: what USCIS requires and what Spain requires".
   3. "Documentos indios para un visado de España: apostilla del MEA y traducción jurada" / "Indian documents for a Spanish visa: MEA apostille and sworn translation".

## FASE 4 — Visibilidad en motores de IA (GEO)
4.1 Crea public/llms.txt (y enlázalo desde robots.txt como comentario) siguiendo el formato llmstxt.org: un párrafo de identidad ("Jurada Express es el servicio de traducción jurada de inglés de Elena Peñaranda Ortega, Traductora-Intérprete Jurada nombrada por el Ministerio de Asuntos Exteriores de España, nº 7310…"), servicios, países, datos de contacto, y la lista de páginas clave con su URL y una línea de descripción, en ES y en EN.
4.2 En cada página nueva, el primer párrafo tras el H1 debe responder de forma autónoma a la pregunta que da nombre a la página (definición + quién + para qué + plazo), porque es el fragmento que citan los motores de respuesta. Nada de introducciones vacías.
4.3 Comprueba que robots.txt no bloquea a los rastreadores de IA habituales (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) y documenta la decisión en docs/.
4.4 Consistencia de entidad: el nombre "Jurada Express" (con espacio) debe aparecer igual en title, JSON-LD, footer, llms.txt y OG. Si en el código coexiste "JuradaExpress" como marca tipográfica, mantenlo solo como logotipo y usa "Jurada Express" en todo texto y dato estructurado.

## FASE 5 — Cierre
- /impeccable audit final; Lighthouse móvil ≥ 90 en rendimiento, accesibilidad y SEO en la home, en /traduccion-jurada-visado-nomada-digital y en /en/certified-translation-uscis.
- npx impeccable detect app content → 0 hallazgos.
- docs/CHANGELOG-2026-09.md con lo hecho por fase, capturas antes/después en docs/capturas/2026-09/ y la lista completa de [[COMPLETAR]].
- Push de la rama y Pull Request hacia main con ese resumen. No hagas merge: Elena revisa el preview de Vercel y aprueba.

Empieza por la preparación y la FASE 0. Cuando la FASE 1 esté verificada, haz push, para y muéstrame el resultado (con la URL del preview de Vercel) antes de continuar con la FASE 2.
```

---

## Qué tiene que hacer Elena personalmente

Ya resuelto por Elena el 07/09/2026 (no hay que volver a preguntarlo): las 7 reseñas con nombre y fecha, la capacidad de 500 páginas/semana, el envío en papel fuera de España y la copia en papel para USCIS.

Opcional, para cuando Elena quiera:

1. Día exacto de cada reseña (las fechas del brief salen de las etiquetas relativas de Google y pueden bailar un día).
2. Tarifa fija del envío internacional y precio orientativo del pack de nómada digital, si prefiere publicarlos en vez de "en el presupuesto".
3. Foto profesional (es la mejor señal de confianza posible para un cliente en otro continente).

En Google Business Profile (nadie más puede hacerlo):

4. La dirección "Carril de Los Leales, 10, La Arboleja" sigue pública en Maps a 7 de septiembre. Ocultarla: Editar perfil → Ubicación → desactivar "Mostrar dirección" / "No atiendo clientes en mi dirección" → zona de servicio España.
5. Añadir en "Servicios" del perfil: "Traducción certificada para USCIS", "Traducción jurada para visado de nómada digital", "Proyectos urgentes y grandes volúmenes".
6. Actualizar la descripción del perfil con una frase sobre clientes internacionales y USCIS.

Después del push de cada fase:

7. Abrir el preview de Vercel en móvil y ordenador, comprobar especialmente la home, /contacto y las páginas nuevas en ES y EN, y que el pago de prueba de Stripe sigue funcionando.
8. Completar la lista de `[[COMPLETAR]]` del changelog.
9. Aprobar el PR en GitHub; Vercel publicará en juradaexpress.es.
