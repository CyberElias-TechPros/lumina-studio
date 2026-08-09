import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  FileDown,
  FileText,
  Link2,
  ListChecks,
  Paperclip,
  UploadCloud,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useAssignment } from "@/lib/query/assignments";
import type { StudentAssignment } from "@/data/learning";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/assignments/$assignmentId")({
  head: () => ({
    meta: [{ title: "Assignment — CEA-OS" }],
  }),
  component: AssignmentDetail,
});

function AssignmentDetail() {
  const { assignmentId } = Route.useParams();
  const aQuery = useAssignment(assignmentId);

  return (
    <AppShell
      roleKey="assignments"
      title="Assignment"
      subtitle="Loading…"
      actions={
        <>
          <Badge variant="secondary" className="font-semibold">
            Assignment detail
          </Badge>
        </>
      }
    >
      <QueryState<StudentAssignment> query={aQuery} error={{ title: "Assignment unavailable" }}>
        {(a) => (
          <>
            <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
              <div className="space-y-5">
                <Card className="bg-card shadow-soft border">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                      Brief
                    </p>
                    <p className="mt-2 text-sm leading-relaxed">{a.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["Express", "PostgreSQL", "JWT", "Supertest"].map((t) => (
                        <Badge key={t} variant="secondary" className="font-semibold">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card shadow-soft border">
                  <CardHeader className="flex-row items-center justify-between">
                    <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                      <ListChecks className="text-primary size-4" /> Rubric
                    </CardTitle>
                    <Badge variant="secondary" className="font-semibold">
                      {a.max} marks
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {a.rubric.map((r, i) => (
                      <div
                        key={r.criterion}
                        className="flex items-center gap-3 rounded-xl border p-3.5"
                      >
                        <span className="bg-gradient-brand text-white font-display grid size-8 shrink-0 place-items-center rounded-lg text-xs font-bold">
                          {r.weight}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold">
                            {i + 1}. {r.criterion}
                          </p>
                          <p className="text-muted-foreground text-xs">{r.detail}</p>
                        </div>
                        <span className="text-muted-foreground text-xs font-semibold">
                          {r.weight}%
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-card shadow-soft border">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                      Attachments
                    </p>
                    <div className="mt-3 space-y-2">
                      {[
                        {
                          name: "starter-repo-link",
                          meta: "GitHub · clone and push your fork",
                          icon: Link2,
                        },
                        { name: "acceptance-criteria.pdf", meta: "PDF · 240 KB", icon: FileDown },
                      ].map((f) => (
                        <div
                          key={f.name}
                          className="flex items-center gap-3 rounded-xl border p-3.5"
                        >
                          <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                            <f.icon className="size-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold">{f.name}</p>
                            <p className="text-muted-foreground text-xs">{f.meta}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary text-xs font-semibold"
                          >
                            Open
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-5">
                {a.status === "graded" && a.score !== undefined ? (
                  <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
                    <CardContent className="p-6">
                      <p className="text-ink-foreground/60 text-xs font-bold tracking-[0.16em] uppercase">
                        Grade
                      </p>
                      <p className="font-display mt-2 text-3xl font-extrabold">{a.score}%</p>
                      <p className="text-ink-foreground/70 mt-1 text-sm">
                        A- · rubric feedback attached. Dispute window closes Aug 28.
                      </p>
                      <Button size="sm" className="bg-gradient-brand shadow-glow mt-4 border-0">
                        View feedback <ArrowRight className="ml-1 size-3.5" />
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-card shadow-soft border">
                    <CardHeader>
                      <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                        <UploadCloud className="text-primary size-4" /> Submission
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {a.submissions?.length ? (
                        a.submissions.map((s) => (
                          <div
                            key={s.file}
                            className="flex items-center gap-3 rounded-xl border p-3.5"
                          >
                            <span className="bg-success/10 text-success grid size-9 shrink-0 place-items-center rounded-lg">
                              <Paperclip className="size-4" />
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-bold">{s.file}</p>
                              <p className="text-muted-foreground text-xs">
                                {s.size} · {s.uploaded}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-primary text-xs font-semibold"
                            >
                              View
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-xl border border-dashed p-6 text-center">
                          <UploadCloud className="text-muted-foreground mx-auto size-8" />
                          <p className="mt-2 text-sm font-bold">Nothing submitted yet</p>
                          <p className="text-muted-foreground mt-1 text-xs">
                            Zip your repo or share a link
                          </p>
                          <Button size="sm" className="bg-gradient-brand mt-4 border-0">
                            <UploadCloud className="mr-1.5 size-4" /> Upload submission
                          </Button>
                        </div>
                      )}
                      {a.status !== "graded" && (
                        <p className="text-muted-foreground text-xs">
                          You can resubmit before the deadline — latest submission wins.
                        </p>
                      )}
                    </CardContent>
                  </Card>
                )}

                <Card className="bg-card shadow-soft border">
                  <CardHeader>
                    <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                      <CalendarDays className="text-primary size-4" /> Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { t: "Opened", d: "Jul 24", done: true },
                      { t: "Due", d: a.due, done: a.status !== "pending" },
                      {
                        t: "Grade published",
                        d: "Within 7 days of due date",
                        done: a.status === "graded",
                      },
                    ].map((s) => (
                      <div key={s.t} className="flex items-center gap-3">
                        <CheckCircle2
                          className={cn(
                            "size-4 shrink-0",
                            s.done ? "text-success" : "text-muted-foreground/30",
                          )}
                        />
                        <div className="flex flex-1 items-center justify-between border-b pb-3">
                          <p className="text-sm font-semibold">{s.t}</p>
                          <p className="text-muted-foreground text-xs">{s.d}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Link
                  to="/app/assignments"
                  className="text-muted-foreground hover:text-primary flex items-center gap-2 text-sm font-semibold transition-colors"
                >
                  <ArrowLeft className="size-4" /> All assignments
                </Link>
              </div>
            </div>
          </>
        )}
      </QueryState>
    </AppShell>
  );
}
