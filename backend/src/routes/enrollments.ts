/**
 * Enrollment funnel v2 — public registration for short courses and
 * long-form trainings, with Paystack deposit/full-fee collection, an
 * event timeline, and mirroring into the existing `applications`
 * pipeline so the admissions workspace keeps working untouched.
 *
 * Public routes (no session):
 *   POST /v1/enrollments                    create enrollment
 *   POST /v1/enrollments/:ref/payments      start a Paystack session
 *   GET  /v1/enrollments/:ref/payments/verify  verify after redirect
 *   POST /v1/enrollments/webhook            Paystack webhook (HMAC)
 *   GET  /v1/enrollments/:ref               applicant status page
 * Admin (admissions / finance / admin):
 *   GET  /v1/enrollments/admin
 *   PATCH /v1/enrollments/:ref
 */
import { Hono } from "hono";
import type { AppEnv } from "../types";
import { z } from "zod";
import { ApiError } from "../lib/errors";
import { parseBody } from "../lib/validate";
import { requireAuth, requireAdmin } from "../lib/auth";
import {
  base64UrlDecode,
  hmacSha512Hex,
  isoNow,
  randomToken,
  timingSafeEqualHex,
} from "../lib/crypto";
import { normalizeEmail } from "../db/client";
import { paginate, parsePagination } from "../lib/pagination";
import { hashIdentifier, rateLimit } from "../lib/rate-limit";
import { isTrustedOrigin } from "../lib/origin";
import { sendEmail } from "../lib/email";

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

/**
 * Canonical program registry (title, kind, fee, duration, days/week).
 * Kept in sync with src/data/academy/catalog.ts (short courses) and
 * src/data/academy/longform.ts (long-form trainings).
 */
const PROGRAMS: Record<
  string,
  { title: string; kind: "short" | "long"; fee: number; weeks: number; daysPerWeek: number }
