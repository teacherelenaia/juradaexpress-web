// app/traductor-jurado-murcia/page.js
//
// Página local de Murcia (ampliada el 26/09/2026, FASE 1 SEO): barrios y
// pedanías atendidos, entrega en papel en 24 h en la capital, trámites
// habituales en Murcia con el organismo por su nombre, clientes británicos
// e irlandeses de la Región, FAQ local con FAQPage y bloque "También
// atiendo en" con las landings de ciudad de content/ciudades.js. Servicio
// online con sede en Murcia: no se publica dirección ni horario de oficina.
import TrackedLink from "../../components/TrackedLink";
import { SectionHeading } from "../../components/ui";
import { WHATSAPP_URL, TIMEZONE_NOTE } from "../../../content/site";
import { DOCUMENTS, MIN_PRICE } from "../../../content/documents";
import { CIUDADES } from "../../../content/ciudades";
import {
  MAEC_URL,
  ORGANIZATION_ID,
  SINCE,
  yearsOfExperience,
} from "../../../content/persona";

const BASE = "https://juradaexpress.es";
const PATH = "/traductor-jurado-murcia";

const priceOf = (id) => DOCUMENTS.find((d) => d.id === id)?.price ?? null;

export const metadata = {
  title: `Traductor jurado de inglés en Murcia · desde ${MIN_PRICE} €`,
  description: `Traductora jurada de inglés en Murcia (MAEC nº 7310). PDF firmado en 24/48 h, papel en 24 h en la capital. Extranjería, Registro Civil, UMU y UCAM. Desde ${MIN_PRICE} €.`,
  alternates: {
    canonical: `${BASE}${PATH}`,
  },
};

const WHATSAPP_MURCIA =
  "https://wa.me/34685891214?text=Hola%20Elena%2C%20soy%20de%20Murcia%20y%20necesito%20una%20traducci%C3%B3n%20jurada%20de%20ingl%C3%A9s%20%28te%20env%C3%ADo%20el%20documento%29";

// Pedanías y barrios en los que la entrega en papel suele ser al día
// siguiente de la entrega digital. Lista orientativa, no cerrada.
const PEDANIAS = [
  "El Palmar",
  "Espinardo",
  "Cabezo de Torres",
  "Puente Tocinos",
  "Beniaján",
  "Sangonera la Verde",
  "La Alberca",
  "Algezares",
  "Alquerías",
  "El Raal",
  "Torreagüera",
  "Los Dolores",
  "Churra",
  "Guadalupe",
  "La Ñora",
  "Javalí Nuevo",
  "Aljucer",
  "Santo Ángel",
  "Monteagudo",
  "Llano de Brujas",
  "Santiago y Zaraíche",
  "Sucina",
  "Gea y Truyols",
  "La Arboleja",
];

const BARRIOS = [
  "Centro",
  "San Antolín",
  "Santa Eulalia",
  "El Carmen",
  "Vistalegre",
  "La Flota",
  "Santa María de Gracia",
  "Infante Juan Manuel",
  "San Basilio",
  "Juan Carlos I",
  "El Ranero",
  "Vistabella",
];

const MUNICIPIOS = [
  "Molina de Segura",
  "Alcantarilla",
  "Las Torres de Cotillas",
  "Cartagena",
  "Lorca",
  "Cieza",
  "Yecla",
  "Jumilla",
  "Caravaca de la Cruz",
  "Totana",
  "Mazarrón",
  "Águilas",
  "San Javier",
  "San Pedro del Pinatar",
  "Los Alcázares",
  "Torre Pacheco",
];

