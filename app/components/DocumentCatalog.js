"use client";

// app/components/DocumentCatalog.js
import { useEffect, useRef, useState } from "react";
import { DOCUMENTS } from "../../content/documents";
import {
  IconFileText,
  IconHeart,
  IconShieldCheck,
  IconCreditCard,
  IconGraduationCap,
  IconBookOpen,
  IconBriefcase,
  IconEdit,
  IconHelpCircle,
  IconUpload,
} from "./Icons";

const ICONS = {
  fileText: IconFileText,
  heart: IconHeart,
  shieldCheck: IconShieldCheck,
  creditCard: IconCreditCard,
  graduationCap: IconGraduationCap,
  bookOpen: IconBookOpen,
  briefcase: IconBriefcase,
  edit: IconEdit,
  helpCircle: IconHelpCircle,
};

function formatPrice(price) {
  return price != null ? `${price} €` : "Pendiente de presupuestar";
}

// Los adjuntos por email son función de pago en Web3Forms. Por ahora el
// archivo solo se muestra como vista previa en la página: no se envía.
// Ver nota junto al formulario y al dropzone.
const MAX_FILE_BYTES = 20 * 1024 * 1024;
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export default function DocumentCatalog() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [file, setFile] = useState(null);
  const [fileNotice, setFileNotice] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error | config-missing
  const [fieldErrors, setFieldErrors] = useState({}); // { Nombre, Email, privacidad }
  const [payStatus, setPayStatus] = useState("idle"); // idle | redirecting | error

  const formRef = useRef(null);
  const fileInputRef = useRef(null);
  const prevCountRef = useRef(0);

  const selectedDocs = DOCUMENTS.filter((d) => selectedIds.includes(d.id));
  const pricedTotal = selectedDocs.reduce((sum, d) => sum + (d.price || 0), 0);
  const hasPending = selectedDocs.some((d) => d.price == null);
  const allPriced = selectedDocs.length > 0 && !hasPending;

  // Al añadir un documento (no al quitarlo) hacemos scroll al formulario.
  useEffect(() => {
    if (selectedIds.length > prevCountRef.current) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    prevCountRef.current = selectedIds.length;
  }, [selectedIds]);

  function toggleSelect(id) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function handleFiles(fileList) {
    const incoming = Array.from(fileList);
    if (incoming.length === 0) return;
    const chosen = incoming[0];

    if (chosen.size > MAX_FILE_BYTES) {
      setFileNotice("Ese archivo pesa demasiado. Envíanoslo por WhatsApp o email.");
      return;
    }

    setFile(chosen);
    setFileNotice(
      incoming.length > 1
        ? "Solo se muestra el primer archivo aquí. Puedes enviarnos el resto por WhatsApp o email cuando te contactemos."
        : ""
    );
  }

  function removeFile() {
    setFile(null);
    setFileNotice("");
  }

  async function handlePayOnline() {
    setPayStatus("redirecting");
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        setPayStatus("error");
      }
    } catch (err) {
      setPayStatus("error");
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  }

  // Validación inline (sin alert()): devuelve el mapa de errores por campo.
  function validate(form) {
    const errors = {};
    if (!form.Nombre.value.trim()) {
      errors.Nombre = "Escribe tu nombre para poder responderte.";
    }
    const email = form.Email.value.trim();
    if (!email) {
      errors.Email = "Necesito un email para enviarte el presupuesto.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      errors.Email = "Ese email no parece completo; revísalo.";
    }
    if (!form.privacidad.checked) {
      errors.privacidad =
        "Marca la casilla de privacidad para que pueda tratar tus datos.";
    }
    return errors;
  }

  function clearFieldError(name) {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (selectedDocs.length === 0) return;

    const form = e.currentTarget;

    if (form.botcheck.checked) {
      // Casilla honeypot: si está marcada, lo rellenó un bot. Ignoramos en silencio.
      return;
    }

    const errors = validate(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      form.querySelector(`[name="${Object.keys(errors)[0]}"]`)?.focus();
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("config-missing");
      return;
    }

    setStatus("sending");
    // FormData(form) captura Nombre/Email/Teléfono/botcheck por su atributo name.
    const fd = new FormData(form);
    fd.delete("botcheck");
    fd.delete("privacidad");
    fd.append("Acepta la política de privacidad", "Sí");
    if (!fd.get("Teléfono")) fd.set("Teléfono", "No indicado");
    fd.append("access_key", WEB3FORMS_ACCESS_KEY);
    fd.append("subject", "Nueva solicitud — Catálogo de documentos JuradaExpress");
    fd.append("from_name", "Catálogo de documentos — JuradaExpress");
    fd.append(
      "Documentos solicitados",
      selectedDocs.map((d) => `- ${d.name}: ${formatPrice(d.price)}`).join("\n")
    );
    fd.append(
      "Total orientativo",
      allPriced
        ? `${pricedTotal} €`
        : hasPending && pricedTotal > 0
        ? `${pricedTotal} € (parcial) + pendiente de presupuestar`
        : "A presupuestar"
    );
    fd.append(
      "Archivo preparado por el cliente",
      file
        ? `${file.name} (${Math.round(file.size / 1024)} KB) — pendiente de recibir, pedir por WhatsApp/email`
        : "No adjuntó ningún archivo en la web"
    );

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setSelectedIds([]);
        setFile(null);
        setFileNotice("");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <>
      {/* CUADRÍCULA */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {DOCUMENTS.map((doc) => {
          const Icon = ICONS[doc.icon];
          const isSelected = selectedIds.includes(doc.id);
          return (
            <div
              key={doc.id}
              className={`rounded-xl bg-white p-6 ring-1 transition hover:shadow ${
                isSelected ? "ring-2 ring-brand-gold" : "ring-stone-200"
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy-50 text-brand-navy">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold leading-snug text-slate-900 md:text-2xl">{doc.name}</h3>
              <div className="mt-3">
                {doc.price != null ? (
                  <span className="inline-flex rounded-full bg-brand-navy px-3 py-1 text-sm font-semibold tabular-nums text-white">
                    {doc.price} €
                  </span>
                ) : (
                  <span className="inline-flex rounded-full bg-brand-gold-100 px-3 py-1 text-sm font-semibold text-brand-gold-900 ring-1 ring-brand-gold-300">
                    Pendiente de presupuestar
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => toggleSelect(doc.id)}
                className={`mt-5 w-full rounded-xl px-4 py-2 text-sm font-medium transition ${
                  isSelected
                    ? "bg-brand-gold text-brand-navy-900 hover:bg-brand-gold-400"
                    : "bg-brand-navy text-white hover:bg-brand-navy-700"
                }`}
              >
                {isSelected ? "✓ Seleccionado" : "Seleccionar"}
              </button>
            </div>
          );
        })}
      </div>

      {/* FORMULARIO */}
      <div
        ref={formRef}
        className="mt-16 scroll-mt-24 rounded-xl bg-stone-50 p-6 ring-1 ring-stone-200 md:p-10"
      >
        <h2 className="text-2xl font-bold leading-snug tracking-tight text-slate-900 md:text-3xl">
          Tu solicitud
        </h2>

        {selectedDocs.length === 0 ? (
          <p className="mt-3 text-slate-600">
            Selecciona uno o más documentos arriba para continuar.
          </p>
        ) : (
          <>
            <ul className="mt-5 divide-y divide-stone-200 rounded-xl bg-white ring-1 ring-stone-200">
              {selectedDocs.map((d) => (
                <li
                  key={d.id}
                  className="flex items-center justify-between gap-3 px-4 py-3"
                >
                  <span className="text-sm text-slate-700">{d.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium tabular-nums text-slate-900">
                      {formatPrice(d.price)}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleSelect(d.id)}
                      className="text-xs text-slate-400 hover:text-brand-gold-700"
                      aria-label={`Quitar ${d.name}`}
                    >
                      Quitar
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-3 text-sm text-slate-600">
              {allPriced ? (
                <>
                  Total orientativo:{" "}
                  <strong className="text-brand-navy">{pricedTotal} €</strong>
                </>
              ) : hasPending && pricedTotal > 0 ? (
                <>
                  Subtotal con precio cerrado:{" "}
                  <strong className="text-brand-navy">{pricedTotal} €</strong> +
                  presupuesto pendiente para el resto.
                </>
              ) : (
                "Te enviaremos un presupuesto para los documentos seleccionados."
              )}
            </p>

            {allPriced && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handlePayOnline}
                  disabled={payStatus === "redirecting"}
                  className="btn btn-gold w-full disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {payStatus === "redirecting"
                    ? "Redirigiendo a pago…"
                    : `Pagar online ahora — ${pricedTotal} €`}
                </button>
                {payStatus === "error" && (
                  <p className="mt-2 text-sm text-red-600">
                    No se ha podido iniciar el pago. Inténtalo de nuevo o usa
                    el formulario de abajo para pedir presupuesto.
                  </p>
                )}
                <p className="mt-2 text-xs text-slate-500">
                  O, si prefieres, rellena el formulario de abajo para que te
                  confirmemos todo antes de pagar.
                </p>
              </div>
            )}
          </>
        )}

        {status === "sent" ? (
          <div className="mt-6 rounded-xl bg-brand-navy-50 p-4 text-brand-navy ring-1 ring-brand-navy-100">
            ¡Solicitud enviada correctamente! Te contactaremos en menos de 2
            horas (horario laboral).
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="nombre" className="text-sm font-medium text-slate-700">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="Nombre"
                  type="text"
                  aria-invalid={fieldErrors.Nombre ? "true" : undefined}
                  aria-describedby={fieldErrors.Nombre ? "nombre-error" : undefined}
                  onInput={() => clearFieldError("Nombre")}
                  className={`mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-1 ${
                    fieldErrors.Nombre
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                      : "border-stone-300 focus:border-brand-navy focus:ring-brand-navy"
                  }`}
                />
                {fieldErrors.Nombre && (
                  <p id="nombre-error" className="mt-1 text-sm text-red-600">
                    {fieldErrors.Nombre}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  name="Email"
                  type="email"
                  aria-invalid={fieldErrors.Email ? "true" : undefined}
                  aria-describedby={fieldErrors.Email ? "email-error" : undefined}
                  onInput={() => clearFieldError("Email")}
                  className={`mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-1 ${
                    fieldErrors.Email
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                      : "border-stone-300 focus:border-brand-navy focus:ring-brand-navy"
                  }`}
                />
                {fieldErrors.Email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600">
                    {fieldErrors.Email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="telefono" className="text-sm font-medium text-slate-700">
                Teléfono{" "}
                <span className="text-slate-400">(opcional, para WhatsApp)</span>
              </label>
              <input
                id="telefono"
                name="Teléfono"
                type="tel"
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
              />
            </div>

            {/* Dropzone */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Documento a traducir{" "}
                <span className="text-slate-400">(opcional aquí)</span>
              </label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                className={`mt-1 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition ${
                  dragActive
                    ? "border-brand-gold bg-brand-gold-50"
                    : "border-stone-300 bg-white hover:border-brand-navy-300"
                }`}
              >
                <IconUpload className="h-6 w-6 text-brand-navy-300" />
                <p className="text-sm text-slate-600">
                  Arrastra tu archivo aquí o haz clic para seleccionarlo
                </p>
                <p className="text-xs text-slate-400">PDF, JPG, PNG o Word</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  className="hidden"
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                />
              </div>

              {file && (
                <div className="mt-3 flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm ring-1 ring-stone-200">
                  <span className="truncate text-slate-700">
                    {file.name}{" "}
                    <span className="text-slate-400">
                      ({Math.round(file.size / 1024)} KB)
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="ml-2 shrink-0 text-slate-400 hover:text-brand-gold-700"
                    aria-label={`Quitar ${file.name}`}
                  >
                    ✕
                  </button>
                </div>
              )}

              {fileNotice && (
                <p className="mt-2 text-xs text-brand-gold-700">{fileNotice}</p>
              )}

              <p className="mt-2 text-xs text-slate-500">
                De momento este archivo no se envía automáticamente por email:
                solo nos avisa de que lo tienes listo. Te lo pediremos por
                WhatsApp o email en cuanto confirmemos tu presupuesto.
              </p>
            </div>

            {/* Nota horario/pago */}
            <div className="rounded-xl bg-brand-navy-50 p-4 text-sm ring-1 ring-brand-navy-100">
              <p className="font-medium text-brand-navy">
                Recibirás la confirmación y el presupuesto final por email o
                WhatsApp en menos de 2 horas (horario laboral).
              </p>
              <p className="mt-1 text-brand-navy-700">
                Sin cobro automático: te confirmaremos el precio final y la
                forma de pago antes de gestionar el cobro.
              </p>
            </div>

            {/* RGPD: cláusula informativa + aceptación obligatoria */}
            <div className="rounded-xl bg-white p-4 text-xs text-slate-500 ring-1 ring-stone-200">
              <p>
                <strong className="text-slate-700">Protección de datos:</strong>{" "}
                la responsable es Elena Peñaranda Ortega. Usaré tus datos solo
                para responder a tu solicitud y preparar el presupuesto; no se
                ceden a terceros salvo obligación legal. Puedes ejercer tus
                derechos de acceso, rectificación o supresión en
                info@juradaexpress.es. Más información en la{" "}
                <a href="/politica-privacidad" className="link">
                  política de privacidad
                </a>
                .
              </p>
              <label className="mt-3 flex items-start gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  name="privacidad"
                  aria-invalid={fieldErrors.privacidad ? "true" : undefined}
                  aria-describedby={
                    fieldErrors.privacidad ? "privacidad-error" : undefined
                  }
                  onChange={() => clearFieldError("privacidad")}
                  className="mt-0.5 h-5 w-5 shrink-0 rounded border-stone-300 text-brand-navy focus:ring-brand-navy"
                />
                He leído y acepto la política de privacidad.
              </label>
              {fieldErrors.privacidad && (
                <p id="privacidad-error" className="mt-1 text-sm text-red-600">
                  {fieldErrors.privacidad}
                </p>
              )}
            </div>

            {status === "error" && (
              <p className="text-sm text-red-600">
                Ha ocurrido un error al enviar. Inténtalo de nuevo o escríbenos
                por WhatsApp.
              </p>
            )}

            {status === "config-missing" && (
              <p className="text-sm text-red-600">
                El envío no está configurado todavía en este entorno (falta la
                clave de Web3Forms). Escríbenos por WhatsApp mientras tanto.
              </p>
            )}

            <button
              type="submit"
              disabled={selectedDocs.length === 0 || status === "sending"}
              className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "sending" ? "Enviando…" : "Enviar solicitud"}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
