import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const source = fs.readFileSync(new URL("../../src/lib/pwa.ts", import.meta.url), "utf8");
const js = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function harness() {
  const calls = { permission: 0, register: 0, api: [], unsubscribe: 0, subscribe: 0 };
  const settings = {
    permission: "default",
    nextPermission: "granted",
    conflict: false,
    unsubscribeSuccess: true,
  };
  class ApiError extends Error {
    constructor(status) {
      super("request failed");
      this.status = status;
    }
  }
  const existing = {
    endpoint: "https://fcm.googleapis.com/fcm/send/old-test-token",
    getKey: (type) => Uint8Array.from(type === "p256dh" ? [1, 2, 3] : [4, 5, 6]).buffer,
    unsubscribe: async () => {
      calls.unsubscribe++;
      if (settings.unsubscribeSuccess) subscription = null;
      return settings.unsubscribeSuccess;
    },
  };
  const fresh = { ...existing, endpoint: "https://fcm.googleapis.com/fcm/send/new-test-token" };
  let subscription = existing;
  const registration = {
    pushManager: {
      getSubscription: async () => subscription,
      subscribe: async () => {
        calls.subscribe++;
        subscription = fresh;
        return fresh;
      },
    },
  };
  const notification = {
    get permission() {
      return settings.permission;
    },
    async requestPermission() {
      calls.permission++;
      settings.permission = settings.nextPermission;
      return settings.permission;
    },
  };
  const document = { documentElement: { dataset: {} } };
  const navigator = {
    serviceWorker: {
      register: async () => {
        calls.register++;
        return registration;
      },
      getRegistration: async () => registration,
    },
  };
  const apiFetch = async (path, request) => {
    calls.api.push({ path, request });
    if (settings.conflict) throw new ApiError(409);
    return {};
  };
  const exports = {};
  const context = {
    exports,
    navigator,
    document,
    Notification: notification,
    window: { PushManager: function () {}, Notification: notification },
    Uint8Array,
    ArrayBuffer,
    atob: (value) => Buffer.from(value, "base64").toString("binary"),
    btoa: (value) => Buffer.from(value, "binary").toString("base64"),
    console,
    require: (id) => {
      if (id === "@/lib/env") return { env: { vapidPublicKey: "AQID" }, isMockMode: false };
      if (id === "@/lib/api/client") return { apiFetch };
      if (id === "@/lib/errors") return { ApiError };
      throw new Error(`unexpected module ${id}`);
    },
  };
  vm.runInNewContext(js, context);
  return { pwa: exports, calls, settings, document };
}

test("background registration does not request notification permission", async () => {
  const { pwa, calls } = harness();
  assert.equal(await pwa.subscribeToPush(true), "permission-required");
  assert.equal(calls.permission, 0);
  assert.equal(calls.register, 0);
  assert.equal(calls.api.length, 0);
});

test("explicit opt-in requests permission and registers the existing browser subscription", async () => {
  const { pwa, calls } = harness();
  assert.equal(await pwa.subscribeToPush(true, true), "registered");
  assert.equal(calls.permission, 1);
  assert.equal(calls.subscribe, 0);
  assert.equal(calls.api.length, 1);
  assert.equal(calls.api[0].path, "/v1/push/subscriptions");
  assert.equal(
    calls.api[0].request.body.endpoint,
    "https://fcm.googleapis.com/fcm/send/old-test-token",
  );
});

test("blocked permission and opt-out never contact the backend", async () => {
  const { pwa, calls, settings, document } = harness();
  settings.nextPermission = "denied";
  assert.equal(await pwa.subscribeToPush(true, true), "denied");
  assert.equal(await pwa.subscribeToPush(true, true), "denied");
  document.documentElement.dataset.noServiceWorker = "true";
  assert.equal(await pwa.resetBrowserPush(true), "unavailable");
  assert.equal(calls.api.length, 0);
  assert.equal(calls.permission, 1);
});

test("account conflict does not automatically replace a shared-browser subscription", async () => {
  const { pwa, calls, settings } = harness();
  settings.permission = "granted";
  settings.conflict = true;
  assert.equal(await pwa.subscribeToPush(true), "conflict");
  assert.equal(calls.unsubscribe, 0);
  assert.equal(calls.subscribe, 0);
  settings.conflict = false;
  assert.equal(await pwa.resetBrowserPush(true), "registered");
  assert.equal(calls.unsubscribe, 1);
  assert.equal(calls.subscribe, 1);
  assert.equal(
    calls.api[1].request.body.endpoint,
    "https://fcm.googleapis.com/fcm/send/new-test-token",
  );
  assert.ok(calls.api.every((call) => call.request.method === "POST"));
});

test("failed local unsubscribe stops recovery before registration", async () => {
  const { pwa, calls, settings } = harness();
  settings.permission = "granted";
  settings.unsubscribeSuccess = false;
  assert.equal(await pwa.resetBrowserPush(true), "error");
  assert.equal(calls.api.length, 0);
  assert.equal(calls.subscribe, 0);
});

test("reset does not unsubscribe if permission has been withdrawn", async () => {
  const { pwa, calls, settings } = harness();
  settings.permission = "denied";
  assert.equal(await pwa.resetBrowserPush(true), "denied");
  assert.equal(calls.unsubscribe, 0);
  assert.equal(calls.api.length, 0);
});
