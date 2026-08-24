// app/page.js
import Image from "next/image";
import TrackedLink from "./components/TrackedLink";
import { IconCheck, IconClock, IconSend } from "./components/Icons";

export const metadata = {
  title: "Traducción Jurada en Murcia | Traductor Jurado en Murcia",
  description:
    "¿Busca un traductor jurado en murcia? Ofrecemos la mejor traducción jurada en murcia. Contacte con nuestro traductor jurado para sus documentos oficiales.",
  alternates: {
    canonical: "https://juradaexpress.es/",
    languages: {
      es: "https://juradaexpress.es/",
      en: "https://juradaexpress.es/en",
      "x-default": "https://juradaexpress.es/",
    },
  },
};

const Stars = () => (
  <div className="flex gap-0.5 text-brand-gold" aria-label="Valoración: 5 de 5 estrellas">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.771l-7.416 3.642 1.48-8.279L0 9.306l8.332-1.151z" />
      </svg>
    ))}
  </div>
);

const SectionKicker = () => (
  <div className="mb-3 h-1 w-12 rounded-full bg-brand-gold" aria-hidden="true" />
);

const Wave = ({ className = "", flip = false }) => (
  <svg
    className={`${className} ${flip ? "rotate-180" : ""}`}
    viewBox="0 0 1440 100"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path
      d="M0,0 C240,100 480,100 720,50 C960,0 1200,0 1440,50 L1440,100 L0,100 Z"
      fill="currentColor"
      className="text-slate-50"
    />
  </svg>
);

