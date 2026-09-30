"use client";

// app/components/QuoteCalculator.js
//
// Calculadora de precio + subida de documento (FASE 2 SEO, 27/09/2026).
// Se usa en la home ES/EN (bajo el hero) y en /traductor-jurado-ingles
// (ES/EN, vía ServicePage). Precios SOLO de content/documents.js; recargo
// de urgencia y nota de entrega en papel de content/site.js.
//
// Al pulsar «Enviar y recibir presupuesto»:
//   1. abre una pestaña en el mismo gesto de usuario (evita el bloqueo de
//      ventanas emergentes); sin archivos ya lleva el resumen de WhatsApp;
//   2. envía el resumen y los archivos a /api/quote (email a Elena vía
//      Resend), en lotes de ≤ 4 MB por el límite de cuerpo de Vercel;
//   3. con la respuesta real construye el resumen de WhatsApp: los archivos
//      que llegaron por email («N enviados por email») y los que no
//      (`emailed: false` o error: «te los adjunto aquí en WhatsApp»), y
//      lleva la pestaña a wa.me. La pantalla de confirmación pide al
//      cliente que adjunte en el chat los archivos que no se emailaron;
//   4. registra la conversión de Google Ads (AdsConversion).
// Mobile-first: una columna en móvil, dos en ≥ md. Accesible: fieldset +
// legend en los grupos de radio, aria-live en el precio y en los estados,
// errores asociados con aria-describedby, zona de arrastre operable por
// teclado (es un <label> del <input type="file">).
import { useId, useMemo, useRef, useState } from "react";
import { DOCUMENTS } from "../../content/documents";
import { PAPER_DELIVERY_SPAIN, URGENCY_SURCHARGE } from "../../content/site";
import { SectionHeading } from "./ui";
import { IconUpload, IconFileText } from "./Icons";
import { trackAdsConversion } from "./AdsConversion";

const WHATSAPP_NUMBER = "34685891214";
const MAX_FILES = 5;
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const BATCH_BYTES = 4 * 1024 * 1024; // límite práctico por petición en Vercel
const ACCEPT = ".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png";
const TYPE_RE = /\.(pdf|jpe?g|png)$/i;

