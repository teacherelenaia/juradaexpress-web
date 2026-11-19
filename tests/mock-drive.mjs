// tests/mock-drive.mjs
//
// Google Drive SIMULADO para probar «Enviar documentos» sin credenciales
// (19/11/2026). Imita lo que usa app/lib/googleDrive.js: token OAuth,
// búsqueda y creación de carpetas, sesiones de subida reanudable (308 +
// Range, como Google, SIN exponer «Range» por CORS), consulta de estado,
// lectura y edición de archivos. Con /__control se provocan cortes de red
// y errores 503 para probar los reintentos.
//
//   node tests/mock-drive.mjs            (puerto 3399, o MOCK_DRIVE_PORT)
//   GET  /__state     → archivos guardados (sin contenido)
//   POST /__control   → { cut: n, fail503: n, reset: true }
import http from "node:http";
import { randomUUID } from "node:crypto";

const PORT = Number(process.env.MOCK_DRIVE_PORT || 3399);
const BASE = `http://127.0.0.1:${PORT}`;
let files = [];
let sessions = new Map();
let control = { cut: 0, fail503: 0 };

const read = (req) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });

function cors(req, res) {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    // Como Google: no expone «Range».
    res.setHeader("Access-Control-Expose-Headers", "Content-Length, Content-Type, X-GUploader-UploadID");
  }
}

function send(res, status, body, headers = {}) {
  const data = typeof body === "string" ? body : JSON.stringify(body);
  res.writeHead(status, { "Content-Type": "application/json", ...headers });
  res.end(data);
}

const meta = (f) => ({
  id: f.id,
  name: f.name,
  mimeType: f.mimeType,
  parents: f.parents,
  appProperties: f.appProperties,
  size: f.mimeType === "application/vnd.google-apps.folder" ? undefined : String(f.content.length),
  webViewLink: `https://drive.google.com/drive/folders/${f.id}`,
  trashed: false,
});

