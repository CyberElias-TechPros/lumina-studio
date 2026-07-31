import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Award, CheckCircle2, ClipboardList, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/hr/performance")({
  head: () => ({
    meta: [
      { title: "Performance — CEA-OS" },
      { name: "description", content: "Performance review cycles, goals and appraisals." },
    ],
  }),
  component: HrPerformance,
});

const cycles = [
  { c: "Q3 2026 review", d: "14 of 94 submitted", pct: 15, tone: "bg-primary/10 text-primary" },
  { c: "Q2 2026 review", d: "94 of 94 submitted", pct: 100, tone: "bg-success/10 text-success" },
];

const topRated = [
  { n: "Ms. Chidera", r: "4.8 / 5", tone: "bg-success/10 text-success" },
  { n: "Mrs. Obi", r: "4.7 / 5", tone: "bg-primary/10 text-primary" },
];

function HrPerformance() {
  return (
    <AppShell
      roleKey="instructor"
      title="Performance reviews"
      subtitle="Q3 cycle open · 14 submitted · avg. 4.1 / 5"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Cycle on track
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/hr">
              <ArrowLeft className="size-4" /> HR hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "In progress",
            value: "14",
            delta: "of 94 submitted",
            icon: ClipboardList,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Avg. score",
            value: "4.1",
            delta: "out of 5",
            icon: Award,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Goals tracked",
            value: "282",
            delta: "3 per staff",
            icon: TrendingUp,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Completed",
            value: "100%",
            delta: "Q2 cycle",
            icon: CheckCircle2,
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
            <ClipboardList className="text-primary size-4" /> Cycles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cycles.map((c) => (
            <div key={c.c}>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>{c.c}</span>
                <span>{c.d}</span>
              </div>
              <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
                <div
                  className="bg-gradient-brand h-full rounded-full"
                  style={{ width: `${c.pct}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Award className="text-primary size-4" /> Top rated · Q2
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {topRated.map((t) => (
            <div key={t.n} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{t.n}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", t.tone)}>{t.r}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
