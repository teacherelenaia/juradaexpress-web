"use client";

// app/components/QuoteCalculator.js
//
// Calculadora de precio + subida de documento (FASE 2 SEO, 27/09/2026).
// Se usa en la home ES/EN (bajo el hero) y en /traductor-jurado-ingles
// (ES/EN, vía ServicePage). Precios SOLO de content/documents.js; recargo
// de urgencia y nota de entrega en papel de content/site.js.
//
// Archivos (19/11/2026): misma subida que /enviar-documentos
// (app/lib/docUploadClient.js + useDocUpload + FileDropList). Con Google
// Drive conectado, cada archivo va directo del navegador a la carpeta del
// envío en Drive (por trozos, con reintentos y progreso por archivo) y
// /api/quote manda el aviso de siempre con el enlace a la carpeta. Sin
// Drive, como desde el 02/10/2026: directo a Vercel Blob (privado,
// /api/quote/upload) y /api/quote los adjunta al correo y los borra.
// Hasta 40 archivos. Lo que no llega se pide por WhatsApp.
//
// La subida ocurre EN ESTA PÁGINA (sin abrir WhatsApp a la vez: en el
// móvil la pestaña quedaba en segundo plano y se congelaba la subida). Al
// terminar se muestra la confirmación y un botón OPCIONAL de WhatsApp.
// Se exige email o teléfono para poder responder al cliente.
//
// Modo despacho (firmMode, 03/10/2026): formulario de pedido de la landing
// /en/for-immigration-law-firms. Añade «Firm name» (obligatorio) y
// «Client/matter reference», muestra los precios en dólares (content/usd.js),
// oculta la opción de urgencia con recargo y envía a /api/quote con
// firmMode=1, que pone el asunto «[LAW FIRM] …».
// Mobile-first: una columna en móvil, dos en ≥ md. Accesible: fieldset +
// legend en los grupos de radio, aria-live en el precio y en los estados,
// errores asociados con aria-describedby, zona de arrastre operable por
// teclado (es un <label> del <input type="file">).
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { DOCUMENTS } from "../../content/documents";
import {
  PAPER_DELIVERY_SPAIN,
  URGENCY_SURCHARGE,
  SAME_DAY_MAX_PAGES,
  OVER_LIMIT_HOURS,
  OVER_LIMIT_MAX_PAGES,
  OVER_LIMIT_TEXT,
  TURNAROUND,
  PRICE_PER_PAGE,
  FIXED_PRICE_MAX_PAGES,
  MIN_DOC_PRICE,
} from "../../content/site";
import { estimatePrice, firmPriceUsd } from "../../content/pricing";
import { toUsd, US_SHIPPING_USD } from "../../content/usd";
import { SectionHeading } from "./ui";
import QuotePromise from "./QuotePromise";
import { setAdsUserData, trackAdsConversion } from "./AdsConversion";
import { getAttribution } from "../lib/attribution";
import { appendWaOrigin, WA_REF_KEY, WA_REF_RE } from "../lib/waOrigin";
import { trackEngagement } from "../lib/engagement";
import { SOURCE_OPTIONS } from "../../content/sources";
import useDocUpload from "./useDocUpload";
import FileDropList from "./FileDropList";
import { ACCEPT as DOC_ACCEPT } from "../lib/docUploadClient";

