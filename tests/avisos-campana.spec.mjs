// tests/avisos-campana.spec.mjs
//
// Campaña y palabra clave en los avisos, origen del pago y resumen semanal
// (14/11/2026). Pruebas de funciones, sin servidor ni navegador.
//
//   npx playwright test tests/avisos-campana.spec.mjs
import { test, expect } from "@playwright/test";
import { adsInfo, decodeKeyword, clickOrigin, originSummary } from "../app/lib/adsCampaign.js";
import { emailSubject, emailText, parseBody } from "../app/lib/waNotice.js";
import { originLineFor } from "../app/lib/paymentOrigin.js";
import {
  previousWeek,
  weekLabel,
  summarizeContacts,
  summarizePayments,
  summaryText,
  summarySubject,
} from "../app/lib/weeklySummary.js";

const LANDING =
  "/?gad_campaignid=24339671482&kw=sworn%20translator%20spain&mt=p&ag=1&gclid=TEST";

const attrFrom = (landing, extra = {}) => ({
  gclid: "TEST",
  gbraid: "",
  wbraid: "",
  utm: { source: "", medium: "", campaign: "", term: "", content: "" },
  ads: { campaignid: "", kw: "", mt: "", ag: "" },
  landing,
  referrer: "www.google.com",
  ts: "2026-11-14T10:00:00.000Z",
  ...extra,
});

test("adsInfo lee campaña y palabra clave de la URL de entrada", () => {
  const info = adsInfo(attrFrom(LANDING));
  expect(info.campaign).toBe("EN");
  expect(info.campaignId).toBe("24339671482");
  expect(info.keyword).toBe("sworn translator spain");
  expect(info.matchType).toBe("frase");
  expect(info.adGroup).toBe("1");
});

test("adsInfo prefiere los datos guardados en `ads`", () => {
  const info = adsInfo(
    attrFrom("/en?gclid=TEST&_gl=1*abc", {
      ads: { campaignid: "24363650778", kw: "traductor jurado", mt: "e", ag: "9" },
    })
  );
  expect(info.campaign).toBe("ES");
  expect(info.keyword).toBe("traductor jurado");
  expect(info.matchType).toBe("exacta");
});

test("decodeKeyword: espacios, tildes y eñes", () => {
  expect(decodeKeyword("traducci%C3%B3n%20jurada%20espa%C3%B1a")).toBe("traducción jurada españa");
  expect(decodeKeyword("sworn+translator+spain")).toBe("sworn translator spain");
  // Doble codificación (%2520).
  expect(decodeKeyword("sworn%2520translator")).toBe("sworn translator");
  expect(adsInfo(attrFrom("/?gad_campaignid=1&kw=traducci%C3%B3n%20jurada&gclid=T")).keyword).toBe(
    "traducción jurada"
  );
});

test("campaña desconocida: se muestra el número", () => {
  const info = adsInfo(attrFrom("/?gad_campaignid=99999&kw=x&mt=b&gclid=T"));
  expect(info.campaign).toBe("99999");
  expect(info.matchType).toBe("amplia");
});

test("aviso de WhatsApp: asunto y cuerpo con campaña y palabra clave", () => {
  const raw = JSON.stringify({
    ref: "JX-TEST01",
    lang: "en",
    page: "/en",
    attribution: attrFrom(LANDING),
  });
  const click = parseBody(raw);
  expect(click).not.toBeNull();
  expect(emailSubject(click.ref, click.attribution)).toBe(
    "WhatsApp desde Google Ads · EN · sworn translator spain · JX-TEST01"
  );
  const text = emailText({ ...click, when: new Date("2026-11-14T10:05:00Z") });
  expect(text).toContain("Campaña: EN\n");
  expect(text).toContain("Palabra clave: sworn translator spain (frase)\n");
  // La línea de importación offline no cambia de formato.
  expect(text).toContain("Datos para Google Ads (importación de conversiones offline):\n");
  expect(text).toMatch(
    /\ngclid=TEST · gbraid= · wbraid= · landing=\/\?gad_campaignid=24339671482&kw=sworn%20translator%20spain&mt=p&ag=1&gclid=TEST · primer toque=2026-11-14T10:00:00.000Z\n/
  );
});

test("aviso de WhatsApp: sin palabra clave o sin campaña no deja huecos", () => {
  const noKw = attrFrom("/?gad_campaignid=24339671482&gclid=TEST");
  expect(emailSubject("JX-AAAAAA", noKw)).toBe("WhatsApp desde Google Ads · EN · JX-AAAAAA");
  const nothing = attrFrom("/en?gclid=TEST&_gl=1*abc");
  expect(emailSubject("JX-AAAAAA", nothing)).toBe("WhatsApp desde Google Ads · JX-AAAAAA");
  expect(emailText({ ref: "JX-AAAAAA", page: "/", attribution: nothing, when: new Date() })).toContain(
    "Campaña: Google Ads\n"
  );
  const chatgpt = attrFrom("/", {
    gclid: "",
    referrer: "chatgpt.com",
    utm: { source: "chatgpt.com", medium: "", campaign: "", term: "", content: "" },
  });
  expect(clickOrigin(chatgpt)).toBe("chatgpt");
  expect(emailSubject("JX-AAAAAA", chatgpt)).toBe("WhatsApp desde ChatGPT · JX-AAAAAA");
});

