import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

let adminCookie: string;
let studentCookie: string;

beforeAll(async () => {
  await setupDb();
  adminCookie = (await createTestSession("admin@cea.ng")).cookie;
  studentCookie = (await createTestSession("student@cea.ng")).cookie;
});

describe("GET /v1/flags", () => {
  it("returns the flag defaults when no overrides exist", async () => {
    const res = await api("/v1/flags");
    expect(res.status).toBe(200);
    const body = (await res.json()) as Record<string, boolean>;
    expect(body["onboarding.tours"]).toBe(true);
    expect(body["ai.grading"]).toBe(false);
    expect(body["payments.paystack"]).toBe(false);
    expect(body["pwa.push"]).toBe(false);
  });
});

describe("KV-backed flag overrides", () => {
  it("persists an admin override and merges it into GET", async () => {
    const put = await api("/v1/flags/ai.grading", {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...cookieHeaders(adminCookie) },
      body: JSON.stringify({ enabled: true }),
    });
    expect(put.status).toBe(200);

    const get = (await (await api("/v1/flags")).json()) as Record<string, boolean>;
    expect(get["ai.grading"]).toBe(true);
    expect(get["ai.recommendations"]).toBe(false);

    const del = await api("/v1/flags/ai.grading", {
      method: "DELETE",
      headers: cookieHeaders(adminCookie),
    });
    expect(del.status).toBe(200);
    const after = (await (await api("/v1/flags")).json()) as Record<string, boolean>;
    expect(after["ai.grading"]).toBe(false);
  });

  it("rejects non-admin override writes with 403", async () => {
    const res = await api("/v1/flags/ai.grading", {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...cookieHeaders(studentCookie) },
      body: JSON.stringify({ enabled: true }),
    });
    expect(res.status).toBe(403);
  });

  it("rejects unknown flag keys and invalid payloads", async () => {
    const unknown = await api("/v1/flags/not.a.flag", {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...cookieHeaders(adminCookie) },
      body: JSON.stringify({ enabled: true }),
    });
    expect(unknown.status).toBe(404);

    const invalid = await api("/v1/flags/ai.grading", {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...cookieHeaders(adminCookie) },
      body: JSON.stringify({ enabled: "yes" }),
    });
    expect(invalid.status).toBe(400);
  });
});
