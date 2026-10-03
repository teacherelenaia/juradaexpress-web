// content/us-docs.js
//
// Landings de documento para el mercado de EE. UU. (2026-10): seis páginas
// solo en inglés, en primera persona (Elena), generadas con
// app/components/UsDocPage.js. Cada una explica qué exige USCIS
// (8 CFR § 103.2(b)(3)), por qué un documento ESPAÑOL conviene que lo
// traduzca una traductora jurada española (sellos, formatos del Registro
// Civil, abreviaturas, apostilla), precio en dólares, plazo, entrega y pago.
// Extensión objetivo: 900-1.200 palabras renderizadas por página.
//
// Precios: se convierten desde content/documents.js (euros) con un tipo
// fijo USD_RATE y se redondean a múltiplos de 5 $ (35 € → 40 $). Si el
// documento no tiene precio de catálogo (price: null) la página dice
// "fixed quote within 2 hours" y cita el precio mínimo del catálogo.
//
// Reseñas: se eligen por nombre de content/reviews.js (solo reseñas reales
// publicadas en Google, en inglés). Si un nombre desaparece de REVIEWS, la
// página sigue funcionando con las que queden.
import { DOCUMENTS, MIN_PRICE } from "./documents";
import { getPublishableReviews } from "./reviews";
import { US_DOC_ROUTES, SERVICE_ROUTES } from "./servicios/routes";
import { MAEC_NUMBER, SINCE } from "./persona";

import { USD_RATE, US_SHIPPING_USD, toUsd } from "./usd";

// Tipo de cambio, envío a EE. UU. y conversión: viven en content/usd.js.
export { USD_RATE, US_SHIPPING_USD, toUsd };

export const MIN_PRICE_USD = toUsd(MIN_PRICE);

const USCIS_PATH = SERVICE_ROUTES.find((r) => r.id === "uscis").en;
const USA_PATH = SERVICE_ROUTES.find((r) => r.id === "usa").en;
const CALCULATOR_HREF = "/en#calculadora";

const fmt = (usd) => `$${usd}`;

const priceOf = (docId) =>
  docId ? DOCUMENTS.find((d) => d.id === docId)?.price ?? null : null;

const wa = (text) =>
  `https://wa.me/34685891214?text=${encodeURIComponent(text)}`;

const route = (id) => US_DOC_ROUTES.find((r) => r.id === id);
const link = (id, label) => `<a href="${route(id).en}">${label}</a>`;

// ---------------------------------------------------------------------------
// Textos compartidos por las seis páginas (precio, entrega, pago, tabla,
// pasos). Reciben el documento para personalizar nombre y precio.
// ---------------------------------------------------------------------------

// Nota sobre el tipo de cambio que el componente muestra bajo la tarjeta de precio.
export const RATE_NOTE = `Calculated from my euro rates at a fixed reference rate (1 € = ${USD_RATE.toFixed(2)} $), rounded to the nearest $5.`;

function uscisTable(doc) {
  return {
    caption: `What USCIS requires for a ${doc.short} and what Jurada Express delivers`,
    head: ["What USCIS requires", "What you get"],
    rows: [
      [
        "A <strong>full</strong> English translation (8 CFR § 103.2(b)(3))",
        `The whole ${doc.short}: every stamp, note, handwritten entry and code${doc.tableExtra ? `, ${doc.tableExtra}` : ""}`,
      ],
      [
        "Certification of completeness and accuracy",
        "A signed, dated <em>Certificate of Translation Accuracy</em> per document",
      ],
      [
        "Statement of the translator's competence",
        `My statement, backed by my appointment as sworn translator no. ${MAEC_NUMBER} (Spain's Foreign Ministry, since ${SINCE})`,
      ],
      [
        "Translator's name, signature and contact details",
        "Name, signature, stamp, email, phone and website",
      ],
      [
        "No notarisation",
        `None needed. Paper original couriered to the US for ${fmt(US_SHIPPING_USD)} on request`,
      ],
      [
        "Copy of the original",
        "Your scan attached in the same PDF",
      ],
    ],
  };
}

const STEPS = (doc) => [
  { t: "Send", d: `A full scan or clear photo of your ${doc.short}, on WhatsApp or by email.` },
  { t: "Quote and deadline", d: "Fixed price in US dollars and delivery date within 2 working hours." },
  { t: "Translation and certification", d: "Full English translation, stamps included, with my signed certificate." },
  { t: "Delivery", d: `Signed PDF the same day for up to 10 pages; paper copy to the US for ${fmt(US_SHIPPING_USD)} on request.` },
];

// FAQ comunes (se añaden a las específicas de cada documento hasta 6).
const FAQ_SHARED = {
  notary: {
    q: "Do I need to have the translation notarised for USCIS?",
    a: "No. USCIS requires the translator's signed certification of accuracy and competence, not a notary. My certificate carries my name, signature, stamp, date and contact details.",
  },
  abroad: {
    q: "Does USCIS accept a translation made in Spain?",
    a: "Yes. The regulation does not say where the translator must be or what licence they must hold; it requires a complete translation and a certification of accuracy and competence.",
  },
  payment: {
    q: "How do I pay from the United States?",
    a: "In US dollars, by card or through Wise, once you approve the quote and deadline in writing. The dollar price quoted is the price you pay.",
  },
  paper: {
    q: "Do I need the paper copy, or is the PDF enough?",
    a: `For online USCIS filings the signed PDF is enough. If your attorney wants the paper original with my handwritten signature and stamp, I courier it to any US address for a flat ${fmt(US_SHIPPING_USD)}.`,
  },
  time: {
    q: "How fast can you deliver?",
    a: "Documents of up to 10 pages are translated, certified and delivered the same working day (Spain time); larger files get a written deadline before I start, normally 24-72 hours. No surcharge.",
  },
  apostille: {
    q: "Does USCIS require an apostille on my Spanish document?",
    a: "Usually not: USCIS asks for the document and its certified translation, not for legalisation. If your document already carries a Hague apostille, I translate it too, because the translation must be complete.",
  },
};

