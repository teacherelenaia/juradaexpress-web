// app/layout.js
import "./globals.css";
import { Manrope, Newsreader } from "next/font/google";
import CookieConsent from "./components/CookieConsent";
import ActionBar from "./components/ActionBar";
import MobileNav from "./components/MobileNav";
import MainNav from "./components/MainNav";
import LanguageSwitcher from "./components/LanguageSwitcher";
import SocialIcons from "./components/SocialIcons";
import { INSTAGRAM_URL, FACEBOOK_URL } from "../content/site";

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
  title: {
    default: "JuradaExpress — Traductor Jurado Español-Inglés | España y Reino Unido",
    template: "%s | JuradaExpress",
  },
  description:
    "Traductor jurado Español ⇆ Inglés. Trabajo con clientes de toda España, Reino Unido y el extranjero. Envío 100% digital, entrega 24/48 h. Presupuesto inmediato por email o WhatsApp.",
  alternates: { canonical: "https://juradaexpress.es/" },
  openGraph: {
    title: "JuradaExpress — Traductor Jurado Español-Inglés | España y Reino Unido",
    description:
      "Traducción jurada válida ante organismos oficiales. Entrega 24/48 h. Trabajo con clientes de toda España, Reino Unido y el extranjero.",
    url: "https://juradaexpress.es/",
    siteName: "JuradaExpress",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "https://juradaexpress.es/hero-internacional.jpg",
        width: 1920,
        height: 1080,
        alt: "JuradaExpress — Traducción jurada Español ⇆ Inglés, envío digital a toda España y al extranjero",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JuradaExpress — Traductor Jurado Español-Inglés | España y Reino Unido",
    description:
      "Traducción jurada (Español ⇆ Inglés). Entrega 24/48 h. Trabajo con clientes de toda España, Reino Unido y el extranjero.",
    images: ["https://juradaexpress.es/hero-internacional.jpg"],
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
                Traducciones juradas Español ⇆ Inglés. Con sede en Murcia,
                trabajo con clientes de toda España y de cualquier país —
                proceso 100% digital. Entrega 24/48 h.
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
              © {new Date().getFullYear()} JuradaExpress · Todos los derechos
              reservados
            </p>
            <p className="mt-1">
              Elena Peñaranda Ortega · Traductora-Intérprete Jurada de Inglés
              nombrada por el Ministerio de Asuntos Exteriores, Unión Europea
              y Cooperación · Nº de acreditación: 7310
            </p>
          </div>

          {/* JSON-LD ProfessionalService ampliado (auditoría 5.4).
              Pendiente de añadir la ficha de Google a sameAs:
              [[COMPLETAR: URL de la ficha de Google Business]] */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                name: "JuradaExpress",
                url: "https://juradaexpress.es/",
                email: "info@juradaexpress.es",
                telephone: "+34685891214",
                logo: "https://juradaexpress.es/logo.svg",
                image: "https://juradaexpress.es/fotos/hero-firma.jpg",
                address: {
                  "@type": "PostalAddress",
                  addressRegion: "Murcia",
                  addressCountry: "ES",
                },
                areaServed: [
                  { "@type": "Country", name: "ES" },
                  { "@type": "Country", name: "GB" },
                ],
                availableLanguage: ["es", "en"],
                priceRange: "€€",
                founder: {
                  "@type": "Person",
                  name: "Elena Peñaranda Ortega",
                  jobTitle: "Traductora-Intérprete Jurada de Inglés",
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
                // [[COMPLETAR: confirmar horario de atención]]
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
                  closes: "18:00",
                },
                sameAs: [
                  "https://wa.me/34685891214",
                  INSTAGRAM_URL,
                  FACEBOOK_URL,
                ].filter(Boolean),
              }),
            }}
          />
        </footer>
      </body>
    </html>
  );
}
