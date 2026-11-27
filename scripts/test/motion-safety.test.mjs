import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const CSS = readFileSync(join(ROOT, "src/styles.css"), "utf8");
const CONTROLLER = readFileSync(
  join(ROOT, "src/components/marketing/motion-controller.tsx"),
  "utf8",
);

test("reveal styles only apply once the script says it is ready", () => {
  // The failure this prevents: a hero that is invisible until JavaScript runs.
  // Every hiding rule must be scoped to html[data-motion="ready"], which the
  // controller sets only after its observers are attached.
  // Match each rule as `selector { ... }` and inspect the selector separately,
  // so a multi-line selector is not confused with a following rule.
  const rules = CSS.match(/([^{}]+)\{([^{}]*)\}/g) ?? [];
  let hidingRules = 0;
  for (const rule of rules) {
    const [selector, body] = rule.split(/\{/, 2);
    if (!/\[data-reveal\]/.test(selector)) continue;
    if (!/opacity:\s*0\b/.test(body)) continue;
    hidingRules += 1;
    assert.ok(
      selector.includes('[data-motion="ready"]'),
      `a rule hides [data-reveal] without being gated: ${selector.trim().slice(0, 80)}`,
    );
  }
  assert.ok(hidingRules > 0, "expected a gated reveal hiding rule to exist");
});

test("the controller never sets data-motion before observing", () => {
  const setupIdx = CONTROLLER.indexOf("const setup = () =>");
  const setAttrIdx = CONTROLLER.indexOf('setAttribute("data-motion", "ready")');
  const observeIdx = CONTROLLER.indexOf("revealObserver.observe");
  assert.ok(setupIdx >= 0 && setAttrIdx > setupIdx, "data-motion must be set inside setup()");
  assert.ok(
    CONTROLLER.indexOf("setupReveal()") < setAttrIdx,
    "the reveal observer must exist before content is hidden",
  );
  assert.ok(observeIdx > 0, "expected an IntersectionObserver subscription");
});

test("reduced motion is checked live, not only once at mount", () => {
  // A visitor who turns on reduced motion mid-session must get an instant page.
  assert.match(CONTROLLER, /reduce/);
  assert.match(
    CONTROLLER,
    /addEventListener\("change", setup\)/,
    "the media query listener must re-run setup so the setting is honoured live",
  );
});

test("every motion effect is disabled under reduced motion in CSS", () => {
  const reduced = CSS.slice(CSS.lastIndexOf("@media (prefers-reduced-motion: reduce)"));
  for (const selector of [
    "[data-reveal]",
    ".cea-split > span",
    "[data-magnetic]",
    ".cea-marquee",
  ]) {
    assert.ok(reduced.includes(selector), `${selector} is not neutralised under reduced motion`);
  }
});

test("animated properties stay compositor-friendly", () => {
  // transform and opacity only: anything else forces layout or paint on every
  // frame, which is what makes a "cinematic" site stutter on a mid-range phone.
  const transitions = CSS.match(/transition:[^;]+;/g) ?? [];
  const banned = /\b(width|height|top|left|right|bottom|margin|padding|filter)\b/;
  for (const rule of transitions) {
    if (!rule.includes("transform") && !rule.includes("opacity")) continue;
    const props = rule.replace("transition:", "").trim();
    assert.ok(
      !banned.test(props),
      `a transition animates a layout property: ${props.slice(0, 90)}`,
    );
  }
});
