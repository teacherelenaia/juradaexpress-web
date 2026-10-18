// app/page.js
//
// Portada ES (Fase A2, 18/10/2026): Elena como cara visible. Orden: hero con
// foto y un solo botón principal → franja de confianza → trámites rápidos →
// calculadora → por qué trabajar con Elena → cómo funciona (3 pasos) →
// precio por documento + tabla directa vs agencia → opiniones → nómada
// digital → británicos → proyectos grandes → sobre mí (corto) → FAQ por
// objeción → cierre → síguenos. Ninguna sección se elimina: se reordenan y
// se reescriben hero, trámites, proceso, opiniones, FAQ y cierre. Los textos
// del hero viven en content/site.js (HERO_H1, HERO_SUB, DELIVERY_PROMISE).
import Image from "next/image";
import TrackedLink from "../components/TrackedLink";
import Reviews from "../components/Reviews";
import TrustStrip from "../components/TrustStrip";
import HeroSeal from "../components/HeroSeal";
import QuotePromise from "../components/QuotePromise";
import QuoteCalculator from "../components/QuoteCalculator";
import ProcessTimeline from "../components/ProcessTimeline";
import ProcessVideo from "../components/ProcessVideo";
import PricePerDocument from "../components/PricePerDocument";
import FollowUs from "../components/FollowUs";
import { IconWhatsApp } from "../components/Icons";
import { SectionHeading } from "../components/ui";
import { DOCUMENTS, MIN_PRICE } from "../../content/documents";
import {
  SINCE,
  MAEC_URL,
  MAEC_NUMBER,
  PERSON_NAME,
} from "../../content/persona";
import {
  WHATSAPP_URL,
  LARGE_PROJECT_CAPACITY,
  TIMEZONE_NOTE,
  HERO_H1,
  HERO_SUB,
  HERO_PHOTO,
  DELIVERY_PROMISE,
  PRICE_PER_PAGE,
  MIN_DOC_PRICE,
  SAME_DAY_MAX_PAGES,
} from "../../content/site";

