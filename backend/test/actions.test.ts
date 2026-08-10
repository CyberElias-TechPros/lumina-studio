import { beforeAll, describe, expect, it } from "vitest";
import { env } from "cloudflare:workers";
import {
  api,
  cookieHeaders,
  createTestSession,
  sessionCookieFrom,
  setupDb,
} from "./helpers";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

let student: TestSession;
let instructor: TestSession;
let admin: TestSession;
let hr: TestSession;
let finance: TestSession;

/** RFC 6238 TOTP (SHA-1, 30s window) to generate real codes for MFA tests. */
async function totp(secretB32: string, at = Date.now()): Promise<string> {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const clean = secretB32.replace(/=+$/g, "").toUpperCase();
  let bits = "";
  for (const ch of clean) {
    const idx = alphabet.indexOf(ch);
    if (idx < 0) throw new Error(`bad b32 char ${ch}`);
    bits += idx.toString(2).padStart(5, "0");
  }
  const bytes = new Uint8Array(Math.floor(bits.length / 8));
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(bits.slice(i * 8, i * 8 + 8), 2);
  const counterBuf = new Uint8Array(8);
  let counter = BigInt(Math.floor(at / 30000));
  for (let i = 7; i >= 0; i--) {
    counterBuf[i] = Number(counter & 0xffn);
    counter >>= 8n;
  }
  const key = await crypto.subtle.importKey(
    "raw",
    bytes as unknown as BufferSource,
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"],
  );
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, counterBuf));
  const offset = sig[sig.length - 1]! & 0x0f;
  const bin =
    ((sig[offset]! & 0x7f) << 24) |
    ((sig[offset + 1]! & 0xff) << 16) |
    ((sig[offset + 2]! & 0xff) << 8) |
    (sig[offset + 3]! & 0xff);
  return (bin % 1_000_000).toString().padStart(6, "0");
}

beforeAll(async () => {
  await setupDb();
  student = await createTestSession("student@cea.ng");
  instructor = await createTestSession("instructor@cea.ng");
  admin = await createTestSession("admin@cea.ng");
  hr = await createTestSession("hr@cea.ng");
  finance = await createTestSession("finance@cea.ng");
});

describe("application pipeline", () => {
  it("student applies and admin advances it; a student cannot", async () => {
    const created = await api("/v1/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({
        fullName: "Ada Student",
        email: "student@cea.ng",
        programSlug: "full-stack-software-development",
      }),
    });
    expect(created.status).toBe(201);
    const { application } = (await created.json()) as { application: { ref: string } };
    const ref = application.ref;

    const forbidden = await api(`/v1/applications/${ref}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ status: "screening" }),
    });
    expect(forbidden.status).toBe(403);

    const advanced = await api(`/v1/applications/${ref}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(admin.cookie) },
      body: JSON.stringify({ status: "screening", note: "Phone screen booked" }),
    });
    expect(advanced.status).toBe(200);
    expect((await advanced.json()) as { status: string }).toEqual(
      expect.objectContaining({ ok: true, status: "screening" }),
    );

    const backwards = await api(`/v1/applications/${ref}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(admin.cookie) },
      body: JSON.stringify({ status: "submitted" }),
    });
    expect(backwards.status).toBe(400);
  });
});

describe("live classes", () => {
  it("instructor schedules and starts a class; a student cannot", async () => {
    const created = await api("/v1/live/classes", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(instructor.cookie) },
      body: JSON.stringify({ title: "React Hooks deep dive", startsAt: "2026-08-05T10:00:00Z" }),
    });
    expect(created.status).toBe(201);
    const { id } = (await created.json()) as { id: string };

    const studentAttempt = await api(`/v1/live/classes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ status: "live" }),
    });
    expect(studentAttempt.status).toBe(403);

    const started = await api(`/v1/live/classes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(instructor.cookie) },
      body: JSON.stringify({ status: "live" }),
    });
    expect(started.status).toBe(200);
    expect((await started.json()) as { status: string }).toEqual(
      expect.objectContaining({ status: "live" }),
    );
  });
});

describe("admin user management", () => {
  it("provisions, lists and suspends an account", async () => {
    const email = `provision.${Date.now()}@cea.ng`;
    const created = await api("/v1/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(admin.cookie) },
      body: JSON.stringify({ name: "Provisioned User", email, roleKey: "student" }),
    });
    expect(created.status).toBe(201);

    const dup = await api("/v1/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(admin.cookie) },
      body: JSON.stringify({ name: "Duplicate", email, roleKey: "student" }),
    });
    expect(dup.status).toBe(409);

    const accounts = await api("/v1/admin/accounts", { headers: cookieHeaders(admin.cookie) });
    expect(accounts.status).toBe(200);
    const listed = (await accounts.json()) as { items: { email: string }[] };
    expect(listed.items.some((i) => i.email === email)).toBe(true);

    const row = await env.DB.prepare(`SELECT id FROM users WHERE email = ?`)
      .bind(email)
      .first<{ id: string }>();
    expect(row).toBeTruthy();

    const suspended = await api(`/v1/admin/users/${row!.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(admin.cookie) },
      body: JSON.stringify({ status: "suspended" }),
    });
    expect(suspended.status).toBe(200);

    const signIn = await api("/v1/auth/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: "whatever123" }),
    });
    expect(signIn.status).toBe(401);
  });
});

