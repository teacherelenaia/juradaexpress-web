// tests/whatsapp-origen.spec.mjs
//
// «Origen» en los WhatsApp que llegan desde anuncios (app/lib/waOrigin.js,
// app/api/wa-click/route.js). Comprueba que:
//   - Con gclid y utm_campaign en la URL, al pulsar el primer enlace wa.me
//     visible el texto del mensaje termina en «(Ad ref.: JX-XXXXXX)» y se
//     manda un POST a /api/wa-click con esa misma referencia.
//   - Sin parámetros de campaña, el enlace no cambia y no hay POST.
//
//   npm test                       (levanta next dev en el puerto 3311)
//   PLAYWRIGHT_BASE_URL=http://127.0.0.1:3000 npm test   (servidor propio)
import { test, expect } from "@playwright/test";

const PAGE = "/en/sworn-translations-spanish-visas";
const REF_RE = /^JX-[A-Z0-9]{6}$/;
const AD_LINE_RE = /\(Ad ref\.: (JX-[A-Z0-9]{6})\)$/;

// Deja la página lista: WhatsApp interceptado (sin abrir nada de verdad),
// /api/wa-click capturado y cookies aceptadas (así AdsConversion y
// AttributionCapture ya están montados).
async function prepare(page, context, url) {
  const waRequests = [];
  const clickPosts = [];
  await context.route(/^https:\/\/(wa\.me|api\.whatsapp\.com)\//, (route) => {
    waRequests.push(route.request().url());
    route.fulfill({ status: 200, contentType: "text/html", body: "<title>wa</title>" });
  });
  await context.route("**/api/wa-click", (route) => {
    const req = route.request();
    if (req.method() === "POST") clickPosts.push(req.postData() || "");
    route.fulfill({ status: 204, body: "" });
  });
  await page.goto(url);
  const accept = page.getByRole("button", { name: "Accept" });
  await expect(accept).toBeVisible();
  await accept.click();
  await expect(accept).toBeHidden();
  return { waRequests, clickPosts };
}

function firstWhatsAppLink(page) {
  return page.locator('a[href^="https://wa.me/"]:visible').first();
}

// Texto decodificado del parámetro `text` de un enlace wa.me.
const textOf = (href) => new URL(href).searchParams.get("text") || "";

test("con gclid: el mensaje lleva la referencia y se avisa a /api/wa-click", async ({ page, context }) => {
  const { waRequests, clickPosts } = await prepare(
    page,
    context,
    `${PAGE}?gclid=TEST123&utm_campaign=visados`
  );

  const link = firstWhatsAppLink(page);
  const before = await link.getAttribute("href");
  expect(textOf(before)).not.toMatch(AD_LINE_RE);

  const popup = context.waitForEvent("page").catch(() => null);
  await link.click();

  // El href se reescribe en la fase de captura, antes de navegar.
  await expect.poll(() => link.getAttribute("href")).toMatch(/JX-[A-Z0-9]{6}/);
  const after = await link.getAttribute("href");
  const text = textOf(after);
  expect(text).toMatch(AD_LINE_RE);
  const ref = text.match(AD_LINE_RE)[1];
  expect(ref).toMatch(REF_RE);
  // El resto del mensaje original se conserva, con la referencia como última línea.
  expect(text.startsWith(textOf(before))).toBe(true);
  expect(text.split("\n").pop()).toBe(`(Ad ref.: ${ref})`);

  // La navegación (en pestaña nueva) ha ido a wa.me con ese mismo texto.
  await expect.poll(() => waRequests.length, { timeout: 10_000 }).toBeGreaterThan(0);
  expect(textOf(waRequests[0])).toBe(text);

  // POST a /api/wa-click con la misma referencia y la atribución.
  await expect.poll(() => clickPosts.length, { timeout: 10_000 }).toBeGreaterThan(0);
  const body = JSON.parse(clickPosts[0]);
  expect(body.ref).toBe(ref);
  expect(body.lang).toBe("en");
  expect(body.page).toContain(PAGE);
  expect(body.attribution.gclid).toBe("TEST123");
  expect(body.attribution.utm.campaign).toBe("visados");

  // La misma referencia queda guardada para toda la visita.
  expect(await page.evaluate(() => sessionStorage.getItem("jx_wa_ref"))).toBe(ref);

  const p = await popup;
  if (p) await p.close();
});

test("sin parámetros de campaña: el enlace no cambia y no hay POST", async ({ page, context }) => {
  const { waRequests, clickPosts } = await prepare(page, context, PAGE);

  const link = firstWhatsAppLink(page);
  const before = await link.getAttribute("href");

  const popup = context.waitForEvent("page").catch(() => null);
  await link.click();

  await expect.poll(() => waRequests.length, { timeout: 10_000 }).toBeGreaterThan(0);
  expect(await link.getAttribute("href")).toBe(before);
  expect(textOf(waRequests[0])).toBe(textOf(before));
  expect(textOf(before)).not.toMatch(/JX-[A-Z0-9]{6}/);

  await page.waitForTimeout(1500);
  expect(clickPosts).toHaveLength(0);
  expect(await page.evaluate(() => sessionStorage.getItem("jx_wa_ref"))).toBeNull();

  const p = await popup;
  if (p) await p.close();
});
