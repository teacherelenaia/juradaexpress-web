// scripts/verify-site.mjs
//
// Verificación del sitio (FASE 0+1) en navegador real (Chromium vía Playwright).
// Para cada página y ancho: errores de consola, enlaces internos rotos,
// contraste del titular del CTA final, botones sin subrayar y captura.
//
//   node scripts/verify-site.mjs [baseUrl]
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.argv[2] || "http://127.0.0.1:3210";
const OUT = "docs/capturas/fase-4";

const PAGES = [
  { path: "/", name: "home-es" },
  { path: "/en", name: "home-en" },
  { path: "/precios", name: "precios-es" },
  { path: "/en/precios", name: "precios-en" },
  { path: "/documentos", name: "documentos-es" },
  { path: "/en/documentos", name: "documentos-en" },
  { path: "/contacto", name: "contacto-es" },
  { path: "/en/contacto", name: "contacto-en" },
  { path: "/preguntas-frecuentes", name: "faq-es" },
  { path: "/en/preguntas-frecuentes", name: "faq-en" },
  { path: "/blog", name: "blog-es" },
  { path: "/traduccion-jurada-partida-nacimiento", name: "ficha-nacimiento" },
  { path: "/politica-cookies", name: "cookies-es" },
  { path: "/sobre-mi", name: "sobre-mi" },
  { path: "/en/about", name: "about-en" },
  { path: "/traduccion-jurada-britanicos-espana", name: "britanicos-es" },
  { path: "/en/sworn-translation-british-residents-spain", name: "british-en" },
  { path: "/aviso-legal", name: "aviso-legal" },
  { path: "/en/legal-notice", name: "legal-notice-en" },
  { path: "/politica-privacidad", name: "privacidad" },
  { path: "/en/privacy-policy", name: "privacy-en" },
  { path: "/traductor-jurado-murcia", name: "murcia" },
  { path: "/como-funciona", name: "como-funciona" },
  { path: "/en/how-it-works", name: "how-it-works-en" },
  { path: "/traduccion-jurada-permiso-conducir", name: "ficha-conducir" },
  { path: "/traduccion-jurada-testamento-herencia", name: "ficha-testamento" },
  { path: "/traduccion-jurada-titulo-universitario", name: "ficha-titulo" },
  { path: "/en/blog", name: "blog-en" },
  { path: "/blog/traduccion-jurada-permiso-conducir", name: "post-conducir" },
  { path: "/blog/cuanto-tarda-una-traduccion-jurada", name: "post-plazos" },
  { path: "/en/blog/sworn-translation-nie-tie-spain", name: "post-nie-en" },
  { path: "/ruta-inexistente-404", name: "not-found", expect404: true },
  { path: "/en/cookie-policy", name: "cookies-en" },
];

const VIEWPORTS = [
  { width: 390, height: 844, name: "390" },
  { width: 768, height: 1024, name: "768" },
  { width: 1440, height: 900, name: "1440" },
];

const problems = [];
const checkedLinks = new Map();

