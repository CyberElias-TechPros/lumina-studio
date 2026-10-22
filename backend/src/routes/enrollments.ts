/**
 * Enrollment funnel v2 — public registration for short courses and
 * long-form trainings, with Paystack deposit/full-fee collection, an
 * event timeline, and mirroring into the existing `applications`
 * pipeline so the admissions workspace keeps working untouched.
 *
 * Public routes (no session):
 *   POST /v1/enrollments                    create enrollment
 *   POST /v1/enrollments/:ref/payments      start a Paystack session
 *   POST /v1/enrollments/:ref/payments/transfer  report a bank transfer (proof)
 *   GET  /v1/enrollments/:ref/payments/verify  verify after redirect
 *   POST /v1/enrollments/webhook            Paystack webhook (HMAC)
 *   GET  /v1/enrollments/:ref               applicant status page
 * Admin (admissions / finance / admin):
 *   GET  /v1/enrollments/admin
 *   PATCH /v1/enrollments/:ref
 */
import { Hono } from "hono";
import { verifyTurnstile } from "../lib/turnstile";
import { verifyPaystackTransaction } from "../lib/paystack";
import { recordWebhookEvent } from "../lib/webhooks";
import type { AppEnv } from "../types";
import { z } from "zod";
import { ApiError } from "../lib/errors";
import { parseBody } from "../lib/validate";
import { requireAuth, requireAnyRole, requireFinance } from "../lib/auth";
import {
  base64UrlDecode,
  hmacSha512Hex,
  isoNow,
  randomToken,
  sha256Hex,
  timingSafeEqualHex,
} from "../lib/crypto";
import { normalizeEmail } from "../db/client";
import { paginate, parsePagination } from "../lib/pagination";
import { hashIdentifier, rateLimit } from "../lib/rate-limit";
import { isTrustedOrigin } from "../lib/origin";
import { escapeHtml } from "../lib/email-templates";
import { PROGRAMS } from "../lib/tuition-offers.generated";
import {
  TUITION_POLICY,
  TUITION_STAFF,
  PLACEMENT_STAFF,
  requireApplicantAccess,
  assertCheckout,
  checkoutEligibility,
  activateTuition,
  notificationStatement,
  type TuitionRow,
} from "../lib/tuition";
import { markTuitionPayment } from "../lib/tuition-payments";
import { tuitionWorklist } from "./tuition-worklist";

export const ENROLLMENT_STAGES = [
  { key: "submitted", label: "Application received" },
  { key: "screening", label: "Screening" },
  { key: "assessment", label: "Assessment" },
  { key: "interview", label: "Interview" },
  { key: "offer", label: "Offer" },
  { key: "enrolled", label: "Enrolled" },
] as const;

export type EnrollmentStage = (typeof ENROLLMENT_STAGES)[number]["key"] | "declined";

const STAGE_ORDER: EnrollmentStage[] = [
  "submitted",
  "screening",
  "assessment",
  "interview",
  "offer",
  "enrolled",
];

/** Short courses: 50% holds the seat; long-form: 30% deposit. */
function depositFor(kind: "short" | "long", fee: number): number {
  return kind === "short" ? Math.round(fee / 2) : Math.round(fee * 0.3);
}

/** Total payable after plan discounts (10% off paying a long-form fee in full). */
export function feeDueFor(kind: "short" | "long", fee: number, plan: string): number {
  if (kind === "long" && plan === "full-10-off") return Math.round(fee * 0.9);
  return fee;
}

const createEnrollmentSchema = z.object({
  programSlug: z.string().trim().min(1, "Choose a course or training.").max(80),
  // schedule
  scheduleDays: z.enum(["standard", "mwf", "tss"]).default("standard"),
  timeSlot: z.enum(["morning", "afternoon", "evening", "any"]).default("any"),
  mode: z.enum(["onsite", "online", "hybrid"]).default("onsite"),
  preferredStart: z.string().trim().max(40).optional(),
  // student
  firstName: z.string().trim().min(2, "Enter your first name.").max(60),
  lastName: z.string().trim().min(2, "Enter your last name.").max(60),
  email: z.string().trim().email("Enter a valid email address.").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s\-()]{7,20}$/, "Enter a valid phone number.")
    .max(30),
  city: z.string().trim().min(2, "Enter your city or state.").max(80),
  birthYear: z.number().int().min(1940).max(2012).optional(),
  gender: z.enum(["female", "male", "other", "prefer-not"]).optional(),
  educationLevel: z.string().trim().max(120).optional(),
  experienceLevel: z.string().trim().max(200).optional(),
  goal: z.string().trim().max(600).optional(),
  employer: z.string().trim().max(120).optional(),
  hasLaptop: z.boolean().default(true),
  referredBy: z.string().trim().max(120).optional(),
  // payment
  paymentPlan: z.enum(["full", "50-50", "deposit-monthly", "full-10-off"]).default("full"),
  paymentMethod: z.enum(["paystack", "bank-transfer"]).default("paystack"),
  // consent
  consentPrivacy: z.literal(true, { message: "You must accept the privacy policy." }),
  consentTerms: z.literal(true, { message: "You must accept the terms of sale." }),
  consentWhatsApp: z.boolean().default(false),
  turnstileToken: z.string().max(2000).optional(),
  submissionKey: z.string().uuid().optional(),
  policyVersion: z.literal(TUITION_POLICY.version).optional(),
});

function newRef(): string {
  const year = new Date().getFullYear();
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  const suffix = Array.from(bytes, (byte) => chars[byte % chars.length]).join("");
  return `CEA-${year}-${suffix}`;
}

function nextSteps(ref: string): string[] {
  return [
    `Keep your application reference: ${ref}. Sign in with the same email to return securely.`,
    TUITION_POLICY.support,
    "Review and accept your confirmed timetable, equipment arrangement and fee before paying. No offer means no payment request.",
    "After verified payment, use your application page to see your receipt, balance and learner access.",
  ];
}

const ACADEMY_WHATSAPP = "2349058628386";

async function logEvent(db: AppEnv["DB"], ref: string, event: string, detail = ""): Promise<void> {
  await db
    .prepare(
      `INSERT INTO registration_events (id, registration_ref, event, detail, at) VALUES (?, ?, ?, ?, ?)`,
    )
    .bind(crypto.randomUUID(), ref, event, detail, isoNow())
    .run();
}

/**
 * Free-service automation (docs/enrollment-automation.md §4): push each new
 * registration to a Google Sheet through an Apps Script web app. No-op when
 * GOOGLE_SHEET_WEBHOOK_URL is not set. Best-effort and detached via
 * waitUntil — a slow or failing mirror never blocks or fails the registration.
 */
function mirrorLeadToSheet(
  c: { env: AppEnv; executionCtx?: { waitUntil: (p: Promise<unknown>) => void } },
  url: string | undefined,
  payload: Record<string, unknown>,
): void {
  if (!url) return;
  const promise = fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      if (!res.ok) console.warn(`[leads] sheet mirror HTTP ${res.status}`);
    })
    .catch((err) => console.warn("[leads] sheet mirror failed", err));
  c.executionCtx?.waitUntil(promise);
}

