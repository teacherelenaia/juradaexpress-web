// app/traduccion-jurada-certificado-penales/page.js
export const metadata = {
  title: "Traducción Jurada de Certificado de Penales – Español-Inglés",
  description:
    "Traducción jurada de certificado de antecedentes penales Español ⇆ Inglés, para trámites en España y Reino Unido. Válida ante organismos oficiales y consulados. Entrega 24/48 h.",
  alternates: {
    canonical:
      "https://juradaexpress.es/traduccion-jurada-certificado-penales",
  },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold leading-tight text-slate-900">
        Traducción jurada de certificado de penales
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Traducimos tu certificado de antecedentes penales (Español ⇆ Inglés)
        con firma y sello de traductor jurado, válida para trámites de
        visado, residencia, empleo o solicitudes ante consulados y
        embajadas.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {[
          {
            t: "Válida oficialmente",
            d: "Aceptada por consulados, embajadas y organismos de extranjería.",
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
          <div key={i.t} className="rounded-2xl bg-white p-5 ring-1 ring-stone-200">
            <h2 className="text-2xl font-semibold leading-snug text-slate-900 md:text-3xl">{i.t}</h2>
            <p className="mt-2 text-sm text-slate-600">{i.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="mailto:info@juradaexpress.es?subject=Presupuesto%20traducci%C3%B3n%20jurada%20certificado%20de%20penales"
          className="btn btn-primary"
        >
          Pedir presupuesto por email
        </a>
        <a
          href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20necesito%20traducir%20un%20certificado%20de%20penales"
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
        Para trámites de nacionalidad o extranjería también solemos traducir la <a href="/traduccion-jurada-partida-nacimiento" className="link">partida de nacimiento</a>.
      </p>
    </main>
  );
}
