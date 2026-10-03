"use client";

// app/components/QuoteCalculator.js
//
// Calculadora de precio + subida de documento (FASE 2 SEO, 27/09/2026).
// Se usa en la home ES/EN (bajo el hero) y en /traductor-jurado-ingles
// (ES/EN, vía ServicePage). Precios SOLO de content/documents.js; recargo
// de urgencia y nota de entrega en papel de content/site.js.
//
// Archivos (02/10/2026, corrige «no deja adjuntar»):
//   - Los archivos se suben DIRECTAMENTE desde el navegador a Vercel Blob
//     (almacén privado, token de un solo uso de /api/quote/upload), sin el
//     límite de ~4,5 MB por petición de Vercel. Hasta 25 MB por archivo.
//   - Imágenes: se comprimen en el navegador (lado máx. 2000 px, JPEG < 1,5
//     MB); si el navegador no puede (HEIC fuera de Safari) se sube el
//     original. Los PDF se suben tal cual, pesen lo que pesen (≤ 25 MB).
//   - Si Blob no está disponible, se usa el envío antiguo por lotes de
//     < 3,5 MB a /api/quote; solo lo que no se pueda enviar se pide por
//     WhatsApp.
//
// Al pulsar «Enviar y recibir presupuesto» la subida ocurre EN ESTA
// PÁGINA, con barra de progreso (antes se abría una pestaña de WhatsApp a
// la vez y, en el móvil, la pestaña de la web quedaba en segundo plano y el
// navegador congelaba la subida). /api/quote recibe el resumen + las URL de
// Blob, adjunta los archivos al email a Elena y los borra del almacén. Al
// terminar se muestra la confirmación y un botón OPCIONAL de WhatsApp.
// Se exige email o teléfono para poder responder al cliente.
// Mobile-first: una columna en móvil, dos en ≥ md. Accesible: fieldset +
// legend en los grupos de radio, aria-live en el precio y en los estados,
// errores asociados con aria-describedby, zona de arrastre operable por
// teclado (es un <label> del <input type="file">).
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { upload as blobUpload } from "@vercel/blob/client";
import { DOCUMENTS } from "../../content/documents";
import { PAPER_DELIVERY_SPAIN, URGENCY_SURCHARGE, SAME_DAY_MAX_PAGES, TURNAROUND } from "../../content/site";
import { SectionHeading } from "./ui";
import { IconUpload, IconFileText } from "./Icons";
import { trackAdsConversion } from "./AdsConversion";

const WHATSAPP_NUMBER = "34685891214";
const MB = 1024 * 1024;
const MAX_FILES = 5;
const MAX_FILE_BYTES = 25 * MB; // tope por archivo (Blob + adjunto de Resend)
export const BATCH_BYTES = 3.5 * MB; // por petición a /api/quote
export const DIRECT_MAX_BYTES = 3.5 * MB; // envío de reserva sin Blob
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
    urgencyNormal: `Normal · ${TURNAROUND.es.short}`,
    urgencyUrgent: `Urgente · ${TURNAROUND.es.urgent} (+${Math.round(URGENCY_SURCHARGE * 100)} %)`,
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
    dropSpec: `PDF, JPG, PNG o HEIC · máx. 25 MB por archivo · hasta ${MAX_FILES} archivos`,
    dropNote: "Las fotos se comprimen en tu navegador antes de enviarse. Puedes hacer foto con el móvil.",
    remove: "Quitar",
    filePreparing: "comprimiendo…",
    fileCompressed: (kb) => `se enviará comprimida (${kb} KB)`,
    fileWhatsApp: "la adjuntas tú en WhatsApp",
    fileReady: "lista para enviar",
    reasons: {
      failed: "no se ha podido subir",
    },
    contactLegend: "Tus datos de contacto",
    contactHint: "Indica al menos tu email o tu teléfono para enviarte el presupuesto.",
    name: "Nombre",
    email: "Email",
    phone: "Teléfono",
    privacy: "He leído la",
    privacyLink: "política de privacidad",
    privacyTail:
      "y acepto que Elena Peñaranda Ortega trate mis datos y los documentos adjuntos solo para preparar el presupuesto.",
    submit: "Enviar y recibir presupuesto",
    sending: "Enviando…",
    uploading: (pct) => `Subiendo archivos… ${pct} %. No cierres esta página.`,
    sendingSummary: "Enviando tu solicitud…",
    errPrivacy: "Marca la casilla de privacidad para continuar.",
    errContact: "Indica tu email o tu teléfono para poder enviarte el presupuesto.",
    errCount: `Como máximo ${MAX_FILES} archivos.`,
    errSize: "supera los 25 MB.",
    errType: "no es PDF, JPG, PNG ni HEIC.",
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
      urgent: `urgente (${TURNAROUND.es.urgent})`,
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
    urgencyNormal: `Standard · ${TURNAROUND.en.short}`,
    urgencyUrgent: `Urgent · ${TURNAROUND.en.urgent} (+${Math.round(URGENCY_SURCHARGE * 100)}%)`,
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
    dropSpec: `PDF, JPG, PNG or HEIC · max. 25 MB per file · up to ${MAX_FILES} files`,
    dropNote: "Photos are compressed in your browser before sending. A phone photo is fine.",
    remove: "Remove",
    filePreparing: "compressing…",
    fileCompressed: (kb) => `will be sent compressed (${kb} KB)`,
    fileWhatsApp: "you attach it on WhatsApp",
    fileReady: "ready to send",
    reasons: {
      failed: "could not be uploaded",
    },
    contactLegend: "Your contact details",
    contactHint: "Give at least your email or phone so I can send you the quote.",
    name: "Name",
    email: "Email",
    phone: "Phone",
    privacy: "I have read the",
    privacyLink: "privacy policy",
    privacyTail:
      "and I agree that Elena Peñaranda Ortega processes my details and the attached documents only to prepare the quote.",
    submit: "Send and get my quote",
    sending: "Sending…",
    uploading: (pct) => `Uploading files… ${pct}%. Please keep this page open.`,
    sendingSummary: "Sending your request…",
    errPrivacy: "Tick the privacy box to continue.",
    errContact: "Please give your email or phone so I can send you the quote.",
    errCount: `A maximum of ${MAX_FILES} files.`,
    errSize: "is larger than 25 MB.",
    errType: "is not a PDF, JPG, PNG or HEIC.",
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
      urgent: `urgent (${TURNAROUND.en.urgent})`,
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