interface EnrollmentRow extends TuitionRow {
  id: string;
  ref: string;
  program_slug: string;
  program_kind: "short" | "long";
  program_title: string;
  fee_total: number;
  schedule_days: string;
  time_slot: string;
  mode: string;
  preferred_start: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city: string;
  birth_year: number | null;
  gender: string | null;
  education_level: string | null;
  experience_level: string | null;
  goal: string | null;
  employer: string | null;
  has_laptop: number;
  referred_by: string | null;
  payment_plan: string;
  payment_method: string;
  deposit_amount: number;
  payment_status: string;
  payment_ref: string | null;
  paid_amount: number;
  paid_at: string | null;
  stage: string;
  note: string;
  turnstile_passed: number;
  source_ip: string | null;
  created_at: string;
  updated_at: string;
}

function publicEnrollment(
  row: EnrollmentRow,
  events: { event: string; detail: string; at: string }[],
) {
  const feeDue = feeDueFor(row.program_kind, row.fee_total, row.payment_plan);
  return {
    ref: row.ref,
    stage: row.stage,
    programSlug: row.program_slug,
    programTitle: row.program_title,
    programKind: row.program_kind,
    feeTotal: row.fee_total,
    feeDue,
    schedule: {
      days: row.schedule_days,
      timeSlot: row.time_slot,
      mode: row.mode,
      preferredStart: row.preferred_start,
    },
    payment: {
      plan: row.payment_plan,
      method: row.payment_method,
      status: row.payment_status,
      depositAmount: row.deposit_amount,
      paidAmount: row.paid_amount,
      amountDue: Math.max(0, feeDue - row.paid_amount),
      paidAt: row.paid_at,
      reference: row.payment_ref,
    },
    events,
    nextSteps: nextSteps(row.ref),
    contact: {
      phone: `+${ACADEMY_WHATSAPP}`,
      whatsapp: `https://wa.me/${ACADEMY_WHATSAPP}?text=${encodeURIComponent(
        `Hello Cyber Elias Academy! I just applied (${row.ref}).`,
      )}`,
      email: "help@cea.ng",
      address: "24 Ebony Road, Off Rumuola Road, Port Harcourt",
      hours: "Mon–Sat, 8:00–20:00 WAT",
    },
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export const enrollments = new Hono<{ Bindings: AppEnv }>();
enrollments.use("*", async (c, next) => {
  c.header("Cache-Control", "private, no-store");
  c.header("Referrer-Policy", "no-referrer");
  await next();
});
enrollments.route("/", tuitionWorklist);

/** Free application; no payment or place is implied. Stable retry key prevents duplicate leads. */
enrollments.post("/", async (c) => {
  const input = await parseBody(c, createEnrollmentSchema);
  const ip = c.req.header("CF-Connecting-IP") ?? "unknown";
  await rateLimit(c.env.RATE_LIMIT, "enrollments", await hashIdentifier(ip), {
    limit: 10,
    windowSeconds: 3600,
  });
  const program = PROGRAMS[input.programSlug];
  if (!program) throw new ApiError(400, "PROGRAM_NOT_FOUND", "Choose a course from the catalogue.");
  const validPlans =
    program.kind === "short" ? ["full", "50-50"] : ["deposit-monthly", "full-10-off"];
  if (!validPlans.includes(input.paymentPlan))
    throw ApiError.validation({ paymentPlan: ["Choose a payment plan for this course."] });
  const email = normalizeEmail(input.email);
  const fingerprint = await sha256Hex(
    JSON.stringify({ ...input, email, submissionKey: undefined, turnstileToken: undefined }),
  );
  const result = (row: { ref: string }) => ({
    enrollment: {
      ref: row.ref,
      status: "submitted",
      stage: "submitted",
      requiresOffer: true,
      payment: {
        plan: input.paymentPlan,
        method: input.paymentMethod,
        status: "unpaid",
        depositAmount: depositFor(program.kind, program.fee),
        feeTotal: program.fee,
        feeDue: feeDueFor(program.kind, program.fee, input.paymentPlan),
      },
      policyVersion: TUITION_POLICY.version,
      nextSteps: nextSteps(row.ref),
      trackUrl: `/apply/status/${row.ref}`,
    },
  });
  const replay = async () => {
    if (!input.submissionKey) return null;
    const existing = await c.env.DB.prepare(
      "SELECT ref, submission_hash FROM registrations WHERE submission_key = ?",
    )
      .bind(input.submissionKey)
      .first<{ ref: string; submission_hash: string }>();
    if (existing && existing.submission_hash !== fingerprint)
      throw new ApiError(
        409,
        "SUBMISSION_CHANGED",
        "This retry key belongs to different application details. Start a fresh submission.",
      );
    return existing;
  };
  const existing = await replay();
  if (existing) return c.json(result(existing), 200);
  const turnstilePassed = (await verifyTurnstile(c, input.turnstileToken, ip)) ? 1 : 0;
  const now = isoNow();
  const ref = newRef();
  const id = crypto.randomUUID();
  const deposit = depositFor(program.kind, program.fee);
  const fullName = `${input.firstName} ${input.lastName}`;
  try {
    await c.env.DB.batch([
      c.env.DB.prepare(
        `INSERT INTO registrations
        (id, ref, program_slug, program_kind, program_title, fee_total, schedule_days, time_slot, mode, preferred_start,
         first_name, last_name, email, phone, city, birth_year, gender, education_level, experience_level, goal, employer, has_laptop, referred_by,
         payment_plan, payment_method, deposit_amount, turnstile_passed, source_ip, created_at, updated_at,
         policy_version, consent_at, consent_whatsapp, submission_key, submission_hash)
        VALUES (${Array(35).fill("?").join(",")})`,
      ).bind(
        id,
        ref,
        input.programSlug,
        program.kind,
        program.title,
        program.fee,
        input.scheduleDays,
        input.timeSlot,
        input.mode,
        input.preferredStart ?? null,
        input.firstName,
        input.lastName,
        email,
        input.phone,
        input.city,
        input.birthYear ?? null,
        input.gender ?? null,
        input.educationLevel ?? null,
        input.experienceLevel ?? null,
        input.goal ?? null,
        input.employer ?? null,
        Number(input.hasLaptop),
        input.referredBy ?? null,
        input.paymentPlan,
        input.paymentMethod,
        deposit,
        turnstilePassed,
        ip,
        now,
        now,
        TUITION_POLICY.version,
        now,
        Number(input.consentWhatsApp),
        input.submissionKey ?? null,
        fingerprint,
      ),
      c.env.DB.prepare(
        `INSERT INTO applications (id, ref, full_name, email, phone, city, program_slug, experience, status, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, (SELECT slug FROM programs WHERE slug = ?), ?, 'submitted', ?, ?)`,
      ).bind(
        crypto.randomUUID(),
        ref,
        fullName,
        email,
        input.phone,
        input.city,
        input.programSlug,
        input.goal ?? "",
        now,
        now,
      ),
      c.env.DB.prepare(
        `INSERT INTO registration_events (id, registration_ref, event, detail, at) VALUES (?, ?, 'submitted', ?, ?)`,
      ).bind(crypto.randomUUID(), ref, `${program.title} · no payment requested`, now),
      notificationStatement(c.env.DB, {
        id: `application:${ref}`,
        ref,
        to: email,
        subject: `Application received — ${ref}`,
        html: `<p>Hi ${escapeHtml(input.firstName)},</p><p>We received your free application for ${escapeHtml(program.title)}. Reference: <strong>${ref}</strong>.</p><p>${TUITION_POLICY.application}</p><p>${TUITION_POLICY.support}</p><p>Sign in using this email to <a href="${escapeHtml((c.env.APP_URL || "https://www.cea.ng").replace(/\/+$/, ""))}/apply/status/${ref}">track your application</a>. Your quote uses policy ${TUITION_POLICY.version}; no class date or equipment is promised until your offer.</p>`,
      }),
    ]);
  } catch (error) {
    const retry = await replay();
    if (retry) return c.json(result(retry), 200);
    throw error;
  }
  mirrorLeadToSheet(c, c.env.GOOGLE_SHEET_WEBHOOK_URL, {
    ref,
    createdAt: now,
    fullName,
    email,
    phone: input.phone,
    programTitle: program.title,
    feeTotal: program.fee,
    stage: "submitted",
    paymentStatus: "unpaid",
  });
  return c.json(result({ ref }), 201);
});

/** Allowed payment kinds per plan, and the exact amount for each. */
function expectedAmount(row: EnrollmentRow, kind: "deposit" | "full" | "balance"): number {
  const remaining = Math.max(
    0,
    Math.round(
      (feeDueFor(row.program_kind, row.fee_total, row.payment_plan) - row.paid_amount) * 100,
    ) / 100,
  );
  if (!remaining) throw new ApiError(409, "ALREADY_PAID", "No further tuition is due.");
  if (kind === "deposit") {
    if (!["50-50", "deposit-monthly"].includes(row.payment_plan))
      throw ApiError.validation({ kind: ["This plan does not use a deposit."] });
    const deposit = Math.min(remaining, Math.max(0, row.deposit_amount - row.paid_amount));
    if (!deposit)
      throw ApiError.validation({ kind: ["Your deposit is paid. Choose remaining balance."] });
    return deposit;
  }
  if (kind === "balance" && row.paid_amount <= 0)
    throw ApiError.validation({ kind: ["Choose the full fee or initial deposit first."] });
  return remaining;
}

/** POST /:ref/payments — public. Creates a Paystack session for deposit or full fee. */
enrollments.post("/:ref/payments", requireAuth, async (c) => {
  const ip = c.req.header("CF-Connecting-IP") ?? c.req.header("x-forwarded-for") ?? "unknown";
  await rateLimit(c.env.RATE_LIMIT, "enroll-pay", await hashIdentifier(ip), {
    limit: 10,
    windowSeconds: 3600,
  });
  const body = (await c.req.json().catch(() => null)) as {
    kind?: unknown;
    checkoutKey?: unknown;
  } | null;
  const kind = body?.kind;
  if (kind !== "deposit" && kind !== "full" && kind !== "balance") {
    throw ApiError.validation({ kind: ["Choose deposit, full fee or remaining balance."] });
  }
  const ref = c.req.param("ref").toUpperCase();
  const row = await c.env.DB.prepare(`SELECT * FROM registrations WHERE ref = ?`)
    .bind(ref)
    .first<EnrollmentRow>();
  if (!row) throw ApiError.notFound("No enrollment found with that reference.");
  await requireApplicantAccess(c, ref);
  await assertCheckout(c.env.DB, row);
  if (row.payment_status === "paid") {
    throw new ApiError(409, "ALREADY_PAID", "This enrollment is already fully paid.");
  }

  const secret = c.env.PAYSTACK_SECRET_KEY;
  if (!secret && c.env.APP_ENV !== "test" && c.env.APP_ENV !== "development") {
    throw new ApiError(
      503,
      "PAYMENT_PROVIDER_UNAVAILABLE",
      "Online payment is unavailable. Do not send money until your payment method is confirmed.",
    );
  }
  const checkoutKey =
    typeof body?.checkoutKey === "string" && /^[a-zA-Z0-9-]{16,80}$/.test(body.checkoutKey)
      ? body.checkoutKey
      : null;
  const pending = await c.env.DB.prepare(
    `SELECT reference, kind, amount, authorization_url, checkout_key, status FROM registration_payments
    WHERE registration_ref = ? AND (status = 'pending' OR (? IS NOT NULL AND checkout_key = ?)) ORDER BY created_at DESC LIMIT 1`,
  )
    .bind(ref, checkoutKey, checkoutKey)
    .first<{
      reference: string;
      kind: string;
      amount: number;
      authorization_url: string | null;
      checkout_key: string | null;
      status: string;
    }>();
  if (pending) {
    if (
      pending.status === "pending" &&
      pending.checkout_key === checkoutKey &&
      checkoutKey &&
      pending.kind === kind &&
      pending.authorization_url
    ) {
      return c.json(
        {
          reference: pending.reference,
          authorizationUrl: pending.authorization_url,
          amount: pending.amount,
          mock: !secret,
        },
        200,
      );
    }
    throw new ApiError(
      409,
      "PAYMENT_ALREADY_STARTED",
      "A payment attempt already exists. Check its status before starting another payment.",
    );
  }
  const amount = expectedAmount(row, kind);
  const reference = `cea_enr_${randomToken(8)}`;
  const attempt = await c.env.DB.prepare(
    `INSERT INTO registration_payments (id, registration_ref, reference, kind, amount, status, created_at, checkout_key)
     SELECT ?, ?, ?, ?, ?, 'pending', ?, ? WHERE NOT EXISTS
       (SELECT 1 FROM registration_payments WHERE registration_ref = ? AND status = 'pending')
       AND NOT EXISTS (SELECT 1 FROM payment_proofs WHERE registration_ref = ? AND status = 'pending_review')
       AND EXISTS (SELECT 1 FROM registrations r JOIN cohorts c ON c.id = r.cohort_id
         WHERE r.ref = ? AND r.paid_amount = ? AND r.offer_version = ? AND r.accepted_offer_version = r.offer_version
           AND r.stage != 'declined' AND c.status IN ('scheduled','running')
           AND (r.offer_status = 'confirmed' OR (r.offer_status = 'held' AND r.offer_expires_at > ?)))`,
  )
    .bind(
      crypto.randomUUID(),
      ref,
      reference,
      kind,
      amount,
      isoNow(),
      checkoutKey,
      ref,
      ref,
      ref,
      row.paid_amount,
      row.offer_version,
      isoNow(),
    )
    .run();
  if (!attempt.meta.changes)
    throw new ApiError(
      409,
      "PAYMENT_ALREADY_STARTED",
      "Another payment is pending. Check its status before paying again.",
    );
  await c.env.DB.prepare(`UPDATE registrations SET payment_ref = ?, updated_at = ? WHERE id = ?`)
    .bind(reference, isoNow(), row.id)
    .run();

  if (!secret) {
    const authorizationUrl = `${(c.env.APP_URL || "http://localhost:3000").replace(/\/+$/, "")}/apply/pay?reference=${reference}&enrollment=${ref}&mock=1`;
    await c.env.DB.prepare(
      "UPDATE registration_payments SET authorization_url = ? WHERE reference = ?",
    )
      .bind(authorizationUrl, reference)
      .run();
    return c.json({ reference, authorizationUrl, mock: true, amount }, 201);
  }

  // Redirect back to the pay-return page when the origin is trusted.
  // `enrollment` is our own param (Paystack only appends `reference`, which
  // equals the value we initialized with).
  let callbackUrl = "";
  const appOrigin = new URL(c.env.APP_URL || "https://www.cea.ng");
  const candidate = `${appOrigin.origin}/apply/pay?reference=${reference}&enrollment=${encodeURIComponent(ref)}`;
  if (isTrustedOrigin(appOrigin.origin, c.env)) callbackUrl = candidate;

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    signal: AbortSignal.timeout(15000),
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: row.email,
      amount: amount * 100,
      currency: "NGN",
      reference,
      callback_url: callbackUrl || undefined,
      metadata: {
        custom_fields: [
          { display_name: "Enrollment", value: ref },
          { display_name: "Item", value: `${escapeHtml(row.program_title)} — ${kind}` },
        ],
      },
    }),
  }).catch(() => null);
  const payload = (await res?.json().catch(() => null)) as {
    status?: boolean;
    data?: { authorization_url?: string; access_code?: string };
  } | null;
  if (!res?.ok || !payload?.status || !payload.data?.authorization_url) {
    throw new ApiError(
      502,
      "PAYMENT_PROVIDER_ERROR",
      "Paystack could not initialize the transaction.",
    );
  }
  await c.env.DB.prepare(
    "UPDATE registration_payments SET authorization_url = ? WHERE reference = ?",
  )
    .bind(payload.data.authorization_url, reference)
    .run();
  return c.json(
    {
      reference,
      authorizationUrl: payload.data.authorization_url,
      accessCode: payload.data.access_code,
      mock: false,
      amount,
    },
    201,
  );
});

