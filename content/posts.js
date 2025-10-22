// content/posts.js
// Aquí defines tus posts. Puedes añadir/editar libremente.
// cover: imagen opcional (súbela a /public/blog/archivo.jpg y pon la ruta "/blog/archivo.jpg")

export const posts = [
  {
    slug: "cuando-necesito-traduccion-jurada",
    title: "¿Cuándo necesito una traducción jurada?",
    date: "2025-10-22",
    cover: "/og.jpg",
    excerpt:
      "Casos típicos en estudios, trabajo, trámites consulares, oposiciones y homologaciones.",
    content: `
      <p>Una <strong>traducción jurada</strong> es una traducción firmada y sellada por un Traductor-Intérprete Jurado. Tiene validez ante la Administración y organismos oficiales.</p>
      <h2>Casos más frecuentes</h2>
      <ul>
        <li>Estudios: títulos, certificados académicos, expedientes, planes de estudio.</li>
        <li>Trabajo: contratos, certificados de empresa, vida laboral, cartas de recomendación.</li>
        <li>Registro civil: <em>birth/marriage certificates</em>, certificados de antecedentes.</li>
        <li>Trámites consulares y oposiciones.</li>
        <li>Homologaciones y convalidaciones.</li>
      </ul>
      <h2>¿Digital o papel?</h2>
      <p>Ambas son válidas. Si el organismo acepta documentos electrónicos, suele bastar <strong>PDF con firma y sello</strong>. Si exigen original físico, enviamos la versión en papel.</p>
      <p>¿Dudas? Escríbenos a <a href="mailto:info@juradaexpress.es">info@juradaexpress.es</a> o por WhatsApp: 685 891 214.</p>
    `,
    tags: ["guías", "preguntas frecuentes"],
  },
  {
    slug: "digital-vs-papel-en-traduccion-jurada",
    title: "Digital (PDF) vs papel: ¿qué opción elegir?",
    date: "2025-10-22",
    cover: "/docs.jpg",
    excerpt:
      "Ventajas, validez y cuándo conviene cada modalidad en traducción jurada.",
    content: `
      <p>La <strong>traducción jurada digital</strong> (PDF con firma y sello) es ágil y cómoda. La versión en <strong>papel</strong> es necesaria cuando el destino exige original físico.</p>
      <h2>Cuándo elegir PDF</h2>
      <ul>
        <li>Presentación telemática (sede electrónica).</li>
        <li>Universidades y empresas que aceptan documentación digital.</li>
        <li>Trámites rápidos en los que no puedes esperar al envío postal.</li>
      </ul>
      <h2>Cuándo elegir papel</h2>
      <ul>
        <li>Registros que piden <em>original físico</em> (compruébalo en la convocatoria).</li>
        <li>Procesos en los que te exigen copia compulsada de la traducción.</li>
      </ul>
      <p>Si no estás seguro, consúltanos y te orientamos según tu caso concreto.</p>
    `,
    tags: ["consejos", "formatos"],
  },
  {
    slug: "como-pedir-presupuesto-rapido",
    title: "Cómo pedir presupuesto (rápido y cerrado)",
    date: "2025-10-22",
    cover: "/people.jpg",
    excerpt:
      "Qué enviar y cómo preparar tus documentos para recibir precio y plazo orientativo en el día.",
    content: `
      <p>Para preparar un <strong>presupuesto cerrado</strong>, envíanos:</p>
      <ol>
        <li>Escaneos o fotos legibles de <em>todo</em> el documento (anverso y reverso si procede).</li>
        <li>Idioma de origen y destino (p. ej., español → inglés).</li>
        <li>Uso/destino (universidad, registro civil, consulado, empresa…).</li>
        <li>Preferencia de entrega: <strong>PDF</strong> o <strong>papel</strong>.</li>
        <li>Plazo deseado, si es urgente.</li>
      </ol>
      <p>Con eso te respondemos con <strong>precio</strong> y <strong>plazo</strong> orientativo (24/48 h para documentos breves).</p>
      <p>Contacto: <a href="mailto:info@juradaexpress.es">info@juradaexpress.es</a> · WhatsApp 685 891 214</p>
    `,
    tags: ["consejos", "plazos", "precios"],
  },
];

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}

export function getAllPosts() {
  // Ordenados por fecha descendente
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

