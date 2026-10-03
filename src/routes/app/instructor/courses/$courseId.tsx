"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Eye,
  FileText,
  GripVertical,
  PlayCircle,
  Plus,
  Rocket,
  Search,
  Settings2,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useInstructorCourse } from "@/lib/query/instructor";
import type { InstructorCourse } from "@/lib/api/instructor";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/instructor/courses/$courseId")({
  head: () => ({
    meta: [
      { title: "Course Builder — CEA-OS" },
      { name: "description", content: "Build and manage course modules, lessons and publishing." },
    ],
  }),
  component: CourseBuilder,
});

const typeIcon = (type: string) =>
  type === "video" ? PlayCircle : type === "quiz" ? Sparkles : FileText;

function CourseBuilder() {
  const { courseId } = Route.useParams();
  const courseQuery = useInstructorCourse(courseId);

  return (
    <AppShell
      roleKey="instructor"
      title={courseQuery.data ? `Course builder · ${courseQuery.data.title}` : "Course builder"}
      subtitle={courseQuery.data ? `${courseQuery.data.cohort} · last saved 2 min ago` : "Loading…"}
      actions={
        <>
          <Badge
            className={cn(
              "border-0 font-semibold",
              courseQuery.data?.status === "published"
                ? "bg-success/10 text-success"
                : "bg-warning/10 text-warning",
            )}
          >
            {courseQuery.data?.status === "published" ? "Published" : "Draft"}
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            Autosave on
          </Badge>
          <Button size="sm" className="bg-gradient-brand border-0">
            <Eye className="mr-1.5 size-3.5" /> Preview
          </Button>
        </>
      }
    >
      <QueryState<InstructorCourse> query={courseQuery} error={{ title: "Course unavailable" }}>
        {(course) => (
          <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
            <div className="space-y-4">
              <Card className="bg-card shadow-soft border">
                <CardContent className="p-5">
                  <label className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                    Course title
                  </label>
                  <input
                    type="text"
                    defaultValue={course.title}
                    className="font-display bg-muted mt-2 w-full rounded-xl border-0 px-4 py-3 text-base font-bold outline-none"
                  />
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                        Department
                      </label>
                      <select className="bg-muted mt-2 w-full rounded-xl border-0 px-3 py-2.5 text-sm font-semibold outline-none">
                        <option>Software Engineering</option>
                        <option>Cloud & DevOps</option>
                        <option>Design</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                        Programme
                      </label>
                      <select className="bg-muted mt-2 w-full rounded-xl border-0 px-3 py-2.5 text-sm font-semibold outline-none">
                        <option>Full-Stack Software Development</option>
                        <option>Cloud Engineering & DevOps</option>
                        <option>Product & UI/UX Design</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {course.modules.map((mod, mi) => (
                <Card key={mod.id} className="bg-card shadow-soft border">
                  <CardHeader className="flex-row items-center gap-2">
                    <GripVertical className="text-muted-foreground/60 size-4 shrink-0" />
                    <span className="bg-gradient-brand text-white font-display grid size-7 shrink-0 place-items-center rounded-lg text-[10px] font-bold">
                      M{mi + 1}
                    </span>
                    <CardTitle className="font-display flex-1 text-sm font-extrabold">
                      {mod.title}
                    </CardTitle>
                    <Badge variant="secondary" className="font-semibold">
                      {mod.lessons.filter((l) => l.status === "published").length} published
                    </Badge>
                    <Settings2 className="text-muted-foreground size-4" />
                    <ChevronDown className="text-muted-foreground size-4" />
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {mod.lessons.map((lesson, li) => {
                      const Icon = typeIcon(lesson.type);
                      const draft = lesson.status === "draft";
                      return (
                        <div
                          key={lesson.title}
                          className={cn(
                            "flex items-center gap-3 rounded-xl border p-3.5",
                            draft && "border-dashed bg-muted/40",
                          )}
                        >
                          <GripVertical className="text-muted-foreground/50 size-4 shrink-0" />
                          <span
                            className={cn(
                              "grid size-9 shrink-0 place-items-center rounded-lg",
                              draft
                                ? "bg-muted text-muted-foreground"
                                : "bg-primary/10 text-primary",
                            )}
                          >
                            <Icon className="size-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold">{lesson.title}</p>
                            <p className="text-muted-foreground text-xs capitalize">
                              {lesson.type} · {draft ? "draft" : "published"}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary text-xs font-semibold"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground text-xs font-semibold"
                          >
                            {li === 0 ? "Add below" : "Duplicate"}
                          </Button>
                        </div>
                      );
                    })}
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 w-full border-dashed font-semibold"
                    >
                      <Plus className="mr-1.5 size-3.5" /> Add lesson
                    </Button>
                  </CardContent>
                </Card>
              ))}

              <Button variant="outline" className="w-full border-dashed font-semibold">
                <Plus className="mr-1.5 size-4" /> Add module
              </Button>
            </div>

            <div className="space-y-5">
              <Card className="bg-card shadow-soft border">
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                    <Rocket className="text-primary size-4" /> Publish checklist
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { t: "≥ 1 module with ≥ 3 lessons", ok: true },
                    { t: "Module 3 drafts resolved", ok: false },
                    { t: "Thumbnail & description set", ok: true },
                    { t: "Prerequisites linked", ok: false },
                    { t: "Learning outcomes listed", ok: true },
                  ].map((item) => (
                    <div key={item.t} className="flex items-center gap-3 rounded-xl border p-3">
                      <CheckCircle2
                        className={cn(
                          "size-4 shrink-0",
                          item.ok ? "text-success" : "text-muted-foreground/40",
                        )}
                      />
                      <p className="flex-1 text-sm font-semibold">{item.t}</p>
                      <Badge
                        className={cn(
                          "border-0 font-semibold",
                          item.ok ? "bg-success/10 text-success" : "bg-warning/10 text-warning",
                        )}
                      >
                        {item.ok ? "Ok" : "Action"}
                      </Badge>
                    </div>
                  ))}
                  <Button className="bg-gradient-brand w-full border-0">
                    Publish course <ArrowRight className="ml-1.5 size-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card shadow-soft border">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                    <Search className="text-primary size-4" /> Analytics preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { t: "Completion rate", v: "82%", tone: "bg-success/10 text-success" },
                    {
                      t: "Avg. lesson time",
                      v: "31m vs 26m target",
                      tone: "bg-primary/10 text-primary",
                    },
                    {
                      t: "Drop-off lesson",
                      v: "L5 · Node runtime",
                      tone: "bg-error/10 text-error",
                    },
                  ].map((x) => (
                    <div
                      key={x.t}
                      className="flex items-center justify-between rounded-xl border p-3"
                    >
                      <span className="text-sm font-semibold">{x.t}</span>
                      <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
                <CardContent className="p-6">
                  <Sparkles className="text-warning size-5" />
                  <p className="font-display mt-3 text-base font-extrabold">Publishing tip</p>
                  <p className="text-ink-foreground/70 mt-1 text-sm">
                    Resolve the two open checklist items and this course is ready for Cohort 16
                    preview signups.
                  </p>
                </CardContent>
              </Card>

              <Link
                to="/app/learn"
                className="text-muted-foreground hover:text-primary flex items-center gap-2 text-sm font-semibold transition-colors"
              >
                <ArrowLeft className="size-4" /> Student preview of this course
              </Link>
            </div>
          </div>
        )}
      </QueryState>
    </AppShell>
  );
}
