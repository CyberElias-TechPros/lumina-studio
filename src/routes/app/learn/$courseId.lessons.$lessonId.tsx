import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  ListVideo,
  MessageSquare,
  PlayCircle,
  Send,
  Volume2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useCourse } from "@/lib/query/courses";
import type { LearningCourse } from "@/data/learning";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/learn/$courseId/lessons/$lessonId")({
  head: () => ({
    meta: [{ title: "Lesson — CEA-OS" }],
  }),
  component: LessonViewer,
});

const videos = ["Auth, sessions & JWT", "How the internet works", "Color & contrast"];

function LessonViewer() {
  const { courseId, lessonId } = Route.useParams();
  const courseQuery = useCourse(courseId);

  return (
    <AppShell
      roleKey="learn"
      title="Lesson"
      subtitle={courseQuery.data ? courseQuery.data.title : "Course"}
      actions={
        <Badge variant="secondary" className="font-semibold">
          Lesson progress
        </Badge>
      }
    >
      <QueryState<LearningCourse> query={courseQuery} error={{ title: "Lesson unavailable" }}>
        {(course) => {
          const lesson = course.modules.flatMap((m) => m.lessons).find((l) => l.id === lessonId);
          if (!lesson) {
            return (
              <Card className="bg-card shadow-soft border">
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground text-sm font-semibold">
                    This lesson isn't part of {course.title}.
                  </p>
                  <Link
                    to="/app/learn/$courseId"
                    params={{ courseId: course.slug }}
                    className="hover:text-primary mt-2 inline-block text-sm font-bold"
                  >
                    Back to course
                  </Link>
                </CardContent>
              </Card>
            );
          }
          const module = course.modules.find((m) => m.lessons.some((l) => l.id === lesson.id))!;
          const allLessons = course.modules.flatMap((m) => m.lessons);
          const flatIndex = allLessons.findIndex((l) => l.id === lesson.id);
          const prev = flatIndex > 0 ? allLessons[flatIndex - 1] : null;
          const next = flatIndex < allLessons.length - 1 ? allLessons[flatIndex + 1] : null;
          const isVideo = lesson.type === "video";
          const isQuiz = lesson.type === "quiz";

          return (
            <>
              <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
                <div className="space-y-5">
                  <Card className="bg-card shadow-soft overflow-hidden border">
                    <div className="bg-gradient-ink relative flex aspect-video items-center justify-center">
                      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:32px_32px]" />
                      {isVideo ? (
                        <button
                          type="button"
                          aria-label="Play lesson video"
                          className="bg-gradient-brand shadow-glow grid size-20 place-items-center rounded-full transition-transform hover:scale-105"
                        >
                          <PlayCircle className="size-9 text-white" />
                        </button>
                      ) : (
                        <div className="relative text-center">
                          <BookOpen className="text-career mx-auto size-12" />
                          <p className="font-display mt-3 text-sm font-extrabold text-white">
                            {isQuiz ? "Interactive quiz" : "Reading view"}
                          </p>
                        </div>
                      )}
                    </div>
                    <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
                      <div className="flex items-center gap-4 text-xs font-semibold">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          <Clock className="size-3.5" /> {lesson.duration}
                        </span>
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          <Volume2 className="size-3.5" /> {isVideo ? "Audio: English" : "Text"}
                        </span>
                        <Badge variant="secondary" className="font-semibold">
                          {lesson.type}
                        </Badge>
                      </div>
                      <Button size="sm" className="bg-gradient-brand border-0">
                        <CheckCircle2 className="mr-1.5 size-4" /> Mark complete
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-card shadow-soft border">
                    <CardContent className="prose prose-sm prose-neutral dark:prose-invert max-w-none p-6">
                      {isVideo ? (
                        <>
                          <h3 className="font-display text-lg font-extrabold">Key takeaways</h3>
                          <p>
                            Session tokens and JWTs solve the same problem in different ways. This
                            lesson walks through when each makes sense, how refresh token rotation
                            works, and the attack surfaces you must defend in production.
                          </p>
                          <ul>
                            <li>Stateless JWT vs stateful session trade-offs</li>
                            <li>Secure cookie attributes: HttpOnly, Secure, SameSite</li>
                            <li>Refresh-token rotation and reuse detection</li>
                            <li>Rate limiting and brute-force protection on login</li>
                          </ul>
                          <p>
                            The in-lesson exercise has you lock down an Express API with both
                            strategies and a penetration checklist to verify each one.
                          </p>
                        </>
                      ) : isQuiz ? (
                        <div className="space-y-4">
                          <h3 className="font-display text-lg font-extrabold">
                            Knowledge check · 5 questions
                          </h3>
                          {[
                            {
                              q: "Which token strategy is stateless by design?",
                              a: "JWT — signed, self-contained claims",
                            },
                            {
                              q: "What does HttpOnly protect against?",
                              a: "JavaScript access to the cookie — XSS",
                            },
                            {
                              q: "Why rotate refresh tokens?",
                              a: "Limit replay window if a token leaks",
                            },
                          ].map((item, i) => (
                            <div key={item.q} className="rounded-xl border p-4">
                              <p className="text-sm font-bold">
                                {i + 1}. {item.q}
                              </p>
                              <p className="text-success mt-2 flex items-center gap-1.5 text-xs font-semibold">
                                <CheckCircle2 className="size-3.5" /> {item.a}
                              </p>
                            </div>
                          ))}
                          <p className="text-muted-foreground text-xs">
                            Your last attempt: <strong className="text-success">4 / 5</strong> ·
                            retakes allowed: 3
                          </p>
                        </div>
                      ) : (
                        <>
                          <h3 className="font-display text-lg font-extrabold">Reading material</h3>
                          <p>
                            This lesson is a written deep-dive. Work through the sections at your
                            own pace — the checkpoint at the end unlocks the next lesson.
                          </p>
                          <ul>
                            <li>Section 1: Why this matters in production</li>
                            <li>Section 2: Step-by-step walkthrough with code</li>
                            <li>Section 3: Common pitfalls and debugging</li>
                          </ul>
                        </>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-card shadow-soft border">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="text-primary size-4" />
                        <h3 className="font-display flex-1 text-sm font-extrabold">
                          Lesson discussion
                        </h3>
                        <Badge variant="secondary" className="font-semibold">
                          12 replies
                        </Badge>
                      </div>
                      <div className="mt-4 space-y-3">
                        {[
                          {
                            from: "Zainab K.",
                            msg: "Does refresh token rotation work with mobile clients?",
                          },
                          {
                            from: "Instructor · Prof. Adaeze O.",
                            msg: "Yes — same rotation logic; store the session in secure storage, not AsyncStorage.",
                          },
                        ].map((m) => (
                          <div
                            key={m.from}
                            className="flex items-start gap-3 rounded-xl border p-3"
                          >
                            <span className="bg-gradient-brand text-primary-foreground font-display grid size-8 shrink-0 place-items-center rounded-full text-[10px] font-bold">
                              {m.from
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                            </span>
                            <div>
                              <p className="text-xs font-bold">{m.from}</p>
                              <p className="text-muted-foreground mt-0.5 text-xs leading-relaxed">
                                {m.msg}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex gap-2">
                        <input
                          type="text"
                          placeholder="Ask a question…"
                          className="bg-muted flex-1 rounded-xl border-0 px-4 py-2.5 text-sm outline-none"
                        />
                        <Button
                          size="sm"
                          className="bg-gradient-brand border-0"
                          aria-label="Post reply"
                        >
                          <Send className="size-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-5">
                  <Card className="bg-card shadow-soft border">
                    <CardContent className="p-3">
                      <p className="text-muted-foreground flex items-center gap-2 px-3 py-2 text-xs font-bold tracking-wide uppercase">
                        <ListVideo className="size-3.5" /> {course.title}
                      </p>
                      <div className="space-y-1">
                        {course.modules.map((m, mi) => (
                          <div key={m.id}>
                            <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold">
                              <ChevronDown className="text-muted-foreground size-3.5" />
                              {mi + 1}. {m.title}
                            </div>
                            <div className="space-y-1 border-l border-border ml-[1.35rem] pl-1">
                              {m.lessons.map((l, li) => {
                                const active = l.id === lesson.id;
                                const doneLesson = l.status === "done";
                                return (
                                  <Link
                                    key={l.id}
                                    to={
                                      l.status === "locked"
                                        ? "/app/learn/$courseId"
                                        : "/app/learn/$courseId/lessons/$lessonId"
                                    }
                                    params={{ courseId: course.slug, lessonId: l.id }}
                                    className={cn(
                                      "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs transition-colors",
                                      active
                                        ? "bg-primary/10 text-primary font-bold"
                                        : "hover:bg-muted/60 font-semibold",
                                      l.status === "locked" && "opacity-50",
                                    )}
                                  >
                                    {doneLesson ? (
                                      <CheckCircle2 className="text-success size-3.5 shrink-0" />
                                    ) : active ? (
                                      <PlayCircle className="size-3.5 shrink-0" />
                                    ) : (
                                      <ChevronRight className="text-muted-foreground size-3.5 shrink-0" />
                                    )}
                                    <span className="min-w-0 flex-1 truncate">
                                      {li + 1}. {l.title}
                                    </span>
                                    <span className="text-muted-foreground shrink-0">
                                      {l.duration}
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card shadow-soft border">
                    <CardContent className="p-4">
                      <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                        Materials
                      </p>
                      <div className="mt-3 space-y-2">
                        {[
                          { name: "Lesson slides (PDF)", size: "2.4 MB" },
                          { name: "Starter repository", size: "GitHub" },
                          { name: "Cheat sheet: JWT vs session", size: "PDF" },
                        ].map((f) => (
                          <div
                            key={f.name}
                            className="flex items-center gap-3 rounded-xl border p-3"
                          >
                            <span className="bg-muted text-muted-foreground grid size-8 shrink-0 place-items-center rounded-lg">
                              <FileText className="size-4" />
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-xs font-bold">{f.name}</p>
                              <p className="text-muted-foreground text-[11px]">{f.size}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-primary text-xs font-semibold"
                            >
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {prev ? (
                  <Link
                    to="/app/learn/$courseId/lessons/$lessonId"
                    params={{ courseId: course.slug, lessonId: prev.id }}
                    className="bg-card shadow-soft hover:shadow-elevated group flex items-center gap-3 rounded-2xl border p-4 transition-all hover:-translate-y-0.5"
                  >
                    <ArrowLeft className="text-muted-foreground group-hover:text-primary size-4" />
                    <div>
                      <p className="text-muted-foreground text-[11px] font-bold tracking-wide uppercase">
                        Previous
                      </p>
                      <p className="text-sm font-bold">{prev.title}</p>
                    </div>
                  </Link>
                ) : (
                  <span />
                )}
                {next ? (
                  <Link
                    to={
                      next.status === "locked"
                        ? "/app/learn/$courseId"
                        : "/app/learn/$courseId/lessons/$lessonId"
                    }
                    params={{ courseId: course.slug, lessonId: next.id }}
                    className="bg-card shadow-soft hover:shadow-elevated group flex items-center justify-end gap-3 rounded-2xl border p-4 text-right transition-all hover:-translate-y-0.5"
                  >
                    <div>
                      <p className="text-muted-foreground text-[11px] font-bold tracking-wide uppercase">
                        Next {next.status === "locked" ? "· locked" : ""}
                      </p>
                      <p className="text-sm font-bold">{next.title}</p>
                    </div>
                    <ArrowRight className="text-muted-foreground group-hover:text-primary size-4" />
                  </Link>
                ) : (
                  <span />
                )}
              </div>

              <p className="text-muted-foreground mt-4 flex items-center gap-1.5 text-xs">
                <ArrowLeft className="size-3.5" />
                <Link
                  to="/app/learn/$courseId"
                  params={{ courseId: course.slug }}
                  className="hover:text-primary font-semibold transition-colors"
                >
                  Back to {course.title}
                </Link>
              </p>
            </>
          );
        }}
      </QueryState>
    </AppShell>
  );
}
