// app/lib/indexnow.mjs
//
// IndexNow (10/10/2026): aviso a Bing y Yandex (y, a través de ellos, a los
// motores de respuesta que usan el índice de Bing, como ChatGPT) de las URL
// nuevas o cambiadas. Sin aviso, Bing tarda semanas en leer una página nueva.
//
// Lo comparten la ruta app/api/indexnow/route.js (la llama la GitHub Action
// tras cada push a main) y el script scripts/indexnow.mjs (envío a mano).
// Es un módulo .mjs para que Node lo importe directamente desde el script
// sin pasar por el bundler de Next.
//
// Protocolo: https://www.indexnow.org/documentation. La clave se demuestra
// con un archivo <clave>.txt en la raíz del host; aquí lo sirve
// app/indexnow-key/route.js a través de la reescritura de next.config.mjs
// (/<clave>.txt → /indexnow-key), así no hay que generar archivos en public/.

export const SITE_HOST = "juradaexpress.es";
export const SITE_URL = `https://${SITE_HOST}`;
export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
// Máximo de URL por envío según el protocolo.
export const MAX_URLS = 10000;
// Formato de clave del protocolo: 8-128 caracteres [A-Za-z0-9-]. La nuestra
// son 32 hexadecimales (crypto.randomBytes(16).toString("hex")).
export const KEY_RE = /^[A-Za-z0-9-]{8,128}$/;

export const isValidKey = (key) => KEY_RE.test(String(key || ""));

export const keyLocation = (key) => `${SITE_URL}/${key}.txt`;

const decodeXml = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");

// URL del sitio: acepta rutas («/precios») y URL absolutas del propio host;
// descarta el resto y los duplicados.
export function normalizeUrls(list) {
  const out = [];
  for (const raw of list || []) {
    const s = String(raw || "").trim();
    if (!s) continue;
    let url;
    try {
      url = new URL(s.startsWith("/") ? `${SITE_URL}${s}` : s);
    } catch {
      continue;
    }
    if (url.protocol !== "https:" || url.host !== SITE_HOST) continue;
    url.hash = "";
    const href = url.toString();
    if (!out.includes(href)) out.push(href);
  }
  return out;
}

// Lee las <loc> del sitemap (el de producción por defecto).
export async function sitemapUrls(sitemapUrl = `${SITE_URL}/sitemap.xml`, fetchImpl = fetch) {
  const res = await fetchImpl(sitemapUrl, { headers: { Accept: "application/xml" } });
  if (!res.ok) throw new Error(`No puedo leer ${sitemapUrl}: HTTP ${res.status}`);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => decodeXml(m[1]));
  return normalizeUrls(locs);
}

// Envía las URL a IndexNow en lotes de MAX_URLS. Devuelve un resumen por lote.
// Códigos del protocolo: 200 OK, 202 aceptado (clave pendiente de validar),
// 400 petición incorrecta, 403 clave no válida, 422 URL que no pertenecen al
// host o clave que no coincide, 429 demasiadas peticiones.
export async function submitToIndexNow({ key, urls, fetchImpl = fetch }) {
  if (!isValidKey(key)) throw new Error("Clave de IndexNow no válida (8-128 caracteres [A-Za-z0-9-])");
  const list = normalizeUrls(urls);
  if (list.length === 0) throw new Error("No hay URL del sitio que enviar");
  const batches = [];
  for (let i = 0; i < list.length; i += MAX_URLS) {
    const urlList = list.slice(i, i + MAX_URLS);
    const res = await fetchImpl(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: SITE_HOST,
        key,
        keyLocation: keyLocation(key),
        urlList,
      }),
    });
    batches.push({ status: res.status, ok: res.ok, count: urlList.length });
  }
  return {
    ok: batches.every((b) => b.ok),
    submitted: list.length,
    batches,
    keyLocation: keyLocation(key),
  };
}
