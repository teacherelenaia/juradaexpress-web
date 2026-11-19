// app/lib/docUploadClient.js
//
// Motor de subida de «Enviar documentos» en el navegador (19/11/2026). Lo
// usan la página /enviar-documentos, la calculadora y el formulario del
// catálogo, para que no haya dos sistemas.
//
// Cómo viaja un archivo (modo Drive):
//   1. /api/documentos/file abre una sesión de subida reanudable de Google.
//   2. El navegador sube el archivo DIRECTAMENTE a Google en trozos de
//      2 MB (nada pasa por una función de Vercel: sin límite de 4,5 MB).
//   3. Si se corta, se pregunta a /api/documentos/status cuántos bytes
//      tiene ya Google y se sigue desde ahí, con esperas crecientes (hasta
//      8 intentos por trozo y esperando a que vuelva la conexión).
//   4. Si ese navegador no consigue hablar con Google, el archivo va a
//      Vercel Blob y el servidor lo copia a Drive y lo borra de Blob.
// Sin Drive conectado (modo "blob"), el archivo va a Vercel Blob y llega
// adjunto al correo.
//
// Lo subido se recuerda en localStorage (sin datos del archivo, solo
// nombre, tamaño y estado): si se recarga la página no se pierde, y un
// archivo a medias continúa donde iba al volver a elegirlo.
import { upload as blobUpload } from "@vercel/blob/client";

export const MB = 1024 * 1024;
export const DEFAULT_LIMITS = { mode: "drive", maxFiles: 40, maxBytes: 50 * MB };
export const CHUNK_BYTES = 2 * MB; // múltiplo de 256 KB (exigencia de Google)
export const ACCEPT =
  ".pdf,.jpg,.jpeg,.png,.heic,.heif,.docx,.zip,application/pdf,image/jpeg,image/png,image/heic,image/heif,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/zip";
const EXT_RE = /\.(pdf|jpe?g|png|heic|heif|docx|zip)$/i;
const MIME_OK = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/heic",
  "image/heif",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/zip",
  "application/x-zip-compressed",
]);
const MAX_ATTEMPTS = 8;
const STORE_KEY = "jx_docs_v1";

export const fileKey = (f) => `${f.name}|${f.size}|${f.lastModified || 0}`;

/** Código de error al elegir el archivo, o "" si vale. */
export function checkFile(file, limits = DEFAULT_LIMITS) {
  if (!file || !file.size) return "empty";
  if (!EXT_RE.test(file.name || "")) return "type";
  if (file.size > limits.maxBytes) return "size";
  return "";
}

/**
 * Páginas de un PDF cuando se pueden leer (cuenta los objetos /Page o, si
 * no, el /Count más alto). null si no se sabe: no es un dato crítico.
 */
export async function countPdfPages(file) {
  if (!/\.pdf$/i.test(file.name || "") && file.type !== "application/pdf") return null;
  if (file.size > 25 * MB) return null;
  try {
    const text = new TextDecoder("latin1").decode(await file.arrayBuffer());
    const pages = (text.match(/\/Type\s*\/Page(?![a-zA-Z])/g) || []).length;
    if (pages) return pages;
    let max = 0;
    for (const m of text.matchAll(/\/Count\s+(\d+)/g)) max = Math.max(max, Number(m[1]));
    return max || null;
  } catch {
    return null;
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Espera a que el navegador vuelva a tener conexión (máx. 60 s).
function waitOnline() {
  if (typeof navigator === "undefined" || navigator.onLine !== false) return Promise.resolve();
  return new Promise((resolve) => {
    const done = () => {
      window.removeEventListener("online", done);
      resolve();
    };
    window.addEventListener("online", done);
    setTimeout(done, 60_000);
  });
}

const backoff = (attempt) => Math.min(15_000, 1000 * 2 ** attempt) + Math.round(Math.random() * 400);

export class UploadError extends Error {
  constructor(code) {
    super(code);
    this.code = code;
  }
}

/** POST JSON con reintentos ante cortes y errores 5xx. */
export async function api(path, body, { retries = 3 } = {}) {
  let last = "network";
  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt) {
      await waitOnline();
      await sleep(backoff(attempt - 1));
    }
    try {
      const res = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok !== false) return data;
      last = data.error || (res.status >= 500 ? "server" : "bad-request");
      if (res.status < 500 && res.status !== 429) throw new UploadError(last);
    } catch (err) {
      if (err instanceof UploadError) throw err;
      last = "network";
    }
  }
  throw new UploadError(last === "network" ? "network" : "server");
}

