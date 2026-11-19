// app/api/documentos/start/route.js
//
// «Enviar documentos» (19/11/2026), paso 1.
//   GET  → { mode: "drive" | "blob", maxFiles, maxBytes } para validar los
//          archivos en el navegador antes de empezar.
//   POST → valida el formulario, busca o crea la carpeta del envío en Drive
//          (AAAA-MM-DD Nombre – JX-XXXXXX) y devuelve un token firmado con
//          la referencia y la carpeta. Nada de esto va en la URL.
//
// Sin Drive conectado (variables GOOGLE_*), mode = "blob": los archivos
// suben a Vercel Blob (privado) y llegan adjuntos al correo de Elena.
import { NextResponse } from "next/server";
import { driveConfigured, findOrCreateSubmissionFolder } from "../../../lib/googleDrive";
import { madridDate } from "../../../lib/contactLog";
import {
  LIMITS,
  TOKEN_TTL_MS,
  EMAIL_RE,
  clean,
  contactKey,
  newRef,
  validRef,
  isProduction,
  TEST_REF,
  sign,
} from "../../../lib/docSubmission";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const json = (body, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

const modeNow = () => (driveConfigured() ? "drive" : process.env.BLOB_READ_WRITE_TOKEN ? "blob" : "none");

export async function GET() {
  const mode = modeNow();
  return json({ mode, ...(LIMITS[mode] || LIMITS.blob) });
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "bad-request" }, 400);
  }
  if (clean(body.botcheck)) return json({ ok: false, error: "bad-request" }, 400);
  if (body.privacy !== true) return json({ ok: false, error: "privacy-required" }, 400);

  const name = clean(body.name, 120);
  const emailRaw = clean(body.email, 160);
  const email = EMAIL_RE.test(emailRaw) ? emailRaw : "";
  const phone = clean(body.phone, 40);
  if (!email && !phone) return json({ ok: false, error: "contact-required" }, 400);
  const locale = body.locale === "en" ? "en" : "es";

  const mode = modeNow();
  if (mode === "none") return json({ ok: false, error: "storage-not-configured" }, 503);

  const contact = contactKey(email, phone);
  // Referencia: la que trae el navegador (misma visita o envío anterior) o
  // una nueva. En preview y local, siempre JX-TEST.
  let ref = !isProduction() ? TEST_REF : validRef(body.ref) ? clean(body.ref, 10) : newRef();

  let folderId = null;
  let appended = false;
  if (mode === "drive") {
    try {
      let folder = await findOrCreateSubmissionFolder({ ref, name, contactKey: contact, date: madridDate() });
      if (folder.conflict) {
        // Esa referencia es de otro contacto: carpeta nueva con otra referencia.
        ref = newRef();
        folder = await findOrCreateSubmissionFolder({ ref, name, contactKey: contact, date: madridDate() });
      }
      folderId = folder.id;
      appended = !folder.created;
    } catch (err) {
      console.error("[documentos/start] drive", err?.message);
      return json({ ok: false, error: "drive-unavailable" }, 502);
    }
  }

  const now = Date.now();
  const token = sign({
    k: "s",
    sid: `${now.toString(36)}${Math.random().toString(36).slice(2, 8)}`,
    ref,
    mode,
    folderId,
    appended,
    contact,
    locale,
    iat: now,
    exp: now + TOKEN_TTL_MS,
  });
  return json({ ok: true, ref, mode, token, ...LIMITS[mode] });
}
