/**
 * Behavioural tests for consent gating and tracking.
 *
 * These run against a tiny fake DOM rather than a real browser, because the
 * behaviour that matters is entirely about *what gets appended to the document*
 * and *in what order relative to consent*. A real browser would test the same
 * assertions more slowly.
 *
 * The three regressions this suite exists to catch, all of which were live:
 *
 *   1. Clarity was loaded from `layout.tsx` unconditionally — before consent,
 *      and on payment and signed-in pages.
 *   2. Advertising and analytics were controlled by one key, so consenting to
 *      analytics also enabled ad cookies.
 *   3. The banner was mounted behind an env flag that defaulted to off, so no
 *      visitor was ever actually asked.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";

/**
 * Load a project source file as a CommonJS module.
 *
 * Matches the convention already used by `push-registration.test.mjs` and
 * `service-worker.test.mjs`: transpile with the TypeScript compiler rather than
 * teaching Node about the `@/` path alias. The alias is rewritten to a relative
 * path first, because the loaders import `@/lib/consent`.
 *
 * Each call gets a fresh module instance so the loaders' `alreadyLoaded` state
 * never leaks between tests.
 */
function loadModule(relPath) {
  const absolute = new URL(`../../${relPath}`, import.meta.url);
  let source = fs.readFileSync(absolute, "utf8");
  source = source.replace(/from "@\/lib\/consent"/g, 'from "./consent"');
  const js = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText;

  const moduleObject = { exports: {} };
  const dirnameUrl = new URL(".", absolute).href;
  const requireShim = (specifier) => {
    if (specifier === "./consent") {
      return loadConsent();
    }
    throw new Error(`unexpected require in test module: ${specifier}`);
  };
  const factory = new Function("module", "exports", "require", js);
  factory(moduleObject, moduleObject.exports, requireShim);
  void dirnameUrl;
  return moduleObject.exports;
}

function loadConsent() {
  const absolute = new URL("../../src/lib/consent.ts", import.meta.url);
  const source = fs.readFileSync(absolute, "utf8");
  const js = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const moduleObject = { exports: {} };
  new Function("module", "exports", "require", js)(moduleObject, moduleObject.exports, () => {
    throw new Error("consent.ts must not require anything");
  });
  return moduleObject.exports;
}

/* ------------------------------------------------------------------ *
 * A minimal DOM good enough for the loaders
 * ------------------------------------------------------------------ */

class FakeElement {
  constructor(tagName) {
    this.tagName = tagName.toUpperCase();
    this.attributes = new Map();
    this.children = [];
    this.listeners = new Map();
    this.parentNode = null;
  }
  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }
  /**
   * The loaders assign `script.src = "..."` as a property rather than calling
   * setAttribute, which is what a browser allows. Mirror that here, or the
   * assertions see a script element with no address.
   */
  set src(value) {
    this.attributes.set("src", String(value));
  }
  get src() {
    return this.attributes.get("src") ?? "";
  }
  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }
  removeAttribute(name) {
    this.attributes.delete(name);
  }
  addEventListener(type, handler) {
    this.listeners.set(type, handler);
  }
  appendChild(child) {
    child.parentNode = this;
    this.children.push(child);
    return child;
  }
  remove() {
    if (!this.parentNode) return;
    this.parentNode.children = this.parentNode.children.filter((c) => c !== this);
    this.parentNode = null;
  }
  /** Supports only the attribute-substring selectors the loaders actually use. */
  matches(selector) {
    // Bare tag name, e.g. `script`. Needed by querySelectorAll in the assertions.
    if (/^[a-z]+$/i.test(selector)) return this.tagName === selector.toUpperCase();

    const attr = /^\[([a-z-]+)\]$/.exec(selector);
    if (attr) return this.attributes.has(attr[1]);
    const eq = /^\[([a-z-]+)="([^"]*)"\]$/.exec(selector);
    if (eq) return this.attributes.get(eq[1]) === eq[2];
    const startsWith = /^\[([a-z-]+)\*="([^"]*)"\]$/.exec(selector);
    if (startsWith) {
      return (this.attributes.get(startsWith[1]) ?? "").includes(startsWith[2]);
    }
    return false;
  }
}

class FakeDocument {
  constructor() {
    this.head = new FakeElement("head");
    this.elements = [this.head];
  }
  createElement(tag) {
    return new FakeElement(tag);
  }
  querySelector(selector) {
    // Handles `tag[attr]` and `tag[attr="v"]` and bare `[attr]`.
    const all = this.all();
    for (const el of all) {
      for (const part of selector.split(",").map((s) => s.trim())) {
        const tagThenAttr = /^([a-z]+)?(\[.+\])$/.exec(part);
        if (tagThenAttr) {
          if (tagThenAttr[1] && el.tagName !== tagThenAttr[1].toUpperCase()) continue;
          if (el.matches(tagThenAttr[2])) return el;
        } else if (el.matches(part)) {
          return el;
        }
      }
    }
    return null;
  }
  querySelectorAll(selector) {
    const found = [];
    for (const el of this.all()) if (el.matches(selector)) found.push(el);
    return found;
  }
  all() {
    const out = [];
    const visit = (node) => {
      for (const child of node.children) {
        out.push(child);
        visit(child);
      }
    };
    visit(this.head);
    return out;
  }
}

