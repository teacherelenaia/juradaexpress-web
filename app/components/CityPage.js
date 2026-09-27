// app/components/CityPage.js
//
// Landing de ciudad (/traductor-jurado-<ciudad>), FASE 1 SEO 26/09/2026.
// Un único componente compone la página a partir de content/ciudades.js
// y la pinta con la plantilla ServicePage (H1, párrafo citable, bloques,
// cuatro pasos, FAQ con FAQPage, CTA de WhatsApp). Las partes comunes
// (cómo funciona la entrega, documentos habituales, pasos) se generan aquí
// para que las cinco ciudades sean coherentes y solo cambie lo local.
// El JSON-LD lleva Service con areaServed = la ciudad (City dentro de su
// provincia) y BreadcrumbList; ServicePage los emite.
import ServicePage, { serviceMetadata } from "./ServicePage";
import { CIUDADES } from "../../content/ciudades";
import { DOCUMENTS, MIN_PRICE } from "../../content/documents";

const FICHA_OF = {
  "partida-nacimiento": "/traduccion-jurada-partida-nacimiento",
  "certificado-matrimonio": "/traduccion-jurada-certificado-matrimonio",
  "antecedentes-penales": "/traduccion-jurada-certificado-penales",
  "permiso-conducir": "/traduccion-jurada-permiso-conducir",
  "titulo-universitario": "/traduccion-jurada-titulo-universitario",
  "expediente-academico": "/traduccion-jurada-titulo-universitario",
  "certificado-empresa": "/traduccion-jurada-certificado-empresa",
  "contrato-escritura": "/traduccion-jurada-contrato-escritura",
  "dni-pasaporte": "/traduccion-jurada-dni-pasaporte",
  "testamento-herencia": "/traduccion-jurada-testamento-herencia",
  "certificado-medico": "/traduccion-jurada-certificado-medico",
};

function docLine(id) {
  const d = DOCUMENTS.find((x) => x.id === id);
  if (!d) return null;
  const href = FICHA_OF[id] || "/documentos";
  const price =
    d.price != null
      ? `${d.price} €`
      : "presupuesto cerrado en menos de 2 h";
  return `<a href="${href}">${d.name}</a> — ${price}`;
}

