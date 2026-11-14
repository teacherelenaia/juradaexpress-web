// app/lib/paymentOrigin.js
//
// Línea «Origen del cliente» del correo «Pago recibido» (14/11/2026).
//
// Los Payment Links que crea Setty llevan en los datos adicionales
// (metadata) `ref`: la referencia JX del aviso de WhatsApp, «calculadora»
// (vino por la calculadora) o «sin-ref». Stripe copia esos datos a la
// sesión de pago, así que el webhook los lee de session.metadata.ref.
// Con una referencia JX se busca su atribución en refs/ (Vercel Blob,
// app/lib/contactLog.js), guardada en el momento del aviso.
import { originSummary } from "./adsCampaign";
import { REF_RE } from "./contactLog";

export function paymentRef(session) {
  const meta = (session && session.metadata) || {};
  return String(meta.ref ?? meta.Ref ?? meta.REF ?? "").trim();
}

/**
 * Texto de la línea a partir de la referencia y del registro encontrado
 * (o null). Sin E/S: el webhook hace la búsqueda y llama aquí.
 */
export function originLineFor(ref, record) {
  const r = String(ref || "").trim();
  if (!r) return "Origen del cliente: sin referencia (el pago no trae «ref»)";
  if (/^sin[-_ ]?ref$/i.test(r)) return "Origen del cliente: sin referencia (ref: sin-ref)";
  if (/^calculadora$/i.test(r)) return "Origen del cliente: calculadora de la web (ref: calculadora, sin referencia de anuncio)";
  const up = r.toUpperCase();
  if (!REF_RE.test(up)) return `Origen del cliente: referencia «${r}» no reconocida`;
  if (!record) return `Origen del cliente: ${up} no aparece entre los avisos guardados`;
  const info = { campaign: record.campana || "", keyword: record.palabraClave || "" };
  return `Origen del cliente: ${originSummary(record.origen || "web", info)} (${up})`;
}
