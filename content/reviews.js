// content/reviews.js
//
// Reseñas reales de clientes y recuentos de las dos fuentes de opiniones
// (Google Business y Trustpilot). REVIEW_STATS es el ÚNICO sitio donde se
// escriben la nota y el número de reseñas: la franja de confianza, la
// sección «Opiniones», las páginas de servicio, /llms.txt y cualquier texto
// con «N reseñas» leen de aquí. Ni Google ni Trustpilot ofrecen API
// gratuita: ACTUALIZAR A MANO (y cambiar `updated`).
//
// Historial de Google: 5,0 · 80 a 14/11/2026 (65 a 03/11/2026, 51 a
// 16/10/2026, 49 a 15/10/2026, 41 a 12/10/2026, 35 a 08/10/2026, 24 a
// 26/09/2026 y 7 a 07/09/2026). Trustpilot, 14/11/2026: TrustScore 4,6,
// 18, todas de cinco estrellas (antes 4,3 · 7 a 03/11/2026).
//
// La puntuación de Trustpilot se muestra SIEMPRE con su TrustScore real
// (4,6), nunca redondeada a 5: el TrustScore no es la media de estrellas.
//
// Las reseñas de REVIEWS se copian literalmente de la ficha de Google
// Business "Jurada Express" y de https://es.trustpilot.com/review/juradaexpress.es.
// La sección "Opiniones" de la home (ES y EN) solo se publica cuando aquí
// hay reseñas reales. Nunca inventes reseñas ni uses ejemplos.
//
// Formato de cada reseña (los cuatro campos marcados son obligatorios; si
// falta cualquiera de ellos la reseña se descarta y no se publica):
//
//   {
//     name:   "Nombre y apellido o inicial",  // obligatorio, tal como aparece
//     date:   "2026-07-14",                   // obligatorio, ISO YYYY-MM-DD
//     source: "Google" | "trustpilot",        // obligatorio: de dónde sale
//     text:   "Texto literal de la reseña.",  // obligatorio
//     title:  "Título literal",               // opcional (Trustpilot)
//     rating: 5,                              // opcional, 1-5
//     lang:   "es",                           // opcional: "es" | "en"
//     url:    "https://…",                    // opcional: enlace a la reseña
//     procedure: { es: "…", en: "…" },        // opcional: el trámite
//   }
//
// `procedure` (Fase A2, 18/10/2026): el trámite al que corresponde la
// reseña («Partida de nacimiento para nacionalidad»), en los dos idiomas.
// Lo rellena Elena a mano cuando lo sabe con certeza por el encargo; si
// está vacío, la home muestra solo el nombre y el mes. NUNCA se deduce del
// texto de la reseña ni se inventa.
//
// Reglas:
// - Solo reseñas publicadas realmente por el cliente en la fuente indicada
//   (Google Business, Trustpilot, email autorizado por escrito, etc.).
// - `source` debe poder comprobarse. Si no se puede, la reseña no va.
// - `text` es literal: no se reescribe, no se "mejora", no se corrigen
//   tildes, mayúsculas ni puntuación. Los saltos de línea se conservan como \n.
// - `lang` indica el idioma ORIGINAL de la reseña. Todas se muestran en las
//   dos versiones de la web (ES y EN) en su idioma original, con etiqueta.
// - Las fechas de Google salen de las etiquetas relativas ("3 days ago",
//   "2 weeks ago", "1 month ago") leídas el 07/09/2026 (primeras 7) y el
//   26/09/2026 (resto) y pueden bailar algunos días. Las de Trustpilot son
//   la fecha exacta que muestra la reseña (leídas el 14/11/2026).
//   [[COMPLETAR opcional: día exacto de cada reseña de Google]]

export const REVIEW_STATS = {
  google: { rating: 5.0, count: 80, url: 'https://www.google.com/maps/place/?q=place_id:ChIJPXZn2WGBYw0ROKmS0IqD-rk' },
  trustpilot: { trustScore: 4.6, count: 18, fiveStarPct: 100, url: 'https://es.trustpilot.com/review/juradaexpress.es' },
  updated: '2026-11-14',
};
export const TOTAL_REVIEWS = REVIEW_STATS.google.count + REVIEW_STATS.trustpilot.count; // 98

