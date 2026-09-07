// app/components/SiteShell.js
//
// Cabecera, footer y JSON-LD de la entidad, compartidos por los dos root
// layouts (app/(es)/layout.js y app/en/layout.js). Cada root layout pone
// su propio <html lang> (es / en) sin convertir el sitio en dinámico; el
// contenido de la cabecera lo localizan los componentes cliente (MainNav,
// MobileNav, HeaderActions) y el footer se localiza aquí por `locale`.
import CookieConsent from "./CookieConsent";
import ActionBar from "./ActionBar";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import LanguageSwitcher from "./LanguageSwitcher";
import HeaderActions from "./HeaderActions";
import SocialIcons from "./SocialIcons";
import {
  INSTAGRAM_URL,
  FACEBOOK_URL,
  GOOGLE_BUSINESS_URL,
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  SERVICE_COUNTRIES,
  EXTRA_AREA_SERVED,
} from "../../content/site";
import { getPublishableReviews } from "../../content/reviews";
import { SERVICE_ROUTES, INTERNATIONAL_MENU } from "../../content/servicios/routes";

// aggregateRating solo si hay reseñas publicables (se lee en build).
const PUBLISHED_REVIEWS = getPublishableReviews().length;

// Las cuatro líneas de servicio del catálogo (JSON-LD hasOfferCatalog).
const SERVICE_LINES = [
  {
    name: "Traducción jurada español-inglés",
    description:
      "Traducción jurada con firma y sello de traductora nombrada por el MAEC, válida ante organismos oficiales. Entrega en PDF firmado en 24/48 h.",
    url: "https://juradaexpress.es/documentos",
  },
  {
    name: "Traducción certificada para USCIS",
    description:
      "Traducción completa al inglés con certificación de exactitud y competencia conforme a 8 CFR § 103.2(b)(3), un certificado por documento.",
    url: "https://juradaexpress.es/traduccion-certificada-uscis",
  },
  {
    name: "Expediente de visado de nómada digital",
    description:
      "Revisión de la lista de documentos, aviso de apostillas y traducción jurada de todo el lote con un único plazo.",
    url: "https://juradaexpress.es/traduccion-jurada-visado-nomada-digital",
  },
  {
    name: "Proyectos urgentes y grandes volúmenes",
    description:
      "Expedientes completos y lotes de documentos para particulares, empresas y despachos, con presupuesto y plazo cerrados por escrito.",
    url: "https://juradaexpress.es/traduccion-jurada-urgente-grandes-volumenes",
  },
  {
    name: "Traducción jurada para clientes de Irlanda",
    description:
      "Documentos irlandeses para trámites en España y documentos españoles con traducción certificada para Irish Immigration, universidades y HSE.",
    url: "https://juradaexpress.es/traduccion-jurada-irlanda",
    areaServed: "IE",
  },
  {
    name: "Traducción jurada para clientes de Canadá",
    description:
      "Documentos canadienses apostillados para España y documentos españoles al inglés con certificación para IRCC y organismos canadienses.",
    url: "https://juradaexpress.es/traduccion-jurada-canada",
    areaServed: "CA",
  },
  {
    name: "Traducción jurada para clientes de Australia",
    description:
      "Documentos australianos apostillados por el DFAT para España y documentos españoles al inglés con los datos del traductor que pide Home Affairs.",
    url: "https://juradaexpress.es/traduccion-jurada-australia",
    areaServed: "AU",
  },
];