const transferProofSchema = z.object({
  kind: z.enum(["deposit", "full", "balance"]),
  /** NGN the student says they sent — the reviewer sees expected vs sent. */
  amount: z
    .number()
    .min(0.01)
    .max(1_000_000)
    .refine((value) => Math.round(value * 100) / 100 === value, "Use at most two decimal places."),
  senderName: z.string().trim().min(2, "Enter the name on the transfer.").max(80),
  bankName: z.string().trim().max(60).optional(),
  bankReference: z.string().trim().max(80).optional(),
  /** YYYY-MM-DD the transfer left the student's bank. */
  paidOn: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD.")
    .optional(),
  note: z.string().trim().max(500).optional(),
  receiptUrl: z
    .string()
    .trim()
    .url("Enter a valid link.")
    .max(300)
    .refine((v) => v.startsWith("https://"), "Use an HTTPS receipt link.")
    .optional(),
});

/**
 * POST /:ref/payments/transfer — public.
 *
 * Captures a bank-transfer claim (UBA 1028649972) and parks it in
 * `pending_review`. Nothing here marks money as received: confirmation is a
 * signed-in admin/finance action, deliberately, because a screenshot is not
 * proof of settlement.
 */
enrollments.post("/:ref/payments/transfer", requireAuth, async (c) => {
  const ip = c.req.header("CF-Connecting-IP") ?? c.req.header("x-forwarded-for") ?? "unknown";
  await rateLimit(c.env.RATE_LIMIT, "enroll-transfer", await hashIdentifier(ip), {
    limit: 6,
    windowSeconds: 3600,
  });
  const ref = c.req.param("ref").toUpperCase();
  const row = await c.env.DB.prepare(`SELECT * FROM registrations WHERE ref = ?`)
    .bind(ref)
    .first<EnrollmentRow>();
  if (!row) throw ApiError.notFound("No enrollment found with that reference.");
  await requireApplicantAccess(c, ref);
  await assertCheckout(c.env.DB, row);
  if (row.payment_status === "paid") {
    throw new ApiError(409, "ALREADY_PAID", "This enrollment is already paid in full.");
  }
  const pending = await c.env.DB.prepare(
    "SELECT 1 AS x FROM registration_payments WHERE registration_ref = ? AND status = 'pending'",
  )
    .bind(ref)
    .first();
  if (pending)
    throw new ApiError(
      409,
      "PAYMENT_ALREADY_STARTED",
      "Check your existing online payment before reporting a transfer.",
    );
  const input = await parseBody(c, transferProofSchema);
  const expected = expectedAmount(row, input.kind);
  const now = isoNow();

  const id = crypto.randomUUID();
  const claim = await c.env.DB.prepare(
    `INSERT INTO payment_proofs (id, registration_ref, registration_id, kind, amount, expected_amount,
       sender_name, bank_name, bank_reference, paid_on, note, receipt_url, status, submitted_at)
     SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending_review', ?
     WHERE NOT EXISTS (SELECT 1 FROM payment_proofs WHERE registration_ref = ? AND status = 'pending_review')
       AND NOT EXISTS (SELECT 1 FROM registration_payments WHERE registration_ref = ? AND status = 'pending')`,
  )
    .bind(
      id,
      ref,
      row.id,
      input.kind,
      input.amount,
      expected,
      input.senderName,
      input.bankName ?? null,
      input.bankReference ?? null,
      input.paidOn ?? null,
      input.note ?? null,
      input.receiptUrl ?? null,
      now,
      ref,
      ref,
    )
    .run();
  if (!claim.meta.changes)
    throw new ApiError(
      409,
      "PAYMENT_ALREADY_STARTED",
      "A payment is already awaiting confirmation. Do not report or send it again.",
    );

  // NOTE: registrations.payment_status intentionally stays untouched — its
  // CHECK constraint only allows unpaid/deposit_paid/paid/failed, and a claim
  // is not a payment state. The proof row above IS the review state, surfaced
  // to the student as payment.review on the status endpoint.
  await logEvent(
    c.env.DB,
    ref,
    "transfer_proof_received",
    `${input.kind} transfer of ${input.amount} NGN reported (expected ${expected})`,
  );

  // Tell the office (reply-able inbox) and reassure the student. Failure to
  // send must not fail the submission — the row is already saved.
  try {
    await notificationStatement(c.env.DB, {
      id: `transfer-office:${id}`,
      ref,
      to: c.env.CONTACT_INBOX || c.env.EMAIL_REPLY_TO || "help@cea.ng",
      subject: `Bank transfer reported — ${ref} (${input.kind})`,
      html: `<p><strong>${escapeHtml(input.senderName)}</strong> reports a bank transfer for <strong>${escapeHtml(row.program_title)}</strong>.</p>
        <ul>
          <li>Enrollment: <strong>${ref}</strong></li>
          <li>Amount: ₦${input.amount.toLocaleString("en-NG")} (expected ₦${expected.toLocaleString("en-NG")})</li>
          ${input.bankName ? `<li>Bank: ${escapeHtml(input.bankName)}</li>` : ""}
          ${input.bankReference ? `<li>Bank reference: ${escapeHtml(input.bankReference)}</li>` : ""}
          ${input.paidOn ? `<li>Paid on: ${input.paidOn}</li>` : ""}
          ${input.receiptUrl ? `<li>Receipt: <a href="${escapeHtml(input.receiptUrl)}">${escapeHtml(input.receiptUrl)}</a></li>` : ""}
          ${input.note ? `<li>Note: ${escapeHtml(input.note)}</li>` : ""}
        </ul>
        <p>Confirm or reject it in the academy worklist after checking the bank statement.</p>`,
    }).run();
    await notificationStatement(c.env.DB, {
      id: `transfer-received:${id}`,
      ref,
      to: row.email,
      subject: `We received your transfer report — ${ref}`,
      html: `<p>Hi ${escapeHtml(row.first_name)},</p>
        <p>Thanks — we've logged your bank transfer of ₦${input.amount.toLocaleString("en-NG")} for <strong>${escapeHtml(row.program_title)}</strong> (${ref}).</p>
        <p>${TUITION_POLICY.support} Your receipt will be available on your secure application page once the transfer is verified.</p>
        <p>This report is not payment confirmation. Do not send the money again while it is being checked.</p>
        <p>— Cyber Elias Academy</p>`,
    }).run();
  } catch {
    /* email is best-effort; the proof is stored */
  }

  return c.json(
    {
      ok: true,
      status: "pending_review",
      amount: input.amount,
      expectedAmount: expected,
      message:
        "Thank you — we've received your transfer report. CEA will check it against bank records. Check your secure application page for confirmation; do not pay again.",
    },
    201,
  );
});

