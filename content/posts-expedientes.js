// content/posts-expedientes.js
//
// Cuatro artículos sobre expedientes de visado (brief de Elena, 19/11/2026).
// Contestan las cuatro preguntas de quien tiene un expediente entero y
// llevan a la página de expediente completo (content/expediente.js →
// FILE_ROUTE). Los textos son los de Elena, tal cual: no cambiar cifras ni
// afirmaciones sobre requisitos.
//
// Las cifras de precio salen de content/expediente.js y content/site.js
// (las mismas que la página de expediente completo); el resto de números
// (páginas de los ejemplos, plazos de la UGE) son del texto de Elena.
//
// Campos propios de estos artículos (los leen las plantillas del blog):
//   cta: "expediente"  → el bloque final lleva el WhatsApp de expediente
//                        (FILE_WHATSAPP_URL) y el enlace a FILE_ROUTE.
//   faqInBody: true    → las preguntas de `faq` ya están visibles en el
//                        cuerpo del artículo (título + respuesta corta, o
//                        su apartado): solo se emiten en el JSON-LD
//                        FAQPage, sin repetir la sección visible.
//
// posts.js y posts.en.js importan POSTS_EXPEDIENTES_ES / _EN y los suman a
// sus listas, así que sitemap, índice del blog y hreflang salen solos.
import { FILE_ROUTE, FILE_PER_PAGE, FILE_MID_CAP, filePrice, singleDocPrice } from "./expediente";
import { packPrice } from "./site";
import { PRICE_PER_PAGE } from "./pricing";

const V = packPrice("visa"); // 149
const N = packPrice("nomad"); // 249
const F = packPrice("visa-family"); // 299
const CAP = FILE_MID_CAP; // 300
const PP = FILE_PER_PAGE; // 15
const P20 = filePrice(20); // 300
const P30 = filePrice(30); // 450
const S30 = singleDocPrice(30); // 600
const SINGLE = PRICE_PER_PAGE; // 20

const DATE = "2026-11-19";
const AUTHOR = "Elena Peñaranda Ortega";

// Fuentes oficiales (comprobadas el 19/11/2026).
const SRC = {
  washington:
    "https://www.exteriores.gob.es/Consulados/washington/en/ServiciosConsulares/Paginas/Consular/Visado-de-residencia-no-lucrativa.aspx",
  losAngeles:
    "https://www.exteriores.gob.es/Consulados/losangeles/en/ServiciosConsulares/Paginas/Consular/Visado-de-estudios.aspx",
  londres:
    "https://www.exteriores.gob.es/Consulados/londres/en/ServiciosConsulares/Paginas/Consular/Visado-de-residencia-no-lucrativa.aspx",
  uge66:
    "https://www.inclusion.gob.es/en/web/migraciones/w/66.-autorizacion-inicial-de-residencia-y-trabajo-de-profesionales-altamente-cualificados",
};
const ext = (href, text, locale) =>
  `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}<span class="sr-only"> (${
    locale === "en" ? "opens in a new tab" : "se abre en una pestaña nueva"
  })</span></a>`;

export const SLUGS = {
  coste: { es: "cuanto-cuesta-traducir-expediente-completo-visado-espana", en: "cost-sworn-translation-full-spain-visa-file" },
  extractos: { es: "hay-que-traducir-extractos-bancarios-visado-espana", en: "do-bank-statements-need-sworn-translation-spain-visa" },
  estudiante: { es: "documentos-visado-estudiante-espana-traduccion-jurada", en: "spain-student-visa-documents-sworn-translation" },
  altaCualificacion: {
    es: "profesional-altamente-cualificado-uge-documentos-traduccion-jurada",
    en: "spain-highly-qualified-professional-uge-documents-sworn-translation",
  },
};
/** Ruta de un artículo: blogPath("extractos", "en") → /en/blog/… */
export const blogPath = (key, locale = "es") =>
  locale === "en" ? `/en/blog/${SLUGS[key].en}` : `/blog/${SLUGS[key].es}`;

// Rutas de trámite enlazadas desde los artículos.
const R = {
  es: {
    file: FILE_ROUTE.es,
    visas: "/traduccion-jurada-visados-espana",
    nomad: "/traduccion-jurada-visado-nomada-digital",
    nonLucrative: "/documentos-visado-no-lucrativo-espana",
    student: "/traduccion-jurada-visado-estudiante",
    hq: "/traduccion-jurada-visado-alta-cualificacion",
    fbi: "/traduccion-jurada-antecedentes-fbi",
  },
  en: {
    file: FILE_ROUTE.en,
    visas: "/en/sworn-translations-spanish-visas",
    nomad: "/en/sworn-translation-spain-digital-nomad-visa",
    nonLucrative: "/en/spain-non-lucrative-visa-documents-checklist",
    student: "/en/sworn-translation-spain-student-visa",
    hq: "/en/sworn-translation-spain-highly-qualified-visa",
    fbi: "/en/fbi-background-check-translation-spain",
  },
};

