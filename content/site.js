// content/site.js
//
// Datos de contacto y redes en un único sitio, para que header, panel
// móvil, barra de acciones y footer no dupliquen URLs.
import { MIN_PRICE } from "./documents";
import { REVIEW_STATS, TRUSTPILOT_URL } from "./reviews";
import { PRICE_PER_PAGE, URGENCY_SURCHARGE, FIXED_PRICE_MAX_PAGES } from "./pricing";

export const PHONE_DISPLAY = "685 891 214";
export const PHONE_TEL = "+34685891214";
export const EMAIL = "info@juradaexpress.es";

export const WHATSAPP_URL =
  "https://wa.me/34685891214?text=Hola%20Jurada%20Express,%20quisiera%20un%20presupuesto";
export const WHATSAPP_URL_EN =
  "https://wa.me/34685891214?text=Hi%20Jurada%20Express,%20I%27d%20like%20a%20quote%20for%20a%20sworn%20translation";

// Listado oficial de Traductores/as-Intérpretes Jurados/as del MAEC, donde
// cualquiera puede comprobar el nombramiento nº 7310. content/persona.js lo
// reexporta como MAEC_URL (persona.js ya importa de este archivo, así que
// la constante vive aquí para evitar una importación circular).
export const MAEC_LIST_URL =
  "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Buscador-STIJ.aspx";

// Garantía de corrección en una línea (18/10/2026): la pinta la franja de
// confianza (app/components/TrustStrip.js) en todas las páginas públicas,
// junto a la nota y el número de reseñas de Google.
export const GUARANTEE_SHORT = {
  es: "Si la rechazan por un error mío, la corrijo gratis",
  en: "If it’s rejected because of my mistake, I fix it free",
};

// Dos garantías cortas (FASE 1 SEO, 27/09/2026) que se muestran bajo el
// botón de presupuesto de /traductor-jurado-ingles (y su versión /en), de
// las landings de ciudad y de las landings de documento para EE. UU. Las
// pinta app/components/Guarantees.js. `icon` es el nombre de un icono de
// app/components/Icons.js; `href` (opcional) convierte el texto en enlace.
// La garantía de plazo que había aquí la sustituye QuotePromise
// (DELIVERY_PROMISE), que va justo debajo de los mismos botones.
export const GUARANTEES = {
  es: [
    {
      id: "maec",
      icon: "shieldCheck",
      text: "Nombramiento MAEC comprobable",
      href: MAEC_LIST_URL,
      hrefLabel:
        "Comprobar el nombramiento en el listado oficial del MAEC (se abre en una pestaña nueva)",
    },
    {
      id: "correccion",
      icon: "refresh",
      text: "Si el organismo la rechaza por un error mío, la corrijo gratis",
    },
  ],
  en: [
    {
      id: "maec",
      icon: "shieldCheck",
      text: "Verifiable Foreign Ministry (MAEC) appointment",
      href: MAEC_LIST_URL,
      hrefLabel:
        "Check the appointment on the Ministry's official register (opens in a new tab)",
    },
    {
      id: "correccion",
      icon: "refresh",
      text: "If the authority rejects it because of my mistake, I fix it for free",
    },
  ],
};

// Perfiles confirmados por Elena el 25/08/2026 (usuario: juradaexpress
// en ambas redes). Si algún perfil se desactiva, pon la constante en null
// y su icono desaparece de toda la web.
export const INSTAGRAM_URL = "https://www.instagram.com/juradaexpress";
export const FACEBOOK_URL = "https://www.facebook.com/juradaexpress";
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/elena-penaranda-sworn-translator";

// Ficha de Google Business "Jurada Express" (place_id verificado en Maps
// el 26/08/2026). La URL vive en content/reviews.js → REVIEW_STATS (fuente
// única de reseñas) y se reexporta aquí porque el sameAs del JSON-LD y
// varios enlaces la importan de este archivo.
export const GOOGLE_BUSINESS_URL = REVIEW_STATS.google.url;

