import { beforeAll, describe, expect, it } from "vitest";
import { api, setupDb } from "./helpers";

beforeAll(async () => {
  await setupDb();
});

describe("GET /v1/flags", () => {
  it("returns the Phase 1 flag defaults", async () => {
    const res = await api("/v1/flags");
    expect(res.status).toBe(200);
    const body = (await res.json()) as Record<string, boolean>;
    expect(body["onboarding.tours"]).toBe(true);
    expect(body["ai.grading"]).toBe(false);
    expect(body["payments.stripe"]).toBe(false);
  });
});