const COPY = {
  es: {
    title: "Calcula tu precio en 10 segundos",
    intro:
      "Elige el documento, indica páginas y urgencia y verás el precio orientativo al instante. Si quieres, adjunta el escaneo y te confirmo precio cerrado y plazo por escrito.",
    document: "Tipo de documento",
    pages: "Número de páginas",
    pagesHint: "De 1 a 20. Si son más, elige 20 y te lo presupuesto al verlo.",
    urgency: "Urgencia",
    urgencyNormal: "Normal · 24/48 h",
    urgencyUrgent: `Urgente · menos de 24 h (+${Math.round(URGENCY_SURCHARGE * 100)} %)`,
    delivery: "Entrega",
    deliveryPdf: "PDF firmado (incluido)",
    deliveryPaper: "PDF + papel por mensajería en España",
    estimate: "Precio estimado",
    quoteOnly: "Presupuesto en menos de 2 h",
    perDoc: "por documento",
    surchargeNote: `Incluye el recargo de urgencia del ${Math.round(URGENCY_SURCHARGE * 100)} %.`,
    disclaimer: "Precio cerrado al ver el documento; nunca cobro sin confirmarlo antes.",
    paperNote: `+ mensajería: ${
      PAPER_DELIVERY_SPAIN.price != null
        ? `${PAPER_DELIVERY_SPAIN.price} € dentro de España`
        : "se indica en el presupuesto"
    }.`,
    files: "Adjunta el documento (opcional)",
    dropHint: "Arrastra aquí tus archivos o pulsa para elegirlos",
    dropSpec: `PDF, JPG o PNG · máx. 10 MB por archivo · hasta ${MAX_FILES} archivos`,
    remove: "Quitar",
    contactLegend: "Tus datos de contacto (opcionales)",
    contactHint: "Para asociar los archivos a tu WhatsApp y poder responderte también por email.",
    name: "Nombre",
    email: "Email",
    phone: "Teléfono",
    privacy: "He leído la",
    privacyLink: "política de privacidad",
    privacyTail:
      "y acepto que Elena Peñaranda Ortega trate mis datos y los documentos adjuntos solo para preparar el presupuesto.",
    submit: "Enviar y recibir presupuesto",
    sending: "Enviando…",
    preparing: "Enviando tus archivos… En unos segundos se abrirá WhatsApp con el resumen.",
    errPrivacy: "Marca la casilla de privacidad para continuar.",
    errCount: `Como máximo ${MAX_FILES} archivos.`,
    errSize: "supera los 10 MB.",
    errType: "no es PDF, JPG ni PNG.",
    sent: "Archivos enviados por email. Termina en WhatsApp: si no se ha abierto, pulsa aquí.",
    sentNoFiles: "Resumen listo. Si WhatsApp no se ha abierto, pulsa aquí.",
    attach: (n) =>
      `Los archivos no se han enviado por email. Adjunta ${
        n === 1 ? "el archivo" : `los ${n} archivos`
      } en el chat de WhatsApp que se ha abierto; si no se ha abierto, pulsa aquí.`,
    partial: (n) =>
      `${n === 1 ? "1 archivo no se ha podido enviar" : `${n} archivos no se han podido enviar`} por email: ${
        n === 1 ? "adjúntalo" : "adjúntalos"
      } en el chat de WhatsApp que se ha abierto.`,
    open: "Abrir WhatsApp",
    wa: {
      hello: "Hola Elena, he usado la calculadora de juradaexpress.es:",
      document: "Documento",
      pages: "Páginas",
      urgency: "Urgencia",
      normal: "normal (24/48 h)",
      urgent: "urgente (menos de 24 h)",
      delivery: "Entrega",
      pdf: "PDF firmado",
      paper: "PDF + papel por mensajería",
      estimate: "Precio estimado",
      quote: "pendiente de presupuesto",
      files: "Archivos",
      byEmail: "enviados por email",
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
    urgencyNormal: "Standard · 24/48 hours",
    urgencyUrgent: `Urgent · under 24 hours (+${Math.round(URGENCY_SURCHARGE * 100)}%)`,
    delivery: "Delivery",
    deliveryPdf: "Signed PDF (included)",
    deliveryPaper: "PDF + paper copy by courier within Spain",
    estimate: "Estimated price",
    quoteOnly: "Quote within 2 hours",
    perDoc: "per document",
    surchargeNote: `Includes the ${Math.round(URGENCY_SURCHARGE * 100)}% urgency surcharge.`,
    disclaimer: "Fixed price once I see the document; I never charge without confirming it first.",
    paperNote: `+ courier: ${
      PAPER_DELIVERY_SPAIN.price != null
        ? `€${PAPER_DELIVERY_SPAIN.price} within Spain`
        : "stated in the quote"
    }.`,
    files: "Attach the document (optional)",
    dropHint: "Drag your files here or click to choose them",
    dropSpec: `PDF, JPG or PNG · max. 10 MB per file · up to ${MAX_FILES} files`,
    remove: "Remove",
    contactLegend: "Your contact details (optional)",
    contactHint: "So I can match the files to your WhatsApp message and reply by email too.",
    name: "Name",
    email: "Email",
    phone: "Phone",
    privacy: "I have read the",
    privacyLink: "privacy policy",
    privacyTail:
      "and I agree that Elena Peñaranda Ortega processes my details and the attached documents only to prepare the quote.",
    submit: "Send and get my quote",
    sending: "Sending…",
    preparing: "Sending your files… WhatsApp will open with the summary in a few seconds.",
    errPrivacy: "Tick the privacy box to continue.",
    errCount: `A maximum of ${MAX_FILES} files.`,
    errSize: "is larger than 10 MB.",
    errType: "is not a PDF, JPG or PNG.",
    sent: "Files sent by email. Finish on WhatsApp: if it did not open, click here.",
    sentNoFiles: "Summary ready. If WhatsApp did not open, click here.",
    attach: (n) =>
      `The files were not sent by email. Please attach ${
        n === 1 ? "the file" : `the ${n} files`
      } in the WhatsApp chat that has opened; if it did not open, click here.`,
    partial: (n) =>
      `${n} file${n === 1 ? "" : "s"} could not be sent by email: attach ${
        n === 1 ? "it" : "them"
      } in the WhatsApp chat that has opened.`,
    open: "Open WhatsApp",
    wa: {
      hello: "Hi Elena, I used the calculator on juradaexpress.es:",
      document: "Document",
      pages: "Pages",
      urgency: "Urgency",
      normal: "standard (24/48h)",
      urgent: "urgent (under 24h)",
      delivery: "Delivery",
      pdf: "signed PDF",
      paper: "PDF + paper copy by courier",
      estimate: "Estimated price",
      quote: "to be quoted",
      files: "Files",
      byEmail: "sent by email",
      attachAll: "I'll attach them here on WhatsApp",
      attachRest: "I'll attach here on WhatsApp",
      contact: "Contact",
      close: "Could you confirm the fixed price and deadline?",
    },
    privacyHref: "/en/privacy-policy",
  },
};

function docName(doc, locale) {
  return locale === "en" ? doc.nameEn || doc.name : doc.name;
}

function formatPrice(n, locale) {
  return locale === "en" ? `€${n}` : `${n} €`;
}

export function estimatePrice(doc, pages, urgent) {
  if (!doc || doc.price == null) return null;
  const base = doc.price * pages;
  return Math.round(urgent ? base * (1 + URGENCY_SURCHARGE) : base);
}

// Línea «Archivos» del resumen de WhatsApp según lo que llegó por email.
//   todos por email:  «Archivos: 2 enviados por email (a.pdf, b.pdf)»
//   ninguno:          «Archivos: 2 — te los adjunto aquí en WhatsApp»
//   parte:            «Archivos: 3 — 2 enviados por email (a.pdf, b.pdf); te adjunto aquí en WhatsApp: c.pdf»
export function filesLine(w, total, emailedNames, pendingNames) {
  if (!total) return null;
  if (!pendingNames.length) {
    return `• ${w.files}: ${emailedNames.length} ${w.byEmail} (${emailedNames.join(", ")})`;
  }
  if (!emailedNames.length) {
    return `• ${w.files}: ${total} — ${w.attachAll}`;
  }
  return `• ${w.files}: ${total} — ${emailedNames.length} ${w.byEmail} (${emailedNames.join(
    ", "
  )}); ${w.attachRest}: ${pendingNames.join(", ")}`;
}

// Agrupa los archivos en lotes de ≤ BATCH_BYTES (un archivo mayor va solo).
function batches(files) {
  const out = [];
  let cur = [];
  let size = 0;
  for (const f of files) {
    if (cur.length && size + f.size > BATCH_BYTES) {
      out.push(cur);
      cur = [];
      size = 0;
    }
    cur.push(f);
    size += f.size;
  }
  if (cur.length) out.push(cur);
  return out;
}

// Abre la pestaña de WhatsApp dentro del gesto de usuario. Sin `noopener`
// en window.open porque entonces devuelve null y no podríamos navegarla
// después; se corta el vínculo a mano con popup.opener = null.
function openTab(url) {
  const popup = window.open(url || "about:blank", "_blank");
  if (popup) {
    try {
      popup.opener = null;
    } catch {
      // Sin acceso al popup: seguimos sin él.
    }
  }
  return popup;
}

// Texto de espera en la pestaña en blanco mientras suben los archivos.
function showPreparing(popup, text) {
  try {
    const d = popup.document;
    d.title = "WhatsApp…";
    d.body.style.cssText =
      "margin:0;padding:2rem;font:16px/1.5 system-ui,sans-serif;color:#1e293b;background:#fff";
    d.body.textContent = text;
  } catch {
    // Si el navegador no deja escribir en about:blank, la pestaña queda en blanco unos segundos.
  }
}

export default function QuoteCalculator({ locale = "es", className = "" }) {
  const t = COPY[locale] || COPY.es;
  const uid = useId();
  const fileInput = useRef(null);

  const [documentId, setDocumentId] = useState(DOCUMENTS[0].id);
  const [pages, setPages] = useState(1);
  const [urgency, setUrgency] = useState("normal");
  const [delivery, setDelivery] = useState("pdf");
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [privacyError, setPrivacyError] = useState("");
  // idle | sending | sent (todo por email o sin archivos) | attach (ninguno
  // por email: adjuntar en WhatsApp) | partial (algunos no llegaron por email)
  const [status, setStatus] = useState("idle");
  const [pendingCount, setPendingCount] = useState(0);
  const [waUrl, setWaUrl] = useState("");

  const doc = DOCUMENTS.find((d) => d.id === documentId) || DOCUMENTS[0];
  const urgent = urgency === "urgent";
  const price = useMemo(() => estimatePrice(doc, pages, urgent), [doc, pages, urgent]);

  function addFiles(list) {
    const incoming = Array.from(list || []);
    if (!incoming.length) return;
    const errors = [];
    const next = [...files];
    for (const f of incoming) {
      if (next.length >= MAX_FILES) {
        errors.push(t.errCount);
        break;
      }
      if (f.size > MAX_FILE_BYTES) {
        errors.push(`${f.name} ${t.errSize}`);
        continue;
      }
      if (!TYPE_RE.test(f.name) && !["application/pdf", "image/jpeg", "image/png"].includes(f.type)) {
        errors.push(`${f.name} ${t.errType}`);
        continue;
      }
      if (next.some((x) => x.name === f.name && x.size === f.size)) continue;
      next.push(f);
    }
    setFiles(next);
    setFileError(errors.join(" "));
    if (fileInput.current) fileInput.current.value = "";
  }

  function removeFile(i) {
    setFiles(files.filter((_, idx) => idx !== i));
    setFileError("");
  }

  function buildWhatsApp(emailedNames, pendingNames) {
    const w = t.wa;
    const contact = [name, email, phone].map((s) => s.trim()).filter(Boolean).join(" · ");
    const lines = [
      w.hello,
      `• ${w.document}: ${docName(doc, locale)}`,
      `• ${w.pages}: ${pages}`,
      `• ${w.urgency}: ${urgent ? w.urgent : w.normal}`,
      `• ${w.delivery}: ${delivery === "paper" ? w.paper : w.pdf}`,
      `• ${w.estimate}: ${price != null ? formatPrice(price, locale) : w.quote}`,
      filesLine(w, files.length, emailedNames, pendingNames),
      contact ? `• ${w.contact}: ${contact}` : null,
      w.close,
    ].filter(Boolean);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!privacy) {
      setPrivacyError(t.errPrivacy);
      e.currentTarget.querySelector(`#${CSS.escape(uid)}-privacy`)?.focus();
      return;
    }
    setPrivacyError("");
    setStatus("sending");
    setPendingCount(0);
    setWaUrl("");

    // 1. Pestaña de WhatsApp, abierta en el mismo gesto de usuario. Sin
    //    archivos el resumen ya es definitivo; con archivos se rellena
    //    cuando /api/quote confirma cuáles han llegado por email.
    let popup = null;
    if (files.length === 0) {
      const url = buildWhatsApp([], []);
      setWaUrl(url);
      popup = openTab(url);
    } else {
      popup = openTab("");
      if (popup) showPreparing(popup, t.preparing);
    }

    // 2. Conversión de Google Ads (solo con etiqueta y consentimiento).
    trackAdsConversion("calculadora_presupuesto");

    // 3. Email con el resumen y los archivos, en lotes. Un archivo cuenta
    //    como emailado solo si su lote responde { ok: true, emailed: true }.
    const groups = files.length ? batches(files) : [[]];
    const emailedNames = [];
    const pendingNames = [];
    await Promise.all(
      groups.map(async (group, i) => {
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
        if (groups.length > 1) fd.append("part", `${i + 1}/${groups.length}`);
        group.forEach((f) => fd.append("files", f, f.name));
        let ok = false;
        try {
          const res = await fetch("/api/quote", { method: "POST", body: fd });
          const data = await res.json().catch(() => ({}));
          ok = res.ok && data.ok === true && data.emailed === true;
        } catch {
          ok = false;
        }
        (ok ? emailedNames : pendingNames).push(...group.map((f) => f.name));
      })
    );
    // Mismo orden que la lista de archivos, sea cual sea el orden de respuesta.
    const order = files.map((f) => f.name);
    const byOrder = (a, b) => order.indexOf(a) - order.indexOf(b);
    emailedNames.sort(byOrder);
    pendingNames.sort(byOrder);

    // 4. Resumen definitivo de WhatsApp y estado de confirmación.
    if (files.length > 0) {
      const url = buildWhatsApp(emailedNames, pendingNames);
      setWaUrl(url);
      if (popup && !popup.closed) {
        try {
          popup.location.replace(url);
        } catch {
          // La pestaña se cerró o no se puede navegar: queda el enlace «Abrir WhatsApp».
        }
      }
    }

    setPendingCount(pendingNames.length);
    if (files.length === 0 || pendingNames.length === 0) setStatus("sent");
    else if (emailedNames.length === 0) setStatus("attach");
    else setStatus("partial");
  }

  const statusText =
    status === "sent"
      ? files.length
        ? t.sent
        : t.sentNoFiles
      : status === "attach"
      ? t.attach(pendingCount)
      : status === "partial"
      ? t.partial(pendingCount)
      : "";

  const labelClass = "text-sm font-medium text-slate-700";
  const fieldClass =
    "mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-slate-900 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy";
  const radioClass =
    "flex cursor-pointer items-center gap-2 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-slate-700 has-[:checked]:border-brand-navy has-[:checked]:ring-1 has-[:checked]:ring-brand-navy";

  return (
    <section
      id="calculadora"
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
                  {d.price != null ? ` · ${formatPrice(d.price, locale)}` : ""}
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
              {price != null ? formatPrice(price, locale) : t.quoteOnly}
            </p>
            {price != null && urgent ? (
              <p className="mt-1 text-xs text-slate-500">{t.surchargeNote}</p>
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
            <p className={labelClass} id={`${uid}-files-label`}>
              {t.files}
            </p>
            <label
              htmlFor={`${uid}-files`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                addFiles(e.dataTransfer.files);
              }}
              className={`mt-1 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition focus-within:ring-2 focus-within:ring-brand-navy ${
                dragActive ? "border-brand-navy bg-brand-navy-50" : "border-stone-300 bg-white"
              }`}
            >
              <IconUpload className="h-6 w-6 text-brand-navy" />
              <span className="text-sm font-medium text-slate-700">{t.dropHint}</span>
              <span className="text-xs text-slate-500">{t.dropSpec}</span>
              <input
                ref={fileInput}
                id={`${uid}-files`}
                name="files"
                type="file"
                multiple
                accept={ACCEPT}
                onChange={(e) => addFiles(e.target.files)}
                aria-labelledby={`${uid}-files-label`}
                aria-describedby={fileError ? `${uid}-files-error` : undefined}
                className="sr-only"
              />
            </label>
            {fileError ? (
              <p id={`${uid}-files-error`} role="alert" className="mt-2 text-sm text-red-700">
                {fileError}
              </p>
            ) : null}
            {files.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {files.map((f, i) => (
                  <li
                    key={`${f.name}-${f.size}`}
                    className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2 text-sm ring-1 ring-stone-200"
                  >
                    <span className="flex min-w-0 items-center gap-2 text-slate-700">
                      <IconFileText className="h-4 w-4 shrink-0 text-brand-navy" />
                      <span className="truncate">{f.name}</span>
                      <span className="shrink-0 text-xs text-slate-500">
                        {Math.max(1, Math.round(f.size / 1024))} KB
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="link text-xs"
                      aria-label={`${t.remove}: ${f.name}`}
                    >
                      {t.remove}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <fieldset aria-describedby={`${uid}-contact-hint`}>
            <legend className={labelClass}>{t.contactLegend}</legend>
            <div className="mt-1 grid gap-3 sm:grid-cols-2">
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPhone(e.target.value)}
                  className={fieldClass}
                />
              </div>
            </div>
            <p id={`${uid}-contact-hint`} className="mt-1 text-xs text-slate-500">
              {t.contactHint}
            </p>
          </fieldset>

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

          <p aria-live="polite" className="text-sm text-slate-600">
            {statusText ? (
              <>
                {statusText}{" "}
                {waUrl ? (
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="link">
                    {t.open}
                  </a>
                ) : null}
              </>
            ) : null}
          </p>
        </div>
      </form>
    </section>
  );
}
