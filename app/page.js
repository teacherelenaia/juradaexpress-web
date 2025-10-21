// app/page.js

export default function Page() {
  const phone = "+34 685 891 214";
  const email = "info@juradaexpress.es";
  const whatsappLink =
    "https://wa.me/34685891214?text=Hola%20JuradaExpress,%20quisiera%20un%20presupuesto";

  return (
    <>
      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "JuradaExpress",
            url: "https://juradaexpress.es",
            email,
            telephone: phone,
            areaServed: "ES",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Murcia",
              addressCountry: "ES",
            },
            sameAs: ["https://juradaexpress.es"],
            description:
              "Traducciones juradas de Español ⇆ Inglés en Murcia. Envíos a toda España y extranjero. Entrega 24/48 h orientativa.",
            openingHours: "Mo-Fr 09:00-19:00",
          }),
        }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-50 to-white ring-1 ring-slate-100">
        <div className="mx-auto grid max-w-6xl px-4 py-14 lg:grid-cols-2 lg:gap-10 lg:py-20">
          <div>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100">
              Traducción jurada Español ⇆ Inglés
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Traducciones juradas con <span className="text-emerald-700">entrega 24/48 h*</span> desde Murcia
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Servicio oficial firmado y sellado por traductor/a jurado/a. Envíos
              a toda España y extranjero. Presupuesto en minutos — digital o papel.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${email}?subject=Presupuesto%20traducci%C3%B3n%20jurada`}
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                Pedir presupuesto por email
              </a>
              <a
                href={whatsappLink}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp inmediato
              </a>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              * Plazo orientativo 24/48 h para encargos habituales. Proyectos de
              más de <strong>20 folios</strong> deben solicitar plazo específico.
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm text-slate-600 sm:grid-cols-3">
              <div>
                <dt className="font-semibold text-slate-900">Ámbito</dt>
                <dd>Murcia · Envíos a toda España y extranjero</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Idiomas</dt>
                <dd>Español ⇆ Inglés</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Contacto</dt>
                <dd>
                  <a className="underline hover:text-emerald-700" href={`tel:${phone}`}>
                    {phone}
                  </a>{" "}
                  ·{" "}
                  <a className="underline hover:text-emerald-700" href={`mailto:${email}`}>
                    {email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div aria-hidden className="mt-10 lg:mt-0">
            <img
              src="/hero.jpg"
              alt=""
              className="mx-auto rounded-2xl border border-slate-100 shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* SELLOS DE CONFIANZA */}
      <section className="mx-auto mt-12 max-w-6xl px-4">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Firma y sello oficiales",
            "Entrega digital y en papel",
            "Presupuesto en minutos",
            "Envíos 24/48 h*",
          ].map((t) => (
            <li
              key={t}
              className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm text-slate-700"
            >
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-600" />
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* SERVICIOS */}
      <section className="mx-auto mt-16 max-w-6xl px-4">
        <h2 className="text-2xl font-bold text-slate-900">Qué traducimos</h2>
        <p className="mt-2 text-slate-600">
          Traducción jurada de documentos personales, académicos y empresariales entre Español e Inglés:
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Certificados y registros", "Nacimiento, matrimonio, antecedentes, penales, empadronamiento, etc."],
            ["Académicos", "Títulos, expedientes, diplomas, programas, cartas de recomendación."],
            ["Legales y notariales", "Poderes, escrituras, resoluciones, contratos, demandas."],
            ["Empresas", "Estatutos, cuentas anuales, informes, acuerdos, licitaciones."],
            ["Sanidad", "Informes médicos, vacunación, altas, resultados de laboratorio."],
            ["Otros", "Permiso de conducir, facturas, nóminas, y más."],
          ].map(([title, desc]) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <h3 className="font-semibold text-slate-900">{title}</h3>
              <p className="mt-1 text-sm text-slate-600">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* PROCESO */}
      <section className="mx-auto mt-16 max-w-6xl px-4">
        <h2 className="text-2xl font-bold text-slate-900">Cómo funciona</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["1. Envíanos el documento", `Foto clara o PDF a ${email} o por WhatsApp.`],
            ["2. Presupuesto", "Te confirmamos precio y plazo (24/48 h habitual)."],
            ["3. Traducción jurada", "Firma y sello oficiales. Copia digital incluida."],
            ["4. Envío/recogida", "Entrega digital inmediata y envío físico si lo necesitas."],
          ].map(([title, desc]) => (
            <li key={title} className="rounded-2xl border border-slate-100 bg-white p-5">
              <p className="font-semibold text-slate-900">{title}</p>
              <p className="mt-1 text-sm text-slate-600">{desc}</p>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-sm text-slate-500">
          * Para encargos superiores a <strong>20 folios</strong>, acordamos plazo específico.
        </p>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-16 max-w-6xl px-4">
        <div className="rounded-3xl border border-emerald-100 bg-emerald-50 px-6 py-8 sm:px-10">
          <h2 className="text-xl font-bold text-emerald-900">
            ¿Necesitas una traducción jurada hoy?
          </h2>
          <p className="mt-1 text-emerald-900/80">
            Escríbenos por WhatsApp o envía tu documento por email y te damos precio y plazo en minutos.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-white shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              Abrir WhatsApp
            </a>
            <a
              href={`mailto:${email}?subject=Presupuesto%20traducci%C3%B3n%20jurada`}
              className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white px-5 py-3 text-emerald-900 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              Enviar email
            </a>
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white px-5 py-3 text-emerald-900 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              Llamar {phone}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-16 max-w-6xl px-4 pb-20">
        <h2 className="text-2xl font-bold text-slate-900">Preguntas frecuentes</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            [
              "¿Qué es una traducción jurada?",
              "Es una traducción firmada y sellada por traductor/a jurado/a que otorga validez legal ante administraciones y organismos.",
            ],
            [
              "¿Sirve el PDF o necesito papel?",
              "En la mayoría de trámites aceptan copia digital; si te piden original en papel te lo enviamos por mensajería.",
            ],
            [
              "¿Cómo calculáis el precio?",
              "Depende de idioma, complejidad y extensión. Te damos presupuesto cerrado al ver el documento.",
            ],
            [
              "¿Plazo de entrega?",
              "24/48 h para encargos habituales. Para más de 20 folios, definimos un calendario específico.",
            ],
          ].map(([q, a]) => (
            <article key={q} className="rounded-2xl border border-slate-100 bg-white p-5">
              <h3 className="font-semibold text-slate-900">{q}</h3>
              <p className="mt-1 text-sm text-slate-600">{a}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">
          JuradaExpress · Murcia · {email} · {phone}
        </p>
      </section>
    </>
  );
}
