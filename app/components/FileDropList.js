"use client";

// app/components/FileDropList.js
//
// Zona de archivos compartida (19/11/2026): arrastrar o elegir varios
// archivos, «Hacer una foto» en el móvil, lista con barra de progreso por
// archivo y mensajes de error concretos (qué archivo, por qué, qué hacer)
// en el idioma de la página. La usan /enviar-documentos, la calculadora y
// el formulario del catálogo con el hook useDocUpload.
import { useId, useRef, useState } from "react";
import { IconUpload, IconFileText, IconCheck } from "./Icons";

const MB = 1024 * 1024;

export const FILE_COPY = {
  es: {
    drop: "Arrastra aquí tus documentos o",
    choose: "elígelos",
    camera: "Hacer una foto",
    spec: (l) =>
      `PDF, JPG, PNG, HEIC, DOCX o ZIP · hasta ${Math.round(l.maxBytes / MB)} MB por archivo · hasta ${l.maxFiles} archivos`,
    remove: (n) => `Quitar ${n}`,
    status: {
      ready: "listo para enviar",
      uploading: "subiendo…",
      done: "recibido",
      failed: "no ha llegado",
      missing: "vuelve a elegir este archivo para terminar de subirlo",
    },
    pages: (n) => `${n} pág.`,
    errors: {
      type: (n) => `«${n}»: formato no admitido. Usa PDF, JPG, PNG, HEIC, DOCX o ZIP (un .doc, guárdalo como .docx o PDF).`,
      size: (n, s, l) =>
        `«${n}» pesa ${mb(s)} y el máximo es ${Math.round(l.maxBytes / MB)} MB. Divídelo en varios PDF o mándamelo por WhatsApp o correo.`,
      empty: (n) => `«${n}» está vacío (0 bytes). Vuelve a guardarlo o exportarlo y elígelo de nuevo.`,
      count: (n, s, l) => `«${n}» no se ha añadido: como máximo ${l.maxFiles} archivos por envío. Envía los demás en otro envío.`,
      network: "Se cortó la conexión y no se pudo terminar tras varios intentos. Comprueba el wifi o la cobertura y pulsa «Reintentar».",
      server: "No se pudo guardar. Pulsa «Reintentar» o mándamelo por WhatsApp o correo.",
      "not-verified": "No se pudo comprobar que haya llegado completo. Pulsa «Reintentar».",
      expired: "La sesión de subida caducó. Pulsa «Reintentar».",
      "drive-unreachable": "Tu navegador no consigue conectar con el almacenamiento. Pulsa «Reintentar» o usa WhatsApp o correo.",
    },
  },
  en: {
    drop: "Drag your documents here or",
    choose: "choose them",
    camera: "Take a photo",
    spec: (l) =>
      `PDF, JPG, PNG, HEIC, DOCX or ZIP · up to ${Math.round(l.maxBytes / MB)} MB per file · up to ${l.maxFiles} files`,
    remove: (n) => `Remove ${n}`,
    status: {
      ready: "ready to send",
      uploading: "uploading…",
      done: "received",
      failed: "not received",
      missing: "choose this file again to finish uploading it",
    },
    pages: (n) => `${n} p.`,
    errors: {
      type: (n) => `“${n}”: format not accepted. Use PDF, JPG, PNG, HEIC, DOCX or ZIP (save a .doc as .docx or PDF).`,
      size: (n, s, l) =>
        `“${n}” is ${mb(s)} and the limit is ${Math.round(l.maxBytes / MB)} MB. Split it into several PDFs or send it to me on WhatsApp or by email.`,
      empty: (n) => `“${n}” is empty (0 bytes). Save or export it again and choose it once more.`,
      count: (n, s, l) => `“${n}” was not added: up to ${l.maxFiles} files per submission. Send the rest in another submission.`,
      network: "The connection dropped and the upload could not finish after several attempts. Check your Wi-Fi or signal and press “Retry”.",
      server: "It could not be saved. Press “Retry” or send it to me on WhatsApp or by email.",
      "not-verified": "We could not confirm it arrived complete. Press “Retry”.",
      expired: "The upload session expired. Press “Retry”.",
      "drive-unreachable": "Your browser cannot reach the storage service. Press “Retry” or use WhatsApp or email.",
    },
  },
};

function mb(bytes) {
  const n = Number(bytes) || 0;
  if (n >= MB) return `${(n / MB).toLocaleString("es-ES", { maximumFractionDigits: 1 })} MB`;
  return `${Math.max(1, Math.round(n / 1024))} KB`;
}

export function rejectedText(r, locale, limits) {
  const t = (FILE_COPY[locale] || FILE_COPY.es).errors;
  const fn = t[r.code];
  return typeof fn === "function" ? fn(r.name, r.size, limits) : `${r.name}: ${t.server}`;
}

