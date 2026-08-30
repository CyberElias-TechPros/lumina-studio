import { apiFetch } from "@/lib/api/client";
import { env } from "@/lib/env";

export interface PresignedUpload {
  key: string;
  uploadUrl: string;
  method: "PUT";
  expiresIn: number;
  mock: boolean;
  contentType: string;
}

export interface UploadedObject {
  key: string;
  size: number;
}

/** Ask the backend for an upload target. In mock mode this is a proxy URL. */
export function presignUpload(
  filename: string,
  contentType = "application/octet-stream",
): Promise<PresignedUpload> {
  return apiFetch<PresignedUpload>("/v1/uploads/presign", {
    method: "POST",
    body: { filename, contentType },
  });
}

/** Stream bytes to the worker proxy (used in mock mode and as the fallback path). */
export async function uploadToWorker(
  key: string,
  body: Blob,
  contentType: string,
  /** A native R2 presigned URL, or the worker proxy path returned by presign. */
  uploadUrl?: string,
): Promise<UploadedObject> {
  if (env.apiUrl.length === 0) {
    return apiFetch<UploadedObject>(`/v1/uploads/${key}`, {
      method: "PUT",
      headers: { "Content-Type": contentType },
      body,
    });
  }

  const target = uploadUrl ?? `/v1/uploads/${key}`;
  const url = target.startsWith("http")
    ? target
    : `${env.apiUrl}${target.startsWith("/") ? target : `/${target}`}`;
  const response = await fetch(url, {
    method: "PUT",
    // Native presigned R2 URLs authenticate through their signature. The
    // worker proxy instead uses the session cookie; sending credentials to a
    // third-party upload host would leak cookies.
    credentials: target.startsWith("http") ? "omit" : "include",
    headers: { "Content-Type": contentType },
    body,
  });
  if (!response.ok) {
    const payload = (await response.json().catch(() => undefined)) as {
      error?: { message?: string };
    };
    throw new Error(payload?.error?.message ?? `Upload failed with status ${response.status}.`);
  }

  // R2's native S3-compatible presigned PUT commonly returns an empty 200.
  const payload = (await response.json().catch(() => undefined)) as UploadedObject | undefined;
  return payload ?? { key, size: body.size };
}

/** Fetch an object's text content (used for previews/attachments). */
export async function fetchUploadedText(key: string): Promise<{
  body: string;
  contentType: string;
}> {
  if (env.apiUrl.length === 0) {
    return apiFetch<{ body: string; contentType: string }>(`/v1/uploads/${key}`);
  }
  const response = await fetch(`${env.apiUrl}/v1/uploads/${key}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`Download failed with status ${response.status}.`);
  }
  return {
    body: await response.text(),
    contentType: response.headers.get("content-type") ?? "application/octet-stream",
  };
}

/** Convenience: presign + upload in one call. Returns the object key. */
export async function uploadFile(file: File): Promise<UploadedObject> {
  const { key, uploadUrl, contentType } = await presignUpload(
    file.name,
    file.type || "application/octet-stream",
  );
  return uploadToWorker(key, file, contentType || "application/octet-stream", uploadUrl);
}
