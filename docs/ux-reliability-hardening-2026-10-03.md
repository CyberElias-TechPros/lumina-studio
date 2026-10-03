# Cross-cutting UX and reliability hardening

**Date:** 2026-10-03  
**Scope:** A targeted improvement pass across the Academy’s role-based workspaces—not a claim that every possible product or operational pain point has been eliminated.

## User-facing issues addressed

- **Role landing and parent access:** Sign-in, MFA, magic-link verification, and `/app` now direct people to their role’s first workspace. The canonical frontend role registry now includes `parent`, matching the backend; previously a parent could be normalized as a student, misrouted, or denied access.
- **Finding and reaching tools:** The command palette now searches the active workspace’s navigation plus shared destinations, has an accessible dialog name, and exposes an accessible empty state. Mobile navigation uses a modal drawer that closes on navigation, and the app shell includes a skip-to-content link.
- **Onboarding:** The tour uses role-specific labels and accessible dialog controls. On narrow screens it opens the navigation drawer while explaining navigation, then closes it for the search step. Delayed startup rechecks dismissal and route state so a stale timer cannot open the tour after the user has left.
- **Notifications:** Replaced the hard-coded unread indicator with a per-user unread-count endpoint and app-shell badge that refreshes after reads, on tab focus, and every minute. The notification page now shows saved preference data, supports marking individual items read, loading older pages, saving/canceling preference drafts, and explicit loading/error states. A backend test covers unread totals and verifies that reading a shared notice for one user does not change another user’s count.
- **Unnecessary work:** Certificate-recipient candidates are not fetched for roles that cannot target recipients.
- **Connectivity honesty:** The app displays an offline warning that explicitly says changes are not queued and warns users to verify payment/submission status before retrying. The service worker now has a dedicated recovery page rather than silently substituting the public home page for an unavailable private route.
- **Dependency hygiene:** Refreshed the root lockfile (root audit is clean) and upgraded vulnerable backend development dependencies `basic-ftp` and Vitest to patched compatible releases.

## Validation performed

- Root and backend TypeScript checks pass.
- `npm run build` succeeds and statically generates the app’s routes.
- Backend regression suite: **71 files, 818 tests passed**.
- Changed-file Prettier check passes. Selective ESLint reports **0 errors** and one Fast Refresh warning in `app-shell.tsx`.
- Local HTTP smoke checks returned 200 for `/app`, `/app/notifications`, and `/offline.html`.
- Root dependency audit: **0 vulnerabilities**. Backend production-dependency audit (`npm audit --omit=dev`): **0 vulnerabilities**.

## Remaining work and limitations

1. **Browser-level verification is still needed.** Role, mobile-navigation, and parent e2e cases are in `e2e/roles.spec.ts`, but they were not run in this environment because no Playwright browser binary is installed. Test with real desktop/mobile browsers, keyboard-only navigation, and a screen reader before release.
2. **Offline writes are deliberately not replayed.** The app warns instead of queueing potentially sensitive or non-idempotent actions (especially payments and submissions). A safe queue needs idempotency, conflict handling, and clear per-action status.
3. **Backend development-tool audit remains open.** The backend’s production dependencies are clean, but `npm audit` still reports five high-severity advisories in the Cloudflare/Vitest/Miniflare/Wrangler development toolchain and its `sharp`/`undici` dependencies. npm’s automatic fix hit an Arborist internal error, and its suggested Cloudflare-pool upgrade is a breaking major-version change; upgrade and re-test that toolchain separately rather than force-installing it here.
4. **Build-time library refresh depends on an external fetch.** That request failed during the build, but the generator retained the existing catalog and the production build completed. Confirm the data source is reachable in CI/release builds.
5. **Real provider and operational paths still need deployment checks.** Email, SMS, push, payment, and other integrations depend on configured provider credentials and production callbacks; passing mock/unit tests does not validate those live services.
6. **A complete pain-point inventory needs user research.** This code pass cannot establish that every role, device, accessibility need, locale, or real Academy workflow is covered. Validate with learners, parents, instructors, and staff and prioritize findings from their actual use.
