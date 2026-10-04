import { registerMock, registerMockPattern } from "@/lib/api/client";
import type { ApiRequestInit } from "@/lib/api/client";
import { ApiError } from "@/lib/errors";
import { flyerCourses, longformPrograms } from "@/data/academy";
import type { AdminEnrollment } from "@/lib/api/enrollments";

function delay(milliseconds = 150): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

interface MockEnrollment {
  ref: string;
  createdAt: string;
  updatedAt: string;
  stage: string;
  input: Record<string, unknown>;
  programSlug: string;
  programTitle: string;
  programKind: "short" | "long";
  feeTotal: number;
  depositAmount: number;
  paymentPlan: string;
  paymentMethod: string;
  paymentStatus: "unpaid" | "deposit_paid" | "paid" | "failed";
  proof?: { status: "pending_review"; amount: number; expectedAmount: number; submittedAt: string };
  paidAmount: number;
  paidAt: string | null;
  paymentRef: string | null;
  pendingPayment?: { reference: string; kind: "deposit" | "full"; amount: number };
  events: { event: string; detail: string; at: string }[];
}

const store = new Map<string, MockEnrollment>();

/** Demo leads so the funnel is visible in mock mode. */
function seedStore(): void {
  const day = 86_400_000;
  const mk = (
    slug: string,
    name: [string, string],
    email: string,
    phone: string,
    plan: string,
    method: string,
    stage: string,
    paymentStatus: "unpaid" | "deposit_paid" | "paid",
    daysAgo: number,
    goal: string,
  ): MockEnrollment => {
    const program = feeInfo(slug)!;
    const now = new Date(Date.now() - daysAgo * day).toISOString();
    const deposit =
      program.kind === "short" ? Math.round(program.fee / 2) : Math.round(program.fee * 0.3);
    const paid =
      paymentStatus === "paid"
        ? plan === "full-10-off"
          ? Math.round(program.fee * 0.9)
          : program.fee
        : paymentStatus === "deposit_paid"
          ? deposit
          : 0;
    return {
      ref: `CEA-${new Date().getFullYear()}-DEMO${slug.slice(0, 3).toUpperCase()}${daysAgo}`,
      createdAt: now,
      updatedAt: now,
      stage,
      input: {
        firstName: name[0],
        lastName: name[1],
        email,
        phone,
        city: "Port Harcourt",
        mode: "onsite",
        scheduleDays: program.kind === "long" ? "mwf" : "standard",
        timeSlot: "morning",
        hasLaptop: true,
        goal,
        referredBy: "Social media",
      },
      programSlug: slug,
      programTitle: program.title,
      programKind: program.kind,
      feeTotal: program.fee,
      depositAmount: deposit,
      paymentPlan: plan,
      paymentMethod: method,
      paymentStatus,
      paidAmount: paid,
      paidAt: paymentStatus === "unpaid" ? null : now,
      paymentRef: paymentStatus === "unpaid" ? null : `mock_seed_${slug}`,
      events: [
        { event: "submitted", detail: `${program.title} · ${plan} plan`, at: now },
        ...(paymentStatus !== "unpaid"
          ? [{ event: "payment_confirmed", detail: `Payment of ${paid} NGN`, at: now }]
          : []),
      ],
    };
  };
  const seeds = [
    mk(
      "web-development-professional",
      ["Adaeze", "Okafor"],
      "adaeze.okafor@example.com",
      "+2348030001111",
      "deposit-monthly",
      "paystack",
      "offer",
      "deposit_paid",
      2,
      "Get hired as a web developer in Port Harcourt.",
    ),
    mk(
      "microsoft-office",
      ["Chidi", "Eze"],
      "chidi.eze@example.com",
      "+2348030002222",
      "50-50",
      "paystack",
      "submitted",
      "unpaid",
      1,
      "Office job — need clean documents and spreadsheets.",
    ),
    mk(
      "it-professional-diploma",
      ["Funke", "Adeyemi"],
      "funke.adeyemi@example.com",
      "+2348030003333",
      "full-10-off",
      "bank-transfer",
      "enrolled",
      "paid",
      9,
      "Move from sales into an IT support role.",
    ),
  ];
  for (const s of seeds) store.set(s.ref, s);
}
seedStore();

