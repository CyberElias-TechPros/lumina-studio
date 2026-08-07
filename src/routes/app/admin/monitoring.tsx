import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Activity, Cpu, Gauge, Server, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admin/monitoring")({
  head: () => ({
    meta: [
      { title: "System Monitoring — CEA-OS" },
      { name: "description", content: "CPU, memory, disk and error rates." },
    ],
  }),
  component: AdminMonitoring,
});

function errorTone(status: string) {
  if (/fixed|resolved|success/i.test(status)) return "bg-success/10 text-success";
  if (/new|critical|urgent/i.test(status)) return "bg-destructive/10 text-destructive";
  return "bg-warning/10 text-warning";
}

const services = [
  { s: "web", v: "8 pods · 34% CPU", st: "Healthy", tone: "bg-success/10 text-success" },
  { s: "api", v: "6 pods · 41% CPU", st: "Healthy", tone: "bg-success/10 text-success" },
  { s: "worker", v: "3 workers · 2% idle", st: "Degraded", tone: "bg-warning/10 text-warning" },
];

function AdminMonitoring() {
  return (
    <AppShell
      roleKey="admin"
      title="System monitoring"
      subtitle="Error rate 0.3% · p95 190 ms · 5m granularity"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Within SLO</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/admin">
              <ArrowLeft className="size-4" /> Admin hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "CPU",
            value: "36%",
            delta: "peak 68%",
            icon: Cpu,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Memory",
            value: "58%",
            delta: "of 32 GB",
            icon: Gauge,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Disk",
            value: "61%",
            delta: "480 GB free",
            icon: Server,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Error rate",
            value: "0.3%",
            delta: "target < 1%",
            icon: Zap,
            tone: "bg-success/10 text-success",
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
            <Activity className="text-primary size-4" /> Services
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {services.map((s) => (
            <div key={s.s} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="font-mono text-sm font-bold">{s.s}</p>
                <p className="text-muted-foreground text-xs">{s.v}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", s.tone)}>{s.st}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Metrics
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
