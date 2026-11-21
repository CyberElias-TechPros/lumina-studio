# CEA Lab — 100-Repository Feasibility & Embed Architecture Catalogue

**Date:** 2026-11-21 · **Verified against:** `lumina-studio` (Next.js 15 App Router · React 19 · Tailwind v4 · Vercel SSR/SSG · Cloudflare Workers + D1 + R2) and live GitHub API (`gh api`).

---

## 1. Executive Summary

Your 100-repository shortlist is a strong **research map**, not a shopping cart to install wholesale. Against `lumina-studio`'s actual production architecture:

1. **What fits natively right now (already implemented in this pass):**
   - **CEA Code Studio** (`/tools/code-studio`) — pure React 19 HTML/CSS/JS editor with isolated `<iframe sandbox="allow-scripts">` preview, responsive viewports, console capture, `.html` export, and 6 guided challenges.
   - **CEA CSS Layout Lab** (`/tools/css-layout-lab`) — Flexbox + CSS Grid visual property explorer + 8 progressive CSS puzzles.
   - **CEA DataLab & SQL Sandbox** (`/tools/sql-datalab`) — deterministic client-side SQL engine (`src/lib/labs/mini-sql.ts`) over Nigerian business tables (`customers`, `products`, `orders`, `payments`), Recharts visualization, CSV quality inspector, and 8 SQL challenges.
   - **CEA Spreadsheet & Formula Lab** (`/tools/excel-formula-lab`) — pure TypeScript formula evaluator (`src/lib/labs/mini-spreadsheet.ts`) supporting `SUM`, `AVERAGE`, `COUNT`, `COUNTA`, `MIN`, `MAX`, `ROUND`, `IF`, `SUMIF`, `COUNTIF`, `VLOOKUP` over 6 Nigerian business drills.
   - **CEA Assess Studio** (`/tools/assess`) — universal Study Mode (hints + explanations) & Timed Exam Mode diagnostic across 5 academy tracks.
   - **CEA Open-Source Lab Hub** (`/tools/open-labs`) — searchable registry + opt-in user-triggered sandboxed embeds for `LiveCodes` (MIT) and `Mermaid Live` (MIT).

2. **Why architectural filtering mattered:**
   - **Cloudflare Workers cannot run arbitrary student binaries or Docker containers** (ruling out `Judge0`, `OpenVSCode Server`, `Coder`, `OnlyOffice`, `Collabora`, `Stirling-PDF`, `Dify`, `Apache Superset` inside the current backend).
   - **COOP/COEP header conflicts:** `StackBlitz WebContainer` requires `Cross-Origin-Embedder-Policy: require-corp`, which breaks third-party scripts (AdSense, Paystack, Turnstile) unless isolated on a dedicated subdomain.
   - **Licence & link traps caught by live `gh api` verification (2026-11-21):**
     - `tldraw/tldraw` returns `NOASSERTION` on GitHub because v2+ carries a **custom commercial/watermarked licence** (`tldraw license`), not MIT/Apache.
     - `wesbos/grid-garden` returns **HTTP 404** (the real MIT repo is `thomaspark/gridgarden`).
     - `codemirror/dev` is **`archived: true`** (active modular MIT packages live in `codemirror/view`, `@codemirror/state`, etc.).
     - `langgenius/dify` uses a **Modified Apache-2.0 licence** forbidding multi-tenant SaaS use and logo removal without a commercial agreement.
     - `Stirling-Tools/Stirling-PDF` mixes MIT with proprietary/engine folders and requires Java/Docker.
     - `processing/p5.js` is **LGPL-2.1**, `flukeout/css-diner` and `penpot/penpot` are **MPL-2.0**.

---

## 2. Architecture Matrix: Build vs Adopt vs Opt-In Embed vs Exclude

