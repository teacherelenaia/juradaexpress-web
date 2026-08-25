// content/reviews.js
//
// Reseñas reales de clientes. Este archivo está VACÍO a propósito: la
// sección "Opiniones" de la home (ES y EN) solo se publica cuando aquí hay
// reseñas reales. Nunca inventes reseñas ni uses ejemplos.
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
// - `text` es literal: no se reescribe ni se "mejora".
// - Si `lang` no está, la reseña se muestra en los dos idiomas.

export const REVIEWS = [];

/** Reseñas válidas para publicar: las que traen nombre, fecha, origen y texto. */
export function getPublishableReviews(locale = "es") {
  return REVIEWS.filter(
    (r) =>
      r &&
      typeof r.name === "string" &&
      r.name.trim() !== "" &&
      typeof r.date === "string" &&
      !Number.isNaN(Date.parse(r.date)) &&
      typeof r.source === "string" &&
      r.source.trim() !== "" &&
      typeof r.text === "string" &&
      r.text.trim() !== "" &&
      (!r.lang || r.lang === locale)
  );
}

// Ficha de Google Business desde la que se recogen las reseñas.
// [[COMPLETAR: URL de la ficha de Google Business]]
// Mientras valga null, la home no muestra ningún enlace a Google.
export const GOOGLE_BUSINESS_URL = null;