const WHATSAPP_NUMBER = "34685891214";
// Sin Drive conectado, la calculadora sube a Blob por su ruta de siempre.
const LEGACY_BLOB = { handleUploadUrl: "/api/quote/upload", prefix: "presupuestos/" };
const COPY = {
  es: {
    title: "Calcula tu precio en 10 segundos",
    intro:
      "Elige el documento, indica páginas y urgencia y verás el precio orientativo al instante. Si quieres, adjunta el escaneo y te confirmo precio cerrado y plazo por escrito.",
    document: "Tipo de documento",
    pages: "Número de páginas",
    pagesHint: "De 1 a 20. Si son más, elige 20 y te lo presupuesto al verlo.",
    urgency: "Urgencia",
    urgencyNormal: `Normal · en el día hasta ${SAME_DAY_MAX_PAGES} páginas; hasta ${OVER_LIMIT_MAX_PAGES}, en ${OVER_LIMIT_HOURS} h`,
    urgencyUrgent: `Urgente · ${TURNAROUND.es.urgent} (hasta +${Math.round(URGENCY_SURCHARGE * 100)} %)`,
    delivery: "Entrega",
    deliveryPdf: "PDF firmado (incluido)",
    deliveryPaper: "PDF + papel por mensajería en España",
    estimate: "Precio estimado",
    quoteOnly: "Presupuesto en menos de 2 h",
    perDoc: "por documento",
    surchargeNote: "Recargo máximo; te confirmo el importe exacto.",
    fixedNote: `Precio fijo hasta ${FIXED_PRICE_MAX_PAGES} páginas; cada página más, ${PRICE_PER_PAGE} €.`,
    perPageNote: `${PRICE_PER_PAGE} € por página, con un mínimo de ${MIN_DOC_PRICE} € por documento.`,
    overLimitNote: `${OVER_LIMIT_TEXT.es.sentence} Si lo necesitas antes, dímelo al enviar.`,
    disclaimer: "Precio cerrado al ver el documento; nunca cobro sin confirmarlo antes.",
    paperNote: `+ mensajería: ${
      PAPER_DELIVERY_SPAIN.price != null
        ? `${PAPER_DELIVERY_SPAIN.price} € dentro de España`
        : "se indica en el presupuesto"
    }.`,
    files: "Adjunta el documento (opcional)",
    reasons: {
      failed: "no se ha podido subir",
    },
    contactLegend: "Tus datos de contacto",
    contactHint: "Indica al menos tu email o tu teléfono para enviarte el presupuesto.",
    name: "Nombre",
    email: "Email",
    phone: "Teléfono",
    source: "¿Cómo nos has conocido?",
    sourceOptional: "(opcional)",
    sourcePlaceholder: "Elige una opción",
    privacy: "He leído la",
    privacyLink: "política de privacidad",
    privacyTail:
      "y acepto que Elena Peñaranda Ortega trate mis datos y los documentos adjuntos solo para preparar el presupuesto.",
    submit: "Enviar y recibir mi precio cerrado",
    sending: "Enviando…",
    uploading: (pct) => `Subiendo archivos… ${pct} %. No cierres esta página.`,
    sendingSummary: "Enviando tu solicitud…",
    errPrivacy: "Marca la casilla de privacidad para continuar.",
    errContact: "Indica tu email o tu teléfono para poder enviarte el presupuesto.",
    sent: "¡Recibido! Tengo tu solicitud y tus documentos. Te envío precio cerrado y plazo en menos de 2 h. Si quieres, escríbeme también por WhatsApp:",
    sentNoFiles: "¡Recibido! Te envío precio cerrado y plazo en menos de 2 h. Si quieres, escríbeme también por WhatsApp:",
    attach:
      "He recibido tu solicitud, pero los archivos no se han podido subir. Envíamelos por WhatsApp, por favor:",
    partial:
      "He recibido tu solicitud, pero algunos archivos no se han podido subir. Envíamelos por WhatsApp, por favor:",
    failed:
      "No se ha podido enviar la solicitud (puede ser la conexión). Escríbeme por WhatsApp y te atiendo enseguida:",
    listEmailed: "Recibidos",
    listWhatsApp: "Envíame por WhatsApp",
    open: "Abrir WhatsApp",
    wa: {
      hello: "Hola Elena, he usado la calculadora de juradaexpress.es:",
      document: "Documento",
      pages: "Páginas",
      urgency: "Urgencia",
      normal: `normal (${TURNAROUND.es.short})`,
      urgent: `urgente (${TURNAROUND.es.urgent}, recargo de hasta el ${Math.round(URGENCY_SURCHARGE * 100)} %)`,
      delivery: "Entrega",
      pdf: "PDF firmado",
      paper: "PDF + papel por mensajería",
      estimate: "Precio estimado",
      quote: "pendiente de presupuesto",
      files: "Archivos",
      byEmail: "enviados por la web",
      attachAll: "te los adjunto aquí en WhatsApp",
      attachRest: "te adjunto aquí en WhatsApp",
      contact: "Contacto",
      close: "¿Me confirmas precio cerrado y plazo?",
    },
    privacyHref: "/politica-privacidad",
  },
  en: {
    title: "Get your price in 10 seconds",
    intro:
      "Pick the document, set pages and urgency and see an instant estimate. Attach the scan if you like and I will confirm a fixed price and deadline in writing.",
    document: "Document type",
    pages: "Number of pages",
    pagesHint: "From 1 to 20. If there are more, choose 20 and I will quote it once I see it.",
    urgency: "Urgency",
    urgencyNormal: `Standard · same day up to ${SAME_DAY_MAX_PAGES} pages; up to ${OVER_LIMIT_MAX_PAGES}, within ${OVER_LIMIT_HOURS} hours`,
    urgencyUrgent: `Rush · ${TURNAROUND.en.urgent} (up to +${Math.round(URGENCY_SURCHARGE * 100)}%)`,
    delivery: "Delivery",
    deliveryPdf: "Signed PDF (included)",
    deliveryPaper: "PDF + paper copy by courier within Spain",
    estimate: "Estimated price",
    quoteOnly: "Quote within 2 hours",
    perDoc: "per document",
    surchargeNote: "Maximum surcharge; I’ll confirm the exact amount.",
    fixedNote: `Fixed price up to ${FIXED_PRICE_MAX_PAGES} pages; each extra page, €${PRICE_PER_PAGE}.`,
    perPageNote: `€${PRICE_PER_PAGE} per page, with a minimum of €${MIN_DOC_PRICE} per document.`,
    overLimitNote: `${OVER_LIMIT_TEXT.en.sentence} If you need it sooner, tell me when you send it.`,
    disclaimer: "Fixed price once I see the document; I never charge without confirming it first.",
    paperNote: `+ courier: ${
      PAPER_DELIVERY_SPAIN.price != null
        ? `€${PAPER_DELIVERY_SPAIN.price} within Spain`
        : "stated in the quote"
    }.`,
    files: "Attach the document (optional)",
    reasons: {
      failed: "could not be uploaded",
    },
    contactLegend: "Your contact details",
    contactHint: "Give at least your email or phone so I can send you the quote.",
    name: "Name",
    email: "Email",
    phone: "Phone",
    source: "How did you find us?",
    sourceOptional: "(optional)",
    sourcePlaceholder: "Choose an option",
    privacy: "I have read the",
    privacyLink: "privacy policy",
    privacyTail:
      "and I agree that Elena Peñaranda Ortega processes my details and the attached documents only to prepare the quote.",
    submit: "Send and get my fixed price",
    sending: "Sending…",
    uploading: (pct) => `Uploading files… ${pct}%. Please keep this page open.`,
    sendingSummary: "Sending your request…",
    errPrivacy: "Tick the privacy box to continue.",
    errContact: "Please give your email or phone so I can send you the quote.",
    sent: "Received! I have your request and your documents. You will get a fixed price and deadline within 2 hours. You can also message me on WhatsApp:",
    sentNoFiles: "Received! You will get a fixed price and deadline within 2 hours. You can also message me on WhatsApp:",
    attach:
      "I have your request, but the files could not be uploaded. Please send them to me on WhatsApp:",
    partial:
      "I have your request, but some files could not be uploaded. Please send them to me on WhatsApp:",
    failed:
      "The request could not be sent (it may be the connection). Message me on WhatsApp and I will help you right away:",
    listEmailed: "Received",
    listWhatsApp: "Send me on WhatsApp",
    open: "Open WhatsApp",
    wa: {
      hello: "Hi Elena, I used the calculator on juradaexpress.es:",
      document: "Document",
      pages: "Pages",
      urgency: "Urgency",
      normal: `standard (${TURNAROUND.en.short})`,
      urgent: `rush (${TURNAROUND.en.urgent}, surcharge of up to ${Math.round(URGENCY_SURCHARGE * 100)}%)`,
      delivery: "Delivery",
      pdf: "signed PDF",
      paper: "PDF + paper copy by courier",
      estimate: "Estimated price",
      quote: "to be quoted",
      files: "Files",
      byEmail: "sent through the website",
      attachAll: "I'll attach them here on WhatsApp",
      attachRest: "I'll attach here on WhatsApp",
      contact: "Contact",
      close: "Could you confirm the fixed price and deadline?",
    },
    privacyHref: "/en/privacy-policy",
  },
};

