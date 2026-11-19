// app/api/documentos/finish/route.js
//
// «Enviar documentos», último paso (19/11/2026). El navegador avisa de qué
// archivos ha subido y cuáles no; aquí:
//   1. Se COMPRUEBA en Drive cada archivo que el navegador da por subido
//      (que existe, que está en la carpeta del envío y que pesa lo mismo).
//      Lo que no se puede comprobar pasa a «no ha llegado».
//   2. Se guarda (o amplía) la nota «Datos del envío.txt» en la carpeta.
//   3. Correo a Elena «Documentos recibidos · Nombre · N archivos · JX-…»
//      con el enlace a la carpeta; si algo falló, además «Subida fallida ·
//      Nombre · contacto». Confirmación al cliente si dejó email.
// Sin Drive (mode "blob"), los archivos se descargan de Blob, van adjuntos
// al correo a Elena y se borran de Blob.
//
// `notify: false` (calculadora): solo pasos 1 y 2; el aviso lo manda
// /api/quote con su formato de siempre y el enlace a la carpeta.
// Un mismo envío no avisa dos veces (doble clic, reintento): huella en Blob.
import { NextResponse } from "next/server";
import { get, del } from "@vercel/blob";
import { folderUrl, getFile, uploadStatus, writeNote } from "../../../lib/googleDrive";
import { resendConfig, sendResendEmail } from "../../../lib/resend";
import { notifyCrm } from "../../../lib/crm";
import { attributionOf, madridParts } from "../../../lib/waNotice";
import { blobExists, putJson, shortHash } from "../../../lib/contactLog";
import { blobUrlOk, groupBySize, readBlob } from "../../../lib/docBlob";
import {
  EMAIL_RE,
  LIMITS,
  TEST_REF,
  clean,
  cleanFileName,
  cleanMultiline,
  isProduction,
  sign,
  verify,
} from "../../../lib/docSubmission";
import {
  clientSubject,
  clientText,
  failedSubject,
  failedText,
  noteText,
  receivedSubject,
  receivedText,
} from "../../../lib/docNotice";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const EMAIL_MAX_BYTES = 25 * 1024 * 1024;
const REASONS = new Set(["network", "server", "size", "type", "empty", "count", "expired"]);

const json = (body, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

function fileItems(raw, max) {
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, max * 2).map((f) => ({
    name: cleanFileName(f && f.name),
    size: Math.max(0, Number(f && f.size) || 0),
    pages: Math.max(0, Math.min(5000, parseInt(f && f.pages, 10) || 0)) || null,
    status: f && f.status === "ok" ? "ok" : "failed",
    reason: REASONS.has(f && f.reason) ? f.reason : "network",
    fileToken: String((f && f.fileToken) || ""),
    driveId: clean(f && f.driveId, 200),
    blobUrl: String((f && f.blobUrl) || ""),
  }));
}

// ¿Está el archivo en Drive, en la carpeta del envío y completo?
async function verifyDrive(item, s) {
  try {
    let id = item.driveId;
    if (!id && item.fileToken) {
      const f = verify(item.fileToken, "f");
      if (f && f.ref === s.ref && f.folderId === s.folderId) {
        const st = await uploadStatus(f.url, f.size);
        if (st.done && st.file) id = st.file.id;
      }
    }
    if (!id) return false;
    const file = await getFile(id);
    if (!file || file.trashed) return false;
    if (!Array.isArray(file.parents) || !file.parents.includes(s.folderId)) return false;
    if (item.size && Number(file.size) !== item.size) return false;
    return true;
  } catch (err) {
    console.error("[documentos/finish] verify", err?.message);
    return false;
  }
}

