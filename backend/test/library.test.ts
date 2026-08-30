import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";
import { seedExternalLinksSql } from "../seeds/external-links";
import { seedLibrarySql } from "../seeds/library";

interface LibraryItem {
  id: string;
  sourceKey: string;
  folderPath: string;
  name: string;
  kind: "file" | "folder" | "link";
  driveFileId: string;
  url: string;
  isProtected: boolean;
}

interface CatalogBody {
  sources: { key: string; name: string; itemCount: number }[];
  items: LibraryItem[];
  total: number;
}

const EXTERNAL_LINK_COUNT = seedExternalLinksSql
  .split("\n")
  .filter((l) => l.trim().startsWith("INSERT OR IGNORE")).length;
const LIBRARY_ITEM_COUNT = seedLibrarySql
  .split("\n")
  .filter((l) => l.trim().startsWith("INSERT OR IGNORE")).length;
const FULL_TOTAL = LIBRARY_ITEM_COUNT + EXTERNAL_LINK_COUNT;

let studentCookie: string;

beforeAll(async () => {
  await setupDb();
  studentCookie = (await createTestSession("student@cea.ng")).cookie;
});

describe("GET /v1/library/catalog (public)", () => {
  it("serves public items without auth, but never protected ones", async () => {
    const res = await api("/v1/library/catalog");
    expect(res.status).toBe(200);
    const body = (await res.json()) as CatalogBody;
    expect(body.sources.length).toBeGreaterThan(0);
    expect(body.items.every((i) => !i.isProtected)).toBe(true);
    expect(body.items.some((i) => i.name === "GLOSSARY")).toBe(true);
    expect(body.items.some((i) => i.name === "AGILE")).toBe(false);
  });

  it("serves external resource links publicly", async () => {
    const res = await api("/v1/library/catalog?limit=5000");
    expect(res.status).toBe(200);
    const body = (await res.json()) as CatalogBody;
    const links = body.items.filter((i) => i.kind === "link");
    expect(links.length).toBeGreaterThan(100);
    expect(links.some((i) => i.sourceKey === "external")).toBe(true);
    expect(links.some((i) => i.folderPath === "External Resources / Coding Roadmaps")).toBe(true);
    expect(links.every((i) => i.url.startsWith("http"))).toBe(true);
  });

  it("reports public and protected counts from the auth endpoint", async () => {
    const publicCount = ((await (await api("/v1/library/catalog")).json()) as CatalogBody).total;
    const full = (await (
      await api("/v1/library", { headers: cookieHeaders(studentCookie) })
    ).json()) as { total: number };
    expect(full.total).toBeGreaterThan(publicCount);
  });
});

describe("GET /v1/library (authenticated)", () => {
  it("returns protected course materials for an authenticated student", async () => {
    const res = await api("/v1/library?limit=10000", {
      headers: cookieHeaders(studentCookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: LibraryItem[]; total: number };
    expect(body.total).toBe(FULL_TOTAL);
    expect(body.items.some((i) => i.isProtected)).toBe(true);
    expect(body.items.some((i) => i.sourceKey === "ds-toolbox")).toBe(true);
    expect(body.items.some((i) => i.kind === "file" && i.url.includes("/file/d/"))).toBe(true);
    expect(body.items.some((i) => i.kind === "link" && i.url.startsWith("https://"))).toBe(true);
  });

  it("requires auth", async () => {
    const res = await api("/v1/library");
    expect(res.status).toBe(401);
  });
});

describe("GET /v1/library/:id", () => {
  it("returns a single item for authenticated users", async () => {
    const res = await api("/v1/library/lib-ba-library-3", {
      headers: cookieHeaders(studentCookie),
    });
    expect(res.status).toBe(200);
    const item = (await res.json()) as LibraryItem;
    expect(item.name).toBe("02-AgileSoftwareDevelopment.pdf");
    expect(item.kind).toBe("file");
    expect(item.isProtected).toBe(true);
  });

  it("404s for unknown ids", async () => {
    const res = await api("/v1/library/lib-missing", {
      headers: cookieHeaders(studentCookie),
    });
    expect(res.status).toBe(404);
  });
});
