// app/page.js
export const metadata = {
  title: "Traducción Jurada en Murcia — Español ⇆ Inglés",
  description:
    "Traductor jurado en Murcia. Envíos a toda España y extranjero. Entrega 24/48 h. Pide presupuesto inmediato por email o WhatsApp.",
  alternates: { canonical: "https://juradaexpress.es/" },
};

export default function Page() {
  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold leading-tight">
              Traducción <span className="text-emerald-700">Jurada</span> en Murcia
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Español ⇆ Inglés · Envíos a toda España y extranjero · Entrega 24/48 h.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:info@juradaexpress.es?subject=Presupuesto%20traducci%C3%B3n%20jurada"
                className="rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
              >
                Pedir presupuesto
              </a>
              <a
                href="/precios"
                className="rounded-xl border border-emerald-200 bg-white px-5 py-3 text-emerald-900 hover:bg-emerald-100"
              >
                Ver precios
              </a>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              * Proyectos &gt;20 folios: acordamos calendario y faseado.
            </p>
          </div>
          <div className="flex justify-center">
            <img src="/hero.jpg" alt="Traducción jurada" className="max-h-72 rounded-2xl shadow" />
          </div>
        </div>
      </section>

      {/* Beneficios / Servicios resumidos */}
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-3">
          {[
            { t: "Certificados", d: "Nacimiento, matrimonio, penales, notaría… 24/48 h." },
            { t: "Académicos", d: "Títulos, expedientes, planes de estudio." },
            { t: "Contratos", d: "Mercantiles, laborales, poderes. Presupuesto al ver los docs." },
          ].map((i) => (
            <div key={i.t} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              <h3 className="font-semibold">{i.t}</h3>
              <p className="mt-2 text-slate-600">{i.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA inferior */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="rounded-2xl bg-emerald-50 p-8 ring-1 ring-emerald-100">
          <h2 className="text-2xl font-semibold">¿Necesitas tu traducción jurada?</h2>
          <p className="mt-2 text-slate-700">
            Envíanos el documento escaneado y te respondemos con presupuesto cerrado.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="mailto:info@juradaexpress.es?subject=Presupuesto%20traducci%C3%B3n%20jurada"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
            >
              Enviar por email
            </a>
            <a
              href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20quisiera%20un%20presupuesto"
              className="rounded-xl border border-emerald-200 bg-white px-5 py-3 text-emerald-900 hover:bg-emerald-100"
              target="_blank" rel="noopener noreferrer"
            >
              WhatsApp inmediato
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

