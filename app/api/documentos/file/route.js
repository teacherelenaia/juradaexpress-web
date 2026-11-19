// app/api/documentos/file/route.js
//
// «Enviar documentos», paso 2 (modo Drive): abre una sesión de subida
// reanudable de Google Drive para UN archivo, dentro de la carpeta del
// envío, y la devuelve dentro de un token firmado. El navegador sube el
// archivo por trozos directamente a Google: ni el archivo ni sus trozos
// pasan por esta función (sin el límite de 4,5 MB de Vercel).
import { NextResponse } from "next/server";
import { createUploadSession } from "../../../lib/googleDrive";
import {
  LIMITS,
  TOKEN_TTL_MS,
  allowedFile,
  cleanFileName,
  mimeOf,
  requestOrigin,
  sign,
  verify,
} from "../../../lib/docSubmission";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const json = (body, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "bad-request" }, 400);
  }
  const s = verify(body.token, "s");
  if (!s) return json({ ok: false, error: "expired" }, 401);
  if (s.mode !== "drive" || !s.folderId) return json({ ok: false, error: "not-drive" }, 409);

  const name = cleanFileName(body.name);
  const size = Number(body.size);
  if (!Number.isFinite(size) || size <= 0) return json({ ok: false, error: "empty" }, 400);
  if (size > LIMITS.drive.maxBytes) return json({ ok: false, error: "size" }, 413);
  if (!allowedFile(name)) return json({ ok: false, error: "type" }, 415);

  const mimeType = mimeOf(name, body.type);
  try {
    const uploadUrl = await createUploadSession({
      folderId: s.folderId,
      name,
      mimeType,
      size,
      origin: requestOrigin(req),
      ref: s.ref,
    });
    const fileToken = sign({
      k: "f",
      sid: s.sid,
      ref: s.ref,
      folderId: s.folderId,
      url: uploadUrl,
      name,
      size,
      exp: Math.min(s.exp, Date.now() + TOKEN_TTL_MS),
    });
    return json({ ok: true, uploadUrl, fileToken });
  } catch (err) {
    console.error("[documentos/file]", err?.message);
    return json({ ok: false, error: "server" }, 502);
  }
}
