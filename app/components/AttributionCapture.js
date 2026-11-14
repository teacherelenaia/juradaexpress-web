"use client";

// app/components/AttributionCapture.js
//
// Guarda en cada carga de página los parámetros de atribución de la URL
// (gclid, gbraid, wbraid, utm_*, gad_campaignid, kw, mt, ag) con
// app/lib/attribution.js. Se monta una vez en SiteShell, junto a
// AdsConversion. No pinta nada. Cuando el visitante acepta las cookies,
// copia el registro a localStorage (90 días); si las rechaza, borra esa
// copia.
//
// Enlaces internos (14/11/2026). Sin consentimiento, la atribución vive
// solo en sessionStorage, que es de la pestaña: si el visitante abre un
// enlace en una pestaña nueva o pulsa «Abrir en el navegador» desde la app
// de Google, la página nueva empieza sin nada guardado. Google ya lleva el
// gclid y _gl en esos enlaces (url_passthrough), pero no gad_campaignid ni
// el sufijo kw/mt/ag, así que el aviso perdía la campaña y la palabra
// clave (JX-VYQHMT y JX-BTG3YJ, semana del 7 al 13/11). Aquí se añaden
// esos cuatro parámetros (y el identificador de clic, si falta) a los
// enlaces internos justo cuando se van a abrir, igual que hace Google con
// los suyos. Solo sin consentimiento (con él ya está localStorage), solo
// en enlaces de este mismo dominio y nunca con datos personales.
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { CONSENT_EVENT, CONSENT_KEY } from "./CookieConsent";
import {
  captureAttribution,
  persistAttribution,
  clearPersistedAttribution,
  getAttribution,
  storedAds,
  ADS_PARAMS,
} from "../lib/attribution";

function hasConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
}

// Devuelve el href con los parámetros de anuncio que le falten, o null si
// no hay nada que añadir o el enlace no es interno.
export function decorateInternalHref(href, attr, origin) {
  const ads = storedAds(attr);
  if (!ads) return null;
  let url;
  try {
    url = new URL(href, origin);
  } catch {
    return null;
  }
  if (url.origin !== origin) return null;
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/_next/")) return null;
  let changed = false;
  for (const [param, key] of Object.entries(ADS_PARAMS)) {
    if (ads[key] && !url.searchParams.has(param)) {
      url.searchParams.set(param, ads[key]);
      changed = true;
    }
  }
  const click = ["gclid", "gbraid", "wbraid"].find((k) => attr[k] || (attr.last && attr.last[k]));
  if (click && !url.searchParams.has(click)) {
    url.searchParams.set(click, attr[click] || attr.last[click]);
    changed = true;
  }
  return changed ? url.pathname + url.search + url.hash : null;
}

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

  useEffect(() => {
    // pointerdown (ratón y dedo) y contextmenu (menú «abrir en pestaña
    // nueva» y pulsación larga en el móvil), en fase de captura: el href
    // ya va decorado cuando el navegador lo lee.
    function decorate(e) {
      if (hasConsent()) return;
      const a = e.target?.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (!href || href.startsWith("#") || /^(mailto|tel|whatsapp|javascript):/i.test(href)) return;
      const next = decorateInternalHref(href, getAttribution(), window.location.origin);
      if (next) a.setAttribute("href", next);
    }
    document.addEventListener("pointerdown", decorate, true);
    document.addEventListener("contextmenu", decorate, true);
    return () => {
      document.removeEventListener("pointerdown", decorate, true);
      document.removeEventListener("contextmenu", decorate, true);
    };
  }, []);

  return null;
}
