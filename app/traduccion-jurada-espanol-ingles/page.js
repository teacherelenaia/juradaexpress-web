// app/traduccion-jurada-espanol-ingles/page.js
export const metadata = {
  title: "Traducción Jurada Español-Inglés e Inglés-Español – Murcia",
  description:
    "Traducción jurada español ingles e traducción jurada ingles español, realizada por traductor jurado oficial. Entrega 24/48 h y validez legal en toda España.",
  alternates: {
    canonical: "https://juradaexpress.es/traduccion-jurada-espanol-ingles",
  },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">
        Traducción jurada español-inglés e inglés-español
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Realizamos traducción jurada español ingles y traducción jurada
        ingles español para particulares y empresas de toda España, Reino
        Unido y el extranjero. Como traductores jurados nombrados por el
        Ministerio de Asuntos Exteriores, nuestras traducciones tienen plena
        validez legal ante cualquier organismo.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {[
          {
            t: "Ambos sentidos",
            d: "Español a inglés e inglés a español, con el mismo traductor jurado oficial.",
          },
          {
            t: "Entrega 24/48 h",
            d: "Para documentos breves; plazos a medida para expedientes extensos.",
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
          href="mailto:info@juradaexpress.es?subject=Presupuesto%20traducci%C3%B3n%20jurada%20espa%C3%B1ol-ingl%C3%A9s"
          className="inline-flex items-center rounded-xl bg-brand-navy px-5 py-3 text-white hover:bg-brand-navy-700"
        >
          Pedir presupuesto por email
        </a>
        <a
          href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20necesito%20una%20traducci%C3%B3n%20jurada%20espa%C3%B1ol-ingl%C3%A9s"
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
