"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, Goal, Target, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useMntGoalItems, useMntGoals, useMntMenteeItems } from "@/lib/query/mentorDashboard";
import type { MntGoal } from "@/lib/api/mentorDashboard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/mentor/goals")({
  head: () => ({
    meta: [
      { title: "Goal Management — CEA-OS" },
      { name: "description", content: "Mentee milestones and progress across your caseload." },
    ],
  }),
  component: MentorGoals,
});

const statusTone: Record<string, string> = {
  "on track": "bg-success/10 text-success",
  "needs focus": "bg-warning/10 text-warning",
  new: "bg-primary/10 text-primary",
  completed: "bg-learning/10 text-learning",
};

function MentorGoals() {
  const goalsQuery = useMntGoals();
  const goals = useMntGoalItems();
  const mentees = useMntMenteeItems();

  const menteeName = (id: string) => mentees.find((m) => m.id === id)?.name ?? id;
  const onTrack = goals.filter((g) => g.status === "on track").length;
  const atRisk = goals.filter((g) => g.status === "needs focus").length;
  const completed = goals.filter((g) => g.status === "completed").length;
  const pct = goals.length > 0 ? Math.round((onTrack / goals.length) * 100) : 0;

  return (
    <AppShell
      roleKey="mentor"
      title="Goal management"
      subtitle={
        goals.length > 0
          ? `${goals.length} goals across ${mentees.length} mentees · ${onTrack} on track`
          : "Loading goals…"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {goals.length > 0 ? `${pct}% on track` : "—"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/mentor">
              <ArrowLeft className="size-4" /> Dashboard
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Active goals",
            value: goals.length > 0 ? String(goals.length) : "—",
            delta: "on your caseload",
            icon: Goal,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "On track",
            value: goals.length > 0 ? String(onTrack) : "—",
            delta: `${pct}%`,
            icon: TrendingUp,
            tone: "bg-success/10 text-success",
          },
          {
            label: "At risk",
            value: goals.length > 0 ? String(atRisk) : "—",
            delta: atRisk > 0 ? "review this week" : "nothing flagged",
            icon: Target,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Completed",
            value: goals.length > 0 ? String(completed) : "—",
            delta: "this term",
            icon: Goal,
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

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Target className="text-primary size-4" /> All goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <QueryState<MntGoal[]>
            query={goalsQuery}
            error={{ title: "Goals unavailable" }}
            empty={{
              title: "No goals yet",
              description: "Goals from your mentees will show here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((g) => (
                  <div key={g.id} className="rounded-xl border p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold">{g.title}</p>
                        <p className="text-muted-foreground text-xs">{menteeName(g.menteeId)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-xs font-semibold">
                          due {g.dueDate}
                        </span>
                        <Badge
                          className={cn(
                            "border-0 font-semibold capitalize",
                            statusTone[g.status] ?? "bg-muted/20 text-muted-foreground",
                          )}
                        >
                          {g.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <Progress value={g.progressPct} className="h-1.5 flex-1" />
                      <span className="text-xs font-bold">{g.progressPct}%</span>
                    </div>
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
