// content/posts.js

export const posts = [
  {
    slug: "como-pedir-presupuesto-rapido",
    title: "Cómo pedir presupuesto (rápido y cerrado)",
    excerpt: "Qué enviar para recibir un precio cerrado en minutos (documentos, idioma, destino, entrega y plazos).",
    date: "2025-10-22",
    readingTime: "4 min",
    image: "/docs.jpg", // opcional, si no existe no pasa nada
    // IMPORTANTE: El contenido en HTML va entre backticks ( ` ... ` )
    html: `
      <p>Para preparar un <strong>presupuesto cerrado</strong>, envíanos:</p>
      <ol>
        <li>Escaneos o fotos legibles de <em>todo</em> el documento (anverso y reverso si procede).</li>
        <li>Idioma de origen y destino (p. ej., español → inglés).</li>
        <li>Uso/destino (universidad, registro civil, consulado, empresa...).</li>
        <li>Preferencia de entrega: <strong>PDF</strong> o <strong>papel</strong>.</li>
        <li>Plazo deseado, si es urgente.</li>
      </ol>

      <p>Con eso te respondemos con <strong>precio</strong> y <strong>plazo</strong> orientativo (24/48 h para documentos breves).</p>

      <p>
        Contacto:
        <a href="mailto:info@juradaexpress.es">info@juradaexpress.es</a> ·
        WhatsApp <a href="https://wa.me/34685891214">685 891 214</a>
      </p>
    `,
  },

  // Puedes duplicar este objeto para añadir nuevos posts:
  // {
  //   slug: "otro-articulo",
  //   title: "Título del artículo",
  //   excerpt: "Resumen corto del artículo...",
  //   date: "2025-10-25",
  //   readingTime: "3 min",
  //   image: "/hero.jpg",
  //   html: `
  //     <p>Contenido del artículo en HTML...</p>
  //   `,
  // },
];

// Helpers sencillos
export function getAllPosts() {
  // Ordena por fecha descendente
  return posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}

