// app/lib/googleDrive.js
//
// Google Drive para «Enviar documentos» (19/11/2026). Solo servidor.
//
// Autorización: OAuth con la cuenta de Elena (refresh token) y el permiso
// `drive.file`: la web SOLO ve y escribe las carpetas y archivos que ella
// misma ha creado (la carpeta madre «Documentos de clientes» y lo que hay
// dentro). No puede leer nada más del Drive de Elena. No se usa cuenta de
// servicio porque las cuentas de servicio no tienen cuota de almacenamiento
// en un Drive personal (Google rechaza la subida).
//
// Variables (pasos en docs/ENVIAR-DOCUMENTOS.md):
//   GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN
//   GOOGLE_DRIVE_PARENT_ID (opcional): id de la carpeta madre. Sin él, la
//     web busca o crea «Documentos de clientes» en la raíz de Mi unidad.
//
// Las carpetas y archivos se crean como privados (dueña: Elena). Este
// archivo no crea NINGÚN permiso: nada de «cualquiera con el enlace».
//
// Subida: el servidor abre una sesión de subida reanudable con la cabecera
// Origin de la web y el navegador sube el archivo DIRECTAMENTE a Google por
// trozos (sin pasar por una función de Vercel y su límite de 4,5 MB).

// Solo pruebas (tests/enviar-documentos.spec.mjs): DRIVE_MOCK_URL apunta a
// un Drive simulado. En producción se ignora siempre.
const MOCK = process.env.VERCEL_ENV !== "production" ? process.env.DRIVE_MOCK_URL || "" : "";
const TOKEN_URL = MOCK ? `${MOCK}/token` : "https://oauth2.googleapis.com/token";
const API = `${MOCK || "https://www.googleapis.com"}/drive/v3`;
const UPLOAD = `${MOCK || "https://www.googleapis.com"}/upload/drive/v3`;
const FOLDER_MIME = "application/vnd.google-apps.folder";
export const ROOT_FOLDER_NAME = "Documentos de clientes";
export const NOTE_NAME = "Datos del envío.txt";

export function driveConfigured() {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_REFRESH_TOKEN
  );
}

export const folderUrl = (id) => `https://drive.google.com/drive/folders/${id}`;

// ─── Token de acceso (caché en memoria de la función) ───────────────────

let cached = { token: "", exp: 0 };

async function accessToken() {
  if (cached.token && Date.now() < cached.exp - 60_000) return cached.token;
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID || "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN || "",
      grant_type: "refresh_token",
    }),
    signal: AbortSignal.timeout(10_000),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) {
    // invalid_grant = token caducado o revocado: hay que repetir el paso 4.
    console.error("[drive] token", res.status, data.error || "");
    throw new Error(`drive-auth:${data.error || res.status}`);
  }
  cached = { token: data.access_token, exp: Date.now() + (data.expires_in || 3600) * 1000 };
  return cached.token;
}

async function driveFetch(url, init = {}, { retries = 2 } = {}) {
  for (let attempt = 0; ; attempt++) {
    const token = await accessToken();
    let res;
    try {
      res = await fetch(url, {
        ...init,
        headers: { Authorization: `Bearer ${token}`, ...(init.headers || {}) },
        signal: init.signal || AbortSignal.timeout(20_000),
      });
    } catch (err) {
      if (attempt < retries) {
        await sleep(400 * (attempt + 1));
        continue;
      }
      throw err;
    }
    if ((res.status === 429 || res.status >= 500) && attempt < retries) {
      await sleep(600 * (attempt + 1));
      continue;
    }
    if (res.status === 401 && attempt < retries) {
      cached = { token: "", exp: 0 };
      continue;
    }
    return res;
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Escapa un valor para la sintaxis de búsqueda de Drive (comillas simples).
const q = (v) => String(v).replace(/\\/g, "\\\\").replace(/'/g, "\\'");

async function jsonOrThrow(res, what) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error(`[drive] ${what}`, res.status, data?.error?.message || "");
    throw new Error(`drive-${what}:${res.status}`);
  }
  return data;
}

async function findOne(query, fields = "id,name,webViewLink,appProperties") {
  const url = `${API}/files?${new URLSearchParams({
    q: `${query} and trashed=false`,
    fields: `files(${fields})`,
    pageSize: "10",
    spaces: "drive",
  })}`;
  const data = await jsonOrThrow(await driveFetch(url), "search");
  return (data.files && data.files[0]) || null;
}

async function createFolder(name, parentId, appProperties) {
  const res = await driveFetch(`${API}/files?fields=id,name,webViewLink,appProperties`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      name,
      mimeType: FOLDER_MIME,
      ...(parentId ? { parents: [parentId] } : {}),
      appProperties,
    }),
  });
  return jsonOrThrow(res, "folder");
}

// ─── Carpeta madre y carpeta de cada envío ──────────────────────────────

let rootCache = "";

export async function rootFolderId() {
  if (process.env.GOOGLE_DRIVE_PARENT_ID) return process.env.GOOGLE_DRIVE_PARENT_ID;
  if (rootCache) return rootCache;
  const found = await findOne(
    `mimeType='${FOLDER_MIME}' and appProperties has { key='jxRoot' and value='1' }`
  );
  const folder = found || (await createFolder(ROOT_FOLDER_NAME, null, { jxRoot: "1" }));
  rootCache = folder.id;
  return rootCache;
}

/**
 * Carpeta del envío con esa referencia. Si ya existe, se reutiliza solo con
 * `mayAppend` (el navegador demostró que es suya con un token firmado) y el
 * mismo contacto; si no, { conflict: true } y se genera otra referencia.
 */
