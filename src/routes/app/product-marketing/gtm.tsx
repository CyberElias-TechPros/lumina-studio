"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Flag,
  ListTodo,
  Rocket,
  Target,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { usePmPhases, usePmTasks, usePmGates } from "@/lib/query/productMarketing";
import type { PmPhase, PmTask, PmGate } from "@/lib/api/productMarketing";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/product-marketing/gtm")({
  head: () => ({
    meta: [
      { title: "GTM Planner — CEA-OS" },
      { name: "description", content: "Launch phases, timelines and task checklists." },
    ],
  }),
  component: GtmPlanner,
});

const statusTones: Record<string, string> = {
  done: "bg-success/10 text-success",
  complete: "bg-success/10 text-success",
  approved: "bg-success/10 text-success",
  "on track": "bg-primary/10 text-primary",
  "in progress": "bg-primary/10 text-primary",
  doing: "bg-primary/10 text-primary",
  building: "bg-primary/10 text-primary",
  "in review": "bg-warning/10 text-warning",
  "at risk": "bg-warning/10 text-warning",
  upcoming: "bg-warning/10 text-warning",
};

function toneFor(status: string): string {
  return statusTones[status.toLowerCase()] ?? "bg-muted-foreground/10 text-muted-foreground";
}

function GtmPlanner() {
  const phasesQuery = usePmPhases();
  const tasksQuery = usePmTasks();
  const gatesQuery = usePmGates();

  return (
    <AppShell
      roleKey="product-marketing"
      title="GTM planner"
      subtitle="3 launches · 2 phases in flight · next launch Aug 14"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">On track</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/product-marketing">
              <ArrowLeft className="size-4" /> PM hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Active launches",
            value: "3",
            delta: "1 in beta",
            icon: Rocket,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Tasks done",
            value: "38/52",
            delta: "73% complete",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Days to launch",
            value: "14",
            delta: "parent app beta",
            icon: CalendarDays,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Gate owners",
            value: "6",
            delta: "all confirmed",
            icon: UserRound,
            tone: "bg-learning/10 text-learning",
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

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Flag className="text-primary size-4" /> Launch phases & timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <QueryState<PmPhase[]>
              query={phasesQuery}
              error={{ title: "Phases unavailable" }}
              empty={{
                title: "No phases",
                description: "Launch phase progress will show here.",
              }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  {rows.map((p) => (
                    <div key={p.id}>
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-sm font-bold">{p.phase}</span>
                        <Badge className={cn("border-0 font-semibold", toneFor(p.status))}>
                          {p.status}
                        </Badge>
                      </div>
                      <div className="text-muted-foreground mt-0.5 text-xs">{p.launch}</div>
                      <Progress value={p.pct} className="mt-1.5 h-2" />
                    </div>
                  ))}
                </>
              )}
            </QueryState>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <ListTodo className="text-primary size-4" /> Task checklist · beta build
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <QueryState<PmTask[]>
              query={tasksQuery}
              error={{ title: "Tasks unavailable" }}
              empty={{
                title: "No tasks",
                description: "Task checklist items will show here.",
              }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  {rows.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between rounded-xl border p-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{t.title}</p>
                        <p className="text-muted-foreground text-xs">{t.owner}</p>
                      </div>
                      <Badge className={cn("border-0 font-semibold", toneFor(t.status))}>
                        {t.status}
                      </Badge>
                    </div>
                  ))}
                </>
              )}
            </QueryState>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Target className="text-primary size-4" /> Gate checklist by phase
          </CardTitle>
        </CardHeader>
        <CardContent>
          <QueryState<PmGate[]>
            query={gatesQuery}
            error={{ title: "Gates unavailable" }}
            empty={{
              title: "No gates",
              description: "Gate checklists will show here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Phase</TableHead>
                      <TableHead>Gate</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Due</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((g) => (
                      <TableRow key={g.id}>
                        <TableCell className="font-semibold">{g.phase}</TableCell>
                        <TableCell>{g.gate}</TableCell>
                        <TableCell className="text-muted-foreground">{g.owner}</TableCell>
                        <TableCell className="text-muted-foreground">{g.dueLabel}</TableCell>
                        <TableCell>
                          <Badge className={cn("border-0 font-semibold", toneFor(g.status))}>
                            {g.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
