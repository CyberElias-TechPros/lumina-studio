import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const src = readFileSync(resolve(root, "src/lib/api/use-websocket.ts"), "utf8");

/**
 * There is no DOM here to run a real socket against, so these assert the shape
 * of the recovery policy. That is deliberate: the bug they guard against was not
 * a subtle logic error, it was the total absence of a reconnect path — a single
 * dropped socket left live chat dead until the page was reloaded.
 */

test("a closed socket schedules a reconnect", () => {
  assert.match(src, /socket\.onclose/, "onclose must be handled");
  assert.match(src, /retryTimer\s*=\s*setTimeout/, "onclose must schedule a reconnect");
});

test("reconnection is capped so it cannot spin forever", () => {
  assert.match(src, /attempt\s*<\s*8/, "there must be a bounded retry count");
  assert.match(src, /Live updates stopped/, "exhausting retries must tell the user");
});

test("backoff grows exponentially and is capped", () => {
  assert.match(src, /baseDelayMs\s*=\s*1000/, "base delay");
  assert.match(src, /maxDelayMs\s*=\s*30_000/, "cap");
  assert.match(src, /2 \*\* attempt/, "exponential growth");
});

test("jitter prevents a thundering herd", () => {
  // Every client in a room drops at the same instant when a server restarts.
  // Without jitter they retry in lockstep and re-kill the server.
  assert.match(src, /Math\.random\(\)/, "retry delay must be jittered");
});

test("a successful open resets the attempt counter", () => {
  assert.match(src, /socket\.onopen[\s\S]{0,200}attempt\s*=\s*0/, "onopen must reset attempt");
});

test("unmount cancels a pending reconnect", () => {
  assert.match(src, /clearTimeout\(retryTimer\)/, "cleanup must clear the retry timer");
});

test("the status type can express reconnecting", () => {
  assert.match(src, /"reconnecting"/, "WsStatus must include reconnecting");
});
