// scripts/verify-law-firms.mjs
//
// Comprobación con Playwright de /en/for-immigration-law-firms a 390, 768 y
// 1440 px: sin desbordamiento horizontal, H1 único, metadatos, JSON-LD,
// enlaces entrantes (menú EN, hub USCIS y las 6 landings US) y formulario de
// pedido en modo despacho (campos, precio en dólares, sin urgencia, envío a
// /api/quote con firmMode). /api/quote se intercepta: no se envía ningún email.
//
// Uso: node scripts/verify-law-firms.mjs http://localhost:3000 [carpeta-capturas]
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const [, , base = "http://localhost:3000", outDir] = process.argv;
const PATH = "/en/for-immigration-law-firms";
const HUB = "/en/certified-translation-uscis";
const US_DOCS = [
  "/en/certified-translation-spanish-birth-certificate-uscis",
  "/en/certified-translation-spanish-marriage-certificate-uscis",
  "/en/certified-translation-spanish-divorce-decree-uscis",
  "/en/certified-translation-spanish-criminal-record-certificate-uscis",
  "/en/certified-translation-spanish-degree-evaluation-wes",
  "/en/certified-translation-spanish-passport-dni-uscis",
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
  const ctx = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(base + PATH, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    const b = document.querySelector('[aria-label="Aviso de cookies"], [aria-label="Cookie notice"]');
    if (b) b.remove();
  });

  // Desbordamiento del contenido de la página (main) y, aparte, del documento:
  // a 768 px la cabecera del sitio (menú + ES/EN + CTA) no cabe en NINGUNA
  // página; es anterior a esta landing y se avisa sin contarlo como fallo.
  const { mainOverflow, docOverflow } = await page.evaluate(() => {
    const w = document.documentElement.clientWidth;
    const right = Math.max(
      ...[...document.querySelectorAll("main, main *")].map((el) => el.getBoundingClientRect().right)
    );
    return {
      mainOverflow: Math.max(0, Math.round(right - w)),
      docOverflow: document.documentElement.scrollWidth - w,
    };
  });
  check(mainOverflow === 0, `[${width}] no horizontal overflow in page content`, `${mainOverflow}px`);
  if (docOverflow > 0) {
    console.log(`WARN  [${width}] document overflows by ${docOverflow}px (site header, not this page)`);
  }
  check((await page.locator("h1").count()) === 1, `[${width}] one H1`);
  check(await page.locator("#order").isVisible(), `[${width}] order form visible`);
  check((await page.locator("#order fieldset").filter({ hasText: "Urgency" }).count()) === 0, `[${width}] urgency hidden`);
  check(errors.length === 0, `[${width}] no page errors`, errors.join(" | "));
  if (outDir) await page.screenshot({ path: `${outDir}/law-firms-${width}.png`, fullPage: true });

  if (width === 1440) {
    const title = await page.title();
    check(title === "Spanish Document Translation for US Immigration Law Firms" && title.length <= 60, "title", `${title.length} chars`);
    const desc = await page.locator('meta[name="description"]').getAttribute("content");
    check(desc.length <= 155 && desc.includes("same-day delivery up to 10 pages, monthly invoice, USD"), "description", `${desc.length} chars`);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    check(canonical === `https://juradaexpress.es${PATH}`, "canonical", canonical);
    const alternates = await page.locator('link[rel="alternate"][hreflang]').evaluateAll((els) =>
      els.map((e) => `${e.hreflang}=${e.href}`)
    );
    check(alternates.length === 1 && alternates[0] === `en=https://juradaexpress.es${PATH}`, "hreflang self only", alternates.join(", "));

    const graphs = await page.locator('main script[type="application/ld+json"]').evaluateAll((els) =>
      els.flatMap((e) => JSON.parse(e.textContent)["@graph"] || [])
    );
    const service = graphs.find((g) => g["@type"] === "Service");
    check(
      service?.areaServed?.name === "US" &&
        service?.offers?.priceCurrency === "USD" &&
        service?.audience?.audienceType === "Immigration attorneys",
      "JSON-LD Service (US, USD, audience)"
    );
    check(graphs.find((g) => g["@type"] === "FAQPage")?.mainEntity.length === 6, "JSON-LD FAQPage (6)");
    check(graphs.find((g) => g["@type"] === "BreadcrumbList")?.itemListElement.length === 3, "JSON-LD BreadcrumbList");

    const words = await page.evaluate(() => {
      const main = document.querySelector("main").cloneNode(true);
      main.querySelectorAll("script, form, nav").forEach((n) => n.remove());
      // textContent: incluye las respuestas de las FAQ plegadas.
      return main.textContent.split(/\s+/).filter(Boolean).length;
    });
    check(words >= 900 && words <= 1200, "word count 900-1200", `${words} words`);

    const esHref = await page.locator('header a:text-is("ES")').first().getAttribute("href");
    check(esHref === "/traduccion-certificada-uscis", "LanguageSwitcher ES", esHref);
    check((await page.locator(`#nav-internacional a[href="${PATH}"]`).count()) === 1, "EN menu link (USCIS group)");

    // Formulario: precio en dólares, validación del despacho y envío.
    const order = page.locator("#order");
    check((await order.locator("p.font-display").innerText()).trim() === "$40", "estimate in USD ($40)");
    let posted = null;
    await page.route("**/api/quote", async (route) => {
      posted = route.request().postData() || "";
      await route.fulfill({ json: { ok: true, emailed: true, blobsEmailed: [] } });
    });
    await order.getByLabel("Email").fill("paralegal@example.com");
    await order.locator('input[name="privacy"]').check();
    await order.getByRole("button", { name: "Send the order" }).click();
    check(await order.getByText("Please enter your firm name.").isVisible(), "firm name required");
    check(posted === null, "nothing sent without firm name");
    await order.getByLabel("Firm name").fill("Test & Partners LLP");
    await order.getByLabel("Client/matter reference").fill("MATTER-123");
    await order.getByRole("button", { name: "Send the order" }).click();
    await order.getByText("Received!").waitFor();
    const field = (n) => new RegExp(`name="${n}"\\r?\\n\\r?\\n([^\\r\\n]*)`).exec(posted)?.[1];
    check(field("firmMode") === "1", "POST firmMode=1");
    check(field("firm") === "Test & Partners LLP", "POST firm", field("firm"));
    check(field("reference") === "MATTER-123", "POST reference", field("reference"));
    check(field("locale") === "en" && field("urgency") === "normal", "POST locale en, urgency normal");
  }
  await ctx.close();
}

