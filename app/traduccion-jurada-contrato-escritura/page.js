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
      <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">
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
          <div key={i.t} className="rounded-xl bg-white p-5 ring-1 ring-stone-200">
            <h2 className="text-2xl font-semibold leading-snug text-slate-900 md:text-3xl">{i.t}</h2>
            <p className="mt-2 text-sm text-slate-600">{i.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="mailto:info@juradaexpress.es?subject=Presupuesto%20traducci%C3%B3n%20jurada%20contrato%20o%20escritura"
          className="btn btn-primary"
        >
          Pedir presupuesto por email
        </a>
        <a
          href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20necesito%20traducir%20un%20contrato%20o%20escritura"
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
        También traducimos documentos en ambos sentidos: consulta nuestra página de <a href="/traduccion-jurada-espanol-ingles" className="link">traducción jurada español-inglés e inglés-español</a>.
      </p>
    </main>
  );
}
