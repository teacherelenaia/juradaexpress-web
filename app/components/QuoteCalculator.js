"use client";

// app/components/QuoteCalculator.js
//
// Calculadora de precio + subida de documento (FASE 2 SEO, 27/09/2026).
// Se usa en la home ES/EN (bajo el hero) y en /traductor-jurado-ingles
// (ES/EN, vía ServicePage). Precios SOLO de content/documents.js; recargo
// de urgencia y nota de entrega en papel de content/site.js.
//
// Archivos (01/10/2026): al añadirlos se preparan en el navegador.
//   - Imágenes (JPG/PNG/HEIC): se decodifican, se dibujan en un canvas con
//     lado máximo 2000 px y se recomprimen a JPEG (calidad 0,8 y bajando)
//     hasta pesar < 1,5 MB. Si el navegador no puede decodificarlas (HEIC
//     fuera de Safari, por ejemplo) se piden por WhatsApp y se sigue con el
//     resto. Un JPG que ya pesa < 1,5 MB se envía tal cual.
//   - PDF: tal cual si pesa < 3,5 MB; si pesa más, se pide por WhatsApp.
//
// Al pulsar «Enviar y recibir presupuesto»:
//   1. abre una pestaña en el mismo gesto de usuario (evita el bloqueo de
//      ventanas emergentes); si no hay nada que subir ya lleva el resumen;
//   2. envía SIEMPRE a /api/quote un primer lote sin archivos con el resumen
//      y el contacto (nombre, email, teléfono), para que Elena reciba el
//      email aunque la subida falle o no haya archivos; se reintenta una vez;
//   3. después manda los archivos preparados en lotes de < 3,5 MB (límite de
//      cuerpo de Vercel ≈ 4,5 MB); el servidor usa el mismo asunto que el
//      resumen más « · archivos (i/n)»;
//   4. con la respuesta real construye el resumen de WhatsApp (qué archivos
//      han ido por email y cuáles adjunta el cliente, por nombre) y lleva la
//      pestaña a wa.me; la pantalla de confirmación repite ambas listas;
//   5. registra la conversión de Google Ads (AdsConversion).
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
const MB = 1024 * 1024;
const MAX_FILES = 5;
const MAX_FILE_BYTES = 10 * MB; // tope de entrada por archivo
export const BATCH_BYTES = 3.5 * MB; // por petición a /api/quote
export const PDF_MAX_BYTES = 3.5 * MB; // un PDF mayor lo adjunta el cliente en WhatsApp
export const IMAGE_TARGET_BYTES = 1.5 * MB; // cada imagen comprimida pesa menos que esto
const IMAGE_MAX_SIDE = 2000;
const IMAGE_QUALITIES = [0.8, 0.7, 0.6, 0.5, 0.4, 0.3];
const ACCEPT =
  ".pdf,.jpg,.jpeg,.png,.heic,.heif,application/pdf,image/jpeg,image/png,image/heic,image/heif";
const TYPE_RE = /\.(pdf|jpe?g|png|heic|heif)$/i;
const PDF_RE = /\.pdf$/i;
const ALLOWED_MIME = ["application/pdf", "image/jpeg", "image/png", "image/heic", "image/heif"];

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
    dropSpec: `PDF, JPG, PNG o HEIC · máx. 10 MB por archivo · hasta ${MAX_FILES} archivos`,
    dropNote:
      "Las fotos se comprimen en tu navegador antes de enviarse. Los PDF de más de 3,5 MB los adjuntas tú en WhatsApp.",
    remove: "Quitar",
    filePreparing: "comprimiendo…",
    fileCompressed: (kb) => `se enviará comprimida (${kb} KB)`,
    fileWhatsApp: "la adjuntas tú en WhatsApp",
    reasons: {
      "pdf-too-large": "PDF de más de 3,5 MB",
      unsupported: "tu navegador no puede convertir este archivo",
      failed: "no se ha podido enviar por email",
    },
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
    preparing: "Enviando tu solicitud… En unos segundos se abrirá WhatsApp con el resumen.",
    errPrivacy: "Marca la casilla de privacidad para continuar.",
    errCount: `Como máximo ${MAX_FILES} archivos.`,
    errSize: "supera los 10 MB.",
    errType: "no es PDF, JPG, PNG ni HEIC.",
    sent: "Resumen y archivos enviados por email. Termina en WhatsApp: si no se ha abierto, pulsa aquí.",
    sentNoFiles: "Resumen enviado. Si WhatsApp no se ha abierto, pulsa aquí.",
    attach:
      "Los archivos no han ido por email: adjúntalos en el chat de WhatsApp que se ha abierto; si no se ha abierto, pulsa aquí.",
    partial:
      "Algunos archivos no han ido por email: adjúntalos en el chat de WhatsApp que se ha abierto; si no se ha abierto, pulsa aquí.",
    listEmailed: "Enviados por email",
    listWhatsApp: "Adjunta tú en WhatsApp",
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
    dropSpec: `PDF, JPG, PNG or HEIC · max. 10 MB per file · up to ${MAX_FILES} files`,
    dropNote:
      "Photos are compressed in your browser before sending. PDFs over 3.5 MB you attach yourself on WhatsApp.",
    remove: "Remove",
    filePreparing: "compressing…",
    fileCompressed: (kb) => `will be sent compressed (${kb} KB)`,
    fileWhatsApp: "you attach it on WhatsApp",
    reasons: {
      "pdf-too-large": "PDF over 3.5 MB",
      unsupported: "your browser cannot convert this file",
      failed: "could not be sent by email",
    },
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
    preparing: "Sending your request… WhatsApp will open with the summary in a few seconds.",
    errPrivacy: "Tick the privacy box to continue.",
    errCount: `A maximum of ${MAX_FILES} files.`,
    errSize: "is larger than 10 MB.",
    errType: "is not a PDF, JPG, PNG or HEIC.",
    sent: "Summary and files sent by email. Finish on WhatsApp: if it did not open, click here.",
    sentNoFiles: "Summary sent. If WhatsApp did not open, click here.",
    attach:
      "The files were not sent by email: attach them in the WhatsApp chat that has opened; if it did not open, click here.",
    partial:
      "Some files were not sent by email: attach them in the WhatsApp chat that has opened; if it did not open, click here.",
    listEmailed: "Sent by email",
    listWhatsApp: "Attach on WhatsApp yourself",
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

