"use client";

import { useState } from "react";
import { ArrowRight, BookOpen, GraduationCap, Terminal } from "lucide-react";
import { Link } from "@/lib/next-compat/router";
import { cn } from "@/lib/utils";

export type SkillWorld = {
  id: string;
  code: string;
  title: string;
  accent: "lime" | "iris" | "orange";
  tagline: string;
  summary: string;
  skills: string[];
  tools: string[];
  output: string;
  course: { label: string; to: string; meta: string };
  lab: { label: string; to: string };
  note: { label: string; to: string };
};

export const SKILL_WORLDS: SkillWorld[] = [
  {
    id: "compute",
    code: "COMPUTE",
    title: "Computer Basics & Office",
    accent: "lime",
    tagline: "From touching a mouse to producing real work.",
    summary:
      "Master files, folders, calm typing, Word documents, Excel spreadsheets and clean presentations for everyday work.",
    skills: ["Touch typing", "File organization", "Word formatting", "Excel spreadsheets"],
    tools: ["Keyboard & OS", "Microsoft Word", "Microsoft Excel", "PowerPoint"],
    output: "A formatted CV, an office report, and a working monthly budget sheet.",
    course: {
      label: "Microsoft Office",
      to: "/classes/microsoft-office",
      meta: "₦30,000 · 3 weeks",
    },
    lab: { label: "Computer Basics & Typing Lab", to: "/tools/typing-test" },
    note: {
      label: "Lesson 01: Sitting down at a computer",
      to: "/blog/sitting-down-at-a-computer",
    },
  },
  {
    id: "create",
    code: "CREATE",
    title: "Graphic Design & Content",
    accent: "orange",
    tagline: "Visual communication that looks deliberate.",
    summary:
      "Design posters, flyers, social carousels and short-form photo/video content with clear layout, typography and hierarchy.",
    skills: ["Layout grids", "Typography pairing", "Brand flyers", "Photo & video editing"],
    tools: ["Canva / Figma", "Vector shapes", "Colour contrast", "Export specs"],
    output: "A 4-piece event & brand print/social media campaign.",
    course: {
      label: "Graphic Design",
      to: "/classes/graphic-design",
      meta: "₦40,000 · 4 weeks",
    },
    lab: { label: "Colour Contrast & Accessibility Lab", to: "/tools/color-contrast" },
    note: { label: "Explore visual design notes", to: "/blog?category=design-graphics" },
  },
  {
    id: "build",
    code: "BUILD",
    title: "Web Design & Development",
    accent: "iris",
    tagline: "Write real HTML, CSS and JavaScript that ships.",
    summary:
      "Go from semantic markup and responsive Flexbox/Grid layouts to interactive pages and real deployed websites.",
    skills: ["Semantic HTML5", "Flexbox & CSS Grid", "Responsive layouts", "DOM JavaScript"],
    tools: ["HTML / CSS / JS", "Browser DevTools", "Code Studio", "Git"],
    output: "A live multi-section responsive website deployed online.",
    course: {
      label: "Web Design",
      to: "/classes/web-design",
      meta: "₦50,000 · 4 weeks",
    },
    lab: { label: "HTML/CSS/JS Code Studio", to: "/tools/code-studio" },
    note: { label: "Web & Coding lessons", to: "/blog?category=web-coding" },
  },
  {
    id: "analyze",
    code: "ANALYZE",
    title: "Data, Spreadsheets & SQL",
    accent: "lime",
    tagline: "Turn messy rows into decisions you can trust.",
    summary:
      "Clean records, write SUMIF/VLOOKUP spreadsheet formulas, and query multi-table databases with SQL.",
    skills: ["Data cleaning", "Excel formulas", "SQL JOIN & GROUP BY", "Record validation"],
    tools: ["Excel / Sheets", "SQLite / SQL", "CSV Inspector", "Summary tables"],
    output: "A cleaned sales ledger and structured SQL query report.",
    course: {
      label: "Data Entry",
      to: "/classes/data-entry",
      meta: "₦20,000 · 2 weeks",
    },
    lab: { label: "SQL & CSV DataLab", to: "/tools/sql-datalab" },
    note: {
      label: "Spreadsheets: the grid that counts",
      to: "/blog/spreadsheets-the-grid-that-counts",
    },
  },
  {
    id: "connect",
    code: "CONNECT",
    title: "Hardware, Repairs & Security",
    accent: "orange",
    tagline: "Keep machines, networks and accounts safe.",
    summary:
      "Diagnose hardware faults, manage Wi-Fi/LAN connectivity, practise strong passwords and spot phishing links.",
    skills: ["Hardware diagnostics", "OS troubleshooting", "Password hygiene", "Phishing defence"],
    tools: ["Diagnostic bench", "Wi-Fi & IP checks", "Password tester", "Backups"],
    output: "A diagnosed & serviced PC plus a personal security checklist.",
    course: {
      label: "Computer Repairs",
      to: "/classes/computer-repairs",
      meta: "₦50,000 · 4 weeks",
    },
    lab: { label: "Password Strength Lab", to: "/tools/password-strength" },
    note: { label: "The link you should not open", to: "/blog/the-link-you-should-not-open" },
  },
  {
    id: "grow",
    code: "GROW",
    title: "Marketing & Freelancing",
    accent: "iris",
    tagline: "Price work fairly and reach real customers.",
    summary:
      "Package a skill, communicate with clients, run structured social campaigns, and deliver work reliably.",
    skills: ["Client briefs", "Service pricing", "Content calendars", "Digital marketing"],
    tools: ["Campaign briefs", "Social planners", "Proposal docs", "Invoices"],
    output: "A client-ready service offer and 2-week campaign plan.",
    course: {
      label: "Digital Marketing",
      to: "/classes/digital-marketing",
      meta: "₦35,000 · 3 weeks",
    },
    lab: { label: "Writing & Copy Clarity Lab", to: "/tools/word-counter" },
    note: { label: "Business & Work notes", to: "/blog?category=business-work" },
  },
  {
    id: "intelligence",
    code: "INTELLIGENCE",
    title: "AI Engineering & Prompting",
    accent: "iris",
    tagline: "Use modern AI carefully — and understand how it works.",
    summary:
      "Work through CEA's 542-lesson open AI engineering curriculum: structured prompting, Python foundations, evaluation and building real tools.",
    skills: ["Structured prompting", "Evaluation thinking", "Python & APIs", "Responsible AI"],
    tools: ["Open AI Curriculum", "Prompt Lab", "Quizzes", "Python notebooks"],
    output: "Completed open modules and practical prompt workflows.",
    course: {
      label: "AI Engineering Curriculum",
      to: "/ai-engineering",
      meta: "Free · 542 open lessons",
    },
    lab: { label: "Skill Assessment Studio", to: "/tools/assess" },
    note: { label: "Explore Open Curriculum", to: "/open-curriculum" },
  },
];