/** Construye el objeto `page` que espera ServicePage a partir de una ciudad. */
export function buildCityPage(ciudad) {
  const path = `/${ciudad.slug}`;
  const otras = CIUDADES.filter((c) => c.slug !== ciudad.slug);

  return {
    id: `ciudad-${ciudad.id}`,
    locale: "es",
    path,
    alternates: { es: path, en: null },
    crumb: `Traductor jurado de inglés en ${ciudad.nombre}`,
    guarantees: true,
    metaTitle: ciudad.metaTitle,
    metaDescription: ciudad.metaDescription,
    h1: ciudad.h1,
    lead: ciudad.lead,
    image: {
      src: "/hero-murcia.jpg",
      alt: `Traducción jurada de inglés firmada y sellada para clientes de ${ciudad.nombre}`,
    },
    whatsapp: ciudad.whatsapp,
    whatsappLabel: `Escribir desde ${ciudad.nombre}`,
    serviceName: `Traducción jurada de inglés para clientes de ${ciudad.nombre}`,
    serviceType: "Traducción jurada Español ⇆ Inglés",
    priceFrom: MIN_PRICE,
    areaServed: [
      {
        "@type": "City",
        name: ciudad.nombre,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: ciudad.provincia,
        },
      },
      { "@type": "Country", name: "ES" },
    ],
    sections: [
      {
        id: "tramites",
        title: `Trámites habituales en ${ciudad.nombre} que piden traducción jurada`,
        body: [
          `Estos son los organismos y trámites de ${ciudad.nombre} para los que más traducciones juradas de inglés me piden. Cada uno tiene sus requisitos (apostilla, papel o PDF, copia del original), y te digo cuáles son antes de que pagues:`,
          { list: ciudad.tramites },
        ],
      },
      {
        id: "como",
        title: `Cómo trabajo con clientes de ${ciudad.nombre}`,
        body: [
          ...ciudad.notas,
          `<strong>Entrega en PDF y en papel.</strong> Por defecto recibes la traducción como PDF firmado electrónicamente, que la Administración acepta para la presentación telemática y que puedes reenviar sin límite. Si tu organismo pide el original en papel, lo imprimo, lo firmo y sello a mano y lo envío por mensajería a ${ciudad.nombre}; el coste del envío va en el presupuesto y sale el mismo día que la entrega digital. No tengo oficina en ${ciudad.nombre} ni necesitas venir a Murcia: todo se resuelve por WhatsApp, email o el <a href="/documentos">catálogo</a>.`,
        ],
      },
      {
        id: "documentos",
        title: `Documentos que más traduzco para ${ciudad.nombre}`,
        body: [
          `Precios por documento estándar de una página, los mismos del <a href="/precios">catálogo</a>; los documentos largos se presupuestan al verlos. Todos incluyen certificación, firma y sello, PDF firmado y copia sellada del original.`,
          { list: ciudad.documentos.map(docLine).filter(Boolean) },
          `Si el tuyo no está en la lista, elige "otro documento" en el catálogo o mándamelo por WhatsApp y te doy precio igual. En la guía <a href="/traductor-jurado-ingles">traductor jurado de inglés online</a> explico qué es una traducción jurada, cómo comprobar mi nombramiento en el listado del MAEC y cuándo hace falta apostilla.`,
        ],
      },
      {
        id: "otras",
        title: "También atiendo en",
        body: [
          {
            list: [
              '<a href="/traductor-jurado-murcia">Murcia</a> — mi sede, con entrega en papel al día siguiente en la capital y pedanías.',
              ...otras.map(
                (c) => `<a href="/${c.slug}">${c.nombre}</a> — mismo servicio online, papel por mensajería.`
              ),
              "Y en cualquier otra ciudad de España o del extranjero: la traducción jurada vale en todo el territorio y el PDF llega igual a todas partes.",
            ],
          },
        ],
      },
    ],
    howTitle: `Cómo pedir tu traducción jurada desde ${ciudad.nombre}`,
    steps: [
      {
        t: "Envío",
        d: "Me mandas el documento escaneado o fotografiado, completo y legible, por WhatsApp, email o el catálogo.",
      },
      {
        t: "Presupuesto",
        d: "En menos de 2 horas te doy precio cerrado, plazo y aviso de apostilla si tu trámite la necesita.",
      },
      {
        t: "Traducción jurada",
        d: "Traduzco, certifico, firmo y sello personalmente cada página.",
      },
      {
        t: "Entrega",
        d: `PDF firmado en 24/48 h y, si lo necesitas, papel por mensajería a ${ciudad.nombre}.`,
      },
    ],
    faq: ciudad.faq,
    cta: {
      title: `¿Necesitas una traducción jurada en ${ciudad.nombre}?`,
      text: "Envíame el documento escaneado por WhatsApp o email y en menos de 2 horas tendrás precio cerrado y plazo real. Si no necesita traducción jurada, te lo diré antes de cobrarte nada.",
    },
    related: [
      { href: "/traductor-jurado-ingles", label: "Traductor jurado de inglés online" },
      { href: "/traductor-jurado-murcia", label: "Traductor jurado en Murcia" },
      { href: "/traduccion-jurada-britanicos-espana", label: "Británicos en España" },
      { href: "/como-funciona", label: "Cómo funciona" },
    ],
    otherLangLabel: null,
  };
}

export function cityMetadata(ciudad) {
  return serviceMetadata(buildCityPage(ciudad));
}

export default function CityPage({ ciudad }) {
  return <ServicePage page={buildCityPage(ciudad)} />;
}