> = {
  // --- Short courses (2 sessions/week as published on cea.ng) ---
  "microsoft-office": {
    title: "Microsoft Office",
    kind: "short",
    fee: 30000,
    weeks: 3,
    daysPerWeek: 2,
  },
  "computer-basics-typing": {
    title: "Typing & Computer Basics",
    kind: "short",
    fee: 20000,
    weeks: 2,
    daysPerWeek: 2,
  },
  "data-entry": { title: "Data Entry", kind: "short", fee: 20000, weeks: 2, daysPerWeek: 2 },
  "graphic-design": {
    title: "Graphic Design",
    kind: "short",
    fee: 40000,
    weeks: 4,
    daysPerWeek: 2,
  },
  "web-design": { title: "Web Design", kind: "short", fee: 50000, weeks: 4, daysPerWeek: 2 },
  "web-development": {
    title: "Web Development",
    kind: "short",
    fee: 60000,
    weeks: 6,
    daysPerWeek: 2,
  },
  "digital-marketing": {
    title: "Digital Marketing",
    kind: "short",
    fee: 40000,
    weeks: 4,
    daysPerWeek: 2,
  },
  "social-media-management": {
    title: "Social Media Management",
    kind: "short",
    fee: 30000,
    weeks: 3,
    daysPerWeek: 2,
  },
  "computer-repairs": {
    title: "Computer Repairs",
    kind: "short",
    fee: 50000,
    weeks: 4,
    daysPerWeek: 2,
  },
  cybersecurity: { title: "Cybersecurity", kind: "short", fee: 50000, weeks: 4, daysPerWeek: 2 },
  "business-freelancing": {
    title: "Business & Freelancing",
    kind: "short",
    fee: 30000,
    weeks: 3,
    daysPerWeek: 2,
  },
  "content-creation": {
    title: "Content Creation",
    kind: "short",
    fee: 30000,
    weeks: 3,
    daysPerWeek: 2,
  },
  "online-teaching": {
    title: "Online Teaching",
    kind: "short",
    fee: 30000,
    weeks: 3,
    daysPerWeek: 2,
  },
  "digital-productivity": {
    title: "Digital Productivity",
    kind: "short",
    fee: 30000,
    weeks: 2,
    daysPerWeek: 2,
  },
  "ai-productivity": {
    title: "AI Productivity",
    kind: "short",
    fee: 30000,
    weeks: 2,
    daysPerWeek: 2,
  },
  "mobile-app-development": {
    title: "Mobile App Development",
    kind: "short",
    fee: 60000,
    weeks: 4,
    daysPerWeek: 2,
  },
  photography: { title: "Photography", kind: "short", fee: 30000, weeks: 2, daysPerWeek: 2 },
  "video-editing": { title: "Video Editing", kind: "short", fee: 40000, weeks: 3, daysPerWeek: 2 },
  wordpress: { title: "WordPress", kind: "short", fee: 40000, weeks: 3, daysPerWeek: 2 },
  "data-analytics": {
    title: "Data Analytics",
    kind: "short",
    fee: 50000,
    weeks: 4,
    daysPerWeek: 2,
  },
  "computer-networking": {
    title: "Computer Networking",
    kind: "short",
    fee: 50000,
    weeks: 3,
    daysPerWeek: 2,
  },
  "it-support": { title: "IT Support", kind: "short", fee: 40000, weeks: 3, daysPerWeek: 2 },
  // --- Long-form trainings (3 days/week, market-anchored pricing) ---
  "it-professional-diploma": {
    title: "IT Professional Diploma",
    kind: "long",
    fee: 300000,
    weeks: 24,
    daysPerWeek: 3,
  },
  "web-development-professional": {
    title: "Web Development Professional",
    kind: "long",
    fee: 320000,
    weeks: 24,
    daysPerWeek: 3,
  },
  "data-analytics-ai": {
    title: "Data Analytics & AI",
    kind: "long",
    fee: 300000,
    weeks: 24,
    daysPerWeek: 3,
  },
  "cybersecurity-foundations": {
    title: "Cybersecurity Foundations",
    kind: "long",
    fee: 160000,
    weeks: 12,
    daysPerWeek: 3,
  },
  "digital-business-bootcamp": {
    title: "Digital Business Bootcamp",
    kind: "long",
    fee: 150000,
    weeks: 12,
    daysPerWeek: 3,
  },
};

/** Short courses: 50% holds the seat; long-form: 30% deposit. */
function depositFor(kind: "short" | "long", fee: number): number {
  return kind === "short" ? Math.round(fee / 2) : Math.round(fee * 0.3);
}

/** Total payable after plan discounts (10% off paying a long-form fee in full). */
function feeDueFor(kind: "short" | "long", fee: number, plan: string): number {
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
    `Confirmation email sent to your inbox (reference ${ref}).`,
    "We will call or WhatsApp you within 24 working hours to confirm dates.",
    "Pay your deposit (or full fee) to hold your seat — the payment link is on this page.",
    "Get your welcome pack: class schedule, what to bring, and your course notes.",
  ];
}

const ACADEMY_WHATSAPP = "2349058628386";

