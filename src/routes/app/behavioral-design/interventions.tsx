"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, Brain, FlaskConical, Gauge, ShieldCheck, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useBdInterventions } from "@/lib/query/behavioral";
import type { BdIntervention } from "@/lib/api/behavioral";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/behavioral-design/interventions")({
  head: () => ({
    meta: [
      { title: "Intervention Library — CEA-OS" },
      { name: "description", content: "Evidence-based intervention cards for learner behaviour." },
    ],
  }),
  component: InterventionLibrary,
});

const tones = [
  "bg-success/10 text-success",
  "bg-primary/10 text-primary",
  "bg-warning/10 text-warning",
  "bg-muted-foreground/10 text-muted-foreground",
];

function InterventionLibrary() {
  const interventionsQuery = useBdInterventions();

  return (
    <AppShell
      roleKey="behavioral-design"
      title="Intervention library"
      subtitle="18 evidence-based cards · 11 live · all ethics-reviewed"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Ethics passed</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/behavioral-design">
              <ArrowLeft className="size-4" /> Behavior hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Interventions",
            value: "18",
            delta: "11 live",
            icon: Brain,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "High evidence",
            value: "9",
            delta: "RCT or quasi-exp",
            icon: ShieldCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Effort split",
            value: "7 low",
            delta: "5 medium · 6 high",
            icon: Gauge,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Avg. lift",
            value: "+6.8%",
            delta: "median across cards",
            icon: FlaskConical,
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

      <QueryState<BdIntervention[]>
        query={interventionsQuery}
        error={{ title: "Interventions unavailable" }}
        empty={{
          title: "No interventions",
          description: "Evidence-based cards will show here.",
        }}
        isEmpty={(rows) => rows.length === 0}
      >
        {(rows) => (
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {rows.map((x, i) => (
              <Card key={x.id} className="bg-card shadow-soft border">
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                    <Brain className="text-primary size-4" /> {x.title}
                  </CardTitle>
                  <Badge className={cn("border-0 font-semibold", tones[i % tones.length])}>
                    {x.status}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border p-3">
                      <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                        Goal
                      </p>
                      <p className="mt-1 text-xs font-semibold">{x.goal}</p>
                    </div>
                    <div className="rounded-xl border p-3">
                      <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                        Mechanism
                      </p>
                      <p className="mt-1 text-xs font-semibold">{x.mechanism}</p>
                    </div>
                    <div className="rounded-xl border p-3">
                      <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                        Effort
                      </p>
                      <p className="mt-1 text-xs font-semibold">{x.effort}</p>
                    </div>
                    <div className="rounded-xl border p-3">
                      <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                        Evidence
                      </p>
                      <p className="mt-1 text-xs font-semibold">{x.evidence}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-muted-foreground">Deployment</span>
                    <span>{x.testsRun}%</span>
                  </div>
                  <Progress value={x.testsRun} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </QueryState>
    </AppShell>
  );
}
