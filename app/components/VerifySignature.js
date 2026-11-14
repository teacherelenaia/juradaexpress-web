// app/components/VerifySignature.js
//
// Bloque «Cómo comprobar mi firma» / «How to verify my signature»
// (14/11/2026) para las páginas que no usan ServicePage (p. ej.
// /preguntas-frecuentes). Mismo texto que la sección de ServicePage:
// content/signature.js.
import { signatureText } from "../../content/signature";

export default function VerifySignature({ locale = "es", className = "" }) {
  const t = signatureText(locale);
  return (
    <section
      id={locale === "en" ? "verify-signature" : "comprobar-firma"}
      className={`rounded-xl bg-stone-50 p-6 ring-1 ring-stone-200 md:p-8 ${className}`}
    >
      <h2 className="font-display text-2xl font-semibold leading-snug text-slate-900">{t.title}</h2>
      <p className="mt-3 max-w-[68ch] text-slate-700">{t.intro}</p>
      <ol className="mt-4 max-w-[68ch] space-y-2 text-slate-700">
        {t.steps.map((step, i) => (
          <li key={i} className="flex gap-3">
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-navy text-xs font-semibold text-white"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <span
              className="[&_a]:text-brand-navy [&_a]:underline [&_a]:underline-offset-2"
              dangerouslySetInnerHTML={{ __html: step }}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}
