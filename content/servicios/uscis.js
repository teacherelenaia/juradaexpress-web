// content/servicios/uscis.js
//
// Página de servicio: traducción certificada español → inglés para USCIS
// (Estados Unidos). Fuente de la verdad: docs/BRIEF-INTERNACIONAL-2026-09.md,
// punto 0.5 (8 CFR § 103.2(b)(3)). No se exige notario ni acreditación
// concreta; cada documento lleva su propia certificación.
import { USCIS_PAPER_COPY, INTERNATIONAL_SHIPPING } from "../site";
import { DOCUMENTS } from "../documents";

const PATH_ES = "/traduccion-certificada-uscis";
const PATH_EN = "/en/certified-translation-uscis";

const priceOf = (id) => DOCUMENTS.find((d) => d.id === id)?.price ?? null;
const certPrice = priceOf("partida-nacimiento");

const paperEs = USCIS_PAPER_COPY
  ? ` Si USCIS o tu abogado quieren la copia en papel con firma manuscrita, te la envío por mensajería a Estados Unidos (${INTERNATIONAL_SHIPPING.note.es.charAt(0).toLowerCase()}${INTERNATIONAL_SHIPPING.note.es.slice(1)}).`
  : "";
const paperEn = USCIS_PAPER_COPY
  ? ` If USCIS or your attorney want a paper copy with a handwritten signature, I courier it to the United States (${INTERNATIONAL_SHIPPING.note.en.charAt(0).toLowerCase()}${INTERNATIONAL_SHIPPING.note.en.slice(1)}).`
  : "";

