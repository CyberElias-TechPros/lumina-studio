"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useStudentDashboard } from "@/lib/query/dashboard";
import type { StudentDashboard, StudentDashboardKpis } from "@/lib/api/dashboard";
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

const KPI_CARDS: {
  id: keyof StudentDashboardKpis;
  label: string;
  icon: typeof GraduationCap;
  tone: string;
  valueOf: (k: StudentDashboardKpis) => string;
  deltaOf: (k: StudentDashboardKpis) => string;
}[] = [
  {
    id: "enrolled",
    label: "Enrolled",
    icon: GraduationCap,
    tone: "bg-primary/10 text-primary",
    valueOf: (k) => String(k.enrolled),
    deltaOf: () => "2 finishing this term",
  },
  {
    id: "overallProgress",
    label: "Overall progress",
    icon: BookOpen,
    tone: "bg-learning/10 text-learning",
    valueOf: (k) => `${k.overallProgress}%`,
    deltaOf: () => "+9% this week",
  },
  {
    id: "lessonsThisWeek",
    label: "Lessons this week",
    icon: PlayCircle,
    tone: "bg-warning/10 text-warning",
    valueOf: (k) => String(k.lessonsThisWeek),
    deltaOf: (k) => `goal ${k.lessonsGoal}`,
  },
  {
    id: "studyHours",
    label: "Study time",
    icon: Clock,
    tone: "bg-success/10 text-success",
    valueOf: (k) => k.studyHours,
    deltaOf: () => "12.5h average",
  },
];

function DashboardSkeleton() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="bg-card shadow-soft border">
            <CardContent className="space-y-3 p-5">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-7 w-16" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="bg-card shadow-soft border">
            <CardContent className="space-y-3 p-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="h-1.5 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function LearningHub() {
  const dashboard = useStudentDashboard();

  return (
    <AppShell
      roleKey="learn"
      title="Learning hub"
      subtitle={
        dashboard.data
          ? `Cohort 15 · Term 2 · ${dashboard.data.kpis.enrolled} enrolled courses`
          : "Cohort 15 · Term 2"
      }
      actions={
        dashboard.data ? (
          <>
            <Badge className="bg-success/10 text-success border-0 font-semibold">
              {dashboard.data.summary.doneLessons} of {dashboard.data.summary.totalLessons} lessons
              done
            </Badge>
            <Badge variant="secondary" className="font-semibold">
              Streak: {dashboard.data.kpis.streakDays} days
            </Badge>
          </>
        ) : (
          <>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-24" />
          </>
        )
      }
    >
      <QueryState<StudentDashboard>
        query={dashboard}
        loading={<DashboardSkeleton />}
        isEmpty={(data) => data.kpis.enrolled === 0}
        empty={{
          title: "No enrollments yet",
          description: "Pick a program and enroll to start tracking your progress here.",
          action: (
            <Button asChild size="sm">
              <Link to="/programs">Browse programs</Link>
            </Button>
          ),
        }}
      >
        {(data) => (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {KPI_CARDS.map((k) => (
                <Card key={k.id} className="bg-card shadow-soft border">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                        {k.label}
                      </p>
                      <span className={cn("grid size-8 place-items-center rounded-lg", k.tone)}>
                        <k.icon className="size-4" />
                      </span>
                    </div>
                    <p className="font-display mt-3 text-2xl font-extrabold">
                      {k.valueOf(data.kpis)}
                    </p>
                    <p className="text-muted-foreground mt-0.5 text-xs font-semibold">
                      {k.deltaOf(data.kpis)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-card shadow-soft border">
              <CardContent className="flex flex-wrap items-center gap-4 p-5">
                <span className="grid size-10 place-items-center rounded-xl bg-warning/10 text-warning">
                  <CalendarDays className="size-5" />
                </span>
                {data.nextDeadline ? (
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-extrabold">Next deadline</p>
                    <p className="text-muted-foreground text-xs">
                      {data.nextDeadline.due} · {data.nextDeadline.title}
                    </p>
                  </div>
                ) : (
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-extrabold">Next deadline</p>
                    <p className="text-muted-foreground text-xs">
                      Nothing due — you're all caught up.
                    </p>
                  </div>
                )}
                <Badge variant="secondary" className="font-semibold">
                  <CheckCircle2 className="mr-1 size-3.5" />
                  {data.summary.doneLessons} / {data.summary.totalLessons}
                </Badge>
              </CardContent>
            </Card>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {data.courses.map((c) => (
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
                      {c.nextUp && (
                        <Badge className="bg-warning/10 text-warning border-0 font-semibold">
                          Continue: {c.nextUp}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Link>
              ))}
            </div>

            <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
              <CardContent className="flex flex-wrap items-center gap-4 p-6">
                <span className="bg-ink-foreground/10 grid size-10 place-items-center rounded-xl">
                  <Star className="text-warning size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-extrabold">Weekly goal</p>
                  <p className="text-ink-foreground/70 text-xs">{data.weeklyGoal.note}</p>
                </div>
                <Badge className="bg-ink-foreground/15 text-ink-foreground border-0">
                  <CheckCircle2 className="mr-1 size-3.5" /> {data.weeklyGoal.done} /{" "}
                  {data.weeklyGoal.goal}
                </Badge>
              </CardContent>
            </Card>
          </div>
        )}
      </QueryState>
    </AppShell>
  );
}