// Perfil de Trustpilot (activo desde el 14/11/2026): pie de página
// (SocialIcons), sameAs del JSON-LD y sección «Opiniones». La URL y los
// recuentos viven en content/reviews.js → REVIEW_STATS.
export { TRUSTPILOT_URL };

// Vídeo opcional de la sección "Cómo trabajamos" (ver sección 6 de la
// auditoría). Déjalo en null hasta tener un clip real (10-15 s, < 1,5 MB):
//   export const PROCESS_VIDEO = {
//     src: "/videos/proceso.mp4",
//     poster: "/fotos/proceso-despacho.jpg",
//     alt: "Sellado y firma de una traducción jurada",
//   };
export const PROCESS_VIDEO = null;

// ---------------------------------------------------------------------------
// Encargo internacional (docs/BRIEF-INTERNACIONAL-2026-09.md)
// ---------------------------------------------------------------------------

// Recuentos de reseñas (Google y Trustpilot): viven en content/reviews.js
// → REVIEW_STATS / TOTAL_REVIEWS. No escribas aquí ninguna cifra.

// Países desde los que Elena atiende con más frecuencia. El último elemento
// es deliberadamente abierto: el servicio es 100 % online y no excluye a
// nadie. Códigos ISO para el JSON-LD (areaServed).
export const SERVICE_COUNTRIES = [
  { code: "ES", es: "España", en: "Spain" },
  { code: "GB", es: "Reino Unido", en: "United Kingdom" },
  { code: "IE", es: "Irlanda", en: "Ireland" },
  { code: "US", es: "Estados Unidos", en: "United States" },
  { code: "CA", es: "Canadá", en: "Canada" },
  { code: "IN", es: "India", en: "India" },
  { code: "AU", es: "Australia", en: "Australia" },
  { code: null, es: "cualquier otro país", en: "any other country" },
];

// Otros países con sección propia en el hub /traduccion-jurada-por-paises
// (FASE 2B). Solo para areaServed del JSON-LD.
export const EXTRA_AREA_SERVED = ["NZ", "ZA", "GI", "PK", "NG", "PH"];

// Horario de atención con referencia horaria explícita (los clientes de
// EEUU, India o Australia necesitan saber a qué hora escriben).
export const TIMEZONE_NOTE = {
  es: "Horario de atención de 9:00 a 20:00, hora peninsular española (CET/CEST)",
  en: "Office hours 9:00 to 20:00, mainland Spain time (CET/CEST)",
};

// Envío en papel fuera de España. Sin tarifa fija publicada: el coste del
// transportista se indica en cada presupuesto.
// [[COMPLETAR: tarifa fija de envío internacional, solo si Elena quiere
// publicarla; si no, se deja la nota tal cual]]
export const INTERNATIONAL_SHIPPING = {
  available: true,
  price: null,
  note: {
    es: "Envío en papel fuera de España disponible por mensajería; el coste del transportista se indica en el presupuesto",
    en: "Paper copies can be couriered outside Spain; the courier cost is stated in the quote",
  },
};

// Entrega en papel dentro de España (calculadora de precio, 27/09/2026).
// Sin tarifa fija publicada: mientras price sea null, la calculadora muestra
// "+ mensajería: se indica en el presupuesto" en lugar de una cifra.
// [[COMPLETAR opcional: tarifa fija de mensajería en España, si Elena
// quiere publicarla]]
export const PAPER_DELIVERY_SPAIN = {
  price: null,
  note: {
    es: "Envío en papel por mensajería dentro de España: el coste del transportista se indica en el presupuesto",
    en: "Paper copy by courier within Spain: the courier cost is stated in the quote",
  },
};

