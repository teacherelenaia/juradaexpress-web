// content/usd.js
//
// Conversión EUR → USD de las páginas para el mercado de EE. UU. Archivo
// ligero, SIN contenido, para que los componentes cliente (QuoteCalculator
// en modo despacho) y /api/quote no arrastren el texto de content/us-docs.js.
// content/us-docs.js reexporta estas constantes.

// Tipo de cambio fijo de referencia EUR → USD y redondeo a 5 $.
export const USD_RATE = 1.1;
// Tarifa fija del envío en papel por mensajería a Estados Unidos (USD).
export const US_SHIPPING_USD = 25;

export const toUsd = (eur) =>
  eur == null ? null : Math.round((eur * USD_RATE) / 5) * 5;
