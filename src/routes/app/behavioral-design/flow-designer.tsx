"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowLeft,
  ArrowDown,
  CheckCircle2,
  CircleDot,
  GitBranch,
  MousePointerClick,
  Plus,
  Workflow,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useBdFlows, useBdFlowSteps } from "@/lib/query/behavioral";
import type { BdFlow, BdFlowStep } from "@/lib/api/behavioral";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/behavioral-design/flow-designer")({
  head: () => ({
    meta: [
      { title: "Flow Designer — CEA-OS" },
      { name: "description", content: "Step-based engagement flow builder." },
    ],
  }),
  component: FlowDesigner,
});

const flowTones = [
  "bg-success/10 text-success",
  "bg-primary/10 text-primary",
  "bg-warning/10 text-warning",
];

const stepTypes = ["Trigger", "Send", "Choice", "Branch", "Nudge"];
const stepTones = [
  "bg-primary/10 text-primary",
  "bg-learning/10 text-learning",
  "bg-success/10 text-success",
  "bg-warning/10 text-warning",
  "bg-error/10 text-error",
];

function FlowDesigner() {
  const flowsQuery = useBdFlows();
  const stepsQuery = useBdFlowSteps();

  return (
    <AppShell
      roleKey="behavioral-design"
      title="Engagement flow designer"
      subtitle="8 flows built · 3 in draft · 2 live this week"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">2 live</Badge>
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
            label: "Flows",
            value: "8",
            delta: "3 in draft",
            icon: Workflow,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Steps live",
            value: "42",
            delta: "across live flows",
            icon: CircleDot,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Live flows",
            value: "2",
            delta: "activation + referral",
            icon: MousePointerClick,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Avg. step conv",
            value: "61%",
            delta: "+3 pts last qtr",
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1.5fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <GitBranch className="text-primary size-4" /> Flow library
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <QueryState<BdFlow[]>
              query={flowsQuery}
              error={{ title: "Flows unavailable" }}
              empty={{ title: "No flows", description: "Flows you build will show here." }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  {rows.map((f, i) => (
                    <div
                      key={f.id}
                      className="flex items-center justify-between rounded-xl border p-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold">{f.name}</p>
                        <p className="text-muted-foreground text-xs">{f.stage} steps</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={cn("border-0 font-semibold", flowTones[i % flowTones.length])}
                        >
                          {f.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </QueryState>
            <Button
              size="sm"
              className="bg-gradient-brand shadow-glow w-full border-0 font-semibold"
            >
              <Plus className="size-4" /> New flow
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Workflow className="text-primary size-4" /> Activation flow · canvas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <QueryState<BdFlowStep[]>
              query={stepsQuery}
              error={{ title: "Steps unavailable" }}
              empty={{ title: "No steps", description: "Add steps to this flow to build it out." }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => {
                const ordered = [...rows].sort((a, b) => a.stepNo - b.stepNo);
                return (
                  <div className="space-y-2">
                    {ordered.map((st, i) => (
                      <div key={st.id}>
                        <div
                          className={cn(
                            "flex items-center gap-3 rounded-xl border p-3",
                            i === 3 && "border-dashed",
                          )}
                        >
                          <span
                            className={cn(
                              "grid size-8 place-items-center rounded-lg text-xs font-extrabold",
                              stepTones[i % stepTones.length],
                            )}
                          >
                            {st.stepNo}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold">{st.title}</p>
                            <p className="text-muted-foreground text-xs">{st.subtitle}</p>
                          </div>
                          <Badge variant="secondary" className="font-semibold">
                            {stepTypes[(st.stepNo - 1) % stepTypes.length]}
                          </Badge>
                        </div>
                        {i < ordered.length - 1 && (
                          <div className="flex justify-center py-1">
                            <ArrowDown className="text-muted-foreground/60 size-4" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              }}
            </QueryState>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