// Textos del modo despacho (solo inglés): se superponen a COPY.en.
const FIRM_COPY = {
  ...COPY.en,
  title: "Order form for law firms",
  intro:
    "Pick the document, set the pages and attach the scan. I confirm the fixed price in US dollars and the delivery date within 2 working hours, and the order goes on your firm's monthly invoice.",
  deliveryPaper: "PDF + paper copy couriered to the US",
  paperNote: `+ courier: flat $${US_SHIPPING_USD} to any US address.`,
  // Igual que la tabla de precios de la página (content/law-firms.js).
  quoteOnly: "Fixed quote in 2 hours",
  fixedNote: `Fixed price up to ${FIXED_PRICE_MAX_PAGES} pages; each extra page, about $${toUsd(PRICE_PER_PAGE)}.`,
  disclaimer: "Fixed price once I see the document; nothing is invoiced without your approval.",
  files: "Attach the document",
  firm: "Firm name",
  reference: "Client/matter reference",
  referenceHint: "Optional. It appears on the delivery and on the monthly invoice.",
  errFirm: "Please enter your firm name.",
  contactLegend: "Firm and contact details",
  name: "Your name",
  submit: "Send the order",
  wa: {
    ...COPY.en.wa,
    hello: "Hi Elena, law firm order sent from juradaexpress.es:",
    firm: "Firm",
    reference: "Client/matter reference",
    paper: "PDF + paper copy couriered to the US",
  },
};

function docName(doc, locale) {
  return locale === "en" ? doc.nameEn || doc.name : doc.name;
}

function formatPrice(n, locale) {
  return locale === "en" ? `€${n}` : `${n} €`;
}

// Urgencia (política del 14/11/2026): entregar antes del plazo normal (en
// el día hasta SAME_DAY_MAX_PAGES páginas; hasta OVER_LIMIT_MAX_PAGES, en OVER_LIMIT_HOURS h)
// puede llevar un recargo de HASTA URGENCY_SURCHARGE, a consultar. La
// calculadora muestra el máximo con la nota «Recargo máximo; te confirmo
// el importe exacto». `pages` se mantiene en la firma por compatibilidad.
// eslint-disable-next-line no-unused-vars
export function hasUrgencySurcharge(pages, urgent) {
  return Boolean(urgent);
}