// Política de plazos de Elena (14/11/2026): hasta SAME_DAY_MAX_PAGES
// páginas, entrega en el día en PDF firmado y sin recargo; más páginas, en
// OVER_LIMIT_HOURS horas. URGENCY_SURCHARGE es el recargo MÁXIMO de
// urgencia (hasta el 30 %, a consultar) para entregar antes del plazo
// normal; el importe exacto depende del volumen y se confirma por escrito.
// Los textos de urgencia de toda la web salen de URGENCY_TEXT.
export const SAME_DAY_MAX_PAGES = 10;
export const OVER_LIMIT_HOURS = 24;
// URGENCY_SURCHARGE vive en content/pricing.js (se reexporta más abajo).
const URGENCY_PCT = Math.round(URGENCY_SURCHARGE * 100);
export const URGENCY_TEXT = {
  es: {
    // Frase final de la promesa de plazo.
    sooner: `¿Lo necesitas antes? Escríbeme: según el volumen puede llevar un recargo de urgencia de hasta el ${URGENCY_PCT} %.`,
    // Para listas de tarifas y notas de precio.
    surcharge: `recargo de urgencia de hasta el ${URGENCY_PCT} %, a consultar, para entregar antes del plazo normal`,
    // Más de 10 páginas, en una línea.
    overLimit: `más de ${SAME_DAY_MAX_PAGES} páginas, en ${OVER_LIMIT_HOURS} h`,
  },
  en: {
    sooner: `Need it sooner? Message me: depending on volume, an urgency surcharge of up to ${URGENCY_PCT}% may apply.`,
    surcharge: `urgency surcharge of up to ${URGENCY_PCT}%, on request, for delivery faster than standard`,
    overLimit: `over ${SAME_DAY_MAX_PAGES} pages, within ${OVER_LIMIT_HOURS} hours`,
  },
};

// Precio por página de los documentos largos (contratos, escrituras,
// expedientes de varias páginas, pólizas, extractos), en euros, IVA
// incluido (10/10/2026). Es la misma cifra que la página adicional de los
// packs de /precios (content/packs.js la importa de aquí) y la que publica
// /traductor-jurado-ingles en su tabla «precio por página» y en el
// OfferCatalog del JSON-LD. Una página es una cara del documento original;
// la apostilla cuenta como página si hay que traducirla. Si cambia, se
// cambia solo aquí. [[CONFIRMAR con Elena antes de fusionar]]
// PRICE_PER_PAGE vive en content/pricing.js (cálculo de la calculadora);
// se reexporta desde aquí.
export { PRICE_PER_PAGE, URGENCY_SURCHARGE, FIXED_PRICE_MAX_PAGES };

// Mínimo por documento de los documentos largos (regla de Elena,
// 10/10/2026): 20 € por página con un mínimo de MIN_DOC_PRICE por
// documento (1 página, 35 €; 2 páginas, 40 €; 5 páginas, 100 €). Es la
// misma cifra que el precio mínimo del catálogo (content/documents.js →
// MIN_PRICE, 35 €), así que se reutiliza; documents.js no importa nada, no
// hay ciclo. La página adicional de los packs (EXTRA_PAGE_PRICE) no lleva
// mínimo.
export const MIN_DOC_PRICE = MIN_PRICE;

// Hora de corte para la entrega en el día (Fase A, revisión de Elena del
// 18/10/2026): una sola promesa de plazo en toda la web. Documento recibido
// antes de esta hora de Madrid, PDF firmado el mismo día; después, a primera
// hora del día siguiente. 28/10/2026 (Elena): misma hora en ES y EN, las
// 18:00 de Madrid (antes las páginas EN decían 3 pm). Si cambia, se cambia
// solo aquí (y en las conversiones horarias de fbi.js y acro.js).
export const SAME_DAY_CUTOFF = { es: "18:00", en: "6 pm" };

