// content/posts.en.js
// English blog posts (/en/blog). Same shape as content/posts.js. Prices
// quoted in recent posts ALWAYS come from content/documents.js
// (eur(id) / MIN_PRICE) so they never drift from the catalogue.
import { DOCUMENTS, MIN_PRICE } from "./documents";

const priceOf = (id) => DOCUMENTS.find((d) => d.id === id)?.price ?? null;
const eur = (id) =>
  priceOf(id) != null ? `€${priceOf(id)}` : "fixed quote within 2 hours";

export const postsEn = [
  {
    slug: "sworn-translation-nie-tie-spain",
    title: "Sworn translation for your NIE/TIE application in Spain: what British citizens need",
    excerpt:
      "Which documents Spanish immigration offices ask for, when the apostille applies, what a sworn translation costs and how fast you can have it — from someone who prepares these files every week.",
    date: "2026-08-27",
    updated: "2026-08-27",
    author: "Elena Peñaranda Ortega",
    tags: ["reino-unido", "extranjeria"],
    readingTime: "5 min",
    image: "/blog/post-nie.jpg",
    alt: "Passport and travel documents — NIE and TIE application paperwork in Spain",
    html: `
      <p>If you're British and settling in Spain, the NIE and the TIE are your first serious encounter with Spanish bureaucracy. The offices are strict about paperwork, and the phrase you'll keep meeting is <strong>"traducción jurada"</strong> — sworn translation. Here's what your file will actually need, based on the applications I prepare every week.</p>

      <h2>Which documents will the extranjería office ask for?</h2>
      <p>It varies by office and by the type of residency you're applying for, but the usual suspects are:</p>
      <ul>
        <li><strong>ACRO Police Certificate</strong> — the UK criminal record check, required for most first-time residency applications.</li>
        <li><strong>Birth certificate</strong> — especially for family applications and children.</li>
        <li><strong>Marriage certificate</strong> — if you're applying as a spouse or family member.</li>
        <li>Occasionally, <strong>proof of income</strong>: pension letters, payslips or HMRC documents.</li>
      </ul>
      <p>Every document issued in English must be presented with a sworn translation into Spanish, signed and stamped by a translator appointed by Spain's Ministry of Foreign Affairs. That's what I do — my accreditation number (7310) is on the Ministry's public register, which is exactly what the immigration officer checks.</p>

      <h2>Do my UK documents need an apostille?</h2>
      <p>For the <strong>ACRO certificate: yes</strong> — immigration offices consistently ask for it. You get it from the FCDO Legalisation Office, and it's worth knowing that the EU regulation that exempts many public documents from apostilles no longer covers UK documents since Brexit. Birth and marriage certificates: it depends on the office, so check your appointment letter — and if in doubt, send it to me and I'll tell you. The order matters: <strong>apostille first, then translation</strong>, because the apostille page gets translated too (at no extra cost when it's part of the same document).</p>

      <h2>How much does it cost and how fast is it?</h2>
      <p>Standard certificates — ACRO, birth, marriage — are translated from <strong>€35 each</strong>, delivered in <strong>24/48 hours</strong> as a digitally signed PDF that's valid for online submission. If your office wants paper, I courier the original anywhere in Spain. For a complete file (say, ACRO + birth certificate + a pension letter), send everything together: you'll get one fixed quote within 2 hours, and the translations come back consistent with each other — same spelling of names, same terminology — which examiners notice.</p>

      <h2>Three mistakes that delay NIE/TIE files</h2>
      <ol>
        <li><strong>Translating before apostilling.</strong> The translation must include the apostille, so get the apostille first.</li>
        <li><strong>Letting the ACRO expire.</strong> Most offices want it less than 3 months old. Book your appointment first, then order the certificate.</li>
        <li><strong>Blurry photos.</strong> A clear scan of every page — stamps and apostille included — saves a full day of back-and-forth.</li>
      </ol>
      <p>
        <a href="https://wa.me/34685891214?text=Hi%20Jurada%20Express,%20I%27m%20applying%20for%20my%20NIE%2FTIE%20and%20need%20sworn%20translations">Send me your document list on WhatsApp</a>
        and I'll confirm what needs translating, the fixed price and the delivery date within 2 working hours. There's also a full
        <a href="/en/sworn-translation-british-residents-spain">guide for British residents in Spain</a>, procedure by procedure.
      </p>
    `,
  },

  {
    slug: "buying-property-in-spain-documents-translation",
    title: "Buying property in Spain: which documents need a sworn translation",
    excerpt:
      "Power of attorney, NIE paperwork, bank documents, the deed itself: what actually needs a sworn translation when you buy a Spanish property, and what the notary handles differently.",
    date: "2026-09-09",
    updated: "2026-09-09",
    author: "Elena Peñaranda Ortega",
    tags: ["reino-unido", "consejos"],
    readingTime: "5 min",
    image: "/blog/post-property.jpg",
    alt: "Handshake between buyer and agent — completing a property purchase in Spain",
    html: `
      <p>Buying a home in Spain involves a notary, a bank, the tax office and sometimes a land registry — and each of them has opinions about paperwork. The good news: far fewer documents need a sworn translation than buyers fear. The trick is knowing which ones do. Here's the honest map, from the purchases I've translated for.</p>

      <h2>What will the notary ask to have translated?</h2>
      <p>The Spanish notary works in Spanish, so any <strong>foreign public document</strong> that forms part of the purchase needs a sworn translation. In practice that usually means:</p>
      <ul>
        <li><strong>Power of attorney (POA)</strong> — if you sign from the UK through a representative, the POA granted before a UK notary needs an <strong>apostille and a sworn translation</strong>. This is the single most common document I translate for property purchases.</li>
        <li><strong>Civil status documents</strong> — occasionally a <a href="/en/sworn-translation-british-residents-spain">marriage certificate</a> is needed to establish the matrimonial property regime.</li>
        <li><strong>Probate documents</strong> — if the purchase (or sale) stems from an inheritance, the UK grant of probate needs apostille + sworn translation.</li>
      </ul>
      <p>The <strong>deed of sale itself (escritura)</strong> is drafted in Spanish by the notary. You don't need a sworn translation of it to buy — though many buyers order an informative translation afterwards to know exactly what they signed, which I'm happy to do as a standard (non-sworn, cheaper) translation.</p>

      <h2>What about the bank and the mortgage?</h2>
      <p>If you're financing with a Spanish bank, they'll assess your UK income: <strong>payslips, employer letters, tax returns, bank statements</strong>. Banks generally require official translations of these — and a sworn translation is exactly that. Send the whole set together: one fixed quote, consistent terminology, and the mortgage adviser gets a tidy file instead of a drip of PDFs.</p>

      <h2>Does everything need an apostille?</h2>
      <p>No — and this is where buyers overspend. The apostille applies to <strong>public documents</strong>: notarised POAs, court documents, civil status certificates. Private documents — bank statements, payslips, reservation contracts between private parties — don't get apostilled; they're simply translated. When someone tells you to "apostille everything", check first: it's often half the cost for the same legal effect.</p>

      <h2>When should you order the translations?</h2>
      <p>The POA is the time-critical one: UK notary → FCDO apostille → sworn translation → Spanish notary, and the chain takes longer than any single step. Start it as soon as completion dates are discussed. Bank documents can go in parallel; certificates keep in mind they're often required recent. Short documents take <strong>24/48 hours</strong>; for a full purchase file you'll get a fixed quote and exact delivery date within 2 hours of sending it.</p>
      <p>
        <a href="https://wa.me/34685891214?text=Hi%20Jurada%20Express,%20I%27m%20buying%20a%20property%20in%20Spain%20and%20need%20sworn%20translations">Tell me where you are in the purchase on WhatsApp</a>
        and I'll tell you exactly which documents need a sworn translation — and which don't, so you don't pay for paperwork nobody will read.
      </p>
    `,
  },
  // ---------------------------------------------------------------------
  // International brief (September-November 2026): 3 EN posts.
  // Source: docs/BRIEF-INTERNACIONAL-2026-09.md (points 0.4, 0.5 and 0.6).
  // No income thresholds, fees or processing times: they change yearly and
  // are referred to the consulate or an immigration lawyer.
  // ---------------------------------------------------------------------
  {
    slug: "spain-digital-nomad-visa-documents-apostille-sworn-translation",
    title: "Spain digital nomad visa documents: which need an apostille and a sworn translation",
    excerpt:
      "The full document list for Spain's digital nomad visa, one by one: which need an apostille, which need a sworn translation into Spanish, and the order to do everything so the consulate does not send the file back.",
    date: "2026-09-24",
    updated: "2026-09-24",
    author: "Elena Peñaranda Ortega",
    tags: ["nomada-digital", "extranjeria", "apostilla"],
    readingTime: "6 min",
    image: "/blog/post-digital-nomad-visa.jpg",
    alt: "Hands checking an official form on a folder of documents for a digital nomad visa file",
    html: `
      <p>Spain's digital nomad visa (the international remote work residence permit created by Law 28/2022) is the file with the most documents I translate. They come from two or three countries, they are issued by public bodies, employers, banks and universities, and almost all of them have to reach the consulate or the UGE in Spanish. This guide goes document by document: which needs an apostille, which needs a <a href="/en/sworn-translation-spain-digital-nomad-visa">sworn translation</a>, and the order in which everything is prepared.</p>

      <h2>Why are so many files refused or sent back?</h2>
      <p>Hardly ever because of the merits of the case. The reasons I see every week are three: a document without an apostille, a plain translation where a sworn one was required, and an incomplete batch that forces you to start again. All three are avoided before anything is submitted, with a review of the list and with a single translator applying the same criteria to the whole file (names, dates and terminology written identically in every document).</p>
      <p>One warning before we go on: income thresholds, fees and processing times are set by the Spanish administration and change every year. You will not find them in this article, on purpose. Confirm them with the consulate, the UGE or an immigration lawyer; I take care of the documents, the apostilles and the translation.</p>

      <h2>Which documents need an apostille and a sworn translation?</h2>
      <ul>
        <li><strong>Criminal record certificate</strong> from the country or countries where you have lived in recent years (FBI or state level in the US, ACRO in the UK, MEA and police in India). <em>Apostille: yes. Sworn translation: yes.</em> It is usually valid for a limited time, so book your appointment first and order the certificate second.</li>
        <li><strong>Employment contract or letter from your foreign employer</strong> confirming position, salary, length of service and express authorisation to work remotely from Spain. If you are self-employed, contracts with foreign clients. <em>Apostille: not usually. Sworn translation: yes.</em></li>
        <li><strong>Company registration certificate</strong> (certificate of incorporation, good standing or equivalent) proving at least one year of activity. <em>Apostille: usually yes. Sworn translation: yes.</em></li>
        <li><strong>University or postgraduate degree</strong>, or letters from previous employers proving three years of experience. <em>Apostille: yes for the degree; letters depend on the consulate. Sworn translation: yes.</em></li>
        <li><strong>Proof of income</strong>: payslips, bank statements, invoices, tax returns. <em>Apostille: no. Sworn translation: yes</em> (recent months are often enough).</li>
        <li><strong>Social security coverage certificate</strong> from your home country (UK A1, US SSA certificate of coverage) or a commitment to register in Spain. <em>Apostille: no. Sworn translation: yes.</em></li>
        <li><strong>Health insurance</strong> with cover in Spain. <em>Sworn translation: yes, if the policy is not in Spanish.</em></li>
        <li><strong>For family members</strong>: marriage or partnership certificate and children's birth certificates. <em>Apostille: yes. Sworn translation: yes.</em></li>
        <li><strong>Passport</strong>: a copy is submitted and it does not usually need translating.</li>
      </ul>

      <h2>Which comes first, the apostille or the translation?</h2>
      <p>Always the apostille. It is a page or a sticker added to the original in the country that issued it, and it is part of the document: it gets translated too. If you send me a certificate without an apostille and the consulate requires one, I tell you before I start so you do not pay twice.</p>

      <h2>How do you send a complete file?</h2>
      <ol>
        <li>Put everything in <strong>one folder</strong> (Drive, Dropbox, WeTransfer or attachments) named with your surname.</li>
        <li>Scan every document in full, apostille and back page included. A sharp phone photo is fine.</li>
        <li>Name the files in order: <em>01-criminal-record.pdf</em>, <em>02-contract.pdf</em>… I return the translations with the same numbering and an index.</li>
        <li>Tell me which consulate you are applying at (or whether you are filing with the UGE) and your appointment date.</li>
      </ol>
      <p>With that I reply within 2 working hours with the review of the list, a fixed price for the batch and a single delivery deadline in writing. Individual documents take 24/48 hours; a complete file is usually ready within a few days. If you are coming from the <a href="/en/sworn-translation-usa-spain">United States</a> or from <a href="/en/sworn-translation-india-spain">India</a>, you have a guide of your own with the particulars of your country.</p>

      <h2>Is the PDF translation accepted by the consulate?</h2>
      <p>For online submission, yes: every translation carries my electronic signature, verifiable in one click, and my stamp as sworn translator no. 7310, which can be checked on the official register of Spain's Ministry of Foreign Affairs. If your consulate insists on paper, I courier the stamped originals to Spain or to your country.</p>
      <p>
        Preparing your file? Send me your list on
        <a href="https://wa.me/34685891214?text=Hi%20Elena%2C%20I%27m%20preparing%20my%20file%20for%20Spain%27s%20digital%20nomad%20visa%20and%20I%27d%20like%20to%20know%20which%20documents%20need%20a%20sworn%20translation">WhatsApp</a>
        and I will tell you what is missing and what needs an apostille, with no obligation.
      </p>
    `,
  },

  {
    slug: "sworn-vs-certified-translation-uscis-spain",
    title: "Sworn vs certified translation: what USCIS requires and what Spain requires",
    excerpt:
      "They are not the same: USCIS requires a certified translation into English with the translator's certification (8 CFR § 103.2(b)(3)) and Spain requires a sworn translation signed and stamped by a Ministry-appointed translator. Which one you need, what each carries and when you need both.",
    date: "2026-10-15",
    updated: "2026-10-15",
    author: "Elena Peñaranda Ortega",
    tags: ["uscis", "validez", "estados-unidos"],
    readingTime: "6 min",
    image: "/blog/post-sworn-vs-certified.jpg",
    alt: "Official certificates stacked on a desk, ready for sworn or certified translation",
    html: `
      <p>Every week I get two similar questions from opposite sides of the Atlantic. From the United States: <em>"Is your sworn translation valid for USCIS?"</em>. From Spain: <em>"I had a certified translation done in New York, will the immigration office accept it?"</em>. The answer to both is that they are different documents, for different authorities, and it pays to know which one you need before ordering anything.</p>

      <h2>What is a sworn translation in Spain?</h2>
      <p>It is a translation signed and stamped by a sworn translator-interpreter appointed by Spain's Ministry of Foreign Affairs, European Union and Cooperation. The appointment has a number (mine is 7310) that any official can check on the Ministry's public register. It carries a certification in Spanish, a signature and a stamp on every page, and it is what the immigration office, the civil registry, universities, notaries and Spanish consulates require for any document that is not in Spanish.</p>

      <h2>What is a certified translation for USCIS?</h2>
      <p>The US rule is short: 8 CFR § 103.2(b)(3) requires any foreign-language document submitted to USCIS to be accompanied by a <strong>full English translation</strong> and a <strong>certification by the translator</strong> stating that the translation is complete and accurate and that they are competent to translate from that language into English. No notary is required and no specific accreditation either: a signed, dated certification with contact details, one per document, is enough. I explain it in more detail on the <a href="/en/certified-translation-uscis">certified translation for USCIS</a> page.</p>

      <h2>How exactly do they differ?</h2>
      <table>
        <thead>
          <tr><th></th><th>Sworn translation (Spain)</th><th>Certified translation (USA)</th></tr>
        </thead>
        <tbody>
          <tr><td>Who signs it</td><td>A sworn translator appointed by the Spanish Ministry</td><td>Any competent translator who signs the certification</td></tr>
          <tr><td>Who it is for</td><td>Spanish bodies and Spanish consulates</td><td>USCIS, courts, universities and employers in the US</td></tr>
          <tr><td>What it carries</td><td>Certification in Spanish, signature and stamp on every page</td><td>Full English translation + signed and dated certificate</td></tr>
          <tr><td>Notary</td><td>No</td><td>No (USCIS does not require it)</td></tr>
          <tr><td>Usual direction</td><td>English → Spanish</td><td>Spanish → English</td></tr>
        </tbody>
      </table>

      <h2>Does USCIS accept a translation made in Spain?</h2>
      <p>Yes. What USCIS checks is the certification, not where the translation was produced. A certified translation prepared from Murcia is as valid as one made in Miami, as long as it is complete (stamps, apostilles and handwritten notes included) and carries the certification with signature, date and contact details. My appointment as a sworn translator is not a USCIS requirement, but it adds a verifiable credential that officers understand.</p>

      <h2>Does Spain accept a certified translation made in the United States?</h2>
      <p>In general, no. The immigration office, the civil registry or the consulate require a sworn translation by a translator appointed by the Spanish Ministry (or a consular legalisation, which is slower and more expensive). If you already have a certified translation of your US birth certificate, you will most likely have to have it translated again as a sworn translation. Send it to me with the apostille and it is ready in 24/48 hours.</p>

      <h2>What if I submit the same document in both countries?</h2>
      <p>It happens more often than you would think: a Spanish-American couple who marry in Spain and then apply for a green card, or a Spaniard applying for US citizenship while keeping paperwork going at the Spanish civil registry. In those cases I prepare both versions at the same time, with the same criteria (same names, dates and terms), so that no officer finds discrepancies between one and the other. If you live in the US, the <a href="/en/sworn-translation-usa-spain">guide for clients in the United States</a> covers apostilles, time zones and payment with a US card.</p>

      <h2>Which Spanish documents are most often translated for USCIS?</h2>
      <p>Birth certificates (full or extract) for family petitions, green cards and naturalisation; marriage certificates, divorce decrees and death certificates; criminal record certificates from the Spanish Ministry of Justice; degrees and academic transcripts for work or study visas; bank statements, employer certificates and payslips as proof of means; and deeds, powers of attorney and contracts. Each one comes with its own certification page, and every stamp, apostille and handwritten note appears in the English version: a USCIS translation has to be complete, not a summary.</p>

      <h2>Summary in three lines</h2>
      <ol>
        <li>Procedure in Spain → sworn translation (Ministry signature and stamp).</li>
        <li>Procedure before USCIS → certified translation into English with a signed certification, no notary.</li>
        <li>Both → both versions at once, from a single translator.</li>
      </ol>
      <p>
        Not sure which one you are being asked for? Send me the document and the name of the procedure on
        <a href="https://wa.me/34685891214?text=Hi%20Elena%2C%20I%27m%20not%20sure%20whether%20I%20need%20a%20sworn%20translation%20for%20Spain%20or%20a%20certified%20translation%20for%20USCIS%3A%20here%20is%20the%20document%20and%20the%20procedure">WhatsApp</a>
        and I will confirm it with a fixed price within 2 hours.
      </p>
    `,
  },

  {
    slug: "indian-documents-spanish-visa-mea-apostille-sworn-translation",
    title: "Indian documents for a Spanish visa: MEA apostille and sworn translation",
    excerpt:
      "A guide for applicants from India: which documents the Spanish consulate asks for (birth, marriage, PCC, degrees, employer letters), how the Ministry of External Affairs apostille works and why certificates must be in English before the sworn translation into Spanish.",
    date: "2026-11-06",
    updated: "2026-11-06",
    author: "Elena Peñaranda Ortega",
    tags: ["india", "extranjeria", "apostilla"],
    readingTime: "6 min",
    image: "/blog/post-indian-documents.jpg",
    alt: "Wax seal and stamp on an envelope, like the seals and apostilles on official Indian documents",
    html: `
      <p>After the United Kingdom and the United States, India is the country I receive most enquiries from: students heading to a master's degree in Spain, engineers with a contract, families reuniting and, increasingly, remote workers applying for the <a href="/en/sworn-translation-spain-digital-nomad-visa">digital nomad visa</a>. They all meet the same chain of steps: attestation, MEA apostille and sworn translation into Spanish. This guide explains the chain in order and which documents go through it.</p>

      <h2>Which Indian documents does the Spanish consulate ask for?</h2>
      <p>It depends on the visa, but the list repeats itself:</p>
      <ul>
        <li><strong>Birth certificate</strong> from the municipal corporation or the registrar, for family reunification, marriage and citizenship.</li>
        <li><strong>Marriage certificate</strong>, with the registrar's stamps.</li>
        <li><strong>Police clearance certificate (PCC)</strong> from the passport office or the state police, for almost every long-stay visa.</li>
        <li><strong>Degrees, mark sheets and transcripts</strong> for the student visa, recognition of qualifications and professional registration.</li>
        <li><strong>Employer and experience letters</strong> for work visas, the EU Blue Card and the digital nomad visa.</li>
        <li><strong>Bank statements, ITR and Form 16</strong> as proof of funds.</li>
        <li><strong>Affidavits</strong> before a notary when a certificate is missing or something has to be declared (a change of name, for example).</li>
      </ul>
      <p>All of them, if they are not in Spanish, are submitted with a sworn translation. The <a href="/en/sworn-translation-india-spain">sworn translation of Indian documents</a> page has the full table with apostille yes or no for each one.</p>

      <h2>How does the MEA apostille work?</h2>
      <p>India is party to the Hague Convention, so its public documents are legalised with an apostille rather than consular legalisation. It is issued by the <strong>Ministry of External Affairs</strong> (MEA) of the Government of India through its collection centres and authorised outsourcing agencies. Before the apostille, most documents go through prior attestation: the state education department for degrees, the Home Department for personal certificates or the chamber of commerce for commercial documents. The apostille is a sticker with a QR code attached to the document, and it is part of it: it gets translated too.</p>

      <h2>Why does the document have to be in English?</h2>
      <p>Because I translate from English into Spanish, not from Hindi, Marathi, Tamil, Gujarati or Bengali. Most Indian documents are issued in English or in a bilingual version, and I work with those directly. If yours is only in a regional language, you first need an official English version: from the issuing body itself or from a recognised translator in India, with their seal. That apostilled version is what I translate into Spanish. It is one more step, but it prevents the consulate rejecting a translation made "by ear" from an original I cannot read.</p>

      <h2>In what order is everything done?</h2>
      <ol>
        <li>Obtain the original document (or the official English version, if it is in a regional language).</li>
        <li>Prior attestation by the relevant department.</li>
        <li>MEA apostille.</li>
        <li>Complete scan of the document with the apostille, and sworn translation into Spanish.</li>
      </ol>
      <p>If you send me a document without an apostille and the consulate requires one, I tell you before I start.</p>

      <h2>How long does it take, and how do you pay from India?</h2>
      <p>A standard document is translated in 24/48 hours; a complete student visa file (with long transcripts) gets a single deadline confirmed in writing within 2 working hours. My office hours are 9:00 to 20:00 mainland Spain time, three and a half to four and a half hours behind India: if you message me mid-morning, I reply at the start of my working day. Payment is with your Indian card (Visa, Mastercard or international RuPay) through Stripe, in euros; if international payments are blocked on your card, enable them in your banking app before paying. You receive a digitally signed PDF, valid for the consulate and for the visa platform; if paper is required, I courier it to India.</p>

      <h2>And Spanish documents for use in India?</h2>
      <p>The reverse route exists too: Spanish birth or marriage certificates, degrees, criminal record certificates or company documents to be presented to an authority, university or employer in India. I translate them into English with my signature and stamp, and when the Indian body requires it, the original is apostilled first in Spain.</p>
      <p>
        Have your document list ready? Send it to me on
        <a href="https://wa.me/34685891214?text=Hi%20Elena%2C%20I%27m%20writing%20from%20India%3A%20I%20need%20sworn%20Spanish%20translations%20of%20my%20documents%20%28in%20English%2C%20with%20MEA%20apostille%29%20for%20the%20Spanish%20consulate">WhatsApp</a>
        and I will tell you what needs an apostille and what the complete batch costs.
      </p>
    `,
  },

  {
    slug: "sworn-translations-leaving-spain-uk-ireland-canada-australia",
    title: "Sworn translations for leaving Spain: what the UK, Ireland, Canada and Australia ask for",
    excerpt:
      "If you are emigrating from Spain, your certificates, degrees and criminal record checks must arrive in English. What each country requires of a translation done abroad (UKVI, Irish Immigration, IRCC and Home Affairs), when the Spanish apostille is needed and in what order to do it.",
    date: "2026-11-20",
    updated: "2026-11-20",
    author: "Elena Peñaranda Ortega",
    tags: ["emigrating", "united-kingdom", "ireland", "canada", "australia", "apostille"],
    readingTime: "7 min",
    image: "/blog/post-leaving-spain.jpg",
    alt: "Passport and travel documents laid out on a table before a move abroad",
    html: `
      <p>Most of my clients are coming to Spain. But every week I also translate in the other direction: Spaniards and residents of Spain leaving to work, study or live in the United Kingdom, Ireland, Canada or Australia who need their documents in English. All four countries speak English, all four ask for translations, and none of them has the same sworn translator system as Spain. This guide summarises what each one requires of a translation done from here, with the official source linked, and the order in which to do everything.</p>

      <h2>What the four have in common</h2>
      <ul>
        <li><strong>No Spanish-language document is accepted without a translation</strong> into English (Ireland also accepts Irish; Canada, French).</li>
        <li><strong>The translation must be complete</strong>, stamps, apostille and annotations included, and come with a statement from the translator giving their name, signature, date and contact details.</li>
        <li><strong>The apostille, where required, goes on the Spanish original</strong> before translating, because it is translated too. In Spain it is issued by the notarial colleges (notarial documents), the high courts of justice (court documents) and the Ministry of Justice and government delegations (everything else). Details in <a href="/blog/que-es-la-apostilla-de-la-haya">what an apostille is</a> (guide in Spanish).</li>
        <li><strong>The documents repeat</strong>: birth certificate, marriage certificate, criminal record certificate, degree and academic transcript, employment history (vida laboral), payslips and employer letters.</li>
      </ul>
      <p>My sworn translation into English comes with everything they ask for as standard: a statement of accuracy, signature, seal with MAEC number 7310, date and my contact details. What changes between countries is the small print.</p>

      <h2>United Kingdom: a "certified translation" for UKVI</h2>
      <p>UK Visas and Immigration requires any document not in English or Welsh to be submitted with a certified translation that includes the translator's confirmation that it is an accurate translation of the original, the date, their full name and signature and their contact details. A Spanish sworn translation meets that requirement as it is, with no notary. An apostille is only required for certain documents and procedures: check the guidance for your specific visa. There is also a page for <a href="/en/sworn-translation-british-residents-spain">British residents making the opposite journey</a>.</p>

      <h2>Ireland: a "full and certified translation" for Immigration Service Delivery</h2>
      <p>Ireland has no sworn translators. Immigration Service Delivery asks for a full and certified translation into English or Irish in which the translator confirms it is accurate and gives their contact details (<a href="https://www.irishimmigration.ie/how-to-make-a-certified-translation-of-a-document/" target="_blank" rel="noopener noreferrer">official source: irishimmigration.ie</a>). Universities, employers and the HSE apply the same criterion. As Ireland and Spain are both EU Member States, many public documents (birth, marriage, criminal record) can be presented without an apostille using the multilingual standard form under Regulation (EU) 2016/1191, although not every body accepts it instead of a translation: ask first. More in the <a href="/en/sworn-translation-ireland-spain">Ireland guide</a>.</p>

      <h2>Canada: certified translator or affidavit for IRCC</h2>
      <p>Immigration, Refugees and Citizenship Canada accepts documents in English or French. Everything else is submitted with its translation and, if the translator <strong>is not a member in good standing of a Canadian association of certified translators</strong>, with an affidavit in which they swear before a competent authority that they are proficient in both languages and that the translation is accurate, plus a certified copy of the original. Neither family members nor the applicant's representatives may translate (<a href="https://ircc.canada.ca/english/helpcentre/answer.asp?qnum=018&amp;top=4" target="_blank" rel="noopener noreferrer">IRCC: language of documents</a> · <a href="https://ircc.canada.ca/english/helpcentre/answer.asp?qnum=040&amp;top=4" target="_blank" rel="noopener noreferrer">IRCC: what is an affidavit for a translation</a>). My MAEC appointment is not a Canadian association membership, so for IRCC you should plan for the affidavit; universities, professional bodies and employers are usually satisfied with the certified translation. Step by step in the <a href="/en/sworn-translation-canada-spain">Canada guide</a>.</p>

      <h2>Australia: translations done outside Australia for Home Affairs</h2>
      <p>The Department of Home Affairs requires English translations of anything in another language. If the translation is done inside Australia, the translator must be NAATI-accredited; if it is done outside, as it is from Spain, NAATI is not required, but the translation must show the translator's full name, address, phone number and their qualifications and experience in the source language (<a href="https://immi.homeaffairs.gov.au/help-text/evidence/Pages/et-h0012.aspx" target="_blank" rel="noopener noreferrer">Home Affairs: evidence and translations</a>). My certification includes all of those details. For degree recognition and professional registration, each assessing body has its own rules: check them before ordering. The full <a href="/en/sworn-translation-australia-spain">Australia guide</a> is here.</p>

      <h2>In what order to do it</h2>
      <ol>
        <li><strong>Get the list of documents</strong> from the receiving body (visa, university, professional body, employer) and check which ones need an apostille and which need a certified copy or an affidavit.</li>
        <li><strong>Obtain up-to-date originals</strong>: civil registry and criminal record certificates expire for the purposes of many procedures, so request them with the visa in sight.</li>
        <li><strong>Apostille what needs it</strong> before translating.</li>
        <li><strong>Scan everything</strong> in full, apostille included, and send it to me by WhatsApp or through the form. You get a fixed quote in under 2 working hours and a single deadline for the batch.</li>
        <li><strong>You receive the signed PDF</strong> in 24/48 hours for a standard document, with the certification adapted to the country. If paper is required, I send it by courier.</li>
      </ol>

      <h2>How much margin to leave</h2>
      <p>I do not give processing times for foreign authorities, because they change and depend on each office. What I do control is my part: the translation of a complete emigration file comes with a fixed deadline in writing before I start, and I handle urgent batches as described in <a href="/en/urgent-sworn-translation-large-projects">urgent and large projects</a>. What delays a file most is not the translation, but finding out late that a certificate needed an apostille.</p>
      <p>
        Leaving? Send me your list of documents on
        <a href="https://wa.me/34685891214?text=Hi%20Elena%2C%20I%27m%20leaving%20Spain%20and%20need%20my%20documents%20translated%20into%20English%20%28I%27ll%20tell%20you%20the%20country%20and%20the%20procedure%29">WhatsApp</a>
        and I will tell you what to apostille, what to translate and what the full batch costs.
      </p>
    `,
  },


  // ---------------------------------------------------------------------
  // SEO phase 2 (September 2026): in-depth articles with their own FAQ.
  // The `faq` field is rendered by app/en/blog/[slug]/page.js (FAQPage).
  // Prices: only those in content/documents.js.
  // ---------------------------------------------------------------------
  {
    slug: "how-to-check-sworn-translation-valid-spain",
    title: "How to check whether a sworn translation is valid in Spain (and what to do if yours is rejected)",
    excerpt:
      "The five things a Spanish official checks on a sworn translation: the Ministry appointment, the official register, signature, stamp, certification and date. How to verify them yourself, the mistakes some agencies make and what to do if the office turns it down.",
    date: "2026-09-26",
    updated: "2026-09-26",
    author: "Elena Peñaranda Ortega",
    tags: ["validez", "consejos"],
    readingTime: "7 min",
    image: "/blog/post-sworn-vs-certified.jpg",
    alt: "Sworn translation with the translator's stamp and digital signature",
    html: `
      <p>A sworn translation is valid in Spain when it has been produced and signed by a <strong>sworn translator-interpreter appointed by Spain's Ministry of Foreign Affairs, European Union and Cooperation (MAEC)</strong> for that language, and it carries the translator's <strong>certification, signature, stamp and date</strong>, with a copy of the source document attached. That is the whole test. Headed paper does not make it valid, nor does an agency logo, a notary or the word "certified". If any of those pieces is missing, the receiving office can reject it, and it does so more often than people think. I am Elena Peñaranda, sworn translator of English no. 7310, and this article shows you how to check in five minutes whether the translation in front of you will pass.</p>

      <h2>1. Who is allowed to sign a sworn translation in Spain</h2>
      <p>In Spain the only person who can do it is a <strong>sworn translator-interpreter</strong> (<em>traductor-intérprete jurado</em>), a title granted by the MAEC through its Office of Language Interpretation, either by examination or by recognition of a qualification from another EU Member State. Each appointment is for one specific language and carries a <strong>sworn translator number</strong>. Mine is 7310, for English: I can certify translations from English into Spanish and from Spanish into English, and no other combination.</p>
      <p>Two practical consequences follow. First, an agency is not a sworn translator. It can act as intermediary, but the translation is signed by a named person with a number, and that person is legally responsible for every sentence. Second, a sworn translator of French cannot sign a translation from English, however good their English is. This happens more often than you would expect when a job passes through several hands.</p>

      <h2>2. How to check the appointment on the official register</h2>
      <p>The MAEC publishes the <a href="https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Traductores-as---Interpretes-Jurados-as.aspx" target="_blank" rel="noopener noreferrer">official register of sworn translator-interpreters</a>, and that is precisely what an official consults when in doubt. Look up the name on the stamp and check three things: that the person <strong>appears</strong>, that the <strong>language</strong> matches your document and that the <strong>number</strong> is the same as the one on the stamp. If the name is not there, or is there for a different language, the translation is not sworn no matter what the heading says.</p>
      <p>One honest caveat: the register is updated periodically, and very recent appointments can take a few weeks to show up. If the translator tells you they have just been appointed, ask for their appointment number; the office can verify it with that. In my case there is no room for doubt: I have been on the register for years and anyone can check.</p>

      <h2>3. What the translation must carry, page by page</h2>
      <p>The current rules (Royal Decree 724/2020 and the order regulating the stamp and certification) set a fairly strict format. This is what must appear:</p>
      <ul>
        <li><strong>The closing certification</strong>, in the official wording: the translator, identified by name and number, certifies that the foregoing is a faithful and complete translation into the target language of a document written in the source language, and signs it in a specific place on a specific date.</li>
        <li><strong>The signature</strong> of the translator, handwritten on paper or electronic in a PDF, next to the certification.</li>
        <li><strong>The stamp</strong>, with the full name, the words "Traductor/a-Intérprete Jurado/a de [language]" and the appointment number. No address, no logos: the official model is plain and allows no decoration.</li>
        <li><strong>The date</strong> of the certification, which the office will treat as the date of the translation.</li>
        <li><strong>A copy of the source document</strong>, stamped and dated, attached to the translation. The translator certifies the translation of <em>that</em> specific document, not of an abstract text; without the copy, the official cannot tell what was translated.</li>
        <li><strong>All of the content</strong>: stamps, apostille, signatures, handwritten notes and marginal annotations. Anything that cannot be translated is described in square brackets ("[illegible stamp]", "[signature]"). A sworn translation never summarises or leaves things out.</li>
      </ul>
      <p>If you want to see this applied to a real case, the page on <a href="/traduccion-jurada-validez-oficial">official validity of sworn translations</a> (in Spanish) explains how it is checked by ministries, universities and consulates.</p>

      <h2>4. Digital signature: yes, it is valid, and this is how you verify it</h2>
      <p>Since 2020 the Office of Language Interpretation has accepted sworn translations signed <strong>electronically</strong> and delivered as a PDF, and Spanish public bodies accept them across the board for online submission. The digital signature does not replace the stamp and the certification: it goes with them. The PDF must carry the certification, the image of the stamp and the date, plus the translator's electronic signature embedded in the file.</p>
      <p>To verify it, open the PDF in a reader that shows the signature panel (Adobe Acrobat Reader does) and check that the signature is valid, that the signer's name is the translator's and that the document <strong>has not been modified</strong> since it was signed. If the PDF is just a scanned image of a signature with no electronic signature behind it, it is a digital copy of a paper translation: it may do if the office accepts copies, but it is not a digitally signed translation.</p>

      <h2>Table: valid versus likely to be rejected</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>What to check</th><th>Valid translation</th><th>Warning sign</th></tr></thead>
        <tbody>
          <tr><td>Who signs</td><td>MAEC sworn translator-interpreter, with name and number</td><td>Agency stamp, "certified translator", notary or a signature with no number</td></tr>
          <tr><td>Official register</td><td>Listed for that language and that number</td><td>Not listed, or listed for another language</td></tr>
          <tr><td>Certification</td><td>Official wording, place and date</td><td>Missing, in another language or reads "certified translation"</td></tr>
          <tr><td>Stamp</td><td>Name, language and number; plain</td><td>Logos, address, no number or a different language</td></tr>
          <tr><td>Copy of the original</td><td>Attached, stamped and dated</td><td>Only the translation is delivered</td></tr>
          <tr><td>Content</td><td>Complete: stamps, apostille, notes</td><td>Apostille missing or "irrelevant" paragraphs left out</td></tr>
          <tr><td>Digital signature</td><td>Valid electronic signature in the PDF</td><td>Pasted image of a signature, no electronic signature</td></tr>
        </tbody>
      </table></div>

      <h2>5. Typical mistakes I see in translations from some agencies</h2>
      <p>Not every agency works badly; many subcontract to serious sworn translators and deliver a flawless product. But when a client brings me a rejected translation, it is almost always for one of these reasons:</p>
      <ol>
        <li><strong>It is signed by a non-sworn translator</strong> and the agency "certifies" it with its own stamp. In the UK or the US that is a certified translation and it works; in Spain it does not.</li>
        <li><strong>The translator is sworn for a different language.</strong> Common with bilingual documents or with multi-country files split up carelessly.</li>
        <li><strong>One version was translated and another was stamped</strong>: the client sends a draft, then the final document with the apostille, and the translation does not include the apostille.</li>
        <li><strong>The copy of the original is missing</strong>, or attached without a stamp. The easiest defect to fix and the most common one.</li>
        <li><strong>The electronic signature is not the translator's</strong> but the agency's, or the PDF was "flattened" after signing and the signature shows as invalid.</li>
        <li><strong>Translation of a translation</strong>: the original is in Hindi or Arabic, someone translated it into English, and the sworn translation was made from that English. Many offices will not accept it.</li>
      </ol>
      <p>If you are unsure what kind of translation you are being sold, <a href="/en/blog/sworn-vs-certified-translation-uscis-spain">sworn vs certified translation</a> walks through the differences calmly.</p>

      <h2>6. What to do if the office rejects it</h2>
      <p>First, <strong>ask for the reason in writing</strong>. "It is not valid" is not a reason; "the copy of the original is missing" or "the translator is not on the register" is. With the reason in hand there are three scenarios:</p>
      <ul>
        <li><strong>A defect the same translator can fix</strong> (copy missing, a page missing, apostille not translated). Contact the sworn translator who signed: they have a professional duty to deliver a complete translation and usually put it right at no cost or for a small fee.</li>
        <li><strong>The translator is not sworn, or not for that language.</strong> Nothing can be done with that translation; you need a new one. Claim against whoever sold it to you, keeping the written rejection as evidence.</li>
        <li><strong>The official is wrong.</strong> It happens, especially with electronic signatures. Provide the link to the MAEC register and, for a PDF, the signature validation report. If they insist on paper, the translator can courier you the original; in my case the price of the translation is the same, only postage is added.</li>
      </ul>
      <p>And if you do need it redone, do not start from scratch blindly: send me the source document and the rejection letter, I will tell you within 2 hours what went wrong and give you a fixed price. Standard certificates (birth, marriage, criminal record) start at <a href="/en/precios">€35</a> and are delivered in 24/48 hours.</p>
      <p>
        <a href="https://wa.me/34685891214?text=Hi%20Elena%2C%20my%20sworn%20translation%20has%20been%20rejected%20and%20I%27d%20like%20to%20know%20what%20went%20wrong">Message me on WhatsApp</a>
        with the document and the reason for the rejection, or see the
        <a href="/en/sworn-english-translator">sworn English translator</a> page to learn how I work.
      </p>
    `,
    faq: [
      {
        q: "How do I check that a sworn translator really exists?",
        a: "Look up their name on the MAEC's official register of sworn translator-interpreters and check that the language and number match those on the stamp. It is the same check the Spanish administration performs.",
      },
      {
        q: "Is a digitally signed PDF sworn translation as valid as paper?",
        a: "Yes. The Office of Language Interpretation has accepted electronic signatures since 2020 and public bodies accept them for online submission. If a specific office demands paper, the translator can send you the original.",
      },
      {
        q: "Does a sworn translation expire?",
        a: "No. What can expire is the source document: criminal record or residence certificates often have a limited validity for the purposes of the procedure, so check the original's validity before translating.",
      },
      {
        q: "Can an agency certify a sworn translation with its own stamp?",
        a: "No. In Spain only the sworn translator-interpreter appointed by the MAEC certifies, with their signature, stamp and number. An agency stamp adds no validity.",
      },
      {
        q: "My translation was rejected. Do I have to pay for a whole new one?",
        a: "It depends on the reason. If it is a formal defect (copy of the original, a page or the apostille missing), the same sworn translator should fix it. If the person who signed is not a sworn translator for that language, you need a new translation and should claim against whoever sold it to you.",
      },
    ],
  },

  {
    slug: "sworn-translations-spanish-citizenship-residence-uk-us-india",
    title: "Sworn translations for Spanish citizenship by residence: UK, US and Indian applicants",
    excerpt:
      "Which documents from your home country need translating for Spanish citizenship by residence, which apostille each one takes and the order to do it in, with the specifics for the United Kingdom, the United States and India and real prices.",
    date: "2026-09-26",
    updated: "2026-09-26",
    author: "Elena Peñaranda Ortega",
    tags: ["extranjeria", "apostilla", "reino-unido", "estados-unidos", "india"],
    readingTime: "8 min",
    image: "/blog/post-nie.jpg",
    alt: "Passport and certificates prepared for a Spanish citizenship application",
    html: `
      <p>For Spanish citizenship by residence you need, at a minimum, two documents from your home country with an <strong>apostille and a sworn translation</strong>: your <a href="/traduccion-jurada-partida-nacimiento">birth certificate</a> and your <a href="/traduccion-jurada-certificado-penales">criminal record certificate</a>. If you are married, almost always your <a href="/traduccion-jurada-certificado-matrimonio">marriage certificate</a> too. The sworn translation of each of these certificates costs <strong>from €35</strong> and is delivered in <strong>24/48 hours</strong> as a digitally signed PDF, valid for the online application. I am Elena Peñaranda, sworn translator of English no. 7310 appointed by Spain's Ministry of Foreign Affairs, and I prepare these files every week for British, American and Indian clients; this guide is what I tell them before we start.</p>

      <p>A warning before we go on: the years of residence required, the fees, the Instituto Cervantes exams and the status of your application are set by the Ministry of Justice and are better known to your lawyer or the official portal. I look after the documents: what to translate, what to apostille and in what order, so your file does not come back over a piece of paper.</p>

      <h2>Which foreign documents the application asks for</h2>
      <p>The citizenship-by-residence application is filed online and combines Spanish documents (not translated) with documents from your home country (translated). The foreign ones generally requested are:</p>
      <ul>
        <li><strong>Birth certificate</strong> from your home country, full or long-form, legalised with an apostille and with a sworn translation.</li>
        <li><strong>Criminal record certificate</strong> from your home country, apostilled and translated. If you have lived in other countries in recent years, one from each of those countries as well.</li>
        <li><strong>Marriage certificate</strong>, if you apply as the spouse of a Spanish citizen or if your marital status forms part of the file.</li>
        <li>In some cases, <strong>children's birth certificates</strong> and the spouse's documents.</li>
      </ul>
      <p>Everything else (municipal registration, residence card, DELE and CCSE exams, receipts) is issued in Spain and in Spanish, so I do not need to see it.</p>

      <h2>Apostille first, translation second</h2>
      <p>The order matters, and it is the number-one reason translations get redone: the Hague apostille goes on the original document, in the country that issued it, and the sworn translation must include it. If you send me the certificate without the apostille and obtain it later, the translation already delivered will not cover it and would have to be extended. So: request the certificate, apostille it and, with both in hand, scan everything and send it to me. The UK, the US and India are all parties to the Hague Convention; none of the three needs consular legalisation.</p>

      <h2>United Kingdom</h2>
      <p>British clients give me more citizenship files than anyone else, and their documents are the most predictable:</p>
      <ul>
        <li><strong>Birth certificate</strong>: order a recent certified copy from the General Register Office (England and Wales), National Records of Scotland or GRONI (Northern Ireland). Get the full certificate (with parents' details), not the short version.</li>
        <li><strong>Criminal record</strong>: the <strong>ACRO Police Certificate</strong>, not a DBS check, which is for employers. It arrives on paper by post.</li>
        <li><strong>Apostille</strong>: issued by the FCDO Legalisation Office on each document separately. Since Brexit, UK documents no longer benefit from the apostille exemption under Regulation (EU) 2016/1191.</li>
        <li><strong>Marriage</strong>: GRO or local register office certificate, apostilled in the same way.</li>
      </ul>
      <p>A detail that saves grief: the Spanish administration treats the ACRO as having a short practical shelf life, so order it once the rest of your file is ready. Everything specific to this profile is in the guide for <a href="/en/sworn-translation-british-residents-spain">British residents in Spain</a>.</p>

      <h2>United States</h2>
      <p>The trap here is that there are <strong>two levels of apostille</strong>, and picking the wrong one means doing it again:</p>
      <ul>
        <li><strong>Birth certificate</strong>: issued by the <em>state</em> (or county) vital records office and apostilled by the <strong>Secretary of State of that state</strong>. A federal apostille is no use for a state document.</li>
        <li><strong>Criminal record</strong>: for citizenship the federal certificate is requested, the <strong>FBI Identity History Summary</strong> (often called an FBI background check), and it is apostilled by the <strong>U.S. Department of State</strong> (Office of Authentications) because it is a federal document. Some applicants also provide the state-level certificate for their state of residence; confirm with your lawyer.</li>
        <li><strong>Marriage</strong>: county or state certificate, apostille from the corresponding Secretary of State.</li>
      </ul>
      <p>US birth certificates vary enormously from state to state (layout, fields, embossed seals), and I translate them exactly as they come, including the legal text on the back. How to pay with a US card, time zones and the other details are in the guide for <a href="/en/sworn-translation-usa-spain">clients in the United States</a>.</p>

      <h2>India</h2>
      <p>With India the tricky point is not the apostille, which is single and straightforward, but the <strong>source document</strong>:</p>
      <ul>
        <li><strong>Birth certificate</strong>: issued by the municipal corporation or local registrar, often in the state language (Hindi, Tamil, Marathi…) or bilingual. For me to produce the sworn translation, the certificate must be <strong>in English as issued by the authority</strong>, not translated into English by a third party: a sworn translation of a translation is usually rejected. If your certificate is only in a local language, ask the municipality for an English version or find a sworn translator for that language.</li>
        <li><strong>Criminal record</strong>: the <strong>Police Clearance Certificate (PCC)</strong> issued by the Regional Passport Office through Passport Seva, in English.</li>
        <li><strong>Apostille</strong>: issued by the <strong>Ministry of External Affairs (MEA)</strong>, normally after authentication by the issuing state and through the authorised outsourcing agencies. The MEA apostille is a sticker with a code, and I translate it as part of the document.</li>
        <li><strong>Marriage</strong>: certificate from the state marriage registrar, in English, with the MEA apostille.</li>
      </ul>
      <p>The guide for <a href="/en/sworn-translation-india-spain">clients in India</a> covers single-word names, dates and spellings, which in a citizenship file should match your passport and NIE to the letter.</p>

      <h2>Summary table by country</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>Document</th><th>United Kingdom</th><th>United States</th><th>India</th><th>Sworn translation</th></tr></thead>
        <tbody>
          <tr><td>Birth</td><td>GRO / NRS / GRONI, full certificate. FCDO apostille</td><td>State vital records. Secretary of State apostille</td><td>Municipality, in English. MEA apostille</td><td>From €35, 24/48 h</td></tr>
          <tr><td>Criminal record</td><td>ACRO Police Certificate. FCDO apostille</td><td>FBI Identity History Summary. Department of State apostille</td><td>PCC from Passport Seva. MEA apostille</td><td>From €35, 24/48 h</td></tr>
          <tr><td>Marriage (if applicable)</td><td>GRO or local register office. FCDO apostille</td><td>County or state. Secretary of State apostille</td><td>State marriage registrar. MEA apostille</td><td>From €35, 24/48 h</td></tr>
        </tbody>
      </table></div>

      <h2>How I prepare it and what you receive</h2>
      <ol>
        <li><strong>You scan each document in full</strong>, apostille included, and send it by WhatsApp or through the form. Preferably all together, even if that means three or four files.</li>
        <li><strong>I confirm within 2 working hours</strong> which documents need translating, a fixed price for the batch and a single delivery date.</li>
        <li><strong>I translate the whole file in one go</strong>, with names, dates and terms written identically across every document. The same surname spelt two ways on two certificates is grounds for a request for clarification.</li>
        <li><strong>You receive the digitally signed PDFs</strong>, with my certification, stamp and electronic signature, ready to upload to the online platform. If the Civil Registry or your lawyer wants paper, I courier the originals.</li>
      </ol>
      <p>If you want to know how to check that a sworn translation is valid before uploading it, I explain it in <a href="/en/blog/how-to-check-sworn-translation-valid-spain">how to check whether a sworn translation is valid in Spain</a>.</p>
      <p>
        <a href="https://wa.me/34685891214?text=Hi%20Elena%2C%20I%27m%20preparing%20my%20Spanish%20citizenship%20application%20and%20need%20my%20certificates%20translated">Send me your certificates on WhatsApp</a>
        and I will tell you what to translate, what to apostille and what the full batch costs. You can also see all
        <a href="/en/precios">prices</a> or the <a href="/en/sworn-english-translator">sworn English translator</a> page.
      </p>
    `,
    faq: [
      {
        q: "Do I have to translate my passport for citizenship?",
        a: "Normally not: the passport is provided as a full copy and no sworn translation is required. If your lawyer or the Civil Registry expressly asks for one, it is translated like any other document.",
      },
      {
        q: "Does the sworn translation include the apostille, or is that extra?",
        a: "It is included. The apostille is part of the document and is translated with it; when it is on the same page or attached to the certificate there is no additional charge.",
      },
      {
        q: "Can I submit the translation as a digitally signed PDF?",
        a: "Yes. The application is filed online and a PDF electronically signed by a sworn translator is accepted. If the Civil Registry later asks for the paper original, I send it by courier.",
      },
      {
        q: "My Indian birth certificate is in Hindi. Can you translate it?",
        a: "I am only appointed for English. If the certificate is in Hindi or another local language, ask the municipality for an English version issued by the authority itself or go to a sworn translator for that language; a sworn translation made from an unofficial translation is usually rejected.",
      },
      {
        q: "How long do the translations for the whole file take?",
        a: "Each standard certificate (birth, criminal record, marriage) is delivered in 24/48 hours. If you send me the three or four documents together, I give you a single date for the batch, usually within that same timeframe.",
      },
    ],
  },



  {
    slug: "studying-in-the-uk-from-spain-documents-sworn-translation",
    title: "Studying in the UK from Spain: which documents need a sworn translation",
    excerpt:
      "What British universities and the Home Office ask Spanish students to translate, case by case: exchange or Erasmus, an undergraduate degree through UCAS, a master's and the Student visa. Which documents need a sworn translation, which do not need translating at all, and real prices per document.",
    date: "2026-09-27",
    updated: "2026-09-27",
    author: "Elena Peñaranda Ortega",
    tags: ["academico", "reino-unido", "precios"],
    readingTime: "8 min",
    image: "/blog/post-ucas.jpg",
    alt: "Student working in a library — applications to universities in the United Kingdom",
    html: `
      <p>To study in the UK you need a <em>certified translation</em> into English of every academic or identity document issued in Spanish: for an <strong>undergraduate degree</strong>, the Bachillerato diploma and the Bachillerato and EBAU grades; for a <strong>master's</strong>, the <a href="/traduccion-jurada-titulo-universitario">university degree certificate</a> and the academic transcript; for an <strong>exchange or Erasmus stay</strong>, almost nothing, because Spanish universities issue those records in English; and for the <strong>Student visa</strong>, the financial evidence too if it is in Spanish. A Spanish sworn translation meets the British requirements for a certified translation and then some. A degree certificate costs <strong>${eur("titulo-universitario")}</strong> and is delivered in 24/48 hours; a transcript is quoted once I see it. I am Elena Peñaranda, sworn translator of English no. 7310 appointed by Spain's Ministry of Foreign Affairs, and every summer I translate the files of students heading to the UK. This is what I tell them before we start.</p>

      <h2>First, which case are you in?</h2>
      <p>The four routes into a British university ask for different documents, and translating too much is as common as translating too little. Find yourself in the table and go to the matching section.</p>
      <div class="table-wrap"><table>
        <thead><tr><th>Your case</th><th>Who asks for the documents</th><th>What usually needs translating</th><th>Visa</th></tr></thead>
        <tbody>
          <tr><td>Exchange, Erasmus or bilateral agreement (one or two terms)</td><td>Your Spanish university and the host university</td><td>Usually nothing: transcript and learning agreement come in English</td><td>No, under 6 months (ETA only); Student visa if longer</td></tr>
          <tr><td>Undergraduate degree through UCAS</td><td>Each university, when it makes you an offer</td><td>Bachillerato diploma, Bachillerato and EBAU grades</td><td>Yes: Student visa</td></tr>
          <tr><td>Master's or PhD (postgraduate)</td><td>The university, at application and enrolment</td><td>Degree certificate and academic transcript</td><td>Yes: Student visa</td></tr>
          <tr><td>Short language or summer course</td><td>The school</td><td>Rarely anything</td><td>No, up to 6 months (ETA)</td></tr>
        </tbody>
      </table></div>

      <h2>Erasmus and exchanges: what almost never needs translating</h2>
      <p>Since Brexit the UK has not been part of Erasmus+, so exchanges with British universities run through <strong>bilateral agreements</strong> and each university's own mobility schemes; there is a political agreement for the UK to re-associate with the programme from 2027, but until a call actually exists, your international relations office has the last word. In all of these schemes the paperwork moves between universities: the <em>learning agreement</em> is signed in English and the transcript of records is issued by your Spanish university, almost always with an English version. If your faculty only issues it in Spanish, the host university will ask for a translation, and that is where I come in; but ask first, because many issue a bilingual version free of charge.</p>
      <p>If the stay is <strong>under six months</strong>, you enter as a visitor: since April 2025 Spanish citizens need an <strong>ETA</strong> (Electronic Travel Authorisation), applied for online, which requires no translated documents. If it is longer than six months you need the Student visa described below, even for an exchange.</p>

      <h2>Undergraduate: Bachillerato diploma, grades and EBAU</h2>
      <p>The application goes through <strong>UCAS</strong> with the grades you declare yourself; the documents are requested afterwards by <strong>each university</strong>, usually when it makes you a conditional offer and again, in final form, at enrolment. For a Spanish student that normally means:</p>
      <ul>
        <li>The <strong>Título de Bachiller</strong> (or the receipt showing you have applied for it, if it has not been issued yet).</li>
        <li>The <strong>Bachillerato academic certificate</strong>, with the grades of both years.</li>
        <li>The <strong>EBAU results card or certificate</strong> (PAU or EvAU depending on the region), which turns the conditional offer into an unconditional one.</li>
        <li>An English certificate (IELTS, Cambridge or whichever that university accepts). It is already in English: no translation.</li>
      </ul>
      <p>Every university publishes its translation requirements, and they all look alike: a complete translation by a professional translator, with their name, signature, date and contact details. A Spanish sworn translation carries all of that and, on top, my appointment, which anyone can verify on the <a href="https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Traductores-as---Interpretes-Jurados-as.aspx" target="_blank" rel="noopener noreferrer">Ministry's register</a>. A money-saving tip: send only what the conditional offer asks for first, and leave the final EBAU results for July; they are translated in 24/48 hours and will not hold up your enrolment.</p>

      <h2>Master's and PhD: degree certificate and transcript</h2>
      <p>Here the two key documents are the <strong><a href="/traduccion-jurada-titulo-universitario">university degree certificate</a></strong> and the <strong>academic transcript</strong> (the <em>certificación académica personal</em> listing every module, credit and grade). Three details change the quote:</p>
      <ul>
        <li>If you do not have the physical diploma yet, the <strong>provisional certificate</strong> (<em>certificado supletorio</em>) or the fee receipt will do: I translate it in the same way and the university accepts it as provisional.</li>
        <li>Many Spanish universities issue the transcript <strong>in English</strong> or a bilingual <strong>Diploma Supplement</strong>. If yours is in English you do not need to translate it; send it over and I will confirm before charging you anything.</li>
        <li><strong>Reference letters</strong> are written by your lecturers directly in English on the university's platform; if one is in Spanish, it is translated as a separate document.</li>
      </ul>
      <p>A one-page degree certificate has a fixed price, <strong>${eur("titulo-universitario")}</strong>. The transcript depends on the number of pages and modules, so I give you a <strong>fixed quote within 2 hours</strong> once I see it, with no per-word rates.</p>

      <h2>The Student visa and the financial documents</h2>
      <p>If the course lasts more than six months you need a <strong>Student visa</strong>, applied for with the <strong>CAS</strong> (the confirmation number the university sends you once you have accepted the place). Besides your passport and the CAS, the Home Office wants proof that you can pay the fees and support yourself during the course, and that is where the Spanish-language documents appear:</p>
      <ul>
        <li><strong>Bank statements</strong> for the last few months (the money must have been in the account for at least 28 days). If the bank cannot issue them in English, they are translated.</li>
        <li>If the money is in your parents' account: a <strong>letter of consent</strong> signed by them, your <a href="/traduccion-jurada-partida-nacimiento">birth certificate</a> to prove the relationship (<strong>${eur("partida-nacimiento")}</strong>) and, sometimes, their <a href="/traduccion-jurada-certificado-empresa">payslips or employer's certificate</a> (<strong>${eur("certificado-empresa")}</strong>).</li>
        <li>If you are under 18, your parents' consent letter and your birth certificate are compulsory.</li>
        <li>A <strong>Spanish passport</strong> is not translated: it is multilingual.</li>
      </ul>
      <p>The Home Office requires every translation to include the translator's confirmation that it is accurate, the date, their full name and signature and their contact details. My sworn certification carries all of that, and I add my contact details on the certification itself so the caseworker does not have to look for them. If your file also includes documents for a family member or partner, see the guide on <a href="/en/blog/sworn-translation-uk-home-office-visas-settled-status-citizenship">sworn translations for the UK Home Office</a>.</p>

      <h2>Documents and prices at a glance</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>Document</th><th>What for</th><th>Translated?</th><th>Sworn translation price</th></tr></thead>
        <tbody>
          <tr><td>Título de Bachiller (secondary school diploma)</td><td>Undergraduate (offer and enrolment)</td><td>Yes</td><td>Fixed quote within 2 hours</td></tr>
          <tr><td>Bachillerato and EBAU grades</td><td>Undergraduate</td><td>Yes</td><td>Fixed quote within 2 hours</td></tr>
          <tr><td>University degree certificate (1 page)</td><td>Master's and PhD</td><td>Yes</td><td>${eur("titulo-universitario")}</td></tr>
          <tr><td>Academic transcript</td><td>Master's, PhD and exchanges</td><td>Only if your university does not issue it in English</td><td>${eur("expediente-academico")}</td></tr>
          <tr><td>Birth certificate</td><td>Visa (parents' funds, under-18s)</td><td>Yes</td><td>${eur("partida-nacimiento")}</td></tr>
          <tr><td>Parents' payslips or employer's certificate</td><td>Visa (funds)</td><td>Yes, if in Spanish</td><td>${eur("certificado-empresa")}</td></tr>
          <tr><td>Bank statements</td><td>Visa (funds)</td><td>Yes, if the bank cannot issue them in English</td><td>Fixed quote within 2 hours</td></tr>
          <tr><td>Passport</td><td>Everything</td><td>No</td><td>—</td></tr>
        </tbody>
      </table></div>
      <p>All prices are those of the <a href="/en/precios">price list</a>: per document, including certification, signature and stamp, an electronically signed PDF and a stamped copy of the original. If you send the whole set (degree + transcript + birth certificate) you get a single fixed price and a single delivery date.</p>

      <h2>Do I need an apostille?</h2>
      <p>For British universities and for the Student visa, <strong>no</strong>: the translation is enough. The Hague apostille comes into play on the way back, when you finish and want to have your British degree recognised in Spain. If a specific university asks for something different, its requirements list wins: send it to me and we will go through it together.</p>

      <h2>How we do it, and how long it takes</h2>
      <ol>
        <li><strong>You send me scans</strong> by WhatsApp, email or the <a href="/en/documentos">document catalogue</a>: a PDF or a sharp photo, with stamps and signatures legible.</li>
        <li><strong>Within 2 working hours</strong> I confirm what really needs translating, a fixed price and a delivery date in writing.</li>
        <li><strong>I translate, certify, sign and stamp</strong> each document, with modules, grades and names written identically across all of them.</li>
        <li><strong>You receive the electronically signed PDF</strong> in 24/48 hours for short documents; the transcript on the agreed date. Upload it as it is to the university or visa platform: if you print and rescan it, the electronic signature can no longer be verified. If paper is required, I courier it.</li>
      </ol>
      <p>A realistic calendar: applications go in between January and April, when a provisional transcript is usually enough; final grades arrive in June and July; enrolment and the visa follow in August and September. Translation is never the bottleneck, but August is when the files pile up: if you can, get it translated in July.</p>
      <p>
        <a href="https://wa.me/34685891214?text=Hi%20Elena%2C%20I%27m%20going%20to%20study%20in%20the%20UK%20and%20need%20my%20Spanish%20documents%20translated">Send me your documents on WhatsApp</a>
        and within 2 hours I will tell you what needs translating and what it costs. You can also read the
        <a href="/en/sworn-english-translator">sworn English translator</a> page or the guide to
        <a href="/en/blog/sworn-translations-leaving-spain-uk-ireland-canada-australia">sworn translations for leaving Spain</a>.
      </p>
    `,
    faq: [
      {
        q: "Do British universities require a sworn translation, or is a certified translation enough?",
        a: "They ask for a certified translation: a complete translation by a professional translator with their name, signature, date and contact details. A Spanish sworn translation meets those requirements and adds an official appointment that anyone can check on the Spanish Foreign Ministry's register.",
      },
      {
        q: "Do I have to translate my transcript if my university issues it in English?",
        a: "No. If the academic transcript or the Diploma Supplement is issued in English by your university, it is accepted as it is. Send it to me before ordering anything and I will confirm free of charge.",
      },
      {
        q: "How much does it cost to translate a degree certificate and a transcript for a UK master's?",
        a: `A one-page degree certificate costs ${eur("titulo-universitario")} and is delivered in 24/48 hours. The transcript is quoted once I see it, with a fixed price within 2 hours, because it depends on the number of pages and modules.`,
      },
      {
        q: "Do I need a visa for an Erasmus or exchange stay in the UK?",
        a: "If the stay lasts under six months, no: you enter as a visitor with an ETA, the electronic authorisation Spanish citizens have needed since April 2025. If it lasts longer, you need a Student visa with a CAS from the British university.",
      },
      {
        q: "Do my degree or grades need an apostille to study in the UK?",
        a: "No. Neither universities nor the Home Office ask for an apostille on these documents; the translation is enough. The apostille is needed in the opposite direction, when you come back with a British degree and want it recognised in Spain.",
      },
    ],
  },

  {
    slug: "sworn-translation-uk-home-office-visas-settled-status-citizenship",
    title: "Sworn translations for the UK Home Office: visas, settled status and British citizenship",
    excerpt:
      "The Home Office accepts certified translations and does not demand sworn ones: what UKVI actually requires, when a Spanish sworn translation is worth it, and which Spanish documents are translated for a visa, the EU Settlement Scheme (settled status) and British citizenship. Real prices.",
    date: "2026-09-27",
    updated: "2026-09-27",
    author: "Elena Peñaranda Ortega",
    tags: ["reino-unido", "extranjeria", "validez"],
    readingTime: "9 min",
    image: "/blog/post-visado-uk.jpg",
    alt: "Hands checking an official form on a folder of documents for a UK visa application",
    html: `
      <p>The Home Office <strong>does not require a sworn translation</strong>: it asks for a <em>certified translation</em>, that is, a complete translation accompanied by the translator's confirmation that it is accurate, with their name, signature, date and contact details. A Spanish sworn translation meets those requirements and goes further, because it is signed by a translator appointed by Spain's Ministry of Foreign Affairs whose number any caseworker can verify. A sworn translation is worth choosing when the same document will also be used in Spain, when a solicitor or a court asks for one, or when you want nobody to question who signed the translation. The usual certificates (birth, marriage, criminal record) cost <strong>from €${MIN_PRICE}</strong> and are delivered in 24/48 hours. I am Elena Peñaranda, sworn translator of English no. 7310, and this guide explains which Spanish documents get translated for a visa, for <em>settled status</em> and for British citizenship, and when a certified translation is enough.</p>

      <h2>What the Home Office actually requires of a translation</h2>
      <p>The <strong>UK Visas and Immigration (UKVI)</strong> guidance repeats the same rule for every application: any document that is not in English or Welsh must be accompanied by a full translation that includes:</p>
      <ul>
        <li>the <strong>translator's confirmation</strong> that it is an accurate translation of the original document;</li>
        <li>the <strong>date</strong> of the translation;</li>
        <li>the translator's <strong>full name and signature</strong>;</li>
        <li>their <strong>contact details</strong> (or those of the translation company).</li>
      </ul>
      <p>There is no UK list of "authorised" translators and no compulsory stamp: the responsibility rests with whoever signs. That is why a certified translation by any professional translator is accepted. Nor does the Home Office, as a rule, ask for an apostille: it works from digital copies uploaded to the application platform.</p>

      <h2>Sworn or certified: when each one makes sense</h2>
      <p>I provide both. A <strong>certified translation</strong> carries my statement of accuracy, the date, my signature and my contact details, exactly what UKVI asks for. A <strong>sworn translation</strong> carries, in addition, the certification in the official Spanish wording, my stamp with MAEC number 7310 and a stamped copy of the original, and it is legally valid in Spain. This is the rule I apply with my clients:</p>
      <div class="table-wrap"><table>
        <thead><tr><th>Situation</th><th>Best choice</th><th>Why</th></tr></thead>
        <tbody>
          <tr><td>The document will only ever be used in the UK (bank statements, payslips, letters)</td><td>Certified</td><td>Meets the UKVI requirement and you need nothing more</td></tr>
          <tr><td>Civil registry certificates (birth, marriage, registered partnership)</td><td>Sworn</td><td>You will reuse them: consulate, Spanish Civil Registry, inheritance, another visa. One translation serves all</td></tr>
          <tr><td>Criminal record certificates, judgments, court orders</td><td>Sworn</td><td>A court document translated by an officially appointed translator is never questioned</td></tr>
          <tr><td>A solicitor, court or employer asks for a "sworn" or "official" translation</td><td>Sworn</td><td>That is what they are describing; you avoid paying for a second translation</td></tr>
          <tr><td>Documents that will also go to a Spanish authority</td><td>Sworn</td><td>In Spain only a sworn translation is valid</td></tr>
          <tr><td>Appeal or reconsideration after a refusal</td><td>Sworn</td><td>Your lawyer will want a translation nobody can dispute</td></tr>
        </tbody>
      </table></div>
      <p>I tell you which one you need when I see the documents, before you pay, and the quote states in writing what you will receive. The difference between the two is explained in depth in <a href="/en/blog/sworn-vs-certified-translation-uscis-spain">sworn vs certified translation</a>.</p>

      <h2>Visas: which Spanish documents get translated</h2>
      <p>Spanish citizens do not need a visa to visit the UK (since April 2025 an <strong>ETA</strong>, the Electronic Travel Authorisation, is enough), but they do need one to live, work or study there. These are the files I translate most often:</p>
      <ul>
        <li><strong>Skilled Worker.</strong> For jobs in health, education and social care the Home Office requires a <a href="/traduccion-jurada-certificado-penales">criminal record certificate</a> from every country you have lived in for more than twelve months in the last ten years: the Spanish one is issued by the Ministry of Justice and needs translating (<strong>${eur("antecedentes-penales")}</strong>). If your Certificate of Sponsorship mentions a qualification, the <a href="/traduccion-jurada-titulo-universitario">degree certificate</a> too (<strong>${eur("titulo-universitario")}</strong>).</li>
        <li><strong>Family or partner visa.</strong> The <a href="/traduccion-jurada-certificado-matrimonio">marriage certificate</a> (<strong>${eur("certificado-matrimonio")}</strong>) or the registered-partnership (<em>pareja de hecho</em>) certificate, the children's <a href="/traduccion-jurada-partida-nacimiento">birth certificates</a> (<strong>${eur("partida-nacimiento")}</strong> each) and, for the financial requirement, <a href="/traduccion-jurada-certificado-empresa">payslips, an employer's certificate</a> (<strong>${eur("certificado-empresa")}</strong>), the employment contract and bank statements if they are in Spanish. The income threshold in force is set by the Home Office; your lawyer or the official guidance will tell you which one applies to you.</li>
        <li><strong>Student visa.</strong> Degree, transcript and financial evidence: covered in <a href="/en/blog/studying-in-the-uk-from-spain-documents-sworn-translation">studying in the UK from Spain</a>.</li>
        <li><strong>Children and dependants.</strong> Birth certificate, custody order or the other parent's consent if only one parent is travelling.</li>
      </ul>

      <h2>EU Settlement Scheme: settled and pre-settled status</h2>
      <p>The general deadline for the <em>EU Settlement Scheme</em> passed on 30 June 2021, but the scheme is still open: late applications are accepted with reasonable grounds, <strong>joining family members</strong> of an EU citizen who already holds status can apply, and holders of <em>pre-settled status</em> move to <em>settled status</em> after five years of continuous residence. In the first two cases the Home Office asks for evidence of the family relationship, and that is where the Spanish documents come in: the marriage or registered-partnership certificate, birth certificates and, where the relationship had to exist before 31 December 2020, dated documents that prove it. For the move from pre-settled to settled the evidence of residence is usually British (payslips, HMRC records, tenancy agreements) and is not translated; the Home Office also extends the status automatically and converts it to settled where its own data allow it to.</p>
      <p>Here the sworn translation is almost always worth it: the marriage certificate you upload to the EUSS is the same one you will need to register the marriage at the Spanish consulate or for an inheritance, and a single sworn translation serves all of them.</p>

      <h2>British citizenship by naturalisation</h2>
      <p>Naturalisation (form AN) requires, in short, five years of residence (three if you are married to a British citizen), settled status or indefinite leave to remain, the Life in the UK test, English at level B1 and good character. The documents a Spanish applicant usually has to translate are:</p>
      <ul>
        <li>the Spanish <strong>marriage certificate</strong>, if you apply on the spouse route;</li>
        <li>the children's <strong>birth certificates</strong>, if you register them as British citizens at the same time (form MN1);</li>
        <li>your <strong>own birth certificate</strong> or a change-of-name certificate, if your documents show different names or surnames (very common with the two Spanish surnames);</li>
        <li>in some cases, a <strong>university degree</strong> taught in English, to prove the language requirement without a test.</li>
      </ul>
      <p>The Home Office does not ask for a Spanish criminal record certificate for naturalisation: it checks its own databases and asks you to declare any conviction. One warning that is not about translation but is worth knowing: a Spanish citizen who acquires another nationality while living abroad may need to declare at the consulate their wish to keep Spanish nationality; ask your consulate.</p>

      <h2>Summary table: document, procedure, type of translation and price</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>Spanish document</th><th>Typical procedure</th><th>Certified or sworn</th><th>Sworn translation price</th></tr></thead>
        <tbody>
          <tr><td>Marriage or registered-partnership certificate</td><td>Family visa, EUSS (family members), naturalisation as a spouse</td><td>Sworn</td><td>${eur("certificado-matrimonio")}</td></tr>
          <tr><td>Birth certificate</td><td>Dependent children, EUSS, registering children (MN1)</td><td>Sworn</td><td>${eur("partida-nacimiento")}</td></tr>
          <tr><td>Criminal record certificate</td><td>Skilled Worker in health, education and social care</td><td>Sworn</td><td>${eur("antecedentes-penales")}</td></tr>
          <tr><td>University degree certificate</td><td>Skilled Worker, Student, English requirement</td><td>Sworn or certified</td><td>${eur("titulo-universitario")}</td></tr>
          <tr><td>Payslips and employer's certificate</td><td>Family visa financial requirement</td><td>Certified is usually enough</td><td>${eur("certificado-empresa")}</td></tr>
          <tr><td>Bank statements, contracts, letters</td><td>Financial requirement, accommodation</td><td>Certified is usually enough</td><td>Fixed quote within 2 hours</td></tr>
          <tr><td>Court orders (divorce, custody)</td><td>Family visa, children</td><td>Sworn</td><td>Fixed quote within 2 hours</td></tr>
        </tbody>
      </table></div>
      <p>Prices from the <a href="/en/precios">price list</a>, per standard one-page document; longer documents are quoted once I see them. Send me the complete file and you get a single price and a single date.</p>

      <h2>How I do it so UKVI raises no objections</h2>
      <ol>
        <li><strong>You send me scans</strong> by WhatsApp, email or the <a href="/en/documentos">document catalogue</a>, complete and legible.</li>
        <li><strong>Within 2 working hours</strong> I tell you what needs translating, whether sworn or certified is the better choice for each document, a fixed price and a delivery date in writing.</li>
        <li><strong>I translate and certify</strong> each document with the wording UKVI requires, my contact details on the certification itself and, for sworn translations, my stamp and electronic signature.</li>
        <li><strong>You receive the signed PDF</strong> in 24/48 hours for short certificates. Upload it as it is to the Home Office platform: printing and rescanning breaks the electronic signature. If a procedure requires paper, I courier the original to the UK; the courier cost is stated in the quote.</li>
      </ol>
      <p>If what you have is a British document to present in Spain (a GRO birth certificate, a police certificate, a <em>grant of probate</em>), the direction is reversed and there a sworn translation is compulsory: see the guide for <a href="/en/sworn-translation-british-residents-spain">British residents in Spain</a>. And if you doubt the validity of a translation you have already been given, read <a href="/en/blog/how-to-check-sworn-translation-valid-spain">how to check whether a sworn translation is valid</a>.</p>
      <p>
        <a href="https://wa.me/34685891214?text=Hi%20Elena%2C%20I%27m%20preparing%20a%20Home%20Office%20application%20and%20need%20Spanish%20documents%20translated">Message me on WhatsApp with your list of documents</a>
        and within 2 hours I will confirm what needs translating, sworn or certified, a fixed price and the deadline. You can also read the
        <a href="/en/sworn-english-translator">sworn English translator</a> page.
      </p>
    `,
    faq: [
      {
        q: "Does the Home Office require a sworn translation?",
        a: "No. It asks for a certified translation: a complete translation with the translator's confirmation that it is accurate, the date, their full name, signature and contact details. A Spanish sworn translation meets those requirements and adds the official appointment by Spain's Ministry of Foreign Affairs.",
      },
      {
        q: "So when is a sworn translation better than a certified one?",
        a: "When the document will also be used in Spain (birth, marriage or registered-partnership certificates), when it is a court document or a criminal record certificate, when a solicitor or court asks for a sworn or official translation, or in an appeal. For bank statements, payslips or letters used only in the UK, a certified translation is usually enough.",
      },
      {
        q: "Do Spanish documents need an apostille for the Home Office?",
        a: "As a rule, no. The Home Office works from digital copies and the translation is enough. An apostille is only needed if another authority in the process, for example a British court or registry, expressly requires it.",
      },
      {
        q: "Can I upload an electronically signed PDF translation to the UKVI platform?",
        a: "Yes. Upload the PDF exactly as I send it, without printing or rescanning it, so the electronic signature remains verifiable. If a specific procedure requires paper, I courier the original to the UK.",
      },
      {
        q: "How much does it cost to translate the documents for a partner visa?",
        a: `The marriage certificate costs ${eur("certificado-matrimonio")}, each birth certificate ${eur("partida-nacimiento")} and the employer's certificate or payslip ${eur("certificado-empresa")}, delivered in 24/48 hours. Bank statements and contracts are quoted once I see them; with the complete file you get a single fixed price within 2 hours.`,
      },
    ],
  },
];

export function getAllPostsEn() {
  return postsEn.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostEnBySlug(slug) {
  return postsEn.find((p) => p.slug === slug);
}
