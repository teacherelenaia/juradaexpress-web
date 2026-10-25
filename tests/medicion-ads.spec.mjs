// tests/medicion-ads.spec.mjs
//
// Medición de Google Ads con modo de consentimiento avanzado (25/10/2026):
//   - Sin aceptar cookies: consent default denegado, ninguna cookie de
//     Google y, si hay NEXT_PUBLIC_ADS_ID, gtag.js cargado y una conversión
//     «Clic en WhatsApp» (con transport_type beacon) por cada clic en cada
//     enlace de WhatsApp visible.
//   - Después de aceptar: consent update concedido (salvo personalización)
//     y sigue habiendo exactamente una conversión por clic.
//   - /gracias y /en/thank-you: noindex y sin conversión de compra si no
//     llega un session_id de Stripe.
// Todo lo que va a dominios de Google se bloquea (salvo gtag.js) para no
// registrar conversiones de prueba en la cuenta real.
//
//   npm test -- tests/medicion-ads.spec.mjs
import { test, expect } from "@playwright/test";

const PAGES = [
  ["/", "Aceptar"],
  ["/en/sworn-english-translator", "Accept"],
];

async function prepare(context) {
  await context.route(/^https:\/\/(wa\.me|api\.whatsapp\.com)\//, (r) =>
    r.fulfill({ status: 200, contentType: "text/html", body: "<title>wa</title>" })
  );
  await context.route("**/api/wa-click", (r) => r.fulfill({ status: 204, body: "" }));
  await context.route(
    (url) => /(google|doubleclick)/.test(url.hostname),
    (r) =>
      /googletagmanager\.com\/gtag\/js/.test(r.request().url())
        ? r.continue()
        : r.fulfill({ status: 204, body: "" })
  );
}

const conversions = (page) =>
  page.evaluate(
    () =>
      (window.dataLayer || []).filter(
        (e) => e[0] === "event" && e[1] === "conversion" && e[2]?.transport_type === "beacon"
      ).length
  );

async function clickEachWhatsApp(page, context) {
  const links = page.locator('a[href*="wa.me"]:visible');
  const n = await links.count();
  expect(n).toBeGreaterThan(0);
  for (let i = 0; i < n; i++) {
    const before = await conversions(page);
    const popup = context.waitForEvent("page", { timeout: 3000 }).catch(() => null);
    await links.nth(i).click();
    const p = await popup;
    if (p) await p.close();
    await expect.poll(() => conversions(page)).toBe(before + 1);
  }
}

for (const [path, acceptName] of PAGES) {
  test(`${path}: una conversión por clic en WhatsApp, antes y después de aceptar`, async ({ page, context }) => {
    await prepare(context);
    await page.goto(path);
    const accept = page.getByRole("button", { name: acceptName, exact: true });
    await expect(accept).toBeVisible();

    const consentDefault = await page.evaluate(() =>
      (window.dataLayer || []).find((e) => e[0] === "consent" && e[1] === "default")?.[2]
    );
    expect(consentDefault).toMatchObject({
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });

    const hasAdsTag = await page.evaluate(() =>
      [...document.scripts].some((s) => /gtag\/js\?id=AW-/.test(s.src))
    );
    test.skip(!hasAdsTag, "Sin NEXT_PUBLIC_ADS_ID no se carga la etiqueta de Ads");

    await clickEachWhatsApp(page, context);
    const googleCookies = (await context.cookies()).filter((c) => /^_g/.test(c.name));
    expect(googleCookies).toEqual([]);

    await accept.click();
    await expect(accept).toBeHidden();
    const update = await page.evaluate(() =>
      (window.dataLayer || []).filter((e) => e[0] === "consent" && e[1] === "update").at(-1)?.[2]
    );
    expect(update).toMatchObject({
      ad_storage: "granted",
      ad_user_data: "granted",
      analytics_storage: "granted",
      ad_personalization: "denied",
    });
    await clickEachWhatsApp(page, context);
  });
}

for (const path of ["/gracias", "/en/thank-you"]) {
  test(`${path}: noindex y sin conversión de compra sin session_id`, async ({ page, context }) => {
    await prepare(context);
    await page.goto(path);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator("h1")).toBeVisible();
    await page.waitForTimeout(1000);
    expect(await conversions(page)).toBe(0);
  });
}
