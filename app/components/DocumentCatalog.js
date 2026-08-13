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

export default function DocumentCatalog() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

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

  function addFiles(fileList) {
    setFiles((prev) => [...prev, ...Array.from(fileList)]);
  }

  function removeFile(index) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (selectedDocs.length === 0) return;
    setStatus("sending");

    // TODO: conectar con Web3Forms (paso 5)
    setTimeout(() => setStatus("idle"), 300);
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
              className={`rounded-2xl bg-white p-6 ring-1 transition hover:shadow ${
                isSelected ? "ring-2 ring-brand-gold" : "ring-slate-200"
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy-50 text-brand-navy">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{doc.name}</h3>
              <div className="mt-3">
                {doc.price != null ? (
                  <span className="inline-flex rounded-full bg-brand-navy px-3 py-1 text-sm font-semibold text-white">
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
        className="mt-16 scroll-mt-24 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200 md:p-10"
      >
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          Tu solicitud
        </h2>

        {selectedDocs.length === 0 ? (
          <p className="mt-3 text-slate-600">
            Selecciona uno o más documentos arriba para continuar.
          </p>
        ) : (
          <>
            <ul className="mt-5 divide-y divide-slate-200 rounded-xl bg-white ring-1 ring-slate-200">
              {selectedDocs.map((d) => (
                <li
                  key={d.id}
                  className="flex items-center justify-between gap-3 px-4 py-3"
                >
                  <span className="text-sm text-slate-700">{d.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-900">
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
          </>
        )}

        {status === "sent" ? (
          <div className="mt-6 rounded-xl bg-brand-navy-50 p-4 text-brand-navy ring-1 ring-brand-navy-100">
            ¡Solicitud enviada correctamente! Te contactaremos en menos de 2
            horas (horario laboral).
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="nombre" className="text-sm font-medium text-slate-700">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
                />
              </div>
            </div>

            <div>
              <label htmlFor="telefono" className="text-sm font-medium text-slate-700">
                Teléfono{" "}
                <span className="text-slate-400">(opcional, para WhatsApp)</span>
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
              />
            </div>

            {/* Dropzone */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Documentos a traducir
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
                    : "border-slate-300 bg-white hover:border-brand-navy-300"
                }`}
              >
                <IconUpload className="h-6 w-6 text-brand-navy-300" />
                <p className="text-sm text-slate-600">
                  Arrastra tus archivos aquí o haz clic para seleccionarlos
                </p>
                <p className="text-xs text-slate-400">PDF, JPG, PNG o Word</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  className="hidden"
                  onChange={(e) => e.target.files && addFiles(e.target.files)}
                />
              </div>
              {files.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {files.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm ring-1 ring-slate-200"
                    >
                      <span className="truncate text-slate-700">{f.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="ml-2 shrink-0 text-slate-400 hover:text-brand-gold-700"
                        aria-label={`Quitar ${f.name}`}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
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

            {status === "error" && (
              <p className="text-sm text-red-600">
                Ha ocurrido un error al enviar. Inténtalo de nuevo o escríbenos
                por WhatsApp.
              </p>
            )}

            <button
              type="submit"
              disabled={selectedDocs.length === 0 || status === "sending"}
              className="w-full rounded-xl bg-brand-navy px-5 py-3 font-medium text-white transition hover:bg-brand-navy-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "sending" ? "Enviando…" : "Enviar solicitud"}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
