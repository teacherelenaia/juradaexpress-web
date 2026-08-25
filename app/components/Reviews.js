// app/components/Reviews.js
//
// Sección de opiniones. Solo se renderiza si content/reviews.js contiene
// reseñas reales con nombre, fecha y origen. Si no hay ninguna, devuelve
// null y la sección desaparece por completo de la página.
import { getPublishableReviews, GOOGLE_BUSINESS_URL } from "../../content/reviews";

const COPY = {
  es: {
    heading: "Opiniones",
    stars: (n) => `Valoración: ${n} de 5 estrellas`,
    source: (source, date) => `${source} · ${date}`,
    seeAll: "Ver todas en Google Business",
    locale: "es-ES",
  },
  en: {
    heading: "Reviews",
    stars: (n) => `Rating: ${n} out of 5 stars`,
    source: (source, date) => `${source} · ${date}`,
    seeAll: "See all on Google Business",
    locale: "en-GB",
  },
};

function Stars({ rating, label }) {
  return (
    <div
      className="flex gap-0.5 text-brand-gold-700"
      role="img"
      aria-label={label}
    >
      {Array.from({ length: rating }).map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.771l-7.416 3.642 1.48-8.279L0 9.306l8.332-1.151z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews({ locale = "es", className = "" }) {
  const reviews = getPublishableReviews(locale);
  if (reviews.length === 0) return null;

  const t = COPY[locale] || COPY.es;

  return (
    <section className={`bg-stone-50 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <h2 className="text-3xl font-bold leading-snug tracking-tight text-slate-900 md:text-4xl">
          {t.heading}
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <blockquote
              key={`${r.name}-${r.date}`}
              className="rounded-xl bg-white p-5 ring-1 ring-stone-200"
            >
              {r.rating ? (
                <Stars rating={r.rating} label={t.stars(r.rating)} />
              ) : null}
              <p className="mt-3 text-slate-800">“{r.text}”</p>
              <footer className="mt-3 text-sm text-slate-600">
                <span className="font-medium text-slate-900">{r.name}</span>
                <span className="mt-0.5 block text-slate-500">
                  {t.source(
                    r.source,
                    new Date(r.date).toLocaleDateString(t.locale, {
                      year: "numeric",
                      month: "long",
                    })
                  )}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>

        {GOOGLE_BUSINESS_URL && (
          <p className="mt-6 text-sm">
            <a
              href={GOOGLE_BUSINESS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              {t.seeAll}
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
