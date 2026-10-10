// tests/traductor-ingles.spec.mjs
//
// Página «Traductor jurado de inglés online» en ES y EN
// (content/servicios/traductor-jurado-ingles.js, 10/10/2026): los datos
// que los motores de respuesta extraen de la competencia tienen que estar
// en texto plano y en el JSON-LD. Comprueba que las dos páginas cargan con
// su H1 y que aparecen el IVA incluido, la firma electrónica cualificada,
// la regla de las 15:00, el precio por página y la ficha de la traductora;
// y que el JSON-LD parsea y contiene Service con provider Person (nº 7310),
// OfferCatalog con un Offer por documento y otro por página
// (UnitPriceSpecification), HowTo con 4 pasos y FAQPage.
//
//   npm test                       (levanta next dev en el puerto 3311)
import { test, expect } from "@playwright/test";

const PAGES = [
  {
    path: "/traductor-jurado-ingles",
    h1: "Traductor jurado de inglés online: traducción jurada español-inglés con validez oficial",
    texts: [
      "IVA incluido",
      "firma electrónica cualificada",
      "Orden AUC/213/2025",
      "15:00",
      "20 € por página",
      "No cobro por palabra",
      "Datos de la traductora jurada",
      "Qué incluye el precio y qué no",
    ],
    unit: "página",
  },
  {
    path: "/en/sworn-english-translator",
    h1: "Sworn English translator online: officially valid Spanish-English sworn translation",
    texts: [
      "VAT included",
      "qualified electronic signature",
      "Order AUC/213/2025",
      "15:00",
      "€20 per page",
      "I do not charge per word",
      "About the sworn translator",
      "What the price includes and what it does not",
    ],
    unit: "page",
  },
];

for (const p of PAGES) {
  test(`${p.path}: textos extraíbles y JSON-LD`, async ({ page }) => {
    const res = await page.goto(p.path);
    expect(res.status()).toBe(200);
    await expect(page.locator("h1")).toHaveText(p.h1);

    const main = page.locator("main");
    for (const text of p.texts) await expect(main).toContainText(text);

    // Ficha de la traductora: enlace al buscador STIJ del MAEC.
    await expect(
      main.locator('dl a[href*="exteriores.gob.es"][href*="Buscador-STIJ"]')
    ).toHaveCount(1);

    // Reseñas junto a las garantías, con enlace a la ficha de Google Maps.
    await expect(
      main.locator('header a[href*="google.com/maps"]')
    ).toHaveCount(1);

    // JSON-LD de la página.
    const scripts = await main
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    expect(scripts.length).toBeGreaterThan(0);
    const graph = scripts.flatMap((s) => JSON.parse(s)["@graph"] || []);

    const service = graph.find((n) => n["@type"] === "Service");
    expect(service).toBeTruthy();
    expect(service.provider["@type"]).toBe("Person");
    expect(service.provider.identifier).toBe("7310");
    expect(service.provider.hasCredential.url).toContain("Buscador-STIJ");
    expect(service.offers.priceSpecification.minPrice).toBe(35);

    const catalog = service.hasOfferCatalog;
    expect(catalog["@type"]).toBe("OfferCatalog");
    const offers = catalog.itemListElement;
    expect(offers.length).toBeGreaterThanOrEqual(6);
    for (const o of offers) {
      expect(o["@type"]).toBe("Offer");
      expect(o.priceCurrency).toBe("EUR");
      expect(typeof o.price).toBe("number");
    }
    const perPage = offers.find(
      (o) => o.priceSpecification["@type"] === "UnitPriceSpecification"
    );
    expect(perPage.price).toBe(20);
    expect(perPage.priceSpecification.unitText).toBe(p.unit);
    expect(perPage.priceSpecification.valueAddedTaxIncluded).toBe(true);

    const howTo = graph.find((n) => n["@type"] === "HowTo");
    expect(howTo.step.length).toBe(4);
    expect(howTo.totalTime).toBe("PT24H");

    const faq = graph.find((n) => n["@type"] === "FAQPage");
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(8);
  });
}
