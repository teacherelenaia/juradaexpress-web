"use client";

// app/components/EngagementEvents.js
//
// Eventos de comportamiento sin cookies para Vercel Analytics (11/10/2026).
// Se monta una vez en SiteShell y no pinta nada. Para cada carga de página
// (también en navegaciones de cliente: se reinicia con la ruta) envía con
// app/lib/engagement.js, solo en producción y nunca en /api/*:
//
//   scroll_depth  { depth: 25 | 50 | 75 | 100 }  una vez por valor; listener
//                 de scroll pasivo que solo encola un requestAnimationFrame
//                 (una medida por frame como mucho, nada entre scrolls) y se
//                 retira al llegar al 100 %. Se mide sobre el documento entero.
//   time_on_page  { seconds: 10 | 30 | 60 | 120 }  una vez por valor; un solo
//                 setTimeout hasta el siguiente umbral, que se pausa cuando la
//                 pestaña está oculta (visibilitychange) y sigue al volver.
//   section_view  { section }  cuando entra en pantalla al menos el 50 % de un
//                 elemento con data-track-section="<nombre>" (o, si la sección
//                 es más alta que la ventana, cuando ocupa al menos la mitad de
//                 la ventana). IntersectionObserver, un evento por sección.
//   cta_click     { cta } o { cta: "pack", pack }  clic en un botón con data-track-cta o en un
//                 enlace de WhatsApp, tel:, mailto: o al catálogo de
//                 documentos. Listener único en fase de captura, igual que el
//                 de AdsConversion, así cubre cabecera, barra móvil, botón
//                 flotante, pie, TrackedLink y las landings sin tocar cada uno.
//   outbound_click { host }  clic en un enlace a otro dominio; solo el host.
//
// Cada evento lleva además `lang` (es/en); nada más. La página (ruta sin
// query) la registra Vercel por su cuenta en cada evento.
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  ENABLED,
  DEPTHS,
  SECONDS,
  isApiPath,
  trackEngagement,
  ctaOfAnchor,
  outboundHost,
} from "../lib/engagement";

const SECTION_THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20);

function startScrollDepth() {
  const fired = new Set();
  let frame = 0;

  function stop() {
    window.removeEventListener("scroll", schedule);
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  }

  function measure() {
    frame = 0;
    const total = document.documentElement.scrollHeight;
    if (!total) return;
    const seen = window.scrollY + window.innerHeight;
    const pct = Math.min(100, Math.round((seen / total) * 100));
    for (const depth of DEPTHS) {
      if (pct >= depth && !fired.has(depth)) {
        fired.add(depth);
        trackEngagement("scroll_depth", { depth });
      }
    }
    if (fired.size === DEPTHS.length) stop();
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(measure);
  }

  window.addEventListener("scroll", schedule, { passive: true });
  // Medida inicial: en páginas cortas el final ya está a la vista.
  schedule();
  return stop;
}

function startTimeOnPage() {
  let visibleMs = 0; // acumulado mientras la pestaña estuvo visible
  let since = document.visibilityState === "visible" ? Date.now() : 0;
  let next = 0; // índice del siguiente umbral
  let timer = 0;

  const elapsed = () => visibleMs + (since ? Date.now() - since : 0);

  function clear() {
    if (timer) clearTimeout(timer);
    timer = 0;
  }

  function arm() {
    clear();
    if (!since || next >= SECONDS.length) return;
    const remaining = SECONDS[next] * 1000 - elapsed();
    timer = setTimeout(fire, Math.max(0, remaining));
  }

  function fire() {
    timer = 0;
    while (next < SECONDS.length && elapsed() >= SECONDS[next] * 1000) {
      trackEngagement("time_on_page", { seconds: SECONDS[next] });
      next += 1;
    }
    arm();
  }

  function onVisibility() {
    if (document.visibilityState === "visible") {
      if (!since) since = Date.now();
      arm();
    } else {
      visibleMs = elapsed();
      since = 0;
      clear();
    }
  }

  document.addEventListener("visibilitychange", onVisibility);
  arm();
  return () => {
    clear();
    document.removeEventListener("visibilitychange", onVisibility);
  };
}

function startSectionViews() {
  const sections = document.querySelectorAll("[data-track-section]");
  if (!sections.length || typeof IntersectionObserver === "undefined") {
    return () => {};
  }
  const fired = new Set();
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const name = entry.target.getAttribute("data-track-section");
        if (!name) continue;
        if (fired.has(name)) {
          io.unobserve(entry.target);
          continue;
        }
        const viewport = entry.rootBounds?.height || window.innerHeight;
        const enough =
          entry.intersectionRatio >= 0.5 ||
          entry.intersectionRect.height >= viewport * 0.5;
        if (!enough) continue;
        fired.add(name);
        io.unobserve(entry.target);
        trackEngagement("section_view", { section: name });
      }
    },
    { threshold: SECTION_THRESHOLDS }
  );
  sections.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

function onDocumentClick(e) {
  const target = e.target;
  if (!target || typeof target.closest !== "function") return;

  // Botones marcados a mano (packs, etc.): el atributo manda.
  const marked = target.closest("[data-track-cta]");
  if (marked) {
    const cta = marked.getAttribute("data-track-cta");
    if (!cta) return;
    const pack = marked.getAttribute("data-track-pack");
    // Con pack ya son dos propiedades (límite del plan Pro): sin lang.
    if (pack) trackEngagement("cta_click", { cta, pack }, { withLang: false });
    else trackEngagement("cta_click", { cta });
    return;
  }

  const anchor = target.closest("a[href]");
  if (!anchor) return;
  const cta = ctaOfAnchor(anchor);
  if (cta) {
    trackEngagement("cta_click", { cta });
    return;
  }
  const host = outboundHost(anchor);
  if (host) trackEngagement("outbound_click", { host });
}

export default function EngagementEvents() {
  const pathname = usePathname() || "/";

  // Scroll, tiempo y secciones: se reinician con cada ruta.
  useEffect(() => {
    if (!ENABLED || isApiPath(pathname)) return undefined;
    const stops = [startScrollDepth(), startTimeOnPage(), startSectionViews()];
    return () => stops.forEach((stop) => stop());
  }, [pathname]);

  // Clics: un único listener en captura (se registra aunque el enlace abra
  // otra pestaña o la app de teléfono).
  useEffect(() => {
    if (!ENABLED) return undefined;
    document.addEventListener("click", onDocumentClick, true);
    return () => document.removeEventListener("click", onDocumentClick, true);
  }, []);

  return null;
}
