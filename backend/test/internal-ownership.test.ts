import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

type Session = Awaited<ReturnType<typeof createTestSession>>;
let first: Session;
let second: Session;
let admin: Session;

beforeAll(async () => {
  await setupDb();
  for (const id of ["client-one", "client-two"]) {
    await env.DB.prepare("INSERT INTO users (id, name, email, role_key) VALUES (?, ?, ?, 'client')")
      .bind(id, id, `${id}@example.test`)
      .run();
  }
  first = await createTestSession("client-one@example.test");
  second = await createTestSession("client-two@example.test");
  admin = await createTestSession("admin@cea.ng");
});

describe("client record isolation", () => {
  it("shows only owned tickets, not another client's or unowned legacy rows", async () => {
    const res = await api("/v1/client-dashboard/tickets", {
      method: "POST",
      headers: { ...cookieHeaders(first.cookie), "Content-Type": "application/json" },
      body: JSON.stringify({ title: "First client ticket" }),
    });
    expect(res.status).toBe(201);
    const own = await api("/v1/client-dashboard/tickets", { headers: cookieHeaders(first.cookie) });
    const other = await api("/v1/client-dashboard/tickets", {
      headers: cookieHeaders(second.cookie),
    });
    const ownBody = (await own.json()) as { items: { title: string }[]; total: number };
    const otherBody = (await other.json()) as { items: { title: string }[]; total: number };
    expect(ownBody.items.map((x) => x.title)).toEqual(["First client ticket"]);
    expect(ownBody.total).toBe(1);
    expect(otherBody).toMatchObject({ items: [], total: 0 });
    const adminResponse = await api("/v1/client-dashboard/tickets", {
      headers: cookieHeaders(admin.cookie),
    });
    expect(((await adminResponse.json()) as { total: number }).total).toBeGreaterThan(1);
  });

  it.each(["proposals", "documents", "contracts", "invoices", "threads", "milestones", "tasks"])(
    "does not expose unscoped %s to either client",
    async (collection) => {
      for (const user of [first, second]) {
        const res = await api(`/v1/client-dashboard/${collection}`, {
          headers: cookieHeaders(user.cookie),
        });
        expect(res.status).toBe(503);
        expect(await res.json()).toMatchObject({ error: { code: "CLIENT_DATA_UNAVAILABLE" } });
      }
    },
  );
});
