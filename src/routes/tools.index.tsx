import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowRight,
  ArrowUpRight,
  Banknote,
  Boxes,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  HardDrive,
  Keyboard,
  LayoutGrid,
  Monitor,
  Palette,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Table,
  FileSignature,
} from "lucide-react";
import { CTASection, PageShell } from "@/components/marketing/shell";
import { EzoicUnderTitleAd } from "@/components/ezoic/ezoic-ads";
import { CEA_BUILT_IN_LABS, type BuiltInLabEntry } from "@/data/cea-lab-registry";
import { toolTrackTheme } from "@/lib/course-families";
import { cn } from "@/lib/utils";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/tools/")({
  head: () =>
    getPageHead({
      title: "CEA Practice Lab — Code Studio, SQL, Excel & Interactive Tools",
      description:
        "Practise real digital skills in your browser: HTML/CSS/JS Code Studio, Flexbox & Grid Lab, SQL & CSV DataLab, Excel Formula Lab, Skill Assessment Studio, Typing Test and more — zero sign-up.",
      path: "/tools",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "CEA Practice Lab and free tools from Cyber Elias Academy",
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
  "/tools/data-size-converter": HardDrive,
  "/tools/naira-keyboard": Banknote,
  "/tools/cloud-explainer": Cloud,
  "/tools/security-assessment": ShieldCheck,
  "/tools/digital-signature": FileSignature,
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
  { label: "KB vs MB vs GB", to: "/tools/data-size-converter" },
  { label: "Naira Sign ₦", to: "/tools/naira-keyboard" },
  { label: "What Is the Cloud?", to: "/tools/cloud-explainer" },
  { label: "Security Assessment", to: "/tools/security-assessment" },
  { label: "Digital Signatures", to: "/tools/digital-signature" },
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
    subtitle:
      "Query Nigerian business tables, drill real Excel formulas, convert KB/MB/GB and type the naira sign.",
  },
  {
    id: "assessment-ai",
    title: "Diagnostics, Security & Everyday Computing",
    subtitle:
      "Test readiness across academy tracks, audit password strength locally, or learn where the cloud really is.",
  },
  {
    id: "design-writing",
    title: "Typing, Design & Writing",
    subtitle: "Build speed, measure writing clarity and verify WCAG colour contrast.",
  },
];

const LAB_LOOP = [
  ["01", "Learn", "Understand the concept before practising."],
  ["02", "Try", "Explore the live sandbox freely with zero setup."],
  ["03", "Practice", "Complete structured real-world exercises."],
  ["04", "Challenge", "Test your speed or accuracy against a task."],
  ["05", "Progress", "Carry your capability into class projects."],
] as const;

