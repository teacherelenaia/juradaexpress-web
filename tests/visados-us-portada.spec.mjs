// tests/visados-us-portada.spec.mjs
//
// Visados de EE. UU. en las páginas EN que Bing ya tiene indexadas
// (17/10/2026, content/us-visas.js). Comprueba en el HTML servido que:
//   - /en menciona «FBI» al menos 3 veces y «non-lucrative», y enlaza a las
//     cinco páginas del bloque #us-visas; la FAQ y su JSON-LD llevan las dos
//     preguntas nuevas.
//   - /en/sworn-translation-usa-spain enlaza, desde el bloque «Most
//     requested by US visa applicants», a las cuatro páginas de visado.
//   - aggregateRating.reviewCount del JSON-LD es 51.
//
//   npm test                       (levanta next dev en el puerto 3311)
import { test, expect } from "@playwright/test";

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

  const ratings = findKey(blocks, "aggregateRating");
  expect(ratings.length).toBeGreaterThan(0);
  for (const r of ratings) expect(Number(r.reviewCount)).toBe(51);

  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] || "";
  expect(desc).toContain("FBI");
});

test("/en: bloque de visados US visible con precios", async ({ page }) => {
  await page.goto("/en");
  const block = page.locator("#us-visas");
  await expect(block.locator("h2")).toHaveText(
    "Applying for a Spanish visa from the United States?"
  );
  for (const price of ["€35 (about $40)", "€129 (about $140)", "€229 (about $250)"]) {
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
  expect(html).toContain("€129 (about $140)");
});
