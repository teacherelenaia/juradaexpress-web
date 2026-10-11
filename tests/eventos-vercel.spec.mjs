// tests/eventos-vercel.spec.mjs
//
// Eventos de comportamiento sin cookies para Vercel Analytics
// (app/components/EngagementEvents.js, app/lib/engagement.js). Comprueba
// que al cargar /en/sworn-english-translator con parámetros de campaña en
// la URL, bajar hasta el final y pulsar el botón de WhatsApp (sin seguir el
// enlace) se envían scroll_depth 25-100, section_view: precios y
// cta_click: whatsapp, que cada evento solo lleva `lang` además de su
// propiedad (la página la registra Vercel a partir de la URL que acompaña
// al evento, recortada sin query) y que ninguna petición a
// /_vercel/insights/event contiene
// gclid, utm ni la referencia JX. Y que time_on_page se pausa con la
// pestaña oculta (reloj simulado de Playwright).
//
// Solo corre en el proyecto «produccion» de playwright.config.mjs (build de
// producción en el puerto 3312, o PLAYWRIGHT_PROD_URL), porque los eventos
// no se envían en `next dev`.
//
// Por qué se sustituye el script de Vercel: @vercel/analytics encola las
// llamadas en window.va y es /_vercel/insights/script.js (que solo sirve
// Vercel, no `next start`) quien hace las peticiones POST a
// /_vercel/insights/event. Además, ese script (v0.1.3) no hace nada cuando
// navigator.webdriver es true, es decir, nunca en Playwright. Aquí se sirve
// en su lugar un sustituto que replica su contrato (vaciar window.vaq,
// aplicar beforeSend a { type, url, payload } y enviar { o, en, ed, r }),
// así la prueba ejercita el `track` real del paquete y nuestro beforeSend.
import { test, expect } from "@playwright/test";

const PAGE = "/en/sworn-english-translator";
const CAMPAIGN = "?gclid=TEST123&utm_source=google&utm_campaign=visados&ref=JX-ABC123";
const FORBIDDEN = [/gclid/i, /utm_/i, /JX-[A-Z0-9]{6}/, /TEST123/, /visados/];

// Sustituto de /_vercel/insights/script.js (ver cabecera).
const STUB_SCRIPT = `(() => {
  let beforeSend = (e) => e;
  const ds = (document.currentScript && document.currentScript.dataset) || {};
  const base = () => ({ sv: "stub", sdkn: ds.sdkn, sdkv: ds.sdkv, ts: Date.now() });
  const send = (endpoint, body) =>
    fetch(endpoint, {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).catch(() => {});
  window.va = (type, data) => {
    if (type === "beforeSend") { beforeSend = data; return; }
    if (type === "pageview") {
      const r = beforeSend({ type: "pageview", url: location.href });
      if (r === false || r === null) return;
      send("/_vercel/insights/view", { ...base(), o: (r && r.url) || location.href });
      return;
    }
    if (type === "event" && data) {
      const payload = { name: data.name, data: data.data };
      const r = beforeSend({ type: "event", url: location.href, payload });
      if (r === false || r === null) return;
      const p = (r && r.payload) || payload;
      send("/_vercel/insights/event", {
        ...base(),
        o: (r && r.url) || location.href,
        r: document.referrer,
        en: p.name,
        ed: p.data,
      });
    }
  };
  (window.vaq || []).forEach(([t, d]) => window.va(t, d));
  window.__vaStub = true;
})();`;

async function prepare(page, context, url) {
  const events = [];
  await context.route("**/_vercel/insights/script.js", (route) =>
    route.fulfill({ status: 200, contentType: "text/javascript", body: STUB_SCRIPT })
  );
  await context.route("**/_vercel/insights/event", (route) => {
    events.push(JSON.parse(route.request().postData() || "{}"));
    route.fulfill({ status: 204, body: "" });
  });
  await context.route("**/_vercel/insights/view", (route) =>
    route.fulfill({ status: 204, body: "" })
  );
  // WhatsApp sin abrir nada de verdad y sin avisar a /api/wa-click (email).
  await context.route(/^https:\/\/(wa\.me|api\.whatsapp\.com)\//, (route) =>
    route.fulfill({ status: 200, contentType: "text/html", body: "<title>wa</title>" })
  );
  await context.route("**/api/wa-click", (route) => route.fulfill({ status: 204, body: "" }));

  await page.goto(url);
  await page.waitForFunction(() => window.__vaStub === true);
  // Sin build de producción el paquete queda en modo development y
  // app/lib/engagement.js no envía nada: avisar en vez de fallar a ciegas.
  expect(
    await page.evaluate(() => window.vam),
    "esta prueba necesita el build de producción (proyecto «produccion»)"
  ).toBe("production");
  return events;
}

