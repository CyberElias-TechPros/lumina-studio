"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CircleHelp,
  GraduationCap,
  Search,
  Terminal,
  X,
} from "lucide-react";
import { Link } from "@/lib/next-compat/router";
import type { BlogPost } from "@/data/blog";
import type { AcademyCourse } from "@/data/academy/types";
import type { BuiltInLabEntry } from "@/data/cea-lab-registry";

type SearchIndexData = {
  courses: AcademyCourse[];
  notes: BlogPost[];
  labs: BuiltInLabEntry[];
  faqs: { q: string; a: string }[];
  formatFee: (n: number) => string;
};

const SOLUTIONS_INDEX = [
  {
    title: "Digital Presence & Websites",
    summary: "Public websites, portals, business profiles and digital identity.",
    to: "/services",
  },
  {
    title: "IT Infrastructure & Networks",
    summary: "Networks, office workstations, setup, diagnostics and maintenance.",
    to: "/services",
  },
  {
    title: "Business Systems & Records",
    summary: "Inventory, invoices, digital workflows and spreadsheet automation.",
    to: "/services",
  },
  {
    title: "Custom Software & Development",
    summary: "Web apps, portals, integrations and project discovery.",
    to: "/request-project",
  },
];

const QUICK_PROMPTS = ["Excel", "Web design", "Typing", "Graphic design", "SQL", "Cybersecurity"];

export function GlobalSearchTrigger({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search Cyber Elias Academy (Command K)"
        className={
          className ??
          "border-border bg-muted/60 text-muted-foreground hover:border-foreground/30 hover:text-foreground inline-flex h-9 items-center gap-2 rounded-full border px-3 text-xs font-medium transition-colors"
        }
      >
        <Search className="size-3.5" aria-hidden="true" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="border-border bg-background text-muted-foreground hidden rounded px-1.5 py-0.5 font-mono text-[10px] sm:inline">
          ⌘K
        </kbd>
      </button>

      {open && <GlobalSearchModal onClose={() => setOpen(false)} />}
    </>
  );
}

function GlobalSearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [indexData, setIndexData] = useState<SearchIndexData | null>(null);

  useEffect(() => {
    let active = true;
    Promise.all([
      import("@/data/academy"),
      import("@/data/blog"),
      import("@/data/cea-lab-registry"),
      import("@/data/site"),
    ]).then(([academyMod, blogMod, labsMod, siteMod]) => {
      if (!active) return;
      setIndexData({
        courses: academyMod.flyerCourses,
        formatFee: academyMod.formatFee,
        notes: blogMod.blogPosts,
        labs: labsMod.CEA_BUILT_IN_LABS,
        faqs: siteMod.faqs,
      });
    });
    return () => {
      active = false;
    };
  }, []);

  const q = query.trim().toLowerCase();

  const matches = useMemo(() => {
    if (!indexData) {
      return {
        courses: [],
        labs: [],
        notes: [],
        services: SOLUTIONS_INDEX.slice(0, 3),
        faqHits: [],
      };
    }

    const courses = indexData.courses
      .filter(
        (c) =>
          !q ||
          c.title.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.hook.toLowerCase().includes(q) ||
          c.deliverable.title.toLowerCase().includes(q),
      )
      .slice(0, q ? 5 : 3);

    const labs = indexData.labs
      .filter(
        (l) =>
          !q ||
          l.headline.toLowerCase().includes(q) ||
          l.badge.toLowerCase().includes(q) ||
          l.blurb.toLowerCase().includes(q),
      )
      .slice(0, q ? 5 : 3);

    const notes = indexData.notes
      .filter(
        (p) =>
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q),
      )
      .slice(0, q ? 6 : 4);

    const services = SOLUTIONS_INDEX.filter(
      (s) => !q || s.title.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q),
    ).slice(0, 3);

    const faqHits = q
      ? indexData.faqs
          .filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
          .slice(0, 3)
      : [];

    return { courses, labs, notes, services, faqHits };
  }, [indexData, q]);

  const total =
    matches.courses.length +
    matches.labs.length +
    matches.notes.length +
    matches.services.length +
    matches.faqHits.length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Cyber Elias Academy"
      className="fixed inset-0 z-[100] flex items-start justify-center bg-[#101214]/75 p-4 pt-12 backdrop-blur-sm sm:pt-20"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-[#2c333c] bg-[#101214] text-[#f4f1e9] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-[#2c333c] px-4 py-3.5">
          <Search className="size-4.5 shrink-0 text-[#d6fe52]" aria-hidden="true" />
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to learn, practise, or build?"
            className="w-full bg-transparent text-sm text-[#f4f1e9] placeholder:text-[#9ea7b4] focus:outline-none sm:text-base"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="grid size-8 shrink-0 place-items-center rounded-full border border-[#2c333c] text-[#b4bac4] hover:border-[#f4f1e9]/40 hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 border-b border-[#242a31] bg-[#16191d] px-4 py-2.5 text-xs">
          <span className="mr-1 font-mono text-[#9ea7b4]">Try:</span>
          {QUICK_PROMPTS.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => setQuery(term)}
              className="rounded-full border border-[#2c333c] bg-[#242a31] px-2.5 py-0.5 text-xs text-[#f4f1e9] transition-colors hover:border-[#d6fe52] hover:text-[#d6fe52]"
            >
              {term}
            </button>
          ))}
        </div>

        <div className="max-h-[65vh] space-y-5 overflow-y-auto p-4 sm:p-5">
          {!indexData ? (
            <p className="py-6 text-center font-mono text-xs text-[#9ea7b4]">
              Loading CEA ecosystem index…
            </p>
          ) : total === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm text-[#b4bac4]">
                No direct match for &ldquo;{query}&rdquo;. Explore courses or browse all 210 free
                lessons.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2.5">
                <Link
                  to="/classes"
                  onClick={onClose}
                  className="rounded-full bg-[#d6fe52] px-4 py-2 text-xs font-semibold text-[#101214]"
                >
                  Browse courses
                </Link>
                <Link
                  to="/blog"
                  onClick={onClose}
                  className="rounded-full border border-[#2c333c] px-4 py-2 text-xs font-semibold text-[#f4f1e9]"
                >
                  Open Notes library
                </Link>
              </div>
            </div>
          ) : (
            <>
              {matches.courses.length > 0 && (
                <div>
                  <p className="mb-2 flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-[#d6fe52] uppercase">
                    <GraduationCap className="size-3.5" aria-hidden="true" />
                    Courses
                  </p>
                  <ul className="space-y-1.5">
                    {matches.courses.map((course) => (
                      <li key={course.slug}>
                        <Link
                          to="/classes/$courseSlug"
                          params={{ courseSlug: course.slug }}
                          onClick={onClose}
                          className="group flex items-center justify-between gap-3 rounded-xl border border-[#242a31] bg-[#181c20] px-3.5 py-2.5 transition-colors hover:border-[#d6fe52]/60"
                        >
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-semibold text-[#f4f1e9] group-hover:text-[#d6fe52]">
                              {course.title}
                            </span>
                            <span className="block truncate text-xs text-[#9ea7b4]">
                              {course.weeks} weeks · {course.deliverable.title}
                            </span>
                          </span>
                          <span className="shrink-0 font-mono text-xs font-semibold text-[#d6fe52] tabular-nums">
                            {indexData.formatFee(course.fee)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {matches.labs.length > 0 && (
                <div>
                  <p className="mb-2 flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-[#7774ff] uppercase">
                    <Terminal className="size-3.5" aria-hidden="true" />
                    Practice Lab
                  </p>
                  <ul className="space-y-1.5">
                    {matches.labs.map((lab) => (
                      <li key={lab.to}>
                        <Link
                          to={lab.to}
                          onClick={onClose}
                          className="group flex items-center justify-between gap-3 rounded-xl border border-[#242a31] bg-[#181c20] px-3.5 py-2.5 transition-colors hover:border-[#7774ff]/70"
                        >
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-semibold text-[#f4f1e9] group-hover:text-[#a6a4ff]">
                              {lab.headline}
                            </span>
                            <span className="block truncate text-xs text-[#9ea7b4]">
                              {lab.badge} · {lab.meta}
                            </span>
                          </span>
                          <ArrowRight
                            className="size-4 shrink-0 text-[#9ea7b4] group-hover:text-[#a6a4ff]"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {matches.notes.length > 0 && (
                <div>
                  <p className="mb-2 flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-[#f17c52] uppercase">
                    <BookOpen className="size-3.5" aria-hidden="true" />
                    Learn · Free Notes
                  </p>
                  <ul className="space-y-1.5">
                    {matches.notes.map((post) => (
                      <li key={post.slug}>
                        <Link
                          to="/blog/$slug"
                          params={{ slug: post.slug }}
                          onClick={onClose}
                          className="group flex items-center justify-between gap-3 rounded-xl border border-[#242a31] bg-[#181c20] px-3.5 py-2.5 transition-colors hover:border-[#f17c52]/70"
                        >
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-semibold text-[#f4f1e9] group-hover:text-[#f17c52]">
                              Lesson {post.order}: {post.title}
                            </span>
                            <span className="block truncate text-xs text-[#9ea7b4]">
                              {post.excerpt}
                            </span>
                          </span>
                          <ArrowRight
                            className="size-4 shrink-0 text-[#9ea7b4] group-hover:text-[#f17c52]"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {matches.services.length > 0 && (
                <div>
                  <p className="mb-2 flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-[#b4bac4] uppercase">
                    <Briefcase className="size-3.5" aria-hidden="true" />
                    Digital Solutions
                  </p>
                  <ul className="space-y-1.5">
                    {matches.services.map((svc) => (
                      <li key={svc.title}>
                        <Link
                          to={svc.to}
                          onClick={onClose}
                          className="group flex items-center justify-between gap-3 rounded-xl border border-[#242a31] bg-[#181c20] px-3.5 py-2.5 transition-colors hover:border-white/40"
                        >
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-semibold text-[#f4f1e9]">
                              {svc.title}
                            </span>
                            <span className="block truncate text-xs text-[#9ea7b4]">
                              {svc.summary}
                            </span>
                          </span>
                          <ArrowRight
                            className="size-4 shrink-0 text-[#9ea7b4]"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {matches.faqHits.length > 0 && (
                <div>
                  <p className="mb-2 flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-[#b4bac4] uppercase">
                    <CircleHelp className="size-3.5" aria-hidden="true" />
                    Questions
                  </p>
                  <ul className="space-y-1.5">
                    {matches.faqHits.map((faq) => (
                      <li key={faq.q}>
                        <Link
                          to="/faq"
                          onClick={onClose}
                          className="block rounded-xl border border-[#242a31] bg-[#181c20] px-3.5 py-2.5 hover:border-white/40"
                        >
                          <span className="block text-sm font-semibold text-[#f4f1e9]">
                            {faq.q}
                          </span>
                          <span className="mt-0.5 line-clamp-2 block text-xs text-[#9ea7b4]">
                            {faq.a}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