export const es = {
  id: "uscis",
  locale: "es",
  path: PATH_ES,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Traducción certificada para USCIS",
  metaTitle: "Traducción certificada para USCIS (español-inglés)",
  metaDescription: "Traducción certificada al inglés para USCIS (8 CFR § 103.2(b)(3)): traducción completa, certificación firmada por documento, sin notario. PDF en 24/48 h.",
  h1: "Traducción certificada para USCIS: documentos españoles al inglés para inmigración en Estados Unidos",
  lead:
    "Una traducción certificada para USCIS es la traducción completa al inglés de un documento en español (certificado de nacimiento, matrimonio, divorcio, antecedentes penales, título, extracto bancario, escritura) acompañada de una certificación firmada y fechada en la que el traductor declara que la traducción es completa y exacta y que es competente para traducir del español al inglés, tal como exige la norma 8 CFR § 103.2(b)(3). No hace falta notario. Soy Elena Peñaranda Ortega, Traductora-Intérprete Jurada de Inglés nombrada por el Ministerio de Asuntos Exteriores de España (nº 7310), y entrego cada documento con su propia certificación en PDF firmado en 24/48 h.",
  image: {
    src: "/fotos/certificacion-firma.jpg",
    alt: "Mano firmando con pluma la certificación de una traducción sobre el documento",
  },
  whatsapp:
    "https://wa.me/34685891214?text=Hola%20Elena%2C%20necesito%20una%20traducci%C3%B3n%20certificada%20para%20USCIS%20de%20mi%20certificado%20de%E2%80%A6%20%28dime%20qu%C3%A9%20documento%20y%20para%20qu%C3%A9%20formulario%29",
  whatsappLabel: "Pedir traducción para USCIS",
  serviceName: "Traducción certificada español-inglés para USCIS",
  serviceType: "Certified translation (USCIS)",
  price: certPrice,
  areaServed: [{ "@type": "Country", name: "US" }, { "@type": "Country", name: "ES" }],
  sections: [
    {
      id: "requisito",
      title: "¿Qué exige USCIS en una traducción?",
      body: [
        "La norma es corta y clara. El 8 CFR § 103.2(b)(3) dice que cualquier documento en un idioma distinto del inglés que se presente ante USCIS debe ir acompañado de una <strong>traducción completa al inglés</strong> y de una <strong>certificación del traductor</strong> de que la traducción es completa y exacta y de que es competente para traducir de ese idioma al inglés.",
        "Tres consecuencias prácticas:",
        {
          list: [
            "<strong>Completa</strong> significa completa: se traducen también los sellos, las apostillas, las notas manuscritas, las anotaciones marginales y los textos de los formularios. Nada se resume ni se omite.",
            "<strong>No se exige notario</strong> ni una acreditación concreta del traductor: basta la certificación firmada. Mi condición de traductora jurada nombrada por el Ministerio de Asuntos Exteriores de España es un plus de credibilidad, no un requisito.",
            "<strong>No importa dónde se haga</strong> la traducción. USCIS acepta traducciones certificadas hechas fuera de Estados Unidos; lo que revisa es la certificación, no el lugar.",
          ],
        },
      ],
    },
    {
      id: "certificacion",
      title: "¿Qué incluye mi certificación?",
      body: [
        "Cada documento lleva su propia hoja de certificación en inglés (<em>Certificate of Translation Accuracy</em>) con:",
        {
          list: [
            "Mi nombre completo y mis datos de contacto (email, teléfono y web).",
            "La declaración de que soy competente para traducir del español al inglés y de que la traducción es completa y exacta.",
            "La identificación del documento traducido (tipo, titular, fecha y número si lo tiene).",
            "Mi firma, la fecha y mi sello de traductora jurada nº 7310, comprobable en el listado oficial del MAEC.",
          ],
        },
        `Recibes la traducción y la certificación en un PDF firmado digitalmente, listo para subirlo a tu expediente en línea o entregarlo a tu abogado.${paperEs}`,
      ],
    },
    {
      id: "diferencia",
      title: "¿Traducción jurada o traducción certificada? No son lo mismo",
      body: [
        {
          table: {
            caption: "Diferencias entre traducción jurada (España) y certified translation (Estados Unidos)",
            head: ["", "Traducción jurada (España)", "Certified translation (EEUU)"],
            rows: [
              [
                "Quién la firma",
                "Traductor jurado nombrado por el Ministerio de Asuntos Exteriores (nº de registro)",
                "Cualquier traductor competente que firme la certificación",
              ],
              [
                "Para qué sirve",
                "Organismos españoles: extranjería, registro civil, universidades, notarías, consulados de España",
                "USCIS, tribunales de inmigración, universidades y empleadores en Estados Unidos",
              ],
              [
                "Qué lleva",
                "Certificación en español, firma y sello del traductor en cada página",
                "Traducción completa al inglés + certificación firmada y fechada con datos de contacto",
              ],
              [
                "Notario",
                "No",
                "No (USCIS no lo exige)",
              ],
              [
                "Dirección habitual",
                "Inglés → español",
                "Español → inglés",
              ],
            ],
          },
        },
        'Hago las dos. Si tu trámite es en España, necesitas <a href="/traduccion-jurada-espanol-ingles">traducción jurada</a>; si es ante USCIS, necesitas traducción certificada. Y si presentas el mismo documento en los dos países, te preparo las dos versiones a la vez.',
      ],
    },
    {
      id: "documentos",
      title: "¿Qué documentos españoles se traducen para USCIS?",
      body: [
        {
          list: [
            '<a href="/traduccion-jurada-partida-nacimiento">Certificados de nacimiento</a> (literal o extracto) para peticiones familiares, green card y naturalización.',
            '<a href="/traduccion-jurada-certificado-matrimonio">Certificados de matrimonio</a>, sentencias de divorcio y certificados de defunción.',
            '<a href="/traduccion-jurada-certificado-penales">Certificados de antecedentes penales</a> del Ministerio de Justicia.',
            '<a href="/traduccion-jurada-titulo-universitario">Títulos y expedientes académicos</a> para visados de trabajo, estudios o evaluación de credenciales.',
            'Extractos bancarios, <a href="/traduccion-jurada-certificado-empresa">certificados de empresa y nóminas</a> como prueba de medios.',
            'Escrituras, poderes y <a href="/traduccion-jurada-contrato-escritura">contratos</a>; <a href="/traduccion-jurada-dni-pasaporte">DNI</a>, libro de familia y empadronamiento.',
          ],
        },
        "Documentos de otros países hispanohablantes (México, Colombia, Argentina, Venezuela, Perú…): también, siempre que estén redactados en español.",
      ],
    },
    {
      id: "entrega",
      title: "¿Cómo se entrega, cuánto tarda y cuánto cuesta?",
      body: [
        "Me envías el documento escaneado (todas las páginas, sellos incluidos) por WhatsApp o email y te respondo con precio cerrado en menos de 2 horas laborables. Pagas con tarjeta desde Estados Unidos, en euros, a través de Stripe. Un documento habitual está traducido y certificado en 24/48 h; un encargo enviado por la noche en Estados Unidos está en marcha a primera hora de la mañana en España.",
        `Precio: ${
          certPrice != null ? `certificados desde ${certPrice} €` : "presupuesto en menos de 2 h"
        }; documentos largos, presupuesto cerrado al ver el documento. Consulta la <a href="/precios">página de precios</a> (en euros).`,
      ],
    },
  ],
  steps: [
    {
      t: "Envío",
      d: "Escaneo completo del documento por WhatsApp o email, con la apostilla si la tiene.",
    },
    {
      t: "Presupuesto",
      d: "Precio cerrado y plazo en menos de 2 horas laborables; pago con tarjeta desde cualquier país.",
    },
    {
      t: "Traducción y certificación",
      d: "Traducción completa al inglés, sellos y notas incluidos, con certificación firmada y fechada.",
    },
    {
      t: "Entrega",
      d: "PDF firmado en 24/48 h; copia en papel con firma manuscrita a EEUU por mensajería si la necesitas.",
    },
  ],
  faq: [
    {
      q: "¿Hace falta notario para una traducción certificada de USCIS?",
      a: "No. USCIS exige la certificación firmada del traductor, no una legalización notarial. Si un organismo distinto de USCIS te la pide expresamente, dímelo y vemos la opción.",
    },
    {
      q: "¿Acepta USCIS traducciones hechas fuera de Estados Unidos?",
      a: "Sí. El requisito es que la traducción sea completa y lleve la certificación de competencia y exactitud del traductor, con firma, fecha y datos de contacto. El lugar donde se hace es irrelevante.",
    },
    {
      q: "¿Qué pasa con los sellos, las apostillas y las anotaciones manuscritas?",
      a: "Se traducen todos. Una traducción para USCIS tiene que ser completa: cada sello, apostilla, nota al margen y texto del formulario aparece en la versión inglesa, indicando dónde estaba en el original.",
    },
    {
      q: "¿Sirve la misma traducción para el consulado de España y para USCIS?",
      a: "No exactamente: el consulado español pide traducción jurada (firma y sello del MAEC, en español) y USCIS pide certified translation (al inglés con certificación). Si necesitas las dos, te las preparo a la vez con los mismos criterios.",
    },
    {
      q: "¿Puedo pagar con una tarjeta de Estados Unidos?",
      a: "Sí. El pago es con tarjeta internacional a través de Stripe; el importe se cobra en euros y tu banco aplica el cambio a dólares.",
    },
  ],
  cta: {
    title: "¿Necesitas una traducción certificada para USCIS?",
    text: "Envíame el documento escaneado y dime qué formulario o petición estás presentando (I-130, I-485, N-400, DS-260…). Te respondo con precio cerrado en menos de 2 horas.",
  },
  related: [
    { href: "/traduccion-jurada-estados-unidos", label: "Guía para clientes de Estados Unidos" },
    { href: "/traduccion-jurada-visado-nomada-digital", label: "Visado de nómada digital en España" },
    { href: "/traduccion-jurada-partida-nacimiento", label: "Certificado de nacimiento" },
    { href: "/traduccion-jurada-certificado-matrimonio", label: "Certificado de matrimonio" },
    { href: "/traduccion-jurada-validez-oficial", label: "Validez oficial de la traducción jurada" },
  ],
  otherLangLabel: "Certified Spanish to English translation for USCIS",
};

