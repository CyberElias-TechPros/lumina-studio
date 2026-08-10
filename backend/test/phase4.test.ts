import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

let student: TestSession;
let admin: TestSession;

beforeAll(async () => {
  await setupDb();
  student = await createTestSession("student@cea.ng");
  admin = await createTestSession("admin@cea.ng");
});

interface Page<T> {
  items: T[];
  nextCursor?: string;
  total: number;
}

const ENDPOINTS = [
  "/v1/recruitment/postings",
  "/v1/recruitment/interviews",
  "/v1/recruitment/talent",
  "/v1/marketing/kpis",
  "/v1/marketing/campaigns",
  "/v1/marketing/email",
  "/v1/marketing/social",
  "/v1/marketing/landing-pages",
  "/v1/marketing/seo",
  "/v1/marketing/content-calendar",
  "/v1/marketing/leads",
  "/v1/marketing/reports",
  "/v1/marketing/funnel",
  "/v1/design/components",
  "/v1/design/flows",
  "/v1/design/prototypes",
  "/v1/design/tokens",
  "/v1/design/versions",
  "/v1/design/collaboration",
  "/v1/design/exports",
  "/v1/design/system-components",
  "/v1/design/kpis",
  "/v1/localization/projects",
  "/v1/localization/glossary",
  "/v1/localization/style-guides",
  "/v1/localization/translation-memory",
  "/v1/localization/dialects",
  "/v1/localization/variants",
  "/v1/localization/analytics",
  "/v1/localization/preview",
  "/v1/localization/kpis",
];

describe.each(ENDPOINTS)("Phase 4 endpoint %s", (path) => {
  it("requires auth", async () => {
    const res = await api(path);
    expect(res.status).toBe(401);
  });

  it("returns a seeded Paginated<T> page for admin", async () => {
    const res = await api(path, { headers: cookieHeaders(admin.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as Page<Record<string, unknown>>;
    expect(body.items.length).toBeGreaterThan(0);
    expect(typeof body.total).toBe("number");
    expect(body.items[0]).toBeTypeOf("object");
  });
});

describe("Phase 4 recruitment", () => {
  it("returns pipeline candidates for a job", async () => {
    const res = await api("/v1/recruitment/postings/post-4/candidates", {
      headers: cookieHeaders(admin.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as Page<{
      name: string;
      stage: string;
      detail: string;
      score: number;
    }>;
    expect(body.items.length).toBeGreaterThan(0);
    expect(body.items[0]).toMatchObject({
      name: expect.any(String),
      stage: expect.any(String),
      detail: expect.any(String),
      score: expect.any(Number),
    });
  });

  it("parses talent skills as arrays", async () => {
    const res = await api("/v1/recruitment/talent", {
      headers: cookieHeaders(admin.cookie),
    });
    const body = (await res.json()) as Page<{ skills: string[]; match: number }>;
    expect(Array.isArray(body.items[0]?.skills)).toBe(true);
    expect(typeof body.items[0]?.match).toBe("number");
  });
});

describe("Phase 4 marketing shapes", () => {
  it("campaigns expose numeric spend/leads and roas", async () => {
    const res = await api("/v1/marketing/campaigns", {
      headers: cookieHeaders(admin.cookie),
    });
    const body = (await res.json()) as Page<{ spend: number; leads: number; roas: number }>;
    expect(body.items[0]).toMatchObject({
      spend: expect.any(Number),
      leads: expect.any(Number),
      roas: expect.any(Number),
    });
  });

  it("email campaigns map open_rate to openRate", async () => {
    const res = await api("/v1/marketing/email", {
      headers: cookieHeaders(admin.cookie),
    });
    const body = (await res.json()) as Page<{
      title: string;
      recipients: number;
      openRate: number;
    }>;
    expect(body.items[0]).toMatchObject({
      title: expect.any(String),
      recipients: expect.any(Number),
      openRate: expect.any(Number),
    });
  });
});

describe("Phase 4 design shapes", () => {
  it("flows expose step lists", async () => {
    const res = await api("/v1/design/flows", {
      headers: cookieHeaders(admin.cookie),
    });
    const body = (await res.json()) as Page<{ t: string; steps: number; list: string[] }>;
    expect(body.items[0]).toMatchObject({ t: expect.any(String) });
    expect(body.items[0]?.list.length).toBeGreaterThan(0);
  });

  it("tokens expose kind-aware fields", async () => {
    const res = await api("/v1/design/tokens", {
      headers: cookieHeaders(admin.cookie),
    });
    const body = (await res.json()) as Page<{ kind: string; t: string; v: string }>;
    expect(["color", "type"]).toContain(body.items[0]?.kind);
    expect(body.items[0]?.t).toBeTruthy();
  });
});

describe("Phase 4 localization shapes", () => {
  it("style guides parse dos/donts as arrays", async () => {
    const res = await api("/v1/localization/style-guides", {
      headers: cookieHeaders(admin.cookie),
    });
    const body = (await res.json()) as Page<{ market: string; dos: string[]; donts: string[] }>;
    expect(Array.isArray(body.items[0]?.dos)).toBe(true);
    expect(Array.isArray(body.items[0]?.donts)).toBe(true);
  });

  it("dialects parse variants as arrays", async () => {
    const res = await api("/v1/localization/dialects", {
      headers: cookieHeaders(admin.cookie),
    });
    const body = (await res.json()) as Page<{
      group: string;
      variants: string[];
      coverage: number;
    }>;
    expect(body.items[0]?.group).toBeTruthy();
    expect(Array.isArray(body.items[0]?.variants)).toBe(true);
  });
});

describe("Phase 4 pagination", () => {
  it("postings paginate with a cursor", async () => {
    const res = await api("/v1/recruitment/postings?limit=2", {
      headers: cookieHeaders(admin.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as Page<unknown>;
    expect(body.items).toHaveLength(2);
    expect(body.nextCursor).toBeTruthy();
    const page2 = await api(`/v1/recruitment/postings?limit=2&cursor=${body.nextCursor}`, {
      headers: cookieHeaders(admin.cookie),
    });
    const body2 = (await page2.json()) as Page<unknown>;
    expect(body2.items.length).toBeGreaterThan(0);
  });
});
