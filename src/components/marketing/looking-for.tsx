"use client";

import { ArrowUpRight, Compass, GraduationCap, HelpCircle, Wrench } from "lucide-react";
import { Link } from "@/lib/next-compat/router";

/**
 * "I am looking for..." — the four doors.
 *
 * ## Why this exists
 *
 * The homepage already had a course finder and a skill explorer, but a first-time
 * visitor still had to work out which of those to open. The reference this site is
 * measured against solves that with one row of plain intentions, and it is the
 * highest-converting element on their page because it asks a question the visitor
 * already knows the answer to.
 *
 * Four doors, in the order a real visitor's intent runs:
 *
 *   1. a specific course and its fee      → /classes
 *   2. advice, because they are unsure    → /learning-trail
 *   3. a free tool to try right now       → /tools
 *   4. a question they cannot place       → /faq
 *
 * Each label is written as the visitor's own words, not as a section name. That
 * is the whole trick: "a particular product" beats "Product catalogue" for the
 * same reason "Advice" beats "Resources".
 *
 * ## Why the icons are not the point
 *
 * Icons here are 18px and load-bearing only for scanning. The label is the
 * affordance. A row of large decorative icons would make this heavier than the
 * thing it is imitating.
 */
const DOORS = [
  {
    label: "A course, and what it costs",
    detail: "Every class, every published Naira fee",
    to: "/classes",
    icon: GraduationCap,
  },
  {
    label: "Some advice — I am not sure yet",
    detail: "Answer four questions, get a starting point",
    to: "/learning-trail",
    icon: Compass,
  },
  {
    label: "A tool to try right now",
    detail: "Ten labs that open in the browser",
    to: "/tools",
    icon: Wrench,
  },
  {
    label: "An answer to a specific question",
    detail: "Fees, certificates, timetable, location",
    to: "/faq",
    icon: HelpCircle,
  },
] as const;

export function LookingFor() {
  return (
    <section aria-labelledby="looking-for-heading" className="container-page py-12 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2
          id="looking-for-heading"
          data-reveal
          data-split
          className="font-display max-w-xl text-2xl leading-tight font-semibold tracking-[-0.03em] text-balance sm:text-[2rem]"
        >
          What are you looking for?
        </h2>
        <Link
          to="/classes"
          data-reveal
          className="text-primary group inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
        >
          See everything
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {DOORS.map((door, index) => {
          const Icon = door.icon;
          return (
            <li
              key={door.to}
              data-reveal
              style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
            >
              <Link
                to={door.to}
                data-lift
                className="border-border bg-card cea-picker-item group flex h-full flex-col justify-between gap-6 rounded-xl border p-5 hover:border-[var(--cea-lime)]"
              >
                <Icon className="size-[18px] shrink-0" aria-hidden="true" />
                <span>
                  <span className="block text-sm leading-snug font-semibold">{door.label}</span>
                  <span className="text-muted-foreground mt-1 block text-xs leading-relaxed group-hover:text-inherit group-hover:opacity-70">
                    {door.detail}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
