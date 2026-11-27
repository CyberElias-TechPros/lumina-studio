"use client";

import { useEffect, useMemo, useState } from "react";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowUpRight,
  BookOpenCheck,
  Clock,
  ExternalLink,
  Github,
  Landmark,
  Link2,
  Rocket,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import type { CurriculumCourse } from "@/data/open-curriculum";
import { cn } from "@/lib/utils";

type Props = {
  courses: CurriculumCourse[];
  departments: { slug: string; id: string; title: string }[];
};

const licenseStyles: Record<string, string> = {
  "cea-internal": "border-primary/40 bg-primary/10 text-primary",
  mit: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  bsd3: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  apache2: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  cc0: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "cc-by": "border-sky-500/40 bg-sky-500/10 text-sky-600 dark:text-sky-400",
  "cc-by-sa": "border-sky-500/40 bg-sky-500/10 text-sky-600 dark:text-sky-400",
  "cc-by-nc-sa": "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  gpl3: "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  busl: "border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-400",
  proprietary: "border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-400",
  unlicensed: "border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-400",
  "external-free": "border-violet-500/40 bg-violet-500/10 text-violet-600 dark:text-violet-400",
};

function licenseBadgeLabel(course: CurriculumCourse) {
  if (course.licenseKind === "cea-internal") return "CEA original";
  if (course.canHostInApp) return `${course.license} · adaptable`;
  return `${course.license} · link-only`;
}

