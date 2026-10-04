// app/sobre-mi/page.js
import Image from "next/image";
import TrackedLink from "../../components/TrackedLink";
import { SectionHeading } from "../../components/ui";
import {
  WHATSAPP_URL,
  TIMEZONE_NOTE,
} from "../../../content/site";
import {
  personRef,
  SINCE,
  yearsOfExperience,
  MAEC_URL,
} from "../../../content/persona";

export const metadata = {
  title: "Sobre mí — Elena Peñaranda, Traductora Jurada de Inglés (MAEC nº 7310)",
  description:
    "Elena Peñaranda, traductora jurada de inglés (MAEC nº 7310). Traduzco, firmo y sello cada traducción jurada; entrega digital en el día (hasta 10 págs.).",
  alternates: {
    canonical: "https://juradaexpress.es/sobre-mi",
    languages: {
      es: "https://juradaexpress.es/sobre-mi",
      en: "https://juradaexpress.es/en/about",
      "x-default": "https://juradaexpress.es/sobre-mi",
    },
  },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">
        Sobre mí
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
            Soy <strong className="text-brand-navy">Elena Peñaranda Ortega</strong>,
            Traductora-Intérprete Jurada de Inglés nombrada en {SINCE} por el
            Ministerio de Asuntos Exteriores, Unión Europea y Cooperación con
            el nº de acreditación 7310: {yearsOfExperience()} años traduciendo,
            firmando y sellando documentos oficiales. Puedes comprobar mi
            nombramiento en el{" "}
            <a
              href={MAEC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              listado oficial de traductores jurados del MAEC
            </a>
            .
          </p>
          <p className="mt-4 text-slate-600">
            Trabajo entre el español y el inglés con particulares, familias y
            pymes: trámites de nacionalidad y extranjería, expedientes para
            universidades británicas, compraventas ante notario y todo lo que
            un organismo oficial pueda pedirte con firma y sello. Con sede en
            Murcia y proceso 100% digital, atiendo a clientes de toda España,
            Reino Unido, Irlanda, Estados Unidos, Canadá, India, Australia y
            cualquier otro país. Para trámites de inmigración en Estados
            Unidos también hago{" "}
            <a href="/traduccion-certificada-uscis" className="link">
              traducciones certificadas para USCIS
            </a>
            .
          </p>
          <p className="mt-4 text-slate-600">{TIMEZONE_NOTE.es}.</p>
        </div>
      </div>

      <SectionHeading as="h2" className="mt-12 !text-2xl md:!text-3xl">
        Mi nombramiento, comprobable
      </SectionHeading>
      <figure className="mt-4 max-w-[720px]">
        <Image
          src="/fotos/maec-listado-7310.png"
          alt="Entrada de Elena Peñaranda Ortega, nº 7310, en el buscador oficial de traductores jurados del Ministerio de Asuntos Exteriores"
          width={1570}
          height={196}
          sizes="(min-width: 768px) 720px, 100vw"
          className="h-auto w-full rounded-lg border border-slate-200"
        />
        <figcaption className="mt-3 text-sm text-slate-600">
          Captura del buscador oficial del Ministerio de Asuntos Exteriores,
          Unión Europea y Cooperación. Puedes comprobarlo tú mismo:{" "}
          <a
            href={MAEC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            entra en el buscador
          </a>{" "}
          y escribe «Peñaranda» en Apellidos.
        </figcaption>
      </figure>

      <SectionHeading as="h2" className="mt-12 !text-2xl md:!text-3xl">
        Cómo firmo y sello
      </SectionHeading>
      <div className="mt-4 max-w-[68ch] space-y-4 text-slate-600">
        <p>
          Cada encargo lo traduzco yo, sin intermediarios. Al terminar, añado
          mi certificación, mi sello y mi firma en cada página, tal y como
          exige la normativa del MAEC. Recibes un{" "}
          <strong className="text-slate-900">
            PDF firmado con certificado digital
          </strong>
          , válido para presentarlo telemáticamente, y, si tu organismo pide
          papel, te envío el original por mensajería a cualquier punto de
          España o del Reino Unido.
        </p>
        <p>
          ¿Cómo sabes que es válida? Cualquier funcionario puede verificar mi
          número de acreditación (7310) en el listado público del Ministerio,
          y la firma electrónica del PDF se comprueba con un clic. Es la misma
          validez que la traducción en papel: lo dice la normativa y lo
          confirman a diario registros civiles, universidades y extranjería.
        </p>
        <p>
          Si tienes dudas sobre si tu documento necesita apostilla, o si te
          vale la entrega digital, pregúntame antes de pagar nada: te
          respondo en menos de 2 horas en horario laboral, con presupuesto
          cerrado y plazo real.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <TrackedLink
          label="sobremi_presupuesto"
          href="/documentos"
          className="btn btn-primary"
        >
          Pedir presupuesto
        </TrackedLink>
        <TrackedLink
          label="sobremi_whatsapp"
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
            "@graph": [
              // La entidad Person completa se emite en el footer (SiteShell,
              // content/persona.js); aquí solo se referencia por @id para no
              // duplicar datos con dos identificadores distintos.
              {
                ...personRef("es"),
                mainEntityOfPage: "https://juradaexpress.es/sobre-mi",
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
                    name: "Sobre mí",
                    item: "https://juradaexpress.es/sobre-mi",
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
