import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

beforeAll(async () => {
  await setupDb();
});

describe("POST /v1/admin-systems-dashboard/backups/:id/restore", () => {
  it("queues a verified backup restore and is idempotent while queued", async () => {
    const { cookie } = await createTestSession("admin@cea.ng");
    const path = "/v1/admin-systems-dashboard/backups/adm-bk-01/restore";
    const first = await api(path, {
      method: "POST",
      headers: { ...cookieHeaders(cookie), "Content-Type": "application/json" },
    });
    expect(first.status).toBe(202);
    expect(await first.json()).toMatchObject({
      ok: true,
      alreadyQueued: false,
      backup: "Production · nightly",
      status: "queued",
    });

    const repeat = await api(path, {
      method: "POST",
      headers: { ...cookieHeaders(cookie), "Content-Type": "application/json" },
    });
    expect(repeat.status).toBe(200);
    expect(await repeat.json()).toMatchObject({ ok: true, alreadyQueued: true, status: "queued" });
  });

  it("enforces administrator access and backup state", async () => {
    const student = await createTestSession("student@cea.ng");
    const denied = await api("/v1/admin-systems-dashboard/backups/adm-bk-01/restore", {
      method: "POST",
      headers: { ...cookieHeaders(student.cookie), "Content-Type": "application/json" },
    });
    expect(denied.status).toBe(403);

    const { cookie } = await createTestSession("admin@cea.ng");
    const missing = await api("/v1/admin-systems-dashboard/backups/missing/restore", {
      method: "POST",
      headers: { ...cookieHeaders(cookie), "Content-Type": "application/json" },
    });
    expect(missing.status).toBe(404);
  });
});
