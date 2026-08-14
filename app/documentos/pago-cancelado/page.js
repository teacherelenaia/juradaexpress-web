// app/documentos/pago-cancelado/page.js
import { IconHelpCircle } from "../../components/Icons";

export const metadata = {
  title: "Pago cancelado",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center md:py-24">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold-100 text-brand-gold-900">
        <IconHelpCircle className="h-8 w-8" />
      </div>
      <h1 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
        Pago cancelado
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        No se ha realizado ningún cargo. Puedes volver al catálogo e
        intentarlo de nuevo cuando quieras.
      </p>
      <p className="mt-2 text-sm text-slate-500">
        Si ha habido algún problema durante el pago, escríbenos por WhatsApp y
        te ayudamos.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a
          href="/documentos"
          className="rounded-xl bg-brand-navy px-5 py-3 text-white hover:bg-brand-navy-700"
        >
          Volver al catálogo
        </a>
        <a
          href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20he%20tenido%20un%20problema%20al%20pagar%20online"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-brand-gold-200 bg-white px-5 py-3 text-brand-navy hover:bg-brand-gold-50"
        >
          Escribir por WhatsApp
        </a>
      </div>
    </main>
  );
}
