/**
 * Mock handlers for the operational features added 2 Oct 2026: compliance
 * deadlines, cohorts, the schools programme, the assistant question log and the
 * receipt page. Same shapes as the Worker routes, so the UI is fully testable
 * without a backend.
 */
import { registerMock, registerMockPattern } from "@/lib/api/client";
import type { ApiRequestInit } from "@/lib/api/client";
import { ApiError } from "@/lib/errors";

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

function daysUntil(dueOn: string): number {
  const due = Date.parse(`${dueOn}T00:00:00.000Z`);
  const now = new Date();
  const base = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.round((due - base) / 86_400_000);
}

interface MockDeadline {
  id: string;
  title: string;
  authority: string;
  category: string;
  dueOn: string;
  recurrence: "none" | "annual" | "quarterly" | "monthly";
  notes: string | null;
  status: "open" | "done" | "waived";
  completedOn: string | null;
  completedBy: string | null;
}

/** Empty by default: deadlines are facts a human enters, never seed fiction. */
const deadlines: MockDeadline[] = [];

interface MockCohort {
  id: string;
  programSlug: string;
  label: string;
  kind: "short" | "long";
  startDate: string;
  endDate: string | null;
  days: string;
  timeSlot: "morning" | "afternoon" | "evening" | "any";
  mode: "onsite" | "online" | "hybrid";
  capacity: number | null;
  notes: string | null;
  status: "scheduled" | "running" | "completed" | "cancelled";
}

/** Synthetic fixtures for admin/API preview only; never treat these dates as a public schedule. */
const cohorts: MockCohort[] = [
  {
    id: "cohort-wdp-2026-11",
    programSlug: "web-development-professional",
    label: "Web Development Professional — November 2026 cohort",
    kind: "long" as const,
    startDate: "2026-11-02",
    endDate: "2027-04-30",
    days: "Mon/Wed/Fri",
    timeSlot: "evening" as const,
    mode: "hybrid" as const,
    capacity: 20,
    notes: "Next intake after this one: 16 February 2027.",
    status: "scheduled" as const,
  },
  {
    id: "cohort-itp-2026-11",
    programSlug: "it-professional-diploma",
    label: "IT Professional Diploma — November 2026 cohort",
    kind: "long" as const,
    startDate: "2026-11-02",
    endDate: "2027-04-30",
    days: "Mon/Wed/Fri",
    timeSlot: "morning" as const,
    mode: "onsite" as const,
    capacity: 20,
    notes: null,
    status: "scheduled" as const,
  },
];

interface MockInquiry {
  id: string;
  schoolName: string;
  level: "primary" | "secondary" | "mixed";
  contactName: string;
  contactRole: string | null;
  phone: string;
  email: string | null;
  studentCount: number | null;
  message: string | null;
  status: "new" | "contacted" | "converted" | "spam";
  schoolId: string | null;
  createdAt: string;
}

