// app/api/documentos/cleanup/route.js
//
// Limpieza diaria de copias temporales en Vercel Blob (20/11/2026, aprobada
// por Elena). La llama Vercel Cron una vez al día (vercel.json).
//
// Lo normal es que cada archivo se borre de Blob en cuanto está en Drive o
// en el correo. Esto borra lo que haya quedado por un fallo (subida
// abandonada, correo que no salió, función cortada):
//   - documentos/   y presupuestos/  → archivos de clientes con más de 24 h.
//   - limites/                        → contadores de envíos de más de 48 h.
// No toca nada más del almacén (refs/, contactos/, avisos/, wa-clicks/).
//
// Misma protección que el resumen semanal: con CRON_SECRET, solo llamadas
// con «Authorization: Bearer <CRON_SECRET>»; sin él, solo Vercel Cron.
// Con ?dry=1 dice cuántos borraría sin borrar nada.
import { del } from "@vercel/blob";
import { listAll } from "../../../lib/contactLog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const HOUR = 60 * 60 * 1000;
const RULES = [
  { prefix: "documentos/", maxAge: 24 * HOUR },
  { prefix: "presupuestos/", maxAge: 24 * HOUR },
  { prefix: "limites/", maxAge: 48 * HOUR },
];

function authorized(req) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization") || "";
  if (secret) return auth === `Bearer ${secret}`;
  return /vercel-cron/i.test(req.headers.get("user-agent") || "");
}

export async function GET(req) {
  if (!authorized(req)) return Response.json({ ok: false }, { status: 401 });
  if (!process.env.BLOB_READ_WRITE_TOKEN) return Response.json({ ok: true, deleted: 0 });
  const dry = new URL(req.url).searchParams.get("dry") === "1";
  const now = Date.now();
  const old = [];
  for (const rule of RULES) {
    const blobs = await listAll(rule.prefix);
    for (const b of blobs) {
      // Doble comprobación del prefijo: nunca se borra fuera de estas carpetas.
      if (!b.pathname.startsWith(rule.prefix)) continue;
      const at = new Date(b.uploadedAt).getTime();
      if (Number.isFinite(at) && now - at > rule.maxAge) old.push(b);
    }
  }
  if (dry) return Response.json({ ok: true, dry: true, wouldDelete: old.length });
  let deleted = 0;
  for (let i = 0; i < old.length; i += 100) {
    const batch = old.slice(i, i + 100);
    try {
      await del(batch.map((b) => b.url));
      deleted += batch.length;
    } catch (err) {
      console.error("[documentos/cleanup]", err?.message);
    }
  }
  console.log("[documentos/cleanup] borrados", deleted, "de", old.length);
  return Response.json({ ok: true, deleted });
}