// ---------------------------------------------------------------------------
// Los seis documentos
// ---------------------------------------------------------------------------

const RAW_DOCS = [
  // 1. Partida / certificación de nacimiento --------------------------------
  {
    id: "us-birth",
    short: "Spanish birth certificate",
    unit: "certificate",
    metaTitle: "Spanish Birth Certificate Translation for USCIS",
    metaDescription:
      "Certified English translation of a Spanish birth certificate for USCIS by a sworn translator in Spain. USD price, signed PDF same day (up to 10 pages).",
    h1: "Certified translation of a Spanish birth certificate for USCIS",
    lead:
      "A certified translation of a Spanish birth certificate for USCIS is the complete English translation of the <em>certificación literal de nacimiento</em>, stamps and marginal notes included, plus my signed certification of accuracy and competence (8 CFR § 103.2(b)(3)). I am Elena Peñaranda Ortega, sworn translator appointed by the Spanish Ministry of Foreign Affairs in 2009 (no. 7310). I translate Spanish civil registry records every week and deliver yours as a signed PDF the same day (up to 10 pages).",
    image: {
      src: "/fotos/certificacion-firma.jpg",
      alt: "Hand signing the certification page of a translated Spanish birth certificate",
    },
    whatsapp: wa(
      "Hi Elena, I need a certified translation of a Spanish birth certificate for USCIS. Which form are you filing? (I-130, I-485, N-400…)"
    ),
    whatsappLabel: "Request a USCIS translation",
    serviceName: "Certified translation of a Spanish birth certificate for USCIS",
    tableExtra: "and the apostille if there is one",
    sections: [
      {
        id: "uscis",
        title: "What USCIS requires for a Spanish birth certificate",
        body: [
          "USCIS asks for a birth certificate in almost every family case: I-130, I-485, N-400 and the DS-260 consular process. When it is in Spanish, 8 CFR § 103.2(b)(3) requires a <strong>full English translation</strong> and the translator's <strong>certification of completeness, accuracy and competence</strong>. No notary, no US-based translator.",
          "Two things trip people up. USCIS wants the <strong>long-form</strong> record, which in Spain is the <em>certificación literal</em>, not the summary <em>extracto</em>. And the multilingual CIEC extract issued for use in Europe is not a translation: its captions are printed in several languages, but the entries, stamps and notes are in Spanish. If you are not sure which version you have, send me a photo.",
        ],
      },
      {
        id: "document",
        title: "What a Spanish birth certificate looks like, and what I translate",
        body: [
          "Spanish birth records come in three formats, and I handle all of them:",
          {
            list: [
              "<strong>Handwritten or typed entries</strong> from the old registry books (<em>Tomo</em>, <em>Página</em>, <em>Sección 1.ª</em>), often with marginal notes added years later.",
              "<strong>Printed certificates</strong> from the <em>Registro Civil</em>, with the registrar's stamp and the signature of the <em>Encargado</em> or the <em>Letrado de la Administración de Justicia</em>.",
              "<strong>Electronic certificates</strong> from the Ministry of Justice, with a secure verification code (<em>CSV</em>) and an electronic signature block instead of a wet stamp.",
            ],
          },
          "I translate every element: registry details, the entry, marginal notes, every stamp, the CSV block and the apostille if present. A partly illegible stamp is marked as such in brackets.",
        ],
      },
      {
        id: "why",
        title: "Why a Spanish sworn translator for a Spanish record",
        body: [
          "USCIS does not require a translator certified in Spain. But a Spanish registry record is full of details a translator who does not handle them daily gets wrong:",
          {
            list: [
              "<strong>Registry references</strong> (<em>Tomo</em>, <em>Folio</em>, <em>Sección</em>, <em>Inscripción</em>, DICIREG codes) must stay consistent across every document in your file.",
              "<strong>Abbreviations and titles</strong>: <em>D./D.ª</em>, <em>núm.</em>, <em>Fol.</em>, <em>Juez Encargado</em>, <em>LAJ</em>. Rendered wrongly, they make an officer doubt the whole translation.",
              "<strong>Two surnames</strong>, kept exactly as registered and in the same order, so they match the passport and the rest of your evidence.",
              "<strong>Marginal notes</strong> (acknowledgement of paternity, adoption, change of name) change the legal meaning of the record and are often skipped.",
            ],
          },
          `Since ${SINCE} I have handled these documents as sworn translator no. ${MAEC_NUMBER}. USCIS does not require that appointment; it is why the translation is right the first time.`,
        ],
      },
    ],
    faq: [
      {
        q: "Which Spanish birth certificate does USCIS want: literal or extract?",
        a: "The long-form record: the certificación literal de nacimiento. The extracto and the multilingual CIEC extract are summaries and may trigger a request for evidence. The literal version can be requested online from the Spanish Ministry of Justice.",
      },
      {
        q: "My certificate is bilingual (Catalan, Galician or Basque and Spanish). Can you translate it?",
        a: "Yes. Certificates from those regions carry the Spanish text alongside; I translate from the Spanish and note the bilingual layout.",
      },
      {
        q: "Do you translate the marginal notes and the apostille too?",
        a: "Always. USCIS requires a complete translation, so every marginal note, stamp and apostille appears in English, where it sits in the original.",
      },
      FAQ_SHARED.notary,
      FAQ_SHARED.abroad,
      FAQ_SHARED.payment,
    ],
    reviewNames: ["Paul Capelle", "Reka P"],
    related: ["us-marriage", "us-divorce", "us-passport"],
  },

  // 2. Certificado de matrimonio ----------------------------------------------
  {
    id: "us-marriage",
    short: "Spanish marriage certificate",
    unit: "certificate",
    metaTitle: "Spanish Marriage Certificate Translation for USCIS",
    metaDescription:
      "Certified English translation of a Spanish marriage certificate for USCIS by a sworn translator in Spain. USD price, PDF same day (up to 10 pages).",
    h1: "Certified translation of a Spanish marriage certificate for USCIS",
    lead:
      "For a spousal petition (I-130), an adjustment of status (I-485) or a consular visa, USCIS needs your Spanish marriage certificate (<em>certificación literal de matrimonio</em>) in English, complete, with the translator's signed certification under 8 CFR § 103.2(b)(3). I am Elena Peñaranda Ortega, sworn translator appointed by the Spanish Ministry of Foreign Affairs in 2009 (no. 7310). I translate the whole record, property regime and marginal notes included, and send you the signed PDF the same day (up to 10 pages).",
    image: {
      src: "/fotos/foto-firma.jpg",
      alt: "Signing and stamping the translation of a Spanish marriage certificate",
    },
    whatsapp: wa(
      "Hi Elena, I need a certified translation of a Spanish marriage certificate for USCIS. Which form are you filing? (I-130, I-485, DS-260…)"
    ),
    whatsappLabel: "Request a USCIS translation",
    serviceName: "Certified translation of a Spanish marriage certificate for USCIS",
    tableExtra: "including the property-regime clause and any divorce note",
    sections: [
      {
        id: "uscis",
        title: "What USCIS requires for a Spanish marriage certificate",
        body: [
          "The marriage certificate is the core evidence in a spousal case. USCIS wants the civil record issued by the registry, not the church certificate, and it wants it in full: in Spain, the <em>certificación literal de matrimonio</em> from the <em>Registro Civil</em> or the electronic certificate from the Ministry of Justice portal.",
          `Under 8 CFR § 103.2(b)(3) it must come with a <strong>complete English translation</strong> and the translator's <strong>certification</strong> of accuracy and competence. If either spouse was married before, USCIS also wants proof that the earlier marriage ended, so I often translate the certificate together with a ${link("us-divorce", "Spanish divorce decree")} and the couple's ${link("us-birth", "birth certificates")} in one order.`,
        ],
      },
      {
        id: "document",
        title: "What a Spanish marriage certificate contains, and what I translate",
        body: [
          "A literal Spanish marriage record is more than names and a date:",
          {
            list: [
              "<strong>Registry location</strong> (<em>Registro Civil de…</em>, <em>Tomo</em>, <em>Página</em>) or the DICIREG record code.",
              "<strong>Both spouses' full names with two surnames</strong>, birth details, parents and prior marital status.",
              "<strong>Form of marriage</strong>: civil before a judge, mayor or registrar, or religious and later registered.",
              "<strong>Matrimonial property regime</strong> (<em>sociedad de gananciales</em>, <em>separación de bienes</em>), which has no direct US equivalent and needs an explanatory rendering.",
              "<strong>Marginal notes</strong>: separation, divorce, annulment or a change of regime by <em>capitulaciones matrimoniales</em>.",
              "Issuing officer, date, registry stamp, electronic signature or CSV code and, if present, the Hague apostille.",
            ],
          },
          "Older couples often hold a <em>Libro de Familia</em>, the family book Spain stopped issuing in 2021. USCIS treats it as secondary evidence; I can translate it, but request the literal certificate too.",
        ],
      },
      {
        id: "why",
        title: "Why a Spanish sworn translator for a Spanish marriage record",
        body: [
          "Any competent translator may sign a USCIS certification. The difference is inside the document, where generalists mishandle Spanish legal concepts:",
          {
            list: [
              "<strong>Property regimes</strong>: rendering <em>sociedad de gananciales</em> as \"joint property\", or omitting it, misrepresents the legal effect of the marriage.",
              "<strong>Officiant titles</strong>: <em>Juez de Paz</em>, <em>Encargado del Registro Civil</em>, <em>Alcalde</em>, <em>Párroco</em>.",
              "<strong>Abbreviations</strong>: <em>D./D.ª</em>, <em>Fol.</em>, <em>Sec. 2.ª</em>, <em>art.</em>, <em>CC</em>, <em>LRC</em>.",
              "<strong>Marginal notes</strong> recording a divorce are exactly what the officer checks when a previous marriage exists; they cannot be skipped.",
            ],
          },
          `Since ${SINCE} I have handled these documents as sworn translator no. ${MAEC_NUMBER}. USCIS does not require that appointment; it is why the translation is right the first time.`,
        ],
      },
    ],
    faq: [
      {
        q: "Is the church marriage certificate enough for USCIS?",
        a: "No. USCIS wants the civil registration: the certificación literal de matrimonio from the Registro Civil. A religious ceremony is valid once registered, and the civil certificate proves it.",
      },
      {
        q: "What is the régimen económico matrimonial and why does it matter?",
        a: "The property regime governing the spouses' assets (community property, separation or participation). It appears on most Spanish marriage certificates and must be translated.",
      },
      {
        q: "One of us was married before. What else should I translate?",
        a: "Proof that every previous marriage ended: a divorce decree with its finality statement, an annulment or a death certificate. I translate them together with one deadline.",
      },
      FAQ_SHARED.apostille,
      FAQ_SHARED.notary,
      FAQ_SHARED.paper,
    ],
    reviewNames: ["Emilia Crawley", "Matt Marson"],
    related: ["us-divorce", "us-birth", "us-passport"],
  },

  // 3. Sentencia de divorcio ---------------------------------------------------
  {
    id: "us-divorce",
    short: "Spanish divorce decree",
    unit: "decree",
    quoteNote:
      "a Spanish divorce decree runs from two pages to twenty depending on the settlement attached, so I price it once I see it.",
    metaTitle: "Spanish Divorce Decree Translation for USCIS",
    metaDescription:
      "Certified English translation of a Spanish divorce decree (sentencia de divorcio) for USCIS by a sworn translator in Spain. PDF same day (up to 10 pages).",
    h1: "Certified translation of a Spanish divorce decree for USCIS",
    lead:
      "When you or your spouse were previously married in Spain, USCIS requires proof that the marriage legally ended: the Spanish divorce decree (<em>sentencia de divorcio</em>), or the notarial deed or court decree in uncontested cases, translated in full with the translator's certification under 8 CFR § 103.2(b)(3). I am Elena Peñaranda Ortega, sworn translator appointed by the Spanish Ministry of Foreign Affairs in 2009 (no. 7310), and I deliver the signed PDF, finality statement included, the same day (up to 10 pages).",
    image: {
      src: "/fotos/escritorio-documentos.jpg",
      alt: "Spanish court documents on a desk ready for certified translation",
    },
    whatsapp: wa(
      "Hi Elena, I need a certified translation of a Spanish divorce decree for USCIS. How many pages does it have, and do you need the settlement agreement translated too?"
    ),
    whatsappLabel: "Request a USCIS translation",
    serviceName: "Certified translation of a Spanish divorce decree for USCIS",
    tableExtra: "including the ruling (FALLO) and the finality statement",
    sections: [
      {
        id: "uscis",
        title: "What USCIS requires to prove a Spanish divorce",
        body: [
          "USCIS must see that every previous marriage ended before the current one. For a Spanish divorce the evidence is the court judgment (<em>sentencia</em>) or, for uncontested divorces since 2015, the court clerk's decree or the notarial deed (<em>escritura de divorcio</em>). The document must be <strong>final</strong>, which Spain shows with a finality statement (<em>firmeza</em>) added by the court.",
          `8 CFR § 103.2(b)(3) requires a <strong>complete translation</strong> and the translator's <strong>signed certification</strong>. For a decree, \"complete\" is what matters: officers look for the parties, the court, the case number, the operative ruling (<em>FALLO</em>) and the finality statement. Translating only the first and last pages is a common cause of requests for evidence. The former ${link("us-marriage", "marriage certificate")} with the divorce noted in the margin is useful supporting evidence.`,
        ],
      },
      {
        id: "document",
        title: "What a Spanish divorce decree contains, and what I translate",
        body: [
          "A Spanish <em>sentencia de divorcio</em> follows a fixed structure, which I keep so the officer can navigate it:",
          {
            list: [
              "<strong>Heading</strong>: court (<em>Juzgado de Primera Instancia n.º…</em>), judgment and case numbers, judge, parties and their <em>Procurador</em> and <em>Letrado</em>.",
              "<strong>Facts</strong> (<em>Antecedentes de hecho</em>) and <strong>legal grounds</strong> (<em>Fundamentos de derecho</em>), citing the Civil Code and the Civil Procedure Act.",
              "<strong>Ruling</strong> (<em>FALLO</em>): dissolution, custody, child support, use of the family home, <em>pensión compensatoria</em>, costs.",
              "<strong>Settlement agreement</strong> (<em>convenio regulador</em>) in uncontested divorces, approved and attached.",
              "<strong>Finality and authentication</strong>: <em>firmeza</em>, the clerk's certification, court stamps, CSV code and, if present, the apostille from the regional High Court.",
            ],
          },
          "If your case only needs proof of termination, I tell you which pages are enough, so you do not pay to translate twenty pages of settlement terms USCIS will not read.",
        ],
      },
      {
        id: "why",
        title: "Why a Spanish sworn translator for a Spanish court decision",
        body: [
          "Court language is where generic translations fail. A Spanish decree is dense with procedural terms with no literal English counterpart:",
          {
            list: [
              "<strong>Officer titles</strong>: <em>Magistrado-Juez</em>, <em>Letrado de la Administración de Justicia</em>, <em>Procurador</em>, <em>Ministerio Fiscal</em>.",
              "<strong>Procedural terms</strong>: <em>autos</em>, <em>providencia</em>, <em>auto</em>, <em>decreto</em>, <em>firmeza</em>, <em>testimonio</em>, each with a distinct meaning.",
              "<strong>Abbreviations</strong>: <em>Ilmo./Ilma.</em>, <em>art.</em>, <em>CC</em>, <em>LEC</em>, <em>LOPJ</em>, <em>n.º</em>, <em>D./D.ª</em>.",
              "<strong>Family-law concepts</strong>: <em>patria potestad</em> versus <em>guarda y custodia</em>, <em>pensión de alimentos</em> versus <em>pensión compensatoria</em>.",
            ],
          },
          `Since ${SINCE} I have handled these documents as sworn translator no. ${MAEC_NUMBER}. USCIS does not require that appointment; it is why the translation is right the first time.`,
        ],
      },
    ],
    faq: [
      {
        q: "Do I need to translate the whole decree or just the ruling?",
        a: "USCIS requires a complete translation of whatever you submit. A separate settlement agreement may be left out, but every page you file must be translated. I tell you which pages you need once I see the decree.",
      },
      {
        q: "What is the firmeza, and does USCIS need it?",
        a: "The court's statement that the judgment is final. USCIS needs proof the divorce is final, so if your decree lacks it, request a testimonio de firmeza from the court and I translate it too.",
      },
      {
        q: "My divorce was signed before a notary, not a judge. Is that valid for USCIS?",
        a: "Yes. Since 2015 Spanish couples without minor children can divorce by notarial deed or court clerk's decree. Both dissolve the marriage and are accepted once translated and certified.",
      },
      FAQ_SHARED.time,
      FAQ_SHARED.abroad,
      FAQ_SHARED.payment,
    ],
    reviewNames: ["Youssef Zaghloul", "Kevin Greenall"],
    related: ["us-marriage", "us-birth", "us-criminal"],
  },

  // 4. Certificado de antecedentes penales -------------------------------------
  {
    id: "us-criminal",
    short: "Spanish criminal record certificate",
    unit: "certificate",
    metaTitle: "Spanish Criminal Record Certificate Translation (USCIS)",
    metaDescription:
      "Certified English translation of a Spanish criminal record certificate (antecedentes penales) for USCIS or NVC. USD price, PDF same day (up to 10 pages).",
    h1: "Certified translation of a Spanish criminal record certificate for USCIS",
    lead:
      "The Spanish criminal record certificate (<em>certificado de antecedentes penales</em>), issued by the Ministry of Justice, is the police certificate US authorities ask Spanish residents for: the National Visa Center before a consular interview, USCIS in waiver and some adjustment cases, licensing boards and employers. It must come with a complete English translation and the translator's certification under 8 CFR § 103.2(b)(3). I am Elena Peñaranda Ortega, sworn translator appointed by the Spanish Ministry of Foreign Affairs in 2009 (no. 7310). I translate the certificate, its verification code and its apostille, and deliver a signed PDF the same day (up to 10 pages).",
    image: {
      src: "/fotos/expediente-documentos.jpg",
      alt: "Official Spanish certificates being checked before translation",
    },
    whatsapp: wa(
      "Hi Elena, I need a certified translation of a Spanish criminal record certificate (antecedentes penales) for a US procedure. Is it for USCIS, the NVC or a licensing board?"
    ),
    whatsappLabel: "Request a USCIS translation",
    serviceName: "Certified translation of a Spanish criminal record certificate for USCIS",
    tableExtra: "including the verification code (CSV) and the e-apostille if you obtained one",
    sections: [
      {
        id: "uscis",
        title: "When US authorities ask for a Spanish police certificate",
        body: [
          "The Department of State requires a police certificate from every country where an immigrant-visa applicant has lived for 12 months or more since age 16, and the National Visa Center asks for it before the interview (DS-260). USCIS requests it in certain adjustment, waiver (I-601, I-212) and naturalisation situations. State licensing boards and adoption agencies ask for it too.",
          "In every case the rule is the same: a <strong>full English translation</strong> and the translator's <strong>signed certification</strong> of accuracy and competence. The certificate is one page, but every word carries legal weight, starting with the standard phrase stating that <em>no constan antecedentes penales</em>.",
        ],
      },
      {
        id: "document",
        title: "What the Spanish certificate contains, and what I translate",
        body: [
          "The current certificate is issued electronically by the <em>Ministerio de Justicia</em> (<em>Registro Central de Penados</em>) or in person at a Ministry office. It contains:",
          {
            list: [
              "<strong>Holder's identification</strong>: full name with both surnames, parents' names, date and place of birth, nationality and DNI, NIE or passport number.",
              "<strong>Result</strong>: either the statement that no criminal records appear, or a list of convictions with court, offence, sentence and dates.",
              "<strong>Issuing data</strong>: date, official's position, electronic signature block and the <strong>secure verification code (CSV)</strong> that lets any authority check the document online.",
              "<strong>Validity note</strong>: three months in Spain; US agencies apply their own limits.",
              "The <strong>Hague apostille</strong>, if requested, issued electronically by the Ministry of Justice as a separate page with its own code.",
            ],
          },
          "I translate all of it, legal references and data-protection notice included, so the translation is complete in the sense USCIS means.",
        ],
      },
      {
        id: "why",
        title: "Why a Spanish sworn translator for this certificate",
        body: [
          "A police certificate is short, which tempts people to use a generic service. It is also where a wrong word matters most:",
          {
            list: [
              "<strong>The negative statement</strong> (<em>no constan antecedentes penales</em>) must be rendered precisely; \"no records found\" and \"no criminal convictions are recorded\" are not interchangeable to a consular officer.",
              "<strong>Criminal-law terms</strong>: <em>delito</em>, <em>delito leve</em>, <em>pena</em>, <em>cancelación de antecedentes</em>, <em>sentencia firme</em>, <em>Juzgado de lo Penal</em>.",
              "<strong>Identifiers</strong>: surnames, DNI or NIE number and parents' names must match your file letter for letter.",
              "<strong>Abbreviations</strong>: <em>MJU</em>, <em>RCP</em>, <em>CSV</em>, <em>art.</em>, <em>CP</em>, <em>LO</em>, <em>D./D.ª</em>, <em>n.º</em>.",
            ],
          },
          `Since ${SINCE} I have handled these documents as sworn translator no. ${MAEC_NUMBER}. USCIS does not require that appointment; it is why the translation is right the first time.`,
        ],
      },
    ],
    faq: [
      {
        q: "Does USCIS or the NVC require an apostille on the certificate?",
        a: "Not generally for US immigration, though some licensing boards and employers ask for it. If you have one, I translate it; if a body requires it, request the e-apostille from the Spanish Ministry of Justice first.",
      },
      {
        q: "How long is the Spanish certificate valid for US purposes?",
        a: "Spain treats it as valid for three months. The NVC and USCIS generally accept police certificates issued within two years if you have not returned to Spain since; check your case instructions.",
      },
      {
        q: "I have an old paper certificate from years ago. Can you translate it?",
        a: "Yes, stamps and handwritten signature included. US authorities may ask for a recent one, which you can request online or through a Spanish consulate.",
      },
      FAQ_SHARED.notary,
      FAQ_SHARED.time,
      FAQ_SHARED.payment,
    ],
    reviewNames: ["Casa Walsh", "Paul Capelle"],
    related: ["us-passport", "us-birth", "us-degree"],
  },

  // 5. Título universitario para WES ---------------------------------------------
  {
    id: "us-degree",
    short: "Spanish university degree",
    unit: "degree certificate (1 page)",
    metaTitle: "Spanish Degree Translation for WES Credential Evaluation",
    metaDescription:
      "Certified word-for-word English translation of a Spanish degree and transcript for WES, ECE and US universities, by a sworn translator in Spain. USD price.",
    h1: "Certified translation of a Spanish university degree for WES and US credential evaluation",
    lead:
      "World Education Services (WES) and the other US credential evaluators require a complete, word-for-word English translation of every document not issued in English, with the translator's signed certification, before they evaluate a Spanish degree. The same translation serves USCIS when the degree is evidence in an H-1B, EB-2 or EB-3 petition (8 CFR § 103.2(b)(3)). I am Elena Peñaranda Ortega, sworn translator appointed by the Spanish Ministry of Foreign Affairs in 2009 (no. 7310). I translate Spanish degrees literally, without converting grades, and deliver a signed PDF the same day (up to 10 pages).",
    image: {
      src: "/fotos/estudiante-portatil.jpg",
      alt: "Graduate preparing a Spanish degree and transcript for a credential evaluation",
    },
    whatsapp: wa(
      "Hi Elena, I need a certified translation of my Spanish university degree and transcript for WES / a US evaluation. Which documents do you need me to send?"
    ),
    whatsappLabel: "Request a WES translation",
    serviceName: "Certified translation of a Spanish university degree for WES credential evaluation",
    tableExtra: "with grades, credits and qualification names kept exactly as in the original",
    sections: [
      {
        id: "uscis",
        title: "What WES, ECE and USCIS require for a Spanish degree",
        body: [
          "WES, Educational Credential Evaluators (ECE) and the other NACES members each publish a required-documents list for Spain. What they share is the translation rule: <strong>a precise, word-for-word English translation</strong> of each document not in English, submitted with the originals so the evaluator can compare them side by side.",
          `Before USCIS, in an H-1B, National Interest Waiver, EB-2 or EB-3 case, 8 CFR § 103.2(b)(3) applies: <strong>complete translation plus certification</strong>. One translation serves both. Degrees also appear in most <a href="${USA_PATH}">Spain-to-US relocation</a> files.`,
        ],
      },
      {
        id: "document",
        title: "Which Spanish academic documents I translate for an evaluation",
        body: [
          {
            list: [
              "<strong>The degree certificate</strong> (<em>título universitario oficial</em>), issued in the name of the King and signed by the Rector. Older degrees are <em>Licenciado</em>, <em>Diplomado</em>, <em>Ingeniero</em>; post-Bologna ones are <em>Grado</em>, <em>Máster</em>, <em>Doctor</em>.",
              "<strong>The provisional certificate</strong> (<em>certificado supletorio del título</em>) universities issue while the diploma is printed, which evaluators accept.",
              "<strong>The transcript</strong> (<em>certificación académica personal</em>): every subject, its credits (<em>LRU</em> or <em>ECTS</em>), the sitting (<em>convocatoria</em>), the 0-10 grade and its label: <em>Matrícula de Honor</em>, <em>Sobresaliente</em>, <em>Notable</em>, <em>Aprobado</em>, <em>Suspenso</em>.",
              "<strong>The Diploma Supplement</strong> (<em>Suplemento Europeo al Título</em>), whose Spanish sections still need translation.",
              "<strong>Seals and signatures</strong> of the registrar (<em>Secretario General</em>) and, if obtained, the Hague apostille.",
            ],
          },
          "I translate word for word. I do not convert a 7.5 into a GPA, rename a <em>Licenciatura</em> as a master's degree or omit failed attempts: an altered translation is the fastest way to a rejected evaluation.",
        ],
      },
      {
        id: "why",
        title: "Why a Spanish sworn translator for a Spanish degree",
        body: [
          "Spanish academic documents are a specialised genre. Translators who do not work with them produce the two errors evaluators complain about most, invented equivalents and missing details:",
          {
            list: [
              "<strong>Qualification names</strong> kept in Spanish with a literal gloss (<em>Licenciado en Derecho</em>, <em>Graduado en Enfermería</em>), never replaced with a US title.",
              "<strong>The grading scale</strong>, the <em>convocatoria</em> system, credit types (<em>troncal</em>, <em>obligatoria</em>, <em>optativa</em>) and transferred credits (<em>reconocidos</em>, <em>adaptados</em>), rendered consistently across the whole transcript.",
              "<strong>Institutional wording</strong>: <em>Rector Magnífico</em>, <em>Secretario General</em>, <em>plan de estudios</em>, <em>Real Decreto</em>.",
              "<strong>Abbreviations</strong>: <em>ECTS</em>, <em>LRU</em>, <em>MH</em>, <em>SB</em>, <em>NT</em>, <em>AP</em>, <em>NP</em>, <em>Conv.</em>, <em>R.D.</em>",
            ],
          },
          `Since ${SINCE} I have handled these documents as sworn translator no. ${MAEC_NUMBER}. WES does not require that appointment; it is why the translation is right the first time.`,
        ],
      },
    ],
    faq: [
      {
        q: "Does WES accept translations from a translator in Spain?",
        a: "Yes. WES and the other NACES evaluators require a word-for-word English translation submitted with the originals and do not restrict where the translator is based.",
      },
      {
        q: "Will you convert my Spanish grades to a US GPA?",
        a: "No. The translation reproduces your grades, credits and qualification names exactly; the evaluator converts them. A translation with US equivalents is treated as altered.",
      },
      {
        q: "Which documents should I send for a WES evaluation?",
        a: "Check your WES list for Spain, because some records must come directly from the university. For the translation, send me the degree (or provisional certificate), the full transcript and the Diploma Supplement if you have it.",
      },
      {
        q: "How much does the degree and the transcript cost in dollars?",
        a: "The single-page degree has the fixed price shown above. The transcript depends on its length, so I quote it in US dollars within 2 hours as a fixed price.",
      },
      FAQ_SHARED.time,
      FAQ_SHARED.payment,
    ],
    reviewNames: ["Reka P", "Matt Marson"],
    related: ["us-criminal", "us-passport", "us-birth"],
  },

  // 6. Pasaporte / DNI ---------------------------------------------------------------
  {
    id: "us-passport",
    short: "Spanish passport or DNI",
    unit: "document",
    quoteNote:
      "an ID document is usually one or two pages, but passports with visas and stamps vary, so I price it once I see what you need.",
    metaTitle: "Spanish Passport & DNI Translation for USCIS",
    metaDescription:
      "Certified English translation of a Spanish passport, DNI or NIE card for USCIS by a sworn translator in Spain. Quote in 2h, PDF same day (up to 10 pages).",
    h1: "Certified translation of a Spanish passport or DNI for USCIS",
    lead:
      "USCIS asks for a copy of your passport in most applications, and sometimes for your Spanish identity card (<em>DNI</em>) or foreigner's card (<em>TIE</em>). The Spanish passport carries English captions, but its stamps, visas and observations, and the DNI itself, are in Spanish only, and anything in Spanish you submit needs a complete English translation and the translator's certification under 8 CFR § 103.2(b)(3). I am Elena Peñaranda Ortega, sworn translator appointed by the Spanish Ministry of Foreign Affairs in 2009 (no. 7310). I tell you honestly whether a translation is needed and deliver a signed PDF the same day (up to 10 pages).",
    image: {
      src: "/fotos/pasaporte-eeuu.jpg",
      alt: "Passport and identity documents prepared for a US immigration filing",
    },
    whatsapp: wa(
      "Hi Elena, I need a certified translation of a Spanish passport / DNI for USCIS. Which pages do you need, and do I actually need to translate the passport?"
    ),
    whatsappLabel: "Request a USCIS translation",
    serviceName: "Certified translation of a Spanish passport or DNI for USCIS",
    tableExtra: "including entry and exit stamps and visas where relevant",
    sections: [
      {
        id: "uscis",
        title: "When USCIS needs a translation of a Spanish passport or DNI",
        body: [
          "The honest answer first: not every Spanish ID needs a translation. The passport's biographic page has captions in Spanish, English and French. A translation becomes necessary for <strong>entry and exit stamps</strong> used to prove travel history or lawful entry (I-485, I-751, N-400), <strong>visas and observations</strong>, <strong>expired passports</strong> submitted as evidence of identity over time, and the <strong>DNI</strong> or <strong>TIE</strong>, both Spanish only.",
          `Once a document is in Spanish, the rule is the usual one: a <strong>full English translation</strong> and the translator's <strong>certification</strong> (8 CFR § 103.2(b)(3)). I tell you which pages carry Spanish text so you only pay for those. They often go in the same order as a ${link("us-birth", "birth certificate")} or a ${link("us-criminal", "criminal record certificate")}.`,
        ],
      },
      {
        id: "document",
        title: "What Spanish identity documents contain, and what I translate",
        body: [
          {
            list: [
              "<strong>Passport</strong>: biographic page, observations page, visas and every entry and exit stamp with its border post, date and direction.",
              "<strong>DNI</strong>: front with name, surnames, ID number, support number (<em>IDESP</em>) and validity (<em>válido hasta</em>); back with place of birth, parents' names, address and issuing office (<em>equipo</em>).",
              "<strong>TIE / NIE card</strong>: permit type (<em>residencia temporal</em>, <em>larga duración</em>), work authorisation, NIE number and validity.",
              "<strong>Notarised copies</strong> (<em>copia compulsada</em>, notarial <em>testimonio</em>) and their apostille, if any.",
            ],
          },
          "Illegible stamps are marked as illegible and partial dates reproduced as they appear.",
        ],
      },
      {
        id: "why",
        title: "Why a Spanish sworn translator for Spanish ID documents",
        body: [
          "An ID translation looks trivial until an officer compares it with the original. Spanish identity documents have their own conventions:",
          {
            list: [
              "<strong>Two surnames</strong>: Spanish documents print <em>APELLIDOS</em> then <em>NOMBRE</em>; treating the second surname as a middle name creates a discrepancy with the other certificates.",
              "<strong>Identifiers</strong>: DNI number with its check letter, <em>IDESP</em> and passport number transcribed exactly.",
              "<strong>Authorities and codes</strong>: <em>Dirección General de la Policía</em>, <em>Equipo</em> numbers, border posts and the direction of a stamp (<em>entrada</em>/<em>salida</em>).",
              "<strong>Abbreviations</strong>: <em>DNI</em>, <em>NIE</em>, <em>TIE</em>, <em>ESP</em>, <em>D.G.P.</em>, <em>Fdo.</em>, <em>caducidad</em>.",
            ],
          },
          `Since ${SINCE} I have handled these documents as sworn translator no. ${MAEC_NUMBER}. USCIS does not require that appointment; it is why the translation is right the first time.`,
        ],
      },
    ],
    faq: [
      {
        q: "Do I really need to translate my Spanish passport for USCIS?",
        a: "Often not the biographic page, which carries English captions, but yes for stamps, visas, observations and notarised copies. Send me photos and I tell you which pages need translating, free.",
      },
      {
        q: "Does the DNI need a translation?",
        a: "Yes. The Spanish identity card is in Spanish only. If you submit it to USCIS as evidence of identity or address, both sides need a certified translation.",
      },
      {
        q: "Can you translate a notarised copy of my passport?",
        a: "Yes. A copia compulsada or notarial testimonio includes the notary's certification, stamp and sometimes an apostille, all of which are translated.",
      },
      FAQ_SHARED.notary,
      FAQ_SHARED.paper,
      FAQ_SHARED.payment,
    ],
    reviewNames: ["Kevin Greenall", "Emilia Crawley"],
    related: ["us-birth", "us-criminal", "us-marriage"],
  },
];

