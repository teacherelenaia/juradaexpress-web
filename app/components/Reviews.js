// app/components/Reviews.js
//
// Sección de opiniones (id="opiniones", destino de la franja de confianza).
// Solo se renderiza si content/reviews.js contiene reseñas reales con
// nombre, fecha y origen. Si no hay ninguna, devuelve null y la sección
// desaparece por completo de la página.
//
// Criterio (FASE 1.9 del encargo internacional; Trustpilot desde el
// 14/11/2026): se muestran las reseñas destacadas de Google y Trustpilot,
// intercaladas, cada una en su idioma original y con la etiqueta de fuente,
// fecha e idioma; las largas se publican completas, sin recortar. La
// cabecera lleva dos insignias (Google y Trustpilot) con la nota y el
// número de reseñas de REVIEW_STATS. Las insignias son SVG/CSS propios: no
// se carga el script TrustBox de Trustpilot (cookies de terceros y peso).
import {
  getFeaturedReviews,
  REVIEW_STATS,
  REVIEW_TEXT,
  formatScore,
  sourceKey,
  sourceLabel,
} from "../../content/reviews";
import { SectionHeading } from "./ui";

const COPY = {
  es: {
    heading: "Opiniones de clientes",
    intro:
      "Reseñas publicadas en Google y Trustpilot por clientes reales, en el idioma en que las escribieron.",
    stars: (n) => `Valoración: ${n} de 5 estrellas`,
    trustScore: (n) => `TrustScore de Trustpilot: ${n} sobre 5`,
    newTab: "(se abre en una pestaña nueva)",
    langLabel: { es: "Español", en: "Inglés" },
    locale: "es-ES",
  },
  en: {
    heading: "Client reviews",
    intro:
      "Reviews published on Google and Trustpilot by real clients, in the language they wrote them in.",
    stars: (n) => `Rating: ${n} out of 5 stars`,
    trustScore: (n) => `Trustpilot TrustScore: ${n} out of 5`,
    newTab: "(opens in a new tab)",
    langLabel: { es: "Spanish", en: "English" },
    locale: "en-GB",
  },
};

const STAR_PATH =
  "M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.771l-7.416 3.642 1.48-8.279L0 9.306l8.332-1.151z";

export function Stars({ rating, label, size = 16 }) {
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
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  );
}

// Estrellas al estilo Trustpilot (casilla verde con estrella blanca), en
// SVG propio. Se rellenan por medias estrellas, como hace Trustpilot con el
// TrustScore (4,6 → cuatro y media); la cifra exacta va siempre al lado.
const TP_GREEN = "#00b67a";
const TP_EMPTY = "#dcdce6";
export function TrustpilotStars({ score, label, size = 18 }) {
  const halves = Math.floor(score * 2) / 2;
  return (
    <span className="inline-flex gap-[2px]" role="img" aria-label={label}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, halves - i));
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
            <rect width="24" height="24" fill={TP_EMPTY} />
            {fill > 0 ? <rect width={24 * fill} height="24" fill={TP_GREEN} /> : null}
            <path d={STAR_PATH} fill="#fff" transform="translate(3.6 3.6) scale(0.7)" />
          </svg>
        );
      })}
    </span>
  );
}

/**
 * Las dos insignias (Google y Trustpilot), cada una enlazada a su ficha.
 * La usan la sección «Opiniones» de la home y las fichas de EE. UU.
 */
export function ReviewBadges({ locale = "es", className = "" }) {
  const t = COPY[locale] || COPY.es;
  const r = REVIEW_TEXT[locale] || REVIEW_TEXT.es;
  const { google, trustpilot } = REVIEW_STATS;
  const linkClass =
    "link-nav inline-flex min-h-[44px] items-center gap-2 font-medium text-slate-900";
  return (
    <div className={`flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-6 ${className}`}>
      {google.count > 0 ? (
        <a
          href={google.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${r.google} ${t.newTab}`}
          className={linkClass}
        >
          <Stars
            rating={Math.round(google.rating)}
            label={t.stars(formatScore(google.rating, locale))}
            size={18}
          />
          <span>{r.google}</span>
        </a>
      ) : null}
      {trustpilot.count > 0 ? (
        <a
          href={trustpilot.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${r.trustpilot} ${t.newTab}`}
          className={linkClass}
        >
          <TrustpilotStars
            score={trustpilot.trustScore}
            label={t.trustScore(formatScore(trustpilot.trustScore, locale))}
          />
          <span>{r.trustpilot}</span>
        </a>
      ) : null}
    </div>
  );
}

export default function Reviews({ locale = "es", className = "" }) {
  const reviews = getFeaturedReviews();
  if (reviews.length === 0) return null;

  const t = COPY[locale] || COPY.es;
  const r = REVIEW_TEXT[locale] || REVIEW_TEXT.es;
  const { google, trustpilot } = REVIEW_STATS;

  return (
    <section id="opiniones" className={`scroll-mt-24 bg-stone-50 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionHeading>{t.heading}</SectionHeading>
            <p className="mt-3 max-w-[68ch] text-slate-600">{t.intro}</p>
          </div>
          <ReviewBadges locale={locale} className="shrink-0" />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {reviews.map((rv) => {
            const lang = rv.lang === "en" ? "en" : "es";
            const isTp = sourceKey(rv) === "trustpilot";
            return (
              <blockquote
                key={`${sourceKey(rv)}-${rv.name}-${rv.date}`}
                lang={lang}
                className="flex flex-col rounded-xl bg-white p-6 ring-1 ring-stone-200"
              >
                {rv.rating ? (
                  isTp ? (
                    <TrustpilotStars
                      score={rv.rating}
                      label={t.stars(rv.rating)}
                      size={16}
                    />
                  ) : (
                    <Stars rating={rv.rating} label={t.stars(rv.rating)} />
                  )
                ) : null}
                {rv.title ? (
                  <p className="mt-3 font-semibold text-slate-900">{rv.title}</p>
                ) : null}
                <p className={`${rv.title ? "mt-1" : "mt-3"} whitespace-pre-line text-slate-800`}>
                  {rv.text}
                </p>
                <footer className="mt-auto pt-4 text-sm text-slate-600">
                  <span className="font-medium text-slate-900">{rv.name}</span>
                  {/* Trámite (content/reviews.js → procedure), solo si Elena
                      lo ha rellenado; nunca se deduce del texto. */}
                  {rv.procedure?.[locale] ? (
                    <span className="mt-0.5 block text-slate-700">
                      {rv.procedure[locale]}
                    </span>
                  ) : null}
                  <span className="mt-0.5 block text-slate-500">
                    {sourceLabel(rv)} ·{" "}
                    {new Date(rv.date).toLocaleDateString(t.locale, {
                      year: "numeric",
                      month: "long",
                      ...(isTp ? { day: "numeric" } : {}),
                    })}{" "}
                    · {t.langLabel[lang]}
                  </span>
                </footer>
              </blockquote>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {google.count > 0 ? (
            <a
              href={google.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              {r.seeGoogle}
            </a>
          ) : null}
          {trustpilot.count > 0 ? (
            <a
              href={trustpilot.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              {r.seeTrustpilot}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
