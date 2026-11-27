import { test } from "node:test";
import assert from "node:assert/strict";

const { isSafeReturnPath, resolvePostSignInPath, rememberReturnPath, consumeReturnPath } =
  await import("../../src/lib/auth/return-path.ts");

/* ------------------------------------------------------------------ *
 * Open-redirect protection
 * ------------------------------------------------------------------ */

test("absolute and protocol-relative destinations are rejected", () => {
  // Each of these is a way to leave the origin. If any one got through, a
  // successful sign-in would hand the authenticated session to an attacker.
  const hostile = [
    "https://evil.example/steal",
    "http://evil.example",
    "//evil.example",
    "///evil.example",
    "/\\evil.example",
    "/\tevil.example",
    "javascript:alert(1)",
    "data:text/html,<script>alert(1)</script>",
    " \\/evil.example",
  ];
  for (const path of hostile) {
    assert.equal(isSafeReturnPath(path), false, `${JSON.stringify(path)} must be rejected`);
  }
});

test("ordinary app paths are accepted", () => {
  const fine = ["/app", "/app/learn", "/app/assessments/abc/take", "/app/messages?thread=1"];
  for (const path of fine) {
    assert.equal(isSafeReturnPath(path), true, `${path} should be allowed`);
  }
});

test("auth paths are never a return destination", () => {
  // Returning to /auth/* after signing in is a redirect loop.
  assert.equal(isSafeReturnPath("/auth/sign-in"), false);
  assert.equal(isSafeReturnPath("/auth/mfa"), false);
});

test("null, empty and non-path values are rejected", () => {
  for (const v of [null, undefined, "", "app/learn", "   "]) {
    assert.equal(isSafeReturnPath(v), false, `${JSON.stringify(v)} must be rejected`);
  }
});

/* ------------------------------------------------------------------ *
 * Landing behaviour
 * ------------------------------------------------------------------ */

test("a stored app path wins over the role home", () => {
  const next = resolvePostSignInPath("/app/student", { path: "/app/assessments/abc/take" });
  assert.equal(next, "/app/assessments/abc/take");
});

test("a stored non-app path falls back to role home", () => {
  // Sending a learner to a staff deep link lands them on access-denied right
  // after signing in, which reads as a broken login rather than a permission.
  const next = resolvePostSignInPath("/app/student", { path: "/blog/some-post" });
  assert.equal(next, "/app/student");
});

test("no stored path means the role home", () => {
  assert.equal(resolvePostSignInPath("/app/instructor", { path: null }), "/app/instructor");
});

test("a hostile stored path falls back rather than navigating", () => {
  // resolvePostSignInPath trusts its argument, so the guard must run first.
  // This asserts the composition the caller actually uses.
  const next = resolvePostSignInPath("/app/student", {
    path: isSafeReturnPath("//evil.example") ? "//evil.example" : null,
  });
  assert.equal(next, "/app/student");
});

/* ------------------------------------------------------------------ *
 * Storage round-trip
 * ------------------------------------------------------------------ */

test("remember then consume returns the path and clears it", () => {
  // Minimal sessionStorage stand-in; node has no DOM.
  const store = new Map();
  globalThis.window = {
    sessionStorage: {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => store.set(k, String(v)),
      removeItem: (k) => store.delete(k),
    },
  };

  rememberReturnPath("/app/learn", "expired");
  const first = consumeReturnPath();
  assert.equal(first.path, "/app/learn");
  assert.equal(first.reason, "expired");

  // Consumed means gone: a refresh must not replay a stale destination.
  const second = consumeReturnPath();
  assert.equal(second.path, null);
  assert.equal(second.reason, null);

  delete globalThis.window;
});

test("storage that throws does not break sign-in", () => {
  // Safari private mode and blocked third-party contexts both throw on access.
  globalThis.window = {
    sessionStorage: {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
      removeItem: () => {
        throw new Error("blocked");
      },
    },
  };

  assert.doesNotThrow(() => rememberReturnPath("/app/learn", "expired"));
  assert.deepEqual(consumeReturnPath(), { path: null, reason: null });

  delete globalThis.window;
});
