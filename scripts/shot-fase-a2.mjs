// scripts/shot-fase-a2.mjs — capturas de la portada ES/EN (Fase A2) a
// 390×844 y 1440×900: hero, trámites rápidos y «Por qué trabajar
// directamente con Elena», más la página entera. También comprueba que el
// H1 es único y contiene «traducción jurada» / «sworn translation», y que
// todas las URL internas enlazadas en la portada responden 200.
//   node scripts/shot-fase-a2.mjs http://127.0.0.1:3000 docs/capturas/fase-a2
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const [, , base = "http://127.0.0.1:3000", outDir = "docs/capturas/fase-a2"] =
  process.argv;
mkdirSync(outDir, { recursive: true });

const PAGES = [
  { path: "/", name: "es", h1: /traducción jurada/i, why: "Por qué trabajar directamente con Elena" },
  { path: "/en", name: "en", h1: /sworn translation/i, why: "Why work directly with Elena" },
];

const browser = await chromium.launch();
let failures = 0;
const checked = new Map();

for (const { path, name, h1, why } of PAGES) {
  for (const [w, h] of [
    [390, 844],
    [1440, 900],
  ]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.evaluate(() => {
      const b = document.querySelector(
        '[aria-label="Aviso de cookies"], [aria-label="Cookie notice"]'
      );
      if (b) b.remove();
    });

    // H1 único y con la expresión clave.
    const h1s = await page.locator("h1").allTextContents();
    if (h1s.length !== 1 || !h1.test(h1s[0])) {
      failures++;
      console.error(`✗ ${path}@${w}: h1 =`, h1s);
    } else {
      console.log(`✓ ${path}@${w}: h1 «${h1s[0]}»`);
    }

    // Capturas por sección.
    const shots = [
      ["hero", "main > section:first-of-type"],
      ["tramites", '[data-track-section="tramites_rapidos"]'],
      ["por-que", `section:has(h2:text-is("${why}"))`],
    ];
    for (const [label, sel] of shots) {
      const el = page.locator(sel).first();
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await el.screenshot({ path: `${outDir}/${name}-${label}-${w}.png` });
    }
    await page.screenshot({ path: `${outDir}/${name}-full-${w}.png`, fullPage: true });

    // Enlaces internos de la portada → 200 (una vez por URL).
    if (w === 1440) {
      const hrefs = await page.evaluate(() =>
        Array.from(document.querySelectorAll("main a[href]"))
          .map((a) => a.getAttribute("href"))
          .filter((h) => h && h.startsWith("/") && !h.startsWith("//"))
      );
      for (const href of new Set(hrefs)) {
        const url = href.split("#")[0] || "/";
        if (checked.has(url)) continue;
        const res = await page.request.get(base + url);
        checked.set(url, res.status());
        if (res.status() !== 200) {
          failures++;
          console.error(`✗ ${url} → ${res.status()}`);
        }
      }
    }
    await ctx.close();
  }
}
console.log(`Enlaces internos comprobados: ${checked.size}`);
await browser.close();
process.exit(failures ? 1 : 0);