// ---------------------------------------------------------------------------
// Respuestas cortas (primer párrafo de cada artículo). Se reutilizan en el
// FAQPage y en /llms.txt (una línea por artículo).
// ---------------------------------------------------------------------------
export const SHORT_ANSWERS = {
  coste: {
    es: `Traducir un expediente completo de visado para España cuesta entre ${V} € y ${P30} € en la mayoría de los casos. Hasta 19 páginas, nunca más de ${CAP} €. De 20 a 30 páginas, ${PP} € por página: ${P20} € por 20 y ${P30} € por 30. Por encima de 30, te doy un precio cerrado al ver los documentos. IVA incluido.`,
    en: `A sworn translation of a full Spain visa file costs between €${V} and €${P30} in most cases. Up to 19 pages, never more than €${CAP}. From 20 to 30 pages, €${PP} per page: €${P20} for 20 and €${P30} for 30. Over 30 pages, I give you a closed price once I see the documents. VAT included.`,
  },
  extractos: {
    es: "Depende de dónde presentes la solicitud. Los consulados de España en Washington y Los Ángeles dicen expresamente que los extractos bancarios no necesitan traducción al español. Si presentas en España ante la UGE, los documentos extranjeros van traducidos por traductor jurado, extractos incluidos. Antes de encargar nada, mira la lista de tu consulado o envíamela y te lo digo yo.",
    en: "It depends on where you apply. Spain's consulates in Washington and Los Angeles state that bank statements do not need to be translated into Spanish. If you file in Spain with the UGE, foreign documents go in with a sworn translation, statements included. Before you order anything, read your consulate's checklist, or send it to me and I'll tell you.",
  },
  estudiante: {
    es: `Para el visado de estudios de España se traducen la carta de admisión con el pago de la matrícula, el certificado médico, los antecedentes penales si la estancia pasa de 180 días, y la carta de tus padres o tu beca si acreditas así los medios económicos. Los extractos bancarios, en consulados como el de Los Ángeles, no. El expediente suele quedar entre 8 y 15 páginas y cuesta entre ${V} € y ${CAP} €.`,
    en: `For a Spain study visa you translate the admission letter with proof of fees paid, the medical certificate, the criminal record if you're staying more than 180 days, and your parents' letter or scholarship if that is how you prove your funds. Bank statements, at consulates such as Los Angeles, are not translated. The file usually comes to between 8 and 15 pages and costs between €${V} and €${CAP}.`,
  },
  altaCualificacion: {
    es: "Para la autorización de profesional altamente cualificado, la UGE-CE pide que los documentos expedidos en el extranjero vayan traducidos al español por traductor jurado. En la práctica son el título universitario con su apostilla, los antecedentes penales de los países donde hayas vivido los dos últimos años y, si acreditas experiencia en vez de título, las cartas de tus empleadores. Suelen ser entre 8 y 20 páginas.",
    en: "For Spain's highly qualified professional permit, the UGE-CE requires documents issued abroad to be translated into Spanish by a sworn translator. In practice that means your university degree with its apostille, criminal records from the countries where you lived in the last two years and, if you rely on experience rather than a degree, your employers' letters. It usually adds up to between 8 and 20 pages.",
  },
};

// Frases que son a la vez texto visible y respuesta del FAQPage.
const T = {
  costeFaq: {
    es: [
      ["¿Puedo pagar en dólares o en libras?", "Sí, con tarjeta en euros, dólares o libras."],
      ["¿Qué pasa si luego me piden un documento más?", "Me lo envías y lo añado al expediente con el mismo criterio de precio."],
      [
        "¿Aceptan el PDF firmado?",
        "Sí. Lleva firma electrónica cualificada y vale para presentación telemática. Si tu consulado quiere papel, te lo envío por mensajería.",
      ],
    ],
    en: [
      ["Can I pay in dollars or pounds?", "Yes, by card in euros, US dollars or pounds."],
      ["What if they ask me for one more document later?", "Send it and I add it to the file on the same pricing."],
      [
        "Will the signed PDF be accepted?",
        "Yes. It carries a qualified electronic signature and is valid for online submission. If your consulate wants paper, I courier it.",
      ],
    ],
  },
  siempre: {
    es: "Los antecedentes penales con su apostilla, el certificado médico si no viene en español, los certificados de matrimonio y nacimiento de la familia, y las cartas que redactas tú o tu empresa: la carta de tu empleador, la de tus padres si te mantienen, el contrato.",
    en: "Your criminal record with its apostille, the medical certificate if it isn't in Spanish, the family's marriage and birth certificates, and the letters written by you or your company: your employer's letter, your parents' letter if they support you, the contract.",
  },
  parcial: {
    es: "Tradúcelo entero solo si te lo piden entero. Si tu consulado o la UGE aceptan las páginas donde aparecen el titular, la cuenta y los saldos, traduzco esas y pagas esas.",
    en: "Translate all of it only if they ask for all of it. If your consulate or the UGE accept the pages showing the account holder, the account and the balances, I translate those and you pay for those.",
  },
  apostillaFbi: {
    es: "La apostilla de los antecedentes del FBI tiene que ser la federal, del Departamento de Estado en Washington. El consulado de Los Ángeles lo dice con todas las letras: la apostilla local no vale. Si la pides mal, pierdes semanas.",
    en: "The apostille on an FBI check has to be the federal one, from the US Department of State in Washington. The Los Angeles consulate spells it out: a local apostille is not valid. Get it wrong and you lose weeks.",
  },
  caducidad: {
    es: "El certificado médico caduca a los 90 días y los antecedentes a los seis meses. Tradúcelos cuando ya tengas la cita, no antes.",
    en: "The medical certificate expires after 90 days and the criminal record after six months. Translate them once you have your appointment, not before.",
  },
  plazoUge: {
    es: "La solicitud la presenta la empresa por vía telemática y la UGE resuelve en 20 días. Si no contesta en ese plazo, se entiende concedida. El trámite es rápido, así que lo que suele retrasarlo es reunir los documentos. Un expediente de hasta 30 páginas te lo entrego en 24 horas, con firma electrónica cualificada, listo para subir.",
    en: "The company files the application online and the UGE decides within 20 days. If it doesn't answer in that time, the permit is deemed granted. The procedure is fast, so what usually holds it up is getting the documents together. I deliver a file of up to 30 pages within 24 hours, with a qualified electronic signature, ready to upload.",
  },
  apostillaAntes: {
    es: "La apostilla va antes que la traducción, porque también se traduce.",
    en: "The apostille comes before the translation, because it gets translated too.",
  },
};

