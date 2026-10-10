// app/lib/resend.js
//
// Envío de emails con Resend por su API REST (fetch, sin dependencia npm).
// Solo servidor: RESEND_API_KEY nunca llega al navegador. Lo usan
// app/api/quote/route.js (solicitudes de la calculadora, con adjuntos) y
// app/api/wa-click/route.js (aviso de WhatsApp desde anuncio).
//
// Variables (ver .env.local.example): RESEND_API_KEY, QUOTE_FROM_EMAIL
// (remitente verificado) y QUOTE_TO_EMAIL (buzón de Elena; por defecto
// info@juradaexpress.es).

export const DEFAULT_TO_EMAIL = "info@juradaexpress.es";

// Configuración leída del entorno o null si falta la clave o el remitente.
export function resendConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.QUOTE_FROM_EMAIL;
  const to = process.env.QUOTE_TO_EMAIL || DEFAULT_TO_EMAIL;
  if (!apiKey || !from) return null;
  return { apiKey, from, to };
}

/**
 * Manda un email de texto plano (con adjuntos opcionales en base64).
 * Devuelve true si Resend acepta el envío; false en cualquier otro caso
 * (nunca lanza).
 */
export async function sendResendEmail({
  apiKey,
  from,
  to,
  replyTo,
  subject,
  text,
  attachments,
}) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: Array.isArray(to) ? to : [to],
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject,
        text,
        ...(attachments && attachments.length ? { attachments } : {}),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
