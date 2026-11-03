// app/llms.txt/route.js
//
// Sirve /llms.txt a partir de content/llms.txt (antes estaba fijo en
// public/). El texto lleva el marcador {{GOOGLE_REVIEWS}}, que se rellena
// con googleReviews de content/site.js, para que el recuento de reseñas
// se actualice en un único sitio. Se genera en el build (force-static).
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { googleReviews } from "../../content/site";

export const dynamic = "force-static";

function googleReviewsLine() {
  const rating = googleReviews.rating.toLocaleString("es-ES", {
    minimumFractionDigits: 1,
  });
  const date = new Date(`${googleReviews.checkedAt}T12:00:00Z`).toLocaleDateString(
    "es-ES",
    { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }
  );
  return `${rating} en Google (${googleReviews.count} reseñas a ${date})`;
}

export function GET() {
  const template = readFileSync(join(process.cwd(), "content", "llms.txt"), "utf8");
  const body = template.replaceAll("{{GOOGLE_REVIEWS}}", googleReviewsLine());
  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
