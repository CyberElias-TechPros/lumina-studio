import { createFileRoute } from "@tanstack/react-router";
import {
  Brain,
  FlaskConical,
  Hand,
  Layers,
  MousePointerClick,
  Target,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/behavioral-designer")({
  head: () => ({
    meta: [
      { title: "Behavioral Designer — CEA-OS" },
      {
        name: "description",
        content: "Nudges, funnels and experiments that shape learner behaviour.",
      },
    ],
  }),
  component: BehavioralDesignerPortal,
});

const experiments = [
  {
    t: "Streak nudges on learning hub",
    variant: "B · 14 days",
    lift: "+9% weekly lessons",
    status: "Winning",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Deadline anchoring in apply flow",
    variant: "A/B",
    lift: "+6% submissions",
    status: "Live",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Commitment message before drop-off",
    variant: "Draft",
    lift: "—",
    status: "Designing",
    tone: "bg-warning/10 text-warning",
  },
];

function BehavioralDesignerPortal() {
  return (
    <AppShell
      roleKey="instructor"
      title="Behavioral design"
      subtitle="Nudges, funnels and experiments · 7 running"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            3 wins this quarter
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            Ethics review: passed
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Live experiments",
            value: "7",
            delta: "2 winning",
            icon: FlaskConical,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Avg. lift",
            value: "+7.4%",
            delta: "across wins",
            icon: TrendingUp,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Funnels mapped",
            value: "11",
            delta: "2 to redesign",
            icon: Layers,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Retention (30d)",
            value: "91%",
            delta: "+4 pts",
            icon: Target,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <FlaskConical className="text-primary size-4" /> Experiments
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {experiments.map((e) => (
              <div
                key={e.t}
                className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                  <Brain className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{e.t}</p>
                  <p className="text-muted-foreground text-xs">
                    {e.variant} · {e.lift}
                  </p>
                </div>
                <Badge className={cn("border-0 font-semibold", e.tone)}>{e.status}</Badge>
                <Button variant="outline" size="sm" className="shrink-0">
                  Results
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <MousePointerClick className="text-primary size-4" /> Nudge library
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { t: "Streak & streak-saver", v: "Used 4×", tone: "bg-success/10 text-success" },
                { t: "Social proof bubbles", v: "Used 2×", tone: "bg-primary/10 text-primary" },
                { t: "Loss-framed reminders", v: "In testing", tone: "bg-warning/10 text-warning" },
              ].map((x) => (
                <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.t}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <Hand className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Ethics guardrail</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                No dark patterns: every nudge has an opt-out and passes the faculty ethics review.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