| Category | Build Natively in CEA | Adopt as Lazy Client Library (npm / WASM) | Safe Opt-In Embed | Link-Only Study Reference | Do Not Self-Host / Exclude |
|---|---|---|---|---|---|
| **1. Code Editors & IDEs** | HTML/CSS/JS Code Studio (`/tools/code-studio`) | `microsoft/monaco-editor` (MIT, dynamic import only), `codemirror/view` (MIT), `xtermjs/xterm.js` (MIT, for future terminal) | `live-codes/livecodes` (MIT — supports Python/Pyodide, TS, React, SQL) | `google/playground-elements` (BSD-3), `berkinduz/try-js` | `judge0/ide` (needs Docker), `stackblitz/webcontainer-core` (COOP/COEP + terms), `eclipse-theia/theia`, `gitpod-io/openvscode-server`, `coder/coder`, `microsoft/vscode` |
| **2. Coding Education** | Challenge progression inside `/tools/*` & `/practice/computer-basics` | `RaspberryPiFoundation/blockly` (Apache-2.0 — great for Schools programme) | — | `freeCodeCamp` (BSD-3), `exercism`, `blockly-games`, `code-dot-org` | Full LMS clones (`SkillVerse`, `Coding-Hustlers`) — redundant with CEA-OS |
| **3. HTML/CSS & Frontend** | CSS Layout Lab (`/tools/css-layout-lab`) | `codesandbox/sandpack` (Apache-2.0), `FormidableLabs/react-live` (MIT) | `live-codes/livecodes` (MIT) | `thomaspark/flexboxfroggy` (MIT), `thomaspark/gridgarden` (MIT), `flukeout/css-diner` (MPL-2.0), `cssbattle` | `scrimba` (proprietary platform) |
| **4. Quizzes & Assessments** | CEA Assess (`/tools/assess`) + `LessonQuiz` (`/ai-engineering`) | `wingkwong/react-quiz-component` (MIT — pattern reference) | — | `h5p` (MIT/GPL mix), `moodle/moodle` (GPL-3.0) | `moodle`, `edx-platform`, `sakai`, `tao` (full LMS servers redundant with CEA-OS) |
| **5. Visualizers & Simulators** | Prompt Lab & Gradient Descent (`/ai-engineering`) | `mermaid-js/mermaid` (MIT), `d3/d3` (ISC), `cytoscape/cytoscape.js` (MIT), `liabru/matter-js` (MIT), `mrdoob/three.js` (MIT) | `mermaid-js/mermaid` (`mermaid.live`) | `algorithm-visualizer` (MIT), `visualgo`, `processing/p5.js` (LGPL-2.1) | Heavy standalone visualizer servers |
| **6. SQL & Data Analytics** | CEA DataLab (`/tools/sql-datalab`) + Spreadsheet Lab (`/tools/excel-formula-lab`) | `sql-js/sql.js` (MIT), `electric-sql/pglite` (Apache-2.0), `duckdb/duckdb-wasm` (MIT), `apache/echarts` (Apache-2.0), `mholt/PapaParse` (MIT), `recharts` (already installed) | — | `observablehq/plot`, `chartjs/Chart.js` (MIT) | `apache/superset`, `metabase` (heavy BI servers) |
| **7. Graphic Design & UI** | Colour Contrast & Palettes (`/tools/color-contrast`) | `fabricjs/fabric.js` (MIT), `konvajs/konva` (MIT), `excalidraw/excalidraw` (MIT, check React 19 peer deps), `meta/lexical` (MIT) | Excalidraw external launch | `penpot/penpot` (MPL-2.0), `GrapesJS` (BSD-3), `gimp`, `inkscape` | `tldraw/tldraw` (commercial watermark licence), `Photopea` (closed source) |
| **8. Office & Productivity** | Word Counter (`/tools/word-counter`), Spreadsheet Lab (`/tools/excel-formula-lab`) | `xyflow/xyflow` (MIT — React Flow for NetLab/workflows), `jgraph/drawio` (Apache-2.0) | `mermaid.live` | `fullcalendar` (MIT core) | `ONLYOFFICE`, `Collabora Online`, `Stirling-PDF`, `AppFlowy`, `AFFiNE`, `Paperless-ngx` (heavy server stacks) |
| **9. AI & AI Tutors** | `PromptLab` + CEA-OS Worker AI route | `promptfoo/promptfoo` (MIT — internal CI prompt eval only) | — | `langflow`, `Flowise`, `ollama`, `open-webui`, `lobe-chat` | `langgenius/dify` (Modified Apache-2.0 multi-tenant restriction), `RAGFlow`, `AnythingLLM` (heavy Python/vector backends) |

---

## 3. Recommended Next Build Waves (When Needed)

1. **Wave 1 (Done today):** Unified Registry (`src/data/cea-lab-registry.ts`), Code Studio, CSS Layout Lab, SQL DataLab, Spreadsheet Formula Lab, Assess Studio, and Open-Source Lab Hub (`/tools/open-labs`).
2. **Wave 2 (Zero-backend WASM upgrades — lazy loaded only inside the lab route):**
   - Upgrade `/tools/sql-datalab` with optional lazy-loaded `sql.js` (MIT) or `duckdb-wasm` (MIT) for multi-table DDL (`CREATE TABLE`, window functions) once cohort demand justifies the ~1–3 MB WASM payload.
   - Build **CEA Flyer & Certificate Studio** using `fabricjs/fabric.js` (MIT) — avoids React 19 reconciler issues (`konva` / `react-konva` sometimes lag React major versions, whereas vanilla `fabric.js` mounts cleanly onto a `<canvas ref={...}>`).
   - Build **CEA NetLab & Flowchart Studio** using `xyflow/xyflow` (React Flow, MIT) + `mermaid` (MIT).
3. **Wave 3 (Authenticated CEA-OS `/app/learn` integration):**
   - Save challenge completions and diagnostic scores from `CEA Assess` and `Code Studio` into D1 via `/v1` routes (`backend/src/lib/rbac.ts`), while keeping `/tools/*` public and sign-up-free.

---

## 4. Mandatory Rules Before Installing Any New npm Package

Per `docs/dependency-build-contract.md`:
- Root `package-lock.json` and `bun.lock` must stay in exact lockstep (`npm run deps:sync-bun && npm run deps:check`).
- Never bundle heavy libraries (>200 KB) into shared layout chunks; always isolate behind `"use client"` + `next/dynamic(..., { ssr: false })` on the specific lab route so public SEO/landing LCP stays untouched.
- Never allow arbitrary user-submitted code to execute on Cloudflare Workers or `www.cea.ng` main origin.
