import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, sessionCookieFrom, setupDb } from "./helpers";
import { runJob } from "../src/jobs/scheduled";
import { readiness } from "../src/routes/system";
import type { AppEnv } from "../src/types";

const json = { "Content-Type": "application/json" };

beforeAll(async () => {
  await setupDb();
});

async function signUp(email: string, password = "correct-horse-1") {
  const res = await api("/v1/auth/sign-up", {
    method: "POST",
    headers: json,
    body: JSON.stringify({ name: "Test Person", email, password }),
  });
  expect(res.status).toBe(201);
  const body = (await res.json()) as {
    devVerificationCode?: string;
    emailVerificationSent: boolean;
  };
  const cookie = sessionCookieFrom(res);
  if (!cookie) throw new Error("no cookie");
  return { cookie, code: body.devVerificationCode, body };
}

describe("account: profile + email verification", () => {
  it("requires a session", async () => {
    expect((await api("/v1/account")).status).toBe(401);
  });

  it("sign-up issues a verification code and verify-email confirms it", async () => {
    const { cookie, code } = await signUp("verify-me@cea.test");
    expect(code).toMatch(/^\d{6}$/);

    let res = await api("/v1/account", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(200);
    let account = (await res.json()) as { emailVerified: boolean; hasPassword: boolean };
    expect(account.emailVerified).toBe(false);
    expect(account.hasPassword).toBe(true);

    const wrong = code === "000000" ? "111111" : "000000";
    res = await api("/v1/account/verify-email", {
      method: "POST",
      headers: { ...cookieHeaders(cookie), ...json },
      body: JSON.stringify({ code: wrong }),
    });
    expect(res.status).toBe(400);

    res = await api("/v1/account/verify-email", {
      method: "POST",
      headers: { ...cookieHeaders(cookie), ...json },
      body: JSON.stringify({ code }),
    });
    expect(res.status).toBe(200);
    account = (await res.json()) as { emailVerified: boolean; hasPassword: boolean };
    expect(account.emailVerified).toBe(true);
  });

  it("resend invalidates the previous code", async () => {
    const { cookie, code: first } = await signUp("resend@cea.test");
    const res = await api("/v1/account/verify-email/send", {
      method: "POST",
      headers: cookieHeaders(cookie),
    });
    expect(res.status).toBe(201);
    const { devCode } = (await res.json()) as { devCode: string };
    if (first !== devCode) {
      const stale = await api("/v1/account/verify-email", {
        method: "POST",
        headers: { ...cookieHeaders(cookie), ...json },
        body: JSON.stringify({ code: first }),
      });
      expect(stale.status).toBe(400);
    }
    const ok = await api("/v1/account/verify-email", {
      method: "POST",
      headers: { ...cookieHeaders(cookie), ...json },
      body: JSON.stringify({ code: devCode }),
    });
    expect(ok.status).toBe(200);
  });

  it("updates profile name and phone", async () => {
    const { cookie } = await createTestSession("profile-user@cea.test");
    const res = await api("/v1/account", {
      method: "PATCH",
      headers: { ...cookieHeaders(cookie), ...json },
      body: JSON.stringify({ name: "New Name", phone: "+234 801 234 5678" }),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { name: string; phone: string };
    expect(body.name).toBe("New Name");
    expect(body.phone).toBe("+234 801 234 5678");
  });
});

describe("account: password change", () => {
  it("requires the current password and revokes other sessions", async () => {
    const email = "pw-change@cea.test";
    const { cookie } = await signUp(email, "first-password-1");
    const other = await api("/v1/auth/sign-in", {
      method: "POST",
      headers: json,
      body: JSON.stringify({ email, password: "first-password-1" }),
    });
    const otherCookie = sessionCookieFrom(other)!;

    const bad = await api("/v1/account/password", {
      method: "POST",
      headers: { ...cookieHeaders(cookie), ...json },
      body: JSON.stringify({ currentPassword: "nope", newPassword: "second-password-2" }),
    });
    expect(bad.status).toBe(400);

    const ok = await api("/v1/account/password", {
      method: "POST",
      headers: { ...cookieHeaders(cookie), ...json },
      body: JSON.stringify({
        currentPassword: "first-password-1",
        newPassword: "second-password-2",
      }),
    });
    expect(ok.status).toBe(200);
    expect((await api("/v1/account", { headers: cookieHeaders(cookie) })).status).toBe(200);
    expect((await api("/v1/account", { headers: cookieHeaders(otherCookie) })).status).toBe(401);

    const signIn = await api("/v1/auth/sign-in", {
      method: "POST",
      headers: json,
      body: JSON.stringify({ email, password: "second-password-2" }),
    });
    expect(signIn.status).toBe(200);
  });

  it("lets passwordless (magic-link) users set a first password", async () => {
    const { cookie } = await createTestSession("magic-only@cea.test");
    const res = await api("/v1/account/password", {
      method: "POST",
      headers: { ...cookieHeaders(cookie), ...json },
      body: JSON.stringify({ newPassword: "brand-new-pass-1" }),
    });
    expect(res.status).toBe(200);
  });
});

describe("account: data export + deletion (NDPR)", () => {
  it("exports the user's own data as a JSON attachment", async () => {
    const { cookie, session } = await createTestSession("export-me@cea.test");
    const res = await api("/v1/account/export", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(200);
    expect(res.headers.get("content-disposition")).toContain("attachment");
    const body = (await res.json()) as { account: { id: string }; data: Record<string, unknown[]> };
    expect(body.account.id).toBe(session.user.id);
    expect(Array.isArray(body.data.sessions)).toBe(true);
  });

  it("requires confirmation + password, then anonymises and signs out", async () => {
    const email = "delete-me@cea.test";
    const { cookie } = await signUp(email, "delete-pass-1");

    const noConfirm = await api("/v1/account/delete", {
      method: "POST",
      headers: { ...cookieHeaders(cookie), ...json },
      body: JSON.stringify({ confirm: "nah", password: "delete-pass-1" }),
    });
    expect(noConfirm.status).toBe(400);

    const badPw = await api("/v1/account/delete", {
      method: "POST",
      headers: { ...cookieHeaders(cookie), ...json },
      body: JSON.stringify({ confirm: "DELETE", password: "wrong" }),
    });
    expect(badPw.status).toBe(400);

    const ok = await api("/v1/account/delete", {
      method: "POST",
      headers: { ...cookieHeaders(cookie), ...json },
      body: JSON.stringify({ confirm: "DELETE", password: "delete-pass-1" }),
    });
    expect(ok.status).toBe(200);
    expect((await api("/v1/account", { headers: cookieHeaders(cookie) })).status).toBe(401);

    const row = await env.DB.prepare(`SELECT COUNT(*) AS n FROM users WHERE email = ?`)
      .bind(email)
      .first<{ n: number }>();
    expect(row?.n).toBe(0);
    const signIn = await api("/v1/auth/sign-in", {
      method: "POST",
      headers: json,
      body: JSON.stringify({ email, password: "delete-pass-1" }),
    });
    expect(signIn.status).toBe(401);
  });
});

describe("system: readiness + jobs (admin)", () => {
  it("is admin-only", async () => {
    const student = await createTestSession("not-admin@cea.test");
    expect(
      (await api("/v1/system/readiness", { headers: cookieHeaders(student.cookie) })).status,
    ).toBe(403);
  });

  it("reports integration booleans without leaking values", async () => {
    const admin = await createTestSession("admin@cea.ng");
    const res = await api("/v1/system/readiness", { headers: cookieHeaders(admin.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { checks: Record<string, boolean> };
    for (const value of Object.values(body.checks)) expect(typeof value).toBe("boolean");
  });

  it("flags missing required integrations", () => {
    const report = readiness({
      ...(env as unknown as AppEnv),
      PAYSTACK_SECRET_KEY: "",
      EMAIL_API_KEY: "",
    });
    expect(report.ready).toBe(false);
    expect(report.missingRequired).toContain("payments");
  });

  it("runs the cleanup job and records a job run", async () => {
    await env.DB.prepare(
      `INSERT INTO magic_links (id, email, token_hash, kind, created_at, expires_at)
       VALUES ('old-link', 'old@cea.test', 'old-hash-xyz', 'magic-link', '2020-01-01T00:00:00Z', '2020-01-01T00:15:00Z')`,
    ).run();
    const old = "2020-01-01T00:00:00Z";
    await env.DB.batch([
      env.DB.prepare(
        `INSERT INTO project_inquiries
          (id, ref, full_name, email, project_type, brief, budget_range, timeline, status,
           consented_at, created_at, updated_at)
         VALUES ('old-project', 'PROJ-OLD-000001', 'Old Project', 'old-project@example.com',
                 'website', 'An old project brief retained past its review window.', 'undecided',
                 'flexible', 'declined', ?, ?, ?)`,
      ).bind(old, old, old),
      env.DB.prepare(
        `INSERT INTO project_inquiries
          (id, ref, full_name, email, project_type, brief, budget_range, timeline, status,
           consented_at, created_at, updated_at)
         VALUES ('won-project', 'PROJ-OLD-000002', 'Won Project', 'won-project@example.com',
                 'website', 'An accepted project record retained for the relationship.', 'undecided',
                 'flexible', 'won', ?, ?, ?)`,
      ).bind(old, old, old),
      env.DB.prepare(
        `INSERT INTO users (id, name, email, role_key, status, created_at, updated_at)
         VALUES ('retained-partner-user', 'Retained Partner', 'retained-partner@example.com',
                 'partner', 'active', ?, ?)`,
      ).bind(old, old),
      env.DB.prepare(
        `INSERT INTO partner_applications
          (id, ref, contact_name, email, organization, partnership_type, region, capabilities,
           proposal, status, portal_user_id, consented_at, created_at, updated_at)
         VALUES ('old-partner-application', 'PARTNER-OLD-000001', 'Old Applicant',
                 'old-applicant@example.com', 'Old Organisation', 'education', 'Lagos',
                 'Relevant delivery experience for a practical education partnership.',
                 'A proposal for a collaborative education programme and employer pathway.',
                 'declined', NULL, ?, ?, ?)`,
      ).bind(old, old, old),
      env.DB.prepare(
        `INSERT INTO partner_applications
          (id, ref, contact_name, email, organization, partnership_type, region, capabilities,
           proposal, status, portal_user_id, consented_at, created_at, updated_at)
         VALUES ('retained-partner-application', 'PARTNER-OLD-000002', 'Retained Partner',
                 'retained-partner@example.com', 'Retained Organisation', 'education', 'Lagos',
                 'Relevant delivery experience for a practical education partnership.',
                 'A proposal for a collaborative education programme and employer pathway.',
                 'admitted', 'retained-partner-user', ?, ?, ?)`,
      ).bind(old, old, old),
    ]);
    const admin = await createTestSession("admin@cea.ng");
    const res = await api("/v1/system/jobs/cleanup/run", {
      method: "POST",
      headers: cookieHeaders(admin.cookie),
    });
    expect(res.status).toBe(200);
    expect(((await res.json()) as { status: string }).status).toBe("ok");
    const gone = await env.DB.prepare(`SELECT id FROM magic_links WHERE id = 'old-link'`).first();
    expect(gone).toBeNull();
    const expiredProject = await env.DB.prepare(
      `SELECT id FROM project_inquiries WHERE id = 'old-project'`,
    ).first();
    const acceptedProject = await env.DB.prepare(
      `SELECT id FROM project_inquiries WHERE id = 'won-project'`,
    ).first();
    const expiredPartner = await env.DB.prepare(
      `SELECT id FROM partner_applications WHERE id = 'old-partner-application'`,
    ).first();
    const admittedPartner = await env.DB.prepare(
      `SELECT id FROM partner_applications WHERE id = 'retained-partner-application'`,
    ).first();
    expect(expiredProject).toBeNull();
    expect(acceptedProject).not.toBeNull();
    expect(expiredPartner).toBeNull();
    expect(admittedPartner).not.toBeNull();

    const jobs = await api("/v1/system/jobs", { headers: cookieHeaders(admin.cookie) });
    const list = (await jobs.json()) as { items: { job: string }[] };
    expect(list.items.some((j) => j.job === "cleanup")).toBe(true);
  });

  it("returns 404 for unknown jobs", async () => {
    const admin = await createTestSession("admin@cea.ng");
    const res = await api("/v1/system/jobs/nope/run", {
      method: "POST",
      headers: cookieHeaders(admin.cookie),
    });
    expect(res.status).toBe(404);
  });

  it("sends one unpaid-registration reminder, never twice", async () => {
    const old = new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString();
    await env.DB.prepare(
      `INSERT INTO registrations (id, ref, program_slug, program_kind, program_title, fee_total,
         first_name, last_name, email, phone, city, payment_plan, created_at, updated_at)
       VALUES ('reg-remind', 'CEA-REMIND1', 'x', 'short', 'Test Course', 50000,
         'Ada', 'Obi', 'remind@cea.test', '080', 'Lagos', 'full', ?, ?)`,
    )
      .bind(old, old)
      .run();
    await runJob(env as unknown as AppEnv, "enrollment-reminders");
    await runJob(env as unknown as AppEnv, "enrollment-reminders");
    const count = await env.DB.prepare(
      `SELECT COUNT(*) AS n FROM registration_events WHERE registration_ref = 'CEA-REMIND1' AND event = 'reminder_unpaid'`,
    ).first<{ n: number }>();
    expect(count?.n).toBe(1);
  });

  it("reconcile job is a safe no-op without a Paystack key", async () => {
    const result = await runJob(
      { ...(env as unknown as AppEnv), PAYSTACK_SECRET_KEY: "" },
      "reconcile-payments",
    );
    expect(result.status).toBe("ok");
    expect(result.detail).toContain("skipped");
  });
});
