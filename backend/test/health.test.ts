import { beforeAll, describe, expect, it } from "vitest";
import { api, setupDb } from "./helpers";

beforeAll(async () => {
  await setupDb();
});

describe("GET /v1/health", () => {
  it("reports the worker and DB as healthy without auth", async () => {
    const res = await api("/v1/health");
    expect(res.status).toBe(200);
    const body = (await res.json()) as { ok: boolean; time: string; db: string };
    expect(body.ok).toBe(true);
    expect(body.db).toBe("ok");
    expect(Number.isNaN(Date.parse(body.time))).toBe(false);
  });
});
