// app/indexnow-key/route.js
//
// Archivo de verificación de IndexNow (10/10/2026): texto plano con la clave
// INDEXNOW_KEY. El protocolo exige que el archivo se llame <clave>.txt, así
// que next.config.mjs reescribe /<clave>.txt a esta ruta cuando la variable
// está definida en el build; la ruta en sí responde 404 mientras no haya
// clave. Ver app/lib/indexnow.mjs.
import { isValidKey } from "../lib/indexnow.mjs";

export const dynamic = "force-dynamic";

export function GET() {
  const key = process.env.INDEXNOW_KEY;
  if (!isValidKey(key)) return new Response("Not found", { status: 404 });
  return new Response(key, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