// La promesa completa (DELIVERY_PROMISE) va bajo todos los botones
// principales de presupuesto (QuotePromise: home, fichas de documento,
// landings de servicio, ciudad, país y EE. UU., guías, /precios y la
// calculadora) y en la FAQ «¿Cuándo la tengo?»; la primera frase sola
// (DELIVERY_PROMISE_SHORT) donde solo cabe una línea (celdas de tabla,
// fichas de documento).
export const DELIVERY_PROMISE = {
  es: `En el día hasta ${SAME_DAY_MAX_PAGES} páginas si lo recibo antes de las ${SAME_DAY_CUTOFF.es}. Si llega más tarde, lo tienes a primera hora del día siguiente. Más de ${SAME_DAY_MAX_PAGES} páginas: en ${OVER_LIMIT_HOURS} horas. ${URGENCY_TEXT.es.sooner}`,
  en: `Same day up to ${SAME_DAY_MAX_PAGES} pages if it reaches me before ${SAME_DAY_CUTOFF.en} Madrid time. Later than that, first thing the next morning. Over ${SAME_DAY_MAX_PAGES} pages: within ${OVER_LIMIT_HOURS} hours. ${URGENCY_TEXT.en.sooner}`,
};
export const DELIVERY_PROMISE_SHORT = {
  es: `En el día hasta ${SAME_DAY_MAX_PAGES} páginas si lo recibo antes de las ${SAME_DAY_CUTOFF.es}`,
  en: `Same day up to ${SAME_DAY_MAX_PAGES} pages if it reaches me before ${SAME_DAY_CUTOFF.en} Madrid time`,
};

export const TURNAROUND = {
  es: {
    short: `en el día (hasta ${SAME_DAY_MAX_PAGES} páginas)`,
    long: DELIVERY_PROMISE.es,
    over: `en ${OVER_LIMIT_HOURS} h (más de ${SAME_DAY_MAX_PAGES} páginas)`,
    urgent: "antes del plazo normal",
  },
  en: {
    short: `the same day (up to ${SAME_DAY_MAX_PAGES} pages)`,
    long: DELIVERY_PROMISE.en,
    over: `within ${OVER_LIMIT_HOURS} hours (over ${SAME_DAY_MAX_PAGES} pages)`,
    urgent: "faster than standard",
  },
};

// Nota junto al precio de las fichas de documento con precio fijo
// (app/components/DocumentPage.js, 18/10/2026). Solo se muestra cuando la
// ficha tiene cifra; con «presupuesto cerrado en menos de 2 h» no aparece.
export const FIXED_PRICE_NOTE = {
  es: "Precio por documento completo, apostilla incluida. Entrega en el día.",
  en: "Price per complete document, apostille included. Same-day delivery.",
};

// Foto de Elena para el hero de la home ES/EN (18/10/2026). Mientras sea
// null, el hero muestra la foto de marca de siempre (la mano firmando con
// el sello, /fotos/hero-firma.jpg) con la línea «Elena Peñaranda Ortega ·
// Traductora-Intérprete Jurada de Inglés · MAEC nº 7310» debajo. Cuando
// haya foto real, poner aquí la ruta (p. ej. "/fotos/elena-penaranda.jpg",
// retrato 4:5, mínimo 760×950 px) y el hero la usará sin tocar nada más.
export const HERO_PHOTO = null;

// H1 y subtítulo del hero de la home (Fase A2, informe CRO del
// 18/10/2026). Se publica la opción A (plazo). Para probar otra, basta con
// cambiar la constante; el componente no se toca. Las tres opciones:
//   A (plazo):    «Tu traducción jurada, firmada y entregada hoy»
//   B (persona):  «Habla con la traductora que firma tu documento»
//   C (garantía): «Traducción jurada con validez oficial o te la corrijo gratis»
export const HERO_H1 = {
  es: "Tu traducción jurada, firmada y entregada hoy",
  en: "Your sworn translation, signed and delivered today",
};
export const HERO_SUB = {
  es: `Soy Elena, traductora jurada de inglés (MAEC nº 7310). Mándame el documento y en menos de 2 horas tienes precio y plazo por escrito. Desde ${MIN_PRICE} € por documento, en el día hasta ${SAME_DAY_MAX_PAGES} páginas.`,
  en: `I'm Elena, sworn English translator (Spanish Foreign Ministry no. 7310). Send me the document and within 2 hours you have the price and deadline in writing. From €${MIN_PRICE} per document, same day up to ${SAME_DAY_MAX_PAGES} pages.`,
};

// Capacidad confirmada por Elena el 07/09/2026. Si algún día no puede
// garantizarse, poner en null: la web deja de citar la cifra y dice
// "pídeme información y te cierro plazo por escrito".
export const LARGE_PROJECT_CAPACITY = {
  es: "hasta 500 páginas por semana",
  en: "up to 500 pages per week",
};

