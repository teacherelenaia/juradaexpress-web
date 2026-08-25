// app/page.js
import Image from "next/image";
import TrackedLink from "./components/TrackedLink";
import Reviews from "./components/Reviews";
import HeroSeal from "./components/HeroSeal";
import ProcessTimeline from "./components/ProcessTimeline";
import ProcessVideo from "./components/ProcessVideo";
import FollowUs from "./components/FollowUs";
import { SectionHeading } from "./components/ui";
import { DOCUMENTS } from "../content/documents";
import { WHATSAPP_URL } from "../content/site";

export const metadata = {
  // El layout añade el sufijo "| JuradaExpress" mediante title.template.
  title: "Traductor Jurado de Inglés · Traducción Jurada Online en 24/48 h",
  description:
    "Traductora jurada de inglés nombrada por el MAEC (nº 7310). Traducción jurada español-inglés con validez oficial, 100% online, entrega en 24/48 h en toda España y Reino Unido. Presupuesto en minutos.",
  alternates: {
    canonical: "https://juradaexpress.es/",
    languages: {
      es: "https://juradaexpress.es/",
      en: "https://juradaexpress.es/en",
      "x-default": "https://juradaexpress.es/",
    },
  },
  openGraph: {
    title:
      "Traductor Jurado de Inglés · Traducción Jurada Online en 24/48 h | JuradaExpress",
    description:
      "Traducción jurada español-inglés con validez oficial, 100% online, entrega en 24/48 h en toda España y Reino Unido. Traductora jurada nombrada por el MAEC (nº 7310).",
    url: "https://juradaexpress.es/",
    siteName: "JuradaExpress",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "https://juradaexpress.es/fotos/hero-firma.jpg",
        width: 1200,
        height: 900,
        alt: "Firma de una traducción jurada con pluma sobre el documento",
      },
    ],
  },
};

// Precios reales desde el catálogo (content/documents.js): una sola fuente.
const priceOf = (id) => DOCUMENTS.find((d) => d.id === id)?.price ?? null;

const COMMON_DOCUMENTS = [
  {
    name: "Partida de nacimiento",
    for: "Nacionalidad, matrimonio, NIE y Registro Civil",
    price: priceOf("partida-nacimiento"),
    time: "24/48 h",
    href: "/traduccion-jurada-partida-nacimiento",
  },
  {
    name: "Certificado de antecedentes penales",
    for: "Extranjería, visados y ofertas de empleo",
    price: priceOf("antecedentes-penales"),
    time: "24/48 h",
    href: "/traduccion-jurada-certificado-penales",
  },
  {
    name: "Certificado de matrimonio",
    for: "Registro Civil, residencia y pensiones",
    price: priceOf("certificado-matrimonio"),
    time: "24/48 h",
    href: "/traduccion-jurada-certificado-matrimonio",
  },
  {
    name: "Título universitario",
    for: "UCAS, homologación y colegiación profesional",
    price: priceOf("titulo-universitario"),
    time: "24/48 h",
    href: "/traduccion-jurada-titulo-universitario",
  },
  {
    name: "Contrato o escritura",
    for: "Notaría, compraventa de vivienda y empresa",
    price: null,
    time: "Según extensión",
    href: "/traduccion-jurada-contrato-escritura",
  },
  {
    name: "Cualquier otro documento",
    for: "Elige el tuyo en el catálogo y pide presupuesto",
    price: null,
    time: "24/48 h habitual",
    href: "/documentos",
  },
];