describe("HR actions", () => {
  it("approves a leave request and advances payroll changes", async () => {
    await env.DB.prepare(
      `INSERT INTO leave_requests (id, employee, type, from_date, to_date, status) VALUES ('leave-act-1', 'Fatima Bello', 'annual', '2026-08-10', '2026-08-14', 'pending')`,
    ).run();

    const studentAttempt = await api("/v1/hr/leave-requests/leave-act-1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ status: "approved" }),
    });
    expect(studentAttempt.status).toBe(403);

    const approved = await api("/v1/hr/leave-requests/leave-act-1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(hr.cookie) },
      body: JSON.stringify({ status: "approved" }),
    });
    expect(approved.status).toBe(200);

    const payroll = await api("/v1/hr/payroll-changes", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(hr.cookie) },
      body: JSON.stringify({ title: "July tax correction", detail: "Rebate applied" }),
    });
    expect(payroll.status).toBe(201);
    const { id } = (await payroll.json()) as { id: string };

    const applied = await api(`/v1/hr/payroll-changes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(hr.cookie) },
      body: JSON.stringify({ status: "applied" }),
    });
    expect(applied.status).toBe(200);
    expect((await applied.json()) as { status: string }).toEqual(
      expect.objectContaining({ status: "applied" }),
    );
  });
});

describe("finance actions", () => {
  it("marks an invoice paid and approves an expense", async () => {
    await env.DB.prepare(
      `INSERT INTO invoices (id, party, amount, due, status) VALUES ('inv-act-1', 'TechPro Printers', 85000, '2026-08-15', 'pending')`,
    ).run();
    await env.DB.prepare(
      `INSERT INTO expenses (id, category, amount, status) VALUES ('exp-act-1', 'Software', 25000, 'pending')`,
    ).run();

    const paid = await api("/v1/invoices/inv-act-1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(finance.cookie) },
      body: JSON.stringify({ status: "paid" }),
    });
    expect(paid.status).toBe(200);

    const refunded = await api("/v1/invoices/inv-act-1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(finance.cookie) },
      body: JSON.stringify({ status: "refunded" }),
    });
    expect(refunded.status).toBe(200);

    const approved = await api("/v1/expenses/exp-act-1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(finance.cookie) },
      body: JSON.stringify({ status: "approved" }),
    });
    expect(approved.status).toBe(200);

    const studentAttempt = await api("/v1/invoices/inv-act-1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ status: "paid" }),
    });
    expect(studentAttempt.status).toBe(403);
  });
});

describe("recruitment actions", () => {
  it("publishes a posting, advances a candidate, and schedules an interview", async () => {
    const employer = await createTestSession("employer@cea.ng");
    const created = await api("/v1/recruitment/postings", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(employer.cookie) },
      body: JSON.stringify({ title: "Frontend Intern (Test)" }),
    });
    expect(created.status).toBe(201);
    const { id: postingId } = (await created.json()) as { id: string };

    await env.DB.prepare(
      `INSERT INTO pipeline_candidates (id, job_id, name, stage, detail, score) VALUES ('cand-act-1', ?, 'Ada Test', 'screening', 'Applied via portal', 82)`,
    )
      .bind(postingId)
      .run();

    const advanced = await api(`/v1/recruitment/postings/${postingId}/candidates/cand-act-1`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(employer.cookie) },
      body: JSON.stringify({ stage: "interview" }),
    });
    expect(advanced.status).toBe(200);
    expect((await advanced.json()) as { stage: string }).toEqual(
      expect.objectContaining({ stage: "interview" }),
    );

    const closed = await api(`/v1/recruitment/postings/${postingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(employer.cookie) },
      body: JSON.stringify({ status: "closed" }),
    });
    expect(closed.status).toBe(200);

    const interview = await api("/v1/recruitment/interviews", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(employer.cookie) },
      body: JSON.stringify({ candidate: "Ada Test", role: "Frontend Intern", date: "2026-08-12" }),
    });
    expect(interview.status).toBe(201);
  });
});