function confirmationEmailHtml(input: {
  ref: string;
  name: string;
  programTitle: string;
  fee: number;
  deposit: number;
  plan: string;
  mode: string;
  kind: "short" | "long";
  daysPerWeek: number;
}): string {
  const { ref, name, programTitle, fee, deposit, plan, mode, kind, daysPerWeek } = input;
  const feeFmt = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  });
  const due = kind === "long" && plan === "full-10-off" ? Math.round(fee * 0.9) : fee;
  const dueLine =
    plan === "full" || plan === "full-10-off"
      ? `Fee in full: <strong>${feeFmt.format(due)}</strong>`
      : `Deposit now: <strong>${feeFmt.format(deposit)}</strong> · balance ${feeFmt.format(due - deposit)}${
          kind === "long" ? " in monthly instalments" : " at mid-course"
        }`;
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;max-width:560px;margin:0 auto;padding:24px;">
    <h1 style="font-size:20px;margin:0 0 8px;">Application received — ${ref}</h1>
    <p>Hi ${name},</p>
    <p>Thanks for applying to <strong>${programTitle}</strong> at Cyber Elias Academy, 26 Ebony Road, Port Harcourt.
    Here is your summary:</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:6px 0;color:#666;">Course</td><td style="padding:6px 0;"><strong>${programTitle}</strong></td></tr>
      <tr><td style="padding:6px 0;color:#666;">Schedule</td><td style="padding:6px 0;">${daysPerWeek} days/week · ${mode}</td></tr>
      <tr><td style="padding:6px 0;color:#666;">Payment</td><td style="padding:6px 0;">${dueLine}</td></tr>
    </table>
    <p><strong>What happens next:</strong></p>
    <ol style="font-size:14px;line-height:1.6;">
      <li>We will call or WhatsApp you within 24 working hours.</li>
      <li>Pay your ${plan === "full" || plan === "full-10-off" ? "fee" : "deposit"} to hold your seat (link below or on the tracking page).</li>
      <li>Receive your welcome pack — schedule, what to bring, course notes.</li>
    </ol>
    <p style="margin-top:20px;">
      <a href="${(globalThis as { APP_URL?: string }).APP_URL ?? "https://cea.ng"}/apply/status/${ref}"
         style="background:#ea580c;color:#fff;text-decoration:none;padding:10px 18px;border-radius:8px;font-weight:bold;">
        Track your application</a>
    </p>
    <p style="font-size:12px;color:#777;">Questions? WhatsApp us: <a href="https://wa.me/${ACADEMY_WHATSAPP}">+234 905 862 8386</a> ·
    Mon–Sat 8:00–20:00 WAT · hello@cea.ng</p>
  </div>`;
}

function receiptEmailHtml(input: {
  ref: string;
  name: string;
  programTitle: string;
  amount: number;
  kind: "deposit" | "balance" | "full";
  remaining: number;
}): string {
  const { ref, name, programTitle, amount, kind, remaining } = input;
  const fmt = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  });
  const line =
    kind === "full"
      ? `Full fee of <strong>${fmt.format(amount)}</strong> — your seat is confirmed.`
      : `${kind === "deposit" ? "Deposit" : "Payment"} of <strong>${fmt.format(amount)}</strong> received. ${
          remaining > 0
            ? `Balance due: <strong>${fmt.format(remaining)}</strong>.`
            : "Nothing further due."
        }`;
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;max-width:560px;margin:0 auto;padding:24px;">
    <h1 style="font-size:20px;margin:0 0 8px;">Payment confirmed — ${ref}</h1>
    <p>Hi ${name},</p>
    <p>We received your payment for <strong>${programTitle}</strong>: ${line}</p>
    <p>Your seat is held. The welcome pack (schedule, what to bring, notes links) follows once admission confirms your dates.</p>
    <p style="font-size:12px;color:#777;">Cyber Elias Academy · 26 Ebony Road, Port Harcourt ·
    <a href="https://wa.me/${ACADEMY_WHATSAPP}">+234 905 862 8386</a></p>
  </div>`;
}

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

interface EnrollmentRow {
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
      email: "hello@cea.ng",
      address: "26 Ebony Road, Off Rumuola Road, Port Harcourt",
      hours: "Mon–Sat, 8:00–20:00 WAT",
    },
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export const enrollments = new Hono<{ Bindings: AppEnv }>();

