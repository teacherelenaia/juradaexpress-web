// app/traduccion-jurada-validez-oficial/page.js
export const metadata = {
  title: "Traducción Jurada Válida ante Organismos Oficiales y Consulados – Murcia",
  description:
    "Traducción jurada válida ante organismos oficiales, universidades y consulados. Certificados oficiales traducidos por traductor jurado en Murcia.",
  alternates: {
    canonical: "https://juradaexpress.es/traduccion-jurada-validez-oficial",
  },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold leading-tight text-slate-900">
        Traducción jurada válida ante organismos oficiales, universidades y consulados
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Nuestras traducciones de certificados oficiales tienen plena validez
        ante organismos oficiales, universidades y consulados en España y en
        el extranjero, ya que están firmadas y selladas por un traductor
        jurado habilitado por el Ministerio de Asuntos Exteriores.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {[
          {
            t: "Válida ante organismos oficiales",
            d: "Homologaciones, nacionalidad, residencia y trámites administrativos.",
          },
          {
            t: "Aceptada por universidades",
            d: "Válida para admisión, convalidación y homologación de estudios.",
          },
          {
            t: "Válida ante consulados",
            d: "Aceptada en trámites consulares y de embajadas sin gestiones extra.",
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
          href="mailto:info@juradaexpress.es?subject=Presupuesto%20traducci%C3%B3n%20jurada%20de%20certificado%20oficial"
          className="btn btn-primary"
        >
          Pedir presupuesto por email
        </a>
        <a
          href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20necesito%20traducir%20un%20certificado%20oficial"
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
        Es habitual necesitar esta validez, por ejemplo, en la <a href="/traduccion-jurada-titulo-universitario" className="link">traducción jurada de un título universitario</a>.
      </p>
    </main>
  );
}
