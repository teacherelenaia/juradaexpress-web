// app/components/FollowUs.js
// Bloque "Síguenos" antes del footer de la home. Solo se muestra si hay
// perfiles con URL en content/site.js.
import SocialIcons from "./SocialIcons";
import { INSTAGRAM_URL, FACEBOOK_URL } from "../../content/site";

const COPY = {
  es: {
    heading: "Síguenos",
    text: "Consejos breves sobre trámites y traducción jurada, en Instagram y Facebook.",
  },
  en: {
    heading: "Follow us",
    text: "Short, practical tips on Spanish paperwork and sworn translation, on Instagram and Facebook.",
  },
};

export default function FollowUs({ locale = "es" }) {
  if (!INSTAGRAM_URL && !FACEBOOK_URL) return null;
  const t = COPY[locale] || COPY.es;

  return (
    <section className="bg-stone-50">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-10 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-2xl font-semibold leading-snug tracking-[-0.02em] text-slate-900">
            {t.heading}
          </h2>
          <p className="mt-1 max-w-xl text-sm text-slate-600">{t.text}</p>
        </div>
        <SocialIcons
          className="text-brand-navy"
          iconClassName="h-6 w-6"
        />
      </div>
    </section>
  );
}
