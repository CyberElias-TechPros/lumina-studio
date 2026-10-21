import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
const source = readFileSync(new URL("../../public/sw.js", import.meta.url), "utf8");
function harness(options = {}) {
  const handlers = {},
    calls = { matches: [], puts: [], deleted: [], opened: [], notifications: [] };
  const cache = {
    addAll: async () => {},
    match: async (key) => {
      calls.matches.push(key);
      return options.cached;
    },
    put: async (...args) => calls.puts.push(args),
  };
  const self = {
    location: { origin: "https://www.cea.ng" },
    addEventListener: (name, fn) => (handlers[name] = fn),
    skipWaiting: async () => {},
    clients: {
      claim: async () => {},
      matchAll: async () => [],
      openWindow: async (url) => calls.opened.push(url),
    },
    registration: { showNotification: async (...args) => calls.notifications.push(args) },
  };
  vm.runInNewContext(source, {
    self,
    URL,
    Response,
    fetch:
      options.fetch ||
      (async () => new Response("asset", { headers: { "Content-Type": "text/javascript" } })),
    caches: {
      open: async () => cache,
      keys: async () => ["lumina-v2", "cea-public-v2", "cea-public-v3", "unrelated-cache"],
      delete: async (key) => calls.deleted.push(key),
    },
  });
  async function dispatch(name, values = {}) {
    const pending = [];
    let intercepted = false,
      result;
    handlers[name]({
      ...values,
      waitUntil: (p) => pending.push(p),
      respondWith: (p) => {
        intercepted = true;
        result = p;
      },
    });
    const response = await result;
    await Promise.all(pending);
    return { intercepted, response };
  }
  const request = (path, extra = {}) => ({
    url: "https://www.cea.ng" + path,
    method: "GET",
    mode: "cors",
    headers: new Headers(),
    ...extra,
  });
  return { calls, dispatch, request };
}
test("private, RSC, auth and API reads are never intercepted for static caching", async () => {
  const h = harness();
  for (const path of [
    "/app/finance",
    "/app/messages?_rsc=secret",
    "/auth/magic-link?token=secret",
    "/v1/account",
    "/_next/image?url=private",
    "/unknown.json",
  ])
    assert.equal((await h.dispatch("fetch", { request: h.request(path) })).intercepted, false);
  for (const headers of [
    new Headers({ RSC: "1" }),
    new Headers({ Accept: "text/x-component" }),
    new Headers({ Authorization: "Bearer secret" }),
    new Headers({ Range: "bytes=0-10" }),
  ])
    assert.equal(
      (await h.dispatch("fetch", { request: h.request("/_next/static/chunk.js", { headers }) }))
        .intercepted,
      false,
    );
  assert.equal(h.calls.matches.length, 0);
  assert.equal(h.calls.puts.length, 0);
});
test("offline private navigation uses only the public offline page, never a saved private response", async () => {
  const h = harness({
    fetch: async () => {
      throw new Error("offline");
    },
    cached: new Response("Reconnect safely"),
  });
  const result = await h.dispatch("fetch", {
    request: h.request("/app/finance", { mode: "navigate" }),
  });
  assert.equal(await result.response.text(), "Reconnect safely");
  assert.deepEqual(h.calls.matches, ["/offline.html"]);
  assert.equal(h.calls.puts.length, 0);
});
test("online navigations including home are not persisted", async () => {
  const h = harness();
  for (const path of ["/", "/app/finance"])
    await h.dispatch("fetch", { request: h.request(path, { mode: "navigate" }) });
  assert.equal(h.calls.puts.length, 0);
});
test("explicit static assets cache, private/no-store/HTML/RSC responses do not", async () => {
  const safe = harness();
  await safe.dispatch("fetch", { request: safe.request("/_next/static/chunk.js") });
  assert.equal(safe.calls.puts.length, 1);
  for (const headers of [
    { "Cache-Control": "private" },
    { "Cache-Control": "no-store" },
    { "Content-Type": "text/html" },
    { "Content-Type": "text/x-component" },
  ]) {
    const h = harness({ fetch: async () => new Response("not cacheable", { headers }) });
    await h.dispatch("fetch", { request: h.request("/_next/static/chunk.js") });
    assert.equal(h.calls.puts.length, 0);
  }
});
test("activation removes legacy owned caches but not unrelated caches", async () => {
  const h = harness();
  await h.dispatch("activate");
  assert.deepEqual(h.calls.deleted, ["lumina-v2", "cea-public-v2"]);
});
test("push cannot expose private text or navigate to payload-supplied URLs", async () => {
  const h = harness();
  await h.dispatch("push", {
    data: {
      json: () => ({ title: "Private payment", body: "secret", url: "https://attacker.invalid" }),
    },
  });
  assert.equal(h.calls.notifications[0][0], "CEA update");
  assert.equal(h.calls.notifications[0][1].body, "Open CEA to check your notifications.");
  await h.dispatch("notificationclick", {
    notification: { close() {}, data: { url: "https://attacker.invalid" } },
  });
  assert.deepEqual(h.calls.opened, ["https://www.cea.ng/app/notifications"]);
});
