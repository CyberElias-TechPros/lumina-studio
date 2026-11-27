# AI content plan — 90 topics, September 2026

Nine clusters, ten writable topics each, every one chosen against something
measured rather than against what sounds impressive.

**Read this first:** no search volume appears anywhere in this document. Google
Trends was unreachable when it was compiled, and an invented volume is worse than
no volume because it gets planned against. Where a number appears it is a dated,
attributable fact from a named source — a pricing tier, a growth rate from a
hiring survey, a discontinuation date. Those are checkable. "10K searches/month"
would not be.

---

## The findings that changed the plan

Three facts, all dated, that most of the obvious advice gets wrong:

1. **Sora's consumer app was discontinued in April 2026.** Most "best AI video
   tools" articles still recommend it. Writing a Sora tutorial today would produce
   a page that is wrong on arrival — and the whole `code to video` cluster is
   downstream of that.
2. **"Code to video" is not a consumer tool category.** It means programmatic
   video: Remotion, ngram, CoAnimator — rendering video from React, markdown or a
   repo. That is a developer workflow, and it is the one framing the Nigerian
   "make money with AI" content never covers. It is also the framing that fits
   this site, because the 542-lesson AI library is where those readers already are.
3. **Free-tier numbers are the actual product.** Zapier free is **100 tasks/month
   across 5 Zaps**; Make free is **1,000 operations/month**; n8n Community is
   **unlimited if self-hosted, on a $6–20/month VPS**. That single comparison is
   more useful to a small business than any "Top 10 AI tools" list, and almost
   nobody leads with it.

Also load-bearing, from hiring data (Dice 2026, ~7M US postings): **agentic AI
+587%**, **AI agents +503%**, **vector databases +353%**, **RAG +275%**,
**prompt engineering +253%** year over year. AI skills required in **75% of tech
postings** in June 2026, up from 15% in January 2024.

---

## 1. AI fundamentals — `ai-fundamentals`

For the person who has used ChatGPT twice and does not know what a model is.
Highest volume, highest competition, and the place where being *plain* wins.

| # | Topic | Why this one |
| --- | --- | --- |
| 1 | What an AI model actually is, in one analogy | Every explainer starts at "neural network". This one starts at the thing the reader has held. |
| 2 | AI, machine learning and deep learning — the nesting doll | The three words are used interchangeably in Nigerian tech content; the confusion is universal and cheap to fix. |
| 3 | What a token is, and why your AI bill is measured in them | No beginner explainer covers cost. This is the one that makes the next ten articles make sense. |
| 4 | Why AI makes things up (hallucination without mysticism) | The single most-searched AI failure, and most answers over-explain. |
| 5 | The difference between an AI model, an app, and an agent | Directly pre-empts the agent cluster. |
| 6 | What "training data" means, and what yours is being used for | Privacy angle, and it is a real question people have about free tools. |
| 7 | Open models vs closed models — what actually changes for you | Connects to the free-tools cluster: many "free" tools are open models hosted. |
| 8 | What a context window is, and why the AI forgets | Explains the most common daily frustration. |
| 9 | How to tell a good AI answer from a confident bad one | The skill nobody teaches and everybody needs. |
| 10 | What AI cannot do, stated plainly | Counterweight to the hype, and the page that earns trust. |

**Reject:** "What is artificial intelligence?" as a standalone — unwinnable
against Wikipedia and every textbook, and adds nothing to #1.

---

## 2. Models — `ai-models`

Not a model comparison table. That dates in six weeks. These are the questions
that survive a model release.

| # | Topic | Why this one |
| --- | --- | --- |
| 1 | Why there are so many models, and why that is normal | Frames the category before naming any of them. |
| 2 | Choosing a model by task, not by reputation | The decision framework. Beats every "best model 2026" list within a month. |
| 3 | What "reasoning model" means and when it is a waste of money | Reasoning modes cost more and are slower; most tasks do not need them. |
| 4 | Small models on your own laptop — what is actually possible | Local models run offline; matters where data is metered. |
| 5 | Multimodal models: what "sees images" means in practice | Connects to the video and content clusters. |
| 6 | How model pricing actually works (tokens, not magic) | The commercial question people ask in month two. |
| 7 | Why the same prompt gives different answers on different days | Temperature, versioning, and why reproducibility is hard. |
| 8 | Fine-tuning vs prompting vs retrieval — pick the cheap one first | Directly sets up the RAG cluster. |
| 9 | What a model card tells you, and what it hides | AI literacy skill LinkedIn names as top priority. |
| 10 | When a model is retired: the migration nobody plans for | Sora's discontinuation is the live example. |

**Reject:** any "GPT-5 vs Gemini vs Claude" head-to-head. It is obsolete by the
time it ranks, and the repo's editorial rules forbid publishing claims that
cannot be kept true.

---

## 3. AI skills — `ai-skills`

Two audiences, deliberately separated: the person who wants to *use* AI at work,
and the person who wants to *build* with it. Mixing them is why most AI career
content serves neither.

