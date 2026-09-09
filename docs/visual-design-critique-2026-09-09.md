# Immersive Visual Design & Experience Engineering — Pass 2026-09-09

Dedicated visual critique and upgrade pass across the public-facing CEA-OS
experience, following the immersive design manifesto (§32–§57). Scope: the
shared design system, marketing shell, navigation surfaces and the flagship
home/auth routes. All app workspaces inherit the motion/accessibility layer
without behavior changes.

## Design spectrum placement (§42)

A premium education brand + operating-system product sits at
**Polished → Dynamic → Immersive (with cinematic hero moments)**.
The `/app/**` workspaces stay efficient and slick; immersion lives in the
marketing/admissions surface. This pass deliberately did not turn
functional role dashboards into visual experiments (§33).

## What changed

### 1. Motion system coherence (§37, §48, §49)

- `MotionProvider` (`MotionConfig reducedMotion="user"`) mounted at the app
  root: every JS-driven transform animation now degrades to opacity-only for
  users who prefer reduced motion — previously only CSS animations were
  covered.
- Shared timing language exported: `EASE` (expo-out curve) and `SPRING`
  presets (soft / snappy / tilt) — isolated easings across routes replaced.
- New primitives:
  - `LineMaskReveal` — words rise from behind a clip mask; the cinematic
    entrance now used by every `PageHero` (≈43 public routes) and the home h1.
  - `Parallax` — scroll-linked, spring-smoothed drift; disabled on
    reduced-motion and touch. Used on the home hero composition and
    PageHero art.
  - `PulseDot` — living status dot used on the application-open eyebrow.
- `TiltCard` gains a cursor-tracked glare wash and is fully inert on touch
  and reduced-motion (renders plain children — no orphan transforms).
- `Magnetic` similarly falls through on touch/reduced motion.
- `Counter` jumps straight to its final value under reduced motion.
- `Marquee`: edge fade masks, pause-on-hover, static-readable under reduced
  motion.

### 2. Performance-aware immersion (§50, §52)

- `Spotlight` rewritten from `setState`-per-mousemove (a React re-render on
  every pointer event) to motion values + `useMotionTemplate` with rAF
  batching — zero re-renders, compositor-friendly; static ambient wash
  fallback on touch.
- No new libraries, no WebGL, no video, no particle systems. Grain is one
  inline SVG data-URI layer, not a request.

### 3. Visceral first impression (§39, §46)

- Fluid display type: `text-hero` / `text-h2` clamp scales replace fixed
  sizes in the shell — the headline now maxes at ~4.6rem and scales down
  continuously; tabular numerals on stats and section indices.
- Home h1 animates per-line through masks; the gradient underline flourish
  lands after the last line — one choreographed beat rather than simultaneous
  fades.
- Scroll cue bridges hero → story.

### 4. Bespoke motifs rather than template assembly (§40, §43, §55)

- Editorial section numbering ("— 01 —") threads the home page as
  ATTENTION → CONTEXT (engines) → VALUE (programs) → PROOF-adjacent
  (resources, outcomes) → ACTION, with the rule as the recurring house
  motif.
- Film grain (`noise`) on hero/CTA/auth surfaces; a hairline rim light along
  CTA panels; the five-engine wayfinding strip caps every footer — brand
  language that survives logo/color removal (§55).
- Auth surfaces gained the same depth system (grid lines, brand hairline,
  grain) so sign-in reads as part of the product, not a generic card.

### 5. Interaction finish (§35, §38)

- `sheen` hover treatment on gradient CTAs (single background animation).
- Brand CTAs: lift on hover, press-settle on active, `motion-reduce` inert.
- Footer links grow a dot indicator on hover; brand mark micro-rotates.
- Back-to-top control appears after 900px with spring entrance.

### 6. Accessibility & states (§52, quality gate)

- Skip-to-content link + `#main-content` on every marketing page.
- "More" nav menu rebuilt as a real disclosure: button with `aria-expanded`,
  opens on hover and keyboard, closes on `Escape`/outside-pointer, menu-item
  roles, scrollable at short viewports. Previously hover-only and unreachable.
- Global `:focus-visible` outline (brand glow) now covers card-style links,
  which had no focus affordance at all.
- `aria-current="page"` on nav; `color-scheme: light dark` so native controls
  match theme; branded thin scrollbars.
- 404 page rebuilt as an on-brand experience (display numeral, glow,
  dual-path CTA) instead of a bare stack of text.

## Self-critique (§54) — weakest areas found and fixed

| Check       | Finding                                 | Fix                                           |
| ----------- | --------------------------------------- | --------------------------------------------- |
| Motion      | JS animations ignored reduced-motion    | `MotionProvider` + component guards           |
| Interaction | Dropdown menus mouse-only               | Keyboard disclosure w/ Escape + focus rings   |
| Depth       | Hero composition flat while scrolling   | Parallax on art column + floating card        |
| Typography  | Fixed h1 sizes, no editorial scale      | clamp `text-hero`/`text-h2`, tabular numerals |
| Performance | Spotlight re-rendered page on mousemove | Motion-template rewrite                       |
| States      | 404 plain; auth pages identity-free     | Branded 404; depth system on auth             |
| Texture     | `noise` utility was an empty stub       | Real grain layer on hero/CTA/auth             |

## Deliberately NOT done

- Route exit animations / view transitions — cost/benefit poor on ~300 routes;
  the entrance fade already provides continuity.
- Horizontal scroll sections / pinned scenes — risky for predictable scroll
  control (§44) and LCP on a content site.
- Video, WebGL, cursor-following halos — §50 says prefer the simplest
  technique; grain + light + type already carry the atmosphere.
- Sound — no context where it beats silence for an education product (§32).

## Quality gate — pass record

```
✓ Dist visual identity (burgundy→glow gradients, engine wayfinding, grain, rim lights)
✓ Strong typography (Montserrat display clamp scale, tabular numerals)
✓ Hierarchy (numbered narrative rail on home; single CTA focus per section)
✓ Consistent spacing/tokens (no hardcoded colors introduced)
✓ Purposeful motion (one motion language: EASE + SPRING, meaningful reveals)
✓ Natural interactions (springs on tilt/magnet/menu; press states)
✓ Depth (aurora + spotlight + parallax + layered cards)
✓ Polished/loading/empty/error/success states (404 branded; newsletter states live)
✓ Mobile intent (pointer/touch guards; fluid type; menu unchanged ergonomics)
✓ Reduced-motion (CSS + MotionConfig + per-component fallbacks)
✓ Keyboard (skip link, disclosure menu, global focus-visible)
✓ Contrast (token-driven, unchanged ratios; overlays are opacity-limited grain/glow)
✓ Performance (no new deps; re-render fix; compositor-only transforms)
✓ SEO-compatible rendering (all verified via SSR HTML — content static in DOM)
✓ No generic-template feeling from logo/color removal (motifs are product-specific)
```

Verification: `tsc --noEmit` ✓ · `npm run build` ✓ · ESLint 0 errors on touched
files ✓ · SSR smoke of `/ /programs /admissions /engines /auth/sign-in
/pricing /blog` all 200 ✓.