function docName(doc, locale) {
  return locale === "en" ? doc.nameEn || doc.name : doc.name;
}

function formatPrice(n, locale) {
  return locale === "en" ? `€${n}` : `${n} €`;
}

function formatKb(bytes) {
  return Math.max(1, Math.round(bytes / 1024));
}

// El recargo de urgencia solo se aplica a partir de SAME_DAY_MAX_PAGES: hasta
// esa cifra la entrega en el día ya está incluida en el precio.
export function hasUrgencySurcharge(pages, urgent) {
  return Boolean(urgent) && pages > SAME_DAY_MAX_PAGES;
}

export function estimatePrice(doc, pages, urgent) {
  if (!doc || doc.price == null) return null;
  const base = doc.price * pages;
  return Math.round(hasUrgencySurcharge(pages, urgent) ? base * (1 + URGENCY_SURCHARGE) : base);
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

// Prepara un archivo para subirlo. Los PDF van tal cual; las imágenes se
// comprimen y, si el navegador no sabe (HEIC fuera de Safari), se sube el
// original: ya no se manda nada a WhatsApp por tamaño o formato.
// Devuelve { upload: File }.
export async function prepareFile(file) {
  if (isPdf(file)) return { upload: file };
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
    return { upload: file };
  }
}

function contentTypeOf(file) {
  if (file.type) return file.type;
  const n = (file.name || "").toLowerCase();
  if (n.endsWith(".pdf")) return "application/pdf";
  if (n.endsWith(".png")) return "image/png";
  if (n.endsWith(".heic")) return "image/heic";
  if (n.endsWith(".heif")) return "image/heif";
  return "image/jpeg";
}

