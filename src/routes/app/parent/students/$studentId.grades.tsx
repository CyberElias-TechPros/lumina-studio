import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, FileText, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/parent/students/$studentId/grades")({
  head: () => ({
    meta: [
      { title: "Academic Progress — CEA-OS" },
      { name: "description", content: "Gradebook view for parents." },
    ],
  }),
  component: ParentStudentGrades,
});

const courses = [
  { t: "Backend & APIs", score: "A", pct: 92, trend: "+3", comment: "Excellent API design work" },
  { t: "DevOps Fundamentals", score: "B+", pct: 86, trend: "+1", comment: "Great first pipeline" },
  {
    t: "Design Systems",
    score: "A-",
    pct: 89,
    trend: "+2",
    comment: "Accessibility is a strength",
  },
  {
    t: "Career Readiness",
    score: "A",
    pct: 94,
    trend: "+4",
    comment: "Portfolio presentation top 5%",
  },
];

function ParentStudentGrades() {
  return (
    <AppShell
      roleKey="student"
      title="Academic progress"
      subtitle="Ada Okafor · Term 2 · mid-term"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">GPA 4.2 / 5.0</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/parent/students/$studentId" params={{ studentId: "ada-okafor" }}>
              <ArrowLeft className="size-4" /> Overview
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Cumulative GPA",
            value: "4.2",
            delta: "top 5% of cohort",
            icon: TrendingUp,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Course average",
            value: "90%",
            delta: "+2.5 pts vs term 1",
            icon: BookOpen,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "A grades",
            value: "2 of 4",
            delta: "this term",
            icon: FileText,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Assignments",
            value: "18/22",
            delta: "4 due",
            icon: FileText,
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
            <BookOpen className="text-primary size-4" /> Gradebook
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {courses.map((c) => (
            <div key={c.t} className="flex flex-wrap items-center gap-4 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{c.t}</p>
                <p className="text-muted-foreground text-xs">{c.comment}</p>
              </div>
              <span className="bg-success/10 text-success rounded-md px-2 py-0.5 text-xs font-bold">
                +{c.trend} pts
              </span>
              <Progress value={c.pct} className="h-1.5 w-24" />
              <Badge className="bg-primary/10 text-primary w-10 justify-center border-0 font-bold">
                {c.score}
              </Badge>
            </div>
          ))}
          <p className="text-muted-foreground pt-3 text-xs">
            Grade disputes can be raised with the academic board within 7 days of release.
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}
