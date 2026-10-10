// scripts/indexnow.mjs
//
// Envío manual a IndexNow (Bing, Yandex) de las URL del sitemap de
// producción o de las que se pasen por argumento (10/10/2026):
//
//   npm run indexnow                                   todo el sitemap
//   npm run indexnow -- https://juradaexpress.es/en/fbi-background-check-translation-spain
//   npm run indexnow -- /traduccion-jurada-antecedentes-fbi /en/sworn-translations-spanish-visas
//   npm run indexnow -- --dry-run                      lista sin enviar
//
// Lee INDEXNOW_KEY del entorno o de .env.local. Es el mismo envío que hace
// /api/indexnow tras cada deploy; aquí sin pasar por la web.
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  isValidKey,
  keyLocation,
  normalizeUrls,
  sitemapUrls,
  submitToIndexNow,
} from "../app/lib/indexnow.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function keyFromEnvLocal() {
  try {
    const text = await readFile(path.join(ROOT, ".env.local"), "utf8");
    const line = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .find((l) => l.startsWith("INDEXNOW_KEY="));
    return line ? line.slice("INDEXNOW_KEY=".length).trim().replace(/^["']|["']$/g, "") : "";
  } catch {
    return "";
  }
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const given = args.filter((a) => !a.startsWith("--"));

  const key = process.env.INDEXNOW_KEY || (await keyFromEnvLocal());
  if (!dryRun && !isValidKey(key)) {
    console.error(
      "Falta INDEXNOW_KEY (en el entorno o en .env.local). Genera una con:\n  node -e \"console.log(require('crypto').randomBytes(16).toString('hex'))\""
    );
    process.exitCode = 1;
    return;
  }

  const urls = given.length ? normalizeUrls(given) : await sitemapUrls();
  if (urls.length === 0) {
    console.error("Ninguna URL válida del sitio (deben ser rutas o URL de https://juradaexpress.es).");
    process.exitCode = 1;
    return;
  }

  console.log(`${urls.length} URL${given.length ? "" : " del sitemap"}:`);
  for (const u of urls) console.log(`  ${u}`);
  if (dryRun) {
    console.log("\n--dry-run: no se envía nada.");
    return;
  }

  const result = await submitToIndexNow({ key, urls });
  console.log(`\nkeyLocation: ${keyLocation(key)}`);
  for (const b of result.batches) {
    console.log(`IndexNow → HTTP ${b.status} (${b.count} URL)${b.ok ? "" : "  ✗"}`);
  }
  if (!result.ok) {
    console.error(
      "Respuesta no OK. 403: la clave no coincide con el archivo <clave>.txt; 422: alguna URL no es del host; 429: demasiados envíos."
    );
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exitCode = 1;
});