const TRAMITES = [
  {
    t: "Oficina de Extranjería de Murcia",
    d: "NIE y TIE, residencia de familiares de ciudadanos de la UE, arraigo, reagrupación familiar, nacionalidad por residencia y autorizaciones de nómada digital iniciadas desde España. Piden traducción jurada de certificados de nacimiento, matrimonio y antecedentes penales extranjeros, casi siempre con apostilla.",
  },
  {
    t: "Registro Civil de Murcia",
    d: "Expedientes de nacionalidad, inscripción de matrimonios y nacimientos celebrados en el Reino Unido, Irlanda o Estados Unidos, y expedientes matrimoniales cuando uno de los dos es extranjero. La traducción jurada se adjunta a la copia sellada del certificado original.",
  },
  {
    t: "Universidad de Murcia (UMU) y UCAM",
    d: "Admisión de alumnos internacionales, Erasmus y convenios, equivalencia y homologación de títulos extranjeros, y expedientes académicos en inglés de alumnos murcianos que se van a estudiar o a colegiarse fuera. También la UPCT en Cartagena.",
  },
  {
    t: "Ayuntamiento de Murcia y ayuntamientos de la Región",
    d: "Empadronamiento con documentación extranjera, parejas de hecho, escolarización de menores y trámites municipales que piden certificados traducidos.",
  },
  {
    t: "Consejería de Educación",
    d: "Homologación y convalidación de estudios no universitarios (secundaria, bachillerato, FP) cursados en países de habla inglesa, con traducción jurada de certificados y expedientes.",
  },
  {
    t: "Notarías, registros y juzgados de Murcia",
    d: "Compraventas con compradores extranjeros, poderes otorgados en el Reino Unido o Estados Unidos, herencias con bienes en la Región (testamentos ingleses, grant of probate) y procedimientos judiciales con documentos en inglés.",
  },
  {
    t: "Jefatura Provincial de Tráfico",
    d: "Canje y reconocimiento de permisos de conducir extranjeros y trámites de vehículos importados con documentación en inglés.",
  },
];

