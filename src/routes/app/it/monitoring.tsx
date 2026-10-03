"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, Activity, Globe, Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useItServices, useItServiceItems } from "@/lib/query/it";
import type { ItService } from "@/lib/api/it";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/it/monitoring")({
  head: () => ({
    meta: [
      { title: "Monitoring — CEA-OS" },
      { name: "description", content: "System health and network monitoring." },
    ],
  }),
  component: ItMonitoring,
});

const statusTone: Record<string, string> = {
  healthy: "bg-success/10 text-success",
  degraded: "bg-warning/10 text-warning",
  down: "bg-destructive/10 text-destructive",
};

function ItMonitoring() {
  const query = useItServices();
  const services = useItServiceItems();

  const healthy = services.filter((s) => s.status === "healthy").length;
  const degraded = services.filter((s) => s.status !== "healthy").length;
  const uptimes = services.map((s) => Number.parseFloat(s.uptime)).filter((n) => !Number.isNaN(n));
  const avgUptime =
    uptimes.length > 0 ? (uptimes.reduce((sum, n) => sum + n, 0) / uptimes.length).toFixed(2) : "—";

  return (
    <AppShell
      roleKey="it"
      title="System monitoring"
      subtitle={
        services.length > 0
          ? `${services.length} services · ${avgUptime}% avg uptime · ${degraded} alert${degraded === 1 ? "" : "s"} today`
          : "Loading services…"
      }
      actions={
        <>
          <Badge
            className={cn(
              "border-0 font-semibold",
              degraded > 0 ? "bg-warning/10 text-warning" : "bg-success/10 text-success",
            )}
          >
            {degraded > 0 ? `${degraded} degraded` : "Stable"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/it-support">
              <ArrowLeft className="size-4" /> IT Support portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Services",
            value: services.length > 0 ? String(services.length) : "—",
            delta: `${healthy} healthy`,
            icon: Server,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Healthy",
            value: healthy > 0 ? String(healthy) : "—",
            delta: "operational",
            icon: Globe,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Degraded",
            value: degraded > 0 ? String(degraded) : "0",
            delta: "needs attention",
            icon: Activity,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Avg uptime",
            value: avgUptime !== "—" ? `${avgUptime}%` : "—",
            delta: "tracked services",
            icon: Activity,
            tone: "bg-learning/10 text-learning",
          },
        ].map((k) => (
          <Card key={k.label} className="bg-card shadow-soft border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                  {k.label}
                </p>
                <span className={cn("grid size-8 place-items-center rounded-lg", k.tone)}>
                  <k.icon className="size-4" />
                </span>
              </div>
              <p className="font-display mt-3 text-2xl font-extrabold">{k.value}</p>
              <p className="text-muted-foreground mt-0.5 text-xs font-semibold">{k.delta}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Globe className="text-primary size-4" /> Service health
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<ItService[]>
            query={query}
            error={{ title: "Services unavailable" }}
            empty={{
              title: "No services yet",
              description: "Monitored services will show here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) =>
              rows.map((s) => (
                <div
                  key={s.id}
                  className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{s.name}</p>
                    <p className="text-muted-foreground text-xs">Latency {s.latency}</p>
                  </div>
                  <Badge
                    className={cn(
                      "border-0 font-semibold",
                      statusTone[s.status] ?? "bg-muted/20 text-muted-foreground",
                    )}
                  >
                    Uptime {s.uptime}
                  </Badge>
                </div>
              ))
            }
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
