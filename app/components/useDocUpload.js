"use client";

// app/components/useDocUpload.js
//
// Estado de una subida de documentos (19/11/2026): lista de archivos,
// progreso por archivo, reintentos, recuperación tras recargar y cierre
// del envío. Comparten este hook la página /enviar-documentos, la
// calculadora (QuoteCalculator) y el formulario del catálogo
// (DocumentCatalog). El motor está en app/lib/docUploadClient.js.
import { useCallback, useEffect, useRef, useState } from "react";
import {
  DEFAULT_LIMITS,
  UploadError,
  api,
  checkFile,
  clearStore,
  countPdfPages,
  fetchLimits,
  fileKey,
  loadStore,
  saveStore,
  uploadFile,
} from "../lib/docUploadClient";
import { getAttribution } from "../lib/attribution";
import { WA_REF_KEY, WA_REF_RE } from "../lib/waOrigin";

const CONCURRENCY = 3;

function sessionRef() {
  try {
    const ref = sessionStorage.getItem(WA_REF_KEY) || "";
    return WA_REF_RE.test(ref) ? ref : "";
  } catch {
    return "";
  }
}

/**
 * Opciones:
 *  - persist: recordar archivos y datos en localStorage (página).
 *  - legacyBlob: { handleUploadUrl, prefix } para el modo sin Drive de la
 *    calculadora (sigue usando /api/quote/upload y su correo de siempre).
 *  - limits: tope propio (la calculadora acepta menos formatos).
 */
