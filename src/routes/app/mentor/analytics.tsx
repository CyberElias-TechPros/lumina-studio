import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BarChart3, CalendarDays, CheckCircle2, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import {
  useMntGoalItems,
  useMntGoals,
  useMntMenteeItems,
  useMntMentees,
} from "@/lib/query/mentorDashboard";
import type { MntGoal, MntMentee } from "@/lib/api/mentorDashboard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/mentor/analytics")({
  head: () => ({
    meta: [
      { title: "Mentor Analytics — CEA-OS" },
      { name: "description", content: "Impact metrics across your mentee caseload." },
    ],
  }),
  component: MentorAnalytics,
});

const metrics = [
  { t: "Mentees to employment", v: "5 of 7", tone: "bg-success/10 text-success" },
  { t: "Avg. GPA uplift", v: "+0.6", tone: "bg-primary/10 text-primary" },
  { t: "Goals completed", v: "6 this term", tone: "bg-learning/10 text-learning" },
  { t: "Sessions delivered", v: "12 · 9h 40m", tone: "bg-warning/10 text-warning" },
];

function averageProgress(goals: MntGoal[], menteeId: string) {
  const own = goals.filter((g) => g.menteeId === menteeId);
  if (own.length === 0) return 0;
  return Math.round(own.reduce((n, g) => n + g.progressPct, 0) / own.length);
}

function ProgressRow({ m, pct }: { m: MntMentee; pct: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-semibold">
        <span>{m.name}</span>
        <span className="text-muted-foreground">{pct}% goal progress</span>
      </div>
      <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
        <div className="bg-primary h-full rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function MentorAnalytics() {
  const menteesQuery = useMntMentees();
  const mentees = useMntMenteeItems();
  const goalsQuery = useMntGoals();
  const goals = useMntGoalItems();

  return (
    <AppShell
      roleKey="mentor"
      title="Analytics & impact"
      subtitle={mentees.length > 0 ? `Term 2 · across your ${mentees.length} mentees` : "Loading…"}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Impact: high</Badge>
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
            label: "Engagement score",
            value: "96",
            delta: "sessions attended",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Goal completion",
            value: "78%",
            delta: "+12 pts",
            icon: TrendingUp,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Hours mentored",
            value: "9h 40m",
            delta: "12 sessions",
            icon: CalendarDays,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Endorsements",
            value: "14",
            delta: "8 skills",
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <BarChart3 className="text-primary size-4" /> Impact this term
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <QueryState<MntMentee[]>
              query={menteesQuery}
              error={{ title: "Impact unavailable" }}
              empty={{
                title: "No mentees yet",
                description: "Progress will appear once mentees are assigned.",
              }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  {rows.map((m) => (
                    <ProgressRow key={m.id} m={m} pct={averageProgress(goals, m.id)} />
                  ))}
                </>
              )}
            </QueryState>
            {goalsQuery.data && goals.length === 0 && (
              <p className="text-muted-foreground text-xs">
                Goal progress will appear once mentee goals are set.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <TrendingUp className="text-primary size-4" /> Outcomes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {metrics.map((m) => (
              <div key={m.t} className="flex items-center justify-between rounded-xl border p-3">
                <span className="text-sm font-semibold">{m.t}</span>
                <Badge className={cn("border-0 font-semibold", m.tone)}>{m.v}</Badge>
              </div>
            ))}
            <p className="text-muted-foreground pt-1 text-xs">
              A quarterly impact report goes to the department head and informs mentor awards.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
