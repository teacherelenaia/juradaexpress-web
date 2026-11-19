// tests/expediente-completo.spec.mjs
//
// Expedientes completos de visado (19/11/2026). Comprueba en el HTML servido:
//   - las dos páginas nuevas responden con H1, tabla de tramos, ejemplos,
//     WhatsApp de expediente y JSON-LD Service (con offers), FAQPage y
//     BreadcrumbList;
//   - las páginas de visados y nómada digital ya no venden la página
//     adicional a 20 € y enlazan a la página nueva;
//   - /llms.txt lleva el apartado «Full visa files» y el horario nuevo;
//   - las páginas de estudiante y alta cualificación existen.
//
//   npm test
import { test, expect } from "@playwright/test";

const decode = (html) =>
  html
    .replace(/<!-- -->/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"');

const FILE = {
  es: "/traduccion-jurada-expediente-completo-visado",
  en: "/en/full-visa-file-sworn-translation-spain",
};

function jsonLdTypes(html) {
  const types = new Set();
  for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    const data = JSON.parse(m[1]);
    const nodes = data["@graph"] || [data];
    for (const n of nodes) types.add(n["@type"]);
  }
  return types;
}

test("página EN de expediente completo", async ({ request }) => {
  const res = await request.get(FILE.en);
  expect(res.status()).toBe(200);
  const raw = await res.text();
  const html = decode(raw);
  expect(html).toContain("Sworn translation of your full Spain visa file: one closed price, from €15 per page");
  expect(html).toContain("€15 per page: €300 for 20, €375 for 25, €450 for 30");
  expect(html).toContain("Closed price, never more than €300");
  expect(html).toContain("30 pages: you save €150");
  expect(html).toContain("text=Hi%2C%20I'd%20like%20a%20closed%20price%20for%20my%20full%20visa%20file");
  expect(html).not.toContain("extra page, €20");
  const types = jsonLdTypes(raw);
  for (const t of ["Service", "FAQPage", "BreadcrumbList"]) expect(types.has(t)).toBe(true);
  expect(raw).toContain('"unitText":"page"');
});

test("página ES de expediente completo", async ({ request }) => {
  const res = await request.get(FILE.es);
  expect(res.status()).toBe(200);
  const html = decode(await res.text());
  expect(html).toContain("un solo precio cerrado, desde 15 € por página");
  expect(html).toContain("15 € por página: 300 € por 20, 375 € por 25, 450 € por 30");
  expect(html).toContain("text=Hola%2C%20quiero%20un%20precio%20cerrado%20para%20mi%20expediente%20completo%20de%20visado");
});

for (const path of [
  "/traduccion-jurada-visados-espana",
  "/en/sworn-translations-spanish-visas",
  "/traduccion-jurada-visado-nomada-digital",
  "/en/sworn-translation-spain-digital-nomad-visa",
]) {
  test(`${path}: sin página adicional a 20 € y con enlace a expedientes`, async ({ request }) => {
    const html = decode(await (await request.get(path)).text());
    expect(html).not.toMatch(/página adicional, 20 €|Cada página adicional, 20 €|extra page, €20|Each additional page, €20/);
    expect(html).toMatch(/full-visa-file-sworn-translation-spain|traduccion-jurada-expediente-completo-visado/);
  });
}

test("visados: «desde» unificado en título, descripción y OG", async ({ request }) => {
  const html = decode(await (await request.get("/en/sworn-translations-spanish-visas")).text());
  expect(html).toContain("<title>Sworn Translations for Spanish Visas from €149 | Jurada Express</title>");
  expect(html).not.toContain("from €35 |");
  expect(html).not.toContain("| Jurada Express | Jurada Express");
});

for (const path of [
  "/en/sworn-translation-spain-student-visa",
  "/traduccion-jurada-visado-estudiante",
  "/en/sworn-translation-spain-highly-qualified-visa",
  "/traduccion-jurada-visado-alta-cualificacion",
]) {
  test(`${path} responde`, async ({ request }) => {
    const res = await request.get(path);
    expect(res.status()).toBe(200);
  });
}

test("/llms.txt: Full visa files y horario de todos los días", async ({ request }) => {
  const txt = await (await request.get("/llms.txt")).text();
  expect(txt).toContain("## Full visa files / Expedientes completos de visado");
  expect(txt).toContain("todos los días, sábados y domingos incluidos, de 9:00 a 23:00");
  expect(txt).not.toContain("lunes a viernes");
  expect(txt).not.toMatch(/\{\{[A-Z_:a-z-]+\}\}/);
});
