// app/lib/weeklySummary.js
//
// Resumen semanal de contactos (14/11/2026): cálculo y texto, sin E/S, para
// poder probarlo (tests/avisos-campana.spec.mjs). La ruta
// app/api/weekly-summary/route.js lee los datos y manda el correo.
//
// Semana: de sábado a viernes, hora de Madrid. El correo sale el sábado a
// las 8:00 con la semana que acaba de terminar.
import { originSummary } from "./adsCampaign";

const TIME_ZONE = "Europe/Madrid";
const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sept", "oct", "nov", "dic"];

// ─── Fechas ─────────────────────────────────────────────────────────────

// { y, m, d, weekday (0 = domingo), hour } en Madrid.
export function madridNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
    weekday: "short",
  }).formatToParts(date);
  const get = (t) => parts.find((p) => p.type === t)?.value || "";
  const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const hour = Number(get("hour")) % 24;
  return { y: Number(get("year")), m: Number(get("month")), d: Number(get("day")), weekday: wd, hour };
}

const pad = (n) => String(n).padStart(2, "0");
export const ymd = ({ y, m, d }) => `${y}-${pad(m)}-${pad(d)}`;

// Suma días a una fecha de calendario (sin horas).
export function addDays({ y, m, d }, n) {
  const t = new Date(Date.UTC(y, m - 1, d + n));
  return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() };
}

// Instante UTC de las 00:00 de Madrid de esa fecha.
export function madridMidnight({ y, m, d }) {
  const guess = Date.UTC(y, m - 1, d, 0, 0, 0);
  // Desfase de Madrid a esa hora (+1 o +2): se corrige una vez.
  const local = madridNow(new Date(guess));
  const asUtc = Date.UTC(local.y, local.m - 1, local.d, local.hour);
  const offset = asUtc - guess;
  return new Date(guess - offset);
}

/**
 * Semana anterior (sábado a viernes) a la fecha `now` en Madrid. Si `now`
 * es sábado, la que acaba de terminar el viernes.
 * Devuelve { start, end (viernes), days: ["AAAA-MM-DD"…], from, to (Date) }.
 */
export function previousWeek(now = new Date()) {
  const today = madridNow(now);
  // Días desde el último sábado (hoy incluido si es sábado).
  const sinceSat = (today.weekday + 1) % 7;
  const thisSat = addDays(today, -sinceSat);
  const start = addDays(thisSat, -7);
  const end = addDays(start, 6);
  const days = Array.from({ length: 7 }, (_, i) => ymd(addDays(start, i)));
  return { start, end, days, from: madridMidnight(start), to: madridMidnight(thisSat) };
}

// «14–20 nov» o «28 nov–4 dic».
export function weekLabel(start, end) {
  if (start.m === end.m) return `${start.d}–${end.d} ${MONTHS[end.m - 1]}`;
  return `${start.d} ${MONTHS[start.m - 1]}–${end.d} ${MONTHS[end.m - 1]}`;
}

// ─── Contactos ──────────────────────────────────────────────────────────

const ORDER = ["google_ads", "chatgpt", "web"];
const ORIGIN_TITLE = { google_ads: "Google Ads", chatgpt: "ChatGPT", web: "Web" };

/**
 * contacts: [{ canal: "whatsapp"|"calculadora", ref, origen, campana,
 * palabraClave, persona }]
 */
export function summarizeContacts(contacts) {
  const byOrigin = {};
  for (const o of ORDER) byOrigin[o] = { whatsapp: 0, calculadora: 0, campaigns: {} };
  let whatsapp = 0;
  let calculadora = 0;
  for (const c of contacts) {
    const origin = ORDER.includes(c.origen) ? c.origen : "web";
    const canal = c.canal === "calculadora" ? "calculadora" : "whatsapp";
    if (canal === "whatsapp") whatsapp++;
    else calculadora++;
    const o = byOrigin[origin];
    o[canal]++;
    if (origin === "google_ads") {
      const camp = c.campana || "(sin campaña)";
      const kw = c.palabraClave || "(sin palabra clave)";
      o.campaigns[camp] = o.campaigns[camp] || { total: 0, keywords: {} };
      o.campaigns[camp].total++;
      o.campaigns[camp].keywords[kw] = (o.campaigns[camp].keywords[kw] || 0) + 1;
    }
  }
  // Personas distintas: cada referencia JX es una persona; una solicitud de
  // la calculadora con la referencia de la misma visita es la misma; las
  // solicitudes con el mismo email (huella) son la misma persona.
  const people = new Set();
  for (const c of contacts) {
    if (c.canal !== "calculadora" && c.ref) people.add(`ref:${c.ref}`);
  }
  let anonymous = 0;
  for (const c of contacts) {
    if (c.canal !== "calculadora") {
      if (!c.ref) anonymous++;
      continue;
    }
    if (c.ref && people.has(`ref:${c.ref}`)) continue;
    if (c.persona) people.add(`p:${c.persona}`);
    else if (c.ref) people.add(`ref:${c.ref}`);
    else anonymous++;
  }
  return { total: contacts.length, whatsapp, calculadora, people: people.size + anonymous, byOrigin };
}

