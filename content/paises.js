// content/paises.js
//
// Hub "Traducción jurada por países" (FASE 2B.1). Una tarjeta por país
// con el mismo componente, sin banderas ni mapas: seis países con página
// propia (enlace) y seis con sección en esta misma página (ancla). Las
// autoridades de apostilla/legalización de cada país se han comprobado en
// su fuente oficial, enlazada en cada sección; todo lo que no se ha podido
// confirmar remite al organismo de destino. Sin cifras ni plazos
// administrativos.
const PATH_ES = "/traduccion-jurada-por-paises";
const PATH_EN = "/en/sworn-translation-spain-by-country";

const SRC = {
  hcch: "https://www.hcch.net/en/instruments/conventions/status-table/?cid=41",
  nz: "https://www.govt.nz/browse/passports-citizenship-and-identity/proving-and-protecting-your-identity/use-your-nz-documents-overseas/",
  za: "https://dirco.gov.za/legalisation-services/",
  gi: "https://www.gibraltar.gov.gi/uploads/Civil-Status-and-Registration-Office/APPLICATION-FOR-AN-APOSTILLE.pdf",
  pk: "https://mofa.gov.pk/pakistans-accession-to-apostille-convention",
  ng: "https://www.exteriores.gob.es/Consulados/lagos/es/Paginas/index.aspx",
  ph: "https://www.apostille.gov.ph/",
};

