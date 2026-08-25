// app/en/how-it-works/page.js
import TrackedLink from "../../components/TrackedLink";
import ProcessTimeline from "../../components/ProcessTimeline";
import ProcessVideo from "../../components/ProcessVideo";
import { SectionHeading } from "../../components/ui";
import { WHATSAPP_URL_EN } from "../../../content/site";

export const metadata = {
  title: "How sworn translation works, step by step",
  description:
    "The whole sworn translation process: how to send your document, what you receive (digitally signed PDF and paper), how to pay, and what happens if the office insists on paper.",
  alternates: {
    canonical: "https://juradaexpress.es/en/how-it-works",
    languages: {
      es: "https://juradaexpress.es/como-funciona",
      en: "https://juradaexpress.es/en/how-it-works",
      "x-default": "https://juradaexpress.es/como-funciona",
    },
  },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">
        How it works, step by step
      </h1>
      <p className="mt-4 max-w-[68ch] text-lg text-slate-600">
        The whole process is digital, with no appointments and no queues —
        from sending your document to presenting the translation. Here's each
        step, with no small print.
      </p>

      <ProcessTimeline
        steps={[
          {
            t: "Send",
            d: "Send me a scan or photo of your document by email or WhatsApp.",
          },
          {
            t: "Quote",
            d: "You get a fixed price and a real delivery time within 2 hours.",
          },
          {
            t: "Sworn translation",
            d: "I translate, sign and stamp your document personally.",
          },
          {
            t: "Delivery in 24/48h",
            d: "A digitally signed PDF and, if you need it, paper by courier.",
          },
        ]}
      />

      <ProcessVideo className="mt-10 aspect-video" />

      <SectionHeading as="h2" className="mt-12 !text-2xl md:!text-3xl">
        What you receive
      </SectionHeading>
      <div className="mt-4 max-w-[68ch] space-y-4 text-slate-600">
        <p>
          You receive a{" "}
          <strong className="text-slate-900">
            PDF with my qualified electronic signature
          </strong>
          , my stamp and my certification on every page, plus a copy of the
          original document attached, exactly as Spanish regulations require.
          That PDF is valid for online submissions to any Spanish authority:
          the signature can be verified in one click and my accreditation
          number (7310) is on the Ministry's public register.
        </p>
        <p>
          If you also want paper, I print the translation, sign and stamp it
          in ink and courier it to any address in Spain or the UK. Paper
          doesn't cost extra as such — only the delivery charge, confirmed
          in your quote.
        </p>
      </div>

      <SectionHeading as="h2" className="mt-12 !text-2xl md:!text-3xl">
        How to pay
      </SectionHeading>
      <p className="mt-4 max-w-[68ch] text-slate-600">
        Whichever suits you: online by card from the{" "}
        <a href="/en/documentos" className="link">
          document catalogue
        </a>{" "}
        (secure payment with Stripe) or by bank transfer once your quote is
        confirmed. There are never automatic charges: you always know the
        fixed price before paying, and the invoice arrives with your
        delivery.
      </p>

      <SectionHeading as="h2" className="mt-12 !text-2xl md:!text-3xl">
        What if the office insists on paper?
      </SectionHeading>
      <p className="mt-4 max-w-[68ch] text-slate-600">
        It happens less and less, but it happens. If you present the PDF and
        they ask for the physical original, let me know: I'll print and post
        the same translation signed in ink, without charging the translation
        work again. That's why it helps to tell me from the start which
        office your document is for — if I know they tend to ask for paper,
        I'll prepare everything in one go.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <TrackedLink
          label="howitworks_quote_en"
          href="/en/documentos"
          className="btn btn-primary"
        >
          Request a quote
        </TrackedLink>
        <TrackedLink
          label="howitworks_whatsapp_en"
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
                name: "How it works",
                item: "https://juradaexpress.es/en/how-it-works",
              },
            ],
          }),
        }}
      />
    </main>
  );
}
