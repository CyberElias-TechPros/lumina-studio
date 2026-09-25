# Immersive Visual Design & Experience Engineering — Pass 2, 2026-09-11

Follow-up to the 2026-09-09 pass, executed against the complete-overhaul
directive. That pass built the motion system, shell motifs and accessibility
layer; this pass deepens the same universe and retires the two items the last
critique deliberately deferred, plus the gaps it left open.

Scope of effect (what "every screen" means here): the shared layers every
route renders through, so the language propagates without per-page edits —

| Layer | File | Routes affected |
| --- | --- | --- |
| Route continuity | `src/router.tsx` + view-transition CSS | all (~300) |
| Foundation tokens/utilities | `src/styles.css` | all |
| Marketing shell | `src/components/marketing/shell.tsx` | all public pages (~43) |
| Motion primitives | `src/components/motion/index.tsx` | all |
| Workspace shell | `src/components/app/app-shell.tsx` | all CEA-OS workspaces (~46) |
| Exemplar page | `src/routes/programs.index.tsx` | /programs |

## What changed

### 1. Route continuity — view transitions (previously deferred)

`createRouter({ defaultViewTransition: true })` + a re-timed cross-fade
(`cea-vt-out` 240ms / `cea-vt-in` 320ms on the house `--ease-out-expo`
curve). Navigation now reads as one surface settling rather than a document
being replaced. Browsers without the View Transitions API and reduced-motion
users get an instant cut (`animation: none` under `prefers-reduced-motion`).
The deferred item was "cost/benefit poor on ~300 routes" — with router-level
support the cost became ~30 lines total.

### 2. Foundation — motion/elevation tokens (§30)

`--ease-out-expo`, `--ease-in-out-soft`, `--duration-fast/normal/slow`,
`--shadow-lift` join the token sheet, so CSS transitions and view transitions
speak the same timing language as the JS `EASE`. New utilities, each with a
first consumer (no dead tokens):

- `text-h3` — third rung of the fluid editorial scale → workspace page titles
  (all ~46 workspaces got the fluid scale in one line)
- `mask-fade-x` — replaces the Marquee's inline arbitrary mask
- `hairline-brand` — the house gradient rule, now a named utility (PageHero
  bottom edge, workspace topbar)
- `glass-strong` — heavier frosted surface for chips floating over art
- `shadow-lift` — the raised-state rung of the elevation ladder

### 3. Marketing shell (§43, §46)

- **PageHero**: art panels gained an offset ground layer (the panel casts a
  presence behind itself) and an optional `artCaption` glass chip naming the
  scene; optional `cue` mounts the new ScrollCue bridge.
- **SectionHeading**: optional `aside` slot — editorial split headers instead
  of every heading stacking under itself.
- **StatBand**: index numerals (01–04) echo the chapter motif in miniature.
- **CTASection**: the finale is now an ink panel — deep navy gradient, grain,
  brand light bleeding through, white primary CTA, and the five-engine
  hairline strip along the bottom edge. Every page's closing beat previously
  whispered; it now lands.

### 4. Motion primitives

- **ScrollCue** — hairline track with a drifting dot, fades out on first
  scroll; static and fully readable under reduced motion.
- **Marquee** — now uses the shared `mask-fade-x`.

### 5. Workspace shell (§42: efficient, slick, not experimental)

- Active nav items grow a 3px brand gradient rail (pure CSS via
  `activeProps` + `after:`), nav items nudge 2px on hover.
- Topbar carries the brand hairline; page titles use the fluid `text-h3`.
- `motion.main` gives each workspace one choreographed entrance
  (fade + 12px rise, 450ms, house curve — MotionConfig still degrades it for
  reduced-motion users).
- Mobile drawer backdrop gains `backdrop-blur-sm`.

### 6. /programs — the de-genericized exemplar (§34)

The classic "hero → chips → card grid → CTA" became:

- a **sticky glass control deck**: the active category is one physical pill
  that travels between chips (`layoutId`), level filters as a quieter second
  row, live count in tabular numerals
- cards gained **3D tilt** (fine-pointer only), an **engine wash** — the card
  catches its engine's color on hover, tying depth feedback to wayfinding —
  and an arrow affordance that fills with the brand gradient and rotates 45°
- search input gets focus-within icon tinting + glow shadow
- the closing section uses the new editorial `aside` split

### 7. Unrelated repair

`newBlogPosts` had `imageUrl` in the data but not the type — pre-existing
`tsc --noEmit` failure on a clean tree. Fixed with an optional field so the
quality gate holds for the whole repo again.

## Deliberately NOT done

- WebGL / particles / cursor-following halos — unchanged verdict from 09-09:
  grain + light + type carry the atmosphere at a fraction of the cost (§50).
- Horizontal-scroll or pinned scenes — scroll predictability on a content
  site with ads still wins.
- Shared-element transitions between routes — the cross-fade covers
  continuity; per-element naming across ~300 routes is not maintainable.

## Quality gate — pass record

```
✓ npx tsc --noEmit → exit 0 (was already failing on main before this pass; repaired)
✓ npm run build → success (both vercel and node-server presets)
✓ ESLint on all touched files → 0 errors (4 pre-existing warnings)
✓ SSR smoke (node-server build, curl): / /programs /pricing /engines /admissions
  /blog /faq /glossary /career-guides /resources /library /auth/sign-in /app → 200;
  unknown route → 404
✓ SSR HTML contains: ink finale + engine hairline strip (home), glass control deck
  + active pill + scroll cue (/programs), brand hairline (topbar)
✓ CSS bundle contains: view-transition-old/new, --ease-out-expo, text-h3,
  mask-fade-x, hairline-brand, glass-strong, shadow-lift
✓ Reduced-motion: CSS animation kill-switch extended to ::view-transition-*;
  MotionConfig reducedMotion="user" still governs JS motion (ScrollCue, TiltCard,
  entrance) — all render content-only without it
✓ No new dependencies; view transitions ship in the router already present
```
