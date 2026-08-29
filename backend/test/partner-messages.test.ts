import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

describe("supplier and partner messaging", () => {
  let cookie: string;

  beforeAll(async () => {
    await setupDb();
    cookie = (await createTestSession("admin@cea.ng")).cookie;
  });

  it("appends a supplier reply to an owned conversation", async () => {
    const sent = await api("/v1/supplier-dashboard/conversations/sup-conv-01/messages", {
      method: "POST",
      headers: { ...cookieHeaders(cookie), "Content-Type": "application/json" },
      body: JSON.stringify({ body: "The morning delivery window works for us." }),
    });
    expect(sent.status).toBe(201);
    expect(await sent.json()).toMatchObject({
      fromLabel: "You",
      body: "The morning delivery window works for us.",
      timeLabel: "Just now",
    });

    const detail = await api("/v1/supplier-dashboard/conversations/sup-conv-01", {
      headers: cookieHeaders(cookie),
    });
    const body = (await detail.json()) as { thread: Array<{ body: string }> };
    expect(body.thread.at(-1)?.body).toBe("The morning delivery window works for us.");
  });

  it("allows supplier staff to confirm a pending order", async () => {
    const supplierCookie = cookie;
    const confirmed = await api("/v1/supplier-dashboard/orders/sup-po-02", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(supplierCookie) },
      body: JSON.stringify({ status: "confirmed" }),
    });
    expect(confirmed.status).toBe(200);
    expect(await confirmed.json()).toEqual({ ok: true, id: "sup-po-02", status: "confirmed" });
  });

  it("creates partner agreement, collaboration, and referral records", async () => {
    const agreement = await api("/v1/partner-dashboard/agreements", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(cookie) },
      body: JSON.stringify({ title: "Community scholarship MOU" }),
    });
    expect(agreement.status).toBe(201);
    expect(await agreement.json()).toMatchObject({
      agreement: expect.objectContaining({ title: "Community scholarship MOU", status: "draft" }),
    });

    const collaboration = await api("/v1/partner-dashboard/collaborations", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(cookie) },
      body: JSON.stringify({ title: "Tech careers masterclass", detail: "September · Ikeja HQ" }),
    });
    expect(collaboration.status).toBe(201);

    const referral = await api("/v1/partner-dashboard/referrals", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(cookie) },
      body: JSON.stringify({ name: "New referral" }),
    });
    expect(referral.status).toBe(201);
  });

  it("rejects empty partner replies", async () => {
    const sent = await api("/v1/partner-dashboard/conversations/ptn-conv-01/messages", {
      method: "POST",
      headers: { ...cookieHeaders(cookie), "Content-Type": "application/json" },
      body: JSON.stringify({ body: "   " }),
    });
    expect(sent.status).toBe(400);
  });
});
