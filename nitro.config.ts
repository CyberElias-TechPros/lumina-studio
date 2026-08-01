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
  },
});