// ─── Pagos ──────────────────────────────────────────────────────────────

/**
 * payments: [{ amount (céntimos), currency, ref, origin (registro de refs/
 * o null) }]. Con referencia JX encontrada → su origen; «calculadora» →
 * Calculadora; JX no encontrada → «JX sin aviso guardado»; vacío o
 * «sin-ref» → solo se cuentan.
 */
export function summarizePayments(payments) {
  const groups = {};
  let withoutRef = 0;
  for (const p of payments) {
    const ref = String(p.ref || "").trim();
    if (!ref || /^sin[-_ ]?ref$/i.test(ref)) {
      withoutRef++;
      continue;
    }
    let key;
    if (/^calculadora$/i.test(ref)) key = "Calculadora (sin referencia de anuncio)";
    else if (p.origin) {
      key = originSummary(p.origin.origen || "web", {
        campaign: p.origin.campana || "",
        keyword: p.origin.palabraClave || "",
      });
    } else if (/^JX-/i.test(ref)) key = "Referencia JX sin aviso guardado";
    else key = `Otra referencia («${ref}»)`;
    const g = (groups[key] = groups[key] || { count: 0, amounts: {} });
    g.count++;
    const cur = String(p.currency || "eur").toUpperCase();
    g.amounts[cur] = (g.amounts[cur] || 0) + (Number(p.amount) || 0);
  }
  return { groups, withoutRef, withRef: payments.length - withoutRef };
}

function money(cents, currency) {
  const n = (cents / 100).toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (currency === "EUR") return `${n} €`;
  if (currency === "USD") return `${n} $`;
  return `${n} ${currency}`;
}

// ─── Texto ──────────────────────────────────────────────────────────────

export function summarySubject(week) {
  return `Resumen semanal de contactos · ${weekLabel(week.start, week.end)}`;
}

export function summaryText({ week, contacts, payments, notes = [] }) {
  const lines = [];
  lines.push(
    `Semana del sábado ${week.start.d}/${pad(week.start.m)} al viernes ${week.end.d}/${pad(week.end.m)}/${week.end.y} (hora de Madrid).`,
    ""
  );
  lines.push("CONTACTOS");
  lines.push(
    `WhatsApp: ${contacts.whatsapp} · Calculadora: ${contacts.calculadora} · Personas distintas: ${contacts.people}`
  );
  for (const o of ORDER) {
    const g = contacts.byOrigin[o];
    const n = g.whatsapp + g.calculadora;
    lines.push("");
    lines.push(`${ORIGIN_TITLE[o]}: ${n} (WhatsApp ${g.whatsapp} · calculadora ${g.calculadora})`);
    if (o === "google_ads") {
      const camps = Object.entries(g.campaigns).sort((a, b) => b[1].total - a[1].total);
      for (const [camp, data] of camps) {
        lines.push(`  ${camp}: ${data.total}`);
        const kws = Object.entries(data.keywords).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
        for (const [kw, count] of kws) lines.push(`    ${kw}: ${count}`);
      }
    }
  }
  lines.push("", "PAGOS CON REF");
  const groups = Object.entries(payments.groups).sort((a, b) => b[1].count - a[1].count);
  if (!groups.length) lines.push("Ninguno.");
  for (const [key, g] of groups) {
    const amounts = Object.entries(g.amounts)
      .sort((a, b) => (a[0] === "EUR" ? -1 : b[0] === "EUR" ? 1 : a[0].localeCompare(b[0])))
      .map(([cur, cents]) => money(cents, cur));
    lines.push(`${key}: ${g.count} · ${amounts.join(" · ")}`);
  }
  lines.push("", `Pagos sin ref: ${payments.withoutRef}`);
  if (notes.length) lines.push("", ...notes);
  lines.push("");
  return lines.join("\n");
}
