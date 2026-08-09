import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  GraduationCap,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { useCourses } from "@/lib/query/courses";
import { useInstructorGradebookRows } from "@/lib/query/instructor";
import { useInterviewItems } from "@/lib/query/recruitment";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/director/academic")({
  head: () => ({
    meta: [
      { title: "Academic Overview — CEA-OS" },
      { name: "description", content: "Enrollment, completion and placement across programs." },
    ],
  }),
  component: DirectorAcademic,
});

function DirectorAcademic() {
  const courses = useCourses();
  const interviews = useInterviewItems();
  const gradebook = useInstructorGradebookRows();

  const courseRows = courses.data?.pages.flatMap((p) => p.items) ?? [];
  const avgCompletion = courseRows.length
    ? Math.round(courseRows.reduce((s, c) => s + c.pct, 0) / courseRows.length)
    : 0;
  const completed = interviews.filter((i) => i.status === "Completed").length;
  const placement = interviews.length ? Math.round((completed / interviews.length) * 100) : 0;
  const atRisk = gradebook.filter((r) => r.atRisk).length;
  const amber = courseRows.filter((c) => c.pct < 88).length;

  const programs = courseRows.slice(0, 6).map((p, i) => ({
    p: p.title,
    e: `cohort ${p.cohort}`,
    c: `${p.pct}%`,
    t: "88%",
    tone:
      p.pct >= 88
        ? "bg-success/10 text-success"
        : i % 2 === 0
          ? "bg-warning/10 text-warning"
          : "bg-primary/10 text-primary",
  }));

  return (
    <AppShell
      roleKey="director"
      title="Academic overview"
      subtitle={`${courseRows.length} programs · ${avgCompletion}% completion · ${placement}% interview→completed`}
      actions={
        <>
          <Badge
            className={cn(
              "border-0 font-semibold",
              amber > 0 ? "bg-warning/10 text-warning" : "bg-success/10 text-success",
            )}
          >
            {amber > 0
              ? `${amber} program${amber === 1 ? "" : "s"} amber`
              : "all programs on target"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/director">
              <ArrowLeft className="size-4" /> Director portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Programs",
            value: String(courseRows.length),
            delta: "tracked in catalog",
            icon: GraduationCap,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Avg completion",
            value: `${avgCompletion}%`,
            delta: "target 88%",
            icon: BookOpenCheck,
            tone: avgCompletion >= 88 ? "bg-success/10 text-success" : "bg-warning/10 text-warning",
          },
          {
            label: "Interview completion",
            value: `${placement}%`,
            delta: "of interview rounds",
            icon: TrendingUp,
            tone: "bg-career/10 text-career",
          },
          {
            label: "At-risk learners",
            value: String(atRisk),
            delta: "flagged in gradebook",
            icon: Users,
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
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Target className="text-primary size-4" /> Program health
          </CardTitle>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/director/reports">
              Drill down <ArrowRight className="ml-1 size-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          {programs.map((p) => (
            <div key={p.p} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{p.p}</p>
                <p className="text-muted-foreground text-xs">
                  {p.e} · completion {p.c}
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", p.tone)}>target {p.t}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Review
              </Button>
            </div>
          ))}
          {programs.length === 0 && (
            <p className="text-muted-foreground py-4 text-center text-sm">
              No programs in the catalog yet.
            </p>
          )}
        </CardContent>
      </Card>
    </AppShell>
  );
}