describe("payment verification", () => {
  it("verifies a pending checkout reference", async () => {
    const checkout = await api("/v1/payments/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ amount: 5000, description: "Test top-up" }),
    });
    expect(checkout.status).toBe(201);
    const { reference } = (await checkout.json()) as { reference: string };

    const verified = await api(`/v1/payments/verify/${reference}`, {
      headers: cookieHeaders(student.cookie),
    });
    expect(verified.status).toBe(200);
    const body = (await verified.json()) as { verified: boolean; status: string; reference: string };
    expect(body.verified).toBe(true);
    expect(body.reference).toBe(reference);
    expect(["pending", "success", "failed"]).toContain(body.status);
  });
});

describe("notifications", () => {
  it("marks a notification read and read-all", async () => {
    await env.DB.prepare(
      `INSERT OR IGNORE INTO notifications (id, user_id, title, body, time, engine) VALUES ('ntf-act-1', '00000000-0000-4000-8000-000000000001', 'Test ping', 'Hello', '2026-08-01T00:00:00Z', 'test')`,
    ).run();

    const read = await api("/v1/notifications/ntf-act-1/read", {
      method: "POST",
      headers: cookieHeaders(student.cookie),
    });
    expect(read.status).toBe(200);
    expect((await read.json()) as { ok: boolean }).toEqual(expect.objectContaining({ ok: true }));

    const all = await api("/v1/notifications/read-all", {
      method: "POST",
      headers: cookieHeaders(student.cookie),
    });
    expect(all.status).toBe(200);

    const list = await api("/v1/notifications", { headers: cookieHeaders(student.cookie) });
    const body = (await list.json()) as { items: { id: string; read?: boolean }[] };
    const ntf = body.items.find((i) => i.id === "ntf-act-1");
    expect(ntf?.read).toBe(true);
  });
});

describe("certificates", () => {
  it("instructor issues, owner sees it, and public verify checks the code", async () => {
    const issued = await api("/v1/certificates", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(instructor.cookie) },
      body: JSON.stringify({
        userId: student.session.user.id,
        courseSlug: "web-fundamentals",
        title: "Web Fundamentals",
      }),
    });
    expect(issued.status).toBe(201);
    const { code } = (await issued.json()) as { code: string };

    const mine = await api("/v1/certificates/mine", { headers: cookieHeaders(student.cookie) });
    expect(mine.status).toBe(200);
    const mineBody = (await mine.json()) as { items: { code: string }[] };
    expect(mineBody.items.some((i) => i.code === code)).toBe(true);

    const publicVerify = await api(`/v1/certificates/verify?code=${encodeURIComponent(code)}`);
    expect(publicVerify.status).toBe(200);
    expect(((await publicVerify.json()) as { valid: boolean }).valid).toBe(true);

    const dup = await api("/v1/certificates", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(instructor.cookie) },
      body: JSON.stringify({
        userId: student.session.user.id,
        courseSlug: "web-fundamentals",
        title: "Web Fundamentals",
      }),
    });
    expect(dup.status).toBe(409);
  });
});

describe("MFA", () => {
  it("setup → enable → sign-in requires a code → code completes the session", async () => {
    const email = `mfa.${Date.now()}@cea.ng`;
    const signUp = await api("/v1/auth/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "MFA User", email, password: "password123" }),
    });
    expect(signUp.status).toBe(201);
    const mfaCookie = sessionCookieFrom(signUp)!;

    const setup = await api("/v1/auth/mfa/setup", { method: "POST", headers: cookieHeaders(mfaCookie) });
    expect(setup.status).toBe(200);
    const { secret, recoveryCodes } = (await setup.json()) as {
      secret: string;
      recoveryCodes: string[];
    };

    const enabled = await api("/v1/auth/mfa/enable", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(mfaCookie) },
      body: JSON.stringify({ code: await totp(secret) }),
    });
    expect(enabled.status).toBe(200);
    expect((await enabled.json()) as { enabled: boolean }).toEqual({ ok: true, enabled: true });

    await api("/v1/auth/sign-out", { method: "POST", headers: cookieHeaders(mfaCookie) });

    const signIn = await api("/v1/auth/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: "password123" }),
    });
    expect(signIn.status).toBe(200);
    const challenge = (await signIn.json()) as { mfaRequired?: boolean };
    expect(challenge.mfaRequired).toBe(true);
    const pendingCookie = sessionCookieFrom(signIn)!;

    const badCode = await api("/v1/auth/mfa/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(pendingCookie) },
      body: JSON.stringify({ code: "000000" }),
    });
    expect(badCode.status).toBe(400);

    const verified = await api("/v1/auth/mfa/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(pendingCookie) },
      body: JSON.stringify({ code: await totp(secret) }),
    });
    expect(verified.status).toBe(200);
    expect((await verified.json()) as { user: { email: string } }).toEqual(
      expect.objectContaining({ user: expect.objectContaining({ email }) }),
    );
    const completed = await api("/v1/auth/session", { headers: cookieHeaders(pendingCookie) });
    expect(completed.status).toBe(200);
    expect(recoveryCodes.length).toBe(8);
  });
});
