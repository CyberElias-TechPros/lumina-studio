import { Hono } from "hono";
import type { AppEnv } from "../types";
import { z } from "zod";
import { requireAuth } from "../lib/auth";
import { ApiError } from "../lib/errors";
import { parseBody } from "../lib/validate";

/**
 * R2-backed uploads.
 * - POST /presign hands out an object key plus an upload URL: a native R2
 *   presigned URL when UPLOADS_PRESIGN_URL + runtime support exist, otherwise
 *   the authenticated worker proxy (PUT /v1/uploads/:key) - mock mode, same
 *   philosophy as payments.
 * - PUT/GET/DELETE /:key stream through the worker with a valid session.
 */

export interface ApiPresignedUpload {
  key: string;
  uploadUrl: string;
  method: "PUT";
  expiresIn: number;
  mock: boolean;
  contentType: string;
}

interface R2WithPresign extends R2Bucket {
  createPresignedUrl?: (url: string, options: { method: string }) => Promise<string>;
}

export const uploads = new Hono<{ Bindings: AppEnv }>();

uploads.use("*", requireAuth);

/** Uploads are scoped to /:userId/... so a session can only touch its own objects. */
function ownsKey(key: string, user: { id: string }): boolean {
  return key.startsWith(`${user.id}/`);
}

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

const ALLOWED_TYPES: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/webp": ".webp",
  "image/svg+xml": ".svg",
  "application/pdf": ".pdf",
  "text/plain": ".txt",
  "application/zip": ".zip",
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
};

const presignSchema = z.object({
  filename: z.string().trim().min(1, "Filename is required.").max(200),
  contentType: z.string().trim().max(100).optional(),
});

uploads.post("/presign", async (c) => {
  const input = await parseBody(c, presignSchema);
  const filename = input.filename;
  const user = c.get("authUser");
  const requestedType = (input.contentType ?? "application/octet-stream").trim();
  const expectedExt = ALLOWED_TYPES[requestedType];
  if (!expectedExt) {
    throw ApiError.validation({
      contentType: [
        "This file type is not allowed. Use PNG, JPG, WebP, SVG, PDF, TXT, ZIP, DOC or DOCX.",
      ],
    });
  }
  // Derive the stored suffix from the validated MIME type rather than the
  // user-controlled filename. This keeps object names consistent and avoids
  // giving a file an executable-looking extension after content validation.
  const key = `${user.id}/${crypto.randomUUID()}${expectedExt}`;

  const bucket = c.env.UPLOADS as R2WithPresign;
  let uploadUrl = `/v1/uploads/${key}`;
  let mock = true;
  if (c.env.UPLOADS_PRESIGN_URL && typeof bucket.createPresignedUrl === "function") {
    try {
      uploadUrl = await bucket.createPresignedUrl(
        `${c.env.UPLOADS_PRESIGN_URL.replace(/\/$/, "")}/${key}`,
        { method: "PUT" },
      );
      mock = false;
    } catch {
      /* fall back to the worker proxy below */
    }
  }

  const result: ApiPresignedUpload = {
    key,
    uploadUrl,
    method: "PUT",
    expiresIn: 3600,
    mock,
    contentType: requestedType,
  };
  return c.json(result, 201);
});

async function readUploadBody(request: Request): Promise<ArrayBuffer> {
  if (!request.body) return new ArrayBuffer(0);
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;
      total += value.byteLength;
      if (total > MAX_UPLOAD_BYTES) {
        await reader.cancel("upload exceeds limit");
        throw new ApiError(413, "PAYLOAD_TOO_LARGE", "Upload exceeds the 10 MB limit.");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const result = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return result.buffer;
}

uploads.put("/:key{.*}", async (c) => {
  const key = c.req.param("key");
  if (!ownsKey(key, c.get("authUser"))) throw ApiError.forbidden();
  const contentType = c.req.header("content-type") ?? "application/octet-stream";
  if (!ALLOWED_TYPES[contentType]) {
    throw ApiError.validation({ contentType: ["This file type is not allowed."] });
  }
  const contentLengthHeader = c.req.header("content-length");
  if (contentLengthHeader !== undefined) {
    const contentLength = Number(contentLengthHeader);
    if (!Number.isSafeInteger(contentLength) || contentLength < 0) {
      throw ApiError.validation({
        "content-length": ["Content-Length must be a valid non-negative integer."],
      });
    }
    if (contentLength > MAX_UPLOAD_BYTES) {
      throw new ApiError(413, "PAYLOAD_TOO_LARGE", "Upload exceeds the 10 MB limit.");
    }
  }
  // Do not rely only on Content-Length: chunked requests can omit it.
  const body = await readUploadBody(c.req.raw);
  const object = await c.env.UPLOADS.put(key, body, {
    httpMetadata: { contentType },
  });
  return c.json({ ok: true, key: object.key, size: object.size }, 201);
});

uploads.get("/:key{.*}", async (c) => {
  const key = c.req.param("key");
  if (!ownsKey(key, c.get("authUser"))) throw ApiError.forbidden();
  const object = await c.env.UPLOADS.get(key);
  if (!object) throw ApiError.notFound("Object not found.");
  const contentType = object.httpMetadata?.contentType ?? "application/octet-stream";
  const filename = encodeURIComponent(key.split("/").pop() ?? "file");
  /**
   * Hardening for stored active content (§26): objects are served from the
   * API origin where browsers attach SameSite=None session cookies, and an
   * SVG opened as a document runs embedded script in that origin — which can
   * then call /v1/* as the owner. SVG (the only scriptable type in the
   * allowlist) is therefore forced to `attachment` and given a sandboxed CSP
   * for the rare browser that renders it anyway. Images, PDFs and text keep
   * inline preview behavior; embedded <img> rendering ignores
   * Content-Disposition, so avatars/logos continue to render as before.
   */
  const scriptable = contentType === "image/svg+xml" || contentType === "text/html";
  const headers = new Headers({
    "content-type": contentType,
    "content-length": String(object.size),
    "cache-control": "private, max-age=3600",
    "x-content-type-options": "nosniff",
    "content-disposition": `${scriptable ? "attachment" : "inline"}; filename="${filename}"`,
  });
  if (scriptable) headers.set("content-security-policy", "sandbox");
  return new Response(object.body, { headers });
});

uploads.delete("/:key{.*}", async (c) => {
  const key = c.req.param("key");
  if (!ownsKey(key, c.get("authUser"))) throw ApiError.forbidden();
  await c.env.UPLOADS.delete(key);
  return c.json({ ok: true, key });
});
