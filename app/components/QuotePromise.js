// app/components/QuotePromise.js
//
// Una línea bajo el botón principal del hero y del cierre de la home
// (Fase A2, 18/10/2026): la promesa de presupuesto de content/site.js
// (DELIVERY_PROMISE). Solo texto, sin icono. `light` para fondo navy.
import { DELIVERY_PROMISE } from "../../content/site";

export default function QuotePromise({
  locale = "es",
  light = false,
  className = "",
}) {
  const text = DELIVERY_PROMISE[locale] || DELIVERY_PROMISE.es;
  return (
    <p
      className={`text-sm ${light ? "text-brand-navy-100" : "text-slate-600"} ${className}`}
    >
      {text}
    </p>
  );
}