// Copia en papel con firma manuscrita enviada a EEUU para USCIS, además del
// PDF firmado (confirmado por Elena el 07/09/2026).
export const USCIS_PAPER_COPY = true;

// Tarifa del expediente de visado de nómada digital (Digital Nomad Visa
// Pack, content/packs.js; fijada el 08/10/2026). Si se pone en null, la web
// vuelve a decir "presupuesto cerrado en menos de 2 h".
// 28/10/2026 (Elena): el precio cubre hasta DNV_PACK_MAX_DOCUMENTS
// documentos y DNV_PACK_MAX_PAGES páginas en total; cada página adicional,
// PRICE_PER_PAGE. Los documentos que no necesitan traducción jurada (copia
// del pasaporte) no cuentan. Ninguna página debe citar el precio sin estos
// límites: usar DNV_PACK_PRICE_TEXT y DNV_PACK_NOTE.
// 01/11/2026: subida de 189 € a 249 € (IVA incluido); los límites no cambian.
// 14/11/2026: el precio vive en PACKS (más abajo, id "nomad").
export const DNV_PACK_MAX_DOCUMENTS = 5;
export const DNV_PACK_MAX_PAGES = 10;

// ---------------------------------------------------------------------------
// Paquetes por trámite: ÚNICO sitio con nombre, documentos incluidos, precio
// y rango «por separado» de cada pack (14/11/2026). Lo leen las tarjetas de
// /precios y /en/precios, las páginas de visados y de nómada digital (ES y
// EN), el texto prellenado de WhatsApp, las meta descriptions, /llms.txt,
// las guías y content/us-visas.js (vía content/packs.js, que lo reexporta).
//
//   id         identificador estable (anclas #pack-<id>, eventos, Offer)
//   name       { es, en }
//   includes   { es, en }: qué documentos entran
//   documents  número máximo de documentos
//   pages      número máximo de páginas en total (14/11/2026); cada página
//              adicional, PRICE_PER_PAGE (20 €). La etiqueta de la tarjeta
//              dice «Hasta X documentos · Y páginas».
//   price      euros, IVA incluido. En /en se añade «approx. $X» con toUsd
//              (content/usd.js: € × 1,10 redondeado a 5 $).
//   separately precio de esos documentos sueltos, para la línea de
//              referencia bajo el precio: { upTo } (cifra alta, «hasta») o
//              { from } («desde»); null =
//              sin referencia (nómada digital).
//
// 14/11/2026: Spain Visa Pack 129 → 149 €, Irlanda / Reino Unido 169 →
// 219 €, Driving Licence 69 → 79 €; Family (299 €) y nómada (249 €) igual.
// ---------------------------------------------------------------------------
export const PACKS = [
  {
    id: "visa",
    name: { es: "Spain Visa Pack", en: "Spain Visa Pack" },
    includes: {
      es: "FBI o antecedentes penales, certificado médico, partida de nacimiento o matrimonio, y las apostillas solo si tu consulado exige traducirlas.",
      en: "FBI or police check, medical certificate, birth or marriage certificate, and apostilles only if your consulate requires them translated.",
    },
    documents: 4,
    pages: 8,
    price: 149,
    separately: { upTo: 180 },
  },
  {
    id: "visa-family",
    name: { es: "Spain Visa Family Pack", en: "Spain Visa Family Pack" },
    includes: {
      es: "Lo del Spain Visa Pack para dos adultos, más certificado de matrimonio y partidas de los hijos.",
      en: "The Spain Visa Pack documents for two adults plus marriage certificate and children's birth certificates.",
    },
    documents: 8,
    pages: 16,
    // 01/11/2026: subida de 229 € a 299 € (IVA incluido).
    price: 299,
    separately: { upTo: 360 },
  },
  {
    id: "nomad",
    name: { es: "Digital Nomad Visa Pack", en: "Digital Nomad Visa Pack" },
    includes: {
      // 28/10/2026 (Elena): hasta 5 documentos y 10 páginas en total; cada
      // página adicional a PRICE_PER_PAGE (límites en documents/pages).
      es: "Carta de la empresa o del cliente, antecedentes penales, título, certificado del seguro, prueba de ingresos o certificado de relación. La copia del pasaporte y los documentos que no necesitan traducción jurada no cuentan para el paquete.",
      en: "Employer or client letter, police check, degree, insurance certificate, proof of income or relationship certificate. A passport copy and other documents that don’t need a sworn translation don’t count towards the package.",
    },
    documents: DNV_PACK_MAX_DOCUMENTS,
    pages: DNV_PACK_MAX_PAGES,
    price: 249,
    separately: null,
  },
  {
    id: "ireland-uk",
    name: { es: "Pack Irlanda / Reino Unido", en: "Ireland / UK Pack" },
    includes: {
      es: "Título, expediente, antecedentes penales, certificado de delitos sexuales y dos referencias laborales.",
      en: "Degree, transcript, police check, sexual offences certificate and two employer references.",
    },
    documents: 6,
    pages: 12,
    price: 219,
    separately: { from: 235 },
  },
  {
    id: "driving",
    name: { es: "Driving Licence Pack", en: "Driving Licence Pack" },
    includes: {
      es: "Carné por las dos caras y certificado o historial de la autoridad emisora.",
      en: "Licence (both sides) and the issuing authority's certificate or driving record.",
    },
    documents: 2,
    pages: 4,
    price: 79,
    separately: { upTo: 85 },
  },
];