export function errorText(code, locale) {
  const t = (FILE_COPY[locale] || FILE_COPY.es).errors;
  const v = t[code] || t.network;
  return typeof v === "function" ? v("", 0, { maxBytes: 50 * MB, maxFiles: 40 }) : v;
}

export default function FileDropList({ up, locale = "es", accept, disabled = false, camera = true, describedBy }) {
  const t = FILE_COPY[locale] || FILE_COPY.es;
  const id = useId();
  const input = useRef(null);
  const cameraInput = useRef(null);
  const [drag, setDrag] = useState(false);

  const pick = (e) => {
    up.addFiles(e.target.files);
    e.target.value = "";
  };

  return (
    <div>
      <label
        htmlFor={`${id}-files`}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          if (!disabled && e.dataTransfer.files && e.dataTransfer.files.length) up.addFiles(e.dataTransfer.files);
        }}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition focus-within:ring-2 focus-within:ring-brand-navy ${
          drag ? "border-brand-gold bg-brand-gold-50" : "border-stone-300 bg-white hover:border-brand-navy-300"
        } ${disabled ? "pointer-events-none opacity-60" : ""}`}
      >
        <IconUpload className="h-7 w-7 text-brand-navy-300" />
        <span className="text-sm text-slate-700">
          {t.drop} <span className="font-semibold text-brand-navy underline">{t.choose}</span>
        </span>
        <span className="text-xs text-slate-500">{t.spec(up.limits)}</span>
        <input
          ref={input}
          id={`${id}-files`}
          type="file"
          multiple
          accept={accept}
          className="sr-only"
          onChange={pick}
          disabled={disabled}
          aria-describedby={describedBy}
          data-testid="doc-files"
        />
      </label>
      {camera ? (
        <div className="mt-2 sm:hidden">
          <button
            type="button"
            className="btn btn-secondary btn-sm w-full"
            onClick={() => cameraInput.current && cameraInput.current.click()}
            disabled={disabled}
          >
            {t.camera}
          </button>
          <input
            ref={cameraInput}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={pick}
            tabIndex={-1}
            aria-hidden="true"
          />
        </div>
      ) : null}

      {up.rejected.length ? (
        <ul className="mt-3 space-y-1 text-sm text-red-700" role="alert">
          {up.rejected.map((r) => (
            <li key={`${r.name}-${r.code}`}>{rejectedText(r, locale, up.limits)}</li>
          ))}
        </ul>
      ) : null}

      {up.entries.length ? (
        <ul className="mt-3 space-y-2" aria-live="polite" data-testid="doc-list">
          {up.entries.map((e) => {
            const pct = e.size ? Math.round((Math.min(e.progress || 0, e.size) / e.size) * 100) : 0;
            const tone =
              e.status === "done"
                ? "text-emerald-700"
                : e.status === "failed" || e.status === "missing"
                ? "text-red-700"
                : "text-slate-500";
            return (
              <li key={e.key} className="rounded-lg bg-white px-3 py-2 text-sm ring-1 ring-stone-200" data-status={e.status}>
                <div className="flex items-center gap-2">
                  {e.status === "done" ? (
                    <IconCheck className="h-4 w-4 shrink-0 text-emerald-600" />
                  ) : (
                    <IconFileText className="h-4 w-4 shrink-0 text-slate-400" />
                  )}
                  <span className="min-w-0 flex-1 truncate text-slate-800">{e.name}</span>
                  <span className="shrink-0 text-xs text-slate-500">
                    {mb(e.size)}
                    {e.pages ? ` · ${t.pages(e.pages)}` : ""}
                  </span>
                  {e.status !== "uploading" && e.status !== "done" && !up.busy ? (
                    <button
                      type="button"
                      onClick={() => up.removeFile(e.key)}
                      className="shrink-0 px-1 text-slate-400 hover:text-red-700"
                      aria-label={t.remove(e.name)}
                    >
                      ✕
                    </button>
                  ) : null}
                </div>
                {e.status === "uploading" || (e.status === "missing" && e.progress) ? (
                  <div
                    className="mt-2 h-1.5 overflow-hidden rounded bg-stone-200"
                    role="progressbar"
                    aria-label={e.name}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={pct}
                  >
                    <div className="h-full bg-brand-navy transition-[width]" style={{ width: `${pct}%` }} />
                  </div>
                ) : null}
                <p className={`mt-1 text-xs ${tone}`}>
                  {e.status === "uploading" ? `${t.status.uploading} ${pct} %` : t.status[e.status] || ""}
                  {e.status === "failed" && e.error ? ` — ${errorText(e.error, locale)}` : ""}
                </p>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
