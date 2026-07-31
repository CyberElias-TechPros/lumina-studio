import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Activity, Cpu, Globe, MemoryStick, Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
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

const services = [
  { s: "Learning platform", u: "99.98%", t: "23 ms", tone: "bg-success/10 text-success" },
  { s: "Portal + API", u: "99.95%", t: "41 ms", tone: "bg-success/10 text-success" },
  { s: "Campus WiFi", u: "98.2%", t: "—", tone: "bg-primary/10 text-primary" },
  { s: "Video conferencing", u: "99.1%", t: "—", tone: "bg-warning/10 text-warning" },
];

function ItMonitoring() {
  return (
    <AppShell
      roleKey="instructor"
      title="System monitoring"
      subtitle="6 services · 99.7% avg uptime · 2 alerts today"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Stable</Badge>
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
            value: "6",
            delta: "5 healthy",
            icon: Server,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "CPU (avg)",
            value: "38%",
            delta: "peak 72%",
            icon: Cpu,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Memory",
            value: "64%",
            delta: "used",
            icon: MemoryStick,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Alerts (24h)",
            value: "2",
            delta: "auto-resolved",
            icon: Activity,
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
            <Globe className="text-primary size-4" /> Service health
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {services.map((s) => (
            <div key={s.s} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{s.s}</p>
                <p className="text-muted-foreground text-xs">Latency {s.t}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", s.tone)}>Uptime {s.u}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
