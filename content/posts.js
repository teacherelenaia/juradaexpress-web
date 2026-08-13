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

  // Añade estos 3 objetos dentro del array "posts" en content/posts.js
// (justo debajo del post existente "como-pedir-presupuesto-rapido",
// antes del comentario "// Puedes duplicar este objeto...")
  {
    slug: "cuanto-cuesta-traducir-titulo-universitario",
    title: "¿Cuánto cuesta traducir un título universitario? Guía de precios 2026",
    excerpt:
      "Precio real de la traducción jurada de un título universitario o expediente académico: de qué depende, plazos y cómo ahorrar.",
    date: "2026-06-10",
    readingTime: "5 min",
    html: `
      <p>Si necesitas presentar tu título universitario ante una universidad extranjera, un colegio profesional o un organismo de homologación, necesitarás una <strong>traducción jurada</strong>, no una traducción normal. Esto es lo que debes saber antes de pedir presupuesto.</p>
      <h2>¿De qué depende el precio?</h2>
      <ul>
        <li><strong>Extensión del documento:</strong> un título universitario simple (una página) cuesta menos que un expediente académico completo con notas de varios cursos.</li>
        <li><strong>Complejidad del contenido:</strong> nombres de asignaturas, calificaciones y terminología académica específica pueden requerir más tiempo de traducción.</li>
        <li><strong>Idioma:</strong> en la combinación español-inglés, al haber muchos traductores jurados acreditados, los precios suelen ser más ajustados que en idiomas menos comunes.</li>
        <li><strong>Urgencia:</strong> un plazo estándar de 24/48h no suele tener recargo; pedir el mismo día sí puede tenerlo.</li>
      </ul>
      <h2>Precio orientativo</h2>
      <p>Para un título universitario estándar (una página), el precio habitual se sitúa entre <strong>45€ y 60€</strong>. Si necesitas también el expediente académico completo con todas las asignaturas, el precio depende del número de páginas y se calcula con presupuesto cerrado tras ver el documento.</p>
      <h2>¿Necesito apostillar el título antes de traducirlo?</h2>
      <p>Depende del organismo de destino. Si el título se va a presentar en otro país, normalmente necesitarás la <strong>apostilla de La Haya</strong> en el documento original, tramitada en España (Ministerio de Justicia o el propio centro educativo), antes de enviarlo a traducir. Si tienes dudas sobre si tu caso la necesita, pregúntanos al pedir presupuesto y te orientamos sin compromiso.</p>
      <h2>¿Cómo pido presupuesto?</h2>
      <p>Envía una foto o escaneo legible de tu título (y expediente, si lo necesitas) por WhatsApp o email, indicando para qué organismo lo necesitas. En unas horas recibirás un precio cerrado y el plazo real de entrega.</p>
      <p>
        <a href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20quiero%20presupuesto%20para%20traducir%20mi%20t%C3%ADtulo%20universitario">Pide presupuesto por WhatsApp</a>
        o escribe a
        <a href="mailto:info@juradaexpress.es">info@juradaexpress.es</a>.
      </p>
    `,
  },

  {
    slug: "que-es-la-apostilla-de-la-haya",
    title: "¿Qué es la apostilla de La Haya y cuándo la necesitas?",
    excerpt:
      "Explicación sencilla de la apostilla: qué es, cuándo hace falta antes de una traducción jurada y dónde se tramita.",
    date: "2026-06-24",
    readingTime: "4 min",
    html: `
      <p>Es una de las dudas más frecuentes antes de encargar una traducción jurada: <em>"¿tengo que apostillar mi documento antes o no?"</em>. Aquí te lo explico de forma sencilla.</p>
      <h2>¿Qué es la apostilla?</h2>
      <p>La apostilla de La Haya es un sello o certificado oficial que confirma que un documento público (certificado de nacimiento, título universitario, antecedentes penales, etc.) es auténtico, para que tenga validez legal en otro país. Es un trámite <strong>distinto e independiente</strong> de la traducción jurada.</p>
      <h2>¿Se apostilla antes o después de traducir?</h2>
      <p>Siempre <strong>antes</strong>. La apostilla se coloca sobre el documento original, en el país donde se emitió. Una vez apostillado, se traduce el documento completo, incluyendo el texto de la propia apostilla.</p>
      <h2>¿Todos los documentos necesitan apostilla?</h2>
      <p>No. Depende de dos factores:</p>
      <ul>
        <li><strong>El país de origen del documento</strong>: solo aplica entre países firmantes del Convenio de La Haya de 1961 (la mayoría de países de Europa, América y muchos más, pero no todos).</li>
        <li><strong>Documentos de países de la Unión Europea</strong>: desde el Reglamento UE 2016/1191, muchos documentos públicos entre países de la UE ya no requieren apostilla.</li>
        <li><strong>El organismo de destino</strong>: algunos organismos españoles no la exigen para determinados trámites. Ante la duda, pregunta directamente al organismo que te pide la traducción.</li>
      </ul>
      <h2>¿Dónde se tramita?</h2>
      <p>Siempre en el país donde se emitió el documento original, no en España (salvo que el documento sea español y vaya a usarse en el extranjero, en cuyo caso se tramita aquí). No es un servicio que gestionemos directamente, pero si tienes dudas sobre tu caso concreto, pregúntanos al pedir presupuesto y te orientamos.</p>
      <h2>Resumen rápido</h2>
      <ol>
        <li>Consigue el documento original.</li>
        <li>Si aplica, apostíllalo en el país de origen.</li>
        <li>Envíanoslo (ya apostillado si corresponde) para la traducción jurada.</li>
      </ol>
      <p>
        ¿Tienes dudas sobre tu caso concreto? Escríbenos por
        <a href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20tengo%20una%20duda%20sobre%20la%20apostilla">WhatsApp</a>
        y te orientamos sin compromiso.
      </p>
    `,
  },

  {
    slug: "traduccion-jurada-vs-traduccion-certificada",
    title: "Traducción jurada vs. traducción certificada: diferencias que debes conocer",
    excerpt:
      "No son lo mismo. Te explico la diferencia entre traducción jurada, certificada y simple, y cuál necesitas según tu trámite.",
    date: "2026-07-08",
    readingTime: "4 min",
    html: `
      <p>Es habitual confundir estos términos, y elegir el tipo equivocado puede hacer que un organismo rechace tu documento. Aquí tienes la diferencia clara.</p>
      <h2>Traducción jurada</h2>
      <p>Es la única con <strong>validez legal oficial</strong> en España. Solo puede realizarla un traductor-intérprete jurado nombrado por el Ministerio de Asuntos Exteriores, Unión Europea y Cooperación (MAEC). Va firmada y sellada, y el traductor certifica bajo su responsabilidad que la traducción es fiel al original. Es la que exigen organismos oficiales: registros civiles, universidades, notarías, juzgados, consulados, etc.</p>
      <h2>Traducción certificada</h2>
      <p>Es un término que se usa más en el ámbito anglosajón (EE.UU., Reino Unido) y no siempre equivale legalmente a la traducción jurada española. En muchos países no existe la figura del "traductor jurado" como tal, y una traducción certificada es simplemente una traducción acompañada de una declaración firmada por el traductor. <strong>Importante:</strong> si el organismo español te pide "traducción jurada", una traducción certificada de otro país normalmente no es suficiente.</p>
      <h2>Traducción simple (no oficial)</h2>
      <p>Cualquier traductor profesional puede hacerla, sin necesidad de acreditación oficial. Válida para uso informativo, webs, documentos internos de empresa, currículums, etc. <strong>Nunca</strong> válida para trámites oficiales.</p>
      <h2>¿Cómo sé cuál necesito?</h2>
      <p>La forma más fiable es preguntar directamente al organismo que te pide el documento: <em>"¿necesito que sea una traducción jurada oficial?"</em>. Si la respuesta es sí, necesitas un traductor-intérprete jurado nombrado por el MAEC — puedes comprobar cualquier acreditación (incluida la mía) en el <a href="https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Traductores-Interpretes-Jurados.aspx" target="_blank" rel="noopener noreferrer">buscador oficial del Ministerio</a>.</p>
      <p>
        Si tienes dudas sobre tu documento concreto, escríbenos por
        <a href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20tengo%20una%20duda%20sobre%20qu%C3%A9%20tipo%20de%20traducci%C3%B3n%20necesito">WhatsApp</a>
        y te lo confirmamos antes de que pidas presupuesto.
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

