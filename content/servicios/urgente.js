// content/servicios/urgente.js
//
// Página de servicio: traducción jurada urgente y grandes volúmenes, para
// particulares con expedientes completos y para empresas, despachos y
// gestorías. Fuente: docs/BRIEF-INTERNACIONAL-2026-09.md, punto 2.5.
// Capacidad confirmada por Elena: LARGE_PROJECT_CAPACITY (content/site.js).
import { LARGE_PROJECT_CAPACITY } from "../site";

const PATH_ES = "/traduccion-jurada-urgente-grandes-volumenes";
const PATH_EN = "/en/urgent-sworn-translation-large-projects";

const capEs = LARGE_PROJECT_CAPACITY
  ? `Puedo asumir <strong>${LARGE_PROJECT_CAPACITY.es}</strong>; para volúmenes mayores o urgencias fuera de ese margen, pídeme información y te cierro plazo por escrito.`
  : "Para volúmenes grandes o urgencias, pídeme información y te cierro plazo por escrito.";
const capEn = LARGE_PROJECT_CAPACITY
  ? `I can handle <strong>${LARGE_PROJECT_CAPACITY.en}</strong>; for larger volumes or rush jobs beyond that, ask me and I will confirm a deadline in writing.`
  : "For large volumes or rush jobs, ask me and I will confirm a deadline in writing.";

