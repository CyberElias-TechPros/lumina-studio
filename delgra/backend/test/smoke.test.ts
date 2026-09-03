import { describe, expect, it, beforeAll } from "vitest";
import { migrate, reset, registerOwner, authed, body } from "./helpers.ts";

describe("harness smoke", () => {
  beforeAll(async () => {
    await migrate();
    await reset();
  });

  it("applies the schema and reports a healthy database", async () => {
    const res = await authed("", "/v1/health");
    expect(res.status).toBe(200);
    const payload = await body<{ tables: number; database: string }>(res);
    expect(payload.database).toBe("connected");
    // 17 domain tables + sqlite internals.
    expect(payload.tables).toBeGreaterThanOrEqual(17);
  });

  it("registers an owner and returns a session", async () => {
    const cookie = await registerOwner({ email: "smoke@delgra.test" });
    expect(cookie).toContain("tf_session=");

    const me = await authed(cookie, "/v1/auth/session");
    expect(me.status).toBe(200);
    const payload = await body<{ user: { role: string; email: string } }>(me);
    expect(payload.user.role).toBe("owner");
    expect(payload.user.email).toBe("smoke@delgra.test");
  });
});
