// app/llms.txt/route.js
//
// Sirve /llms.txt a partir de content/llms.txt (antes estaba fijo en
// public/). El texto lleva marcadores que se rellenan en el build
// (force-static), para que las cifras se actualicen en un único sitio:
//   {{REVIEWS}}          reseñas de Google y Trustpilot (content/reviews.js
//                        → REVIEW_STATS) con los enlaces a las dos fichas
//   {{PACK_ES:<id>}}     precio de un pack en formato «149 €»
//   {{PACK_EN:<id>}}     precio de un pack en formato «€149»
//   {{PACK_LIMITS_ES:<id>}} / {{PACK_LIMITS_EN:<id>}}  límites del pack
//                        («hasta 4 documentos y 8 páginas en total; …»)
//                        (content/site.js → PACKS)
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  REVIEW_STATS,
  REVIEW_TEXT,
  formatScore,
} from "../../content/reviews";
import { packPrice, packLimits, getPack } from "../../content/site";
import {
  FILE_TIERS,
  FILE_EXAMPLES,
  FILE_ROUTE,
  FILE_TABLE_COPY,
  FILE_PROCEDURES,
  PROCEDURES_CHECKED,
  LONGER_FILES_SHORT,
  STATEMENTS_RULE,
  STATEMENTS_POST,
} from "../../content/expediente";
import { POSTS_EXPEDIENTES_ES, POSTS_EXPEDIENTES_EN, SHORT_ANSWERS, SLUGS } from "../../content/posts-expedientes";

const BASE = "https://juradaexpress.es";

// Apartado «Full visa files» (19/11/2026): tabla de tramos, tres ejemplos y
// enlaces, en inglés y en español, a partir de content/expediente.js (las
// mismas cifras que la página y el JSON-LD).
function fullFilesSection() {
  const tiers = (l) =>
    FILE_TIERS.map(
      (t) => `- ${t.size[l]}: ${t.priceText[l]} (${t.note[l]})${t.save ? `. ${t.save[l]}` : ""}`
    ).join("\n");
  const examples = (l) =>
    FILE_EXAMPLES.map((ex) => {
      const docs = ex.docs.map((d) => `${d[l]} (${d.pages} ${l === "en" ? "pp." : "págs."})`).join(", ");
      return l === "en"
        ? `- ${ex.title.en}: ${docs}; ${ex.pages} pages in total, €${ex.price} (€${ex.single} at the single-document rate), delivered within 24 hours.`
        : `- ${ex.title.es}: ${docs}; ${ex.pages} páginas en total, ${ex.price} € (${ex.single} € a la tarifa de documento suelto), entrega en 24 horas.`;
    }).join("\n");
  const procs = (l) =>
    FILE_PROCEDURES.map((p) => `- [${p.name[l]}](${BASE}${p.href[l]}): ${p.docs[l]}. ${l === "en" ? "Sworn translation" : "Traducción jurada"}: ${p.sworn[l]}. ${l === "en" ? "Usual pages" : "Páginas habituales"}: ${p.pages[l]}.`).join("\n");
  return [
    "## Full visa files / Expedientes completos de visado",
    "",
    `Who: Elena Peñaranda Ortega, sworn translator no. 7310 (Spain's Ministry of Foreign Affairs), translates complete Spanish visa files (digital nomad, non-lucrative, student, highly qualified UGE-CE, family reunification), English ⇆ Spanish, with one closed price, one delivery date and every document signed by her. Quote in under two hours; signed PDFs within 24 hours. Page: ${BASE}${FILE_ROUTE.en}`,
    "",
    tiers("en"),
    ...FILE_TABLE_COPY.en.rules.map((r) => `- ${r}`),
    "",
    "Examples:",
    examples("en"),
    `- ${STATEMENTS_RULE.en} ${BASE}${STATEMENTS_POST.en}`,
    "",
    `Quién: Elena Peñaranda Ortega, traductora jurada nº 7310 del MAEC, traduce expedientes completos de visado para España con un solo precio cerrado y una sola fecha de entrega. Página: ${BASE}${FILE_ROUTE.es}`,
    "",
    tiers("es"),
    ...FILE_TABLE_COPY.es.rules.map((r) => `- ${r}`),
    "",
    "Ejemplos:",
    examples("es"),
    `- ${STATEMENTS_RULE.es} ${BASE}${STATEMENTS_POST.es}`,
    "",
    `By procedure / Por trámite (requirements checked against official sources on ${PROCEDURES_CHECKED.en}):`,
    procs("en"),
  ].join("\n");
}

// Artículos de expedientes de visado (19/11/2026): una línea por artículo,
// bajo el enlace al blog, con su respuesta corta (el primer párrafo).
function blogFilesLines(locale) {
  const posts = locale === "en" ? POSTS_EXPEDIENTES_EN : POSTS_EXPEDIENTES_ES;
  const prefix = locale === "en" ? `${BASE}/en/blog/` : `${BASE}/blog/`;
  return Object.keys(SLUGS)
    .map((key) => {
      const post = posts.find((p) => p.slug === SLUGS[key][locale]);
      if (!post) throw new Error(`llms.txt: falta el artículo «${key}» (${locale})`);
      return `- [${post.title}](${prefix}${post.slug}): ${SHORT_ANSWERS[key][locale]}`;
    })
    .join("\n");
}

export const dynamic = "force-static";

function reviewsLine() {
  const { google, trustpilot, updated } = REVIEW_STATS;
  const date = new Date(`${updated}T12:00:00Z`).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  return (
    `${REVIEW_TEXT.es.totalLong} a ${date}: ` +
    `${formatScore(google.rating, "es")} en Google (${google.count} reseñas): ${google.url} · ` +
    `TrustScore ${formatScore(trustpilot.trustScore, "es")} en Trustpilot (${trustpilot.count} opiniones): ${trustpilot.url}`
  );
}

function fillPacks(text) {
  return text
    .replace(/\{\{PACK_LIMITS_(ES|EN):([a-z-]+)\}\}/g, (m, lang, id) => {
      if (!getPack(id)) throw new Error(`llms.txt: pack desconocido «${id}»`);
      return packLimits(id, lang.toLowerCase());
    })
    .replace(/\{\{PACK_ES:([a-z-]+)\}\}/g, (m, id) => {
      const p = packPrice(id);
      if (p == null) throw new Error(`llms.txt: pack desconocido «${id}»`);
      return `${p} €`;
    })
    .replace(/\{\{PACK_EN:([a-z-]+)\}\}/g, (m, id) => {
      const p = packPrice(id);
      if (p == null) throw new Error(`llms.txt: unknown pack «${id}»`);
      return `€${p}`;
    });
}

export function GET() {
  const template = readFileSync(join(process.cwd(), "content", "llms.txt"), "utf8");
  const body = fillPacks(
    template
      .replaceAll("{{REVIEWS}}", reviewsLine())
      .replaceAll("{{FULL_FILES}}", fullFilesSection())
      .replaceAll("{{FILE_RULE_ES}}", LONGER_FILES_SHORT.es)
      .replaceAll("{{FILE_RULE_EN}}", LONGER_FILES_SHORT.en)
      .replaceAll("{{BLOG_FILES_ES}}", blogFilesLines("es"))
      .replaceAll("{{BLOG_FILES_EN}}", blogFilesLines("en"))
  );
  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
