// content/servicios/nomada-digital.js
//
// Página de servicio: traducción jurada para el visado de nómada digital
// en España (autorización de residencia para teletrabajo internacional,
// Ley 28/2022). Fuente de la verdad: docs/BRIEF-INTERNACIONAL-2026-09.md,
// punto 0.4. La web NO afirma umbrales de ingresos, tasas ni plazos
// administrativos: para eso remite al consulado o a un abogado.
import { DNV_PACK_PRICE, LARGE_PROJECT_CAPACITY } from "../site";

const PATH_ES = "/traduccion-jurada-visado-nomada-digital";
const PATH_EN = "/en/sworn-translation-spain-digital-nomad-visa";

const priceEs =
  DNV_PACK_PRICE != null
    ? `${DNV_PACK_PRICE} €`
    : "presupuesto cerrado en menos de 2 h";
const priceEn =
  DNV_PACK_PRICE != null
    ? `€${DNV_PACK_PRICE}`
    : "a fixed quote within 2 hours";

export const es = {
  id: "dnv",
  locale: "es",
  path: PATH_ES,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Visado de nómada digital",
  metaTitle: "Traducción jurada para el visado de nómada digital",
  metaDescription: "Traductora jurada del MAEC (nº 7310): qué documentos del visado de nómada digital llevan apostilla y traducción jurada, y plazo único por escrito.",
  h1: "Traducción jurada para el visado de nómada digital en España",
  lead:
    "La traducción jurada para el visado de nómada digital es la traducción al español, firmada y sellada por una traductora nombrada por el Ministerio de Asuntos Exteriores, de los documentos extranjeros que exige la autorización de residencia para teletrabajo internacional (Ley 28/2022): antecedentes penales, contrato o carta del empleador, certificado de la empresa, título, justificantes de ingresos y certificados familiares. Soy Elena Peñaranda Ortega, traductora jurada nº 7310, y traduzco el expediente completo con un único plazo cerrado por escrito; los documentos sueltos, en 24/48 h.",
  image: {
    src: "/fotos/expediente-documentos.jpg",
    alt: "Manos revisando un formulario oficial sobre una carpeta de documentos, como los que componen un expediente de visado de nómada digital",
  },
  whatsapp:
    "https://wa.me/34685891214?text=Hola%20Elena%2C%20estoy%20preparando%20el%20expediente%20del%20visado%20de%20n%C3%B3mada%20digital%20y%20quiero%20saber%20qu%C3%A9%20documentos%20necesitan%20traducci%C3%B3n%20jurada",
  whatsappLabel: "Enviar mi lista por WhatsApp",
  serviceName: "Traducción jurada del expediente de visado de nómada digital",
  serviceType: "Traducción jurada inglés-español",
  price: DNV_PACK_PRICE,
  sections: [
    {
      id: "expediente",
      title: "¿Qué es el expediente y por qué se deniegan tantas solicitudes?",
      body: [
        "El visado de nómada digital (o la autorización de residencia si ya estás en España) se pide ante el consulado español de tu país o ante la Unidad de Grandes Empresas y Colectivos Estratégicos (UGE). En los dos casos el expediente reúne documentos emitidos por administraciones, empresas, universidades y bancos de uno o varios países, y todo lo que no esté en español tiene que presentarse con <strong>traducción jurada</strong>.",
        "Cuando un expediente se deniega o se requiere subsanación, casi nunca es por el fondo del caso. Lo habitual es un documento sin apostilla, una traducción simple donde se exigía jurada, o un lote incompleto que obliga a empezar de nuevo. Mi trabajo es evitar exactamente eso: reviso tu lista, te digo qué documento necesita apostilla antes de traducirlo y traduzco todo el conjunto con criterios uniformes (mismos nombres, mismas fechas, misma terminología en cada documento).",
        {
          note: "Los requisitos económicos, las tasas y los plazos de resolución los fija la administración y cambian cada año. No los publico aquí a propósito: confírmalos con el consulado, con la UGE o con un abogado de extranjería. Yo me ocupo de los documentos, las apostillas y la traducción.",
        },
      ],
    },
    {
      id: "documentos",
      title: "¿Qué documentos del visado de nómada digital necesitan traducción jurada?",
      body: [
        "Esta es la lista de documentos que el consulado o la UGE piden con más frecuencia. Si tu país es firmante del Convenio de La Haya, la apostilla se pone en el original antes de traducirlo, porque la apostilla también se traduce.",
        {
          table: {
            caption:
              "Documentos del expediente de nómada digital: apostilla, traducción jurada y quién los emite",
            head: ["Documento", "¿Apostilla?", "¿Traducción jurada?", "Quién lo emite"],
            rows: [
              [
                '<a href="/traduccion-jurada-certificado-penales">Certificado de antecedentes penales</a> del país o países donde has vivido los últimos años',
                "Sí",
                "Sí",
                "Policía o ministerio de justicia del país (FBI o estado en EEUU, ACRO en Reino Unido, MEA/policía en India)",
              ],
              [
                "Contrato de trabajo o carta del empleador extranjero (puesto, salario, antigüedad y autorización expresa para teletrabajar desde España)",
                "No suele pedirse",
                "Sí",
                "Tu empresa",
              ],
              [
                "Contratos con clientes extranjeros (autónomos)",
                "No suele pedirse",
                "Sí",
                "Tus clientes",
              ],
              [
                '<a href="/traduccion-jurada-certificado-empresa">Certificado del registro mercantil</a> que acredite al menos un año de actividad de la empresa (certificate of incorporation, good standing)',
                "Sí, habitualmente",
                "Sí",
                "Registro mercantil o secretaría de estado del país",
              ],
              [
                '<a href="/traduccion-jurada-titulo-universitario">Título universitario o de posgrado</a>, o cartas de empleadores anteriores que acrediten tres años de experiencia',
                "Sí en el título; en las cartas, según consulado",
                "Sí",
                "Universidad / empleadores anteriores",
              ],
              [
                "Justificantes de ingresos: nóminas, extractos bancarios, facturas, declaraciones fiscales",
                "No",
                "Sí (a veces basta con los de los últimos meses)",
                "Empresa, banco, agencia tributaria",
              ],
              [
                "Certificado de cobertura de Seguridad Social del país de origen (A1 en Reino Unido, certificate of coverage de la SSA en EEUU) o compromiso de alta en España",
                "No",
                "Sí",
                "Seguridad Social de tu país",
              ],
              [
                "Seguro médico con cobertura en España",
                "No",
                "Sí, si la póliza no está en español",
                "Aseguradora",
              ],
              [
                '<a href="/traduccion-jurada-certificado-matrimonio">Certificado de matrimonio</a> o de pareja y <a href="/traduccion-jurada-partida-nacimiento">partidas de nacimiento</a> de los hijos (familiares)',
                "Sí",
                "Sí",
                "Registro civil del país",
              ],
              [
                "Pasaporte",
                "No",
                "No suele necesitarla (se aporta copia)",
                "Tu país",
              ],
            ],
          },
        },
        "Las traducciones juradas que hago llevan mi firma, mi sello y mi certificación en cada documento, incluida la apostilla y cualquier sello o anotación manuscrita. Son válidas ante el consulado, la UGE y cualquier otro organismo español.",
      ],
    },
    {
      id: "familiares",
      title: "¿Qué pasa si viajas con tu familia?",
      body: [
        "Cónyuge, pareja registrada e hijos pueden pedir la autorización contigo o después. Cada familiar aporta su propio certificado (matrimonio o pareja, nacimiento), apostillado y traducido, y en algunos consulados también sus antecedentes penales si son mayores de edad. Te conviene incluirlos en el mismo lote: los nombres y las fechas quedan escritos igual en todos los documentos, que es lo primero que comprueba quien revisa el expediente.",
      ],
    },
    {
      id: "envio",
      title: "¿Cómo me envías el lote de documentos?",
      body: [
        {
          list: [
            "Reúne todo en <strong>una sola carpeta</strong> (Google Drive, Dropbox, WeTransfer o adjuntos por email) y nómbrala con tu apellido.",
            "Escanea cada documento <strong>completo</strong>, con la apostilla y el reverso si tiene sellos. Las fotos de móvil valen si se leen bien.",
            "Pon a cada archivo un nombre claro: <em>01-antecedentes-penales.pdf</em>, <em>02-contrato-trabajo.pdf</em>… Así te devuelvo la traducción con el mismo orden.",
            "Dime en qué consulado o si lo presentas ante la UGE y la fecha de tu cita, si ya la tienes.",
          ],
        },
        "En menos de 2 horas laborables te contesto con la revisión de la lista (qué falta, qué necesita apostilla), el precio cerrado de todo el lote y el plazo único de entrega por escrito.",
      ],
    },
    {
      id: "entrega",
      title: "¿Qué recibes, cuándo y cuánto cuesta?",
      body: [
        `Recibes <strong>un PDF firmado digitalmente por cada documento</strong>, con la misma numeración que me enviaste, más un índice del expediente. La firma electrónica se verifica con un clic y es válida para la presentación telemática; si el consulado te pide papel, te envío los originales sellados por mensajería a España o a tu país (coste del transportista en el presupuesto).`,
        `Plazo: los documentos sueltos salen en 24/48 h; el expediente completo lleva un único plazo cerrado por escrito antes de empezar${
          LARGE_PROJECT_CAPACITY ? ` (puedo asumir ${LARGE_PROJECT_CAPACITY.es})` : ""
        }. Precio: ${priceEs}, por documento y por lote, en euros y con pago con tarjeta internacional. Los precios orientativos por documento están en la <a href="/precios">página de precios</a>.`,
      ],
    },
  ],
  steps: [
    {
      t: "Me envías la lista",
      d: "Una carpeta con todos los documentos escaneados y el nombre del consulado o de la UGE.",
    },
    {
      t: "Reviso y te cierro plazo",
      d: "Te digo qué falta y qué lleva apostilla; precio y plazo únicos por escrito en menos de 2 h.",
    },
    {
      t: "Traduzco todo el lote",
      d: "Traducción jurada de cada documento con criterios uniformes; firmo y sello personalmente.",
    },
    {
      t: "Entrega ordenada",
      d: "Un PDF firmado por documento, numerado como tu carpeta, más índice. Papel por mensajería si lo necesitas.",
    },
  ],
  faq: [
    {
      q: "¿La traducción jurada tiene que hacerse en España?",
      a: "No. Lo que exige el consulado es que la firme un traductor jurado nombrado por el Ministerio de Asuntos Exteriores de España, esté donde esté el solicitante. Mi nombramiento (nº 7310) se comprueba en el listado oficial del MAEC.",
    },
    {
      q: "¿Traduzco antes o después de apostillar?",
      a: "Después. La apostilla forma parte del documento y también se traduce. Si me envías un documento sin apostilla y el consulado la pide, te avisaré antes de empezar.",
    },
    {
      q: "¿Puedes traducir documentos en varios idiomas?",
      a: "Traduzco del inglés al español y del español al inglés. Si parte de tu expediente está en otro idioma, te lo indico en la revisión para que busques un traductor jurado de esa lengua.",
    },
    {
      q: "¿Cuánto tarda un expediente completo?",
      a: LARGE_PROJECT_CAPACITY
        ? `Depende del número de páginas: puedo asumir ${LARGE_PROJECT_CAPACITY.es}, así que la mayoría de los expedientes están listos en pocos días. El plazo exacto te lo doy por escrito antes de empezar.`
        : "Depende del número de páginas. El plazo exacto te lo doy por escrito antes de empezar; los documentos sueltos, en 24/48 h.",
    },
    {
      q: "¿Vale el PDF firmado para la presentación en el consulado?",
      a: "Para la presentación telemática, sí: el PDF lleva mi firma electrónica verificable. Si tu consulado exige papel, te envío los originales sellados por mensajería.",
    },
  ],
  cta: {
    title: "Envíame tu lista y te digo qué falta",
    text: "Mándame la carpeta con tus documentos por WhatsApp o email. En menos de 2 horas te devuelvo la revisión, el precio cerrado y el plazo único del expediente.",
  },
  related: [
    { href: "/traduccion-jurada-estados-unidos", label: "Vienes de Estados Unidos" },
    { href: "/traduccion-jurada-india", label: "Vienes de India" },
    { href: "/traduccion-jurada-urgente-grandes-volumenes", label: "Proyectos urgentes y grandes volúmenes" },
    { href: "/traduccion-jurada-certificado-penales", label: "Certificado de antecedentes penales" },
    { href: "/blog", label: "Guías del blog" },
  ],
  otherLangLabel: "Sworn translation for Spain's digital nomad visa",
};

