import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Boxes,
  Check,
  CircleDollarSign,
  Code2,
  FileCode2,
  GitBranch,
  Github,
  KeyRound,
  Layers,
  Lock,
  Network,
  Rocket,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { Aurora, Reveal, Spotlight, StaggerGroup, StaggerItem } from "@/components/motion";
import { getPageHead } from "@/lib/seo";

const MARKETPLACE_URL = "https://marketplace.visualstudio.com/items?itemName=cyberelias.vizier";

const features = [
  {
    icon: Sparkles,
    title: "Smart Classification",
    body: "AI categorizes your idea (SaaS, Mobile, CLI, Browser extension, Game, Internal tool) with a keyword fallback when no model is set.",
  },
  {
    icon: Network,
    title: "Repo-Aware Planning",
    body: "Scans package files, README and existing agent rules so plans respect your stack. No source code is read or sent.",
  },
  {
    icon: Layers,
    title: "Category-Aware Questionnaire",
    body: "Different, relevant questions per app type plus optional expert-perspective lenses from Developer, Design, Growth, Marketing and more.",
  },
  {
    icon: Workflow,
    title: "Complete Blueprint Pipeline",
    body: "Six-stage generation: PRD → Architecture → Data Model → API Contract → Tasks → Decisions, all schema-validated with zod.",
  },
  {
    icon: Code2,
    title: "API Contract Design",
    body: "Concrete REST endpoints with method, path, auth and request/response shapes your agents can build straight from.",
  },
  {
    icon: CircleDollarSign,
    title: "Estimates & Story Points",
    body: "Every task gets an effort size, engineering hours and Fibonacci story points, ordered by dependency with cycle detection.",
  },
  {
    icon: FileCode2,
    title: "Agent-Specific Export",
    body: "Generates .cursorrules, CLAUDE.md or AGENTS.md automatically based on what's installed, plus a machine-readable plan/plan.json.",
  },
  {
    icon: GitBranch,
    title: "Real Tracker Integrations",
    body: "Push plan tasks to Jira, Linear, GitHub Issues or a generic webhook as real issues, with a dry-run preview before you commit.",
  },
  {
    icon: Lock,
    title: "Privacy-First by Design",
    body: "Planning sends only your idea + a workspace summary; monitoring is 100% local. API keys live in VS Code Secret Storage.",
  },
];

const pipeline = [
  { step: "01", title: "PRD", body: "Product requirements document with goals, users and scope." },
  { step: "02", title: "Architecture", body: "Tech stack with rationale and system boundaries." },
  { step: "03", title: "Data Model", body: "Entities, fields and relationships for your schema." },
  { step: "04", title: "API Contract", body: "REST endpoints, auth and request/response shapes." },
  { step: "05", title: "Tasks", body: "Build tasks in dependency order with estimates." },
  { step: "06", title: "Decisions", body: "Architectural decision register with trade-offs." },
];

const providers = [
  { name: "Anthropic (Claude)", note: "Bring your own API key" },
  { name: "OpenAI-compatible", note: "OpenAI, OpenRouter, any v1 endpoint" },
  { name: "omniroute", note: "Gateway with auto model switching" },
  { name: "Ollama", note: "Local, no API key required" },
];

export const Route = createFileRoute("/vizier")({
  head: () =>
    getPageHead({
      title: "Vizier — AI planning extension for VS Code",
      description:
        "Vizier turns a loose app idea into a structured, agent-ready build plan: PRD, architecture, data model, API contract, tasks and decisions — exported straight to your workspace.",
      path: "/vizier",
      noIndex: true,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Vizier",
        applicationCategory: "DeveloperApplication",
        applicationSubCategory: "VS Code Extension",
        operatingSystem: "Windows, macOS, Linux (VS Code 1.85.0+)",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description:
          "A VS Code extension that turns app ideas into structured, agent-ready build plans.",
        url: "https://cea.ng/vizier",
        downloadUrl: MARKETPLACE_URL,
        publisher: { "@type": "Organization", name: "Cyber Elias Academy" },
        license: "https://cea.ng/vizier#license",
      },
    }),
  component: Vizier,
});

