import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  CircleAlert,
  Clock3,
  FilePlus2,
  GraduationCap,
  Layers,
  ListChecks,
  Plus,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useInstructorCourses } from "@/lib/query/instructor";
import type { InstructorCourse } from "@/lib/api/instructor";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/instructor/courses/")({
  head: () => ({
    meta: [
      { title: "Course Builder — CEA-OS" },
      { name: "description", content: "Build, structure and publish courses." },
    ],
  }),
  component: CourseBuilderPage,
});

function statusTone(status: string) {
  if (/published/i.test(status)) return "bg-success/10 text-success";
  if (/draft/i.test(status)) return "bg-warning/10 text-warning";
  if (/in progress|active/i.test(status)) return "bg-primary/10 text-primary";
  return "bg-muted-foreground/10 text-muted-foreground";
}

const recentModules = [
  { course: "FWD-301", module: "React Performance", lessons: 6, updated: "2h ago" },
  { course: "FWD-301", module: "State Machines", lessons: 4, updated: "Yesterday" },
  { course: "DSA-102", module: "Graph Traversals", lessons: 5, updated: "Mon" },
  { course: "MKT-204", module: "Landing Page Anatomy", lessons: 3, updated: "Last week" },
];

function CourseBuilderPage() {
  const coursesQuery = useInstructorCourses();

  return (
    <AppShell
      roleKey="instructor"
      title="Course builder"
      subtitle="Modules, lessons, publishing · Cohort 16"
      actions={
        <>
          <Badge className="bg-primary/10 text-primary border-0 font-semibold">
            2 courses in progress
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            Published · FWD-101, UX-201
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Courses",
            value: "5",
            delta: "2 published",
            icon: BookOpen,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Modules",
            value: "32",
            delta: "4 in draft",
            icon: Layers,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Lessons",
            value: "141",
            delta: "12 added this term",
            icon: ListChecks,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Enrolled learners",
            value: "225",
            delta: "+18 this month",
            icon: Users,
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

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/portal/instructor">
              <ArrowLeft className="mr-1.5 size-4" /> Portal
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/app/instructor">
              <GraduationCap className="mr-1.5 size-4" /> Dashboard
            </Link>
          </Button>
        </div>
        <Button className="bg-gradient-brand shadow-glow border-0">
          <Plus className="mr-1.5 size-4" /> Create course
        </Button>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <BookOpen className="text-primary size-4" /> Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <QueryState<InstructorCourse[]>
              query={coursesQuery}
              error={{ title: "Courses unavailable" }}
              empty={{
                title: "No courses yet",
                description: "Courses you build will show here.",
              }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(courses) => (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Enrolled</TableHead>
                      <TableHead>Structure</TableHead>
                      <TableHead>Build progress</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((c) => {
                      const lessons = c.modules.flatMap((m) => m.lessons);
                      const built = lessons.filter((l) => l.status !== "draft").length;
                      const progress = lessons.length
                        ? Math.round((built / lessons.length) * 100)
                        : 0;
                      return (
                        <TableRow key={c.id}>
                          <TableCell>
                            <p className="text-sm font-bold">{c.title}</p>
                            <p className="text-muted-foreground text-xs">{c.cohort}</p>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-xs font-semibold">
                            —
                          </TableCell>
                          <TableCell className="text-muted-foreground text-xs">
                            {c.modules.length} modules · {lessons.length} lessons
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={progress} className="h-1.5 w-16" />
                              <span className="text-muted-foreground text-xs font-semibold">
                                {progress}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={cn("border-0 font-semibold", statusTone(c.status))}>
                              {c.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </QueryState>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Clock3 className="text-primary size-4" /> Recently edited modules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentModules.map((m) => (
                <div key={m.module} className="flex items-center gap-3 rounded-xl border p-3">
                  <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                    <Layers className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{m.module}</p>
                    <p className="text-muted-foreground text-xs">
                      {m.course} · {m.lessons} lessons
                    </p>
                  </div>
                  <Badge variant="secondary" className="font-semibold">
                    {m.updated}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <FilePlus2 className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Publish checklist</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Every module needs a welcome video, a written walkthrough and at least one hands-on
                lab before it can go live.
              </p>
              <div className="mt-4 space-y-2">
                {[
                  { t: "FWD-301 module 4 · content complete", ok: true },
                  { t: "FWD-301 module 5 · labs pending", ok: false },
                  { t: "DSA-102 module 3 · review needed", ok: false },
                ].map((x) => (
                  <div key={x.t} className="flex items-center gap-2 text-xs font-semibold">
                    {x.ok ? (
                      <CheckCircle2 className="text-success size-3.5" />
                    ) : (
                      <CircleAlert className="text-warning size-3.5" />
                    )}
                    <span className="text-ink-foreground/80">{x.t}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <Button asChild variant="ghost" size="sm">
          <Link to="/app/instructor/lessons/create">
            Quick-add a lesson <ArrowRight className="ml-1 size-4" />
          </Link>
        </Button>
      </div>
    </AppShell>
  );
}