function matches(f, q) {
  for (const m of q.matchAll(/appProperties has \{ key='([^']+)' and value='([^']*)' \}/g)) {
    if (!f.appProperties || f.appProperties[m[1]] !== m[2]) return false;
  }
  for (const m of q.matchAll(/'([^']+)' in parents/g)) {
    if (!f.parents || !f.parents.includes(m[1])) return false;
  }
  const mt = /mimeType='([^']+)'/.exec(q);
  if (mt && f.mimeType !== mt[1]) return false;
  return true;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, BASE);
  const p = url.pathname;
  if (process.env.MOCK_DRIVE_LOG) console.log(new Date().toISOString().slice(11, 23), req.method, p, req.headers["content-range"] || "", url.searchParams.get("upload_id") ? "" : url.search.slice(0, 60));
  cors(req, res);
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", req.headers["access-control-request-headers"] || "content-range");
    res.writeHead(200);
    return res.end();
  }
  try {
    if (p === "/__state") return send(res, 200, files.map(meta));
    if (p === "/__control") {
      const c = JSON.parse((await read(req)).toString() || "{}");
      if (c.reset) {
        files = [];
        sessions = new Map();
        control = { cut: 0, fail503: 0 };
      }
      if (c.cut != null) control.cut = c.cut;
      if (c.fail503 != null) control.fail503 = c.fail503;
      return send(res, 200, { ok: true, control });
    }
    if (p === "/token") return send(res, 200, { access_token: "mock-token", expires_in: 3600 });

    if (p === "/drive/v3/files" && req.method === "GET") {
      const q = url.searchParams.get("q") || "";
      return send(res, 200, { files: files.filter((f) => matches(f, q)).map(meta) });
    }
    if (p === "/drive/v3/files" && req.method === "POST") {
      const body = JSON.parse((await read(req)).toString());
      const f = { id: `fld${randomUUID().replace(/-/g, "").slice(0, 20)}`, content: Buffer.alloc(0), ...body };
      files.push(f);
      return send(res, 200, meta(f));
    }
    let m = /^\/drive\/v3\/files\/([^/]+)$/.exec(p);
    if (m) {
      const f = files.find((x) => x.id === m[1]);
      if (!f) return send(res, 404, { error: { message: "not found" } });
      if (req.method === "PATCH") {
        const body = JSON.parse((await read(req)).toString());
        Object.assign(f.appProperties || (f.appProperties = {}), body.appProperties || {});
        return send(res, 200, meta(f));
      }
      if (url.searchParams.get("alt") === "media") {
        res.writeHead(200, { "Content-Type": f.mimeType });
        return res.end(f.content);
      }
      return send(res, 200, meta(f));
    }
    m = /^\/upload\/drive\/v3\/files\/([^/]+)$/.exec(p);
    if (m && req.method === "PATCH") {
      const f = files.find((x) => x.id === m[1]);
      if (!f) return send(res, 404, {});
      f.content = await read(req);
      return send(res, 200, meta(f));
    }
    if (p === "/upload/drive/v3/files" && req.method === "POST") {
      const body = JSON.parse((await read(req)).toString());
      const id = randomUUID();
      sessions.set(id, {
        meta: body,
        size: Number(req.headers["x-upload-content-length"]),
        mimeType: req.headers["x-upload-content-type"],
        data: Buffer.alloc(0),
        file: null,
      });
      res.setHeader("Location", `${BASE}/upload/drive/v3/files?uploadType=resumable&upload_id=${id}`);
      return send(res, 200, {});
    }
    if (p === "/upload/drive/v3/files" && req.method === "PUT") {
      const s = sessions.get(url.searchParams.get("upload_id"));
      if (!s) return send(res, 404, "Not Found");
      const range = req.headers["content-range"] || "";
      if (control.fail503 > 0 && !range.startsWith("bytes */")) {
        control.fail503--;
        await read(req);
        return send(res, 503, { error: "backend" });
      }
      if (control.cut > 0 && !range.startsWith("bytes */")) {
        // Corte de red a mitad de trozo: se guarda la mitad y se cuelga.
        control.cut--;
        const chunk = await read(req);
        const r0 = /bytes (\d+)-/.exec(range);
        const start0 = r0 ? Number(r0[1]) : 0;
        if (start0 <= s.data.length) {
          s.data = Buffer.concat([s.data.subarray(0, start0), chunk.subarray(0, Math.floor(chunk.length / 2 / 262144) * 262144)]);
        }
        return req.socket.destroy();
      }
      const finish = () => {
        if (!s.file) {
          s.file = {
            id: `f${randomUUID().replace(/-/g, "").slice(0, 24)}`,
            name: s.meta.name,
            parents: s.meta.parents,
            appProperties: s.meta.appProperties,
            mimeType: s.mimeType,
            content: s.data,
          };
          files.push(s.file);
        }
        return send(res, 200, { id: s.file.id, name: s.file.name, size: String(s.data.length) });
      };
      if (range.startsWith("bytes */")) {
        await read(req);
        if (s.file) return finish();
        return send(res, 308, "", s.data.length ? { Range: `bytes=0-${s.data.length - 1}` } : {});
      }
      const chunk = await read(req);
      const r = /bytes (\d+)-(\d+)\/(\d+)/.exec(range);
      if (!r) {
        // Subida entera sin Content-Range (desde el servidor).
        s.data = chunk;
        return finish();
      }
      const start = Number(r[1]);
      if (start !== s.data.length) {
        if (start > s.data.length) return send(res, 400, { error: "gap" });
        s.data = s.data.subarray(0, start);
      }
      s.data = Buffer.concat([s.data, chunk]);
      if (s.data.length >= s.size) return finish();
      return send(res, 308, "", { Range: `bytes=0-${s.data.length - 1}` });
    }
    return send(res, 404, { error: "no route" });
  } catch (err) {
    return send(res, 500, { error: String(err && err.message) });
  }
});

server.listen(PORT, "127.0.0.1", () => console.log(`mock drive on ${BASE}`));
