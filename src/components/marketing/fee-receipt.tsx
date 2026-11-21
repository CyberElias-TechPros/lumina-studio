"use client";

import { Printer } from "lucide-react";
import { formatFee } from "@/data/academy";
import { courseFamilyTheme } from "@/lib/course-families";
import { cn } from "@/lib/utils";

export function FeeReceipt({
  title,
  slug,
  category,
  fee,
  weeks,
  sessionsCount,
  sessionsPerWeek,
  level,
  requirements,
  deliverable,
  availability,
  paymentNote,
  showPrintButton = true,
  className,
}: {
  title: string;
  slug: string;
  category: string;
  fee: number;
  weeks: number;
  sessionsCount: number;
  sessionsPerWeek: number;
  level: string;
  requirements: string[];
  deliverable: string;
  availability: string;
  paymentNote?: string;
  showPrintButton?: boolean;
  className?: string;
}) {
  const family = courseFamilyTheme(category, slug);

  return (
    <aside aria-label="Course fee receipt" className={cn("cea-receipt overflow-hidden", className)}>
      <div className="px-6 py-5 sm:px-7">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-xs font-bold tracking-[0.14em] uppercase">
              Cyber Elias Academy Ltd
            </p>
            <p className="text-muted-foreground mt-0.5 font-mono text-xs">
              RC 8413776 · 24 Ebony Road, PH
            </p>
          </div>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
              family.pill,
            )}
          >
            <span className={cn("size-1.5 rounded-full", family.dot)} aria-hidden="true" />
            {family.label}
          </span>
        </div>

        <div className="cea-receipt-rule my-4" />

        <p className="text-muted-foreground font-mono text-xs uppercase">Course receipt</p>
        <p className="font-display mt-1 text-lg font-semibold tracking-tight">{title}</p>

        <dl className="mt-4 space-y-2.5 text-sm">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-muted-foreground font-mono text-xs uppercase">Listed fee</dt>
            <dd className="font-mono text-xl font-bold tracking-tight tabular-nums">
              {formatFee(fee)}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-muted-foreground font-mono text-xs uppercase">Duration</dt>
            <dd className="font-mono text-sm font-medium tabular-nums">
              {weeks} weeks · {sessionsCount} sessions
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-muted-foreground font-mono text-xs uppercase">Pace</dt>
            <dd className="font-mono text-sm font-medium tabular-nums">
              {sessionsPerWeek} sessions / week
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-muted-foreground font-mono text-xs uppercase">Level</dt>
            <dd className="text-sm font-medium">{level}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-muted-foreground font-mono text-xs uppercase">Schedule</dt>
            <dd className="text-right text-sm font-medium">{availability}</dd>
          </div>
        </dl>

        <div className="cea-receipt-rule my-4" />

        <div className="space-y-3 text-xs leading-relaxed">
          <div>
            <p className="text-foreground font-mono font-semibold uppercase">You bring</p>
            <p className="text-muted-foreground mt-0.5">{requirements.join(" · ")}</p>
          </div>
          <div>
            <p className="text-foreground font-mono font-semibold uppercase">You leave with</p>
            <p className="text-muted-foreground mt-0.5">{deliverable}</p>
          </div>
        </div>

        <div className="cea-receipt-rule my-4" />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-xs font-semibold tracking-wider text-emerald-700 uppercase dark:text-emerald-300">
            No hidden fees
          </p>
          {showPrintButton && (
            <button
              type="button"
              onClick={() => window.print()}
              className="cea-no-print border-border bg-background hover:border-primary/40 hover:text-primary inline-flex min-h-[36px] items-center gap-1.5 rounded-full border px-3 text-xs font-semibold transition-colors"
            >
              <Printer className="size-3.5" aria-hidden="true" />
              Print 1-page guide
            </button>
          )}
        </div>
        {paymentNote && (
          <p className="text-muted-foreground mt-3 text-xs leading-relaxed">{paymentNote}</p>
        )}
      </div>
    </aside>
  );
}
