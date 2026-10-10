// tests/fbi-indexnow.spec.mjs
//
// Landings del certificado del FBI y del ACRO (content/servicios/fbi.js,
// acro.js), imágenes de marca (scripts/build-brand-images.mjs) y la ruta
// /api/indexnow (10/10/2026). Comprueba que:
//   - Las cuatro páginas cargan con su H1, el precio en euros (y en dólares
//     en la del FBI), el botón de WhatsApp con el texto específico y un
//     JSON-LD con Service, Offer en EUR y FAQPage que se puede parsear.
//   - /og-home.png, /og-home-en.png y /jurada-express-logo.png se sirven
//     como image/png.
//   - POST /api/indexnow sin cabecera Authorization devuelve 401 (o 503 si
//     el servidor no tiene INDEXNOW_KEY), nunca 200.
//
//   npm test                       (levanta next dev en el puerto 3311)
import { test, expect } from "@playwright/test";

const PAGES = [
  {
    path: "/en/fbi-background-check-translation-spain",
    h1: "FBI background check: sworn translation for your Spanish visa",
    price: ["€35", "$40"],
    wa: "Hi Elena, I need my FBI background check translated for a Spanish visa",
  },
  {
    path: "/traduccion-jurada-antecedentes-fbi",
    h1: "Traducción jurada del certificado de antecedentes del FBI para tu visado de España",
    price: ["35 €", "40 $"],
    wa: "Hola Elena, necesito traducir mi certificado de antecedentes del FBI para un visado de España",
  },
  {
    path: "/en/acro-police-certificate-translation-spain",
    h1: "ACRO police certificate: sworn translation for your Spanish visa",
    price: ["€35"],
    wa: "Hi Elena, I need my ACRO police certificate translated for a Spanish visa",
  },
  {
    path: "/traduccion-jurada-acro-reino-unido",
    h1: "Traducción jurada del ACRO Police Certificate del Reino Unido para tu visado de España",
    price: ["35 €"],
    wa: "Hola Elena, necesito traducir mi certificado ACRO del Reino Unido para un visado de España",
  },
];

const textOf = (href) => new URL(href).searchParams.get("text") || "";

for (const p of PAGES) {
  test(`${p.path}: H1, precio, WhatsApp y JSON-LD`, async ({ page }) => {
    const res = await page.goto(p.path);
    expect(res.status()).toBe(200);
    await expect(page.locator("h1")).toHaveText(p.h1);

    const main = page.locator("main");
    for (const price of p.price) await expect(main).toContainText(price);

    // El primer botón de WhatsApp del contenido lleva el texto específico.
    const wa = main.locator('a[href^="https://wa.me/"]').first();
    expect(textOf(await wa.getAttribute("href"))).toBe(p.wa);

    // JSON-LD de la página: Service con Offer en EUR y FAQPage.
    const scripts = await main.locator('script[type="application/ld+json"]').allTextContents();
    expect(scripts.length).toBeGreaterThan(0);
    const graph = scripts.flatMap((s) => JSON.parse(s)["@graph"] || []);
    const service = graph.find((n) => n["@type"] === "Service");
    expect(service).toBeTruthy();
    expect(service.offers.priceCurrency).toBe("EUR");
    expect(service.offers.price).toBe(35);
    const faq = graph.find((n) => n["@type"] === "FAQPage");
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(6);
  });
}

test("imágenes de marca en PNG", async ({ request }) => {
  for (const file of ["/og-home.png", "/og-home-en.png", "/jurada-express-logo.png"]) {
    const res = await request.get(file);
    expect(res.status(), file).toBe(200);
    expect(res.headers()["content-type"], file).toContain("image/png");
  }
});

test("POST /api/indexnow sin cabecera no envía nada", async ({ request }) => {
  const res = await request.post("/api/indexnow", { data: {} });
  expect([401, 503]).toContain(res.status());
  const bad = await request.post("/api/indexnow", {
    data: {},
    headers: { Authorization: "Bearer clave-incorrecta-00000000" },
  });
  expect([401, 503]).toContain(bad.status());
});
