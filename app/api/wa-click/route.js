// app/api/wa-click/route.js
//
// Registro de los clics en WhatsApp que vienen de un anuncio (09/10/2026).
// El navegador (app/lib/waOrigin.js) manda con sendBeacon, justo antes de
// abrir WhatsApp, { ref, lang, page, attribution }: la referencia corta
// «JX-ABC123» que va al final del mensaje y la atribución de
// app/lib/attribution.js (gclid, utm_*, landing, referrer, fecha). Nunca
// nombre, teléfono ni email.
//
// Aquí:
//   1. Se valida todo (ref /^JX-[A-Z0-9]{6}$/, campos recortados, cuerpo de
//      6 KB como máximo) y se descarta lo que no se reconoce.
//   2. Se guarda un JSON en Vercel Blob (privado) en
//      wa-clicks/AAAA/MM/JX-ABC123.json. Si ya existe, no se vuelve a
//      escribir ni a avisar (idempotente).
//   3. Se avisa por email a Elena (Resend, app/lib/resend.js) con la
//      referencia, la campaña, la página, la fecha y los datos para
//      importar la venta a Google Ads (gclid, etc.). El asunto dice el
//      origen (25/10/2026): «WhatsApp desde Google Ads · JX-…» (gclid,
//      gbraid, wbraid o utm_source=google + utm_medium=cpc), «WhatsApp
//      desde ChatGPT · JX-…» (utm_source=chatgpt.com o referrer
//      chatgpt.com) o «WhatsApp desde la web · JX-…». Desde el 14/11/2026
//      el de Google Ads lleva campaña y palabra clave («WhatsApp desde
//      Google Ads · EN · sworn translator spain · JX-…») y el cuerpo, las
//      líneas «Campaña» y «Palabra clave» (app/lib/waNotice.js).
//   3b. Se guarda la referencia con su atribución en refs/ y el contacto
//      en contactos/ (app/lib/contactLog.js) para el aviso de pago y el
//      resumen semanal.
//   4. Responde 204 siempre: el beacon no espera nada y ningún error llega
//      al navegador (todo en try/catch, errores a console.error).
import { BlobNotFoundError, head, put } from "@vercel/blob";
import { resendConfig, sendResendEmail } from "../../lib/resend";
import { parseBody, madridParts, emailSubject, emailText } from "../../lib/waNotice";
import { adsInfo, clickOrigin } from "../../lib/adsCampaign";
import { attributionRecord, logContact, saveRef } from "../../lib/contactLog";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 6 * 1024;
const BLOB_PREFIX = "wa-clicks";

const noContent = () => new Response(null, { status: 204 });

// Guarda el clic en Blob. Devuelve "saved", "exists" o "skipped" (sin token
// o error): en los dos últimos casos el email se manda igualmente salvo
// que el blob ya existiera.
async function storeClick(pathname, record) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return "skipped";
  try {
    await head(pathname, { access: "private" });
    return "exists";
  } catch (err) {
    // Caso normal: la referencia es nueva y el blob aún no existe. La
    // librería lanza BlobNotFoundError («The requested blob does not
    // exist»); se comprueba por clase y, por si cambia el mensaje o la
    // clase, por el texto. Solo lo demás se registra como error.
    const msg = String((err && err.message) || "").toLowerCase();
    const notFound =
      err instanceof BlobNotFoundError ||
      (err && err.name === "BlobNotFoundError") ||
      msg.includes("does not exist") ||
      msg.includes("not found");
    if (!notFound) console.error("[wa-click] head", err);
  }
  try {
    await put(pathname, JSON.stringify(record, null, 2), {
      access: "private",
      addRandomSuffix: false,
      contentType: "application/json",
    });
    return "saved";
  } catch (err) {
    if (/exist|overwrite/i.test(String(err && err.message))) return "exists";
    console.error("[wa-click] put", err);
    return "skipped";
  }
}

export async function POST(req) {
  try {
    const declared = Number(req.headers.get("content-length") || 0);
    if (declared > MAX_BODY_BYTES) return noContent();
    const raw = await req.text();
    if (!raw || raw.length > MAX_BODY_BYTES) return noContent();

    const click = parseBody(raw);
    if (!click) return noContent();

    const when = new Date();
    const { year, month } = madridParts(when);
    const pathname = `${BLOB_PREFIX}/${year}/${month}/${click.ref}.json`;
    const record = { ...click, receivedAt: when.toISOString() };

    const stored = await storeClick(pathname, record);
    if (stored === "exists") return noContent();

    // Referencia con su atribución (para el aviso de pago) y contacto para
    // el resumen semanal (14/11/2026). Sin token de Blob no se guarda nada.
    const origin = clickOrigin(click.attribution);
    const attrRecord = attributionRecord({
      origin,
      info: adsInfo(click.attribution),
      attr: click.attribution,
    });
    await Promise.all([
      saveRef(click.ref, { fecha: when.toISOString(), canal: "whatsapp", ...attrRecord }),
      logContact({
        canal: "whatsapp",
        id: click.ref,
        when,
        record: {
          ref: click.ref,
          origen: origin,
          campana: attrRecord.campana,
          palabraClave: attrRecord.palabraClave,
        },
      }),
    ]);

    const mail = resendConfig();
    if (!mail) return noContent();
    const ok = await sendResendEmail({
      ...mail,
      subject: emailSubject(click.ref, click.attribution),
      text: emailText({ ...click, when }),
    });
    if (!ok) console.error("[wa-click] email no enviado", click.ref);
  } catch (err) {
    console.error("[wa-click]", err);
  }
  return noContent();
}