function feeInfo(slug: string): {
  title: string;
  kind: "short" | "long";
  fee: number;
} | null {
  const short = flyerCourses.find((c) => c.slug === slug);
  if (short) return { title: short.title, kind: "short", fee: short.fee };
  const long = longformPrograms.find((p) => p.slug === slug);
  if (long) return { title: long.title, kind: "long", fee: long.fee };
  return null;
}

function makeRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 6; i += 1) suffix += chars[Math.floor(Math.random() * chars.length)];
  return `CEA-${new Date().getFullYear()}-${suffix}`;
}

function feeDue(e: MockEnrollment): number {
  if (e.programKind === "long" && e.paymentPlan === "full-10-off")
    return Math.round(e.feeTotal * 0.9);
  return e.feeTotal;
}

function publicStatus(e: MockEnrollment) {
  const stages = [
    { key: "submitted", label: "Application received" },
    { key: "screening", label: "Screening" },
    { key: "assessment", label: "Assessment" },
    { key: "interview", label: "Interview" },
    { key: "offer", label: "Offer" },
    { key: "enrolled", label: "Enrolled" },
  ];
  const idx = stages.findIndex((s) => s.key === e.stage);
  return {
    ref: e.ref,
    stage: e.stage,
    programSlug: e.programSlug,
    programTitle: e.programTitle,
    programKind: e.programKind,
    feeTotal: e.feeTotal,
    feeDue: feeDue(e),
    schedule: {
      days: e.input.scheduleDays ?? "standard",
      timeSlot: e.input.timeSlot ?? "any",
      mode: e.input.mode ?? "onsite",
      preferredStart: (e.input.preferredStart as string) ?? null,
    },
    payment: {
      plan: e.paymentPlan,
      method: e.paymentMethod,
      status: e.paymentStatus,
      depositAmount: e.depositAmount,
      paidAmount: e.paidAmount,
      amountDue: Math.max(0, feeDue(e) - e.paidAmount),
      paidAt: e.paidAt,
      reference: e.paymentRef,
      review: e.proof
        ? {
            status: e.proof.status,
            amount: e.proof.amount,
            expectedAmount: e.proof.expectedAmount,
            submittedAt: e.proof.submittedAt,
            reviewedAt: null,
          }
        : null,
    },
    events: e.events,
    stages: stages.map((s, i) => ({ ...s, done: i < idx, active: i === idx })),
    nextSteps: [
      `Confirmation email sent (reference ${e.ref}).`,
      "We will call or WhatsApp you within 24 working hours to confirm dates.",
      "If you choose to pay, use the payment link on your application page; payment is recorded against your application.",
      "Admissions confirms course availability, your place and start date before sharing the schedule and welcome-pack details.",
    ],
    contact: {
      phone: "+2349058628386",
      whatsapp: "https://wa.me/2349058628386",
      email: "help@cea.ng",
      address: "24/26 Ebony Road, Off Rumuola Road, Port Harcourt",
      hours: "Mon–Sat, 8:00–20:00 WAT",
    },
    createdAt: e.createdAt,
    updatedAt: e.updatedAt,
  };
}

