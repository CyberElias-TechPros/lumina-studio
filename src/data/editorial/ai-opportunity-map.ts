/**
 * The AI content opportunity map, as data.
 *
 * Source: the "AI Content Opportunity Map — Late 2026" supplied by the site
 * owner — 16 lanes, 10 topics each, plus a top-10 priority list. Transcribed
 * rather than summarised, because the value is in the specificity of each brief
 * ("cost per finished 15-second clip", "the citation stress test") and a summary
 * would lose exactly the part that makes them writable.
 *
 * ## Why this is typed data and not a markdown document
 *
 * A markdown plan cannot enforce anything. This can, and does: the tests beside
 * it refuse a topic that names a tool without a date, refuse a lane that is not
 * fed by a surface the site already has, and refuse the phrase "best AI" in a
 * title, because the map's own editorial rule and this repo's rule agree that a
 * universal winner claim cannot be kept true.
 *
 * ## The date-sensitivity rule, which is the important one
 *
 * Every tool name, price, quota, free tier and beta status in these topics is
 * perishable. The document says so explicitly, and it is not a formality: Sora's
 * consumer app was discontinued in April 2026 and most "best AI video" guides
 * still recommend it. So each topic carries `checksTools`, and the publishing
 * workflow requires re-verifying those named tools on the day of writing.
 */
export type MapTopic = {
  /** Stable slug, used in the backlog and in tests. */
  id: string;
  title: string;
  /** The brief, kept verbatim from the source map. */
  brief: string;
  /** True when the topic names a specific product whose terms may have changed. */
  checksTools: boolean;
};

export type MapLane = {
  id: string;
  label: string;
  /** Whether this lane came from the requested set or was added as adjacent. */
  kind: "requested" | "adjacent";
  /** The existing CEA surface that feeds this lane. */
  feedsFrom: string;
  /** Publishing order: 1 is highest intent and broadest audience. */
  wave: 1 | 2 | 3 | 4;
  topics: readonly MapTopic[];
};

/** Tools whose availability, pricing or existence must be re-checked before writing. */
export const PERISHABLE_TOOLS = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Perplexity",
  "NotebookLM",
  "Gemini Notebook",
  "Copilot",
  "Canva",
  "n8n",
  "Zapier",
  "Make",
  "Activepieces",
  "Windmill",
  "OpenRouter",
  "LiteLLM",
  "Ollama",
  "Qwen",
  "LangGraph",
  "LangChain",
  "CrewAI",
  "MCP",
  "A2A",
  "WebMCP",
  "Remotion",
  "Veo",
  "Kling",
  "Runway",
  "Luma",
  "Pika",
  "Sora",
  "Seedance",
  "CoAnimator",
  "ComfyUI",
  "Lyria",
  "SynthID",
  "C2PA",
  "Firefly",
  "Adobe",
  "Claude Code",
  "Codex",
  "Antigravity",
  "Gemini CLI",
  "Google Flow",
  "Audio Overviews",
  "Deep Research",
  "AI Studio",
  "Docker",
  "GitHub",
] as const;

