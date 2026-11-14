import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CalendarDays,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  Plus,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
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
];

function InstructorDashboard() {
  return (
    <AppShell
      roleKey="instructor"
      title="Instructor dashboard"
      subtitle="Courses, assignments and teaching tools"
    >
      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <LayoutDashboard className="text-primary size-4" /> Workspace
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

      <p className="text-muted-foreground mt-5 text-sm">
        Open the calendar or assignment center for available records. Dashboard totals and sample
        schedules are not shown until their data sources can be verified.
      </p>
    </AppShell>
  );
}