/** GET /:ref/payments/verify — public. Poll/verify a payment session after the Paystack redirect. */
enrollments.get("/:ref/payments/verify", requireAuth, async (c) => {
  const ref = c.req.param("ref").toUpperCase();
  await requireApplicantAccess(c, ref);
  const reference = (c.req.query("reference") ?? "").trim();
  if (!reference) throw ApiError.validation({ reference: ["Missing payment reference."] });

  const payment = await c.env.DB.prepare(
    `SELECT * FROM registration_payments WHERE reference = ? AND registration_ref = ?`,
  )
    .bind(reference, ref)
    .first<{
      id: string;
      reference: string;
      kind: string;
      amount: number;
      status: string;
      paid_at: string | null;
    }>();
  if (!payment) throw ApiError.notFound("No payment found for that reference.");

  let status = payment.status;
  if (status === "pending") {
    const remote = await verifyPaystackTransaction(c.env, payment.reference);
    if (remote?.status === "success") {
      await markPayment(c, payment.reference, "success", remote.amount);
    } else if (remote?.status === "failed" || remote?.status === "abandoned") {
      await markPayment(c, payment.reference, "failed");
    }
    const fresh = await c.env.DB.prepare(`SELECT status FROM registration_payments WHERE id = ?`)
      .bind(payment.id)
      .first<{ status: string }>();
    status = fresh?.status ?? status;
  }

  const enrollment = await c.env.DB.prepare(`SELECT * FROM registrations WHERE ref = ?`)
    .bind(ref)
    .first<EnrollmentRow>();
  return c.json({
    reference: payment.reference,
    kind: payment.kind,
    amount: payment.amount,
    status,
    enrollmentPaymentStatus: enrollment?.payment_status ?? "unpaid",
    verified: status === "success",
  });
});

