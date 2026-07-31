import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, CheckCircle2, CircleDot, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
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

const milestones = [
  { m: "Onboarding & environment setup", s: "Done", pct: 100, tone: "bg-success/10 text-success" },
  {
    m: "CI/CD pipeline fundamentals",
    s: "In progress",
    pct: 65,
    tone: "bg-primary/10 text-primary",
  },
  { m: "Monitoring & alerting", s: "In progress", pct: 40, tone: "bg-learning/10 text-learning" },
  {
    m: "Cloud provisioning basics",
    s: "Not started",
    pct: 0,
    tone: "bg-muted text-muted-foreground",
  },
];

function InternLearningPlan() {
  return (
    <AppShell
      roleKey="student"
      title="Learning plan"
      subtitle="DevOps track · 6 milestones · week 6 of 12"
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
            value: "6",
            delta: "for 12 weeks",
            icon: CircleDot,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Completed",
            value: "2",
            delta: "33% of plan",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Skills tracked",
            value: "18",
            delta: "6 mastered",
            icon: Target,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Resources",
            value: "24",
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
          {milestones.map((m) => (
            <div key={m.m}>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>{m.m}</span>
                <Badge className={cn("border-0 font-semibold", m.tone)}>{m.s}</Badge>
              </div>
              <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
                <div
                  className={cn(
                    "h-full rounded-full",
                    m.pct > 0 ? "bg-gradient-brand" : "bg-muted",
                  )}
                  style={{ width: `${m.pct}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
