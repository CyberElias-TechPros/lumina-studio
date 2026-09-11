import { describe, expect, it, beforeAll } from "vitest";
import { env } from "cloudflare:test";
import { call, migrate } from "./helpers.ts";

/**
 * `/v1/bootstrap` on an un-migrated database.
 *
 * `wrangler deploy` publishes code, never schema, and bootstrap is the first
 * database-backed route a visitor hits — the sign-in screen calls it before
 * any authentication. When the remote D1 has never had `0001_init.sql`
 * applied, the queries inside fail with "no such table", which used to
 * surface as an opaque 500 while the UI silently offered a login form that
 * could never succeed. The contract pinned here: that state answers 503 with
 * a code and a message naming the command that fixes it, and the route
 * returns to normal as soon as the schema exists.
 */

describe("bootstrap on an un-migrated database", () => {
  beforeAll(async () => {
    await migrate();
  });

  it("answers 503 service_unavailable naming the migration command", async () => {
    // Simulate `wrangler deploy` without `d1 migrations apply`: the schema is
    // absent, so the first query in the handler cannot even be prepared.
    await env.DB.prepare(`DROP TABLE users`).run();

    const res = await call("/v1/bootstrap");
    const body = (await res.json()) as { error: { code: string; message: string } };

    expect(res.status).toBe(503);
    expect(body.error.code).toBe("service_unavailable");
    expect(body.error.message).toContain("wrangler d1 migrations apply");
  });

  it("reports a healthy empty workspace once the schema is applied", async () => {
    // CREATE TABLE IF NOT EXISTS restores exactly what the previous test dropped.
    await migrate();

    const res = await call("/v1/bootstrap");
    const body = (await res.json()) as { needsOwner: boolean; signupOpen: boolean };

    expect(res.status).toBe(200);
    expect(body.needsOwner).toBe(true);
    expect(body.signupOpen).toBe(true);
  });

  it("reports an owned workspace after the first user registers", async () => {
    await migrate();

    const res = await call("/v1/auth/register", {
      method: "POST",
      body: {
        businessName: "DELGRA LTD",
        name: "Owner",
        email: "owner@delgra.test",
        password: "Str0ngPass!2026",
      },
    });
    expect(res.status).toBe(201);

    const boot = await call("/v1/bootstrap");
    const body = (await boot.json()) as { needsOwner: boolean; signupOpen: boolean };

    expect(boot.status).toBe(200);
    expect(body.needsOwner).toBe(false);
    expect(body.signupOpen).toBe(false);
  });
});
