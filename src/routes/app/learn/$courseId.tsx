import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  FileText,
  ListVideo,
  Lock,
  PlayCircle,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app/app-shell";
import { learningCourses, type LessonType } from "@/data/learning";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/learn/$courseId")({
  head: ({ params }) => ({
    meta: [
      {
        title: `${learningCourses.find((c) => c.slug === params.courseId)?.title ?? "Course"} — CEA-OS`,
      },
    ],
  }),
  component: CourseDetail,
});

const typeIcon = (type: LessonType) => {
  switch (type) {
    case "video":
      return PlayCircle;
    case "article":
      return FileText;
    case "quiz":
      return Award;
    default:
      return CheckCircle2;
  }
};

function CourseDetail() {
  const { courseId } = Route.useParams();
  const course = learningCourses.find((c) => c.slug === courseId);
  if (!course) throw notFound();

  const lessons = course.modules.flatMap((m) => m.lessons);
  const done = lessons.filter((l) => l.status === "done").length;
  const inProgress = lessons.find((l) => l.status === "in-progress");

  return (
    <AppShell
      roleKey="student"
      title={course.title}
      subtitle={`${course.instructor} · ${course.cohort}`}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {done} / {lessons.length} lessons done
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            {course.pct}% complete
          </Badge>
        </>
      }
    >
      <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
        <CardContent className="p-6">
          <p className="text-ink-foreground/60 text-xs font-bold tracking-[0.16em] uppercase">
            {course.subtitle}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-6 text-sm">
            <span className="flex items-center gap-2 text-ink-foreground/80">
              <Users className="size-4" /> 42 learners
            </span>
            <span className="flex items-center gap-2 text-ink-foreground/80">
              <Clock className="size-4" /> 22h of content
            </span>
            <span className="flex items-center gap-2 text-ink-foreground/80">
              <ListVideo className="size-4" /> {course.modules.length} modules
            </span>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <Progress value={course.pct} className="h-2 flex-1 bg-ink-foreground/15" />
            <span className="text-sm font-extrabold">{course.pct}%</span>
          </div>
          {inProgress && (
            <Link
              to="/app/learn/$courseId/lessons/$lessonId"
              params={{ courseId: course.slug, lessonId: inProgress.id }}
              className="bg-gradient-brand shadow-glow mt-5 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              Continue: {inProgress.title} <ArrowRight className="size-4" />
            </Link>
          )}
        </CardContent>
      </Card>

      <div className="mt-5 space-y-4">
        {course.modules.map((mod, mi) => {
          const modDone = mod.lessons.filter((l) => l.status === "done").length;
          return (
            <Card key={mod.id} className="bg-card shadow-soft border">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                  <span className="text-muted-foreground font-mono text-xs">M{mi + 1}</span>
                  {mod.title}
                </CardTitle>
                <Badge variant="secondary" className="font-semibold">
                  {modDone} / {mod.lessons.length}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-2">
                {mod.lessons.map((lesson, li) => {
                  const Icon = typeIcon(lesson.type);
                  const locked = lesson.status === "locked";
                  const doneLesson = lesson.status === "done";
                  const current = lesson.status === "in-progress";
                  return (
                    <Link
                      key={lesson.id}
                      to={
                        locked ? "/app/learn/$courseId" : "/app/learn/$courseId/lessons/$lessonId"
                      }
                      params={{ courseId: course.slug, lessonId: lesson.id }}
                      aria-disabled={locked}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border p-3.5 transition-colors",
                        locked
                          ? "bg-muted/50 cursor-not-allowed opacity-60"
                          : "hover:border-primary/40 hover:bg-primary/5",
                        current && "border-primary/60 bg-primary/5",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-9 shrink-0 place-items-center rounded-lg",
                          doneLesson
                            ? "bg-success/10 text-success"
                            : current
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground",
                        )}
                      >
                        {locked ? <Lock className="size-4" /> : <Icon className="size-4" />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className={cn("text-sm font-bold", current && "text-primary")}>
                          {li + 1}. {lesson.title}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {lesson.type === "assignment" ? "Assignment" : lesson.type} ·{" "}
                          {lesson.duration}
                        </p>
                      </div>
                      {doneLesson && (
                        <Badge className="bg-success/10 text-success border-0 font-semibold">
                          Done
                        </Badge>
                      )}
                      {current && (
                        <Badge className="bg-primary/10 text-primary border-0 font-semibold">
                          In progress
                        </Badge>
                      )}
                      <ArrowRight
                        className={cn(
                          "size-4",
                          locked ? "text-muted-foreground/50" : "text-muted-foreground",
                        )}
                      />
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/app/learn"
          className="text-muted-foreground hover:text-primary flex items-center gap-2 text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="size-4" /> All courses
        </Link>
        {inProgress && (
          <Link
            to="/app/learn/$courseId/lessons/$lessonId"
            params={{ courseId: course.slug, lessonId: inProgress.id }}
            className="bg-gradient-brand shadow-glow inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
          >
            Resume lesson <ArrowRight className="size-4" />
          </Link>
        )}
      </div>
    </AppShell>
  );
}
