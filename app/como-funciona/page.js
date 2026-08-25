// app/como-funciona/page.js
import TrackedLink from "../components/TrackedLink";
import ProcessTimeline from "../components/ProcessTimeline";
import ProcessVideo from "../components/ProcessVideo";
import { SectionHeading } from "../components/ui";
import { WHATSAPP_URL } from "../../content/site";

export const metadata = {
  title: "Cómo funciona la traducción jurada, paso a paso",
  description:
    "El proceso completo de tu traducción jurada: cómo enviar el documento, qué recibes (PDF firmado digitalmente y papel), cómo pagar y qué pasa si el organismo pide el original en papel.",
  alternates: {
    canonical: "https://juradaexpress.es/como-funciona",
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
        Cómo funciona, paso a paso
      </h1>
      <p className="mt-4 max-w-[68ch] text-lg text-slate-600">
        Todo el proceso es digital y sin desplazamientos: desde que me envías
        el documento hasta que presentas la traducción. Así es cada paso, sin
        letra pequeña.
      </p>

      <ProcessTimeline
        steps={[
          {
            t: "Envío",
            d: "Me mandas el documento escaneado por email o WhatsApp.",
          },
          {
            t: "Presupuesto",
            d: "Te doy precio cerrado y plazo real en menos de 2 horas.",
          },
          {
            t: "Traducción jurada",
            d: "Traduzco, firmo y sello personalmente tu documento.",
          },
          {
            t: "Entrega 24/48 h",
            d: "PDF firmado digitalmente y, si lo necesitas, papel por mensajería.",
          },
        ]}
      />

      <ProcessVideo className="mt-10 aspect-video" />

      <SectionHeading as="h2" className="mt-12 !text-2xl md:!text-3xl">
        Qué recibes exactamente
      </SectionHeading>
      <div className="mt-4 max-w-[68ch] space-y-4 text-slate-600">
        <p>
          Recibes un <strong className="text-slate-900">PDF con mi firma
          electrónica cualificada</strong>, mi sello y mi certificación en
          cada página, más una copia del documento original adjunta, tal y
          como exige la normativa. Ese PDF es válido para presentarlo
          telemáticamente ante cualquier administración: la firma se verifica
          con un clic y mi número de acreditación (7310) figura en el listado
          público del MAEC.
        </p>
        <p>
          Si además quieres el papel, imprimo la traducción, la firmo y sello
          en tinta y te la envío por mensajería a cualquier punto de España o
          del Reino Unido. El papel no cuesta más por ser papel: solo se
          añade el gasto de envío, que te confirmo en el presupuesto.
        </p>
      </div>

      <SectionHeading as="h2" className="mt-12 !text-2xl md:!text-3xl">
        Cómo se paga
      </SectionHeading>
      <p className="mt-4 max-w-[68ch] text-slate-600">
        Como prefieras: online con tarjeta desde el{" "}
        <a href="/documentos" className="link">
          catálogo de documentos
        </a>{" "}
        (pago seguro con Stripe) o por transferencia una vez confirmado el
        presupuesto. Nunca hay cobros automáticos: siempre sabes el precio
        cerrado antes de pagar, y la factura llega con la entrega.
      </p>

      <SectionHeading as="h2" className="mt-12 !text-2xl md:!text-3xl">
        ¿Y si el organismo pide papel?
      </SectionHeading>
      <p className="mt-4 max-w-[68ch] text-slate-600">
        Pasa cada vez menos, pero pasa. Si al presentar el PDF te piden el
        original físico, avísame: imprimo y envío la misma traducción firmada
        en tinta, sin volver a cobrarte el trabajo de traducción. Por eso
        conviene decirme desde el principio ante qué organismo va tu
        documento — si sé que esa oficina suele pedir papel, lo preparo todo
        de una vez.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <TrackedLink
          label="comofunciona_presupuesto"
          href="/documentos"
          className="btn btn-primary"
        >
          Pedir presupuesto
        </TrackedLink>
        <TrackedLink
          label="comofunciona_whatsapp"
          href={WHATSAPP_URL}
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
                name: "Inicio",
                item: "https://juradaexpress.es/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Cómo funciona",
                item: "https://juradaexpress.es/como-funciona",
              },
            ],
          }),
        }}
      />
    </main>
  );
}
