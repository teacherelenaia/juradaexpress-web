// app/api/documentos/blob/route.js
//
// «Enviar documentos»: subida directa del navegador a Vercel Blob (almacén
// PRIVADO, token de un solo uso). Se usa en dos casos:
//   - Drive aún no está conectado (mode = "blob"): el archivo se queda en
//     Blob hasta que /api/documentos/finish lo adjunta al correo de Elena y
//     lo borra.
//   - Drive está conectado pero la subida directa a Google falla en ese
//     navegador: el archivo va a Blob, /api/documentos/copy lo copia a la
//     carpeta de Drive y lo BORRA de Blob en el acto.
// Como en /api/quote/upload, el archivo no pasa por la función.
import { handleUpload } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { LIMITS, ALLOWED_MIME, verify } from "../../../lib/docSubmission";

export const runtime = "nodejs";

export async function POST(request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "blob-not-configured" }, { status: 503 });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad-request" }, { status: 400 });
  }
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const s = verify(clientPayload, "s");
        if (!s) throw new Error("expired");
        if (!pathname.startsWith(`documentos/${s.ref}/`) || pathname.includes("..")) {
          throw new Error("bad-pathname");
        }
        const limits = LIMITS[s.mode] || LIMITS.blob;
        return {
          allowedContentTypes: [...ALLOWED_MIME, "application/octet-stream"],
          maximumSizeInBytes: limits.maxBytes,
          addRandomSuffix: true,
          validUntil: Date.now() + 60 * 60 * 1000,
        };
      },
    });
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: String(err?.message || "upload-error") }, { status: 400 });
  }
}
