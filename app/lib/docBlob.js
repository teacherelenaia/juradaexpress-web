// app/lib/docBlob.js
//
// Ayudas de Vercel Blob para «Enviar documentos» (19/11/2026). Solo
// servidor. Solo se aceptan URL del almacén privado bajo documentos/<ref>/.

export function blobUrlOk(raw, ref) {
  let url;
  try {
    url = new URL(String(raw));
  } catch {
    return false;
  }
  return (
    url.protocol === "https:" &&
    url.hostname.endsWith(".blob.vercel-storage.com") &&
    url.pathname.startsWith(`/documentos/${ref}/`) &&
    !url.pathname.includes("..")
  );
}

// Descarga un blob privado a memoria con tope de tamaño. `get` se pasa
// desde la ruta (import de @vercel/blob) para poder probar sin red.
export async function readBlob(get, url, maxBytes) {
  const res = await get(url, { access: "private" });
  if (!res || res.statusCode !== 200 || !res.stream) throw new Error("blob-missing");
  const chunks = [];
  let size = 0;
  const reader = res.stream.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBytes) throw new Error("blob-too-large");
    chunks.push(Buffer.from(value));
  }
  return Buffer.concat(chunks);
}

// Reparte adjuntos en grupos de < maxBytes (Resend: ~25 MB reales por correo).
export function groupBySize(items, maxBytes) {
  const out = [];
  let cur = [];
  let size = 0;
  for (const it of items) {
    if (cur.length && size + it.bytes > maxBytes) {
      out.push(cur);
      cur = [];
      size = 0;
    }
    cur.push(it);
    size += it.bytes;
  }
  if (cur.length) out.push(cur);
  return out;
}
