<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

## Build & Quality
- `npm run build` — TanStack Start + Nitro, must pass
- `npx tsc --noEmit` — TypeScript check, must pass
- `npm run lint` — ESLint, slow on full repo; run selectively
- **Production**: www.cea.ng (Vercel), backend: cea-api.cyber-e54.workers.dev

## Sitemap: 214 URLs (auto-generated at build)
Static pages: 35 · Programs: 8 · Blog: 26 · Library: 12 · Glossary: 62 · Module detail: 40 · Career guides: 19 · Resources: 12

## Current Status: Competitor-Standard Content System

### Completed (deployed to production)
1. **Technical AdSense requirements**: `public/ads.txt`, `public/sitemap.xml` (build-generated, 214 URLs), `robots.txt`, all legal pages present.
2. **Content depth**: All 20 blog posts expanded to 800-1,118 words with honest reading time. All 8 program pages have `about` (3-4 paragraphs) + 5 FAQs + FAQPage JSON-LD.
3. **Thin pages fixed**: stories, library, FAQ, certificates/verify all substantive. "900+ materials" fabrication removed.
4. **Public library**: 1,958 items across 12 categories, server-rendered, no auth required. `/library/$category` with pagination.
5. **Glossary system** (63 pages): `src/data/glossary.ts` → `/glossary` index + `/glossary/$slug` pages with DefinedTerm schema, Nigeria-specific context, related programs/posts.
6. **Module detail pages** (40 pages): `src/data/module-details.ts` → `/programs/$slug/$module` with overview, topics, projects, assessment, prev/next navigation. Course schema.
7. **Career guides** (20 pages): `src/data/career-guides.ts` → `/career-guides` index + `/career-guides/$slug` with salary ranges, 90-day plans, pitfalls, resources. Article schema.
8. **Resource/templates** (12 pages): `src/data/resources.ts` → `/resources` index + `/resources/$slug` with step-by-step guides, HowTo schema, templates/checklists/cheat sheets.
9. **Glossary auto-linker**: `src/lib/glossary-auto-link.ts` + `src/components/glossary-linked-text.tsx` — auto-link glossary terms in program and blog content.
10. **Related content**: `src/components/related-content.tsx` — context-aware related links on program and blog pages.
11. **Content freshness**: `src/components/content-freshness.tsx` — last-reviewed dates on program and blog pages.
12. **Internal linking**: Glossary auto-links wired into program `about` text and blog post bodies; related content blocks on program pages, blog pages.
13. **Competitor analysis**: `docs/competitor-gap-analysis.md`, `docs/content-style-guide.md`.

## Key Data Files
- `src/data/site.ts` — programs with `about`/`faqs`/`outcomes`, engines, faqs
- `src/data/blog-posts-new.ts` — 26 blog posts (1 expanded to 800+ words, rest 412-618)
- `src/data/glossary.ts` — 62 terms with auto-link support
- `src/data/module-details.ts` — 40 module overviews, topics, projects, assessment
- `src/data/career-guides.ts` — 19 career roadmaps with 90-day plans
- `src/data/resources.ts` — 12 ungated templates, checklists, guides, cheat sheets
- `src/data/library-catalog.json` — build-time library snapshot (1,958 items, 12 categories)
- `src/lib/glossary-auto-link.ts` — auto-link utility for glossary terms
- `src/lib/reading-time.ts` — honest word-based reading time
- `scripts/generate-sitemap.mjs` — prebuild sitemap (214 URLs)
- `scripts/generate-library-data.mjs` — library catalog snapshot

## Components
- `GlossaryLinkedText` — renders paragraph arrays with glossary term auto-links
- `RelatedContent` — context-aware related content blocks (programs, blogs, glossary)
- `ContentFreshness` — last-reviewed date and author display

## Design Patterns
- Routes: `createFileRoute("/path")` with `head:` for SEO
- Components: `PageShell`, `PageHero`, `SectionHeading`, `CTASection` from `@/components/marketing/shell`
- Motion: `Reveal`, `StaggerGroup`, `StaggerItem` from `@/components/motion`
- UI: `Card`, `CardContent`, `Badge`, `Button` from `@/components/ui/`
- Data: typed exports from `src/data/`, slugified keys for lookups
- SEO: `getPageHead()` from `@/lib/seo` with structured data
