// app/llms.txt/route.js
//
// Sirve /llms.txt a partir de content/llms.txt (antes estaba fijo en
// public/). El texto lleva marcadores que se rellenan en el build
// (force-static), para que las cifras se actualicen en un único sitio:
//   {{REVIEWS}}          reseñas de Google y Trustpilot (content/reviews.js
//                        → REVIEW_STATS) con los enlaces a las dos fichas
//   {{PACK_ES:<id>}}     precio de un pack en formato «149 €»
//   {{PACK_EN:<id>}}     precio de un pack en formato «€149»
//                        (content/site.js → PACKS)
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  REVIEW_STATS,
  REVIEW_TEXT,
  formatScore,
} from "../../content/reviews";
import { packPrice } from "../../content/site";

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
  const body = fillPacks(template.replaceAll("{{REVIEWS}}", reviewsLine()));
  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