function safePath(name) {
  const clean = String(name || "documento")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(-80);
  return `presupuestos/${clean || "documento"}`;
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

// Señal de aborto con tiempo límite: AbortSignal.timeout si el navegador lo
// tiene y, si no, un AbortController abortado con setTimeout.
function timeoutSignal(ms) {
  if (typeof AbortSignal !== "undefined" && typeof AbortSignal.timeout === "function") {
    return AbortSignal.timeout(ms);
  }
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller.signal;
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
  const [contactError, setContactError] = useState("");
  const [progress, setProgress] = useState(null); // % de subida o null
  // idle | sending | sent (todo recibido o sin archivos) | attach (ningún
  // archivo recibido) | partial (algunos no) | failed (no llegó la solicitud)
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

  // Si el cliente eligió archivos antes de que la página terminara de cargar
  // (móvil lento), React no vio el «change»: se recogen al montar.
  useEffect(() => {
    const input = fileInput.current;
    if (input && input.files && input.files.length) addFiles(input.files);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const form = e.currentTarget;
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
    setStatus("sending");
    setResult(null);
    setWaUrl("");
    setProgress(files.length ? 0 : null);

    // 1. Conversión de Google Ads (solo con etiqueta y consentimiento).
    trackAdsConversion("calculadora_presupuesto");

    // 2. Espera a las compresiones en curso.
    const entries = (
      await Promise.all(
        files.map((f) => (f.state === "preparing" ? prepRef.current.get(f.key) || f : f))
      )
    ).map((f) => (f.upload ? f : { ...f, upload: f.file }));

    // 3. Subida directa a Vercel Blob, en esta página y con progreso.
    const totalBytes = entries.reduce((n, f) => n + f.upload.size, 0) || 1;
    const loaded = new Map();
    const tick = () => {
      const sum = [...loaded.values()].reduce((n, x) => n + x, 0);
      setProgress(Math.min(99, Math.round((sum / totalBytes) * 100)));
    };
    const uploaded = []; // { name, url }
    const direct = []; // envío de reserva (< 3,5 MB) si Blob falla
    const failed = []; // { name, reason }
    await Promise.all(
      entries.map(async (f) => {
        try {
          const blob = await blobUpload(safePath(f.upload.name), f.upload, {
            access: "private",
            handleUploadUrl: "/api/quote/upload",
            contentType: contentTypeOf(f.upload),
            // Sin multipart ni onUploadProgress: con onUploadProgress,
            // @vercel/blob sube con fetch en streaming en Chrome, que exige
            // HTTP/2 y se queda en «0 %» tras proxies HTTP/1.1. El tiempo
            // límite crece con el tamaño del archivo.
            abortSignal: timeoutSignal(60000 + Math.round(f.upload.size / 25)),
          });
          loaded.set(f.key, f.upload.size);
          tick();
          uploaded.push({ key: f.key, name: f.name, url: blob.url });
        } catch {
          if (f.upload.size < DIRECT_MAX_BYTES) direct.push(f);
          else failed.push({ name: f.name, reason: "failed" });
        }
      })
    );
    setProgress(null);

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

    // 4. Resumen + URL de Blob: el servidor adjunta los archivos al email.
    const groups = batches(direct);
    const summary = baseForm();
    summary.append("blobs", JSON.stringify(uploaded.map((u) => ({ name: u.name, url: u.url }))));
    summary.append(
      "filesEmail",
      JSON.stringify(direct.map((f) => ({ name: f.name, sent: f.upload.name })))
    );
    summary.append("filesWhatsApp", JSON.stringify(failed));
    summary.append("lots", String(groups.length));
    const data = (await postQuote(summary)) || (await postQuote(summary));
    const summaryOk = !!(data && data.emailed);

    const emailedKeys = new Set();
    const okUrls = new Set((data && data.blobsEmailed) || []);
    for (const u of uploaded) {
      if (okUrls.has(u.url)) emailedKeys.add(u.key);
      else failed.push({ name: u.name, reason: "failed" });
    }

    // 5. Reserva: archivos pequeños en lotes de < 3,5 MB directo a /api/quote.
    await Promise.all(
      groups.map(async (group, i) => {
        const fd = baseForm();
        fd.append("part", `${i + 1}/${groups.length}`);
        group.forEach((f) => fd.append("files", f.upload, f.upload.name));
        const ok = await postQuote(fd);
        for (const f of group) {
          if (ok && ok.emailed) emailedKeys.add(f.key);
          else failed.push({ name: f.name, reason: "failed" });
        }
      })
    );

    // Mismo orden que la lista de archivos.
    const order = files.map((f) => f.name);
    const emailedNames = entries.filter((f) => emailedKeys.has(f.key)).map((f) => f.name);
    failed.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
    const pendingNames = failed.map((p) => p.name);

    // 6. Enlace de WhatsApp (lo abre el cliente si quiere: sin ventanas
    //    emergentes que dejen esta página en segundo plano).
    setWaUrl(buildWhatsApp(emailedNames, pendingNames));
    setResult({ emailed: emailedNames, pending: failed, summaryOk });
    if (!summaryOk && emailedNames.length === 0) setStatus("failed");
    else if (files.length === 0 || failed.length === 0) setStatus("sent");
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
      : status === "failed"
      ? t.failed
      : status === "sending"
      ? progress != null
        ? t.uploading(progress)
        : t.sendingSummary
      : "";

  function fileHint(f) {
    if (f.state === "preparing") return t.filePreparing;
    if (f.state === "whatsapp") {
      const why = t.reasons[f.reason];
      return why ? `${t.fileWhatsApp} · ${why}` : t.fileWhatsApp;
    }
    if (f.upload && f.upload !== f.file) return t.fileCompressed(formatKb(f.upload.size));
    return t.fileReady;
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
            {price != null && hasUrgencySurcharge(pages, urgent) ? (
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
