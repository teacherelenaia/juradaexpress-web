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
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold leading-tight">
              Traducción <span className="text-emerald-700">Jurada</span> en Murcia (Español ⇆ Inglés)
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Envíos a toda España y al extranjero · Entrega 24/48 h · Presupuesto inmediato.
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
              <a
                href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20quisiera%20un%20presupuesto"
                target="_blank" rel="noopener noreferrer"
                className="rounded-xl border border-emerald-200 bg-white px-5 py-3 text-emerald-900 hover:bg-emerald-100"
              >
                WhatsApp inmediato
              </a>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              * Proyectos &gt;20 folios: acordamos calendario y faseado.
            </p>
          </div>
          <div className="flex justify-center">
            <img src="/hero.jpg" alt="Traducción jurada" className="max-h-80 rounded-2xl shadow" />
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold">Documentos más habituales</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              { t: "Certificados oficiales", d: "Nacimiento, matrimonio, penales, padrón, notaría…", img: "/docs.jpg" },
              { t: "Académicos", d: "Títulos, expedientes, planes de estudio, cartas académicas.", img: "/people.jpg" },
              { t: "Laborales y mercantiles", d: "Contratos, poderes, escrituras, estatutos.", img: "/hero.jpg" },
            ].map((i) => (
              <article key={i.t} className="rounded-2xl bg-white ring-1 ring-slate-200 hover:shadow">
                <img src={i.img} alt={i.t} className="h-44 w-full rounded-t-2xl object-cover" />
                <div className="p-5">
                  <h3 className="font-semibold">{i.t}</h3>
                  <p className="mt-2 text-sm text-slate-600">{i.d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-semibold">¿Cómo trabajamos?</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-4">
          {[
            { t: "1. Envío", d: "Envíanos el documento escaneado por email o WhatsApp." },
            { t: "2. Presupuesto", d: "Te damos precio cerrado y plazo real." },
            { t: "3. Traducción jurada", d: "Firmada y sellada por traductor jurado." },
            { t: "4. Entrega 24/48 h", d: "Digital y/o papel, con envío a tu dirección." },
          ].map((i) => (
            <div key={i.t} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <h3 className="font-semibold">{i.t}</h3>
              <p className="mt-2 text-sm text-slate-600">{i.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VENTAJAS */}
      <section className="bg-emerald-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold">Por qué elegir JuradaExpress</h2>
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              "Traducción jurada válida ante organismos oficiales.",
              "Entrega rápida 24/48 h. Envíos a toda España y extranjero.",
              "Atención directa por email y WhatsApp. Presupuesto inmediato.",
            ].map((li) => (
              <li key={li} className="rounded-2xl bg-white p-5 ring-1 ring-emerald-100">
                {li}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* OPINIONES */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-semibold">Opiniones</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            { n: "María G.", t: "Rápidos y profesionales. Me enviaron versión digital y luego en papel." },
            { n: "Javier R.", t: "Muy buena comunicación y precio correcto. Repetiré si lo necesito." },
            { n: "Elisa P.", t: "Necesitaba urgencia y cumplieron el plazo sin problema." },
          ].map((op) => (
            <blockquote key={op.n} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <p>“{op.t}”</p>
              <footer className="mt-3 text-sm text-slate-600">— {op.n}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="rounded-2xl bg-emerald-600 p-8 text-white">
          <h2 className="text-2xl font-semibold">¿Empezamos?</h2>
          <p className="mt-2 text-emerald-100">
            Envíanos el documento y te respondemos con presupuesto y plazo.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="mailto:info@juradaexpress.es?subject=Presupuesto%20traducci%C3%B3n%20jurada"
              className="rounded-xl bg-white px-5 py-3 text-emerald-700 hover:bg-emerald-50"
            >
              Pedir presupuesto
            </a>
            <a
              href="/precios"
              className="rounded-xl border border-white/40 px-5 py-3 text-white hover:bg-white/10"
            >
              Ver precios
            </a>
          </div>
        </div>
      </section>

      {/* FAQ (ayuda SEO + UX) */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-semibold">Preguntas frecuentes</h2>
        <div className="mt-6 divide-y rounded-2xl ring-1 ring-slate-200 bg-white">
          {[
            {
              q: "¿La traducción jurada es válida en todo el territorio?",
              a: "Sí. Las traducciones juradas firmadas y selladas por traductor jurado son válidas ante organismos oficiales.",
            },
            {
              q: "¿Entregáis en papel y digital?",
              a: "Sí. Entregamos PDF firmado digitalmente y, si lo necesitas, envío físico a tu dirección.",
            },
            {
              q: "¿Puedo tener la traducción en 24/48 h?",
              a: "Para documentos habituales, sí. Si son más de 20 folios, acordamos un calendario específico.",
            },
          ].map((f, idx) => (
            <details key={idx} className="p-5">
              <summary className="cursor-pointer font-medium">{f.q}</summary>
              <p className="mt-2 text-sm text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>

        {/* JSON-LD FAQ para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "¿La traducción jurada es válida en todo el territorio?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Sí. Las traducciones juradas firmadas y selladas por traductor jurado son válidas ante organismos oficiales.",
                  },
                },
                {
                  "@type": "Question",
                  name: "¿Entregáis en papel y digital?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Sí. Entregamos PDF firmado digitalmente y, si lo necesitas, envío físico a tu dirección.",
                  },
                },
                {
                  "@type": "Question",
                  name: "¿Puedo tener la traducción en 24/48 h?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Para documentos habituales, sí. Si son más de 20 folios, acordamos un calendario específico.",
                  },
                },
              ],
            }),
          }}
        />
      </section>
    </main>
  );
}

