// app/traductor-jurado-murcia/page.js
import TrackedLink from "../components/TrackedLink";
import { SectionHeading } from "../components/ui";
import { WHATSAPP_URL } from "../../content/site";

export const metadata = {
  title: "Traductor Jurado en Murcia · Traducción Jurada de Inglés",
  description:
    "Traductora jurada de inglés con sede en Murcia (MAEC nº 7310). Entrega digital en 24/48 h y envío en papel por mensajería a Murcia capital y pedanías. Presupuesto en minutos.",
  alternates: {
    canonical: "https://juradaexpress.es/traductor-jurado-murcia",
  },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">
        Traductor jurado de inglés en Murcia
      </h1>
      <p className="mt-4 max-w-[68ch] text-lg text-slate-600">
        Soy Elena Peñaranda, traductora jurada de inglés con sede en Murcia y
        nº de acreditación 7310 del MAEC. Trabajo con clientes de Murcia
        capital, de las pedanías y de toda la Región — y como el proceso es
        100% digital, no necesitas desplazarte a ninguna oficina.
      </p>

      <SectionHeading as="h2" className="mt-12 !text-2xl md:!text-3xl">
        Cómo trabajo con clientes de Murcia
      </SectionHeading>
      <div className="mt-4 max-w-[68ch] space-y-4 text-slate-600">
        <p>
          Me envías el documento escaneado por WhatsApp o email y te doy
          precio cerrado y plazo en menos de 2 horas. Recibes el PDF firmado
          digitalmente en 24/48 h, con la misma validez que el papel, y si tu
          organismo pide el original en papel, te lo envío por mensajería a
          cualquier punto de la Región de Murcia — normalmente lo tienes al
          día siguiente de la entrega digital.
        </p>
        <p>
          Los trámites más habituales aquí son los mismos que en el resto de
          España: extranjería y nacionalidad en la Oficina de Extranjería de
          Murcia, expedientes académicos para la UMU y la UPCT, y
          compraventas ante notario en la costa. Si tu trámite es de la
          administración regional, dímelo y adapto la entrega a lo que te
          pidan.
        </p>
      </div>

      <SectionHeading as="h2" className="mt-12 !text-2xl md:!text-3xl">
        ¿Y si no estoy en Murcia?
      </SectionHeading>
      <p className="mt-4 max-w-[68ch] text-slate-600">
        Nada cambia. La traducción jurada es válida en toda España y el envío
        digital llega igual a Cartagena, a Madrid o a Londres. La sede en
        Murcia solo significa que el papel, si lo necesitas, sale desde aquí.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <TrackedLink
          label="murcia_presupuesto"
          href="/documentos"
          className="btn btn-primary"
        >
          Pedir presupuesto
        </TrackedLink>
        <TrackedLink
          label="murcia_whatsapp"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          WhatsApp
        </TrackedLink>
      </div>

      <p className="mt-8 text-sm text-slate-500">
        ¿Buscas información general del servicio? Consulta{" "}
        <a href="/precios" className="link">
          precios
        </a>
        ,{" "}
        <a href="/como-funciona" className="link">
          cómo funciona
        </a>{" "}
        o el{" "}
        <a href="/documentos" className="link">
          catálogo de documentos
        </a>
        .
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                name: "Traducción jurada de inglés en Murcia",
                serviceType: "Traducción jurada Español ⇆ Inglés",
                url: "https://juradaexpress.es/traductor-jurado-murcia",
                provider: {
                  "@type": "ProfessionalService",
                  name: "JuradaExpress",
                  url: "https://juradaexpress.es/",
                },
                areaServed: {
                  "@type": "AdministrativeArea",
                  name: "Región de Murcia",
                },
              },
              {
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
                    name: "Traductor jurado en Murcia",
                    item: "https://juradaexpress.es/traductor-jurado-murcia",
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