const FAQ = [
  {
    q: "¿Puedo ir a tu oficina en Murcia a entregarte el documento?",
    a: "No hace falta y no atiendo en oficina: el servicio es online. Me envías el documento escaneado o fotografiado por WhatsApp o email, te doy precio y plazo por escrito y recibes el PDF firmado. Si necesitas el papel, te lo envío por mensajería.",
  },
  {
    q: "¿Cuánto tarda en llegar la traducción en papel en Murcia?",
    a: "En Murcia capital y pedanías, normalmente al día siguiente de la entrega digital (24 h); en el resto de la Región, 24/48 h. El papel lleva firma manuscrita y sello y es la misma traducción que el PDF.",
  },
  {
    q: "¿La traducción jurada vale en la Oficina de Extranjería de Murcia y en el Registro Civil?",
    a: "Sí. Soy traductora jurada nombrada por el Ministerio de Asuntos Exteriores (nº 7310) y mi firma es válida ante cualquier organismo de España. Puedes comprobar el nombramiento en el listado oficial del MAEC.",
  },
  {
    q: "¿Necesito apostillar mi certificado británico antes de traducirlo?",
    a: "Para Extranjería, nacionalidad y Registro Civil, normalmente sí: la apostilla la emite el FCDO en el Reino Unido y se tramita antes de traducir. Si el documento la lleva, la traduzco también. Si no estás seguro, mándame el documento y te lo digo antes de que gestiones nada.",
  },
  {
    q: "¿Traduces documentos españoles al inglés para el Home Office o la DVLA?",
    a: "Sí. Traduzco al inglés con la certificación que piden el Home Office, la DVLA, HMRC, el DWP o los bancos británicos, con mis datos de contacto y la confirmación de exactitud. Es el mismo proceso digital y tienes una guía completa en la página para británicos en España.",
  },
  {
    q: "¿Cuánto cuesta una traducción jurada en Murcia?",
    a: `Los certificados habituales (nacimiento, matrimonio, antecedentes penales) cuestan ${MIN_PRICE} €; el permiso de conducir, ${priceOf("permiso-conducir")} €; el certificado de empresa, ${priceOf("certificado-empresa")} €; el título universitario, ${priceOf("titulo-universitario")} €. Los documentos largos se presupuestan al verlos, con precio cerrado en menos de 2 horas.`,
  },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      {/* Miga de pan */}
      <nav aria-label="Miga de pan" className="text-sm text-slate-500">
        <a href="/" className="link-crumb">
          Inicio
        </a>{" "}
        <span aria-hidden="true">/</span>{" "}
        <span className="text-slate-700">Traductor jurado en Murcia</span>
      </nav>

      <h1 className="font-display text-balance mt-4 text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">
        Traductor jurado de inglés en Murcia
      </h1>
      <p className="mt-4 max-w-[68ch] text-lg text-slate-600">
        Soy Elena Peñaranda Ortega, traductora jurada de inglés con sede en
        Murcia y{" "}
        <a
          href={MAEC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          nº de acreditación 7310 del MAEC
        </a>{" "}
        desde {SINCE} ({yearsOfExperience()} años de nombramiento vigente).
        Trabajo con clientes de Murcia capital, de las pedanías y de toda
        la Región: me envías el documento escaneado, te doy precio cerrado en
        menos de 2 horas y recibes el PDF firmado en 24/48 h. Y si tu trámite
        exige la traducción en papel, en Murcia capital la tienes normalmente
        al día siguiente. Los documentos habituales cuestan desde{" "}
        <span className="tabular-nums">{MIN_PRICE} €</span>.
      </p>

      <div className="mt-7 flex flex-wrap gap-3">
        <TrackedLink
          label="murcia_whatsapp_hero"
          href={WHATSAPP_MURCIA}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Enviar documento por WhatsApp
        </TrackedLink>
        <TrackedLink
          label="murcia_presupuesto_hero"
          href="/documentos"
          className="btn btn-secondary"
        >
          Pedir presupuesto
        </TrackedLink>
      </div>

      {/* CÓMO TRABAJO */}
      <SectionHeading as="h2" className="mt-12 !text-2xl md:!text-3xl">
        Cómo trabajo con clientes de Murcia
      </SectionHeading>
      <div className="mt-4 max-w-[68ch] space-y-4 text-slate-600">
        <p>
          El proceso es 100 % digital y no necesitas desplazarte a ninguna
          oficina: me envías el documento escaneado o fotografiado (completo,
          nítido, con anverso y reverso) por WhatsApp, email o el{" "}
          <a href="/documentos" className="link">
            catálogo
          </a>
          , y en menos de 2 horas te respondo con precio cerrado y plazo real.
          Pagas con tarjeta o transferencia y recibes la traducción jurada en
          PDF firmado electrónicamente en 24/48 h, con la misma validez que el
          papel para la presentación telemática en Extranjería, Registro Civil,
          universidad o sede electrónica.
        </p>
        <p>
          <strong className="text-slate-900">Entrega en papel en 24 h en Murcia capital.</strong>{" "}
          Si tu organismo pide el original con firma manuscrita y sello, lo
          imprimo, lo firmo y sello a mano y sale por mensajería el mismo día
          que la entrega digital. En la capital y las pedanías suele llegar al
          día siguiente; en el resto de la Región, en 24/48 h. El coste del
          envío va indicado en el presupuesto y no hay recargo por la versión
          en papel además del PDF.
        </p>
        <p>
          Cada traducción la hago, firmo y sello personalmente: no
          subcontrato ni paso tu documento por terceros. Traduzco en los dos
          sentidos, del inglés al español para trámites en España y del
          español al inglés para el Reino Unido, Irlanda, Estados Unidos,
          Canadá o Australia. {TIMEZONE_NOTE.es}.
        </p>
      </div>

      {/* ZONAS */}
      <SectionHeading as="h2" className="mt-12 !text-2xl md:!text-3xl">
        Barrios, pedanías y municipios que atiendo
      </SectionHeading>
      <div className="mt-4 max-w-[68ch] space-y-4 text-slate-600">
        <p>
          Al ser un servicio online, atiendo a toda la Región de Murcia por
          igual. Donde sí hay diferencia es en el papel: en Murcia capital y
          en las pedanías el envío suele entregarse al día siguiente.
        </p>
        <p>
          <strong className="text-slate-900">Barrios de Murcia:</strong>{" "}
          {BARRIOS.join(", ")} y el resto de la ciudad.
        </p>
        <p>
          <strong className="text-slate-900">Pedanías:</strong>{" "}
          {PEDANIAS.join(", ")} y las demás pedanías del municipio.
        </p>
        <p>
          <strong className="text-slate-900">Otros municipios de la Región:</strong>{" "}
          {MUNICIPIOS.join(", ")} y cualquier otro. Cartagena tiene{" "}
          <a href="/traductor-jurado-cartagena" className="link">
            su propia página
          </a>
          .
        </p>
      </div>

      {/* TRÁMITES */}
      <SectionHeading as="h2" className="mt-12 !text-2xl md:!text-3xl">
        Trámites habituales en Murcia que piden traducción jurada
      </SectionHeading>
      <p className="mt-4 max-w-[68ch] text-slate-600">
        Estos son los organismos de Murcia para los que más traducciones
        juradas de inglés me piden. Cada uno tiene sus requisitos (apostilla,
        papel o PDF, copia del original) y te los explico antes de que pagues.
      </p>
      <ul className="mt-6 max-w-[68ch] space-y-4">
        {TRAMITES.map((tr) => (
          <li key={tr.t} className="flex gap-3">
            <span
              className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold-500"
              aria-hidden="true"
            />
            <div>
              <h3 className="font-semibold text-slate-900">{tr.t}</h3>
              <p className="mt-1 text-slate-600">{tr.d}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* BRITÁNICOS E IRLANDESES */}
      <SectionHeading as="h2" className="mt-12 !text-2xl md:!text-3xl">
        Clientes británicos e irlandeses de la Región de Murcia
      </SectionHeading>
      <div className="mt-4 max-w-[68ch] space-y-4 text-slate-600">
        <p>
          La Región tiene una comunidad británica e irlandesa muy numerosa en
          Mazarrón y Camposol, en el Mar Menor (Los Alcázares, San Javier, San
          Pedro del Pinatar, La Manga), en Águilas y en las urbanizaciones del
          campo de Murcia como Sucina, Hacienda Riquelme o Mar Menor Golf
          Resort. Buena parte de mis encargos vienen de ahí, en los dos
          sentidos:
        </p>
        <ul className="space-y-2 text-slate-700">
          <li className="flex gap-3">
            <span
              className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold-500"
              aria-hidden="true"
            />
            <span>
              <strong className="text-slate-900">Del inglés al español</strong>:
              certificados de nacimiento y matrimonio del GRO, antecedentes
              penales de ACRO o de la Garda, testamentos y grant of probate,
              poderes y P60 para Extranjería, el Registro Civil, el notario o
              el banco.
            </span>
          </li>
          <li className="flex gap-3">
            <span
              className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold-500"
              aria-hidden="true"
            />
            <span>
              <strong className="text-slate-900">Del español al inglés</strong>:
              certificados de empadronamiento, vida laboral, escrituras,
              certificados médicos o de penales españoles con la certificación
              que piden el Home Office, la DVLA, HMRC, el DWP, Irish
              Immigration o un banco británico.
            </span>
          </li>
        </ul>
        <p>
          Tras el Brexit, los documentos británicos necesitan apostilla del
          FCDO para la mayoría de trámites en España; los irlandeses, como
          Irlanda está en la UE, muchas veces no (Reglamento (UE) 2016/1191).
          Te lo confirmo documento a documento. Tienes una guía completa en{" "}
          <a href="/traduccion-jurada-britanicos-espana" className="link">
            traducción jurada para británicos en España
          </a>{" "}
          y otra en{" "}
          <a href="/traduccion-jurada-irlanda" className="link">
            traducción jurada para clientes de Irlanda
          </a>
          .
        </p>
      </div>

      {/* PRECIOS */}
      <SectionHeading as="h2" className="mt-12 !text-2xl md:!text-3xl">
        Precios y plazos
      </SectionHeading>
      <div className="mt-4 max-w-[68ch] space-y-4 text-slate-600">
        <p>
          Los precios son los mismos para Murcia que para cualquier otra
          ciudad: los certificados habituales (nacimiento, matrimonio,
          antecedentes penales) cuestan{" "}
          <span className="tabular-nums">{MIN_PRICE} €</span>; el permiso de
          conducir,{" "}
          <span className="tabular-nums">{priceOf("permiso-conducir")} €</span>;
          el certificado de empresa,{" "}
          <span className="tabular-nums">{priceOf("certificado-empresa")} €</span>;
          el título universitario,{" "}
          <span className="tabular-nums">{priceOf("titulo-universitario")} €</span>.
          Contratos, escrituras y expedientes largos se presupuestan al ver el
          documento, con precio cerrado en menos de 2 horas. Plazo habitual:
          24/48 h. Consulta la{" "}
          <a href="/precios" className="link">
            tabla de precios completa
          </a>{" "}
          o la guía{" "}
          <a href="/traductor-jurado-ingles" className="link">
            traductor jurado de inglés online
          </a>
          , donde explico qué es una traducción jurada, cómo comprobar mi
          nombramiento y cuándo hace falta apostilla.
        </p>
      </div>

      {/* TAMBIÉN ATIENDO EN */}
      <SectionHeading as="h2" className="mt-12 !text-2xl md:!text-3xl">
        También atiendo en
      </SectionHeading>
      <p className="mt-4 max-w-[68ch] text-slate-600">
        La traducción jurada es válida en toda España y el PDF firmado llega
        igual a cualquier ciudad; el papel, por mensajería en 24/48 h. Tengo
        páginas con los trámites habituales de:
      </p>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {CIUDADES.map((c) => (
          <li key={c.slug}>
            <a href={`/${c.slug}`} className="link">
              {c.nombre}
            </a>
          </li>
        ))}
        <li>
          <a href="/traduccion-jurada-por-paises" className="link">
            Clientes de otros países
          </a>
        </li>
      </ul>

      {/* FAQ */}
      <SectionHeading as="h2" className="mt-12 !text-2xl md:!text-3xl">
        Preguntas frecuentes en Murcia
      </SectionHeading>
      <div className="mt-6 divide-y divide-stone-200 rounded-xl bg-white ring-1 ring-stone-200">
        {FAQ.map((f) => (
          <details key={f.q} className="group p-5">
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

      {/* CTA */}
      <div className="mt-10 rounded-xl bg-stone-50 p-6 ring-1 ring-stone-200 md:p-8">
        <SectionHeading as="h2" className="!text-2xl md:!text-3xl">
          ¿Te traduzco tu documento?
        </SectionHeading>
        <p className="mt-3 max-w-[68ch] text-slate-600">
          Envíamelo escaneado por WhatsApp o email y en menos de 2 horas
          tendrás precio cerrado y plazo real. Si no necesita traducción
          jurada, te lo diré antes de cobrarte nada.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <TrackedLink
            label="murcia_whatsapp"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            WhatsApp
          </TrackedLink>
          <TrackedLink
            label="murcia_presupuesto"
            href="/documentos"
            className="btn btn-secondary"
          >
            Pedir presupuesto
          </TrackedLink>
          <a href="/como-funciona" className="btn btn-ghost">
            Cómo funciona
          </a>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                "@id": `${BASE}${PATH}#service`,
                name: "Traducción jurada de inglés en Murcia",
                serviceType: "Traducción jurada Español ⇆ Inglés",
                url: `${BASE}${PATH}`,
                inLanguage: "es",
                provider: {
                  "@type": "ProfessionalService",
                  "@id": ORGANIZATION_ID,
                  name: "Jurada Express",
                  url: `${BASE}/`,
                },
                areaServed: [
                  {
                    "@type": "City",
                    name: "Murcia",
                    containedInPlace: {
                      "@type": "AdministrativeArea",
                      name: "Región de Murcia",
                    },
                  },
                  {
                    "@type": "AdministrativeArea",
                    name: "Región de Murcia",
                  },
                ],
                availableLanguage: ["es", "en"],
                offers: {
                  "@type": "Offer",
                  priceCurrency: "EUR",
                  priceSpecification: {
                    "@type": "PriceSpecification",
                    minPrice: MIN_PRICE,
                    priceCurrency: "EUR",
                  },
                  availability: "https://schema.org/InStock",
                  url: `${BASE}${PATH}`,
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Inicio",
                    item: `${BASE}/`,
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Traductor jurado en Murcia",
                    item: `${BASE}${PATH}`,
                  },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: FAQ.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
            ],
          }),
        }}
      />
    </main>
  );
}
