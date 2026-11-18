# CEA Lesson Note — CEA-WEB-003 · Session 9: Planning & Structuring a Project

| Field       | Value                          |
| ----------- | ------------------------------ |
| Document ID | CEA-ACA-NOTE-WEB-003-S9        |
| Version     | 1.0 · Session 9 of 12 · Week 5 |

## 0–10 · Review & warm-up

Folder trees displayed — "index.html + style.css + myfile(2).html + final-final.zip" — the room laughs, then confesses.

## 10–25 · Teaching block

**Project brief.** One paragraph: who, what job, pages, the ONE interactive feature, deadline, done-definition. Write it before code; pin it above the monitor.
**Folder architecture.** `/project · index.html · /css/main.css · /js/main.js · /assets/{img,fonts} · README.md` — predictable; names kebab-case; nobody stores downloads in root.
**Reusable patterns.** Header/footer become JS-template partials OR copied consistently — pick one, document in README · CSS variables as the single theme source · one utility class per job.
**Git & GitHub.** init → add → commit (imperative verbs: "Add services grid") · .gitignore (node_modules, .DS_Store, .env) · branches: main + feature/* optional at this level · push early — every session push beats one giant Friday commit.

## 25–45 · Guided demonstration

Live: instructor's `web-lab` repo re-organized live — 40 messy files → new tree; .gitignore added; first push; GitHub repo page shown; README skeleton written (what/why/how-to-run).

## 45–70 · Guided practice

Pairs: restructure partner's project to the canonical tree (git mv); write README skeleton; init repo if absent; initial commit + push; partner verifies GitHub shows it all.

## 70–95 · Independent practice (Project milestone)

Solo: **repo shipped** — canonical structure; README (what/why/run); .gitignore; ≥3 commits with imperative messages; pushed to your GitHub. Workbook: repo URL pasted.

## 95–110 · Correction & check

KC9: (1) README for whom. (2) git init→add→commit order. (3) Imperative commit examples. (4) .gitignore essentials. (5) Push-early philosophy.

## 110–120 · Summary & next session

Organised is half-engineered. S10: read the console like a detective — debugging & quality.

## Answers — KC9

1. Future-you and collaborators — what is this, how do I run it. 2) init → add → commit. 3) "Add hero", "Fix contact validation", "Deploy". 4) .env, node_modules, OS junk, .zip backups. 5) Small commits = bisectable history + saved work.

## Homework

Break your project deliberately once tonight — S10 autopsies the corpse professionally.
