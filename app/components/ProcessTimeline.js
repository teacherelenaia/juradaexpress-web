"use client";

// app/components/ProcessTimeline.js
// Línea temporal del proceso: horizontal en escritorio, vertical en móvil.
// El ÚNICO momento animado de la home: la línea se dibuja con clip-path en
// 600 ms cuando la sección entra en viewport, una sola vez
// (IntersectionObserver; prefers-reduced-motion la muestra ya dibujada).
import { useEffect, useRef, useState } from "react";

export default function ProcessTimeline({ steps }) {
  const ref = useRef(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || drawn) return;
    if (typeof IntersectionObserver === "undefined") {
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { rootMargin: "-100px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [drawn]);

  // Tres o cuatro pasos (Fase A2, 18/10/2026: la home pasa a tres). La
  // línea horizontal va del centro de la primera columna al de la última.
  const three = steps.length === 3;

  return (
    <div ref={ref} data-drawn={drawn} data-track-section="pasos" className="mt-10">
      <ol
        className={`relative grid gap-8 md:gap-6 ${
          three ? "md:grid-cols-3" : "md:grid-cols-4"
        }`}
      >
        {/* Línea horizontal (escritorio): a la altura del centro del marcador */}
        <div
          className={`timeline-line absolute top-[22px] hidden h-0.5 bg-brand-gold-500 md:block ${
            three ? "left-[16.67%] right-[16.67%]" : "left-[12.5%] right-[12.5%]"
          }`}
          aria-hidden="true"
        />
        {/* Línea vertical (móvil) */}
        <div
          className="timeline-line-v absolute bottom-6 left-[21px] top-6 w-0.5 bg-brand-gold-500 md:hidden"
          aria-hidden="true"
        />
        {steps.map((step, i) => (
          <li
            key={step.t}
            className="relative flex gap-4 md:flex-col md:items-center md:gap-0 md:text-center"
          >
            <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white font-display text-lg font-semibold text-brand-navy ring-2 ring-brand-navy">
              {i + 1}
            </span>
            <div className="md:mt-4">
              <h3 className="text-lg font-semibold leading-snug text-slate-900">
                {step.t}
              </h3>
              <p className="mt-1 text-sm text-slate-600 md:mx-auto md:max-w-[26ch]">
                {step.d}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
