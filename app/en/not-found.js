// app/en/not-found.js
// 404 en inglés: buscador de documentos + CTA (misma estructura que la ES).
import NotFoundSearch from "../components/NotFoundSearch";
import HtmlLang from "../components/HtmlLang";
import { FICHAS } from "../../content/fichas";
import { WHATSAPP_URL_EN } from "../../content/site";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  const items = FICHAS.map((f) => ({
    href: `/${f.slug}`,
    label: f.name,
  }));

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <HtmlLang lang="en" />
      <p className="text-sm font-medium text-brand-gold-700">Error 404</p>
      <h1 className="font-display text-balance mt-2 text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">
        This page does not exist (or has moved)
      </h1>
      <p className="mt-4 max-w-[68ch] text-slate-600">
        The link may be misspelt or the page may have moved. What is still
        here: your documents, their prices and the way to request a quote.
      </p>

      <NotFoundSearch items={items} />

      <div className="mt-8 flex flex-wrap gap-3">
        <a href="/en" className="btn btn-primary">
          Go to the home page
        </a>
        <a href="/en/documentos" className="btn btn-secondary">
          See the catalogue
        </a>
        <a
          href={WHATSAPP_URL_EN}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          WhatsApp
        </a>
      </div>
    </main>
  );
}
