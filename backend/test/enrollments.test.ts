import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

beforeAll(async () => {
  await setupDb();
});

let admin: TestSession;

beforeAll(async () => {
  admin = await createTestSession("admin@cea.ng");
});

let ipCounter = 0;
function fakeIp(): Record<string, string> {
  ipCounter += 1;
  return { "CF-Connecting-IP": `10.9.${Math.floor(ipCounter / 250)}.${ipCounter % 250}` };
}

/** POST /v1/enrollments with a unique client IP per call (rate-limit isolation). */
function postEnrollment(body: object) {
  return api("/v1/enrollments", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...fakeIp() },
    body: JSON.stringify(body),
  });
}

const LONG = {
  programSlug: "web-development-professional",
  scheduleDays: "mwf",
  timeSlot: "evening",
  mode: "hybrid",
  preferredStart: "2026-11-02",
  firstName: "Ada",
  lastName: "Obi",
  email: "ada.longform@example.com",
  phone: "+2348000000000",
  city: "Port Harcourt",
  birthYear: 2001,
  educationLevel: "SSCE",
  experienceLevel: "No experience",
  goal: "Get hired as a web developer.",
  hasLaptop: true,
  referredBy: "WhatsApp status",
  paymentPlan: "deposit-monthly",
  paymentMethod: "paystack",
  consentPrivacy: true,
  consentTerms: true,
  consentWhatsApp: true,
};

const SHORT = {
  programSlug: "microsoft-office",
  scheduleDays: "standard",
  timeSlot: "any",
  mode: "onsite",
  firstName: "Chidi",
  lastName: "Eze",
  email: "chidi.short@example.com",
  phone: "+2348011111111",
  city: "Port Harcourt",
  hasLaptop: false,
  paymentPlan: "50-50",
  paymentMethod: "paystack",
  consentPrivacy: true,
  consentTerms: true,
};

describe("POST /v1/enrollments", () => {
  it("creates a long-form enrollment with a CEA reference and 30% deposit", async () => {
    const res = await postEnrollment(LONG);
    expect(res.status).toBe(201);
    const body = (await res.json()) as {
      enrollment: {
        ref: string;
        stage: string;
        payment: { depositAmount: number; feeTotal: number; feeDue: number; status: string };
        nextSteps: string[];
      };
    };
    expect(body.enrollment.ref).toMatch(/^CEA-\d{4}-[A-Z0-9]{6}$/);
    expect(body.enrollment.stage).toBe("submitted");
    expect(body.enrollment.payment.feeTotal).toBe(320000);
    expect(body.enrollment.payment.depositAmount).toBe(96000);
    expect(body.enrollment.payment.feeDue).toBe(320000);
    expect(body.enrollment.payment.status).toBe("unpaid");
    expect(body.enrollment.nextSteps.length).toBeGreaterThanOrEqual(3);
  });

  it("creates a short-course enrollment with 50% deposit and mirrors the applications pipeline", async () => {
    const res = await postEnrollment(SHORT);
    expect(res.status).toBe(201);
    const body = (await res.json()) as {
      enrollment: { ref: string; payment: { depositAmount: number } };
    };
    expect(body.enrollment.payment.depositAmount).toBe(15000);

    // Mirror row must exist for the legacy admissions pipeline.
    const status = await api(`/v1/applications/${body.enrollment.ref}`);
    expect(status.status).toBe(200);
    const mirror = (await status.json()) as { ref: string; status: string };
    expect(mirror.ref).toBe(body.enrollment.ref);
    expect(mirror.status).toBe("submitted");
  });

  it("applies the 10% long-form full-payment discount", async () => {
    const res = await postEnrollment({
      ...LONG,
      email: "ada.full@example.com",
      paymentPlan: "full-10-off",
    });
    expect(res.status).toBe(201);
    const body = (await res.json()) as {
      enrollment: { payment: { feeDue: number } };
    };
    expect(body.enrollment.payment.feeDue).toBe(288000);
  });

  it("rejects a mismatched payment plan for the program kind", async () => {
    const res = await postEnrollment({
      ...LONG,
      email: "x.plan@example.com",
      paymentPlan: "50-50",
    });
    expect(res.status).toBe(400);
    const body = (await res.json()) as {
      error: { code: string; fieldErrors: Record<string, string[]> };
    };
    expect(body.error.code).toBe("FIELD_VALIDATION");
    expect(body.error.fieldErrors.paymentPlan).toBeDefined();
  });

  it("rejects missing consent and bad input", async () => {
    const res = await api("/v1/enrollments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...SHORT,
        email: "nope",
        firstName: "x",
        phone: "12",
        consentPrivacy: false,
        consentTerms: false,
      }),
    });
    expect(res.status).toBe(400);
    const body = (await res.json()) as {
      error: { fieldErrors: Record<string, string[]> };
    };
    for (const field of ["email", "firstName", "phone", "consentPrivacy", "consentTerms"]) {
      expect(body.error.fieldErrors[field]).toBeDefined();
    }
  });

  it("rejects unknown programs", async () => {
    const res = await postEnrollment({
      ...SHORT,
      email: "y.unknown@example.com",
      programSlug: "quantum-alchemy",
    });
    expect(res.status).toBe(400);
    const body = (await res.json()) as { error: { code: string } };
    expect(body.error.code).toBe("PROGRAM_NOT_FOUND");
  });
});

