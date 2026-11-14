// content/pricing.js
//
// Cálculo del precio orientativo de la calculadora (portada ES/EN,
// /traductor-jurado-ingles y formulario de despachos) y de /api/quote, en
// un único sitio (14/11/2026). Es lo que dice la web:
//
//   - Documentos con precio fijo en content/documents.js (partida,
//     matrimonio, penales, permiso, título, certificado de empresa): el
//     precio fijo cubre hasta FIXED_PRICE_MAX_PAGES páginas; cada página por
//     encima, PRICE_PER_PAGE.
//   - Documentos sin precio fijo (contrato, escritura, expediente,
//     DNI/pasaporte, testamento, certificado médico, otro): PRICE_PER_PAGE
//     por página con un mínimo de MIN_DOC_PRICE (= MIN_PRICE del catálogo).
//   - Urgente (entregar antes del plazo normal): hasta +URGENCY_SURCHARGE
//     sobre ese total; la calculadora muestra el máximo con la nota
//     «Recargo máximo; te confirmo el importe exacto».
//
// Ejemplos: partida 1 o 2 páginas = 35 €; partida 4 páginas = 75 €;
// contrato 12 páginas = 240 €; contrato 12 páginas urgente = 312 €
// (tests/precio-calculadora.spec.mjs).
//
// Sin dependencias salvo content/documents.js y content/usd.js (con extensión
// explícita), para
// que los tests de Node puedan importarlo. content/site.js reexporta
// PRICE_PER_PAGE y URGENCY_SURCHARGE desde aquí.
import { MIN_PRICE } from "./documents.js";
import { toUsd } from "./usd.js";

// Precio por página de los documentos largos y de las páginas por encima
// del precio fijo, en euros, IVA incluido (10/10/2026).
export const PRICE_PER_PAGE = 20;
// Páginas que cubre el precio fijo de un documento del catálogo.
export const FIXED_PRICE_MAX_PAGES = 2;
// Recargo MÁXIMO de urgencia (hasta el 30 %, a consultar).
export const URGENCY_SURCHARGE = 0.3;
// Mínimo por documento de los que van por página (35 €).
const MIN_DOC = MIN_PRICE;

/** Precio sin urgencia, en euros, de `pages` páginas de `doc`. */
export function basePrice(doc, pages) {
  if (!doc) return null;
  const n = Math.max(1, Math.floor(Number(pages) || 1));
  if (doc.price != null) {
    return doc.price + Math.max(0, n - FIXED_PRICE_MAX_PAGES) * PRICE_PER_PAGE;
  }
  return Math.max(MIN_DOC, n * PRICE_PER_PAGE);
}

/**
 * Formulario de despachos (EE. UU.), en dólares y sin urgencia (14/11/2026):
 * solo los documentos con precio fijo llevan estimación, el precio fijo en
 * dólares hasta FIXED_PRICE_MAX_PAGES páginas más unos $20 por página extra
 * (toUsd(PRICE_PER_PAGE)). Los que no tienen precio fijo devuelven null y
 * el formulario dice «Fixed quote in 2 hours», como la tabla de la página.
 */
export function firmPriceUsd(doc, pages) {
  if (!doc || doc.price == null) return null;
  const n = Math.max(1, Math.floor(Number(pages) || 1));
  return toUsd(doc.price) + Math.max(0, n - FIXED_PRICE_MAX_PAGES) * toUsd(PRICE_PER_PAGE);
}

/** Precio orientativo en euros; con `urgent`, el recargo máximo incluido. */
export function estimatePrice(doc, pages, urgent) {
  const base = basePrice(doc, pages);
  if (base == null) return null;
  return Math.round(urgent ? base * (1 + URGENCY_SURCHARGE) : base);
}
