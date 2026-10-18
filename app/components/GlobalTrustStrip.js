"use client";
// app/components/GlobalTrustStrip.js
//
// Envoltorio cliente de la franja de confianza que SiteShell pinta bajo la
// cabecera en todas las páginas públicas (18/10/2026). Recibe la franja ya
// renderizada en el servidor (children) y solo decide si se muestra: la
// oculta en las portadas ES/EN (que la llevan bajo el hero, para no
// duplicarla) y en las páginas legales (aviso legal, privacidad, cookies).
// usePathname funciona también en el prerender estático, así que el HTML
// servido ya trae o no la franja según la ruta.
import { usePathname } from "next/navigation";

const HIDDEN = new Set([
  "/",
  "/en",
  "/aviso-legal",
  "/politica-privacidad",
  "/politica-cookies",
  "/en/legal-notice",
  "/en/privacy-policy",
  "/en/cookie-policy",
]);

export function showsGlobalTrustStrip(pathname) {
  if (!pathname) return false;
  const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  return !HIDDEN.has(path);
}

export default function GlobalTrustStrip({ children }) {
  const pathname = usePathname();
  return showsGlobalTrustStrip(pathname) ? children : null;
}