/**
 * Sequential receipt numbers per calendar year: CEA-RCPT-2026-0001.
 * Three statements (seed, increment, read) because D1 serialises writes and
 * markPayment is idempotent, so a retried webhook cannot double-allocate.
 */
export async function allocateReceiptNo(db: AppEnv["DB"], now = isoNow()): Promise<string> {
  const scope = now.slice(0, 4);
  const row = await db
    .prepare(
      `INSERT INTO receipt_counters (scope, last_value) VALUES (?, 1)
    ON CONFLICT(scope) DO UPDATE SET last_value = last_value + 1 RETURNING last_value`,
    )
    .bind(scope)
    .first<{ last_value: number }>();
  return `CEA-RCPT-${scope}-${String(row!.last_value).padStart(4, "0")}`;
}
export const markPayment = markTuitionPayment;

/** POST /webhook — public. Paystack charge.success / charge.failed (HMAC-verified). */
enrollments.post("/webhook", async (c) => {
  const rawBody = await c.req.text();
  const secret = c.env.PAYSTACK_SECRET_KEY;
  if (secret) {
    const signature = c.req.header("x-paystack-signature");
    if (!signature) throw ApiError.unauthorized("Missing signature.");
    const expected = await hmacSha512Hex(secret, rawBody);
    if (!timingSafeEqualHex(signature, expected)) throw ApiError.unauthorized("Invalid signature.");
  } else if (c.env.APP_ENV === "production") {
    throw new ApiError(503, "PAYMENT_PROVIDER_UNAVAILABLE", "Paystack secret is not configured.");
  }

  let body: {
    event?: string;
    data?: { id?: number | string; reference?: string; amount?: number; currency?: string };
  };
  try {
    body = JSON.parse(rawBody);
  } catch {
    throw ApiError.validation({ body: ["Invalid JSON."] });
  }
  const reference = body.data?.reference;
  if (reference) {
    await recordWebhookEvent(c.env.DB, "paystack-enrollments", body, rawBody);
    // The financial transition is idempotent. Always retry it, even if an earlier delivery was logged before a crash.
    if (body.event === "charge.success" && body.data?.currency === "NGN") {
      await markPayment(c, reference, "success", body.data?.amount);
    } else if (body.event === "charge.failed") await markPayment(c, reference, "failed");
  }
  return c.json({ ok: true });
});