interface MockSchool {
  id: string;
  name: string;
  level: "primary" | "secondary" | "mixed";
  address: string | null;
  city: string | null;
  contactName: string | null;
  contactRole: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
  studentCount: number | null;
  status: "prospect" | "contacted" | "proposal_sent" | "negotiating" | "won" | "lost";
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

interface MockProposal {
  id: string;
  ref: string;
  schoolId: string;
  schoolName: string;
  schoolLevel: string;
  term: string;
  students: number;
  ratePerStudent: number;
  total: number;
  plan: { term: string; course: string }[];
  extras: { label: string; price: string }[];
  validUntil: string;
  status: "draft" | "sent" | "viewed" | "accepted" | "declined" | "expired";
  sentAt: string | null;
  viewedAt: string | null;
  decidedAt: string | null;
  acceptedBy: string | null;
  acceptedRole: string | null;
  createdAt: string;
}

const inquiries: MockInquiry[] = [
  {
    id: "inq-1",
    schoolName: "Rumuola Model Secondary School",
    level: "secondary",
    contactName: "Mrs. Ada Okafor",
    contactRole: "Head Teacher",
    phone: "08031234567",
    email: "head@rumuolamodel.example",
    studentCount: 120,
    message: "Interested in the third term, probably JSS2 and JSS3.",
    status: "new",
    schoolId: null,
    createdAt: new Date(Date.now() - 2 * 86_400_000).toISOString(),
  },
  {
    id: "inq-2",
    schoolName: "Ebony Road Primary School",
    level: "primary",
    contactName: "Mr. Chinedu Eze",
    contactRole: "Proprietor",
    phone: "08099887766",
    email: null,
    studentCount: 45,
    message: "We have a computer room with 15 systems.",
    status: "contacted",
    schoolId: "sch-1",
    createdAt: new Date(Date.now() - 6 * 86_400_000).toISOString(),
  },
];

const schools: MockSchool[] = [
  {
    id: "sch-1",
    name: "Ebony Road Primary School",
    level: "primary",
    address: "12 Ebony Road",
    city: "Port Harcourt",
    contactName: "Mr. Chinedu Eze",
    contactRole: "Proprietor",
    contactPhone: "08099887766",
    contactEmail: null,
    studentCount: 45,
    status: "proposal_sent",
    notes: "Prefers Tuesday mornings.",
    createdAt: new Date(Date.now() - 8 * 86_400_000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 86_400_000).toISOString(),
  },
];

const proposals: MockProposal[] = [
  {
    id: "prop-1",
    ref: "CEA-SCH-2K7F3A",
    schoolId: "sch-1",
    schoolName: "Ebony Road Primary School",
    schoolLevel: "primary",
    term: "First term, 2026/2027",
    students: 45,
    ratePerStudent: 17_500,
    total: 787_500,
    plan: [
      { term: "First term", course: "Computer & Digital Literacy" },
      { term: "Second term", course: "Microsoft Office for Kids" },
      { term: "Third term", course: "Scratch & Coding" },
    ],
    extras: [{ label: "Teacher training (2 half-days)", price: "₦150,000" }],
    validUntil: new Date(Date.now() + 21 * 86_400_000).toISOString().slice(0, 10),
    status: "sent",
    sentAt: new Date(Date.now() - 3 * 86_400_000).toISOString(),
    viewedAt: null,
    decidedAt: null,
    acceptedBy: null,
    acceptedRole: null,
    createdAt: new Date(Date.now() - 3 * 86_400_000).toISOString(),
  },
];

const PROPOSAL_INCLUDES = [
  "Curriculum, lesson plans and class materials",
  "Our instructors, teaching on your campus or online",
  "Hands-on projects — every student builds something they can show",
  "Assessment against Know → Do → Create levels",
  "Termly reports for the school and parents",
  "Certificates with verifiable codes, plus a Digital Skills Passport for each student",
];

const PROPOSAL_SCHOOL_PROVIDES = [
  "A timetable window of 1–2 sessions a week (45–90 minutes each)",
  "A classroom or computer room we can use for the sessions",
  "Names and class lists of participating students",
  "A staff contact to coordinate attendance and reporting",
  "Payment: 50% deposit before the first session, balance by mid-term",
];

const assistantQuestions: {
  question: string;
  answerPreview: string;
  fallback: boolean;
  page: string | null;
  createdAt: string;
}[] = [
  {
    question: "How much is the web development course?",
    answerPreview: "Web Development is ₦60,000 for 6 weeks…",
    fallback: false,
    page: "/programs/web-development",
    createdAt: new Date(Date.now() - 3_600_000).toISOString(),
  },
  {
    question: "Do you offer weekend classes?",
    answerPreview: "Classes run morning, afternoon and evening…",
    fallback: false,
    page: "/programs",
    createdAt: new Date(Date.now() - 7_200_000).toISOString(),
  },
  {
    question: "Can I pay in December instead?",
    answerPreview: "",
    fallback: true,
    page: "/apply",
    createdAt: new Date(Date.now() - 10_800_000).toISOString(),
  },
];

function feeForStudents(students: number): number {
  if (students >= 80) return 15_000;
  if (students >= 40) return 17_500;
  return 20_000;
}

function decorate(d: MockDeadline) {
  const daysRemaining = daysUntil(d.dueOn);
  const open = d.status === "open";
  return {
    ...d,
    daysRemaining,
    overdue: open && daysRemaining < 0,
    urgency: !open
      ? ("closed" as const)
      : daysRemaining < 0
        ? ("overdue" as const)
        : daysRemaining <= 7
          ? ("critical" as const)
          : daysRemaining <= 30
            ? ("soon" as const)
            : ("scheduled" as const),
  };
}

export function registerOperationsMocks(): void {
  /* compliance deadlines */
  registerMock("GET", "/v1/compliance/deadlines", async (init: ApiRequestInit) => {
    await delay();
    const url = new URL(`https://mock.local${init.path ?? ""}`);
    const status = url.searchParams.get("status") ?? "open";
    const items = deadlines
      .filter((d) => status === "all" || d.status === status)
      .map(decorate)
      .sort((a, b) => a.dueOn.localeCompare(b.dueOn));
    return { items };
  });
  registerMock("POST", "/v1/compliance/deadlines", async (init: ApiRequestInit) => {
    await delay();
    const body = (init.body ?? {}) as Partial<MockDeadline>;
    if (!body.title || !body.dueOn) {
      throw new ApiError(400, "FIELD_VALIDATION", "title and dueOn are required.");
    }
    const row: MockDeadline = {
      id: `deadline-${deadlines.length + 1}`,
      title: body.title,
      authority: body.authority ?? "other",
      category: body.category ?? "other",
      dueOn: body.dueOn,
      recurrence: body.recurrence ?? "none",
      notes: body.notes ?? null,
      status: "open",
      completedOn: null,
      completedBy: null,
    };
    deadlines.push(row);
    return { deadline: decorate(row) };
  });
  registerMockPattern("PATCH", "/v1/compliance/deadlines/*", async (init: ApiRequestInit) => {
    await delay();
    const id = (init.path ?? "").split("/").pop() ?? "";
    const row = deadlines.find((d) => d.id === id);
    if (!row) throw new ApiError(404, "NOT_FOUND", "No deadline with that id.");
    const body = (init.body ?? {}) as Partial<MockDeadline>;
    if (body.status) {
      row.status = body.status;
      row.completedOn = body.status === "done" ? new Date().toISOString() : null;
      row.completedBy = body.status === "done" ? "finance@cea.ng (demo)" : null;
    }
    if (body.dueOn) row.dueOn = body.dueOn;
    if (body.notes !== undefined) row.notes = body.notes;
    return { deadline: decorate(row) };
  });

  /* cohorts */
  registerMock("GET", "/v1/cohorts", async (init: ApiRequestInit) => {
    await delay();
    const url = new URL(`https://mock.local${init.path ?? ""}`);
    const program = url.searchParams.get("program");
    const includePast = url.searchParams.get("includePast") === "1";
    const today = new Date().toISOString().slice(0, 10);
    const items = cohorts.filter(
      (c) => (!program || c.programSlug === program) && (includePast || c.startDate >= today),
    );
    return { items: [...items].sort((a, b) => a.startDate.localeCompare(b.startDate)) };
  });
  registerMock("GET", "/v1/cohorts/next", async (init: ApiRequestInit) => {
    await delay();
    const url = new URL(`https://mock.local${init.path ?? ""}`);
    const program = url.searchParams.get("program");
    const today = new Date().toISOString().slice(0, 10);
    const cohort =
      [...cohorts]
        .filter((c) => c.startDate >= today && (!program || c.programSlug === program))
        .sort((a, b) => a.startDate.localeCompare(b.startDate))[0] ?? null;
    return { cohort, ics: cohort ? `/v1/cohorts/${cohort.id}/ics` : undefined };
  });
  registerMock("POST", "/v1/cohorts", async (init: ApiRequestInit) => {
    await delay();
    const body = (init.body ?? {}) as Record<string, unknown>;
    if (!body.label || !body.startDate) {
      throw new ApiError(400, "FIELD_VALIDATION", "label and startDate are required.");
    }
    const cohort = {
      id: `cohort-${cohorts.length + 1}`,
      programSlug: String(body.programSlug ?? ""),
      label: String(body.label),
      kind: (body.kind === "short" ? "short" : "long") as "short" | "long",
      startDate: String(body.startDate),
      endDate: body.endDate ? String(body.endDate) : null,
      days: String(body.days ?? "standard"),
      timeSlot: (body.timeSlot ?? "any") as "morning" | "afternoon" | "evening" | "any",
      mode: (body.mode ?? "onsite") as "onsite" | "online" | "hybrid",
      capacity: typeof body.capacity === "number" ? body.capacity : null,
      notes: body.notes ? String(body.notes) : null,
      status: "scheduled" as const,
    };
    cohorts.push(cohort);
    return { cohort };
  });
  registerMockPattern("PATCH", "/v1/cohorts/*", async (init: ApiRequestInit) => {
    await delay();
    const id = (init.path ?? "").split("/").pop() ?? "";
    const cohort = cohorts.find((c) => c.id === id);
    if (!cohort) throw new ApiError(404, "NOT_FOUND", "No cohort with that id.");
    Object.assign(cohort, init.body ?? {});
    return { cohort };
  });
  registerMockPattern("DELETE", "/v1/cohorts/*", async () => {
    await delay();
    return { ok: true };
  });

  /* schools */
  registerMock("POST", "/v1/schools/inquiries", async (init: ApiRequestInit) => {
    await delay(250);
    const body = (init.body ?? {}) as Partial<MockInquiry>;
    if (!body.schoolName || !body.contactName || !body.phone) {
      throw new ApiError(
        400,
        "FIELD_VALIDATION",
        "schoolName, contactName and phone are required.",
      );
    }
    inquiries.unshift({
      id: `inq-${inquiries.length + 1}`,
      schoolName: body.schoolName,
      level: body.level ?? "secondary",
      contactName: body.contactName,
      contactRole: body.contactRole ?? null,
      phone: body.phone,
      email: body.email ?? null,
      studentCount: body.studentCount ?? null,
      message: body.message ?? null,
      status: "new",
      schoolId: null,
      createdAt: new Date().toISOString(),
    });
    return {
      ok: true,
      message:
        "Thank you — we've received your request and will send a proposal within one working day.",
    };
  });
  registerMock("GET", "/v1/schools/inquiries", async (init: ApiRequestInit) => {
    await delay();
    const url = new URL(`https://mock.local${init.path ?? ""}`);
    const status = url.searchParams.get("status") ?? "new";
    const items = inquiries
      .filter((i) => status === "all" || i.status === status)
      .map((i) => ({
        ...i,
        suggestedRate: i.studentCount ? feeForStudents(i.studentCount) : null,
      }));
    return { items };
  });
  registerMockPattern("PATCH", "/v1/schools/inquiries/*", async (init: ApiRequestInit) => {
    await delay();
    const id = (init.path ?? "").split("/").pop() ?? "";
    const row = inquiries.find((i) => i.id === id);
    if (!row) throw new ApiError(404, "NOT_FOUND", "No enquiry with that id.");
    const body = (init.body ?? {}) as { status?: MockInquiry["status"]; schoolId?: string };
    if (body.status) row.status = body.status;
    if (body.schoolId) row.schoolId = body.schoolId;
    return { ok: true, status: row.status };
  });
  registerMock("GET", "/v1/schools", async () => {
    await delay();
    return {
      items: schools.map((s) => ({
        ...s,
        proposalCount: proposals.filter((p) => p.schoolId === s.id).length,
        lastProposalAt: proposals.find((p) => p.schoolId === s.id)?.createdAt ?? null,
      })),
    };
  });
  registerMock("POST", "/v1/schools", async (init: ApiRequestInit) => {
    await delay();
    const body = (init.body ?? {}) as Partial<MockSchool>;
    if (!body.name) throw new ApiError(400, "FIELD_VALIDATION", "name is required.");
    const id = `sch-${schools.length + 1}`;
    const now = new Date().toISOString();
    schools.push({
      id,
      name: body.name,
      level: body.level ?? "secondary",
      address: body.address ?? null,
      city: body.city ?? "Port Harcourt",
      contactName: body.contactName ?? null,
      contactRole: body.contactRole ?? null,
      contactPhone: body.contactPhone ?? null,
      contactEmail: body.contactEmail ?? null,
      studentCount: body.studentCount ?? null,
      status: body.status ?? "prospect",
      notes: body.notes ?? null,
      createdAt: now,
      updatedAt: now,
    });
    return { ok: true, id };
  });
  registerMockPattern("PATCH", "/v1/schools/*", async (init: ApiRequestInit) => {
    await delay();
    const path = (init.path ?? "").split("/").filter(Boolean);
    const id = path.pop() ?? "";
    const school = schools.find((s) => s.id === id);
    if (!school) throw new ApiError(404, "NOT_FOUND", "No school with that id.");
    Object.assign(school, init.body ?? {}, { updatedAt: new Date().toISOString() });
    return { ok: true };
  });
  registerMockPattern("POST", "/v1/schools/*/proposals", async (init: ApiRequestInit) => {
    await delay(200);
    const path = (init.path ?? "").split("/").filter(Boolean);
    const schoolId = path[path.length - 2] ?? "";
    const school = schools.find((s) => s.id === schoolId);
    if (!school) throw new ApiError(404, "NOT_FOUND", "No school with that id.");
    const body = (init.body ?? {}) as {
      term?: string;
      students?: number;
      ratePerStudent?: number;
      validDays?: number;
      extras?: { label: string; price: string }[];
    };
    const students = body.students ?? 20;
    const rate = body.ratePerStudent ?? feeForStudents(students);
    const ref = `CEA-SCH-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    proposals.unshift({
      id: `prop-${proposals.length + 1}`,
      ref,
      schoolId: school.id,
      schoolName: school.name,
      schoolLevel: school.level,
      term: body.term ?? "First term",
      students,
      ratePerStudent: rate,
      total: students * rate,
      plan:
        school.level === "primary"
          ? [
              { term: "First term", course: "Computer & Digital Literacy" },
              { term: "Second term", course: "Microsoft Office for Kids" },
              { term: "Third term", course: "Scratch & Coding" },
            ]
          : [
              { term: "First term", course: "Digital Productivity (MS Office + Google Workspace)" },
              { term: "Second term", course: "Graphic Design" },
              { term: "Third term", course: "Web Design & Coding Foundations" },
            ],
      extras: body.extras ?? [],
      validUntil: new Date(Date.now() + (body.validDays ?? 30) * 86_400_000)
        .toISOString()
        .slice(0, 10),
      status: "draft",
      sentAt: null,
      viewedAt: null,
      decidedAt: null,
      acceptedBy: null,
      acceptedRole: null,
      createdAt: new Date().toISOString(),
    });
    school.status = "proposal_sent";
    return { ok: true, ref, total: students * rate, ratePerStudent: rate };
  });
  registerMock("GET", "/v1/schools/proposals", async (init: ApiRequestInit) => {
    await delay();
    const url = new URL(`https://mock.local${init.path ?? ""}`);
    const schoolId = url.searchParams.get("school");
    return {
      items: proposals
        .filter((p) => !schoolId || p.schoolId === schoolId)
        .map(
          ({ id: _id, plan: _plan, extras: _extras, schoolLevel: _sl, schoolId: _sid, ...rest }) =>
            rest,
        ),
    };
  });
  registerMockPattern("GET", "/v1/schools/proposals/*", async (init: ApiRequestInit) => {
    await delay();
    const ref = (init.path ?? "").split("/").pop() ?? "";
    const row = proposals.find((p) => p.ref === ref.toUpperCase());
    if (!row) throw new ApiError(404, "NOT_FOUND", "No proposal with that reference.");
    if (!row.viewedAt) {
      row.viewedAt = new Date().toISOString();
      if (row.status === "sent") row.status = "viewed";
    }
    return {
      proposal: {
        ref: row.ref,
        schoolName: row.schoolName,
        schoolLevel: row.schoolLevel,
        term: row.term,
        students: row.students,
        ratePerStudent: row.ratePerStudent,
        total: row.total,
        plan: row.plan,
        extras: row.extras,
        includes: PROPOSAL_INCLUDES,
        schoolProvides: PROPOSAL_SCHOOL_PROVIDES,
        minimumStudents: 20,
        validUntil: row.validUntil,
        generatedAt: row.createdAt,
        paymentTerms:
          "50% deposit before the first session, balance by mid-term. The fee covers the full term per student.",
      },
      status: row.status,
      viewedAt: row.viewedAt,
    };
  });
  registerMockPattern("PATCH", "/v1/schools/proposals/*", async (init: ApiRequestInit) => {
    await delay();
    const path = (init.path ?? "").split("/").filter(Boolean);
    const ref = (path.pop() ?? "").toUpperCase();
    const row = proposals.find((p) => p.ref === ref);
    if (!row) throw new ApiError(404, "NOT_FOUND", "No proposal with that reference.");
    const body = (init.body ?? {}) as {
      decision: "sent" | "accepted" | "declined";
      acceptedBy?: string;
      acceptedRole?: string;
    };
    if (body.decision === "accepted" && (!body.acceptedBy || body.acceptedBy.length < 2)) {
      throw new ApiError(400, "FIELD_VALIDATION", "acceptedBy is required.");
    }
    row.status = body.decision === "sent" ? "sent" : body.decision;
    if (body.decision === "sent") row.sentAt = new Date().toISOString();
    if (body.decision !== "sent") {
      row.decidedAt = new Date().toISOString();
      row.acceptedBy = body.acceptedBy ?? null;
      row.acceptedRole = body.acceptedRole ?? null;
      const school = schools.find((s) => s.id === row.schoolId);
      if (school) school.status = body.decision === "accepted" ? "won" : "lost";
    }
    return { ok: true, status: row.status };
  });

  /* assistant question log */
  registerMock("GET", "/v1/assistant/questions", async () => {
    await delay();
    const seen = new Map<string, number>();
    for (const q of assistantQuestions) {
      const key = q.question.toLowerCase();
      seen.set(key, (seen.get(key) ?? 0) + 1);
    }
    return {
      days: 30,
      asked: assistantQuestions.length,
      fallbacks: assistantQuestions.filter((q) => q.fallback).length,
      topRepeated: [...seen.entries()]
        .filter(([, n]) => n > 1)
        .map(([question, count]) => ({ question, count })),
      unanswered: assistantQuestions
        .filter((q) => q.fallback)
        .map((q) => ({
          question: q.question,
          answerPreview: q.answerPreview,
          page: q.page,
          createdAt: q.createdAt,
        })),
      recent: assistantQuestions.map((q) => ({
        question: q.question,
        fallback: q.fallback,
        page: q.page,
        createdAt: q.createdAt,
      })),
    };
  });

  /* receipt */
  registerMockPattern("GET", "/v1/enrollments/*/receipt", async (init: ApiRequestInit) => {
    await delay(200);
    const path = (init.path ?? "").split("/").filter(Boolean);
    const ref = (path[path.length - 2] ?? "").toUpperCase();
    const paid = ref.includes("PAID") || ref.includes("DEMO");
    return {
      receipt: {
        ref,
        studentName: "Ada Obi",
        email: "ada@example.com",
        programTitle: "Web Development",
        programKind: "short",
        issuedBy: {
          name: "Cyber Elias Academy Ltd",
          rc: "RC 8413776",
          tin: "TIN 1086525399",
          address: "24/26 Ebony Road, off Rumuola Road, Port Harcourt",
          email: "help@cea.ng",
          phone: "+234 905 862 8386",
        },
        feeTotal: 60_000,
        feeDue: 60_000,
        paidAmount: paid ? 60_000 : 0,
        balance: paid ? 0 : 60_000,
        payments: paid
          ? [
              {
                reference: "mock_cea_bt_0001",
                kind: "full",
                amount: 60_000,
                method: "bank-transfer",
                receiptNo: `CEA-RCPT-${new Date().getFullYear()}-0001`,
                paidAt: new Date().toISOString(),
              },
            ]
          : [],
        latestReceiptNo: paid ? `CEA-RCPT-${new Date().getFullYear()}-0001` : null,
        issuedAt: paid ? new Date().toISOString() : null,
      },
    };
  });
}
