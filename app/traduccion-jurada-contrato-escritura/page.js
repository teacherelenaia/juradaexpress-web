// app/traduccion-jurada-contrato-escritura/page.js
export const metadata = {
  title: "Traducción Jurada de Contratos y Escrituras – Español-Inglés",
  description:
    "Traducción jurada de contratos, escrituras y poderes Español ⇆ Inglés, para empresas, notarías y despachos de abogados en España y Reino Unido. Presupuesto a medida según el documento.",
  alternates: {
    canonical: "https://juradaexpress.es/traduccion-jurada-contrato-escritura",
  },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">
        Traducción jurada de contrato o escritura
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Traducimos contratos, escrituras, poderes y estatutos (Español ⇆
        Inglés) con firma y sello de traductor jurado, para empresas,
        notarías, despachos de abogados y autónomos que necesitan
        documentación mercantil con validez legal.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {[
          {
            t: "Válida oficialmente",
            d: "Firmada y sellada por traductor jurado, aceptada por notarías, despachos de abogados y organismos oficiales.",
          },
          {
            t: "Entrega 24/48 h",
            d: "Para documentos breves; contratos y escrituras extensos según calendario acordado.",
          },
          {
            t: "Presupuesto a medida",
            d: "Según extensión y complejidad del documento; te lo confirmamos al ver el archivo.",
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
          href="mailto:info@juradaexpress.es?subject=Presupuesto%20traducci%C3%B3n%20jurada%20contrato%20o%20escritura"
          className="inline-flex items-center rounded-xl bg-brand-navy px-5 py-3 text-white hover:bg-brand-navy-700"
        >
          Pedir presupuesto por email
        </a>
        <a
          href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20necesito%20traducir%20un%20contrato%20o%20escritura"
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
        También traducimos documentos en ambos sentidos: consulta nuestra página de <a href="/traduccion-jurada-espanol-ingles" className="underline hover:text-brand-gold-700">traducción jurada español-inglés e inglés-español</a>.
      </p>
    </main>
  );
}