export async function findOrCreateSubmissionFolder({ ref, name, contactKey, date, mayAppend = true }) {
  const parent = await rootFolderId();
  const found = await findOne(
    `mimeType='${FOLDER_MIME}' and '${q(parent)}' in parents and appProperties has { key='jxRef' and value='${q(ref)}' }`
  );
  if (found) {
    const owner = found.appProperties && found.appProperties.jxContact;
    if (!mayAppend || (owner && contactKey && owner !== contactKey)) return { conflict: true };
    return { id: found.id, created: false };
  }
  const label = String(name || "Sin nombre").replace(/[/\\]+/g, " ").trim().slice(0, 80) || "Sin nombre";
  const folder = await createFolder(`${date} ${label} – ${ref}`, parent, {
    jxRef: ref,
    jxContact: contactKey || "",
  });
  return { id: folder.id, created: true };
}

// ─── Subida reanudable ──────────────────────────────────────────────────

/**
 * Abre una sesión de subida reanudable en la carpeta. Con `origin`, Google
 * permite que el navegador de esa web suba a la URL de sesión (CORS).
 * Devuelve la URL de sesión (válida una semana).
 */
export async function createUploadSession({ folderId, name, mimeType, size, origin, ref }) {
  const res = await driveFetch(
    `${UPLOAD}/files?uploadType=resumable&fields=id,name,size,parents`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "X-Upload-Content-Type": mimeType || "application/octet-stream",
        "X-Upload-Content-Length": String(size),
        ...(origin ? { Origin: origin } : {}),
      },
      body: JSON.stringify({ name, parents: [folderId], appProperties: { jxRef: ref || "" } }),
    }
  );
  if (!res.ok) await jsonOrThrow(res, "session");
  const location = res.headers.get("location");
  if (!location) throw new Error("drive-session:no-location");
  return location;
}

const SESSION_RE = /^https:\/\/www\.googleapis\.com\/upload\/drive\/v3\/files\?[^#\s]*upload_id=/;
const sessionOk = (url) =>
  SESSION_RE.test(String(url)) || (MOCK && String(url).startsWith(`${UPLOAD}/files?`) && String(url).includes("upload_id="));

/**
 * Estado de una sesión: { offset, done, file, expired }. `offset` = bytes
 * que Google ya tiene. La URL viene SIEMPRE de un token firmado por el
 * servidor, pero se comprueba igualmente que es de Google.
 */
export async function uploadStatus(sessionUrl, size) {
  if (!sessionOk(sessionUrl)) throw new Error("bad-session-url");
  const res = await fetch(sessionUrl, {
    method: "PUT",
    headers: { "Content-Length": "0", "Content-Range": `bytes */${size}` },
    signal: AbortSignal.timeout(15_000),
  });
  if (res.status === 200 || res.status === 201) {
    const file = await res.json().catch(() => null);
    return { offset: size, done: true, file, expired: false };
  }
  if (res.status === 308) {
    const range = res.headers.get("range");
    const m = range && /bytes=0-(\d+)/.exec(range);
    return { offset: m ? Number(m[1]) + 1 : 0, done: false, file: null, expired: false };
  }
  if (res.status === 404 || res.status === 410) return { offset: 0, done: false, file: null, expired: true };
  throw new Error(`drive-status:${res.status}`);
}

/** Sube un archivo entero desde el servidor (copia desde Blob, nota). */
export async function uploadBuffer({ folderId, name, mimeType, buffer, ref, appProperties }) {
  const session = await createUploadSession({
    folderId,
    name,
    mimeType,
    size: buffer.length,
    ref,
  });
  const res = await fetch(session, {
    method: "PUT",
    headers: { "Content-Type": mimeType || "application/octet-stream" },
    body: buffer,
    signal: AbortSignal.timeout(50_000),
  });
  const file = await jsonOrThrow(res, "upload");
  if (appProperties) {
    await driveFetch(`${API}/files/${encodeURIComponent(file.id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ appProperties }),
    }).catch(() => {});
  }
  return file;
}

/** Datos de un archivo: { id, name, size, parents, mimeType } o null. */
export async function getFile(id) {
  if (!/^[A-Za-z0-9_-]{10,200}$/.test(String(id))) return null;
  const res = await driveFetch(
    `${API}/files/${encodeURIComponent(id)}?fields=id,name,size,parents,mimeType,trashed`
  );
  if (res.status === 404) return null;
  return jsonOrThrow(res, "get");
}

/**
 * Nota de texto con los datos del formulario. Si ya existe en la carpeta
 * (envío anterior con la misma referencia), se le añade el texto nuevo.
 */
export async function writeNote(folderId, text, ref) {
  const found = await findOne(
    `'${q(folderId)}' in parents and appProperties has { key='jxNote' and value='1' }`,
    "id,name"
  );
  if (!found) {
    return uploadBuffer({
      folderId,
      name: NOTE_NAME,
      mimeType: "text/plain",
      buffer: Buffer.from(text, "utf8"),
      ref,
      appProperties: { jxNote: "1", jxRef: ref || "" },
    });
  }
  const current = await driveFetch(`${API}/files/${encodeURIComponent(found.id)}?alt=media`);
  const before = current.ok ? await current.text() : "";
  const res = await driveFetch(`${UPLOAD}/files/${encodeURIComponent(found.id)}?uploadType=media`, {
    method: "PATCH",
    headers: { "Content-Type": "text/plain; charset=UTF-8" },
    body: `${before.trimEnd()}\n\n────────────────────────────────────────\n\n${text}`,
  });
  return jsonOrThrow(res, "note");
}
