import { beforeAll, describe, expect, it } from "vitest";
import { env } from "cloudflare:workers";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

let admin: TestSession;
let student: TestSession;

beforeAll(async () => {
  await setupDb();
  admin = await createTestSession("admin@cea.ng");
  student = await createTestSession("student@cea.ng");
});

const projectPayload = {
  fullName: "Ada Obi",
  email: "ADA@Example.com",
  phone: "+234 801 234 5678",
  organization: "Obi Learning",
  projectType: "web_app",
  brief: "We need a student portal to manage class bookings, payments and progress updates.",
  budgetRange: "250k_750k",
  timeline: "three_to_six_months",
  privacyConsent: true,
};

const partnerPayload = {
  contactName: "Chidi Okafor",
  email: "chidi@example.com",
  phone: "+234 803 456 7890",
  organization: "Open Skills Network",
  website: "https://example.org",
  partnershipType: "education",
  region: "Port Harcourt, Rivers State",
  capabilities: "We run practical digital-skills programmes and support local instructors.",
  proposal: "We would like to co-host a quarterly portfolio and employer networking event.",
  privacyConsent: true,
};

describe("Public business intake", () => {
  it("stores a project brief and gives the requester a reference", async () => {
    const response = await api("/v1/business-intake/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectPayload),
    });
    expect(response.status).toBe(201);
    const body = (await response.json()) as { ok: boolean; ref: string; status: string };
    expect(body).toMatchObject({ ok: true, status: "new" });
    expect(body.ref).toMatch(/^PROJ-\d{4}-[A-Z2-9]{7}$/);

    const stored = await env.DB.prepare(
      `SELECT email, project_type, budget_range, status FROM project_inquiries WHERE ref = ?`,
    )
      .bind(body.ref)
      .first<{ email: string; project_type: string; budget_range: string; status: string }>();
    expect(stored).toEqual({
      email: "ada@example.com",
      project_type: "web_app",
      budget_range: "250k_750k",
      status: "new",
    });
  });

  it("rejects incomplete project briefs with field-level errors", async () => {
    const response = await api("/v1/business-intake/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...projectPayload, brief: "Too short", privacyConsent: false }),
    });
    expect(response.status).toBe(400);
    const body = (await response.json()) as {
      error: { code: string; fieldErrors: Record<string, string[]> };
    };
    expect(body.error.code).toBe("FIELD_VALIDATION");
    expect(body.error.fieldErrors.brief).toBeDefined();
    expect(body.error.fieldErrors.privacyConsent).toBeDefined();
  });

  it("persists partner applications separately from project requests", async () => {
    const response = await api("/v1/business-intake/partners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(partnerPayload),
    });
    expect(response.status).toBe(201);
    const body = (await response.json()) as { ok: boolean; ref: string; status: string };
    expect(body).toMatchObject({ ok: true, status: "new" });
    expect(body.ref).toMatch(/^PARTNER-\d{4}-[A-Z2-9]{7}$/);
    const stored = await env.DB.prepare(
      `SELECT email, organization, partnership_type, status FROM partner_applications WHERE ref = ?`,
    )
      .bind(body.ref)
      .first<{ email: string; organization: string; partnership_type: string; status: string }>();
    expect(stored).toEqual({
      email: "chidi@example.com",
      organization: "Open Skills Network",
      partnership_type: "education",
      status: "new",
    });
  });

  it("accepts honeypot submissions without saving or emailing them", async () => {
    const before = await env.DB.prepare(`SELECT COUNT(*) AS n FROM project_inquiries`).first<{
      n: number;
    }>();
    const response = await api("/v1/business-intake/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...projectPayload, contactWebsite: "https://bot.example" }),
    });
    expect(response.status).toBe(201);
    expect(await response.json()).toMatchObject({ ok: true, status: "new" });
    const after = await env.DB.prepare(`SELECT COUNT(*) AS n FROM project_inquiries`).first<{
      n: number;
    }>();
    expect(after?.n).toBe(before?.n);
  });
});