export function registerEnrollmentMocks(): void {
  registerMock("POST", "/v1/enrollments", async (init: ApiRequestInit) => {
    await delay(250);
    const input = (init.body ?? {}) as Record<string, unknown>;
    const program = feeInfo(String(input.programSlug ?? ""));
    if (!program) throw new ApiError(400, "PROGRAM_NOT_FOUND", "That program does not exist.");
    const validPlans =
      program.kind === "short" ? ["full", "50-50"] : ["deposit-monthly", "full-10-off"];
    if (!validPlans.includes(String(input.paymentPlan))) {
      throw new ApiError(400, "FIELD_VALIDATION", "Invalid payment plan for this program.");
    }
    if (!input.consentPrivacy || !input.consentTerms) {
      throw new ApiError(400, "FIELD_VALIDATION", "Consent is required.");
    }
    const ref = makeRef();
    const now = new Date().toISOString();
    const enrollment: MockEnrollment = {
      ref,
      createdAt: now,
      updatedAt: now,
      stage: "submitted",
      input,
      programSlug: String(input.programSlug),
      programTitle: program.title,
      programKind: program.kind,
      feeTotal: program.fee,
      depositAmount:
        program.kind === "short" ? Math.round(program.fee / 2) : Math.round(program.fee * 0.3),
      paymentPlan: String(input.paymentPlan),
      paymentMethod: String(input.paymentMethod ?? "paystack"),
      paymentStatus: "unpaid",
      paidAmount: 0,
      paidAt: null,
      paymentRef: null,
      events: [
        { event: "submitted", detail: `${program.title} · ${input.paymentPlan} plan`, at: now },
      ],
    };
    store.set(ref, enrollment);
    return {
      enrollment: {
        ref,
        status: "submitted",
        stage: "submitted",
        payment: {
          plan: enrollment.paymentPlan,
          method: enrollment.paymentMethod,
          status: "unpaid",
          depositAmount: enrollment.depositAmount,
          feeTotal: program.fee,
          feeDue: feeDue(enrollment),
        },
        nextSteps: [
          "Check your inbox — confirmation sent.",
          "We will contact you within 24 working hours.",
          "If you choose to pay, use the payment link or status page; payment is recorded against your application.",
          "Admissions confirms course availability, your place and start date before sharing the welcome-pack details.",
        ],
        trackUrl: `/apply/status/${ref}`,
      },
    };
  });

  registerMock("GET", "/v1/enrollments/admin", async () => {
    await delay(150);
    const items: AdminEnrollment[] = [...store.values()].map((e) => ({
      id: e.ref,
      ref: e.ref,
      programSlug: e.programSlug,
      programKind: e.programKind,
      programTitle: e.programTitle,
      feeTotal: e.feeTotal,
      payment: {
        plan: e.paymentPlan,
        method: e.paymentMethod,
        status: e.paymentStatus,
        depositAmount: e.depositAmount,
        paidAmount: e.paidAmount,
        amountDue: Math.max(0, feeDue(e) - e.paidAmount),
        paidAt: e.paidAt,
        reference: e.paymentRef,
      },
      student: {
        firstName: String(e.input.firstName ?? ""),
        lastName: String(e.input.lastName ?? ""),
        fullName: `${e.input.firstName ?? ""} ${e.input.lastName ?? ""}`,
        email: String(e.input.email ?? ""),
        phone: String(e.input.phone ?? ""),
        city: String(e.input.city ?? ""),
        mode: String(e.input.mode ?? "onsite"),
        scheduleDays: String(e.input.scheduleDays ?? "standard"),
        timeSlot: String(e.input.timeSlot ?? "any"),
        goal: (e.input.goal as string) ?? null,
        referredBy: (e.input.referredBy as string) ?? null,
        hasLaptop: Boolean(e.input.hasLaptop ?? true),
        birthYear: (e.input.birthYear as number) ?? null,
        gender: (e.input.gender as string) ?? null,
        educationLevel: (e.input.educationLevel as string) ?? null,
      },
      stage: e.stage,
      note: "",
      turnstilePassed: false,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    }));
    return { items, total: items.length };
  });

  registerMockPattern("POST", "/v1/enrollments/*", async (init: ApiRequestInit) => {
    const path = (init.path ?? "").split("/").filter(Boolean);
    const last = path[path.length - 1] ?? "";
    const ref = (
      last === "transfer" ? (path[path.length - 3] ?? "") : (path[path.length - 2] ?? "")
    ).toUpperCase();
    if (last === "webhook") return { ok: true };
    if (last === "transfer") {
      await delay(250);
      const enrollment = store.get(ref);
      if (!enrollment)
        throw new ApiError(404, "NOT_FOUND", "No enrollment found with that reference. ");
      if (enrollment.paymentStatus === "paid") {
        throw new ApiError(409, "ALREADY_PAID", "This enrollment is already fully paid.");
      }
      const body = (init.body ?? {}) as {
        kind?: "deposit" | "full";
        amount?: number;
        senderName?: string;
      };
      if (!body.senderName || !body.amount || body.amount <= 0) {
        throw new ApiError(400, "FIELD_VALIDATION", "senderName and amount are required.");
      }
      const kind = body.kind === "deposit" ? "deposit" : "full";
      const expected = kind === "deposit" ? enrollment.depositAmount : feeDue(enrollment);
      enrollment.proof = {
        status: "pending_review",
        amount: body.amount,
        expectedAmount: expected,
        submittedAt: new Date().toISOString(),
      };
      enrollment.events.push({
        event: "transfer_proof_received",
        detail: `${kind} transfer of ${body.amount} NGN reported (expected ${expected})`,
        at: new Date().toISOString(),
      });
      return {
        ok: true,
        status: "pending_review",
        amount: body.amount,
        expectedAmount: expected,
        message:
          "Thank you — we've received your transfer report. Finance will confirm it during working hours and send your receipt.",
      };
    }
    if (last !== "payments") throw new ApiError(404, "NOT_FOUND", "Not found. ");
    await delay(250);
    const enrollment = store.get(ref);
    if (!enrollment)
      throw new ApiError(404, "NOT_FOUND", "No enrollment found with that reference. ");
    if (enrollment.paymentStatus === "paid") {
      throw new ApiError(409, "ALREADY_PAID", "This enrollment is already fully paid.");
    }
    const body = (init.body ?? {}) as { kind?: string };
    const kind = body.kind === "deposit" ? "deposit" : "full";
    if (
      kind === "deposit" &&
      enrollment.paymentPlan !== "50-50" &&
      enrollment.paymentPlan !== "deposit-monthly"
    ) {
      throw new ApiError(400, "FIELD_VALIDATION", "This plan does not use a deposit.");
    }
    const amount = kind === "deposit" ? enrollment.depositAmount : feeDue(enrollment);
    const reference = `mock_enr_${Math.random().toString(36).slice(2, 10)}`;
    enrollment.paymentRef = reference;
    enrollment.pendingPayment = { reference, kind, amount };
    return {
      reference,
      authorizationUrl: `/apply/pay?reference=${reference}&enrollment=${ref}&mock=1`,
      mock: true,
      amount,
    };
  });

  registerMockPattern("GET", "/v1/enrollments/*", async (init: ApiRequestInit) => {
    const path = (init.path ?? "").split("?")[0].split("/").filter(Boolean);
    await delay(150);
    const ref = (path[path.length - 2] ?? "").toUpperCase();
    const enrollment = store.get(ref);
    if (!enrollment)
      throw new ApiError(404, "NOT_FOUND", "No enrollment found with that reference. ");
    if (path[path.length - 1] === "verify") {
      const reference =
        new URL(`https://mock.local${init.path ?? ""}`).searchParams.get("reference") ?? "";
      if (enrollment.pendingPayment?.reference === reference) {
        // Simulate a completed payment.
        const isFull = enrollment.pendingPayment.kind === "full";
        enrollment.paidAmount = isFull
          ? enrollment.pendingPayment.amount
          : enrollment.paidAmount + enrollment.pendingPayment.amount;
        enrollment.paymentStatus =
          isFull || enrollment.paidAmount >= feeDue(enrollment) ? "paid" : "deposit_paid";
        enrollment.paidAt = new Date().toISOString();
        enrollment.events.push({
          event: "payment_confirmed",
          detail: `${enrollment.pendingPayment.kind} payment of ${enrollment.pendingPayment.amount} NGN`,
          at: new Date().toISOString(),
        });
        enrollment.pendingPayment = undefined;
      }
      return {
        reference,
        kind: enrollment.pendingPayment?.kind ?? "full",
        amount: enrollment.pendingPayment?.amount ?? 0,
        status: enrollment.paymentStatus === "unpaid" ? "pending" : enrollment.paymentStatus,
        enrollmentPaymentStatus: enrollment.paymentStatus,
        verified: true,
      };
    }
    return publicStatus(enrollment);
  });

  registerMockPattern("PATCH", "/v1/enrollments/*", async (init: ApiRequestInit) => {
    const path = (init.path ?? "").split("/").filter(Boolean);
    const ref = (path[path.length - 1] ?? "").toUpperCase();
    await delay(150);
    const enrollment = store.get(ref);
    if (!enrollment)
      throw new ApiError(404, "NOT_FOUND", "No enrollment found with that reference. ");
    const body = (init.body ?? {}) as { stage?: string; note?: string };
    enrollment.stage = body.stage ?? enrollment.stage;
    enrollment.updatedAt = new Date().toISOString();
    enrollment.events.push({
      event: `stage_${enrollment.stage}`,
      detail: body.note ?? "",
      at: enrollment.updatedAt,
    });
    return {
      ok: true,
      ref,
      stage: enrollment.stage,
      note: body.note ?? "",
      updatedAt: enrollment.updatedAt,
    };
  });
}
