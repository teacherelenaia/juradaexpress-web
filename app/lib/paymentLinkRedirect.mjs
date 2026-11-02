// app/lib/paymentLinkRedirect.mjs
//
// Redirección de los Payment Links a la web tras el pago (02/11/2026).
//
// Los Payment Links nacen con la página de confirmación de Stripe
// («hosted_confirmation»), así que el cliente no vuelve a juradaexpress.es y
// la conversión «Compra en la web (Stripe)» de Google Ads no se registra.
// Stripe no permite fijar otra cosa por defecto en la cuenta: la ruta
// app/api/stripe-webhook la pone al recibir `payment_link.created`, y
// scripts/payment-links-redirect.mjs la pone a los enlaces ya creados.
// Las dos usan esta misma regla.
//
// Regla (la del 25/10/2026, cuando se pusieron los 61 enlaces de entonces):
//   1. Manda el idioma del concepto (nombre y descripción del producto y
//      descripción de la línea): en inglés → /en/thank-you; en español →
//      /gracias. Un enlace en dólares con el concepto en español
//      («Traducción jurada EN>ES – High School Diploma…») va a /gracias.
//   2. Si el texto no decide (vacío, solo nombres propios o empate), manda la
//      moneda: USD o GBP → /en/thank-you; el resto → /gracias.
//
// Sin dependencias: lo importan tanto Next (servidor) como node a pelo.

export const SITE = "https://juradaexpress.es";
export const REDIRECT_ES = `${SITE}/gracias?session_id={CHECKOUT_SESSION_ID}`;
export const REDIRECT_EN = `${SITE}/en/thank-you?session_id={CHECKOUT_SESSION_ID}`;

const EN_CURRENCIES = new Set(["usd", "gbp"]);

// Palabras que delatan el idioma del concepto. Solo palabras completas y en
// minúsculas sin tildes (se normaliza antes). Ojo con las que se escriben
// igual en los dos idiomas («apostilla» sí es solo español, «apostille» solo
// inglés; «total», «pack», «visa», «digital», «notarial» no cuentan, ni
// «en» o «a», que salen en «EN>ES» y en los dos idiomas).
const ES_WORDS = new Set([
  "traduccion", "traducciones", "jurada", "juradas", "jurado", "certificado",
  "certificados", "certificacion", "titulo", "titulos", "partida", "nacimiento",
  "matrimonio", "defuncion", "antecedentes", "penales", "permiso", "conducir",
  "carnet", "expediente", "academico", "notas", "apostilla", "apostillas",
  "legalizacion", "legitimacion", "diligencia", "escritura",
  "poder", "pagina", "paginas", "pag", "pags", "urgente", "envio", "copia",
  "papel", "firmado", "firmada", "anticipo", "resto", "suplemento", "pago",
  "presupuesto", "encargo", "documento", "documentos", "carta", "entidad",
  "bancario", "bancaria", "empadronamiento", "renta", "declaracion", "visado",
  "nomada", "estudiante", "nomina", "nominas", "contrato",
  "de", "del", "la", "las", "los", "el", "y", "con", "para", "sin", "por",
  "mas", "un", "una",
]);
const EN_WORDS = new Set([
  "translation", "translations", "sworn", "certified", "certificate",
  "certificates", "birth", "marriage", "death", "criminal", "record",
  "records", "background", "check", "driving", "driver", "drivers", "licence",
  "license", "degree", "diploma", "transcript", "transcripts", "apostille",
  "apostilles", "page", "pages", "urgent", "shipping", "copy", "paper",
  "signed", "deposit", "balance", "remaining", "supplement", "payment",
  "quote", "order", "letter", "bank", "statement", "statements", "pension",
  "income", "tax", "return", "student", "payslip", "payslips", "contract",
  "power", "attorney", "deed", "notarized", "school", "high",
  "of", "the", "and", "with", "for", "without", "plus", "to", "an",
]);

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

// Puntuación del idioma de un texto: >0 inglés, <0 español, 0 no decide.
export function languageScore(texts) {
  let es = 0;
  let en = 0;
  for (const t of texts) {
    const raw = String(t || "");
    // Tildes, eñes y signos de apertura solo aparecen en español.
    if (/[áéíóúñ¿¡]/i.test(raw)) es += 1;
    for (const w of normalize(raw).split(/[^a-z]+/)) {
      if (!w) continue;
      if (ES_WORDS.has(w)) es += 1;
      if (EN_WORDS.has(w)) en += 1;
    }
  }
  return en - es;
}

// texts: nombres/descripciones de producto y descripciones de línea.
// Devuelve { lang: "en" | "es", url, reason }.
export function chooseRedirect({ currency, texts = [] }) {
  const score = languageScore(texts.filter(Boolean));
  if (score > 0) return { lang: "en", url: REDIRECT_EN, reason: "concepto en inglés" };
  if (score < 0) return { lang: "es", url: REDIRECT_ES, reason: "concepto en español" };
  const cur = String(currency || "").toLowerCase();
  if (EN_CURRENCIES.has(cur)) return { lang: "en", url: REDIRECT_EN, reason: `moneda ${cur.toUpperCase()}` };
  return { lang: "es", url: REDIRECT_ES, reason: `moneda ${cur.toUpperCase() || "?"}` };
}

// Textos de un listado de line_items de Payment Link con
// expand: ["data.price.product"].
export function textsFromLineItems(lineItems) {
  const out = [];
  for (const li of lineItems || []) {
    out.push(li?.description);
    const p = li?.price?.product;
    if (p && typeof p === "object") out.push(p.name, p.description);
  }
  return out.filter(Boolean);
}

// ¿Ya redirige a algún sitio? Entonces no se toca (idempotente, y respeta
// cualquier redirección que Elena haya puesto a mano).
export function hasRedirect(link) {
  return link?.after_completion?.type === "redirect";
}

// Pone la redirección a un Payment Link si no la tiene.
// Devuelve { changed, url?, lang?, reason? }.
export async function ensurePaymentLinkRedirect(stripe, link) {
  if (!link?.id) return { changed: false, reason: "sin id" };
  if (hasRedirect(link)) return { changed: false, reason: "ya redirige" };
  const items = await stripe.paymentLinks.listLineItems(link.id, {
    limit: 100,
    expand: ["data.price.product"],
  });
  const choice = chooseRedirect({ currency: link.currency, texts: textsFromLineItems(items.data) });
  await stripe.paymentLinks.update(link.id, {
    after_completion: { type: "redirect", redirect: { url: choice.url } },
  });
  return { changed: true, ...choice };
}