function formatKb(bytes) {
  return Math.max(1, Math.round(bytes / 1024));
}

export function estimatePrice(doc, pages, urgent) {
  if (!doc || doc.price == null) return null;
  const base = doc.price * pages;
  return Math.round(urgent ? base * (1 + URGENCY_SURCHARGE) : base);
}

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

function isPdf(file) {
  return file.type === "application/pdf" || PDF_RE.test(file.name || "");
}

function jpegName(name) {
  const base = String(name || "imagen").replace(/\.[^.]+$/, "");
  return `${base || "imagen"}.jpg`;
}

// Decodifica una imagen: createImageBitmap (respeta la orientación EXIF) y,
// si falla o no existe, <img> con un object URL. Lanza si el navegador no
// sabe leer el formato (HEIC fuera de Safari, archivo corrupto…).
async function decodeImage(file) {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(file, { imageOrientation: "from-image" });
    } catch {
      // Seguimos con <img>.
    }
  }
  const url = URL.createObjectURL(file);
  try {
    return await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("unsupported"));
      img.src = url;
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

function canvasToBlob(canvas, quality) {
  return new Promise((resolve) => {
    try {
      canvas.toBlob(resolve, "image/jpeg", quality);
    } catch {
      resolve(null);
    }
  });
}

// Imagen → JPEG de lado máximo IMAGE_MAX_SIDE y calidad 0,8, bajando la
// calidad (y, si aún no basta, el tamaño) hasta pesar < IMAGE_TARGET_BYTES.
export async function compressImage(file) {
  const img = await decodeImage(file);
  try {
    const w = img.naturalWidth || img.width;
    const h = img.naturalHeight || img.height;
    if (!w || !h) throw new Error("unsupported");
    let side = IMAGE_MAX_SIDE;
    for (let round = 0; round < 3; round++) {
      const scale = Math.min(1, side / Math.max(w, h));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(w * scale));
      canvas.height = Math.max(1, Math.round(h * scale));
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("unsupported");
      // Fondo blanco: los PNG con transparencia no se vuelven negros en JPEG.
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      for (const quality of IMAGE_QUALITIES) {
        const blob = await canvasToBlob(canvas, quality);
        if (blob && blob.size < IMAGE_TARGET_BYTES) return blob;
      }
      side = Math.round(side * 0.7);
    }
    throw new Error("unsupported");
  } finally {
    if (typeof img.close === "function") img.close();
  }
}

// Decide qué se envía por email y qué pide el cliente por WhatsApp.
// Devuelve { upload: File } o { upload: null, reason }.
export async function prepareFile(file) {
  if (isPdf(file)) {
    return file.size < PDF_MAX_BYTES ? { upload: file } : { upload: null, reason: "pdf-too-large" };
  }
  // Un JPG que ya cumple el objetivo se envía tal cual, sin recomprimir.
  if (file.type === "image/jpeg" && file.size < IMAGE_TARGET_BYTES) return { upload: file };
  try {
    const blob = await compressImage(file);
    return {
      upload: new File([blob], jpegName(file.name), {
        type: "image/jpeg",
        lastModified: Date.now(),
      }),
    };
  } catch {
    return { upload: null, reason: "unsupported" };
  }
}

