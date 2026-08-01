import { beforeAll, describe, expect, it } from "vitest";
import { api, createTestSession, setupDb } from "./helpers";

beforeAll(async () => {
  await setupDb();
});

describe("certificates (issue / verify / mine / candidates)", () => {
  it("blocks issuance to unauthenticated callers", async () => {
    const res = await api("/v1/certificates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "x", courseSlug: "y", title: "z" }),
    });
    expect(res.status).toBe(401);
  });

  it("blocks candidates listing for students", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/certificates/candidates", {
      headers: { Cookie: `cea_session=${cookie}` },
    });
    expect(res.status).toBe(403);
  });

  it("lists active users for instructors", async () => {
    const { cookie } = await createTestSession("instructor@cea.ng");
    const res = await api("/v1/certificates/candidates", {
      headers: { Cookie: `cea_session=${cookie}` },
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: { email: string }[]; total: number };
    expect(body.items.some((u) => u.email === "student@cea.ng")).toBe(true);
  });

  it("issues a certificate with a code and verifies it", async () => {
    const { cookie } = await createTestSession("admin@cea.ng");
    const issued = await api("/v1/certificates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `cea_session=${cookie}`,
      },
      body: JSON.stringify({
        userId: "00000000-0000-4000-8000-000000000001",
        courseSlug: "full-stack",
        title: "Full-Stack Software Development",
      }),
    });
    expect(issued.status).toBe(201);
    const cert = (await issued.json()) as { code: string; title: string };
    expect(cert.code).toMatch(/^CEA-[A-F0-9]{8}-[A-F0-9]{8}$/);

    const verified = await api(`/v1/certificates/verify?code=${cert.code}`);
    expect(verified.status).toBe(200);
    const body = (await verified.json()) as { valid: boolean; certificate: { title: string } };
    expect(body.valid).toBe(true);
    expect(body.certificate.title).toBe("Full-Stack Software Development");
  });

  it("refuses a duplicate certificate for the same user + course", async () => {
    const { cookie } = await createTestSession("admin@cea.ng");
    const res = await api("/v1/certificates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `cea_session=${cookie}`,
      },
      body: JSON.stringify({
        userId: "00000000-0000-4000-8000-000000000001",
        courseSlug: "full-stack",
        title: "Full-Stack Software Development",
      }),
    });
    expect(res.status).toBe(409);
  });

  it("returns the owner's certificates on /mine", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/certificates/mine", {
      headers: { Cookie: `cea_session=${cookie}` },
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: { courseSlug: string }[]; total: number };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items.some((c) => c.courseSlug === "full-stack")).toBe(true);
  });
});
