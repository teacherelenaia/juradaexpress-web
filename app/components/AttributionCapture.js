"use client";

// app/components/AttributionCapture.js
//
// Guarda en cada carga de página los parámetros de atribución de la URL
// (gclid, gbraid, wbraid, utm_*) con app/lib/attribution.js. Se monta una
// vez en SiteShell, junto a AdsConversion. No pinta nada. Cuando el
// visitante acepta las cookies, copia el registro a localStorage (90 días);
// si las rechaza, borra esa copia.
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { CONSENT_EVENT } from "./CookieConsent";
import {
  captureAttribution,
  persistAttribution,
  clearPersistedAttribution,
} from "../lib/attribution";

export default function AttributionCapture() {
  const pathname = usePathname() || "/";

  useEffect(() => {
    captureAttribution();
  }, [pathname]);

  useEffect(() => {
    function onConsent(e) {
      if (e?.detail === "accepted") persistAttribution();
      else if (e?.detail === "rejected") clearPersistedAttribution();
    }
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  return null;
}
