"use client";

// app/components/SendDocumentsPage.js
//
// Página «Enviar documentos» / «Send documents» (19/11/2026):
// /enviar-documentos y /en/send-documents. El cliente sube todo de una vez;
// los archivos acaban en una carpeta privada del Google Drive de Elena y a
// ella le llega el enlace (app/api/documentos/*). Lo escrito y lo ya subido
// se recuerda si se recarga la página. Si un archivo falla tras los
// reintentos, se ofrecen WhatsApp y correo con la referencia ya escrita.
import { useEffect, useId, useRef, useState } from "react";
import useDocUpload from "./useDocUpload";
import FileDropList, { FILE_COPY } from "./FileDropList";
import { ACCEPT } from "../lib/docUploadClient";
import { trackAdsConversion, setAdsUserData } from "./AdsConversion";
import { trackEngagement } from "../lib/engagement";
import { IconCheck, IconWhatsApp } from "./Icons";

const WHATSAPP_NUMBER = "34685891214";
const EMAIL = "info@juradaexpress.es";

const TRAMITES = {
  es: [
    "Visado de nómada digital",
    "Visado no lucrativo",
    "Visado de estudios",
    "Residencia, arraigo o reagrupación familiar",
    "Nacionalidad española",
    "Matrimonio o pareja de hecho",
    "Homologación o equivalencia de título",
    "Canje del permiso de conducir",
    "Trámite en EE. UU. (USCIS)",
    "Trabajo u oposiciones",
    "Herencia o notaría",
    "Otro",
  ],
  en: [
    "Digital nomad visa",
    "Non-lucrative visa",
    "Student visa",
    "Residence, arraigo or family reunification",
    "Spanish nationality",
    "Marriage or civil partnership",
    "Degree recognition (homologación)",
    "Driving licence exchange",
    "US procedure (USCIS)",
    "Work or public exams",
    "Inheritance or notary",
    "Other",
  ],
};

