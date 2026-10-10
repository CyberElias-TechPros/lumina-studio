# Search Console page-indexing review (report dated 4 Oct 2026)

Source: Google Search Console → Page indexing, property `sc-domain:cea.ng`.

| Reason                               | Pages | Verdict                                           |
| ------------------------------------ | ----: | ------------------------------------------------- |
| Page with redirect                   |   197 | **Bug: fixed in code**, plus expected legacy 301s |
| Blocked by robots.txt                |    25 | Expected (`/app`, `/auth`, old `/apply?program=`) |
| Alternate page with proper canonical |     3 | Expected (`?page=` variants, legacy URL)          |
| Excluded by `noindex`                |     1 | Expected (`/app`)                                 |
| Not found (404)                      |     1 | Cloudflare artefact, see "Dashboard actions"      |
| Crawled – currently not indexed      |     2 | Should clear once the canonical-host fix is live  |

## Root cause: canonicals pointed at a redirecting host

- `www.cea.ng` is the Vercel production site.
- The apex `cea.ng` has an A record pointing at the cPanel/mail host
  (`54.37.90.54`, see `email-dns-audit.md`). That host only redirects to `www`.
- Every canonical tag, `og:url`, JSON-LD URL, sitemap entry and the robots
  `Sitemap:` line used `https://cea.ng/...`.

So Google fetched each sitemap URL, got a redirect to `www`, and then found a
canonical tag pointing back at the apex. That is why live pages such as
`https://cea.ng/contact`, `https://cea.ng/` and
`https://cea.ng/blog/sitting-down-at-a-computer` were reported as "Page with
redirect", and why almost nothing was indexed.

**Fix:** the canonical origin is now `https://www.cea.ng` everywhere, built from
`src/lib/site-url.ts`. It is mirrored in `scripts/generate-sitemap.mjs`,
`public/robots.txt`, `playwright.config.ts` and the backend `APP_URL` (used in
links inside emails, calendar invites and the Paystack callback). We kept the
apex as a redirect rather than moving the site onto it: the apex A record also
serves mail, FTP and cPanel, so repointing it at Vercel would break mail.

## Secondary fixes

- **Redirect chains.** 12 legacy `/blog/*` redirects in `vercel.json` (and the
  mirrored `src/lib/legacy-redirects.ts`) pointed at slugs that no longer
  exist. Those then bounced again to `/blog`. Every destination now points at
  a live page, and the 10 dead intermediate slugs Google had crawled
  (`/blog/on-your-own`, `/blog/the-portfolio-that-proves-it`, …) have their own
  301s.
- **Soft 404s.** Unknown `/blog/<slug>` URLs, including the literal
  `/blog/$slug` pattern, now return a real **404** instead of a 301 to `/blog`.
  Google treats a redirect to an index page as a soft 404.

## Expected entries (no action)

- **Legacy URLs** (`/glossary/*`, `/programs/*`, `/career-guides/*`,
  `/library/*`, `/resources/*`, `/pricing`, `/events`, `/work`, …) were removed
  in the school-site redesign and deliberately 301 to their closest page.
  They will stay in "Page with redirect" until Google stops recrawling them.
  That is harmless.
- **Host and slash variants:** `http://`, apex, and trailing-slash variants
  (`/apply/`, `/visit/`) redirect by design.
- **Private areas:** `/app/*` and `/auth/*` are private and blocked by
  robots.txt.

## After deploying

1. Deploy the frontend (Vercel). Optionally redeploy the Worker so `APP_URL`
   switches to `www`; email links work either way, since the apex redirects.
2. In Search Console → Sitemaps, submit `https://www.cea.ng/sitemap.xml`.
   Remove any `https://cea.ng/sitemap.xml` entry.
3. URL inspection → Request indexing for `/`, `/classes`, `/blog`,
   `/admissions` and a few lesson pages.
4. On the "Page with redirect" report, click **Validate fix**. Do the same on
   "Crawled – currently not indexed".
5. Cloudflare → Scrape Shield: turn **Email Address Obfuscation** off for the
   `www` zone. Cloudflare's obfuscation creates `/cdn-cgi/l/email-protection`
   links. Cloudflare answers those URLs itself, so the Vercel redirect never
   runs.
6. Optional: make the cPanel apex redirect a single **301** straight to
   `https://www.cea.ng$request_uri`, so the path is preserved and there is no
   `http://` hop.