/** POST / — public. Creates an enrollment (and mirrors an `applications` row). */
enrollments.post("/", async (c) => {
  const input = await parseBody(c, createEnrollmentSchema);
  const ip = c.req.header("CF-Connecting-IP") ?? c.req.header("x-forwarded-for") ?? "unknown";
  await rateLimit(c.env.RATE_LIMIT, "enrollments", await hashIdentifier(ip), {
    limit: 10,
    windowSeconds: 3600,
  });

  // Turnstile — enforced only when a secret key is configured (free Cloudflare service).
  let turnstilePassed = 0;
  const tSecret = c.env.TURNSTILE_SECRET_KEY;
  if (tSecret) {
    if (!input.turnstileToken) {
      throw new ApiError(400, "CAPTCHA_REQUIRED", "Please confirm you are human first.");
    }
    const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: tSecret, response: input.turnstileToken, remoteip: ip }),
    }).catch(() => null);
    const payload = (await verify?.json().catch(() => null)) as { success?: boolean } | null;
    if (!payload?.success) {
      throw new ApiError(400, "CAPTCHA_FAILED", "Human verification failed. Please try again.");
    }
    turnstilePassed = 1;
  }

  const program = PROGRAMS[input.programSlug];
  if (!program) {
    throw new ApiError(400, "PROGRAM_NOT_FOUND", "That program does not exist.", {
      programSlug: ["Choose a program from the list."],
    });
  }

  // Payment plan must match the program kind.
  const validPlans =
    program.kind === "short" ? ["full", "50-50"] : ["deposit-monthly", "full-10-off"];
  if (!validPlans.includes(input.paymentPlan)) {
    throw ApiError.validation({
      paymentPlan: [
        program.kind === "short"
          ? "Short courses support 'full' or '50-50' payment plans."
          : "Long-form trainings support 'deposit-monthly' or 'full-10-off' payment plans.",
      ],
    });
  }

  const email = normalizeEmail(input.email);
  const now = isoNow();
  const id = crypto.randomUUID();
  const appRowId = crypto.randomUUID();
  const fullName = `${input.firstName} ${input.lastName}`;
  let ref = newRef();

  // Retry once on the astronomically unlikely ref collision.
  for (let attempt = 0; attempt < 2; attempt++) {
    const clash = await c.env.DB.prepare(
      `SELECT 1 AS x FROM applications WHERE ref = ? UNION SELECT 1 AS x FROM registrations WHERE ref = ?`,
    )
      .bind(ref, ref)
      .first<{ x: number }>();
    if (!clash) break;
    ref = newRef();
  }

  const deposit = depositFor(program.kind, program.fee);
  await c.env.DB.prepare(
    `INSERT INTO registrations
       (id, ref, program_slug, program_kind, program_title, fee_total,
        schedule_days, time_slot, mode, preferred_start,
        first_name, last_name, email, phone, city, birth_year, gender,
        education_level, experience_level, goal, employer, has_laptop, referred_by,
        payment_plan, payment_method, deposit_amount, payment_status,
        stage, note, turnstile_passed, source_ip, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'unpaid', 'submitted', '', ?, ?, ?, ?)`,
  )
    .bind(
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
      input.hasLaptop ? 1 : 0,
      input.referredBy ?? null,
      input.paymentPlan,
      input.paymentMethod,
      deposit,
      turnstilePassed,
      ip,
      now,
      now,
    )
    .run();

  // Mirror into the existing applications pipeline (same ref) so admissions
  // workflows and hub stats see the lead automatically. program_slug only
  // links for slugs that exist in the LMS `programs` table; everything else
  // stays NULL (the FK would otherwise reject short/long-form slugs).
  await c.env.DB.prepare(
    `INSERT OR IGNORE INTO applications
       (id, ref, full_name, email, phone, city, program_slug, experience, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, (SELECT slug FROM programs WHERE slug = ?), ?, 'submitted', ?, ?)`,
  )
    .bind(
      appRowId,
      ref,
      fullName,
      email,
      input.phone,
      input.city,
      input.programSlug,
      input.goal ?? "",
      now,
      now,
    )
    .run();

  await logEvent(
    c.env.DB,
    ref,
    "submitted",
    `${program.title} · ${input.paymentPlan} plan · ${input.mode}`,
  );

  // Free-service automation: mirror the lead to Google Sheets in real time.
  mirrorLeadToSheet(c, c.env.GOOGLE_SHEET_WEBHOOK_URL, {
    ref,
    createdAt: now,
    fullName,
    email,
    phone: input.phone,
    city: input.city,
    programTitle: program.title,
    kind: program.kind,
    feeTotal: program.fee,
    plan: input.paymentPlan,
    method: input.paymentMethod,
    depositAmount: deposit,
    paymentStatus: "unpaid",
    stage: "submitted",
    mode: input.mode,
    scheduleDays: input.scheduleDays,
    timeSlot: input.timeSlot,
    goal: input.goal ?? "",
    referredBy: input.referredBy ?? "",
    hasLaptop: input.hasLaptop,
    statusUrl: `${(c.env.APP_URL || "https://cea.ng").replace(/\/+$/, "")}/apply/status/${ref}`,
  });

  // Fire-and-forget confirmation email (console provider in dev).
  try {
    await sendEmail(c, {
      to: email,
      subject: `Your CEA application is in — ${ref}`,
      html: confirmationEmailHtml({
        ref,
        name: input.firstName,
        programTitle: program.title,
        fee: program.fee,
        deposit,
        plan: input.paymentPlan,
        mode: input.mode,
        kind: program.kind,
        daysPerWeek: program.daysPerWeek,
      }),
    });
  } catch {
    /* email failure never blocks the application */
  }

  return c.json(
    {
      enrollment: {
        ref,
        status: "submitted",
        stage: "submitted",
        payment: {
          plan: input.paymentPlan,
          method: input.paymentMethod,
          status: "unpaid",
          depositAmount: deposit,
          feeTotal: program.fee,
          feeDue: feeDueFor(program.kind, program.fee, input.paymentPlan),
        },
        nextSteps: nextSteps(ref),
        trackUrl: `/apply/status/${ref}`,
      },
    },
    201,
  );
});

