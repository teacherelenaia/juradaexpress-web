// app/not-found.js
// 404 personalizada: buscador de documentos + CTA (auditoría 5.2.7).
import NotFoundSearch from "./components/NotFoundSearch";
import { FICHAS } from "../content/fichas";
import { WHATSAPP_URL } from "../content/site";

export const metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  const items = FICHAS.map((f) => ({
    href: `/${f.slug}`,
    label: f.name,
  }));

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <p className="text-sm font-medium text-brand-gold-700">Error 404</p>
      <h1 className="font-display text-balance mt-2 text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">
        Esta página no existe (o ha cambiado de sitio)
      </h1>
      <p className="mt-4 max-w-[68ch] text-slate-600">
        Puede que el enlace esté mal escrito o que la página se haya movido.
        Lo que seguro que sigue aquí: tus documentos, sus precios y la forma
        de pedir presupuesto.
      </p>

      <NotFoundSearch items={items} />

      <div className="mt-8 flex flex-wrap gap-3">
        <a href="/" className="btn btn-primary">
          Ir a la portada
        </a>
        <a href="/documentos" className="btn btn-secondary">
          Ver el catálogo
        </a>
        <a
          href={WHATSAPP_URL}
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