function srgb(c) {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

function luminance([r, g, b]) {
  return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function parseRgb(str) {
  const m = str.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(",").map((n) => parseFloat(n.trim()));
  return [parts[0], parts[1], parts[2]];
}

async function checkLink(url) {
  if (checkedLinks.has(url)) return checkedLinks.get(url);
  let status;
  try {
    const res = await fetch(url, { redirect: "follow" });
    status = res.status;
  } catch (err) {
    status = `ERR ${err.message}`;
  }
  checkedLinks.set(url, status);
  return status;
}

const browser = await chromium.launch({
  executablePath:
    process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});

for (const vp of VIEWPORTS) {
  await mkdir(path.join(OUT, vp.name), { recursive: true });
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });

  for (const page of PAGES) {
    const tab = await context.newPage();
    const consoleErrors = [];
    tab.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    tab.on("pageerror", (err) => consoleErrors.push(`pageerror: ${err.message}`));

    const res = await tab.goto(BASE + page.path, { waitUntil: "networkidle" });
    const expected = page.expect404 ? 404 : 200;
    if (res.status() !== expected) {
      problems.push(`[${page.path} @${vp.name}] HTTP ${res.status()} (esperado ${expected})`);
    }

    // En la página 404 el propio status 404 aparece como error de red en
    // consola: lo filtramos, es el comportamiento esperado.
    const realErrors = page.expect404
      ? consoleErrors.filter((e) => !e.includes("404"))
      : consoleErrors;
    if (realErrors.length) {
      problems.push(
        `[${page.path} @${vp.name}] errores de consola: ${realErrors.join(" | ")}`
      );
    }

    // Enlaces internos: ninguno debe dar 404
    if (vp.name === "1440" && !page.expect404) {
      const hrefs = await tab.$$eval("a[href]", (as) =>
        as.map((a) => a.getAttribute("href"))
      );
      const internal = [
        ...new Set(
          hrefs.filter((h) => h && h.startsWith("/") && !h.startsWith("//"))
        ),
      ];
      for (const href of internal) {
        const status = await checkLink(BASE + href);
        if (status !== 200) {
          problems.push(`[${page.path}] enlace interno ${href} → ${status}`);
        }
      }
    }

    // Ningún enlace con pinta de botón puede salir subrayado
    const underlinedButtons = await tab.$$eval(
      "a[class*='btn']",
      (els) =>
        els
          .filter((el) => {
            const d = getComputedStyle(el).textDecorationLine;
            return d && d.includes("underline");
          })
          .map((el) => el.textContent.trim().slice(0, 40))
    );
    if (underlinedButtons.length) {
      problems.push(
        `[${page.path} @${vp.name}] botones subrayados: ${underlinedButtons.join(", ")}`
      );
    }

    // Contraste de todos los titulares visibles contra su fondo real
    const headings = await tab.$$eval("h1, h2, h3", (els) =>
      els
        .filter((el) => el.offsetParent !== null && el.textContent.trim())
        .map((el) => {
          let bg = "rgba(0, 0, 0, 0)";
          let node = el;
          while (node) {
            const c = getComputedStyle(node).backgroundColor;
            if (c && !c.includes("rgba(0, 0, 0, 0)")) {
              bg = c;
              break;
            }
            node = node.parentElement;
          }
          return {
            text: el.textContent.trim().slice(0, 50),
            color: getComputedStyle(el).color,
            bg,
          };
        })
    );
    for (const h of headings) {
      const fg = parseRgb(h.color);
      const bg = parseRgb(h.bg);
      if (!fg || !bg) continue;
      const ratio = contrast(fg, bg);
      if (ratio < 3) {
        problems.push(
          `[${page.path} @${vp.name}] titular "${h.text}" contraste ${ratio.toFixed(
            2
          )}:1 (${h.color} sobre ${h.bg})`
        );
      }
    }

    // FASE 1: header 64 px, barra movil / flotante segun ancho, banner compacto
    const f1 = await tab.evaluate(() => {
      const out = [];
      const header = document.querySelector("header");
      if (header && Math.round(header.getBoundingClientRect().height) !== 64)
        out.push(`header ${Math.round(header.getBoundingClientRect().height)}px (esperado 64)`);
      const bar = document.querySelector('[aria-label="Acciones rápidas"], [aria-label="Quick actions"]');
      const barVisible = bar && getComputedStyle(bar).display !== "none";
      const float = document.querySelector('a[aria-label*="WhatsApp"][class*="fixed"]');
      const floatVisible = float && getComputedStyle(float).display !== "none";
      const mobile = window.innerWidth < 768;
      if (mobile && !barVisible) out.push("falta barra inferior movil");
      if (!mobile && barVisible) out.push("barra movil visible en escritorio");
      if (mobile && floatVisible) out.push("float WhatsApp visible en movil");
      if (!mobile && !floatVisible) out.push("falta float WhatsApp en escritorio");
      const banner = document.querySelector('[aria-label="Aviso de cookies"], [aria-label="Cookie notice"]');
      if (banner) {
        const w = banner.getBoundingClientRect().width;
        if (w > 420.5) out.push(`banner cookies ${Math.round(w)}px de ancho (max 420)`);
      } else {
        out.push("no se muestra el aviso de cookies");
      }
      const h1 = document.querySelector("h1");
      if (h1 && !getComputedStyle(h1).fontFamily.toLowerCase().includes("newsreader"))
        out.push(`h1 sin Newsreader: ${getComputedStyle(h1).fontFamily.slice(0, 40)}`);
      return out;
    });
    for (const msg of f1) problems.push(`[${page.path} @${vp.name}] ${msg}`);

    await tab.screenshot({
      path: path.join(OUT, vp.name, `${page.name}.png`),
      fullPage: true,
    });
    await tab.close();
  }

  await context.close();
}

await browser.close();

if (problems.length) {
  console.error(`\n✗ ${problems.length} problema(s):\n`);
  for (const p of problems) console.error("  - " + p);
  process.exit(1);
}
console.log("\n✓ Verificación sin incidencias.");