// Imagen de portada (og:image, twitter:image y BlogPosting.image): la foto
// de la página de expediente completo.
const COVER = {
  es: {
    image: "/fotos/expediente-documentos.jpg",
    alt: "Manos revisando un formulario oficial sobre una carpeta con todos los documentos de un expediente de visado",
  },
  en: {
    image: "/fotos/expediente-documentos.jpg",
    alt: "Hands checking an official form on a folder holding every document of a visa file",
  },
};
const withCover = (locale) => (post) => ({ ...COVER[locale], ...post });

// Enlaza un fragmento de una frase; falla en el build si el fragmento ya no
// está (p. ej., si se reescribe la frase), en vez de perder el enlace.
const linkify = (text, needle, href) => {
  if (!text.includes(needle)) throw new Error(`posts-expedientes: no encuentro «${needle}»`);
  return text.replace(needle, `<a href="${href}">${needle}</a>`);
};

const faqHtml = (pairs) =>
  pairs.map(([q, a]) => `<h3>${q}</h3>\n      <p>${a}</p>`).join("\n      ");
const faqList = (pairs) => pairs.map(([q, a]) => ({ q, a }));

// ---------------------------------------------------------------------------
// Español
// ---------------------------------------------------------------------------
export const POSTS_EXPEDIENTES_ES = [
  {
    slug: SLUGS.coste.es,
    translationOf: SLUGS.coste.en,
    title: "Cuánto cuesta traducir un expediente completo de visado para España",
    metaDescription: `Precio cerrado por el expediente entero: ${PP} € por página de 20 a 30 páginas y nunca más de ${CAP} € hasta 19. Ejemplos reales por tipo de visado.`,
    excerpt: `Precio cerrado por el expediente entero: ${PP} € por página de 20 a 30 páginas y nunca más de ${CAP} € hasta 19. Ejemplos reales por tipo de visado.`,
    date: DATE,
    updated: DATE,
    author: AUTHOR,
    tags: ["visados", "expediente"],
    readingTime: "4 min",
    cta: "expediente",
    faqInBody: true,
    html: `
      <p>${SHORT_ANSWERS.coste.es}</p>

      <p>Soy Elena Peñaranda, traductora jurada de inglés nombrada por el Ministerio de Asuntos Exteriores (n.º 7310). <a href="${R.es.file}">Traduzco el expediente entero</a>, lo firmo yo y te lo entrego en una sola fecha.</p>

      <h2>Precio según el tamaño</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>Tu expediente</th><th>Precio</th></tr></thead>
        <tbody>
          <tr><td>Hasta 4 documentos y 8 páginas</td><td>${V} €</td></tr>
          <tr><td>Hasta 5 documentos y 10 páginas</td><td>${N} €</td></tr>
          <tr><td>Hasta 8 documentos y 16 páginas, dos adultos</td><td>${F} €</td></tr>
          <tr><td>De 11 a 19 páginas</td><td>Precio cerrado, nunca más de ${CAP} €</td></tr>
          <tr><td>De 20 a 30 páginas</td><td>${PP} € por página</td></tr>
          <tr><td>Más de 30 páginas</td><td>Precio cerrado</td></tr>
        </tbody>
      </table></div>
      <p>Si tus documentos sueltos cuestan menos que el pack, pagas lo menor.</p>

      <h2>Por qué sale más barato enviarlo todo junto</h2>
      <p>Un documento largo suelto se cobra a ${SINGLE} € por página. El mismo documento dentro de un expediente de 20 páginas o más baja a ${PP} €. En 30 páginas son ${P30} € en vez de ${S30} €.</p>
      <p>Hay otra razón que no es de dinero. Tu nombre, el de tu empresa y las cifras tienen que leerse igual en el contrato, en las nóminas y en la carta de tu empleador. Si lo traduce todo la misma persona, coinciden.</p>

      <h2>Qué hace que un expediente sea más largo o más corto</h2>
      <p>Lo que más abulta son los extractos bancarios y los contratos. Los extractos no siempre hay que traducirlos: depende de dónde presentes la solicitud. Te lo cuento en <a href="${blogPath("extractos", "es")}">¿hay que traducir los extractos bancarios?</a>. Si tu consulado no los pide en español, un expediente de 30 páginas puede quedarse en 12.</p>
      <p>Tampoco cuentan la copia del pasaporte ni los documentos que ya están en español.</p>

      <h2>Tres ejemplos</h2>
      <p><a href="${R.es.nomad}">Nómada digital</a> presentado en España ante la UGE: contrato, carta de la empresa, tres nóminas, extractos y antecedentes penales con apostilla. 30 páginas, ${P30} €, entrega en 24 horas.</p>
      <p><a href="${R.es.nonLucrative}">No lucrativa</a> para una pareja en un consulado de Estados Unidos, donde los extractos no se traducen: antecedentes del FBI de los dos con apostilla, certificados médicos y certificado de matrimonio. 8 páginas, ${V} €.</p>
      <p><a href="${R.es.student}">Estudiante</a> con estancia de más de seis meses: carta de admisión y pago de matrícula, carta de sus padres, antecedentes con apostilla, título y expediente académico. Unas 12 páginas, nunca más de ${CAP} €.</p>

      <h2>Cuánto tardo</h2>
      <p>El presupuesto sale en menos de dos horas entre las 9:00 y las 23:00, todos los días. Hasta 10 páginas, entrego el mismo día si me llega antes de las 18:00. De 11 a 30 páginas, en 24 horas. Trabajo también sábados y domingos.</p>

      <h2>Preguntas frecuentes</h2>
      ${faqHtml(T.costeFaq.es)}

      <p>Envíame la lista de tu consulado o los documentos y te digo el precio hoy.</p>
    `,
    faq: [
      { q: "¿Cuánto cuesta traducir un expediente completo de visado para España?", a: SHORT_ANSWERS.coste.es },
      ...faqList(T.costeFaq.es),
    ],
  },
  {
    slug: SLUGS.extractos.es,
    translationOf: SLUGS.extractos.en,
    title: "¿Hay que traducir los extractos bancarios para un visado de España?",
    metaDescription:
      "Depende de dónde presentes la solicitud. Los consulados de Washington y Los Ángeles no piden traducción; la UGE en España, sí. Cómo saberlo antes de pagar.",
    excerpt:
      "Depende de dónde presentes la solicitud. Los consulados de Washington y Los Ángeles no piden traducción; la UGE en España, sí. Cómo saberlo antes de pagar.",
    date: DATE,
    updated: DATE,
    author: AUTHOR,
    tags: ["visados", "expediente"],
    readingTime: "4 min",
    cta: "expediente",
    faqInBody: true,
    html: `
      <p>${SHORT_ANSWERS.extractos.es}</p>

      <p>Lo cuento porque es donde más dinero se gasta sin necesidad. Los extractos suelen ser la mitad de las páginas de <a href="${R.es.file}">un expediente</a>.</p>

      <h2>Lo que dicen las fuentes oficiales</h2>
      <p>Comprobado el 19 de noviembre de 2026:</p>
      <ul>
        <li>${ext(SRC.washington, "Consulado en Washington, visado no lucrativo", "es")}: extractos de los tres últimos meses, y añade que no hace falta traducirlos. Tampoco la última declaración de impuestos.</li>
        <li>${ext(SRC.losAngeles, "Consulado en Los Ángeles, visado de estudios", "es")}: los extractos del estudiante y los de sus padres no necesitan traducción.</li>
        <li>${ext(SRC.londres, "Consulado en Londres, visado no lucrativo", "es")}: pide traducción jurada de los antecedentes penales y del certificado médico. De los extractos no dice nada concreto, solo la regla general de traducción oficial «cuando proceda». Aquí conviene preguntar al consulado.</li>
        <li>${ext(SRC.uge66, "UGE-CE, profesionales altamente cualificados", "es")}: los documentos expedidos en el extranjero se presentan traducidos al español por traductor jurado.</li>
      </ul>
      <p>Cada consulado publica su propia lista y la cambia sin avisar. La que vale es la del tuyo, el día que presentas.</p>

      <h2>Lo que sí se traduce casi siempre</h2>
      <p>${T.siempre.es}</p>

      <h2>Si tu extracto sí hay que traducirlo</h2>
      <p>${T.parcial.es}</p>
      <p>Dentro de un expediente de 20 páginas o más, cada página sale a ${PP} €. Tres meses de extractos suelen ser entre 9 y 15 páginas.</p>

      <h2>Cómo saberlo en dos minutos</h2>
      <p>Envíame por WhatsApp la lista de requisitos de tu consulado, o dime en cuál presentas y <a href="${R.es.visas}">qué visado pides</a>. Te contesto qué documentos necesitan traducción jurada y cuáles no, y te doy un precio cerrado por los que sí.</p>
    `,
    faq: [
      { q: "¿Hay que traducir los extractos bancarios para un visado de España?", a: SHORT_ANSWERS.extractos.es },
      { q: "¿Qué documentos se traducen casi siempre para un visado de España?", a: T.siempre.es },
      { q: "¿Hay que traducir el extracto bancario entero?", a: T.parcial.es },
    ],
  },
  {
    slug: SLUGS.estudiante.es,
    translationOf: SLUGS.estudiante.en,
    title: "Visado de estudiante para España: qué documentos necesitan traducción jurada",
    metaDescription:
      "Admisión, medios económicos, certificado médico y antecedentes penales: cuáles se traducen, cuáles no y cuánto cuesta el expediente.",
    excerpt:
      "Admisión, medios económicos, certificado médico y antecedentes penales: cuáles se traducen, cuáles no y cuánto cuesta el expediente.",
    date: DATE,
    updated: DATE,
    author: AUTHOR,
    tags: ["visados", "expediente"],
    readingTime: "4 min",
    cta: "expediente",
    faqInBody: true,
    html: `
      <p>Para el <a href="${R.es.student}">visado de estudios de España</a> se traducen la carta de admisión con el pago de la matrícula, el certificado médico, los antecedentes penales si la estancia pasa de 180 días, y la carta de tus padres o tu beca si acreditas así los medios económicos. Los extractos bancarios, en consulados como el de Los Ángeles, no. <a href="${R.es.file}">El expediente</a> suele quedar entre 8 y 15 páginas y cuesta entre ${V} € y ${CAP} €.</p>

      <p>He usado como referencia la lista del ${ext(SRC.losAngeles, "consulado en Los Ángeles", "es")}, comprobada el 19 de noviembre de 2026. La de tu consulado puede pedir algo distinto.</p>

      <h2>Documento por documento</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>Documento</th><th>¿Traducción?</th></tr></thead>
        <tbody>
          <tr><td>Carta de admisión y justificante de pago de matrícula</td><td>Sí, si no está en español</td></tr>
          <tr><td>Extractos bancarios, tuyos o de tus padres (tres meses)</td><td>No, según Los Ángeles</td></tr>
          <tr><td>Carta notarial de tus padres haciéndose cargo de tus gastos</td><td>Sí, con apostilla</td></tr>
          <tr><td>Beca o ayuda financiera</td><td>Sí, si está en inglés</td></tr>
          <tr><td>Certificado médico, de menos de 90 días</td><td>Sí, si está en inglés</td></tr>
          <tr><td>Antecedentes penales (más de 180 días, mayores de 18)</td><td>Sí, con apostilla</td></tr>
          <tr><td>Certificado de nacimiento, si eres menor o te mantienen tus padres</td><td>Con apostilla y traducción</td></tr>
          <tr><td>Pasaporte, formulario, fotos</td><td>No</td></tr>
        </tbody>
      </table></div>

      <h2>Dos errores que veo a menudo</h2>
      <p>${linkify(T.apostillaFbi.es, "antecedentes del FBI", R.es.fbi)}</p>
      <p>${T.caducidad.es}</p>

      <h2>Menores</h2>
      <p>Si el estudiante es menor, se suman la autorización notarial de los padres, con apostilla y traducción, y los documentos de la persona responsable en España. Envíame la lista del consulado y te digo cuáles me tocan a mí.</p>

      <h2>Precio y plazo</h2>
      <p>Hasta 4 documentos y 8 páginas, ${V} €. De 11 a 19 páginas, nunca más de ${CAP} €. Si vas con título y expediente académico y pasas de 20 páginas, ${PP} € por página. Entrego en 24 horas hasta 30 páginas, también en fin de semana.</p>
      <p>Envíame tus documentos por WhatsApp y te doy el precio cerrado en menos de dos horas.</p>
    `,
    faq: [
      { q: "¿Qué documentos del visado de estudiante para España necesitan traducción jurada?", a: SHORT_ANSWERS.estudiante.es },
    ],
  },
  {
    slug: SLUGS.altaCualificacion.es,
    translationOf: SLUGS.altaCualificacion.en,
    title: "Profesional altamente cualificado (UGE-CE): documentos y traducción jurada",
    metaDescription:
      "La UGE resuelve en 20 días y pide los documentos extranjeros traducidos por traductor jurado. Qué se traduce, qué lleva apostilla y cuánto cuesta.",
    excerpt:
      "La UGE resuelve en 20 días y pide los documentos extranjeros traducidos por traductor jurado. Qué se traduce, qué lleva apostilla y cuánto cuesta.",
    date: DATE,
    updated: DATE,
    author: AUTHOR,
    tags: ["visados", "expediente"],
    readingTime: "4 min",
    cta: "expediente",
    faqInBody: true,
    html: `
      <p>Para la <a href="${R.es.hq}">autorización de profesional altamente cualificado</a>, la UGE-CE pide que los documentos expedidos en el extranjero vayan traducidos al español por traductor jurado. En la práctica son el título universitario con su apostilla, los antecedentes penales de los países donde hayas vivido los dos últimos años y, si acreditas experiencia en vez de título, las cartas de tus empleadores. Suelen ser entre 8 y 20 páginas.</p>

      <p>La fuente es la ${ext(SRC.uge66, "hoja informativa 66", "es")} del Ministerio de Inclusión, comprobada el 19 de noviembre de 2026.</p>

      <h2>Por qué aquí el plazo de la traducción importa</h2>
      <p>${linkify(T.plazoUge.es, "Un expediente de hasta 30 páginas", R.es.file)}</p>

      <h2>Qué se traduce</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>Documento</th><th>Apostilla o legalización</th><th>Traducción jurada</th></tr></thead>
        <tbody>
          <tr><td>Título de educación superior</td><td>Sí</td><td>Sí</td></tr>
          <tr><td>Cartas de experiencia profesional (3 o 5 años, si no hay título)</td><td>No son documento público</td><td>Sí</td></tr>
          <tr><td>Antecedentes penales de los dos últimos años</td><td>Sí</td><td>Sí</td></tr>
          <tr><td>Contrato de trabajo</td><td>No</td><td>Sí, si no está en español</td></tr>
          <tr><td>Certificados de matrimonio y nacimiento de la familia</td><td>Sí</td><td>Sí</td></tr>
          <tr><td>Pasaporte, seguro médico, formulario</td><td>No</td><td>No</td></tr>
        </tbody>
      </table></div>
      <p>${T.apostillaAntes.es}</p>

      <h2>Para despachos y departamentos de personas</h2>
      <p>Si tramitas varias autorizaciones al mes, trabajo con una tarifa por tipo de documento, una sola fecha por lote y factura al despacho o a la empresa. Envíame el primer expediente y lo vemos.</p>

      <h2>Precio</h2>
      <p>Hasta 10 páginas, ${N} €. De 11 a 19, nunca más de ${CAP} €. De 20 a 30 páginas, ${PP} € por página. Presupuesto en menos de dos horas, todos los días.</p>
    `,
    faq: [
      {
        q: "¿Qué documentos pide traducidos la UGE-CE para la autorización de profesional altamente cualificado?",
        a: SHORT_ANSWERS.altaCualificacion.es,
      },
      { q: "¿Cuánto tarda la UGE en resolver la autorización de profesional altamente cualificado?", a: T.plazoUge.es },
    ],
  },
].map(withCover("es"));

