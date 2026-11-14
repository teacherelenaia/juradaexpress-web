// tests/precio-calculadora.spec.mjs
//
// Cálculo de la calculadora y de /api/quote (content/pricing.js, 14/11/2026):
//   - precio fijo (partida, matrimonio, penales, permiso, título, certificado
//     de empresa): cubre hasta 2 páginas; cada página más, 20 €;
//   - sin precio fijo (contrato, escritura, expediente…): 20 € por página,
//     mínimo 35 €;
//   - urgente: hasta +30 % sobre ese total (se muestra el máximo).
// Prueba la función directamente (sin servidor) y, en el HTML servido, que la
// calculadora da el precio esperado al elegir documento y páginas.
//
//   npm test
import { test, expect } from "@playwright/test";
import { DOCUMENTS } from "../content/documents.js";
import { estimatePrice, firmPriceUsd } from "../content/pricing.js";

const doc = (id) => DOCUMENTS.find((d) => d.id === id);

const CASES = [
  { id: "partida-nacimiento", pages: 1, urgent: false, eur: 35 },
  { id: "partida-nacimiento", pages: 2, urgent: false, eur: 35 },
  { id: "partida-nacimiento", pages: 4, urgent: false, eur: 75 },
  { id: "contrato-escritura", pages: 12, urgent: false, eur: 240 },
  { id: "contrato-escritura", pages: 12, urgent: true, eur: 312 },
  // Mínimo de 35 € en los documentos que van por página.
  { id: "contrato-escritura", pages: 1, urgent: false, eur: 35 },
];

for (const c of CASES) {
  test(`precio: ${c.id}, ${c.pages} pág.${c.urgent ? ", urgente" : ""} = ${c.eur} €`, () => {
    expect(estimatePrice(doc(c.id), c.pages, c.urgent)).toBe(c.eur);
  });
}

// Formulario de despachos: precio fijo en dólares + unos $20 por página
// extra; sin precio fijo, sin estimación («Fixed quote in 2 hours»).
const FIRM_CASES = [
  { id: "partida-nacimiento", pages: 1, usd: 40 },
  { id: "partida-nacimiento", pages: 2, usd: 40 },
  { id: "partida-nacimiento", pages: 4, usd: 80 },
  { id: "contrato-escritura", pages: 12, usd: null },
];
for (const c of FIRM_CASES) {
  test(`despachos: ${c.id}, ${c.pages} pág. = ${c.usd == null ? "sin estimación" : "$" + c.usd}`, () => {
    expect(firmPriceUsd(doc(c.id), c.pages)).toBe(c.usd);
  });
}

// En el navegador (portada ES): mismos casos a través de la calculadora.
test("calculadora de la portada: partida 4 págs. y contrato 12 págs. urgente", async ({ page }) => {
  await page.goto("/");
  const calc = page.locator("#calculadora");
  const price = calc.locator("p.font-display").first();

  await calc.locator("select").first().selectOption("partida-nacimiento");
  await calc.locator('input[type="number"]').first().fill("4");
  await expect(price).toHaveText(/75\s?€/);

  await calc.locator("select").first().selectOption("contrato-escritura");
  await calc.locator('input[type="number"]').first().fill("12");
  await expect(price).toHaveText(/240\s?€/);
  await calc.locator('input[value="urgent"]').check();
  await expect(price).toHaveText(/312\s?€/);
  await expect(calc).toContainText("Recargo máximo; te confirmo el importe exacto");
});
