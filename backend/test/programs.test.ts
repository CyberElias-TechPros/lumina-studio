import { beforeAll, describe, expect, it } from "vitest";
import { api, setupDb } from "./helpers";

beforeAll(async () => {
  await setupDb();
});

describe("GET /v1/programs", () => {
  it("returns seeded programs as Paginated<Program>", async () => {
    const res = await api("/v1/programs");
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      items: Array<{
        slug: string;
        mode: string;
        rating: number;
        learners: number;
        tools: string[];
      }>;
      total: number;
      nextCursor?: string;
    };
    expect(body.total).toBeGreaterThan(0);
    expect(body.items.length).toBe(body.total);
    expect(body.nextCursor).toBeDefined();
    expect(body.items.every((p) => p.rating === 0 && p.learners === 0)).toBe(true);
    expect(body.items.some((p) => p.mode.includes("Port Harcourt"))).toBe(true);
    expect(body.items.some((p) => p.tools.includes("TypeScript"))).toBe(true);
    expect(body.items.map((p) => p.slug)).toContain("full-stack-software-development");
  });

  it("walks the full cursor page without duplicates or gaps", async () => {
    const seen: string[] = [];
    let cursor: string | undefined;
    let pages = 0;
    do {
      const url = cursor
        ? `/v1/programs?limit=2&cursor=${encodeURIComponent(cursor)}`
        : "/v1/programs?limit=2";
      const res = await api(url);
      expect(res.status).toBe(200);
      const body = (await res.json()) as { items: Array<{ slug: string }>; nextCursor?: string };
      for (const item of body.items) {
        expect(seen).not.toContain(item.slug);
        seen.push(item.slug);
      }
      cursor = body.nextCursor;
      pages++;
      expect(pages).toBeLessThan(20);
    } while (cursor);
    expect(seen.length).toBeGreaterThan(2);
    expect(seen).toContain("full-stack-software-development");
  });

  it("clamps limit to 50", async () => {
    const res = await api("/v1/programs?limit=999");
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: unknown[] };
    expect(body.items.length).toBeLessThanOrEqual(50);
  });
});

describe("GET /v1/programs/:slug", () => {
  it("returns a full program with parsed JSON columns", async () => {
    const res = await api("/v1/programs/full-stack-software-development");
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      slug: string;
      engine: string;
      duration: string;
      price: number;
      outcomes: string[];
      modules: Array<{ title: string; lessons: number; hours: number }>;
    };
    expect(body.slug).toBe("full-stack-software-development");
    expect(body.engine).toBe("learning");
    expect(body.duration).toBe("9 months");
    expect(body.price).toBeGreaterThan(0);
    expect(body.outcomes.length).toBeGreaterThan(0);
    expect(body.modules.length).toBe(5);
    expect(body.modules[0]!.title).toBe("Programming Foundations");
  });

  it("returns NOT_FOUND for unknown slugs", async () => {
    const res = await api("/v1/programs/definitely-not-a-program");
    expect(res.status).toBe(404);
    const body = (await res.json()) as { error: { code: string } };
    expect(body.error.code).toBe("NOT_FOUND");
  });
});
