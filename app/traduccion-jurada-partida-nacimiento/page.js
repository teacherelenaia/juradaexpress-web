// app/traduccion-jurada-partida-nacimiento/page.js
export const metadata = {
  title: "Traducción Jurada de Partida de Nacimiento – Español-Inglés",
  description:
    "Traducción jurada de partida/certificado de nacimiento Español ⇆ Inglés, para trámites en España y Reino Unido. Válida ante organismos oficiales. Entrega 24/48 h. Presupuesto inmediato.",
  alternates: {
    canonical: "https://juradaexpress.es/traduccion-jurada-partida-nacimiento",
  },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">
        Traducción jurada de partida de nacimiento
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Traducimos tu partida o certificado de nacimiento (Español ⇆ Inglés)
        con firma y sello de traductor jurado, válida ante registros civiles,
        consulados, universidades y demás organismos oficiales.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {[
          {
            t: "Válida oficialmente",
            d: "Firmada y sellada por traductor jurado, aceptada por registros civiles y consulados.",
          },
          {
            t: "Entrega 24/48 h",
            d: "Plazo habitual para este tipo de documento breve.",
          },
          {
            t: "Presupuesto cerrado",
            d: "Envíanos el escaneo y te confirmamos precio y plazo antes de empezar.",
          },
        ].map((i) => (
          <div key={i.t} className="rounded-xl bg-white p-5 ring-1 ring-stone-200">
            <h2 className="text-2xl font-semibold leading-snug text-slate-900 md:text-3xl">{i.t}</h2>
            <p className="mt-2 text-sm text-slate-600">{i.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="mailto:info@juradaexpress.es?subject=Presupuesto%20traducci%C3%B3n%20jurada%20partida%20de%20nacimiento"
          className="btn btn-primary"
        >
          Pedir presupuesto por email
        </a>
        <a
          href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20necesito%20traducir%20una%20partida%20de%20nacimiento"
          className="btn btn-secondary"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp inmediato
        </a>
      </div>

      <p className="mt-8 text-sm text-slate-500">
        * Consulta también nuestros <a href="/precios" className="link">precios orientativos</a> o <a href="/contacto" className="link">contáctanos</a> si tienes dudas.
      </p>

      <p className="mt-2 text-sm text-slate-500">
        Para trámites de nacionalidad o extranjería también solemos traducir el <a href="/traduccion-jurada-certificado-penales" className="link">certificado de antecedentes penales</a>.
      </p>
    </main>
  );
}