class FakeLocalStorage {
  constructor() {
    this.map = new Map();
  }
  getItem(key) {
    return this.map.has(key) ? this.map.get(key) : null;
  }
  setItem(key, value) {
    this.map.set(key, String(value));
  }
  removeItem(key) {
    this.map.delete(key);
  }
  clear() {
    this.map.clear();
  }
}

/** Install a fresh window/document and return the teardown. */
function installDom({ pathname = "/blog/kilobytes-and-megabytes" } = {}) {
  const document = new FakeDocument();
  const localStorage = new FakeLocalStorage();
  const listeners = new Map();
  const windowObject = {
    document,
    localStorage,
    location: { pathname },
    CustomEvent: class {
      constructor(type, init) {
        this.type = type;
        this.detail = init?.detail;
      }
    },
    dispatchEvent(event) {
      for (const handler of listeners.get(event.type) ?? []) handler(event);
      return true;
    },
    addEventListener(type, handler) {
      listeners.set(type, [...(listeners.get(type) ?? []), handler]);
    },
    removeEventListener(type, handler) {
      listeners.set(type, (listeners.get(type) ?? []).filter((h) => h !== handler));
    },
  };

  globalThis.window = windowObject;
  globalThis.document = document;
  globalThis.localStorage = localStorage;

  return {
    navigate(nextPath) {
      windowObject.location.pathname = nextPath;
    },
    teardown() {
      delete globalThis.window;
      delete globalThis.document;
      delete globalThis.localStorage;
    },
  };
}

/** Fresh module instances, so `alreadyLoaded` state never leaks between tests. */
function freshModules() {
  return { consent: loadConsent(), tracking: loadModule("src/lib/tracking.ts") };
}

/** Scripts currently attached to <head>, optionally filtered by src pattern. */
const scriptsMatching = (pattern) =>
  document.head.children.filter(
    (child) =>
      child.tagName === "SCRIPT" && (!pattern || pattern.test(child.getAttribute("src") ?? "")),
  );

/* ------------------------------------------------------------------ *
 * Consent storage
 * ------------------------------------------------------------------ */

test("no decision records no consent", () => {
  const dom = installDom();
  const { consent } = freshModules();
  assert.equal(consent.readConsent(), null);
  assert.equal(consent.adsAllowed(), false);
  assert.equal(consent.analyticsAllowed(), false);
  dom.teardown();
});

test("granting analytics does not grant advertising", () => {
  const dom = installDom();
  const { consent } = freshModules();
  consent.saveConsent({ ads: false, analytics: true });
  assert.equal(consent.analyticsAllowed(), true);
  assert.equal(consent.adsAllowed(), false);
  dom.teardown();
});

test("granting advertising does not grant analytics", () => {
  const dom = installDom();
  const { consent } = freshModules();
  consent.saveConsent({ ads: true, analytics: false });
  assert.equal(consent.adsAllowed(), true);
  assert.equal(consent.analyticsAllowed(), false);
  dom.teardown();
});

test("denyAllConsent records an explicit refusal, not an absence", () => {
  const dom = installDom();
  const { consent } = freshModules();
  const state = consent.denyAllConsent();
  assert.equal(state.ads, false);
  assert.equal(state.analytics, false);
  assert.ok(state.decidedAt);
  assert.equal(consent.readConsent()?.ads, false);
  dom.teardown();
});

test("a decision from an older policy version is treated as undecided", () => {
  const dom = installDom();
  const { consent } = freshModules();
  localStorage.setItem(
    consent.CONSENT_STORAGE_KEY,
    JSON.stringify({ ads: true, analytics: true, decidedAt: "2025-01-01", version: 999 }),
  );
  assert.equal(consent.readConsent(), null);
  dom.teardown();
});

test("a legacy v1 'granted' string migrates to both categories", () => {
  const dom = installDom();
  const { consent } = freshModules();
  localStorage.setItem("cea:consent", "granted");
  const migrated = consent.readConsent();
  assert.equal(migrated?.ads, true);
  assert.equal(migrated?.analytics, true);
  dom.teardown();
});

test("a legacy v1 'dismissed' string migrates to an explicit refusal", () => {
  const dom = installDom();
  const { consent } = freshModules();
  localStorage.setItem("cea-cookie-consent", "dismissed");
  const migrated = consent.readConsent();
  assert.equal(migrated?.ads, false);
  assert.equal(migrated?.analytics, false);
  dom.teardown();
});

/* ------------------------------------------------------------------ *
 * Clarity
 * ------------------------------------------------------------------ */

test("Clarity is not loaded without consent", () => {
  const dom = installDom();
  const { tracking } = freshModules();
  tracking.loadClarity();
  assert.equal(scriptsMatching(/clarity\.ms/).length, 0);
  dom.teardown();
});

