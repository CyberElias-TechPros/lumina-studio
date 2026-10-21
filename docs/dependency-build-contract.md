# Dependency/build contract

## Incident: 21 October 2026

Cloudflare auto-detected the root `bun.lock` and ran Bun 1.4.3 with
`install --frozen-lockfile`. That lock was still from the old TanStack/Vite
application and lacked the current PostCSS override and Next.js dependencies.
The install failed before any Worker compilation or deployment. npm-only CI
could not detect a stale Bun lock.

The repair imports the existing `package-lock.json` into Bun 1.4.3, preserving
npm's resolved dependency graph rather than upgrading packages or removing the
security override. Keep frozen installs enabled. Never fix this by disabling
frozen mode in production.

## Updating dependencies

npm's `package-lock.json` is the canonical root dependency graph. After any
root dependency or override change:

```sh
npm install                  # intentionally update/review npm resolution
npm run deps:sync-bun         # import npm's graph with pinned Bun
npm run deps:check
npm exec --yes --package=bun@1.4.3 -- bun install --frozen-lockfile
```

Commit `package.json`, `package-lock.json`, and `bun.lock` together. The sync
script uses a temporary directory; it does not delete the current lockfile or
install dependencies into the working tree. `.bun-version` pins the tested Bun
version. The existing `bunfig.toml` supply-chain settings remain unchanged.
Backend and transitional Android npm packages have their own lockfiles; update
those with npm in their respective directories, not the root Bun lock.

CI now checks exact npm-to-Bun lock agreement, runs Cloudflare's frozen install,
and builds using those installed dependencies. Existing npm CI continues to
check npm installs and backend tests. These checks run on every PR, without
path filters or `continue-on-error` for the dependency job.

## Hosting and merge protection (external configuration)

- Require **Dependency contract (Cloudflare frozen Bun install)**, frontend
  build, and backend typecheck/tests in the `main` ruleset. Require checks to
  pass on an up-to-date branch before merging. Do not bypass failing checks.
- Repo integration returned HTTP 403 when reading branch protection during the
  repair. Required-check enforcement has **not** been configured or verified.
  A failing workflow alone is not proof that GitHub blocks merging.
- If retaining Cloudflare's root Bun auto-install, pin `BUN_VERSION=1.4.3` in
  its build environment to match `.bun-version`. Verify dashboard values; a
  repository file is not proof that a hosted setting changed.
- The Worker is in `backend/`, not the root Next.js app. A Worker-specific
  build should use that root and its `package-lock.json` (`npm ci`), with the
  appropriate backend build/deploy commands. Do not build the Next.js website
  as a Worker by accident. Review the actual dashboard commands before changes.
- Prefer one production deployment authority. The existing GitHub
  `deploy-backend.yml` tests, migrates, deploys an exact revision and checks
  revision/DB health. Avoid competing dashboard and Actions production
  deployments. Do not disable either until the chosen path has verified access.

No Cloudflare settings, credentials, production data, or branch rules were
changed by this source repair. A successful frozen install fixes this incident's
failure stage, not every possible later deployment error. Confirm the next
Cloudflare build and exact deployed revision before claiming recovery.