export default function Page() {
  return (
    <main>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 md:pb-20 md:pt-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Traducción <span className="text-brand-navy">Jurada</span>{" "}
              Español ⇆ Inglés
            </h1>
            <p className="mt-5 text-xl text-slate-600">
              Envíos a toda España y al extranjero · Entrega 24/48 h ·
              Presupuesto inmediato.
            </p>
            <p className="mt-3 text-base text-slate-600">
              Con sede en Murcia, trabajo con clientes de toda España y de
              cualquier país — todo el proceso es 100% digital, así que no
              importa dónde estés.
            </p>

            {/* Badges / Sellos */}
            <ul className="mt-6 flex flex-wrap gap-3 text-sm text-slate-700">
              <li className="inline-flex items-center gap-2 rounded-full bg-brand-navy-50 px-3 py-1 ring-1 ring-brand-navy-100">
                <IconCheck className="h-4 w-4 text-brand-gold-600" />
                Válida ante organismos oficiales
              </li>
              <li className="inline-flex items-center gap-2 rounded-full bg-brand-navy-50 px-3 py-1 ring-1 ring-brand-navy-100">
                <IconClock className="h-4 w-4 text-brand-gold-600" />
                Entrega 24/48 h
              </li>
              <li className="inline-flex items-center gap-2 rounded-full bg-brand-navy-50 px-3 py-1 ring-1 ring-brand-navy-100">
                <IconSend className="h-4 w-4 text-brand-gold-600" />
                Envíos a España y extranjero
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLink
                label="hero_presupuesto"
                href="mailto:info@juradaexpress.es?subject=Presupuesto%20traducci%C3%B3n%20jurada"
                className="rounded-xl bg-brand-navy px-5 py-3 text-white hover:bg-brand-navy-700"
              >
                Pedir presupuesto
              </TrackedLink>
              <TrackedLink
                label="hero_precios"
                href="/precios"
                className="rounded-xl border border-brand-gold-200 bg-white px-5 py-3 text-brand-navy hover:bg-brand-gold-50"
              >
                Ver precios
              </TrackedLink>
              <TrackedLink
                label="hero_whatsapp"
                href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20quisiera%20un%20presupuesto"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-brand-gold-200 bg-white px-5 py-3 text-brand-navy hover:bg-brand-gold-50"
              >
                WhatsApp inmediato
              </TrackedLink>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              * Proyectos &gt;20 folios: acordamos calendario y faseado.
            </p>
          </div>

          <div className="flex justify-center">
            <figure>
              <img
                src="/hero-internacional.jpg"
                alt="JuradaExpress — Traducción jurada Español ⇆ Inglés, entrega digital en toda España y en el extranjero"
                className="max-h-80 rounded-2xl shadow object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* Divider wave */}
      <Wave className="h-8 w-full text-slate-50" />

      {/* SERVICIOS */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <SectionKicker />
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Documentos más habituales</h2>
              <p className="mt-3 max-w-md text-sm text-slate-600">
                Cada documento tiene sus propios requisitos de traducción:
                estos son los que traducimos con más frecuencia.
              </p>
            </div>
            <div className="relative h-56 w-full overflow-hidden rounded-2xl shadow md:h-64">
              <Image
                src="/fotos/foto-documentos.jpg"
                alt="Pasaporte y documentos de viaje sobre un portátil — traducción jurada de documentos"
                fill
                sizes="(min-width: 768px) 480px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                t: "Certificados oficiales",
                d: "Nacimiento, matrimonio, penales, padrón, notaría…",
                img: "/docs-real.jpg",
                alt: "Certificados oficiales apilados: nacimiento, matrimonio y antecedentes penales",
              },
              {
                t: "Académicos",
                d: "Títulos, expedientes, planes de estudio, cartas académicas.",
                img: "/academicos.jpg",
                alt: "Documentos académicos: título universitario y expediente",
              },
              {
                t: "Laborales y mercantiles",
                d: "Contratos, poderes, escrituras, estatutos.",
                img: "/mercantiles.jpg",
                alt: "Contratos y documentos mercantiles firmados",
              },
            ].map((i) => (
              <article
                key={i.t}
                className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 hover:shadow"
              >
                <img
                  src={i.img}
                  alt={i.alt}
                  className="h-44 w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="font-semibold">{i.t}</h3>
                  <p className="mt-2 text-sm text-slate-600">{i.d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Divider wave (flip) */}
      <Wave className="h-8 w-full text-slate-50" flip />

      {/* REINO UNIDO */}
      <Wave className="h-8 w-full text-brand-navy-50" />
      <section className="bg-brand-navy-50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <SectionKicker />
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                ¿Resides en España siendo británico/a?
              </h2>
              <p className="mt-4 max-w-xl text-slate-600">
                Te ayudo con la traducción jurada de tus documentos para el
                NIE, la tarjeta de residencia, el empadronamiento, la compra
                de una vivienda o cualquier otro trámite tras el Brexit.
                Documentos en regla, sin sorpresas, para que puedas
                centrarte en instalarte.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <TrackedLink
                  label="uk_presupuesto"
                  href="mailto:info@juradaexpress.es?subject=Presupuesto%20traducci%C3%B3n%20jurada%20-%20Reino%20Unido"
                  className="rounded-xl bg-brand-navy px-5 py-3 text-white hover:bg-brand-navy-700"
                >
                  Pedir presupuesto
                </TrackedLink>
                <TrackedLink
                  label="uk_whatsapp"
                  href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20soy%20brit%C3%A1nico%2Fa%20y%20necesito%20traducci%C3%B3n%20jurada%20para%20un%20tr%C3%A1mite%20en%20Espa%C3%B1a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-brand-gold-200 bg-white px-5 py-3 text-brand-navy hover:bg-brand-gold-50"
                >
                  WhatsApp inmediato
                </TrackedLink>
              </div>
            </div>
            <div className="relative h-56 w-full overflow-hidden rounded-2xl shadow md:h-72">
              <Image
                src="/fotos/foto-bandera-uk.jpg"
                alt="Bandera de Reino Unido — traducción jurada para británicos residentes en España"
                fill
                sizes="(min-width: 768px) 480px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <Wave className="h-8 w-full text-brand-navy-50" flip />

      {/* ACEPTADO POR… */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <SectionKicker />
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Aceptado por…</h2>
        <p className="mt-3 max-w-3xl text-sm text-slate-600">
          Traducciones juradas firmadas y selladas por traductor jurado
          válidas ante organismos oficiales (p.ej., Ministerios, Universidades,
          Consulados, Registros Civiles, Notarías, Ayuntamientos, etc.).
        </p>
        <ul className="mt-5 flex flex-wrap gap-2 text-sm text-slate-700">
          {[
            "Ministerios y Ayuntamientos",
            "Universidades y centros educativos",
            "Registros civiles y notarías",
            "Consulados y embajadas",
          ].map((txt) => (
            <li
              key={txt}
              className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200"
            >
              <IconCheck className="h-4 w-4 text-brand-gold-600" />
              {txt}
            </li>
          ))}
        </ul>
      </section>

      {/* Divider wave */}
      <Wave className="h-8 w-full text-brand-navy-50" />

      {/* VENTAJAS */}
      <section className="bg-brand-navy-50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <SectionKicker />
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Por qué elegir JuradaExpress</h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              "Traducción jurada válida ante organismos oficiales.",
              "Entrega rápida 24/48 h. Envíos a toda España y extranjero.",
              "Atención directa por email y WhatsApp. Presupuesto inmediato.",
            ].map((li) => (
              <li
                key={li}
                className="rounded-2xl bg-white p-5 ring-1 ring-brand-navy-100"
              >
                {li}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Divider wave (flip) */}
      <Wave className="h-8 w-full text-brand-navy-50" flip />

      {/* PROCESO */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <SectionKicker />
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">¿Cómo trabajamos?</h2>
            <p className="mt-3 max-w-md text-sm text-slate-600">
              Todo el proceso es 100% digital: da igual si estás en Murcia, en
              cualquier otro punto de España o en el extranjero — el envío, el
              presupuesto y la entrega funcionan igual.
            </p>
          </div>
          <div className="relative h-56 w-full overflow-hidden rounded-2xl shadow md:h-64">
            <Image
              src="/fotos/foto-online.jpg"
              alt="Portátil abierto sobre una mesa — todo el proceso se gestiona online"
              fill
              sizes="(min-width: 768px) 480px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-4">
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

      {/* Divider wave */}
      <Wave className="h-8 w-full text-slate-50" />

      {/* SOBRE MÍ */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid items-center gap-8 md:grid-cols-[auto,1fr]">
          <div className="mx-auto flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-brand-navy-50 text-2xl font-bold text-brand-navy ring-4 ring-brand-gold-100 md:mx-0">
            EP
          </div>
          <div>
            <SectionKicker />
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Sobre mí</h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              Soy <strong className="text-brand-navy">Elena Peñaranda Ortega</strong>,
              Traductora-Intérprete Jurada de Inglés nombrada por el Ministerio
              de Asuntos Exteriores, Unión Europea y Cooperación (Nº de
              acreditación: 7310). Cada traducción jurada la realizo, firmo y
              sello personalmente, garantizando su validez ante cualquier
              organismo oficial.
            </p>
          </div>
        </div>
      </section>

      {/* Divider wave (flip) */}
      <Wave className="h-8 w-full text-slate-50" flip />

      {/* OPINIONES */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20 bg-slate-50">
        <SectionKicker />
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Opiniones</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              n: "María G.",
              t: "Rápidos y profesionales. Me enviaron versión digital y luego en papel.",
            },
            {
              n: "Javier R.",
              t: "Muy buena comunicación y precio correcto. Repetiré si lo necesito.",
            },
            { n: "Elisa P.", t: "Necesitaba urgencia y cumplieron el plazo sin problema." },
          ].map((op) => (
            <blockquote
              key={op.n}
              className="rounded-2xl bg-white p-5 ring-1 ring-slate-200"
            >
              <Stars />
              <p className="mt-3">“{op.t}”</p>
              <footer className="mt-3 text-sm text-slate-600">— {op.n}</footer>
            </blockquote>
          ))}
        </div>
        <p className="mt-6 text-sm text-slate-500">
          Reseñas verificadas de clientes ·{" "}
          <a
            href="https://g.page/r/PLACEHOLDER"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-brand-gold-700"
          >
            Ver todas en Google Business
          </a>
        </p>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:pb-20">
        <div className="rounded-2xl bg-brand-navy p-8 text-white md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-[1.2fr,0.8fr]">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">¿Empezamos?</h2>
              <p className="mt-2 text-brand-navy-100">
                Envíanos el documento y te respondemos con presupuesto y plazo.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <TrackedLink
                  label="cta_presupuesto_final"
                  href="mailto:info@juradaexpress.es?subject=Presupuesto%20traducci%C3%B3n%20jurada"
                  className="rounded-xl bg-white px-5 py-3 text-brand-navy hover:bg-brand-gold-50"
                >
                  Pedir presupuesto
                </TrackedLink>
                <TrackedLink
                  label="cta_precios_final"
                  href="/precios"
                  className="rounded-xl border border-brand-gold-300/60 px-5 py-3 text-white hover:bg-white/10"
                >
                  Ver precios
                </TrackedLink>
              </div>
            </div>
            <div className="relative h-48 w-full overflow-hidden rounded-2xl shadow-lg md:h-56">
              <Image
                src="/fotos/foto-firma.jpg"
                alt="Firma de un documento con pluma — traducción jurada firmada y sellada"
                fill
                sizes="(min-width: 768px) 360px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ + JSON-LD */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <SectionKicker />
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Preguntas frecuentes</h2>
        <div className="mt-8 divide-y rounded-2xl ring-1 ring-slate-200 bg-white">
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

