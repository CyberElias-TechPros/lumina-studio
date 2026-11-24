import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

const {
  EZOIC_PLACEMENTS,
  ezoicPlaceholderElementId,
  ezoicPlacementsAllowedOn,
  notifyEzoicRouteChange,
  registerEzoicSlot,
} = await import("../../src/lib/ezoic.ts");

test("ezoicPlacementsAllowedOn enables public pages and excludes private/checkout surfaces", () => {
  const allowedPaths = [
    "/",
    "/about",
    "/blog",
    "/blog/passwords-you-can-keep",
    "/blog/sitting-down-at-a-computer",
    "/classes",
    "/classes/microsoft-office",
    "/classes/microsoft-office/word-fundamentals",
    "/ai-engineering",
    "/ai-engineering/lessons",
    "/ai-engineering/00-setup-and-tooling/01-dev-environment",
    "/open-curriculum",
    "/tools",
    "/tools/code-studio",
    "/practice/computer-basics",
    "/learning-trail",
    "/services",
    "/admissions",
    "/schools",
    "/shop",
    "/shop/gadgets",
    "/shop/website-starter",
    "/contact",
    "/visit",
    "/faq",
    "/privacy",
  ];

  for (const path of allowedPaths) {
    assert.equal(ezoicPlacementsAllowedOn(path), true, `${path} should allow Ezoic placements`);
  }

  const disallowedPaths = [
    "/auth",
    "/auth/sign-in",
    "/auth/sign-up",
    "/app",
    "/app/admin",
    "/portal",
    "/portal/student",
    "/merchant",
    "/apply",
    "/apply/pay",
    "/apply/status/CEA-2026-TEST99",
    "/shop/website-starter/checkout",
    "/shop/website-starter/return",
    "",
    null,
  ];

  for (const path of disallowedPaths) {
    assert.equal(
      ezoicPlacementsAllowedOn(path),
      false,
      `${String(path)} should exclude Ezoic placements`,
    );
  }

  assert.equal(
    ezoicPlaceholderElementId(EZOIC_PLACEMENTS.TOP_OF_PAGE),
    "ezoic-pub-ad-placeholder-103",
  );
  assert.equal(
    ezoicPlaceholderElementId(EZOIC_PLACEMENTS.UNDER_PAGE_TITLE),
    "ezoic-pub-ad-placeholder-104",
  );
  assert.equal(
    ezoicPlaceholderElementId(EZOIC_PLACEMENTS.UNDER_FIRST_PARAGRAPH),
    "ezoic-pub-ad-placeholder-111",
  );
  assert.equal(
    ezoicPlaceholderElementId(EZOIC_PLACEMENTS.MID_CONTENT),
    "ezoic-pub-ad-placeholder-113",
  );
  assert.equal(
    ezoicPlaceholderElementId(EZOIC_PLACEMENTS.BOTTOM_OF_PAGE),
    "ezoic-pub-ad-placeholder-105",
  );
});

test("prerendered HTML pages carry ordered Ezoic head scripts and unstyled, unique placeholders", () => {
  const appDir = join(root, ".next/server/app");
  if (!existsSync(appDir)) return;

  function collectHtml(dir, out = []) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) collectHtml(full, out);
      else if (entry.name.endsWith(".html")) out.push(full);
    }
    return out;
  }

  const htmlFiles = collectHtml(appDir);
  assert.ok(htmlFiles.length > 100, "expected prerendered Next.js HTML output");

  for (const file of htmlFiles) {
    const html = readFileSync(file, "utf8");
    const i1 = html.indexOf('data-cfasync="false" src="https://cmp.gatekeeperconsent.com/min.js"');
    const i2 = html.indexOf(
      'data-cfasync="false" src="https://the.gatekeeperconsent.com/cmp.min.js"',
    );
    const i3 = html.indexOf('src="//www.ezojs.com/ezoic/sa.min.js"');
    const i4 = html.indexOf("window.ezstandalone = window.ezstandalone || {}");
    const i5 = html.indexOf('src="//ezoicanalytics.com/analytics.js"');

    assert.ok(i1 > 0, `missing first Gatekeeper CMP script in ${file}`);
    assert.ok(i1 < i2, `privacy scripts out of order in ${file}`);
    assert.ok(i2 < i3, `sa.min.js rendered before Gatekeeper CMP scripts in ${file}`);
    assert.ok(i3 < i4, `ezstandalone init rendered before sa.min.js in ${file}`);
    assert.ok(i4 < i5, `ezoicanalytics rendered before ezstandalone init in ${file}`);

    const placeholders = [
      ...html.matchAll(/<div([^>]*)id="ezoic-pub-ad-placeholder-(\d+)"([^>]*)><\/div>/g),
    ];
    const ids = placeholders.map((m) => m[2]);
    assert.equal(new Set(ids).size, ids.length, `duplicate placeholder IDs in ${file}: ${ids}`);
    for (const match of placeholders) {
      assert.equal(match[1].trim(), "", `styled placeholder div in ${file}`);
      assert.equal(match[3].trim(), "", `styled placeholder div in ${file}`);
    }
  }

  const lessonHtml = readFileSync(join(appDir, "blog/passwords-you-can-keep.html"), "utf8");
  for (const id of [103, 104, 111, 113, 105]) {
    assert.ok(
      lessonHtml.includes(`<div id="ezoic-pub-ad-placeholder-${id}"></div>`),
      `expected placeholder ${id} on blog lesson`,
    );
  }
});