/** Allowed payment kinds per plan, and the exact amount for each. */
function expectedAmount(row: EnrollmentRow, kind: "deposit" | "full"): number {
  if (kind === "deposit") {
    if (row.payment_plan !== "50-50" && row.payment_plan !== "deposit-monthly") {
      throw ApiError.validation({
        kind: ["This payment plan does not use a deposit — pay the full fee instead."],
      });
    }
    return row.deposit_amount;
  }
  return feeDueFor(row.program_kind, row.fee_total, row.payment_plan);
}

/** POST /:ref/payments — public. Creates a Paystack session for deposit or full fee. */
enrollments.post("/:ref/payments", async (c) => {
  const ip = c.req.header("CF-Connecting-IP") ?? c.req.header("x-forwarded-for") ?? "unknown";
  await rateLimit(c.env.RATE_LIMIT, "enroll-pay", await hashIdentifier(ip), {
    limit: 10,
    windowSeconds: 3600,
  });
  const body = (await c.req.json().catch(() => null)) as { kind?: unknown } | null;
  const kind = body?.kind;
  if (kind !== "deposit" && kind !== "full") {
    throw ApiError.validation({ kind: ["kind must be 'deposit' or 'full'."] });
  }
  const ref = c.req.param("ref").toUpperCase();
  const row = await c.env.DB.prepare(`SELECT * FROM registrations WHERE ref = ?`)
    .bind(ref)
    .first<EnrollmentRow>();
  if (!row) throw ApiError.notFound("No enrollment found with that reference.");
  if (row.payment_status === "paid") {
    throw new ApiError(409, "ALREADY_PAID", "This enrollment is already fully paid.");
  }

  const amount = expectedAmount(row, kind);
  const reference = `cea_enr_${randomToken(8)}`;
  await c.env.DB.prepare(
    `INSERT INTO registration_payments (id, registration_ref, reference, kind, amount, status, created_at)
     VALUES (?, ?, ?, ?, ?, 'pending', ?)`,
  )
    .bind(crypto.randomUUID(), ref, reference, kind, amount, isoNow())
    .run();
  await c.env.DB.prepare(`UPDATE registrations SET payment_ref = ?, updated_at = ? WHERE id = ?`)
    .bind(reference, isoNow(), row.id)
    .run();

  const secret = c.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return c.json(
      {
        reference,
        authorizationUrl: `https://checkout.paystack.com/${reference}`,
        mock: true,
        amount,
      },
      201,
    );
  }

  // Redirect back to the pay-return page when the origin is trusted.
  // `enrollment` is our own param (Paystack only appends `reference`, which
  // equals the value we initialized with).
  let callbackUrl = "";
  const appOrigin = new URL(c.env.APP_URL || "https://cea.ng");
  const candidate = `${appOrigin.origin}/apply/pay?reference=${reference}&enrollment=${encodeURIComponent(ref)}`;
  if (isTrustedOrigin(appOrigin.origin, c.env)) callbackUrl = candidate;

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
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
          { display_name: "Item", value: `${row.program_title} — ${kind}` },
        ],
      },
    }),
  });
  const payload = (await res.json().catch(() => null)) as {
    status?: boolean;
    data?: { authorization_url?: string; access_code?: string };
  } | null;
  if (!res.ok || !payload?.status || !payload.data?.authorization_url) {
    throw new ApiError(
      502,
      "PAYMENT_PROVIDER_ERROR",
      "Paystack could not initialize the transaction.",
    );
  }
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

