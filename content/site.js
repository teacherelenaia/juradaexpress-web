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

// Perfiles confirmados por Elena el 25/08/2026 (usuario: juradaexpress
// en ambas redes). Si algún perfil se desactiva, pon la constante en null
// y su icono desaparece de toda la web.
export const INSTAGRAM_URL = "https://www.instagram.com/juradaexpress";
export const FACEBOOK_URL = "https://www.facebook.com/juradaexpress";

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
// gratuita para leerla: ACTUALIZAR A MANO cuando cambie (leído el
// 07/09/2026: 5,0 estrellas · 7 reseñas). Se usa en la franja de confianza
// de la home, en la cabecera de Opiniones y en aggregateRating del JSON-LD.
export const GOOGLE_RATING = 5.0;
export const GOOGLE_REVIEW_COUNT = 7;

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