export const en = {
  id: "uscis",
  locale: "en",
  path: PATH_EN,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Certified translation for USCIS",
  metaTitle: "Certified Spanish to English translation for USCIS",
  metaDescription: "USCIS certified translation of Spanish documents (8 CFR § 103.2(b)(3)): complete translation, signed certification per document, no notary. PDF in 24/48h.",
  h1: "Certified Spanish to English translation for USCIS",
  lead:
    "A certified translation for USCIS is the complete English translation of a Spanish-language document (birth, marriage or divorce certificate, criminal record, degree, bank statement, deed) together with a signed and dated certification in which the translator states that the translation is complete and accurate and that they are competent to translate from Spanish into English, as required by 8 CFR § 103.2(b)(3). No notary is needed. I am Elena Peñaranda Ortega, a sworn translator appointed by Spain's Ministry of Foreign Affairs (no. 7310), and I deliver every document with its own certification as a signed PDF in 24/48 hours.",
  image: {
    src: "/fotos/certificacion-firma.jpg",
    alt: "Hand signing a translation certification with a pen on the document",
  },
  whatsapp:
    "https://wa.me/34685891214?text=Hi%20Elena%2C%20I%20need%20a%20certified%20translation%20for%20USCIS%20of%20my%E2%80%A6%20%28tell%20me%20which%20document%20and%20which%20form%20you%20are%20filing%29",
  whatsappLabel: "Request a USCIS translation",
  serviceName: "Certified Spanish to English translation for USCIS",
  serviceType: "Certified translation (USCIS)",
  price: certPrice,
  areaServed: [{ "@type": "Country", name: "US" }, { "@type": "Country", name: "ES" }],
  sections: [
    {
      id: "requirement",
      title: "What does USCIS require in a translation?",
      body: [
        "The rule is short and clear. 8 CFR § 103.2(b)(3) states that any document in a foreign language submitted to USCIS must be accompanied by a <strong>full English translation</strong> and a <strong>certification by the translator</strong> that the translation is complete and accurate and that the translator is competent to translate from the foreign language into English.",
        "Three practical consequences:",
        {
          list: [
            "<strong>Complete means complete</strong>: stamps, apostilles, handwritten notes, marginal annotations and form text are translated too. Nothing is summarised or left out.",
            "<strong>No notary is required</strong>, and no specific accreditation either: the signed certification is enough. My appointment as a sworn translator by Spain's Ministry of Foreign Affairs adds credibility, but it is not a requirement.",
            "<strong>Where the translation is done does not matter.</strong> USCIS accepts certified translations produced outside the United States; what it checks is the certification, not the location.",
          ],
        },
      ],
    },
    {
      id: "certification",
      title: "What does my certification include?",
      body: [
        "Every document comes with its own certification page in English (<em>Certificate of Translation Accuracy</em>) containing:",
        {
          list: [
            "My full name and contact details (email, phone and website).",
            "My statement that I am competent to translate from Spanish into English and that the translation is complete and accurate.",
            "Identification of the translated document (type, holder, date and reference number where applicable).",
            "My signature, the date and my stamp as sworn translator no. 7310, verifiable on the Spanish Ministry's official register.",
          ],
        },
        `You receive the translation and the certification in a digitally signed PDF, ready to upload to your online case or hand to your attorney.${paperEn}`,
      ],
    },
    {
      id: "difference",
      title: "Sworn translation or certified translation? They are not the same",
      body: [
        {
          table: {
            caption: "Differences between a Spanish sworn translation and a US certified translation",
            head: ["", "Sworn translation (Spain)", "Certified translation (USA)"],
            rows: [
              [
                "Who signs it",
                "A sworn translator appointed by Spain's Ministry of Foreign Affairs (registration number)",
                "Any competent translator who signs the certification",
              ],
              [
                "What it is for",
                "Spanish bodies: immigration, civil registry, universities, notaries, Spanish consulates",
                "USCIS, immigration courts, universities and employers in the United States",
              ],
              [
                "What it carries",
                "Certification in Spanish, translator's signature and stamp on every page",
                "Full English translation + signed and dated certification with contact details",
              ],
              ["Notary", "No", "No (USCIS does not require it)"],
              ["Usual direction", "English → Spanish", "Spanish → English"],
            ],
          },
        },
        'I provide both. If your procedure is in Spain, you need a <a href="/en/documentos">sworn translation</a>; if it is before USCIS, you need a certified translation. And if you are submitting the same document in both countries, I prepare both versions at the same time.',
      ],
    },
    {
      id: "documents",
      title: "Which Spanish documents are translated for USCIS?",
      body: [
        {
          list: [
            '<a href="/traduccion-jurada-partida-nacimiento">Birth certificates</a> (full or extract) for family petitions, green cards and naturalisation.',
            '<a href="/traduccion-jurada-certificado-matrimonio">Marriage certificates</a>, divorce decrees and death certificates.',
            '<a href="/traduccion-jurada-certificado-penales">Criminal record certificates</a> issued by the Spanish Ministry of Justice.',
            '<a href="/traduccion-jurada-titulo-universitario">Degrees and academic transcripts</a> for work or study visas and credential evaluations.',
            'Bank statements, <a href="/traduccion-jurada-certificado-empresa">employer certificates and payslips</a> as proof of means.',
            'Deeds, powers of attorney and <a href="/traduccion-jurada-contrato-escritura">contracts</a>; <a href="/traduccion-jurada-dni-pasaporte">national ID cards</a>, family record books and municipal registration certificates.',
          ],
        },
        "Documents from other Spanish-speaking countries (Mexico, Colombia, Argentina, Venezuela, Peru…) too, as long as they are written in Spanish.",
      ],
    },
    {
      id: "delivery",
      title: "How is it delivered, how long does it take and what does it cost?",
      body: [
        "You send me the scanned document (every page, stamps included) on WhatsApp or by email and I reply with a fixed price within 2 working hours. You pay by card from the United States, in euros, through Stripe. A standard document is translated and certified in 24/48 hours; an order sent in the evening in the US is under way first thing in the morning in Spain.",
        `Price: ${
          certPrice != null ? `certificates from €${certPrice}` : "a quote within 2 hours"
        }; longer documents get a fixed quote once I see them. See the <a href="/en/precios">pricing page</a> (in euros).`,
      ],
    },
  ],
  steps: [
    {
      t: "Send",
      d: "A complete scan of the document on WhatsApp or by email, apostille included if it has one.",
    },
    {
      t: "Quote",
      d: "Fixed price and deadline within 2 working hours; card payment from any country.",
    },
    {
      t: "Translation and certification",
      d: "Full English translation, stamps and notes included, with a signed and dated certification.",
    },
    {
      t: "Delivery",
      d: "Signed PDF in 24/48 hours; paper copy with handwritten signature couriered to the US if you need it.",
    },
  ],
  faq: [
    {
      q: "Do I need a notary for a USCIS certified translation?",
      a: "No. USCIS requires the translator's signed certification, not notarisation. If a body other than USCIS expressly asks for it, tell me and we will look at the options.",
    },
    {
      q: "Does USCIS accept translations made outside the United States?",
      a: "Yes. The requirement is that the translation is complete and carries the translator's certification of competence and accuracy, with signature, date and contact details. Where it is produced is irrelevant.",
    },
    {
      q: "What happens with stamps, apostilles and handwritten notes?",
      a: "They are all translated. A USCIS translation must be complete: every stamp, apostille, marginal note and form field appears in the English version, indicating where it sat in the original.",
    },
    {
      q: "Can the same translation be used at the Spanish consulate and at USCIS?",
      a: "Not exactly: the Spanish consulate requires a sworn translation (Ministry stamp and signature, in Spanish) and USCIS requires a certified translation (into English, with certification). If you need both, I prepare them together with the same criteria.",
    },
    {
      q: "Can I pay with a US card?",
      a: "Yes. Payment is by international card through Stripe; the amount is charged in euros and your bank converts it to dollars.",
    },
  ],
  cta: {
    title: "Need a certified translation for USCIS?",
    text: "Send me the scanned document and tell me which form or petition you are filing (I-130, I-485, N-400, DS-260…). You will have a fixed price within 2 hours.",
  },
  related: [
    { href: "/en/sworn-translation-usa-spain", label: "Guide for clients in the United States" },
    { href: "/en/sworn-translation-spain-digital-nomad-visa", label: "Spain's digital nomad visa" },
    { href: "/traduccion-jurada-partida-nacimiento", label: "Birth certificate (guide in Spanish)" },
    { href: "/traduccion-jurada-certificado-matrimonio", label: "Marriage certificate (guide in Spanish)" },
    { href: "/en/how-it-works", label: "How it works" },
  ],
  otherLangLabel: "Traducción certificada para USCIS",
};
