import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

describe("notification preferences", () => {
  let cookie: string;

  beforeAll(async () => {
    await setupDb();
    cookie = (await createTestSession("student@cea.ng")).cookie;
  });

  it("returns safe defaults and persists partial updates", async () => {
    const initial = await api("/v1/notifications/preferences", {
      headers: cookieHeaders(cookie),
    });
    expect(initial.status).toBe(200);
    expect(await initial.json()).toEqual({
      appEnabled: true,
      emailEnabled: true,
      smsEnabled: false,
      quietStart: "21:00",
      quietEnd: "08:00",
    });

    const updated = await api("/v1/notifications/preferences", {
      method: "PATCH",
      headers: { ...cookieHeaders(cookie), "Content-Type": "application/json" },
      body: JSON.stringify({ smsEnabled: true, quietStart: "20:30" }),
    });
    expect(updated.status).toBe(200);
    expect(await updated.json()).toMatchObject({
      appEnabled: true,
      emailEnabled: true,
      smsEnabled: true,
      quietStart: "20:30",
      quietEnd: "08:00",
    });
  });
});
