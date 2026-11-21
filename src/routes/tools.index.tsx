import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  Code2,
  Database,
  Keyboard,
  LayoutGrid,
  Monitor,
  Palette,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Table,
} from "lucide-react";
import { PageHero, PageShell, CTASection, Eyebrow } from "@/components/marketing/shell";
import { CEA_BUILT_IN_LABS, type BuiltInLabEntry } from "@/data/cea-lab-registry";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/tools/")({
  head: () =>
    getPageHead({
      title: "CEA Lab & Free Student Tools — Code Studio, SQL, Excel & More",
      description:
        "Free browser-based labs from Cyber Elias Academy, Port Harcourt: HTML/CSS/JS Code Studio, Flexbox & Grid Lab, SQL & CSV DataLab, Excel Formula Lab, Skill Assessment Studio, Typing Test, Word Counter, Password Strength and Colour Contrast.",
      path: "/tools",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "CEA Lab and free tools from Cyber Elias Academy",
      },
    }),
  component: ToolsPage,
});

const ICON_BY_PATH: Record<string, typeof Code2> = {
  "/tools/code-studio": Code2,
  "/tools/css-layout-lab": LayoutGrid,
  "/tools/sql-datalab": Database,
  "/tools/excel-formula-lab": Table,
  "/tools/assess": CheckCircle2,
  "/tools/open-labs": Boxes,
  "/tools/typing-test": Keyboard,
  "/tools/word-counter": ScrollText,
  "/tools/password-strength": ShieldCheck,
  "/tools/color-contrast": Palette,
};

const QUICK_JUMP = [
  { label: "Code Studio", to: "/tools/code-studio" },
  { label: "CSS Layout Lab", to: "/tools/css-layout-lab" },
  { label: "SQL & DataLab", to: "/tools/sql-datalab" },
  { label: "Spreadsheet Lab", to: "/tools/excel-formula-lab" },
  { label: "Assess Studio", to: "/tools/assess" },
  { label: "Open-Source Hub", to: "/tools/open-labs" },
  { label: "Typing Test", to: "/tools/typing-test" },
  { label: "Word Counter", to: "/tools/word-counter" },
  { label: "Password Strength", to: "/tools/password-strength" },
  { label: "Colour Contrast", to: "/tools/color-contrast" },
] as const;

const TRACK_LABELS: { id: BuiltInLabEntry["track"]; title: string; subtitle: string }[] = [
  {
    id: "code-web",
    title: "Code, Web & Open-Source Sandboxes",
    subtitle: "Write HTML/CSS/JS, master Flexbox & Grid, or launch verified open-source sandboxes.",
  },
  {
    id: "data-office",
    title: "Data, SQL & Spreadsheet Labs",
    subtitle: "Query Nigerian business tables, inspect messy CSVs and drill real Excel formulas.",
  },
  {
    id: "assessment-ai",
    title: "Diagnostics & Security",
    subtitle: "Test readiness across academy tracks or audit password strength locally.",
  },
  {
    id: "design-writing",
    title: "Typing, Design & Writing",
    subtitle: "Build speed, measure writing clarity and verify WCAG colour contrast.",
  },
];

function ToolsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="CEA Lab · Free tools · No sign-up"
        title={
          <>
            Sharp labs for{" "}
            <span className="font-serif text-primary font-normal italic">practical skills.</span>
          </>
        }
        description="Ten interactive browser tools and coding labs built for Nigerian learners: practise HTML/CSS/JS, Flexbox & Grid, SQL queries, Excel formulas, typing speed, design contrast and skill diagnostics — zero sign-up, zero tracking, 100% client-side."
        meta={[
          `${CEA_BUILT_IN_LABS.length} interactive labs`,
          "100% client-side",
          "Free for everyone",
        ]}
      >
        <div className="mt-7 flex flex-wrap gap-2">
          {QUICK_JUMP.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="border-foreground/12 bg-background/80 hover:border-primary/40 hover:text-primary rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </PageHero>

      <section className="container-page space-y-14 py-14 md:py-20">
        {TRACK_LABELS.map((group) => {
          const items = CEA_BUILT_IN_LABS.filter((t) => t.track === group.id);
          return (
            <div key={group.id}>
              <div className="mb-6 flex flex-col gap-1">
                <Eyebrow>{group.title}</Eyebrow>
                <p className="text-muted-foreground text-sm">{group.subtitle}</p>
              </div>
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((tool) => {
                  const Icon = ICON_BY_PATH[tool.to] ?? Code2;
                  return (
                    <li key={tool.to}>
                      <Link
                        to={tool.to}
                        className="card-lift border-foreground/10 bg-card group flex h-full flex-col rounded-2xl border p-6"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                            <Icon className="size-6" aria-hidden="true" />
                          </span>
                          <div className="flex items-center gap-2">
                            {tool.isNew && (
                              <span className="bg-primary/12 text-primary rounded-full px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-[0.16em] uppercase">
                                New Lab
                              </span>
                            )}
                            <ArrowUpRight
                              className="text-muted-foreground size-5 shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                        <p className="text-primary mt-5 font-mono text-[9px] tracking-[0.24em] uppercase">
                          {tool.badge}
                        </p>
                        <h2 className="font-display mt-2 text-2xl leading-snug font-semibold tracking-tight">
                          {tool.headline}
                        </h2>
                        <p className="text-muted-foreground mt-3 flex-1 text-sm leading-relaxed">
                          {tool.blurb}
                        </p>
                        <p className="border-foreground/10 text-muted-foreground mt-5 border-t pt-4 font-mono text-[9px] tracking-[0.2em] uppercase">
                          {tool.meta}
                        </p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

        {/* Beginner lab + AI Engineering cross-links */}
        <div className="grid gap-5 lg:grid-cols-2">
          <Link
            to="/practice/computer-basics"
            className="card-lift border-foreground/12 bg-card flex items-center justify-between gap-4 rounded-2xl border p-6"
          >
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Monitor className="size-6" aria-hidden="true" />
              </span>
              <span>
                <span className="text-primary font-mono text-[9px] tracking-[0.24em] uppercase">
                  Absolute Beginners
                </span>
                <span className="font-display mt-1 block text-xl font-semibold tracking-tight">
                  Computer Basics Practice Lab
                </span>
                <span className="text-muted-foreground mt-1 block text-sm">
                  Pointing, typing and naming files safely in your browser before stepping into
                  class.
                </span>
              </span>
            </div>
            <ArrowRight className="text-primary size-5 shrink-0" aria-hidden="true" />
          </Link>

          <Link
            to="/ai-engineering"
            className="card-lift flex items-center justify-between gap-4 rounded-2xl border border-[#2f6bff]/30 bg-[linear-gradient(135deg,#0a1326_0%,#0d1830_60%,#101a3a_100%)] p-6 text-[#eef2fb]"
          >
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#2f6bff]/20 text-[#8ec4ff]">
                <Sparkles className="size-6" aria-hidden="true" />
              </span>
              <span>
                <span className="font-mono text-[9px] tracking-[0.24em] text-[#7fb5ff] uppercase">
                  Graduate from tools to AI
                </span>
                <span className="font-display mt-1 block text-xl font-semibold tracking-tight text-white">
                  AI Engineering from Scratch — 542 lessons
                </span>
                <span className="mt-1 block text-sm text-[#a9bcd6]">
                  MIT-licensed open curriculum curated for CEA learners — with an interactive Prompt
                  Lab and structured quizzes.
                </span>
              </span>
            </div>
            <ArrowRight className="size-5 shrink-0 text-[#8ec4ff]" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <CTASection
        title="Free labs are the warm-up. Mentorship finishes the skill."
        description="Two sessions a week at 24 Ebony Road. Small groups, real projects, a teacher in the room — from your first keyboard to your first portfolio."
        primary={{ label: "Explore CEA courses", to: "/classes" }}
        secondary={{ label: "Apply for admission", to: "/apply" }}
      />
    </PageShell>
  );
}
