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

  it("rejects empty partner replies", async () => {
    const sent = await api("/v1/partner-dashboard/conversations/ptn-conv-01/messages", {
      method: "POST",
      headers: { ...cookieHeaders(cookie), "Content-Type": "application/json" },
      body: JSON.stringify({ body: "   " }),
    });
    expect(sent.status).toBe(400);
  });
});