export default function Page() {
  return (
    <main>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 md:pb-20 md:pt-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="font-display text-balance text-display font-semibold text-slate-900">
              Traducción jurada{" "}
              <em className="font-display italic text-brand-gold-700">
                Español ⇆ Inglés
              </em>{" "}
              con validez oficial, en 24/48 h
            </h1>
            <p className="mt-5 text-xl text-slate-700">
              Validez oficial · Entrega en 24/48 h · Toda España y Reino Unido
            </p>
            <p className="mt-3 max-w-[68ch] text-base text-slate-600">
              Con sede en Murcia, trabajo con clientes de toda España y de
              cualquier país — todo el proceso es 100% digital, así que no
              importa dónde estés.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <TrackedLink
                label="hero_presupuesto"
                href="/documentos"
                className="btn btn-primary"
              >
                Pedir presupuesto
              </TrackedLink>
              <TrackedLink
                label="hero_whatsapp"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                WhatsApp
              </TrackedLink>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              * Proyectos &gt;20 folios: acordamos calendario y faseado.
            </p>
          </div>

          <div className="relative">
            <figure className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/fotos/hero-firma.jpg"
                alt="Mano firmando una traducción jurada con pluma sobre el documento"
                fill
                priority
                sizes="(min-width: 768px) 560px, 100vw"
                className="object-cover"
              />
            </figure>
            <HeroSeal className="absolute -bottom-6 -left-4 h-32 w-32 md:-left-8 md:h-40 md:w-40" />
          </div>
        </div>
      </section>

      {/* DOCUMENTOS MÁS HABITUALES — lista editorial, imagen a la izquierda */}
      <section className="bg-stone-50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="grid items-start gap-10 md:grid-cols-[minmax(0,380px),1fr]">
            <div className="order-2 md:order-1">
              <div className="relative hidden aspect-[3/4] overflow-hidden rounded-xl shadow md:block">
                <Image
                  src="/fotos/foto-documentos.jpg"
                  alt="Pasaporte y documentos de viaje sobre un portátil — traducción jurada de documentos"
                  fill
                  sizes="380px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <SectionHeading>Documentos más habituales</SectionHeading>
              <p className="mt-3 max-w-[68ch] text-slate-600">
                Cada documento tiene sus requisitos. Estos son los que traduzco
                con más frecuencia, con su precio desde y su plazo habitual.
              </p>
              <ul className="mt-8 grid gap-x-10 md:grid-cols-2">
                {COMMON_DOCUMENTS.map((doc) => (
                  <li
                    key={doc.name}
                    className="border-b border-stone-200 py-4"
                  >
                    <a href={doc.href} className="group block no-underline">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-medium text-brand-navy group-hover:text-brand-gold-700">
                          {doc.name}
                        </span>
                        <span className="shrink-0 text-sm font-semibold tabular-nums text-slate-900">
                          {doc.price != null
                            ? `desde ${doc.price} €`
                            : "presupuesto"}
                        </span>
                      </div>
                      <div className="mt-1 flex items-baseline justify-between gap-3">
                        <span className="text-sm text-slate-600">
                          {doc.for}
                        </span>
                        <span className="shrink-0 text-xs text-slate-500">
                          {doc.time}
                        </span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* REINO UNIDO — imagen a la derecha */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <SectionHeading>
              ¿Resides en España siendo británico/a?
            </SectionHeading>
            <p className="mt-4 max-w-[68ch] text-slate-600">
              Te ayudo con la traducción jurada de tus documentos para el
              NIE, la tarjeta de residencia, el empadronamiento, la compra
              de una vivienda o cualquier otro trámite tras el Brexit.
              Documentos en regla, sin sorpresas, para que puedas
              centrarte en instalarte.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLink
                label="uk_guia"
                href="/traduccion-jurada-britanicos-espana"
                className="btn btn-primary"
              >
                Guía trámite a trámite
              </TrackedLink>
              <TrackedLink
                label="uk_whatsapp"
                href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20soy%20brit%C3%A1nico%2Fa%20y%20necesito%20traducci%C3%B3n%20jurada%20para%20un%20tr%C3%A1mite%20en%20Espa%C3%B1a"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                WhatsApp
              </TrackedLink>
            </div>
          </div>
          <div className="relative h-56 w-full overflow-hidden rounded-xl shadow md:h-72">
            <Image
              src="/fotos/foto-bandera-uk.jpg"
              alt="Bandera de Reino Unido — traducción jurada para británicos residentes en España"
              fill
              sizes="(min-width: 768px) 480px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* CÓMO TRABAJAMOS — línea temporal (momento animado único) */}
      <section className="bg-stone-50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <div className="relative h-56 w-full overflow-hidden rounded-xl shadow md:h-64">
                <Image
                  src="/fotos/proceso-despacho.jpg"
                  alt="Traductora jurada trabajando sobre el documento en su despacho"
                  fill
                  sizes="(min-width: 768px) 480px, 100vw"
                  className="object-cover"
                />
              </div>
              {/* Cuando exista clip real, PROCESS_VIDEO sustituye a la foto
                  sin tocar código (content/site.js). */}
              <ProcessVideo className="mt-4 aspect-video" />
            </div>
            <div className="order-1 md:order-2">
              <SectionHeading>¿Cómo trabajamos?</SectionHeading>
              <p className="mt-3 max-w-[68ch] text-slate-600">
                Todo el proceso es 100% digital: da igual si estás en Murcia,
                en cualquier otro punto de España o en el extranjero — el
                envío, el presupuesto y la entrega funcionan igual.
              </p>
            </div>
          </div>

          <ProcessTimeline
            steps={[
              {
                t: "Envío",
                d: "Me mandas el documento escaneado por email o WhatsApp.",
              },
              {
                t: "Presupuesto",
                d: "Te doy precio cerrado y plazo real en menos de 2 horas.",
              },
              {
                t: "Traducción jurada",
                d: "Traduzco, firmo y sello personalmente tu documento.",
              },
              {
                t: "Entrega 24/48 h",
                d: "PDF firmado digitalmente y, si lo necesitas, papel por mensajería.",
              },
            ]}
          />
        </div>
      </section>

      {/* SOBRE MÍ */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid items-center gap-8 md:grid-cols-[auto,1fr]">
          <div
            className="mx-auto flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-stone-100 font-display text-3xl font-semibold tracking-tight text-brand-navy md:mx-0"
            aria-hidden="true"
          >
            E.P.
          </div>
          <div>
            <SectionHeading>Sobre mí</SectionHeading>
            <p className="mt-4 max-w-[68ch] text-lg text-slate-600">
              Soy <strong className="text-brand-navy">Elena Peñaranda Ortega</strong>,
              Traductora-Intérprete Jurada de Inglés nombrada por el Ministerio
              de Asuntos Exteriores, Unión Europea y Cooperación con el{" "}
              <a
                href="https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Traductores-as---Interpretes-Jurados-as.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                nº de acreditación 7310
              </a>
              . Cada traducción jurada la realizo, firmo y sello
              personalmente, garantizando su validez ante cualquier organismo
              oficial.
            </p>
            <p className="mt-4">
              <a href="/sobre-mi" className="link">
                Conoce cómo trabajo y por qué puedes confiar en mi firma →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* OPINIONES — solo se renderiza si content/reviews.js tiene reseñas reales */}
      <Reviews locale="es" />

      {/* CTA FINAL */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:pb-20">
        <div
          data-surface="navy"
          className="rounded-xl bg-brand-navy p-8 text-white md:p-12"
        >
          <div className="grid items-center gap-8 md:grid-cols-[1.2fr,0.8fr]">
            <div>
              <SectionHeading light>¿Empezamos?</SectionHeading>
              <p className="mt-2 text-brand-navy-100">
                Envíame el documento y te respondo con presupuesto y plazo.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <TrackedLink
                  label="cta_presupuesto_final"
                  href="/documentos"
                  className="btn btn-light"
                >
                  Pedir presupuesto
                </TrackedLink>
                <TrackedLink
                  label="cta_precios_final"
                  href="/precios"
                  className="btn btn-outline-light"
                >
                  Ver precios
                </TrackedLink>
              </div>
            </div>
            <div className="relative h-48 w-full overflow-hidden rounded-xl shadow-lg md:h-56">
              <Image
                src="/docs-real.jpg"
                alt="Certificados oficiales apilados listos para su traducción jurada"
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
        <SectionHeading>Preguntas frecuentes</SectionHeading>
        <div className="mt-8 divide-y divide-stone-200 rounded-xl bg-white ring-1 ring-stone-200">
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
            <details key={idx} className="group p-5">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium text-slate-900 [&::-webkit-details-marker]:hidden">
                {f.q}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="shrink-0 text-brand-navy transition-transform duration-[180ms] group-open:rotate-180"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <p className="mt-2 max-w-[68ch] text-sm text-slate-600">{f.a}</p>
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

      {/* SÍGUENOS */}
      <FollowUs locale="es" />
    </main>
  );
}
