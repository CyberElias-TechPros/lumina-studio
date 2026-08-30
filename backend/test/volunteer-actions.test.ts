import { beforeAll, describe, expect, it } from "vitest";
import { env } from "cloudflare:workers";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

describe("volunteer actions", () => {
  let cookie: string;

  beforeAll(async () => {
    await setupDb();
    cookie = (await createTestSession("admin@cea.ng")).cookie;
  });

  it("allows a volunteer to sign up for an open opportunity", async () => {
    const response = await api("/v1/volunteer-dashboard/signups", {
      method: "POST",
      headers: { ...cookieHeaders(cookie), "Content-Type": "application/json" },
      body: JSON.stringify({ opportunityId: "vol-opp-01" }),
    });
    expect(response.status).toBe(403);

    const volunteerCookie = (await createTestSession("volunteer@cea.ng")).cookie;
    const signup = await api("/v1/volunteer-dashboard/signups", {
      method: "POST",
      headers: { ...cookieHeaders(volunteerCookie), "Content-Type": "application/json" },
      body: JSON.stringify({ opportunityId: "vol-opp-01" }),
    });
    expect(signup.status).toBe(201);
    expect(await signup.json()).toMatchObject({
      title: "Career fair booth support",
      upcoming: 1,
    });

    const duplicate = await api("/v1/volunteer-dashboard/signups", {
      method: "POST",
      headers: { ...cookieHeaders(volunteerCookie), "Content-Type": "application/json" },
      body: JSON.stringify({ opportunityId: "vol-opp-01" }),
    });
    expect(duplicate.status).toBe(409);
  });

  it("rejects a signup when the opportunity has no capacity", async () => {
    await env.DB.prepare(
      `UPDATE vol_opportunities SET slots_filled = slots_total WHERE id = 'vol-opp-02'`,
    ).run();
    const volunteerCookie = (await createTestSession("volunteer@cea.ng")).cookie;
    const response = await api("/v1/volunteer-dashboard/signups", {
      method: "POST",
      headers: { ...cookieHeaders(volunteerCookie), "Content-Type": "application/json" },
      body: JSON.stringify({ opportunityId: "vol-opp-02" }),
    });
    expect(response.status).toBe(409);
  });
});
