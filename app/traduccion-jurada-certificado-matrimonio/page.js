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
      <h1 className="text-3xl font-bold">
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
          <div key={i.t} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <h2 className="font-semibold">{i.t}</h2>
            <p className="mt-2 text-sm text-slate-600">{i.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="mailto:info@juradaexpress.es?subject=Presupuesto%20traducci%C3%B3n%20jurada%20certificado%20de%20matrimonio"
          className="inline-flex items-center rounded-xl bg-brand-navy px-5 py-3 text-white hover:bg-brand-navy-700"
        >
          Pedir presupuesto por email
        </a>
        <a
          href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20necesito%20traducir%20un%20certificado%20de%20matrimonio"
          className="inline-flex items-center rounded-xl border border-brand-gold-200 bg-white px-5 py-3 text-brand-navy hover:bg-brand-gold-50"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp inmediato
        </a>
      </div>

      <p className="mt-8 text-sm text-slate-500">
        * Consulta también nuestros <a href="/precios" className="underline hover:text-brand-gold-700">precios orientativos</a> o <a href="/contacto" className="underline hover:text-brand-gold-700">contáctanos</a> si tienes dudas.
      </p>

      <p className="mt-2 text-sm text-slate-500">
        Para los mismos trámites también solemos traducir la <a href="/traduccion-jurada-partida-nacimiento" className="underline hover:text-brand-gold-700">partida de nacimiento</a> y el <a href="/traduccion-jurada-certificado-penales" className="underline hover:text-brand-gold-700">certificado de antecedentes penales</a>.
      </p>
    </main>
  );
}
