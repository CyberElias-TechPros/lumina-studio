import { describe, expect, it, beforeAll } from "vitest";
import { allowedOrigins, isAllowedOrigin } from "../src/lib/env.ts";
import { body, call, migrate, reset } from "./helpers.ts";

/**
 * CORS.
 *
 * These cover the shape of the failure that takes the site down in production: the
 * frontend asking for `/bootstrap` instead of `/v1/bootstrap`. That route does not
 * exist, and with CORS scoped to `/v1/*` the resulting 404 carried no CORS headers
 * — so the browser reported "No 'Access-Control-Allow-Origin' header is present"
 * and the real cause was invisible in devtools. Two invariants keep that from
 * coming back: CORS answers on every path, and a miss says what it means.
 *
 * `FRONTEND_ORIGINS` in vitest.config.ts is `http://localhost:5173`.
 */

const ALLOWED = "http://localhost:5173";

describe("cors", () => {
  beforeAll(async () => {
    await migrate();
    await reset();
  });

  it("marks every response as varying by Origin, allowed or not", async () => {
    const hit = await call("/v1/health", { headers: { origin: ALLOWED } });
    const miss = await call("/v1/health", { headers: { origin: "https://evil.example" } });

    expect(hit.headers.get("vary")).toContain("Origin");
    expect(miss.headers.get("vary")).toContain("Origin");
  });

  it("lets a listed origin read a protected route with credentials", async () => {
    const res = await call("/v1/invoices", { headers: { origin: ALLOWED } });
    expect(res.status).toBe(401);
    expect(res.headers.get("access-control-allow-origin")).toBe(ALLOWED);
    expect(res.headers.get("access-control-allow-credentials")).toBe("true");
  });

  it("answers a preflight before the session gate can reject it", async () => {
    const res = await call("/v1/invoices", {
      method: "OPTIONS",
      headers: {
        origin: ALLOWED,
        "access-control-request-method": "POST",
        "access-control-request-headers": "content-type,idempotency-key",
      },
    });

    expect(res.status).toBe(204);
    expect(res.headers.get("access-control-allow-origin")).toBe(ALLOWED);
    expect(res.headers.get("access-control-allow-methods")).toContain("POST");
    expect(res.headers.get("access-control-allow-headers")).toContain("Idempotency-Key");
    expect(res.headers.get("access-control-max-age")).toBe("86400");
  });

  it("still sends CORS headers on a path outside /v1", async () => {
    const preflight = await call("/bootstrap", {
      method: "OPTIONS",
      headers: { origin: ALLOWED, "access-control-request-method": "GET" },
    });
    expect(preflight.status).toBe(204);
    expect(preflight.headers.get("access-control-allow-origin")).toBe(ALLOWED);

    const get = await call("/bootstrap", { headers: { origin: ALLOWED } });
    expect(get.status).toBe(404);
    // The point of the whole test: the browser has to be able to *read* this 404.
    expect(get.headers.get("access-control-allow-origin")).toBe(ALLOWED);
  });

  it("explains an unversioned path instead of returning a bare 404", async () => {
    const res = await call("/auth/session", { headers: { origin: ALLOWED } });
    expect(res.status).toBe(404);

    const payload = await body<{ error: { code: string; message: string } }>(res);
    expect(payload.error.code).toBe("not_found");
    expect(payload.error.message).toContain("/v1");
    expect(payload.error.message).toContain("/v1/auth/session");
  });

  it("does not guess a hint for a versioned path, which the gate answers", async () => {
    // `/v1/*` is guarded before routing, so an unknown versioned path is a 401
    // with the standard unauthorised body — no `not_found` editorialising.
    const res = await call("/v1/no-such-route", { headers: { origin: ALLOWED } });
    expect(res.status).toBe(401);
    const payload = await body<{ error: { code: string } }>(res);
    expect(payload.error.code).not.toBe("not_found");
  });

  it("never reflects a wildcard or an unlisted origin", async () => {
    for (const origin of ["https://evil.example", "https://delgra.freegameplay.site", "null"]) {
      const res = await call("/v1/health", { headers: { origin } });
      expect(res.headers.get("access-control-allow-origin")).toBeNull();
    }
  });

  it("matches the allowlist exactly, not by prefix", async () => {
    const res = await call("/v1/health", { headers: { origin: `${ALLOWED}.attacker.example` } });
    expect(res.headers.get("access-control-allow-origin")).toBeNull();
  });
});

describe("origin allowlist parsing", () => {
  const env = (FRONTEND_ORIGINS?: string) => ({ FRONTEND_ORIGINS }) as never;

  it("tolerates whitespace and a trailing slash on an entry", () => {
    // `APP_URL` is configured with a trailing slash, so an allowlist copied from
    // it must not silently deny the frontend.
    expect(allowedOrigins(env("https://delgra.freegameplay.site/, http://localhost:5173 ,"))).toEqual([
      "https://delgra.freegameplay.site",
      "http://localhost:5173",
    ]);
    expect(isAllowedOrigin(env("https://delgra.freegameplay.site/"), "https://delgra.freegameplay.site")).toBe(true);
  });

  it("treats * as a literal that matches nothing, never as a wildcard", () => {
    expect(isAllowedOrigin(env("*"), "https://anywhere.example")).toBe(false);
  });

  it("denies a request with no Origin and an unset allowlist", () => {
    expect(isAllowedOrigin(env(ALLOWED), undefined)).toBe(false);
    expect(isAllowedOrigin(env(), ALLOWED)).toBe(false);
    expect(allowedOrigins(env())).toEqual([]);
  });
});
