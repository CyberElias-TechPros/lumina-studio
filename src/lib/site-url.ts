/**
 * Canonical public origin for cea.ng.
 *
 * The production site is served by Vercel on `www.cea.ng`. The bare apex
 * (`cea.ng`) points at the cPanel mail host and only redirects to `www`, so
 * any canonical, sitemap, Open Graph or structured-data URL on the apex is a
 * redirecting URL — Google Search Console reports those as "Page with
 * redirect" and refuses to index them. Every absolute public URL must be
 * built from this constant. (`scripts/generate-sitemap.mjs`,
 * `scripts/generate-merchant-feeds.mjs` and `public/robots.txt` mirror it.)
 */
export const SITE_URL = "https://www.cea.ng";

/** Absolute URL on the canonical origin for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