export const es = {
  id: "urgente",
  locale: "es",
  path: PATH_ES,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Urgentes y grandes volúmenes",
  metaTitle: "Traducción jurada urgente y grandes volúmenes",
  metaDescription:
    "Traductora jurada de inglés (MAEC nº 7310) para expedientes completos, lotes de documentos y empresas: revisión previa, lista de apostillas, plazo único por escrito, entrega ordenada y facturación. Sin subcontratar.",
  h1: "Traducción jurada urgente y de grandes volúmenes",
  lead:
    `La traducción jurada urgente o de gran volumen es el servicio con el que traduzco expedientes completos y lotes de documentos (para particulares, empresas, despachos de abogados, gestorías y agencias de relocation) con un presupuesto y un plazo únicos cerrados por escrito antes de empezar, y con entrega ordenada, documento a documento, en PDF firmado. Soy Elena Peñaranda Ortega, Traductora-Intérprete Jurada de Inglés nº 7310: no subcontrato, así que cada página la traduzco, firmo y sello yo. ${
      LARGE_PROJECT_CAPACITY ? `Capacidad: ${LARGE_PROJECT_CAPACITY.es}.` : ""
    } Los documentos sueltos salen en 24/48 h.`,
  image: {
    src: "/fotos/acuerdo-empresa.jpg",
    alt: "Apretón de manos entre dos personas al cerrar un acuerdo de trabajo",
  },
  whatsapp:
    "https://wa.me/34685891214?text=Hola%20Jurada%20Express,%20tengo%20un%20proyecto%20grande%20o%20urgente%20de%20traducci%C3%B3n%20jurada%20y%20necesito%20presupuesto%20y%20plazo%20cerrados",
  whatsappLabel: "Contar mi caso por WhatsApp",
  serviceName: "Traducción jurada urgente y de grandes volúmenes",
  serviceType: "Traducción jurada español-inglés",
  price: null,
  sections: [
    {
      id: "para-quien",
      title: "¿Para quién es este servicio?",
      body: [
        {
          list: [
            '<strong>Particulares con un expediente completo</strong>: visado de <a href="/traduccion-jurada-visado-nomada-digital">nómada digital</a>, nacionalidad, reagrupación familiar, homologación de estudios o un proceso judicial con decenas de documentos que tienen que entrar a la vez.',
            '<strong>Empresas</strong>: cuentas anuales, escrituras, poderes, contratos, documentación laboral de trabajadores desplazados, licitaciones y due diligence con fecha límite.',
            '<strong>Despachos de abogados, gestorías y agencias de relocation</strong>: lotes recurrentes de documentos de clientes, con factura a nombre del despacho y un solo interlocutor.',
            '<strong>Universidades y centros de estudios</strong>: expedientes académicos y títulos de grupos de alumnos con la misma fecha de entrega.',
          ],
        },
      ],
    },
    {
      id: "como",
      title: "¿Cómo trabajo un lote de documentos?",
      body: [
        "Un lote no es una suma de encargos sueltos. Lo trato como un proyecto con cinco pasos fijos:",
        {
          list: [
            "<strong>Revisión previa.</strong> Recibo la carpeta completa, la reviso documento a documento y te digo qué falta, qué no necesita traducción y qué está en un idioma que no traduzco.",
            "<strong>Lista de apostillas.</strong> Te indico qué documentos necesitan apostilla o legalización antes de traducirlos, para que no haya que rehacer nada.",
            "<strong>Plazo único por escrito.</strong> Presupuesto cerrado y fecha de entrega en un solo documento, con entregas parciales si te sirven para ir presentando.",
            "<strong>Traducción con criterios uniformes.</strong> Mismos nombres, mismas fechas, misma terminología en todo el lote; glosario del cliente si lo hay.",
            "<strong>Entrega ordenada y facturación.</strong> Un PDF firmado por documento, con la misma numeración que tu carpeta, más índice; factura a tu nombre o al de tu empresa, con IVA desglosado.",
          ],
        },
      ],
    },
    {
      id: "capacidad",
      title: "¿Cuánto volumen puedes asumir y en qué plazo?",
      body: [
        capEs,
        "Un documento habitual (certificado, carta, contrato breve) sale en 24/48 h. Para un lote, el plazo depende del número de páginas, del formato (los escaneos en mala calidad se tardan más en preparar) y de si hay que esperar apostillas. Por eso no publico un plazo genérico: lo calculo con tu carpeta delante y te lo doy por escrito, y ese es el que se cumple.",
        {
          note: "Si tu urgencia es real (una cita en el consulado mañana, un plazo judicial), dímelo en el primer mensaje con la fecha exacta. Te digo en menos de 2 horas si llego y a qué precio, sin recargos escondidos.",
        },
      ],
    },
    {
      id: "no-hago",
      title: "¿Qué no hago?",
      body: [
        {
          list: [
            "<strong>No subcontrato.</strong> Cada traducción jurada la hago, firmo y sello yo. Si un lote supera mi capacidad en el plazo que necesitas, te lo digo y te propongo entregas parciales, no te lo reparto entre traductores que no conoces.",
            "<strong>No traduzco otros idiomas.</strong> Solo inglés ⇆ español. Si tu lote incluye documentos en francés, alemán o hindi, te lo indico en la revisión.",
            "<strong>No prometo plazos que no puedo cumplir.</strong> Prefiero decirte que no llego a decirte que sí y fallar el día de tu cita.",
          ],
        },
      ],
    },
    {
      id: "empresas",
      title: "¿Cómo trabajo con empresas y despachos?",
      body: [
        'Un único interlocutor, presupuesto por lote o tarifa por documento tipo para encargos recurrentes, factura con NIF de la empresa y pago por transferencia o tarjeta. Firmo acuerdo de confidencialidad si lo necesitas antes de ver la documentación. Para entregas en papel, envío por mensajería a la sede del despacho o directamente al cliente final, en España o fuera (coste del transportista en el presupuesto). Consulta la <a href="/precios">página de precios</a> para los importes orientativos por documento.',
      ],
    },
  ],
  steps: [
    {
      t: "Carpeta completa",
      d: "Me envías todo el lote en una carpeta, con los archivos nombrados y la fecha límite real.",
    },
    {
      t: "Revisión y plazo por escrito",
      d: "Qué falta, qué lleva apostilla, precio cerrado y fecha de entrega en menos de 2 h.",
    },
    {
      t: "Traducción y sello",
      d: "Traduzco, firmo y sello cada documento con criterios uniformes; entregas parciales si te ayudan.",
    },
    {
      t: "Entrega ordenada",
      d: "Un PDF firmado por documento, índice y factura; papel por mensajería si lo necesitas.",
    },
  ],
  faq: [
    {
      q: "¿Cobras recargo por urgencia?",
      a: "Depende del plazo y del volumen. Si hay recargo, aparece desglosado en el presupuesto antes de que confirmes; nunca después.",
    },
    {
      q: "¿Puedes entregar parte del lote antes?",
      a: "Sí. Si tienes varias citas o plazos, organizamos entregas parciales por bloques y cada bloque llega firmado y numerado.",
    },
    {
      q: "¿Facturas a empresas y despachos?",
      a: "Sí, con el NIF de la empresa y el IVA desglosado. Para encargos recurrentes puedo acordar una tarifa por tipo de documento.",
    },
    {
      q: "¿Cuánto tarda un expediente completo de nómada digital?",
      a: LARGE_PROJECT_CAPACITY
        ? `Te doy un plazo único por escrito antes de empezar; los documentos sueltos, en 24/48 h. Con una capacidad de ${LARGE_PROJECT_CAPACITY.es}, la mayoría de los expedientes están listos en pocos días.`
        : "Te doy un plazo único por escrito antes de empezar; los documentos sueltos, en 24/48 h.",
    },
    {
      q: "¿Trabajas con clientes fuera de España?",
      a: "Sí. Todo el proceso es digital: recibo la carpeta por email o enlace, el pago es con tarjeta internacional y la entrega es un PDF firmado, con papel por mensajería a cualquier país si hace falta.",
    },
  ],
  cta: {
    title: "Cuéntame tu proyecto",
    text: "Dime cuántos documentos son, en qué idioma están y para cuándo los necesitas. Te respondo en menos de 2 horas laborables con la revisión, el precio cerrado y el plazo por escrito.",
  },
  related: [
    { href: "/traduccion-jurada-visado-nomada-digital", label: "Visado de nómada digital" },
    { href: "/traduccion-jurada-certificado-empresa", label: "Certificado de empresa y nóminas" },
    { href: "/traduccion-jurada-contrato-escritura", label: "Contratos y escrituras" },
    { href: "/traduccion-jurada-estados-unidos", label: "Clientes de Estados Unidos" },
    { href: "/traduccion-jurada-india", label: "Clientes de India" },
  ],
  otherLangLabel: "Urgent sworn translation and large projects",
};

