"use client";

/**
 * Shared, data-driven role portal. Every /portal/<slug> page is a thin config
 * on top of this: live metrics + activity from GET /v1/portal/summary (scoped
 * server-side to what the signed-in role may see) and module shortcuts from
 * the role's real app navigation.
 */
import { Link } from "@/lib/next-compat/router";
import { ArrowRight, Bell, Lock, LogIn, RefreshCw } from "lucide-react";
import { AppShell, appRoles } from "@/components/app/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { usePortalSummary } from "@/lib/query/portal";
import type { PortalMetric } from "@/lib/api/portal";
import { ApiError } from "@/lib/errors";

export interface PortalConfig {
  /** Slug passed to the summary API, e.g. "finance". */
  slug: string;
  /** appRoles key whose navigation provides the module shortcuts. */
  roleKey: string;
  title: string;
  subtitle: string;
  /** Big editorial line for the workspace hero band. */
  spotlight?: string;
  /** Supporting line under the spotlight. */
  tagline?: string;
}

const TONE_BY_GRADIENT: Record<string, string> = {
  "bg-gradient-learning": "learning",
  "bg-gradient-erp": "erp",
  "bg-gradient-career": "career",
  "bg-gradient-community": "community",
  "bg-gradient-services": "services",
};

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

export function formatMetric(m: Pick<PortalMetric, "value" | "format">): string {
  if (m.format === "naira") return naira.format(m.value / 100);
  if (m.format === "percent") return `${m.value}%`;
  return new Intl.NumberFormat("en-NG").format(m.value);
}

function relTime(iso: string): string {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return iso;
  const mins = Math.round((Date.now() - t) / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (mins < 1440) return `${Math.round(mins / 60)}h ago`;
  return new Date(t).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function PortalPage({ config }: { config: PortalConfig }) {
  const summary = usePortalSummary(config.slug);
  const role = appRoles.find((r) => r.key === config.roleKey) ?? appRoles[0];
  const modules = role.nav.filter((n) => n.to);
  const unauthenticated = summary.error instanceof ApiError && summary.error.status === 401;

  return (
    <AppShell
      roleKey={config.roleKey}
      title={config.title}
      subtitle={config.subtitle}
      actions={
        summary.data?.restricted ? (
          <Badge variant="secondary" className="gap-1 font-semibold">
            <Lock className="size-3" /> Personal view
          </Badge>
        ) : undefined
      }
    >
      {/* Role hero band — the workspace's front door, in the same accent grammar as marketing */}
      <section
        data-tone={TONE_BY_GRADIENT[role.gradient] ?? "erp"}
        className="cea-role-hero mb-5 px-6 py-7 sm:px-8 sm:py-9"
        aria-label={`${role.label} workspace`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(120% 90% at 75% 10%, black, transparent 70%)",
            WebkitMaskImage: "radial-gradient(120% 90% at 75% 10%, black, transparent 70%)",
          }}
        />
        <p className="font-mono text-[9px] font-semibold tracking-[0.28em] text-white/80 uppercase">
          CEA-OS · {role.label} workspace
        </p>
        <h2 className="font-display mt-3 max-w-3xl text-3xl leading-[1.02] font-semibold tracking-[-0.03em] text-balance sm:text-4xl lg:text-5xl">
          {config.spotlight ?? config.title}
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
          {config.tagline ?? config.subtitle}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          {modules.slice(0, 3).map((m) => (
            <Link
              key={m.to}
              to={m.to as string}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/60 hover:bg-white/20"
            >
              {m.label}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      {unauthenticated ? (
        <div className="cea-panel flex flex-col items-start gap-3 rounded-xl p-6">
          <p className="cea-kicker">Locked workspace</p>
          <p className="font-display text-2xl font-semibold tracking-tight">
            Sign in to open your portal
          </p>
          <p className="text-muted-foreground max-w-md text-sm">
            Portal figures are live and specific to your account and role.
          </p>
          <Button
            asChild
            className="bg-gradient-brand text-white shadow-glow mt-1 border-0 transition-transform hover:-translate-y-0.5"
          >
            <Link to="/auth/sign-in">
              <LogIn className="mr-1.5 size-4" /> Sign in
            </Link>
          </Button>
        </div>
      ) : (
        <>
          {summary.data?.restricted && (
            <p className="text-muted-foreground mb-4 text-sm">
              Organisation-wide figures for this portal are limited to its team. You're seeing your
              own summary.
            </p>
          )}

          {summary.isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-28 rounded-xl" />
              ))}
            </div>
          ) : summary.isError ? (
            <div className="cea-panel flex items-center justify-between gap-3 rounded-xl p-5">
              <p className="text-sm">We couldn't load live figures right now.</p>
              <Button variant="outline" size="sm" onClick={() => void summary.refetch()}>
                <RefreshCw className="mr-1.5 size-3.5" /> Retry
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {summary.data?.metrics.map((m) => (
                <div key={m.key} className="cea-metric-card p-5">
                  <p className="cea-kicker">{m.label}</p>
                  <p className="cea-metric-numeral font-display mt-3 text-3xl font-semibold tracking-tight">
                    {formatMetric(m)}
                  </p>
                  {m.hint && (
                    <p className="text-muted-foreground mt-1 text-xs font-medium">{m.hint}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 grid gap-5 lg:grid-cols-5">
            <div className="cea-panel rounded-xl p-5 lg:col-span-3">
              <p className="cea-kicker mb-4 flex items-center justify-between border-b pb-3">
                Modules
                <span className="text-muted-foreground/70 font-mono text-[9px] tracking-[0.2em] normal-case">
                  {modules.length} doors
                </span>
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {modules.map((m) => (
                  <Link
                    key={m.to}
                    to={m.to as string}
                    className="group hover:border-primary-glow/40 hover:bg-primary/5 flex items-center justify-between rounded-xl border border-foreground/10 px-3.5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-primary-glow grid size-7 place-items-center rounded-lg bg-foreground/[0.04] [&>svg]:size-4">
                        {m.icon}
                      </span>
                      {m.label}
                    </span>
                    <ArrowRight className="text-muted-foreground size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="cea-panel rounded-xl p-5 lg:col-span-2">
              <p className="cea-kicker mb-4 flex items-center gap-2 border-b pb-3">
                <Bell className="text-primary-glow size-3.5" aria-hidden="true" /> Recent activity
              </p>
              {summary.data && summary.data.activity.length === 0 ? (
                <EmptyState
                  title="All caught up"
                  description="New notifications for your account will appear here."
                />
              ) : (
                <ul className="space-y-4">
                  {summary.data?.activity.map((a) => (
                    <li key={a.id} data-read={a.read} className="cea-activity-item">
                      <div className="flex items-start justify-between gap-3">
                        <p
                          className={
                            a.read ? "text-muted-foreground text-sm" : "text-sm font-semibold"
                          }
                        >
                          {a.title}
                        </p>
                        <span className="text-muted-foreground/80 shrink-0 font-mono text-[10px]">
                          {relTime(a.time)}
                        </span>
                      </div>
                      {a.body && (
                        <p className="text-muted-foreground mt-0.5 text-xs leading-snug">
                          {a.body}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-primary-glow hover:text-primary-glow mt-4 px-0 font-semibold"
              >
                <Link to="/app/notifications">
                  All notifications <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </AppShell>
  );
}
