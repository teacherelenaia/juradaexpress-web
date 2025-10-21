// app/page.js
import Image from "next/image";

export default function Page() {
  const phone = "+34 685 891 214";
  const phoneHuman = "685 891 214";
  const email = "info@juradaexpress.es";
  const whatsappLink =
    "https://wa.me/34685891214?text=Hola%20JuradaExpress,%20quisiera%20un%20presupuesto";

  return (
    <>
      {/* SEO JSON-LD: LocalBusiness + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "JuradaExpress",
              url: "https://juradaexpress.es",
              email,
              telephone: phone,
              image: "https://juradaexpress.es/og.jpg",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Murcia",
                addressCountry: "ES",
              },
              areaServed: "ES",
              description:
                "Traducciones juradas de Español ⇆ Inglés en Murcia. Envíos a toda España y extranjero. Entrega 24/48 h orientativa.",
              openingHours: "Mo-Fr 09:00-19:00",
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "¿Qué es una traducción jurada?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Una traducción jurada es una traducción firmada y sellada por traductor/a jurado/a, con validez legal ante administraciones y organismos.",
                  },
                },
                {
                  "@type": "Question",
                  name: "¿Plazo de entrega?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "24/48 h para encargos habituales. Para documentos grandes (20+ folios) acordamos un plazo específico.",
                  },
                },
              ],
            },
          ]),
        }}
      />

      {/* HERO con fondo degradado */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-slate-50 ring-1 ring-slate-100">
        <div className="grid items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100">
              Traducción jurada Español ⇆ Inglés · Murcia
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
              Traducciones juradas con{" "}
              <span className="text-emerald-700">entrega 24/48 h*</span>
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Servicio oficial (firma y sello). Envíos a toda España y al
              extranjero. Copia digital y, si lo necesitas, original en papel.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${email}?subject=Presupuesto%20traducci%C3%B3n%20jurada`}
                className="rounded-xl bg-emerald-600 px-5 py-3 text-white shadow hover:bg-emerald-700"
              >
                Pedir presupuesto
              </a>
              <a
                href={whatsappLink}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-slate-700 hover:border-slate-300"
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
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-emerald-100/50 blur-2xl" />
            <Image
              src="/hero.jpg"
              alt="Traducción jurada en Murcia"
              width={900}
              height={650}
              className="rounded-2xl border border-slate-100 shadow-lg"
              priority
            />
          </div>
        </div>
      </section>

      {/* SELLOS */}
      <section className="mt-10">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Firma y sello oficiales",
            "Entrega digital y en papel",
            "Presupuesto en minutos",
            "Envíos 24/48 h*",
          ].map((t) => (
            <li
              key={t}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
            >
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-600" />
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="mt-16">
        <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
          <h2 className="text-2xl font-bold">Qué traducimos</h2>
          <p className="mt-2 text-slate-600">
            Traducción jurada de documentos personales, académicos y
            empresariales entre Español e Inglés:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              [
                "Certificados y registros",
                "Nacimiento, matrimonio, penales, empadronamiento…",
                "/docs.jpg",
              ],
              [
                "Académicos",
                "Títulos, expedientes, diplomas, programas…",
                "/people.jpg",
              ],
              [
                "Legales y notariales",
                "Poderes, escrituras, resoluciones, contratos…",
                "/docs.jpg",
              ],
              [
                "Empresas",
                "Estatutos, cuentas anuales, informes…",
                "/people.jpg",
              ],
              [
                "Sanidad",
                "Informes médicos, vacunación, altas…",
                "/docs.jpg",
              ],
              ["Otros", "Permiso de conducir, facturas, nóminas…", "/people.jpg"],
            ].map(([title, desc, img]) => (
              <article
                key={title}
                className="group grid grid-cols-[80px,1fr] items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-white"
              >
                <div className="overflow-hidden rounded-xl ring-1 ring-slate-200">
                  <Image
                    src={img}
                    alt=""
                    width={160}
                    height={120}
                    className="h-20 w-20 object-cover transition group-hover:scale-[1.03]"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESO (fondo alterno) */}
      <section id="proceso" className="mt-16 rounded-3xl bg-slate-100 p-6 ring-1 ring-slate-200">
        <h2 className="text-2xl font-bold">Cómo funciona</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["1. Envíanos el documento", `Foto clara o PDF a ${email} o por WhatsApp.`],
            ["2. Presupuesto", "Confirmamos precio y plazo (24/48 h habitual)."],
            ["3. Traducción jurada", "Firma y sello oficiales. Copia digital incluida."],
            ["4. Envío/recogida", "Entrega digital y, si quieres, envío físico."],
          ].map(([title, desc]) => (
            <li
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="font-semibold">{title}</p>
              <p className="mt-1 text-sm text-slate-600">{desc}</p>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-sm text-slate-500">
          * Para encargos superiores a <strong>20 folios</strong>, acordamos plazo específico.
        </p>
      </section>

      {/* CTA */}
      <section className="mt-16">
        <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white px-6 py-8 sm:px-10">
          <h2 className="text-xl font-bold text-emerald-900">
            ¿Necesitas una traducción jurada hoy?
          </h2>
          <p className="mt-1 text-emerald-900/80">
            WhatsApp o email y te damos precio y plazo en minutos.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-white shadow hover:bg-emerald-700"
            >
              Abrir WhatsApp
            </a>
            <a
              href={`mailto:${email}?subject=Presupuesto%20traducci%C3%B3n%20jurada`}
              className="rounded-xl border border-emerald-200 bg-white px-5 py-3 text-emerald-900 hover:bg-emerald-100"
            >
              Enviar email
            </a>
            <a
              href={`tel:${phone}`}
              className="rounded-xl border border-emerald-200 bg-white px-5 py-3 text-emerald-900 hover:bg-emerald-100"
            >
              Llamar {phoneHuman}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mt-16">
        <h2 className="text-2xl font-bold">Preguntas frecuentes</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            [
              "¿Qué es una traducción jurada?",
              "Traducción firmada y sellada por traductor/a jurado/a con validez legal.",
            ],
            [
              "¿Sirve el PDF?",
              "En la mayoría de trámites sí; si te piden papel, te lo enviamos por mensajería.",
            ],
            [
              "¿Cómo calculáis el precio?",
              "Idioma, complejidad y extensión. Te damos presupuesto cerrado al ver el documento.",
            ],
            [
              "¿Plazo de entrega?",
              "24/48 h para encargos habituales. Más de 20 folios: calendario específico.",
            ],
          ].map(([q, a]) => (
            <article
              key={q}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="font-semibold">{q}</h3>
              <p className="mt-1 text-sm text-slate-600">{a}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">
          JuradaExpress · Murcia · {email} · {phoneHuman}
        </p>
      </section>
    </>
  );
}