/** GET /:ref/payments/verify — public. Poll/verify a payment session after the Paystack redirect. */
enrollments.get("/:ref/payments/verify", async (c) => {
  const ref = c.req.param("ref").toUpperCase();
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
  if (status === "pending" && c.env.PAYSTACK_SECRET_KEY) {
    const res = await fetch(`https://api.paystack.co/transaction/verify/${payment.reference}`, {
      headers: { Authorization: `Bearer ${c.env.PAYSTACK_SECRET_KEY}` },
    }).catch(() => null);
    if (res?.ok) {
      const payload = (await res.json().catch(() => null)) as {
        status?: boolean;
        data?: { status?: string };
      } | null;
      const remote = payload?.data?.status;
      if (remote === "success") {
        await markPayment(c, payment.reference, "success");
        status = "success";
      } else if (remote === "failed" || remote === "abandoned") {
        await markPayment(c, payment.reference, "failed");
        status = "failed";
      }
    }
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
    verified: true,
  });
});

async function markPayment(
  c: { env: AppEnv },
  reference: string,
  outcome: "success" | "failed",
): Promise<void> {
  const row = await c.env.DB.prepare(`SELECT * FROM registration_payments WHERE reference = ?`)
    .bind(reference)
    .first<{
      id: string;
      registration_ref: string;
      kind: string;
      amount: number;
      status: string;
    }>();
  if (!row || row.status === outcome) return;

  const now = isoNow();
  await c.env.DB.prepare(`UPDATE registration_payments SET status = ?, paid_at = ? WHERE id = ?`)
    .bind(outcome, outcome === "success" ? now : null, row.id)
    .run();

  const enrollment = await c.env.DB.prepare(`SELECT * FROM registrations WHERE ref = ?`)
    .bind(row.registration_ref)
    .first<EnrollmentRow>();
  if (!enrollment) return;

  if (outcome === "success") {
    const isFull = row.kind === "full";
    const paidAmount = isFull ? row.amount : Math.max(enrollment.paid_amount, row.amount);
    const feeDue = feeDueFor(
      enrollment.program_kind,
      enrollment.fee_total,
      enrollment.payment_plan,
    );
    const status = isFull || paidAmount >= feeDue ? "paid" : "deposit_paid";
    await c.env.DB.prepare(
      `UPDATE registrations SET payment_status = ?, paid_amount = ?, paid_at = ?, updated_at = ? WHERE id = ?`,
    )
      .bind(status, paidAmount, now, now, enrollment.id)
      .run();
    await logEvent(
      c.env.DB,
      enrollment.ref,
      "payment_confirmed",
      `${row.kind} payment of ${row.amount} NGN (ref ${reference})`,
    );
    try {
      await sendEmail(c, {
        to: enrollment.email,
        subject: `Payment confirmed — ${enrollment.ref}`,
        html: receiptEmailHtml({
          ref: enrollment.ref,
          name: enrollment.first_name,
          programTitle: enrollment.program_title,
          amount: row.amount,
          kind: row.kind as "deposit" | "balance" | "full",
          remaining: Math.max(0, feeDue - paidAmount),
        }),
      });
    } catch {
      /* never block on email */
    }
  } else {
    const hasSuccess = await c.env.DB.prepare(
      `SELECT 1 AS x FROM registration_payments WHERE registration_ref = ? AND status = 'success'`,
    )
      .bind(row.registration_ref)
      .first<{ x: number }>();
    if (!hasSuccess) {
      await c.env.DB.prepare(
        `UPDATE registrations SET payment_status = 'failed', updated_at = ? WHERE id = ?`,
      )
        .bind(now, enrollment.id)
        .run();
    }
    await logEvent(c.env.DB, enrollment.ref, "payment_failed", `Payment ref ${reference} failed`);
  }
}

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

  const body = JSON.parse(rawBody) as {
    event?: string;
    data?: { reference?: string; amount?: number };
  };
  const reference = body.data?.reference;
  if (reference) {
    if (body.event === "charge.success") await markPayment(c, reference, "success");
    else if (body.event === "charge.failed") await markPayment(c, reference, "failed");
  }
  return c.json({ ok: true });
});

