"use client";

// app/components/QuoteCalculator.js
//
// Calculadora de precio + subida de documento (FASE 2 SEO, 27/09/2026).
// Se usa en la home ES/EN (bajo el hero) y en /traductor-jurado-ingles
// (ES/EN, vía ServicePage). Precios SOLO de content/documents.js; recargo
// de urgencia y nota de entrega en papel de content/site.js.
//
// Al pulsar «Enviar y recibir presupuesto»:
//   1. abre WhatsApp con el resumen (documento, páginas, urgencia, entrega,
//      precio estimado y archivos) en una pestaña nueva;
//   2. en paralelo envía los archivos a /api/quote (email a Elena vía
//      Resend), en lotes de ≤ 4 MB por el límite de cuerpo de Vercel;
//   3. registra la conversión de Google Ads (AdsConversion).
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
    contact: "Tu nombre o email (opcional)",
    contactHint: "Para que asocie los archivos a tu WhatsApp.",
    privacy: "He leído la",
    privacyLink: "política de privacidad",
    privacyTail:
      "y acepto que Elena Peñaranda Ortega trate mis datos y los documentos adjuntos solo para preparar el presupuesto.",
    submit: "Enviar y recibir presupuesto",
    sending: "Enviando…",
    errPrivacy: "Marca la casilla de privacidad para continuar.",
    errCount: `Como máximo ${MAX_FILES} archivos.`,
    errSize: "supera los 10 MB.",
    errType: "no es PDF, JPG ni PNG.",
    sent: "Archivos enviados. Termina en WhatsApp: si no se ha abierto, pulsa aquí.",
    sentNoFiles: "Resumen listo. Si WhatsApp no se ha abierto, pulsa aquí.",
    notConfigured:
      "Resumen enviado. Los archivos no se han podido adjuntar por email: envíamelos por WhatsApp.",
    failed:
      "No he podido enviar los archivos por email: adjúntalos en el chat de WhatsApp que se ha abierto.",
    partial: (n) =>
      `${n} archivo(s) no se han podido enviar por email (demasiado grandes para el envío web): adjúntalos en WhatsApp.`,
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
      none: "los adjunto aquí",
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
    contact: "Your name or email (optional)",
    contactHint: "So I can match the files to your WhatsApp message.",
    privacy: "I have read the",
    privacyLink: "privacy policy",
    privacyTail:
      "and I agree that Elena Peñaranda Ortega processes my details and the attached documents only to prepare the quote.",
    submit: "Send and get my quote",
    sending: "Sending…",
    errPrivacy: "Tick the privacy box to continue.",
    errCount: `A maximum of ${MAX_FILES} files.`,
    errSize: "is larger than 10 MB.",
    errType: "is not a PDF, JPG or PNG.",
    sent: "Files sent. Finish on WhatsApp: if it did not open, click here.",
    sentNoFiles: "Summary ready. If WhatsApp did not open, click here.",
    notConfigured:
      "Summary sent. The files could not be attached by email: send them to me on WhatsApp.",
    failed: "I could not send the files by email: attach them in the WhatsApp chat that has opened.",
    partial: (n) =>
      `${n} file(s) could not be sent by email (too large for the web upload): attach them on WhatsApp.`,
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
      none: "I'll attach them here",
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
  const [contact, setContact] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [privacyError, setPrivacyError] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | not-configured | failed | partial
  const [failedCount, setFailedCount] = useState(0);
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

  function buildWhatsApp(emailedNames) {
    const w = t.wa;
    const lines = [
      w.hello,
      `• ${w.document}: ${docName(doc, locale)}`,
      `• ${w.pages}: ${pages}`,
      `• ${w.urgency}: ${urgent ? w.urgent : w.normal}`,
      `• ${w.delivery}: ${delivery === "paper" ? w.paper : w.pdf}`,
      `• ${w.estimate}: ${price != null ? formatPrice(price, locale) : w.quote}`,
      files.length
        ? `• ${w.files}: ${
            emailedNames.length
              ? `${emailedNames.length} ${w.byEmail} (${emailedNames.join(", ")})`
              : w.none
          }`
        : null,
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
    setFailedCount(0);

    // 1. WhatsApp: se abre en el mismo gesto de usuario (evita bloqueos de
    //    ventanas emergentes); el resumen asume que los archivos van por email.
    const url = buildWhatsApp(files.map((f) => f.name));
    setWaUrl(url);
    const popup = window.open(url, "_blank", "noopener,noreferrer");
    if (!popup) {
      // Bloqueado: el enlace "Abrir WhatsApp" del estado sirve de respaldo.
    }

    // 2. Conversión de Google Ads (solo con etiqueta y consentimiento).
    trackAdsConversion("calculadora_presupuesto");

    // 3. Email con el resumen y los archivos, en lotes.
    const groups = files.length ? batches(files) : [[]];
    let emailed = 0;
    let failed = 0;
    let notConfigured = false;
    await Promise.all(
      groups.map(async (group, i) => {
        const fd = new FormData();
        fd.append("locale", locale);
        fd.append("documentId", doc.id);
        fd.append("pages", String(pages));
        fd.append("urgency", urgency);
        fd.append("delivery", delivery);
        fd.append("contact", contact);
        fd.append("privacy", "on");
        if (groups.length > 1) fd.append("part", `${i + 1}/${groups.length}`);
        group.forEach((f) => fd.append("files", f, f.name));
        try {
          const res = await fetch("/api/quote", { method: "POST", body: fd });
          const data = await res.json().catch(() => ({}));
          if (res.ok && data.ok) {
            if (data.emailed) emailed += group.length;
            else notConfigured = true;
          } else {
            failed += group.length;
          }
        } catch {
          failed += group.length;
        }
      })
    );

    if (files.length === 0) setStatus("sent");
    else if (failed === files.length) setStatus("failed");
    else if (failed > 0) {
      setFailedCount(failed);
      setStatus("partial");
    } else if (notConfigured && emailed === 0) setStatus("not-configured");
    else setStatus("sent");
  }

  const statusText =
    status === "sent"
      ? files.length
        ? t.sent
        : t.sentNoFiles
      : status === "not-configured"
      ? t.notConfigured
      : status === "failed"
      ? t.failed
      : status === "partial"
      ? t.partial(failedCount)
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

          <div>
            <label htmlFor={`${uid}-contact`} className={labelClass}>
              {t.contact}
            </label>
            <input
              id={`${uid}-contact`}
              name="contact"
              type="text"
              autoComplete="name"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              aria-describedby={`${uid}-contact-hint`}
              className={fieldClass}
            />
            <p id={`${uid}-contact-hint`} className="mt-1 text-xs text-slate-500">
              {t.contactHint}
            </p>
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
