// tests/plazos-packs.spec.mjs
//
// Política de plazos de Elena (14/11/2026) y límites de páginas de los packs.
// Comprueba en el HTML servido que:
//   - la promesa de plazo (DELIVERY_PROMISE) dice «Más de 10 páginas: en
//     24 horas» y termina con la frase de urgencia «de hasta el 30 %»;
//   - las tarjetas de packs llevan «Hasta X documentos · Y páginas» y la
//     línea de límite con el precio de expediente completo (19/11/2026)
//     (y sus equivalentes en inglés);
//   - la calculadora ofrece la urgencia «antes del plazo normal (hasta +30 %)».
// Y, sin servidor, un grep de control sobre los archivos de TEXTO de app/,
// content/ y public/ (git grep -I, que salta los binarios: así
// public/fotos/maec-listado-7310.png, una captura cuyo contenido binario
// puede coincidir por azar, queda fuera) que no debe encontrar plazos ni
// recargos antiguos.
//
//   npm test                       (levanta next dev en el puerto 3311)
import { execSync } from "node:child_process";
import { test, expect } from "@playwright/test";

const decode = (html) =>
  html
    .replace(/<!-- -->/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"');

const PAGES = {
  es: ["/precios", "/traduccion-jurada-visados-espana", "/traduccion-jurada-visado-nomada-digital"],
  en: ["/en/precios", "/en/sworn-translations-spanish-visas", "/en/sworn-translation-spain-digital-nomad-visa"],
};

const PROMISE = {
  es: "Más de 10 páginas: en 24 horas. ¿Lo necesitas antes? Escríbeme: según el volumen puede llevar un recargo de urgencia de hasta el 30 %.",
  en: "Over 10 pages: within 24 hours. Need it sooner? Message me: depending on volume, an urgency surcharge of up to 30% may apply.",
};

for (const locale of ["es", "en"]) {
  for (const path of PAGES[locale]) {
    test(`${path}: promesa de plazo nueva`, async ({ request }) => {
      const res = await request.get(path);
      expect(res.status()).toBe(200);
      expect(decode(await res.text())).toContain(PROMISE[locale]);
    });
  }
}

test("/precios y /en/precios: límites de páginas de los packs", async ({ request }) => {
  const es = decode(await (await request.get("/precios")).text());
  for (const label of [
    "Hasta 4 documentos · 8 páginas",
    "Hasta 8 documentos · 16 páginas",
    "Hasta 5 documentos · 10 páginas",
    "Hasta 6 documentos · 12 páginas",
    "Hasta 2 documentos · 4 páginas",
    "Todos los packs tienen un límite de páginas. Expedientes más largos: precio cerrado por el expediente completo, nunca más de 300 € hasta 19 páginas, y 15 € por página de 20 a 30 páginas.",
  ]) {
    expect(es).toContain(label);
  }
  expect(es).not.toContain("de hasta 2 páginas:");

  const en = decode(await (await request.get("/en/precios")).text());
  for (const label of [
    "Up to 4 documents · 8 pages",
    "Up to 8 documents · 16 pages",
    "Up to 5 documents · 10 pages",
    "Up to 6 documents · 12 pages",
    "Up to 2 documents · 4 pages",
    "Every pack has a page limit. Longer files: closed price for the whole file, never more than €300 up to 19 pages, and €15 per page from 20 to 30 pages.",
  ]) {
    expect(en).toContain(label);
  }
});

test("/: la calculadora ofrece urgencia «hasta +30 %»", async ({ request }) => {
  const html = decode(await (await request.get("/")).text());
  expect(html).toContain("Urgente · antes del plazo normal (hasta +30 %)");
  const en = decode(await (await request.get("/en")).text());
  expect(en).toContain("Rush · faster than standard (up to +30%)");
});

test("grep de control: sin plazos ni recargos antiguos en archivos de texto", () => {
  // -I: solo archivos de texto (los binarios, como las fotos de public/, no
  // cuentan). -E con alternativas; «|| true» porque git grep sale con 1 si
  // no encuentra nada.
  const out = execSync(
    `git grep -I -n -E "24-72|24 a 72|\\b48 ?h\\b|más de 10 páginas en el día \\(\\+30" -- app content public || true`,
    { encoding: "utf8" }
  ).trim();
  expect(out).toBe("");
});