// Precio: content/pricing.js (precio fijo hasta 2 páginas y 20 € por página
// más; sin precio fijo, 20 € por página con mínimo de 35 €; urgente, hasta
// +30 %). Se reexporta para quien lo importaba de aquí.
export { estimatePrice };

// Línea «Archivos» del resumen de WhatsApp según lo que llegó por email,
// siempre con los nombres para que Elena sepa qué esperar en cada canal.
//   todos por email:  «Archivos: 2 enviados por email (a.pdf, b.pdf)»
//   ninguno:          «Archivos: 2 — te los adjunto aquí en WhatsApp (a.pdf, b.pdf)»
//   parte:            «Archivos: 3 — 2 enviados por email (a.pdf, b.pdf); te adjunto aquí en WhatsApp: c.pdf»
export function filesLine(w, total, emailedNames, pendingNames) {
  if (!total) return null;
  if (!pendingNames.length) {
    return `• ${w.files}: ${emailedNames.length} ${w.byEmail} (${emailedNames.join(", ")})`;
  }
  if (!emailedNames.length) {
    return `• ${w.files}: ${total} — ${w.attachAll} (${pendingNames.join(", ")})`;
  }
  return `• ${w.files}: ${total} — ${emailedNames.length} ${w.byEmail} (${emailedNames.join(
    ", "
  )}); ${w.attachRest}: ${pendingNames.join(", ")}`;
}

// POST a /api/quote; devuelve el JSON de respuesta o null si falla.
async function postQuote(fd) {
  try {
    const res = await fetch("/api/quote", { method: "POST", body: fd });
    const data = await res.json().catch(() => ({}));
    return res.ok && data.ok === true ? data : null;
  } catch {
    return null;
  }
}