export function CurriculumDirectory({ courses, departments }: Props) {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState<string>("all");
  const [level, setLevel] = useState<string>("all");
  const [delivery, setDelivery] = useState<"all" | "hosted" | "linked">("all");
  const [visible, setVisible] = useState(24);

  const departmentName = useMemo(
    () => new Map(departments.map((d) => [d.slug, d.title])),
    [departments],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((course) => {
      if (department !== "all" && course.department !== department) return false;
      if (level !== "all" && String(course.level) !== level) return false;
      if (delivery === "hosted" && !course.canHostInApp) return false;
      if (delivery === "linked" && course.canHostInApp) return false;
      if (!q) return true;
      const haystack = [
        course.title,
        course.sourceName,
        course.repo ?? "",
        course.summary,
        course.skills.join(" "),
        course.license,
        departmentName.get(course.department) ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return q.split(/\s+/).every((token) => haystack.includes(token));
    });
  }, [courses, query, department, level, delivery, departmentName]);

  useEffect(() => {
    setVisible(24);
  }, [query, department, level, delivery]);

  const shown = filtered.slice(0, visible);

  return (
    <div>
      {/* ── Controls ─────────────────────────────────────────────────── */}
      <div className="border-foreground/10 bg-card rounded-xl border p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <Search
              className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search courses, skills, sources, licences…"
              aria-label="Search the open curriculum directory"
              className="border-foreground/15 bg-background focus:border-primary h-11 w-full rounded-full border pr-4 pl-11 text-sm outline-none transition-colors"
            />
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
              aria-label="Filter by department"
              className="border-foreground/15 bg-background focus:border-primary h-11 rounded-full border px-4 text-sm outline-none"
            >
              <option value="all">All departments</option>
              {departments.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.id} · {d.title}
                </option>
              ))}
            </select>
            <select
              value={level}
              onChange={(event) => setLevel(event.target.value)}
              aria-label="Filter by level"
              className="border-foreground/15 bg-background focus:border-primary h-11 rounded-full border px-4 text-sm outline-none"
            >
              <option value="all">All levels</option>
              <option value="1">Level 1 — Foundations</option>
              <option value="2">Level 2 — Professional</option>
              <option value="3">Level 3 — Advanced</option>
            </select>
            <div
              className="border-foreground/15 inline-flex h-11 items-center rounded-full border p-1"
              role="group"
              aria-label="Filter by hosting"
            >
              {(
                [
                  ["all", "All"],
                  ["hosted", "Hosted / CEA"],
                  ["linked", "Link-only"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setDelivery(value)}
                  aria-pressed={delivery === value}
                  className={cn(
                    "h-9 rounded-full px-3.5 text-xs font-semibold transition-colors",
                    delivery === value
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
            {(query || department !== "all" || level !== "all" || delivery !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setDepartment("all");
                  setLevel("all");
                  setDelivery("all");
                }}
                className="text-muted-foreground hover:text-foreground inline-flex h-11 items-center gap-1.5 rounded-full px-3 text-xs font-semibold"
              >
                <X className="size-3.5" aria-hidden="true" /> Clear
              </button>
            )}
          </div>
        </div>
        <p className="text-muted-foreground mt-3 text-xs" aria-live="polite">
          Showing{" "}
          <span className="text-foreground font-semibold tabular-nums">{filtered.length}</span> of{" "}
          <span className="tabular-nums">{courses.length}</span> verified courses
        </p>
      </div>

      {/* ── Results ───────────────────────────────────────────────────── */}
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {shown.map((course) => (
          <li
            key={course.slug}
            className="border-foreground/10 bg-card flex h-full flex-col rounded-xl border p-5"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-muted-foreground font-mono text-[9px] tracking-[0.2em] uppercase">
                {departmentName.get(course.department)}
              </span>
              <span aria-hidden="true" className="text-foreground/20">
                •
              </span>
              <span className="text-muted-foreground font-mono text-[9px] tracking-[0.2em] uppercase">
                Level {course.level}
              </span>
              {course.launchPriority ? (
                <span className="border-primary/40 bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[8px] tracking-[0.18em] uppercase">
                  <Rocket className="size-3" aria-hidden="true" /> Launch #{course.launchPriority}
                </span>
              ) : null}
            </div>

            <h3 className="font-display mt-3 text-lg leading-snug font-semibold tracking-tight">
              {course.title}
            </h3>
            <p className="text-muted-foreground mt-2 text-[13px] leading-relaxed">
              {course.summary}
            </p>

            <dl className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px]">
              <div className="inline-flex items-center gap-1.5">
                <Clock className="text-muted-foreground size-3.5" aria-hidden="true" />
                <span className="font-semibold tabular-nums">
                  {course.ceaWeeks} weeks · {course.ceaFormat}
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                {course.canHostInApp ? (
                  <Landmark className="text-muted-foreground size-3.5" aria-hidden="true" />
                ) : (
                  <Link2 className="text-muted-foreground size-3.5" aria-hidden="true" />
                )}
                <span className="text-muted-foreground">{course.sourceName}</span>
              </div>
            </dl>

            <div className="mt-3">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[8px] tracking-[0.16em] uppercase",
                  licenseStyles[course.licenseKind],
                )}
                title={course.licenseNote}
              >
                {course.canHostInApp ? (
                  <ShieldCheck className="size-3" aria-hidden="true" />
                ) : (
                  <ExternalLink className="size-3" aria-hidden="true" />
                )}
                {licenseBadgeLabel(course)}
              </span>
            </div>

            <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Skills">
              {course.skills.slice(0, 5).map((skill) => (
                <li
                  key={skill}
                  className="border-foreground/12 bg-muted/40 rounded-full border px-2 py-0.5 text-[10px]"
                >
                  {skill}
                </li>
              ))}
            </ul>

            <div className="border-foreground/10 mt-auto flex flex-wrap items-center justify-between gap-3 border-t pt-3">
              {course.hostedPath ? (
                <Link
                  to={course.hostedPath}
                  className="text-primary inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
                >
                  <BookOpenCheck className="size-3.5" aria-hidden="true" /> Open hosted curriculum
                </Link>
              ) : course.ceaCourseSlug ? (
                <Link
                  to="/classes/$courseSlug"
                  params={{ courseSlug: course.ceaCourseSlug }}
                  className="text-primary inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
                >
                  <BookOpenCheck className="size-3.5" aria-hidden="true" /> View CEA course
                </Link>
              ) : (
                <a
                  href={course.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
                >
                  {course.repo ? (
                    <Github className="size-3.5" aria-hidden="true" />
                  ) : (
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  )}
                  Open source curriculum
                </a>
              )}
              <span className="text-muted-foreground text-[10px]">{course.ceaFormat}</span>
            </div>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="border-foreground/10 bg-muted/30 mt-6 rounded-xl border p-8 text-center text-sm">
          Nothing matches that search. Try a broader skill — e.g. “python”, “network”, “security”,
          “design”.
        </p>
      )}

      {filtered.length > visible && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setVisible((n) => n + 24)}
            className="border-foreground/15 hover:border-primary/50 hover:text-primary inline-flex h-11 items-center rounded-full border px-6 text-sm font-semibold transition-colors"
          >
            Show {Math.min(24, filtered.length - visible)} more of {filtered.length}
          </button>
        </div>
      )}
    </div>
  );
}