export const en = {
  id: "dnv",
  locale: "en",
  path: PATH_EN,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Digital nomad visa",
  metaTitle: "Sworn translation for Spain's digital nomad visa",
  metaDescription: "Sworn translator appointed by Spain (no. 7310): which digital nomad visa documents need an apostille and a sworn translation, with one deadline in writing.",
  h1: "Sworn translation for Spain's digital nomad visa",
  lead:
    "A sworn translation for Spain's digital nomad visa is the Spanish translation, signed and stamped by a translator appointed by Spain's Ministry of Foreign Affairs, of the foreign documents required for the international remote work residence permit (Law 28/2022): criminal record certificate, employment contract or employer letter, company registration certificate, degree, proof of income and family certificates. I am Elena Peñaranda Ortega, sworn translator no. 7310, and I translate the complete file with a single deadline confirmed in writing; individual documents take 24/48 hours.",
  image: {
    src: "/fotos/expediente-documentos.jpg",
    alt: "Hands checking an official form on a folder of documents, like those that make up a digital nomad visa file",
  },
  whatsapp:
    "https://wa.me/34685891214?text=Hi%20Elena%2C%20I%27m%20preparing%20my%20file%20for%20Spain%27s%20digital%20nomad%20visa%20and%20I%27d%20like%20to%20know%20which%20documents%20need%20a%20sworn%20translation",
  whatsappLabel: "Send my list on WhatsApp",
  serviceName: "Sworn translation of digital nomad visa files for Spain",
  serviceType: "Sworn English-Spanish translation",
  price: DNV_PACK_PRICE,
  sections: [
    {
      id: "file",
      title: "What is in the file, and why are so many applications refused?",
      body: [
        "The digital nomad visa (or the residence permit, if you are already in Spain) is applied for at the Spanish consulate in your country or at the Unit for Large Companies and Strategic Groups (UGE). In both cases the file brings together documents issued by public bodies, employers, universities and banks in one or more countries, and everything that is not in Spanish must be submitted with a <strong>sworn translation</strong> (traducción jurada).",
        "When a file is refused or sent back for correction, it is rarely because of the merits of the case. The usual reasons are a document without an apostille, a plain translation where a sworn one was required, or an incomplete batch that forces you to start again. My job is to prevent exactly that: I review your list, tell you which document needs an apostille before it is translated, and translate the whole set with consistent criteria (same names, same dates, same terminology in every document).",
        {
          note: "Income thresholds, fees and processing times are set by the Spanish administration and change every year. I deliberately do not publish them here: confirm them with the consulate, the UGE or an immigration lawyer. I take care of the documents, the apostilles and the translation.",
        },
      ],
    },
    {
      id: "documents",
      title: "Which digital nomad visa documents need a sworn translation?",
      body: [
        "These are the documents the consulate or the UGE ask for most often. If your country is party to the Hague Convention, the apostille goes on the original before translation, because the apostille is translated too.",
        {
          table: {
            caption:
              "Digital nomad visa documents: apostille, sworn translation and issuing body",
            head: ["Document", "Apostille?", "Sworn translation?", "Issued by"],
            rows: [
              [
                '<a href="/traduccion-jurada-certificado-penales">Criminal record certificate</a> from the country or countries where you have lived in recent years',
                "Yes",
                "Yes",
                "Police or ministry of justice (FBI or state level in the USA, ACRO in the UK, MEA/police in India)",
              ],
              [
                "Employment contract or letter from your foreign employer (position, salary, length of service and express authorisation to work remotely from Spain)",
                "Not usually",
                "Yes",
                "Your employer",
              ],
              [
                "Contracts with foreign clients (self-employed applicants)",
                "Not usually",
                "Yes",
                "Your clients",
              ],
              [
                '<a href="/traduccion-jurada-certificado-empresa">Company registration certificate</a> proving at least one year of activity (certificate of incorporation, good standing)',
                "Usually yes",
                "Yes",
                "Companies register or secretary of state",
              ],
              [
                '<a href="/traduccion-jurada-titulo-universitario">University or postgraduate degree</a>, or letters from previous employers proving three years of experience',
                "Yes for the degree; letters depend on the consulate",
                "Yes",
                "University / previous employers",
              ],
              [
                "Proof of income: payslips, bank statements, invoices, tax returns",
                "No",
                "Yes (recent months are often enough)",
                "Employer, bank, tax authority",
              ],
              [
                "Social security coverage certificate from your home country (UK A1, US SSA certificate of coverage) or commitment to register in Spain",
                "No",
                "Yes",
                "Your country's social security body",
              ],
              [
                "Health insurance with cover in Spain",
                "No",
                "Yes, if the policy is not in Spanish",
                "Insurer",
              ],
              [
                '<a href="/traduccion-jurada-certificado-matrimonio">Marriage</a> or partnership certificate and <a href="/traduccion-jurada-partida-nacimiento">birth certificates</a> of children (family members)',
                "Yes",
                "Yes",
                "Civil registry of the issuing country",
              ],
              [
                "Passport",
                "No",
                "Not usually (a copy is submitted)",
                "Your country",
              ],
            ],
          },
        },
        "Every sworn translation I deliver carries my signature, stamp and certification on each document, including the apostille and any stamps or handwritten notes. They are valid before the consulate, the UGE and any other Spanish body.",
      ],
    },
    {
      id: "family",
      title: "What if your family is coming with you?",
      body: [
        "Your spouse, registered partner and children can apply with you or later. Each family member provides their own certificate (marriage or partnership, birth), apostilled and translated, and some consulates also ask adults for their criminal record certificate. It is worth including them in the same batch: names and dates are written identically across all documents, which is the first thing the examiner checks.",
      ],
    },
    {
      id: "sending",
      title: "How do you send me the batch?",
      body: [
        {
          list: [
            "Put everything in <strong>one folder</strong> (Google Drive, Dropbox, WeTransfer or email attachments) named with your surname.",
            "Scan every document <strong>in full</strong>, including the apostille and the back if it carries stamps. Phone photos are fine if they are legible.",
            "Give each file a clear name: <em>01-criminal-record.pdf</em>, <em>02-employment-contract.pdf</em>… I return the translations in the same order.",
            "Tell me which consulate you are applying at (or whether you are filing with the UGE) and your appointment date, if you already have one.",
          ],
        },
        "Within 2 working hours you get my review of the list (what is missing, what needs an apostille), a fixed price for the whole batch and a single delivery deadline in writing.",
      ],
    },
    {
      id: "delivery",
      title: "What do you receive, when, and how much does it cost?",
      body: [
        "You receive <strong>one digitally signed PDF per document</strong>, numbered like the files you sent me, plus an index of the file. The electronic signature can be verified in one click and is valid for online submission; if the consulate asks for paper, I courier the stamped originals to Spain or to your country (courier cost stated in the quote).",
        `Timing: individual documents take 24/48 hours; the complete file gets a single deadline confirmed in writing before I start${
          LARGE_PROJECT_CAPACITY ? ` (I can handle ${LARGE_PROJECT_CAPACITY.en})` : ""
        }. Price: ${priceEn}, per document and for the batch, in euros, charged in euros to any international card. Indicative prices per document are on the <a href="/en/precios">pricing page</a>.`,
      ],
    },
  ],
  steps: [
    {
      t: "You send me the list",
      d: "One folder with every scanned document and the name of the consulate or the UGE.",
    },
    {
      t: "I review and fix the deadline",
      d: "I tell you what is missing and what needs an apostille; one price and one deadline in writing within 2 hours.",
    },
    {
      t: "I translate the whole batch",
      d: "Sworn translation of every document with consistent criteria; I sign and stamp each one personally.",
    },
    {
      t: "Delivered in order",
      d: "One signed PDF per document, numbered like your folder, plus an index. Paper by courier if you need it.",
    },
  ],
  faq: [
    {
      q: "Does the sworn translation have to be done in Spain?",
      a: "No. What the consulate requires is that it is signed by a sworn translator appointed by Spain's Ministry of Foreign Affairs, wherever the applicant is. My appointment (no. 7310) can be checked on the Ministry's official register.",
    },
    {
      q: "Do I translate before or after the apostille?",
      a: "After. The apostille is part of the document and is translated too. If you send me a document without an apostille and the consulate requires one, I will tell you before I start.",
    },
    {
      q: "Can you translate documents in several languages?",
      a: "I translate from English into Spanish and from Spanish into English. If part of your file is in another language, I will flag it in the review so you can find a sworn translator for that language.",
    },
    {
      q: "How long does a complete file take?",
      a: LARGE_PROJECT_CAPACITY
        ? `It depends on the number of pages: I can handle ${LARGE_PROJECT_CAPACITY.en}, so most files are ready within a few days. You get the exact deadline in writing before I start.`
        : "It depends on the number of pages. You get the exact deadline in writing before I start; individual documents take 24/48 hours.",
    },
    {
      q: "Is the signed PDF accepted by the consulate?",
      a: "For online submission, yes: the PDF carries my verifiable electronic signature. If your consulate insists on paper, I courier the stamped originals to you.",
    },
  ],
  cta: {
    title: "Send me your list and I will tell you what is missing",
    text: "Send me the folder with your documents on WhatsApp or by email. Within 2 hours you get my review, a fixed price and a single deadline for the whole file.",
  },
  related: [
    { href: "/en/sworn-translation-usa-spain", label: "Coming from the United States" },
    { href: "/en/sworn-translation-india-spain", label: "Coming from India" },
    { href: "/en/urgent-sworn-translation-large-projects", label: "Urgent and large projects" },
    { href: "/en/sworn-translation-british-residents-spain", label: "British residents in Spain" },
    { href: "/en/blog", label: "Blog guides" },
  ],
  otherLangLabel: "Traducción jurada para el visado de nómada digital",
};
