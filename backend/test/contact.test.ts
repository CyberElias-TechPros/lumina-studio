import { beforeAll, describe, expect, it } from "vitest";
import { api, setupDb } from "./helpers";

beforeAll(async () => {
  await setupDb();
});

describe("POST /v1/contact (public lead capture)", () => {
  it("accepts a contact message without auth", async () => {
    const res = await api("/v1/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Ada Obi",
        email: "ada@cea.ng",
        message: "Tell me more about the data cohort.",
      }),
    });
    expect(res.status).toBe(201);
    const body = (await res.json()) as { ok: boolean; kind: string };
    expect(body.ok).toBe(true);
    expect(body.kind).toBe("contact");
  });

  it("accepts a newsletter subscription", async () => {
    const res = await api("/v1/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Newsletter Fan",
        email: "fan@cea.ng",
        message: "subscribe",
        kind: "newsletter",
      }),
    });
    expect(res.status).toBe(201);
    const body = (await res.json()) as { kind: string };
    expect(body.kind).toBe("newsletter");
  });

  it("rejects invalid payloads with field errors", async () => {
    const res = await api("/v1/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "", email: "not-an-email", message: "" }),
    });
    expect(res.status).toBe(400);
    const body = (await res.json()) as { error: { code: string; fieldErrors: unknown } };
    expect(body.error.code).toBe("FIELD_VALIDATION");
    expect(body.error.fieldErrors).toBeDefined();
  });
});
