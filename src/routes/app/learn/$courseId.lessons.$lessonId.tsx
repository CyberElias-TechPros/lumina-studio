"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, CheckCircle2, LockKeyhole } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useSessionUser } from "@/components/app/session-provider";
import { useCourse, useCompleteLesson } from "@/lib/query/courses";
import type { LearningCourse, Lesson } from "@/data/learning";
import { isMockMode } from "@/lib/env";
import { getErrorMessage } from "@/lib/errors";

export const Route = createFileRoute("/app/learn/$courseId/lessons/$lessonId")({
  head: () => ({ meta: [{ title: "Lesson — CEA-OS" }] }),
  component: LessonViewer,
});

function LessonViewer() {
  const { courseId, lessonId } = Route.useParams();
  const courseQuery = useCourse(courseId);
  return (
    <AppShell roleKey="learn" title="Lesson" subtitle={courseQuery.data?.title ?? "Course"}>
      <QueryState<LearningCourse> query={courseQuery} error={{ title: "Lesson unavailable" }}>
        {(course) => {
          const lesson = course.modules
            .flatMap((module) => module.lessons)
            .find((item) => item.id === lessonId);
          return lesson ? (
            <LessonContent key={`${course.slug}:${lesson.id}`} course={course} lesson={lesson} />
          ) : (
            <Card>
              <CardContent className="space-y-4 p-6">
                <p>This lesson is not part of {course.title}.</p>
                <Link to="/app/learn/$courseId" params={{ courseId: course.slug }}>
                  Back to course
                </Link>
              </CardContent>
            </Card>
          );
        }}
      </QueryState>
    </AppShell>
  );
}

function LessonContent({ course, lesson }: { course: LearningCourse; lesson: Lesson }) {
  const user = useSessionUser();
  const completion = useCompleteLesson(course.slug, lesson.id);
  const readable = ["preview", "in-progress", "done"].includes(lesson.status);
  const hasText = Boolean(lesson.body?.trim());
  const canComplete =
    readable &&
    hasText &&
    lesson.type === "article" &&
    lesson.status !== "done" &&
    user?.roleKey === "student" &&
    !isMockMode;

  return (
    <section
      className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)]"
      data-testid="lesson-content"
    >
      <div className="space-y-5">
        <Card>
          <CardContent className="space-y-5 p-6">
            <h2 className="font-display text-2xl font-bold">{lesson.title}</h2>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{lesson.type}</Badge>
              <Badge variant="outline">{lesson.duration}</Badge>
              <Badge variant="outline">{lesson.status}</Badge>
            </div>
            {!readable ? (
              <p className="flex items-center gap-2">
                <LockKeyhole aria-hidden="true" className="size-4" />
                This lesson is locked. Contact admissions or your instructor to confirm access.
              </p>
            ) : hasText ? (
              // Render as escaped text, not executable HTML or invented course material.
              <div className="whitespace-pre-wrap break-words text-base leading-relaxed">
                {lesson.body}
              </div>
            ) : (
              <p>
                No lesson text has been published for this item. Ask your instructor for the
                learning material.
              </p>
            )}
            {readable && lesson.type !== "article" && (
              <p className="text-muted-foreground text-sm">
                A working player, interactive assessment or submission form is not available in this
                lesson view yet. Any text shown above is instructor-supplied notes. No assessment
                result is implied.
              </p>
            )}
            {isMockMode && (
              <p className="text-muted-foreground text-sm">
                Preview data only. Progress cannot be saved in demo mode.
              </p>
            )}
            {lesson.status === "done" && (
              <p role="status" className="flex items-center gap-2">
                <CheckCircle2 aria-hidden="true" className="size-4" />
                Completion recorded by the Academy.
              </p>
            )}
            {canComplete && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button disabled={completion.isPending || completion.isSuccess}>
                    {completion.isPending ? "Saving completion…" : "Mark lesson complete"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Record lesson completion?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Confirm you have finished reading this lesson. This records learning progress,
                      not a grade or certificate.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Not yet</AlertDialogCancel>
                    <AlertDialogAction onClick={() => completion.mutate()}>
                      Confirm completion
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            {completion.isError && (
              <p role="alert">
                {getErrorMessage(completion.error)} Refresh your course to check the current
                progress before retrying.
              </p>
            )}
            {completion.isSuccess && lesson.status !== "done" && (
              <p role="status">
                The server accepted completion. Refresh the course if its status has not updated.
              </p>
            )}
            <Link
              to="/app/learn/$courseId"
              params={{ courseId: course.slug }}
              className="text-primary flex items-center gap-2 font-semibold"
            >
              <ArrowLeft aria-hidden="true" className="size-4" /> Back to {course.title}
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-2 p-6">
            <h3 className="font-semibold">Questions and learning materials</h3>
            <p className="text-muted-foreground text-sm">
              No discussion or downloadable resources are supplied by this lesson API. Contact your
              instructor using Messages; this page does not invent replies, files or quiz scores.
            </p>
            <Link to="/app/messages" className="text-primary font-semibold">
              Open Messages
            </Link>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent className="space-y-4 p-6">
          <h3 className="font-semibold">Course lessons</h3>
          {course.modules.map((module) => (
            <div key={module.id} className="space-y-2">
              <h4 className="font-semibold">{module.title}</h4>
              <ul className="space-y-2">
                {module.lessons.map((item) => (
                  <li key={item.id}>
                    {item.status === "locked" ? (
                      <span className="text-muted-foreground">{item.title} — locked</span>
                    ) : (
                      <Link
                        to="/app/learn/$courseId/lessons/$lessonId"
                        params={{ courseId: course.slug, lessonId: item.id }}
                        aria-current={item.id === lesson.id ? "page" : undefined}
                        className="text-primary hover:underline"
                      >
                        {item.title}
                        {item.status === "done" ? " — complete" : ""}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