function Vizier() {
  return (
    <PageShell>
      <PageHero
        eyebrow="VS Code Extension"
        title={
          <>
            Vizier: turn app ideas into <span className="text-gradient">agent-ready plans</span>.
          </>
        }
        description="Vizier is a VS Code extension that takes a loose app idea and transforms it into a complete, structured blueprint — PRD, tech stack, data model, API contract, build tasks and a decision register — then exports it to your workspace so you or your AI coding agent can build from it."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-gradient-brand shadow-glow border-0">
            <a href={MARKETPLACE_URL} target="_blank" rel="noopener noreferrer">
              Install from Marketplace <ArrowRight className="ml-1.5 size-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#how-it-works">See how it works</a>
          </Button>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <Badge variant="secondary" className="font-medium">
            MIT Licensed
          </Badge>
          <span className="inline-flex items-center gap-1.5">
            <Boxes className="size-4" /> VS Code 1.85.0+
          </span>
          <span className="inline-flex items-center gap-1.5">
            <KeyRound className="size-4" /> Anthropic · OpenAI · Ollama
          </span>
        </div>
      </PageHero>

      <section className="border-b">
        <div className="container-page py-16 md:py-20">
          <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <StaggerItem key={f.title}>
                <div className="bg-card shadow-soft h-full rounded-2xl border p-6">
                  <div className="bg-primary/10 text-primary grid size-11 place-items-center rounded-xl">
                    <f.icon className="size-5" />
                  </div>
                  <h3 className="font-display mt-4 text-base font-bold">{f.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{f.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section id="how-it-works" className="border-b">
        <div className="container-page py-20 md:py-28">
          <SectionHeading
            eyebrow="Blueprint pipeline"
            title={
              <>
                Six stages, <span className="text-gradient">one blueprint</span>
              </>
            }
            description="Every plan flows through the same structured pipeline so nothing falls through the cracks — from the first sentence of your idea to a decision register your agents can trust."
          />
          <StaggerGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pipeline.map((p) => (
              <StaggerItem key={p.step}>
                <div className="bg-card shadow-soft relative h-full overflow-hidden rounded-2xl border p-7">
                  <span className="text-gradient font-display absolute right-5 top-4 text-3xl font-extrabold opacity-15">
                    {p.step}
                  </span>
                  <div className="bg-gradient-brand shadow-glow grid size-10 place-items-center rounded-xl text-white">
                    {p.step}
                  </div>
                  <h3 className="font-display mt-4 text-lg font-bold">{p.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{p.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-muted/40 border-b">
        <div className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Quick start"
              title={
                <>
                  From idea to <span className="text-gradient">exported plan</span> in 30 seconds
                </>
              }
            />
            <ol className="mt-8 space-y-4">
              {[
                "Open the Vizier sidebar (rocket icon) or run Vizier: Plan New App.",
                "Describe your app idea in 1–3 sentences and click Plan This App.",
                "Answer a few short questions — or skip them entirely.",
                "Wait ~15–30 seconds for the structured blueprint to generate.",
                "Export to Files — everything lands in a plan/ folder in your workspace.",
                "Run Vizier: Check Plan Progress to watch execution, fully locally.",
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="bg-primary/10 text-primary grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold">
                    {i + 1}
                  </span>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="bg-card shadow-soft rounded-2xl border p-6 font-mono text-sm">
              <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
                What gets exported
              </p>
              <pre className="overflow-x-auto leading-relaxed text-pretty">{`plan/
  plan.json        # source of truth
  overview.md      # PRD
  architecture.md  # tech stack
  schema.md        # data model
  api.md          # API contract
  tasks.md        # build tasks
  decisions.md     # decision register
  context/        # per-task packs
.cursorrules       # Cursor
CLAUDE.md          # Claude Code
AGENTS.md          # generic`}</pre>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b">
        <div className="container-page py-20 md:py-24">
          <SectionHeading
            align="center"
            eyebrow="Bring your own model"
            title={
              <>
                Runs on the model <span className="text-gradient">you already trust</span>
              </>
            }
            description="Pick a provider in settings. Go fully local with Ollama — no API key, no data leaving your machine."
          />
          <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {providers.map((p) => (
              <StaggerItem key={p.name}>
                <div className="bg-card shadow-soft h-full rounded-2xl border p-6 text-center">
                  <Rocket className="text-primary mx-auto size-6" />
                  <h3 className="font-display mt-3 text-sm font-bold">{p.name}</h3>
                  <p className="text-muted-foreground mt-1.5 text-xs">{p.note}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal className="mt-10">
            <div className="bg-gradient-ink text-ink-foreground shadow-elevated relative overflow-hidden rounded-2xl p-6">
              <Aurora className="opacity-50" />
              <div className="relative flex flex-wrap items-center gap-3 text-sm">
                <Lock className="size-5" />
                <p>
                  <span className="font-bold">Privacy-first:</span> planning sends only your idea +
                  a workspace summary. Progress monitoring is 100% local and never transmits source
                  code. API keys are stored in VS Code Secret Storage.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="license" className="border-b">
        <div className="container-page py-16">
          <Reveal>
            <div className="bg-card shadow-soft rounded-2xl border p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-extrabold">MIT Licensed</h2>
                  <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed">
                    Vizier is open source under the MIT License, Copyright © 2026 Cyber Elias. Free
                    to use, modify and distribute. Read the full disclaimers before relying on any
                    generated plan.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline">
                    <a href={MARKETPLACE_URL} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-1.5 size-4" /> Marketplace
                    </a>
                  </Button>
                </div>
              </div>
              <div className="bg-muted mt-6 flex flex-wrap gap-x-6 gap-y-2 rounded-xl p-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="size-3.5 text-emerald-500" /> Schema-validated output (zod)
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="size-3.5 text-emerald-500" /> 65+ automated tests
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="size-3.5 text-emerald-500" /> Human-in-the-loop export gate
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <Reveal>
          <div className="bg-gradient-ink text-ink-foreground shadow-elevated relative overflow-hidden rounded-3xl px-8 py-16 md:px-16 md:py-20">
            <Aurora className="opacity-60" />
            <Spotlight />
            <div className="relative max-w-2xl">
              <h2 className="text-3xl font-extrabold text-balance sm:text-4xl md:text-5xl md:leading-[1.08]">
                Plan your next app in VS Code
              </h2>
              <p className="text-ink-foreground/75 mt-5 text-lg leading-relaxed text-pretty">
                Install Vizier and turn the next idea into a blueprint your AI agent can build from
                — today. Free and open source under MIT.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-gradient-brand shadow-glow border-0">
                  <a href={MARKETPLACE_URL} target="_blank" rel="noopener noreferrer">
                    Install Vizier <ArrowRight className="ml-1.5 size-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-ink-foreground/25 text-ink-foreground hover:bg-ink-foreground/10 bg-transparent"
                >
                  <Link to="/about">Explore Cyber Elias Academy</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
