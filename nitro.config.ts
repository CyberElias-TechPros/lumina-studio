import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  routeRules: {
    // PWA files: never cache the service worker; serve the manifest with the
    // correct content type (vercel.json headers don't apply to Build Output
    // API deployments, so these live in nitro's config).
    "/sw.js": {
      headers: { "cache-control": "no-cache, no-store, must-revalidate" },
    },
    "/manifest.webmanifest": {
      headers: { "content-type": "application/manifest+json; charset=utf-8" },
    },

    // Index-control for private surfaces. robots.txt Disallow alone only
    // *hides* these URLs — they can still be indexed as bare entries, and
    // the auth/app trees have hundreds of route files where per-route meta
    // tags could silently drift. A server-level header is the invariant.
    "/app/**": { headers: { "x-robots-tag": "noindex, nofollow" } },
    "/auth/**": { headers: { "x-robots-tag": "noindex, nofollow" } },
    // Legacy role-directory kept for bookmarks; public app is /app.
    "/portal/**": { headers: { "x-robots-tag": "noindex" } },
    "/portal": { headers: { "x-robots-tag": "noindex" } },
    // Application status lookups carry personal data via token/id.
    "/apply/status/**": { headers: { "x-robots-tag": "noindex, nofollow" } },
    // AdSense recovery (Phase 0): thin/placeholder marketing surfaces stay
    // reachable for users but out of the index until they carry real
    // substance. Each has a relaunch checklist in plans/adsense-recovery-plan.md.
    // NOTE: do NOT Disallow these in robots.txt — crawlers must be able to
    // fetch them to observe the noindex directive.
    "/stories": { headers: { "x-robots-tag": "noindex, follow" } },
    "/work": { headers: { "x-robots-tag": "noindex, follow" } },
    "/alumni": { headers: { "x-robots-tag": "noindex, follow" } },
    "/marketplace": { headers: { "x-robots-tag": "noindex, follow" } },
    "/community": { headers: { "x-robots-tag": "noindex, follow" } },
    "/partners": { headers: { "x-robots-tag": "noindex, follow" } },
    "/virtual-tour": { headers: { "x-robots-tag": "noindex, follow" } },
    "/vizier": { headers: { "x-robots-tag": "noindex, follow" } },
    "/engines": { headers: { "x-robots-tag": "noindex, follow" } },
    "/careers": { headers: { "x-robots-tag": "noindex, follow" } },
    "/scholarships": { headers: { "x-robots-tag": "noindex, follow" } },
    "/library": { headers: { "x-robots-tag": "noindex, follow" } },
    "/library/**": { headers: { "x-robots-tag": "noindex, follow" } },
    "/glossary/**": { headers: { "x-robots-tag": "noindex, follow" } },
  },
});
