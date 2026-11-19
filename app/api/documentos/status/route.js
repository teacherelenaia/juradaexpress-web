// app/api/documentos/status/route.js
//
// «Enviar documentos»: cuántos bytes de un archivo tiene ya Google. El
// navegador lo pregunta al reanudar (corte de red, recarga de la página)
// para seguir desde ahí y no desde cero. Solo acepta la URL de sesión que
// va dentro del token firmado del archivo.
import { NextResponse } from "next/server";
import { uploadStatus } from "../../../lib/googleDrive";
import { verify } from "../../../lib/docSubmission";

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
  const f = verify(body.fileToken, "f");
  // El archivo es del mismo envío (misma referencia y carpeta), aunque el
  // navegador haya abierto otra sesión tras recargar la página.
  if (!s || !f || f.ref !== s.ref || f.folderId !== s.folderId) return json({ ok: false, error: "expired" }, 401);
  try {
    const st = await uploadStatus(f.url, f.size);
    return json({
      ok: true,
      offset: st.offset,
      done: st.done,
      expired: st.expired,
      fileId: st.file && st.file.id ? st.file.id : null,
    });
  } catch (err) {
    console.error("[documentos/status]", err?.message);
    return json({ ok: false, error: "server" }, 502);
  }
}
