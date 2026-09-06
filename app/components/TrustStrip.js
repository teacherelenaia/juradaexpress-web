// app/components/TrustStrip.js
//
// Franja de confianza bajo el hero (FASE 1.4 del encargo internacional):
// una fila sobria de cuatro hechos en Manrope 500, sin iconos ni tarjetas.
// El dato de Google sale de content/site.js; si no hay reseñas publicables
// se sustituye por "Traducciones válidas ante organismos oficiales".
import {
  GOOGLE_BUSINESS_URL,
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
} from "../../content/site";
import { getPublishableReviews } from "../../content/reviews";

const MAEC_URL =
  "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Traductores-as---Interpretes-Jurados-as.aspx";

const COPY = {
  es: {
    maec: "Nombrada por el MAEC · nº 7310",
    maecLabel: "Comprobar el nombramiento en el listado oficial del MAEC",
    google: (rating, count) =>
      `${rating.toLocaleString("es-ES", { minimumFractionDigits: 1 })} en Google · ${count} reseñas`,
    googleLabel: "Ver las reseñas en la ficha de Google Business",
    noReviews: "Traducciones válidas ante organismos oficiales",
    delivery: "Entrega 24/48 h · PDF firmado",
    payment: "Pago con tarjeta internacional",
    aria: "Datos de confianza",
  },
  en: {
    maec: "Appointed by the Spanish Ministry of Foreign Affairs · no. 7310",
    maecLabel: "Check the appointment on the Ministry's official register",
    google: (rating, count) =>
      `${rating.toLocaleString("en-GB", { minimumFractionDigits: 1 })} on Google · ${count} reviews`,
    googleLabel: "See the reviews on the Google Business profile",
    noReviews: "Translations accepted by official bodies",
    delivery: "Delivered in 24/48h · signed PDF",
    payment: "International card payments",
    aria: "Trust facts",
  },
};

export default function TrustStrip({ locale = "es", className = "" }) {
  const t = COPY[locale] || COPY.es;
  const hasReviews =
    getPublishableReviews().length > 0 &&
    GOOGLE_RATING > 0 &&
    GOOGLE_REVIEW_COUNT > 0;

  const facts = [
    {
      key: "maec",
      text: t.maec,
      href: MAEC_URL,
      label: t.maecLabel,
    },
    hasReviews
      ? {
          key: "google",
          text: t.google(GOOGLE_RATING, GOOGLE_REVIEW_COUNT),
          href: GOOGLE_BUSINESS_URL,
          label: t.googleLabel,
        }
      : { key: "valid", text: t.noReviews },
    { key: "delivery", text: t.delivery },
    { key: "payment", text: t.payment },
  ];

  return (
    <section aria-label={t.aria} className={`border-y border-stone-200 ${className}`}>
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-3 px-4 py-5 text-sm font-medium text-slate-700 md:grid-cols-4 md:gap-x-8 md:text-[0.9375rem]">
        {facts.map((f) => (
          <li key={f.key} className="leading-snug">
            {f.href ? (
              <a
                href={f.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={f.label}
                className="link-nav inline-block min-h-[44px] py-2.5 text-slate-700 md:py-0 md:min-h-0"
              >
                {f.text}
              </a>
            ) : (
              <span className="inline-block py-2.5 md:py-0">{f.text}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
