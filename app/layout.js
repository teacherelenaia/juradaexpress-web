// app/layout.js
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JuradaExpress – Traducciones juradas en Murcia (Español ⇆ Inglés)",
  description:
    "Traducciones juradas de Español ⇆ Inglés en Murcia con envíos a toda España y al extranjero. Entrega 24–48 h (orientativa) y presupuesto rápido. Digital o papel.",
  metadataBase: new URL("https://juradaexpress.es"),
  alternates: { canonical: "https://juradaexpress.es" },
  openGraph: {
    title: "JuradaExpress – Traducciones juradas en Murcia",
    description:
      "Traducciones juradas de Español ⇆ Inglés en Murcia y online. Envíos a toda España y extranjero. Entrega 24–48 h (orientativa).",
    url: "https://juradaexpress.es",
    siteName: "JuradaExpress",
    locale: "es_ES",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JuradaExpress – Traducciones juradas en Murcia",
    description:
      "Español ⇆ Inglés. Envíos a toda España y extranjero. Entrega 24–48 h.",
    images: ["/og.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${inter.className} min-h-screen bg-slate-50 text-slate-900 antialiased`}
      >
        {/* Fondo bonito con patrón sutil */}
        <div className="bg-grid">
          <header className="mx-auto max-w-6xl px-4 py-5">
            <div className="flex items-center justify-between">
              <a href="/" className="inline-flex items-center gap-3">
                <img src="/logo.svg" alt="JuradaExpress" className="h-8" />
                <span className="sr-only">JuradaExpress</span>
              </a>
              <nav className="hidden gap-6 text-sm text-slate-600 sm:flex">
                <a href="#servicios" className="hover:text-emerald-700">
                  Servicios
                </a>
                <a href="#proceso" className="hover:text-emerald-700">
                  Proceso
                </a>
                <a href="#faq" className="hover:text-emerald-700">
                  Preguntas
                </a>
              </nav>
              <a
                href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20quisiera%20un%20presupuesto"
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-emerald-700"
              >
                WhatsApp
              </a>
            </div>
          </header>

          <main className="mx-auto max-w-6xl px-4 pb-16">{children}</main>

          <footer className="border-t border-slate-200 bg-white/70 backdrop-blur">
            <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600">
              <p>
                © {new Date().getFullYear()} JuradaExpress · Murcia ·{" "}
                <a className="underline" href="mailto:info@juradaexpress.es">
                  info@juradaexpress.es
                </a>{" "}
                · <a className="underline" href="tel:+34685891214">685 891 214</a>
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
