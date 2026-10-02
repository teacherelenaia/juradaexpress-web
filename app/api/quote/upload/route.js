// app/api/quote/upload/route.js
//
// Subida directa de archivos de la calculadora a Vercel Blob (02/10/2026).
// El navegador pide aquí un token de un solo uso y sube el archivo
// DIRECTAMENTE al almacén privado de Blob, sin pasar por la función: así
// desaparece el límite de ~4,5 MB del cuerpo de las peticiones de Vercel,
// que obligaba a mandar por WhatsApp los PDF grandes (escaneos del móvil).
//
// El almacén es PRIVADO (access: "private"): los documentos no tienen URL
// pública. /api/quote los descarga con el token del servidor, los adjunta
// al email a Elena y los borra.
//
// Requiere BLOB_READ_WRITE_TOKEN (lo crea Vercel al conectar el almacén).
import { handleUpload } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const UPLOAD_PREFIX = "presupuestos/";
const UPLOAD_MAX_BYTES = 25 * 1024 * 1024;
const ALLOWED = ["application/pdf", "image/jpeg", "image/png", "image/heic", "image/heif"];

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
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith(UPLOAD_PREFIX) || pathname.includes("..")) {
          throw new Error("bad-pathname");
        }
        return {
          allowedContentTypes: ALLOWED,
          maximumSizeInBytes: UPLOAD_MAX_BYTES,
          addRandomSuffix: true,
          validUntil: Date.now() + 15 * 60 * 1000,
        };
      },
    });
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: String(err?.message || "upload-error") }, { status: 400 });
  }
}