export async function fetchLimits() {
  try {
    const res = await fetch("/api/documentos/start", { cache: "no-store" });
    const data = await res.json();
    if (data && data.maxBytes) return data;
  } catch {
    /* valores por defecto */
  }
  return DEFAULT_LIMITS;
}

// PUT de un trozo con XMLHttpRequest (para tener progreso de subida).
function putChunk(url, blob, headers, onProgress, timeoutMs) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    for (const [k, v] of Object.entries(headers)) xhr.setRequestHeader(k, v);
    xhr.timeout = timeoutMs;
    xhr.upload.onprogress = (e) => onProgress && onProgress(e.loaded);
    xhr.onload = () => {
      let range = null;
      try {
        range = xhr.getResponseHeader("Range");
      } catch {
        range = null;
      }
      resolve({ status: xhr.status, range, text: xhr.responseText });
    };
    xhr.onerror = () => resolve({ status: 0 });
    xhr.ontimeout = () => resolve({ status: 0 });
    xhr.onabort = () => resolve({ status: 0 });
    xhr.send(blob);
  });
}

/**
 * Sube un archivo a Drive por trozos. `state` se va actualizando (y se
 * guarda con `save`) para poder reanudar. Devuelve el id del archivo.
 */
async function uploadDrive(file, ctx, state, onProgress, save) {
  const size = file.size;
  const newSession = async () => {
    const r = await api("/api/documentos/file", { token: ctx.token, name: file.name, size, type: file.type });
    state.uploadUrl = r.uploadUrl;
    state.fileToken = r.fileToken;
    state.offset = 0;
    save();
  };
  const askStatus = async () => {
    const st = await api("/api/documentos/status", { token: ctx.token, fileToken: state.fileToken }, { retries: 2 });
    if (st.expired) {
      await newSession();
      return null;
    }
    if (st.done) return st.fileId;
    state.offset = st.offset;
    save();
    return null;
  };

  if (!state.uploadUrl) await newSession();
  else {
    const id = await askStatus().catch(() => null);
    if (id) return id;
  }

  let attempts = 0;
  // ¿Ha contestado Google alguna vez a este navegador (aunque sea un 503)?
  let reached = state.offset > 0;
  while (true) {
    const start = state.offset;
    const end = Math.min(start + CHUNK_BYTES, size);
    const res = await putChunk(
      state.uploadUrl,
      file.slice(start, end),
      { "Content-Range": `bytes ${start}-${end - 1}/${size}` },
      (loaded) => onProgress(start + loaded),
      // ~2 MB a 30 kB/s (cobertura muy mala) + margen.
      120_000
    );
    if (res.status > 0) reached = true;
    if (res.status === 200 || res.status === 201) {
      onProgress(size);
      try {
        const data = JSON.parse(res.text || "{}");
        if (data.id) return data.id;
      } catch {
        /* se pregunta al servidor */
      }
      const id = await askStatus();
      if (id) return id;
      throw new UploadError("server");
    }
    if (res.status === 308) {
      attempts = 0;
      const m = res.range && /bytes=0-(\d+)/.exec(res.range);
      if (m) state.offset = Number(m[1]) + 1;
      else {
        // Google no expone «Range» al navegador (CORS) y lo omite si no ha
        // guardado nada: se pregunta al servidor cuántos bytes tiene.
        try {
          const id = await askStatus();
          if (id) return id;
        } catch {
          state.offset = start; // se repite el trozo: nunca se salta bytes
        }
      }
      save();
      onProgress(state.offset);
      continue;
    }
    if (res.status === 404 || res.status === 410) {
      await newSession();
      continue;
    }
    if (res.status >= 400 && res.status < 500 && res.status !== 408 && res.status !== 429) {
      throw new UploadError("server");
    }
    // Corte de red, tiempo agotado, 5xx o 429: esperar y reanudar.
    attempts++;
    // Este navegador no llega NUNCA a Google (cortafuegos, extensión,
    // CORS): a la reserva por Blob sin gastar los 8 intentos.
    if (!reached && attempts >= 3 && ctx.blobFallback) {
      throw new UploadError("drive-unreachable");
    }
    if (attempts >= MAX_ATTEMPTS) throw new UploadError("network");
    await waitOnline();
    await sleep(backoff(attempts - 1));
    try {
      const id = await askStatus();
      if (id) return id;
    } catch {
      /* se sigue con el offset que había */
    }
  }
}

