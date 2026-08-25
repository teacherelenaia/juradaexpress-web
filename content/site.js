// content/site.js
//
// Datos de contacto y redes en un único sitio, para que header, panel
// móvil, barra de acciones y footer no dupliquen URLs.

export const PHONE_DISPLAY = "685 891 214";
export const PHONE_TEL = "+34685891214";
export const EMAIL = "info@juradaexpress.es";

export const WHATSAPP_URL =
  "https://wa.me/34685891214?text=Hola%20JuradaExpress,%20quisiera%20un%20presupuesto";
export const WHATSAPP_URL_EN =
  "https://wa.me/34685891214?text=Hi%20JuradaExpress,%20I%27d%20like%20a%20quote%20for%20a%20sworn%20translation";

// Perfiles confirmados por Elena el 25/08/2026 (usuario: juradaexpress
// en ambas redes). Si algún perfil se desactiva, pon la constante en null
// y su icono desaparece de toda la web.
export const INSTAGRAM_URL = "https://www.instagram.com/juradaexpress";
export const FACEBOOK_URL = "https://www.facebook.com/juradaexpress";

// Vídeo opcional de la sección "Cómo trabajamos" (ver sección 6 de la
// auditoría). Déjalo en null hasta tener un clip real (10-15 s, < 1,5 MB):
//   export const PROCESS_VIDEO = {
//     src: "/videos/proceso.mp4",
//     poster: "/fotos/proceso-despacho.jpg",
//     alt: "Sellado y firma de una traducción jurada",
//   };
export const PROCESS_VIDEO = null;
