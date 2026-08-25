// app/components/ui.js
// Piezas del sistema visual (FASE 1).
//
// - SectionHeading: titular de sección en Newsreader (display), sin kicker.
// - Card: superficie blanca con borde stone; `elevated` añade la sombra
//   tintada de navy SOLO donde la elevación aporte jerarquía (p. ej. un
//   elemento interactivo destacado), no como decoración por defecto.
// Los botones son las clases .btn-* de globals.css.

export function SectionHeading({
  as: Tag = "h2",
  light = false,
  className = "",
  children,
}) {
  return (
    <Tag
      className={`font-display text-balance text-3xl font-semibold leading-snug tracking-[-0.02em] md:text-4xl ${
        light ? "text-white" : "text-slate-900"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

export function Card({
  as: Tag = "div",
  elevated = false,
  className = "",
  children,
  ...rest
}) {
  return (
    <Tag
      className={`rounded-xl bg-white ring-1 ring-stone-200 ${
        elevated ? "shadow-card" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
