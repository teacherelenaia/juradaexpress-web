"use client";

// app/components/NotFoundSearch.js
// Buscador de documentos de la página 404: filtra las fichas por texto en
// el propio navegador, sin peticiones.
import { useState } from "react";

export default function NotFoundSearch({ items }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const results = q
    ? items.filter((i) => i.label.toLowerCase().includes(q))
    : items;

  return (
    <div className="mt-6">
      <label htmlFor="doc-search" className="text-sm font-medium text-slate-700">
        Busca tu documento
      </label>
      <input
        id="doc-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="partida de nacimiento, título, penales…"
        className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
      />
      {results.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {results.map((i) => (
            <li key={i.href}>
              <a href={i.href} className="link">
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-slate-600">
          No encuentro ese documento en las guías, pero seguro que puedo
          traducirlo:{" "}
          <a href="/documentos" className="link">
            pide presupuesto en el catálogo
          </a>{" "}
          o escríbeme por WhatsApp.
        </p>
      )}
    </div>
  );
}