describe("Business intake review and admission", () => {
  it("keeps project enquiry details private to admins", async () => {
    const anonymous = await api("/v1/business-intake/admin/projects");
    expect(anonymous.status).toBe(401);
    const studentResponse = await api("/v1/business-intake/admin/projects", {
      headers: cookieHeaders(student.cookie),
    });
    expect(studentResponse.status).toBe(403);

    const adminResponse = await api("/v1/business-intake/admin/projects", {
      headers: cookieHeaders(admin.cookie),
    });
    expect(adminResponse.status).toBe(200);
    const body = (await adminResponse.json()) as {
      items: Array<{ ref: string; budgetLabel: string }>;
    };
    expect(body.items.some((item) => item.ref.startsWith("PROJ-"))).toBe(true);
    expect(body.items[0]?.budgetLabel).toContain("₦");
  });

  it("supports the project review stages and stores a private staff note", async () => {
    const submit = await api("/v1/business-intake/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...projectPayload, email: "review@example.com" }),
    });
    const { ref } = (await submit.json()) as { ref: string };
    const application = await env.DB.prepare(`SELECT id FROM project_inquiries WHERE ref = ?`)
      .bind(ref)
      .first<{ id: string }>();
    const update = await api(`/v1/business-intake/admin/projects/${application?.id}`, {
      method: "PATCH",
      headers: { ...cookieHeaders(admin.cookie), "Content-Type": "application/json" },
      body: JSON.stringify({ status: "scoping", note: "Schedule a discovery call." }),
    });
    expect(update.status).toBe(200);
    const result = (await update.json()) as { status: string; note: string };
    expect(result).toMatchObject({ status: "scoping", note: "Schedule a discovery call." });
    const event = await env.DB.prepare(
      `SELECT action, from_status, to_status, note FROM project_inquiry_events WHERE inquiry_id = ? ORDER BY created_at DESC LIMIT 1`,
    )
      .bind(application?.id)
      .first<Record<string, string>>();
    expect(event).toMatchObject({
      action: "status_changed",
      from_status: "new",
      to_status: "scoping",
    });
  });

  it("requires approval before admission, then provisions a partner account", async () => {
    const submit = await api("/v1/business-intake/partners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...partnerPayload, email: "new-partner@example.com" }),
    });
    const { ref } = (await submit.json()) as { ref: string };
    const application = await env.DB.prepare(`SELECT id FROM partner_applications WHERE ref = ?`)
      .bind(ref)
      .first<{ id: string }>();

    const early = await api(`/v1/business-intake/admin/partners/${application?.id}/admit`, {
      method: "POST",
      headers: cookieHeaders(admin.cookie),
    });
    expect(early.status).toBe(409);

    const review = await api(`/v1/business-intake/admin/partners/${application?.id}`, {
      method: "PATCH",
      headers: { ...cookieHeaders(admin.cookie), "Content-Type": "application/json" },
      body: JSON.stringify({ status: "approved", note: "References reviewed." }),
    });
    expect(review.status).toBe(200);

    const admitted = await api(`/v1/business-intake/admin/partners/${application?.id}/admit`, {
      method: "POST",
      headers: cookieHeaders(admin.cookie),
    });
    expect(admitted.status).toBe(200);
    const result = (await admitted.json()) as {
      status: string;
      portalUserId: string;
      emailSent: boolean;
    };
    expect(result.status).toBe("admitted");
    const user = await env.DB.prepare(`SELECT role_key, status FROM users WHERE id = ?`)
      .bind(result.portalUserId)
      .first<{ role_key: string; status: string }>();
    expect(user).toEqual({ role_key: "partner", status: "active" });
    const refreshed = await env.DB.prepare(
      `SELECT status, portal_user_id FROM partner_applications WHERE id = ?`,
    )
      .bind(application?.id)
      .first<{ status: string; portal_user_id: string }>();
    expect(refreshed).toEqual({ status: "admitted", portal_user_id: result.portalUserId });

    const retry = await api(`/v1/business-intake/admin/partners/${application?.id}/admit`, {
      method: "POST",
      headers: cookieHeaders(admin.cookie),
    });
    expect(retry.status).toBe(200);
    const retryResult = (await retry.json()) as {
      status: string;
      portalUserId: string;
      emailSent: boolean;
    };
    expect(retryResult).toMatchObject({ status: "admitted", portalUserId: result.portalUserId });
    const retryEvent = await env.DB.prepare(
      `SELECT action FROM partner_application_events WHERE application_id = ? AND action = 'admission_email_resent' LIMIT 1`,
    )
      .bind(application?.id)
      .first<{ action: string }>();
    expect(retryEvent?.action).toBe("admission_email_resent");
  });

  it("does not change an existing non-partner account during admission", async () => {
    const email = "existing-student@cea.ng";
    await env.DB.prepare(
      `INSERT OR IGNORE INTO users (id, name, email, role_key, status, created_at, updated_at)
       VALUES ('existing-student-intake', 'Existing Student', ?, 'student', 'active', ?, ?)`,
    )
      .bind(email, new Date().toISOString(), new Date().toISOString())
      .run();
    const submit = await api("/v1/business-intake/partners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...partnerPayload, email }),
    });
    const { ref } = (await submit.json()) as { ref: string };
    const application = await env.DB.prepare(`SELECT id FROM partner_applications WHERE ref = ?`)
      .bind(ref)
      .first<{ id: string }>();
    await api(`/v1/business-intake/admin/partners/${application?.id}`, {
      method: "PATCH",
      headers: { ...cookieHeaders(admin.cookie), "Content-Type": "application/json" },
      body: JSON.stringify({ status: "approved" }),
    });
    const response = await api(`/v1/business-intake/admin/partners/${application?.id}/admit`, {
      method: "POST",
      headers: cookieHeaders(admin.cookie),
    });
    expect(response.status).toBe(409);
    const user = await env.DB.prepare(`SELECT role_key FROM users WHERE email = ?`)
      .bind(email)
      .first<{ role_key: string }>();
    expect(user?.role_key).toBe("student");
  });
});
