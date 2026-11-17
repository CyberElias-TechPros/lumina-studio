# CEA Lesson Note — CEA-WEB-004 · Session 1: Setup & Dashboard

| Field       | Value                         |
| ----------- | ----------------------------- |
| Document ID | CEA-ACA-NOTE-WEB-004-S1       |
| Version     | 1.0 · Session 1 of 6 · Week 1 |
| Status      | Draft — pending pilot         |

## 0–10 · Review & warm-up

Name three WordPress sites you used this week — banks, blogs, churches, marketplaces; the internet's front door is mostly this software.

## 10–25 · Teaching block

**What WordPress is.** PHP + MySQL CMS, ~43% of all websites; core is free; themes (looks) + plugins (features) + your content = the site.
**Hosting options.** Shared (¢/month; cPanel) · managed WP hosts · LocalWP for offline practice. A real domain + SSL (free via Let's Encrypt) is the baseline — never launch on http://.
**Installation.** cPanel WordPress toolkit OR manual 5-minute install (zip from wordpress.org → unzip → create DB → wp-config → `wp-admin/install.php`).
**Settings that matter FIRST.** Site title/tagline · timezone (Lagos!) · permalink structure ("Post name") · admin username ≠ "admin" · editor vs administrator · DISCUSSION: disable trackbacks · MEDIA sizes.
**Dashboard tour.** Posts/Pages/Media/Comments · Appearance (themes) · Plugins · Users · Settings — every menu gets one sentence before anyone is allowed to click.

## 25–45 · Guided demonstration

Live: instructor provisions a fresh subdomain install (or LocalWP snapshot) projector-wide — wp-config edited, Lagos timezone set, permalinks post-name, test post published, one deliberate wrong-timezone screenshot shown with the room diagnosing.

## 45–70 · Guided practice

Pairs: on the practice sandbox — set timezone/title/permalink/user security (new admin themed after themselves, delete default admin); publish a "Hello Lagos" post with a featured image; verify Lagos timestamp.

## 70–95 · Independent practice (A1 part 1)

Solo: **sandbox configured** — your practice install logged into; settings locked per the list; one post live; screenshot of Settings → General and the fresh post filed to workbook.

## 95–110 · Correction & check

KC1: (1) Theme vs plugin, one line each. (2) Permalink choice for SEO. (3) Admin≠admin reason. (4) Timezone Lagos matters for. (5) LocalWP purpose.

## 110–120 · Summary & next session

The skeleton is up. S2: dress it — themes without breaking anything.

## Answers — KC1

1. Theme = look/layout; plugin = features/logic. 2) "Post name" — readable, keyword-friendly. 3) "admin" is the first guess in every brute-force bot; obscurity is one gate among many. 4) Correct post timestamps, scheduled posts. 5) Free offline practice without touching a live client site.

## Homework

Pick a fresh theme candidate (Astra/GeneratePress class) — S2 stress-tests it.