export const metadata = {
  // app/page.js comparte segmento con app/layout.js, así que title.template
  // NO se aplica aquí: el sufijo va explícito. Con el precio mínimo real
  // (content/documents.js) el título queda en 62 caracteres; la versión
  // larga con "Traductora jurada MAEC 7310" superaba los 65 y se descartó.
  title: `Traducción Jurada de Inglés Online desde ${MIN_PRICE} € | Jurada Express`,
  description: `Traductora jurada de inglés desde ${SINCE} (MAEC nº 7310). Traducción jurada español-inglés desde ${MIN_PRICE} €, PDF firmado en el día (hasta 10 páginas), 100 % online.`,
  alternates: {
    canonical: "https://juradaexpress.es/",
    languages: {
      es: "https://juradaexpress.es/",
      en: "https://juradaexpress.es/en",
      "x-default": "https://juradaexpress.es/",
    },
  },
  openGraph: {
    title: `Traducción Jurada de Inglés Online desde ${MIN_PRICE} € | Jurada Express`,
    description: `Traductora jurada de inglés desde ${SINCE} (MAEC nº 7310). Traducción jurada español-inglés desde ${MIN_PRICE} €, PDF firmado en el día (hasta 10 páginas), 100 % online.`,
    url: "https://juradaexpress.es/",
    siteName: "Jurada Express",
    type: "website",
    locale: "es_ES",
    // Imagen de marca (scripts/build-brand-images.mjs, 10/10/2026): logo +
    // nombre + credencial, para que las tarjetas de enlace y los motores de
    // respuesta muestren la marca y no una foto genérica. Solo en la portada;
    // el resto de páginas conserva su foto.
    images: [
      {
        url: "https://juradaexpress.es/og-home.png",
        width: 1200,
        height: 630,
        alt: "Jurada Express, traductora jurada de inglés, MAEC nº 7310",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Traducción Jurada de Inglés Online desde ${MIN_PRICE} € | Jurada Express`,
    description: `Traductora jurada de inglés desde ${SINCE} (MAEC nº 7310). Traducción jurada español-inglés desde ${MIN_PRICE} €, PDF firmado en el día (hasta 10 páginas), 100 % online.`,
    images: ["https://juradaexpress.es/og-home.png"],
  },
};

// Precios reales desde el catálogo (content/documents.js): una sola fuente.
const priceOf = (id) => DOCUMENTS.find((d) => d.id === id)?.price ?? null;

// Trámites rápidos: seis entradas con precio cerrado y entrega en el día.
// `cta` es el texto descriptivo del enlace (el precio se lee del catálogo).
const QUICK_DOCUMENTS = [
  {
    id: "partida-nacimiento",
    name: "Partida de nacimiento",
    cta: (p) => `Traducir mi partida de nacimiento desde ${p} €`,
    href: "/traduccion-jurada-partida-nacimiento",
  },
  {
    id: "antecedentes-penales",
    name: "Certificado de antecedentes penales",
    cta: (p) => `Traducir mis antecedentes penales desde ${p} €`,
    href: "/traduccion-jurada-certificado-penales",
  },
  {
    id: "certificado-matrimonio",
    name: "Certificado de matrimonio",
    cta: (p) => `Traducir mi certificado de matrimonio desde ${p} €`,
    href: "/traduccion-jurada-certificado-matrimonio",
  },
  {
    id: "titulo-universitario",
    name: "Título universitario",
    cta: (p) => `Traducir mi título universitario desde ${p} €`,
    href: "/traduccion-jurada-titulo-universitario",
  },
  {
    id: "permiso-conducir",
    name: "Permiso de conducir",
    cta: (p) => `Traducir mi permiso de conducir desde ${p} €`,
    href: "/traduccion-jurada-permiso-conducir",
  },
  {
    id: null,
    name: "Otro documento",
    detail: "Contrato, DNI, testamento, certificado médico…",
    cta: () => "Pedir precio cerrado para otro documento",
    href: "/documentos",
  },
].map((d) => ({ ...d, price: d.id ? priceOf(d.id) : null }));

// Por qué trabajar directamente con Elena: tres argumentos, solo texto.
const WHY_ELENA = [
  {
    t: "Hablas con quien firma",
    d: "No hay agencia ni cola: te contesto yo por WhatsApp o email, de 9:00 a 20:00. Cada traducción la hago, la firmo y la sello yo, sin pasarla a nadie.",
  },
  {
    t: "Precio cerrado antes de pagar",
    d: "Te digo cuánto cuesta y cuándo lo tienes por escrito. Por documento, no por página, y sin recargos después.",
  },
  {
    t: "Corrijo gratis si hay un error mío",
    d: "Si un organismo rechaza la traducción por un fallo de mi trabajo, la corrijo sin coste. No pagas dos veces por mi error.",
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

// FAQ ordenada por objeción (Fase A2): validez → plazo → precio → formato →
// garantía → pago desde fuera → USCIS → nómada digital. El JSON-LD FAQPage
// se genera de esta misma lista.
const FAQ = [
  {
    q: "¿Me aceptarán la traducción?",
    a: `Sí. Soy traductora-intérprete jurada nombrada por el Ministerio de Asuntos Exteriores (nº ${MAEC_NUMBER}, comprobable en su buscador oficial). Las traducciones juradas firmadas y selladas por traductor jurado son válidas ante organismos oficiales: Extranjería, Registro Civil, universidades, notarías, juzgados y consulados. El PDF lleva firma electrónica cualificada y vale igual que el papel.`,
  },
  {
    q: "¿Cuándo la tengo?",
    a: `${DELIVERY_PROMISE.es} Entregar en el día más de ${SAME_DAY_MAX_PAGES} páginas lleva un recargo del 30 %.`,
  },
  {
    q: "¿Cuánto cuesta exactamente?",
    a: `Desde ${MIN_PRICE} € por documento, IVA incluido: partida de nacimiento, certificado de matrimonio y antecedentes penales, ${priceOf("partida-nacimiento")} €; permiso de conducir, ${priceOf("permiso-conducir")} €; título universitario, ${priceOf("titulo-universitario")} €. Los documentos largos (contratos, escrituras, expedientes) van a ${PRICE_PER_PAGE} € por página con un mínimo de ${MIN_DOC_PRICE} € por documento. Te doy el precio exacto por escrito antes de pagar y no hay recargos después.`,
  },
  {
    q: "¿PDF o papel?",
    a: "Las dos cosas. Entrego siempre el PDF firmado digitalmente, que vale ante cualquier organismo; si lo necesitas en papel, te lo envío por mensajería a tu dirección, en España o en cualquier país (el coste del transportista se indica en el presupuesto).",
  },
  {
    q: "¿Qué pasa si me la rechazan?",
    a: "Si un organismo rechaza la traducción por un error mío, la corrijo gratis y te reenvío el PDF. Si el problema está en el documento original (una apostilla que falta, un certificado caducado), te lo digo antes de empezar para que no pagues dos veces.",
  },
  {
    q: "¿Puedo pagar desde fuera de España?",
    a: "Sí. Atiendo a clientes de Estados Unidos, India, Reino Unido, Irlanda, Canadá, Australia y cualquier otro país: el envío del documento, el pago con tarjeta internacional y la entrega en PDF firmado funcionan igual desde cualquier lugar, y el papel llega por mensajería si lo necesitas.",
  },
  {
    q: "¿Traduces para USCIS?",
    a: "Sí. Entrego la traducción completa al inglés con la certificación de exactitud y competencia que exige USCIS (8 CFR § 103.2(b)(3)), firmada, fechada y con mis datos de contacto, un certificado por documento. No hace falta notario.",
  },
  {
    q: "¿Cuánto tardas en traducir un expediente completo de nómada digital?",
    a: LARGE_PROJECT_CAPACITY
      ? `Te doy un plazo único cerrado por escrito antes de empezar; los documentos de hasta ${SAME_DAY_MAX_PAGES} páginas salen en el día y puedo asumir ${LARGE_PROJECT_CAPACITY.es}, así que un expediente completo suele estar listo en pocos días.`
      : `Te doy un plazo único cerrado por escrito antes de empezar; los documentos de hasta ${SAME_DAY_MAX_PAGES} páginas salen en el día.`,
  },
];

const PHOTO_ALT = "Elena Peñaranda Ortega, traductora jurada de inglés";

export default function Page() {
  return (
    <main>
      {/* HERO — texto a la izquierda; a la derecha la foto de Elena cuando
          la haya (content/site.js → HERO_PHOTO) y, mientras no, la foto de
          marca de la mano firmando con el sello, con la línea de
          nombramiento debajo */}
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-10 md:pb-20 md:pt-16">
        <div
          className={`grid items-center gap-8 md:gap-12 ${
            HERO_PHOTO ? "md:grid-cols-[1.15fr,0.85fr]" : "md:grid-cols-2"
          }`}
        >
          <div>
            <h1 className="font-display text-balance text-display font-semibold text-slate-900">
              {HERO_H1.es}
            </h1>
            <p className="mt-5 max-w-[60ch] text-xl text-slate-700">
              {HERO_SUB.es}
            </p>
            <p className="mt-4 max-w-[68ch] text-base text-slate-600">
              Traducción jurada español-inglés con validez oficial. Todo el
              proceso es digital: me envías el documento escaneado, pagas con
              tarjeta desde cualquier país y recibes el PDF firmado. También
              hago{" "}
              <a href="/traduccion-certificada-uscis" className="link">
                traducción certificada para USCIS
              </a>
              .
            </p>

            <div className="mt-7">
              <TrackedLink
                label="hero_presupuesto"
                href="#calculadora"
                className="btn btn-gold"
              >
                Pedir presupuesto en 2 horas
              </TrackedLink>
              <QuotePromise locale="es" className="mt-3 max-w-[60ch]" />
              <TrackedLink
                label="hero_whatsapp"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link-nav mt-4 inline-flex min-h-[44px] items-center gap-2 font-medium text-brand-navy"
              >
                <IconWhatsApp className="h-5 w-5 text-brand-gold-700" />
                Escribir a Elena por WhatsApp
              </TrackedLink>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Si el organismo la rechaza por un error mío, la corrijo gratis.
            </p>
          </div>

          <figure>
            {HERO_PHOTO ? (
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-xl shadow-lg">
                <Image
                  src={HERO_PHOTO}
                  alt={PHOTO_ALT}
                  fill
                  priority
                  sizes="(min-width: 768px) 380px, 100vw"
                  className="object-cover"
                />
                <HeroSeal className="absolute -bottom-2 -left-2 h-24 w-24" />
              </div>
            ) : (
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src="/fotos/hero-firma.jpg"
                    alt="Mano firmando una traducción jurada con pluma sobre el documento"
                    fill
                    priority
                    sizes="(min-width: 768px) 560px, 100vw"
                    className="object-cover"
                  />
                </div>
                <HeroSeal className="absolute -bottom-6 -left-4 h-32 w-32 md:-left-8 md:h-40 md:w-40" />
              </div>
            )}
            <figcaption
              className={`text-sm text-slate-600 ${
                HERO_PHOTO ? "mx-auto mt-4 max-w-[380px]" : "mt-9"
              }`}
            >
              {PERSON_NAME} · Traductora-Intérprete Jurada de Inglés ·{" "}
              <a
                href={MAEC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link whitespace-nowrap"
                aria-label="MAEC nº 7310: comprobar el nombramiento en el buscador oficial del MAEC (se abre en una pestaña nueva)"
              >
                MAEC nº {MAEC_NUMBER}
              </a>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* FRANJA DE CONFIANZA — cuatro hechos, sin iconos ni tarjetas */}
      <TrustStrip locale="es" />

      {/* TRÁMITES RÁPIDOS — seis entradas, rejilla 3×2, sin tarjetas */}
      <section
        className="mx-auto max-w-6xl px-4 py-16 md:py-20"
        data-track-section="tramites_rapidos"
      >
        <SectionHeading>
          Trámites rápidos: precio cerrado y entrega en el día
        </SectionHeading>
        <p className="mt-3 max-w-[68ch] text-slate-600">
          Los documentos que más traduzco, con su precio desde y su plazo.
          Cada uno tiene su página con requisitos, apostilla y ejemplos.
        </p>
        <ul className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_DOCUMENTS.map((doc) => (
            <li
              key={doc.name}
              className="border-t border-stone-200 py-5"
            >
              <h3 className="font-medium text-slate-900">{doc.name}</h3>
              <p className="mt-1 text-sm text-slate-600">
                {doc.price != null ? (
                  <>
                    <span className="font-semibold tabular-nums text-slate-900">
                      desde {doc.price} €
                    </span>{" "}
                    · en el día
                  </>
                ) : (
                  <>
                    {doc.detail}{" "}
                    <span className="font-semibold text-slate-900">
                      precio cerrado en menos de 2 h
                    </span>
                  </>
                )}
              </p>
              <a href={doc.href} className="link mt-2 inline-block py-1">
                {doc.cta(doc.price)}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <a href="/documentos" className="link">
            Ver todos los documentos →
          </a>
        </p>
      </section>

      {/* CALCULADORA — mismo componente; baja de posición */}
      <QuoteCalculator locale="es" className="!pt-0" />

      {/* POR QUÉ TRABAJAR DIRECTAMENTE CON ELENA — tres bloques, solo texto */}
      <section
        className="bg-stone-50"
        data-track-section="por_que_elena"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <SectionHeading>Por qué trabajar directamente con Elena</SectionHeading>
          <dl className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
            {WHY_ELENA.map((w) => (
              <div key={w.t} className="border-t border-brand-gold-500 pt-4">
                <dt className="text-lg font-semibold text-slate-900">{w.t}</dt>
                <dd className="mt-2 text-slate-600">{w.d}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 max-w-[68ch] text-slate-700">
            Soy {PERSON_NAME}, traductora-intérprete jurada de inglés nombrada
            por el Ministerio de Asuntos Exteriores en {SINCE} (nº{" "}
            {MAEC_NUMBER}, puedes comprobarlo en{" "}
            <a
              href={MAEC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              su buscador oficial
            </a>
            ). Cada traducción la hago, la firmo y la sello yo, sin pasarla a
            nadie. Cuando me escribes, me respondes a mí: por WhatsApp o por
            email, de 9:00 a 20:00. Te digo el precio y el plazo por escrito
            antes de cobrarte nada, y si un organismo rechaza la traducción por
            un error mío, la corrijo gratis. Desde {SINCE} traduzco los
            documentos con los que la gente rehace su vida: partidas de
            nacimiento, antecedentes penales, títulos, visados. Los trato como
            lo que son para ti, un trámite que no puede fallar.
          </p>
        </div>
      </section>

      {/* CÓMO FUNCIONA — tres pasos numerados, sin iconos */}
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
              <SectionHeading>Cómo funciona</SectionHeading>
              <p className="mt-3 max-w-[68ch] text-slate-600">
                Todo el proceso es 100 % digital: da igual si estás en Murcia,
                en cualquier otro punto de España o en otro continente. El
                envío, el presupuesto, el pago con tarjeta y la entrega
                funcionan igual.
              </p>
            </div>
          </div>

          <ProcessTimeline
            steps={[
              {
                t: "Envía el documento",
                d: "Escaneado o fotografiado, por la calculadora, por WhatsApp o por email. Vale PDF, JPG, PNG o HEIC.",
              },
              {
                t: "Recibe precio y plazo por escrito en menos de 2 horas",
                d: "Con el enlace para pagar con tarjeta o Apple Pay. Nada se cobra antes de que lo apruebes.",
              },
              {
                t: "Recibe el PDF firmado",
                d: `En el día hasta ${SAME_DAY_MAX_PAGES} páginas. Si lo necesitas en papel, te lo envío por mensajería.`,
              },
            ]}
          />
        </div>
      </section>

      {/* PRECIO POR DOCUMENTO + TABLA DIRECTA VS AGENCIA (Fase A) */}
      <PricePerDocument locale="es" />

      {/* OPINIONES — cuatro reseñas de content/reviews.js, con trámite y mes */}
      <Reviews locale="es" className="!bg-white" />

      {/* VISADO DE NÓMADA DIGITAL — imagen a la izquierda */}
      <section className="bg-stone-50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
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
                href="https://wa.me/34685891214?text=Hola%20Jurada%20Express,%20soy%20brit%C3%A1nico%2Fa%20y%20necesito%20traducci%C3%B3n%20jurada%20para%20un%20tr%C3%A1mite%20en%20Espa%C3%B1a"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                WhatsApp
              </TrackedLink>
            </div>
            <p className="mt-6 max-w-[68ch] text-sm text-slate-600">
              Si vienes de Estados Unidos, India, Irlanda, Canadá o
              Australia,{" "}
              <a href="/traduccion-jurada-por-paises" className="link">
                tienes tu propia guía
              </a>
              .
            </p>
          </div>
          <div className="relative h-56 w-full overflow-hidden rounded-xl shadow md:h-72">
            <Image
              src="/fotos/escritorio-documentos.jpg"
              alt="Mano escribiendo en un cuaderno junto a un portátil, preparando la documentación de un trámite en España"
              fill
              sizes="(min-width: 768px) 480px, 100vw"
              className="object-cover"
            />
          </div>
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

      {/* SOBRE MÍ — corto: la biografía completa está en /sobre-mi */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid items-center gap-8 md:grid-cols-[auto,1fr]">
          {HERO_PHOTO ? (
            <Image
              src={HERO_PHOTO}
              alt={PHOTO_ALT}
              width={112}
              height={112}
              className="mx-auto h-28 w-28 rounded-xl object-cover md:mx-0"
            />
          ) : (
            <div
              className="mx-auto flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-stone-100 font-display text-3xl font-semibold tracking-tight text-brand-navy md:mx-0"
              aria-hidden="true"
            >
              E.P.
            </div>
          )}
          <div>
            <SectionHeading>Sobre mí</SectionHeading>
            <p className="mt-4 max-w-[68ch] text-lg text-slate-600">
              Soy <strong className="text-brand-navy">{PERSON_NAME}</strong>,
              Traductora-Intérprete Jurada de Inglés nombrada por el Ministerio
              de Asuntos Exteriores, Unión Europea y Cooperación con el{" "}
              <a
                href={MAEC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                nº de acreditación {MAEC_NUMBER}
              </a>{" "}
              desde {SINCE}. También hago traducciones certificadas para USCIS
              y atiendo a clientes de Estados Unidos, India, Reino Unido,
              Irlanda, Canadá o Australia con el mismo proceso digital.{" "}
              {TIMEZONE_NOTE.es}.
            </p>
            <p className="mt-4">
              <a href="/sobre-mi" className="link">
                Conoce mi trayectoria →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ + JSON-LD */}
      <section className="mx-auto max-w-6xl px-4 pb-16" data-track-section="faq">
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

      {/* CIERRE */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:pb-20">
        <div
          data-surface="navy"
          className="rounded-xl bg-brand-navy p-8 text-white md:p-12"
        >
          <div className="grid items-center gap-8 md:grid-cols-[1.2fr,0.8fr]">
            <div>
              <SectionHeading light>
                Mándame tu documento y hoy tienes el plazo
              </SectionHeading>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <TrackedLink
                  label="cta_presupuesto_final"
                  href="#calculadora"
                  className="btn btn-gold"
                >
                  Pedir presupuesto en 2 horas
                </TrackedLink>
                <TrackedLink
                  label="cta_whatsapp_final"
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-nav inline-flex min-h-[44px] items-center gap-2 font-medium text-white"
                >
                  <IconWhatsApp className="h-5 w-5 text-brand-gold-300" />
                  Escribir a Elena por WhatsApp
                </TrackedLink>
              </div>
              <QuotePromise locale="es" light className="mt-4 max-w-[60ch]" />
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

      {/* SÍGUENOS */}
      <FollowUs locale="es" />
    </main>
  );
}