// Agrupa las entradas en lotes de < BATCH_BYTES. Cada archivo ya pesa menos
// (imágenes < 1,5 MB, PDF < 3,5 MB), así que ninguno va por encima solo.
export function batches(entries) {
  const out = [];
  let cur = [];
  let size = 0;
  for (const e of entries) {
    if (cur.length && size + e.upload.size >= BATCH_BYTES) {
      out.push(cur);
      cur = [];
      size = 0;
    }
    cur.push(e);
    size += e.upload.size;
  }
  if (cur.length) out.push(cur);
  return out;
}

async function postQuote(fd) {
  try {
    const res = await fetch("/api/quote", { method: "POST", body: fd });
    const data = await res.json().catch(() => ({}));
    return res.ok && data.ok === true && data.emailed === true;
  } catch {
    return false;
  }
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
  // Promesas de preparación por clave de archivo (compresión en curso).
  const prepRef = useRef(new Map());
  const keyRef = useRef(0);

  const [documentId, setDocumentId] = useState(DOCUMENTS[0].id);
  const [pages, setPages] = useState(1);
  const [urgency, setUrgency] = useState("normal");
  const [delivery, setDelivery] = useState("pdf");
  // Entradas: { key, file, name, size, state: preparing | email | whatsapp,
  // upload (File que se sube, ya comprimido) | null, reason }
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
  // { emailed: [nombre], pending: [{ name, reason }] } tras el envío
  const [result, setResult] = useState(null);
  const [waUrl, setWaUrl] = useState("");

  const doc = DOCUMENTS.find((d) => d.id === documentId) || DOCUMENTS[0];
  const urgent = urgency === "urgent";
  const price = useMemo(() => estimatePrice(doc, pages, urgent), [doc, pages, urgent]);

  function addFiles(list) {
    const incoming = Array.from(list || []);
    if (!incoming.length) return;
    const errors = [];
    const next = [...files];
    const added = [];
    for (const f of incoming) {
      if (next.length >= MAX_FILES) {
        errors.push(t.errCount);
        break;
      }
      if (f.size > MAX_FILE_BYTES) {
        errors.push(`${f.name} ${t.errSize}`);
        continue;
      }
      if (!TYPE_RE.test(f.name) && !ALLOWED_MIME.includes(f.type)) {
        errors.push(`${f.name} ${t.errType}`);
        continue;
      }
      if (next.some((x) => x.name === f.name && x.size === f.size)) continue;
      const entry = {
        key: ++keyRef.current,
        file: f,
        name: f.name,
        size: f.size,
        state: "preparing",
        upload: null,
        reason: null,
      };
      next.push(entry);
      added.push(entry);
    }
    setFiles(next);
    setFileError(errors.join(" "));
    if (fileInput.current) fileInput.current.value = "";

    // Preparación (compresión) en segundo plano; la lista se actualiza al
    // terminar y handleSubmit espera a las que sigan en curso.
    for (const entry of added) {
      const promise = prepareFile(entry.file).then((r) => {
        const done = {
          ...entry,
          state: r.upload ? "email" : "whatsapp",
          upload: r.upload,
          reason: r.reason || null,
        };
        setFiles((prev) => prev.map((e) => (e.key === entry.key ? done : e)));
        return done;
      });
      prepRef.current.set(entry.key, promise);
    }
  }

  function removeFile(key) {
    prepRef.current.delete(key);
    setFiles(files.filter((e) => e.key !== key));
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
    setResult(null);
    setWaUrl("");

    // 1. Pestaña de WhatsApp, abierta en el mismo gesto de usuario. Si no hay
    //    nada que subir (sin archivos, o todos van por WhatsApp y ya están
    //    clasificados) el resumen es definitivo; si no, se rellena cuando
    //    /api/quote confirma cuáles han llegado por email.
    const settled = files.every((f) => f.state !== "preparing");
    const nothingToUpload = settled && files.every((f) => !f.upload);
    let popup = null;
    if (nothingToUpload) {
      const url = buildWhatsApp(
        [],
        files.map((f) => f.name)
      );
      setWaUrl(url);
      popup = openTab(url);
    } else {
      popup = openTab("");
      if (popup) showPreparing(popup, t.preparing);
    }

    // 2. Conversión de Google Ads (solo con etiqueta y consentimiento).
    trackAdsConversion("calculadora_presupuesto");

    // 3. Espera a las compresiones en curso y clasifica.
    const entries = (
      await Promise.all(
        files.map((f) => (f.state === "preparing" ? prepRef.current.get(f.key) || f : f))
      )
    ).map((f) =>
      f.state === "preparing" ? { ...f, state: "whatsapp", upload: null, reason: "unsupported" } : f
    );
    const toEmail = entries.filter((f) => f.upload);
    const toWhatsApp = entries.filter((f) => !f.upload);
    const groups = batches(toEmail);

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
      return fd;
    };

    // 4. Primer lote SIN archivos: resumen + contacto. Siempre, aunque no
    //    haya archivos o la subida falle después; un reintento si falla.
    const summary = baseForm();
    summary.append(
      "filesEmail",
      JSON.stringify(toEmail.map((f) => ({ name: f.name, sent: f.upload.name })))
    );
    summary.append(
      "filesWhatsApp",
      JSON.stringify(toWhatsApp.map((f) => ({ name: f.name, reason: f.reason })))
    );
    summary.append("lots", String(groups.length));
    const summaryOk = (await postQuote(summary)) || (await postQuote(summary));

    // 5. Archivos en lotes de < 3,5 MB. Un archivo cuenta como emailado solo
    //    si su lote responde { ok: true, emailed: true }.
    const emailedNames = [];
    const pending = toWhatsApp.map((f) => ({ name: f.name, reason: f.reason }));
    await Promise.all(
      groups.map(async (group, i) => {
        const fd = baseForm();
        fd.append("part", `${i + 1}/${groups.length}`);
        group.forEach((f) => fd.append("files", f.upload, f.upload.name));
        const ok = await postQuote(fd);
        for (const f of group) {
          if (ok) emailedNames.push(f.name);
          else pending.push({ name: f.name, reason: "failed" });
        }
      })
    );
    // Mismo orden que la lista de archivos, sea cual sea el orden de respuesta.
    const order = files.map((f) => f.name);
    emailedNames.sort((a, b) => order.indexOf(a) - order.indexOf(b));
    pending.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
    const pendingNames = pending.map((p) => p.name);

    // 6. Resumen definitivo de WhatsApp y estado de confirmación.
    if (!nothingToUpload) {
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

    setResult({ emailed: emailedNames, pending, summaryOk });
    if (files.length === 0 || pending.length === 0) setStatus("sent");
    else if (emailedNames.length === 0) setStatus("attach");
    else setStatus("partial");
  }

  const statusText =
    status === "sent"
      ? files.length
        ? t.sent
        : t.sentNoFiles
      : status === "attach"
      ? t.attach
      : status === "partial"
      ? t.partial
      : "";

  function fileHint(f) {
    if (f.state === "preparing") return t.filePreparing;
    if (f.state === "whatsapp") {
      const why = t.reasons[f.reason];
      return why ? `${t.fileWhatsApp} · ${why}` : t.fileWhatsApp;
    }
    if (f.upload && f.upload !== f.file) return t.fileCompressed(formatKb(f.upload.size));
    return "";
  }

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
                aria-describedby={`${uid}-files-note${fileError ? ` ${uid}-files-error` : ""}`}
                className="sr-only"
              />
            </label>
            <p id={`${uid}-files-note`} className="mt-1 text-xs text-slate-500">
              {t.dropNote}
            </p>
            {fileError ? (
              <p id={`${uid}-files-error`} role="alert" className="mt-2 text-sm text-red-700">
                {fileError}
              </p>
            ) : null}
            {files.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {files.map((f) => {
                  const hint = fileHint(f);
                  return (
                    <li
                      key={f.key}
                      className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2 text-sm ring-1 ring-stone-200"
                    >
                      <span className="flex min-w-0 flex-col text-slate-700">
                        <span className="flex min-w-0 items-center gap-2">
                          <IconFileText className="h-4 w-4 shrink-0 text-brand-navy" />
                          <span className="truncate">{f.name}</span>
                          <span className="shrink-0 text-xs text-slate-500">{formatKb(f.size)} KB</span>
                        </span>
                        {hint ? (
                          <span
                            className={`pl-6 text-xs ${
                              f.state === "whatsapp" ? "text-amber-800" : "text-slate-500"
                            }`}
                          >
                            {hint}
                          </span>
                        ) : null}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(f.key)}
                        className="link text-xs"
                        aria-label={`${t.remove}: ${f.name}`}
                      >
                        {t.remove}
                      </button>
                    </li>
                  );
                })}
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

          <div aria-live="polite" className="text-sm text-slate-600">
            {statusText ? (
              <p>
                {statusText}{" "}
                {waUrl ? (
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="link">
                    {t.open}
                  </a>
                ) : null}
              </p>
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
