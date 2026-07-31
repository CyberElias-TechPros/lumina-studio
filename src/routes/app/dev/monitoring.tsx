import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Activity, Bug, Cpu, Server, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
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

const errors = [
  {
    e: "API · 500 on /invoices",
    c: "2 in 24h",
    s: "New",
    tone: "bg-destructive/10 text-destructive",
  },
  {
    e: "Web · JS error on dashboard",
    c: "1.2% sessions",
    s: "Investigating",
    tone: "bg-warning/10 text-warning",
  },
  {
    e: "Worker · timeout in email queue",
    c: "3 in 24h",
    s: "Fixed",
    tone: "bg-success/10 text-success",
  },
];

function DevMonitoring() {
  return (
    <AppShell
      roleKey="instructor"
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
          {errors.map((e) => (
            <div key={e.e} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs font-bold">{e.e}</p>
                <p className="text-muted-foreground text-xs">{e.c}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", e.tone)}>{e.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Trace
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
