import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  GraduationCap,
  PlayCircle,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app/app-shell";
import { learningCourses } from "@/data/learning";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/learn/")({
  head: () => ({
    meta: [
      { title: "Learning Hub — CEA-OS" },
      {
        name: "description",
        content: "Your enrolled courses, modules, lessons and progress across CEA-OS.",
      },
    ],
  }),
  component: LearningHub,
});

function LearningHub() {
  const doneLessons = learningCourses
    .flatMap((c) => c.modules.flatMap((m) => m.lessons))
    .filter((l) => l.status === "done").length;
  const totalLessons = learningCourses.flatMap((c) => c.modules.flatMap((m) => m.lessons)).length;

  return (
    <AppShell
      roleKey="student"
      title="Learning hub"
      subtitle="Cohort 15 · Term 2 · 3 enrolled courses"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {doneLessons} of {totalLessons} lessons done
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            Streak: 9 days
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Enrolled",
            value: String(learningCourses.length),
            delta: "2 finishing this term",
            icon: GraduationCap,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Overall progress",
            value: "61%",
            delta: "+9% this week",
            icon: BookOpen,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Lessons this week",
            value: "5",
            delta: "goal 8",
            icon: PlayCircle,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Study time",
            value: "18.5h",
            delta: "12.5h average",
            icon: Clock,
            tone: "bg-success/10 text-success",
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

      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {learningCourses.map((c) => (
          <Link
            key={c.slug}
            to="/app/learn/$courseId"
            params={{ courseId: c.slug }}
            className="group bg-card shadow-soft hover:shadow-elevated flex h-full flex-col overflow-hidden rounded-2xl border transition-all hover:-translate-y-0.5"
          >
            <div className={cn("relative h-24", c.tone)}>
              <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <p className="font-display text-sm font-extrabold text-white">{c.title}</p>
                <ArrowRight className="text-white/80 group-hover:translate-x-0.5 size-4 transition-transform" />
              </div>
            </div>
            <CardContent className="flex flex-1 flex-col p-4">
              <p className="text-muted-foreground text-xs leading-relaxed">{c.subtitle}</p>
              <div className="mt-3 flex items-center justify-between text-xs font-semibold">
                <span className="text-muted-foreground">{c.instructor}</span>
                <span>{c.pct}%</span>
              </div>
              <Progress value={c.pct} className="mt-1.5 h-1.5" />
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="font-semibold">
                  {c.cohort}
                </Badge>
                {c.pct === 78 && (
                  <Badge className="bg-warning/10 text-warning border-0 font-semibold">
                    Continue: Auth & JWT
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground mt-3 flex items-center gap-1.5 border-t pt-3 text-xs">
                <CalendarDays className="size-3.5" /> Next deadline Fri · REST API assignment
              </p>
            </CardContent>
          </Link>
        ))}
      </div>

      <Card className="bg-gradient-ink text-ink-foreground shadow-elevated mt-5 border-0">
        <CardContent className="flex flex-wrap items-center gap-4 p-6">
          <span className="bg-ink-foreground/10 grid size-10 place-items-center rounded-xl">
            <Star className="text-warning size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-extrabold">Weekly goal</p>
            <p className="text-ink-foreground/70 text-xs">
              You're 2 lessons behind this week's goal of 8. A 40-minute block this evening closes
              the gap before Friday's live class.
            </p>
          </div>
          <Badge className="bg-ink-foreground/15 text-ink-foreground border-0">
            <CheckCircle2 className="mr-1 size-3.5" /> 5 / 8
          </Badge>
        </CardContent>
      </Card>
    </AppShell>
  );
}
