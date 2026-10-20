import { beforeAll, describe, expect, it } from "vitest";
import { api, setupDb } from "./helpers";

beforeAll(async () => {
  await setupDb();
});

describe("GET /v1/health", () => {
  it("reports the worker and DB as healthy without auth", async () => {
    const res = await api("/v1/health");
    expect(res.status).toBe(200);
    const body = (await res.json()) as { ok: boolean; time: string; db: string; revision: string };
    expect(body.ok).toBe(true);
    expect(body.db).toBe("ok");
    expect(typeof body.revision).toBe("string");
    expect(Number.isNaN(Date.parse(body.time))).toBe(false);
  });
});
