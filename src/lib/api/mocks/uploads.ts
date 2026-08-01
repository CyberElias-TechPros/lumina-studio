import { registerMock, registerMockPattern } from "@/lib/api/client";
import type { ApiRequestInit } from "@/lib/api/client";
import { ApiError } from "@/lib/errors";
import type { PresignedUpload } from "@/lib/api/uploads";

function delay(milliseconds = 120): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

const objects = new Map<string, { body: string; contentType: string }>();

const FILENAME_RE = /\.([a-zA-Z0-9]{1,12})$/;

export function registerUploadsMocks(): void {
  registerMock("POST", "/v1/uploads/presign", async (init: ApiRequestInit) => {
    await delay();
    const input = (init.body ?? {}) as { filename?: string; contentType?: string };
    const filename = (input.filename ?? "").trim();
    if (filename.length === 0) {
      throw new ApiError(400, "FIELD_VALIDATION", "Filename is required.", {
        filename: ["Filename is required."],
      });
    }
    const ext = FILENAME_RE.exec(filename)?.[1];
    const key = `uploads/${crypto.randomUUID()}${ext ? `.${ext.toLowerCase()}` : ""}`;
    const result: PresignedUpload = {
      key,
      uploadUrl: `/v1/uploads/${key}`,
      method: "PUT",
      expiresIn: 3600,
      mock: true,
      contentType: (input.contentType ?? "application/octet-stream").trim(),
    };
    return result;
  });

  registerMockPattern("PUT", "/v1/uploads/*", async (init: ApiRequestInit) => {
    await delay();
    const key = (init.path ?? "").replace("/v1/uploads/", "");
    const blob = init.body as Blob | undefined;
    const body = blob ? await blob.text() : "";
    const contentType =
      (init.headers as Record<string, string> | undefined)?.["Content-Type"] ??
      "application/octet-stream";
    objects.set(key, { body, contentType });
    return { ok: true, key, size: body.length };
  });

  registerMockPattern("GET", "/v1/uploads/*", async (init: ApiRequestInit) => {
    await delay();
    const key = (init.path ?? "").replace("/v1/uploads/", "");
    const object = objects.get(key);
    if (!object) throw new ApiError(404, "NOT_FOUND", "Object not found.");
    return { body: object.body, contentType: object.contentType };
  });

  registerMockPattern("DELETE", "/v1/uploads/*", async (init: ApiRequestInit) => {
    await delay();
    const key = (init.path ?? "").replace("/v1/uploads/", "");
    objects.delete(key);
    return { ok: true, key };
  });
}
