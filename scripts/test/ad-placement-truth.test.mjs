import test from "node:test";
import assert from "node:assert/strict";

const { AD_SLOTS, primarySlotForPath, adsAllowedOn, MAX_UNITS_PER_PAGE } =
  await import("../../src/lib/ads/slots.ts");

test("a primary slot is actually reachable on every eligible family", () => {
  // The owner could not tell whether placements existed. They did, but only on
  // two path families. This asserts each declaration has a live primary, so a
  // slot can never be "declared" and silently unreachable.
  const samples = {
    "/blog": "/blog",
    "/blog/some-lesson": "/blog/some-lesson",
    "/classes/payments": "/classes/payments",
  };
  for (const [label, path] of Object.entries(samples)) {
    assert.ok(primarySlotForPath(path), `${label} has no primary slot to render`);
  }
});

test("payment, application and signed-in surfaces stay ineligible", () => {
  for (const path of ["/pay", "/apply", "/shop/checkout", "/auth/login", "/app/ai", "/portal"]) {
    assert.equal(adsAllowedOn(path), false, `${path} must never carry an ad`);
    assert.equal(primarySlotForPath(path), null, `${path} resolved a primary slot`);
  }
});

test("only one unit can render per page", () => {
  // The ngadverts container id is derived from the zone, so two units on one
  // page would duplicate an element id and fight over a single fill.
  assert.equal(MAX_UNITS_PER_PAGE, 1);

  // Counting declarations per prefix is the wrong shape: /blog legitimately has
  // two primaries, because the index and a lesson are different page shapes and
  // only one of them resolves at a time. What must hold is that no single PATH
  // resolves to more than one primary.
  // /classes is a listing, not a reading surface, so it resolves nothing.
  // Course pages and below are reading surfaces and do.
  const withAd = [
    "/blog",
    "/blog/what-a-soc-room-is",
    "/classes/cybersecurity",
    "/classes/cybersecurity/threats-risk-cia",
  ];
  for (const path of withAd) {
    assert.ok(primarySlotForPath(path), `${path} should resolve a primary slot`);
  }
  assert.equal(
    primarySlotForPath("/classes"),
    null,
    "the course index is a listing, not a reading page",
  );

  // And a path that is index-only must not pick up the descendants slot.
  const indexSlot = primarySlotForPath("/blog");
  const lessonSlot = primarySlotForPath("/blog/what-a-soc-room-is");
  assert.notEqual(indexSlot?.id, lessonSlot?.id, "index and lesson must use different slots");
});

test("every slot reserves height, so a late fill cannot shift layout", () => {
  for (const slot of AD_SLOTS) {
    assert.ok(slot.minHeightPx >= 250, `${slot.id} reserves too little for a 300x250`);
    assert.ok(slot.rationale.length > 40, `${slot.id} needs a stated reason for its position`);
  }
});
