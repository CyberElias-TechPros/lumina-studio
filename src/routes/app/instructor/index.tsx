"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  Plus,
  Radio,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { flattenPages } from "@/lib/query/hooks";
import { useInstructorAssignments, useInstructorCourses } from "@/lib/query/instructor";
import { useLiveClassesItems } from "@/lib/query/live";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/instructor/")({
  head: () => ({
    meta: [
      { title: "Instructor Dashboard — CEA-OS" },
      {
        name: "description",
        content: "Courses, assignments and teaching tools.",
      },
    ],
  }),
  component: InstructorDashboard,
});

const workspace = [
  {
    to: "/app/instructor/courses",
    label: "Course builder",
    desc: "Modules, lessons, publishing",
    icon: BookOpen,
    tone: "bg-primary/10 text-primary",
  },
  {
    to: "/app/instructor/assignments",
    label: "Assignments",
    desc: "Briefs and submissions",
    icon: FileText,
    tone: "bg-learning/10 text-learning",
  },
  {
    to: "/app/instructor/grading-queue",
    label: "Grading queue",
    desc: "Submissions awaiting review",
    icon: ClipboardCheck,
    tone: "bg-warning/10 text-warning",
  },
  {
    to: "/app/instructor/assessments",
    label: "Assessment engine",
    desc: "Quizzes, exams, auto-grading",
    icon: ShieldCheck,
    tone: "bg-success/10 text-success",
  },
  {
    to: "/app/instructor/gradebook",
    label: "Gradebook",
    desc: "Weights, scores, disputes",
    icon: GraduationCap,
    tone: "bg-primary/10 text-primary",
  },
  {
    to: "/app/instructor/classes",
    label: "Class schedule",
    desc: "Upcoming live & cohort sessions",
    icon: Radio,
    tone: "bg-career/10 text-career",
  },
  {
    to: "/app/instructor/attendance",
    label: "Attendance",
    desc: "Live classes, roll calls",
    icon: Users,
    tone: "bg-warning/10 text-warning",
  },
  {
    to: "/app/instructor/analytics",
    label: "Analytics",
    desc: "Retention, at-risk learners",
    icon: BarChart3,
    tone: "bg-learning/10 text-learning",
  },
  {
    to: "/app/instructor/calendar",
    label: "Calendar",
    desc: "Classes, office hours",
    icon: CalendarDays,
    tone: "bg-career/10 text-career",
  },
  {
    to: "/app/instructor/announcements",
    label: "Announcements",
    desc: "Cohort-wide updates",
    icon: Megaphone,
    tone: "bg-warning/10 text-warning",
  },
  {
    to: "/app/instructor/lessons/create",
    label: "New lesson",
    desc: "Build a lesson from scratch",
    icon: Plus,
    tone: "bg-success/10 text-success",
  },
  {
    to: "/app/messages",
    label: "Direct messages",
    desc: "Reach learners and staff",
    icon: MessageSquare,
    tone: "bg-primary/10 text-primary",
  },
];

function InstructorDashboard() {
  const coursesQuery = useInstructorCourses();
  const assignmentsQuery = useInstructorAssignments();
  const liveClasses = useLiveClassesItems();

  const courses = flattenPages(coursesQuery.data?.pages);
  const submissions = flattenPages(assignmentsQuery.data?.pages);
  const pendingReviews = submissions.filter((s) => s.status !== "graded").length;
  const activeLive = liveClasses.filter((c) => c.status !== "ended").length;
  const hasLiveData = courses.length > 0 || submissions.length > 0 || liveClasses.length > 0;

  return (
    <AppShell
      roleKey="instructor"
      title="Instructor dashboard"
      subtitle="Courses, assignments and teaching tools"
      actions={
        hasLiveData ? (
          <>
            <Badge className="bg-primary/10 text-primary border-0 font-semibold">
              {pendingReviews} awaiting review
            </Badge>
            <Button asChild size="sm">
              <Link to="/app/instructor/lessons/create">
                <Plus className="size-4" /> New lesson
              </Link>
            </Button>
          </>
        ) : undefined
      }
    >
      {hasLiveData && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Assigned courses",
              value: coursesQuery.isLoading ? "…" : String(courses.length),
              delta: `${courses.filter((c) => c.status === "published").length} published`,
              icon: BookOpen,
              tone: "bg-primary/10 text-primary",
            },
            {
              label: "Pending reviews",
              value: assignmentsQuery.isLoading ? "…" : String(pendingReviews),
              delta: `${submissions.length} total submissions`,
              icon: ClipboardCheck,
              tone: "bg-warning/10 text-warning",
            },
            {
              label: "Upcoming classes",
              value: String(activeLive),
              delta: `${liveClasses.filter((c) => c.status === "live").length} live right now`,
              icon: Radio,
              tone: "bg-success/10 text-success",
            },
            {
              label: "Graded work",
              value: assignmentsQuery.isLoading
                ? "…"
                : String(submissions.filter((s) => s.status === "graded").length),
              delta: "returned with feedback",
              icon: GraduationCap,
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
      )}

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <LayoutDashboard className="text-primary size-4" /> Teaching workspace
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {workspace.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="group bg-card shadow-soft hover:shadow-elevated flex flex-col rounded-xl border p-4 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <span className={cn("grid size-9 place-items-center rounded-lg", s.tone)}>
                  <s.icon className="size-4" />
                </span>
                <ArrowRight className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
              </div>
              <p className="font-display mt-3 text-sm font-extrabold">{s.label}</p>
              <p className="text-muted-foreground mt-1 text-xs">{s.desc}</p>
            </Link>
          ))}
        </CardContent>
      </Card>

      {!hasLiveData && (
        <p className="text-muted-foreground mt-5 text-sm">
          Open the calendar or assignment center for available records. Dashboard totals and sample
          schedules are not shown until their data sources can be verified.
        </p>
      )}
    </AppShell>
  );
}
