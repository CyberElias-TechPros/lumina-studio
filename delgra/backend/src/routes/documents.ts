import { Hono } from "hono";
import { clientIp, requireCap } from "../lib/auth.ts";
import { AppError } from "../lib/errors.ts";
import { isoNow, newId } from "../lib/ids.ts";
import { writeAudit } from "../lib/audit.ts";
import { checkRateLimit } from "../lib/rate-limit.ts";
import type { Env, SessionUser } from "../lib/env.ts";

type AppEnv = { Bindings: Env; Variables: { user: SessionUser; requestId: string } };

const documents = new Hono<AppEnv>();

/**
 * Attachments in R2 — proof of delivery, signed waybills, supplier quotes, the
 * business logo. Never stored in D1: a database of binaries would blow the
 * 10 GB limit and make every backup painful.
 */

const ENTITY_TYPES = ["invoice", "waybill", "purchase", "expense", "product", "business"] as const;
type EntityType = (typeof ENTITY_TYPES)[number];

const ALLOWED_TYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "text/csv": "csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};

documents.get("/", requireCap("read:documents"), async (c) => {
  const entityType = c.req.query("entityType") ?? "";
  const entityId = c.req.query("entityId") ?? "";
  if (!entityId) throw AppError.validation("entityId is required.", { entityId: "Required." });
  if (!(ENTITY_TYPES as readonly string[]).includes(entityType)) {
    throw AppError.validation("Unknown entity type.", { entityType: "Invalid." });
  }

  const rows = await c.env.DB.prepare(
    `SELECT d.id, d.entity_type, d.entity_id, d.filename, d.content_type, d.size_bytes,
            d.created_at, u.name AS uploaded_by_name
       FROM documents d LEFT JOIN users u ON u.id = d.uploaded_by
      WHERE d.entity_type = ? AND d.entity_id = ?
      ORDER BY d.created_at DESC`,
  )
    .bind(entityType, entityId)
    .all<Record<string, unknown>>();

  return c.json({
    data: rows.results.map((r) => ({
      id: r.id,
      entityType: r.entity_type,
      entityId: r.entity_id,
      filename: r.filename,
      contentType: r.content_type,
      sizeBytes: r.size_bytes,
      createdAt: r.created_at,
      uploadedByName: r.uploaded_by_name,
    })),
  });
});

documents.post("/", requireCap("write:documents"), async (c) => {
  const user = c.get("user");
  const maxBytes = Number(c.env.MAX_UPLOAD_BYTES ?? 10 * 1024 * 1024);

  const rl = await checkRateLimit(c.env, "upload", user.id);
  if (!rl.allowed) throw AppError.rateLimited(rl.resetSeconds);

  const form = await c.req.formData().catch(() => {
    throw AppError.validation("Expected a multipart/form-data upload.");
  });

  const file = form.get("file");
  if (!(file instanceof File)) throw AppError.validation("No file was provided.", { file: "Required." });

  const entityType = String(form.get("entityType") ?? "");
  const entityId = String(form.get("entityId") ?? "");
  if (!(ENTITY_TYPES as readonly string[]).includes(entityType)) {
    throw AppError.validation("Unknown entity type.", { entityType: "Invalid." });
  }
  if (!entityId || entityId.length > 64) throw AppError.validation("entityId is required.", { entityId: "Required." });

  // MIME is validated against an allowlist and mapped to an extension we choose,
  // so a client cannot upload `shell.html` claiming to be an image.
  const contentType = file.type.toLowerCase();
  const ext = ALLOWED_TYPES[contentType];
  if (!ext) {
    throw new AppError(
      "unsupported_media_type",
      `Unsupported file type "${contentType || "unknown"}". Allowed: PDF, PNG, JPEG, WebP, CSV, XLSX, DOC, DOCX.`,
    );
  }
  if (file.size === 0) throw AppError.validation("The file is empty.", { file: "Empty." });
  if (file.size > maxBytes) {
    throw new AppError("payload_too_large", `Files must be under ${Math.round(maxBytes / 1024 / 1024)} MB.`);
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const safeName = (file.name || `document.${ext}`)
    .replace(/[^\w.\- ]/g, "")
    .trim()
    .slice(0, 120) || `document.${ext}`;

  const id = newId();
  // Object keys are server-generated and unguessable; the client filename is
  // metadata only and never forms part of the storage path (no path traversal).
  const storedKey = `${entityType}/${entityId}/${id}.${ext}`;

  await c.env.UPLOADS.put(storedKey, bytes, {
    httpMetadata: { contentType },
    customMetadata: { uploadedBy: user.id, originalName: safeName },
  });

  await c.env.DB.prepare(
    `INSERT INTO documents (id, entity_type, entity_id, filename, stored_key, content_type, size_bytes, uploaded_by, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(id, entityType, entityId, safeName, storedKey, contentType, bytes.byteLength, user.id, isoNow())
    .run();

  await writeAudit(c.env, {
    actor: user,
    action: "document.upload",
    entityType,
    entityId,
    summary: `${safeName} (${bytes.byteLength} bytes)`,
    ip: clientIp(c),
  });

  return c.json({ id, filename: safeName, sizeBytes: bytes.byteLength }, 201);
});

documents.get("/:id/download", requireCap("read:documents"), async (c) => {
  const row = await c.env.DB.prepare(
    `SELECT id, filename, stored_key, content_type FROM documents WHERE id = ?`,
  )
    .bind(c.req.param("id"))
    .first<{ id: string; filename: string; stored_key: string; content_type: string }>();
  if (!row) throw AppError.notFound("Document");

  const object = await c.env.UPLOADS.get(row.stored_key);
  if (!object) throw AppError.notFound("Stored file");

  c.header("content-type", row.content_type);
  // `attachment` rather than `inline`: an uploaded file is untrusted content and
  // must never be rendered as a page in our origin.
  c.header("content-disposition", `attachment; filename="${row.filename.replace(/"/g, "")}"`);
  c.header("x-content-type-options", "nosniff");
  c.header("content-security-policy", "default-src 'none'; sandbox");
  c.header("cache-control", "private, max-age=300");
  return c.body(await object.arrayBuffer());
});

documents.delete("/:id", requireCap("write:documents"), async (c) => {
  const id = c.req.param("id");
  const row = await c.env.DB.prepare(
    `SELECT id, stored_key, filename, entity_type, entity_id FROM documents WHERE id = ?`,
  )
    .bind(id)
    .first<{ id: string; stored_key: string; filename: string; entity_type: string; entity_id: string }>();
  if (!row) throw AppError.notFound("Document");

  // Delete the object first: if that fails we keep the row and can retry, rather
  // than orphaning bytes in R2 with no record pointing at them.
  await c.env.UPLOADS.delete(row.stored_key);
  await c.env.DB.prepare(`DELETE FROM documents WHERE id = ?`).bind(id).run();

  await writeAudit(c.env, {
    actor: c.get("user"),
    action: "document.delete",
    entityType: row.entity_type,
    entityId: row.entity_id,
    summary: row.filename,
    ip: clientIp(c),
  });
  return c.json({ ok: true });
});

export default documents;
