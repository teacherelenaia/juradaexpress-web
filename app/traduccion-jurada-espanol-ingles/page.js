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
      <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">
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
          <div key={i.t} className="rounded-xl bg-white p-5 ring-1 ring-stone-200">
            <h2 className="text-2xl font-semibold leading-snug text-slate-900 md:text-3xl">{i.t}</h2>
            <p className="mt-2 text-sm text-slate-600">{i.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="mailto:info@juradaexpress.es?subject=Presupuesto%20traducci%C3%B3n%20jurada%20espa%C3%B1ol-ingl%C3%A9s"
          className="btn btn-primary"
        >
          Pedir presupuesto por email
        </a>
        <a
          href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20necesito%20una%20traducci%C3%B3n%20jurada%20espa%C3%B1ol-ingl%C3%A9s"
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
        Documentos que más solemos traducir en este par de idiomas: <a href="/traduccion-jurada-partida-nacimiento" className="link">partida de nacimiento</a>, <a href="/traduccion-jurada-titulo-universitario" className="link">título universitario</a> y <a href="/traduccion-jurada-certificado-penales" className="link">certificado de antecedentes penales</a>.
      </p>
    </main>
  );
}