// Textos del footer por idioma (FASE 2 · corrección: el footer de /en
// estaba en español).
const FOOTER = {
  es: {
    skip: "Saltar al contenido",
    logoLabel: "Jurada Express — Inicio",
    home: "/",
    about:
      "Jurada Express: traducción jurada Español ⇆ Inglés y traducción certificada para USCIS. Con sede en Murcia, trabajo con clientes de España, Reino Unido, Estados Unidos, India y cualquier país. Proceso 100% digital, entrega 24/48 h.",
    links: "Enlaces",
    linkList: [
      { href: "/", label: "Inicio" },
      { href: "/precios", label: "Precios" },
      { href: "/documentos", label: "Documentos" },
      { href: "/blog", label: "Blog" },
      { href: "/contacto", label: "Contacto" },
      { href: "/sobre-mi", label: "Sobre mí" },
      { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
      {
        href: SERVICE_ROUTES.find((r) => r.id === "urgente").es,
        label: "Urgentes y grandes volúmenes",
      },
    ],
    international: "Clientes internacionales",
    internationalList: INTERNATIONAL_MENU.map((r) => ({ href: r.es, label: r.labelEs })),
    contact: "Contacto",
    whatsapp: "WhatsApp directo",
    whatsappHref:
      "https://wa.me/34685891214?text=Hola%20Jurada%20Express,%20quisiera%20un%20presupuesto",
    legalLabel: "Enlaces legales",
    legal: [
      { href: "/aviso-legal", label: "Aviso legal" },
      { href: "/politica-privacidad", label: "Política de privacidad" },
      { href: "/politica-cookies", label: "Política de cookies" },
    ],
    rights: "Todos los derechos reservados",
    credential:
      "Elena Peñaranda Ortega · Traductora-Intérprete Jurada de Inglés nombrada por el Ministerio de Asuntos Exteriores, Unión Europea y Cooperación · Nº de acreditación: 7310",
  },
  en: {
    skip: "Skip to content",
    logoLabel: "Jurada Express — Home",
    home: "/en",
    about:
      "Jurada Express: sworn Spanish ⇆ English translation for Spain and certified translation for USCIS. Based in Murcia, Spain, working with clients in the UK, the USA, India and any country. Fully digital process, delivered in 24/48h.",
    links: "Links",
    linkList: [
      { href: "/en", label: "Home" },
      { href: "/en/precios", label: "Pricing" },
      { href: "/en/documentos", label: "Documents" },
      { href: "/en/blog", label: "Blog" },
      { href: "/en/contacto", label: "Contact" },
      { href: "/en/about", label: "About me" },
      { href: "/en/preguntas-frecuentes", label: "FAQ" },
      {
        href: SERVICE_ROUTES.find((r) => r.id === "urgente").en,
        label: "Urgent and large projects",
      },
    ],
    international: "International clients",
    internationalList: INTERNATIONAL_MENU.map((r) => ({ href: r.en, label: r.labelEn })),
    contact: "Contact",
    whatsapp: "WhatsApp",
    whatsappHref:
      "https://wa.me/34685891214?text=Hi%20Jurada%20Express,%20I%27d%20like%20a%20quote%20for%20a%20sworn%20translation",
    legalLabel: "Legal links",
    legal: [
      { href: "/en/legal-notice", label: "Legal notice" },
      { href: "/en/privacy-policy", label: "Privacy policy" },
      { href: "/en/cookie-policy", label: "Cookie policy" },
    ],
    rights: "All rights reserved",
    credential:
      "Elena Peñaranda Ortega · Sworn Translator-Interpreter of English appointed by the Spanish Ministry of Foreign Affairs, European Union and Cooperation · Accreditation no. 7310",
  },
};

export default function SiteShell({ locale = "es", children }) {
  const t = FOOTER[locale] || FOOTER.es;

  return (
    <>
        <a href="#contenido" className="skip-link">
          {t.skip}
        </a>

        {/* Cookies + GA4 (GA4 solo se carga tras aceptar) */}
        <CookieConsent />

        {/* Barra inferior móvil + botón flotante de WhatsApp en escritorio */}
        <ActionBar />

        {/* Header */}
        <header
          data-surface="navy"
          className="relative sticky top-0 z-40 bg-brand-navy text-slate-100 shadow-sm"
        >
          <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4">
            {/* Logo */}
            <a
              href={t.home}
              className="inline-flex shrink-0 items-center gap-2 pr-2 font-semibold tracking-tight text-white no-underline"
              aria-label={t.logoLabel}
            >
              <img
                src="/logo.svg"
                alt=""
                width="26"
                height="26"
                className="rounded opacity-90"
                aria-hidden="true"
              />
              <span>JuradaExpress</span>
            </a>

            {/* Nav (estado activo con usePathname) */}
            <MainNav />

            {/* Acciones rápidas (CTA y teléfono localizados en /en) */}
            <div className="ml-auto flex shrink-0 items-center gap-2">
              <LanguageSwitcher className="hidden md:inline-flex" />
              <HeaderActions />
              <MobileNav />
            </div>
          </div>
        </header>

        {/* Contenido */}
        <div id="contenido">{children}</div>

        {/* Footer */}
        <footer className="mt-14 border-t border-stone-200 bg-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 font-semibold text-slate-900">
                <img
                  src="/logo.svg"
                  width="24"
                  height="24"
                  alt=""
                  className="opacity-90"
                  aria-hidden="true"
                />
                <span>JuradaExpress</span>
              </div>
              <p className="max-w-sm text-sm text-slate-600">{t.about}</p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                {t.links}
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {t.linkList.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="link-nav">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                {t.international}
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {t.internationalList.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="link-nav">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                {t.contact}
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a href="mailto:info@juradaexpress.es" className="link-nav">
                    info@juradaexpress.es
                  </a>
                </li>
                <li>
                  <a href="tel:+34685891214" className="link-nav">
                    +34 685 891 214
                  </a>
                </li>
                <li>
                  <a
                    href={t.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-nav"
                  >
                    {t.whatsapp}
                  </a>
                </li>
              </ul>
              <SocialIcons className="mt-3 -ml-3 text-slate-600" />
            </div>
          </div>

          {/* Fila legal */}
          <div className="border-t border-stone-200 py-5 text-center text-xs text-slate-500">
            <nav aria-label={t.legalLabel}>
              <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
                {t.legal.flatMap((l, i) => [
                  i > 0 ? (
                    <li key={`${l.href}-sep`} aria-hidden="true">
                      ·
                    </li>
                  ) : null,
                  <li key={l.href}>
                    <a href={l.href} className="link-nav text-xs">
                      {l.label}
                    </a>
                  </li>,
                ])}
              </ul>
            </nav>
            <p className="mt-3">
              © {new Date().getFullYear()} Jurada Express · {t.rights}
            </p>
            <p className="mt-1">{t.credential}</p>
          </div>

          {/* JSON-LD ProfessionalService ampliado (auditoría 5.4).
              La ficha de Google se añade sola al sameAs cuando
              cambie GOOGLE_BUSINESS_URL en content/site.js. */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                "@id": "https://juradaexpress.es/#organization",
                name: "Jurada Express",
                alternateName: "JuradaExpress",
                url: "https://juradaexpress.es/",
                email: "info@juradaexpress.es",
                telephone: "+34685891214",
                logo: "https://juradaexpress.es/logo.svg",
                image: "https://juradaexpress.es/fotos/hero-firma.jpg",
                description:
                  "Traducción jurada español-inglés con validez oficial y traducción certificada para USCIS, 100 % online, para clientes de España, Reino Unido, Estados Unidos, India y cualquier país.",
                address: {
                  "@type": "PostalAddress",
                  addressRegion: "Murcia",
                  addressCountry: "ES",
                },
                areaServed: [
                  ...SERVICE_COUNTRIES.filter((c) => c.code).map((c) => ({
                    "@type": "Country",
                    name: c.code,
                  })),
                  ...EXTRA_AREA_SERVED.map((code) => ({
                    "@type": "Country",
                    name: code,
                  })),
                  "Worldwide",
                ],
                availableLanguage: ["es", "en"],
                knowsLanguage: ["es", "en"],
                currenciesAccepted: "EUR",
                paymentAccepted: "Tarjeta de crédito o débito internacional (Stripe), transferencia",
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "customer service",
                  telephone: "+34685891214",
                  email: "info@juradaexpress.es",
                  availableLanguage: ["es", "en"],
                  areaServed: "Worldwide",
                  hoursAvailable: {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                    ],
                    opens: "09:00",
                    closes: "20:00",
                  },
                },
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: "Servicios de traducción jurada y certificada",
                  itemListElement: SERVICE_LINES.map((s) => ({
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: s.name,
                      description: s.description,
                      url: s.url,
                      provider: { "@id": "https://juradaexpress.es/#organization" },
                      ...(s.areaServed
                        ? { areaServed: { "@type": "Country", name: s.areaServed } }
                        : {}),
                    },
                    url: s.url,
                    priceCurrency: "EUR",
                  })),
                },
                ...(PUBLISHED_REVIEWS > 0 &&
                GOOGLE_RATING > 0 &&
                GOOGLE_REVIEW_COUNT > 0
                  ? {
                      aggregateRating: {
                        "@type": "AggregateRating",
                        ratingValue: GOOGLE_RATING,
                        bestRating: 5,
                        worstRating: 1,
                        reviewCount: GOOGLE_REVIEW_COUNT,
                      },
                    }
                  : {}),
                priceRange: "€€",
                founder: {
                  "@type": "Person",
                  "@id": "https://juradaexpress.es/sobre-mi#person",
                  name: "Elena Peñaranda Ortega",
                  url: "https://juradaexpress.es/sobre-mi",
                  jobTitle: "Traductora-Intérprete Jurada de Inglés",
                  identifier: "7310",
                  knowsLanguage: ["es", "en"],
                  hasCredential: {
                    "@type": "EducationalOccupationalCredential",
                    credentialCategory: "Traductora-Intérprete Jurada",
                    recognizedBy: {
                      "@type": "GovernmentOrganization",
                      name: "Ministerio de Asuntos Exteriores, Unión Europea y Cooperación",
                    },
                    identifier: "7310",
                  },
                },
                openingHoursSpecification: {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "09:00",
                  closes: "20:00",
                },
                sameAs: [
                  "https://wa.me/34685891214",
                  INSTAGRAM_URL,
                  FACEBOOK_URL,
                  GOOGLE_BUSINESS_URL,
                ].filter(Boolean),
              }),
            }}
          />
        </footer>
    </>
  );
}
