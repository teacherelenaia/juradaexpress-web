// content/site.js
//
// Datos de contacto y redes en un único sitio, para que header, panel
// móvil, barra de acciones y footer no dupliquen URLs.

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

// Tres garantías cortas (FASE 1 SEO, 27/09/2026) que se muestran bajo el
// chip de precio del hero de la home ES/EN, en /traductor-jurado-ingles
// (y su versión /en) y en las landings de ciudad. Las pinta
// app/components/Guarantees.js. `icon` es el nombre de un icono de
// app/components/Icons.js; `href` (opcional) convierte el texto en enlace.
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
    {
      id: "plazo",
      icon: "clock",
      text: "Entrega en el día hasta 10 páginas, plazo por escrito antes de cobrar",
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
    {
      id: "plazo",
      icon: "clock",
      text: "Same-day delivery up to 10 pages, deadline in writing before you pay",
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
// el 26/08/2026). Cuando Google verifique el perfil, se puede sustituir
// por el enlace corto g.page/r/… si se prefiere; ambos apuntan a la misma
// ficha y aparecen en el sameAs del JSON-LD.
export const GOOGLE_BUSINESS_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJPXZn2WGBYw0ROKmS0IqD-rk";

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

// Valoración pública de la ficha de Google Business. Google no ofrece API
// gratuita para leerla: ACTUALIZAR A MANO cuando cambie (leído en Google
// Maps el 26/09/2026: 5,0 estrellas · 24 reseñas; antes, 7 reseñas a
// 07/09/2026). Se usa en la franja de confianza de la home, en la cabecera
// de Opiniones y en aggregateRating del JSON-LD.
export const GOOGLE_RATING = 5.0;
export const GOOGLE_REVIEW_COUNT = 24;

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

// Promesa de plazo de toda la web (oferta comercial, 02/10/2026): hasta
// SAME_DAY_MAX_PAGES páginas, entrega en el día en PDF firmado y sin
// recargo; más páginas, plazo cerrado por escrito antes de empezar
// (normalmente 24-72 h). URGENCY_SURCHARGE: recargo del 30 % sobre el
// precio de catálogo, solo para entregar más de 10 páginas en el día.
export const SAME_DAY_MAX_PAGES = 10;
export const URGENCY_SURCHARGE = 0.3;
export const TURNAROUND = {
  es: {
    short: `en el día (hasta ${SAME_DAY_MAX_PAGES} páginas)`,
    long: `Los documentos de hasta ${SAME_DAY_MAX_PAGES} páginas se entregan en el día, en PDF firmado y sin recargo; los más largos tienen plazo cerrado por escrito antes de empezar, normalmente 24-72 h.`,
    urgent: `más de ${SAME_DAY_MAX_PAGES} páginas en el día`,
  },
  en: {
    short: `the same day (up to ${SAME_DAY_MAX_PAGES} pages)`,
    long: `Documents of up to ${SAME_DAY_MAX_PAGES} pages are delivered the same day as a signed PDF, with no surcharge; longer files get a written deadline before work starts, normally 24-72 hours.`,
    urgent: `more than ${SAME_DAY_MAX_PAGES} pages the same day`,
  },
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

// Tarifa del expediente de visado de nómada digital. Mientras sea null la
// web dice "presupuesto cerrado en menos de 2 h".
// [[COMPLETAR opcional: precio orientativo del pack de nómada digital]]
export const DNV_PACK_PRICE = null;
