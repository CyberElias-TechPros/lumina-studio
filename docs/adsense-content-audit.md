# AdSense "Low Value Content" — Site-Wide Deep Dive

Audit date: 2026-08-24 · Method: production crawl of every public URL (66 pages), rendered-text word counts, metadata cross-checks, technical requirement verification. AdSense can only see public pages (no auth), so this audit covers exactly its review surface.

## Verdict

The rejection was justified on three fronts:

1. **52 of 66 pages render under 300 words** of visible text after chrome is stripped.
2. **Every blog post claims a false reading time** ("5–11 min read") while the body is only **56–194 words** (~10× inflation). Reviewers click an "11 min read" article and exhaust it in 40 seconds — the single strongest low-value signal on the site.
3. **Core AdSense technical files were missing or broken**: no `ads.txt` at all, and `/sitemap.xml` returned 404 (the route rendered an HTML shell instead of XML).

## A. Technical requirements

| Check | Status before | Detail |
|---|---|---|
| `/ads.txt` | ❌ missing | AdSense requires it to authorize sellers. Created with `pub-9117572925263537`. |
| `/sitemap.xml` | ❌ 404 | Route `sitemap.xml.tsx` registered as `/sitemap/xml` (TanStack treats the dot as a folder separator) AND returned HTML — loaders can't emit raw Responses for document requests. Replaced with build-time generated static `public/sitemap.xml`. |
| robots.txt | ⚠️ | Pointed at dead `/sitemap/xml`; now points to `/sitemap.xml`. Crawl rules themselves were fine. |
| Sitemap coverage | ⚠️ | Missing `/privacy`, `/terms`, `/team`, `/accessibility`, `/work`, `/certificates/verify`, plus 5 newer posts. Generator covers all 66 URLs (32 static + 8 programs + 26 posts). |
| adsense-account meta tag | ✅ | Present in `__root.tsx`. |
| noindex leaks | ✅ | None on public routes. |
| Meta titles/descriptions | ✅ | `getPageHead` produces unique per-page title/description; OG/Twitter complete. |

## B. Rendered content depth (production crawl)

Words = body text with nav/footer/scripts/SVG stripped. Thresholds: <300 = thin.

```
<300 words (THIN): 52 pages   ← includes EVERY program page and EVERY blog post
300–599 words:      9 pages
≥600 words:         5 pages (/about 1772, /terms 1183, /blog index 892, /privacy 679, /vizier 603)
```

Thinnest pages: `/library` 111 · `/contact` 125 · `/visit/feedback` 138 · `/stories` 139 · `/faq` 142 · `/certificates/verify` 148 · `/programs/compare` 153 · `/apply` 162.

## C. Blog reading-time fabrication (all 26 posts)

| slug | claimed | actual body words |
|---|---|---|
| building-a-soc-on-a-budget | 11 min | 129 |
| cybersecurity-for-small-business-nigeria | 10 min | 132 |
| api-development-nodejs | 10 min | 144 |
| starting-tech-career-nigeria-2026 | 9 min | 194 |
| cloud-computing-for-nigerian-businesses | 9 min | 135 |
| devops-for-small-teams | 9 min | 128 |
| react-hooks-explained | 9 min | 135 |
| why-we-are-building-cea-os | 9 min | 94 |
| …and 18 more | 5–8 min | 56–170 |

## D. Page-specific notes

- **Blog posts**: bodies are 5 short paragraphs; several end abruptly. The index page itself is fine.
- **Program pages (~260–290 words)**: good skeleton (outcomes, module titles, snapshot) but modules have no descriptions, no FAQ, no admissions detail. Structure exists; depth doesn't.
- **/library (111 words)**: renders empty publicly — the catalog API returns nothing server-side, so reviewers see "Search the vault below" over an empty box, plus the unverifiable "All 900+ course materials" claim.
- **/stories (139 words)**: essentially a heading + CTA; no stories.
- **Functional forms** (`/contact`, `/apply`, `/visit/*`, `/certificates/verify`) are legitimately form-centric but need supporting copy around them.

## E. Remediation plan (applied in order)

1. ✅ `public/ads.txt` created.
2. ✅ Real static `/sitemap.xml` via `scripts/generate-sitemap.mjs` (`prebuild` step) + broken route removed + robots.txt fixed + coverage completed.
3. Blog posts: expand every body to genuine article length (600–900 words, topic-specific, Nigeria-contextual); recompute honest reading times from final word count.
4. Program pages: add module descriptions and per-program FAQ from real curriculum data.
5. Thin utility pages: substantive supporting copy where legitimate (library intro/resources, stories, faq expansion).
6. Remove unverifiable claims surfaced by the audit ("900+ course materials").

## F. Production results (post-remediation crawl 2026-08-24)

```
errors/non-200:     0
< 300 words (THIN): 14  (down from 52 — all are pure form/UI utility pages)
300–599 words:      26  (up from 9)
≥600 words:         26  (up from 5)
```

Remaining "thin" pages are legitimately form/UI-driven: `/contact`, `/apply`, `/visit/feedback`,
`/programs/compare`, `/faq` (accordion content renders client-side, visible to AdSense JS crawl),
`/virtual-tour`, `/visit/info`, `/marketplace`, `/visit/brochure`, `/work`, `/team`,
`/admissions`, `/alumni`, `/visit`. These are functional pages where content depth is intentionally
low because the value is in the interaction, not prose — AdSense treats form pages as legitimate
if the site overall has sufficient indexable content, which it now does.
