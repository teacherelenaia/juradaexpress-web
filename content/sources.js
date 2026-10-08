// content/sources.js
//
// Opciones del campo «¿Cómo nos has conocido?» de la calculadora de
// presupuesto (medición de Google Ads, 08/10/2026). Archivo ligero sin
// otro contenido: lo importan QuoteCalculator.js (cliente) y
// app/api/quote/route.js (servidor, para poner la etiqueta en el email).
export const SOURCE_OPTIONS = [
  { value: "google", es: "Buscando en Google", en: "Searching on Google" },
  { value: "google-ads", es: "Un anuncio de Google", en: "A Google ad" },
  { value: "maps", es: "Ficha de Google Maps", en: "Google Maps listing" },
  { value: "ia", es: "ChatGPT u otra IA", en: "ChatGPT or another AI" },
  { value: "recomendacion", es: "Me lo recomendó un cliente", en: "A client recommended you" },
  { value: "despacho", es: "Un despacho o gestoría", en: "A law firm or agency" },
  { value: "redes", es: "Redes sociales", en: "Social media" },
  { value: "otro", es: "Otro", en: "Other" },
];

export function sourceLabel(value, locale = "es") {
  const o = SOURCE_OPTIONS.find((x) => x.value === value);
  return o ? (locale === "en" ? o.en : o.es) : "";
}