const ext = (href, label) =>
  `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;

export const es = {
  id: "paises",
  locale: "es",
  path: PATH_ES,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Traducción jurada por países",
  metaTitle: "Traducción jurada español-inglés por países",
  metaDescription:
    "Traducción jurada por país: Reino Unido, EE. UU., India, Irlanda, Canadá, Australia, Nueva Zelanda, Sudáfrica, Gibraltar, Pakistán, Nigeria y Filipinas.",
  h1: "Traducción jurada español-inglés para clientes de cualquier país",
  lead:
    "Soy Elena Peñaranda Ortega, traductora jurada de inglés nombrada por el Ministerio de Asuntos Exteriores de España (nº 7310), y trabajo 100 % online con clientes de cualquier país: presupuesto cerrado en menos de 2 horas, pago con tarjeta internacional y PDF firmado digitalmente en 24/48 h. El proceso es el mismo vengas de donde vengas; lo que cambia es qué apostilla o legalización necesita tu documento y qué exige el organismo que lo va a recibir. Aquí tienes una guía por país: seis con página propia y otros seis resumidos más abajo.",
  image: {
    src: "/fotos/paises-documentos.jpg",
    alt: "Documentos y pasaporte sobre un escritorio, listos para traducir",
  },
  whatsapp:
    "https://wa.me/34685891214?text=Hola%20Elena%2C%20escribo%20desde%20fuera%20de%20Espa%C3%B1a%3A%20necesito%20traducci%C3%B3n%20jurada%20de%20mis%20documentos%20%28te%20digo%20mi%20pa%C3%ADs%20y%20el%20tr%C3%A1mite%29",
  whatsappLabel: "Escribir por WhatsApp",
  serviceName: "Traducción jurada español-inglés para clientes internacionales",
  serviceType: "Traducción jurada y certificada español-inglés",
  cardsTitle: "Elige tu país",
  cardsIntro:
    "Los seis primeros tienen su propia guía; los seis siguientes se resumen en esta página. Si el tuyo no aparece, escríbeme: el proceso es el mismo.",
  cardCtaPage: "Ver la guía",
  cardCtaAnchor: "Ver resumen",
  cards: [
    {
      name: "Reino Unido",
      href: "/traduccion-jurada-britanicos-espana",
      text: "Residencia, empadronamiento, vivienda, matrimonio, carné y pensión: guía trámite a trámite para británicos en España.",
    },
    {
      name: "Estados Unidos",
      href: "/traduccion-jurada-estados-unidos",
      text: "Apostilla del Secretary of State, certificado de cobertura de la SSA, traducción certificada para USCIS en el otro sentido.",
    },
    {
      name: "India",
      href: "/traduccion-jurada-india",
      text: "Documentos en inglés con apostilla del MEA para visados de estudios, trabajo, nómada digital y reagrupación.",
    },
    {
      name: "Irlanda",
      href: "/traduccion-jurada-irlanda",
      text: "Documentos irlandeses para España y traducción certificada para Irish Immigration; apostilla del DFA.",
    },
    {
      name: "Canadá",
      href: "/traduccion-jurada-canada",
      text: "Apostilla de Global Affairs Canada desde 2024 y qué pide IRCC a una traducción hecha fuera de Canadá.",
    },
    {
      name: "Australia",
      href: "/traduccion-jurada-australia",
      text: "Apostilla del DFAT y las condiciones de Home Affairs para traducciones hechas fuera de Australia.",
    },
    { name: "Nueva Zelanda", href: "#nueva-zelanda", anchor: true, text: "Apostilla electrónica del Department of Internal Affairs; documentos ya en inglés." },
    { name: "Sudáfrica", href: "#sudafrica", anchor: true, text: "Apostilla de DIRCO o del registrador del High Court; certificados de Home Affairs en inglés." },
    { name: "Gibraltar", href: "#gibraltar", anchor: true, text: "Apostilla de la Civil Status and Registration Office, sin pasar por Londres." },
    { name: "Pakistán", href: "#pakistan", anchor: true, text: "Apostilla del Ministry of Foreign Affairs desde marzo de 2023; certificados en inglés o bilingües." },
    { name: "Nigeria", href: "#nigeria", anchor: true, text: "Fuera del Convenio de La Haya: legalización consular a través de la Embajada de España." },
    { name: "Filipinas", href: "#filipinas", anchor: true, text: "Apostilla del DFA (Office of Consular Affairs) sobre certificados de la PSA, en inglés." },
  ],
  sectionsTitle: "Otros países: resumen",
  sections: [
    {
      id: "nueva-zelanda",
      title: "Nueva Zelanda",
      body: [
        `Recibo consultas de Nueva Zelanda sobre todo por tres motivos: el <a href="/traduccion-jurada-visado-nomada-digital">visado de nómada digital</a>, los estudios en universidades españolas y los matrimonios o la residencia por pareja. En el sentido contrario, españoles que emigran a Nueva Zelanda y necesitan sus títulos, <a href="/traduccion-jurada-certificado-penales">antecedentes penales</a> o certificados civiles en inglés para Immigration New Zealand, un empleador o una universidad.`,
        `Los documentos neozelandeses ya se emiten en inglés, así que los traduzco directamente al español. Nueva Zelanda forma parte del Convenio de La Haya: la apostilla la emite la Authentication Unit del ${ext(SRC.nz, "Department of Internal Affairs")}, que aplica una apostilla electrónica a certificados de nacimiento, matrimonio y defunción, al criminal record check del Ministry of Justice y a los títulos. La apostilla se traduce con el documento. Qué formato de traducción acepta el organismo neozelandés que recibe un documento español no lo puedo garantizar desde aquí: consulta con el organismo de destino y te preparo la traducción con mi declaración firmada y mis datos de contacto.`,
      ],
    },
    {
      id: "sudafrica",
      title: "Sudáfrica",
      body: [
        `Desde Sudáfrica me escriben familias que se instalan en España con hijos en edad escolar, profesionales con contrato y jubilados que compran vivienda. Los documentos habituales son el <a href="/traduccion-jurada-partida-nacimiento">unabridged birth certificate</a>, el <a href="/traduccion-jurada-certificado-matrimonio">certificado de matrimonio</a>, el police clearance certificate del SAPS, los títulos y los extractos bancarios. En el otro sentido, españoles con trámites en Sudáfrica que necesitan sus certificados en inglés.`,
        `Los certificados del Department of Home Affairs y los documentos del SAPS se emiten en inglés, con lo que trabajo sobre ellos sin paso intermedio. Sudáfrica es parte del Convenio de La Haya y tiene dos autoridades competentes para la apostilla: la Legalisation Section de ${ext(SRC.za, "DIRCO")} (Department of International Relations and Cooperation) y el registrador del High Court, que apostilla los documentos firmados ante notario. Cuál de las dos te corresponde depende del documento: confírmalo con ellos antes de enviarme el escaneo completo, apostilla incluida.`,
      ],
    },
    {
      id: "gibraltar",
      title: "Gibraltar",
      body: [
        `Gibraltar está a un paso de la Línea de la Concepción y muchos de sus residentes tienen su vida a los dos lados de la verja: compra de vivienda en el Campo de Gibraltar, matrimonio con ciudadanos españoles, escolarización, herencias y empresas con actividad en las dos jurisdicciones. Los documentos que más traduzco son certificados de nacimiento y matrimonio, <a href="/traduccion-jurada-contrato-escritura">escrituras y poderes</a> notariales, <a href="/traduccion-jurada-certificado-empresa">certificados del registro mercantil</a> y <a href="/traduccion-jurada-testamento-herencia">testamentos</a>.`,
        `Todo se emite en inglés, así que la traducción jurada al español es directa. El Convenio de La Haya se aplica en Gibraltar y la apostilla se obtiene en el propio Peñón, sin enviar nada a Londres: la única autoridad competente es la ${ext(SRC.gi, "Civil Status and Registration Office")} del Gobierno de Gibraltar. Para los documentos españoles que hay que presentar en Gibraltar, los traduzco al inglés con mi firma y sello; si el organismo gibraltareño exige además la apostilla española sobre el original, se pide antes de traducir.`,
      ],
    },
    {
      id: "pakistan",
      title: "Pakistán",
      body: [
        `Desde Pakistán llegan sobre todo expedientes de estudios, de trabajo y de reagrupación familiar para el Consulado de España en Islamabad: certificados de nacimiento y matrimonio de NADRA o de la union council, <a href="/traduccion-jurada-titulo-universitario">títulos</a> y transcripts, police character certificate y cartas de empleador. También traduzco al inglés documentos españoles para administraciones y universidades pakistaníes.`,
        `Pakistán forma parte del Convenio de La Haya desde el 9 de marzo de 2023: sus documentos públicos ya no pasan por la legalización consular, sino por la apostilla que emite el ${ext(SRC.pk, "Ministry of Foreign Affairs")}. Los certificados de NADRA y la mayoría de los títulos se emiten en inglés o en versión bilingüe urdu-inglés, y sobre esa versión trabajo. Si tu documento está solo en urdu, necesita antes una versión inglesa oficial (del propio organismo o de un traductor reconocido en Pakistán) que se apostille junto al original. Confirma con el consulado qué documentos exige apostillados para tu visado.`,
      ],
    },
    {
      id: "nigeria",
      title: "Nigeria",
      body: [
        `Los clientes nigerianos suelen escribirme por visados de estudios y de trabajo, por reagrupación familiar y por matrimonios con residentes en España. Los documentos habituales son el certificado de nacimiento (o la declaration of age), el certificado de matrimonio, el police character certificate, los títulos y el statement of result, además de cartas de empleador y extractos bancarios. Todos se emiten en inglés, así que la traducción jurada al español es directa.`,
        `Nigeria no aparece en la ${ext(SRC.hcch, "tabla de Estados parte del Convenio de La Haya")} a fecha de esta guía, así que sus documentos no se apostillan: se legalizan por vía consular, primero en el Ministerio de Asuntos Exteriores de Nigeria y después en la ${ext(SRC.ng, "representación de España en Nigeria")}. Comprueba el circuito exacto y el estado actual de Nigeria en el Convenio con el consulado antes de empezar, porque la lista de países cambia. Yo traduzco el documento con todos los sellos de legalización, que forman parte de él.`,
      ],
    },
    {
      id: "filipinas",
      title: "Filipinas",
      body: [
        `Desde Filipinas traduzco expedientes para el visado de estudios, para la reagrupación familiar y para la nacionalidad española por residencia, además de documentos de trabajadores del sector sanitario con contrato en España. Lo habitual son los certificados de la Philippine Statistics Authority (nacimiento, matrimonio, CENOMAR), el NBI clearance, los títulos y el transcript of records, y las cartas de empleador. En el otro sentido, documentos españoles para administraciones o universidades filipinas, traducidos al inglés.`,
        `Filipinas forma parte del Convenio de La Haya desde el 14 de mayo de 2019. La apostilla la emite el Department of Foreign Affairs a través de su ${ext(SRC.ph, "Office of Consular Affairs")} (Authentication Division), en Manila o en sus oficinas consulares regionales, y desde 2026 también en formato electrónico para los certificados de la PSA. Estos certificados y el NBI clearance se emiten en inglés, así que trabajo sobre ellos directamente; si un documento está solo en filipino, necesita una versión inglesa oficial antes de la apostilla. Confirma con el consulado qué documentos de tu expediente exige apostillados.`,
      ],
    },
  ],
  closing: {
    title: "¿Tu país no está? Escríbeme: el proceso es el mismo",
    text: "Traduzco del inglés al español y del español al inglés para clientes de cualquier país. Me envías el documento escaneado por WhatsApp o por el formulario, te digo si necesita apostilla o legalización y te doy un presupuesto cerrado en menos de 2 horas laborables.",
  },
  faq: [
    {
      q: "¿Tiene que estar mi documento en inglés para que lo traduzcas?",
      a: "Sí. Traduzco del inglés al español y del español al inglés. Si tu documento está en otro idioma (urdu, filipino, afrikáans, hindi, etc.), necesitas primero una versión inglesa oficial, emitida por el propio organismo o por un traductor reconocido en tu país, y esa versión es la que se apostilla y traduzco.",
    },
    {
      q: "¿La apostilla se traduce?",
      a: "Sí. La apostilla forma parte del documento y se traduce con él. Por eso conviene apostillar antes de traducir: si me envías el documento sin apostilla y luego la añades, la traducción tendría que completarse.",
    },
    {
      q: "¿Mi país no aparece en esta página?",
      a: "Escríbeme igualmente. El proceso es el mismo para cualquier país: documento escaneado, presupuesto cerrado, pago con tarjeta y PDF firmado en 24/48 h. Lo único que cambia es la apostilla o la legalización, que te indico según tu país y tu trámite.",
    },
    {
      q: "¿Sirve tu traducción en mi país si presento un documento español?",
      a: "Traduzco al inglés con mi firma, mi sello y una declaración de exactitud con mis datos de contacto, que es lo que piden la mayoría de organismos anglófonos a una traducción hecha fuera de su país. Como cada organismo tiene sus normas, confírmalas con él antes de encargar y adapto la certificación a lo que exija.",
    },
    {
      q: "¿Puedo pagar desde mi país?",
      a: "Sí. El pago es con tarjeta internacional (Visa, Mastercard o American Express) a través de Stripe, en euros. No hace falta cuenta bancaria española.",
    },
  ],
  related: [
    { href: "/traduccion-jurada-visado-nomada-digital", label: "Visado de nómada digital" },
    { href: "/traduccion-certificada-uscis", label: "Traducción certificada para USCIS" },
    { href: "/traduccion-jurada-partida-nacimiento", label: "Partida de nacimiento" },
    { href: "/traduccion-jurada-certificado-penales", label: "Certificado de antecedentes penales" },
    { href: "/traduccion-jurada-titulo-universitario", label: "Título universitario" },
    { href: "/traduccion-jurada-urgente-grandes-volumenes", label: "Urgentes y grandes volúmenes" },
  ],
  otherLangLabel: "Sworn translation for clients in any country",
};

export const en = {
  id: "paises",
  locale: "en",
  path: PATH_EN,
  alternates: { es: PATH_ES, en: PATH_EN },
  crumb: "Sworn translation by country",
  metaTitle: "Sworn Spanish-English translation by country",
  metaDescription:
    "Sworn translation by country: UK, USA, India, Ireland, Canada, Australia, New Zealand, South Africa, Gibraltar, Pakistan, Nigeria and the Philippines.",
  h1: "Sworn Spanish-English translation for clients in any country",
  lead:
    "I am Elena Peñaranda Ortega, a sworn translator of English appointed by Spain's Ministry of Foreign Affairs (no. 7310), and I work fully online with clients in any country: a fixed quote in under 2 hours, payment by international card and a digitally signed PDF in 24/48 hours. The process is the same wherever you are; what changes is which apostille or legalisation your document needs and what the receiving body requires. Here is a guide by country: six with their own page and six more summarised below.",
  image: {
    src: "/fotos/paises-documentos.jpg",
    alt: "Documents and a passport on a desk, ready for translation",
  },
  whatsapp:
    "https://wa.me/34685891214?text=Hi%20Elena%2C%20I%27m%20writing%20from%20outside%20Spain%3A%20I%20need%20a%20sworn%20translation%20of%20my%20documents%20%28I%27ll%20tell%20you%20my%20country%20and%20the%20procedure%29",
  whatsappLabel: "Message me on WhatsApp",
  serviceName: "Sworn Spanish-English translation for international clients",
  serviceType: "Sworn and certified Spanish-English translation",
  cardsTitle: "Choose your country",
  cardsIntro:
    "The first six have their own guide; the next six are summarised on this page. If yours is not here, write to me: the process is the same.",
  cardCtaPage: "Read the guide",
  cardCtaAnchor: "Read the summary",
  cards: [
    {
      name: "United Kingdom",
      href: "/en/sworn-translation-british-residents-spain",
      text: "Residency, padrón, property, marriage, driving licence and pension: a procedure-by-procedure guide for British residents in Spain.",
    },
    {
      name: "United States",
      href: "/en/sworn-translation-usa-spain",
      text: "Secretary of State apostille, SSA certificate of coverage, and certified translation for USCIS in the other direction.",
    },
    {
      name: "India",
      href: "/en/sworn-translation-india-spain",
      text: "Documents in English with the MEA apostille for student, work, digital nomad and family visas.",
    },
    {
      name: "Ireland",
      href: "/en/sworn-translation-ireland-spain",
      text: "Irish documents for Spain and certified translation for Irish Immigration; DFA apostille.",
    },
    {
      name: "Canada",
      href: "/en/sworn-translation-canada-spain",
      text: "Global Affairs Canada apostille since 2024 and what IRCC asks of a translation done outside Canada.",
    },
    {
      name: "Australia",
      href: "/en/sworn-translation-australia-spain",
      text: "DFAT apostille and the Home Affairs conditions for translations done outside Australia.",
    },
    { name: "New Zealand", href: "#new-zealand", anchor: true, text: "e-Apostille from the Department of Internal Affairs; documents already in English." },
    { name: "South Africa", href: "#south-africa", anchor: true, text: "Apostille from DIRCO or the High Court registrar; Home Affairs certificates in English." },
    { name: "Gibraltar", href: "#gibraltar", anchor: true, text: "Apostille from the Civil Status and Registration Office, without going through London." },
    { name: "Pakistan", href: "#pakistan", anchor: true, text: "Apostille from the Ministry of Foreign Affairs since March 2023; certificates in English or bilingual." },
    { name: "Nigeria", href: "#nigeria", anchor: true, text: "Outside the Hague Convention: consular legalisation through the Spanish Embassy." },
    { name: "Philippines", href: "#philippines", anchor: true, text: "DFA apostille (Office of Consular Affairs) on PSA certificates, in English." },
  ],
  sectionsTitle: "Other countries: a summary",
  sections: [
    {
      id: "new-zealand",
      title: "New Zealand",
      body: [
        `Enquiries from New Zealand mostly come for three reasons: the <a href="/en/sworn-translation-spain-digital-nomad-visa">digital nomad visa</a>, studies at Spanish universities, and marriage or residency as a partner. In the other direction, Spaniards moving to New Zealand who need their degrees, <a href="/traduccion-jurada-certificado-penales">criminal record certificates</a> or civil certificates in English for Immigration New Zealand, an employer or a university.`,
        `New Zealand documents are issued in English, so I translate them straight into Spanish. New Zealand is party to the Hague Convention: apostilles are issued by the Authentication Unit of the ${ext(SRC.nz, "Department of Internal Affairs")}, which applies an e-Apostille to birth, marriage and death certificates, to the Ministry of Justice criminal record check and to qualifications. The apostille is translated with the document. I cannot guarantee from here which translation format a New Zealand body will accept for a Spanish document: check with the receiving body, and I will prepare the translation with my signed statement and contact details.`,
      ],
    },
    {
      id: "south-africa",
      title: "South Africa",
      body: [
        `From South Africa I hear from families settling in Spain with school-age children, professionals with a contract and retirees buying property. The usual documents are the unabridged birth certificate, the marriage certificate, the SAPS police clearance certificate, degrees and bank statements. In the other direction, Spaniards with procedures in South Africa who need their certificates in English.`,
        `Department of Home Affairs certificates and SAPS documents are issued in English, so I work on them with no intermediate step. South Africa is party to the Hague Convention and has two competent authorities for apostilles: the Legalisation Section of ${ext(SRC.za, "DIRCO")} (Department of International Relations and Cooperation) and the registrar of the High Court, which apostilles documents signed before a notary. Which one applies depends on the document: confirm it with them before sending me the full scan, apostille included.`,
      ],
    },
    {
      id: "gibraltar",
      title: "Gibraltar",
      body: [
        `Gibraltar is a step away from La Línea de la Concepción, and many residents live on both sides of the border: buying property in the Campo de Gibraltar, marrying Spanish citizens, schooling, inheritances and companies active in both jurisdictions. The documents I translate most are birth and marriage certificates, notarial deeds and powers of attorney, companies registry certificates and wills.`,
        `Everything is issued in English, so the sworn translation into Spanish is direct. The Hague Convention applies in Gibraltar and the apostille is obtained on the Rock itself, without sending anything to London: the only competent authority is the ${ext(SRC.gi, "Civil Status and Registration Office")} of the Government of Gibraltar. For Spanish documents to be presented in Gibraltar, I translate them into English with my signature and seal; if the Gibraltar body also requires the Spanish apostille on the original, it is obtained before translating.`,
      ],
    },
    {
      id: "pakistan",
      title: "Pakistan",
      body: [
        `From Pakistan I mostly receive student, work and family reunification files for the Spanish Consulate in Islamabad: NADRA or union council birth and marriage certificates, degrees and transcripts, the police character certificate and employer letters. I also translate Spanish documents into English for Pakistani authorities and universities.`,
        `Pakistan has been party to the Hague Convention since 9 March 2023: its public documents no longer go through consular legalisation but receive an apostille issued by the ${ext(SRC.pk, "Ministry of Foreign Affairs")}. NADRA certificates and most degrees are issued in English or in a bilingual Urdu-English version, and that is the version I work on. If your document is only in Urdu, it first needs an official English version (from the issuing body or a translator recognised in Pakistan) that is apostilled together with the original. Confirm with the consulate which documents it requires apostilled for your visa.`,
      ],
    },
    {
      id: "nigeria",
      title: "Nigeria",
      body: [
        `Nigerian clients usually write to me about student and work visas, family reunification and marriages with residents of Spain. The usual documents are the birth certificate (or declaration of age), the marriage certificate, the police character certificate, degrees and the statement of result, plus employer letters and bank statements. All of them are issued in English, so the sworn translation into Spanish is direct.`,
        `Nigeria does not appear in the ${ext(SRC.hcch, "table of States party to the Hague Convention")} as of this guide, so its documents are not apostilled: they are legalised through consular channels, first at Nigeria's Ministry of Foreign Affairs and then at the ${ext(SRC.ng, "Spanish representation in Nigeria")}. Check the exact circuit and Nigeria's current status under the Convention with the consulate before you start, because the list of countries changes. I translate the document with all its legalisation stamps, which are part of it.`,
      ],
    },
    {
      id: "philippines",
      title: "Philippines",
      body: [
        `From the Philippines I translate files for the student visa, for family reunification and for Spanish nationality by residence, as well as documents of healthcare workers with a contract in Spain. The usual ones are Philippine Statistics Authority certificates (birth, marriage, CENOMAR), the NBI clearance, degrees and the transcript of records, and employer letters. In the other direction, Spanish documents for Philippine authorities or universities, translated into English.`,
        `The Philippines has been party to the Hague Convention since 14 May 2019. Apostilles are issued by the Department of Foreign Affairs through its ${ext(SRC.ph, "Office of Consular Affairs")} (Authentication Division), in Manila or at its regional consular offices, and since 2026 also in electronic form for PSA certificates. Those certificates and the NBI clearance are issued in English, so I work on them directly; if a document is only in Filipino, it needs an official English version before the apostille. Confirm with the consulate which documents in your file it requires apostilled.`,
      ],
    },
  ],
  closing: {
    title: "Your country is not here? Write to me: the process is the same",
    text: "I translate from English into Spanish and from Spanish into English for clients in any country. Send me the scanned document by WhatsApp or through the form, I tell you whether it needs an apostille or legalisation, and you get a fixed quote in under 2 working hours.",
  },
  faq: [
    {
      q: "Does my document have to be in English for you to translate it?",
      a: "Yes. I translate from English into Spanish and from Spanish into English. If your document is in another language (Urdu, Filipino, Afrikaans, Hindi, etc.), you first need an official English version, issued by the body itself or by a translator recognised in your country, and that version is the one that is apostilled and that I translate.",
    },
    {
      q: "Is the apostille translated?",
      a: "Yes. The apostille is part of the document and is translated with it. That is why it is best to apostille before translating: if you send me the document without the apostille and add it later, the translation would have to be completed.",
    },
    {
      q: "My country is not on this page?",
      a: "Write to me anyway. The process is the same for any country: scanned document, fixed quote, card payment and a signed PDF in 24/48 hours. The only thing that changes is the apostille or legalisation, which I point out according to your country and your procedure.",
    },
    {
      q: "Will your translation be accepted in my country if I submit a Spanish document?",
      a: "I translate into English with my signature, my seal and a statement of accuracy with my contact details, which is what most English-speaking bodies ask of a translation done outside their country. As each body has its own rules, confirm them before ordering and I adapt the certification to what it requires.",
    },
    {
      q: "Can I pay from my country?",
      a: "Yes. Payment is by international card (Visa, Mastercard or American Express) through Stripe, in euros. No Spanish bank account is needed.",
    },
  ],
  related: [
    { href: "/en/sworn-translation-spain-digital-nomad-visa", label: "Digital nomad visa" },
    { href: "/en/certified-translation-uscis", label: "Certified translation for USCIS" },
    { href: "/traduccion-jurada-partida-nacimiento", label: "Birth certificate (guide in Spanish)" },
    { href: "/traduccion-jurada-certificado-penales", label: "Criminal record certificate (guide in Spanish)" },
    { href: "/traduccion-jurada-titulo-universitario", label: "University degree (guide in Spanish)" },
    { href: "/en/urgent-sworn-translation-large-projects", label: "Urgent and large projects" },
  ],
  otherLangLabel: "Traducción jurada para clientes de cualquier país",
};
