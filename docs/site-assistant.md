# The site assistant ("the CEA chatbot")

_What it is, what it knows, what it costs, and how to turn it off._

The assistant is the first responder on every marketing page. It answers the
questions the academy repeats every day — fees, duration, what you build,
payment, dates, location, what to bring — and hands the visitor to WhatsApp or
the application form the moment a question goes beyond the published facts.

It is intentionally small and boring:

- **Free to run.** It calls NVIDIA NIM's free tier (`integrate.api.nvidia.com`),
  the same provider already used by the in-app AI routes. No per-message cost.
- **Grounded, not clever.** Everything it may state comes from
  `backend/src/lib/assistant-knowledge.generated.ts`, which is **generated from
  the same course data the website renders** (`src/data/academy/*`, `src/data/site.ts`).
  If a fee changes in the catalogue, regenerate the knowledge file and the bot
  quotes the new price; it cannot invent one.
- **No tools, no database, no accounts.** It cannot read student records, send
  email, or take payments. Payment instructions it gives are the published ones:
  `cea.ng/apply` or transfer to the UBA account on the site.
- **Public, therefore rate-limited.** 30 messages / 10 min per IP, plus a
  global 800 model calls/day budget so a bot attack cannot burn the free tier.

## Where it lives

| Piece                                                                | Path                                               |
| -------------------------------------------------------------------- | -------------------------------------------------- |
| System prompt, guardrails, fallback                                  | `backend/src/lib/assistant.ts`                     |
| Public routes (`GET /v1/assistant/intro`, `POST /v1/assistant/chat`) | `backend/src/routes/assistant.ts`                  |
| Generated facts block                                                | `backend/src/lib/assistant-knowledge.generated.ts` |
| Generator                                                            | `backend/scripts/gen-assistant-knowledge.ts`       |
| Widget UI                                                            | `src/components/assistant/chat-widget.tsx`         |
| Widget API client                                                    | `src/lib/api/assistant.ts`                         |
| Offline/mock replies                                                 | `src/lib/api/mocks/index.ts`                       |
| Question log + admin digest (`GET /v1/assistant/questions`)          | `backend/src/routes/assistant.ts`                  |
| Insights screen (7/30/90 days)                                       | `src/routes/app/assistant-insights.tsx`            |
| Tests (13)                                                           | `backend/test/assistant.test.ts`                   |

The widget is mounted in `src/components/marketing/shell.tsx`, so it appears on
all public pages (home, courses, contact, apply…). It is **not** shown inside
`/app` — logged-in students already have the human channels, and the in-app AI
routes have their own auth and budgets.

## Turn it on or off

The chatbot is controlled by the `assistant.public` feature flag (default
**on**). An admin can flip it live at `/app/admin/config` → _Public site
assistant_; the API returns the fallback answer and the widget hides itself
without a deploy. Keys in the flags KV blob (`assistant.public: false`) win over
the default.

## Keys and secrets

| Environment | Where the NVIDIA key goes                                          |
| ----------- | ------------------------------------------------------------------ |
| Local dev   | `backend/.dev.vars` → `AI_API_KEY=nvapi-…` (git-ignored, mode 600) |
| Production  | `cd backend && npx wrangler secret put AI_API_KEY`                 |

`AI_MODEL` (optional) selects another model from the free allowlist in
`backend/src/lib/ai.ts`; anything not on that allowlist is ignored, so a typo or
a malicious value cannot silently switch the academy to a paid model.

If the key is missing or the provider fails, the assistant answers with a
**factual fallback** — WhatsApp `0905 862 8386`, `help@cea.ng`, `cea.ng/programs`
— so the widget never shows an error.

> Treat the key like a password. If it ever appears in a screenshot, a chat, or a
> commit, rotate it in the NVIDIA console and re-run `wrangler secret put`.

## Optional human check (Turnstile)

The chatbot works with **no** CAPTCHA: the per-IP limit and the daily budget are
the primary protection. If abuse ever shows up in the question log, set
`TURNSTILE_SECRET_KEY` (Worker secret) **and** `VITE_TURNSTILE_SITE_KEY` (build
var) and the widget asks for one human check per conversation — on the first
message only, never mid-chat. Without the secret bound, the backend ignores the
field entirely.

## Learning from what people ask

Every question is logged (question, whether the answer was a real model answer or
the fallback, and which page it came from). `/app/assistant-insights` shows the
last 7/30/90 days: totals, questions asked more than once, and the ones the bot
had to hand to a human. Ten minutes a week there turns repeated questions into
FAQ/page fixes — and the assistant only ever needs its facts regenerated, not
retrained.

## Keeping it truthful

The bot is only as accurate as the generated facts block. Re-run this whenever a
fee, duration, payment term, start date or FAQ changes:

```sh
cd backend
npm run gen:knowledge      # rewrites src/lib/assistant-knowledge.generated.ts
npx vitest run test/assistant.test.ts
```

The test suite fails if the generated block drifts from the catalogue's
published fee (it asserts Web Development still reads ₦60,000), so a price
change that forgets the bot is caught before deploy.

**Never hand-edit the generated file** — it will be overwritten.

## What it will not do

- Quote a discount, deadline, or instalment term that is not in the facts block.
- Claim government/university accreditation, or promise a job.
- Collect card numbers, bank passwords, or ID documents.
- Follow instructions hidden in a visitor's message ("ignore your rules…").
- Continue indefinitely: conversations cap at 8 turns / 4,000 characters, after
  which it directs the visitor to WhatsApp.

## Day-one checklist

1. `cd backend && npx wrangler secret put AI_API_KEY` (paste the key).
2. Deploy the API: `cd backend && npm run deploy`.
3. Open the live site, ask the bot _"How much is web development?"_ — it should
   quote the catalogue price and offer `cea.ng/apply`.
4. If students report wrong answers, check the fee in `src/data/academy/catalog.ts`,
   re-run `npm run gen:knowledge`, redeploy. Do not "fix" the bot's answer in the
   prompt.