describe("POST /v1/enrollments/:ref/payments", () => {
  async function makeRef(): Promise<{ ref: string; email: string }> {
    const res = await postEnrollment({ ...LONG, email: `pay.${Date.now()}@example.com` });
    const body = (await res.json()) as { enrollment: { ref: string } };
    return { ref: body.enrollment.ref, email: "pay@example.com" };
  }

  it("creates a mock checkout for the deposit when no Paystack secret is set", async () => {
    const { ref } = await makeRef();
    const res = await api(`/v1/enrollments/${ref}/payments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "deposit" }),
    });
    expect(res.status).toBe(201);
    const body = (await res.json()) as {
      reference: string;
      authorizationUrl: string;
      mock: boolean;
      amount: number;
    };
    expect(body.mock).toBe(true);
    expect(body.amount).toBe(96000);
    expect(body.authorizationUrl).toContain(body.reference);
  });

  it("rejects a deposit for the full-payment plan", async () => {
    const res = await postEnrollment({
      ...LONG,
      email: "planfull@example.com",
      paymentPlan: "full-10-off",
    });
    const body = (await res.json()) as { enrollment: { ref: string } };
    const pay = await api(`/v1/enrollments/${body.enrollment.ref}/payments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "deposit" }),
    });
    expect(pay.status).toBe(400);
  });

  it("computes the discounted full amount for full-10-off", async () => {
    const res = await postEnrollment({
      ...LONG,
      email: "discount@example.com",
      paymentPlan: "full-10-off",
    });
    const body = (await res.json()) as { enrollment: { ref: string } };
    const pay = await api(`/v1/enrollments/${body.enrollment.ref}/payments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "full" }),
    });
    expect(pay.status).toBe(201);
    const payBody = (await pay.json()) as { amount: number };
    expect(payBody.amount).toBe(288000);
  });

  it("404s for unknown refs", async () => {
    const res = await api("/v1/enrollments/CEA-1999-ZZZZZZ/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "full" }),
    });
    expect(res.status).toBe(404);
  });
});

describe("GET /v1/enrollments/:ref/payments/verify", () => {
  it("verifies a pending mock payment without a provider", async () => {
    const res = await postEnrollment({ ...LONG, email: `verify.${Date.now()}@example.com` });
    const body = (await res.json()) as { enrollment: { ref: string } };
    const pay = await api(`/v1/enrollments/${body.enrollment.ref}/payments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "full" }),
    });
    const payBody = (await pay.json()) as { reference: string };
    const verify = await api(
      `/v1/enrollments/${body.enrollment.ref}/payments/verify?reference=${payBody.reference}`,
    );
    expect(verify.status).toBe(200);
    const verifyBody = (await verify.json()) as { status: string; verified: boolean };
    expect(verifyBody.verified).toBe(true);
    expect(["pending", "success"]).toContain(verifyBody.status);
  });
});

describe("public status + admin pipeline", () => {
  it("exposes applicant status with events and payment state", async () => {
    const res = await postEnrollment({ ...SHORT, email: `status.${Date.now()}@example.com` });
    const body = (await res.json()) as { enrollment: { ref: string } };
    const status = await api(`/v1/enrollments/${body.enrollment.ref}`);
    expect(status.status).toBe(200);
    const data = (await status.json()) as {
      ref: string;
      stage: string;
      programTitle: string;
      payment: { status: string; amountDue: number };
      events: { event: string }[];
      stages: { key: string; active: boolean }[];
    };
    expect(data.stage).toBe("submitted");
    expect(data.programTitle).toBe("Microsoft Office");
    expect(data.payment.status).toBe("unpaid");
    expect(data.payment.amountDue).toBe(30000);
    expect(data.events[0]?.event).toBe("submitted");
    expect(data.stages.find((s) => s.active)?.key).toBe("submitted");
  });

  it("lets admin advance the stage and mirror it to applications", async () => {
    const res = await postEnrollment({ ...SHORT, email: `adv.${Date.now()}@example.com` });
    const body = (await res.json()) as { enrollment: { ref: string } };
    const patch = await api(`/v1/enrollments/${body.enrollment.ref}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(admin.cookie) },
      body: JSON.stringify({ stage: "offer", note: "Dates confirmed" }),
    });
    expect(patch.status).toBe(200);

    const legacy = await api(`/v1/applications/${body.enrollment.ref}`);
    const legacyBody = (await legacy.json()) as { status: string };
    expect(legacyBody.status).toBe("offer");
  });

  it("rejects backwards movement and non-admin access", async () => {
    const res = await postEnrollment({ ...SHORT, email: `bwd.${Date.now()}@example.com` });
    const body = (await res.json()) as { enrollment: { ref: string } };
    const fwd = await api(`/v1/enrollments/${body.enrollment.ref}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(admin.cookie) },
      body: JSON.stringify({ stage: "offer" }),
    });
    expect(fwd.status).toBe(200);
    const bwd = await api(`/v1/enrollments/${body.enrollment.ref}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(admin.cookie) },
      body: JSON.stringify({ stage: "submitted" }),
    });
    expect(bwd.status).toBe(400);

    const anon = await api(`/v1/enrollments/admin`);
    expect(anon.status).toBe(401);
  });

  it("lists enrollments for admins with payment summaries", async () => {
    const res = await api("/v1/enrollments/admin", {
      headers: cookieHeaders(admin.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      items: { ref: string; programKind: string; payment: { status: string } }[];
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items.length).toBeGreaterThan(0);
  });
});
