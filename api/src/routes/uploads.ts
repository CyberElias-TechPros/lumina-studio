import { Hono } from "hono";
import type { AppEnv } from "../types";
import { requireAuth } from "../lib/auth";
import { ApiError } from "../lib/errors";

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

function safeExt(filename: string): string {
  const match = /\.([a-zA-Z0-9]{1,12})$/.exec(filename.trim());
  const ext = match?.[1];
  return ext ? `.${ext.toLowerCase()}` : "";
}

uploads.post("/presign", async (c) => {
  const input = (await c.req.json().catch(() => ({}))) as {
    filename?: string;
    contentType?: string;
  };
  const filename = (input.filename ?? "").trim();
  if (filename.length === 0) {
    throw ApiError.validation({ filename: ["Filename is required."] });
  }
  const contentType = (input.contentType ?? "application/octet-stream").trim();
  const user = c.get("authUser");
  const key = `${user.id}/${crypto.randomUUID()}${safeExt(filename)}`;

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
    contentType,
  };
  return c.json(result, 201);
});

uploads.put("/:key{.*}", async (c) => {
  const key = c.req.param("key");
  const contentType = c.req.header("content-type") ?? "application/octet-stream";
  const object = await c.env.UPLOADS.put(key, c.req.raw.body ?? "", {
    httpMetadata: { contentType },
  });
  return c.json({ ok: true, key: object.key, size: object.size }, 201);
});

uploads.get("/:key{.*}", async (c) => {
  const key = c.req.param("key");
  const object = await c.env.UPLOADS.get(key);
  if (!object) throw ApiError.notFound("Object not found.");
  return new Response(object.body, {
    headers: {
      "content-type": object.httpMetadata?.contentType ?? "application/octet-stream",
      "content-length": String(object.size),
      "cache-control": "private, max-age=3600",
    },
  });
});

uploads.delete("/:key{.*}", async (c) => {
  const key = c.req.param("key");
  await c.env.UPLOADS.delete(key);
  return c.json({ ok: true, key });
});