// URLs de las dos fichas (content/site.js reexporta la de Google como
// GOOGLE_BUSINESS_URL para el sameAs y los enlaces que ya la usaban).
export const GOOGLE_REVIEWS_URL = REVIEW_STATS.google.url;
export const TRUSTPILOT_URL = REVIEW_STATS.trustpilot.url;

// Reseñas de cinco estrellas entre las dos fuentes. Si coincide con
// TOTAL_REVIEWS (hoy: 80 de Google con nota 5,0 + 18 de Trustpilot, el
// 100 % de cinco estrellas), los textos dicen «N reseñas de cinco
// estrellas»; si algún día deja de coincidir, dicen solo «N reseñas».
const FIVE_STAR_REVIEWS =
  (REVIEW_STATS.google.rating >= 5 ? REVIEW_STATS.google.count : 0) +
  Math.round((REVIEW_STATS.trustpilot.count * REVIEW_STATS.trustpilot.fiveStarPct) / 100);
export const ALL_FIVE_STAR = FIVE_STAR_REVIEWS === TOTAL_REVIEWS;

const NUM_LOCALE = { es: "es-ES", en: "en-GB" };
/** Nota con un decimal en el formato del idioma: 5,0 / 5.0; 4,6 / 4.6. */
export function formatScore(n, locale = "es") {
  return n.toLocaleString(NUM_LOCALE[locale] || NUM_LOCALE.es, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

/** Etiqueta de Trustpilot para un TrustScore (la misma escala que su web). */
export function trustpilotLabel(score, locale = "es") {
  const labels =
    locale === "en"
      ? ["Excellent", "Great", "Average", "Poor", "Bad"]
      : ["Excelente", "Bueno", "Aceptable", "Malo", "Pésimo"];
  if (score >= 4.3) return labels[0];
  if (score >= 3.8) return labels[1];
  if (score >= 2.8) return labels[2];
  if (score >= 1.8) return labels[3];
  return labels[4];
}

// Textos derivados de REVIEW_STATS, en un único sitio para toda la web.
export const REVIEW_TEXT = {
  es: {
    // Franja de confianza (con «5»), páginas de servicio («cinco»).
    total: ALL_FIVE_STAR
      ? `${TOTAL_REVIEWS} reseñas de 5 estrellas en Google y Trustpilot`
      : `${TOTAL_REVIEWS} reseñas en Google y Trustpilot`,
    totalLong: ALL_FIVE_STAR
      ? `${TOTAL_REVIEWS} reseñas de cinco estrellas en Google y Trustpilot`
      : `${TOTAL_REVIEWS} reseñas en Google y Trustpilot`,
    google: `${formatScore(REVIEW_STATS.google.rating, "es")} · ${REVIEW_STATS.google.count} reseñas en Google`,
    trustpilot: `Trustpilot · ${trustpilotLabel(REVIEW_STATS.trustpilot.trustScore, "es")} · ${formatScore(REVIEW_STATS.trustpilot.trustScore, "es")} · ${REVIEW_STATS.trustpilot.count} opiniones`,
    seeGoogle: `Ver las ${REVIEW_STATS.google.count} en Google`,
    seeTrustpilot: `Ver las ${REVIEW_STATS.trustpilot.count} en Trustpilot`,
    href: "/#opiniones",
  },
  en: {
    total: ALL_FIVE_STAR
      ? `${TOTAL_REVIEWS} five-star reviews on Google and Trustpilot`
      : `${TOTAL_REVIEWS} reviews on Google and Trustpilot`,
    totalLong: ALL_FIVE_STAR
      ? `${TOTAL_REVIEWS} five-star reviews on Google and Trustpilot`
      : `${TOTAL_REVIEWS} reviews on Google and Trustpilot`,
    google: `${formatScore(REVIEW_STATS.google.rating, "en")} · ${REVIEW_STATS.google.count} reviews on Google`,
    trustpilot: `Trustpilot · ${trustpilotLabel(REVIEW_STATS.trustpilot.trustScore, "en")} · ${formatScore(REVIEW_STATS.trustpilot.trustScore, "en")} · ${REVIEW_STATS.trustpilot.count} reviews`,
    seeGoogle: `See all ${REVIEW_STATS.google.count} on Google`,
    seeTrustpilot: `See all ${REVIEW_STATS.trustpilot.count} on Trustpilot`,
    href: "/en#opiniones",
  },
};

export const REVIEWS = [
  // Trustpilot, leídas el 14/11/2026 en
  // https://es.trustpilot.com/review/juradaexpress.es (todos los idiomas).
  // Nombre como aparece en Trustpilot salvo «Valentina Mollá Sagredo»,
  // que Elena pidió con mayúsculas (14/11/2026); fecha de la reseña,
  // título y texto sin editar.
  {
    name: "Valentina Mollá Sagredo",
    date: "2026-10-22",
    source: "trustpilot",
    rating: 5,
    lang: "es",
    url: "https://es.trustpilot.com/reviews/6adb39605902f84557c3f481",
    procedure: { es: "", en: "" },
    title: "Volvería a contactar con Elena Peñaranda",
    text: "Contacté con Elena Peñaranda para traducir mi título de enfermería y el certificado de conformidad para colegiarme en Irlanda. Fue muy fácil contactar con ella, contesta los correos enseguida y te explica con detalle cómo va a realizar la traducción y si tienes alguna petición puedes comentárselo sin problema. Destacaría que el mismo día que realizas el pago, te envía los documentos traducidos.\n\nSin duda volvería a contactar con ella.",
  },
  {
    name: "José Luis",
    date: "2026-11-08",
    source: "trustpilot",
    rating: 5,
    lang: "es",
    url: "https://es.trustpilot.com/reviews/6af184631b45cf24b0ce9662",
    procedure: { es: "", en: "" },
    title: "100% recomendada",
    text: "Me hacía falta traducir mi título universitario y fue rapidísimo y eficaz. Una comunicación perfecta.",
  },
  {
    name: "Maria",
    date: "2026-11-10",
    source: "trustpilot",
    rating: 5,
    lang: "en",
    url: "https://es.trustpilot.com/reviews/6af36727a242bd62431feb22",
    procedure: { es: "", en: "" },
    title: "Top sworn translator",
    text: "Top sworn translator. Jurada Express met the timelines as accorded. I hired her since I needed a sworn translation of my British Naturalisation Certificate. I requested it in a digital format as required per the Spanish Consulate. Very easy, pleasant and professional communication. Very competitive prices. I definitely recommend Elena’s services and, I will not hesitate in contacting her once again if I require any more sworn translations. Thank you!",
  },
  {
    name: "Tracey Williams",
    date: "2026-11-12",
    source: "trustpilot",
    rating: 5,
    lang: "en",
    url: "https://es.trustpilot.com/reviews/6af629a35d61db34c4b4280c",
    procedure: { es: "", en: "" },
    title: "Excellent Service – Highly Recommended",
    text: "Excellent Service – Highly Recommended\n\nExcellent service from Elena at Jurada Express. I required sworn translations for a Spanish visa application being submitted in London and was extremely impressed with the service provided.\n\nHighly competitive pricing, a very fast turnaround and excellent communication throughout. All translations were completed professionally, with digitally signed copies provided promptly and original documents dispatched by DHL.\n\nAn efficient, reliable and professional service from start to finish. I would highly recommend Jurada Express.",
  },
  {
    name: "JOSE JUAN FEMENIA SIMO",
    date: "2026-10-17",
    source: "trustpilot",
    rating: 5,
    lang: "es",
    url: "https://es.trustpilot.com/reviews/6ad3b2a63e4b301ba23d7e6a",
    procedure: { es: "", en: "" },
    title: "¡Profesionalidad, rapidez y atención insuperable!",
    text: "No puedo estar más agradecido/a con el servicio de Elena Peñaranda desde Murcia y Online. Le escribí por correo electrónico sin esperar respuesta inmediata por estar fuera del horario laboral, y para mi sorpresa, ¡me contestó en menos de 10 minutos!\n\nAl tratarse de un documento corto, no solo me ofreció un presupuesto impecable al momento, sino que se ofreció a gestionarlo de inmediato y tenerlo listo en cuestión de horas tras el pago.\n\nEs una auténtica maravilla dar con profesionales tan eficaces, dedicados y comprometidos con el cliente. La recomiendo al 100%. Si tienes cualquier duda para una traducción jurada, escríbele por email o WhatsApp y comprobarás de primera mano la diferencia. ¡Un servicio de 10!",
  },
  // Google.
  // Leídas el 26/09/2026 (fechas aproximadas a partir de etiquetas relativas).
  {
    name: "Kevin Greenall",
    date: "2026-09-26",
    source: "Google",
    rating: 5,
    lang: "en",
    procedure: { es: "", en: "" },
    text: "Incredibly fast and efficient service. You also make the process very easy. Thankyou",
  },
  {
    name: "Youssef Zaghloul",
    date: "2026-09-23",
    source: "Google",
    rating: 5,
    lang: "en",
    procedure: { es: "", en: "" },
    text: "Great service,fast and she translates everything for a very good price and nearly instantly. I would 100% recommend her service.",
  },
  {
    name: "Reka P",
    date: "2026-09-12",
    source: "Google",
    rating: 5,
    lang: "en",
    procedure: { es: "", en: "" },
    text: "Elena did an amazing job! She responded immediately to my request and did the translation of a few documents within 1,5 hours. I‘m so happy I found her, it‘s a flawless service! Thank you very much!",
  },
  {
    name: "Casa Walsh",
    date: "2026-09-12",
    source: "Google",
    rating: 5,
    lang: "en",
    procedure: { es: "", en: "" },
    text: "Speedy responses and great service provided thank you",
  },
  // Leídas el 07/09/2026. Matt Marson y Emilia Crawley aparecían en Maps el
  // 26/09/2026 con etiqueta "4 weeks ago" (≈ 29/08); se conserva la fecha y
  // el texto completo ya transcritos (en Maps el de Emilia sale truncado).
  {
    name: "Laura Pay Garcia",
    date: "2026-09-04",
    source: "Google",
    rating: 5,
    lang: "es",
    procedure: { es: "", en: "" },
    text: "Un trabajo impecable y rápido. Muy contenta",
  },
  {
    name: "Paul Capelle",
    date: "2026-09-01",
    source: "Google",
    rating: 5,
    lang: "en",
    procedure: { es: "", en: "" },
    text: "Elena was a joy to work with, the translated documents were provided within a couple of hours of getting in touch with her. Excellent job and wouldn't hesitate to use Elena again!",
  },
  {
    name: "Ona Montes Vivancos",
    date: "2026-09-01",
    source: "Google",
    rating: 5,
    lang: "es",
    procedure: { es: "", en: "" },
    text: "No puedo estar más agradecida por el trabajo y, sobre todo, por la implicación de esta traductora. Tuve varios problemas con la Embajada relacionados con la traducción de los certificados de nacimiento de mis hijos y ella no solo realizó su trabajo de manera impecable, sino que se involucró muchísimo hasta conseguir solucionar todos los problemas.\n\nLo que más valoro es que en todo momento sentí que se lo tomaba como si fuera un problema suyo personal. Estuvo pendiente de cada detalle, buscó soluciones y consiguió resolverlo todo súper rápido, con una profesionalidad y una cercanía increíbles.\n\nEn una situación que para mí era muy importante y bastante estresante, encontrar a alguien que se implique de esta manera marca una diferencia enorme.\n\n100% recomendable. Profesional, rápida, atenta y, sobre todo, una persona que realmente se preocupa por sus clientes. Muchísimas gracias por toda la ayuda y por haberlo solucionado todo. 🙏❤️",
  },
  {
    name: "Adriana Abellan",
    date: "2026-08-31",
    source: "Google",
    rating: 5,
    lang: "es",
    procedure: { es: "", en: "" },
    text: "¡Todo genial! Elena es una gran profesional, muy cercana y muy rápida. Me ayudó con todos los procesos que tenían que ver con mi caso y, en cada paso del mismo, me fue aconsejando, cosa que no me ha pasado antes. La volveré a contratar sin duda. 5/5",
  },
  {
    name: "Matt Marson",
    date: "2026-08-31",
    source: "Google",
    rating: 5,
    lang: "en",
    procedure: { es: "", en: "" },
    text: "Impressive service, good price and swift transaction. The document was translated very quickly. First class service!",
  },
  {
    name: "Jesus Gomez",
    date: "2026-08-31",
    source: "Google",
    rating: 5,
    lang: "es",
    procedure: { es: "", en: "" },
    text: "Excelente profesional y totalmente recomendable. Desde el primer momento destaca por su atención cercana, rapidez y profesionalidad. Además de dominar perfectamente el idioma, conoce a la perfección los procedimientos y requisitos de la traducción jurada, algo fundamental cuando se trata de documentación oficial.\n\nEl trabajo ha sido impecable, tanto por la calidad de la traducción como por el cuidado de todos los detalles y la orientación durante el proceso. Da mucha tranquilidad contar con una traductora jurada que no solo conoce el idioma, sino también los trámites y procedimientos necesarios para que la documentación sea válida.\n\nProfesionalidad, conocimiento y una atención excelente. Sin duda, repetiría y la recomendaría al 100 %.",
  },
  {
    name: "Emilia Crawley",
    date: "2026-08-31",
    source: "Google",
    rating: 5,
    lang: "en",
    procedure: { es: "", en: "" },
    text: "Elena has been so incredibly responsive and helpful with my recent request for a translation of my marriage certificate and apostille.\nHer communication is clear and concise , her command of English language is perfect and I found her help to be invaluable.\nI will definitely continue to use Elena for any future translations and recommend her services. Thank you so much Elena .",
  },
];

// Criterio editorial de la home: se muestran seis reseñas, intercalando
// Trustpilot y Google (la primera es de Trustpilot para que se vea al menos
// una sin desplazarse dentro del bloque, también en móvil), elegidas por
// lo útiles que son comercialmente (Embajada, colegiación en Irlanda,
// rapidez, consulado). El resto se ve en cada ficha con los botones
// "Ver las N en Google" / "Ver las N en Trustpilot" (REVIEW_STATS). Cada
// entrada es [nombre, fuente]; si deja de existir en REVIEWS, se ignora.
export const FEATURED_REVIEWS = [
  ["Valentina Mollá Sagredo", "trustpilot"],
  ["Ona Montes Vivancos", "google"],
  ["Maria", "trustpilot"],
  ["Paul Capelle", "google"],
  ["José Luis", "trustpilot"],
  ["Jesus Gomez", "google"],
];

/** Clave normalizada de la fuente: "google" | "trustpilot" | … */
export const sourceKey = (r) => String(r?.source || "").trim().toLowerCase();
/** Nombre de la fuente para mostrar en la tarjeta. */
export const sourceLabel = (r) =>
  ({ google: "Google", trustpilot: "Trustpilot" })[sourceKey(r)] || r.source;

function isPublishable(r) {
  return (
    r &&
    typeof r.name === "string" &&
    r.name.trim() !== "" &&
    typeof r.date === "string" &&
    !Number.isNaN(Date.parse(r.date)) &&
    typeof r.source === "string" &&
    r.source.trim() !== "" &&
    typeof r.text === "string" &&
    r.text.trim() !== ""
  );
}

/**
 * Reseñas válidas para publicar: las que traen nombre, fecha, origen y
 * texto. Se devuelven TODAS, con independencia del idioma: una reseña en
 * inglés de un cliente real es un argumento comercial también en la home
 * en español (y viceversa). El componente muestra la etiqueta del idioma.
 */
export function getPublishableReviews() {
  return REVIEWS.filter(isPublishable);
}

/** Las reseñas destacadas de la home, en el orden editorial. */
export function getFeaturedReviews() {
  const all = getPublishableReviews();
  const featured = FEATURED_REVIEWS.map(([n, src]) =>
    all.find((r) => r.name === n && sourceKey(r) === src)
  ).filter(Boolean);
  return featured.length > 0 ? featured : all.slice(0, 6);
}

// Alias histórico: la URL de la ficha de Google sale de REVIEW_STATS.
export const GOOGLE_BUSINESS_URL = GOOGLE_REVIEWS_URL;
