import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

let student: TestSession;

beforeAll(async () => {
  await setupDb();
  student = await createTestSession("student@cea.ng");
});

describe("R2 uploads", () => {
  it("issues a presigned upload target (mock proxy mode)", async () => {
    const res = await api("/v1/uploads/presign", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ filename: "assignment.pdf", contentType: "application/pdf" }),
    });
    expect(res.status).toBe(201);
    const body = (await res.json()) as {
      key: string;
      uploadUrl: string;
      method: string;
      expiresIn: number;
      mock: boolean;
      contentType: string;
    };
    expect(body.key).toMatch(/^[^/]+\/.+\.pdf$/);
    expect(body.method).toBe("PUT");
    expect(body.mock).toBe(true);
    expect(body.uploadUrl).toContain("/v1/uploads/");
  });

  it("rejects presign without a filename", async () => {
    const res = await api("/v1/uploads/presign", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ filename: " " }),
    });
    expect(res.status).toBe(400);
  });

  it("uploads, downloads and deletes an object", async () => {
    const presign = await api("/v1/uploads/presign", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ filename: "notes.md" }),
    });
    const { key } = (await presign.json()) as { key: string };

    const upload = await api(`/v1/uploads/${key}`, {
      method: "PUT",
      headers: { "Content-Type": "text/markdown", ...cookieHeaders(student.cookie) },
      body: "hello from r2",
    });
    expect(upload.status).toBe(201);
    const uploaded = (await upload.json()) as { ok: boolean; size: number };
    expect(uploaded).toMatchObject({ ok: true, size: 13 });

    const download = await api(`/v1/uploads/${key}`, {
      headers: cookieHeaders(student.cookie),
    });
    expect(download.status).toBe(200);
    expect(download.headers.get("content-type")).toBe("text/markdown");
    expect(await download.text()).toBe("hello from r2");

    const deleted = await api(`/v1/uploads/${key}`, {
      method: "DELETE",
      headers: cookieHeaders(student.cookie),
    });
    expect(deleted.status).toBe(200);

    const gone = await api(`/v1/uploads/${key}`, {
      headers: cookieHeaders(student.cookie),
    });
    expect(gone.status).toBe(404);
  });

  it("requires auth everywhere", async () => {
    const authChecks = [
      ["POST", "/v1/uploads/presign", { body: "" }],
      ["PUT", "/v1/uploads/x/y.txt", { body: "" }],
      ["GET", "/v1/uploads/x/y.txt", {}],
    ] as const;
    for (const [method, path, init] of authChecks) {
      const res = await api(path, { method, ...init });
      expect(res.status, `${method} ${path}`).toBe(401);
    }
  });
});
