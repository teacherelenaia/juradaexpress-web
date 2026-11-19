// app/api/documentos/copy/route.js
//
// «Enviar documentos», plan de reserva con Drive conectado: el navegador
// no pudo subir a Google y subió el archivo a Vercel Blob. Aquí se copia a
// la carpeta de Drive del envío y se BORRA de Blob (no queda copia
// intermedia). Devuelve el id del archivo en Drive.
import { NextResponse } from "next/server";
import { get, del } from "@vercel/blob";
import { uploadBuffer } from "../../../lib/googleDrive";
import { LIMITS, cleanFileName, mimeOf, verify } from "../../../lib/docSubmission";
import { blobUrlOk, readBlob } from "../../../lib/docBlob";
import { fileMark, reserveSession } from "../../../lib/docLimits";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

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
  const url = String(body.url || "");
  if (!blobUrlOk(url, s.ref)) return json({ ok: false, error: "bad-url" }, 400);
  const name = cleanFileName(body.name);
  try {
    const buffer = await readBlob(get, url, LIMITS.drive.maxBytes);
    // Solo archivos declarados al empezar el envío (tope total por envío).
    const idx = Array.isArray(s.files) ? s.files.indexOf(fileMark(name, buffer.length)) : -1;
    if (idx < 0 || !(await reserveSession(s.sid, `c${idx}`))) {
      await del(url).catch(() => {});
      return json({ ok: false, error: "not-declared" }, 403);
    }
    const file = await uploadBuffer({
      folderId: s.folderId,
      name,
      mimeType: mimeOf(name, body.type),
      buffer,
      ref: s.ref,
    });
    try {
      await del(url);
    } catch (err) {
      console.error("[documentos/copy] del", err?.message);
    }
    return json({ ok: true, fileId: file.id, size: buffer.length });
  } catch (err) {
    console.error("[documentos/copy]", err?.message);
    return json({ ok: false, error: "server" }, 502);
  }
}
