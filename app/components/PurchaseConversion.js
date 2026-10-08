"use client";

// app/components/PurchaseConversion.js
//
// Conversión de compra de Google Ads en /documentos/pago-exitoso
// (08/10/2026). La página (servidor) recupera la sesión de Stripe y pasa
// aquí importe, moneda y email; este componente, sin pintar nada:
//   1. Envía gtag('set','user_data',{ email }) para conversiones mejoradas.
//   2. Dispara la conversión de compra con value, currency y
//      transaction_id = session_id (deduplica recargas).
// Si Stripe falló (purchase = null) dispara la conversión sin valor, como
// antes. Espera al consentimiento de cookies si aún no se ha dado.
import { useEffect, useRef } from "react";
import { CONSENT_EVENT } from "./CookieConsent";
import { hasAdsConsent, setAdsUserData, trackAdsConversion } from "./AdsConversion";

export default function PurchaseConversion({ sessionId = "", purchase = null }) {
  const fired = useRef(false);

  useEffect(() => {
    if (!sessionId) return undefined;
    function fire() {
      if (fired.current || !hasAdsConsent()) return false;
      fired.current = true;
      if (purchase && purchase.email) setAdsUserData({ email: purchase.email });
      const extra = { transaction_id: sessionId };
      if (purchase && purchase.value != null && purchase.currency) {
        extra.value = purchase.value;
        extra.currency = String(purchase.currency).toUpperCase();
      }
      trackAdsConversion("compra", extra);
      return true;
    }
    if (fire()) return undefined;
    function onConsent(e) {
      if (e?.detail === "accepted") fire();
    }
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, [sessionId, purchase]);

  return null;
}
