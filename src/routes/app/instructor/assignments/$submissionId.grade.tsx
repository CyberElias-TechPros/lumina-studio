import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileCode2,
  FileText,
  MessageSquare,
  Send,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { submissionById } from "@/data/learning";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/instructor/assignments/$submissionId/grade")({
  head: ({ params }) => {
    const s = submissionById(params.submissionId);
    return { meta: [{ title: `Grade — ${s?.student ?? "Submission"} — CEA-OS` }] };
  },
  component: Grader,
});

const criteria = [
  { c: "API design & routes", w: 20, score: 17 },
  { c: "Auth & security", w: 25, score: 23 },
  { c: "Data layer", w: 25, score: 24 },
  { c: "Tests & docs", w: 15, score: 13 },
  { c: "Code quality", w: 15, score: 14 },
];

function Grader() {
  const { submissionId } = Route.useParams();
  const s = submissionById(submissionId);
  if (!s) throw notFound();

  const total = criteria.reduce((sum, c) => sum + c.score, 0);
  const rubric = [
    { name: "Express routes", lines: 214, status: "ok" },
    { name: "Auth middleware", lines: 128, status: "ok" },
    { name: "Prisma schema", lines: 96, status: "ok" },
    { name: "tests/api.test.ts", lines: 310, status: "warn" },
  ];

  return (
    <AppShell
      roleKey="instructor"
      title={`Grading — ${s.student}`}
      subtitle={`${s.title} · submitted ${s.submitted}${s.late ? " · LATE" : ""}`}
      actions={
        <>
          <Badge
            className={cn(
              "border-0 font-semibold",
              s.late ? "bg-error/10 text-error" : "bg-success/10 text-success",
            )}
          >
            {s.late ? "Late (−5%)" : "On time"}
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            Auto-checks passed 8/9
          </Badge>
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <div className="space-y-5">
          <Card className="bg-card shadow-soft overflow-hidden border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <FileCode2 className="text-primary size-4" /> Submission files
              </CardTitle>
              <Badge variant="secondary" className="font-semibold">
                {s.file} · {s.size}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              {rubric.map((f) => (
                <div key={f.name} className="flex items-center gap-3 rounded-xl border p-3">
                  <span className="bg-muted text-muted-foreground grid size-8 shrink-0 place-items-center rounded-lg">
                    <FileCode2 className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-mono text-xs font-bold">{f.name}</p>
                    <p className="text-muted-foreground text-[11px]">{f.lines} lines</p>
                  </div>
                  <Badge
                    className={cn(
                      "border-0 font-semibold",
                      f.status === "ok"
                        ? "bg-success/10 text-success"
                        : "bg-warning/10 text-warning",
                    )}
                  >
                    {f.status === "ok" ? "Checks passed" : "1 lint warning"}
                  </Badge>
                </div>
              ))}
              <div className="bg-muted flex items-center gap-3 rounded-xl p-4">
                <FileText className="text-muted-foreground size-4 shrink-0" />
                <p className="text-muted-foreground flex-1 text-xs font-semibold">
                  Plagiarism scan: <strong className="text-success">3% similarity</strong> · npm
                  audit:
                  <strong className="text-success"> 0 critical</strong>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <MessageSquare className="text-primary size-4" /> Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                rows={4}
                defaultValue={
                  "Strong submission — auth rotation is implemented correctly and the schema is well indexed. Watch the test for the rate-limiter edge case (it skipped the 429 path)."
                }
                className="bg-muted w-full rounded-xl border-0 px-4 py-3 text-sm leading-relaxed outline-none"
              />
              <div className="flex flex-wrap gap-2">
                {["Great auth flow", "Missing 429 test", "Docs excellent"].map((t) => (
                  <Badge key={t} variant="secondary" className="cursor-pointer font-semibold">
                    + {t}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Star className="text-primary size-4" /> Rubric
              </CardTitle>
              <span className="text-muted-foreground text-xs font-semibold">total · 100</span>
            </CardHeader>
            <CardContent className="space-y-4">
              {criteria.map((c) => (
                <div key={c.c}>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>{c.c}</span>
                    <span>
                      <strong>{c.score}</strong>
                      <span className="text-muted-foreground"> / {c.w}</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={c.w}
                    defaultValue={c.score}
                    aria-label={`${c.c} score`}
                    className="mt-2 w-full accent-[var(--primary)]"
                  />
                </div>
              ))}
              <div className="bg-muted flex items-center justify-between rounded-xl px-4 py-3">
                <span className="text-xs font-bold">Final score</span>
                <span className="font-display text-lg font-extrabold">{total}%</span>
              </div>
              <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="text-success size-3.5" /> Autosaved draft · not yet
                returned
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-3">
            <Button className="bg-gradient-brand w-full border-0">
              <Send className="mr-1.5 size-4" /> Return grade to {s.student.split(" ")[0]}
            </Button>
            <Button variant="outline" className="w-full font-semibold">
              Save draft
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <Link
              to="/app/instructor/assignments"
              className="text-muted-foreground hover:text-primary flex items-center gap-2 text-sm font-semibold transition-colors"
            >
              <ArrowLeft className="size-4" /> Queue
            </Link>
            <Link
              to="/app/instructor/assignments/$submissionId/grade"
              params={{ submissionId: "s2" }}
              className="text-primary flex items-center gap-2 text-sm font-semibold"
            >
              Next <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
