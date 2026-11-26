import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

/* ------------------------------------------------------------------ *
 * The audit script itself
 * ------------------------------------------------------------------ */

test("the audit refuses to report success on an empty build", () => {
  // This is the failure mode that matters most: an interrupted build left `.next`
  // present but empty, and the audit printed "0 pages, no violations found" —
  // which reads exactly like a pass. Absence of evidence is not evidence.
  const src = readFileSync(resolve(root, "scripts/audit-accessibility.mjs"), "utf8");
  assert.match(src, /pages\.length === 0/, "must detect an empty page set");
  assert.match(src, /not that the site is clean/i, "must say the build is the problem");
});

test("the audit states what it cannot check", () => {
  // An a11y gate that implies it covers contrast and keyboard traps when it does
  // not is worse than no gate: it stops anyone looking.
  const src = readFileSync(resolve(root, "scripts/audit-accessibility.mjs"), "utf8");
  assert.match(src, /colour contrast/i);
  assert.match(src, /axe-core/i);
});

test("the audit runs and exits 0 without a build, but says why", () => {
  // Without a build there is nothing to check, and that is not an accessibility
  // failure — but it must never look like a pass either. Exit 0, explain loudly.
  // The guard writes to stderr (it is a diagnostic, not a result), so this
  // captures both streams rather than assuming which one carries the message.
  const run = spawnSync(process.execPath, [resolve(root, "scripts/audit-accessibility.mjs")], {
    encoding: "utf8",
  });
  assert.equal(run.status, 0, "no build must not be a failure exit");
  const output = `${run.stdout}${run.stderr}`;
  assert.match(output, /build is missing or incomplete|Accessibility audit/i);
});

/* ------------------------------------------------------------------ *
 * The specific violations it found, kept fixed
 * ------------------------------------------------------------------ */

test("tool pages do not skip from h1 to h3", () => {
  // These pages used <h3> as their top-level section heading with no <h2>,
  // which is a real navigation failure for a screen-reader user moving by
  // heading level.
  const tools = [
    "src/routes/tools.password-strength.tsx",
    "src/routes/tools.color-contrast.tsx",
    "src/routes/tools.typing-test.tsx",
    "src/routes/tools.word-counter.tsx",
  ];
  for (const file of tools) {
    const src = readFileSync(resolve(root, file), "utf8");
    assert.equal(
      /<h3/.test(src),
      false,
      `${file}: an <h3> with no <h2> above it skips a heading level`,
    );
  }
});

test("the tutor input has a real label, not just a placeholder", () => {
  const src = readFileSync(resolve(root, "src/routes/app/ai.tsx"), "utf8");
  assert.match(src, /htmlFor="tutor-question"/, "input needs an associated label element");
  assert.match(src, /id="tutor-question"/, "the label needs something to point at");
  assert.match(src, /aria-label=/, "the icon-only send button needs an accessible name");
});

test("search inputs across the staff app are labelled", () => {
  const files = [
    "src/routes/app/admin/intake.tsx",
    "src/routes/app/admissions/applications.tsx",
    "src/routes/app/admissions/registrations.tsx",
  ];
  for (const file of files) {
    const src = readFileSync(resolve(root, file), "utf8");
    assert.match(src, /className="sr-only"/, `${file}: search input needs a visually hidden label`);
    assert.match(src, /htmlFor=/, `${file}: label must be bound to the input`);
  }
});
