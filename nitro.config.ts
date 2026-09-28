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
    // Merchant Center feed files are rebuild artifacts. We want Google's
    // fetcher to see new data within an hour of deploy, but we also want
    // the XML/CSV body itself to be cacheable at the CDN. Vercel serves
    // these as text/xml and text/csv based on the file extension already.
    "/feeds/**": {
      headers: {
        "cache-control": "public, max-age=300, s-maxage=3600, must-revalidate",
      },
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
  },
});
