// app/traduccion-jurada-titulo-universitario/page.js
export const metadata = {
  title: "Traducción Jurada de Título Universitario – Murcia",
  description:
    "Traducción jurada de título universitario y expediente académico en Murcia. Válida para universidades y organismos oficiales. Entrega 24/48 h.",
  alternates: {
    canonical:
      "https://juradaexpress.es/traduccion-jurada-titulo-universitario",
  },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">
        Traducción jurada de título universitario
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Traducimos tu título universitario, expediente académico o
        certificado de notas (Español ⇆ Inglés) con firma y sello de
        traductor jurado, válida para procesos de homologación, becas y
        admisión en universidades.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {[
          {
            t: "Aceptada por universidades",
            d: "Válida para homologación, convalidación y procesos de admisión.",
          },
          {
            t: "Entrega 24/48 h",
            d: "Para expedientes breves; documentos extensos según calendario acordado.",
          },
          {
            t: "Presupuesto cerrado",
            d: "Precio final al ver el documento, sin sorpresas.",
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
          href="mailto:info@juradaexpress.es?subject=Presupuesto%20traducci%C3%B3n%20jurada%20t%C3%ADtulo%20universitario"
          className="inline-flex items-center rounded-xl bg-brand-navy px-5 py-3 text-white hover:bg-brand-navy-700"
        >
          Pedir presupuesto por email
        </a>
        <a
          href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20necesito%20traducir%20un%20t%C3%ADtulo%20universitario"
          className="inline-flex items-center rounded-xl border border-brand-gold-200 bg-white px-5 py-3 text-brand-navy hover:bg-brand-gold-50"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp inmediato
        </a>
      </div>

      <p className="mt-8 text-sm text-slate-500">
        * Consulta también nuestros <a href="/precios" className="underline hover:text-brand-gold-700">precios orientativos</a>.
      </p>
    </main>
  );
}
