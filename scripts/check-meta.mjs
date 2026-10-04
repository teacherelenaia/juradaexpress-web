// scripts/check-meta.mjs
//
// Comprueba la <meta name="description"> renderizada de todas las URL de
// /sitemap.xml. Falla (exit 1) si alguna mide menos de 110 o más de 155
// caracteres, si falta, o si dos páginas comparten la misma description.
//
//   node scripts/check-meta.mjs                  build + start propios
//   node scripts/check-meta.mjs --base=URL       usa un servidor ya levantado
//   node scripts/check-meta.mjs --json=ruta.json guarda el listado completo
import { spawn, execSync } from "node:child_process";
import { writeFile } from "node:fs/promises";

const MIN = 110;
const MAX = 155;
const PORT = 3217;
const SITE = "https://juradaexpress.es";

const arg = (name) =>
  process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const baseArg = arg("base");
const jsonOut = arg("json");
const BASE = (baseArg || `http://127.0.0.1:${PORT}`).replace(/\/$/, "");

const run = (cmd) =>
  spawn(cmd, { shell: true, stdio: ["ignore", "inherit", "inherit"] });

function kill(child) {
  if (!child?.pid) return;
  try {
    if (process.platform === "win32") {
      execSync(`taskkill /pid ${child.pid} /T /F`, { stdio: "ignore" });
    } else {
      child.kill("SIGTERM");
    }
  } catch {}
}

async function waitForServer(url, ms = 60000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`El servidor no responde en ${url}`);
}

const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

function metaDescription(html) {
  const tag = html.match(/<meta\b[^>]*\bname="description"[^>]*>/i)?.[0];
  const content = tag?.match(/\bcontent="([^"]*)"/i)?.[1];
  return content == null ? null : decode(content);
}

async function main() {
  let server;
  try {
    if (!baseArg) {
      await new Promise((resolve, reject) => {
        run("npm run build").on("exit", (code) =>
          code === 0 ? resolve() : reject(new Error("npm run build ha fallado"))
        );
      });
      server = run(`npm run start -- -p ${PORT}`);
      await waitForServer(`${BASE}/sitemap.xml`);
    }

    const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
    const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (m) => decode(m[1]).replace(SITE, "") || "/"
    );
    if (paths.length === 0) throw new Error("sitemap.xml sin URL");

    const rows = [];
    for (const path of paths) {
      const res = await fetch(`${BASE}${path}`);
      const description = res.ok ? metaDescription(await res.text()) : null;
      rows.push({
        url: path,
        status: res.status,
        length: description == null ? 0 : [...description].length,
        description,
      });
    }

    const seen = new Map();
    for (const r of rows) {
      if (r.description == null) continue;
      seen.set(r.description, [...(seen.get(r.description) || []), r.url]);
    }

    for (const r of rows) {
      r.errors = [];
      if (r.description == null) r.errors.push(`sin description (HTTP ${r.status})`);
      else {
        if (r.length < MIN) r.errors.push(`corta (${r.length} < ${MIN})`);
        if (r.length > MAX) r.errors.push(`larga (${r.length} > ${MAX})`);
        const same = seen.get(r.description).filter((u) => u !== r.url);
        if (same.length) r.errors.push(`duplicada con ${same.join(", ")}`);
      }
    }

    if (jsonOut) await writeFile(jsonOut, JSON.stringify(rows, null, 2));

    const failed = rows.filter((r) => r.errors.length);
    for (const r of failed) {
      console.log(`✗ ${r.url}  [${r.length}]  ${r.errors.join("; ")}`);
      if (r.description) console.log(`    ${r.description}`);
    }
    console.log(
      `\n${rows.length} URL comprobadas, ${failed.length} fuera de ${MIN}–${MAX} o duplicadas.`
    );
    process.exitCode = failed.length ? 1 : 0;
  } finally {
    kill(server);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
