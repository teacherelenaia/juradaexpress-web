// tests/guias.spec.mjs
//
// Guías con tabla por trámite (content/guias/*.js, app/components/GuidePage.js,
// 10/10/2026). Para cada guía comprueba que la página ES y la EN cargan con
// su H1 y la fecha de revisión, que la tabla principal tiene al menos N
// filas (y que en móvil, a 390 px, no rompe el ancho de la página), que el
// JSON-LD parsea y contiene Article (con author Person) y FAQPage, que la
// sección de fuentes enlaza a dominios oficiales y que el botón de
// WhatsApp lleva el texto específico de la guía. Se amplía con cada guía.
//
//   npm test                       (levanta next dev en el puerto 3311)
import { test, expect } from "@playwright/test";

const GUIDES = [
  {
    path: "/canje-permiso-conducir-dgt-por-paises",
    h1: "Puedo canjear mi permiso de conducir en España: qué dice la DGT país por país",
    rows: 12,
    reviewed: "Guía revisada el",
    texts: ["Reino Unido", "Gibraltar", "Nueva Zelanda", "Estados Unidos", "28,87 €", "Fuentes"],
    wa: "Hola Elena, necesito traducir mi permiso de conducir para canjearlo en la DGT",
    official: ["dgt.gob.es", "boe.es"],
  },
  {
    path: "/en/exchange-driving-licence-spain-dgt-by-country",
    h1: "Can I exchange my driving licence in Spain? What the DGT says, country by country",
    rows: 12,
    reviewed: "Guide reviewed on",
    texts: ["United Kingdom", "Gibraltar", "New Zealand", "United States", "€28.87", "Sources"],
    wa: "Hi Elena, I need my driving licence translated to exchange it at the DGT",
    official: ["dgt.gob.es", "boe.es"],
  },
  {
    path: "/documentos-visado-nomada-digital-espana",
    h1: "Qué documentos necesito para el visado de nómada digital de España, y cuáles llevan apostilla y traducción jurada",
    rows: 14,
    reviewed: "Guía revisada el",
    texts: ["Certificado médico", "UGE-CE", "Washington", "Nueva York", "Londres", "Los Ángeles", "Fuentes"],
    wa: "Hola Elena, estoy preparando el visado de nómada digital y necesito traducir mis documentos",
    official: ["exteriores.gob.es", "inclusion.gob.es", "boe.es"],
  },
  {
    path: "/en/spain-digital-nomad-visa-documents-checklist",
    h1: "What documents I need for Spain's digital nomad visa, and which ones need an apostille and a sworn translation",
    rows: 14,
    reviewed: "Guide reviewed on",
    texts: ["Medical certificate", "UGE-CE", "Washington", "New York", "London", "Los Angeles", "Sources"],
    wa: "Hi Elena, I am preparing my digital nomad visa and need my documents translated",
    official: ["exteriores.gob.es", "inclusion.gob.es", "boe.es"],
  },
];

const textOf = (href) => new URL(href).searchParams.get("text") || "";

for (const g of GUIDES) {
  test(`${g.path}: H1, tabla, JSON-LD, fuentes y WhatsApp`, async ({ page }) => {
    const res = await page.goto(g.path);
    expect(res.status()).toBe(200);
    await expect(page.locator("h1")).toHaveText(g.h1);

    const main = page.locator("main");
    await expect(main).toContainText(g.reviewed);
    for (const text of g.texts) await expect(main).toContainText(text);

    // Tabla principal (escritorio) con al menos N filas de datos.
    const rows = main.locator("table tbody tr");
    expect(await rows.count()).toBeGreaterThanOrEqual(g.rows);

    // Fuentes: enlaces a dominios oficiales, que se abren en pestaña nueva.
    for (const domain of g.official) {
      const links = main.locator(`#fuentes a[href*="${domain}"][target="_blank"]`);
      expect(await links.count(), domain).toBeGreaterThan(0);
    }

    // Botón de WhatsApp con el texto específico de la guía.
    const wa = main.locator('a[href^="https://wa.me/"]').first();
    expect(textOf(await wa.getAttribute("href"))).toBe(g.wa);

    // JSON-LD: Article con author Person y FAQPage.
    const scripts = await main.locator('script[type="application/ld+json"]').allTextContents();
    expect(scripts.length).toBeGreaterThan(0);
    const graph = scripts.flatMap((s) => JSON.parse(s)["@graph"] || []);
    const article = graph.find((n) => n["@type"] === "Article");
    expect(article).toBeTruthy();
    expect(article.author["@type"]).toBe("Person");
    expect(article.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(article.dateModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    const faq = graph.find((n) => n["@type"] === "FAQPage");
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(5);
    expect(graph.find((n) => n["@type"] === "BreadcrumbList")).toBeTruthy();
  });

  test(`${g.path}: en móvil la tabla no rompe el ancho`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(g.path);
    // En móvil la tabla se sustituye por tarjetas (una por fila).
    const cards = page.locator("main ul[aria-label] > li");
    expect(await cards.count()).toBeGreaterThanOrEqual(g.rows);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}
