// app/traduccion-jurada-britanicos-espana/page.js
import TrackedLink from "../components/TrackedLink";
import { SectionHeading } from "../components/ui";
import { DOCUMENTS } from "../../content/documents";

export const metadata = {
  title: "Traducción jurada para británicos en España — guía por trámite",
  description:
    "Guía práctica para británicos residentes en España: qué documentos necesitan traducción jurada para el NIE/TIE, el empadronamiento, la compra de vivienda, el matrimonio, el carné de conducir y la pensión. Precios desde y plazos reales.",
  alternates: {
    canonical: "https://juradaexpress.es/traduccion-jurada-britanicos-espana",
    languages: {
      es: "https://juradaexpress.es/traduccion-jurada-britanicos-espana",
      en: "https://juradaexpress.es/en/sworn-translation-british-residents-spain",
      "x-default":
        "https://juradaexpress.es/traduccion-jurada-britanicos-espana",
    },
  },
};

const priceOf = (id) => DOCUMENTS.find((d) => d.id === id)?.price ?? null;

const TRAMITES = [
  {
    title: "NIE y tarjeta de residencia (TIE)",
    docs: "Certificado de antecedentes penales del Reino Unido (ACRO), certificado de nacimiento y, según el caso, certificado de matrimonio.",
    apostille:
      "Apostilla: sí en los penales (la pide Extranjería); nacimiento y matrimonio, según la oficina — confírmalo antes y te lo traduzco con apostilla incluida.",
    price: priceOf("antecedentes-penales"),
    time: "24/48 h",
    href: "/traduccion-jurada-certificado-penales",
  },
  {
    title: "Empadronamiento",
    docs: "Normalmente basta el pasaporte y el contrato de alquiler o escritura; algunos ayuntamientos piden traducción jurada del certificado de nacimiento para menores.",
    apostille: "Apostilla: normalmente no.",
    price: priceOf("partida-nacimiento"),
    time: "24/48 h",
    href: "/traduccion-jurada-partida-nacimiento",
  },
  {
    title: "Compra de vivienda",
    docs: "Poderes notariales, contratos de reserva o arras y documentación bancaria del Reino Unido para la notaría.",
    apostille:
      "Apostilla: sí en poderes otorgados ante notario británico; en contratos privados, no.",
    price: null,
    time: "Según extensión — presupuesto cerrado en menos de 2 h",
    href: "/traduccion-jurada-contrato-escritura",
  },
  {
    title: "Matrimonio en España",
    docs: "Certificado de nacimiento y certificado de no impedimento (CNI); si hay divorcio previo, la sentencia.",
    apostille: "Apostilla: sí, en los certificados británicos.",
    price: priceOf("partida-nacimiento"),
    time: "24/48 h",
    href: "/traduccion-jurada-certificado-matrimonio",
  },
  {
    title: "Canje del carné de conducir",
    docs: "Tras el acuerdo posterior al Brexit, la DGT puede pedir traducción jurada del permiso o de certificados de la DVLA.",
    apostille: "Apostilla: normalmente no.",
    price: priceOf("permiso-conducir"),
    time: "24 h",
    href: "/documentos",
  },
  {
    title: "Pensión y Seguridad Social",
    docs: "Vidas laborales británicas, cartas del HMRC o del DWP y certificados de nacimiento para tramitar pensiones en España.",
    apostille: "Apostilla: según el organismo — te lo confirmo al ver el documento.",
    price: priceOf("certificado-empresa"),
    time: "24/48 h",
    href: "/documentos",
  },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">
        Traducción jurada para británicos residentes en España
      </h1>
      <p className="mt-4 max-w-[68ch] text-lg text-slate-600">
        Si te has instalado en España con documentos británicos, tarde o
        temprano un organismo te pedirá su traducción jurada. Esta guía va
        trámite a trámite: qué documento se traduce, si lleva apostilla, el
        precio desde y el plazo habitual. Y si tu caso no aparece,
        pregúntame por WhatsApp y te lo confirmo al momento.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {TRAMITES.map((t) => (
          <article
            key={t.title}
            className="rounded-xl bg-white p-6 ring-1 ring-stone-200"
          >
            <h2 className="text-xl font-semibold leading-snug text-brand-navy md:text-2xl">
              {t.title}
            </h2>
            <p className="mt-3 text-sm text-slate-600">{t.docs}</p>
            <p className="mt-2 text-sm text-slate-600">{t.apostille}</p>
            <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-stone-200 pt-3 text-sm">
              <span className="font-semibold tabular-nums text-slate-900">
                {t.price != null
                  ? `desde ${t.price} €`
                  : "presupuesto cerrado en menos de 2 h"}
              </span>
              <span className="text-slate-500">{t.time}</span>
            </div>
            <p className="mt-3">
              <a href={t.href} className="link text-sm">
                Más sobre este documento →
              </a>
            </p>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-xl bg-stone-50 p-6 ring-1 ring-stone-200 md:p-8">
        <SectionHeading as="h2" className="!text-2xl md:!text-3xl">
          ¿No tienes claro qué te van a pedir?
        </SectionHeading>
        <p className="mt-3 max-w-[68ch] text-slate-600">
          Mándame una foto o escaneo del documento y el nombre del trámite.
          Te digo si necesita apostilla, qué se traduce exactamente y el
          precio cerrado — en menos de 2 horas, sin compromiso.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <TrackedLink
            label="britanicos_presupuesto"
            href="/documentos"
            className="btn btn-primary"
          >
            Pedir presupuesto
          </TrackedLink>
          <TrackedLink
            label="britanicos_whatsapp"
            href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20soy%20brit%C3%A1nico%2Fa%20y%20necesito%20traducci%C3%B3n%20jurada%20para%20un%20tr%C3%A1mite%20en%20Espa%C3%B1a"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            WhatsApp
          </TrackedLink>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          También puedes leer esta guía en inglés:{" "}
          <a
            href="/en/sworn-translation-british-residents-spain"
            className="link"
          >
            Sworn translation for British residents in Spain
          </a>
          .
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                name: "Traducción jurada para británicos residentes en España",
                serviceType: "Traducción jurada Español ⇆ Inglés",
                provider: {
                  "@type": "ProfessionalService",
                  name: "JuradaExpress",
                  url: "https://juradaexpress.es/",
                },
                areaServed: [
                  { "@type": "Country", name: "ES" },
                  { "@type": "Country", name: "GB" },
                ],
                availableLanguage: ["es", "en"],
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
                    name: "Traducción jurada para británicos en España",
                    item: "https://juradaexpress.es/traduccion-jurada-britanicos-espana",
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
