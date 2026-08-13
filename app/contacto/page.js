// app/contacto/page.js
export const metadata = {
  title: "Contacto — Traductor Jurado en Murcia",
  description:
    "Contacta con tu traductor jurado en Murcia por WhatsApp, email o teléfono. Presupuesto inmediato y entrega en 24/48 h.",
  alternates: { canonical: "https://juradaexpress.es/contacto" },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Contacto</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        ¿Necesitas una traducción jurada en Murcia? Escríbenos por WhatsApp o
        email con tu documento escaneado y te respondemos con presupuesto
        cerrado y plazo de entrega.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <a
          href="https://wa.me/34685891214?text=Hola%20JuradaExpress,%20quisiera%20un%20presupuesto"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 hover:shadow"
        >
          <h2 className="font-semibold text-emerald-700">WhatsApp</h2>
          <p className="mt-2 text-sm text-slate-600">
            Respuesta rápida, ideal para presupuesto inmediato.
          </p>
          <p className="mt-4 font-medium">685 891 214</p>
        </a>

        <a
          href="mailto:info@juradaexpress.es?subject=Presupuesto%20traducci%C3%B3n%20jurada"
          className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 hover:shadow"
        >
          <h2 className="font-semibold text-emerald-700">Email</h2>
          <p className="mt-2 text-sm text-slate-600">
            Envíanos tu documento escaneado y los detalles del encargo.
          </p>
          <p className="mt-4 font-medium">info@juradaexpress.es</p>
        </a>

        <a
          href="tel:+34685891214"
          className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 hover:shadow"
        >
          <h2 className="font-semibold text-emerald-700">Teléfono</h2>
          <p className="mt-2 text-sm text-slate-600">
            Llámanos directamente si lo prefieres.
          </p>
          <p className="mt-4 font-medium">685 891 214</p>
        </a>
      </div>

      <div className="mt-10 rounded-2xl bg-emerald-50 p-6 ring-1 ring-emerald-100">
        <h2 className="font-semibold">Traductor jurado en Murcia</h2>
        <p className="mt-2 text-sm text-slate-600">
          Traducciones juradas Español ⇆ Inglés, firmadas y selladas, válidas
          ante organismos oficiales. Envíos a toda España y al extranjero.
          Entrega habitual en 24/48 h.
        </p>
      </div>
    </main>
  );
}