export default function QuoteCalculator({ locale = "es", className = "", firmMode = false }) {
  const t = firmMode ? FIRM_COPY : COPY[locale] || COPY.es;
  const uid = useId();
  // Subida común con /enviar-documentos (19/11/2026): app/lib/docUploadClient.js.
  // Sin Drive conectado, sigue el camino de siempre (Blob + correo de /api/quote).
  const up = useDocUpload({ legacyBlob: LEGACY_BLOB });
  const files = up.entries;

  const [documentId, setDocumentId] = useState(DOCUMENTS[0].id);
  const [pages, setPages] = useState(1);
  const [urgency, setUrgency] = useState("normal");
  const [delivery, setDelivery] = useState("pdf");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [source, setSource] = useState(""); // «¿Cómo nos has conocido?» (opcional)
  // Solo en modo despacho.
  const [firm, setFirm] = useState("");
  const [reference, setReference] = useState("");
  const [firmError, setFirmError] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [privacyError, setPrivacyError] = useState("");
  const [contactError, setContactError] = useState("");
  // idle | sending | sent (todo recibido o sin archivos) | attach (ningún
  // archivo recibido) | partial (algunos no) | failed (no llegó la solicitud)
  const [status, setStatus] = useState("idle");
  // Envío doble (14/11/2026): el botón se desactiva al pasar a «sending»,
  // pero un doble toque o Intro+clic llegan antes de que React repinte y
  // mandaban la solicitud dos veces. Este ref lo corta en el acto.
  const submittingRef = useRef(false);
  // { emailed: [nombre], pending: [{ name, reason }] } tras el envío
  const [result, setResult] = useState(null);
  const [waUrl, setWaUrl] = useState("");

  // Preselección por URL (Fase A2, 18/10/2026): `?doc=<id>` con un id de
  // content/documents.js, tanto en la query (/?doc=partida-nacimiento) como
  // dentro del hash (/#calculadora?doc=partida-nacimiento, que es como
  // enlazan las páginas de documento). En el segundo caso el navegador no
  // encuentra el ancla, así que se desplaza aquí a mano.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const { search, hash } = window.location;
    const fromHash = hash.includes("?") ? hash.slice(hash.indexOf("?")) : "";
    const id =
      new URLSearchParams(search).get("doc") ||
      new URLSearchParams(fromHash).get("doc");
    if (id && DOCUMENTS.some((d) => d.id === id)) setDocumentId(id);
    if (fromHash && hash.startsWith("#calculadora")) {
      // Tras la hidratación el navegador aún puede restaurar el scroll a 0;
      // se espera un instante para que el desplazamiento no se pierda.
      const timer = setTimeout(() => {
        document.getElementById("calculadora")?.scrollIntoView();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, []);

  const doc = DOCUMENTS.find((d) => d.id === documentId) || DOCUMENTS[0];
  const urgent = urgency === "urgent";
  // Modo despacho: dólares, sin urgencia; sin precio fijo, sin estimación.
  const price = useMemo(
    () =>
      firmMode
        ? firmPriceUsd(doc, pages)
        : estimatePrice(doc, pages, urgent),
    [firmMode, doc, pages, urgent]
  );
  const money = (n) => (firmMode ? `$${n}` : formatPrice(n, locale));

  function buildWhatsApp(emailedNames, pendingNames) {
    const w = t.wa;
    const contact = [name, email, phone].map((s) => s.trim()).filter(Boolean).join(" · ");
    const lines = [
      w.hello,
      `• ${w.document}: ${docName(doc, locale)}`,
      `• ${w.pages}: ${pages}`,
      firmMode ? `• ${w.firm}: ${firm.trim()}` : null,
      firmMode && reference.trim() ? `• ${w.reference}: ${reference.trim()}` : null,
      firmMode ? null : `• ${w.urgency}: ${urgent ? w.urgent : w.normal}`,
      `• ${w.delivery}: ${delivery === "paper" ? w.paper : w.pdf}`,
      `• ${w.estimate}: ${price != null ? money(price) : w.quote}`,
      filesLine(w, files.length, emailedNames, pendingNames),
      contact ? `• ${w.contact}: ${contact}` : null,
      w.close,
    ].filter(Boolean);
    // Si la visita viene de un anuncio, la última línea es la referencia de
    // origen («Ref. anuncio: JX-…», app/lib/waOrigin.js).
    return appendWaOrigin(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`,
      locale
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submittingRef.current) return;
    // Evento sin cookies (Vercel Analytics): se registra el intento de envío,
    // termine o no en solicitud enviada.
    trackEngagement("cta_click", { cta: "calculadora_enviar" });
    const form = e.currentTarget;
    if (firmMode && !firm.trim()) {
      setFirmError(t.errFirm);
      form.querySelector(`#${CSS.escape(uid)}-firm`)?.focus();
      return;
    }
    setFirmError("");
    if (!email.trim() && !phone.trim()) {
      setContactError(t.errContact);
      form.querySelector(`#${CSS.escape(uid)}-email`)?.focus();
      return;
    }
    setContactError("");
    if (!privacy) {
      setPrivacyError(t.errPrivacy);
      form.querySelector(`#${CSS.escape(uid)}-privacy`)?.focus();
      return;
    }
    setPrivacyError("");
    submittingRef.current = true;
    setStatus("sending");
    setResult(null);
    setWaUrl("");

    // 1. Conversión de Google Ads (con etiqueta; sin consentimiento va como
    // ping sin cookies). Antes, el email para las conversiones mejoradas
    // (solo con consentimiento; setAdsUserData lo comprueba).
    if (email.trim()) setAdsUserData({ email });
    trackAdsConversion("calculadora_presupuesto");

    // 2. Subida con el motor común (19/11/2026). Con Drive conectado, cada
    //    archivo va directo a la carpeta del envío en Drive (por trozos, con
    //    reintentos y progreso por archivo); sin Drive, a Vercel Blob como
    //    hasta ahora y /api/quote los adjunta al correo.
    let upRes = null;
    if (files.length) {
      upRes = await up.send(
        {
          name,
          email,
          phone,
          tramite: docName(doc, "es"),
          comment: firmMode ? [firm, reference].filter((x) => x.trim()).join(" · ") : "",
          locale,
        },
        { notify: false }
      );
    }
    const uploaded = upRes && upRes.ok && upRes.mode === "blob" ? upRes.blobs : [];
    // Justificante firmado de lo comprobado en Drive (/api/documentos/finish).
    const driveToken = upRes && upRes.ok && upRes.mode === "drive" ? upRes.receipt : "";
    const driveFiles = driveToken ? upRes.received : [];
    const failed = upRes && upRes.ok
      ? upRes.failed.map((f) => ({ name: f.name, reason: "failed" }))
      : files.map((f) => ({ name: f.name, reason: "failed" }));

    const baseForm = () => {
      const fd = new FormData();
      fd.append("locale", locale);
      fd.append("documentId", doc.id);
      fd.append("pages", String(pages));
      fd.append("urgency", urgency);
      fd.append("delivery", delivery);
      fd.append("name", name);
      fd.append("email", email);
      fd.append("phone", phone);
      fd.append("privacy", "on");
      // Medición de Google Ads (08/10/2026): procedencia declarada por el
      // cliente y atribución capturada en la sesión (gclid, utm_*…), para
      // importar después la venta a Google Ads junto con el email.
      fd.append("source", source);
      fd.append("attribution", JSON.stringify(getAttribution() || {}));
      // Referencia JX de la misma visita, si ya pulsó WhatsApp (sirve para
      // contar a la misma persona una sola vez en el resumen semanal).
      try {
        const ref = sessionStorage.getItem(WA_REF_KEY) || "";
        if (WA_REF_RE.test(ref)) fd.append("ref", ref);
      } catch {
        /* sin storage */
      }
      if (firmMode) {
        fd.append("firmMode", "1");
        fd.append("firm", firm);
        fd.append("reference", reference);
      }
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.debug("[QuoteCalculator] FormData", {
          source: fd.get("source"),
          attribution: fd.get("attribution"),
        });
      }
      return fd;
    };

    // 3. Resumen: con Drive, el token del envío (el correo lleva el enlace a
    //    la carpeta); sin Drive, las URL de Blob (el servidor las adjunta).
    const summary = baseForm();
    summary.append("blobs", JSON.stringify(uploaded));
    if (driveToken) summary.append("docs", driveToken);
    summary.append("filesEmail", "[]");
    summary.append("filesWhatsApp", JSON.stringify(failed));
    summary.append("lots", "0");
    const data = (await postQuote(summary)) || (await postQuote(summary));
    const summaryOk = !!(data && data.emailed);

    const receivedNames = new Set(driveFiles.map((f) => f.name));
    const okUrls = new Set((data && data.blobsEmailed) || []);
    for (const u of uploaded) {
      if (okUrls.has(u.url)) receivedNames.add(u.name);
      else failed.push({ name: u.name, reason: "failed" });
    }

    // Mismo orden que la lista de archivos.
    const order = files.map((f) => f.name);
    const emailedNames = order.filter((n) => receivedNames.has(n));
    failed.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
    const pendingNames = failed.map((p) => p.name);

    // 6. Enlace de WhatsApp (lo abre el cliente si quiere: sin ventanas
    //    emergentes que dejen esta página en segundo plano).
    setWaUrl(buildWhatsApp(emailedNames, pendingNames));
    setResult({ emailed: emailedNames, pending: failed, summaryOk });
    submittingRef.current = false;
    // Con Drive los archivos ya están en la carpeta, pero sin el resumen
    // Elena no se entera: se pide WhatsApp como cuando falla todo.
    if (!summaryOk && (driveToken || emailedNames.length === 0)) setStatus("failed");
    else if (files.length === 0 || failed.length === 0) setStatus("sent");
    else if (emailedNames.length === 0) setStatus("attach");
    else setStatus("partial");
  }

  // Progreso total de la subida (bytes), o null sin archivos.
  const totalBytes = files.reduce((n, f) => n + f.size, 0);
  const progress =
    status === "sending" && totalBytes
      ? Math.round((files.reduce((n, f) => n + Math.min(f.progress || 0, f.size), 0) / totalBytes) * 100)
      : null;

  const statusText =
    status === "sent"
      ? files.length
        ? t.sent
        : t.sentNoFiles
      : status === "attach"
      ? t.attach
      : status === "partial"
      ? t.partial
      : status === "failed"
      ? t.failed
      : status === "sending"
      ? progress != null && progress < 100
        ? t.uploading(progress)
        : t.sendingSummary
      : "";



  const labelClass = "text-sm font-medium text-slate-700";
  const fieldClass =
    "mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-slate-900 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy";
  const radioClass =
    "flex cursor-pointer items-center gap-2 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-slate-700 has-[:checked]:border-brand-navy has-[:checked]:ring-1 has-[:checked]:ring-brand-navy";

  return (
    <section
      id={firmMode ? "order" : "calculadora"}
      data-track-section="calculadora"
      aria-labelledby={`${uid}-title`}
      className={`mx-auto max-w-6xl scroll-mt-24 px-4 py-16 md:py-20 ${className}`}
    >
      <SectionHeading id={`${uid}-title`}>{t.title}</SectionHeading>
      <p className="mt-3 max-w-[68ch] text-slate-600">{t.intro}</p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-8 grid gap-8 rounded-xl bg-stone-50 p-5 ring-1 ring-stone-200 md:grid-cols-2 md:p-8"
      >
        {/* Columna 1: parámetros */}
        <div className="space-y-5">
          <div>
            <label htmlFor={`${uid}-doc`} className={labelClass}>
              {t.document}
            </label>
            <select
              id={`${uid}-doc`}
              name="documentId"
              value={documentId}
              onChange={(e) => setDocumentId(e.target.value)}
              className={fieldClass}
            >
              {DOCUMENTS.map((d) => (
                <option key={d.id} value={d.id}>
                  {docName(d, locale)}
                  {d.price != null ? ` · ${money(firmMode ? toUsd(d.price) : d.price)}` : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={`${uid}-pages`} className={labelClass}>
              {t.pages}
            </label>
            <input
              id={`${uid}-pages`}
              name="pages"
              type="number"
              inputMode="numeric"
              min={1}
              max={20}
              step={1}
              value={pages}
              onChange={(e) => {
                const n = parseInt(e.target.value, 10);
                setPages(Number.isNaN(n) ? 1 : Math.min(20, Math.max(1, n)));
              }}
              aria-describedby={`${uid}-pages-hint`}
              className={`${fieldClass} max-w-[8rem] tabular-nums`}
            />
            <p id={`${uid}-pages-hint`} className="mt-1 text-xs text-slate-500">
              {t.pagesHint}
            </p>
          </div>

          {firmMode ? null : (
          <fieldset>
            <legend className={labelClass}>{t.urgency}</legend>
            <div className="mt-1 grid gap-2 sm:grid-cols-2">
              <label className={radioClass}>
                <input
                  type="radio"
                  name="urgency"
                  value="normal"
                  checked={urgency === "normal"}
                  onChange={() => setUrgency("normal")}
                  className="accent-brand-navy"
                />
                {t.urgencyNormal}
              </label>
              <label className={radioClass}>
                <input
                  type="radio"
                  name="urgency"
                  value="urgent"
                  checked={urgency === "urgent"}
                  onChange={() => setUrgency("urgent")}
                  className="accent-brand-navy"
                />
                {t.urgencyUrgent}
              </label>
            </div>
          </fieldset>
          )}

          <fieldset>
            <legend className={labelClass}>{t.delivery}</legend>
            <div className="mt-1 grid gap-2">
              <label className={radioClass}>
                <input
                  type="radio"
                  name="delivery"
                  value="pdf"
                  checked={delivery === "pdf"}
                  onChange={() => setDelivery("pdf")}
                  className="accent-brand-navy"
                />
                {t.deliveryPdf}
              </label>
              <label className={radioClass}>
                <input
                  type="radio"
                  name="delivery"
                  value="paper"
                  checked={delivery === "paper"}
                  onChange={() => setDelivery("paper")}
                  className="accent-brand-navy"
                />
                {t.deliveryPaper}
              </label>
            </div>
          </fieldset>

          {/* Precio estimado */}
          <div
            className="rounded-xl bg-white p-4 ring-1 ring-stone-200"
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="text-sm text-slate-500">{t.estimate}</p>
            <p className="mt-1 font-display text-3xl font-semibold tabular-nums text-brand-navy">
              {price != null ? money(price) : t.quoteOnly}
            </p>
            {price != null ? (
              <p className="mt-1 text-xs text-slate-500">
                {doc.price != null ? t.fixedNote : t.perPageNote}
              </p>
            ) : null}
            {!firmMode && price != null && hasUrgencySurcharge(pages, urgent) ? (
              <p className="mt-1 text-xs text-slate-500">{t.surchargeNote}</p>
            ) : null}
            {pages > SAME_DAY_MAX_PAGES && t.overLimitNote ? (
              <p className="mt-1 text-xs text-slate-600">{t.overLimitNote}</p>
            ) : null}
            {delivery === "paper" ? (
              <p className="mt-1 text-xs text-slate-500">{t.paperNote}</p>
            ) : null}
            <p className="mt-2 text-sm text-slate-600">{t.disclaimer}</p>
          </div>
        </div>

        {/* Columna 2: archivos, contacto, RGPD y envío */}
        <div className="space-y-5">
          <div>
            <p className={labelClass}>{t.files}</p>
            <div className="mt-1">
              <FileDropList up={up} locale={locale} accept={DOC_ACCEPT} disabled={status === "sending"} />
            </div>
          </div>

          <fieldset aria-describedby={`${uid}-contact-hint`}>
            <legend className={labelClass}>{t.contactLegend}</legend>
            <div className="mt-1 grid gap-3 sm:grid-cols-2">
              {firmMode ? (
                <>
                  <div className="sm:col-span-2">
                    <label htmlFor={`${uid}-firm`} className="text-xs text-slate-600">
                      {t.firm}
                    </label>
                    <input
                      id={`${uid}-firm`}
                      name="firm"
                      type="text"
                      autoComplete="organization"
                      required
                      value={firm}
                      onChange={(e) => {
                        setFirm(e.target.value);
                        if (e.target.value.trim()) setFirmError("");
                      }}
                      aria-invalid={firmError ? "true" : undefined}
                      aria-describedby={firmError ? `${uid}-firm-error` : undefined}
                      className={fieldClass}
                    />
                    {firmError ? (
                      <p id={`${uid}-firm-error`} role="alert" className="mt-2 text-sm text-red-700">
                        {firmError}
                      </p>
                    ) : null}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor={`${uid}-reference`} className="text-xs text-slate-600">
                      {t.reference}
                    </label>
                    <input
                      id={`${uid}-reference`}
                      name="reference"
                      type="text"
                      autoComplete="off"
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      aria-describedby={`${uid}-reference-hint`}
                      className={fieldClass}
                    />
                    <p id={`${uid}-reference-hint`} className="mt-1 text-xs text-slate-500">
                      {t.referenceHint}
                    </p>
                  </div>
                </>
              ) : null}
              <div className="sm:col-span-2">
                <label htmlFor={`${uid}-name`} className="text-xs text-slate-600">
                  {t.name}
                </label>
                <input
                  id={`${uid}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor={`${uid}-email`} className="text-xs text-slate-600">
                  {t.email}
                </label>
                <input
                  id={`${uid}-email`}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value.trim()) setContactError("");
                  }}
                  aria-invalid={contactError ? "true" : undefined}
                  aria-describedby={contactError ? `${uid}-contact-error` : undefined}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor={`${uid}-phone`} className="text-xs text-slate-600">
                  {t.phone}
                </label>
                <input
                  id={`${uid}-phone`}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (e.target.value.trim()) setContactError("");
                  }}
                  aria-invalid={contactError ? "true" : undefined}
                  aria-describedby={contactError ? `${uid}-contact-error` : undefined}
                  className={fieldClass}
                />
              </div>
            </div>
            <p id={`${uid}-contact-hint`} className="mt-1 text-xs text-slate-500">
              {t.contactHint}
            </p>
            {contactError ? (
              <p id={`${uid}-contact-error`} role="alert" className="mt-2 text-sm text-red-700">
                {contactError}
              </p>
            ) : null}
          </fieldset>

          <div>
            <label htmlFor={`${uid}-source`} className={labelClass}>
              {t.source}{" "}
              <span className="font-normal text-slate-500">{t.sourceOptional}</span>
            </label>
            <select
              id={`${uid}-source`}
              name="source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className={fieldClass}
            >
              <option value="">{t.sourcePlaceholder}</option>
              {SOURCE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {locale === "en" ? o.en : o.es}
                </option>
              ))}
            </select>
          </div>

          {/* Honeypot */}
          <input
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          <div>
            <label className="flex items-start gap-2 text-sm text-slate-600">
              <input
                id={`${uid}-privacy`}
                name="privacy"
                type="checkbox"
                required
                checked={privacy}
                onChange={(e) => {
                  setPrivacy(e.target.checked);
                  if (e.target.checked) setPrivacyError("");
                }}
                aria-invalid={privacyError ? "true" : undefined}
                aria-describedby={privacyError ? `${uid}-privacy-error` : undefined}
                className="mt-1 accent-brand-navy"
              />
              <span>
                {t.privacy}{" "}
                <a href={t.privacyHref} className="link">
                  {t.privacyLink}
                </a>{" "}
                {t.privacyTail}
              </span>
            </label>
            {privacyError ? (
              <p id={`${uid}-privacy-error`} role="alert" className="mt-2 text-sm text-red-700">
                {privacyError}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn btn-primary w-full sm:w-auto"
          >
            {status === "sending" ? t.sending : t.submit}
          </button>
          {/* Promesa de plazo (content/site.js → DELIVERY_PROMISE) bajo el botón */}
          <QuotePromise locale={locale} className="max-w-[60ch]" />

          <div aria-live="polite" className="text-sm text-slate-600">
            {statusText ? (
              <p
                className={
                  status === "sent"
                    ? "rounded-lg bg-emerald-50 px-3 py-2 text-emerald-900 ring-1 ring-emerald-200"
                    : status === "failed" || status === "attach" || status === "partial"
                    ? "rounded-lg bg-amber-50 px-3 py-2 text-amber-900 ring-1 ring-amber-200"
                    : ""
                }
              >
                {statusText}
              </p>
            ) : null}
            {status === "sending" && progress != null ? (
              <div
                className="mt-2 h-2 w-full overflow-hidden rounded-full bg-stone-200"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
              >
                <div
                  className="h-full animate-pulse bg-brand-navy transition-all duration-500"
                  style={{ width: `${Math.max(progress, 8)}%` }}
                />
              </div>
            ) : null}
            {waUrl && status !== "sending" ? (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-3 inline-flex w-full sm:w-auto"
              >
                {t.open}
              </a>
            ) : null}
            {/* Qué ha ido por email y qué adjunta el cliente, por nombre. */}
            {result && status !== "sending" && files.length > 0 ? (
              <dl className="mt-3 space-y-2">
                {result.emailed.length > 0 ? (
                  <div className="rounded-lg bg-white px-3 py-2 ring-1 ring-stone-200">
                    <dt className="text-xs font-medium text-slate-500">{t.listEmailed}</dt>
                    <dd className="mt-1 break-words text-slate-700">{result.emailed.join(", ")}</dd>
                  </div>
                ) : null}
                {result.pending.length > 0 ? (
                  <div className="rounded-lg bg-amber-50 px-3 py-2 ring-1 ring-amber-200">
                    <dt className="text-xs font-medium text-amber-900">{t.listWhatsApp}</dt>
                    <dd className="mt-1">
                      <ul className="space-y-1 text-slate-800">
                        {result.pending.map((p) => (
                          <li key={p.name} className="break-words">
                            <span className="font-medium">{p.name}</span>
                            {t.reasons[p.reason] ? (
                              <span className="text-slate-600"> · {t.reasons[p.reason]}</span>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ) : null}
              </dl>
            ) : null}
          </div>
        </div>
      </form>
    </section>
  );
}
