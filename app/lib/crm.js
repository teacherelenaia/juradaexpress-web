// app/lib/crm.js
//
// Aviso directo al CRM de Elena (Supabase, Edge Function `recibir`) cuando
// llega una solicitud de la calculadora (20/10/2026). Antes solo llegaba por
// el email de presupuestos@ que lee un Zap de Zapier, y ese camino se perdía
// solicitudes. El email se sigue mandando igual; si el CRM recibe la misma
// solicitud por las dos vías, descarta la segunda.
//
// Solo servidor. Variables (ver .env.local.example):
// - CRM_WEBHOOK_TOKEN: token secreto del webhook (cabecera x-crm-token).
//   Sin él no se avisa al CRM y la calculadora funciona igual.
// - CRM_WEBHOOK_URL: opcional; por defecto la función `recibir` del proyecto.

const DEFAULT_URL = "https://voximiqsdruhzplccrmq.supabase.co/functions/v1/recibir";

/**
 * Manda la solicitud al CRM. Nunca lanza ni bloquea más de 5 s.
 * Devuelve true si el CRM la acepta.
 */
export async function notifyCrm(payload) {
  const token = process.env.CRM_WEBHOOK_TOKEN;
  if (!token) return false;
  try {
    const res = await fetch(process.env.CRM_WEBHOOK_URL || DEFAULT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-crm-token": token },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    });
    return res.ok;
  } catch {
    return false;
  }
}
