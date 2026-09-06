// scripts/shot-el.mjs — captura de elementos concretos para revisión visual.
//   node scripts/shot-el.mjs <url> <ancho> <salida.png> <selector> [selector...]
import { chromium } from "@playwright/test";
const [,, url, width, out, ...selectors] = process.argv;
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const page = await browser.newPage({ viewport: { width: +width, height: 900 } });
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() => { const b = document.querySelector('[aria-label="Aviso de cookies"], [aria-label="Cookie notice"]'); if (b) b.remove(); });
let i = 0;
for (const sel of selectors) {
  const el = page.locator(sel).first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await el.screenshot({ path: out.replace(".png", `-${i++}.png`) });
}
await browser.close();