const ACCENT_STYLES: Record<
  SkillWorld["accent"],
  { chip: string; badge: string; dot: string; border: string }
> = {
  lime: {
    chip: "border-[#d6fe52] bg-[#d6fe52] text-[#101214]",
    badge: "bg-[#d6fe52]/15 text-[#d6fe52] border-[#d6fe52]/35",
    dot: "bg-[#d6fe52]",
    border: "border-[#d6fe52]/40",
  },
  iris: {
    chip: "border-[#7774ff] bg-[#7774ff] text-white",
    badge: "bg-[#7774ff]/20 text-[#b7b5ff] border-[#7774ff]/40",
    dot: "bg-[#7774ff]",
    border: "border-[#7774ff]/45",
  },
  orange: {
    chip: "border-[#f17c52] bg-[#f17c52] text-[#101214]",
    badge: "bg-[#f17c52]/20 text-[#ffb094] border-[#f17c52]/40",
    dot: "bg-[#f17c52]",
    border: "border-[#f17c52]/45",
  },
};

export function HeroSkillCore() {
  const [selectedId, setSelectedId] = useState<string>("compute");
  const active = SKILL_WORLDS.find((w) => w.id === selectedId) ?? SKILL_WORLDS[0];
  const style = ACCENT_STYLES[active.accent];

  return (
    <div className="rounded-xl border border-[#2c333c] bg-[#161a1f]/95 p-5 shadow-2xl sm:p-6">
      <div className="flex items-center justify-between gap-3 border-b border-[#242a31] pb-4">
        <div>
          <p className="font-mono text-xs font-semibold tracking-[0.14em] text-[#d6fe52] uppercase">
            CEA Skill Core · 07 Worlds
          </p>
          <p className="mt-0.5 text-xs text-[#9ea7b4]">
            Tap or hover a territory to inspect what you can learn and build
          </p>
        </div>
        <span className="hidden rounded-full border border-[#2c333c] bg-[#242a31] px-2.5 py-1 font-mono text-xs text-[#f4f1e9] sm:inline-block">
          LIVE PATHWAYS
        </span>
      </div>

      {/* 7 interactive skill nodes — swipeable on mobile, clean wrapped grid on desktop */}
      <div
        role="tablist"
        aria-label="CEA Skill Worlds"
        className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0"
      >
        {SKILL_WORLDS.map((world) => {
          const isSelected = world.id === active.id;
          const s = ACCENT_STYLES[world.accent];
          return (
            <button
              key={world.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedId(world.id)}
              onMouseEnter={() => setSelectedId(world.id)}
              className={cn(
                "inline-flex min-h-[40px] shrink-0 items-center gap-2 rounded-full border px-3.5 font-mono text-xs font-semibold tracking-wider transition-all",
                isSelected
                  ? s.chip
                  : "border-[#2c333c] bg-[#1e2329] text-[#d6dce4] hover:border-[#f4f1e9]/40 hover:text-white",
              )}
            >
              <span
                className={cn("size-1.5 rounded-full", isSelected ? "bg-current" : s.dot)}
                aria-hidden="true"
              />
              {world.code}
            </button>
          );
        })}
      </div>

      {/* Active world preview readout */}
      <div
        className={cn("mt-5 rounded-xl border bg-[#101214] p-5 transition-colors", style.border)}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs font-semibold",
              style.badge,
            )}
          >
            {active.code}
          </span>
          <span className="font-mono text-xs text-[#9ea7b4]">{active.course.meta}</span>
        </div>

        <h2 className="font-display mt-3 text-xl font-semibold tracking-tight text-[#f4f1e9] sm:text-2xl">
          {active.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#c6cdd6]">{active.summary}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {active.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-lg border border-[#242a31] bg-[#181c20] px-2.5 py-1 text-xs text-[#d6dce4]"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-5 grid gap-2.5 border-t border-[#242a31] pt-4 sm:grid-cols-2">
          <Link
            to={active.course.to}
            className="group flex min-h-[44px] items-center justify-between rounded-xl bg-[#d6fe52] px-4 py-2 text-xs font-bold text-[#101214] transition-opacity hover:opacity-95"
          >
            <span>Course: {active.course.label}</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to={active.lab.to}
            className="group flex min-h-[44px] items-center justify-between rounded-xl border border-[#2c333c] bg-[#242a31] px-4 py-2 text-xs font-semibold text-[#f4f1e9] transition-colors hover:border-[#f4f1e9]/40"
          >
            <span>Lab: {active.lab.label}</span>
            <ArrowRight className="size-4 text-[#d6fe52]" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function SkillUniverseExplorer() {
  const [selectedId, setSelectedId] = useState<string>("analyze");
  const active = SKILL_WORLDS.find((w) => w.id === selectedId) ?? SKILL_WORLDS[0];
  const style = ACCENT_STYLES[active.accent];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        {SKILL_WORLDS.map((world) => {
          const isSelected = world.id === active.id;
          const s = ACCENT_STYLES[world.accent];
          return (
            <button
              key={world.id}
              type="button"
              onClick={() => setSelectedId(world.id)}
              className={cn(
                "flex min-h-[58px] items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-all",
                isSelected
                  ? "border-[#d6fe52]/60 bg-[#242a31] text-white"
                  : "border-[#242a31] bg-[#161a1f] text-[#b4bac4] hover:border-[#3a424d] hover:text-white",
              )}
            >
              <span className="min-w-0">
                <span className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider uppercase">
                  <span className={cn("size-2 rounded-full", s.dot)} aria-hidden="true" />
                  {world.code}
                </span>
                <span className="font-display mt-0.5 block truncate text-base font-semibold text-[#f4f1e9]">
                  {world.title}
                </span>
              </span>
              <ArrowRight
                className={cn(
                  "size-4 shrink-0 transition-transform",
                  isSelected ? "translate-x-0.5 text-[#d6fe52]" : "opacity-40",
                )}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>

      <div className={cn("rounded-xl border bg-[#161a1f] p-6 sm:p-8", style.border)}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs font-semibold",
              style.badge,
            )}
          >
            {active.code} TERRITORY
          </span>
          <span className="font-mono text-xs text-[#9ea7b4]">{active.course.meta}</span>
        </div>

        <h3 className="font-display mt-4 text-2xl font-semibold tracking-tight text-[#f4f1e9] sm:text-3xl">
          {active.tagline}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#c6cdd6] sm:text-base">{active.summary}</p>

        <div className="mt-6 grid gap-4 border-y border-[#242a31] py-5 sm:grid-cols-2">
          <div>
            <p className="font-mono text-xs font-semibold tracking-wider text-[#9ea7b4] uppercase">
              Skills you build
            </p>
            <ul className="mt-2.5 space-y-1.5 text-sm text-[#f4f1e9]">
              {active.skills.map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className={cn("size-1.5 rounded-full", style.dot)} aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs font-semibold tracking-wider text-[#9ea7b4] uppercase">
              Tools &amp; finished work
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {active.tools.map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-[#2c333c] bg-[#101214] px-2.5 py-1 font-mono text-xs text-[#d6dce4]"
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[#b4bac4]">
              <strong className="text-[#f4f1e9]">Output: </strong>
              {active.output}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Link
            to={active.course.to}
            className="flex flex-col justify-between rounded-xl border border-[#d6fe52]/40 bg-[#d6fe52]/10 p-3.5 transition-colors hover:bg-[#d6fe52]/18"
          >
            <GraduationCap className="size-4 text-[#d6fe52]" aria-hidden="true" />
            <span className="mt-2 block text-xs font-semibold text-[#f4f1e9]">
              {active.course.label}
            </span>
            <span className="mt-0.5 block font-mono text-xs text-[#d6fe52]">View syllabus →</span>
          </Link>
          <Link
            to={active.lab.to}
            className="flex flex-col justify-between rounded-xl border border-[#2c333c] bg-[#101214] p-3.5 transition-colors hover:border-[#7774ff]/60"
          >
            <Terminal className="size-4 text-[#7774ff]" aria-hidden="true" />
            <span className="mt-2 block text-xs font-semibold text-[#f4f1e9]">
              {active.lab.label}
            </span>
            <span className="mt-0.5 block font-mono text-xs text-[#a6a4ff]">Open lab →</span>
          </Link>
          <Link
            to={active.note.to}
            className="flex flex-col justify-between rounded-xl border border-[#2c333c] bg-[#101214] p-3.5 transition-colors hover:border-[#f17c52]/60"
          >
            <BookOpen className="size-4 text-[#f17c52]" aria-hidden="true" />
            <span className="mt-2 block text-xs font-semibold text-[#f4f1e9]">
              {active.note.label}
            </span>
            <span className="mt-0.5 block font-mono text-xs text-[#f17c52]">Read free →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