/** GET /admin — full records for admissions / finance / admin. */
enrollments.get("/admin", requireAuth, requireAdmin, async (c) => {
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

/** GET /:ref — public applicant status (events + payment state). */
enrollments.get("/:ref", async (c) => {
  const ref = c.req.param("ref").toUpperCase();
  const row = await c.env.DB.prepare(`SELECT * FROM registrations WHERE ref = ?`)
    .bind(ref)
    .first<EnrollmentRow>();
  if (!row) throw ApiError.notFound("No enrollment found with that reference.");
  const eventsRows = await c.env.DB.prepare(
    `SELECT event, detail, at FROM registration_events WHERE registration_ref = ? ORDER BY at ASC LIMIT 20`,
  )
    .bind(ref)
    .all<{ event: string; detail: string; at: string }>();
  const data = publicEnrollment(row, eventsRows.results);
  return c.json({
    ...data,
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
enrollments.patch("/:ref", requireAuth, requireAdmin, async (c) => {
  const admin = c.get("authUser");
  const ref = c.req.param("ref").toUpperCase();
  const { stage, note } = await parseBody(c, patchSchema);
  const now = isoNow();

  const row = await c.env.DB.prepare(`SELECT id, stage FROM registrations WHERE ref = ?`)
    .bind(ref)
    .first<{ id: string; stage: string }>();
  if (!row) throw ApiError.notFound("No enrollment found with that reference.");

  if (stage === "declined") {
    await c.env.DB.prepare(
      `UPDATE registrations SET stage = 'declined', note = ?, updated_at = ? WHERE id = ?`,
    )
      .bind(note ?? "", now, row.id)
      .run();
  } else {
    const currentIdx = STAGE_ORDER.indexOf(row.stage as (typeof STAGE_ORDER)[number]);
    const nextIdx = STAGE_ORDER.indexOf(stage);
    if (nextIdx < currentIdx) {
      throw ApiError.validation({ stage: ["Cannot move an enrollment backwards."] });
    }
    await c.env.DB.prepare(
      `UPDATE registrations SET stage = ?, note = ?, updated_at = ? WHERE id = ?`,
    )
      .bind(stage, note ?? "", now, row.id)
      .run();
    // Mirror into the legacy pipeline so the old admissions UI stays in sync.
    await c.env.DB.prepare(`UPDATE applications SET status = ?, updated_at = ? WHERE ref = ?`)
      .bind(stage, now, ref)
      .run();
  }

  await c.env.DB.prepare(
    `INSERT INTO audit_log (id, actor, action, time, severity, sort_order) VALUES (?, ?, ?, ?, 'info', 0)`,
  )
    .bind(crypto.randomUUID(), admin.email, `Enrollment ${ref} moved to ${stage}`, now)
    .run();
  await logEvent(c.env.DB, ref, `stage_${stage}`, note ?? "");
  return c.json({ ok: true, ref, stage, note: note ?? "", updatedAt: now });
});