function madridWhen(date = new Date()) {
  const p = madridParts(date);
  return `${p.day}/${p.month}/${p.year} ${p.hour}:${p.minute}`;
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "bad-request" }, 400);
  }
  const s = verify(body.token, "s");
  if (!s) return json({ ok: false, error: "expired" }, 401);
  const limits = LIMITS[s.mode] || LIMITS.blob;

  const name = clean(body.name, 120);
  const emailRaw = clean(body.email, 160);
  const email = EMAIL_RE.test(emailRaw) ? emailRaw : "";
  const phone = clean(body.phone, 40);
  const tramite = clean(body.tramite, 120);
  const comment = cleanMultiline(body.comment, 2000);
  const page = clean(body.page, 200).replace(/[?#].*$/, "");
  const attribution = attributionOf(body.attribution && typeof body.attribution === "object" ? body.attribution : null);
  const notify = body.notify !== false;
  const items = fileItems(body.files, limits.maxFiles);

  // 1. Comprobación.
  const received = [];
  const failed = [];
  const blobItems = [];
  await Promise.all(
    items.map(async (it) => {
      if (it.status !== "ok") {
        failed.push(it);
        return;
      }
      if (s.mode === "drive") {
        if (await verifyDrive(it, s)) received.push(it);
        else failed.push({ ...it, reason: "not-verified" });
      } else if (blobUrlOk(it.blobUrl, s.ref)) {
        blobItems.push(it);
      } else {
        failed.push({ ...it, reason: "not-verified" });
      }
    })
  );
  const order = items.map((i) => i.name);
  const byOrder = (a, b) => order.indexOf(a.name) - order.indexOf(b.name);

  // Sin Drive: descarga de Blob para adjuntar, con tope TOTAL comprobado
  // aquí (no solo en el navegador): lo que pase del tope no se descarga.
  const attachments = [];
  if (blobItems.length) {
    let total = 0;
    const cap = limits.maxTotal || limits.maxBytes;
    const accepted = [];
    for (const it of blobItems) {
      if (total + it.size > cap || it.size > limits.maxBytes) failed.push({ ...it, reason: "size" });
      else {
        total += it.size;
        accepted.push(it);
      }
    }
    await Promise.all(
      accepted.map(async (it) => {
        try {
          const buf = await readBlob(get, it.blobUrl, limits.maxBytes);
          attachments.push({ it, bytes: buf.length, content: buf.toString("base64") });
          received.push({ ...it, size: buf.length });
        } catch (err) {
          console.error("[documentos/finish] blob", err?.message);
          failed.push({ ...it, reason: "server" });
        }
      })
    );
  }
  received.sort(byOrder);
  failed.sort(byOrder);
  attachments.sort((a, b) => byOrder(a.it, b.it));

  const folderLink = s.mode === "drive" && s.folderId ? folderUrl(s.folderId) : "";
  const data = {
    ref: s.ref,
    name,
    email,
    phone,
    tramite,
    comment,
    attribution,
    page,
    locale: s.locale,
    received,
    failed,
    folderUrl: folderLink,
    appended: Boolean(s.appended),
    when: madridWhen(),
  };

  // 2. Nota en la carpeta (no bloquea el envío si falla).
  if (s.mode === "drive" && s.folderId) {
    try {
      await writeNote(s.folderId, noteText(data), s.ref);
    } catch (err) {
      console.error("[documentos/finish] note", err?.message);
    }
  }

  const receivedList = received.map((f) => ({ name: f.name, size: f.size, pages: f.pages }));
  const result = {
    ok: true,
    ref: s.ref,
    mode: s.mode,
    received: receivedList,
    failed: failed.map((f) => ({ name: f.name, reason: f.reason })),
    // Justificante firmado de lo COMPROBADO en Drive: /api/quote solo
    // lista en su aviso los archivos que vienen aquí.
    receipt:
      s.mode === "drive"
        ? sign({ k: "r", ref: s.ref, folderId: s.folderId, files: receivedList, exp: Date.now() + 24 * 3600 * 1000 })
        : "",
  };
  if (!notify) return json(result);

  // 3. Avisos. Huella para no avisar dos veces del mismo envío.
  const print = shortHash(
    `${s.sid}|${received.map((f) => `${f.name}:${f.size}`).join(",")}|${failed.map((f) => f.name).join(",")}`,
    24
  );
  // La huella se escribe DESPUÉS de que salga el correo: si el correo falla
  // y el navegador reintenta, el reintento vuelve a intentar el envío.
  const printPath = `avisos/documentos/${print}.json`;
  if ((await blobExists(printPath)) === true) {
    return json({ ...result, duplicate: true });
  }

  const test = !isProduction();
  // Prueba en producción con JX-TEST: sin avisos (no hay avisos falsos).
  const silent = isProduction() && s.ref === TEST_REF;
  const mail = resendConfig();
  let emailed = false;
  const sentAttachments = []; // solo estos se pueden borrar de Blob
  if (mail && !silent) {
    const groups = groupBySize(attachments, EMAIL_MAX_BYTES);
    const subject = receivedSubject({ name, count: received.length, ref: s.ref, test });
    const text = receivedText(data);
    const toAtt = (a) => ({ filename: a.it.name, content: a.content });
    if (received.length || !failed.length) {
      emailed = await sendResendEmail({
        ...mail,
        replyTo: email || "",
        subject,
        text,
        attachments: (groups[0] || []).map(toAtt),
      });
      if (emailed) sentAttachments.push(...(groups[0] || []));
      for (let i = 1; i < groups.length; i++) {
        const ok = await sendResendEmail({
          ...mail,
          replyTo: email || "",
          subject: `${subject} · archivos (${i}/${groups.length - 1})`,
          text: `Más archivos del envío ${s.ref}:\n${groups[i].map((a) => `• ${a.it.name}`).join("\n")}`,
          attachments: groups[i].map(toAtt),
        });
        if (ok) sentAttachments.push(...groups[i]);
      }
    }
    // Sin rastro no hay diagnóstico: cada fallo de correo queda en los logs.
    if (!emailed && (received.length || !failed.length)) console.error("[documentos/finish] email a Elena falló", s.ref);
    if (failed.length) {
      console.error("[documentos/finish] archivos que no llegaron", s.ref, failed.map((f) => f.reason).join(","));
      await sendResendEmail({
        ...mail,
        replyTo: email || "",
        subject: failedSubject({ name, email, phone, test }),
        text: failedText(data),
      });
    }
    if (email && received.length) {
      await sendResendEmail({
        from: mail.from,
        apiKey: mail.apiKey,
        to: email,
        replyTo: mail.to,
        subject: clientSubject(s.locale, s.ref),
        text: clientText(data),
      });
    }
  }
  if (!silent && !test) {
    await notifyCrm({
      origen: "web",
      subject: receivedSubject({ name, count: received.length, ref: s.ref }),
      mensaje_cliente: `Documentos enviados desde juradaexpress.es\n\n${receivedText(data)}`,
      nombre: name,
      email,
      telefono: phone,
      adjuntos: received.map((f) => f.name),
    });
  }

  // Sin Drive: se borran de Blob SOLO los archivos cuyo correo ha salido
  // (en una prueba silenciosa, todos). Los demás los limpia
  // /api/documentos/cleanup al día siguiente.
  const toDelete = silent ? attachments : sentAttachments;
  if (toDelete.length) {
    try {
      await del(toDelete.map((a) => a.it.blobUrl));
    } catch (err) {
      console.error("[documentos/finish] del", err?.message);
    }
  }
  if (s.mode === "blob" && attachments.length && sentAttachments.length < attachments.length && !silent) {
    // Algún archivo no ha llegado a ningún sitio útil: sin huella, para que
    // el reintento del navegador vuelva a intentarlo.
    return json({ ...result, ok: false, error: "email-failed" }, 502);
  }
  if (emailed || silent || !mail) await putJson(printPath, { at: new Date().toISOString() });
  return json({ ...result, emailed });
}
