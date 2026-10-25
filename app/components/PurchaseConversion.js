"use client";

// app/components/PurchaseConversion.js
//
// Conversión de compra de Google Ads («Compra en la web (Stripe)») en las
// páginas a las que Stripe redirige tras el pago: /documentos/pago-exitoso
// (checkout de la web), /gracias y /en/thank-you (Payment Links). La página
// (servidor, app/lib/stripePurchase.js) recupera la sesión de Stripe y pasa
// aquí importe, moneda y email; este componente, sin pintar nada:
//   1. Con consentimiento, envía gtag('set','user_data',{ email }) para
//      conversiones mejoradas.
//   2. Dispara la conversión de compra con value, currency y
//      transaction_id = session_id (deduplica recargas). Sin consentimiento
//      también: el modo de consentimiento avanzado la manda sin cookies.
// Si Stripe falló (purchase = null) dispara la conversión sin valor, como
// antes. Si la sesión existe pero no está pagada, no dispara nada.
import { useEffect, useRef } from "react";
import { setAdsUserData, trackAdsConversion } from "./AdsConversion";

export default function PurchaseConversion({ sessionId = "", purchase = null }) {
  const fired = useRef(false);

  useEffect(() => {
    if (!sessionId || fired.current) return;
    if (purchase && purchase.paid === false) return;
    fired.current = true;
    if (purchase && purchase.email) setAdsUserData({ email: purchase.email });
    const extra = { transaction_id: sessionId };
    if (purchase && purchase.value != null && purchase.currency) {
      extra.value = purchase.value;
      extra.currency = String(purchase.currency).toUpperCase();
    }
    trackAdsConversion("compra", extra);
  }, [sessionId, purchase]);

  return null;
}