test("registerEzoicSlot and notifyEzoicRouteChange batch showAds and clean up across SPA routes", async () => {
  const calls = [];
  const domIds = new Set();
  const prevWindow = globalThis.window;
  const prevDocument = globalThis.document;
  const prevRaf = globalThis.requestAnimationFrame;
  const prevCaf = globalThis.cancelAnimationFrame;

  const ezstandalone = {
    cmd: {
      push(fn) {
        fn();
        return 1;
      },
    },
    showAds(...ids) {
      calls.push(["showAds", ids]);
    },
    destroyPlaceholders(...ids) {
      calls.push(["destroyPlaceholders", ids]);
    },
  };

  let rafQueue = [];
  let rafId = 0;
  function flushRaf() {
    while (rafQueue.length > 0) {
      const next = rafQueue.slice();
      rafQueue = [];
      for (const item of next) item.cb();
    }
  }

  globalThis.requestAnimationFrame = (cb) => {
    const id = ++rafId;
    rafQueue.push({ id, cb });
    return id;
  };
  globalThis.cancelAnimationFrame = (id) => {
    rafQueue = rafQueue.filter((item) => item.id !== id);
  };
  globalThis.window = {
    ezstandalone,
    requestAnimationFrame: globalThis.requestAnimationFrame,
    cancelAnimationFrame: globalThis.cancelAnimationFrame,
  };
  globalThis.document = {
    getElementById(id) {
      return domIds.has(id) ? { id } : null;
    },
  };

  try {
    // 1. Mount 5 slots on /blog/post-1 — must coalesce into ONE showAds call
    for (const id of [103, 104, 111, 113, 105]) {
      domIds.add(`ezoic-pub-ad-placeholder-${id}`);
    }
    const unmounts = [103, 104, 111, 113, 105].map((id) => registerEzoicSlot(id));
    notifyEzoicRouteChange("/blog/post-1");
    flushRaf();

    assert.deepEqual(calls, [["showAds", [103, 104, 111, 113, 105]]]);

    // 2. SPA navigate to /blog/post-2 with same 5 slots — destroys prior slots then re-shows
    calls.length = 0;
    notifyEzoicRouteChange("/blog/post-2");
    flushRaf();

    assert.deepEqual(calls, [
      ["destroyPlaceholders", [103, 104, 111, 113, 105]],
      ["showAds", [103, 104, 111, 113, 105]],
    ]);

    // 3. SPA navigate to /apply where slots unmount — destroys prior slots without calling showAds
    calls.length = 0;
    for (const unmount of unmounts) unmount();
    domIds.clear();
    notifyEzoicRouteChange("/apply");
    flushRaf();

    assert.deepEqual(calls, [["destroyPlaceholders", [103, 104, 111, 113, 105]]]);
  } finally {
    globalThis.window = prevWindow;
    globalThis.document = prevDocument;
    globalThis.requestAnimationFrame = prevRaf;
    globalThis.cancelAnimationFrame = prevCaf;
  }
});
