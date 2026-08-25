// app/traduccion-jurada-certificado-matrimonio/page.js
export const metadata = {
  title: "Traducción Jurada de Certificado de Matrimonio – Español-Inglés",
  description:
    "Traducción jurada de certificado de matrimonio Español ⇆ Inglés, para trámites de nacionalidad, extranjería y registro civil en España y Reino Unido. Válida ante organismos oficiales y consulados. Entrega 24/48 h.",
  alternates: {
    canonical:
      "https://juradaexpress.es/traduccion-jurada-certificado-matrimonio",
  },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">
        Traducción jurada de certificado de matrimonio
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Traducimos tu certificado de matrimonio (Español ⇆ Inglés) con firma
        y sello de traductor jurado, válida ante registros civiles,
        consulados y organismos de extranjería, para trámites de
        nacionalidad, reagrupación familiar o cambios de estado civil.
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
            d: "Precio orientativo de 35 € para el documento estándar; te lo confirmamos antes de empezar.",
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
          href="mailto:info@juradaexpress.es?subject=Presupuesto%20traducci%C3%B3n%20jurada%20certificado%20de%20matrimonio"
          className="btn btn-primary"
        >
          Pedir presupuesto por email
        </a>
        <a
          href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20necesito%20traducir%20un%20certificado%20de%20matrimonio"
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
        Para los mismos trámites también solemos traducir la <a href="/traduccion-jurada-partida-nacimiento" className="link">partida de nacimiento</a> y el <a href="/traduccion-jurada-certificado-penales" className="link">certificado de antecedentes penales</a>.
      </p>
    </main>
  );
}