/** Pack por id (o undefined). */
export const getPack = (id) => PACKS.find((p) => p.id === id);
/** Precio en euros de un pack por id (o null). */
export const packPrice = (id) => getPack(id)?.price ?? null;
/**
 * Límites de un pack en una frase: «hasta 4 documentos y 8 páginas en
 * total; página adicional, 20 €» / «up to 4 documents and 8 pages in
 * total; extra page, €20». Acepta el pack o su id.
 */
export function packLimits(pack, locale = "es") {
  const p = typeof pack === "string" ? getPack(pack) : pack;
  if (!p) return "";
  return locale === "en"
    ? `up to ${p.documents} documents and ${p.pages} pages in total; extra page, €${PRICE_PER_PAGE}`
    : `hasta ${p.documents} documentos y ${p.pages} páginas en total; página adicional, ${PRICE_PER_PAGE} €`;
}

// Precio del Digital Nomad Visa Pack (alias que usan la landing de nómada
// digital y /precios). Si el pack desaparece, la web vuelve a decir
// "presupuesto cerrado en menos de 2 h".
export const DNV_PACK_PRICE = packPrice("nomad");
export const DNV_PACK_PRICE_TEXT = {
  es: `Precio: paquete visado de nómada digital, ${DNV_PACK_PRICE} € hasta ${DNV_PACK_MAX_DOCUMENTS} documentos y un máximo de ${DNV_PACK_MAX_PAGES} páginas en total. Cada página adicional, ${PRICE_PER_PAGE} €. Te doy el precio cerrado del lote por escrito antes de empezar y se paga en euros con tarjeta internacional.`,
  en: `Price: digital nomad visa package, €${DNV_PACK_PRICE} for up to ${DNV_PACK_MAX_DOCUMENTS} documents and a maximum of ${DNV_PACK_MAX_PAGES} pages in total. Each additional page, €${PRICE_PER_PAGE}. You get a fixed price for the whole batch in writing before I start, paid in euros by international card.`,
};
export const DNV_PACK_NOTE = {
  es: "Los documentos que no necesitan traducción jurada para el consulado o la UGE, como la copia del pasaporte, no cuentan para el paquete. Si tu expediente es más largo, te digo el precio exacto al revisarlo.",
  en: "Documents that don’t need a sworn translation for the consulate or the UGE, such as a passport copy, don’t count towards the package. If your file is longer, I’ll give you the exact price when I review it.",
};
// Versión corta para tablas y fichas de precio.
export const DNV_PACK_LIMITS = {
  es: packLimits("nomad", "es"),
  en: packLimits("nomad", "en"),
};
