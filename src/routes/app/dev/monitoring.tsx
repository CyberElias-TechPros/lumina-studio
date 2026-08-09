import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Activity, Bug, Cpu, Server, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useDevErrors } from "@/lib/query/dev";
import type { DevError } from "@/lib/api/dev";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/dev/monitoring")({
  head: () => ({
    meta: [
      { title: "Monitoring & Errors — CEA-OS" },
      { name: "description", content: "Error tracking and service metrics." },
    ],
  }),
  component: DevMonitoring,
});

function errorTone(status: string) {
  if (/fixed|resolved|success/i.test(status)) return "bg-success/10 text-success";
  if (/new|critical|urgent/i.test(status)) return "bg-destructive/10 text-destructive";
  return "bg-warning/10 text-warning";
}

function DevMonitoring() {
  const errorsQuery = useDevErrors();

  return (
    <AppShell
      roleKey="dev"
      title="Monitoring & errors"
      subtitle="Error rate 0.4% · p95 latency 210 ms"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Within SLO</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/dev">
              <ArrowLeft className="size-4" /> Dev hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Error rate",
            value: "0.4%",
            delta: "target < 1%",
            icon: Bug,
            tone: "bg-success/10 text-success",
          },
          {
            label: "p95 latency",
            value: "210 ms",
            delta: "API-wide",
            icon: Zap,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "CPU (avg)",
            value: "38%",
            delta: "peak 72%",
            icon: Cpu,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Services",
            value: "6",
            delta: "5 healthy",
            icon: Server,
            tone: "bg-warning/10 text-warning",
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
            <Activity className="text-primary size-4" /> Recent errors
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<DevError[]>
            query={errorsQuery}
            error={{ title: "Errors unavailable" }}
            empty={{ title: "No errors", description: "Recent errors will show here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((e) => (
                  <div
                    key={e.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-xs font-bold">{e.title}</p>
                      <p className="text-muted-foreground text-xs">{e.countLabel}</p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", errorTone(e.status))}>
                      {e.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      Trace
                    </Button>
                  </div>
                ))}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