test("aviso de WhatsApp: campaña en el último toque (primera página sin anuncio)", () => {
  const attr = attrFrom("/blog", {
    gclid: "",
    referrer: "",
    last: attrFrom(LANDING),
  });
  expect(emailSubject("JX-BBBBBB", attr)).toBe(
    "WhatsApp desde Google Ads · EN · sworn translator spain · JX-BBBBBB"
  );
});

test("pago: línea «Origen del cliente»", () => {
  const rec = { origen: "google_ads", campana: "EN", palabraClave: "sworn translator spain" };
  expect(originLineFor("JX-TEST01", rec)).toBe(
    "Origen del cliente: Google Ads · EN · sworn translator spain (JX-TEST01)"
  );
  expect(originLineFor("jx-test01", { origen: "chatgpt" })).toBe("Origen del cliente: ChatGPT (JX-TEST01)");
  expect(originLineFor("", null)).toContain("sin referencia");
  expect(originLineFor("sin-ref", null)).toContain("ref: sin-ref");
  expect(originLineFor("calculadora", null)).toContain("calculadora");
  expect(originLineFor("JX-ZZZZZZ", null)).toContain("no aparece entre los avisos guardados");
  expect(originSummary("web", {})).toBe("web");
});

test("resumen semanal: semana de sábado a viernes y asunto", () => {
  const week = previousWeek(new Date("2026-11-21T07:30:00Z")); // sábado 8:30 en Madrid
  expect(week.days[0]).toBe("2026-11-14");
  expect(week.days[6]).toBe("2026-11-20");
  expect(summarySubject(week)).toBe("Resumen semanal de contactos · 14–20 nov");
  expect(week.from.toISOString()).toBe("2026-11-13T23:00:00.000Z");
  expect(week.to.toISOString()).toBe("2026-11-20T23:00:00.000Z");
  expect(weekLabel({ y: 2026, m: 11, d: 28 }, { y: 2026, m: 12, d: 4 })).toBe("28 nov–4 dic");
});

test("resumen semanal: contactos, personas distintas y pagos", () => {
  const contacts = summarizeContacts([
    { canal: "whatsapp", ref: "JX-AAAAA1", origen: "google_ads", campana: "EN", palabraClave: "sworn translator spain" },
    { canal: "whatsapp", ref: "JX-AAAAA2", origen: "google_ads", campana: "EN", palabraClave: "sworn translator spain" },
    { canal: "whatsapp", ref: "JX-AAAAA3", origen: "google_ads", campana: "ES", palabraClave: "" },
    { canal: "whatsapp", ref: "JX-AAAAA4", origen: "chatgpt" },
    // Misma visita que JX-AAAAA1: no es otra persona.
    { canal: "calculadora", ref: "JX-AAAAA1", origen: "google_ads", campana: "EN", palabraClave: "sworn translator spain", persona: "p-1" },
    // Dos solicitudes del mismo email: una persona.
    { canal: "calculadora", ref: "", origen: "web", persona: "p-2" },
    { canal: "calculadora", ref: "", origen: "web", persona: "p-2" },
  ]);
  expect(contacts.whatsapp).toBe(4);
  expect(contacts.calculadora).toBe(3);
  expect(contacts.people).toBe(5);
  expect(contacts.byOrigin.google_ads.campaigns.EN.keywords["sworn translator spain"]).toBe(3);

  const payments = summarizePayments([
    { amount: 5500, currency: "usd", ref: "JX-AAAAA1", origin: { origen: "google_ads", campana: "EN", palabraClave: "sworn translator spain" } },
    { amount: 3500, currency: "eur", ref: "JX-AAAAA3", origin: { origen: "google_ads", campana: "ES", palabraClave: "" } },
    { amount: 3500, currency: "eur", ref: "calculadora" },
    { amount: 10000, currency: "eur", ref: "" },
    { amount: 3500, currency: "eur", ref: "sin-ref" },
  ]);
  expect(payments.withoutRef).toBe(2);
  const text = summaryText({
    week: previousWeek(new Date("2026-11-21T07:30:00Z")),
    contacts,
    payments,
  });
  expect(text).toContain("WhatsApp: 4 · Calculadora: 3 · Personas distintas: 5");
  expect(text).toContain("Google Ads: 4 (WhatsApp 3 · calculadora 1)");
  expect(text).toContain("  EN: 3\n    sworn translator spain: 3");
  expect(text).toContain("Google Ads · EN · sworn translator spain: 1 · 55,00 $");
  expect(text).toContain("Google Ads · ES: 1 · 35,00 €");
  expect(text).toContain("Pagos sin ref: 2");
  // Sin datos personales: ni huellas de persona ni emails.
  expect(text).not.toMatch(/p-\d|@/);
});