test("Clarity is not loaded with advertising consent alone", () => {
  const dom = installDom();
  const { consent, tracking } = freshModules();
  consent.saveConsent({ ads: true, analytics: false });
  tracking.loadClarity();
  assert.equal(scriptsMatching(/clarity\.ms/).length, 0);
  dom.teardown();
});

test("Clarity loads once analytics consent is given", () => {
  const dom = installDom();
  const { consent, tracking } = freshModules();
  consent.saveConsent({ ads: false, analytics: true });
  tracking.loadClarity();
  const found = scriptsMatching(/clarity\.ms/);
  assert.equal(found.length, 1);
  assert.match(found[0].getAttribute("src"), /zj04tsoszk/);
  dom.teardown();
});

test("Clarity masks text in both the bootstrap and the script tag", () => {
  const dom = installDom();
  const { consent, tracking } = freshModules();
  consent.saveConsent({ ads: false, analytics: true });
  tracking.loadClarity();
  const tag = scriptsMatching(/clarity\.ms/)[0];
  assert.equal(tag.getAttribute("data-clarity-mask"), "true");
  // The queueing stub must exist so pre-load calls are not dropped.
  assert.equal(typeof window.clarity, "function");
  dom.teardown();
});

test("Clarity never loads on a payment or signed-in path, even with consent", () => {
  for (const pathname of ["/pay/checkout", "/app/dashboard", "/auth/sign-in", "/apply"]) {
    const dom = installDom({ pathname });
    const { consent, tracking } = freshModules();
    consent.saveConsent({ ads: true, analytics: true });
    tracking.loadClarity();
    assert.equal(
      scriptsMatching(/clarity\.ms/).length,
      0,
      `Clarity must not load on ${pathname}`,
    );
    dom.teardown();
  }
});

test("Clarity is injected only once across repeated calls", () => {
  const dom = installDom();
  const { consent, tracking } = freshModules();
  consent.saveConsent({ ads: true, analytics: true });
  tracking.loadClarity();
  tracking.loadClarity();
  tracking.loadClarity();
  assert.equal(scriptsMatching(/clarity\.ms/).length, 1);
  dom.teardown();
});

/* ------------------------------------------------------------------ *
 * AdSense
 * ------------------------------------------------------------------ */

test("AdSense is not loaded without advertising consent", () => {
  const dom = installDom();
  const { consent, tracking } = freshModules();
  consent.saveConsent({ ads: false, analytics: true });
  tracking.loadAdSense();
  assert.equal(scriptsMatching(/adsbygoogle/).length, 0);
  dom.teardown();
});

test("AdSense loads with advertising consent on a reading page", () => {
  const dom = installDom();
  const { consent, tracking } = freshModules();
  consent.saveConsent({ ads: true, analytics: false });
  tracking.loadAdSense();
  assert.equal(scriptsMatching(/adsbygoogle/).length, 1);
  dom.teardown();
});

test("AdSense never loads on a transactional path", () => {
  for (const pathname of ["/pay", "/payment", "/apply", "/contact", "/certificates/verify"]) {
    const dom = installDom({ pathname });
    const { consent, tracking } = freshModules();
    consent.saveConsent({ ads: true, analytics: true });
    tracking.loadAdSense();
    assert.equal(
      scriptsMatching(/adsbygoogle/).length,
      0,
      `AdSense must not load on ${pathname}`,
    );
    dom.teardown();
  }
});

/* ------------------------------------------------------------------ *
 * GA4
 * ------------------------------------------------------------------ */

test("GA4 is not loaded without analytics consent", () => {
  const dom = installDom();
  const { tracking } = freshModules();
  tracking.loadGA4("G-TEST123");
  assert.equal(scriptsMatching(/googletagmanager/).length, 0);
  dom.teardown();
});

test("GA4 sets ads signals to denied when it does load", () => {
  const dom = installDom();
  const { consent, tracking } = freshModules();
  consent.saveConsent({ ads: false, analytics: true });
  tracking.loadGA4("G-TEST123");
  assert.equal(scriptsMatching(/googletagmanager/).length, 1);
  const consentCall = window.dataLayer.find(
    (entry) => Array.isArray(entry) && entry[0] === "consent" && entry[1] === "default",
  );
  assert.ok(consentCall, "a consent default must be pushed before the tag runs");
  assert.equal(consentCall[2].ad_storage, "denied");
  assert.equal(consentCall[2].analytics_storage, "granted");
  dom.teardown();
});

/* ------------------------------------------------------------------ *
 * Disclosure
 * ------------------------------------------------------------------ */

test("every loader is disclosed in the privacy processor register", () => {
  const dom = installDom();
  const { tracking } = freshModules();
  const loaders = tracking.PROCESSORS.map((p) => p.loader).join(" ");
  assert.match(loaders, /loadClarity/);
  assert.match(loaders, /loadAdSense/);
  assert.match(loaders, /loadGA4/);
  for (const processor of tracking.PROCESSORS) {
    assert.match(processor.policyUrl, /^https:\/\//, `${processor.name} needs an https policy`);
    assert.ok(
      processor.category === "analytics" || processor.category === "advertising",
      `${processor.name} needs a consent category`,
    );
  }
  dom.teardown();
});
