// app/components/ThankYouPage.js
//
// Página de «pago recibido» a la que Stripe redirige con
// ?session_id={CHECKOUT_SESSION_ID}: /documentos/pago-exitoso (checkout de
// la web), /gracias y /en/thank-you (Payment Links, 25/10/2026). En el
// servidor se recupera la sesión (app/lib/stripePurchase.js) y
// PurchaseConversion dispara la conversión de compra de Google Ads con el
// importe real. Nada de eso se muestra en pantalla. Las tres son noindex y
// no están en el sitemap.
import { IconCheck } from "./Icons";
import PurchaseConversion from "./PurchaseConversion";
import { retrievePurchase, sessionIdFrom } from "../lib/stripePurchase";

const COPY = {
  es: {
    title: "Pago recibido",
    lead:
      "Te contactaremos en menos de 2 horas (horario laboral) con la confirmación y el plazo de entrega.",
    note:
      "Si tienes que enviarnos el documento a traducir y no lo has hecho aún, puedes hacerlo por WhatsApp o respondiendo al email de confirmación.",
    wa: "Escribir por WhatsApp",
    waHref:
      "https://wa.me/34685891214?text=Hola%20Jurada%20Express,%20acabo%20de%20realizar%20un%20pago%20online%20y%20quiero%20enviaros%20el%20documento",
    back: "Volver al catálogo",
    backHref: "/documentos",
  },
  en: {
    title: "Payment received",
    lead:
      "We will contact you within 2 hours (office hours) with the confirmation and the delivery time.",
    note:
      "If you still need to send us the document to translate, you can do it by WhatsApp or by replying to the confirmation email.",
    wa: "Message us on WhatsApp",
    waHref:
      "https://wa.me/34685891214?text=Hi%20Jurada%20Express,%20I%20have%20just%20paid%20online%20and%20would%20like%20to%20send%20you%20the%20document",
    back: "Back to the catalogue",
    backHref: "/en/documentos",
  },
};

export const thankYouMetadata = (locale = "es") => ({
  title: COPY[locale]?.title || COPY.es.title,
  robots: { index: false, follow: false },
});

export default async function ThankYouPage({ searchParams, locale = "es" }) {
  const t = COPY[locale] || COPY.es;
  const sessionId = sessionIdFrom(searchParams);
  const purchase = await retrievePurchase(sessionId);

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center md:py-24">
      <PurchaseConversion sessionId={sessionId} purchase={purchase} />
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-navy-50 text-brand-navy">
        <IconCheck className="h-8 w-8" />
      </div>
      <h1 className="font-display text-balance mt-6 text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">
        {t.title}
      </h1>
      <p className="mt-4 text-lg text-slate-600">{t.lead}</p>
      <p className="mt-2 text-sm text-slate-500">{t.note}</p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href={t.waHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          {t.wa}
        </a>
        <a href={t.backHref} className="btn btn-secondary">
          {t.back}
        </a>
      </div>
    </main>
  );
}
