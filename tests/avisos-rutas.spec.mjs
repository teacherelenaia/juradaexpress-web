// tests/avisos-rutas.spec.mjs
//
// Las tres rutas que mandan avisos, llamadas directamente (sin servidor) con
// el envío a Resend interceptado: no sale ningún correo ni se toca Blob
// (sin BLOB_READ_WRITE_TOKEN) ni Stripe (firma de prueba local).
//
//   npx playwright test tests/avisos-rutas.spec.mjs
import { test, expect } from "@playwright/test";
import Stripe from "stripe";

const LANDING =
  "/?gad_campaignid=24339671482&kw=sworn%20translator%20spain&mt=p&ag=1&gclid=TEST";

const ATTR = {
  gclid: "TEST",
  gbraid: "",
  wbraid: "",
  utm: { source: "", medium: "", campaign: "", term: "", content: "" },
  ads: { campaignid: "24339671482", kw: "sworn translator spain", mt: "p", ag: "1" },
  landing: LANDING,
  referrer: "www.google.com",
  ts: "2026-11-14T10:00:00.000Z",
};

let sent = [];
const realFetch = globalThis.fetch;

test.beforeEach(() => {
  sent = [];
  delete process.env.BLOB_READ_WRITE_TOKEN;
  delete process.env.CRM_WEBHOOK_TOKEN;
  process.env.RESEND_API_KEY = "re_test";
  process.env.QUOTE_FROM_EMAIL = "avisos@example.com";
  process.env.QUOTE_TO_EMAIL = "info@example.com";
  globalThis.fetch = async (url, init) => {
    if (String(url).startsWith("https://api.resend.com/")) {
      sent.push(JSON.parse(init.body));
      return new Response("{}", { status: 200 });
    }
    return realFetch(url, init);
  };
});

test.afterEach(() => {
  globalThis.fetch = realFetch;
});

test("wa-click: aviso con campaña y palabra clave", async () => {
  const { POST } = await import("../app/api/wa-click/route.js");
  const body = JSON.stringify({ ref: "JX-TEST01", lang: "en", page: "/en", attribution: ATTR });
  const res = await POST(new Request("http://localhost/api/wa-click", { method: "POST", body }));
  expect(res.status).toBe(204);
  expect(sent).toHaveLength(1);
  expect(sent[0].subject).toBe("WhatsApp desde Google Ads · EN · sworn translator spain · JX-TEST01");
  expect(sent[0].text).toContain("Campaña: EN\nPalabra clave: sworn translator spain (frase)\n");
  console.log(`\n--- ${sent[0].subject}\n${sent[0].text}`);
});

test("quote: asunto con origen y campaña; palabra clave en el cuerpo", async () => {
  const { POST } = await import("../app/api/quote/route.js");
  const fd = new FormData();
  fd.append("privacy", "on");
  fd.append("locale", "en");
  fd.append("documentId", "partida-nacimiento");
  fd.append("pages", "1");
  fd.append("urgency", "normal");
  fd.append("delivery", "pdf");
  fd.append("name", "Test");
  fd.append("email", "correo@cliente.test");
  fd.append("attribution", JSON.stringify(ATTR));
  const res = await POST(new Request("http://localhost/api/quote", { method: "POST", body: fd }));
  expect(res.status).toBe(200);
  expect(sent).toHaveLength(1);
  expect(sent[0].subject).toBe(
    "Presupuesto web · Google Ads · EN · Partida de nacimiento · correo@cliente.test"
  );
  expect(sent[0].text).toContain("Origen: Google Ads\nCampaña: EN\nPalabra clave: sworn translator spain (frase)");
  console.log(`\n--- ${sent[0].subject}\n${sent[0].text}`);

  // Sin campaña: solo el origen.
  sent = [];
  const fd2 = new FormData();
  for (const [k, v] of fd.entries()) if (k !== "attribution") fd2.append(k, v);
  fd2.append("attribution", "{}");
  await POST(new Request("http://localhost/api/quote", { method: "POST", body: fd2 }));
  expect(sent[0].subject).toBe("Presupuesto web · Web · Partida de nacimiento · correo@cliente.test");
});

test("stripe-webhook: línea «Origen del cliente» según `ref`", async () => {
  process.env.STRIPE_SECRET_KEY = "sk_test_dummy";
  process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
  const { POST } = await import("../app/api/stripe-webhook/route.js");
  const stripe = new Stripe("sk_test_dummy");
  for (const [ref, expected] of [
    ["calculadora", "Origen del cliente: calculadora de la web"],
    ["", "Origen del cliente: sin referencia"],
    ["JX-TEST01", "Origen del cliente: JX-TEST01 no aparece entre los avisos guardados"],
  ]) {
    sent = [];
    const payload = JSON.stringify({
      id: "evt_test",
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_test_1",
          payment_status: "paid",
          amount_total: 5500,
          currency: "usd",
          created: 1794650224,
          payment_link: "plink_test",
          customer_details: { email: "cliente@example.com", name: "Cliente" },
          metadata: ref ? { ref } : {},
        },
      },
    });
    const header = stripe.webhooks.generateTestHeaderString({ payload, secret: "whsec_test" });
    const res = await POST(
      new Request("http://localhost/api/stripe-webhook", {
        method: "POST",
        body: payload,
        headers: { "stripe-signature": header },
      })
    );
    expect(res.status).toBe(200);
    expect(sent).toHaveLength(1);
    expect(sent[0].text).toContain(expected);
  }
});
