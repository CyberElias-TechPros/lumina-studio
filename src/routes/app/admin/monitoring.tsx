import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Activity, Cpu, Database, Server, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";
import { useAdmMetrics } from "@/lib/query/adminSystems";

export const Route = createFileRoute("/app/admin/monitoring")({
  head: () => ({
    meta: [
      { title: "System Monitoring — CEA-OS" },
      { name: "description", content: "Service health and platform metrics." },
    ],
  }),
  component: AdminMonitoring,
});

const CARD_ICONS = [Server, Activity, Zap, Database];

function errorTone(status: string) {
  if (/fixed|resolved|success|healthy|ok|active|connected/i.test(status)) {
    return "bg-success/10 text-success";
  }
  if (/new|critical|urgent|degraded|down/i.test(status))
    return "bg-destructive/10 text-destructive";
  return "bg-warning/10 text-warning";
}

function AdminMonitoring() {
  const metrics = useAdmMetrics();

  const allHealthy =
    (metrics.data?.services.length ?? 0) > 0 &&
    (metrics.data?.services ?? []).every((s) => /healthy|ok|active|connected/i.test(s.status));

  return (
    <AppShell
      roleKey="admin"
      title="System monitoring"
      subtitle={
        metrics.data?.generatedAt
          ? `Live service health · refreshed ${new Date(metrics.data.generatedAt).toLocaleTimeString()}`
          : "Live service health"
      }
      actions={
        <>
          {metrics.data && (
            <Badge
              className={cn(
                "border-0 font-semibold",
                allHealthy ? "bg-success/10 text-success" : "bg-warning/10 text-warning",
              )}
            >
              {allHealthy ? "Operational" : "Attention needed"}
            </Badge>
          )}
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/admin">
              <ArrowLeft className="size-4" /> Admin hub
            </Link>
          </Button>
        </>
      }
    >
      {metrics.isPending && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="bg-card shadow-soft border">
              <CardContent className="p-5">
                <div className="bg-muted h-3 w-20 animate-pulse rounded" />
                <div className="bg-muted mt-4 h-8 w-16 animate-pulse rounded" />
                <div className="bg-muted mt-2 h-3 w-24 animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {metrics.isError && (
        <Card className="bg-card shadow-soft border">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground text-sm">
              Couldn't load monitoring data.{" "}
              <button
                type="button"
                onClick={() => void metrics.refetch()}
                className="text-primary font-bold underline-offset-2 hover:underline"
              >
                Retry
              </button>
            </p>
          </CardContent>
        </Card>
      )}

      {metrics.data && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.data.cards.map((k, i) => {
              const Icon = CARD_ICONS[i % CARD_ICONS.length] ?? Server;
              return (
                <Card key={k.label} className="bg-card shadow-soft border">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                        {k.label}
                      </p>
                      <span className="bg-primary/10 text-primary grid size-8 place-items-center rounded-lg">
                        <Icon className="size-4" />
                      </span>
                    </div>
                    <p className="font-display mt-3 text-2xl font-extrabold">{k.value}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs font-semibold">{k.delta}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="bg-card mt-5 shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Activity className="text-primary size-4" /> Services
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y">
              {metrics.data.services.map((s) => (
                <div
                  key={s.name}
                  className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-sm font-bold">{s.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {s.status === "Healthy" ? "Reachable · serving traffic" : "Check the service"}
                    </p>
                  </div>
                  <Badge className={cn("border-0 font-semibold", errorTone(s.status))}>
                    {s.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </AppShell>
  );
}
