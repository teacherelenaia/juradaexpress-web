// app/api/create-checkout-session/route.js
// Route Handler: se ejecuta solo en el servidor. STRIPE_SECRET_KEY nunca
// llega al navegador — no importar este módulo desde ningún archivo "use client".
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { DOCUMENTS } from "../../../content/documents";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const ids = Array.isArray(body?.ids) ? body.ids : [];

    if (ids.length === 0) {
      return NextResponse.json(
        { error: "No se han indicado documentos." },
        { status: 400 }
      );
    }

    // Los precios se recalculan aquí a partir de content/documents.js: nunca
    // se confía en un importe que venga del navegador.
    const uniqueIds = [...new Set(ids)];
    const docs = uniqueIds
      .map((id) => DOCUMENTS.find((d) => d.id === id))
      .filter(Boolean);

    if (docs.length !== uniqueIds.length) {
      return NextResponse.json(
        { error: "Alguno de los documentos seleccionados no existe." },
        { status: 400 }
      );
    }

    if (docs.some((d) => d.price == null)) {
      return NextResponse.json(
        {
          error:
            "Hay documentos pendientes de presupuestar en la selección; no se puede pagar online.",
        },
        { status: 400 }
      );
    }

    const origin = new URL(req.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: docs.map((d) => ({
        price_data: {
          currency: "eur",
          product_data: { name: d.name },
          unit_amount: Math.round(d.price * 100),
        },
        quantity: 1,
      })),
      success_url: `${origin}/documentos/pago-exitoso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/documentos/pago-cancelado`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("create-checkout-session error:", err);
    return NextResponse.json(
      { error: "No se ha podido iniciar el pago. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