// Enlaces entrantes: hub USCIS y las seis landings de documento.
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
for (const p of [HUB, ...US_DOCS]) {
  await page.goto(base + p, { waitUntil: "domcontentloaded" });
  const n = await page.locator(`main a[href="${PATH}"]`).count();
  const heading = await page.locator('main h2:text-is("Are you an attorney?")').count();
  check(n >= 1 && heading === 1, `"Are you an attorney?" block on ${p}`);
}
const sitemap = await (await page.request.get(`${base}/sitemap.xml`)).text();
check(sitemap.includes(`<loc>https://juradaexpress.es${PATH}</loc>`), "sitemap.xml");
const llms = await (await page.request.get(`${base}/llms.txt`)).text();
check(llms.includes(`https://juradaexpress.es${PATH}`), "llms.txt");
// La calculadora normal no cambia: euros y urgencia visibles.
await page.goto(`${base}/en`, { waitUntil: "networkidle" });
check((await page.locator("#calculadora p.font-display").innerText()).trim() === "€35", "home calculator still in euros");
check((await page.locator("#calculadora fieldset").filter({ hasText: "Urgency" }).count()) === 1, "home calculator keeps urgency");

await browser.close();
console.log(failed ? `\n${failed} check(s) failed` : "\nAll checks passed");
process.exit(failed ? 1 : 0);
