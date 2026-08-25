// app/documentos/pago-exitoso/page.js
import { IconCheck } from "../../components/Icons";

export const metadata = {
  title: "Pago recibido",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center md:py-24">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-navy-50 text-brand-navy">
        <IconCheck className="h-8 w-8" />
      </div>
      <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl">
        Pago recibido
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Te contactaremos en menos de 2 horas (horario laboral) con la
        confirmación y el plazo de entrega.
      </p>
      <p className="mt-2 text-sm text-slate-500">
        Si tienes que enviarnos el documento a traducir y no lo has hecho aún,
        puedes hacerlo por WhatsApp o respondiendo al email de confirmación.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a
          href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20acabo%20de%20realizar%20un%20pago%20online%20y%20quiero%20enviaros%20el%20documento"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Escribir por WhatsApp
        </a>
        <a
          href="/documentos"
          className="btn btn-secondary"
        >
          Volver al catálogo
        </a>
      </div>
    </main>
  );
}
