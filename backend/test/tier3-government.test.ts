import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

let staff: TestSession;
let student: TestSession;

beforeAll(async () => {
  await setupDb();
  staff = await createTestSession("admin@cea.ng");
  student = await createTestSession("student@cea.ng");
});

/**
 * Compliance content is held to a stricter rule than the rest of the demo data:
 * it must never claim a filing, an audit, an accreditation or a certification
 * that did not happen. A false "Filed" on this screen is worse than an empty
 * one. The assertions below encode that rule — see seeds/government-data.sql.
 */
const FABRICATED_MARKERS = [
  "RC 1423784", // wrong registration number
  "MBBS/PC/2024/0142", // fictional NUC licence
  "NUC",
  "FED-2026-0142", // fictional census filing reference
  "FED-2026-0089", // fictional annual-return reference
  "92/100", // invented audit score
  "Federal Ministry of Education",
  "staff certified",
];

const STAFF_COLLECTIONS = [
  "/v1/government-dashboard/overview",
  "/v1/government-dashboard/calendar",
  "/v1/government-dashboard/changes",
  "/v1/government-dashboard/documents",
  "/v1/government-dashboard/facts",
  "/v1/government-dashboard/reports",
  "/v1/government-dashboard/threads",
  "/v1/government-dashboard/checks",
  "/v1/government-dashboard/audits",
  "/v1/government-dashboard/filings",
  "/v1/government-dashboard/courses",
];

describe("GET /v1/government-dashboard (Government/compliance suite)", () => {
  it("403s non-staff roles", async () => {
    const res = await api("/v1/government-dashboard/filings", {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(403);
  });

  it.each(STAFF_COLLECTIONS)("lists %s for staff", async (path) => {
    const res = await api(path, { headers: cookieHeaders(staff.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<Record<string, unknown>>; total: number };
    expect(Array.isArray(body.items)).toBe(true);
    expect(body.total).toBe(body.items.length);
  });

  it("carries the real registration data, not the old placeholder", async () => {
    const res = await api("/v1/government-dashboard/facts", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; label: string; value: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    const map = Object.fromEntries(body.items.map((r) => [r.label, r.value]));
    expect(map["Registration"]).toContain("RC 8413776");
    expect(map["TIN"]).toBe("1086525399");
    expect(map["Branches"]).toBe("1 · Port Harcourt");
  });

  it("returns overview KPIs built from verifiable company facts", async () => {
    const res = await api("/v1/government-dashboard/overview", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; metric: string; valueLabel: string; delta: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.metric).toBe("CAC registration");
    expect(body.items[0]?.valueLabel).toBe("RC 8413776");
    expect(body.items[1]?.metric).toBe("Tax identification");
    expect(body.items[1]?.valueLabel).toBe("1086525399");
  });

  it("documents only policies that are actually published", async () => {
    const res = await api("/v1/government-dashboard/documents", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ title: string; versionLabel: string; status: string }>;
    };
    expect(body.items.length).toBe(3);
    for (const doc of body.items) {
      expect(doc.status).toBe("Published");
      expect(doc.versionLabel).toContain("cea.ng/");
    }
  });

  it("claims no filing until a real deadline is being tracked", async () => {
    const res = await api("/v1/government-dashboard/filings", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as { items: unknown[]; total: number };
    // CAC / NRS deadlines are tracked per docs/free-automation-plan-2026-10.md §11.
    // Until that lands, this must be empty — never seeded with invented "Filed" rows.
    expect(body.total).toBe(0);
  });

  it("claims no audit, report, inspection or staff certification", async () => {
    for (const path of [
      "/v1/government-dashboard/calendar",
      "/v1/government-dashboard/reports",
      "/v1/government-dashboard/threads",
      "/v1/government-dashboard/checks",
      "/v1/government-dashboard/audits",
      "/v1/government-dashboard/courses",
    ]) {
      const res = await api(path, { headers: cookieHeaders(staff.cookie) });
      const body = (await res.json()) as { total: number };
      expect(body.total, `${path} must not carry invented compliance records`).toBe(0);
    }
  });

  it("keeps regulatory items neutral — no claim that CEA is compliant", async () => {
    const res = await api("/v1/government-dashboard/changes", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ detail: string; status: string }>;
    };
    expect(body.items.length).toBeGreaterThanOrEqual(3);
    for (const item of body.items) {
      expect(item.status).toBe("Track");
      expect(item.detail.toLowerCase()).not.toContain("cea");
    }
  });

  it("exposes no fabricated compliance strings anywhere in the suite", async () => {
    for (const path of STAFF_COLLECTIONS) {
      const res = await api(path, { headers: cookieHeaders(staff.cookie) });
      const text = await res.text();
      for (const marker of FABRICATED_MARKERS) {
        expect(text, `${path} still contains "${marker}"`).not.toContain(marker);
      }
    }
  });
});