export function mentionsPerishableTool(text: string): boolean {
  return PERISHABLE_TOOLS.some((tool) =>
    new RegExp(`\\b${tool.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(text),
  );
}

/** The ten the source map ranks above the rest, in its own order. */
export const MAP_PRIORITY: readonly string[] = [
  "AI Workflow Reliability Clinic",
  "The 2026 Free AI Tier Stress Test",
  "Deep Research Face-Off",
  "MCP vs A2A by Building Both",
  "RAG Without the Hype",
  "The $0 YouTube Short",
  "Free AI Automation Stack 2026",
  "One Brief, Five Video Models",
  "The Citation Stress Test",
  "AI Agent Permission Audit",
];

export const OPPORTUNITY_MAP: readonly MapLane[] = [
  {
    id: "ai-fundamentals-and-concepts",
    label: "AI fundamentals and concepts",
    kind: "requested",
    feedsFrom: "/ai-engineering",
    wave: 1,
    topics: [
      {
        id: "rag-without-the-hype-build-citation-grounded",
        title: "RAG Without the Hype: Build Citation-Grounded Document Q&A",
        brief:
          "Explain chunking, embeddings, vector search, reranking, citations, unanswerable questions, and separate retrieval from answer evaluation.",
        checksTools: false,
      },
      {
        id: "agentic-rag-step-by-step",
        title: "Agentic RAG, Step by Step",
        brief:
          "Visualize query routing, rewriting, retrieval grading, retries, refusal, and compounding failure in a bounded state machine.",
        checksTools: false,
      },
      {
        id: "thinking-models-explained-with-a-budget-expe",
        title: "Thinking Models Explained With a Budget Experiment",
        brief:
          "Compare test-time compute, verifiers, best-of-N, latency, cost, accuracy, and reasoning-trace oversight without exposing private chain-of-thought.",
        checksTools: false,
      },
      {
        id: "ai-agents-are-not-magic",
        title: "AI Agents Are Not Magic",
        brief:
          "Build a tool-calling agent with permissions, schemas, logs, approval, human handoff, and a kill switch.",
        checksTools: false,
      },
      {
        id: "the-free-local-ai-stack",
        title: "The Free Local AI Stack",
        brief:
          "Run a private model, embeddings, and document search on ordinary hardware; disclose quantization and machine-specific limits.",
        checksTools: false,
      },
      {
        id: "multimodal-ai-fundamentals",
        title: "Multimodal AI Fundamentals",
        brief:
          "Move from OCR and layout parsing to grounded chart, scan, slide, and image retrieval with evidence pointers.",
        checksTools: false,
      },
      {
        id: "notebooklm-as-a-source-grounded-learning-sys",
        title: "NotebookLM as a Source-Grounded Learning System",
        brief:
          "Turn papers, webpages, videos, and Drive files into verified study packs, quizzes, audio, mind maps, and reports.",
        checksTools: true,
      },
      {
        id: "prompting-is-a-systems-skill",
        title: "Prompting Is a Systems Skill",
        brief:
          "Teach task specifications, context selection, schemas, constraints, tools, versioning, and regression tests rather than magic phrases.",
        checksTools: false,
      },
      {
        id: "ai-evaluation-for-normal-people",
        title: "AI Evaluation for Normal People",
        brief:
          "Build a 30-example test set covering factuality, refusal, groundedness, cost, latency, and tool traces.",
        checksTools: false,
      },
      {
        id: "context-windows-memory-and-rag",
        title: "Context Windows, Memory, and RAG",
        brief:
          "Compare pasted context, persistent memory, vector retrieval, summarization, and fine-tuning using one corpus and a decision matrix.",
        checksTools: false,
      },
    ],
  },
  {
    id: "ai-models-and-model-selection",
    label: "AI models and model selection",
    kind: "requested",
    feedsFrom: "/ai-engineering/lessons",
    wave: 4,
    topics: [
      {
        id: "stop-asking-for-the-best-ai",
        title: "Stop Asking for the Best AI",
        brief:
          "Build a task-to-model matrix for reasoning, coding, documents, multimodality, integrations, privacy, and budget.",
        checksTools: false,
      },
      {
        id: "quality-per-dollar-not-benchmark-scores",
        title: "Quality per Dollar, Not Benchmark Scores",
        brief:
          "Measure tokens, caching, retries, latency, and cost per successful answer across premium and fast models.",
        checksTools: false,
      },
      {
        id: "1m-context-is-not-a-free-pass",
        title: "1M Context Is Not a Free Pass",
        brief:
          "Test long-document recall, citations, omissions, compaction, latency, and cost against smaller-context workflows.",
        checksTools: false,
      },
      {
        id: "reasoning-effort-speed-and-spend",
        title: "Reasoning Effort, Speed, and Spend",
        brief: "Compare low, medium, and high effort and define a fast-first escalation policy.",
        checksTools: false,
      },
      {
        id: "openrouter-vs-litellm",
        title: "OpenRouter vs LiteLLM",
        brief:
          "Build provider-neutral routing, retries, failover, observability, and safeguards against silent substitution.",
        checksTools: true,
      },
      {
        id: "pick-the-right-quantized-model-for-your-lapt",
        title: "Pick the Right Quantized Model for Your Laptop",
        brief:
          "Benchmark RAM, VRAM, quantization, license, speed, context, and tool calling on actual hardware.",
        checksTools: false,
      },
      {
        id: "can-a-small-local-model-beat-a-flagship",
        title: "Can a Small Local Model Beat a Flagship?",
        brief:
          "Use hidden tests, rubric review, repair attempts, and time-to-result for a fair coding comparison.",
        checksTools: false,
      },
      {
        id: "multimodal-model-selection",
        title: "Multimodal Model Selection",
        brief:
          "Score PDFs, screenshots, charts, audio, video, citations, privacy, upload limits, and action-taking on one test set.",
        checksTools: false,
      },
      {
        id: "open-weight-or-hosted-api",
        title: "Open-Weight or Hosted API?",
        brief:
          "Compare license, residency, weights, hardware, monitoring, updates, fine-tuning, and total cost by scenario.",
        checksTools: false,
      },
      {
        id: "make-your-own-mini-leaderboard",
        title: "Make Your Own Mini Leaderboard",
        brief:
          "Create representative tasks, blind-score outputs, rerun after updates, and route only validated work.",
        checksTools: true,
      },
    ],
  },
  {
    id: "practical-ai-skills",
    label: "Practical AI skills",
    kind: "requested",
    feedsFrom: "/classes#core-office-data",
    wave: 2,
    topics: [
      {
        id: "a-real-task-chatgpt-vs-claude-vs-gemini-rout",
        title: "A Real-Task ChatGPT vs Claude vs Gemini Routing Test",
        brief:
          "Compare long documents, research, spreadsheets, coding, files, privacy, speed, and cost.",
        checksTools: true,
      },
      {
        id: "build-your-first-useful-ai-agent",
        title: "Build Your First Useful AI Agent",
        brief:
          "Turn one messy workflow into a bounded agent with tools, exit conditions, and human approval.",
        checksTools: false,
      },
      {
        id: "email-to-spreadsheet-automation-with-safety-",
        title: "Email-to-Spreadsheet Automation With Safety Checks",
        brief:
          "Extract variable fields, validate, deduplicate, log, and route uncertain records to review.",
        checksTools: false,
      },
      {
        id: "make-ai-read-your-folder-without-making-thin",
        title: "Make AI Read Your Folder Without Making Things Up",
        brief:
          "Compare prompting and retrieval with citations, freshness, permissions, and adversarial questions.",
        checksTools: true,
      },
      {
        id: "the-ai-output-quality-lab",
        title: "The AI Output Quality Lab",
        brief:
          "Run blind spreadsheet evaluations for factuality, completeness, tone, citations, and policy compliance.",
        checksTools: false,
      },
      {
        id: "turn-policies-and-sops-into-reliable-ai-inst",
        title: "Turn Policies and SOPs into Reliable AI Instructions",
        brief:
          "Convert procedures into numbered actions, branches, schemas, edge cases, and escalation rules.",
        checksTools: false,
      },
      {
        id: "private-ai-on-a-laptop",
        title: "Private AI on a Laptop",
        brief:
          "Compare local and hosted models while teaching data boundaries, poisoned files, and insecure extensions.",
        checksTools: false,
      },
      {
        id: "ai-coding-for-non-programmers",
        title: "AI Coding for Non-Programmers",
        brief:
          "Move from plain-English specification to a tested app with review checkpoints, Git, secrets hygiene, and recovery.",
        checksTools: false,
      },
      {
        id: "turn-a-messy-csv-into-a-decision-memo",
        title: "Turn a Messy CSV into a Decision Memo",
        brief:
          "Profile, clean, chart, and summarize data while independently checking totals, definitions, and outliers.",
        checksTools: false,
      },
      {
        id: "one-research-interview-five-assets",
        title: "One Research Interview, Five Assets",
        brief:
          "Transcribe, fact-check, draft, caption, and repurpose while preserving quotes, consent, and provenance.",
        checksTools: false,
      },
    ],
  },
  {
    id: "ai-tools-and-tool-stacks",
    label: "AI tools and tool stacks",
    kind: "requested",
    feedsFrom: "/tools",
    wave: 3,
    topics: [
      {
        id: "the-0-to-30-ai-stack",
        title: "The $0-to-$30 AI Stack",
        brief:
          "Compare free tiers and low-cost tools by limits, privacy, exports, speed, and actual workflow value.",
        checksTools: false,
      },
      {
        id: "build-a-reliable-email-to-task-agent",
        title: "Build a Reliable Email-to-Task Agent",
        brief:
          "Classify mail, extract deadlines, create tasks, and escalate ambiguity with approval and logs.",
        checksTools: false,
      },
      {
        id: "local-ai-agent-on-an-ordinary-laptop",
        title: "Local AI Agent on an Ordinary Laptop",
        brief:
          "Benchmark Ollama, Qwen, LangGraph, hardware, quantization, privacy, and a hosted baseline.",
        checksTools: true,
      },
      {
        id: "one-agent-vs-three",
        title: "One Agent vs Three",
        brief:
          "Compare specialized parallel agents on time, cost, duplicate work, coordination errors, and review burden.",
        checksTools: false,
      },
      {
        id: "ai-coding-agents-in-the-terminal",
        title: "AI Coding Agents in the Terminal",
        brief:
          "Test Claude Code, Codex, Antigravity, local tools, permissions, rollback, and repository context.",
        checksTools: true,
      },
      {
        id: "mcp-and-webmcp-for-beginners",
        title: "MCP and WebMCP for Beginners",
        brief:
          "Connect read-only tools safely; contrast conventional MCP with proposed WebMCP and audit malicious outputs.",
        checksTools: true,
      },
      {
        id: "one-brief-to-finished-video",
        title: "One Brief to Finished Video",
        brief:
          "Compare an integrated creative-agent stack with best-of-breed tools, rights checks, consistency, and disclosure.",
        checksTools: false,
      },
      {
        id: "from-research-tabs-to-a-cited-newsletter",
        title: "From Research Tabs to a Cited Newsletter",
        brief:
          "Collect sources, store claims, draft, and flag unsupported statements with a human review ledger.",
        checksTools: false,
      },
      {
        id: "route-every-task-to-the-right-model",
        title: "Route Every Task to the Right Model",
        brief:
          "Send easy work to cheap models, difficult work to strong models, and sensitive work locally.",
        checksTools: false,
      },
      {
        id: "ai-workflow-reliability-clinic",
        title: "AI Workflow Reliability Clinic",
        brief:
          "Add evals, schemas, retries, timeouts, approval, observability, and rollback to a fragile demo.",
        checksTools: false,
      },
    ],
  },
  {
    id: "free-ai-tools-and-free-tiers",
    label: "Free AI tools and free tiers",
    kind: "requested",
    feedsFrom: "/tools",
    wave: 1,
    topics: [
      {
        id: "the-2026-free-ai-tier-stress-test",
        title: "The 2026 Free AI Tier Stress Test",
        brief:
          "Run identical jobs across ChatGPT, Claude, Gemini, and Perplexity and expose limits and paywalls.",
        checksTools: true,
      },
      {
        id: "gemini-notebook-as-a-free-research-desk",
        title: "Gemini Notebook as a Free Research Desk",
        brief:
          "Use PDFs, Drive, webpages, and YouTube with citations, artifacts, and a quota audit.",
        checksTools: true,
      },
      {
        id: "build-a-tiny-ai-app-without-a-bill",
        title: "Build a Tiny AI App Without a Bill",
        brief:
          "Use AI Studio while teaching RPM, TPM, RPD, retries, caching, and hard usage budgets.",
        checksTools: false,
      },
      {
        id: "free-ai-coding-in-the-terminal",
        title: "Free AI Coding in the Terminal",
        brief:
          "Compare Gemini CLI, Antigravity preview, editor assistants, quotas, permissions, and rollback.",
        checksTools: true,
      },
      {
        id: "self-hosted-n8n-vs-hosted-pricing",
        title: "Self-Hosted n8n vs Hosted Pricing",
        brief:
          "Build an agent and show the real costs of server, maintenance, model use, and paid hosted plans.",
        checksTools: true,
      },
      {
        id: "a-free-speech-to-text-to-voice-pipeline",
        title: "A Free Speech-to-Text-to-Voice Pipeline",
        brief: "Track characters, minutes, quotas, pronunciation, consent, and local fallbacks.",
        checksTools: false,
      },
      {
        id: "free-vision-apis-for-real-work",
        title: "Free Vision APIs for Real Work",
        brief:
          "Extract invoice fields, validate against images, redact, and calculate free monthly units.",
        checksTools: false,
      },
      {
        id: "free-image-and-video-creation-without-chasin",
        title: "Free Image and Video Creation Without Chasing Credits",
        brief: "Compare watermarks, exports, rights, credits, and trial-only access by task.",
        checksTools: false,
      },
      {
        id: "the-privacy-preserving-free-ai-stack",
        title: "The Privacy-Preserving Free AI Stack",
        brief:
          "Classify data, redact, compare cloud controls with local inference, and revoke keys.",
        checksTools: false,
      },
      {
        id: "the-free-student-job-seeker-ai-workflow",
        title: "The Free Student/Job-Seeker AI Workflow",
        brief:
          "Combine research, study, coding, accessibility, and applications with a quota ledger.",
        checksTools: false,
      },
    ],
  },
  {
    id: "ai-content-creation-tools-especially-free-on",
    label: "AI content-creation tools, especially free ones",
    kind: "requested",
    feedsFrom: "/classes#core-creative-media",
    wave: 2,
    topics: [
      {
        id: "the-0-youtube-short",
        title: "The $0 YouTube Short",
        brief:
          "Build a useful short from idea to script, visuals, captions, voice, edit, export, and disclosure.",
        checksTools: false,
      },
      {
        id: "one-webinar-ten-assets",
        title: "One Webinar, Ten Assets",
        brief:
          "Repurpose one recording into shorts, newsletter, captions, and posts with free-tier accounting.",
        checksTools: false,
      },
      {
        id: "free-ai-video-generators-tested-fairly",
        title: "Free AI Video Generators Tested Fairly",
        brief:
          "Score prompt adherence, motion, consistency, audio, export, watermarks, and commercial terms.",
        checksTools: false,
      },
      {
        id: "make-ai-voiceover-sound-human",
        title: "Make AI Voiceover Sound Human",
        brief:
          "Compare narration tools while teaching pronunciation, pacing, captions, consent, and cloning boundaries.",
        checksTools: true,
      },
      {
        id: "ai-thumbnail-and-title-testing",
        title: "AI Thumbnail and Title Testing",
        brief:
          "Generate variants, test packaging, and interpret click-through alongside retention.",
        checksTools: false,
      },
      {
        id: "commercially-safer-ai-images-and-b-roll",
        title: "Commercially Safer AI Images and B-Roll",
        brief:
          "Explain training provenance, commercial rights, attribution, content credentials, and model terms.",
        checksTools: false,
      },
      {
        id: "local-no-subscription-ai-video-editing",
        title: "Local, No-Subscription AI Video Editing",
        brief: "Compare local transcription/editing with cloud credits on specified hardware.",
        checksTools: false,
      },
      {
        id: "prompt-to-storyboard-for-educational-videos",
        title: "Prompt-to-Storyboard for Educational Videos",
        brief:
          "Keep facts, style, characters, and visual continuity consistent across generated shots.",
        checksTools: false,
      },
      {
        id: "free-ai-captions-and-dubbing-that-preserve-m",
        title: "Free AI Captions and Dubbing That Preserve Meaning",
        brief:
          "Audit transcription, timing, translation, speaker labels, reading speed, and human QA.",
        checksTools: false,
      },
      {
        id: "avoiding-ai-slop",
        title: "Avoiding AI Slop",
        brief:
          "Add source verification, originality, disclosure, consent, rights checks, and human editing.",
        checksTools: false,
      },
    ],
  },
  {
    id: "code-to-video-and-ai-video-creation",
    label: "Code-to-video and AI video creation",
    kind: "requested",
    feedsFrom: "/ai-engineering/lessons",
    wave: 4,
    topics: [
      {
        id: "one-brief-five-models",
        title: "One Brief, Five Models",
        brief:
          "Blind-test Veo, Kling, Runway, Luma, and Pika on accepted seconds, continuity, text, audio, latency, and cost.",
        checksTools: true,
      },
      {
        id: "the-cheapest-viable-ai-video-pipeline",
        title: "The Cheapest Viable AI Video Pipeline",
        brief:
          "Draft cheaply, reject weak shots, finish winners, and report cost per finished 30 seconds.",
        checksTools: false,
      },
      {
        id: "prompting-for-audio-first-video",
        title: "Prompting for Audio-First Video",
        brief: "Test native dialogue, ambience, silence, and separately edited voiceover.",
        checksTools: false,
      },
      {
        id: "ai-video-agents-versus-clip-generators",
        title: "AI Video Agents versus Clip Generators",
        brief:
          "Rebuild one ad with a structured agent and modular stack; compare editability and brand control.",
        checksTools: false,
      },
      {
        id: "plain-english-to-motion-graphics",
        title: "Plain English to Motion Graphics",
        brief: "Use coding agents and Remotion to create reproducible, versioned promos.",
        checksTools: true,
      },
      {
        id: "audio-reactive-remotion",
        title: "Audio-Reactive Remotion",
        brief:
          "Drive motion from waveform/FFT data and make many branded variants without hand animation.",
        checksTools: true,
      },
      {
        id: "character-and-product-continuity-under-stres",
        title: "Character and Product Continuity Under Stress",
        brief: "Test reference images, extensions, identity drift, wardrobe, logos, and stitching.",
        checksTools: false,
      },
      {
        id: "readable-text-in-ai-video",
        title: "Readable Text in AI Video",
        brief:
          "Show why generated labels fail and repair them with deterministic overlays, SVG, tracking, or compositing.",
        checksTools: false,
      },
      {
        id: "build-a-video-generation-api-queue",
        title: "Build a Video Generation API Queue",
        brief:
          "Submit jobs, poll, retry, deduplicate, cache, log cost, and assemble accepted clips.",
        checksTools: false,
      },
      {
        id: "migrate-a-sora-prototype",
        title: "Migrate a Sora Prototype",
        brief:
          "Abstract providers, normalize schemas, and regression-test a move to supported video models.",
        checksTools: true,
      },
    ],
  },
  {
    id: "ai-automation-setup-for-beginners-and-teams",
    label: "AI automation setup for beginners and teams",
    kind: "requested",
    feedsFrom: "/classes#core-office-data",
    wave: 1,
    topics: [
      {
        id: "google-form-to-triage-sheet-and-slack",
        title: "Google Form to Triage, Sheet, and Slack",
        brief:
          "Build a form-triggered workflow with extraction, routing, test data, failure paths, and approval.",
        checksTools: false,
      },
      {
        id: "n8n-vs-zapier-vs-make",
        title: "n8n vs Zapier vs Make",
        brief:
          "Run one workflow across platforms and compare limits, branching, debugging, credentials, and maintenance.",
        checksTools: true,
      },
      {
        id: "natural-language-to-safe-n8n-workflow",
        title: "Natural Language to Safe n8n Workflow",
        brief:
          "Generate, inspect, mock, debug, and review nodes and credentials before activation.",
        checksTools: true,
      },
      {
        id: "mcp-for-normal-people",
        title: "MCP for Normal People",
        brief:
          "Connect Claude to a read-only GitHub or PostgreSQL tool with scope, OAuth, and revocation.",
        checksTools: true,
      },
      {
        id: "ai-automation-cost-control",
        title: "AI Automation Cost Control",
        brief: "Budget tokens, tasks, credits, retries, searches, and review time with alerts.",
        checksTools: false,
      },
      {
        id: "human-in-the-loop-by-design",
        title: "Human-in-the-Loop by Design",
        brief: "Draft, approve, log, deduplicate, and roll back before consequential actions.",
        checksTools: false,
      },
      {
        id: "from-personal-zap-to-team-system",
        title: "From Personal Zap to Team System",
        brief:
          "Version, share, document, separate environments, back up, and review workflow changes.",
        checksTools: false,
      },
      {
        id: "inbox-to-action-pipeline",
        title: "Inbox-to-Action Pipeline",
        brief: "Classify, extract, deduplicate, escalate, and preserve an audit trail.",
        checksTools: false,
      },
      {
        id: "internal-docs-answering-without-a-full-app",
        title: "Internal-Docs Answering Without a Full App",
        brief:
          "Use citations, freshness checks, permissions, and human escalation for a low-cost knowledge workflow.",
        checksTools: false,
      },
      {
        id: "the-no-code-to-code-escape-hatch",
        title: "The No-Code-to-Code Escape Hatch",
        brief:
          "Progress from visual nodes to one API call, JSON validation, JavaScript, pagination, and error handling.",
        checksTools: false,
      },
    ],
  },
  {
    id: "ai-workflows-and-repeatable-operating-system",
    label: "AI workflows and repeatable operating systems",
    kind: "requested",
    feedsFrom: "/classes#core-office-data",
    wave: 2,
    topics: [
      {
        id: "build-a-personal-ai-chief-of-staff",
        title: "Build a Personal AI Chief of Staff",
        brief:
          "Turn selected email, calendar, and Slack inputs into a prioritized, source-linked queue with drafts only.",
        checksTools: false,
      },
      {
        id: "mcp-for-calendar-notion-and-workflows",
        title: "MCP for Calendar, Notion, and Workflows",
        brief:
          "Explain client/server/tools and compare hosted connectors with a local server and least privilege.",
        checksTools: true,
      },
      {
        id: "prompt-to-workflow-with-claude-and-n8n-mcp",
        title: "Prompt-to-Workflow with Claude and n8n MCP",
        brief: "Generate, inspect, fake-test, debug, and productionize a multi-app workflow.",
        checksTools: true,
      },
      {
        id: "the-low-cost-ai-automation-stack",
        title: "The Low-Cost AI Automation Stack",
        brief:
          "Compare self-hosted n8n, Make, and Zapier on total cost, maintenance, retries, and portability.",
        checksTools: true,
      },
      {
        id: "model-routing-for-real-work",
        title: "Model Routing for Real Work",
        brief:
          "Route triage to cheap models and exceptions to strong models using measurable tests.",
        checksTools: false,
      },
      {
        id: "make-agent-workflows-reliable",
        title: "Make Agent Workflows Reliable",
        brief:
          "Add evals, structured outputs, retries, quarantine, traces, approvals, and regression testing.",
        checksTools: true,
      },
      {
        id: "build-a-portable-skill-library",
        title: "Build a Portable Skill Library",
        brief:
          "Version reusable job specifications, constraints, examples, schemas, and review rules across harnesses.",
        checksTools: false,
      },
      {
        id: "one-recording-five-assets",
        title: "One Recording, Five Assets",
        brief:
          "Branch a transcript into reviewed newsletter, hooks, social, and searchable content records.",
        checksTools: false,
      },
      {
        id: "research-to-brief-with-claim-checks",
        title: "Research-to-Brief With Claim Checks",
        brief:
          "Collect permitted sources, record dates, challenge claims, and publish clickable citations.",
        checksTools: false,
      },
      {
        id: "design-a-safe-browser-agent",
        title: "Design a Safe Browser Agent",
        brief:
          "Allowlist a constrained task, redact secrets, require confirmation, and compare browser action with APIs.",
        checksTools: false,
      },
    ],
  },
  {
    id: "free-ai-automation-tools-for-businesses",
    label: "Free AI automation tools for businesses",
    kind: "requested",
    feedsFrom: "/tools",
    wave: 1,
    topics: [
      {
        id: "free-ai-automation-stack-2026",
        title: "Free AI Automation Stack 2026",
        brief:
          "Compare n8n Community, Make Free, and Zapier Free on one lead-intake workflow and first paid wall.",
        checksTools: true,
      },
      {
        id: "free-ai-lead-qualification-with-human-handof",
        title: "Free AI Lead Qualification With Human Handoff",
        brief:
          "Classify, route, draft, and approve replies using confidence thresholds and duplicate safeguards.",
        checksTools: false,
      },
      {
        id: "shared-inbox-triage-and-draft-replies",
        title: "Shared-Inbox Triage and Draft Replies",
        brief: "Ground drafts in policy docs and escalate angry, sensitive, or uncertain cases.",
        checksTools: false,
      },
      {
        id: "a-free-faq-bot-that-does-not-hallucinate",
        title: "A Free FAQ Bot That Does Not Hallucinate",
        brief: "Use maintained sources, citations, unknown behavior, and an escalation log.",
        checksTools: false,
      },
      {
        id: "free-meeting-to-action-plan",
        title: "Free Meeting-to-Action Plan",
        brief:
          "Extract decisions, owners, dates, risks, and follow-up without inventing commitments.",
        checksTools: false,
      },
      {
        id: "invoice-and-receipt-intake-with-human-check",
        title: "Invoice and Receipt Intake With Human Check",
        brief: "OCR, extract, deduplicate, flag missing data, and export approved records only.",
        checksTools: false,
      },
      {
        id: "repurpose-one-source-into-marketing-content",
        title: "Repurpose One Source Into Marketing Content",
        brief:
          "Create channel drafts with source links, brand rules, approval, and cost-per-asset tracking.",
        checksTools: false,
      },
      {
        id: "human-in-the-loop-ai-operations",
        title: "Human-in-the-Loop AI Operations",
        brief: "Design approval gates, retries, error workflows, and escalation for free stacks.",
        checksTools: false,
      },
      {
        id: "private-ai-automation-on-a-spare-machine",
        title: "Private AI Automation on a Spare Machine",
        brief: "Deploy n8n, Docker, local/BYOK models, restricted credentials, and backups.",
        checksTools: true,
      },
      {
        id: "the-free-automation-cost-calculator",
        title: "The Free Automation Cost Calculator",
        brief: "Model tasks, credits, tokens, retries, storage, and human-review time by workload.",
        checksTools: false,
      },
    ],
  },
  {
    id: "ai-adoption-for-small-businesses-and-creator",
    label: "AI adoption for small businesses and creators",
    kind: "requested",
    feedsFrom: "/classes#core-business-teaching",
    wave: 2,
    topics: [
      {
        id: "a-60-minute-ai-back-office",
        title: "A 60-Minute AI Back Office",
        brief:
          "Automate inbox triage, meeting notes, follow-up, and reminders with approval and ROI tracking.",
        checksTools: false,
      },
      {
        id: "ai-agent-safety-for-a-one-person-business",
        title: "AI Agent Safety for a One-Person Business",
        brief: "Map read-only, draft-only, approval-required, and prohibited actions.",
        checksTools: false,
      },
      {
        id: "grounded-customer-support-on-a-budget",
        title: "Grounded Customer Support on a Budget",
        brief:
          "Use FAQs and policies, test adversarial questions, measure deflection, and escalate unknowns.",
        checksTools: false,
      },
      {
        id: "spreadsheet-to-weekly-business-decisions",
        title: "Spreadsheet to Weekly Business Decisions",
        brief: "Define metrics, clean data, chart, and verify every finding against rows.",
        checksTools: false,
      },
      {
        id: "one-interview-seven-creator-assets",
        title: "One Interview, Seven Creator Assets",
        brief:
          "Preserve voice, facts, review status, and rights across article, newsletter, clips, and posts.",
        checksTools: false,
      },
      {
        id: "chatgpt-vs-claude-vs-gemini-for-a-small-busi",
        title: "ChatGPT vs Claude vs Gemini for a Small-Business Job",
        brief: "Compare quality, latency, context, integrations, privacy, exports, and free tiers.",
        checksTools: true,
      },
      {
        id: "consent-aware-lead-follow-up",
        title: "Consent-Aware Lead Follow-Up",
        brief: "Capture, qualify, personalize drafts, schedule, deduplicate, and honor opt-out.",
        checksTools: false,
      },
      {
        id: "cash-flow-briefing-without-handing-over-the-",
        title: "Cash-Flow Briefing Without Handing Over the Books",
        brief:
          "Analyze redacted exports and generate questions for an accountant, not tax decisions.",
        checksTools: false,
      },
      {
        id: "a-creator-s-weekly-research-desk",
        title: "A Creator’s Weekly Research Desk",
        brief: "Monitor permitted sources, deduplicate claims, and produce a cited brief.",
        checksTools: false,
      },
      {
        id: "30-day-ai-adoption-experiment",
        title: "30-Day AI Adoption Experiment",
        brief:
          "Track minutes, rework, quality, revenue proxies, subscription cost, and stop/continue decisions.",
        checksTools: false,
      },
    ],
  },
  {
    id: "ai-agents-and-agentic-systems",
    label: "AI agents and agentic systems",
    kind: "adjacent",
    feedsFrom: "/ai-engineering/lessons",
    wave: 3,
    topics: [
      {
        id: "build-a-useful-agent-for-free",
        title: "Build a Useful Agent for Free",
        brief: "Compare a research-to-PDF workflow across ChatGPT, Claude, and self-hosted n8n.",
        checksTools: true,
      },
      {
        id: "mcp-vs-a2a-by-building-both",
        title: "MCP vs A2A by Building Both",
        brief:
          "Show tool/data connection versus agent-to-agent delegation and what neither protocol solves.",
        checksTools: true,
      },
      {
        id: "when-a-state-machine-beats-an-autonomous-loo",
        title: "When a State Machine Beats an Autonomous Loop",
        brief:
          "Build planner-tool-answer graphs with retries, checkpoints, state, and budget controls.",
        checksTools: false,
      },
      {
        id: "claude-desktop-agent-workspace",
        title: "Claude Desktop Agent Workspace",
        brief: "Use Markdown context, SOPs, planning mode, source checks, and editorial review.",
        checksTools: true,
      },
      {
        id: "agentic-coding-reality-check",
        title: "Agentic Coding Reality Check",
        brief:
          "Measure code quality, tests, debugging, dependency changes, review, rollback, time, and cost.",
        checksTools: false,
      },
      {
        id: "webmcp-in-practice",
        title: "WebMCP in Practice",
        brief:
          "Expose a structured site action and compare it with brittle DOM clicking, including authorization and audit.",
        checksTools: true,
      },
      {
        id: "design-an-agent-that-knows-when-to-stop",
        title: "Design an Agent That Knows When to Stop",
        brief:
          "Use least privilege, dry runs, idempotency, spend limits, approval, and reversible actions.",
        checksTools: false,
      },
      {
        id: "evaluate-agents-like-software",
        title: "Evaluate Agents Like Software",
        brief:
          "Test expected outcomes, traces, citations, refusal, adversarial inputs, latency, and cost.",
        checksTools: false,
      },
      {
        id: "local-first-document-agent",
        title: "Local-First Document Agent",
        brief:
          "Run cited private search with Ollama, RAG, and MCP while comparing quality and hardware tradeoffs.",
        checksTools: true,
      },
      {
        id: "monitored-browser-travel-assistant",
        title: "Monitored Browser Travel Assistant",
        brief:
          "Prepare options but pause before purchase; compare APIs, tools, visual clicking, caps, and logs.",
        checksTools: false,
      },
    ],
  },
  {
    id: "ai-productivity-and-knowledge-work",
    label: "AI productivity and knowledge work",
    kind: "adjacent",
    feedsFrom: "/classes#core-office-data",
    wave: 3,
    topics: [
      {
        id: "from-chatbot-to-coworker",
        title: "From Chatbot to Coworker",
        brief:
          "Build a safe long-running workflow for competitor monitoring, lead triage, or document review.",
        checksTools: false,
      },
      {
        id: "the-free-research-stack",
        title: "The Free Research Stack",
        brief:
          "Compare Perplexity, NotebookLM, and Deep Research on sources, citations, freshness, paywalls, and cost.",
        checksTools: true,
      },
      {
        id: "context-engineering-for-a-personal-knowledge",
        title: "Context Engineering for a Personal Knowledge Base",
        brief:
          "Build project briefs, decision logs, style guides, source folders, and retrieval rules.",
        checksTools: false,
      },
      {
        id: "one-brief-four-meeting-outputs",
        title: "One Brief, Four Meeting Outputs",
        brief:
          "Transcribe, extract decisions, assign tasks, draft follow-up, and verify against audio.",
        checksTools: false,
      },
      {
        id: "email-triage-that-never-sends-without-you",
        title: "Email Triage That Never Sends Without You",
        brief:
          "Label urgency, summarize threads, draft replies, and red-team injection and false urgency.",
        checksTools: false,
      },
      {
        id: "ai-tool-consolidation-test",
        title: "AI Tool Consolidation Test",
        brief:
          "See whether one assistant plus automation can replace redundant search, writing, meeting, and task apps.",
        checksTools: false,
      },
      {
        id: "mcp-for-knowledge-workers",
        title: "MCP for Knowledge Workers",
        brief:
          "Connect read-only files or calendars with authentication, approvals, and revocation.",
        checksTools: true,
      },
      {
        id: "ai-writing-that-sounds-like-you",
        title: "AI Writing That Sounds Like You",
        brief:
          "Build a style corpus, citation placeholders, claim checks, and reading-level review.",
        checksTools: false,
      },
      {
        id: "delegate-the-spreadsheet",
        title: "Delegate the Spreadsheet",
        brief:
          "Clean data, document assumptions, generate formulas, validate totals, and preserve reproducibility.",
        checksTools: false,
      },
      {
        id: "the-human-in-the-loop-control-pattern",
        title: "The Human-in-the-Loop Control Pattern",
        brief:
          "Classify risk, define allowed actions, log work, sample results, and escalate exceptions.",
        checksTools: false,
      },
    ],
  },
  {
    id: "ai-search-research-fact-checking-and-learnin",
    label: "AI search, research, fact-checking and learning",
    kind: "adjacent",
    feedsFrom: "/library",
    wave: 3,
    topics: [
      {
        id: "deep-research-face-off",
        title: "Deep Research Face-Off",
        brief:
          "Compare Gemini, ChatGPT, and Perplexity on one current question with a source audit.",
        checksTools: true,
      },
      {
        id: "the-citation-stress-test",
        title: "The Citation Stress Test",
        brief:
          "Open cited pages, locate passages, check dates and scope, and detect citation laundering.",
        checksTools: false,
      },
      {
        id: "from-vague-question-to-research-plan",
        title: "From Vague Question to Research Plan",
        brief:
          "Set scope, definitions, geography, date range, evidence hierarchy, exclusions, and subquestions.",
        checksTools: false,
      },
      {
        id: "perplexity-to-notebooklm",
        title: "Perplexity to NotebookLM",
        brief:
          "Discover sources, curate them, synthesize into a brief, and keep source links attached.",
        checksTools: true,
      },
      {
        id: "turn-a-40-page-paper-into-learning",
        title: "Turn a 40-Page Paper into Learning",
        brief:
          "Use source-grounded maps, timelines, flashcards, quizzes, and recall rather than passive summary.",
        checksTools: false,
      },
      {
        id: "audio-learning-with-footnotes",
        title: "Audio Learning With Footnotes",
        brief:
          "Audit Audio Overviews for omissions, simplification, unsupported phrasing, and recall.",
        checksTools: false,
      },
      {
        id: "ai-search-for-academic-literature",
        title: "AI Search for Academic Literature",
        brief:
          "Discover, classify study design, verify DOI, detect duplicates, and hand off to Zotero.",
        checksTools: false,
      },
      {
        id: "search-the-web-then-your-files",
        title: "Search the Web, Then Your Files",
        brief:
          "Compare public and workspace-grounded research with privacy, permission, and conflict checks.",
        checksTools: false,
      },
      {
        id: "claim-evidence-uncertainty-map",
        title: "Claim-Evidence-Uncertainty Map",
        brief:
          "Break controversy into subclaims, triangulate primary evidence, and write calibrated language.",
        checksTools: false,
      },
      {
        id: "the-one-question-learning-loop",
        title: "The One-Question Learning Loop",
        brief:
          "Research, explain, retrieve, diagnose misconceptions, and update a cited knowledge note.",
        checksTools: false,
      },
    ],
  },
  {
    id: "multimodal-ai-image-audio-video-and-voice",
    label: "Multimodal AI: image, audio, video and voice",
    kind: "adjacent",
    feedsFrom: "/ai-engineering/lessons",
    wave: 4,
    topics: [
      {
        id: "one-reference-pack-four-video-models",
        title: "One Reference Pack, Four Video Models",
        brief:
          "Test identity drift, packaging text, camera continuity, and accepted shots across models.",
        checksTools: false,
      },
      {
        id: "cost-per-finished-15-second-clip",
        title: "Cost per Finished 15-Second Clip",
        brief:
          "Draft low resolution, conversationally fix winners, upscale selectively, and calculate accepted-second cost.",
        checksTools: false,
      },
      {
        id: "snapshot-versus-continuous-vision",
        title: "Snapshot Versus Continuous Vision",
        brief: "Build a live voice agent and compare frame rate, latency, context, and token cost.",
        checksTools: false,
      },
      {
        id: "a-rights-safe-lyria-workflow",
        title: "A Rights-Safe Lyria Workflow",
        brief:
          "Generate, edit, fit, disclose, and license a 30-second soundtrack from image or video inspiration.",
        checksTools: true,
      },
      {
        id: "talking-heads-under-a-microscope",
        title: "Talking Heads Under a Microscope",
        brief: "Score mouth timing, voice naturalness, emotion, identity, and background sound.",
        checksTools: false,
      },
      {
        id: "research-pdf-to-multimodal-explainer",
        title: "Research PDF to Multimodal Explainer",
        brief:
          "Create storyboard, visuals, narration, captions, and claim-to-shot verification from a source document.",
        checksTools: false,
      },
      {
        id: "local-image-to-video-on-consumer-gpu",
        title: "Local Image-to-Video on Consumer GPU",
        brief:
          "Compare ComfyUI, open models, VRAM, quantization, speed, privacy, and hosted quality.",
        checksTools: true,
      },
      {
        id: "conversational-video-editing",
        title: "Conversational Video Editing",
        brief:
          "Make ad variants by changing setting, color, aspect ratio, and audience while preserving framing.",
        checksTools: true,
      },
      {
        id: "audio-first-visual-podcast",
        title: "Audio-First Visual Podcast",
        brief:
          "Combine source-grounded audio, authorized voices, visuals, captions, and disclosure.",
        checksTools: false,
      },
      {
        id: "can-viewers-tell-what-is-ai-made",
        title: "Can Viewers Tell What Is AI-Made?",
        brief: "Test SynthID, C2PA, metadata, and verification limits across mixed media.",
        checksTools: true,
      },
    ],
  },
  {
    id: "ai-safety-privacy-scams-and-responsible-use",
    label: "AI safety, privacy, scams and responsible use",
    kind: "adjacent",
    feedsFrom: "/classes#core-hardware-security",
    wave: 4,
    topics: [
      {
        id: "the-15-minute-chatgpt-privacy-hardening",
        title: "The 15-Minute ChatGPT Privacy Hardening",
        brief:
          "Audit temporary chat, memory, shared links, training controls, authentication, and account security.",
        checksTools: true,
      },
      {
        id: "can-you-trust-that-voice",
        title: "Can You Trust That Voice?",
        brief:
          "Use safe words, known-number callbacks, source checks, reverse search, and never transfer money on media alone.",
        checksTools: false,
      },
      {
        id: "ai-agent-permission-audit",
        title: "AI Agent Permission Audit",
        brief:
          "Use sandbox accounts, least privilege, dry runs, approval, logs, and prompt-injection review.",
        checksTools: false,
      },
      {
        id: "build-a-personal-ai-data-handling-policy",
        title: "Build a Personal AI Data-Handling Policy",
        brief:
          "Classify public, internal, confidential, and regulated data with approved tools and incident rules.",
        checksTools: false,
      },
      {
        id: "prompt-injection-for-normal-people",
        title: "Prompt Injection for Normal People",
        brief:
          "Show malicious instructions in webpages, PDFs, images, and emails and teach trust-boundary defenses.",
        checksTools: false,
      },
      {
        id: "deepfake-detection-tools-tested",
        title: "Deepfake Detection Tools Tested",
        brief:
          "Compare metadata, reverse search, provenance, and detectors while documenting false positives and negatives.",
        checksTools: false,
      },
      {
        id: "ai-scam-messages-in-your-inbox",
        title: "AI Scam Messages in Your Inbox",
        brief:
          "Preserve evidence, inspect headers, verify independently, redact, report, and avoid leaking the message.",
        checksTools: false,
      },
      {
        id: "free-local-ai-safety-lab",
        title: "Free Local AI Safety Lab",
        brief:
          "Test a small local model with synthetic secrets, injection cases, refusal, logging, and update risks.",
        checksTools: false,
      },
      {
        id: "responsible-ai-for-schools-and-families",
        title: "Responsible AI for Schools and Families",
        brief:
          "Create green/yellow/red rules for homework, advice, privacy, disclosure, and source checking.",
        checksTools: false,
      },
      {
        id: "from-ai-incident-to-evidence",
        title: "From AI Incident to Evidence",
        brief:
          "Log timestamps, URLs, prompts, versions, screenshots, reports, recovery, and jurisdiction-specific escalation.",
        checksTools: false,
      },
    ],
  },
];

/** Lanes in publishing order. Wave 1 earns first, wave 4 needs internal links first. */
export function lanesByWave(): Array<{ wave: number; lanes: MapLane[] }> {
  return [1, 2, 3, 4].map((wave) => ({
    wave,
    lanes: OPPORTUNITY_MAP.filter((lane) => lane.wave === wave),
  }));
}

/** Every topic, flattened, for the backlog. */
export function allTopics(): Array<MapTopic & { lane: string; laneId: string }> {
  return OPPORTUNITY_MAP.flatMap((lane) =>
    lane.topics.map((topic) => ({ ...topic, lane: lane.label, laneId: lane.id })),
  );
}
