import { chromium } from "@playwright/test";
const [,, base, outDir, ...pages] = process.argv;
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
for (const w of [390, 1440]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 } });
  for (const p of pages) {
    const [path, name] = p.split("=");
    const tab = await ctx.newPage();
    await tab.goto(base + path, { waitUntil: "networkidle" });
    await tab.evaluate(() => { const b = document.querySelector('[aria-label="Aviso de cookies"], [aria-label="Cookie notice"]'); if (b) b.remove(); });
    await tab.screenshot({ path: `${outDir}/${name}-${w}.png`, fullPage: true });
    await tab.close();
  }
  await ctx.close();
}
await browser.close();
