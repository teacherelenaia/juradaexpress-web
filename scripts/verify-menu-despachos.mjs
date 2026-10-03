// scripts/verify-menu-despachos.mjs
//
// Comprobación con Playwright (390, 768 y 1440 px) del enlace a
// /en/for-immigration-law-firms en el menú Internacional ES/EN (escritorio y
// móvil) y en el pie de página. Guarda capturas del menú abierto si se pasa
// una carpeta.
//
// Uso: node scripts/verify-menu-despachos.mjs http://localhost:3000 [carpeta-capturas]
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const [, , base = "http://localhost:3000", outDir] = process.argv;
const PATH = "/en/for-immigration-law-firms";
const LOCALES = [
  { id: "es", home: "/", menu: "Internacional", group: "Documentos para USCIS (en inglés)", label: "Despachos de inmigración EE. UU. (EN)", footer: "Despachos EE. UU.", hreflang: "en", open: "Abrir menú" },
  { id: "en", home: "/en", menu: "International", group: "Spanish documents for USCIS", label: "For immigration law firms", footer: "For law firms", hreflang: null, open: "Open menu" },
];

let failed = 0;
const check = (ok, label, detail = "") => {
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? `  (${detail})` : ""}`);
};

if (outDir) mkdirSync(outDir, { recursive: true });
// Chromium de Playwright si está descargado; si no, el Chrome o Edge instalado.
let browser;
for (const options of [{}, { channel: "chrome" }, { channel: "msedge" }]) {
  try {
    browser = await chromium.launch(options);
    break;
  } catch {
    // Probamos el siguiente navegador.
  }
}
if (!browser) throw new Error("No hay navegador: ejecuta `npx playwright install chromium`.");

for (const width of [390, 768, 1440]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await ctx.newPage();
  for (const l of LOCALES) {
    const tag = `[${width} ${l.id}]`;
    await page.goto(base + l.home, { waitUntil: "networkidle" });
    await page.evaluate(() => {
      const b = document.querySelector('[aria-label="Aviso de cookies"], [aria-label="Cookie notice"]');
      if (b) b.remove();
    });
    const docWidth = () =>
      page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    const closed = await docWidth();

    const desktop = width >= 768;
    const panel = page.locator(desktop ? "#nav-internacional" : "#mobile-nav-internacional");
    if (desktop) {
      await page.locator('header button[aria-controls="nav-internacional"]').click();
    } else {
      await page.getByRole("button", { name: l.open }).click();
      await page.locator('button[aria-controls="mobile-nav-internacional"]').click();
    }
    const link = panel.locator(`a[href="${PATH}"]`);
    await link.waitFor({ state: "visible" });
    check((await link.innerText()).trim() === l.label, `${tag} menu link label`, await link.innerText());
    check((await link.getAttribute("hreflang")) === l.hreflang, `${tag} menu link hreflang`, String(await link.getAttribute("hreflang")));
    check(await panel.getByText(l.group, { exact: true }).isVisible(), `${tag} group heading "${l.group}"`);
    const items = panel.locator("a");
    check((await items.count()) === 18, `${tag} 18 links in 3 groups`, String(await items.count()));
    if (l.id === "es") {
      const enLinks = await panel.locator('a[href^="/en/"]').evaluateAll((els) => els.map((e) => e.getAttribute("hreflang")));
      check(enLinks.length === 7 && enLinks.every((h) => h === "en"), `${tag} 7 links to /en pages, all hreflang="en"`);
    }
    // El panel abierto cabe en la ventana.
    const box = await panel.boundingBox();
    check(box.x >= 0 && box.x + box.width <= width + 1, `${tag} open menu inside viewport`, `x=${Math.round(box.x)} right=${Math.round(box.x + box.width)}`);
    const open = await docWidth();
    if (closed > 0 || open > 0) console.log(`WARN  ${tag} document overflow: ${closed}px closed, ${open}px with menu open`);
    if (outDir) await page.screenshot({ path: `${outDir}/menu-${l.id}-${width}.png` });

    const foot = page.locator(`footer a[href="${PATH}"]`);
    check((await foot.count()) === 1 && (await foot.innerText()).trim() === l.footer, `${tag} footer link "${l.footer}"`);
    check((await foot.getAttribute("hreflang")) === l.hreflang, `${tag} footer link hreflang`);
    if (outDir && width !== 768) {
      await foot.scrollIntoViewIfNeeded();
      await page.screenshot({ path: `${outDir}/footer-${l.id}-${width}.png` });
    }
  }
  await ctx.close();
}

await browser.close();
console.log(failed ? `\n${failed} check(s) failed` : "\nAll checks passed");
process.exit(failed ? 1 : 0);
