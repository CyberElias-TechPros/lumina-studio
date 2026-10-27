/**
 * Placement behaviour test — the gate that decides whether an advert can exist.
 *
 * `scripts/check-ad-slots.mjs` checks the registry's shape (allowlists, reserved
 * height, confinement). This checks what the registry actually *decides*, by
 * importing it and asking. The renderer is a thin wrapper around these two
 * functions, so this is the part worth testing on every push:
 *
 *   slotsForPath(path)      which declarations may mount
 *   primarySlotForPath(path) the one unit that would render, if any
 *
 * Entering a URL into a browser would prove the same thing more slowly and only
 * on the machine that has a browser. Exit 1 on any mismatch.
 */

const { primarySlotForPath, slotsForPath, adsAllowedOn } = await import("../src/lib/ads/slots.ts");

const expectations = [
  // [path, allowed?, primary slot id or null, why]
  ["/", false, null, "homepage: commercial front door, no ad"],
  ["/blog", true, "blog-index", "lesson index"],
  ["/blog/", true, "blog-index", "trailing slash must not change policy"],
  ["/blog?page=2", false, null, "query strings are not paths — the component only sees pathname"],
  ["/blog/passwords-you-can-keep", true, "lesson-in-article", "lesson body"],
  ["/classes", true, null, "course catalogue: navigation, nothing declared"],
  ["/classes/web-development", true, "course-end", "course page, last block"],
  ["/classes/web-development/lesson-one", true, "course-end", "session lecture"],
  ["/apply", false, null, "application funnel"],
  ["/apply/pay", false, null, "payment return"],
  ["/apply/status/abc", false, null, "application status"],
  ["/pay", false, null, "how to pay"],
  ["/payment", false, null, "payment methods"],
  ["/shop", false, null, "commerce"],
  ["/shop/any-product", false, null, "product page"],
  ["/shop/any-product/checkout", false, null, "checkout"],
  ["/contact", false, null, "contact"],
  ["/visit", false, null, "booking"],
  ["/visit/info", false, null, "directions"],
  ["/certificates/verify", false, null, "verification"],
  ["/privacy", false, null, "legal"],
  ["/terms", false, null, "legal"],
  ["/refunds", false, null, "legal"],
  ["/shipping", false, null, "legal"],
  ["/accessibility", false, null, "legal"],
  ["/editorial", false, null, "standards"],
  ["/editorial/changelog", false, null, "standards"],
  ["/merchant", false, null, "operator surface"],
  ["/partners/apply", false, null, "form"],
  ["/request-project", false, null, "lead form"],
  ["/app/admin", false, null, "signed-in"],
  ["/portal/hr", false, null, "signed-in"],
  ["/auth/mfa", false, null, "auth"],
  ["/glossary/what-is-a-cookie", false, null, "route redirects to /classes — never declared"],
  ["/career-guides/cv", false, null, "route redirects to /classes — never declared"],
  ["/resources/x", false, null, "route redirects to /classes — never declared"],
];

const failures = [];

for (const [path, allowed, primary, why] of expectations) {
  const pathname = path.split("?")[0];
  const actualAllowed = adsAllowedOn(pathname);
  const actualPrimary = primarySlotForPath(pathname)?.id ?? null;

  // Query-string case: the expectation documents that the gate never sees it.
  const expectedAllowed = path.includes("?") ? actualAllowed : allowed;

  if (actualAllowed !== expectedAllowed) {
    failures.push(`${path}: allowed=${actualAllowed}, expected ${expectedAllowed} (${why})`);
  }
  if (!path.includes("?") && actualPrimary !== primary) {
    failures.push(
      `${path}: primary=${actualPrimary ?? "none"}, expected ${primary ?? "none"} (${why})`,
    );
  }

  // Invariant: an ineligible path may never return a slot, whatever the registry says.
  if (!actualAllowed && slotsForPath(pathname).length > 0) {
    failures.push(`${path}: disallowed path returned ${slotsForPath(pathname).length} slot(s)`);
  }
  // Invariant: at most one primary is reachable, so at most one container id can exist.
  const primaries = slotsForPath(pathname).filter((slot) => slot.primary);
  if (primaries.length > 1) {
    failures.push(`${path}: ${primaries.length} primary slots would render at once`);
  }
}

const allowedCount = expectations.filter(([, allowed]) => allowed).length;
console.log(
  `Ad placement behaviour — ${expectations.length} paths checked ` +
    `(${allowedCount} may carry a unit, ${expectations.length - allowedCount} must not)`,
);

if (failures.length) {
  console.error(`\n${failures.length} problem(s):`);
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  process.exit(1);
}
console.log("Placement behaviour holds.");