export const en = {
  id: "urgente",
  locale: "en",
  path: PATH_EN,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Urgent and large projects",
  metaTitle: "Urgent sworn translation and large projects in Spain",
  metaDescription:
    "Sworn translator of English (Ministry no. 7310) for complete files, document batches and companies: prior review, apostille checklist, single deadline in writing, ordered delivery and invoicing. No subcontracting.",
  h1: "Urgent sworn translation and large projects",
  lead:
    `Urgent or bulk sworn translation is the service through which I translate complete files and batches of documents (for individuals, companies, law firms, relocation agencies and administrative advisers) with a single quote and a single deadline confirmed in writing before I start, delivered in order, document by document, as signed PDFs. I am Elena Peñaranda Ortega, sworn translator no. 7310: I do not subcontract, so every page is translated, signed and stamped by me. ${
      LARGE_PROJECT_CAPACITY ? `Capacity: ${LARGE_PROJECT_CAPACITY.en}.` : ""
    } Individual documents take 24/48 hours.`,
  image: {
    src: "/fotos/acuerdo-empresa.jpg",
    alt: "Two people shaking hands as they close a working agreement",
  },
  whatsapp:
    "https://wa.me/34685891214?text=Hi%20Jurada%20Express,%20I%20have%20a%20large%20or%20urgent%20sworn%20translation%20project%20and%20need%20a%20fixed%20quote%20and%20deadline",
  whatsappLabel: "Tell me about your project on WhatsApp",
  serviceName: "Urgent sworn translation and large projects",
  serviceType: "Sworn Spanish-English translation",
  price: null,
  sections: [
    {
      id: "who",
      title: "Who is this service for?",
      body: [
        {
          list: [
            '<strong>Individuals with a complete file</strong>: <a href="/en/sworn-translation-spain-digital-nomad-visa">digital nomad visa</a>, citizenship, family reunification, recognition of qualifications or court proceedings with dozens of documents that must be submitted together.',
            '<strong>Companies</strong>: annual accounts, deeds, powers of attorney, contracts, employment documents for posted workers, tenders and due diligence with a hard deadline.',
            '<strong>Law firms, administrative advisers and relocation agencies</strong>: recurring batches of client documents, invoiced to the firm, with a single point of contact.',
            '<strong>Universities and schools</strong>: transcripts and degrees for groups of students with the same delivery date.',
          ],
        },
      ],
    },
    {
      id: "how",
      title: "How do I handle a batch of documents?",
      body: [
        "A batch is not a pile of separate orders. I treat it as a project with five fixed steps:",
        {
          list: [
            "<strong>Prior review.</strong> I receive the complete folder, go through it document by document and tell you what is missing, what does not need translating and what is in a language I do not translate.",
            "<strong>Apostille checklist.</strong> I tell you which documents need an apostille or legalisation before translation, so nothing has to be redone.",
            "<strong>Single deadline in writing.</strong> Fixed quote and delivery date in one document, with partial deliveries if they help you file in stages.",
            "<strong>Consistent translation.</strong> Same names, same dates, same terminology across the whole batch; client glossary if there is one.",
            "<strong>Ordered delivery and invoicing.</strong> One signed PDF per document, numbered like your folder, plus an index; invoice in your name or your company's, with VAT itemised.",
          ],
        },
      ],
    },
    {
      id: "capacity",
      title: "How much volume can you take on, and how fast?",
      body: [
        capEn,
        "A standard document (certificate, letter, short contract) takes 24/48 hours. For a batch, the deadline depends on the number of pages, the format (poor-quality scans take longer to prepare) and whether apostilles are still pending. That is why I do not publish a generic turnaround: I calculate it with your folder in front of me, confirm it in writing, and that is the deadline I keep.",
        {
          note: "If your deadline is real (a consulate appointment tomorrow, a court filing), tell me in your first message with the exact date. Within 2 hours I tell you whether I can make it and at what price, with no hidden surcharges.",
        },
      ],
    },
    {
      id: "not",
      title: "What I do not do",
      body: [
        {
          list: [
            "<strong>I do not subcontract.</strong> Every sworn translation is done, signed and stamped by me. If a batch exceeds my capacity within your deadline, I tell you and propose partial deliveries rather than splitting it among translators you do not know.",
            "<strong>I do not translate other languages.</strong> English ⇆ Spanish only. If your batch includes documents in French, German or Hindi, I flag them in the review.",
            "<strong>I do not promise deadlines I cannot keep.</strong> I would rather tell you I cannot make it than say yes and fail on the day of your appointment.",
          ],
        },
      ],
    },
    {
      id: "companies",
      title: "How do I work with companies and law firms?",
      body: [
        'One point of contact, a quote per batch or a rate per document type for recurring work, invoices with your company\'s tax number, and payment by bank transfer or card. I sign a confidentiality agreement before seeing the documents if you need one. For paper deliveries I courier to the firm\'s office or directly to the end client, in Spain or abroad (courier cost stated in the quote). See the <a href="/en/precios">pricing page</a> for indicative amounts per document.',
      ],
    },
  ],
  steps: [
    {
      t: "Complete folder",
      d: "You send me the whole batch in one folder, with files named and the real deadline.",
    },
    {
      t: "Review and deadline in writing",
      d: "What is missing, what needs an apostille, fixed price and delivery date within 2 hours.",
    },
    {
      t: "Translation and stamp",
      d: "I translate, sign and stamp every document with consistent criteria; partial deliveries if they help.",
    },
    {
      t: "Ordered delivery",
      d: "One signed PDF per document, an index and the invoice; paper by courier if you need it.",
    },
  ],
  faq: [
    {
      q: "Do you charge a rush fee?",
      a: "It depends on the deadline and the volume. If there is a surcharge, it is itemised in the quote before you confirm; never afterwards.",
    },
    {
      q: "Can you deliver part of the batch earlier?",
      a: "Yes. If you have several appointments or deadlines, we organise partial deliveries in blocks, and each block arrives signed and numbered.",
    },
    {
      q: "Do you invoice companies and law firms?",
      a: "Yes, with the company's tax number and VAT itemised. For recurring work I can agree a rate per document type.",
    },
    {
      q: "How long does a complete digital nomad visa file take?",
      a: LARGE_PROJECT_CAPACITY
        ? `You get a single deadline in writing before I start; individual documents take 24/48 hours. With a capacity of ${LARGE_PROJECT_CAPACITY.en}, most files are ready within a few days.`
        : "You get a single deadline in writing before I start; individual documents take 24/48 hours.",
    },
    {
      q: "Do you work with clients outside Spain?",
      a: "Yes. The whole process is digital: I receive the folder by email or link, payment is by international card and delivery is a signed PDF, with paper by courier to any country if needed.",
    },
  ],
  cta: {
    title: "Tell me about your project",
    text: "Tell me how many documents there are, what language they are in and when you need them. Within 2 working hours you get the review, a fixed price and the deadline in writing.",
  },
  related: [
    { href: "/en/sworn-translation-spain-digital-nomad-visa", label: "Digital nomad visa" },
    { href: "/en/sworn-translation-usa-spain", label: "Clients in the United States" },
    { href: "/en/sworn-translation-india-spain", label: "Clients in India" },
    { href: "/en/sworn-translation-british-residents-spain", label: "British residents in Spain" },
    { href: "/en/how-it-works", label: "How it works" },
  ],
  otherLangLabel: "Traducción jurada urgente y grandes volúmenes",
};
