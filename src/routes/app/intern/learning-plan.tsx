import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, CheckCircle2, CircleDot, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import {
  useIntMilestoneItems,
  useIntMilestones,
  useIntResourceItems,
  useIntSkillItems,
} from "@/lib/query/internDashboard";
import type { IntMilestone } from "@/lib/api/internDashboard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/intern/learning-plan")({
  head: () => ({
    meta: [
      { title: "Learning Plan — CEA-OS" },
      { name: "description", content: "Your internship milestones and skills." },
    ],
  }),
  component: InternLearningPlan,
});

const milestoneBadge: Record<string, { label: string; tone: string }> = {
  done: { label: "Done", tone: "bg-success/10 text-success" },
  "in progress": { label: "In progress", tone: "bg-primary/10 text-primary" },
  "not started": { label: "Not started", tone: "bg-muted text-muted-foreground" },
};

function InternLearningPlan() {
  const milestonesQuery = useIntMilestones();
  const milestones = useIntMilestoneItems();
  const skills = useIntSkillItems();
  const resources = useIntResourceItems();

  const completed = milestones.filter((m) => m.status === "done").length;
  const mastered = skills.filter((s) => s.mastery === "mastered").length;
  const planPct = milestones.length > 0 ? Math.round((completed / milestones.length) * 100) : 0;

  return (
    <AppShell
      roleKey="student"
      title="Learning plan"
      subtitle={
        milestones.length > 0
          ? `DevOps track · ${milestones.length} milestones · week 6 of 12`
          : "DevOps track · 6 milestones · week 6 of 12"
      }
      actions={
        <>
          <Badge className="bg-primary/10 text-primary border-0 font-semibold">Week 6 of 12</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/intern">
              <ArrowLeft className="size-4" /> Intern hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Milestones",
            value: milestones.length > 0 ? String(milestones.length) : "—",
            delta: "in your plan",
            icon: CircleDot,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Completed",
            value: milestones.length > 0 ? String(completed) : "—",
            delta: `${planPct}% of plan`,
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Skills tracked",
            value: skills.length > 0 ? String(skills.length) : "—",
            delta: `${mastered} mastered`,
            icon: Target,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Resources",
            value: resources.length > 0 ? String(resources.length) : "—",
            delta: "curated links",
            icon: BookOpen,
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
            <BookOpen className="text-primary size-4" /> Milestones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <QueryState<IntMilestone[]>
            query={milestonesQuery}
            error={{ title: "Plan unavailable" }}
            empty={{ title: "No milestones yet", description: "Your plan will show here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((m) => {
                  const meta = milestoneBadge[m.status] ?? {
                    label: m.status,
                    tone: "bg-muted text-muted-foreground",
                  };
                  return (
                    <div key={m.id}>
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span>{m.title}</span>
                        <Badge className={cn("border-0 font-semibold", meta.tone)}>
                          {meta.label}
                        </Badge>
                      </div>
                      <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            m.progressPct > 0 ? "bg-gradient-brand" : "bg-muted",
                          )}
                          style={{ width: `${m.progressPct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
