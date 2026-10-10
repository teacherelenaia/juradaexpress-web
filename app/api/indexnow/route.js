// app/api/indexnow/route.js
//
// POST /api/indexnow (10/10/2026): envía a IndexNow (Bing, Yandex) las URL
// del sitemap de producción o la lista que venga en el cuerpo
// ({ "urls": ["/ruta", "https://juradaexpress.es/otra"] }).
//
// Protegida con la misma clave de IndexNow (INDEXNOW_KEY) en la cabecera
// `Authorization: Bearer <clave>`: sin cabecera o con otra clave responde
// 401; sin la variable configurada, 503. La llama la GitHub Action
// .github/workflows/indexnow.yml tres minutos después de cada push a main,
// cuando el deploy de Vercel ya está servido; también se puede llamar a mano
// (ver docs/MEDICION-GOOGLE-ADS.md, sección «IndexNow»).
import { timingSafeEqual } from "node:crypto";
import { isValidKey, sitemapUrls, submitToIndexNow } from "../../lib/indexnow.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 64 * 1024;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });

function sameKey(a, b) {
  const x = Buffer.from(String(a || ""));
  const y = Buffer.from(String(b || ""));
  return x.length > 0 && x.length === y.length && timingSafeEqual(x, y);
}

export async function POST(req) {
  const key = process.env.INDEXNOW_KEY;
  if (!isValidKey(key)) return json({ error: "INDEXNOW_KEY no configurada" }, 503);

  const auth = req.headers.get("authorization") || "";
  const bearer = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (!sameKey(bearer, key)) return json({ error: "No autorizado" }, 401);

  let urls = null;
  try {
    const declared = Number(req.headers.get("content-length") || 0);
    if (declared > MAX_BODY_BYTES) return json({ error: "Cuerpo demasiado grande" }, 413);
    const raw = await req.text();
    if (raw && raw.trim()) {
      const data = JSON.parse(raw);
      if (data && Array.isArray(data.urls)) urls = data.urls.slice(0, 10000);
    }
  } catch {
    return json({ error: "JSON no válido" }, 400);
  }

  try {
    const list = urls && urls.length ? urls : await sitemapUrls();
    const result = await submitToIndexNow({ key, urls: list });
    return json(
      {
        ok: result.ok,
        submitted: result.submitted,
        batches: result.batches,
        keyLocation: result.keyLocation,
      },
      result.ok ? 200 : 502
    );
  } catch (err) {
    console.error("[indexnow]", err);
    return json({ error: String(err && err.message ? err.message : err) }, 500);
  }
}
