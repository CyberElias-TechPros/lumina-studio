"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  FileText,
  LockKeyhole,
  PlayCircle,
} from "lucide-react";
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

function renderLinkedBody(text: string) {
  const urlRegex = /(https:\/\/[^\s),.;]+)/g;
  const lines = text.split("\n");
  return lines.map((line, lineIdx) => {
    const parts = line.split(urlRegex);
    return (
      <p key={lineIdx} className="leading-relaxed">
        {parts.map((part, partIdx) =>
          part.startsWith("https://") ? (
            <a
              key={partIdx}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary inline-flex items-center gap-1 font-semibold underline"
            >
              {part}
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          ) : (
            <span key={partIdx}>{part}</span>
          ),
        )}
      </p>
    );
  });
}

function LessonViewer() {
  const { courseId, lessonId } = Route.useParams();
  const courseQuery = useCourse(courseId);
  return (
    <AppShell roleKey="learn" title="Lesson" subtitle={courseQuery.data?.title ?? "Course"}>
      <QueryState<LearningCourse> query={courseQuery} error={{ title: "Lesson unavailable" }}>
        {(course) => {
          const allLessons = course.modules.flatMap((module) => module.lessons);
          const idx = allLessons.findIndex((item) => item.id === lessonId);
          const lesson = idx >= 0 ? allLessons[idx] : undefined;
          const prevLesson = idx > 0 ? allLessons[idx - 1] : undefined;
          const nextLesson =
            idx >= 0 && idx + 1 < allLessons.length ? allLessons[idx + 1] : undefined;
          return lesson ? (
            <LessonContent
              key={`${course.slug}:${lesson.id}`}
              course={course}
              lesson={lesson}
              prevLesson={prevLesson}
              nextLesson={nextLesson}
            />
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

function LessonContent({
  course,
  lesson,
  prevLesson,
  nextLesson,
}: {
  course: LearningCourse;
  lesson: Lesson;
  prevLesson?: Lesson;
  nextLesson?: Lesson;
}) {
  const user = useSessionUser();
  const completion = useCompleteLesson(course.slug, lesson.id);
  const readable = ["preview", "in-progress", "done"].includes(lesson.status);
  const hasText = Boolean(lesson.body?.trim());
  const canComplete =
    readable && hasText && lesson.status !== "done" && (user?.roleKey === "student" || isMockMode);

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
            ) : (
              <div className="space-y-4">
                {hasText ? (
                  <div className="space-y-2 break-words text-base">
                    {renderLinkedBody(lesson.body ?? "")}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No lesson text has been published yet.
                  </p>
                )}

                {lesson.type === "video" && (
                  <div className="bg-muted/40 flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4">
                    <div className="flex items-center gap-3">
                      <PlayCircle className="text-primary size-5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold">Live &amp; recorded walkthrough</p>
                        <p className="text-muted-foreground text-xs">
                          Join your cohort live session or review notes with your instructor.
                        </p>
                      </div>
                    </div>
                    <Button asChild size="sm" variant="outline">
                      <Link to="/app/live">Open live classes</Link>
                    </Button>
                  </div>
                )}

                {lesson.type === "quiz" && (
                  <div className="bg-muted/40 flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4">
                    <div className="flex items-center gap-3">
                      <ClipboardCheck className="text-primary size-5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold">Graded knowledge check</p>
                        <p className="text-muted-foreground text-xs">
                          Take the interactive assessment in your Assessments workspace.
                        </p>
                      </div>
                    </div>
                    <Button asChild size="sm" variant="outline">
                      <Link to="/app/assessments">Go to assessments</Link>
                    </Button>
                  </div>
                )}

                {lesson.type === "assignment" && (
                  <div className="bg-muted/40 flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="text-primary size-5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold">Practical assignment brief</p>
                        <p className="text-muted-foreground text-xs">
                          Submit your written work, repo link, or file attachment for grading.
                        </p>
                      </div>
                    </div>
                    <Button asChild size="sm" variant="outline">
                      <Link to="/app/assignments">Open assignments</Link>
                    </Button>
                  </div>
                )}
              </div>
            )}

            {lesson.status === "done" && (
              <p
                role="status"
                className="text-success flex items-center gap-2 text-sm font-semibold"
              >
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
                      Confirm you have finished studying this lesson. This records your course
                      progress.
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
              <p role="alert" className="text-destructive text-sm">
                {getErrorMessage(completion.error)} Refresh your course to check the current
                progress before retrying.
              </p>
            )}
            {completion.isSuccess && lesson.status !== "done" && (
              <p role="status" className="text-success text-sm">
                Completion recorded by the Academy.
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
              <Link
                to="/app/learn/$courseId"
                params={{ courseId: course.slug }}
                className="text-primary flex items-center gap-2 text-sm font-semibold"
              >
                <ArrowLeft aria-hidden="true" className="size-4" /> Back to {course.title}
              </Link>
              <div className="flex items-center gap-2">
                {prevLesson && prevLesson.status !== "locked" && (
                  <Button asChild variant="outline" size="sm">
                    <Link
                      to="/app/learn/$courseId/lessons/$lessonId"
                      params={{ courseId: course.slug, lessonId: prevLesson.id }}
                    >
                      <ArrowLeft className="size-3.5" /> Previous
                    </Link>
                  </Button>
                )}
                {nextLesson && nextLesson.status !== "locked" && (
                  <Button asChild size="sm">
                    <Link
                      to="/app/learn/$courseId/lessons/$lessonId"
                      params={{ courseId: course.slug, lessonId: nextLesson.id }}
                    >
                      Next lesson <ArrowRight className="size-3.5" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-2 p-6">
            <h3 className="font-semibold">Need help with this lesson?</h3>
            <p className="text-muted-foreground text-sm">
              Message your instructor directly in Messages or bring questions to your cohort&apos;s
              live Q&amp;A session.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link to="/app/messages" className="text-primary text-sm font-semibold underline">
                Open Messages
              </Link>
              <Link to="/app/live" className="text-primary text-sm font-semibold underline">
                Join Live Class
              </Link>
            </div>
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