/** GET /admin — full records for admissions / finance / admin. */
enrollments.get("/admin", requireAuth, requireAnyRole(TUITION_STAFF), async (c) => {
  const { cursor, limit } = parsePagination(c);
  const stage = c.req.query("stage");
  const predicates: string[] = [];
  const args: string[] = [];
  if (stage) {
    predicates.push("stage = ?");
    args.push(stage);
  }
  if (cursor) {
    predicates.push("id > ?");
    args.push(base64UrlDecode(cursor) ?? "");
  }
  const where = predicates.length > 0 ? `WHERE ${predicates.join(" AND ")}` : "";

  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM registrations ${where}`)
    .bind(...args)
    .first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, ref, program_slug, program_kind, program_title, fee_total, payment_plan,
            payment_method, payment_status, deposit_amount, paid_amount, paid_at, payment_ref,
            first_name, last_name, email, phone, city, mode, schedule_days, time_slot,
            goal, referred_by, has_laptop, birth_year, gender, education_level,
            stage, note, turnstile_passed, created_at, updated_at
       FROM registrations ${where} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...args, limit)
    .all<{
      id: string;
      ref: string;
      program_slug: string;
      program_kind: string;
      program_title: string;
      fee_total: number;
      payment_plan: string;
      payment_method: string;
      payment_status: string;
      deposit_amount: number;
      paid_amount: number;
      paid_at: string | null;
      payment_ref: string | null;
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      city: string;
      mode: string;
      schedule_days: string;
      time_slot: string;
      goal: string | null;
      referred_by: string | null;
      has_laptop: number;
      birth_year: number | null;
      gender: string | null;
      education_level: string | null;
      stage: string;
      note: string;
      turnstile_passed: number;
      created_at: string;
      updated_at: string;
    }>();
  const items = rows.results.map((r) => ({
    id: r.id,
    ref: r.ref,
    programSlug: r.program_slug,
    programKind: r.program_kind,
    programTitle: r.program_title,
    feeTotal: r.fee_total,
    payment: {
      plan: r.payment_plan,
      method: r.payment_method,
      status: r.payment_status,
      depositAmount: r.deposit_amount,
      paidAmount: r.paid_amount,
      amountDue: Math.max(
        0,
        feeDueFor(r.program_kind as "short" | "long", r.fee_total, r.payment_plan) - r.paid_amount,
      ),
      paidAt: r.paid_at,
      reference: r.payment_ref,
    },
    student: {
      firstName: r.first_name,
      lastName: r.last_name,
      fullName: `${r.first_name} ${r.last_name}`,
      email: r.email,
      phone: r.phone,
      city: r.city,
      mode: r.mode,
      scheduleDays: r.schedule_days,
      timeSlot: r.time_slot,
      goal: r.goal,
      referredBy: r.referred_by,
      hasLaptop: Boolean(r.has_laptop),
      birthYear: r.birth_year,
      gender: r.gender,
      educationLevel: r.education_level,
    },
    stage: r.stage,
    note: r.note,
    turnstilePassed: Boolean(r.turnstile_passed),
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  }));
  return c.json(paginate(items, total?.n ?? 0, (last) => last.id));
});

/* ------------------------------------------------------------------ *
 * Bank-transfer proofs — admin review (finance / admin)
 * ------------------------------------------------------------------ */

const proofDecisionSchema = z.object({
  reason: z.string().trim().max(300).optional(),
});

/** GET /payment-proofs — review queue. */
enrollments.get("/payment-proofs", requireAuth, requireFinance, async (c) => {
  const status = (c.req.query("status") ?? "pending_review").trim();
  const allowed = ["pending_review", "confirmed", "rejected", "all"];
  if (!allowed.includes(status)) throw ApiError.validation({ status: ["Unknown status."] });
  const { cursor, limit } = parsePagination(c);
  const predicates: string[] = [];
  const args: string[] = [];
  if (status !== "all") {
    predicates.push("p.status = ?");
    args.push(status);
  }
  if (cursor) {
    predicates.push("p.id > ?");
    args.push(base64UrlDecode(cursor) ?? "");
  }
  const where = predicates.length > 0 ? `WHERE ${predicates.join(" AND ")}` : "";
  const rows = await c.env.DB.prepare(
    `SELECT p.*, r.program_title, r.first_name, r.last_name, r.email, r.fee_total, r.payment_status AS enrollment_status
       FROM payment_proofs p
       JOIN registrations r ON r.ref = p.registration_ref
       ${where}
       ORDER BY p.id ASC
       LIMIT ?`,
  )
    .bind(...args, limit)
    .all<{
      id: string;
      registration_ref: string;
      kind: string;
      amount: number;
      expected_amount: number;
      sender_name: string;
      bank_name: string | null;
      bank_reference: string | null;
      paid_on: string | null;
      note: string | null;
      receipt_url: string | null;
      status: string;
      submitted_at: string;
      reviewed_at: string | null;
      reviewed_by: string | null;
      program_title: string;
      first_name: string;
      last_name: string;
      email: string;
      fee_total: number;
      enrollment_status: string;
    }>();
  const items = rows.results.map((r) => ({
    id: r.id,
    ref: r.registration_ref,
    programTitle: r.program_title,
    student: { firstName: r.first_name, lastName: r.last_name, email: r.email },
    kind: r.kind,
    amount: r.amount,
    expectedAmount: r.expected_amount,
    senderName: r.sender_name,
    bankName: r.bank_name,
    bankReference: r.bank_reference,
    paidOn: r.paid_on,
    note: r.note,
    receiptUrl: r.receipt_url,
    status: r.status,
    enrollmentStatus: r.enrollment_status,
    submittedAt: r.submitted_at,
    reviewedAt: r.reviewed_at,
    reviewedBy: r.reviewed_by,
  }));
  const counted = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM payment_proofs p ${status === "all" ? "" : "WHERE p.status = ?"}`,
  )
    .bind(...(status === "all" ? [] : [status]))
    .first<{ n: number }>();
  return c.json(paginate(items, counted?.n ?? 0, (last) => last.id));
});

/** POST /payment-proofs/:id/confirm — creates the payment row, then markPayment(). */
enrollments.post("/payment-proofs/:id/confirm", requireAuth, requireFinance, async (c) => {
  const id = c.req.param("id");
  const verified = await parseBody(
    c,
    z.object({
      bankReference: z.string().trim().min(4).max(120),
      receivedAmount: z
        .number()
        .min(0.01)
        .max(1000000)
        .refine(
          (value) => Math.round(value * 100) / 100 === value,
          "Use at most two decimal places.",
        ),
    }),
  );
  const bankReference = verified.bankReference.toUpperCase();
  const proof = await c.env.DB.prepare("SELECT * FROM payment_proofs WHERE id = ?").bind(id).first<{
    id: string;
    registration_ref: string;
    kind: string;
    amount: number;
    status: string;
    sender_name: string;
  }>();
  if (!proof) throw ApiError.notFound("Transfer report not found.");
  if (proof.status === "rejected")
    throw new ApiError(409, "ALREADY_REVIEWED", "This report was rejected.");
  const reference = `cea_bt_${proof.id}`;
  const duplicate = await c.env.DB.prepare(
    "SELECT reference FROM registration_payments WHERE verified_bank_reference = ?",
  )
    .bind(bankReference)
    .first<{ reference: string }>();
  if (duplicate && duplicate.reference !== reference)
    throw new ApiError(
      409,
      "BANK_CREDIT_ALREADY_USED",
      "This bank credit is already attached to another payment. Reconcile the original; do not credit it twice.",
    );
  await c.env.DB.prepare(
    `INSERT OR IGNORE INTO registration_payments (id, registration_ref, reference, kind, amount, status, created_at, method, proof_id, payer_name, reviewed_by, reviewed_at, verified_bank_reference, received_kobo)
    SELECT ?, registration_ref, ?, kind, expected_amount, 'pending', ?, 'bank-transfer', id, sender_name, ?, ?, ?, ? FROM payment_proofs WHERE id = ? AND status = 'pending_review'`,
  )
    .bind(
      crypto.randomUUID(),
      reference,
      isoNow(),
      c.get("authUser").email,
      isoNow(),
      bankReference,
      Math.round(verified.receivedAmount * 100),
      proof.id,
    )
    .run();
  const recorded = await c.env.DB.prepare(
    "SELECT verified_bank_reference, received_kobo FROM registration_payments WHERE reference = ?",
  )
    .bind(reference)
    .first<{ verified_bank_reference: string; received_kobo: number }>();
  if (
    !recorded ||
    recorded.verified_bank_reference !== bankReference ||
    recorded.received_kobo !== Math.round(verified.receivedAmount * 100)
  )
    throw new ApiError(
      409,
      "BANK_EVIDENCE_CHANGED",
      "This credit was reviewed with different evidence. Reload and reconcile the original record; do not credit it twice.",
    );
  await markPayment(c, reference, "success", Math.round(verified.receivedAmount * 100));
  const fresh = await c.env.DB.prepare("SELECT status FROM payment_proofs WHERE id = ?")
    .bind(id)
    .first<{ status: string }>();
  if (fresh?.status !== "confirmed")
    throw new ApiError(
      409,
      "ALREADY_REVIEWED",
      "This report changed while you reviewed it. Reload the queue.",
    );
  await c.env.DB.prepare(
    "UPDATE payment_proofs SET reviewed_by = COALESCE(reviewed_by, ?) WHERE id = ?",
  )
    .bind(c.get("authUser").email, id)
    .run();
  return c.json({ ok: true, status: "confirmed", reference });
});

