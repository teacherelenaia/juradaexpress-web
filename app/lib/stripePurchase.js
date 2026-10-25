// app/lib/stripePurchase.js
//
// Solo servidor (usa STRIPE_SECRET_KEY): no importar desde "use client".
// Lo usan las páginas a las que Stripe redirige tras el pago
// (/documentos/pago-exitoso, /gracias y /en/thank-you) para pasar a
// PurchaseConversion el importe, la moneda y el email reales de la sesión
// de Checkout, sin fiarse de nada que venga en la URL salvo el session_id.
// Sirve igual para las sesiones de la web (create-checkout-session) y para
// las de los Payment Links, que también son sesiones de Checkout (cs_…).
import Stripe from "stripe";

export const SESSION_ID_RE = /^cs_(test|live)_[A-Za-z0-9]+$/;

// session_id de los searchParams, recortado ("" si no es de Stripe).
export function sessionIdFrom(searchParams) {
  const raw = searchParams?.session_id;
  const id = typeof raw === "string" ? raw.trim().slice(0, 200) : "";
  return SESSION_ID_RE.test(id) ? id : "";
}

// { value, currency, email, paid }; { paid: false } si la sesión no existe;
// null si no hay clave, el id no es válido o Stripe falla.
export async function retrievePurchase(sessionId) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!sessionId || !key || !SESSION_ID_RE.test(sessionId)) return null;
  try {
    const stripe = new Stripe(key, { maxNetworkRetries: 0, timeout: 8000 });
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session || typeof session.amount_total !== "number") return null;
    return {
      value: session.amount_total / 100,
      currency: session.currency || "eur",
      email: session.customer_details?.email || session.customer_email || "",
      // Pagos asíncronos (p. ej. transferencia) llegan aquí sin cobrar
      // todavía: no cuentan como compra.
      paid:
        session.payment_status === "paid" ||
        session.payment_status === "no_payment_required",
    };
  } catch (err) {
    // Sesión que no existe (URL inventada o copiada de otra cuenta): no es
    // una compra. Cualquier otro error (red, Stripe caído) devuelve null y
    // la conversión se dispara sin valor.
    if (err?.code === "resource_missing") return { paid: false };
    console.error("stripePurchase: no se pudo recuperar la sesión de Stripe:", err?.message || err);
    return null;
  }
}
