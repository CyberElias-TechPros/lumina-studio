import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Clock3, Rocket, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/dev/deployments")({
  head: () => ({
    meta: [
      { title: "Deployments — CEA-OS" },
      { name: "description", content: "Deployment history with rollback." },
    ],
  }),
  component: DevDeployments,
});

const deploys = [
  {
    d: "v1.42.0 · prod",
    s: "Live",
    t: "Aug 1 · 06:12 · 4m 12s",
    tone: "bg-success/10 text-success",
  },
  {
    d: "v1.41.2 · prod",
    s: "Live",
    t: "Jul 28 · 05:58 · 3m 48s",
    tone: "bg-success/10 text-success",
  },
  {
    d: "v1.41.1 · staging",
    s: "Rolled back",
    t: "Jul 27 · 14:20",
    tone: "bg-warning/10 text-warning",
  },
];

function DevDeployments() {
  return (
    <AppShell
      roleKey="instructor"
      title="Deployments"
      subtitle="18 this month · 100% success · auto-rollback on"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">All healthy</Badge>
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
            label: "Deploys (30d)",
            value: "18",
            delta: "16 prod",
            icon: Rocket,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Success",
            value: "100%",
            delta: "zero rollbacks",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Avg. duration",
            value: "3m 52s",
            delta: "down 40s",
            icon: Clock3,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Rollbacks",
            value: "1",
            delta: "this month",
            icon: RotateCcw,
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
            <Rocket className="text-primary size-4" /> History
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {deploys.map((d) => (
            <div key={d.d} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="font-mono text-sm font-bold">{d.d}</p>
                <p className="text-muted-foreground text-xs">{d.t}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", d.tone)}>{d.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Details
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