// ---------------------------------------------------------------------------
// Ensamblado: añade ruta, precio, secciones compartidas, tabla, pasos y
// reseñas a cada documento.
// ---------------------------------------------------------------------------

function pickReviews(names) {
  const all = getPublishableReviews().filter((r) => r.lang === "en");
  const chosen = names.map((n) => all.find((r) => r.name === n)).filter(Boolean);
  if (chosen.length >= 2) return chosen.slice(0, 2);
  // Relleno con otras reseñas en inglés si alguna de las elegidas desaparece.
  const rest = all.filter((r) => !chosen.includes(r));
  return [...chosen, ...rest].slice(0, 2);
}

export const US_DOCS = RAW_DOCS.map((d) => {
  const r = route(d.id);
  const priceEur = priceOf(r.docId);
  const base = {
    ...d,
    locale: "en",
    path: r.en,
    docId: r.docId,
    priceEur,
    priceUsd: toUsd(priceEur),
    serviceType:
      d.id === "us-degree" ? "Certified translation (WES / USCIS)" : "Certified translation (USCIS)",
    crumbParent: { href: USCIS_PATH, label: "Certified translation for USCIS" },
    calculatorHref: CALCULATOR_HREF,
    reviews: pickReviews(d.reviewNames),
    steps: STEPS(d),
    related: d.related.map((id) => ({ href: route(id).en, label: route(id).labelEn })),
  };
  return {
    ...base,
    sections: d.sections,
    table: uscisTable(base),
    cta: {
      title: `Need your ${d.short} translated for ${d.id === "us-degree" ? "WES or USCIS" : "USCIS"}?`,
      text: "Send me a scan on WhatsApp or by email and tell me which form it is for. You will have a fixed price in US dollars and a delivery date within 2 working hours.",
    },
  };
});

export function getUsDocBySlug(path) {
  return US_DOCS.find((d) => d.path === path) || null;
}

export function getUsDocById(id) {
  return US_DOCS.find((d) => d.id === id) || null;
}