/** POST /payment-proofs/:id/reject — send it back without touching payment state. */
enrollments.post("/payment-proofs/:id/reject", requireAuth, requireFinance, async (c) => {
  const actor = c.get("authUser");
  const id = c.req.param("id");
  const input = await parseBody(c, proofDecisionSchema);
  const proof = await c.env.DB.prepare(`SELECT * FROM payment_proofs WHERE id = ?`)
    .bind(id)
    .first<{ id: string; registration_ref: string; status: string; amount: number }>();
  if (!proof) throw ApiError.notFound("No proof found with that id.");
  if (proof.status !== "pending_review") {
    throw new ApiError(409, "ALREADY_REVIEWED", "This proof has already been reviewed.");
  }
  const now = isoNow();
  const decision = await c.env.DB.prepare(
    `UPDATE payment_proofs SET status = 'rejected', reviewed_at = ?, reviewed_by = ? WHERE id = ? AND status = 'pending_review'`,
  )
    .bind(now, actor?.email ?? "admin", proof.id)
    .run();
  if (!decision.meta.changes)
    throw new ApiError(409, "ALREADY_REVIEWED", "This report has already been reviewed.");
  await c.env.DB.prepare(
    `UPDATE registration_payments SET status = 'failed', verified_bank_reference = NULL
    WHERE proof_id = ? AND status = 'pending' AND EXISTS (SELECT 1 FROM payment_proofs WHERE id = ? AND status = 'rejected')`,
  )
    .bind(proof.id, proof.id)
    .run();
  // No settled money is reversed: the proof was only a claim.
  await logEvent(
    c.env.DB,
    proof.registration_ref,
    "transfer_proof_rejected",
    input.reason
      ? `rejected by ${actor?.email ?? "admin"}: ${escapeHtml(input.reason)}`
      : `rejected by ${actor?.email ?? "admin"}`,
  );
  const enrollment = await c.env.DB.prepare(`SELECT * FROM registrations WHERE ref = ?`)
    .bind(proof.registration_ref)
    .first<EnrollmentRow>();
  if (enrollment) {
    try {
      await notificationStatement(c.env.DB, {
        id: `transfer-rejected:${proof.id}`,
        ref: enrollment.ref,
        to: enrollment.email,
        subject: `We couldn't match your transfer yet — ${enrollment.ref}`,
        html: `<p>Hi ${escapeHtml(enrollment.first_name)},</p>
          <p>We couldn't match the transfer of ₦${proof.amount.toLocaleString("en-NG")} you reported for <strong>${escapeHtml(enrollment.program_title)}</strong> (${enrollment.ref}).</p>
          ${input.reason ? `<p>${escapeHtml(input.reason)}</p>` : ""}
          <p>Please reply with the transfer receipt, or message us on WhatsApp at 0905 862 8386, and we'll sort it out.</p>
          <p>— Cyber Elias Academy</p>`,
      }).run();
    } catch {
      /* best effort */
    }
  }
  return c.json({ ok: true, status: "rejected" });
});

/**
 * GET /:ref/receipt — private, printable receipt for confirmed payments.
 * Only payments with status = 'success' are returned; a pending transfer shows
 * nothing here by design.
 */
enrollments.get("/:ref/receipt", requireAuth, async (c) => {
  const ref = c.req.param("ref").toUpperCase();
  await requireApplicantAccess(c, ref);
  const row = await c.env.DB.prepare(`SELECT * FROM registrations WHERE ref = ?`)
    .bind(ref)
    .first<EnrollmentRow>();
  if (!row) throw ApiError.notFound("No enrollment found with that reference.");
  const payments = await c.env.DB.prepare(
    `SELECT reference, kind, COALESCE(received_kobo, amount * 100) / 100.0 AS amount, status, paid_at, receipt_no, method
       FROM registration_payments
      WHERE registration_ref = ? AND status = 'success'
      ORDER BY paid_at ASC`,
  )
    .bind(ref)
    .all<{
      reference: string;
      kind: string;
      amount: number;
      status: string;
      paid_at: string | null;
      receipt_no: string | null;
      method: string | null;
    }>();
  const feeDue = feeDueFor(row.program_kind as "short" | "long", row.fee_total, row.payment_plan);
  return c.json({
    receipt: {
      ref: row.ref,
      studentName: `${row.first_name} ${row.last_name}`.trim(),
      email: row.email,
      programTitle: row.program_title,
      programKind: row.program_kind,
      issuedBy: {
        name: "Cyber Elias Academy Ltd",
        rc: "RC 8413776",
        tin: "TIN 1086525399",
        address: "24 Ebony Road, off Rumuola Road, Port Harcourt",
        email: "help@cea.ng",
        phone: "+234 905 862 8386",
      },
      feeTotal: row.fee_total,
      feeDue,
      paidAmount: row.paid_amount,
      balance: Math.max(0, feeDue - row.paid_amount),
      payments: payments.results.map((p) => ({
        reference: p.reference,
        kind: p.kind,
        amount: p.amount,
        method: p.method ?? "paystack",
        receiptNo: p.receipt_no,
        paidAt: p.paid_at,
      })),
      /** Null until a payment is confirmed — drives the "nothing yet" state. */
      latestReceiptNo: payments.results.at(-1)?.receipt_no ?? null,
      issuedAt: payments.results.at(-1)?.paid_at ?? null,
    },
  });
});

