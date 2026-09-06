// app/page.js
import Image from "next/image";
import TrackedLink from "./components/TrackedLink";
import Reviews from "./components/Reviews";
import TrustStrip from "./components/TrustStrip";
import HeroSeal from "./components/HeroSeal";
import ProcessTimeline from "./components/ProcessTimeline";
import ProcessVideo from "./components/ProcessVideo";
import FollowUs from "./components/FollowUs";
import { SectionHeading } from "./components/ui";
import { DOCUMENTS } from "../content/documents";
import {
  WHATSAPP_URL,
  LARGE_PROJECT_CAPACITY,
  TIMEZONE_NOTE,
} from "../content/site";

export const metadata = {
  // app/page.js comparte segmento con app/layout.js, así que title.template
  // NO se aplica aquí: el sufijo va explícito (≤ 60 caracteres).
  title: "Traductor Jurado Español-Inglés Online | Jurada Express",
  description:
    "Traductora jurada de inglés nombrada por el MAEC (nº 7310). Traducción jurada español-inglés con validez oficial y traducción certificada para USCIS, 100% online, entrega en 24/48 h. Clientes en España, Reino Unido, EE. UU., India y cualquier país.",
  alternates: {
    canonical: "https://juradaexpress.es/",
    languages: {
      es: "https://juradaexpress.es/",
      en: "https://juradaexpress.es/en",
      "x-default": "https://juradaexpress.es/",
    },
  },
  openGraph: {
    title: "Traductor Jurado Español-Inglés Online | Jurada Express",
    description:
      "Traducción jurada español-inglés con validez oficial y traducción certificada para USCIS, 100% online, entrega en 24/48 h. Traductora jurada nombrada por el MAEC (nº 7310). Clientes en cualquier país.",
    url: "https://juradaexpress.es/",
    siteName: "Jurada Express",
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

// Documentos habituales del expediente de nómada digital (fuente: brief 0.4).
const DNV_DOCUMENTS = [
  "Certificado de antecedentes penales, apostillado",
  "Contrato o carta del empleador con autorización para teletrabajar",
  "Certificado del registro mercantil de la empresa (incorporation o good standing)",
  "Título universitario o cartas de experiencia profesional",
  "Certificado de cobertura de Seguridad Social (A1, certificate of coverage de la SSA)",
];

const WHATSAPP_DNV =
  "https://wa.me/34685891214?text=Hola%20Jurada%20Express,%20voy%20a%20pedir%20el%20visado%20de%20n%C3%B3mada%20digital%20y%20necesito%20traducci%C3%B3n%20jurada%20de%20mis%20documentos";
const WHATSAPP_LARGE =
  "https://wa.me/34685891214?text=Hola%20Jurada%20Express,%20tengo%20un%20proyecto%20grande%20de%20traducci%C3%B3n%20jurada%20y%20necesito%20presupuesto%20y%20plazo%20cerrados";

const FAQ = [
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
  {
    q: "¿Trabajas con clientes fuera de España?",
    a: "Sí. Atiendo a clientes de Estados Unidos, India, Reino Unido, Irlanda, Canadá, Australia y cualquier otro país: el envío del documento, el pago con tarjeta y la entrega en PDF firmado funcionan igual desde cualquier lugar, y el papel llega por mensajería si lo necesitas.",
  },
  {
    q: "¿Haces traducciones certificadas para USCIS?",
    a: "Sí. Entrego la traducción completa al inglés con la certificación de exactitud y competencia que exige USCIS (8 CFR § 103.2(b)(3)), firmada, fechada y con mis datos de contacto, un certificado por documento. No hace falta notario.",
  },
  {
    q: "¿Cuánto tardas en traducir un expediente completo de nómada digital?",
    a: LARGE_PROJECT_CAPACITY
      ? `Te doy un plazo único cerrado por escrito antes de empezar; los documentos sueltos salen en 24/48 h y puedo asumir ${LARGE_PROJECT_CAPACITY.es}, así que un expediente completo suele estar listo en pocos días.`
      : "Te doy un plazo único cerrado por escrito antes de empezar; los documentos sueltos salen en 24/48 h.",
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
              Validez oficial · Entrega en 24/48 h · Clientes en España, Reino
              Unido, EE. UU., India y cualquier país
            </p>
            <p className="mt-3 max-w-[68ch] text-base text-slate-600">
              Todo el proceso es digital: me envías el documento escaneado,
              pagas con tarjeta desde cualquier país y recibes la traducción en
              PDF firmado el mismo día o al siguiente. También hago traducción
              certificada para USCIS.
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

      {/* FRANJA DE CONFIANZA — cuatro hechos, sin iconos ni tarjetas */}
      <TrustStrip locale="es" />

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

      {/* VISADO DE NÓMADA DIGITAL — imagen a la izquierda */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,380px),1fr]">
          <div className="relative hidden aspect-[3/4] overflow-hidden rounded-xl shadow md:block">
            <Image
              src="/fotos/expediente-nomada.jpg"
              alt="Manos revisando un formulario oficial sobre una carpeta de documentos — expediente de visado de nómada digital"
              fill
              sizes="380px"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading>
              ¿Vas a pedir el visado de nómada digital?
            </SectionHeading>
            <p className="mt-4 max-w-[68ch] text-slate-600">
              El expediente de la autorización de residencia para teletrabajo
              internacional (Ley 28/2022) reúne muchos documentos de distintos
              países, y casi todos tienen que llegar al consulado o a la UGE
              en español. La mayoría de las denegaciones vienen de traducciones
              que no son juradas o de apostillas que faltan, no del fondo del
              caso. Yo reviso tu lista completa, te digo qué documento
              necesita apostilla y traduzco todo el lote con un solo plazo,
              ordenado y nombrado para subirlo a la plataforma.
            </p>
            <ul className="mt-6 grid max-w-[68ch] gap-2 text-slate-700 sm:grid-cols-1">
              {DNV_DOCUMENTS.map((d) => (
                <li key={d} className="flex gap-3">
                  <span
                    className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold-500"
                    aria-hidden="true"
                  />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <TrackedLink
                label="dnv_guia"
                href="/traduccion-jurada-visado-nomada-digital"
                className="btn btn-primary"
              >
                Ver qué documentos necesitas
              </TrackedLink>
              <TrackedLink
                label="dnv_whatsapp"
                href={WHATSAPP_DNV}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                WhatsApp
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* REINO UNIDO — imagen a la derecha */}
      <section className="bg-stone-50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
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
              <p className="mt-6 max-w-[68ch] text-sm text-slate-600">
                Si vienes de{" "}
                <a href="/traduccion-jurada-estados-unidos" className="link">
                  Estados Unidos
                </a>{" "}
                o de{" "}
                <a href="/traduccion-jurada-india" className="link">
                  India
                </a>
                , tienes tu propia guía.
              </p>
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
        </div>
      </section>

      {/* CÓMO TRABAJAMOS — línea temporal (momento animado único) */}
      <section>
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
                en cualquier otro punto de España o en otro continente. El
                envío, el presupuesto, el pago con tarjeta y la entrega
                funcionan igual.
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

      {/* PROYECTOS GRANDES EN PLAZOS CORTOS */}
      <section className="bg-stone-50">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
          <div className="grid gap-8 md:grid-cols-[1.4fr,1fr] md:items-center">
            <div>
              <SectionHeading>Proyectos grandes en plazos cortos</SectionHeading>
              <p className="mt-4 max-w-[68ch] text-slate-600">
                Traduzco expedientes completos y lotes de documentos para
                particulares, empresas, despachos y gestorías. Antes de
                empezar te doy presupuesto y plazo cerrados por escrito; al
                terminar recibes cada documento como PDF firmado, ordenado y
                nombrado para que sepas qué es cada archivo.
                {LARGE_PROJECT_CAPACITY
                  ? ` Puedo asumir ${LARGE_PROJECT_CAPACITY.es}; para más volumen o urgencias, pídeme información y te cierro plazo por escrito.`
                  : " Para volúmenes grandes o urgencias, pídeme información y te cierro plazo por escrito."}
              </p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <TrackedLink
                label="large_whatsapp"
                href={WHATSAPP_LARGE}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Contar mi caso por WhatsApp
              </TrackedLink>
              <a
                href="/traduccion-jurada-urgente-grandes-volumenes"
                className="link inline-block py-1"
              >
                Cómo trabajo un lote de documentos →
              </a>
            </div>
          </div>
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
            <p className="mt-4 max-w-[68ch] text-slate-600">
              También hago traducciones certificadas para USCIS y atiendo a
              clientes de Estados Unidos, India, Reino Unido, Irlanda, Canadá
              o Australia con el mismo proceso digital.{" "}
              {TIMEZONE_NOTE.es}.
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
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-16 md:pb-20 md:pt-20">
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
          {FAQ.map((f, idx) => (
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
              mainEntity: FAQ.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      </section>

      {/* SÍGUENOS */}
      <FollowUs locale="es" />
    </main>
  );
}
