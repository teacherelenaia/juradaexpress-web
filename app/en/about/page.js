// app/en/about/page.js
import TrackedLink from "../../components/TrackedLink";
import { SectionHeading } from "../../components/ui";
import { WHATSAPP_URL_EN } from "../../../content/site";

export const metadata = {
  title: "About me — Elena Peñaranda, Sworn Translator of English (MAEC no. 7310)",
  description:
    "I'm Elena Peñaranda Ortega, Sworn Translator-Interpreter of English appointed by Spain's Ministry of Foreign Affairs (no. 7310). I personally translate, sign and stamp every sworn translation, delivered digitally in 24/48h.",
  alternates: {
    canonical: "https://juradaexpress.es/en/about",
    languages: {
      es: "https://juradaexpress.es/sobre-mi",
      en: "https://juradaexpress.es/en/about",
      "x-default": "https://juradaexpress.es/sobre-mi",
    },
  },
};

const MAEC_URL =
  "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Traductores-as---Interpretes-Jurados-as.aspx";

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">
        About me
      </h1>

      <div className="mt-8 flex items-start gap-6">
        <div
          className="hidden h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-stone-100 font-display text-3xl font-semibold tracking-tight text-brand-navy sm:flex"
          aria-hidden="true"
        >
          E.P.
        </div>
        <div className="max-w-[68ch]">
          <p className="text-lg text-slate-700">
            I'm <strong className="text-brand-navy">Elena Peñaranda Ortega</strong>,
            a Sworn Translator-Interpreter of English appointed by the Spanish
            Ministry of Foreign Affairs, European Union and Cooperation under
            accreditation no. 7310. You can check my appointment on the{" "}
            <a
              href={MAEC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Ministry's official register of sworn translators
            </a>
            .
          </p>
          <p className="mt-4 text-slate-600">
            I work between Spanish and English for individuals, families and
            small businesses: citizenship and immigration paperwork,
            transcripts for British universities, property purchases before a
            notary, and anything a Spanish official body may ask you to
            present signed and stamped. Based in Murcia with a fully digital
            process, I work with clients across Spain and the UK.
          </p>
        </div>
      </div>

      <SectionHeading as="h2" className="mt-12 !text-2xl md:!text-3xl">
        How I sign and stamp
      </SectionHeading>
      <div className="mt-4 max-w-[68ch] space-y-4 text-slate-600">
        <p>
          I translate every job myself — no middlemen. When it's done, I add
          my certification, stamp and signature to every page, exactly as the
          Ministry's rules require. You receive a{" "}
          <strong className="text-slate-900">
            PDF signed with a digital certificate
          </strong>
          , valid for online submissions, and if your office asks for paper,
          I'll courier the original anywhere in Spain or the UK.
        </p>
        <p>
          How do you know it's valid? Any official can verify my
          accreditation number (7310) on the Ministry's public register, and
          the PDF's electronic signature can be checked in one click. It
          carries the same validity as the paper version — that's what the
          regulations say, and it's confirmed every day by civil registries,
          universities and immigration offices.
        </p>
        <p>
          If you're not sure whether your document needs an apostille, or
          whether digital delivery will be accepted, ask me before paying
          anything: I'll reply within 2 working hours with a fixed quote and
          a real delivery time.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <TrackedLink
          label="about_quote_en"
          href="/en/documentos"
          className="btn btn-primary"
        >
          Request a quote
        </TrackedLink>
        <TrackedLink
          label="about_whatsapp_en"
          href={WHATSAPP_URL_EN}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          WhatsApp
        </TrackedLink>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                name: "Elena Peñaranda Ortega",
                jobTitle: "Sworn Translator-Interpreter of English",
                url: "https://juradaexpress.es/en/about",
                worksFor: {
                  "@type": "ProfessionalService",
                  name: "JuradaExpress",
                  url: "https://juradaexpress.es/",
                },
                hasCredential: {
                  "@type": "EducationalOccupationalCredential",
                  credentialCategory: "Sworn Translator-Interpreter",
                  identifier: "7310",
                  recognizedBy: {
                    "@type": "GovernmentOrganization",
                    name: "Spanish Ministry of Foreign Affairs, European Union and Cooperation",
                  },
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://juradaexpress.es/en",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "About me",
                    item: "https://juradaexpress.es/en/about",
                  },
                ],
              },
            ],
          }),
        }}
      />
    </main>
  );
}
