// content/reviews.js
//
// Reseñas reales de clientes, copiadas literalmente de la ficha de Google
// Business "Jurada Express" (5,0 · 7 reseñas a 07/09/2026). La sección
// "Opiniones" de la home (ES y EN) solo se publica cuando aquí hay reseñas
// reales. Nunca inventes reseñas ni uses ejemplos.
//
// Formato de cada reseña (los cuatro campos marcados son obligatorios; si
// falta cualquiera de ellos la reseña se descarta y no se publica):
//
//   {
//     name:   "Nombre y apellido o inicial",  // obligatorio
//     date:   "2026-07-14",                   // obligatorio, ISO YYYY-MM-DD
//     source: "Google",                       // obligatorio: de dónde sale
//     text:   "Texto literal de la reseña.",  // obligatorio
//     rating: 5,                              // opcional, 1-5
//     lang:   "es",                           // opcional: "es" | "en"
//     url:    "https://…",                    // opcional: enlace a la reseña
//   }
//
// Reglas:
// - Solo reseñas publicadas realmente por el cliente en la fuente indicada
//   (Google Business, email autorizado por escrito, etc.).
// - `source` debe poder comprobarse. Si no se puede, la reseña no va.
// - `text` es literal: no se reescribe, no se "mejora", no se corrigen
//   tildes ni puntuación. Los saltos de línea se conservan como \n.
// - `lang` indica el idioma ORIGINAL de la reseña. Todas se muestran en las
//   dos versiones de la web (ES y EN) en su idioma original, con etiqueta.
// - Las fechas salen de las etiquetas relativas de Google ("3 days ago",
//   "6 days ago", "1 week ago") leídas el 07/09/2026 y pueden bailar un
//   día. [[COMPLETAR opcional: día exacto de cada reseña]]

import { GOOGLE_BUSINESS_URL } from "./site";

export const REVIEWS = [
  {
    name: "Laura Pay Garcia",
    date: "2026-09-04",
    source: "Google",
    rating: 5,
    lang: "es",
    text: "Un trabajo impecable y rápido. Muy contenta",
  },
  {
    name: "Paul Capelle",
    date: "2026-09-01",
    source: "Google",
    rating: 5,
    lang: "en",
    text: "Elena was a joy to work with, the translated documents were provided within a couple of hours of getting in touch with her. Excellent job and wouldn't hesitate to use Elena again!",
  },
  {
    name: "Ona Montes Vivancos",
    date: "2026-09-01",
    source: "Google",
    rating: 5,
    lang: "es",
    text: "No puedo estar más agradecida por el trabajo y, sobre todo, por la implicación de esta traductora. Tuve varios problemas con la Embajada relacionados con la traducción de los certificados de nacimiento de mis hijos y ella no solo realizó su trabajo de manera impecable, sino que se involucró muchísimo hasta conseguir solucionar todos los problemas.\n\nLo que más valoro es que en todo momento sentí que se lo tomaba como si fuera un problema suyo personal. Estuvo pendiente de cada detalle, buscó soluciones y consiguió resolverlo todo súper rápido, con una profesionalidad y una cercanía increíbles.\n\nEn una situación que para mí era muy importante y bastante estresante, encontrar a alguien que se implique de esta manera marca una diferencia enorme.\n\n100% recomendable. Profesional, rápida, atenta y, sobre todo, una persona que realmente se preocupa por sus clientes. Muchísimas gracias por toda la ayuda y por haberlo solucionado todo. 🙏❤️",
  },
  {
    name: "Adriana Abellan",
    date: "2026-08-31",
    source: "Google",
    rating: 5,
    lang: "es",
    text: "¡Todo genial! Elena es una gran profesional, muy cercana y muy rápida. Me ayudó con todos los procesos que tenían que ver con mi caso y, en cada paso del mismo, me fue aconsejando, cosa que no me ha pasado antes. La volveré a contratar sin duda. 5/5",
  },
  {
    name: "Matt Marson",
    date: "2026-08-31",
    source: "Google",
    rating: 5,
    lang: "en",
    text: "Impressive service, good price and swift transaction. The document was translated very quickly. First class service!",
  },
  {
    name: "Jesus Gomez",
    date: "2026-08-31",
    source: "Google",
    rating: 5,
    lang: "es",
    text: "Excelente profesional y totalmente recomendable. Desde el primer momento destaca por su atención cercana, rapidez y profesionalidad. Además de dominar perfectamente el idioma, conoce a la perfección los procedimientos y requisitos de la traducción jurada, algo fundamental cuando se trata de documentación oficial.\n\nEl trabajo ha sido impecable, tanto por la calidad de la traducción como por el cuidado de todos los detalles y la orientación durante el proceso. Da mucha tranquilidad contar con una traductora jurada que no solo conoce el idioma, sino también los trámites y procedimientos necesarios para que la documentación sea válida.\n\nProfesionalidad, conocimiento y una atención excelente. Sin duda, repetiría y la recomendaría al 100 %.",
  },
  {
    name: "Emilia Crawley",
    date: "2026-08-31",
    source: "Google",
    rating: 5,
    lang: "en",
    text: "Elena has been so incredibly responsive and helpful with my recent request for a translation of my marriage certificate and apostille.\nHer communication is clear and concise , her command of English language is perfect and I found her help to be invaluable.\nI will definitely continue to use Elena for any future translations and recommend her services. Thank you so much Elena .",
  },
];

// Criterio editorial de la home: por defecto se muestran las 4 reseñas
// más útiles comercialmente (hablan de Embajada, procedimientos, rapidez y
// apostilla), en este orden. El resto se ve en Google con el botón
// "Ver las 7 en Google". Si un nombre deja de existir en REVIEWS, se
// ignora sin romper nada.
export const FEATURED_REVIEW_NAMES = [
  "Ona Montes Vivancos",
  "Jesus Gomez",
  "Paul Capelle",
  "Emilia Crawley",
];

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
  const featured = FEATURED_REVIEW_NAMES.map((n) =>
    all.find((r) => r.name === n)
  ).filter(Boolean);
  return featured.length > 0 ? featured : all.slice(0, 4);
}

// La URL de la ficha de Google vive en content/site.js (única fuente);
// se re-exporta aquí por comodidad de quien importe reseñas.
export { GOOGLE_BUSINESS_URL };
