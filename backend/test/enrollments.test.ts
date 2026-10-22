/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";
import { app } from "../src/index";
import type { AppEnv } from "../src/types";
import { markPayment } from "../src/routes/enrollments";
import { activateTuition, deliverTuitionNotifications, TUITION_POLICY } from "../src/lib/tuition";
import { enrollmentReminders } from "../src/jobs/scheduled";
import { academyCoursesSql } from "../seeds/academy-courses";
import { tuitionPaymentResult } from "../../src/data/academy/tuition-policy";
import { verifyPaystackTransaction } from "../src/lib/paystack";
import { PROGRAMS } from "../src/lib/tuition-offers.generated";
import { allCourses } from "../../src/data/academy/catalog";
import { hmacSha512Hex } from "../src/lib/crypto";

const runtime = env as unknown as AppEnv;
const ctx = { env: runtime };
type Session = Awaited<ReturnType<typeof createTestSession>>;
let admin: Session, admissions: Session, finance: Session, learner: Session, stranger: Session;
let counter = 0;
const date = (days: number) => new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);
const cohortInput = {
  label: "TEST Office cohort",
  programSlug: "microsoft-office",
  kind: "short",
  startDate: date(20),
  endDate: date(40),
  days: "Mon/Wed",
  startTime: "10:00",
  sessionMinutes: 105,
  timeSlot: "morning",
  mode: "onsite",
  capacity: 30,
  enrollmentOpen: true,
};
const base = {
  programSlug: "microsoft-office",
  firstName: "Ada",
  lastName: "Obi",
  email: "tuition-student@example.test",
  phone: "08030001111",
  city: "Port Harcourt",
  hasLaptop: false,
  paymentPlan: "50-50",
  paymentMethod: "paystack",
  consentPrivacy: true,
  consentTerms: true,
  policyVersion: TUITION_POLICY.version,
};
function request(path: string, method = "GET", body?: unknown, session?: Session) {
  counter++;
  return api(path, {
    method,
    headers: {
      "Content-Type": "application/json",
      "CF-Connecting-IP": `10.77.${Math.floor(counter / 250)}.${counter % 250}`,
      ...(session ? cookieHeaders(session.cookie) : {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
}
async function json(res: Response) {
  return (await res.json()) as any;
}
async function create(extra: Record<string, unknown> = {}) {
  const res = await request("/v1/enrollments", "POST", {
    ...base,
    submissionKey: crypto.randomUUID(),
    ...extra,
  });
  expect(res.status, JSON.stringify(await res.clone().json())).toBe(201);
  return (await json(res)).enrollment.ref as string;
}
async function cohort(capacity = 30) {
  const res = await request("/v1/cohorts", "POST", { ...cohortInput, capacity }, admin);
  expect(res.status, JSON.stringify(await res.clone().json())).toBe(201);
  return (await json(res)).cohort.id as string;
}
async function offer(ref: string, cohortId: string, session = admin) {
  return request(
    `/v1/enrollments/${ref}/offer`,
    "POST",
    {
      cohortId,
      balanceDueAt: `${date(29)}T09:00:00.000Z`,
      equipment:
        "TEST agreed in-class academy computer; home practice on own device; no extra compulsory charges.",
      eligibilityConfirmed: true,
    },
    session,
  );
}
async function ready(extra: Record<string, unknown> = {}) {
  const ref = await create(extra);
  const c = await cohort();
  const issued = await offer(ref, c);
  expect(issued.status).toBe(200);
  const version = (await json(issued)).version;
  const accepted = await request(
    `/v1/enrollments/${ref}/offer/accept`,
    "POST",
    { version, policyVersion: TUITION_POLICY.version, consent: true },
    learner,
  );
  expect(accepted.status, JSON.stringify(await accepted.clone().json())).toBe(200);
  return ref;
}
async function pay(ref: string, kind = "deposit", session = learner, key = crypto.randomUUID()) {
  return request(`/v1/enrollments/${ref}/payments`, "POST", { kind, checkoutKey: key }, session);
}
async function state(ref: string, session = learner) {
  const res = await request(`/v1/enrollments/${ref}`, "GET", undefined, session);
  expect(res.status).toBe(200);
  return json(res);
}
async function proof(ref: string) {
  const res = await request(
    `/v1/enrollments/${ref}/payments/transfer`,
    "POST",
    {
      kind: "deposit",
      amount: 15000,
      senderName: "Ada Obi",
      bankReference: "learner-claim-not-proof",
    },
    learner,
  );
  expect(res.status).toBe(201);
  return (await env.DB.prepare("SELECT id FROM payment_proofs WHERE registration_ref = ?")
    .bind(ref)
    .first<{ id: string }>())!.id;
}

beforeAll(async () => {
  await setupDb();
  for (const statement of academyCoursesSql.split("\n"))
    if (statement.trim()) await env.DB.exec(statement);
  admin = await createTestSession("admin@cea.ng");
  admissions = await createTestSession("admissions@cea.ng");
  await env.DB.prepare("UPDATE users SET role_key = 'admissions' WHERE id = ?")
    .bind(admissions.session.user.id)
    .run();
  finance = await createTestSession("finance@cea.ng");
  learner = await createTestSession(base.email);
  stranger = await createTestSession("other-tuition@example.test");
});

describe("protected free application and privacy", () => {
  it("keeps all catalogue prices and durations unchanged", () => {
    for (const c of allCourses)
      expect(PROGRAMS[c.slug]).toMatchObject({
        fee: c.fee,
        weeks: c.weeks,
        title: c.title,
        kind: "short",
      });
  });
  it("records a free request, policy/consent and an honest next action", async () => {
    const ref = await create();
    const row = await env.DB.prepare("SELECT * FROM registrations WHERE ref = ?")
      .bind(ref)
      .first<any>();
    expect(row.fee_total).toBe(30000);
    expect(row.deposit_amount).toBe(15000);
    expect(row.policy_version).toBe(TUITION_POLICY.version);
    expect(row.consent_at).toBeTruthy();
    const data = await state(ref);
    expect(data.checkout.allowed).toBe(false);
    expect(data.offer.status).toBe("awaiting");
    expect(data.learning.active).toBe(false);
    expect(data.contact.address).toBe("24 Ebony Road, Off Rumuola Road, Port Harcourt");
    const legacy = await request(`/v1/applications/${ref}`, "GET", undefined, learner);
    expect((await json(legacy)).status).toBe("submitted");
  });
  it("deduplicates an identical retry and refuses changing the request under the same key", async () => {
    const submissionKey = crypto.randomUUID();
    const first = await create({ submissionKey });
    const again = await request("/v1/enrollments", "POST", { ...base, submissionKey });
    expect(again.status).toBe(200);
    expect((await json(again)).enrollment.ref).toBe(first);
    const changed = await request("/v1/enrollments", "POST", {
      ...base,
      firstName: "Different",
      submissionKey,
    });
    expect(changed.status).toBe(409);
    const count = await env.DB.prepare(
      "SELECT COUNT(*) AS n FROM registrations WHERE submission_key = ?",
    )
      .bind(submissionKey)
      .first<any>();
    expect(count.n).toBe(1);
  });
  it("supports interest in legacy longer offers without opening checkout", async () => {
    const ref = await create({
      programSlug: "web-development-professional",
      paymentPlan: "full-10-off",
    });
    const data = await state(ref);
    expect(data.feeDue).toBe(288000);
    expect(data.checkout.allowed).toBe(false);
    expect((await pay(ref, "full")).status).toBe(409);
  });
  it.each([
    { programSlug: "made-up" },
    { paymentPlan: "deposit-monthly" },
    { consentTerms: false },
    { consentPrivacy: false },
    { email: "bad" },
    { policyVersion: "unknown" },
  ])("rejects invalid/changed input %o", async (extra) => {
    expect((await request("/v1/enrollments", "POST", { ...base, ...extra })).status).toBe(400);
  });
  it("denies anonymous and other-user access to status, receipts, payments and legacy status", async () => {
    const ref = await create();
    for (const tail of ["", "/receipt", "/payments/verify?reference=unknown"]) {
      expect((await request(`/v1/enrollments/${ref}${tail}`)).status).toBe(401);
      expect(
        (await request(`/v1/enrollments/${ref}${tail}`, "GET", undefined, stranger)).status,
      ).toBe(404);
    }
    expect((await request(`/v1/applications/${ref}`)).status).toBe(401);
    expect((await pay(ref, "full", stranger)).status).toBe(404);
    const privateResponse = await request(`/v1/enrollments/${ref}`, "GET", undefined, learner);
    expect(privateResponse.headers.get("cache-control")).toContain("no-store");
  });
  it("does not accept an unverified email/password session as identity proof", async () => {
    const ref = await create();
    await env.DB.prepare("UPDATE users SET email_verified_at = NULL WHERE id = ?")
      .bind(learner.session.user.id)
      .run();
    expect((await request(`/v1/enrollments/${ref}`, "GET", undefined, learner)).status).toBe(403);
    await env.DB.prepare("UPDATE users SET email_verified_at = ? WHERE id = ?")
      .bind(new Date().toISOString(), learner.session.user.id)
      .run();
  });
  it("aligns admissions/finance read permissions without granting finance placement powers", async () => {
    for (const staff of [admin, admissions, finance])
      expect((await request("/v1/enrollments/admin", "GET", undefined, staff)).status).toBe(200);
    expect((await request("/v1/enrollments/admin", "GET", undefined, learner)).status).toBe(403);
    const ref = await create();
    expect((await offer(ref, await cohort(), finance)).status).toBe(403);
  });
});

describe("owner-approved placement", () => {
  it("does not open generic/undeliverable cohorts", async () => {
    expect(
      (await request("/v1/cohorts", "POST", { ...cohortInput, capacity: undefined }, admin)).status,
    ).toBe(400);
    expect(
      (await request("/v1/cohorts", "POST", { ...cohortInput, startTime: undefined }, admin))
        .status,
    ).toBe(400);
    expect(
      (await request("/v1/cohorts", "POST", { ...cohortInput, programSlug: "unmapped" }, admin))
        .status,
    ).toBe(400);
  });
  it("requires the learner to accept the exact offer and saves its immutable snapshot", async () => {
    const ref = await create(),
      id = await cohort();
    expect((await offer(ref, id, admissions)).status).toBe(200);
    expect((await pay(ref)).status).toBe(409);
    const body = { version: 1, policyVersion: TUITION_POLICY.version, consent: true };
    expect((await request(`/v1/enrollments/${ref}/offer/accept`, "POST", body, admin)).status).toBe(
      403,
    );
    expect(
      (
        await request(
          `/v1/enrollments/${ref}/offer/accept`,
          "POST",
          { ...body, version: 2 },
          learner,
        )
      ).status,
    ).toBe(409);
    expect(
      (await request(`/v1/enrollments/${ref}/offer/accept`, "POST", body, learner)).status,
    ).toBe(200);
    const history = await env.DB.prepare(
      "SELECT snapshot,accepted_at FROM tuition_offer_history WHERE registration_ref = ?",
    )
      .bind(ref)
      .first<any>();
    expect(JSON.parse(history.snapshot).feeTotal).toBe(30000);
    expect(history.accepted_at).toBeTruthy();
    expect((await state(ref)).checkout.allowed).toBe(true);
  });
  it("cannot sell the final place twice under concurrent offers", async () => {
    const id = await cohort(1),
      a = await create(),
      b = await create();
    const results = await Promise.all([offer(a, id), offer(b, id)]);
    expect(results.map((r) => r.status).sort()).toEqual([200, 409]);
    expect((await request(`/v1/cohorts/${id}`, "DELETE", undefined, admin)).status).toBe(409);
    expect(
      (await request(`/v1/cohorts/${id}`, "PATCH", { capacity: 1, startDate: date(21) }, admin))
        .status,
    ).toBe(409);
  });
  it("holds a place with a timely transfer report even after expiry", async () => {
    const ref = await create(),
      id = await cohort(1);
    await offer(ref, id);
    await request(
      `/v1/enrollments/${ref}/offer/accept`,
      "POST",
      { version: 1, policyVersion: TUITION_POLICY.version, consent: true },
      learner,
    );
    await proof(ref);
    await env.DB.prepare("UPDATE registrations SET offer_expires_at = ? WHERE ref = ?")
      .bind(new Date(Date.now() - 1000).toISOString(), ref)
      .run();
    expect((await offer(await create(), id)).status).toBe(409);
  });
  it("blocks expired offers and stopped cohorts without inventing places", async () => {
    const ref = await ready();
    await env.DB.prepare(
      "UPDATE registrations SET offer_expires_at = '2000-01-01T00:00:00.000Z' WHERE ref = ?",
    )
      .bind(ref)
      .run();
    expect((await pay(ref)).status).toBe(409);
    const other = await ready();
    await env.DB.prepare(
      "UPDATE cohorts SET status='cancelled' WHERE id=(SELECT cohort_id FROM registrations WHERE ref=?)",
    )
      .bind(other)
      .run();
    expect((await pay(other)).status).toBe(409);
  });
  it("mirrors declines and blocks independent legacy edits or manual access labels", async () => {
    const ref = await create();
    expect(
      (await request(`/v1/applications/${ref}`, "PATCH", { status: "offer" }, admin)).status,
    ).toBe(409);
    expect(
      (await request(`/v1/enrollments/${ref}`, "PATCH", { stage: "enrolled" }, admissions)).status,
    ).toBe(409);
    expect(
      (await request(`/v1/enrollments/${ref}`, "PATCH", { stage: "declined" }, admissions)).status,
    ).toBe(200);
    expect(
      (await json(await request(`/v1/applications/${ref}`, "GET", undefined, learner))).status,
    ).toBe("declined");
  });
});

describe("money, retries and receipts", () => {
  it("production without keys fails closed before making a fake payment session", async () => {
    const ref = await ready();
    const response = await app.request(
      `/v1/enrollments/${ref}/payments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", ...cookieHeaders(learner.cookie) },
        body: JSON.stringify({ kind: "deposit" }),
      },
      { ...runtime, APP_ENV: "production", PAYSTACK_SECRET_KEY: undefined },
    );
    expect(response.status).toBe(503);
    const n = await env.DB.prepare(
      "SELECT COUNT(*) AS n FROM registration_payments WHERE registration_ref=?",
    )
      .bind(ref)
      .first<any>();
    expect(n.n).toBe(0);
  });
  it("reuses one checkout key and prevents parallel pending charges", async () => {
    const ref = await ready(),
      key = crypto.randomUUID();
    const first = await pay(ref, "deposit", learner, key);
    expect(first.status).toBe(201);
    const firstBody = await json(first);
    const retry = await pay(ref, "deposit", learner, key);
    expect(retry.status).toBe(200);
    expect((await json(retry)).reference).toBe(firstBody.reference);
    expect((await pay(ref, "full")).status).toBe(409);
    const secondRef = await ready();
    const results = await Promise.all([pay(secondRef), pay(secondRef)]);
    expect(results.map((r) => r.status).sort()).toEqual([201, 409]);
  });
  it("adds distinct payments; full after deposit charges only the remainder", async () => {
    const ref = await ready();
    const a = await json(await pay(ref));
    expect(a.amount).toBe(15000);
    await markPayment(ctx, a.reference, "success", 1500000);
    let data = await state(ref);
    expect(data.payment.paidAmount).toBe(15000);
    expect(data.payment.status).toBe("deposit_paid");
    expect(data.learning.active).toBe(true);
    expect((await pay(ref, "deposit")).status).toBe(400);
    const b = await json(await pay(ref, "full"));
    expect(b.amount).toBe(15000);
    await markPayment(ctx, b.reference, "success", 1500000);
    data = await state(ref);
    expect(data.payment.paidAmount).toBe(30000);
    expect(data.payment.amountDue).toBe(0);
    expect(data.payment.status).toBe("paid");
    expect((await pay(ref, "balance")).status).toBe(409);
    const receipt = await json(
      await request(`/v1/enrollments/${ref}/receipt`, "GET", undefined, learner),
    );
    expect(receipt.receipt.payments).toHaveLength(2);
    expect(receipt.receipt.issuedBy.address).toBe("24 Ebony Road, off Rumuola Road, Port Harcourt");
    expect(new Set(receipt.receipt.payments.map((p: any) => p.receiptNo)).size).toBe(2);
  });
  it("does not let a full-kind underpayment claim full settlement; records actual excess too", async () => {
    const ref = await ready({ paymentPlan: "full" });
    const p = await json(await pay(ref, "full"));
    await markPayment(ctx, p.reference, "success", 1000000);
    const data = await state(ref);
    expect(data.payment.status).toBe("deposit_paid");
    expect(data.payment.paidAmount).toBe(10000);
    expect(data.payment.amountDue).toBe(20000);
    expect(data.learning.active).toBe(false);
    const other = await ready();
    const q = await json(await pay(other, "full"));
    await markPayment(ctx, q.reference, "success", 3500050);
    expect((await state(other)).payment.paidAmount).toBe(35000.5);
    expect(
      (
        await env.DB.prepare("SELECT exception FROM registration_payments WHERE reference=?")
          .bind(q.reference)
          .first<any>()
      ).exception,
    ).toBe("provider_amount_mismatch");
  });
  it("concurrent duplicate success has one credit, receipt, event and outbox record", async () => {
    const ref = await ready();
    const p = await json(await pay(ref));
    await Promise.all([
      markPayment(ctx, p.reference, "success", 1500000),
      markPayment(ctx, p.reference, "success", 1500000),
    ]);
    await markPayment(ctx, p.reference, "failed");
    expect((await state(ref)).payment.paidAmount).toBe(15000);
    const event = await env.DB.prepare(
      "SELECT COUNT(*) AS n FROM registration_events WHERE registration_ref=? AND event='payment_confirmed'",
    )
      .bind(ref)
      .first<any>();
    expect(event.n).toBe(1);
    const receipts = await env.DB.prepare(
      "SELECT COUNT(*) AS n FROM tuition_notifications WHERE id=?",
    )
      .bind(`receipt:${p.reference}`)
      .first<any>();
    expect(receipts.n).toBe(1);
    expect(
      (
        await env.DB.prepare("SELECT status FROM registration_payments WHERE reference=?")
          .bind(p.reference)
          .first<any>()
      ).status,
    ).toBe("success");
  });
  it("a provider success after hold expiry credits money but flags placement, without new entitlement", async () => {
    const ref = await ready();
    const p = await json(await pay(ref));
    await env.DB.prepare(
      "UPDATE registrations SET offer_expires_at='2000-01-01T00:00:00.000Z' WHERE ref=?",
    )
      .bind(ref)
      .run();
    await markPayment(ctx, p.reference, "success", 1500000);
    const data = await state(ref);
    expect(data.payment.paidAmount).toBe(15000);
    expect(data.learning.active).toBe(false);
    const work = await json(
      await request("/v1/enrollments/admin/worklist", "GET", undefined, admin),
    );
    expect(work.items.find((r: any) => r.ref === ref).reasons.join(" ")).toContain("access review");
  });
  it("webhook audit insertion cannot swallow retries; requires valid currency/signature", async () => {
    const ref = await ready();
    const p = await json(await pay(ref));
    const secret = "test-secret";
    const body = {
      event: "charge.success",
      data: { id: 7001, reference: p.reference, amount: 1500000, currency: "NGN" },
    };
    const raw = JSON.stringify(body);
    await env.DB.prepare(
      "INSERT INTO webhook_events (id,provider,event,reference,received_at) VALUES (?,?,?,?,?)",
    )
      .bind(
        "paystack-enrollments:charge.success:7001",
        "paystack-enrollments",
        "charge.success",
        p.reference,
        new Date().toISOString(),
      )
      .run();
    const headers = {
      "Content-Type": "application/json",
      "x-paystack-signature": await hmacSha512Hex(secret, raw),
    };
    const res = await app.request(
      "/v1/enrollments/webhook",
      { method: "POST", headers, body: raw },
      { ...runtime, APP_ENV: "production", PAYSTACK_SECRET_KEY: secret },
    );
    expect(res.status).toBe(200);
    expect((await state(ref)).payment.paidAmount).toBe(15000);
    const bad = await app.request(
      "/v1/enrollments/webhook",
      { method: "POST", body: raw },
      { ...runtime, APP_ENV: "production", PAYSTACK_SECRET_KEY: secret },
    );
    expect(bad.status).toBe(401);
  });
  it("requires finance bank evidence, deduplicates confirmed credits and never treats a report as paid", async () => {
    const ref = await ready(),
      id = await proof(ref);
    expect((await state(ref)).payment.paidAmount).toBe(0);
    expect((await pay(ref)).status).toBe(409);
    expect(
      (await request(`/v1/enrollments/payment-proofs/${id}/confirm`, "POST", {}, finance)).status,
    ).toBe(400);
    const evidence = { bankReference: `BANK-${crypto.randomUUID()}`, receivedAmount: 15000 };
    expect(
      (await request(`/v1/enrollments/payment-proofs/${id}/confirm`, "POST", evidence, learner))
        .status,
    ).toBe(403);
    const confirmations = await Promise.all([
      request(`/v1/enrollments/payment-proofs/${id}/confirm`, "POST", evidence, finance),
      request(`/v1/enrollments/payment-proofs/${id}/confirm`, "POST", evidence, finance),
    ]);
    expect(confirmations.every((r) => r.status === 200)).toBe(true);
    expect((await state(ref)).payment.paidAmount).toBe(15000);
    const other = await ready(),
      otherProof = await proof(other);
    expect(
      (
        await request(
          `/v1/enrollments/payment-proofs/${otherProof}/confirm`,
          "POST",
          evidence,
          finance,
        )
      ).status,
    ).toBe(409);
    const receipt = await json(
      await request(`/v1/enrollments/${ref}/receipt`, "GET", undefined, learner),
    );
    expect(receipt.receipt.payments[0].method).toBe("bank-transfer");
  });
  it("a rejected report cannot subsequently be confirmed", async () => {
    const ref = await ready(),
      id = await proof(ref);
    expect(
      (
        await request(
          `/v1/enrollments/payment-proofs/${id}/reject`,
          "POST",
          { reason: "No bank credit found" },
          finance,
        )
      ).status,
    ).toBe(200);
    expect(
      (
        await request(
          `/v1/enrollments/payment-proofs/${id}/confirm`,
          "POST",
          { bankReference: "UNMATCHED-CREDIT", receivedAmount: 15000 },
          finance,
        )
      ).status,
    ).toBe(409);
    expect((await state(ref)).payment.paidAmount).toBe(0);
  });
  it.each([
    ["failed", "failed", "failed"],
    ["failed", "deposit_paid", "failed"],
    ["pending", "paid", "pending"],
    ["success", "deposit_paid", "deposit"],
    ["success", "paid", "paid"],
    ["unknown", "unpaid", "pending"],
  ])("presents %s / %s explicitly", (attempt, aggregate, expected) => {
    expect(tuitionPaymentResult(attempt, aggregate)).toBe(expected);
  });
});

describe("learning and routine automation", () => {
  it("blocks self-enrolment and completion without an entitlement; strips private bodies", async () => {
    expect(
      (await request("/v1/courses/microsoft-office/enroll", "POST", {}, stranger)).status,
    ).toBe(403);
    const course = await json(
      await request("/v1/courses/microsoft-office", "GET", undefined, stranger),
    );
    expect(course.modules[0].lessons[0].body).toBeUndefined();
    const lesson = course.modules[0].lessons[0].id;
    expect(
      (
        await request(
          `/v1/courses/microsoft-office/lessons/${lesson}/complete`,
          "POST",
          {},
          stranger,
        )
      ).status,
    ).toBe(403);
  });
  it("preserves learner progress across activation retries and gives the matching curriculum", async () => {
    const ref = await ready();
    const p = await json(await pay(ref));
    await markPayment(ctx, p.reference, "success", 1500000);
    const course = await json(
      await request("/v1/courses/microsoft-office", "GET", undefined, learner),
    );
    const lesson = course.modules[0].lessons[0];
    expect(lesson.body).toContain("/classes/microsoft-office/");
    expect(
      (
        await request(
          `/v1/courses/microsoft-office/lessons/${lesson.id}/complete`,
          "POST",
          {},
          learner,
        )
      ).status,
    ).toBe(200);
    await activateTuition(runtime, ref);
    const enrollment = await env.DB.prepare(
      "SELECT pct FROM enrollments WHERE user_id=? AND course_slug='microsoft-office'",
    )
      .bind(learner.session.user.id)
      .first<any>();
    expect(enrollment.pct).toBeGreaterThan(0);
  });
  it("takes a paid learner through a real assignment, submission and founder feedback", async () => {
    const ref = await ready();
    const payment = await json(await pay(ref));
    await markPayment(ctx, payment.reference, "success", 1500000);
    const title = `Office practical ${crypto.randomUUID()}`;
    const published = await request(
      "/v1/instructor/assignments",
      "POST",
      {
        courseSlug: "microsoft-office",
        title,
        description: "Create a formatted one-page letter and explain your layout choices.",
        dueAt: `${date(21)}T12:00:00.000Z`,
        max: 100,
        notify: false,
      },
      admin,
    );
    expect(published.status).toBe(201);
    const group = (await json(published)).groupId;
    const assignment = await env.DB.prepare(
      "SELECT id FROM assignments WHERE group_id=? AND user_id=?",
    )
      .bind(group, learner.session.user.id)
      .first<any>();
    expect(assignment).toBeTruthy();
    const submitted = await request(
      `/v1/assignments/${assignment.id}/submit`,
      "POST",
      { body: "TEST learner work: consistent margins and clear headings." },
      learner,
    );
    expect(submitted.status).toBe(201);
    const submission = (await json(submitted)).id;
    const graded = await request(
      `/v1/instructor/submissions/${submission}`,
      "PATCH",
      {
        score: 80,
        feedback:
          "Clear structure. Adjust the final paragraph spacing and resubmit in the next practice task.",
      },
      admin,
    );
    expect(graded.status).toBe(200);
    const feedback = await json(
      await request(`/v1/assignments/${assignment.id}/submission`, "GET", undefined, learner),
    );
    expect(feedback.feedback).toContain("Clear structure");
    expect(feedback.score).toBe(80);
    expect(
      (await request(`/v1/assignments/${assignment.id}/submission`, "GET", undefined, stranger))
        .status,
    ).toBe(404);
  });
  it("pending verification is not success and wrong-currency webhooks cannot credit tuition", async () => {
    const ref = await ready();
    const payment = await json(await pay(ref));
    const pending = await json(
      await request(
        `/v1/enrollments/${ref}/payments/verify?reference=${payment.reference}`,
        "GET",
        undefined,
        learner,
      ),
    );
    expect(pending.verified).toBe(false);
    expect(pending.status).toBe("pending");
    await request("/v1/enrollments/webhook", "POST", {
      event: "charge.success",
      data: { id: 99177, reference: payment.reference, amount: 1500000, currency: "USD" },
    });
    expect((await state(ref)).payment.paidAmount).toBe(0);
  });
  it("preserves legacy opening credits while adding later verified payments", async () => {
    const ref = await ready();
    await env.DB.prepare(
      "UPDATE registrations SET paid_amount=5000, opening_paid_amount=NULL WHERE ref=?",
    )
      .bind(ref)
      .run();
    const payment = await json(await pay(ref, "full"));
    expect(payment.amount).toBe(25000);
    await markPayment(ctx, payment.reference, "success", 2500000);
    await markPayment(ctx, payment.reference, "success", 2500000);
    expect((await state(ref)).payment.paidAmount).toBe(30000);
  });
  it("allows only one of two concurrent proofs to claim the same bank credit", async () => {
    const a = await ready(),
      b = await ready();
    const pa = await proof(a),
      pb = await proof(b);
    const bankReference = `CROSS-${crypto.randomUUID()}`;
    const responses = await Promise.all(
      [pa, pb].map((id) =>
        request(
          `/v1/enrollments/payment-proofs/${id}/confirm`,
          "POST",
          { bankReference, receivedAmount: 15000 },
          finance,
        ),
      ),
    );
    expect(responses.map((r) => r.status).sort()).toEqual([200, 409]);
    expect((await state(a)).payment.paidAmount + (await state(b)).payment.paidAmount).toBe(15000);
  });
  it("never allows conflicting confirmation evidence to overwrite the first bank review", async () => {
    const ref = await ready(),
      id = await proof(ref);
    const responses = await Promise.all(
      [15000, 16000].map((receivedAmount) =>
        request(
          `/v1/enrollments/payment-proofs/${id}/confirm`,
          "POST",
          { bankReference: `EVIDENCE-${id}`, receivedAmount },
          finance,
        ),
      ),
    );
    expect(responses.map((r) => r.status).sort()).toEqual([200, 409]);
    expect([15000, 16000]).toContain((await state(ref)).payment.paidAmount);
    const count = await env.DB.prepare(
      "SELECT COUNT(*) AS n FROM registration_payments WHERE registration_ref=? AND status='success'",
    )
      .bind(ref)
      .first<any>();
    expect(count.n).toBe(1);
  });
  it("settles a confirm-versus-reject race once, without an abandoned bank-review lock", async () => {
    const ref = await ready(),
      id = await proof(ref);
    const responses = await Promise.all([
      request(
        `/v1/enrollments/payment-proofs/${id}/confirm`,
        "POST",
        { bankReference: `RACE-${id}`, receivedAmount: 15000 },
        finance,
      ),
      request(
        `/v1/enrollments/payment-proofs/${id}/reject`,
        "POST",
        { reason: "Independently checked: no matching credit." },
        admin,
      ),
    ]);
    expect(responses.map((r) => r.status).sort()).toEqual([200, 409]);
    const record = await env.DB.prepare("SELECT status FROM payment_proofs WHERE id=?")
      .bind(id)
      .first<any>();
    expect((await state(ref)).payment.paidAmount).toBe(record.status === "confirmed" ? 15000 : 0);
    const pending = await env.DB.prepare(
      "SELECT COUNT(*) AS n FROM registration_payments WHERE proof_id=? AND status='pending'",
    )
      .bind(id)
      .first<any>();
    expect(pending.n).toBe(0);
  });
  it("records exact bank kobo without rounding a short payment into a paid deposit", async () => {
    const ref = await ready(),
      id = await proof(ref);
    expect(
      (
        await request(
          `/v1/enrollments/payment-proofs/${id}/confirm`,
          "POST",
          { bankReference: `KOBO-${id}`, receivedAmount: 14999.5 },
          finance,
        )
      ).status,
    ).toBe(200);
    const status = await state(ref);
    expect(status.payment.paidAmount).toBe(14999.5);
    expect(status.learning.active).toBe(false);
  });
  it("blocks late original balance dates, but allows audited fee-free extensions without rewriting the offer", async () => {
    const ref = await create(),
      c = await cohort();
    expect(
      (
        await request(
          `/v1/enrollments/${ref}/offer`,
          "POST",
          {
            cohortId: c,
            balanceDueAt: `${date(39)}T09:00:00.000Z`,
            equipment: "TEST equipment available with home practice agreed.",
            eligibilityConfirmed: true,
          },
          admin,
        )
      ).status,
    ).toBe(400);
    const paid = await ready();
    const payment = await json(await pay(paid));
    await markPayment(ctx, payment.reference, "success", 1500000);
    const original = (await state(paid)).offer.balanceDueAt;
    const dueAt = `${date(45)}T09:00:00.000Z`;
    const input = {
      previousDueAt: original,
      dueAt,
      reason: "Owner agreed a later payment date; no additional fees.",
    };
    expect(
      (await request(`/v1/enrollments/${paid}/balance-extension`, "POST", input, learner)).status,
    ).toBe(403);
    expect(
      (
        await request(
          `/v1/enrollments/${paid}/balance-extension`,
          "POST",
          { ...input, dueAt: `${date(25)}T09:00:00.000Z` },
          admin,
        )
      ).status,
    ).toBe(409);
    expect(
      (await request(`/v1/enrollments/${paid}/balance-extension`, "POST", input, admin)).status,
    ).toBe(200);
    expect((await state(paid)).offer.balanceDueAt).toBe(dueAt);
    const history = await env.DB.prepare(
      "SELECT snapshot FROM tuition_offer_history WHERE registration_ref=?",
    )
      .bind(paid)
      .first<any>();
    expect(JSON.parse(history.snapshot).balanceDueAt).toBe(original);
    expect((await state(paid)).feeTotal).toBe(30000);
  });
  it("refuses stage-based offers and cancellation while money is pending or settled", async () => {
    const ref = await ready();
    expect(
      (await request(`/v1/enrollments/${ref}`, "PATCH", { stage: "offer" }, admin)).status,
    ).toBe(409);
    const payment = await json(await pay(ref));
    expect(
      (await request(`/v1/enrollments/${ref}`, "PATCH", { stage: "declined" }, admin)).status,
    ).toBe(409);
    await markPayment(ctx, payment.reference, "success", 1500000);
    expect(
      (await request(`/v1/enrollments/${ref}`, "PATCH", { stage: "declined" }, admin)).status,
    ).toBe(409);
    expect(
      (await json(await request(`/v1/applications/${ref}`, "GET", undefined, learner))).status,
    ).toBe("enrolled");
  });
  it("treats invalid provider replies and network failure as unknown, never as payment success", async () => {
    const fetcher = vi.spyOn(globalThis, "fetch");
    const provider = { PAYSTACK_SECRET_KEY: "test-not-a-real-key" };
    try {
      for (const data of [
        { reference: "ref-test", currency: "USD", amount: 1500000, status: "success" },
        { reference: "other", currency: "NGN", amount: 1500000, status: "success" },
        { reference: "ref-test", currency: "NGN", amount: 1.2, status: "success" },
      ]) {
        fetcher.mockResolvedValueOnce(
          new Response(JSON.stringify({ status: true, data }), { status: 200 }),
        );
        expect(await verifyPaystackTransaction(provider, "ref-test")).toBeNull();
      }
      fetcher.mockRejectedValueOnce(new Error("Test timeout"));
      expect(await verifyPaystackTransaction(provider, "ref-test")).toBeNull();
      fetcher.mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            status: true,
            data: { reference: "ref-test", currency: "NGN", amount: 1500000, status: "success" },
          }),
          { status: 200 },
        ),
      );
      expect(await verifyPaystackTransaction(provider, "ref-test")).toEqual({
        status: "success",
        amount: 1500000,
      });
      expect(fetcher.mock.calls[0]?.[1]?.signal).toBeDefined();
    } finally {
      fetcher.mockRestore();
    }
  });
  it("does not nudge interest-only applications to pay", async () => {
    const ref = await create();
    await env.DB.prepare("UPDATE registrations SET created_at=? WHERE ref=?")
      .bind(new Date(Date.now() - 2 * 86400000).toISOString(), ref)
      .run();
    await enrollmentReminders(runtime);
    const reminder = await env.DB.prepare(
      "SELECT id FROM registration_events WHERE registration_ref=? AND event='reminder_unpaid'",
    )
      .bind(ref)
      .first();
    expect(reminder).toBeNull();
  });
  it("keeps undelivered email retryable and exposes one owner-only worklist", async () => {
    await deliverTuitionNotifications({
      ...runtime,
      APP_ENV: "production",
      EMAIL_PROVIDER: "resend",
      EMAIL_API_KEY: "",
    });
    const count = await env.DB.prepare(
      "SELECT COUNT(*) AS n FROM tuition_notifications WHERE sent_at IS NULL",
    ).first<any>();
    expect(count.n).toBeGreaterThan(0);
    expect((await request("/v1/enrollments/admin/worklist", "GET", undefined, admin)).status).toBe(
      200,
    );
    expect(
      (await request("/v1/enrollments/admin/worklist", "GET", undefined, learner)).status,
    ).toBe(403);
  });
});