| # | Topic | Why this one |
| --- | --- | --- |
| 1 | The AI skills that are actually hired for (and the ones that are not) | Cites the Dice growth figures. The anchor page for the cluster. |
| 2 | AI literacy: the one skill every job now asks for | Named top priority for non-engineers by LinkedIn 2026. |
| 3 | AI workflow design — what replaces "prompt engineering" | Employers now want workflow design, not clever prompts. |
| 4 | Agentic AI: what the +587% actually means for a beginner | The fastest-growing skill in the data, explained without hype. |
| 5 | RAG explained as a filing cabinet, then as an architecture | Bridges non-technical and technical readers in one page. |
| 6 | Data literacy before AI literacy | WEF ranks analytical thinking top; every AI project fails on data readiness. |
| 7 | AI governance and responsible AI — the non-engineering career | A real, growing, non-code path almost nobody in Nigeria writes about. |
| 8 | What a portfolio looks like when the skill is AI | "Show me" beats "certify me" — consistent with the site's jobs article. |
| 9 | Learning AI without a computer science degree | Fits the 542-lesson library and the entry-level audience. |
| 10 | The 90-day plan to become useful with AI at work | Concrete, dated, and ends in an action rather than a reading list. |

**Reject:** "AI will replace X jobs" listicles. No verifiable basis, and they age
into embarrassment.

---

## 4. Free AI tools — `free-ai-tools`

The commercial core. Every entry states the **actual free limit**, because that
is the only thing that separates useful advice from affiliate filler.

| # | Topic | Why this one |
| --- | --- | --- |
| 1 | The free AI tools worth using in Nigeria, by task | Anchor page. Organised by job, not by vendor. |
| 2 | What each free tier actually gives you (a limits table) | The differentiator. Most listicles never state the limit. |
| 3 | Which free tools work on a slow or metered connection | Real constraint in Nigeria; absent from every "best tools" article. |
| 4 | Free AI for students: study, cite, revise | Named by every Nigerian source as the top student use. |
| 5 | Free AI for a small business: flyers, replies, invoices | Matches Canva/Copilot/ChatGPT use cases the sources report. |
| 6 | Free AI that works offline or on your own laptop | Ties to local models; genuinely underserved. |
| 7 | When free stops being enough (and the honest cost of upgrading) | Builds trust; captures the upgrade-intent query. |
| 8 | Free AI image and design tools, ranked by watermark policy | The practical blocker nobody mentions. |
| 9 | How to spot a "free" AI tool that is harvesting your data | Privacy and trust; no competitor covers it. |
| 10 | Free AI tools for job hunting in Nigeria | CVs, cover letters, interview practice — high intent. |

**Reject:** "100+ AI tools" directory pages. They are the exact thin content the
AdSense remediation removed, and they lose to the directories that already exist.

---

## 5. Content creation with AI — `content-ai`

| # | Topic | Why this one |
| --- | --- | --- |
| 1 | An AI content workflow that does not produce slop | The quality question, which is the only durable angle. |
| 2 | Writing with AI without losing your voice | The fear that stops professionals using it. |
| 3 | AI for social media: a week of posts in one sitting | Matches reported small-business use exactly. |
| 4 | AI image generation for flyers that do not look AI-made | The tell is specific and teachable. |
| 5 | AI voiceover and captions for Nigerian creators | CapCut supports 47 languages; local accent handling is the real question. |
| 6 | Repurposing one video into five formats with AI | The highest-leverage creator workflow. |
| 7 | AI for writing that has to be true (reports, proposals) | Where AI fails hardest, and where the money is. |
| 8 | Making a content calendar with AI, then actually keeping it | Anti-abandonment angle; nobody writes it. |
| 9 | Music and audio with AI — what is safe to publish | Rights question; practically unanswered in local content. |
| 10 | How to tell readers you used AI (and when you should not) | Editorial-standards page; reinforces site credibility. |

---

## 6. Code to video — `code-to-video`

The cluster where the amateur framing and the professional framing are furthest
apart. Written for the developer, because that is who can actually use it — and
because the AI library already attracts them.

| # | Topic | Why this one |
| --- | --- | --- |
| 1 | "Code to video" means two different things — here is both | Disambiguation page. Wins the query by being the honest one. |
| 2 | Rendering video from React with Remotion | The actual technique. Free under 3 staff, Lambda-scalable. |
| 3 | Video from markdown or a repo (ngram and the doc-to-video pattern) | Niche, real, and almost unopposed. |
| 4 | Why Sora's shutdown changed the AI video tool list | Dated fact. Captures everyone whose saved guide is now wrong. |
| 5 | Veo, Seedance, Runway: what each is actually for | Capability split rather than a ranking. |
| 6 | Generating video with an agent, and inspecting the output | CoAnimator's inspectable-code approach, explained. |
| 7 | Cutting existing footage with an agent (the Video Use pattern) | Open source, MIT; underserved. |
| 8 | Deterministic vs generative video: when "exact" matters | The concept that separates the two halves of the cluster. |
| 9 | Building a product-demo video that rebuilds on every deploy | The killer use case; ties CI to content. |
| 10 | The real cost of AI video in naira | Every source quotes dollars. Nobody converts. |

