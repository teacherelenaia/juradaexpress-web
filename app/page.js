// app/page.js
export const metadata = {
  title: "Traducción Jurada en Murcia — Español ⇆ Inglés",
  description:
    "Traductor jurado en Murcia. Envíos a toda España y extranjero. Entrega 24/48 h. Pide presupuesto inmediato por email o WhatsApp.",
  alternates: { canonical: "https://juradaexpress.es/" },
};

export default function Page() {
  return (
    <main className="bg-white">
      {/* HERO con fondo suave */}
      <section className="relative">
        {/* Degradado de fondo muy sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-white" />
        {/* Radial suave */}
        <div className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-100/40 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            {/* Texto */}
            <div>
              <h1 className="text-4xl font-bold leading-tight">
                Traducción <span className="text-emerald-700">Jurada</span> en Murcia (Español ⇆ Inglés)
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                Envíos a toda España y al extranjero · Entrega 24/48 h · Presupuesto inmediato.
              </p>

              {/* Badges de confianza */}
              <div className="mt-5 flex flex-wrap gap-2">
                {["24/48 h", "Envío España y extranjero", "Digital + papel"].map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-sm text-emerald-900"
                  >
                    {b}
                  </span>
                ))}
              </div>

              {/* CTA */}
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
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-emerald-200 bg-white px-5 py-3 text-emerald-900 hover:bg-emerald-100"
                >
                  WhatsApp inmediato
                </a>
              </div>

              <p className="mt-3 text-sm text-slate-500">
                * Proyectos &gt;20 folios: acordamos calendario y faseado.
              </p>
            </div>

            {/* Imagen hero */}
            <div className="flex justify-center">
              <figure className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200">
                <img
                  src="/hero-murcia.jpg"
                  alt="Catedral de Murcia — JuradaExpress"
                  className="max-h-96 w-full object-cover"
                  width="720"
                  height="540"
                />
                <figcaption className="bg-white/70 px-3 py-2 text-center text-xs text-slate-600">
                  Catedral de Murcia · JuradaExpress
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* Wave separadora */}
        <svg className="relative -mb-1 w-full text-emerald-50" viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M0,48L48,69.3C96,91,192,133,288,128C384,123,480,69,576,64C672,59,768,101,864,112C960,123,1056,101,1152,80C1248,59,1344,37,1392,26.7L1440,16L1440,80L1392,80C1344,80,1248,80,1152,80C1056,80,960,80,864,80C768,80,672,80,576,80C480,80,384,80,288,80C192,80,96,80,48,80L0,80Z"
          />
        </svg>
      </section>

      {/* SERVICIOS */}
      <section className="bg-emerald-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold">Documentos más habituales</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              {
                t: "Certificados oficiales",
                d: "Nacimiento, matrimonio, penales, padrón, notaría…",
                img: "/docs-real.jpg",
                alt: "Traducción jurada de certificados oficiales",
              },
              {
                t: "Académicos",
                d: "Títulos, expedientes, planes de estudio, cartas académicas.",
                img: "/academicos.jpg",
                alt: "Traducción jurada de documentos académicos",
              },
              {
                t: "Laborales y mercantiles",
                d: "Contratos, poderes, escrituras, estatutos.",
                img: "/mercantiles.jpg",
                alt: "Traducción jurada de contratos y documentos mercantiles",
              },
            ].map((i) => (
              <article key={i.t} className="rounded-2xl bg-white ring-1 ring-slate-200 transition hover:shadow-md">
                <img src={i.img} alt={i.alt} className="h-44 w-full rounded-t-2xl object-cover" />
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

      {/* SEO local Murcia: texto corto */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-semibold">Traductor jurado en Murcia</h2>
        <p className="mt-4 max-w-3xl text-slate-600">
          Ofrecemos traducción jurada (Español ⇆ Inglés) válida ante organismos oficiales, universidades y
          consulados. Servicio rápido, envío a toda España y posibilidad de entrega digital y en papel. Si
          necesitas un traductor jurado en Murcia, te damos precio cerrado y plazo real en minutos.
        </p>

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

      {/* BOTÓN FLOTANTE WHATSAPP */}
      <a
        href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20quisiera%20un%20presupuesto"
        aria-label="WhatsApp JuradaExpress"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-emerald-600 text-white shadow-lg transition hover:bg-emerald-700"
      >
        {/* icono simple */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-7 w-7 fill-current">
          <path d="M19.11 17.42c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.15-1.33-.79-.7-1.33-1.56-1.49-1.82-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3s.99 2.67 1.13 2.85c.14.18 1.95 2.98 4.74 4.18.66.28 1.18.45 1.58.58.66.21 1.27.18 1.75.11.53-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z"/><path d="M16 3C9.38 3 4 8.38 4 15c0 2.55.84 4.91 2.27 6.81L5 29l7.35-1.92A11.96 11.96 0 0 0 16 27c6.62 0 12-5.38 12-12S22.62 3 16 3zm0 22c-1.93 0-3.72-.57-5.22-1.57L6 24l.58-4.62A8.96 8.96 0 0 1 7 15c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9z"/>
        </svg>
      </a>
    </main>
  );
}

