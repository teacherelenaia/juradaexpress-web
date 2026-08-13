// app/traduccion-jurada-partida-nacimiento/page.js
export const metadata = {
  title: "Traducción Jurada de Partida de Nacimiento – Murcia",
  description:
    "Traducción jurada de partida/certificado de nacimiento en Murcia. Válida ante organismos oficiales. Entrega 24/48 h. Presupuesto inmediato.",
  alternates: {
    canonical: "https://juradaexpress.es/traduccion-jurada-partida-nacimiento",
  },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">
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
          <div key={i.t} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <h2 className="font-semibold">{i.t}</h2>
            <p className="mt-2 text-sm text-slate-600">{i.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="mailto:info@juradaexpress.es?subject=Presupuesto%20traducci%C3%B3n%20jurada%20partida%20de%20nacimiento"
          className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
        >
          Pedir presupuesto por email
        </a>
        <a
          href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20necesito%20traducir%20una%20partida%20de%20nacimiento"
          className="inline-flex items-center rounded-xl border border-emerald-200 bg-white px-5 py-3 text-emerald-900 hover:bg-emerald-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp inmediato
        </a>
      </div>

      <p className="mt-8 text-sm text-slate-500">
        * Consulta también nuestros <a href="/precios" className="underline hover:text-emerald-700">precios orientativos</a>.
      </p>
    </main>
  );
}