export default function useDocUpload({ persist = false, legacyBlob = null, maxFiles: ownMax = null } = {}) {
  const [limits, setLimits] = useState(DEFAULT_LIMITS);
  const [entries, setEntries] = useState([]);
  const [rejected, setRejected] = useState([]); // [{ name, code, size }]
  const [restoredFields, setRestoredFields] = useState(null);
  const [busy, setBusy] = useState(false);
  const store = useRef({ session: null, ref: "", files: {}, fields: null });
  const entriesRef = useRef([]);
  entriesRef.current = entries;

  const maxFiles = Math.min(limits.maxFiles, ownMax || limits.maxFiles);

  const save = useCallback(() => {
    if (persist) saveStore(store.current);
  }, [persist]);

  useEffect(() => {
    let alive = true;
    fetchLimits().then((l) => alive && setLimits(l));
    if (persist) {
      const data = loadStore();
      if (data) {
        store.current = { session: null, ref: "", files: {}, fields: null, ...data };
        if (data.fields) setRestoredFields(data.fields);
        const restored = Object.entries(data.files || {}).map(([key, f]) => ({
          key,
          file: null,
          name: f.name,
          size: f.size,
          pages: f.pages || null,
          status: f.status === "done" ? "done" : "missing",
          progress: f.status === "done" ? f.size : f.offset || 0,
          error: "",
        }));
        if (restored.length) setEntries(restored);
      }
    }
    return () => {
      alive = false;
    };
  }, [persist]);

  const update = useCallback((key, patch) => {
    setEntries((prev) => prev.map((e) => (e.key === key ? { ...e, ...patch } : e)));
  }, []);

  const addFiles = useCallback(
    (list) => {
      const incoming = Array.from(list || []);
      if (!incoming.length) return;
      const next = [...entriesRef.current];
      const bad = [];
      for (const file of incoming) {
        const key = fileKey(file);
        const existing = next.find((e) => e.key === key);
        if (existing) {
          // Archivo recuperado tras recargar: se vuelve a enlazar y la
          // subida sigue donde iba.
          if (!existing.file && existing.status !== "done") {
            existing.file = file;
            existing.status = "ready";
            existing.error = "";
          }
          continue;
        }
        const code = checkFile(file, limits);
        if (code) {
          bad.push({ name: file.name, code, size: file.size });
          continue;
        }
        if (next.length >= maxFiles) {
          bad.push({ name: file.name, code: "count", size: file.size });
          continue;
        }
        next.push({ key, file, name: file.name, size: file.size, pages: null, status: "ready", progress: 0, error: "" });
        store.current.files[key] = { name: file.name, size: file.size, status: "ready" };
        countPdfPages(file).then((pages) => {
          if (!pages) return;
          if (store.current.files[key]) store.current.files[key].pages = pages;
          save();
          update(key, { pages });
        });
      }
      setEntries(next.map((e) => ({ ...e })));
      setRejected(bad);
      save();
    },
    [limits, maxFiles, save, update]
  );

  const removeFile = useCallback(
    (key) => {
      delete store.current.files[key];
      save();
      setEntries((prev) => prev.filter((e) => e.key !== key));
    },
    [save]
  );

  const saveFields = useCallback(
    (fields) => {
      if (!persist) return;
      store.current.fields = fields;
      save();
    },
    [persist, save]
  );

  /**
   * Sube lo pendiente y cierra el envío. `fields`: { name, email, phone,
   * tramite, comment, locale, privacy }. Devuelve { ok, ref, mode, token,
   * received, failed, blobs, error }.
   */
  const send = useCallback(
    async (fields, { notify = true, page = "" } = {}) => {
      setBusy(true);
      try {
        // 1. Sesión (misma referencia si ya había una).
        let session;
        try {
          session = await api("/api/documentos/start", {
            ...fields,
            privacy: true,
            // Token firmado del envío anterior (aunque haya caducado): es lo
            // único que permite añadir a la misma carpeta.
            prevToken: (store.current.session && store.current.session.token) || store.current.prevToken || "",
            ref: sessionRef(),
          });
        } catch (err) {
          return { ok: false, error: (err && err.code) || "network" };
        }
        store.current.session = { token: session.token, ref: session.ref, mode: session.mode, exp: Date.now() + 6 * 864e5 };
        store.current.ref = session.ref;
        store.current.prevToken = session.token;
        save();

        const legacy = session.mode === "blob" && legacyBlob;
        const ctx = {
          mode: session.mode,
          token: session.token,
          // Con Drive, si el navegador no llega a Google: Blob + copia.
          blobFallback: session.mode === "drive",
          blobUploadUrl: legacy ? legacyBlob.handleUploadUrl : "/api/documentos/blob",
          blobPrefix: legacy ? legacyBlob.prefix : `documentos/${session.ref}/`,
          blobPayload: legacy ? undefined : session.token,
        };
        // 2. Subidas (3 a la vez); un fallo no para a los demás.
        const queue = entriesRef.current.filter((e) => e.file && (e.status === "ready" || e.status === "failed"));
        if (session.mode === "blob" && session.maxTotal) {
          const total = queue.reduce((n, e) => n + e.size, 0);
          if (total > session.maxTotal) return { ok: false, error: "total", ref: session.ref };
        }
        const results = new Map();
        let i = 0;
        const worker = async () => {
          while (i < queue.length) {
            const e = queue[i++];
            const st = (store.current.files[e.key] = store.current.files[e.key] || { name: e.name, size: e.size });
            st.status = "uploading";
            update(e.key, { status: "uploading", error: "", progress: st.offset || 0 });
            let last = 0;
            const onProgress = (loaded) => {
              // Como mucho ~10 repintados por segundo por archivo.
              const now = Date.now();
              if (now - last < 100 && loaded < e.size) return;
              last = now;
              update(e.key, { progress: Math.min(e.size, loaded) });
            };
            try {
              const r = await uploadFile(e.file, ctx, st, onProgress, save);
              Object.assign(st, { status: "done", driveId: r.driveId || "", blobUrl: r.blobUrl || "" });
              results.set(e.key, r);
              update(e.key, { status: "done", progress: e.size, error: "" });
            } catch (err) {
              const code = err instanceof UploadError ? err.code : "network";
              st.status = "failed";
              results.set(e.key, { error: code });
              update(e.key, { status: "failed", error: code });
            }
            save();
          }
        };
        await Promise.all(Array.from({ length: Math.min(CONCURRENCY, queue.length) }, worker));

        // 3. Cierre: todo lo de este envío (también lo subido antes de recargar).
        // Los archivos recuperados que no se han vuelto a elegir no cuentan.
        const all = entriesRef.current.filter((e) => e.status !== "missing");
        const files = all.map((e) => {
          const st = store.current.files[e.key] || {};
          const done = st.status === "done";
          return {
            name: e.name,
            size: e.size,
            pages: e.pages || st.pages || null,
            status: done ? "ok" : "failed",
            reason: done ? "" : (results.get(e.key) && results.get(e.key).error) || "network",
            driveId: st.driveId || "",
            fileToken: st.fileToken || "",
            blobUrl: st.blobUrl || "",
          };
        });
        const blobs = files.filter((f) => f.status === "ok" && f.blobUrl).map((f) => ({ name: f.name, url: f.blobUrl }));

        // Calculadora sin Drive: cierra /api/quote con sus URL de Blob.
        if (legacy) {
          return {
            ok: true,
            ref: session.ref,
            mode: "blob",
            token: session.token,
            blobs,
            received: files.filter((f) => f.status === "ok"),
            failed: files.filter((f) => f.status !== "ok"),
          };
        }
        let done;
        try {
          done = await api("/api/documentos/finish", {
            token: session.token,
            ...fields,
            attribution: getAttribution() || {},
            page: page || (typeof location !== "undefined" ? location.pathname : ""),
            notify,
            files,
          });
        } catch (err) {
          return { ok: false, error: (err && err.code) || "network", ref: session.ref, token: session.token };
        }
        // Lo que el servidor no pudo comprobar se marca como fallido.
        const notOk = new Set((done.failed || []).map((f) => f.name));
        setEntries((prev) =>
          prev.map((e) =>
            notOk.has(e.name) && e.status === "done" ? { ...e, status: "failed", error: "not-verified" } : e
          )
        );
        for (const e of all) {
          const st = store.current.files[e.key];
          if (st && notOk.has(e.name) && st.status === "done") {
            st.status = "failed";
            st.uploadUrl = "";
            st.fileToken = "";
            st.offset = 0;
          }
        }
        if (!done.failed || !done.failed.length) {
          // Todo ha llegado: se olvidan los archivos, se conserva la referencia.
          store.current.files = {};
          store.current.session = null;
        }
        save();
        return {
          ok: true,
          ref: done.ref,
          mode: done.mode,
          token: session.token,
          receipt: done.receipt || "",
          received: done.received || [],
          failed: done.failed || [],
          blobs,
        };
      } finally {
        setBusy(false);
      }
    },
    [legacyBlob, save, update]
  );

  const reset = useCallback(() => {
    setEntries([]);
    setRejected([]);
    if (persist) {
      const { ref, prevToken } = store.current;
      clearStore();
      store.current = { session: null, ref, prevToken, files: {}, fields: null };
      save();
    }
  }, [persist, save]);

  return {
    limits: { ...limits, maxFiles },
    entries,
    rejected,
    busy,
    restoredFields,
    ref: store.current.ref,
    addFiles,
    removeFile,
    saveFields,
    send,
    reset,
  };
}
