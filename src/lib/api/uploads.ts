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
): Promise<UploadedObject> {
  if (env.apiUrl.length === 0) {
    return apiFetch<UploadedObject>(`/v1/uploads/${key}`, {
      method: "PUT",
      headers: { "Content-Type": contentType },
      body,
    });
  }
  const response = await fetch(`${env.apiUrl}/v1/uploads/${key}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": contentType },
    body,
  });
  if (!response.ok) {
    const payload = (await response.json().catch(() => undefined)) as {
      error?: { message?: string };
    };
    throw new Error(payload?.error?.message ?? `Upload failed with status ${response.status}.`);
  }
  return (await response.json()) as UploadedObject;
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
  const { key, contentType } = await presignUpload(file.name, file.type);
  return uploadToWorker(key, file, contentType || "application/octet-stream");
}
