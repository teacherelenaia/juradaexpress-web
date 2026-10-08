// app/documentos/pago-exitoso/page.js
//
// Stripe redirige aquí con ?session_id=cs_…. En el servidor se recupera la
// sesión de Checkout para pasar importe, moneda y email del cliente a
// PurchaseConversion (conversión de compra de Google Ads con valor y
// conversiones mejoradas). Nada de eso se muestra en pantalla. Si Stripe
// falla o no hay clave, la conversión se dispara sin valor, como antes.
import Stripe from "stripe";
import { IconCheck } from "../../../components/Icons";
import PurchaseConversion from "../../../components/PurchaseConversion";

export const metadata = {
  title: "Pago recibido",
  robots: { index: false, follow: false },
};

// La página depende de ?session_id: se renderiza en cada petición.
export const dynamic = "force-dynamic";

async function retrievePurchase(sessionId) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!sessionId || !key || !/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return null;
  try {
    const stripe = new Stripe(key, { maxNetworkRetries: 0, timeout: 8000 });
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session || typeof session.amount_total !== "number") return null;
    return {
      value: session.amount_total / 100,
      currency: session.currency || "eur",
      email: session.customer_details?.email || session.customer_email || "",
    };
  } catch (err) {
    console.error("pago-exitoso: no se pudo recuperar la sesión de Stripe:", err?.message || err);
    return null;
  }
}

export default async function Page({ searchParams }) {
  const raw = searchParams?.session_id;
  const sessionId = typeof raw === "string" ? raw.slice(0, 200) : "";
  const purchase = await retrievePurchase(sessionId);

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center md:py-24">
      <PurchaseConversion sessionId={sessionId} purchase={purchase} />
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-navy-50 text-brand-navy">
        <IconCheck className="h-8 w-8" />
      </div>
      <h1 className="font-display text-balance mt-6 text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl">
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
          href="https://wa.me/34685891214?text=Hola%20Jurada%20Express,%20acabo%20de%20realizar%20un%20pago%20online%20y%20quiero%20enviaros%20el%20documento"
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