const COPY = {
  es: {
    title: "Enviar documentos",
    lead:
      "Sube aquí todos tus documentos de una vez: pasaporte, certificados, títulos, extractos… Llegan directamente a una carpeta privada que solo ve Elena.",
    promise:
      "Recibirás el presupuesto en menos de 2 horas entre las 9:00 y las 23:00 (hora de Madrid), fines de semana incluidos.",
    name: "Nombre",
    email: "Correo electrónico",
    phone: "WhatsApp o teléfono",
    contactHint: "Con uno de los dos basta.",
    tramite: "¿Para qué trámite es?",
    optional: "(opcional)",
    choose: "Elige uno",
    comment: "Comentario",
    commentPh: "Por ejemplo: lo necesito para el consulado el día 3, son dos copias…",
    files: "Documentos",
    privacyA: "He leído y acepto la ",
    privacyLink: "política de privacidad",
    privacyB: ". Mis documentos se guardan en el Google Drive privado de la traductora para preparar el presupuesto y la traducción.",
    privacyHref: "/politica-privacidad",
    submit: "Enviar documentos",
    sending: (done, total) => `Subiendo ${done} de ${total}… No cierres esta página.`,
    finishing: "Comprobando que todo ha llegado…",
    errName: "Escribe tu nombre.",
    errContact: "Deja tu correo o tu WhatsApp para poder enviarte el presupuesto.",
    errEmail: "Ese correo no parece válido.",
    errPrivacy: "Marca la casilla para poder recibir tus documentos.",
    errFiles: "Añade al menos un documento.",
    errMissing: "Hay archivos que no terminaron de subir antes de recargar la página: vuelve a elegirlos o quítalos de la lista.",
    errTotal: "En total pesan más de 100 MB. Envíalos en dos tandas.",
    errStart:
      "No se ha podido empezar el envío (sin conexión o el servicio no responde). Tus datos y archivos siguen aquí: pulsa «Enviar documentos» otra vez en un momento o usa WhatsApp o correo.",
    okTitle: "Documentos recibidos",
    okLead: (n) => (n === 1 ? "Ha llegado este documento:" : `Han llegado estos ${n} documentos:`),
    okRef: "Tu referencia",
    okEmail: "Te he enviado un correo de confirmación.",
    partialTitle: "Algunos documentos no han llegado",
    partialLead:
      "Los que ves marcados en rojo no han llegado después de varios intentos. Puedes reintentarlo o mandármelos por WhatsApp o correo, con la referencia ya escrita:",
    retry: "Reintentar los que faltan",
    wa: "Enviar por WhatsApp",
    mail: "Enviar por correo",
    more: "Enviar más documentos",
    waText: (ref, names) =>
      `Hola Elena, no he podido subir estos documentos en la web (referencia ${ref}): ${names.join(", ")}. Te los mando por aquí.`,
    mailSubject: (ref) => `Documentos · ${ref}`,
    mailBody: (ref, names) =>
      `Hola Elena,\n\nNo he podido subir estos documentos en la web (referencia ${ref}):\n${names.map((n) => `- ${n}`).join("\n")}\n\nTe los adjunto a este correo.`,
    restored: "He recuperado lo que habías escrito y los documentos que ya habían llegado.",
  },
  en: {
    title: "Send documents",
    lead:
      "Upload all your documents here in one go: passport, certificates, degrees, statements… They go straight to a private folder that only Elena can see.",
    promise:
      "You will receive your quote in less than 2 hours between 9:00 and 23:00 (Madrid time), weekends included.",
    name: "Name",
    email: "Email",
    phone: "WhatsApp or phone",
    contactHint: "One of the two is enough.",
    tramite: "What is it for?",
    optional: "(optional)",
    choose: "Choose one",
    comment: "Comments",
    commentPh: "For example: I need it for the consulate on the 3rd, two copies…",
    files: "Documents",
    privacyA: "I have read and accept the ",
    privacyLink: "privacy policy",
    privacyB: ". My documents are stored in the translator's private Google Drive to prepare the quote and the translation.",
    privacyHref: "/en/privacy-policy",
    submit: "Send documents",
    sending: (done, total) => `Uploading ${done} of ${total}… Please keep this page open.`,
    finishing: "Checking everything has arrived…",
    errName: "Please enter your name.",
    errContact: "Leave your email or WhatsApp so I can send you the quote.",
    errEmail: "That email address does not look valid.",
    errPrivacy: "Please tick the box so I can receive your documents.",
    errFiles: "Add at least one document.",
    errMissing: "Some files had not finished uploading before the page reloaded: choose them again or remove them from the list.",
    errTotal: "Together they are over 100 MB. Please send them in two batches.",
    errStart:
      "The upload could not start (no connection or the service is not responding). Your details and files are still here: press “Send documents” again in a moment or use WhatsApp or email.",
    okTitle: "Documents received",
    okLead: (n) => (n === 1 ? "This document has arrived:" : `These ${n} documents have arrived:`),
    okRef: "Your reference",
    okEmail: "I have sent you a confirmation email.",
    partialTitle: "Some documents have not arrived",
    partialLead:
      "The ones marked in red did not arrive after several attempts. You can retry or send them to me on WhatsApp or by email, with the reference already filled in:",
    retry: "Retry the missing ones",
    wa: "Send on WhatsApp",
    mail: "Send by email",
    more: "Send more documents",
    waText: (ref, names) =>
      `Hi Elena, I could not upload these documents on the website (reference ${ref}): ${names.join(", ")}. I'm sending them here.`,
    mailSubject: (ref) => `Documents · ${ref}`,
    mailBody: (ref, names) =>
      `Hi Elena,\n\nI could not upload these documents on the website (reference ${ref}):\n${names.map((n) => `- ${n}`).join("\n")}\n\nI'm attaching them to this email.`,
    restored: "I have restored what you had written and the documents that had already arrived.",
  },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY = { name: "", email: "", phone: "", tramite: "", comment: "" };

export default function SendDocumentsPage({ locale = "es" }) {
  const t = COPY[locale] || COPY.es;
  const ft = FILE_COPY[locale] || FILE_COPY.es;
  const uid = useId();
  const up = useDocUpload({ persist: true });
  const [fields, setFields] = useState(EMPTY);
  const [privacy, setPrivacy] = useState(false);
  const [errors, setErrors] = useState({});
  const [phase, setPhase] = useState("form"); // form | sending | done
  const [result, setResult] = useState(null);
  const [notice, setNotice] = useState("");
  const restoredOnce = useRef(false);
  const formRef = useRef(null);

  // Datos recuperados tras recargar.
  useEffect(() => {
    if (restoredOnce.current || !up.restoredFields) return;
    restoredOnce.current = true;
    setFields({ ...EMPTY, ...up.restoredFields });
    setNotice(t.restored);
  }, [up.restoredFields, t.restored]);

  const set = (k) => (e) => {
    const next = { ...fields, [k]: e.target.value };
    setFields(next);
    up.saveFields(next);
  };

  function validate() {
    const err = {};
    if (!fields.name.trim()) err.name = t.errName;
    if (!fields.email.trim() && !fields.phone.trim()) err.contact = t.errContact;
    else if (fields.email.trim() && !EMAIL_RE.test(fields.email.trim())) err.contact = t.errEmail;
    const usable = up.entries.filter((e) => e.status !== "missing");
    if (!usable.length) err.files = t.errFiles;
    else if (up.entries.some((e) => e.status === "missing")) err.files = t.errMissing;
    if (!privacy) err.privacy = t.errPrivacy;
    return err;
  }

  async function submit(e) {
    if (e) e.preventDefault();
    if (up.busy) return;
    trackEngagement("cta_click", { cta: "enviar_documentos" });
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) {
      const first = formRef.current && formRef.current.querySelector("[aria-invalid='true']");
      if (first) first.focus();
      return;
    }
    if (formRef.current && formRef.current.elements.botcheck && formRef.current.elements.botcheck.value) return;
    setPhase("sending");
    setNotice("");
    const r = await up.send(
      { ...fields, name: fields.name.trim(), email: fields.email.trim(), phone: fields.phone.trim(), locale },
      { notify: true }
    );
    if (!r.ok) {
      setPhase("form");
      setErrors({ form: r.error === "total" ? t.errTotal : t.errStart });
      return;
    }
    if (r.received.length) {
      if (fields.email.trim()) setAdsUserData({ email: fields.email.trim() });
      trackAdsConversion("enviar_documentos");
    }
    setResult(r);
    setPhase("done");
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startOver() {
    up.reset();
    setResult(null);
    setPhase("form");
    setErrors({});
  }

  const total = up.entries.filter((e) => e.status !== "missing").length;
  const doneCount = up.entries.filter((e) => e.status === "done").length;
  const failedNames = result ? result.failed.map((f) => f.name) : [];
  const ref = (result && result.ref) || up.ref;

  const fieldClass =
    "mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-slate-900 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy";
  const labelClass = "text-sm font-medium text-slate-700";

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 md:py-16">
      <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">
        {t.title}
      </h1>
      <p className="mt-4 text-slate-600">{t.lead}</p>
      <p className="mt-2 text-sm font-medium text-brand-navy">{t.promise}</p>

      {notice ? (
        <p className="mt-6 rounded-lg bg-brand-navy-50 px-4 py-3 text-sm text-brand-navy ring-1 ring-brand-navy-100" role="status">
          {notice}
        </p>
      ) : null}

      {phase === "done" && result ? (
        <section className="mt-8 rounded-xl bg-white p-6 ring-1 ring-stone-200" aria-live="polite" data-testid="doc-result">
          {result.received.length ? (
            <>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                  <IconCheck className="h-6 w-6" />
                </span>
                <h2 className="font-display text-2xl font-semibold text-slate-900">{t.okTitle}</h2>
              </div>
              <p className="mt-4 text-slate-700">{t.okLead(result.received.length)}</p>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-slate-700">
                {result.received.map((f) => (
                  <li key={f.name}>{f.name}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">{t.promise}</p>
              {fields.email.trim() ? <p className="mt-1 text-sm text-slate-600">{t.okEmail}</p> : null}
            </>
          ) : null}
          <p className="mt-4 text-sm text-slate-600">
            {t.okRef}: <strong className="font-mono text-slate-900">{ref}</strong>
          </p>

          {failedNames.length ? (
            <div className="mt-6 rounded-lg bg-red-50 p-4 ring-1 ring-red-200" role="alert">
              <h3 className="font-semibold text-red-800">{t.partialTitle}</h3>
              <p className="mt-1 text-sm text-red-800">{t.partialLead}</p>
              <ul className="mt-2 list-disc pl-6 text-sm text-red-800">
                {failedNames.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <button type="button" className="btn btn-primary btn-sm" onClick={() => submit()} disabled={up.busy}>
                  {t.retry}
                </button>
                <a
                  className="btn btn-secondary btn-sm"
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.waText(ref, failedNames))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconWhatsApp className="h-4 w-4" /> {t.wa}
                </a>
                <a
                  className="btn btn-secondary btn-sm"
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent(t.mailSubject(ref))}&body=${encodeURIComponent(
                    t.mailBody(ref, failedNames)
                  )}`}
                >
                  {t.mail}
                </a>
              </div>
              <div className="mt-4">
                <FileDropList up={up} locale={locale} accept={ACCEPT} disabled={up.busy} />
              </div>
            </div>
          ) : (
            <button type="button" className="btn btn-secondary btn-sm mt-6" onClick={startOver}>
              {t.more}
            </button>
          )}
        </section>
      ) : (
        <form ref={formRef} onSubmit={submit} noValidate className="mt-8 space-y-5" data-testid="doc-form">
          <div>
            <label htmlFor={`${uid}-name`} className={labelClass}>
              {t.name}
            </label>
            <input
              id={`${uid}-name`}
              name="name"
              autoComplete="name"
              value={fields.name}
              onChange={set("name")}
              className={fieldClass}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? `${uid}-name-err` : undefined}
            />
            {errors.name ? (
              <p id={`${uid}-name-err`} className="mt-1 text-sm text-red-700">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`${uid}-email`} className={labelClass}>
                {t.email}
              </label>
              <input
                id={`${uid}-email`}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={fields.email}
                onChange={set("email")}
                className={fieldClass}
                aria-invalid={errors.contact ? "true" : "false"}
                aria-describedby={`${uid}-contact-hint`}
              />
            </div>
            <div>
              <label htmlFor={`${uid}-phone`} className={labelClass}>
                {t.phone}
              </label>
              <input
                id={`${uid}-phone`}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={fields.phone}
                onChange={set("phone")}
                className={fieldClass}
                aria-describedby={`${uid}-contact-hint`}
              />
            </div>
          </div>
          <p id={`${uid}-contact-hint`} className={`-mt-3 text-xs ${errors.contact ? "text-red-700" : "text-slate-500"}`}>
            {errors.contact || t.contactHint}
          </p>

          <div>
            <label htmlFor={`${uid}-tramite`} className={labelClass}>
              {t.tramite} <span className="font-normal text-slate-400">{t.optional}</span>
            </label>
            <select id={`${uid}-tramite`} name="tramite" value={fields.tramite} onChange={set("tramite")} className={fieldClass}>
              <option value="">{t.choose}</option>
              {(TRAMITES[locale] || TRAMITES.es).map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={`${uid}-comment`} className={labelClass}>
              {t.comment} <span className="font-normal text-slate-400">{t.optional}</span>
            </label>
            <textarea
              id={`${uid}-comment`}
              name="comment"
              rows={3}
              value={fields.comment}
              onChange={set("comment")}
              placeholder={t.commentPh}
              className={fieldClass}
            />
          </div>

          <div>
            <p className={labelClass}>{t.files}</p>
            <div className="mt-1">
              <FileDropList
                up={up}
                locale={locale}
                accept={ACCEPT}
                disabled={phase === "sending"}
                describedBy={errors.files ? `${uid}-files-err` : undefined}
              />
            </div>
            {errors.files ? (
              <p id={`${uid}-files-err`} className="mt-1 text-sm text-red-700" aria-invalid="true" tabIndex={-1}>
                {errors.files}
              </p>
            ) : null}
          </div>

          {/* Honeypot */}
          <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <div>
            <label className="flex items-start gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={privacy}
                onChange={(e) => setPrivacy(e.target.checked)}
                className="mt-1 h-4 w-4"
                aria-invalid={errors.privacy ? "true" : "false"}
                data-testid="doc-privacy"
              />
              <span>
                {t.privacyA}
                <a href={t.privacyHref} className="link" target="_blank" rel="noopener">
                  {t.privacyLink}
                </a>
                {t.privacyB}
              </span>
            </label>
            {errors.privacy ? <p className="mt-1 text-sm text-red-700">{errors.privacy}</p> : null}
          </div>

          {errors.form ? (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800 ring-1 ring-red-200" role="alert">
              {errors.form}
            </p>
          ) : null}

          <button type="submit" className="btn btn-gold w-full" disabled={phase === "sending"} data-testid="doc-submit">
            {phase === "sending" ? t.sending(Math.min(doneCount + 1, total), total) : t.submit}
          </button>
          <p className="text-center text-xs text-slate-500">{ft.spec(up.limits)}</p>
        </form>
      )}
    </main>
  );
}
