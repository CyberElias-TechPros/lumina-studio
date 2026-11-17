# CEA Lesson Note — CEA-WEB-003 · Session 11: Deployment & Git Workflow

| Field       | Value                           |
| ----------- | ------------------------------- |
| Document ID | CEA-ACA-NOTE-WEB-003-S11        |
| Version     | 1.0 · Session 11 of 12 · Week 6 |

## 0–10 · Review & warm-up

Netlify/GitHub account check — two students blocked by verification email; resolved on the spot (important: never skip it).

## 10–25 · Teaching block

**The flow.** code → test locally → commit (imperative) → push → CI/host builds → HTTPS live. Git is the bridge; deploy is the destination.
**Netlify free tier.** Connect GitHub → pick repo → publish dir = project root (or build command if a generator exists) → automatic `https://<name>.netlify.app` URL; every push redeploys; deploy previews on branches.
**Domain** (optional): A/AAAA/CNAME records; HTTPS automatic; `www` redirect.
**Git hygiene at this level.** main = always deployable · commit small · one feature per commit · tag releases (`v1.0`) when shipping · READ the build logs — red deploys fail loudly.
**Rollback plan.** Netlify "Publish previous deploy" button — the fix for every panic at 11pm.

## 25–45 · Guided demonstration

Live: instructor connects the web-lab repo to Netlify projector-wide — repo → build → deploy → URL distributed to the room via QR; push a deliberate typo fix → auto-redeploy shown in ~40s; revert via "Publish previous deploy" → restored in one click.

## 45–70 · Guided practice

Pairs: connect partners' repos; deploy; verify https on phone; break a CSS value → push → watch redeploy → revert; submit URLs to the cohort board.

## 70–95 · Independent practice (A1 milestone)

Solo: **your A1 site live** — Netlify deploy; URL filed to LMS A1; README updated with the live link; rollback rehearsed once. This feeds final assessment.

## 95–110 · Correction & check

KC11: (1) Deploy pipeline order. (2) netlify redeploy trigger. (3) Build log reading rule. (4) Publish-previous-deploy use. (5) main cleanliness.

## 110–120 · Summary & next session

The world can see it now — final day makes you sell it properly. S12: portfolio & presentation.

## Answers — KC11

1. commit → push → host builds → HTTPS live. 2) A push to the watched branch. 3) Read from the first red line, top-down. 4) One-click restore of the last known-good deploy. 5) Only deployable code on main — protect it like a brand.

## Homework

Rehearse your 3-minute walkthrough out loud — S12 is observed.