**Reject:** "Make a viral video with AI in 5 minutes." Unwinnable, and it attracts
readers who will not act on anything.

---

## 7. AI automation — `ai-automation`

| # | Topic | Why this one |
| --- | --- | --- |
| 1 | AI automation, described without the word "workflow" | Frame before jargon. |
| 2 | The three things worth automating first in a small business | Prioritisation is the missing step in every guide. |
| 3 | Zapier vs Make vs n8n, judged on what free actually gives you | 100 tasks vs 1,000 ops vs unlimited self-hosted. The facts. |
| 4 | Your first automation, end to end, in one sitting | Buildable in an afternoon, on a free tier. |
| 5 | What an AI agent is inside an automation (and what it is not) | The confusion that causes bad purchases. |
| 6 | Automating customer replies without sounding like a robot | The quality question for support. |
| 7 | Automating invoices, receipts and bookkeeping | The highest-value small-business case in Nigeria. |
| 8 | What automation costs after the free tier ends | Real numbers: ~$6–20/mo VPS, $20/mo cloud. |
| 9 | When automation makes things worse (and how to tell) | Honest counterweight; earns the cluster its credibility. |
| 10 | Automating WhatsApp business flows | Where Nigerian commerce actually happens; under-covered. |

---

## 8. AI workflows — `ai-workflows`

The difference from cluster 7: **automation** is a machine doing a task;
**workflow** is a person and a machine dividing one. This cluster is about the
division.

| # | Topic | Why this one |
| --- | --- | --- |
| 1 | Human in the loop: where to put the person | The core design decision, and the one people skip. |
| 2 | A daily AI workflow for a busy non-technical job | Practical, role-specific, repeatable. |
| 3 | Chaining AI steps without building software | Separates prompting from engineering. |
| 4 | Where AI belongs in a research task (and where it must not) | Citation integrity; ties to the cloud/Perplexity findings. |
| 5 | Templates vs prompts vs agents — which to use when | Decision guide that prevents over-engineering. |
| 6 | Reviewing AI output as a job: what to check, in what order | A real, emerging role. |
| 7 | AI in a team of five: who owns the assistant | Governance at small scale; nothing exists on this. |
| 8 | Keeping a record of what the AI did | Audit trail; matters for anyone handling client work. |
| 9 | Designing a workflow that fails safely | The reliability question, and the most useful one. |
| 10 | Measuring whether an AI workflow actually saved time | The accountability gap in every AI pitch. |

---

## 9. Emerging this period — `emerging`

Chosen because the evidence is dated and specific, not because the topic sounds
futuristic. Each has a reason it matters inside the next two quarters.

| # | Topic | Why now |
| --- | --- | --- |
| 1 | Agents that use tools (function calling) in plain language | Agentic AI +587% YoY; every automation product now ships agents. |
| 2 | MCP: the protocol that lets AI tools share a plug | Named in the tooling landscape; still nearly absent from plain-English coverage. |
| 3 | AI security: prompt injection, explained from the attacker's side | Reported as the fastest-growing AI risk term (~13×). No local coverage. |
| 4 | Why AI search changes what a business should publish | AI Mode / AI Overviews shift the click; directly affects this site's own strategy. |
| 5 | Voice agents for customer service, and where they fail | Contact-centre adoption is real; accent handling is the open question. |
| 6 | Running a small model on a laptop: an honest benchmark | Fits the "free" and "offline" clusters; testable, so it stays true. |
| 7 | AI and data protection under the NDPA | Nigeria Data Protection Act applies to AI processing; almost nobody writes it. |
| 8 | The AI skills gap in Nigerian job adverts: what employers actually list | Grounded in local listings rather than global surveys. |
| 9 | Building a chatbot over your own documents (RAG, small scale) | RAG +275%; the buildable version of the skill. |
| 10 | What to do when the AI tool shuts down | Sora is the case study; portability is the lesson. |

---

## Sequencing

Not all ninety at once. The order that compounds:

1. **Clusters 4 and 1 first** (`free-ai-tools`, `ai-fundamentals`). Highest
   intent, widest audience, and they feed every other cluster.
2. **Then 7 and 8** (`ai-automation`, `ai-workflows`). These convert to course
   enquiries because they describe a business outcome.
3. **Then 3, 5 and 9.** Career and creator intent; slower to rank, higher value
   per reader.
4. **6 and 2 last.** Narrow, technical, and only worth writing once the AI
   library has internal links pointing at them.

## What this plan refuses

- **No volume claims.** None of these topics has a number attached, because the
  numbers could not be verified.
- **No tool ranking that expires.** Capabilities are described; "best" is
  avoided wherever a release would falsify it.
- **No page for a phrase with no corpus behind it.** Each of the ninety points
  at something the site already teaches, or something it could genuinely teach.
- **No salary figure without a sample.** Same rule as the cybersecurity article.

## Next revision

Re-check in **February 2027**. Three things to re-verify: whether Sora or any
named tool still exists, whether the free-tier limits quoted here still hold, and
whether Search Console shows any of these clusters earning impressions. The
first two will change. The third is the only one that says whether this plan was
right.
