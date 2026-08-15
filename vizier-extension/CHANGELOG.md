# Changelog

All notable changes to Vizier are documented in this file.

## [0.1.0] - 2026-08-15

### Added

- **Initial release** — Vizier turns a loose app idea into a structured, agent-ready build plan.
- **Smart classification** — AI-powered category detection (SaaS, Mobile, CLI Tool, Browser Extension, Game, Internal Tool) with a keyword-based fallback if no LLM is configured.
- **Repo-aware planning** — scans `package.json`, README, and existing agent-rule files so plans respect your current stack. No source code is read or sent.
- **Category-aware questionnaire** — different, relevant questions per app type (auth, multi-tenancy, offline, push, distribution, monetization, …), plus optional expert-perspective lenses (Developer, Visual/UX, Growth, Marketing, SysAdmin, IT Support, and more).
- **Complete blueprint pipeline** — 6-stage generation: PRD → Architecture → Data Model → API Contract → Tasks → Decisions.
- **API contract design** — concrete REST endpoints (method, path, auth, request/response shapes).
- **Estimates & story points** — every task carries an effort size, engineering hours, and Fibonacci story points.
- **Dependency-aware task graph** — tasks ordered by dependencies with cycle detection, plus auto-generated testing tasks.
- **Structured validation** — all LLM output schema-validated with `zod` and retried with feedback on failure.
- **Context packs** — per-task scoped context instead of the whole PRD dump.
- **Agent-specific export** — `.cursorrules`, `CLAUDE.md`, or `AGENTS.md` generated automatically based on what's installed; machine-readable `plan/plan.json` exported as the source of truth.
- **Multi-model provider support** — Anthropic (Claude), any OpenAI-compatible API, omniroute (OpenAI-compatible gateway with `auto` model switching), and local Ollama (fully on-prem, no API key).
- **Provider resilience & cost control** — optional fallback provider with circuit-breaker failover, 429/`Retry-After` backoff, local response caching, per-stage model selection, a soft monthly token budget, and stable mode (temperature 0).
- **Plan progress monitoring (private, local)** — `Vizier: Check Plan Progress` analyzes the exported plan against the workspace entirely on the machine: done / in-progress / blocked status, git- and test-backed verification, coverage, and a persisted progress trend. A live status-bar chip updates continuously.
- **Versioned plans** — `vizier.autoCommitPlan` commits `plan/` after export (git repos only).
- **Human-in-the-loop gate** — export requires an explicit "I have reviewed this plan" acknowledgement.
- **Real tracker integrations** — push plan tasks to Jira, Linear, GitHub Issues, or a generic webhook (with dry-run preview). Legacy `vizier.planTrackerWebhook` still supported.
- **Provenance** — generated plans are stamped with provider, model, and timestamp.
- **Privacy-first** — first-run privacy notice; API keys stored in VS Code Secret Storage; `vizier.codePrivacyMode` guarantee that source code is never transmitted.
- **Disclaimers everywhere** — every generated plan document and progress report carries an explicit "AI-assisted, verify before use" disclaimer; full disclosure in `DISCLAIMERS.md`.
- **Automated tests** — provider abstraction, questionnaire, DAG validation, export, monitor, tracker, and end-to-end smoke tests (65+ tests).

### Fixed

- Sidebar **"Plan This App"** now starts planning correctly (previously the webview message was unhandled).
- Messages sent while the sidebar is still loading are queued and delivered instead of dropped.
- Provider/model/API-key changes take effect immediately without an extension reload.
- Errors (e.g. missing API key, exceeded token budget) are surfaced with actionable messages instead of a generic failure.
- Blueprint generation now shows live stage progress in the sidebar.
- `vizier.requireReviewBeforeExport` is honored (review gate can be disabled).

## [Unreleased]

### Added

- *(next release notes go here)*