function safeBlobName(name) {
  const clean = String(name || "documento")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(-80);
  return clean || "documento";
}

// Subida directa a Vercel Blob (privado) con 3 intentos.
async function uploadToBlob(file, ctx, onProgress) {
  let last;
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt) {
      await waitOnline();
      await sleep(backoff(attempt));
    }
    try {
      const blob = await blobUpload(`${ctx.blobPrefix}${safeBlobName(file.name)}`, file, {
        access: "private",
        handleUploadUrl: ctx.blobUploadUrl,
        clientPayload: ctx.blobPayload,
        contentType: file.type || "application/octet-stream",
        // Por partes con reintentos propios para archivos grandes. Sin
        // onUploadProgress (en Chrome activa una subida en streaming que se
        // queda en 0 % tras proxies HTTP/1.1, ver QuoteCalculator).
        multipart: file.size > 8 * MB,
        abortSignal: AbortSignal.timeout ? AbortSignal.timeout(120_000 + Math.round(file.size / 20)) : undefined,
      });
      onProgress(file.size);
      return blob.url;
    } catch (err) {
      last = err;
    }
  }
  throw new UploadError(last && /size|large/i.test(String(last.message)) ? "size" : "network");
}

/**
 * Sube un archivo según el modo del envío. `state` es el registro
 * persistente del archivo. Devuelve { driveId } o { blobUrl }.
 */
export async function uploadFile(file, ctx, state, onProgress, save) {
  if (ctx.mode === "drive") {
    try {
      const driveId = await uploadDrive(file, ctx, state, onProgress, save);
      return { driveId };
    } catch (err) {
      const code = err && err.code;
      if (!ctx.blobFallback || !["drive-unreachable", "server", "network"].includes(code)) throw err;
      if (code === "network" && state.offset > 0) throw err; // Google sí respondía: no es el navegador
      // Reserva: Blob y copia a Drive en el servidor (que borra la copia).
      onProgress(0);
      try {
        const url = await uploadToBlob(file, ctx, onProgress);
        const r = await api("/api/documentos/copy", { token: ctx.token, url, name: file.name, type: file.type });
        return { driveId: r.fileId, viaBlob: true };
      } catch {
        throw new UploadError(code === "drive-unreachable" ? "drive-unreachable" : code);
      }
    }
  }
  const blobUrl = await uploadToBlob(file, ctx, onProgress);
  return { blobUrl };
}

// ─── Persistencia (localStorage) ────────────────────────────────────────

export function loadStore() {
  try {
    const data = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
    if (!data || typeof data !== "object") return null;
    if (data.session && data.session.exp && Date.now() > data.session.exp) data.session = null;
    return data;
  } catch {
    return null;
  }
}

export function saveStore(data) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(data));
  } catch {
    /* sin almacenamiento: solo se pierde la recuperación tras recargar */
  }
}

export function clearStore() {
  try {
    localStorage.removeItem(STORE_KEY);
  } catch {
    /* nada */
  }
}
