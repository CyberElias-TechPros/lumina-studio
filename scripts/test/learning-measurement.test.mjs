import { test } from "node:test";
import { strict as assert } from "node:assert";
import { trackLearningEvent } from "../../src/lib/learning/measurement.ts";

test("learning events require the public flag, consent, an allowed page and a loaded tag", () => {
  const originalWindow = globalThis.window;
  const originalFlag = process.env.NEXT_PUBLIC_ENABLE_PUBLIC_TRACKING;
  const calls = [];
  let consent = "granted";
  try {
    globalThis.window = {
      location: {
        pathname: "/practice/computer-basics",
        origin: "https://example.test",
        search: "?private=value",
        hash: "#private",
      },
      localStorage: { getItem: () => consent },
      gtag: (...args) => calls.push(args),
    };
    delete process.env.NEXT_PUBLIC_ENABLE_PUBLIC_TRACKING;
    assert.equal(trackLearningEvent("cea_lab_started"), false);
    process.env.NEXT_PUBLIC_ENABLE_PUBLIC_TRACKING = "true";
    consent = "denied";
    assert.equal(trackLearningEvent("cea_lab_started"), false);
    consent = "granted";
    assert.equal(trackLearningEvent("cea_lab_started"), true);
    assert.deepEqual(calls[0], [
      "event",
      "cea_lab_started",
      { page_location: "https://example.test/practice/computer-basics", page_referrer: "" },
    ]);
    assert.equal(trackLearningEvent("not_allowed"), false);
    globalThis.window.location.pathname = "/auth/sign-up";
    assert.equal(trackLearningEvent("cea_lab_completed"), false);
    globalThis.window.location.pathname = "/blog/files-and-folders";
    assert.equal(trackLearningEvent("cea_lesson_check"), true);
    assert.equal(trackLearningEvent("cea_lab_completed"), false);
    delete globalThis.window.gtag;
    assert.equal(trackLearningEvent("cea_lesson_check"), false);
    globalThis.window.localStorage.getItem = () => {
      throw new Error("blocked");
    };
    assert.equal(trackLearningEvent("cea_lesson_check"), false);
    assert.equal(calls.length, 2);
  } finally {
    if (originalFlag === undefined) delete process.env.NEXT_PUBLIC_ENABLE_PUBLIC_TRACKING;
    else process.env.NEXT_PUBLIC_ENABLE_PUBLIC_TRACKING = originalFlag;
    if (originalWindow === undefined) delete globalThis.window;
    else globalThis.window = originalWindow;
  }
});
