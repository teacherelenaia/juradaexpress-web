// app/layout.js
import "./globals.css";
import { Manrope, Newsreader } from "next/font/google";
import CookieConsent from "./components/CookieConsent";
import ActionBar from "./components/ActionBar";
import MobileNav from "./components/MobileNav";
import MainNav from "./components/MainNav";
import LanguageSwitcher from "./components/LanguageSwitcher";
import SocialIcons from "./components/SocialIcons";
import {
  INSTAGRAM_URL,
  FACEBOOK_URL,
  GOOGLE_BUSINESS_URL,
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  SERVICE_COUNTRIES,
} from "../content/site";
import { getPublishableReviews } from "../content/reviews";

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
];

// Tipografía del sistema visual: Manrope (cuerpo/UI) + Newsreader (display),
// servidas con next/font para evitar CLS y peticiones a terceros.
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://juradaexpress.es"),
  // Posicionamiento internacional (encargo 2026-09): title ≤ 60 caracteres,
  // description ≤ 155. "Jurada Express" (con espacio) es el nombre de la
  // entidad; "JuradaExpress" se conserva solo como logotipo.
  title: {
    default: "Traductor Jurado Español-Inglés Online | Jurada Express",
    template: "%s | Jurada Express",
  },
  description:
    "Traducción jurada español-inglés con validez oficial y traducción certificada para USCIS. Clientes en España, Reino Unido, EE. UU., India y todo el mundo. Entrega 24/48 h.",
  alternates: { canonical: "https://juradaexpress.es/" },
  openGraph: {
    title: "Traductor Jurado Español-Inglés Online | Jurada Express",
    description:
      "Traducción jurada español-inglés con validez oficial y traducción certificada para USCIS. Clientes en España, Reino Unido, EE. UU., India y todo el mundo. Entrega 24/48 h.",
    url: "https://juradaexpress.es/",
    siteName: "Jurada Express",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "https://juradaexpress.es/fotos/hero-firma.jpg",
        width: 1200,
        height: 900,
        alt: "Firma de una traducción jurada español-inglés de Jurada Express",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Traductor Jurado Español-Inglés Online | Jurada Express",
    description:
      "Traducción jurada español-inglés con validez oficial y traducción certificada para USCIS. Clientes en España, Reino Unido, EE. UU., India y todo el mundo. Entrega 24/48 h.",
    images: ["https://juradaexpress.es/fotos/hero-firma.jpg"],
  },
  verification: {
    google: "7qUSXNkOvWn5YeesrooO2YBAmzwRRrPLKU7GWXxEi9c",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${manrope.variable} ${newsreader.variable}`}>
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <a href="#contenido" className="skip-link">
          Saltar al contenido
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
              href="/"
              className="inline-flex shrink-0 items-center gap-2 pr-2 font-semibold tracking-tight text-white no-underline"
              aria-label="JuradaExpress — Inicio"
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

            {/* Acciones rápidas */}
            <div className="ml-auto flex shrink-0 items-center gap-2">
              <LanguageSwitcher className="hidden md:inline-flex" />
              <a
                href="tel:+34685891214"
                className="btn btn-quiet-light btn-sm hidden lg:inline-flex"
                aria-label="Llamar 685 891 214"
              >
                685 891 214
              </a>
              <a href="/documentos" className="btn btn-gold btn-sm">
                Pedir presupuesto
              </a>
              <MobileNav />
            </div>
          </div>
        </header>

        {/* Contenido */}
        <div id="contenido">{children}</div>

        {/* Footer */}
        <footer className="mt-14 border-t border-stone-200 bg-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
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
              <p className="max-w-sm text-sm text-slate-600">
                Jurada Express: traducción jurada Español ⇆ Inglés y
                traducción certificada para USCIS. Con sede en Murcia, trabajo
                con clientes de España, Reino Unido, Estados Unidos, India y
                cualquier país. Proceso 100% digital, entrega 24/48 h.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Enlaces
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a href="/" className="link-nav">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="/precios" className="link-nav">
                    Precios
                  </a>
                </li>
                <li>
                  <a href="/documentos" className="link-nav">
                    Documentos
                  </a>
                </li>
                <li>
                  <a href="/blog" className="link-nav">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/contacto" className="link-nav">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="/sobre-mi" className="link-nav">
                    Sobre mí
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Contacto
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a href="mailto:info@juradaexpress.es" className="link-nav">
                    info@juradaexpress.es
                  </a>
                </li>
                <li>
                  <a href="tel:+34685891214" className="link-nav">
                    685 891 214
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20quisiera%20un%20presupuesto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-nav"
                  >
                    WhatsApp directo
                  </a>
                </li>
              </ul>
              <SocialIcons className="mt-3 -ml-3 text-slate-600" />
            </div>
          </div>

          {/* Fila legal */}
          <div className="border-t border-stone-200 py-5 text-center text-xs text-slate-500">
            <nav aria-label="Enlaces legales">
              <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
                <li>
                  <a href="/aviso-legal" className="link-nav text-xs">
                    Aviso legal
                  </a>
                </li>
                <li aria-hidden="true">·</li>
                <li>
                  <a href="/politica-privacidad" className="link-nav text-xs">
                    Política de privacidad
                  </a>
                </li>
                <li aria-hidden="true">·</li>
                <li>
                  <a href="/politica-cookies" className="link-nav text-xs">
                    Política de cookies
                  </a>
                </li>
              </ul>
            </nav>
            <p className="mt-3">
              © {new Date().getFullYear()} Jurada Express · Todos los derechos
              reservados
            </p>
            <p className="mt-1">
              Elena Peñaranda Ortega · Traductora-Intérprete Jurada de Inglés
              nombrada por el Ministerio de Asuntos Exteriores, Unión Europea
              y Cooperación · Nº de acreditación: 7310
            </p>
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
      </body>
    </html>
  );
}