function ToolsPage() {
  return (
    <PageShell>
      {/* Obsidian Digital Frontier Practice Lab Header */}
      <section className="cea-frontier-grid border-b border-[#2c333c] bg-[#101214] text-[#f4f1e9]">
        <div className="container-page py-14 md:py-20">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.16em] text-[#d6fe52] uppercase">
            <span className="size-1.5 rounded-full bg-[#d6fe52]" aria-hidden="true" />
            CEA LAB / EXPERIMENT 001 · 100% CLIENT-SIDE
          </p>
          <h1 className="font-display mt-5 max-w-4xl text-[clamp(2.6rem,5.4vw,4.5rem)] leading-[0.98] font-semibold tracking-[-0.045em]">
            Learn by <span className="font-serif font-normal text-[#d6fe52] italic">doing.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#c6cdd6] sm:text-lg">
            Practice real digital skills through interactive coding, SQL, spreadsheet, typing, and
            design environments directly inside your browser — zero sign-up, zero installs, 100%
            browser-based.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {QUICK_JUMP.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-full border border-[#2c333c] bg-[#181c20] px-3.5 py-1.5 text-xs font-medium text-[#f4f1e9] transition-colors hover:border-[#d6fe52] hover:text-[#d6fe52]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* 5-stage Practice Lab method */}
          <ol className="mt-10 grid gap-3 border-t border-[#242a31] pt-8 sm:grid-cols-5">
            {LAB_LOOP.map(([num, label, desc]) => (
              <li key={label} className="rounded-xl border border-[#242a31] bg-[#181c20] p-4">
                <span className="font-mono text-xs font-bold text-[#d6fe52]">{num}</span>
                <p className="font-display mt-1.5 text-base font-semibold text-[#f4f1e9]">
                  {label}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#9ea7b4]">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <EzoicUnderTitleAd />

      {/* Graphite Workbench Tool Grid */}
      <section className="bg-[#181c20] py-14 text-[#f4f1e9] md:py-20">
        <div className="container-page space-y-14">
          {TRACK_LABELS.map((group) => {
            const items = CEA_BUILT_IN_LABS.filter((t) => t.track === group.id);
            return (
              <div key={group.id}>
                <div className="mb-6 flex flex-col gap-1 border-b border-[#2c333c] pb-4">
                  <p className="font-mono text-xs font-semibold tracking-[0.14em] text-[#d6fe52] uppercase">
                    {group.title}
                  </p>
                  <p className="text-sm text-[#b4bac4]">{group.subtitle}</p>
                </div>
                <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((tool) => {
                    const Icon = ICON_BY_PATH[tool.to] ?? Code2;
                    const trackTheme = toolTrackTheme(tool.track);
                    return (
                      <li key={tool.to}>
                        <Link
                          to={tool.to}
                          className={cn(
                            "group flex h-full flex-col rounded-xl border border-[#2c333c] bg-[#101214] p-6 transition-all hover:border-[#d6fe52]/70",
                            trackTheme.accentBar,
                          )}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <span className="grid size-12 place-items-center rounded-xl bg-[#242a31] text-[#d6fe52]">
                              <Icon className="size-6" aria-hidden="true" />
                            </span>
                            <div className="flex items-center gap-2">
                              {tool.isNew && (
                                <span className="rounded-full bg-[#d6fe52] px-2.5 py-0.5 font-mono text-xs font-bold text-[#101214]">
                                  New Lab
                                </span>
                              )}
                              <ArrowUpRight
                                className="size-5 shrink-0 text-[#9ea7b4] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#d6fe52]"
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                          <p className="mt-5 font-mono text-xs font-semibold tracking-wider text-[#7774ff] uppercase">
                            {tool.badge}
                          </p>
                          <h2 className="font-display mt-2 text-2xl leading-snug font-semibold tracking-tight text-[#f4f1e9] group-hover:text-[#d6fe52]">
                            {tool.headline}
                          </h2>
                          <p className="mt-3 flex-1 text-sm leading-relaxed text-[#b4bac4]">
                            {tool.blurb}
                          </p>
                          <p className="mt-5 border-t border-[#242a31] pt-4 font-mono text-xs text-[#9ea7b4]">
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
              className="flex items-center justify-between gap-4 rounded-xl border border-[#2c333c] bg-[#101214] p-6 transition-colors hover:border-[#f17c52]"
            >
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#242a31] text-[#f17c52]">
                  <Monitor className="size-6" aria-hidden="true" />
                </span>
                <span>
                  <span className="font-mono text-xs font-semibold tracking-wider text-[#f17c52] uppercase">
                    Absolute Beginners
                  </span>
                  <span className="font-display mt-1 block text-xl font-semibold tracking-tight text-[#f4f1e9]">
                    Computer Basics Practice Lab
                  </span>
                  <span className="mt-1 block text-sm text-[#b4bac4]">
                    Inspect the Four Things blueprint and practise pointing, typing and naming files
                    safely in your browser.
                  </span>
                </span>
              </div>
              <ArrowRight className="size-5 shrink-0 text-[#f17c52]" aria-hidden="true" />
            </Link>

            <Link
              to="/ai-engineering"
              className="flex items-center justify-between gap-4 rounded-xl border border-[#7774ff]/45 bg-[#101214] p-6 transition-colors hover:border-[#7774ff]"
            >
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#7774ff]/20 text-[#b7b5ff]">
                  <Sparkles className="size-6" aria-hidden="true" />
                </span>
                <span>
                  <span className="font-mono text-xs font-semibold tracking-wider text-[#b7b5ff] uppercase">
                    Graduate from tools to AI
                  </span>
                  <span className="font-display mt-1 block text-xl font-semibold tracking-tight text-[#f4f1e9]">
                    AI Engineering from Scratch — 542 lessons
                  </span>
                  <span className="mt-1 block text-sm text-[#b4bac4]">
                    MIT-licensed open curriculum curated for CEA learners — with an interactive
                    Prompt Lab and structured quizzes.
                  </span>
                </span>
              </div>
              <ArrowRight className="size-5 shrink-0 text-[#b7b5ff]" aria-hidden="true" />
            </Link>
          </div>
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
