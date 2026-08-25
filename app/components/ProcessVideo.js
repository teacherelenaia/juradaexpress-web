"use client";

// app/components/ProcessVideo.js
// Contenedor de vídeo de la sección "Cómo trabajamos" (sección 6 de la
// auditoría). Solo se renderiza si content/site.js define PROCESS_VIDEO
// (src + poster); mientras tanto la sección muestra su foto. Cuando Elena
// grabe el clip (10-15 s, WebM/MP4 < 1,5 MB), basta con rellenar la
// constante: no hay que tocar código.
//
// Reglas: muted + autoplay + loop + playsinline con poster; desactivado con
// prefers-reduced-motion y con el ahorro de datos activado
// (navigator.connection.saveData) — en esos casos se muestra el poster.
import { useEffect, useState } from "react";
import { PROCESS_VIDEO } from "../../content/site";

export default function ProcessVideo({ className = "" }) {
  const [playable, setPlayable] = useState(false);

  useEffect(() => {
    if (!PROCESS_VIDEO?.src) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = navigator.connection?.saveData === true;
    setPlayable(!reduced && !saveData);
  }, []);

  if (!PROCESS_VIDEO?.src) return null;

  return (
    <div className={`relative overflow-hidden rounded-xl shadow ${className}`}>
      {playable ? (
        <video
          src={PROCESS_VIDEO.src}
          poster={PROCESS_VIDEO.poster}
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          aria-label={PROCESS_VIDEO.alt}
        />
      ) : (
        // Con movimiento reducido o ahorro de datos: solo el poster.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={PROCESS_VIDEO.poster}
          alt={PROCESS_VIDEO.alt}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
