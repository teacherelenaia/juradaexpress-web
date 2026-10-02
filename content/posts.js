// content/posts.js
//
// Artículos del blog en español. El campo opcional `translationOf` es el
// slug del mismo artículo en inglés (content/posts.en.js): las plantillas
// de blog emiten hreflang es/en/x-default y un enlace visible, y el sitemap
// añade las alternates de idioma. Los precios que citan los artículos
// recientes salen SIEMPRE de content/documents.js (eur(id) / MIN_PRICE),
// para que nunca se desincronicen del catálogo.
import { DOCUMENTS, MIN_PRICE } from "./documents";

const priceOf = (id) => DOCUMENTS.find((d) => d.id === id)?.price ?? null;
const eur = (id) =>
  priceOf(id) != null ? `${priceOf(id)} €` : "presupuesto cerrado en menos de 2 h";

export const posts = [
  {
    slug: "como-pedir-presupuesto-rapido",
    title: "Cómo pedir presupuesto (rápido y cerrado)",
    excerpt: "Qué enviar para recibir un precio cerrado en minutos (documentos, idioma, destino, entrega y plazos).",
    date: "2025-10-22",
    updated: "2025-10-22",
    author: "Elena Peñaranda Ortega",
    tags: ["consejos", "precios"],
    readingTime: "4 min",
    image: "/blog/real-consejos.jpg",
    alt: "Documentos y bolígrafo listos para pedir presupuesto de traducción jurada",
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

      <p>Con eso te respondemos con <strong>precio</strong> y <strong>plazo</strong> orientativo (en el día para documentos de hasta 10 páginas).</p>

      <p>¿No sabes por dónde empezar? Consulta nuestro <a href="/documentos">catálogo de documentos</a> con los precios más habituales.</p>

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
    updated: "2026-06-10",
    author: "Elena Peñaranda Ortega",
    tags: ["academico", "precios"],
    readingTime: "5 min",
    image: "/blog/real-academico.jpg",
    alt: "Título universitario y expediente académico sobre una mesa",
    html: `
      <p>Si necesitas presentar tu título universitario ante una universidad extranjera, un colegio profesional o un organismo de homologación, necesitarás una <a href="/traduccion-jurada-titulo-universitario"><strong>traducción jurada</strong></a>, no una traducción normal. Esto es lo que debes saber antes de pedir presupuesto.</p>
      <h2>¿De qué depende el precio?</h2>
      <ul>
        <li><strong>Extensión del documento:</strong> un título universitario simple (una página) cuesta menos que un expediente académico completo con notas de varios cursos.</li>
        <li><strong>Complejidad del contenido:</strong> nombres de asignaturas, calificaciones y terminología académica específica pueden requerir más tiempo de traducción.</li>
        <li><strong>Idioma:</strong> en la combinación español-inglés, al haber muchos traductores jurados acreditados, los precios suelen ser más ajustados que en idiomas menos comunes.</li>
        <li><strong>Urgencia:</strong> la entrega en el día de documentos de hasta 10 páginas no tiene recargo; entregar en el día más de 10 páginas sí lo tiene (30 %).</li>
      </ul>
      <h2>Precio orientativo</h2>
      <p>Para un título universitario estándar (una página), el precio habitual se sitúa entre <strong>45€ y 60€</strong>. Si necesitas también el expediente académico completo con todas las asignaturas, el precio depende del número de páginas y se calcula con presupuesto cerrado tras ver el documento.</p>
      <h2>¿Necesito apostillar el título antes de traducirlo?</h2>
      <p>Depende del organismo de destino. Si el título se va a presentar en otro país, normalmente necesitarás la <strong>apostilla de La Haya</strong> en el documento original, tramitada en España (Ministerio de Justicia o el propio centro educativo), antes de enviarlo a traducir. Si tienes dudas sobre si tu caso la necesita, pregúntanos al pedir presupuesto y te orientamos sin compromiso.</p>
      <h2>¿Cómo pido presupuesto?</h2>
      <p>Envía una foto o escaneo legible de tu título (y expediente, si lo necesitas) por WhatsApp o email, indicando para qué organismo lo necesitas. En unas horas recibirás un precio cerrado y el plazo real de entrega.</p>
      <p>
        <a href="https://wa.me/34685891214?text=Hola%20Jurada%20Express,%20quiero%20presupuesto%20para%20traducir%20mi%20t%C3%ADtulo%20universitario">Pide presupuesto por WhatsApp</a>
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
    updated: "2026-06-24",
    author: "Elena Peñaranda Ortega",
    tags: ["apostilla", "consejos"],
    readingTime: "4 min",
    image: "/blog/real-apostilla.jpg",
    alt: "Sello de apostilla de La Haya sobre un documento oficial",
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
      <p>Si tu documento (partida de nacimiento, título universitario, certificado de penales…) ya está apostillado, consulta nuestro <a href="/documentos">catálogo de documentos</a> para ver precios y pedir presupuesto.</p>
      <p>
        ¿Tienes dudas sobre tu caso concreto? Escríbenos por
        <a href="https://wa.me/34685891214?text=Hola%20Jurada%20Express,%20tengo%20una%20duda%20sobre%20la%20apostilla">WhatsApp</a>
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
    updated: "2026-07-08",
    author: "Elena Peñaranda Ortega",
    tags: ["validez", "consejos"],
    readingTime: "4 min",
    image: "/blog/categoria-consejos.jpg",
    alt: "Documentos legales sobre una mesa de trabajo",
    html: `
      <p>Es habitual confundir estos términos, y elegir el tipo equivocado puede hacer que un organismo rechace tu documento. Aquí tienes la diferencia clara.</p>
      <h2>Traducción jurada</h2>
      <p>Es la única con <strong>validez legal oficial</strong> en España. Solo puede realizarla un traductor-intérprete jurado nombrado por el Ministerio de Asuntos Exteriores, Unión Europea y Cooperación (MAEC). Va firmada y sellada, y el traductor certifica bajo su responsabilidad que la traducción es fiel al original. Es la que exigen organismos oficiales: registros civiles, universidades, notarías, juzgados, consulados, etc. Más info sobre su <a href="/traduccion-jurada-validez-oficial">validez ante organismos oficiales, universidades y consulados</a>.</p>
      <h2>Traducción certificada</h2>
      <p>Es un término que se usa más en el ámbito anglosajón (EE.UU., Reino Unido) y no siempre equivale legalmente a la traducción jurada española. En muchos países no existe la figura del "traductor jurado" como tal, y una traducción certificada es simplemente una traducción acompañada de una declaración firmada por el traductor. <strong>Importante:</strong> si el organismo español te pide "traducción jurada", una traducción certificada de otro país normalmente no es suficiente.</p>
      <h2>Traducción simple (no oficial)</h2>
      <p>Cualquier traductor profesional puede hacerla, sin necesidad de acreditación oficial. Válida para uso informativo, webs, documentos internos de empresa, currículums, etc. <strong>Nunca</strong> válida para trámites oficiales.</p>
      <h2>¿Cómo sé cuál necesito?</h2>
      <p>La forma más fiable es preguntar directamente al organismo que te pide el documento: <em>"¿necesito que sea una traducción jurada oficial?"</em>. Si la respuesta es sí, necesitas un traductor-intérprete jurado nombrado por el MAEC — puedes comprobar cualquier acreditación (incluida la mía) en el <a href="https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Traductores-Interpretes-Jurados.aspx" target="_blank" rel="noopener noreferrer">buscador oficial del Ministerio</a>.</p>
      <p>
        Si tienes dudas sobre tu documento concreto, escríbenos por
        <a href="https://wa.me/34685891214?text=Hola%20Jurada%20Express,%20tengo%20una%20duda%20sobre%20qu%C3%A9%20tipo%20de%20traducci%C3%B3n%20necesito">WhatsApp</a>
        y te lo confirmamos antes de que pidas presupuesto.
      </p>
    `,
  },

  {
    slug: "homologacion-titulo-universitario-extranjero-espana",
    title: "Homologar un título universitario extranjero en España: qué traducir y cómo",
    excerpt:
      "Guía práctica sobre la homologación de títulos extranjeros en España: qué documentos necesitas traducir de forma jurada y en qué orden.",
    date: "2026-07-22",
    updated: "2026-07-22",
    author: "Elena Peñaranda Ortega",
    tags: ["academico", "apostilla"],
    readingTime: "5 min",
    image: "/blog/categoria-academico.jpg",
    alt: "Título universitario extranjero listo para homologar en España",
    html: `
      <p>Si estudiaste fuera de España y quieres que tu título tenga validez aquí (para trabajar, opositar o seguir estudiando), necesitas pasar por el proceso de <strong>homologación o equivalencia</strong> del Ministerio de Educación. La traducción jurada es un paso obligatorio dentro de ese proceso.</p>

      <h2>¿Qué documentos suelen pedir traducidos?</h2>
      <ul>
        <li><a href="/traduccion-jurada-titulo-universitario">Título universitario original</a></li>
        <li>Certificado académico oficial con las asignaturas cursadas y calificaciones</li>
        <li>En algunos casos, el plan de estudios o programa de la titulación</li>
      </ul>
      <p>Cada uno debe traducirse de forma jurada, es decir, firmada y sellada por un traductor-intérprete jurado acreditado por el MAEC — no vale una traducción simple ni la que a veces facilita la propia universidad extranjera.</p>

      <h2>¿En qué orden se hacen los trámites?</h2>
      <ol>
        <li><strong>Legalización o apostilla</strong> del documento original en el país donde se emitió (salvo excepciones dentro de la UE).</li>
        <li><strong>Traducción jurada</strong> de cada documento ya apostillado, incluyendo el texto de la apostilla.</li>
        <li><strong>Presentación</strong> de toda la documentación en la sede electrónica del Ministerio de Educación, Formación Profesional y Deportes, o en registro presencial.</li>
      </ol>

      <h2>Errores comunes que retrasan el trámite</h2>
      <ul>
        <li>Traducir el documento antes de apostillarlo (hay que traducir también el sello de la apostilla, así que si se hace al revés, hay que volver a traducir).</li>
        <li>Presentar una traducción sin firma ni sello del traductor jurado.</li>
        <li>Faltar el certificado académico completo y presentar solo el título.</li>
      </ul>

      <h2>¿Cuánto se tarda en traducir estos documentos?</h2>
      <p>Con el documento ya apostillado y en buena calidad de escaneo, la entrega es <strong>en el día para documentos de hasta 10 páginas</strong>. Si el expediente académico es más extenso (varios cursos con muchas asignaturas), te doy un plazo por escrito antes de empezar, normalmente 24-72 h.</p>

      <p>
        ¿Tienes tus documentos listos y quieres presupuesto? Escríbenos por
        <a href="https://wa.me/34685891214?text=Hola%20Jurada%20Express,%20necesito%20traducir%20documentos%20para%20homologar%20mi%20t%C3%ADtulo">WhatsApp</a>
        indicando qué documentos necesitas traducir.
      </p>
    `,
  },

  {
    slug: "documentos-traducidos-nacionalidad-espanola-residencia",
    title: "Nacionalidad española por residencia: qué documentos necesitas traducir",
    excerpt:
      "Lista de los documentos que suelen requerir traducción jurada al pedir la nacionalidad española por residencia.",
    date: "2026-08-05",
    updated: "2026-08-05",
    author: "Elena Peñaranda Ortega",
    tags: ["extranjeria", "apostilla"],
    readingTime: "5 min",
    image: "/blog/real-extranjeria.jpg",
    alt: "Pasaporte y documentos para trámites de nacionalidad española",
    html: `
      <p>El expediente de nacionalidad española por residencia exige aportar varios documentos del país de origen, y si no están en español, deben acompañarse de su <strong>traducción jurada</strong>. Esto es lo que normalmente se pide traducido.</p>

      <h2>Documentos que suelen necesitar traducción</h2>
      <ul>
        <li><a href="/traduccion-jurada-partida-nacimiento">Certificado de nacimiento</a> (literal, actualizado)</li>
        <li><a href="/traduccion-jurada-certificado-penales">Certificado de antecedentes penales</a> del país de origen (y de cualquier otro país donde se haya residido en los últimos 5 años)</li>
        <li>Certificado de matrimonio, si aplica</li>
        <li>Libro de familia o certificado de estado civil</li>
        <li>Certificado de empadronamiento histórico, si se emitió en otro idioma</li>
      </ul>

      <h2>Un detalle importante: la vigencia</h2>
      <p>Muchos organismos exigen que ciertos certificados (especialmente el de antecedentes penales) tengan una <strong>antigüedad máxima</strong>, normalmente 3 o 6 meses desde su emisión, y a veces también desde la traducción. Si tu documento es antiguo, infórmate antes de traducirlo para no tener que repetir el trámite.</p>

      <h2>¿Hace falta apostilla?</h2>
      <p>En la mayoría de los casos sí, salvo que el documento venga de un país de la Unión Europea acogido al Reglamento UE 2016/1191, que exime de apostilla para determinados documentos públicos entre países miembros. Si tienes dudas sobre tu país concreto, pregúntanos al enviarnos el documento.</p>

      <h2>Consejo práctico</h2>
      <p>Reúne y apostilla todos los documentos antes de empezar a traducir, en vez de ir traduciendo uno a uno según te los van pidiendo — así ahorras tiempo y evitas pagar varios envíos sueltos.</p>

      <p>
        Envíanos tus documentos y te decimos exactamente qué necesita traducción y el precio cerrado:
        <a href="https://wa.me/34685891214?text=Hola%20Jurada%20Express,%20estoy%20tramitando%20la%20nacionalidad%20espa%C3%B1ola%20y%20necesito%20traducir%20documentos">escríbenos por WhatsApp</a>.
      </p>
    `,
  },

  {
    slug: "como-escanear-bien-documentos-con-el-movil",
    title: "Cómo escanear correctamente tus documentos con el móvil (para que no te los rechacen)",
    excerpt:
      "Consejos prácticos para fotografiar o escanear tus documentos con el móvil antes de enviarlos a traducir, y evitar retrasos.",
    date: "2026-08-12",
    updated: "2026-08-12",
    author: "Elena Peñaranda Ortega",
    tags: ["consejos"],
    readingTime: "3 min",
    image: "/blog/post-escanear.jpg",
    alt: "Escaneando un documento oficial con el móvil",
    html: `
      <p>Un escaneo o foto de mala calidad es la causa más frecuente de retraso al pedir una traducción jurada: si el traductor no puede leer un dato con total claridad, tiene que pararse a confirmarlo contigo. Con estos consejos lo evitas.</p>

      <h2>1. Usa una app de escaneo, no la cámara normal</h2>
      <p>Las apps de escaneo (como Adobe Scan, Google Drive o el propio escáner del iPhone en Notas) enderezan la imagen, ajustan el contraste y suelen convertir directamente a PDF. Se nota mucho la diferencia frente a una foto suelta.</p>

      <h2>2. Buena luz, sin sombras ni reflejos</h2>
      <p>Evita hacer la foto con luz directa que genere reflejos sobre el papel (frecuente en documentos plastificados como el DNI). La luz natural indirecta, de día, suele dar el mejor resultado.</p>

      <h2>3. Documento completo, sin cortar bordes</h2>
      <p>Asegúrate de que se ve el documento entero, incluyendo sellos, márgenes y cualquier anotación al borde — a veces ahí hay información relevante (números de registro, fechas) que también hay que traducir.</p>

      <h2>4. Un archivo por documento</h2>
      <p>Si tienes varias páginas de un mismo documento (por ejemplo, un expediente académico), únelas en un solo PDF en el orden correcto, en vez de enviar varias fotos sueltas y desordenadas.</p>

      <h2>5. Revisa que se lea todo antes de enviarlo</h2>
      <p>Antes de enviarlo, amplía la imagen en tu propio móvil y comprueba que puedes leer perfectamente los nombres propios, fechas y números — si tú no lo lees bien, nosotros tampoco podremos.</p>

      <p>Cuando tengas tu escaneo listo, consulta nuestro <a href="/documentos">catálogo de documentos</a> para ver precios y enviarlo directamente.</p>

      <p>
        Si tienes dudas sobre si tu escaneo vale, envíanoslo igualmente por
        <a href="https://wa.me/34685891214?text=Hola%20Jurada%20Express,%20tengo%20una%20duda%20sobre%20la%20calidad%20de%20mi%20escaneo">WhatsApp</a>
        y te decimos si hace falta repetirlo antes de seguir.
      </p>
    `,
  },

  {
    slug: "traduccion-jurada-tramites-extranjeria",
    title: "Traducción jurada para trámites de extranjería: arraigo, reagrupación y más",
    excerpt:
      "Qué documentos necesitas traducir de forma jurada para arraigo, reagrupación familiar y otros trámites de extranjería habituales.",
    date: "2026-08-13",
    updated: "2026-08-13",
    author: "Elena Peñaranda Ortega",
    tags: ["extranjeria"],
    readingTime: "4 min",
    image: "/blog/categoria-extranjeria.jpg",
    alt: "Documentos de extranjería listos para traducción jurada",
    html: `
      <p>Los trámites de extranjería (arraigo, reagrupación familiar, renovaciones, tarjeta comunitaria de familiar) suelen requerir documentación del país de origen, que debe presentarse traducida de forma jurada al español.</p>

      <h2>Arraigo social, laboral o familiar</h2>
      <p>Dependiendo del tipo de arraigo, es habitual necesitar traducción de:</p>
      <ul>
        <li><a href="/traduccion-jurada-partida-nacimiento">Certificado de nacimiento</a></li>
        <li><a href="/traduccion-jurada-certificado-penales">Certificado de antecedentes penales</a> del país de origen</li>
        <li><a href="/traduccion-jurada-titulo-universitario">Título académico o certificados de formación</a>, si se aportan como mérito</li>
      </ul>

      <h2>Reagrupación familiar</h2>
      <p>Además de los certificados de nacimiento de los familiares a reagrupar, suele pedirse:</p>
      <ul>
        <li>Certificado de matrimonio (si se reagrupa a cónyuge)</li>
        <li>Libro de familia o documento equivalente que acredite el vínculo</li>
        <li>Certificados de convivencia previa, si el organismo de destino los exige</li>
      </ul>

      <h2>Un aviso importante sobre los plazos</h2>
      <p>Los expedientes de extranjería suelen tener plazos ajustados para subsanar documentación. Si te piden una traducción jurada con poco margen, dínoslo al pedir presupuesto — entregamos en el día los documentos de hasta 10 páginas, y si es realmente urgente, intentamos ajustarnos siempre que sea posible.</p>

      <h2>¿Y si el documento está dañado o es una copia?</h2>
      <p>Podemos traducir a partir de una fotocopia o escaneo, pero el traductor debe hacer constar en la traducción que se ha trabajado a partir de una copia y no del original. Si el organismo exige expresamente el original, tenlo en cuenta antes de presentar el expediente.</p>

      <p>
        Cuéntanos tu caso concreto por
        <a href="https://wa.me/34685891214?text=Hola%20Jurada%20Express,%20tengo%20un%20tr%C3%A1mite%20de%20extranjer%C3%ADa%20y%20necesito%20traducir%20documentos">WhatsApp</a>
        y te decimos exactamente qué necesitas y el plazo real.
      </p>
    `,
  },

  {
    slug: "traduccion-jurada-permiso-conducir",
    title: "Traducción jurada del permiso de conducir: cuándo hace falta y cuánto cuesta",
    excerpt:
      "Canje del permiso británico en la DGT tras el Brexit: cuándo te pedirán traducción jurada del carnet de conducir, precio desde 40 € y entrega en 24 h.",
    date: "2026-08-04",
    updated: "2026-08-04",
    author: "Elena Peñaranda Ortega",
    tags: ["conducir", "reino-unido", "precios"],
    readingTime: "5 min",
    image: "/blog/post-conducir.jpg",
    alt: "Pasaporte y documentos de viaje sobre un portátil, listos para el canje del permiso de conducir",
    html: `
      <p>Desde el acuerdo posterior al Brexit, los residentes británicos en España pueden <strong>canjear su permiso de conducir en la DGT</strong> sin repetir el examen. La noticia corrió rápido; lo que corre menos es la letra pequeña del expediente, y ahí es donde aparece la traducción jurada del carnet de conducir. Te cuento cuándo hace falta, cuánto cuesta y cómo evitar el error más común.</p>

      <h2>¿La DGT me va a pedir la traducción del permiso?</h2>
      <p>No siempre, y por eso conviene entender el porqué. El permiso de conducir británico es un documento bastante estandarizado, con códigos europeos que la DGT reconoce. Pero el expediente de canje no se compone solo del carnet: según tu caso, Tráfico puede pedirte <strong>certificados de la DVLA</strong> — el llamado <em>check code</em>, cartas sobre tu <em>entitlement</em> o la confirmación de que el permiso sigue vigente — y esos documentos llegan en inglés y sin formato estándar. Es ahí donde entra la <a href="/traduccion-jurada-permiso-conducir">traducción jurada</a>: da fe oficial de lo que dice el documento, con firma y sello de traductora nombrada por el MAEC.</p>
      <p>Mi consejo práctico: cuando pidas tu cita en la DGT, revisa la lista exacta de documentos que te indican. Si en ella aparece cualquier papel de la DVLA o el propio permiso "con traducción", ya sabes lo que toca — y si tienes dudas con la lista delante, mándamela por WhatsApp y te digo en minutos qué se traduce y qué no.</p>

      <h2>¿Cuánto cuesta y cuánto se tarda?</h2>
      <p>El permiso de conducir es de los documentos más breves que existen, y el precio lo refleja: <strong>desde 40 €</strong>, con entrega <strong>en el día</strong>. Los certificados de la DVLA cuentan como documento aparte, también breve. Recibes un PDF firmado digitalmente, válido para presentarlo telemáticamente, y el papel por mensajería si tu oficina lo pide.</p>

      <h2>¿Necesita apostilla?</h2>
      <p>Normalmente <strong>no</strong>. La DGT no suele exigir apostilla ni para el permiso ni para los certificados de la DVLA, a diferencia de lo que pasa con los <a href="/traduccion-jurada-certificado-penales">antecedentes penales</a> en los trámites de extranjería. Si tu oficina concreta la pidiera — pasa muy de tarde en tarde —, la apostilla viene en el mismo documento y la traduzco sin coste adicional.</p>

      <h2>¿Qué pasa si dejé pasar el plazo de canje?</h2>
      <p>Los plazos del acuerdo y sus prórrogas los fija la DGT, no la traducción: la traducción jurada no caduca, así que puedes prepararla cuando quieras. Si tu situación se ha complicado (permiso caducado, cambio de residencia, permisos de otros países anglófonos), el expediente puede requerir más documentos — certificados de residencia, historiales de la DVLA — y todos se traducen con el mismo formato y la misma validez.</p>

      <h2>Cómo pedirlo sin equivocarte</h2>
      <ol>
        <li>Haz una <strong>foto nítida del permiso por las dos caras</strong> (o descarga el PDF de la DVLA).</li>
        <li>Envíamela por WhatsApp o email junto con la lista de requisitos de tu cita, si la tienes.</li>
        <li>Te confirmo qué documentos necesitan traducción, el precio cerrado y el plazo — en menos de 2 horas.</li>
      </ol>
      <p>
        <a href="https://wa.me/34685891214?text=Hola%20Jurada%20Express,%20necesito%20traducir%20mi%20permiso%20de%20conducir%20para%20el%20canje%20en%20la%20DGT">Pide presupuesto por WhatsApp</a>
        o consulta la <a href="/traduccion-jurada-permiso-conducir">ficha del permiso de conducir</a> con precios y plazos.
      </p>
    `,
  },

  {
    slug: "documentos-para-casarse-en-espana-con-extranjero",
    title: "Casarse en España con un ciudadano extranjero: documentos que necesitan traducción jurada",
    excerpt:
      "Certificado de nacimiento, capacidad matrimonial, penales y empadronamiento: qué pide el Registro Civil, qué se traduce y por qué la vigencia de 3-6 meses importa tanto.",
    date: "2026-08-18",
    updated: "2026-08-18",
    author: "Elena Peñaranda Ortega",
    tags: ["matrimonio", "extranjeria", "apostilla"],
    readingTime: "6 min",
    image: "/blog/post-boda.jpg",
    alt: "Certificados oficiales apilados para el expediente matrimonial del Registro Civil",
    html: `
      <p>Preparar una boda ya da trabajo; preparar el <strong>expediente matrimonial</strong> cuando uno de los dos es extranjero, más. La buena noticia: la lista de documentos es corta y siempre parecida. La mala: casi todos caducan, y pedir las cosas en el orden equivocado obliga a empezar de nuevo. Esto es lo que el Registro Civil te va a pedir y cómo organizarlo bien a la primera.</p>

      <h2>¿Qué documentos pide el Registro Civil?</h2>
      <p>Para el cónyuge extranjero, el expediente incluye normalmente:</p>
      <ul>
        <li><strong><a href="/traduccion-jurada-partida-nacimiento">Certificado de nacimiento</a></strong> reciente, expedido por su país de origen.</li>
        <li><strong>Certificado de capacidad matrimonial</strong> o de soltería — en Reino Unido, el <em>Certificate of No Impediment (CNI)</em>. Si hay un divorcio previo, también la sentencia.</li>
        <li><strong><a href="/traduccion-jurada-certificado-penales">Certificado de antecedentes penales</a></strong>, según el Registro y la nacionalidad.</li>
        <li><strong>Empadronamiento</strong> de los dos, que acredita el domicilio (este es español y no se traduce).</li>
      </ul>
      <p>Todos los documentos extranjeros deben presentarse con su <strong>traducción jurada</strong> al español, firmada y sellada por traductor nombrado por el MAEC.</p>

      <h2>¿Se apostillan antes o después de traducir?</h2>
      <p>Siempre <strong>antes</strong>. El certificado se apostilla en el país que lo emitió y después se traduce todo junto, apostilla incluida. En el caso británico: el certificado de nacimiento del GRO y el CNI se apostillan en la <em>Legalisation Office</em>; una vez en tu correo, me los envías escaneados y te los devuelvo traducidos en el día (hasta 10 páginas).</p>

      <h2>¿Por qué importa tanto la vigencia de 3-6 meses?</h2>
      <p>Es el error que más expedientes retrasa. La mayoría de Registros Civiles exigen que los certificados extranjeros tengan <strong>menos de 3 a 6 meses</strong> en el momento de presentarlos (cada Registro fija su criterio — confírmalo en el tuyo). Como el expediente matrimonial tarda en tramitarse, el orden correcto es: pregunta primero en tu Registro qué vigencia aplican, pide los certificados cuando ya tengas fecha para iniciar el expediente, apostíllalos y tradúcelos entonces. La traducción no caduca, pero de nada sirve traducir en enero un certificado que presentarás en junio.</p>

      <h2>¿Y si nos casamos por lo civil fuera y luego lo inscribimos en España?</h2>
      <p>Es la otra ruta habitual: matrimonio celebrado en el extranjero e inscripción posterior en el Registro Civil español (o en el consulado). En ese caso el documento clave es el <a href="/traduccion-jurada-certificado-matrimonio">certificado de matrimonio</a> extranjero, apostillado y con traducción jurada, junto con los certificados de nacimiento. El proceso de traducción es idéntico.</p>

      <h2>Cómo lo organizo yo con las parejas</h2>
      <ol>
        <li>Me envías por WhatsApp la lista que te ha dado tu Registro Civil.</li>
        <li>Te confirmo qué documentos necesitan traducción y cuáles apostilla, con precio cerrado del conjunto.</li>
        <li>Cuando llegan los certificados, los traduzco todos a la vez: mismo formato, mismos nombres, cero incoherencias.</li>
      </ol>
      <p>
        <a href="https://wa.me/34685891214?text=Hola%20Jurada%20Express,%20nos%20casamos%20en%20Espa%C3%B1a%20y%20necesitamos%20traducci%C3%B3n%20jurada%20de%20los%20documentos">Cuéntame tu caso por WhatsApp</a>
        y te digo exactamente qué traducir — sin compromiso y con respuesta en menos de 2 horas.
      </p>
    `,
  },

  {
    slug: "traduccion-jurada-visado-reino-unido",
    translationOf: "sworn-translation-uk-home-office-visas-settled-status-citizenship",
    title: "Traducción jurada para el Home Office: visados, settled status y nacionalidad británica",
    excerpt:
      "El Home Office acepta traducciones certificadas y no exige juradas: qué requisitos pide el UKVI, cuándo compensa la traducción jurada española y qué documentos se traducen para un visado, el EU Settlement Scheme (settled status) y la nacionalidad británica. Precios reales.",
    date: "2026-08-24",
    updated: "2026-09-27",
    author: "Elena Peñaranda Ortega",
    tags: ["reino-unido", "extranjeria", "validez"],
    readingTime: "9 min",
    image: "/blog/post-visado-uk.jpg",
    alt: "Manos revisando un formulario oficial sobre una carpeta de documentos para un visado",
    html: `
      <p>El Home Office <strong>no exige traducción jurada</strong>: pide una <em>certified translation</em>, es decir, una traducción completa acompañada de la confirmación del traductor de que es fiel al original, con su nombre, firma, fecha y datos de contacto. La traducción jurada española cumple esos requisitos y va más allá, porque la firma una traductora nombrada por el Ministerio de Asuntos Exteriores cuyo número puede comprobar cualquier funcionario. Merece la pena elegir la jurada cuando el mismo documento va a servir también en España, cuando lo pide un abogado o un tribunal, o cuando quieres que nadie discuta quién firmó la traducción. Los certificados habituales (nacimiento, matrimonio, antecedentes penales) cuestan <strong>desde ${MIN_PRICE} €</strong> y se entregan en el día (hasta 10 páginas). Soy Elena Peñaranda, traductora jurada de inglés nº 7310, y en esta guía te cuento qué documentos españoles se traducen para un visado, para el <em>settled status</em> y para la nacionalidad británica, y cuándo basta con la certificada.</p>

      <h2>Qué exige exactamente el Home Office en una traducción</h2>
      <p>Las guías de <strong>UK Visas and Immigration (UKVI)</strong> repiten la misma regla para todos los trámites: cualquier documento que no esté en inglés o galés debe ir acompañado de una traducción completa que incluya:</p>
      <ul>
        <li>la <strong>confirmación del traductor</strong> de que es una traducción fiel del documento original;</li>
        <li>la <strong>fecha</strong> de la traducción;</li>
        <li>el <strong>nombre completo y la firma</strong> del traductor;</li>
        <li>sus <strong>datos de contacto</strong> (o los de la empresa de traducción).</li>
      </ul>
      <p>No hay una lista de traductores «autorizados» por el Reino Unido ni un sello obligatorio: la responsabilidad recae en quien firma. Por eso vale una traducción certificada de cualquier traductor profesional. Tampoco piden, como regla general, <a href="/blog/que-es-la-apostilla-de-la-haya">apostilla</a>: el Home Office trabaja sobre copias digitales subidas a la plataforma de solicitud.</p>

      <h2>Jurada o certificada: cuándo conviene cada una</h2>
      <p>Hago las dos. La <strong>certificada</strong> lleva mi declaración de fidelidad, fecha, firma y datos de contacto, exactamente lo que pide el UKVI. La <strong>jurada</strong> lleva, además, la certificación con la fórmula oficial, mi sello con el nº 7310 del MAEC y la copia sellada del original, y tiene validez legal en España. Esta es la regla que aplico con mis clientes:</p>
      <div class="table-wrap"><table>
        <thead><tr><th>Situación</th><th>Qué conviene</th><th>Por qué</th></tr></thead>
        <tbody>
          <tr><td>El documento solo se usará en el Reino Unido (extractos, nóminas, cartas)</td><td>Certificada</td><td>Cumple el requisito del UKVI y no necesitas más</td></tr>
          <tr><td>Certificados del Registro Civil (nacimiento, matrimonio, pareja de hecho)</td><td>Jurada</td><td>Los reutilizarás: consulado, Registro Civil, herencias, otro visado. Una sola traducción vale para todo</td></tr>
          <tr><td>Antecedentes penales, sentencias, resoluciones judiciales</td><td>Jurada</td><td>Un documento judicial traducido por un traductor con nombramiento oficial no se cuestiona</td></tr>
          <tr><td>Un solicitor, tribunal o empleador pide «sworn» u «official translation»</td><td>Jurada</td><td>Es lo que están describiendo; te ahorras una segunda traducción</td></tr>
          <tr><td>Documentos que también irán a una autoridad española</td><td>Jurada</td><td>En España solo vale la jurada</td></tr>
          <tr><td>Recurso o reconsideración de una denegación</td><td>Jurada</td><td>Tu abogado querrá una traducción que nadie pueda discutir</td></tr>
        </tbody>
      </table></div>
      <p>Te digo cuál te conviene cuando veo los documentos, antes de cobrar, y en el presupuesto va por escrito qué recibes. La diferencia entre las dos figuras la explico a fondo en <a href="/blog/traduccion-jurada-vs-traduccion-certificada">traducción jurada frente a traducción certificada</a>.</p>

      <h2>Visados: qué documentos españoles se traducen</h2>
      <p>Los ciudadanos españoles no necesitan visado para visitar el Reino Unido (desde abril de 2025 basta la <strong>ETA</strong>, la autorización electrónica de viaje), pero sí para vivir, trabajar o estudiar. Estos son los expedientes que más traduzco:</p>
      <ul>
        <li><strong>Skilled Worker (trabajo cualificado).</strong> Para puestos en sanidad, educación y servicios sociales el Home Office exige un <a href="/traduccion-jurada-certificado-penales">certificado de antecedentes penales</a> de cada país en el que hayas vivido más de doce meses en los últimos diez años: el español lo expide el Ministerio de Justicia y se traduce (<strong>${eur("antecedentes-penales")}</strong>). Si tu <em>Certificate of Sponsorship</em> menciona una titulación, también el <a href="/traduccion-jurada-titulo-universitario">título universitario</a> (<strong>${eur("titulo-universitario")}</strong>).</li>
        <li><strong>Visado de familiar o pareja (Family visa).</strong> El <a href="/traduccion-jurada-certificado-matrimonio">certificado de matrimonio</a> (<strong>${eur("certificado-matrimonio")}</strong>) o la inscripción como pareja de hecho, las <a href="/traduccion-jurada-partida-nacimiento">partidas de nacimiento</a> de los hijos (<strong>${eur("partida-nacimiento")}</strong> cada una) y, para el requisito económico, <a href="/traduccion-jurada-certificado-empresa">nóminas, certificado de empresa</a> (<strong>${eur("certificado-empresa")}</strong>), contrato de trabajo y extractos bancarios si están en español. El umbral de ingresos vigente lo fija el Home Office; tu abogado o la guía oficial te dirán cuál te aplica.</li>
        <li><strong>Visado de estudiante.</strong> Título, expediente y justificantes económicos: lo detallo en <a href="/blog/estudiar-en-reino-unido-traduccion-expediente">estudiar en Reino Unido: qué documentos necesitas traducir</a>.</li>
        <li><strong>Hijos y dependientes.</strong> Partida de nacimiento, sentencia de custodia o consentimiento del otro progenitor si viaja uno solo.</li>
      </ul>

      <h2>EU Settlement Scheme: settled y pre-settled status</h2>
      <p>El plazo general del <em>EU Settlement Scheme</em> terminó el 30 de junio de 2021, pero el sistema sigue vivo: se admiten solicitudes tardías con motivos razonables, los <strong>familiares que se reúnen</strong> con un ciudadano de la UE que ya tiene estatus pueden solicitarlo, y quien tiene <em>pre-settled status</em> pasa a <em>settled</em> al cumplir cinco años de residencia continuada. En los dos primeros casos el Home Office pide pruebas de la relación familiar, y ahí aparecen los documentos españoles: el certificado de matrimonio o de pareja de hecho, las partidas de nacimiento y, si la relación tenía que existir antes del 31 de diciembre de 2020, documentos que lo acrediten con fecha. Para el paso de pre-settled a settled las pruebas de residencia suelen ser británicas (nóminas, HMRC, contratos de alquiler) y no se traducen; el Home Office, además, amplía el estatus automáticamente y convierte a <em>settled</em> a quien puede comprobar con sus propios datos.</p>
      <p>Aquí la jurada compensa casi siempre: el certificado de matrimonio que subes al EUSS es el mismo que necesitarás para inscribir el matrimonio en el consulado de España o para una herencia, y una sola traducción jurada te sirve para todos.</p>

      <h2>Nacionalidad británica por naturalización</h2>
      <p>La naturalización (formulario AN) exige, en resumen, cinco años de residencia (tres si estás casado o casada con ciudadano británico), <em>settled status</em> o <em>indefinite leave to remain</em>, el examen <em>Life in the UK</em>, un nivel B1 de inglés y buena conducta. Los documentos que un solicitante español suele tener que traducir son:</p>
      <ul>
        <li>el <strong>certificado de matrimonio</strong> español, si solicitas por la vía del cónyuge;</li>
        <li>las <strong>partidas de nacimiento</strong> de los hijos, si los registras a la vez como ciudadanos británicos (formulario MN1);</li>
        <li>una <strong>partida de nacimiento propia</strong> o un certificado de cambio de nombre, si tus documentos muestran nombres o apellidos distintos (muy habitual con los dos apellidos españoles);</li>
        <li>en algunos casos, la <strong>titulación universitaria</strong> cursada en inglés, para acreditar el idioma sin examen.</li>
      </ul>
      <p>El Home Office no pide certificado de antecedentes penales español para la naturalización: consulta directamente su base de datos y te pide declarar cualquier condena. Un aviso que no es de traducción pero conviene saber: quien adquiere otra nacionalidad viviendo fuera de España puede tener que declarar en el consulado su voluntad de conservar la española; pregúntalo en tu consulado.</p>

      <h2>Tabla resumen: documento, trámite, tipo de traducción y precio</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>Documento español</th><th>Trámite habitual</th><th>Certificada o jurada</th><th>Precio de la jurada</th></tr></thead>
        <tbody>
          <tr><td>Certificado de matrimonio / pareja de hecho</td><td>Family visa, EUSS (familiares), naturalización por cónyuge</td><td>Jurada</td><td>${eur("certificado-matrimonio")}</td></tr>
          <tr><td>Partida de nacimiento</td><td>Hijos dependientes, EUSS, registro de hijos (MN1)</td><td>Jurada</td><td>${eur("partida-nacimiento")}</td></tr>
          <tr><td>Certificado de antecedentes penales</td><td>Skilled Worker en sanidad, educación y servicios sociales</td><td>Jurada</td><td>${eur("antecedentes-penales")}</td></tr>
          <tr><td>Título universitario</td><td>Skilled Worker, estudiante, nivel de inglés</td><td>Jurada o certificada</td><td>${eur("titulo-universitario")}</td></tr>
          <tr><td>Nóminas y certificado de empresa</td><td>Requisito económico del Family visa</td><td>Certificada suele bastar</td><td>${eur("certificado-empresa")}</td></tr>
          <tr><td>Extractos bancarios, contratos, cartas</td><td>Requisito económico, alojamiento</td><td>Certificada suele bastar</td><td>Presupuesto cerrado en menos de 2 h</td></tr>
          <tr><td>Sentencias (divorcio, custodia)</td><td>Family visa, hijos</td><td>Jurada</td><td>Presupuesto cerrado en menos de 2 h</td></tr>
        </tbody>
      </table></div>
      <p>Precios del <a href="/precios">catálogo</a> por documento estándar de una página; los documentos largos se presupuestan al verlos. Si me envías el expediente completo, te doy un único precio y una única fecha.</p>

      <h2>Cómo lo hago para que el UKVI no ponga pegas</h2>
      <ol>
        <li><strong>Me envías los documentos escaneados</strong> por WhatsApp, email o el <a href="/documentos">catálogo</a>, completos y legibles.</li>
        <li><strong>Te digo en menos de 2 horas laborables</strong> qué necesita traducción, si te conviene jurada o certificada en cada caso, un precio cerrado y una fecha de entrega por escrito.</li>
        <li><strong>Traduzco y certifico</strong> cada documento con la fórmula que exige el UKVI, mis datos de contacto en la propia certificación y, en la jurada, mi sello y firma electrónica.</li>
        <li><strong>Recibes el PDF firmado</strong> en el día para los certificados breves. Súbelo tal cual a la plataforma del Home Office: reescanearlo rompe la firma electrónica. Si un trámite pide papel, envío el original por mensajería al Reino Unido; el coste del transportista va en el presupuesto.</li>
      </ol>
      <p>Si lo que tienes es un documento británico que necesitas presentar en España (una partida de nacimiento del GRO, un certificado de la policía, un <em>grant of probate</em>), el camino es el inverso y ahí sí es obligatoria la jurada: lo cuento en la guía para <a href="/traduccion-jurada-britanicos-espana">británicos en España</a>. Y si dudas de la validez de una traducción que ya te han entregado, revisa <a href="/blog/como-saber-si-una-traduccion-jurada-es-valida">cómo saber si una traducción jurada es válida</a>.</p>
      <p>
        <a href="https://wa.me/34685891214?text=Hola%20Elena%2C%20preparo%20un%20tr%C3%A1mite%20con%20el%20Home%20Office%20y%20necesito%20traducir%20documentos">Escríbeme por WhatsApp con tu lista de documentos</a>
        y te confirmo qué se traduce, jurada o certificada, precio cerrado y plazo en menos de 2 horas. También puedes ver la página de
        <a href="/traductor-jurado-ingles">traductora jurada de inglés</a>.
      </p>
    `,
    faq: [
      {
        q: "¿El Home Office exige traducción jurada?",
        a: "No. Pide una certified translation: traducción completa con la confirmación del traductor de que es fiel al original, la fecha, su nombre completo, su firma y sus datos de contacto. La traducción jurada española cumple esos requisitos y añade el nombramiento oficial del MAEC.",
      },
      {
        q: "Entonces, ¿cuándo me conviene la jurada en lugar de la certificada?",
        a: "Cuando el documento también va a servir en España (certificados de nacimiento, matrimonio o pareja de hecho), cuando es un documento judicial o de antecedentes penales, cuando un solicitor o tribunal pide una sworn u official translation, o en un recurso. Para extractos bancarios, nóminas o cartas que solo se usan en el Reino Unido, la certificada suele bastar.",
      },
      {
        q: "¿Necesito apostillar los documentos españoles para el Home Office?",
        a: "Como regla general, no. El Home Office trabaja con copias digitales y le basta la traducción. Solo hace falta apostilla si otra autoridad del proceso, por ejemplo un tribunal o un registro británico, la exige expresamente.",
      },
      {
        q: "¿Puedo subir la traducción en PDF con firma electrónica a la plataforma del UKVI?",
        a: "Sí. Sube el PDF exactamente como te lo envío, sin imprimirlo ni reescanearlo, para que la firma electrónica siga siendo verificable. Si un trámite concreto pide papel, te envío el original por mensajería al Reino Unido.",
      },
      {
        q: "¿Cuánto cuesta traducir los documentos para un visado de pareja?",
        a: `El certificado de matrimonio cuesta ${eur("certificado-matrimonio")}, cada partida de nacimiento ${eur("partida-nacimiento")} y el certificado de empresa o nómina ${eur("certificado-empresa")}, con entrega en el día (hasta 10 páginas). Los extractos y contratos se presupuestan al verlos; con el expediente completo te doy un único precio cerrado en menos de 2 horas.`,
      },
    ],
  },

  {
    slug: "estudiar-en-reino-unido-traduccion-expediente",
    translationOf: "studying-in-the-uk-from-spain-documents-sworn-translation",
    title: "Estudiar en Reino Unido: qué documentos necesitas traducir (Erasmus, grado y máster)",
    excerpt:
      "Qué documentos españoles piden las universidades británicas y el Home Office según tu caso: intercambio o Erasmus, grado por UCAS, máster y visado de estudiante. Cuáles se traducen de forma jurada, cuáles no hace falta traducir y precios reales por documento.",
    date: "2026-09-03",
    updated: "2026-09-27",
    author: "Elena Peñaranda Ortega",
    tags: ["academico", "reino-unido", "precios"],
    readingTime: "8 min",
    image: "/blog/post-ucas.jpg",
    alt: "Estudiante trabajando en la biblioteca — solicitudes a universidades del Reino Unido",
    html: `
      <p>Para estudiar en el Reino Unido necesitas traducir al inglés, con una <em>certified translation</em>, los documentos académicos y de identidad que estén en español: para un <strong>grado</strong>, el título de Bachiller y las notas de Bachillerato y EBAU; para un <strong>máster</strong>, el <a href="/traduccion-jurada-titulo-universitario">título universitario</a> y el expediente académico; para un <strong>intercambio o Erasmus</strong>, casi nada, porque tu universidad española emite los certificados en inglés; y para el <strong>visado de estudiante</strong>, además, los justificantes económicos si están en español. La traducción jurada española cumple los requisitos británicos de <em>certified translation</em> con holgura. El título universitario cuesta <strong>${eur("titulo-universitario")}</strong> y se entrega en el día; el expediente se presupuesta al verlo. Soy Elena Peñaranda, traductora jurada de inglés nº 7310 del MAEC, y cada verano traduzco expedientes de estudiantes que se van a Reino Unido; esto es lo que les explico antes de empezar.</p>

      <h2>Primero, ¿en qué caso estás?</h2>
      <p>Los cuatro caminos hacia una universidad británica piden documentos distintos, y traducir de más es tan habitual como traducir de menos. Localízate en la tabla y ve al apartado que te corresponde.</p>
      <div class="table-wrap"><table>
        <thead><tr><th>Tu caso</th><th>Quién te pide los documentos</th><th>Qué se suele traducir</th><th>Visado</th></tr></thead>
        <tbody>
          <tr><td>Intercambio, Erasmus o convenio bilateral (uno o dos cuatrimestres)</td><td>Tu universidad española y la de acogida</td><td>Normalmente nada: expediente y acuerdo de aprendizaje en inglés</td><td>No, si son menos de 6 meses (solo la ETA); visado de estudiante si son más</td></tr>
          <tr><td>Grado (undergraduate) por UCAS</td><td>Cada universidad, al hacerte la oferta</td><td>Título de Bachiller, notas de Bachillerato y EBAU</td><td>Sí: visado de estudiante</td></tr>
          <tr><td>Máster o doctorado (postgraduate)</td><td>La universidad, en la solicitud y en la matrícula</td><td>Título universitario y expediente académico</td><td>Sí: visado de estudiante</td></tr>
          <tr><td>Curso corto de idioma o verano</td><td>La escuela</td><td>Rara vez algo</td><td>No, hasta 6 meses (ETA)</td></tr>
        </tbody>
      </table></div>

      <h2>Erasmus e intercambios: lo que casi nunca hace falta traducir</h2>
      <p>Desde el Brexit el Reino Unido no forma parte de Erasmus+, así que los intercambios con universidades británicas se hacen mediante <strong>convenios bilaterales</strong> y programas propios de cada universidad; hay un acuerdo político para que el Reino Unido vuelva a asociarse al programa a partir de 2027, pero hasta que exista la convocatoria, quien manda es tu oficina de relaciones internacionales. En cualquiera de esas modalidades la documentación circula entre universidades: el <em>learning agreement</em> se firma en inglés y la certificación académica la emite tu universidad española, casi siempre con versión en inglés. Si tu facultad solo la expide en español, la de acogida te pedirá una traducción, y ahí sí entro yo; pero pregunta antes, porque muchas la sacan bilingüe sin coste.</p>
      <p>Si la estancia es de <strong>menos de seis meses</strong>, entras como visitante: desde abril de 2025 los ciudadanos españoles necesitan la <strong>ETA</strong> (autorización electrónica de viaje), que se pide por internet y no exige traducir nada. Si supera los seis meses, necesitas el visado de estudiante del apartado siguiente aunque sea un intercambio.</p>

      <h2>Grado: título de Bachiller, notas y EBAU</h2>
      <p>La solicitud se presenta por <strong>UCAS</strong> con las notas declaradas por ti; los documentos los pide después <strong>cada universidad</strong>, normalmente al hacerte la oferta condicional y otra vez, ya definitivos, al matricularte. Para un estudiante español lo habitual es:</p>
      <ul>
        <li><strong>Título de Bachiller</strong> (o el resguardo de haberlo solicitado, si aún no lo tienes).</li>
        <li><strong>Certificación académica de Bachillerato</strong>, con las notas de los dos cursos.</li>
        <li><strong>Tarjeta o certificado de calificaciones de la EBAU</strong> (PAU o EvAU según la comunidad), que es lo que convierte la oferta condicional en firme.</li>
        <li>Certificado de inglés (IELTS, Cambridge o el que acepte esa universidad). Ya está en inglés: no se traduce.</li>
      </ul>
      <p>Cada universidad publica sus requisitos de traducción, y todos se parecen: traducción completa, hecha por un traductor profesional, con su nombre, firma, fecha y datos de contacto. La traducción jurada española lleva todo eso y, además, mi nombramiento verificable en el <a href="https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Traductores-as---Interpretes-Jurados-as.aspx" target="_blank" rel="noopener noreferrer">listado del MAEC</a>. Un consejo que ahorra dinero: envía primero solo lo que pida la oferta condicional y deja las notas definitivas de la EBAU para julio; se traducen en el día y no te frenan la matrícula.</p>

      <h2>Máster y doctorado: título y expediente</h2>
      <p>Aquí los dos protagonistas son el <strong><a href="/traduccion-jurada-titulo-universitario">título universitario</a></strong> y el <strong>expediente académico</strong> (la certificación académica personal con todas las asignaturas, créditos y notas). Tres detalles que cambian el presupuesto:</p>
      <ul>
        <li>Si aún no tienes el título físico, sirve el <strong>certificado supletorio</strong> o el resguardo de pago de las tasas: lo traduzco igual y la universidad lo acepta como provisional.</li>
        <li>Muchas universidades españolas emiten la certificación académica <strong>en inglés</strong> o el <strong>Suplemento Europeo al Título</strong> bilingüe. Si el tuyo está en inglés, no necesitas traducirlo; me lo mandas y te lo confirmo antes de cobrarte nada.</li>
        <li>Las <strong>cartas de recomendación</strong> las escriben tus profesores directamente en inglés en la plataforma de la universidad; si alguna está en español, se traduce como documento suelto.</li>
      </ul>
      <p>El título universitario de una página tiene precio fijo, <strong>${eur("titulo-universitario")}</strong>. El expediente depende del número de páginas y asignaturas, así que te doy <strong>precio cerrado en menos de 2 horas</strong> al verlo, sin tarifas por palabra. Explico el detalle en <a href="/blog/cuanto-cuesta-traducir-titulo-universitario">cuánto cuesta traducir un título universitario</a>.</p>

      <h2>El visado de estudiante y los documentos económicos</h2>
      <p>Si el curso dura más de seis meses necesitas el <strong>Student visa</strong>, que se solicita con el <strong>CAS</strong> (el número de confirmación que te envía la universidad una vez aceptada la plaza). El Home Office pide, además del pasaporte y el CAS, pruebas de que puedes pagar la matrícula y mantenerte durante el curso, y aquí es donde aparecen los documentos en español:</p>
      <ul>
        <li><strong>Extractos bancarios</strong> de los últimos meses (el dinero debe llevar un mínimo de 28 días en la cuenta). Si el banco no te los da en inglés, se traducen.</li>
        <li>Si el dinero está en la cuenta de tus padres: <strong>carta de consentimiento</strong> firmada por ellos, tu <a href="/traduccion-jurada-partida-nacimiento">partida de nacimiento</a> para acreditar el parentesco (<strong>${eur("partida-nacimiento")}</strong>) y, a veces, sus <a href="/traduccion-jurada-certificado-empresa">nóminas o certificado de empresa</a> (<strong>${eur("certificado-empresa")}</strong>).</li>
        <li>Si eres menor de 18 años, la carta de consentimiento de tus padres y la partida de nacimiento son obligatorias.</li>
        <li>El <strong>pasaporte español</strong> no se traduce: es plurilingüe.</li>
      </ul>
      <p>El Home Office exige que toda traducción incluya la confirmación del traductor de que es fiel al original, la fecha, su nombre completo y firma y sus datos de contacto. Mi certificación jurada lo lleva todo, y añado mis datos de contacto en la propia certificación para que el revisor no tenga que buscarlos. Si tu expediente incluye además documentos para un familiar o una pareja, te interesa la guía sobre <a href="/blog/traduccion-jurada-visado-reino-unido">traducción jurada para el Home Office</a>.</p>

      <h2>Tabla de documentos y precios</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>Documento</th><th>Para qué</th><th>¿Se traduce?</th><th>Precio de la traducción jurada</th></tr></thead>
        <tbody>
          <tr><td>Título de Bachiller</td><td>Grado (oferta y matrícula)</td><td>Sí</td><td>Presupuesto cerrado en menos de 2 h</td></tr>
          <tr><td>Notas de Bachillerato y EBAU</td><td>Grado</td><td>Sí</td><td>Presupuesto cerrado en menos de 2 h</td></tr>
          <tr><td>Título universitario (1 página)</td><td>Máster y doctorado</td><td>Sí</td><td>${eur("titulo-universitario")}</td></tr>
          <tr><td>Expediente académico</td><td>Máster, doctorado e intercambios</td><td>Solo si tu universidad no lo emite en inglés</td><td>${eur("expediente-academico")}</td></tr>
          <tr><td>Partida de nacimiento</td><td>Visado (fondos de los padres, menores)</td><td>Sí</td><td>${eur("partida-nacimiento")}</td></tr>
          <tr><td>Nóminas o certificado de empresa de los padres</td><td>Visado (fondos)</td><td>Sí, si están en español</td><td>${eur("certificado-empresa")}</td></tr>
          <tr><td>Extractos bancarios</td><td>Visado (fondos)</td><td>Sí, si el banco no los da en inglés</td><td>Presupuesto cerrado en menos de 2 h</td></tr>
          <tr><td>Pasaporte</td><td>Todo</td><td>No</td><td>—</td></tr>
        </tbody>
      </table></div>
      <p>Todos los precios son los del <a href="/precios">catálogo</a>: por documento, con certificación, firma y sello, PDF firmado electrónicamente y copia sellada del original. Si envías el lote completo (título + expediente + partida), te doy un único precio cerrado y una única fecha.</p>

      <h2>¿Necesito apostillar algo?</h2>
      <p>Para las universidades británicas y para el visado de estudiante, <strong>no</strong>: les basta la traducción. La <a href="/blog/que-es-la-apostilla-de-la-haya">apostilla de La Haya</a> aparece en el camino de vuelta, cuando terminas y quieres <a href="/blog/homologacion-titulo-universitario-extranjero-espana">homologar o pedir la equivalencia del título británico en España</a>. Si una universidad concreta te pide algo distinto, su lista de requisitos manda: envíamela y la revisamos juntas.</p>

      <h2>Cómo lo hacemos y en qué plazos</h2>
      <ol>
        <li><strong>Me envías los documentos escaneados</strong> por WhatsApp, email o el <a href="/documentos">catálogo</a>: PDF o foto nítida, con sellos y firmas legibles (en <a href="/blog/como-escanear-bien-documentos-con-el-movil">cómo escanear bien con el móvil</a> tienes los trucos).</li>
        <li><strong>Te confirmo en menos de 2 horas laborables</strong> qué necesita traducción de verdad, un precio cerrado y una fecha de entrega por escrito.</li>
        <li><strong>Traduzco, certifico, firmo y sello</strong> cada documento, con las asignaturas, notas y nombres escritos igual en todos.</li>
        <li><strong>Recibes el PDF firmado electrónicamente</strong> en el día para los documentos breves; el expediente, en la fecha acordada. Súbelo tal cual a la plataforma de la universidad o del visado: si lo reescaneas, la firma electrónica deja de verificarse. Si te piden papel, lo envío por mensajería.</li>
      </ol>
      <p>Calendario realista: entre enero y abril se presentan las solicitudes y suele bastar el expediente provisional; en junio y julio llegan las notas definitivas; en agosto y septiembre, la matrícula y el visado. La traducción nunca es el cuello de botella, pero en agosto se acumulan los expedientes: si puedes, tradúcelo en julio.</p>
      <p>
        <a href="https://wa.me/34685891214?text=Hola%20Elena%2C%20me%20voy%20a%20estudiar%20a%20Reino%20Unido%20y%20necesito%20traducir%20mi%20expediente">Envíame tu expediente por WhatsApp</a>
        y te digo qué hace falta traducir y cuánto cuesta en menos de 2 horas. También puedes ver la
        <a href="/traduccion-jurada-titulo-universitario">ficha del título universitario</a> o la página de
        <a href="/traductor-jurado-ingles">traductora jurada de inglés</a>.
      </p>
    `,
    faq: [
      {
        q: "¿Las universidades británicas exigen traducción jurada o les vale una traducción certificada?",
        a: "Piden una certified translation: traducción completa hecha por un traductor profesional, con su nombre, firma, fecha y datos de contacto. La traducción jurada española cumple esos requisitos y añade un nombramiento oficial que cualquiera puede comprobar en el listado del MAEC.",
      },
      {
        q: "¿Tengo que traducir el expediente si mi universidad lo emite en inglés?",
        a: "No. Si la certificación académica o el Suplemento Europeo al Título están en inglés emitidos por tu universidad, se aceptan tal cual. Mándamelos antes de encargar nada y te lo confirmo sin coste.",
      },
      {
        q: "¿Cuánto cuesta traducir el título y el expediente para un máster en Reino Unido?",
        a: `El título universitario de una página cuesta ${eur("titulo-universitario")} y se entrega en el día. El expediente académico se presupuesta al verlo, con precio cerrado en menos de 2 horas, porque depende del número de páginas y asignaturas.`,
      },
      {
        q: "¿Necesito visado para un Erasmus o un intercambio en Reino Unido?",
        a: "Si la estancia dura menos de seis meses, no: entras como visitante con la ETA, la autorización electrónica que los españoles necesitan desde abril de 2025. Si dura más, necesitas el visado de estudiante con el CAS de la universidad británica.",
      },
      {
        q: "¿Hay que apostillar el título o las notas para estudiar en Reino Unido?",
        a: "No. Ni las universidades ni el Home Office piden apostilla para estos documentos; basta la traducción. La apostilla se necesita en el sentido contrario, cuando vuelves con un título británico y quieres homologarlo en España.",
      },
    ],
  },

  {
    slug: "cuanto-tarda-una-traduccion-jurada",
    title: "¿Cuánto tarda una traducción jurada? Plazos reales por tipo de documento",
    excerpt:
      "Plazos reales, no promesas: cuánto tarda cada tipo de documento, qué cosas retrasan una traducción jurada (escaneos, apostillas, sellos) y cómo funcionan las urgencias.",
    date: "2026-09-17",
    updated: "2026-09-17",
    author: "Elena Peñaranda Ortega",
    tags: ["plazos", "consejos"],
    readingTime: "5 min",
    image: "/blog/post-plazos.jpg",
    alt: "Reloj de pulsera junto a un documento — plazos de entrega de la traducción jurada",
    html: `
      <p>"¿Para cuándo la tendría?" es, con diferencia, la pregunta que más recibo. Y merece una respuesta honesta, no un "¡ya mismo!" comercial. Estos son mis plazos reales por tipo de documento, qué cosas los alargan y cómo funcionan las urgencias de verdad.</p>

      <h2>¿Cuánto tarda cada documento?</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>Documento</th><th>Plazo habitual</th></tr></thead>
        <tbody>
          <tr><td><a href="/traduccion-jurada-permiso-conducir">Permiso de conducir</a>, DNI, pasaporte</td><td>En el día</td></tr>
          <tr><td><a href="/traduccion-jurada-partida-nacimiento">Certificados</a> (nacimiento, matrimonio, penales)</td><td>En el día (hasta 10 págs.)</td></tr>
          <tr><td><a href="/traduccion-jurada-titulo-universitario">Título universitario</a></td><td>En el día (hasta 10 págs.)</td></tr>
          <tr><td>Expediente académico</td><td>2-4 días laborables, según páginas</td></tr>
          <tr><td><a href="/traduccion-jurada-contrato-escritura">Contratos y escrituras</a></td><td>Fecha exacta con el presupuesto</td></tr>
          <tr><td>Expedientes completos (herencias, visados)</td><td>Se planifica el lote entero</td></tr>
        </tbody>
      </table></div>
      <p>El plazo cuenta desde que confirmas el presupuesto, y el presupuesto lo tienes en <strong>menos de 2 horas</strong> en horario laboral. La entrega digital (PDF firmado) llega al momento de terminar; el papel, si lo quieres, al día siguiente por mensajería.</p>

      <h2>¿Qué cosas retrasan una traducción jurada?</h2>
      <ul>
        <li><strong>Escaneos ilegibles.</strong> La causa nº 1. Si no distingo un sello o una cifra, tengo que parar y preguntarte. Un buen escaneo (o una foto bien hecha, <a href="/blog/como-escanear-bien-documentos-con-el-movil">aquí te cuento cómo</a>) ahorra un día entero.</li>
        <li><strong>La apostilla que llega tarde.</strong> La traducción incluye la apostilla, así que no puedo cerrar el documento hasta que la tengas. Pide la apostilla primero y la traducción después.</li>
        <li><strong>Sellos, manuscritos y notas marginales.</strong> Todo lo que aparece en el documento se traduce o se describe — un certificado antiguo lleno de sellos manuscritos lleva más tiempo que uno recién impreso.</li>
        <li><strong>Documentos que llegan por goteo.</strong> Si el expediente son cinco documentos, enviarlos juntos me deja organizarlos como un solo encargo, con coherencia y mejor precio.</li>
      </ul>

      <h2>¿Y si lo necesito para ya?</h2>
      <p>Las urgencias existen y las atiendo cuando el calendario lo permite: un documento de hasta 10 páginas sale en el día sin recargo. Lo que no hago es prometer plazos imposibles: si tu documento son 40 páginas para mañana, te lo diré claramente y buscaremos la alternativa real — entrega por fases, priorizar el documento que abre el trámite, o confirmar con el organismo si acepta la presentación parcial.</p>

      <h2>La regla de oro</h2>
      <p>Traduce cuando tengas el documento definitivo (¡y apostillado, si toca!), pero pide presupuesto en cuanto sepas qué te van a pedir: así el hueco en calendario queda reservado y los plazos dejan de ser una incógnita.</p>
      <p>
        <a href="https://wa.me/34685891214?text=Hola%20Jurada%20Express,%20necesito%20una%20traducci%C3%B3n%20jurada%20y%20quiero%20saber%20el%20plazo%20real">Pregúntame el plazo de tu documento por WhatsApp</a> — respuesta en menos de 2 horas, con fecha concreta.
      </p>
    `,
  },

  {
    slug: "traduccion-jurada-digital-firma-electronica",
    title: "¿Es válida una traducción jurada en PDF con firma digital?",
    excerpt:
      "Sí: el MAEC avaló la firma electrónica del traductor jurado y la administración la acepta. Cómo se verifica un PDF firmado, cuándo pueden pedirte papel y qué no debes hacer con el archivo.",
    date: "2026-10-01",
    updated: "2026-10-01",
    author: "Elena Peñaranda Ortega",
    tags: ["validez", "consejos"],
    readingTime: "5 min",
    image: "/blog/post-firma-digital.jpg",
    alt: "Pluma sobre un documento — firma de una traducción jurada digital",
    html: `
      <p>Todavía me lo preguntan cada semana: <em>"¿seguro que el PDF vale? ¿No necesito el papel con el sello en tinta?"</em>. La respuesta corta: el PDF con firma electrónica <strong>vale</strong>, y hoy es la forma habitual de entregar y presentar traducciones juradas. La respuesta larga, con sus matices, es esta.</p>

      <h2>¿Qué dice la normativa?</h2>
      <p>La Oficina de Interpretación de Lenguas del Ministerio de Asuntos Exteriores — el organismo que regula a los traductores jurados — lo avaló expresamente en su <strong>aviso de 6 de abril de 2020</strong>: las traducciones juradas <strong>firmadas electrónicamente</strong> por el traductor tienen la misma validez que las firmadas en tinta, con base en el artículo 10 de la Ley 39/2015, de Procedimiento Administrativo Común, y siempre que se cumplan los requisitos de certificación, sello y firma. Desde entonces, la administración electrónica española (extranjería, universidades, registros) las acepta de forma generalizada.</p>

      <h2>¿Cómo se comprueba que mi PDF es auténtico?</h2>
      <p>Un PDF firmado electrónicamente lleva un certificado digital incrustado. Cualquier funcionario (o tú misma) puede verificarlo en segundos: al abrirlo en Adobe Reader aparece el panel de firmas con el titular y la fecha, y plataformas oficiales como VALIDe permiten validar el archivo. Además, mi número de acreditación (7310) figura en el <a href="/traduccion-jurada-validez-oficial">listado público del MAEC</a>, de modo que la cadena completa — traductora habilitada + firma verificable — se comprueba sin llamar a nadie.</p>

      <h2>¿Cuándo pueden pedirme papel?</h2>
      <p>Cada vez menos, pero ocurre: algunos registros civiles pequeños, ciertos trámites presenciales y organismos extranjeros concretos siguen pidiendo el original físico. No es un problema: la misma traducción se imprime, se firma y sella en tinta y viaja por mensajería. En <a href="/como-funciona">mi proceso</a> el papel no cuesta más por ser papel — solo se añade el envío — y si me dices desde el principio ante qué organismo va el documento, preparo las dos versiones de una vez.</p>

      <h2>Los tres errores que rompen un PDF firmado</h2>
      <ol>
        <li><strong>Imprimirlo y reescanearlo.</strong> El escaneo es una foto: la firma electrónica desaparece. Presenta el archivo original.</li>
        <li><strong>Editarlo o unirlo a otros PDF.</strong> Cualquier modificación invalida la firma. Si el organismo quiere un solo archivo, pregúntame y preparo la entrega como la necesiten.</li>
        <li><strong>Reenviar versiones antiguas.</strong> Guarda el PDF definitivo que te entrego y usa siempre ese: es el que lleva la firma válida.</li>
      </ol>

      <h2>En resumen</h2>
      <p>PDF firmado digitalmente: válido, verificable y más rápido — llega en el momento en que termino la traducción. Papel: disponible siempre que lo necesites, sin recargo por el trabajo. Y si un funcionario duda de la validez de la firma electrónica, el propio panel de firmas del PDF y el listado del MAEC responden por mí.</p>
      <p>
        <a href="https://wa.me/34685891214?text=Hola%20Jurada%20Express,%20necesito%20una%20traducci%C3%B3n%20jurada%20en%20PDF%20firmado%20digitalmente">Pide tu traducción jurada digital por WhatsApp</a>
        o consulta <a href="/como-funciona">cómo funciona el proceso completo</a>.
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
  // ---------------------------------------------------------------------
  // Encargo internacional (septiembre-noviembre de 2026): 3 posts ES.
  // Fuente: docs/BRIEF-INTERNACIONAL-2026-09.md (puntos 0.4, 0.5 y 0.6).
  // Sin cifras de ingresos, tasas ni plazos administrativos: cambian cada
  // año y se remiten al consulado o a un abogado de extranjería.
  // ---------------------------------------------------------------------
  {
    slug: "documentos-visado-nomada-digital-apostilla-traduccion-jurada",
    translationOf: "spain-digital-nomad-visa-documents-apostille-sworn-translation",
    title: "Documentos para el visado de nómada digital: cuáles necesitan apostilla y traducción jurada",
    excerpt:
      "La lista completa del expediente de nómada digital para España, documento a documento: cuáles llevan apostilla, cuáles traducción jurada y en qué orden se hace todo para que el consulado no lo devuelva.",
    date: "2026-09-22",
    updated: "2026-09-22",
    author: "Elena Peñaranda Ortega",
    tags: ["nomada-digital", "extranjeria", "apostilla"],
    readingTime: "6 min",
    image: "/blog/post-nomada-digital.jpg",
    alt: "Pasaporte y documentos de viaje sobre un portátil, preparados para un expediente de visado de nómada digital",
    html: `
      <p>El visado de nómada digital (la autorización de residencia para teletrabajo internacional que creó la Ley 28/2022) es el expediente con más documentos de los que traduzco. Vienen de dos o tres países distintos, los emiten administraciones, empresas, bancos y universidades, y casi todos tienen que llegar al consulado o a la UGE en español. Esta guía va documento a documento: cuál necesita apostilla, cuál necesita <a href="/traduccion-jurada-visado-nomada-digital">traducción jurada</a> y en qué orden se prepara todo.</p>

      <h2>¿Por qué se deniegan o se devuelven tantos expedientes?</h2>
      <p>Casi nunca por el fondo del caso. Los motivos que veo cada semana son tres: un documento sin apostilla, una traducción simple donde se exigía jurada y un lote incompleto que obliga a empezar de nuevo. Los tres se evitan antes de presentar nada, con una revisión de la lista y con un solo traductor que aplique los mismos criterios a todo el expediente (nombres, fechas y terminología escritos igual en cada documento).</p>
      <p>Una advertencia antes de seguir: los requisitos económicos, las tasas y los plazos de resolución los fija la administración y cambian cada año. No los encontrarás en este artículo a propósito. Confírmalos con el consulado, con la UGE o con un abogado de extranjería; de los documentos, las apostillas y la traducción me ocupo yo.</p>

      <h2>¿Qué documentos llevan apostilla y traducción jurada?</h2>
      <ul>
        <li><strong>Certificado de antecedentes penales</strong> del país o países donde has vivido los últimos años (FBI o estado en Estados Unidos, ACRO en Reino Unido, MEA y policía en India). <em>Apostilla: sí. Traducción jurada: sí.</em> Suele tener validez limitada, así que pide primero la cita y después el certificado. Más detalle en la <a href="/traduccion-jurada-certificado-penales">ficha del certificado de antecedentes penales</a>.</li>
        <li><strong>Contrato de trabajo o carta del empleador extranjero</strong> que confirme puesto, salario, antigüedad y autorización expresa para teletrabajar desde España. Si eres autónomo, contratos con clientes extranjeros. <em>Apostilla: no suele pedirse. Traducción jurada: sí.</em></li>
        <li><strong>Certificado del registro mercantil</strong> (certificate of incorporation, good standing o equivalente) que acredite que la empresa lleva al menos un año de actividad. <em>Apostilla: habitualmente sí. Traducción jurada: sí.</em></li>
        <li><strong>Título universitario o de posgrado</strong>, o cartas de empleadores anteriores que acrediten tres años de experiencia. <em>Apostilla: sí en el título; en las cartas, según consulado. Traducción jurada: sí.</em> Ver la <a href="/traduccion-jurada-titulo-universitario">ficha del título universitario</a>.</li>
        <li><strong>Justificantes de ingresos</strong>: nóminas, extractos bancarios, facturas, declaraciones fiscales. <em>Apostilla: no. Traducción jurada: sí</em> (a veces basta con los últimos meses).</li>
        <li><strong>Certificado de cobertura de Seguridad Social</strong> del país de origen (A1 en Reino Unido, certificate of coverage de la SSA en Estados Unidos) o compromiso de alta en España. <em>Apostilla: no. Traducción jurada: sí.</em></li>
        <li><strong>Seguro médico</strong> con cobertura en España. <em>Traducción jurada: sí, si la póliza no está en español.</em></li>
        <li><strong>Para familiares</strong>: certificado de matrimonio o de pareja y partidas de nacimiento de los hijos. <em>Apostilla: sí. Traducción jurada: sí.</em></li>
        <li><strong>Pasaporte</strong>: se aporta copia y no suele necesitar traducción.</li>
      </ul>

      <h2>¿En qué orden se hace: apostilla o traducción?</h2>
      <p>Siempre primero la apostilla. Es una hoja o una pegatina que se añade al original en el país que lo emitió, y forma parte del documento: también se traduce. Si me envías un certificado sin apostillar y el consulado la exige, te lo digo antes de empezar para que no pagues dos veces. Si tienes dudas sobre qué es exactamente, te lo explico en <a href="/blog/que-es-la-apostilla-de-la-haya">qué es la apostilla de La Haya y cuándo la necesitas</a>.</p>

      <h2>¿Cómo se envía un expediente completo?</h2>
      <ol>
        <li>Reúne todo en <strong>una sola carpeta</strong> (Drive, Dropbox, WeTransfer o adjuntos) con tu apellido.</li>
        <li>Escanea cada documento completo, apostilla y reverso incluidos. Una foto nítida del móvil vale.</li>
        <li>Nombra los archivos con orden: <em>01-antecedentes-penales.pdf</em>, <em>02-contrato.pdf</em>… Te devuelvo las traducciones con la misma numeración y un índice.</li>
        <li>Dime en qué consulado presentas la solicitud (o si es ante la UGE) y la fecha de tu cita.</li>
      </ol>
      <p>Con eso te contesto en menos de 2 horas laborables con la revisión de la lista, el precio cerrado del lote y un único plazo de entrega por escrito. Los documentos de hasta 10 páginas salen en el día; un expediente completo suele estar listo en pocos días. Si vienes de <a href="/traduccion-jurada-estados-unidos">Estados Unidos</a> o de <a href="/traduccion-jurada-india">India</a>, tienes una guía propia con las particularidades de tu país.</p>

      <h2>¿Vale la traducción en PDF para el consulado?</h2>
      <p>Para la presentación telemática, sí: cada traducción lleva mi firma electrónica, verificable con un clic, y mi sello de traductora jurada nº 7310, comprobable en el listado oficial del Ministerio de Asuntos Exteriores. Si tu consulado exige papel, te envío los originales sellados por mensajería a España o a tu país.</p>
      <p>
        ¿Estás preparando el expediente? Mándame tu lista por
        <a href="https://wa.me/34685891214?text=Hola%20Elena%2C%20estoy%20preparando%20el%20expediente%20del%20visado%20de%20n%C3%B3mada%20digital%20y%20quiero%20saber%20qu%C3%A9%20documentos%20necesitan%20traducci%C3%B3n%20jurada">WhatsApp</a>
        y te digo qué falta y qué lleva apostilla, sin compromiso.
      </p>
    `,
  },

  {
    slug: "traduccion-jurada-o-certificada-uscis-espana",
    translationOf: "sworn-vs-certified-translation-uscis-spain",
    title: "Traducción jurada o traducción certificada: qué pide USCIS y qué pide España",
    excerpt:
      "No son lo mismo: USCIS exige una certified translation al inglés con certificación del traductor (8 CFR § 103.2(b)(3)) y España exige una traducción jurada con firma y sello del MAEC. Cuál necesitas, qué lleva cada una y cuándo hacen falta las dos.",
    date: "2026-10-13",
    updated: "2026-10-13",
    author: "Elena Peñaranda Ortega",
    tags: ["uscis", "validez", "estados-unidos"],
    readingTime: "6 min",
    image: "/blog/post-uscis-jurada-certificada.jpg",
    alt: "Persona con traje firmando un documento con pluma, como en la certificación de una traducción",
    html: `
      <p>Cada semana me llegan dos preguntas parecidas desde los dos lados del Atlántico. Desde Estados Unidos: <em>"¿Tu traducción jurada vale para USCIS?"</em>. Desde España: <em>"Me han hecho una certified translation en Nueva York, ¿la acepta extranjería?"</em>. La respuesta a las dos es que son documentos distintos, para organismos distintos, y que conviene saber cuál necesitas antes de encargar nada.</p>

      <h2>¿Qué es una traducción jurada en España?</h2>
      <p>Es la traducción firmada y sellada por un traductor-intérprete jurado nombrado por el Ministerio de Asuntos Exteriores, Unión Europea y Cooperación. El nombramiento tiene un número (el mío es el 7310) que cualquier funcionario puede comprobar en el listado público del Ministerio. Lleva una certificación en español, firma y sello en cada página, y es lo que exigen extranjería, el registro civil, las universidades, las notarías y los consulados de España para cualquier documento que no esté en español. Su validez la explico con detalle en <a href="/traduccion-jurada-validez-oficial">validez oficial de la traducción jurada</a>.</p>

      <h2>¿Qué es una certified translation para USCIS?</h2>
      <p>La norma estadounidense es corta: el 8 CFR § 103.2(b)(3) exige que todo documento en idioma extranjero que se presente ante USCIS vaya acompañado de una <strong>traducción completa al inglés</strong> y de una <strong>certificación del traductor</strong> en la que declara que la traducción es completa y exacta y que es competente para traducir de ese idioma al inglés. No se exige notario ni una acreditación concreta: basta la certificación firmada, fechada y con datos de contacto, una por documento. Lo cuento con más detalle en la página de <a href="/traduccion-certificada-uscis">traducción certificada para USCIS</a>.</p>

      <h2>¿En qué se diferencian exactamente?</h2>
      <table>
        <thead>
          <tr><th></th><th>Traducción jurada (España)</th><th>Certified translation (EEUU)</th></tr>
        </thead>
        <tbody>
          <tr><td>Quién la firma</td><td>Traductor jurado nombrado por el MAEC</td><td>Cualquier traductor competente que firme la certificación</td></tr>
          <tr><td>Para quién</td><td>Organismos españoles y consulados de España</td><td>USCIS, tribunales, universidades y empleadores de EEUU</td></tr>
          <tr><td>Qué lleva</td><td>Certificación en español, firma y sello en cada página</td><td>Traducción íntegra al inglés + certificado firmado y fechado</td></tr>
          <tr><td>Notario</td><td>No</td><td>No (USCIS no lo exige)</td></tr>
          <tr><td>Dirección habitual</td><td>Inglés → español</td><td>Español → inglés</td></tr>
        </tbody>
      </table>

      <h2>¿Acepta USCIS una traducción hecha en España?</h2>
      <p>Sí. Lo que revisa USCIS es la certificación, no el lugar donde se hizo la traducción. Una traducción certificada preparada desde Murcia es tan válida como una hecha en Miami, siempre que sea completa (sellos, apostillas y notas manuscritas incluidos) y lleve la certificación con firma, fecha y contacto. Mi condición de traductora jurada del MAEC no es un requisito para USCIS, pero añade una credencial verificable que los oficiales entienden.</p>

      <h2>¿Acepta España una certified translation hecha en Estados Unidos?</h2>
      <p>En general, no. Extranjería, el registro civil o el consulado piden traducción jurada por traductor nombrado por el Ministerio español (o legalizada por vía consular, que es más lenta y cara). Si ya tienes una certified translation de tu certificado de nacimiento estadounidense, lo normal es que tengas que volver a traducirlo como jurada. Si me lo envías con la apostilla, sale en el día.</p>

      <h2>¿Y si presento el mismo documento en los dos países?</h2>
      <p>Pasa más de lo que parece: una pareja hispano-estadounidense que se casa en España y después pide la green card, o un español que solicita la nacionalidad estadounidense y a la vez mantiene trámites en el registro civil español. En esos casos preparo las dos versiones a la vez, con los mismos criterios (mismos nombres, fechas y términos), para que ningún oficial encuentre discrepancias entre una y otra. Si vives en Estados Unidos, en la <a href="/traduccion-jurada-estados-unidos">guía para clientes de Estados Unidos</a> tienes el detalle de apostillas, huso horario y pago con tarjeta estadounidense.</p>

      <h2>¿Qué documentos españoles se traducen más para USCIS?</h2>
      <p>Certificados de nacimiento (literal o extracto) para peticiones familiares, green card y naturalización; certificados de matrimonio, sentencias de divorcio y certificados de defunción; certificados de antecedentes penales del Ministerio de Justicia; títulos y expedientes académicos para visados de trabajo o de estudios; extractos bancarios, certificados de empresa y nóminas como prueba de medios; y escrituras, poderes y contratos. Cada uno lleva su propia hoja de certificación, y todos los sellos, apostillas y anotaciones manuscritas aparecen en la versión inglesa: una traducción para USCIS tiene que ser completa, no un resumen.</p>

      <h2>Resumen en tres líneas</h2>
      <ol>
        <li>Trámite en España → traducción jurada (firma y sello del MAEC).</li>
        <li>Trámite ante USCIS → certified translation al inglés con certificación firmada, sin notario.</li>
        <li>Los dos → las dos versiones a la vez, con un solo traductor.</li>
      </ol>
      <p>
        ¿No sabes cuál te piden? Mándame el documento y el nombre del trámite por
        <a href="https://wa.me/34685891214?text=Hola%20Elena%2C%20no%20s%C3%A9%20si%20necesito%20traducci%C3%B3n%20jurada%20o%20certificada%20para%20USCIS%3A%20te%20env%C3%ADo%20el%20documento%20y%20el%20tr%C3%A1mite">WhatsApp</a>
        y te lo confirmo con precio cerrado en menos de 2 horas.
      </p>
    `,
  },

  {
    slug: "documentos-indios-visado-espana-apostilla-mea",
    translationOf: "indian-documents-spanish-visa-mea-apostille-sworn-translation",
    title: "Documentos indios para un visado de España: apostilla del MEA y traducción jurada",
    excerpt:
      "Guía para solicitantes de India: qué documentos pide el Consulado de España (nacimiento, matrimonio, PCC, títulos, cartas de empleador), cómo funciona la apostilla del Ministry of External Affairs y por qué los certificados deben llegar en inglés antes de la traducción jurada al español.",
    date: "2026-11-04",
    updated: "2026-11-04",
    author: "Elena Peñaranda Ortega",
    tags: ["india", "extranjeria", "apostilla"],
    readingTime: "6 min",
    image: "/blog/post-india-mea.jpg",
    alt: "Estantería de biblioteca universitaria con un portátil en primer plano",
    html: `
      <p>India es, después de Reino Unido y Estados Unidos, el país desde el que más consultas recibo: estudiantes que van a un máster en España, ingenieros con contrato, familias que se reagrupan y cada vez más teletrabajadores que piden el <a href="/traduccion-jurada-visado-nomada-digital">visado de nómada digital</a>. Todos se encuentran con la misma cadena de trámites: atestación, apostilla del MEA y traducción jurada al español. Esta guía explica la cadena en orden y qué documentos la recorren.</p>

      <h2>¿Qué documentos indios pide el Consulado de España?</h2>
      <p>Depende del visado, pero la lista se repite:</p>
      <ul>
        <li><strong>Birth certificate</strong> de la municipal corporation o del registrar, para reagrupación, matrimonio y nacionalidad.</li>
        <li><strong>Marriage certificate</strong>, con los sellos del registrar.</li>
        <li><strong>Police clearance certificate (PCC)</strong> de la oficina de pasaportes o de la policía estatal, para casi todos los visados de larga duración.</li>
        <li><strong>Títulos, mark sheets y transcripts</strong> para el visado de estudios, la homologación y la colegiación profesional.</li>
        <li><strong>Cartas de empleador y de experiencia</strong> para visados de trabajo, tarjeta azul y nómada digital.</li>
        <li><strong>Extractos bancarios, ITR y Form 16</strong> como justificantes económicos.</li>
        <li><strong>Affidavits</strong> ante notario cuando falta un certificado o hay que declarar algo (un cambio de nombre, por ejemplo).</li>
      </ul>
      <p>Todos ellos, si no están en español, se presentan con traducción jurada. En la página de <a href="/traduccion-jurada-india">traducción jurada de documentos de India</a> tienes la tabla completa con apostilla sí o no para cada uno.</p>

      <h2>¿Cómo funciona la apostilla del MEA?</h2>
      <p>India forma parte del Convenio de La Haya, así que sus documentos públicos se legalizan con apostilla y no con legalización consular. La emite el <strong>Ministry of External Affairs</strong> (MEA) del Gobierno de India a través de sus centros de recogida y de agencias autorizadas. Antes de la apostilla, la mayoría de los documentos pasan por una atestación previa: la del departamento de educación del estado para los títulos, la del Home Department para los certificados personales o la de la cámara de comercio para los documentos comerciales. La apostilla es una pegatina con código QR que se pega al documento y que forma parte de él: también se traduce.</p>

      <h2>¿Por qué el documento tiene que estar en inglés?</h2>
      <p>Porque yo traduzco del inglés al español, no del hindi, el marathi, el tamil, el gujarati o el bengalí. La mayoría de los documentos indios se emiten en inglés o en versión bilingüe y con esos trabajo directamente. Si el tuyo está solo en lengua regional, necesitas primero una versión inglesa oficial: la del propio organismo emisor o la de un traductor reconocido en India, con su sello. Esa versión, apostillada, es la que traduzco al español. Es un paso más, pero evita que el consulado rechace una traducción hecha "de oídas" sobre un original que no puedo leer.</p>

      <h2>¿En qué orden se hace todo?</h2>
      <ol>
        <li>Consigue el documento original (o la versión inglesa oficial, si está en lengua regional).</li>
        <li>Atestación previa del departamento que corresponda.</li>
        <li>Apostilla del MEA.</li>
        <li>Escaneo completo del documento con la apostilla y traducción jurada al español.</li>
      </ol>
      <p>Si me envías un documento sin apostilla y el consulado la exige, te lo digo antes de empezar. Tienes más sobre la apostilla en general en <a href="/blog/que-es-la-apostilla-de-la-haya">qué es la apostilla de La Haya</a>.</p>

      <h2>¿Cuánto tarda y cómo se paga desde India?</h2>
      <p>Un documento de hasta 10 páginas está traducido en el día; un expediente completo de visado de estudios (con transcripts largos) lleva un único plazo cerrado por escrito que te doy en menos de 2 horas laborables. Mi horario es de 9:00 a 20:00, hora peninsular española, entre 3 horas y media y 4 horas y media por detrás de India: si me escribes a media mañana, te contesto a primera hora de mi jornada. El pago es con tarjeta india (Visa, Mastercard o RuPay internacional) a través de Stripe, en euros; si tu tarjeta tiene bloqueados los pagos internacionales, actívalos en la app del banco antes de pagar. Recibes un PDF firmado digitalmente, válido para el consulado y para la plataforma de visados; si te exigen papel, lo envío por mensajería a India.</p>

      <h2>¿Y los documentos españoles para usarlos en India?</h2>
      <p>El camino inverso también existe: certificados españoles de nacimiento o matrimonio, títulos, antecedentes penales o documentos de empresa que hay que presentar ante una administración, universidad o empleador en India. Los traduzco al inglés con mi firma y sello, y cuando el organismo indio lo pide, el original se apostilla antes en España.</p>
      <p>
        ¿Tienes tu lista de documentos? Envíamela por
        <a href="https://wa.me/34685891214?text=Hola%20Elena%2C%20escribo%20desde%20India%3A%20necesito%20traducci%C3%B3n%20jurada%20al%20espa%C3%B1ol%20de%20mis%20documentos%20%28en%20ingl%C3%A9s%2C%20con%20apostilla%20del%20MEA%29%20para%20el%20Consulado%20de%20Espa%C3%B1a">WhatsApp</a>
        y te digo qué necesita apostilla y cuánto cuesta el lote completo.
      </p>
    `,
  },

  {
    slug: "traduccion-jurada-para-irse-de-espana-reino-unido-irlanda-canada-australia",
    translationOf: "sworn-translations-leaving-spain-uk-ireland-canada-australia",
    title: "Traducción jurada para irse de España: qué piden Reino Unido, Irlanda, Canadá y Australia",
    excerpt:
      "Si emigras desde España, tus certificados, títulos y antecedentes penales tienen que llegar en inglés. Qué exige cada país a una traducción hecha fuera (UKVI, Irish Immigration, IRCC y Home Affairs), cuándo hace falta la apostilla española y en qué orden hacerlo.",
    date: "2026-11-18",
    updated: "2026-11-18",
    author: "Elena Peñaranda Ortega",
    tags: ["emigrar", "reino-unido", "irlanda", "canada", "australia", "apostilla"],
    readingTime: "7 min",
    image: "/blog/post-irse-de-espana.jpg",
    alt: "Maleta preparada junto a una carpeta de documentos antes de un viaje",
    html: `
      <p>La mayoría de mis clientes vienen a España. Pero cada semana traduzco también en el otro sentido: españoles y residentes en España que se van a trabajar, estudiar o vivir a Reino Unido, Irlanda, Canadá o Australia y que necesitan sus documentos en inglés. Los cuatro países hablan inglés, los cuatro piden traducciones, y ninguno tiene el mismo sistema de traductores jurados que España. Esta guía resume qué exige cada uno a una traducción hecha desde aquí, con la fuente oficial enlazada, y en qué orden conviene hacerlo todo.</p>

      <h2>Qué tienen en común los cuatro</h2>
      <ul>
        <li><strong>Ningún documento en español se acepta sin traducción</strong> al inglés (Irlanda admite también el irlandés; Canadá, el francés).</li>
        <li><strong>La traducción tiene que ser completa</strong>, con sellos, apostilla y anotaciones incluidas, e ir acompañada de una declaración del traductor con su nombre, firma, fecha y datos de contacto.</li>
        <li><strong>La apostilla, si se pide, se pone sobre el original español</strong> antes de traducir, porque también se traduce. En España la emiten los colegios notariales (documentos notariales), los tribunales superiores de justicia (documentos judiciales) y el Ministerio de Justicia y las delegaciones del Gobierno (el resto). Tienes el detalle en <a href="/blog/que-es-la-apostilla-de-la-haya">qué es la apostilla de La Haya</a>.</li>
        <li><strong>Los documentos se repiten</strong>: <a href="/traduccion-jurada-partida-nacimiento">certificado de nacimiento</a>, <a href="/traduccion-jurada-certificado-matrimonio">de matrimonio</a>, <a href="/traduccion-jurada-certificado-penales">de antecedentes penales</a>, <a href="/traduccion-jurada-titulo-universitario">título y expediente académico</a>, vida laboral, nóminas y cartas de empleador.</li>
      </ul>
      <p>Mi traducción jurada al inglés lleva de serie todo lo que piden: certificación de exactitud, firma, sello con el nº 7310 del MAEC, fecha y mis datos de contacto. Lo que cambia entre países es la letra pequeña.</p>

      <h2>Reino Unido: "certified translation" para el UKVI</h2>
      <p>UK Visas and Immigration exige que cualquier documento que no esté en inglés o galés se presente con una traducción certificada que incluya la confirmación del traductor de que es una traducción fiel del original, la fecha, su nombre completo y firma y sus datos de contacto. La traducción jurada española cumple ese requisito tal cual, sin notario. La apostilla solo se pide para determinados documentos y trámites: confírmalo en la guía del visado concreto. Tengo un artículo específico sobre <a href="/blog/traduccion-jurada-visado-reino-unido">el visado del Reino Unido</a> y una página para <a href="/traduccion-jurada-britanicos-espana">británicos que hacen el camino contrario</a>.</p>

      <h2>Irlanda: "full and certified translation" para Immigration Service Delivery</h2>
      <p>Irlanda no tiene traductores jurados. Immigration Service Delivery pide una traducción completa y certificada al inglés o al irlandés en la que el traductor confirma que es fiel al original e indica sus datos de contacto (<a href="https://www.irishimmigration.ie/how-to-make-a-certified-translation-of-a-document/" target="_blank" rel="noopener noreferrer">fuente oficial: irishimmigration.ie</a>). Universidades, empleadores y el HSE aplican el mismo criterio. Como Irlanda y España son Estados de la UE, muchos documentos públicos (nacimiento, matrimonio, antecedentes penales) pueden presentarse sin apostilla con el impreso multilingüe del Reglamento (UE) 2016/1191, aunque no todos los organismos lo aceptan en lugar de la traducción: pregúntalo antes. Más detalle en la <a href="/traduccion-jurada-irlanda">guía de Irlanda</a>.</p>

      <h2>Canadá: traductor certificado o affidavit para IRCC</h2>
      <p>Immigration, Refugees and Citizenship Canada admite documentos en inglés o en francés. Todo lo demás se presenta con su traducción y, si el traductor <strong>no es miembro en activo de una asociación canadiense de traductores certificados</strong>, con un affidavit en el que jura ante una autoridad competente que domina los dos idiomas y que la traducción es exacta, más una copia certificada del original. Ni familiares ni representantes del solicitante pueden traducir (<a href="https://ircc.canada.ca/english/helpcentre/answer.asp?qnum=018&amp;top=4" target="_blank" rel="noopener noreferrer">IRCC: idioma de los documentos</a> · <a href="https://ircc.canada.ca/english/helpcentre/answer.asp?qnum=040&amp;top=4" target="_blank" rel="noopener noreferrer">IRCC: qué es un affidavit de traducción</a>). Mi nombramiento del MAEC no es una membresía de asociación canadiense, así que para IRCC hay que contar con el affidavit; universidades, colegios profesionales y empleadores suelen conformarse con la traducción certificada. Lo explico paso a paso en la <a href="/traduccion-jurada-canada">guía de Canadá</a>.</p>

      <h2>Australia: traducciones hechas fuera de Australia para Home Affairs</h2>
      <p>El Department of Home Affairs pide traducciones al inglés de todo lo que esté en otro idioma. Si la traducción se hace dentro de Australia, el traductor debe estar acreditado por NAATI; si se hace fuera, como es el caso desde España, no hace falta NAATI, pero la traducción debe indicar el nombre completo, la dirección, el teléfono y las cualificaciones y experiencia del traductor en el idioma de origen (<a href="https://immi.homeaffairs.gov.au/help-text/evidence/Pages/et-h0012.aspx" target="_blank" rel="noopener noreferrer">Home Affairs: evidencia y traducciones</a>). Mi certificación incluye todos esos datos. Para la homologación de títulos y la colegiación profesional cada organismo evaluador tiene sus normas: consúltalas antes de encargar. Tienes la <a href="/traduccion-jurada-australia">guía de Australia</a> completa.</p>

      <h2>En qué orden hacerlo</h2>
      <ol>
        <li><strong>Pide la lista de documentos</strong> al organismo de destino (visado, universidad, colegio profesional, empleador) y comprueba para cuáles exige apostilla y para cuáles copia certificada o affidavit.</li>
        <li><strong>Consigue los originales actualizados</strong>: los certificados del Registro Civil y de antecedentes penales caducan a efectos de muchos trámites, así que pídelos con el visado a la vista.</li>
        <li><strong>Apostilla lo que lo necesite</strong> antes de traducir.</li>
        <li><strong>Escanéalo todo</strong> completo, apostilla incluida, y envíamelo por WhatsApp o por el formulario. Te doy un presupuesto cerrado en menos de 2 horas laborables y un único plazo para el lote.</li>
        <li><strong>Recibes el PDF firmado</strong> en el día para un documento de hasta 10 páginas, con la certificación adaptada al país. Si te piden papel, lo envío por mensajería.</li>
      </ol>

      <h2>Cuánto margen dejar</h2>
      <p>No te doy plazos de las administraciones extranjeras, porque cambian y dependen de cada oficina. Lo que sí controlo es mi parte: la traducción de un expediente completo de emigración lleva un plazo cerrado por escrito antes de empezar, y con los lotes urgentes trabajo como cuento en <a href="/traduccion-jurada-urgente-grandes-volumenes">urgentes y grandes volúmenes</a>. Lo que más retrasa un expediente no es la traducción, sino descubrir tarde que un certificado necesitaba apostilla.</p>
      <p>
        ¿Te vas? Envíame la lista de documentos por
        <a href="https://wa.me/34685891214?text=Hola%20Elena%2C%20me%20voy%20de%20Espa%C3%B1a%20y%20necesito%20traducir%20mis%20documentos%20al%20ingl%C3%A9s%20%28te%20digo%20el%20pa%C3%ADs%20y%20el%20tr%C3%A1mite%29">WhatsApp</a>
        y te digo qué apostillar, qué traducir y cuánto cuesta el lote completo.
      </p>
    `,
  },


  // ---------------------------------------------------------------------
  // SEO Fase 2 (septiembre de 2026): artículos de fondo con FAQ propia.
  // El campo `faq` lo pinta app/(es)/blog/[slug]/page.js y genera FAQPage.
  // Precios: solo los de content/documents.js.
  // ---------------------------------------------------------------------
  {
    slug: "como-saber-si-una-traduccion-jurada-es-valida",
    translationOf: "how-to-check-sworn-translation-valid-spain",
    title: "Cómo saber si una traducción jurada es válida en España (y qué hacer si te entregan una que no lo es)",
    excerpt:
      "Los cinco puntos que comprueba un funcionario en una traducción jurada: nombramiento del MAEC, listado oficial, firma, sello, certificación y fecha. Cómo verificarlos tú mismo, los errores típicos de algunas agencias y qué hacer si el organismo la rechaza.",
    date: "2026-09-26",
    updated: "2026-09-26",
    author: "Elena Peñaranda Ortega",
    tags: ["validez", "consejos"],
    readingTime: "7 min",
    image: "/blog/post-firma-digital.jpg",
    alt: "Traducción jurada con sello y firma digital de traductora jurada",
    html: `
      <p>Una traducción jurada es válida en España cuando la ha hecho y firmado un <strong>traductor-intérprete jurado nombrado por el Ministerio de Asuntos Exteriores, Unión Europea y Cooperación (MAEC)</strong> para ese idioma, y lleva su <strong>certificación, firma, sello y fecha</strong>, con una copia del documento original adjunta. Nada más y nada menos. No la hace válida el papel timbrado, ni el logotipo de una agencia, ni un notario, ni la palabra «certificada». Si alguna de esas piezas falta, el organismo puede rechazarla, y lo hace con más frecuencia de la que se cree. Soy Elena Peñaranda, traductora jurada de inglés nº 7310, y en este artículo te enseño a comprobar en cinco minutos si la traducción que tienes delante pasará el filtro.</p>

      <h2>1. Quién puede firmar una traducción jurada en España</h2>
      <p>En España la única figura habilitada es el <strong>traductor-intérprete jurado</strong>, un título que concede el MAEC a través de la Oficina de Interpretación de Lenguas, bien por examen, bien por reconocimiento de una cualificación de otro Estado de la UE. Cada nombramiento es para un idioma concreto y lleva un <strong>número de traductor jurado</strong>. El mío es el 7310, para inglés: puedo certificar traducciones del inglés al español y del español al inglés, y ninguna otra combinación.</p>
      <p>Esto tiene dos consecuencias prácticas. La primera: una agencia no es traductora jurada. Puede intermediar, pero la traducción la firma una persona con nombre, apellidos y número, y esa persona responde legalmente de cada frase. La segunda: un traductor jurado de francés no puede firmar una traducción del inglés, aunque hable inglés perfectamente. Es un error más frecuente de lo que parece cuando el encargo pasa por varias manos.</p>

      <h2>2. Cómo comprobar el nombramiento en el listado oficial</h2>
      <p>El MAEC publica el <a href="https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Traductores-as---Interpretes-Jurados-as.aspx" target="_blank" rel="noopener noreferrer">listado oficial de traductores-intérpretes jurados</a>, y es exactamente lo que consulta un funcionario cuando duda. Busca el nombre que aparece en el sello y comprueba tres cosas: que <strong>figura</strong>, que el <strong>idioma</strong> coincide con el de tu documento y que el <strong>número</strong> es el mismo que el del sello. Si el nombre no está, o está para otro idioma, la traducción no es jurada por mucho que lo diga el encabezado.</p>
      <p>Un matiz honesto: el listado se actualiza periódicamente y puede haber nombramientos muy recientes que tarden unas semanas en aparecer. Si el traductor te dice que acaba de ser nombrado, pídele el número de su título; con ese dato el organismo puede verificarlo. En mi caso no hay duda posible: llevo años en el listado y cualquiera puede comprobarlo.</p>

      <h2>3. Qué tiene que llevar la traducción, página por página</h2>
      <p>La normativa vigente (Real Decreto 724/2020 y la orden que regula el sello y la certificación) fija un formato bastante estricto. Esto es lo que debe aparecer:</p>
      <ul>
        <li><strong>La certificación final</strong>, con la fórmula oficial: el traductor, identificado con nombre y número, certifica que la que antecede es traducción fiel y completa al idioma de destino de un documento redactado en el idioma de origen, y lo firma en un lugar y una fecha concretos.</li>
        <li><strong>La firma</strong> del traductor, manuscrita en papel o electrónica en PDF, junto a la certificación.</li>
        <li><strong>El sello</strong>, con el nombre completo, la mención «Traductor/a-Intérprete Jurado/a de [idioma]» y el número de nombramiento. Ni dirección ni logotipos: el modelo oficial es sobrio y no admite adornos.</li>
        <li><strong>La fecha</strong> de la certificación, que es la que el organismo tomará como fecha de la traducción.</li>
        <li><strong>Una copia del documento original</strong>, sellada y fechada, unida a la traducción. El traductor certifica la traducción de <em>ese</em> documento en concreto, no de un texto abstracto; sin la copia, el funcionario no puede saber qué se ha traducido.</li>
        <li><strong>Todo el contenido</strong>: sellos, apostilla, firmas, notas manuscritas y anotaciones marginales. Lo que no se traduce se describe entre corchetes («[sello ilegible]», «[firma]»). Una traducción jurada nunca resume ni omite.</li>
      </ul>
      <p>Si quieres verlo aplicado a un caso concreto, en la ficha de <a href="/traduccion-jurada-validez-oficial">validez oficial de la traducción jurada</a> explico cómo se comprueba ante ministerios, universidades y consulados.</p>

      <h2>4. Firma digital: sí, vale, y así se verifica</h2>
      <p>Desde 2020 la Oficina de Interpretación de Lenguas admite que la traducción jurada se firme <strong>electrónicamente</strong> y se entregue en PDF, y la administración lo acepta de forma generalizada para presentación telemática. La firma digital no sustituye al sello y a la certificación: los acompaña. El PDF debe llevar la certificación, la imagen del sello y la fecha, y además la firma electrónica del traductor incrustada en el archivo.</p>
      <p>Para verificarla, abre el PDF en un lector que muestre el panel de firmas (Adobe Acrobat Reader lo hace) y comprueba que la firma es válida, que el nombre del firmante es el del traductor y que el documento <strong>no se ha modificado</strong> después de firmarse. Si el PDF es solo una imagen escaneada de una firma, sin firma electrónica detrás, es una copia digital de una traducción en papel: puede servir si el organismo acepta copias, pero no es una traducción firmada digitalmente. Trato el tema a fondo en <a href="/blog/traduccion-jurada-digital-firma-electronica">traducción jurada digital y firma electrónica</a>.</p>

      <h2>Tabla: válida frente a rechazable</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>Qué comprobar</th><th>Traducción válida</th><th>Señal de alarma</th></tr></thead>
        <tbody>
          <tr><td>Quién firma</td><td>Traductor-intérprete jurado del MAEC, con nombre y número</td><td>Sello de agencia, «traductor certificado», notario o firma sin número</td></tr>
          <tr><td>Listado oficial</td><td>Aparece con ese idioma y ese número</td><td>No aparece, o aparece para otro idioma</td></tr>
          <tr><td>Certificación</td><td>Fórmula oficial, lugar y fecha</td><td>Falta, está en otro idioma o dice «traducción certificada»</td></tr>
          <tr><td>Sello</td><td>Nombre, idioma y número; sobrio</td><td>Logotipos, dirección, sin número o de otro idioma</td></tr>
          <tr><td>Copia del original</td><td>Adjunta, sellada y fechada</td><td>Solo se entrega la traducción</td></tr>
          <tr><td>Contenido</td><td>Completo: sellos, apostilla, notas</td><td>Falta la apostilla o hay párrafos «no relevantes» omitidos</td></tr>
          <tr><td>Firma digital</td><td>Firma electrónica válida en el PDF</td><td>Imagen de una firma pegada, sin firma electrónica</td></tr>
        </tbody>
      </table></div>

      <h2>5. Errores típicos que veo en traducciones de algunas agencias</h2>
      <p>No todas las agencias trabajan mal; muchas subcontratan a traductores jurados serios y entregan un producto impecable. Pero cuando un cliente me trae una traducción rechazada, casi siempre es por uno de estos motivos:</p>
      <ol>
        <li><strong>La firma un traductor no jurado</strong> y la agencia «certifica» con su propio sello. En Reino Unido o Estados Unidos eso es una traducción certificada y vale; en España, no.</li>
        <li><strong>El traductor es jurado de otro idioma.</strong> Suele pasar con documentos bilingües o con expedientes de varios países que se reparten sin cuidado.</li>
        <li><strong>Se ha traducido una versión y se ha sellado otra</strong>: el cliente envía un borrador, luego el documento definitivo con apostilla, y la traducción no incluye la apostilla.</li>
        <li><strong>Falta la copia del original</strong>, o se adjunta sin sellar. Es el defecto más fácil de subsanar y el más habitual.</li>
        <li><strong>La firma electrónica no es del traductor</strong>, sino de la agencia, o el PDF se ha «aplanado» después de firmarlo y la firma aparece como inválida.</li>
        <li><strong>Traducción de una traducción</strong>: el documento original está en hindi o en árabe, alguien lo tradujo al inglés y la traducción jurada se hace desde ese inglés. Para muchos organismos, no vale.</li>
      </ol>
      <p>Si tienes dudas sobre qué tipo de traducción te están vendiendo, en <a href="/blog/traduccion-jurada-vs-traduccion-certificada">traducción jurada frente a traducción certificada</a> explico las diferencias con calma.</p>

      <h2>6. Qué hacer si el organismo la rechaza</h2>
      <p>Primero, <strong>pide el motivo por escrito</strong>. «No es válida» no es un motivo; «falta la copia del original» o «el traductor no figura en el listado» sí. Con el motivo delante, hay tres escenarios:</p>
      <ul>
        <li><strong>Defecto subsanable con el mismo traductor</strong> (falta la copia, falta una página, la apostilla no se tradujo). Contacta con el traductor jurado que firmó: tiene la obligación profesional de entregar una traducción completa y normalmente lo arregla sin coste o por un importe pequeño.</li>
        <li><strong>El traductor no es jurado o no lo es de ese idioma.</strong> No hay arreglo posible sobre esa traducción; hace falta una nueva. Reclama a quien te la vendió, guardando el rechazo por escrito como prueba.</li>
        <li><strong>El funcionario se equivoca.</strong> Ocurre, sobre todo con la firma electrónica. Aporta el enlace al listado del MAEC y, si es un PDF, el informe de validación de la firma. Si insiste en papel, el traductor puede enviarte el original en papel por mensajería; en mi caso, el precio de la traducción es el mismo, solo se añade el envío.</li>
      </ul>
      <p>Y si necesitas rehacerla, no partas de cero a ciegas: envíame el documento original y el escrito de rechazo, te digo en menos de 2 horas qué falló y te doy precio cerrado. Los certificados habituales (nacimiento, matrimonio, antecedentes penales) están <a href="/precios">desde 35 €</a> y se entregan en el día (hasta 10 páginas).</p>
      <p>
        <a href="https://wa.me/34685891214?text=Hola%20Elena%2C%20me%20han%20rechazado%20una%20traducci%C3%B3n%20jurada%20y%20quiero%20saber%20qu%C3%A9%20ha%20fallado">Escríbeme por WhatsApp</a>
        con el documento y el motivo del rechazo, o consulta la página de
        <a href="/traductor-jurado-ingles">traductora jurada de inglés</a> para saber cómo trabajo.
      </p>
    `,
    faq: [
      {
        q: "¿Cómo compruebo que un traductor jurado existe de verdad?",
        a: "Busca su nombre en el listado oficial de traductores-intérpretes jurados del MAEC y comprueba que el idioma y el número coinciden con los del sello. Es la misma comprobación que hace la administración.",
      },
      {
        q: "¿Una traducción jurada en PDF con firma digital vale igual que en papel?",
        a: "Sí. La Oficina de Interpretación de Lenguas admite la firma electrónica desde 2020 y la administración la acepta para presentación telemática. Si un organismo concreto exige papel, el traductor puede enviarte el original.",
      },
      {
        q: "¿Caduca una traducción jurada?",
        a: "No. Lo que puede caducar es el documento original: los certificados de antecedentes penales o de empadronamiento suelen tener una vigencia limitada a efectos del trámite, así que revisa la del original antes de traducir.",
      },
      {
        q: "¿Puede una agencia certificar una traducción jurada con su sello?",
        a: "No. En España solo certifica el traductor-intérprete jurado nombrado por el MAEC, con su firma, su sello y su número. El sello de una agencia no añade validez.",
      },
      {
        q: "Me han rechazado la traducción, ¿tengo que pagar otra completa?",
        a: "Depende del motivo. Si es un defecto de forma (falta la copia del original, una página o la apostilla), el mismo traductor jurado debería subsanarlo. Si quien la firmó no es traductor jurado de ese idioma, hace falta una traducción nueva y conviene reclamar a quien te la vendió.",
      },
    ],
  },

  {
    slug: "nacionalidad-espanola-residencia-documentos-reino-unido-eeuu-india",
    translationOf: "sworn-translations-spanish-citizenship-residence-uk-us-india",
    title: "Documentos traducidos para la nacionalidad española por residencia: guía para ciudadanos de Reino Unido, EE. UU. e India",
    excerpt:
      "Qué documentos de tu país de origen necesitas traducir para la nacionalidad española por residencia, qué apostilla lleva cada uno y en qué orden hacerlo, con las particularidades del Reino Unido, Estados Unidos e India y precios reales.",
    date: "2026-09-26",
    updated: "2026-09-26",
    author: "Elena Peñaranda Ortega",
    tags: ["extranjeria", "apostilla", "reino-unido", "estados-unidos", "india"],
    readingTime: "8 min",
    image: "/blog/real-extranjeria.jpg",
    alt: "Pasaporte y certificados preparados para el expediente de nacionalidad española",
    html: `
      <p>Para la nacionalidad española por residencia necesitas, como mínimo, dos documentos de tu país de origen con <strong>apostilla y traducción jurada</strong>: el <a href="/traduccion-jurada-partida-nacimiento">certificado de nacimiento</a> y el <a href="/traduccion-jurada-certificado-penales">certificado de antecedentes penales</a>. Si estás casado o casada, casi siempre también el <a href="/traduccion-jurada-certificado-matrimonio">certificado de matrimonio</a>. La traducción jurada de cada uno de estos certificados cuesta <strong>desde 35 €</strong> y se entrega <strong>en el día</strong> en PDF firmado digitalmente, válido para la presentación telemática. Soy Elena Peñaranda, traductora jurada de inglés nº 7310 del MAEC, y preparo estos expedientes cada semana para clientes británicos, estadounidenses e indios; esta guía es lo que les cuento antes de empezar.</p>

      <p>Un aviso antes de seguir: los años de residencia exigidos, las tasas, los exámenes del Instituto Cervantes y el estado de tu expediente los fija el Ministerio de Justicia y los conoce mejor tu abogado o el propio portal de trámites. Yo me ocupo de la parte documental: qué traducir, qué apostillar y en qué orden, para que no te devuelvan el expediente por un papel.</p>

      <h2>Qué documentos extranjeros pide el expediente</h2>
      <p>La solicitud de nacionalidad por residencia se presenta por vía telemática y combina documentos españoles (que no se traducen) con documentos de tu país de origen (que sí). Los extranjeros que se piden con carácter general son:</p>
      <ul>
        <li><strong>Certificado de nacimiento</strong> del país de origen, literal o completo, legalizado con apostilla y con traducción jurada.</li>
        <li><strong>Certificado de antecedentes penales</strong> del país de origen, apostillado y traducido. Si has vivido en otros países en los últimos años, también el de esos países.</li>
        <li><strong>Certificado de matrimonio</strong>, si solicitas por estar casado o casada con ciudadano español, o si tu estado civil consta en el expediente.</li>
        <li>En algunos casos, <strong>certificados de nacimiento de los hijos</strong> y documentación del cónyuge.</li>
      </ul>
      <p>El resto (empadronamiento, tarjeta de residencia, exámenes DELE y CCSE, justificantes) se emite en España y en español, así que no me hace falta verlo. Tienes la lista general, sin distinguir por país, en <a href="/blog/documentos-traducidos-nacionalidad-espanola-residencia">qué documentos traducir para la nacionalidad por residencia</a>.</p>

      <h2>Apostilla primero, traducción después</h2>
      <p>El orden importa, y es el motivo número uno por el que se rehacen traducciones: la <a href="/blog/que-es-la-apostilla-de-la-haya">apostilla de La Haya</a> se pone en el documento original, en el país que lo emitió, y la traducción jurada debe incluirla. Si me envías el certificado sin apostilla y la consigues después, la traducción ya entregada no la recoge y habría que ampliarla. Así que: pide el certificado, apostíllalo y, con las dos cosas en la mano, escanéalo todo y me lo envías. Reino Unido, Estados Unidos e India están en el Convenio de La Haya; ninguno de los tres necesita legalización consular.</p>

      <h2>Reino Unido</h2>
      <p>Los clientes británicos son los que más expedientes de nacionalidad me encargan, y sus documentos son los más previsibles:</p>
      <ul>
        <li><strong>Certificado de nacimiento</strong>: se pide una copia certificada reciente a la General Register Office (Inglaterra y Gales), a National Records of Scotland o a GRONI (Irlanda del Norte). Conviene el certificado completo (con datos de los padres), no la versión corta.</li>
        <li><strong>Antecedentes penales</strong>: el <strong>ACRO Police Certificate</strong>, no el DBS, que es para empleadores. Llega en papel por correo.</li>
        <li><strong>Apostilla</strong>: la emite la Legalisation Office del FCDO sobre cada documento por separado. Desde el Brexit los documentos británicos ya no se benefician de la exención de apostilla del Reglamento (UE) 2016/1191.</li>
        <li><strong>Matrimonio</strong>: certificado de la GRO o del registro local, apostillado igual.</li>
      </ul>
      <p>Detalle que ahorra disgustos: el ACRO tiene una vigencia práctica corta a ojos de la administración española, así que pídelo cuando ya tengas el resto del expediente listo. Todo lo específico de este perfil está en la guía para <a href="/traduccion-jurada-britanicos-espana">británicos en España</a>.</p>

      <h2>Estados Unidos</h2>
      <p>Aquí la trampa es que hay <strong>dos niveles de apostilla</strong>, y elegir mal el nivel obliga a repetir:</p>
      <ul>
        <li><strong>Certificado de nacimiento</strong>: lo emite la oficina de registros vitales del <em>estado</em> (o del condado, según el caso) y lo apostilla el <strong>Secretary of State de ese estado</strong>. Una apostilla federal no sirve para un documento estatal.</li>
        <li><strong>Antecedentes penales</strong>: para la nacionalidad se pide el certificado federal, el <strong>FBI Identity History Summary</strong> (a veces llamado <em>FBI background check</em>), y lo apostilla el <strong>U.S. Department of State</strong> (Office of Authentications), porque es un documento federal. Algunos solicitantes aportan además el certificado estatal de su estado de residencia; confírmalo con tu abogado.</li>
        <li><strong>Matrimonio</strong>: certificado del condado o del estado, apostilla del Secretary of State correspondiente.</li>
      </ul>
      <p>Los certificados de nacimiento estadounidenses varían muchísimo de un estado a otro (formato, campos, sellos en relieve), y los traduzco tal como vienen, incluidos los textos legales al dorso. Cómo pagar con tarjeta estadounidense, horarios y el resto de detalles están en la guía para <a href="/traduccion-jurada-estados-unidos">clientes en Estados Unidos</a>.</p>

      <h2>India</h2>
      <p>Con la India el punto delicado no es la apostilla, que es única y sencilla, sino el <strong>documento de origen</strong>:</p>
      <ul>
        <li><strong>Certificado de nacimiento</strong>: lo emite la municipalidad o el registro civil local, a menudo en el idioma del estado (hindi, tamil, maratí…) o bilingüe. Para que yo pueda hacer la traducción jurada, el certificado tiene que estar <strong>en inglés emitido por la autoridad</strong>, no traducido al inglés por un tercero: una traducción jurada de una traducción suele rechazarse. Si tu certificado está solo en idioma local, pide a la municipalidad una versión en inglés o busca un traductor jurado de ese idioma.</li>
        <li><strong>Antecedentes penales</strong>: el <strong>Police Clearance Certificate (PCC)</strong> que expide la Regional Passport Office a través de Passport Seva, en inglés.</li>
        <li><strong>Apostilla</strong>: la emite el <strong>Ministry of External Affairs (MEA)</strong>, normalmente previa autenticación del documento por el estado emisor y a través de las agencias de externalización autorizadas. La apostilla del MEA es una pegatina con código, y la traduzco como parte del documento.</li>
        <li><strong>Matrimonio</strong>: certificado del registrador de matrimonios del estado, en inglés, con apostilla del MEA.</li>
      </ul>
      <p>La guía para <a href="/traduccion-jurada-india">clientes de la India</a> tiene el detalle de nombres con una sola palabra, fechas y grafías, que en la nacionalidad conviene que coincidan al milímetro con el pasaporte y el NIE.</p>

      <h2>Tabla resumen por país</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>Documento</th><th>Reino Unido</th><th>Estados Unidos</th><th>India</th><th>Traducción jurada</th></tr></thead>
        <tbody>
          <tr><td>Nacimiento</td><td>GRO / NRS / GRONI, certificado completo. Apostilla FCDO</td><td>Registro vital del estado. Apostilla del Secretary of State</td><td>Municipalidad, en inglés. Apostilla MEA</td><td>Desde 35 €, en el día</td></tr>
          <tr><td>Antecedentes penales</td><td>ACRO Police Certificate. Apostilla FCDO</td><td>FBI Identity History Summary. Apostilla del Department of State</td><td>PCC de Passport Seva. Apostilla MEA</td><td>Desde 35 €, en el día</td></tr>
          <tr><td>Matrimonio (si aplica)</td><td>GRO o registro local. Apostilla FCDO</td><td>Condado o estado. Apostilla del Secretary of State</td><td>Registrador de matrimonios. Apostilla MEA</td><td>Desde 35 €, en el día</td></tr>
        </tbody>
      </table></div>

      <h2>Cómo lo preparo yo y qué recibes</h2>
      <ol>
        <li><strong>Escaneas cada documento completo</strong>, apostilla incluida, y me lo envías por WhatsApp o por el formulario. Mejor todo junto, aunque sean tres o cuatro archivos.</li>
        <li><strong>Te confirmo en menos de 2 horas laborables</strong> qué documentos necesitan traducción, un precio cerrado para el lote y una única fecha de entrega.</li>
        <li><strong>Traduzco el expediente de una vez</strong>, con los nombres, las fechas y los términos escritos igual en todos los documentos. Un mismo apellido escrito de dos formas en dos certificados es motivo de requerimiento.</li>
        <li><strong>Recibes los PDF firmados digitalmente</strong>, con mi certificación, sello y firma electrónica, listos para adjuntar en la plataforma telemática. Si el Registro Civil o tu abogado quieren papel, envío los originales por mensajería.</li>
      </ol>
      <p>Si quieres saber cómo se comprueba que una traducción jurada es válida antes de subirla, lo explico en <a href="/blog/como-saber-si-una-traduccion-jurada-es-valida">cómo saber si una traducción jurada es válida en España</a>.</p>
      <p>
        <a href="https://wa.me/34685891214?text=Hola%20Elena%2C%20estoy%20preparando%20mi%20expediente%20de%20nacionalidad%20por%20residencia%20y%20necesito%20traducir%20mis%20certificados">Envíame tus certificados por WhatsApp</a>
        y te digo qué traducir, qué apostillar y cuánto cuesta el lote completo. También puedes ver todos los
        <a href="/precios">precios</a> o la página de <a href="/traductor-jurado-ingles">traductora jurada de inglés</a>.
      </p>
    `,
    faq: [
      {
        q: "¿Tengo que traducir el pasaporte para la nacionalidad?",
        a: "Normalmente no: el pasaporte se aporta en copia completa y no se exige traducción jurada. Si tu abogado o el Registro Civil te la pidieran expresamente, se traduce igual que cualquier documento.",
      },
      {
        q: "¿La traducción jurada incluye la apostilla o se paga aparte?",
        a: "La incluye. La apostilla forma parte del documento y se traduce con él; cuando viene en la misma página o adherida al certificado no tiene coste adicional.",
      },
      {
        q: "¿Puedo presentar la traducción en PDF con firma digital?",
        a: "Sí. La solicitud es telemática y el PDF firmado electrónicamente por traductor jurado se acepta. Si más adelante el Registro Civil pide el original en papel, te lo envío por mensajería.",
      },
      {
        q: "Mi certificado de nacimiento indio está en hindi, ¿me lo traduces?",
        a: "Solo estoy habilitada para inglés. Si el certificado está en hindi u otro idioma local, pide a la municipalidad una versión en inglés emitida por la propia autoridad o acude a un traductor jurado de ese idioma; una traducción jurada hecha desde una traducción no oficial suele rechazarse.",
      },
      {
        q: "¿Cuánto tardan las traducciones del expediente completo?",
        a: "Cada certificado habitual (nacimiento, penales, matrimonio) se entrega en el día. Si me envías los tres o cuatro documentos juntos, te doy una única fecha para el lote, normalmente dentro de ese mismo plazo.",
      },
    ],
  },


  {
    slug: "traduccion-jurada-canada-ircc-express-entry-estudios-reagrupacion",
    translationOf: "certified-translations-ircc-canada-from-spain",
    title: "Traducción jurada para Canadá (IRCC): Express Entry, estudios y reagrupación",
    excerpt:
      "Qué exige IRCC a una traducción (traductor certificado o affidavit, copia del original), cómo lo cumple una traducción jurada española y qué documentos se traducen para Express Entry, el permiso de estudios y el patrocinio familiar. Precios reales por documento.",
    date: "2026-09-27",
    updated: "2026-09-27",
    author: "Elena Peñaranda Ortega",
    tags: ["canada", "extranjeria", "validez"],
    readingTime: "9 min",
    image: "/blog/post-irse-de-espana.jpg",
    alt: "Pasaporte y documentos preparados para una solicitud de inmigración a Canadá",
    html: `
      <p>Immigration, Refugees and Citizenship Canada (<strong>IRCC</strong>) acepta documentos en inglés o en francés. Todo lo que esté en español se presenta con una <strong>traducción completa</strong> y, si quien la firma no es un <em>certified translator</em> canadiense (miembro en activo de una asociación provincial de traductores), con un <strong>affidavit</strong> del traductor en el que jura que domina los dos idiomas y que la traducción es exacta, además de una copia del documento original. Mi traducción jurada al inglés lleva de serie la certificación de exactitud, mi nombre, mi firma, mi sello con el nº 7310 del MAEC, la fecha y mis datos de contacto; lo que no puedo garantizarte es que tu oficina de IRCC equipare un nombramiento oficial del Estado español a la afiliación canadiense, así que si tu programa exige el affidavit, lo resolvemos antes de empezar. Los certificados habituales (antecedentes penales, nacimiento, matrimonio) cuestan <strong>desde ${MIN_PRICE} €</strong> y se entregan en el día (hasta 10 páginas). Soy Elena Peñaranda, traductora jurada de inglés, y esta guía recoge lo que explico a quien prepara Express Entry, un permiso de estudios o el patrocinio de un familiar desde España.</p>

      <h2>Qué exige exactamente IRCC en una traducción</h2>
      <p>El Centro de ayuda de IRCC lo resume en tres piezas para cualquier documento que no esté en inglés o francés:</p>
      <ul>
        <li>la <strong>traducción</strong> al inglés o al francés, completa, de un traductor que no sea el propio solicitante ni un familiar ni su representante;</li>
        <li>un <strong>affidavit</strong> de quien hizo la traducción, si no es un <em>certified translator</em> (miembro en activo de una asociación provincial o territorial de traductores canadienses, como ATIO en Ontario, OTTIAQ en Quebec o STIBC en Columbia Británica). El affidavit se jura ante un notario o un <em>commissioner of oaths</em> del país donde se hizo la traducción;</li>
        <li>cuando el programa lo indique, una <strong>copia certificada del original</strong> del que se ha traducido.</li>
      </ul>
      <p>Las fuentes son las páginas oficiales <a href="https://ircc.canada.ca/english/helpcentre/answer.asp?qnum=018&amp;top=4" target="_blank" rel="noopener noreferrer">IRCC: idioma de los documentos</a> e <a href="https://ircc.canada.ca/english/helpcentre/answer.asp?qnum=040&amp;top=4" target="_blank" rel="noopener noreferrer">IRCC: qué es un affidavit de traducción</a>. Fíjate en lo que <strong>no</strong> pide: apostilla. IRCC trabaja con copias digitales y con la traducción; la <a href="/blog/que-es-la-apostilla-de-la-haya">apostilla</a> solo aparece si otra autoridad del proceso (una universidad, un colegio profesional, un organismo de evaluación de credenciales) la exige por su cuenta.</p>

      <h2>Cómo lo cumple una traducción jurada española (y dónde está el matiz)</h2>
      <p>Una traducción jurada del MAEC es una traducción certificada en el sentido más fuerte que existe en España: la firma una persona nombrada por el Ministerio de Asuntos Exteriores, con número comprobable en el <a href="https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Traductores-as---Interpretes-Jurados-as.aspx" target="_blank" rel="noopener noreferrer">listado oficial</a>, y lleva certificación, firma, sello, fecha y una copia sellada del original. Para IRCC añado mis datos de contacto en la propia certificación y una declaración expresa de competencia en ambos idiomas y de exactitud, que es el contenido del affidavit.</p>
      <p>El matiz es de forma: IRCC define <em>certified translator</em> como miembro de una asociación canadiense, y mi nombramiento es un título oficial del Estado español, no una afiliación. En la práctica muchos solicitantes presentan traducciones oficiales de su país sin incidencias, pero la norma escrita habla de traductor certificado <strong>o</strong> affidavit, y prefiero decírtelo antes que descubrirlo con un requerimiento. Si tu oficina o tu asesor de inmigración piden el affidavit, mi declaración se jura ante notario en España y te doy su coste con el presupuesto, antes de cobrar nada. Lo mismo cuento en la página para <a href="/traduccion-jurada-canada">clientes con trámites entre Canadá y España</a>.</p>

      <h2>Express Entry: qué documentos españoles se traducen</h2>
      <p>Express Entry (Federal Skilled Worker, Canadian Experience Class, Federal Skilled Trades y las nominaciones provinciales) es el expediente que más traduzco para Canadá. Los documentos en español que aparecen casi siempre:</p>
      <ul>
        <li><strong><a href="/traduccion-jurada-certificado-penales">Certificado de antecedentes penales</a></strong> del Ministerio de Justicia, para cada país en el que hayas vivido seis meses seguidos o más desde los 18 años. Traducción jurada: <strong>${eur("antecedentes-penales")}</strong>.</li>
        <li><strong><a href="/traduccion-jurada-titulo-universitario">Título universitario</a> y expediente académico</strong> para la evaluación de credenciales (ECA) de WES, ICAS, IQAS o el organismo de tu profesión. Cada evaluador tiene su propio procedimiento (WES, por ejemplo, pide que la universidad le envíe directamente la certificación académica) y exige traducción cuando los documentos no están en inglés o francés. Título: <strong>${eur("titulo-universitario")}</strong>; expediente: ${eur("expediente-academico")}.</li>
        <li><strong><a href="/traduccion-jurada-certificado-empresa">Cartas de referencia laboral, certificados de empresa y contratos</a></strong> que acreditan la experiencia declarada, con funciones, fechas, horas y salario. Certificado de empresa o nómina: <strong>${eur("certificado-empresa")}</strong>; cartas y contratos, presupuesto al verlos.</li>
        <li><strong><a href="/traduccion-jurada-certificado-matrimonio">Certificado de matrimonio</a></strong> o inscripción de pareja de hecho, y <strong><a href="/traduccion-jurada-partida-nacimiento">partidas de nacimiento</a></strong> de los hijos que te acompañan: <strong>${eur("certificado-matrimonio")}</strong> y <strong>${eur("partida-nacimiento")}</strong> cada una.</li>
        <li><strong>Justificantes de fondos</strong>: cartas del banco con saldo medio de seis meses. Muchos bancos las emiten en inglés; si la tuya está en español, se traduce.</li>
      </ul>
      <p>El examen de idioma (IELTS, CELPIP, TEF) y el reconocimiento médico con un <em>panel physician</em> ya se hacen en inglés o francés: no se traduce nada. La vida laboral de la Seguridad Social se puede pedir en inglés desde la propia sede electrónica; compruébalo antes de traducirla.</p>

      <h2>Permiso de estudios</h2>
      <p>Para estudiar en Canadá necesitas la carta de aceptación de una institución designada (DLI), la carta de atestación provincial que gestiona la propia institución para la mayoría de los programas y pruebas de fondos, además del expediente que te pidió la universidad al admitirte:</p>
      <ul>
        <li><strong>Títulos y expedientes</strong> de Bachillerato o de universidad, según el programa. La admisión los pide traducidos; IRCC, después, suele quedarse con la carta de aceptación.</li>
        <li><strong>Fondos</strong>: certificado de inversión garantizada (GIC) o extractos bancarios; si el dinero es de tus padres, carta de apoyo y partida de nacimiento para acreditar el parentesco.</li>
        <li>Para menores, <strong>declaración de custodio</strong> en Canadá y consentimiento de los padres.</li>
        <li><strong>Antecedentes penales</strong> solo si IRCC te los pide expresamente.</li>
      </ul>

      <h2>Reagrupación familiar: patrocinio de cónyuge, pareja, hijos y padres</h2>
      <p>En Canadá la reagrupación es un <em>sponsorship</em>: el residente o ciudadano canadiense patrocina y el familiar solicita. El expediente gira en torno a la <strong>prueba de la relación</strong>, y ahí los documentos españoles pesan:</p>
      <ul>
        <li><strong>Cónyuge</strong>: certificado literal de matrimonio del Registro Civil. El libro de familia ayuda, pero IRCC entiende mejor el certificado.</li>
        <li><strong>Pareja de hecho o <em>common-law</em></strong>: certificado del registro de parejas de hecho y pruebas de convivencia de al menos un año (empadronamiento conjunto, contrato de alquiler, facturas), que se traducen cuando estén en español.</li>
        <li><strong>Hijos dependientes</strong>: partidas de nacimiento y, si hay custodia compartida o un progenitor que no viaja, sentencia o consentimiento.</li>
        <li><strong>Padres y abuelos</strong>: partidas de nacimiento que enlacen a patrocinador y patrocinado.</li>
        <li><strong>Antecedentes penales</strong> del familiar patrocinado, de cada país en el que haya vivido seis meses o más desde los 18.</li>
        <li><strong>Sentencias de divorcio</strong> o certificados de defunción de matrimonios anteriores, cuando existan.</li>
      </ul>

      <h2>Tabla: documento, trámite, apostilla, affidavit y precio</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>Documento español</th><th>Trámite habitual</th><th>¿Apostilla?</th><th>¿Affidavit?</th><th>Traducción jurada</th></tr></thead>
        <tbody>
          <tr><td>Certificado de antecedentes penales</td><td>Express Entry, patrocinio, estudios (si lo piden)</td><td>No para IRCC</td><td>Solo si tu oficina lo exige</td><td>${eur("antecedentes-penales")}</td></tr>
          <tr><td>Título universitario</td><td>ECA (WES, ICAS…), estudios</td><td>Según el evaluador</td><td>Según el evaluador</td><td>${eur("titulo-universitario")}</td></tr>
          <tr><td>Expediente académico</td><td>ECA, admisión universitaria</td><td>Según el evaluador</td><td>Según el evaluador</td><td>${eur("expediente-academico")}</td></tr>
          <tr><td>Certificado de matrimonio / pareja de hecho</td><td>Express Entry (cónyuge), patrocinio</td><td>No para IRCC</td><td>Solo si tu oficina lo exige</td><td>${eur("certificado-matrimonio")}</td></tr>
          <tr><td>Partida de nacimiento</td><td>Hijos, patrocinio de padres</td><td>No para IRCC</td><td>Solo si tu oficina lo exige</td><td>${eur("partida-nacimiento")}</td></tr>
          <tr><td>Certificado de empresa, nóminas, cartas de referencia</td><td>Experiencia laboral</td><td>No</td><td>Solo si tu oficina lo exige</td><td>${eur("certificado-empresa")} (cartas: presupuesto)</td></tr>
          <tr><td>Extractos y cartas bancarias</td><td>Fondos</td><td>No</td><td>Solo si tu oficina lo exige</td><td>Presupuesto cerrado en menos de 2 h</td></tr>
        </tbody>
      </table></div>
      <p>Precios del <a href="/precios">catálogo</a> por documento estándar de una página; los documentos largos se presupuestan al verlos. Con el expediente completo te doy un único precio cerrado y una única fecha.</p>

      <h2>Cómo lo hacemos, paso a paso</h2>
      <ol>
        <li><strong>Me envías los documentos escaneados</strong> por WhatsApp, email o la <a href="/documentos">calculadora del catálogo</a>, completos y legibles, y me dices el programa (Express Entry, estudios, patrocinio) y, si lo sabes, qué formato acepta tu oficina.</li>
        <li><strong>En menos de 2 horas laborables</strong> te confirmo qué se traduce, si conviene affidavit y su coste, un precio cerrado y una fecha por escrito.</li>
        <li><strong>Traduzco al inglés, certifico, firmo y sello</strong> cada documento, con mis datos de contacto y la declaración de competencia y exactitud en la certificación; los nombres y las fechas quedan iguales en todos.</li>
        <li><strong>Recibes el PDF firmado electrónicamente</strong> en el día para los certificados breves; súbelo tal cual al portal de IRCC, sin reescanearlo. Si hace falta affidavit notarial o papel, lo enviamos por mensajería a Canadá con el coste del transportista en el presupuesto.</li>
      </ol>
      <p>Si tu caso es el contrario, documentos canadienses para un trámite en España, la <a href="/traduccion-jurada-canada">guía para Canadá</a> explica la apostilla de Global Affairs Canada y la traducción jurada al español. Y para comparar con lo que piden Reino Unido, Irlanda y Australia, tienes <a href="/blog/traduccion-jurada-para-irse-de-espana-reino-unido-irlanda-canada-australia">traducción jurada para irse de España</a>.</p>
      <p>
        <a href="https://wa.me/34685891214?text=Hola%20Elena%2C%20preparo%20un%20tr%C3%A1mite%20con%20IRCC%20%28Canad%C3%A1%29%20y%20necesito%20traducir%20mis%20documentos%20al%20ingl%C3%A9s">Escríbeme por WhatsApp con tu lista de documentos y tu programa</a>
        y te digo qué se traduce, si hace falta affidavit, precio cerrado y plazo. También puedes ver la página de
        <a href="/traductor-jurado-ingles">traductora jurada de inglés</a>.
      </p>
    `,
    faq: [
      {
        q: "¿IRCC acepta una traducción jurada española sin affidavit?",
        a: "La norma de IRCC habla de traductor certificado canadiense o, en su defecto, affidavit del traductor. Mi traducción jurada lleva certificación, firma, sello del MAEC, fecha, datos de contacto y declaración de competencia y exactitud; muchos solicitantes la presentan sin incidencias, pero no puedo garantizar que tu oficina la equipare a un certified translator. Si te exigen el affidavit, lo juro ante notario en España y te doy el coste antes de empezar.",
      },
      {
        q: "¿Hay que apostillar los documentos españoles para IRCC?",
        a: "No, como regla general: IRCC trabaja con copias digitales y con la traducción. La apostilla solo hace falta si otra entidad del proceso, como un organismo de evaluación de credenciales o una universidad, la exige por su cuenta.",
      },
      {
        q: "¿Qué certificado de antecedentes penales pide Express Entry?",
        a: "El certificado de antecedentes penales del Ministerio de Justicia, de cada país en el que hayas vivido seis meses seguidos o más desde los 18 años, traducido al inglés. Pídelo cuando el resto del expediente esté listo, porque IRCC quiere certificados recientes.",
      },
      {
        q: "¿Puedo usar la misma traducción para WES y para IRCC?",
        a: "Sí, siempre que WES no te pida un formato distinto. El título y el expediente traducidos sirven para la evaluación de credenciales y después para el expediente de Express Entry; te entrego el PDF firmado, que puedes reutilizar sin coste.",
      },
      {
        q: "¿Cuánto cuesta traducir los documentos para patrocinar a mi pareja?",
        a: `El certificado de matrimonio cuesta ${eur("certificado-matrimonio")}, cada partida de nacimiento ${eur("partida-nacimiento")} y el certificado de antecedentes penales ${eur("antecedentes-penales")}, con entrega en el día (hasta 10 páginas). Las pruebas de convivencia (empadronamiento, contratos, facturas) se presupuestan al verlas.`,
      },
    ],
  },
  {
    slug: "homologar-titulo-india-espana-apostilla-mea-traduccion-jurada",
    translationOf: "indian-degree-recognition-spain-mea-apostille-sworn-translation",
    title: "Homologar un título de la India en España: documentos, apostilla MEA y traducción jurada",
    excerpt:
      "Homologación, equivalencia o acceso a la universidad: qué vía te corresponde con un título indio, qué documentos pide el Ministerio, cómo se obtiene la apostilla del MEA y qué traduzco de forma jurada al español. Orden correcto, errores habituales y precios reales.",
    date: "2026-09-27",
    updated: "2026-09-27",
    author: "Elena Peñaranda Ortega",
    tags: ["india", "academico", "apostilla"],
    readingTime: "9 min",
    image: "/blog/post-india-mea.jpg",
    alt: "Título universitario indio con apostilla del MEA preparado para su homologación en España",
    html: `
      <p>Para que un título universitario de la India valga en España hay que pedir su <strong>homologación</strong> (si da acceso a una profesión regulada, como medicina, enfermería, ingeniería o arquitectura) o su <strong>equivalencia</strong> a nivel de Grado o Máster (para el resto), ante el Ministerio competente en universidades, con tres documentos apostillados por el <strong>Ministry of External Affairs (MEA)</strong> de la India y traducidos de forma jurada al español: el <a href="/traduccion-jurada-titulo-universitario">título</a> (<em>degree certificate</em>), el expediente completo (<em>consolidated marksheet</em> o <em>transcript</em>) y, en la homologación, el plan de estudios. La traducción jurada del título cuesta <strong>${eur("titulo-universitario")}</strong> y se entrega en el día; el expediente se presupuesta al verlo. Soy Elena Peñaranda, traductora jurada de inglés nº 7310, y cada mes traduzco expedientes de universidades indias para este trámite; esta es la guía que doy a mis clientes antes de empezar.</p>

      <p>Un aviso honesto: la resolución (si te homologan, qué equivalencia te conceden y cuánto tarda) la decide el Ministerio, y los plazos reales se miden en meses. Yo me ocupo de que la parte documental llegue bien a la primera: apostilla correcta, traducción completa y coherente, y ningún requerimiento por un papel.</p>

      <h2>Homologación, equivalencia o acceso: cuál te corresponde</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>Quieres…</th><th>Vía</th><th>Ante quién</th><th>Documentos indios</th></tr></thead>
        <tbody>
          <tr><td>Ejercer una profesión regulada (médico, enfermera, ingeniero, arquitecto, farmacéutico, abogado…)</td><td><strong>Homologación</strong> a un título español concreto</td><td>Ministerio competente en universidades (sede electrónica)</td><td>Título, expediente completo, plan de estudios, acreditación del derecho a ejercer en India si la tienes</td></tr>
          <tr><td>Que tu título cuente como Grado o Máster para trabajar en una profesión no regulada, opositar o seguir estudiando</td><td><strong>Equivalencia</strong> a nivel académico y rama</td><td>El mismo Ministerio</td><td>Título y expediente completo</td></tr>
          <tr><td>Entrar en una universidad española con estudios de secundaria (Class XII)</td><td>Homologación del bachillerato y acreditación para el acceso</td><td>Ministerio de Educación y UNEDasiss</td><td>Certificados de Class X y XII con marksheets</td></tr>
          <tr><td>Hacer un máster en España con tu bachelor indio</td><td>Admisión directa (sin homologar) si la universidad lo acepta</td><td>La universidad</td><td>Lo que pida la universidad: título y transcript traducidos</td></tr>
        </tbody>
      </table></div>
      <p>La homologación y la equivalencia de títulos universitarios se rigen por el Real Decreto 889/2022. Para un máster español muchas universidades admiten un bachelor extranjero sin homologar; pregúntalo antes de iniciar un trámite que puede tardar meses. La guía general, sin distinguir por país, está en <a href="/blog/homologacion-titulo-universitario-extranjero-espana">homologar un título universitario extranjero en España</a>.</p>

      <h2>Qué documentos indios pide el Ministerio</h2>
      <ul>
        <li><strong>Degree certificate</strong> (el título definitivo, expedido en la convocation). El <em>provisional certificate</em> sirve para empezar la solicitud si el definitivo tarda, pero el Ministerio querrá el título final; tradúcelos los dos si tienes ambos.</li>
        <li><strong>Consolidated marksheet o transcript</strong> con todas las asignaturas, semestres, notas y, a ser posible, créditos u horas. Si tu universidad solo emite marksheets por semestre, pide la consolidada: la traducción sale más limpia y el Ministerio la entiende mejor.</li>
        <li><strong>Syllabus o plan de estudios</strong> sellado por la universidad, solo para la homologación a profesión regulada: el Ministerio compara contenidos y horas con el título español.</li>
        <li><strong>Acreditación del ejercicio profesional en India</strong> cuando exista (registro en el National Medical Council, el Bar Council, el Pharmacy Council…), para las profesiones reguladas.</li>
        <li><strong>Pasaporte</strong> (no se traduce) y justificante de la tasa.</li>
      </ul>
      <p>Dos particularidades indias que conviene prever: los nombres de una sola palabra y el campo <em>father's name</em>, que traduzco tal cual sin inventar apellidos, y las calificaciones en porcentaje, CGPA o <em>division</em>, que reproduzco literalmente y con su escala; la conversión a la escala española la hace el Ministerio, no la traductora. Un bachelor de tres años (BA, BSc, BCom) y uno de cuatro (BTech, BE) no siempre reciben la misma equivalencia; se resuelve caso por caso.</p>

      <h2>La apostilla del MEA, paso a paso</h2>
      <p>La India forma parte del Convenio de La Haya, así que sus documentos se legalizan con <a href="/blog/que-es-la-apostilla-de-la-haya">apostilla</a>, no por vía consular. Para los documentos académicos el circuito es:</p>
      <ol>
        <li><strong>Verificación previa</strong> por la universidad que expidió el título y, según el estado, atestación del departamento de educación o de recursos humanos (HRD) estatal.</li>
        <li><strong>Apostilla del MEA</strong>, que se solicita a través de los centros de recogida y las agencias de externalización autorizadas por el Ministerio: una pegatina con código QR que se adhiere al documento y forma parte de él.</li>
        <li>Un documento, una apostilla: el título y el transcript se apostillan por separado.</li>
      </ol>
      <p>Importante: <strong>primero la apostilla y después la traducción</strong>. La apostilla se traduce como parte del documento; si me envías el título sin ella y la consigues después, hay que ampliar la traducción. El procedimiento del MEA para el resto de documentos (nacimiento, matrimonio, PCC) lo cuento en <a href="/blog/documentos-indios-visado-espana-apostilla-mea">documentos indios para un visado de España</a>.</p>

      <h2>Qué traduzco y cuánto cuesta</h2>
      <p>Traduzco del inglés al español los documentos emitidos en inglés por la universidad india, apostilla incluida. Si tu título está solo en hindi u otra lengua regional, necesitas antes la versión inglesa oficial de la propia universidad (la mayoría la emite); no traduzco a partir de traducciones no oficiales, porque el Ministerio las rechaza.</p>
      <div class="table-wrap"><table>
        <thead><tr><th>Documento</th><th>¿Apostilla MEA?</th><th>Traducción jurada</th><th>Plazo</th></tr></thead>
        <tbody>
          <tr><td>Degree certificate (1 página)</td><td>Sí</td><td>${eur("titulo-universitario")}</td><td>En el día (hasta 10 págs.)</td></tr>
          <tr><td>Provisional certificate</td><td>Sí, si lo presentas</td><td>${eur("titulo-universitario")}</td><td>En el día (hasta 10 págs.)</td></tr>
          <tr><td>Consolidated marksheet / transcript</td><td>Sí</td><td>${eur("expediente-academico")}</td><td>Fecha cerrada con el presupuesto</td></tr>
          <tr><td>Syllabus / plan de estudios</td><td>Normalmente basta el sello de la universidad; confírmalo</td><td>Presupuesto cerrado en menos de 2 h</td><td>Según extensión</td></tr>
          <tr><td>Certificado de registro profesional</td><td>Sí</td><td>Presupuesto cerrado en menos de 2 h</td><td>En el día (hasta 10 págs.)</td></tr>
          <tr><td>Pasaporte</td><td>No</td><td>No se traduce</td><td>—</td></tr>
        </tbody>
      </table></div>
      <p>Precios del <a href="/precios">catálogo</a> por documento estándar de una página. El plan de estudios puede tener decenas de páginas: lo presupuesto al verlo, y si el Ministerio solo exige las asignaturas de tu especialidad, te lo digo para no traducir de más. Qué incluye el precio del título lo explico en <a href="/blog/cuanto-cuesta-traducir-titulo-universitario">cuánto cuesta traducir un título universitario</a>.</p>

      <h2>En qué orden hacerlo (y los errores que veo cada mes)</h2>
      <ol>
        <li><strong>Reúne los originales definitivos</strong>: degree certificate, consolidated marksheet y, si vas a homologar, el syllabus sellado.</li>
        <li><strong>Apostilla del MEA</strong> en cada documento, con la verificación previa que exija tu estado.</li>
        <li><strong>Escanea todo</strong>, apostillas incluidas, y me lo envías por WhatsApp, email o la calculadora de la web; te doy precio cerrado y fecha en menos de 2 horas.</li>
        <li><strong>Traducción jurada</strong> del lote, con nombres, fechas y asignaturas idénticos en todos los documentos; PDF firmado electrónicamente para la sede.</li>
        <li><strong>Solicitud en la sede electrónica</strong> del Ministerio, pago de la tasa y espera. Si llega un requerimiento, me lo reenvías y lo resolvemos.</li>
      </ol>
      <p>Los errores más frecuentes: traducir antes de apostillar; presentar solo el título sin el expediente completo; enviar marksheets sueltas de cada semestre con nombres escritos de forma distinta; y traducir el título a partir de una versión en hindi con una traducción no oficial al inglés. Todos se evitan con el orden de arriba.</p>
      <p>Si vives en la India y el título es solo una parte de tu expediente (visado de estudios, nómada digital, reagrupación), en la guía para <a href="/traduccion-jurada-india">clientes de la India</a> tienes el cuadro completo de documentos, apostillas y pago con tarjeta india.</p>
      <p>
        <a href="https://wa.me/34685891214?text=Hola%20Elena%2C%20quiero%20homologar%20mi%20t%C3%ADtulo%20de%20la%20India%20en%20Espa%C3%B1a%20y%20necesito%20traducci%C3%B3n%20jurada">Envíame tu título y tu transcript por WhatsApp</a>
        y te digo qué apostillar, qué traducir y cuánto cuesta el lote. También puedes ver la página de
        <a href="/traductor-jurado-ingles">traductora jurada de inglés</a>.
      </p>
    `,
    faq: [
      {
        q: "¿Homologación o equivalencia para mi título indio?",
        a: "Homologación si vas a ejercer una profesión regulada en España (medicina, enfermería, ingeniería, arquitectura, farmacia, abogacía…): equivale tu título a uno español concreto. Equivalencia si tu profesión no está regulada o quieres opositar o seguir estudiando: reconoce el nivel (Grado o Máster) y la rama. Para un máster español, pregunta primero a la universidad: muchas admiten el bachelor sin homologar.",
      },
      {
        q: "¿Necesito apostillar el título con el MEA antes de traducirlo?",
        a: "Sí. La apostilla del MEA se adhiere al documento y se traduce como parte de él. Si traduces antes de apostillar, la traducción no recoge la apostilla y hay que ampliarla. Primero la apostilla, después la traducción jurada.",
      },
      {
        q: "Mi título está en hindi, ¿me lo traduces?",
        a: "Solo estoy habilitada para inglés. Pide a tu universidad la versión inglesa oficial del título y del transcript (la mayoría la expide), apostíllala y la traduzco al español. Una traducción jurada hecha desde una traducción no oficial al inglés suele rechazarse.",
      },
      {
        q: "¿Sirve el provisional certificate para empezar?",
        a: "Sirve para iniciar la solicitud, pero el Ministerio pedirá el degree certificate definitivo. Si ya tienes los dos, tradúcelos juntos: la traducción del título cuesta lo mismo y te ahorras un requerimiento.",
      },
      {
        q: "¿Cuánto cuesta traducir el título y el transcript para la homologación?",
        a: `El título universitario de una página cuesta ${eur("titulo-universitario")} y se entrega en el día. El transcript o consolidated marksheet depende del número de páginas y asignaturas, así que te doy precio cerrado en menos de 2 horas al verlo. Con el lote completo, un único precio y una única fecha.`,
      },
    ],
  },
];

// Helpers sencillos
export function getAllPosts() {
  // Ordena por fecha descendente
  return posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}

