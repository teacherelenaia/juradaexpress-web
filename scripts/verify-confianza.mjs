// scripts/verify-confianza.mjs
//
// Comprueba, sobre todas las URL de /sitemap.xml, que cada página pública
// (todas menos aviso legal, privacidad y cookies) lleva la franja de
// confianza: el número de reseñas de Google (GOOGLE_REVIEW_COUNT de
// content/site.js, «51 reseñas» / «51 reviews») y la garantía de corrección
// (GUARANTEE_SHORT, «Si la rechazan por un error mío, la corrijo gratis» /
// «If it’s rejected because of my mistake, I fix it free»). Las tres páginas
// legales deben NO llevarla, y las portadas la llevan una sola vez. Al final
// comprueba que no queda «FOTO PENDIENTE» en ningún archivo del repo.
//
//   node scripts/verify-confianza.mjs                 (servidor en :3000)
//   node scripts/verify-confianza.mjs --base=http://127.0.0.1:3217
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const SITE = "https://juradaexpress.es";
const arg = (name) =>
  process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const BASE = (arg("base") || "http://127.0.0.1:3000").replace(/\/$/, "");

// content/site.js importa "./documents" sin extensión (lo resuelve Next, no
// Node), así que las constantes se leen del archivo con una expresión regular.
const site = readFileSync(new URL("../content/site.js", import.meta.url), "utf8");
const REVIEW_COUNT = Number(site.match(/GOOGLE_REVIEW_COUNT = (\d+)/)[1]);
const guaranteeBlock = site.match(/GUARANTEE_SHORT = \{([\s\S]*?)\};/)[1];
const GUARANTEE = {
  es: guaranteeBlock.match(/es: "([^"]+)"/)[1],
  en: guaranteeBlock.match(/en: "([^"]+)"/)[1],
};

const LEGAL = new Set([
  "/aviso-legal",
  "/politica-privacidad",
  "/politica-cookies",
  "/en/legal-notice",
  "/en/privacy-policy",
  "/en/cookie-policy",
]);
const HOME = new Set(["/", "/en"]);

const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

const count = (hay, needle) => hay.split(needle).length - 1;

const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => decode(m[1]).replace(SITE, "") || "/"
);
if (paths.length === 0) throw new Error("sitemap.xml sin URL");

let failures = 0;
const fail = (msg) => {
  failures++;
  console.error(`✗ ${msg}`);
};

for (const path of paths) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    fail(`${path} → HTTP ${res.status}`);
    continue;
  }
  const html = decode(await res.text());
  const en = path === "/en" || path.startsWith("/en/");
  const reviews = en ? `${REVIEW_COUNT} reviews` : `${REVIEW_COUNT} reseñas`;
  const guarantee = GUARANTEE[en ? "en" : "es"];
  // Solo la franja (TrustStrip, un <section>): las landings de ACRO, FBI y
  // visados llevan además su propia fila de hechos (<ul>) bajo el H1.
  const strips =
    count(html, '<section aria-label="Datos de confianza"') +
    count(html, '<section aria-label="Trust facts"');

  if (LEGAL.has(path)) {
    if (strips !== 0) fail(`${path}: página legal con franja de confianza (${strips})`);
    continue;
  }
  if (strips !== 1) fail(`${path}: ${strips} franjas de confianza (se espera 1${HOME.has(path) ? ", bajo el hero" : ""})`);
  if (!html.includes(reviews)) fail(`${path}: falta «${reviews}»`);
  if (!html.includes(guarantee)) fail(`${path}: falta «${guarantee}»`);
}
console.log(`${paths.length} URL del sitemap comprobadas (${LEGAL.size} legales sin franja).`);

// Ningún archivo del repo (texto o binario con nombre) puede decir «FOTO PENDIENTE».
const leftovers = execSync('git grep -I -l "FOTO PENDIENTE" -- . ":!node_modules" || true', {
  encoding: "utf8",
}).trim();
if (leftovers) fail(`«FOTO PENDIENTE» sigue en: ${leftovers.split("\n").join(", ")}`);
if (!leftovers) console.log("Sin «FOTO PENDIENTE» en el repo.");

console.log(failures ? `${failures} fallos.` : "Todo correcto.");
process.exit(failures ? 1 : 0);
