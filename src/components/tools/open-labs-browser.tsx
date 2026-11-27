"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  ExternalLink,
  Play,
  Search,
  X,
} from "lucide-react";
import {
  CEA_LAB_VERIFIED_DATE,
  CEA_OPEN_LAB_FEASIBILITY,
  type FeasibilityVerdict,
  type OpenLabFeasibilityEntry,
} from "@/data/cea-lab-registry";
import { cn } from "@/lib/utils";

const VERDICT_META: Record<FeasibilityVerdict, { label: string; tone: string }> = {
  "opt-in-embed": {
    label: "Safe Opt-In Embed",
    tone: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  },
  "adopt-client-library": {
    label: "Client Library (npm / WASM)",
    tone: "bg-blue-500/12 text-blue-700 dark:text-blue-300 border-blue-500/30",
  },
  "built-natively": {
    label: "Built Natively in CEA",
    tone: "bg-primary/12 text-primary border-primary/30",
  },
  "link-only-study": {
    label: "Link-Only Study Tool",
    tone: "bg-amber-500/12 text-amber-700 dark:text-amber-300 border-amber-500/30",
  },
  "not-feasible-now": {
    label: "Excluded / Restricted",
    tone: "bg-rose-500/12 text-rose-700 dark:text-rose-300 border-rose-500/30",
  },
};

export function OpenLabsBrowser() {
  const [filter, setFilter] = useState<FeasibilityVerdict | "all">("all");
  const [query, setQuery] = useState("");
  const [activeEmbed, setActiveEmbed] = useState<OpenLabFeasibilityEntry | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CEA_OPEN_LAB_FEASIBILITY.filter((item) => {
      if (filter !== "all" && item.verdict !== filter) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.repo.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.ceaTarget.toLowerCase().includes(q) ||
        item.architectureNote.toLowerCase().includes(q)
      );
    });
  }, [filter, query]);

  return (
    <div className="space-y-6">
      {/* Filter + search */}
      <div className="border-foreground/10 bg-card flex flex-col gap-4 rounded-xl border p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative min-w-[240px] flex-1">
            <Search
              className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search repositories, licences, targets (e.g. Python, SQL, MIT, Docker)..."
              aria-label="Filter open-source lab repositories"
              className="border-foreground/15 bg-background w-full rounded-full border py-2 pr-4 pl-10 text-sm focus:ring-2 focus:ring-primary/30 focus:outline-none"
            />
          </div>
          <span className="text-muted-foreground font-mono text-xs">
            Verified via GitHub API · {CEA_LAB_VERIFIED_DATE}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={cn(
              "cursor-pointer rounded-full border px-3 py-1 text-xs font-medium",
              filter === "all"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-foreground/15 hover:bg-muted",
            )}
          >
            All ({CEA_OPEN_LAB_FEASIBILITY.length})
          </button>
          {(Object.keys(VERDICT_META) as FeasibilityVerdict[]).map((v) => {
            const count = CEA_OPEN_LAB_FEASIBILITY.filter((i) => i.verdict === v).length;
            return (
              <button
                key={v}
                type="button"
                onClick={() => setFilter(v)}
                className={cn(
                  "cursor-pointer rounded-full border px-3 py-1 text-xs font-medium",
                  filter === v
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-foreground/15 hover:bg-muted",
                )}
              >
                {VERDICT_META[v].label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Active opt-in sandboxed iframe drawer */}
      {activeEmbed && activeEmbed.embedUrl && (
        <div className="border-primary/40 bg-card overflow-hidden rounded-xl border shadow-lg">
          <div className="border-foreground/10 bg-muted/50 flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
            <div>
              <p className="text-primary font-mono text-[10px] tracking-[0.2em] uppercase">
                Opt-In External Open-Source Sandbox · {activeEmbed.licenseVerified}
              </p>
              <p className="font-display text-base font-semibold">
                {activeEmbed.name} ({activeEmbed.repo})
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={activeEmbed.embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-foreground/15 hover:bg-muted inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium"
              >
                Open in new tab <ExternalLink className="size-3" />
              </a>
              <button
                type="button"
                onClick={() => setActiveEmbed(null)}
                className="border-foreground/15 hover:bg-muted inline-flex cursor-pointer items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium"
              >
                <X className="size-3.5" /> Close sandbox
              </button>
            </div>
          </div>
          <iframe
            title={`${activeEmbed.name} open-source sandbox`}
            src={activeEmbed.embedUrl}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            className="h-[520px] w-full bg-white"
          />
        </div>
      )}

      {/* Cards grid */}
      <h2 className="sr-only">Tools assessed</h2>
      <ul className="grid gap-4 md:grid-cols-2">
        {filtered.map((item) => {
          const meta = VERDICT_META[item.verdict];
          return (
            <li
              key={item.id}
              className="border-foreground/10 bg-card flex flex-col justify-between rounded-xl border p-5"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
                      meta.tone,
                    )}
                  >
                    {meta.label}
                  </span>
                  <span className="text-muted-foreground font-mono text-[11px]">
                    {item.licenseVerified} · ★ {item.stars.toLocaleString("en-US")}
                  </span>
                </div>

                <h3 className="font-display mt-3 text-xl font-semibold">{item.name}</h3>
                <p className="text-muted-foreground font-mono text-xs">
                  {item.repo} · {item.category}
                </p>

                <p className="mt-3 text-xs font-semibold text-primary">
                  CEA Target: {item.ceaTarget}
                </p>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {item.architectureNote}
                </p>
              </div>

              <div className="border-foreground/10 mt-4 flex flex-wrap items-center justify-between gap-2 border-t pt-3">
                {item.embedUrl ? (
                  <button
                    type="button"
                    onClick={() => setActiveEmbed(item)}
                    className="bg-primary text-primary-foreground inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold"
                  >
                    <Play className="size-3" aria-hidden="true" /> Launch Opt-In Sandbox
                  </button>
                ) : item.verdict === "not-feasible-now" ? (
                  <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
                    <AlertTriangle className="size-3.5 text-rose-500" aria-hidden="true" />
                    Flagged in engineering review
                  </span>
                ) : item.verdict === "built-natively" ? (
                  <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
                    <CheckCircle2 className="size-3.5 text-primary" aria-hidden="true" />
                    Built into CEA Tools
                  </span>
                ) : (
                  <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
                    <Boxes className="size-3.5" aria-hidden="true" />
                    Client library / external reference
                  </span>
                )}

                <a
                  href={item.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary inline-flex items-center gap-1 text-xs font-semibold hover:underline"
                >
                  Source <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
