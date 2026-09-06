// app/components/Reviews.js
//
// Sección de opiniones. Solo se renderiza si content/reviews.js contiene
// reseñas reales con nombre, fecha y origen. Si no hay ninguna, devuelve
// null y la sección desaparece por completo de la página.
//
// Criterio (FASE 1.9 del encargo internacional): se muestran las reseñas
// destacadas en ambos idiomas de la web, cada una en su idioma original y
// con la etiqueta del idioma; las largas se publican completas, sin
// recortar. La cabecera enlaza a la ficha de Google con la nota y el
// número de reseñas (content/site.js).
import { getFeaturedReviews } from "../../content/reviews";
import {
  GOOGLE_BUSINESS_URL,
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
} from "../../content/site";
import { SectionHeading } from "./ui";

const COPY = {
  es: {
    heading: "Opiniones de clientes",
    intro:
      "Reseñas publicadas en Google por clientes reales, en el idioma en que las escribieron.",
    rating: (rating, count) =>
      `${rating.toLocaleString("es-ES", { minimumFractionDigits: 1 })} · ${count} reseñas en Google`,
    stars: (n) => `Valoración: ${n} de 5 estrellas`,
    seeAll: (count) => `Ver las ${count} en Google`,
    langLabel: { es: "Español", en: "Inglés" },
    locale: "es-ES",
  },
  en: {
    heading: "Client reviews",
    intro:
      "Reviews published on Google by real clients, in the language they wrote them in.",
    rating: (rating, count) =>
      `${rating.toLocaleString("en-GB", { minimumFractionDigits: 1 })} · ${count} reviews on Google`,
    stars: (n) => `Rating: ${n} out of 5 stars`,
    seeAll: (count) => `See all ${count} on Google`,
    langLabel: { es: "Spanish", en: "English" },
    locale: "en-GB",
  },
};

function Stars({ rating, label, size = 16 }) {
  return (
    <span
      className="inline-flex gap-0.5 text-brand-gold-700"
      role="img"
      aria-label={label}
    >
      {Array.from({ length: rating }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.771l-7.416 3.642 1.48-8.279L0 9.306l8.332-1.151z" />
        </svg>
      ))}
    </span>
  );
}

export default function Reviews({ locale = "es", className = "" }) {
  const reviews = getFeaturedReviews();
  if (reviews.length === 0) return null;

  const t = COPY[locale] || COPY.es;
  const showRating = GOOGLE_RATING > 0 && GOOGLE_REVIEW_COUNT > 0;
  const rounded = Math.round(GOOGLE_RATING);

  return (
    <section className={`bg-stone-50 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionHeading>{t.heading}</SectionHeading>
            <p className="mt-3 max-w-[68ch] text-slate-600">{t.intro}</p>
          </div>
          {showRating && GOOGLE_BUSINESS_URL && (
            <a
              href={GOOGLE_BUSINESS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link-nav inline-flex min-h-[44px] shrink-0 items-center gap-2 font-medium text-slate-900"
            >
              <Stars rating={rounded} label={t.stars(GOOGLE_RATING)} size={18} />
              <span>{t.rating(GOOGLE_RATING, GOOGLE_REVIEW_COUNT)}</span>
            </a>
          )}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {reviews.map((r) => {
            const lang = r.lang === "en" ? "en" : "es";
            return (
              <blockquote
                key={`${r.name}-${r.date}`}
                lang={lang}
                className="flex flex-col rounded-xl bg-white p-6 ring-1 ring-stone-200"
              >
                {r.rating ? (
                  <Stars rating={r.rating} label={t.stars(r.rating)} />
                ) : null}
                <p className="mt-3 whitespace-pre-line text-slate-800">
                  {r.text}
                </p>
                <footer className="mt-auto pt-4 text-sm text-slate-600">
                  <span className="font-medium text-slate-900">{r.name}</span>
                  <span className="mt-0.5 block text-slate-500">
                    {r.source} ·{" "}
                    {new Date(r.date).toLocaleDateString(t.locale, {
                      year: "numeric",
                      month: "long",
                    })}{" "}
                    · {t.langLabel[lang]}
                  </span>
                </footer>
              </blockquote>
            );
          })}
        </div>

        {GOOGLE_BUSINESS_URL && (
          <div className="mt-8">
            <a
              href={GOOGLE_BUSINESS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              {t.seeAll(showRating ? GOOGLE_REVIEW_COUNT : reviews.length)}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