// ---------------------------------------------------------------------------
// English
// ---------------------------------------------------------------------------
export const POSTS_EXPEDIENTES_EN = [
  {
    slug: SLUGS.coste.en,
    translationOf: SLUGS.coste.es,
    title: "How much does it cost to translate a full Spain visa file?",
    metaDescription: `One closed price for the whole file: €${PP} per page from 20 to 30 pages, never more than €${CAP} up to 19. Worked examples by visa type.`,
    excerpt: `One closed price for the whole file: €${PP} per page from 20 to 30 pages, never more than €${CAP} up to 19. Worked examples by visa type.`,
    date: DATE,
    updated: DATE,
    author: AUTHOR,
    tags: ["visados", "expediente"],
    readingTime: "4 min",
    cta: "expediente",
    faqInBody: true,
    html: `
      <p>${SHORT_ANSWERS.coste.en}</p>

      <p>I'm Elena Peñaranda, a sworn English translator appointed by Spain's Ministry of Foreign Affairs (no. 7310). I <a href="${R.en.file}">translate the whole file</a>, sign every document myself and deliver it all on one date.</p>

      <h2>Price by file size</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>Your file</th><th>Price</th></tr></thead>
        <tbody>
          <tr><td>Up to 4 documents and 8 pages</td><td>€${V}</td></tr>
          <tr><td>Up to 5 documents and 10 pages</td><td>€${N}</td></tr>
          <tr><td>Up to 8 documents and 16 pages, two adults</td><td>€${F}</td></tr>
          <tr><td>11 to 19 pages</td><td>Closed price, never more than €${CAP}</td></tr>
          <tr><td>20 to 30 pages</td><td>€${PP} per page</td></tr>
          <tr><td>Over 30 pages</td><td>Closed price</td></tr>
        </tbody>
      </table></div>
      <p>If your documents cost less one by one than the pack, you pay the lower amount.</p>

      <h2>Why sending everything together costs less</h2>
      <p>A long single document is charged at €${SINGLE} per page. The same document inside a file of 20 pages or more drops to €${PP}. For 30 pages that is €${P30} instead of €${S30}.</p>
      <p>There is another reason, and it isn't money. Your name, your employer's name and the figures have to read the same in the contract, the payslips and the employer letter. When one person translates everything, they do.</p>

      <h2>What makes a file longer or shorter</h2>
      <p>Bank statements and contracts take up most of the pages. Statements don't always need translating: it depends on where you apply. I explain it in <a href="${blogPath("extractos", "en")}">Do bank statements need a sworn translation?</a>. If your consulate doesn't ask for them in Spanish, a 30-page file can drop to 12.</p>
      <p>Your passport copy and any document already in Spanish don't count either.</p>

      <h2>Three examples</h2>
      <p><a href="${R.en.nomad}">Digital nomad</a> filed in Spain with the UGE: contract, employer letter, three payslips, statements and an apostilled criminal record. 30 pages, €${P30}, delivered within 24 hours.</p>
      <p><a href="${R.en.nonLucrative}">Non-lucrative visa</a> for a couple at a US consulate, where statements are not translated: both FBI checks with apostille, medical certificates and marriage certificate. 8 pages, €${V}.</p>
      <p><a href="${R.en.student}">Student</a> staying more than six months: admission letter and proof of fees, parents' letter, apostilled criminal record, degree and transcript. About 12 pages, never more than €${CAP}.</p>

      <h2>How long it takes</h2>
      <p>You get the quote in under two hours between 9:00 and 23:00 Madrid time, every day. Up to 10 pages, same day if it reaches me before 6 pm. From 11 to 30 pages, within 24 hours. I work Saturdays and Sundays too.</p>

      <h2>Frequently asked questions</h2>
      ${faqHtml(T.costeFaq.en)}

      <p>Send me your consulate's checklist or the documents and I'll give you the price today.</p>
    `,
    faq: [
      { q: "How much does it cost to translate a full Spain visa file?", a: SHORT_ANSWERS.coste.en },
      ...faqList(T.costeFaq.en),
    ],
  },
  {
    slug: SLUGS.extractos.en,
    translationOf: SLUGS.extractos.es,
    title: "Do bank statements need a sworn translation for a Spain visa?",
    metaDescription:
      "It depends on where you apply. The Washington and Los Angeles consulates don't ask for one; the UGE in Spain does. How to find out before you pay.",
    excerpt:
      "It depends on where you apply. The Washington and Los Angeles consulates don't ask for one; the UGE in Spain does. How to find out before you pay.",
    date: DATE,
    updated: DATE,
    author: AUTHOR,
    tags: ["visados", "expediente"],
    readingTime: "4 min",
    cta: "expediente",
    faqInBody: true,
    html: `
      <p>${SHORT_ANSWERS.extractos.en}</p>

      <p>I'm writing this because it is where people spend the most money for nothing. Statements are often half the pages in <a href="${R.en.file}">a file</a>.</p>

      <h2>What the official sources say</h2>
      <p>Checked on 19 November 2026:</p>
      <ul>
        <li>${ext(SRC.washington, "Washington consulate, non-lucrative visa", "en")}: statements for the last three months, with the note that translation is not necessary. The same goes for your latest tax return.</li>
        <li>${ext(SRC.losAngeles, "Los Angeles consulate, study visa", "en")}: the student's statements and the parents' statements do not need translating.</li>
        <li>${ext(SRC.londres, "London consulate, non-lucrative visa", "en")}: it asks for a sworn translation of the criminal record and the medical certificate. On statements it says nothing specific, only the general rule of an official translation "where applicable". Ask the consulate.</li>
        <li>${ext(SRC.uge66, "UGE-CE, highly qualified professionals", "en")}: documents issued abroad must be translated into Spanish by a sworn translator.</li>
      </ul>
      <p>Each consulate publishes its own list and changes it without notice. The one that counts is yours, on the day you apply.</p>

      <h2>What almost always needs translating</h2>
      <p>${T.siempre.en}</p>

      <h2>If your statements do need translating</h2>
      <p>${T.parcial.en}</p>
      <p>Inside a file of 20 pages or more, each page costs €${PP}. Three months of statements usually come to between 9 and 15 pages.</p>

      <h2>How to find out in two minutes</h2>
      <p>Send me your consulate's checklist on WhatsApp, or tell me where you're applying and <a href="${R.en.visas}">for which visa</a>. I'll tell you which documents need a sworn translation and which don't, and give you a closed price for the ones that do.</p>
    `,
    faq: [
      { q: "Do bank statements need a sworn translation for a Spain visa?", a: SHORT_ANSWERS.extractos.en },
      { q: "Which documents almost always need a sworn translation for a Spain visa?", a: T.siempre.en },
      { q: "Do I have to translate the whole bank statement?", a: T.parcial.en },
    ],
  },
  {
    slug: SLUGS.estudiante.en,
    translationOf: SLUGS.estudiante.es,
    title: "Spain student visa: which documents need a sworn translation",
    metaDescription:
      "Admission, proof of funds, medical certificate and criminal record: what gets translated, what doesn't, and what the file costs.",
    excerpt:
      "Admission, proof of funds, medical certificate and criminal record: what gets translated, what doesn't, and what the file costs.",
    date: DATE,
    updated: DATE,
    author: AUTHOR,
    tags: ["visados", "expediente"],
    readingTime: "4 min",
    cta: "expediente",
    faqInBody: true,
    html: `
      <p>For a <a href="${R.en.student}">Spain study visa</a> you translate the admission letter with proof of fees paid, the medical certificate, the criminal record if you're staying more than 180 days, and your parents' letter or scholarship if that is how you prove your funds. Bank statements, at consulates such as Los Angeles, are not translated. <a href="${R.en.file}">The file</a> usually comes to between 8 and 15 pages and costs between €${V} and €${CAP}.</p>

      <p>My reference is the ${ext(SRC.losAngeles, "Los Angeles consulate's list", "en")}, checked on 19 November 2026. Your consulate may ask for something different.</p>

      <h2>Document by document</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>Document</th><th>Translation?</th></tr></thead>
        <tbody>
          <tr><td>Admission letter and proof of tuition payment</td><td>Yes, if not in Spanish</td></tr>
          <tr><td>Bank statements, yours or your parents' (three months)</td><td>No, according to Los Angeles</td></tr>
          <tr><td>Notarised letter from your parents taking on your expenses</td><td>Yes, with apostille</td></tr>
          <tr><td>Scholarship or financial aid</td><td>Yes, if in English</td></tr>
          <tr><td>Medical certificate, less than 90 days old</td><td>Yes, if in English</td></tr>
          <tr><td>Criminal record (over 180 days, over 18s)</td><td>Yes, with apostille</td></tr>
          <tr><td>Birth certificate, if you're a minor or your parents support you</td><td>Apostille and translation</td></tr>
          <tr><td>Passport, form, photos</td><td>No</td></tr>
        </tbody>
      </table></div>

      <h2>Two mistakes I see often</h2>
      <p>${linkify(T.apostillaFbi.en, "FBI check", R.en.fbi)}</p>
      <p>${T.caducidad.en}</p>

      <h2>Minors</h2>
      <p>If the student is a minor, add the parents' notarised authorisation, apostilled and translated, and the documents of the person responsible in Spain. Send me the consulate's list and I'll tell you which ones are mine to translate.</p>

      <h2>Price and turnaround</h2>
      <p>Up to 4 documents and 8 pages, €${V}. From 11 to 19 pages, never more than €${CAP}. If you're adding a degree and transcript and go over 20 pages, €${PP} per page. I deliver within 24 hours for up to 30 pages, weekends included.</p>
      <p>Send me your documents on WhatsApp and you'll have a closed price in under two hours.</p>
    `,
    faq: [
      { q: "Which Spain student visa documents need a sworn translation?", a: SHORT_ANSWERS.estudiante.en },
    ],
  },
  {
    slug: SLUGS.altaCualificacion.en,
    translationOf: SLUGS.altaCualificacion.es,
    title: "Highly qualified professional permit (UGE-CE): documents and sworn translation",
    metaDescription:
      "The UGE decides in 20 days and wants foreign documents translated by a sworn translator. What to translate, what needs an apostille and what it costs.",
    excerpt:
      "The UGE decides in 20 days and wants foreign documents translated by a sworn translator. What to translate, what needs an apostille and what it costs.",
    date: DATE,
    updated: DATE,
    author: AUTHOR,
    tags: ["visados", "expediente"],
    readingTime: "4 min",
    cta: "expediente",
    faqInBody: true,
    html: `
      <p>For Spain's <a href="${R.en.hq}">highly qualified professional permit</a>, the UGE-CE requires documents issued abroad to be translated into Spanish by a sworn translator. In practice that means your university degree with its apostille, criminal records from the countries where you lived in the last two years and, if you rely on experience rather than a degree, your employers' letters. It usually adds up to between 8 and 20 pages.</p>

      <p>The source is the Ministry of Inclusion's ${ext(SRC.uge66, "information sheet 66", "en")}, checked on 19 November 2026.</p>

      <h2>Why translation turnaround matters here</h2>
      <p>${linkify(T.plazoUge.en, "a file of up to 30 pages", R.en.file)}</p>

      <h2>What gets translated</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>Document</th><th>Apostille or legalisation</th><th>Sworn translation</th></tr></thead>
        <tbody>
          <tr><td>Higher-education degree</td><td>Yes</td><td>Yes</td></tr>
          <tr><td>Letters proving professional experience (3 or 5 years, if no degree)</td><td>Not a public document</td><td>Yes</td></tr>
          <tr><td>Criminal record for the last two years</td><td>Yes</td><td>Yes</td></tr>
          <tr><td>Employment contract</td><td>No</td><td>Yes, if not in Spanish</td></tr>
          <tr><td>Family marriage and birth certificates</td><td>Yes</td><td>Yes</td></tr>
          <tr><td>Passport, health insurance, form</td><td>No</td><td>No</td></tr>
        </tbody>
      </table></div>
      <p>${T.apostillaAntes.en}</p>

      <h2>For law firms and HR teams</h2>
      <p>If you handle several permits a month, I work with a rate per document type, one delivery date per batch and an invoice to the firm or the company. Send me the first file and we'll set it up.</p>

      <h2>Price</h2>
      <p>Up to 10 pages, €${N}. From 11 to 19, never more than €${CAP}. From 20 to 30 pages, €${PP} per page. Quotes in under two hours, every day.</p>
    `,
    faq: [
      {
        q: "Which documents does the UGE-CE want translated for the highly qualified professional permit?",
        a: SHORT_ANSWERS.altaCualificacion.en,
      },
      { q: "How long does the UGE take to decide a highly qualified professional permit?", a: T.plazoUge.en },
    ],
  },
].map(withCover("en"));
