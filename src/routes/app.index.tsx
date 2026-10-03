"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock,
  Flame,
  GraduationCap,
  MessageSquare,
  Target,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { SceneArt } from "@/components/art/scene-art";
import { useSession } from "@/lib/auth/session";
import { resolveRoleKey } from "@/data/rbac";
import { useStudentDashboard } from "@/lib/query/dashboard";
import type { StudentDashboard } from "@/lib/api/dashboard";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Dashboards — CEA-OS | Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Role-based dashboards on CEA-OS: students, instructors, employers, staff and leadership all work in one connected platform.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { data } = useSession();
  const role = resolveRoleKey(data?.user.roleKey);
  const name = data?.user.name?.split(" ")[0] ?? "there";
  const studentDashboardQuery = useStudentDashboard(role === "student");

  return (
    <AppShell
      title={`Good ${new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening"}, ${name}`}
      subtitle="Welcome to your workspace"
    >
      <div className="relative mb-6 h-44 overflow-hidden rounded-2xl border sm:h-52">
        <SceneArt variant="code">
          <div className="flex h-full items-end p-5 sm:p-6">
            <div className="max-w-lg">
              <p className="text-white/70 text-xs font-bold tracking-[0.18em] uppercase">
                Your workspace
              </p>
              <h2 className="font-display mt-1 text-lg font-extrabold text-white sm:text-xl">
                Everything in Cyber Elias Academy, in one place.
              </h2>
            </div>
          </div>
        </SceneArt>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="bg-card shadow-soft border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                Learning
              </p>
              <BookOpen className="text-primary size-4" />
            </div>
            <p className="font-display mt-3 text-lg font-extrabold">Courses & grades</p>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-primary mt-3 px-0 font-semibold"
            >
              <Link to="/app/learn">
                Open learning hub <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-card shadow-soft border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                Work
              </p>
              <BriefcaseBusiness className="text-primary size-4" />
            </div>
            <p className="font-display mt-3 text-lg font-extrabold">Assignments</p>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-primary mt-3 px-0 font-semibold"
            >
              <Link to="/app/assignments">
                View assignments <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-card shadow-soft border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                Progress
              </p>
              <CheckCircle2 className="text-primary size-4" />
            </div>
            <p className="font-display mt-3 text-lg font-extrabold">Assessments & grades</p>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-primary mt-3 px-0 font-semibold"
            >
              <Link to="/app/grades">
                View gradebook <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-card shadow-soft border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                Community
              </p>
              <Users className="text-primary size-4" />
            </div>
            <p className="font-display mt-3 text-lg font-extrabold">Messages & events</p>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-primary mt-3 px-0 font-semibold"
            >
              <Link to="/app/messages">
                Open messages <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {role === "student" && (
        <div className="mt-5">
          <QueryState<StudentDashboard>
            query={studentDashboardQuery}
            error={{ title: "Learning momentum unavailable" }}
          >
            {(dashboard) => {
              const goalPct = Math.min(
                100,
                Math.round(
                  (dashboard.weeklyGoal.done / Math.max(dashboard.weeklyGoal.goal, 1)) * 100,
                ),
              );
              const nextCourse = dashboard.courses.find((course) => course.nextUp);
              return (
                <Card className="bg-card shadow-soft border">
                  <CardHeader className="flex-row flex-wrap items-center justify-between gap-3">
                    <div>
                      <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                        <Target className="text-primary size-4" /> Your momentum
                      </CardTitle>
                      <p className="text-muted-foreground mt-1 text-xs">
                        A live plan built from your progress, deadlines and study rhythm.
                      </p>
                    </div>
                    <Badge className="bg-success/10 text-success border-0 font-semibold">
                      {dashboard.kpis.overallProgress}% course progress
                    </Badge>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-[1.4fr_1fr_1fr]">
                    <div className="rounded-xl border p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-bold">Weekly learning goal</p>
                        <span className="text-muted-foreground text-xs font-semibold">
                          {dashboard.weeklyGoal.done}/{dashboard.weeklyGoal.goal} lessons
                        </span>
                      </div>
                      <Progress value={goalPct} className="mt-3 h-2" />
                      <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
                        {dashboard.weeklyGoal.note}
                      </p>
                    </div>
                    <div className="bg-primary/5 rounded-xl p-4">
                      <Flame className="text-warning size-5" />
                      <p className="font-display mt-3 text-2xl font-extrabold">
                        {dashboard.kpis.streakDays} days
                      </p>
                      <p className="text-muted-foreground text-xs font-semibold">
                        Current study streak
                      </p>
                    </div>
                    <div className="bg-learning/5 rounded-xl p-4">
                      <GraduationCap className="text-learning size-5" />
                      <p className="font-display mt-3 truncate text-sm font-extrabold">
                        {nextCourse?.nextUp ??
                          dashboard.nextDeadline?.title ??
                          "Keep your momentum"}
                      </p>
                      <p className="text-muted-foreground mt-1 text-xs font-semibold">
                        {dashboard.nextDeadline
                          ? `Due ${dashboard.nextDeadline.due}`
                          : `${dashboard.kpis.studyHours} studied this period`}
                      </p>
                      <Button
                        asChild
                        variant="link"
                        size="sm"
                        className="text-primary mt-2 h-auto p-0 text-xs font-bold"
                      >
                        <Link to={dashboard.nextDeadline ? "/app/assignments" : "/app/learn"}>
                          Take the next step <ArrowRight className="ml-1 size-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            }}
          </QueryState>
        </div>
      )}

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display text-base font-bold">Quick links</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 sm:grid-cols-2">
            {[
              { label: "Certificates", icon: Award, to: "/app/certificates" },
              { label: "Calendar", icon: CalendarDays, to: "/app/calendar" },
              { label: "Finance", icon: Clock, to: "/app/finance" },
              { label: "Portfolio", icon: BriefcaseBusiness, to: "/app/portfolio" },
              { label: "Grades", icon: GraduationCap, to: "/app/grades" },
              { label: "Attendance", icon: Users, to: "/app/attendance" },
              { label: "AI Assistant", icon: MessageSquare, to: "/app/ai" },
              { label: "Assessments", icon: CheckCircle2, to: "/app/assessments" },
            ].map((l) => (
              <Button
                key={l.label}
                asChild
                variant="outline"
                size="sm"
                className="justify-start font-semibold"
              >
                <Link to={l.to}>
                  <l.icon className="text-primary size-4" /> {l.label}
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display text-base font-bold">News & announcements</CardTitle>
            <Badge variant="secondary" className="font-semibold">
              Live
            </Badge>
          </CardHeader>
          <CardContent className="divide-y">
            <p className="text-muted-foreground py-4 text-sm first:pt-0 last:pb-0">
              No announcements yet. Notifications from your courses and admin will appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