/** GET /:ref — verified applicant / authorised staff status (events + payment state). */
enrollments.get("/:ref", requireAuth, async (c) => {
  const ref = c.req.param("ref").toUpperCase();
  await requireApplicantAccess(c, ref);
  await activateTuition(c.env, ref);
  const row = await c.env.DB.prepare(`SELECT * FROM registrations WHERE ref = ?`)
    .bind(ref)
    .first<EnrollmentRow>();
  if (!row) throw ApiError.notFound("No enrollment found with that reference.");
  const eventsRows = await c.env.DB.prepare(
    `SELECT event, detail, at FROM registration_events WHERE registration_ref = ? ORDER BY at ASC LIMIT 20`,
  )
    .bind(ref)
    .all<{ event: string; detail: string; at: string }>();
  const data = publicEnrollment(
    row,
    eventsRows.results.filter((e) =>
      [
        "submitted",
        "payment_confirmed",
        "payment_failed",
        "offer_issued",
        "offer_accepted",
      ].includes(e.event),
    ),
  );
  const checkout = await checkoutEligibility(c.env.DB, row);
  const pendingPayment = await c.env.DB.prepare(
    "SELECT reference FROM registration_payments WHERE registration_ref = ? AND status = 'pending' ORDER BY created_at DESC LIMIT 1",
  )
    .bind(ref)
    .first<{ reference: string }>();
  if (pendingPayment) {
    checkout.allowed = false;
    checkout.reason =
      "An online payment is awaiting confirmation. Check it below; do not pay again.";
  }
  const cohort = row.cohort_id
    ? await c.env.DB.prepare(
        "SELECT id, label, start_date AS startDate, end_date AS endDate, days, start_time AS startTime, mode, status FROM cohorts WHERE id = ?",
      )
        .bind(row.cohort_id)
        .first()
    : null;
  const proof = await c.env.DB.prepare(
    `SELECT status, amount, expected_amount, submitted_at, reviewed_at
       FROM payment_proofs WHERE registration_ref = ? ORDER BY submitted_at DESC LIMIT 1`,
  )
    .bind(ref)
    .first<{
      status: string;
      amount: number;
      expected_amount: number;
      submitted_at: string;
      reviewed_at: string | null;
    }>();
  return c.json({
    ...data,
    checkout,
    offer: {
      status: row.offer_status,
      version: row.offer_version,
      acceptedVersion: row.accepted_offer_version,
      expiresAt: row.offer_expires_at,
      balanceDueAt: row.balance_due_at,
      equipment: row.equipment_agreement,
      policyVersion: row.policy_version,
      cohort,
    },
    learning: {
      active: Boolean(row.activated_at),
      url: row.activated_at ? `/app/learn/${row.program_slug}` : null,
      reason: row.activated_at
        ? "Your learner workspace is ready."
        : row.paid_amount > 0
          ? "Payment recorded. We are checking placement, payment threshold and your verified learner account. Do not pay again to recover access."
          : "Access follows an accepted place and the required verified payment.",
    },
    payment: {
      ...data.payment,
      review: proof
        ? {
            status: proof.status,
            amount: proof.amount,
            expectedAmount: proof.expected_amount,
            submittedAt: proof.submitted_at,
            reviewedAt: proof.reviewed_at,
          }
        : null,
    },
    stages: ENROLLMENT_STAGES.map((stage, i) => {
      const currentIdx = STAGE_ORDER.indexOf(row.stage as (typeof STAGE_ORDER)[number]);
      const idx = STAGE_ORDER.indexOf(stage.key as (typeof STAGE_ORDER)[number]);
      return {
        key: stage.key,
        label: stage.label,
        done: idx < currentIdx,
        active: idx === currentIdx,
      };
    }),
  });
});

const patchSchema = z.object({
  stage: z.enum([
    "submitted",
    "screening",
    "assessment",
    "interview",
    "offer",
    "enrolled",
    "declined",
  ]),
  note: z.string().trim().max(500).optional(),
});

/** PATCH /:ref — admin advances the pipeline (mirrors into applications). */
enrollments.patch("/:ref", requireAuth, requireAnyRole(PLACEMENT_STAFF), async (c) => {
  const admin = c.get("authUser");
  const ref = c.req.param("ref").toUpperCase();
  const { stage, note } = await parseBody(c, patchSchema);
  if (stage === "offer")
    throw new ApiError(
      409,
      "USE_CONFIRMED_OFFER",
      "Issue a reviewed cohort offer from the academy worklist, not a stage label.",
    );
  if (stage === "enrolled")
    throw new ApiError(
      409,
      "USE_ACTIVATION",
      "Learning access is activated from a verified payment and accepted placement, not a stage label.",
    );
  const now = isoNow();

  const row = await c.env.DB.prepare(`SELECT id, stage FROM registrations WHERE ref = ?`)
    .bind(ref)
    .first<{ id: string; stage: string }>();
  if (!row) throw ApiError.notFound("No enrollment found with that reference.");

  if (
    stage !== "declined" &&
    STAGE_ORDER.indexOf(stage) < STAGE_ORDER.indexOf(row.stage as EnrollmentStage)
  ) {
    throw ApiError.validation({ stage: ["Cannot move an enrollment backwards."] });
  }
  const gate =
    stage === "declined"
      ? " AND paid_amount=0 AND activated_at IS NULL AND NOT EXISTS (SELECT 1 FROM registration_payments WHERE registration_ref=registrations.ref AND status='pending') AND NOT EXISTS (SELECT 1 FROM payment_proofs WHERE registration_ref=registrations.ref AND status='pending_review')"
      : "";
  const changed = await c.env.DB.batch([
    c.env.DB.prepare(
      `UPDATE registrations SET stage = ?, note = ?, updated_at = ?${stage === "declined" ? ", offer_status='awaiting', cohort_id=NULL, offer_expires_at=NULL, accepted_offer_version=NULL, accepted_offer_at=NULL" : ""} WHERE id = ?${gate}`,
    ).bind(stage, note ?? "", now, row.id),
    c.env.DB.prepare(
      `UPDATE applications SET status = ?, note = ?, updated_at = ? WHERE ref = ? AND EXISTS (SELECT 1 FROM registrations WHERE ref = ? AND stage = ?${gate})`,
    ).bind(stage, note ?? "", now, ref, ref, stage),
    c.env.DB.prepare(
      `INSERT INTO audit_log (id, actor, action, time, severity, sort_order) SELECT ?, ?, ?, ?, 'info', 0 FROM registrations WHERE ref = ? AND stage = ?${gate}`,
    ).bind(
      crypto.randomUUID(),
      admin.email,
      `Enrollment ${ref} moved to ${stage}`,
      now,
      ref,
      stage,
    ),
  ]);
  if (!changed[0]?.meta.changes)
    throw new ApiError(
      409,
      "MONEY_REVIEW_REQUIRED",
      "Do not cancel a paid, active or pending-payment agreement here. Verify all funds and resolve the learner's placement/refund with an audited reconciliation.",
    );
  await logEvent(c.env.DB, ref, `stage_${stage}`, note ?? "");
  return c.json({ ok: true, ref, stage, note: note ?? "", updatedAt: now });
});
