// tests/visados-us-portada.spec.mjs
//
// Visados de EE. UU. en las páginas EN que Bing ya tiene indexadas
// (17/10/2026, content/us-visas.js). Comprueba en el HTML servido que:
//   - /en menciona «FBI» al menos 3 veces y «non-lucrative», y enlaza a las
//     cinco páginas del bloque #us-visas; la FAQ y su JSON-LD llevan las dos
//     preguntas nuevas.
//   - /en/sworn-translation-usa-spain enlaza, desde el bloque «Most
//     requested by US visa applicants», a las cuatro páginas de visado.
//   - el JSON-LD no lleva aggregateRating (14/11/2026: las directrices de
//     Google no permiten marcar valoraciones de otras webs) y el sameAs
//     incluye Trustpilot; la franja muestra el total de REVIEW_STATS
//     (content/reviews.js: Google + Trustpilot).
//
//   npm test                       (levanta next dev en el puerto 3311)
import { readFileSync } from "node:fs";
import { test, expect } from "@playwright/test";

// content/reviews.js y content/site.js se leen con expresiones regulares
// (los archivos de content/ importan sin extensión y no se cargan desde
// Node). El precio del pack sale de content/site.js → PACKS.
const reviewsSrc = readFileSync(new URL("../content/reviews.js", import.meta.url), "utf8");
const REVIEW_COUNT =
  Number(reviewsSrc.match(/google: \{[^}]*count: (\d+)/)[1]) +
  Number(reviewsSrc.match(/trustpilot: \{[^}]*count: (\d+)/)[1]);
const siteSrc = readFileSync(new URL("../content/site.js", import.meta.url), "utf8");
const packEur = (id) =>
  Number(siteSrc.match(new RegExp(`id: "${id}",[\\s\\S]*?price: (\\d+)`))[1]);
const usd = (eur) => Math.round((eur * 1.1) / 5) * 5;
const packText = (id) => `€${packEur(id)} (about $${usd(packEur(id))})`;

const LINKS = [
  "/en/fbi-background-check-translation-spain",
  "/en/spain-non-lucrative-visa-documents-checklist",
  "/en/sworn-translations-spanish-visas",
  "/en/spain-digital-nomad-visa-documents-checklist",
  "/en/sworn-translation-usa-spain",
];

const count = (html, word) => html.split(word).length - 1;

function jsonLd(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(
    (m) => JSON.parse(m[1])
  );
}

function findKey(node, key, out = []) {
  if (Array.isArray(node)) node.forEach((n) => findKey(n, key, out));
  else if (node && typeof node === "object") {
    if (key in node) out.push(node[key]);
    Object.values(node).forEach((v) => findKey(v, key, out));
  }
  return out;
}

test("/en: FBI, non-lucrative, enlaces, FAQ y reseñas", async ({ request }) => {
  const res = await request.get("/en");
  expect(res.status()).toBe(200);
  const html = await res.text();

  expect(count(html, "FBI")).toBeGreaterThanOrEqual(3);
  expect(html).toContain("non-lucrative");
  expect(html).toContain('id="us-visas"');
  expect(html).toContain('data-track-section="portada_visados_us"');
  for (const href of LINKS) expect(html).toContain(`href="${href}"`);

  const blocks = jsonLd(html);
  const questions = findKey(blocks, "mainEntity")
    .flat()
    .map((q) => q?.name);
  expect(questions).toContain("Can you translate my FBI background check for a Spanish visa?");
  expect(questions).toContain(
    "Which documents need a sworn translation for Spain's non-lucrative visa?"
  );

  expect(findKey(blocks, "aggregateRating")).toHaveLength(0);
  expect(findKey(blocks, "sameAs").flat()).toContain(
    "https://es.trustpilot.com/review/juradaexpress.es"
  );
  expect(html).toContain(`${REVIEW_COUNT} five-star reviews on Google and Trustpilot`);
  expect(html).toContain('href="/en#opiniones"');
  expect(html).toContain('id="opiniones"');

  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] || "";
  expect(desc).toContain("FBI");
});

test("/en: bloque de visados US visible con precios", async ({ page }) => {
  await page.goto("/en");
  const block = page.locator("#us-visas");
  await expect(block.locator("h2")).toHaveText(
    "Applying for a Spanish visa from the United States?"
  );
  for (const price of ["€35 (about $40)", packText("visa"), packText("visa-family")]) {
    await expect(block).toContainText(price);
  }
  const wa = block.locator('a[href^="https://wa.me/"]').first();
  expect(new URL(await wa.getAttribute("href")).searchParams.get("text")).toBe(
    "Hi Elena, I need a quote for my Spanish visa documents"
  );
  await expect(block.locator('a[href="#calculadora"]')).toHaveText("Get a quote online");
});

test("/en/sworn-translation-usa-spain: bloque «Most requested»", async ({ request }) => {
  const res = await request.get("/en/sworn-translation-usa-spain");
  expect(res.status()).toBe(200);
  const html = await res.text();
  const start = html.indexOf('data-track-section="usa_mas_pedidos"');
  expect(start).toBeGreaterThan(-1);
  // El bloque va antes de «Which direction do you need?».
  expect(start).toBeLessThan(html.indexOf("Which direction do you need?"));
  for (const href of LINKS.slice(0, 4)) expect(html).toContain(`href="${href}"`);
  expect(html).toContain(packText("visa"));
});
