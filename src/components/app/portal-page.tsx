/**
 * Shared, data-driven role portal. Every /portal/<slug> page is a thin config
 * on top of this: live metrics + activity from GET /v1/portal/summary (scoped
 * server-side to what the signed-in role may see) and module shortcuts from
 * the role's real app navigation.
 */
import { Link } from "@tanstack/react-router";
import { ArrowRight, Bell, Lock, LogIn, RefreshCw } from "lucide-react";
import { AppShell, appRoles } from "@/components/app/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
}

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
      {unauthenticated ? (
        <Card className="bg-card shadow-soft border">
          <CardContent className="flex flex-col items-start gap-3 p-6">
            <p className="font-display text-lg font-extrabold">Sign in to open your portal</p>
            <p className="text-muted-foreground text-sm">
              Portal figures are live and specific to your account and role.
            </p>
            <Button asChild>
              <Link to="/auth/sign-in">
                <LogIn className="mr-1.5 size-4" /> Sign in
              </Link>
            </Button>
          </CardContent>
        </Card>
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
            <Card className="bg-card border">
              <CardContent className="flex items-center justify-between gap-3 p-5">
                <p className="text-sm">We couldn't load live figures right now.</p>
                <Button variant="outline" size="sm" onClick={() => void summary.refetch()}>
                  <RefreshCw className="mr-1.5 size-3.5" /> Retry
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {summary.data?.metrics.map((m) => (
                <Card key={m.key} className="bg-card shadow-soft border">
                  <CardContent className="p-5">
                    <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                      {m.label}
                    </p>
                    <p className="font-display mt-3 text-2xl font-extrabold">{formatMetric(m)}</p>
                    {m.hint && (
                      <p className="text-muted-foreground mt-0.5 text-xs font-semibold">{m.hint}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-5 grid gap-5 lg:grid-cols-5">
            <Card className="bg-card shadow-soft border lg:col-span-3">
              <CardContent className="p-5">
                <p className="font-display mb-3 text-sm font-extrabold">Modules</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {modules.map((m) => (
                    <Link
                      key={m.to}
                      to={m.to as string}
                      className="hover:bg-muted/60 flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm font-semibold transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        {m.icon}
                        {m.label}
                      </span>
                      <ArrowRight className="text-muted-foreground size-3.5" />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-soft border lg:col-span-2">
              <CardContent className="p-5">
                <p className="font-display mb-3 flex items-center gap-2 text-sm font-extrabold">
                  <Bell className="text-primary size-4" /> Recent activity
                </p>
                {summary.data && summary.data.activity.length === 0 ? (
                  <EmptyState
                    title="All caught up"
                    description="New notifications for your account will appear here."
                  />
                ) : (
                  <ul className="divide-y">
                    {summary.data?.activity.map((a) => (
                      <li key={a.id} className="py-2.5">
                        <div className="flex items-start justify-between gap-3">
                          <p className={a.read ? "text-sm" : "text-sm font-semibold"}>{a.title}</p>
                          <span className="text-muted-foreground shrink-0 text-[11px]">
                            {relTime(a.time)}
                          </span>
                        </div>
                        {a.body && <p className="text-muted-foreground text-xs">{a.body}</p>}
                      </li>
                    ))}
                  </ul>
                )}
                <Button asChild variant="ghost" size="sm" className="mt-2 px-0 font-semibold">
                  <Link to="/app/notifications">
                    All notifications <ArrowRight className="ml-1 size-3.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </AppShell>
  );
}