const named = (events, name) => events.filter((e) => e.en === name);
const depths = (events) => named(events, "scroll_depth").map((e) => e.ed.depth).sort((a, b) => a - b);
const seconds = (events) => named(events, "time_on_page").map((e) => e.ed.seconds);

test("scroll, sección de precios y WhatsApp, sin gclid ni utm en las peticiones", async ({ page, context }) => {
  const events = await prepare(page, context, PAGE + CAMPAIGN);
  const origin = new URL(page.url()).origin;

  // Baja hasta el final en pasos de media pantalla, para que la sección de
  // precios llegue a estar al menos a la mitad en pantalla.
  const steps = await page.evaluate(() =>
    Math.ceil(document.documentElement.scrollHeight / (window.innerHeight / 2))
  );
  for (let i = 1; i <= steps; i++) {
    await page.evaluate((n) => window.scrollTo(0, (window.innerHeight / 2) * n), i);
    await page.waitForTimeout(60);
  }
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));

  // WhatsApp (primer enlace wa.me visible), sin seguir el enlace.
  const link = page.locator('a[href^="https://wa.me/"]:visible').first();
  const popup = context.waitForEvent("page").catch(() => null);
  await link.click();

  await expect.poll(() => depths(events)).toEqual([25, 50, 75, 100]);
  await expect
    .poll(() => named(events, "section_view").map((e) => e.ed.section))
    .toContain("precios");
  await expect
    .poll(() => named(events, "cta_click").map((e) => e.ed.cta))
    .toContain("whatsapp");

  // Un evento por valor y por sección.
  await page.waitForTimeout(300);
  expect(depths(events)).toEqual([25, 50, 75, 100]);
  expect(named(events, "section_view").filter((e) => e.ed.section === "precios")).toHaveLength(1);

  for (const e of events) {
    // Propiedades: la del evento más lang, nada más (Vercel Pro admite 2).
    expect(e.ed.lang).toBe("en");
    const extra = Object.keys(e.ed).filter((k) => k !== "lang");
    expect(extra, `${e.en}: ${JSON.stringify(e.ed)}`).toHaveLength(1);
    expect(["depth", "seconds", "section", "cta", "host"]).toContain(extra[0]);
    // La URL que acompaña al evento (la «página» del evento en Vercel) va
    // sin query (beforeSend).
    expect(e.o).toBe(`${origin}${PAGE}`);
    // Nada de la campaña ni de la referencia JX en toda la petición.
    const raw = JSON.stringify(e);
    for (const re of FORBIDDEN) expect(raw, `${e.en}: ${raw}`).not.toMatch(re);
  }

  const p = await popup;
  if (p) await p.close();
});

test("time_on_page: 10, 30… segundos visibles, en pausa con la pestaña oculta", async ({ page, context }) => {
  // Reloj simulado (Date, setTimeout…) instalado antes de navegar; el
  // tiempo sigue corriendo con normalidad y runFor lo adelanta.
  await page.clock.install();
  const events = await prepare(page, context, PAGE);

  await page.clock.runFor(10_500);
  await expect.poll(() => seconds(events)).toEqual([10]);

  const setVisibility = (state) =>
    page.evaluate((s) => {
      Object.defineProperty(document, "visibilityState", { value: s, configurable: true });
      document.dispatchEvent(new Event("visibilitychange"));
    }, state);

  // Pestaña oculta durante 30 s: el contador no avanza.
  await setVisibility("hidden");
  await page.clock.runFor(30_000);
  await page.waitForTimeout(200);
  expect(seconds(events)).toEqual([10]);

  // Vuelve a estar visible: a los 20 s más (30 s visibles en total) llega el 30.
  await setVisibility("visible");
  await page.clock.runFor(20_500);
  await expect.poll(() => seconds(events)).toEqual([10, 30]);
  expect(named(events, "time_on_page").every((e) => e.ed.lang === "en")).toBe(true);
});
