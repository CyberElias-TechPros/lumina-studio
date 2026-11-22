import { env } from "cloudflare:workers";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

let admin: Awaited<ReturnType<typeof createTestSession>>;
let student: Awaited<ReturnType<typeof createTestSession>>;

beforeAll(async () => {
  await setupDb();
  admin = await createTestSession("admin@cea.ng");
  student = await createTestSession("student@cea.ng");
});

beforeEach(async () => {
  await env.DB.prepare("DELETE FROM gadget_orders").run();
  await env.DB.prepare("DELETE FROM afkit_catalog_snapshot").run();
});

describe("gadget basket order pipeline", () => {
  it("computes server-verified totals from fresh snapshots, protects lookup by email, and updates status", async () => {
    const observedAt = new Date().toISOString();
    const cards = [
      {
        imageUrl: "https://images.afkit.ng/thinkpad-x1.jpg",
        title: "Lenovo ThinkPad X1 Carbon",
        quantity: 2,
        condition: "UK Used",
        pricesKobo: [25000000],
      },
    ];
    await env.DB.prepare(
      `INSERT INTO afkit_catalog_snapshot (id, observed_at, reported_total, payload)
       VALUES (1, ?, 1, ?)`,
    )
      .bind(observedAt, JSON.stringify(cards))
      .run();

    const createRes = await api("/v1/gadgets/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: "Chidi Nwosu",
        customerEmail: "chidi@example.ng",
        customerPhone: "+2348012345678",
        deliveryAddress: "Port Harcourt",
        items: [{ image: "https://images.afkit.ng/thinkpad-x1.jpg", quantity: 2 }],
      }),
    });
    expect(createRes.status).toBe(201);
    const order = (await createRes.json()) as {
      ref: string;
      status: string;
      subtotalKobo: number;
      items: { unitPriceKobo: number; lineTotalKobo: number }[];
    };
    expect(order.ref).toMatch(/^CEA-GDG-\d{4}-[A-Z0-9]{6}$/);
    expect(order.status).toBe("pending_confirmation");
    expect(order.subtotalKobo).toBe(order.items[0]!.unitPriceKobo * 2);

    // Lookup without email is denied; matching email succeeds
    expect((await api(`/v1/gadgets/orders/${order.ref}`)).status).toBe(403);
    expect(
      (await api(`/v1/gadgets/orders/${order.ref}?email=${encodeURIComponent("chidi@example.ng")}`))
        .status,
    ).toBe(200);

    // Students cannot read admin gadget queue; admins can and can update status
    expect(
      (await api("/v1/gadgets/admin/orders", { headers: cookieHeaders(student.cookie) })).status,
    ).toBe(403);

    const adminList = await api("/v1/gadgets/admin/orders", {
      headers: cookieHeaders(admin.cookie),
    });
    expect(adminList.status).toBe(200);
    const listBody = (await adminList.json()) as { items: { ref: string }[] };
    expect(listBody.items[0]?.ref).toBe(order.ref);

    const patchRes = await api(`/v1/gadgets/admin/orders/${order.ref}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(admin.cookie) },
      body: JSON.stringify({ status: "confirmed", adminNote: "Reserved with supplier" }),
    });
    expect(patchRes.status).toBe(200);
    expect(await patchRes.json()).toMatchObject({ status: "confirmed" });
  });
});
