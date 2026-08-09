import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  MonitorUp,
  Send,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useAssessment } from "@/lib/query/assessments";
import type { Assessment } from "@/data/learning";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/assessments/$assessmentId/take")({
  head: () => ({
    meta: [{ title: "Assessment — take — CEA-OS" }],
  }),
  component: AssessmentPlayer,
});

const questions = [
  {
    q: "Which statement best describes a JWT access token?",
    options: [
      "A server-side session store keyed by a random ID",
      "A signed, self-contained set of claims the server can verify",
      "An encrypted blob only the client can read",
      "A database row containing the user's password hash",
    ],
  },
  {
    q: "Why is the refresh token rotated after every use?",
    options: [
      "To reduce the replay window if a refresh token leaks",
      "Because access tokens expire every 5 minutes",
      "To avoid storing any state on the server",
      "To satisfy GDPR token retention rules",
    ],
  },
  {
    q: "Which cookie attribute prevents JavaScript from reading the session cookie?",
    options: ["Secure", "SameSite=Strict", "HttpOnly", "Domain"],
  },
  {
    q: "What is the primary defence against credential stuffing on the login endpoint?",
    options: ["Rate limiting", "Longer passwords", "Faster hashing", "Bigger token expiry"],
  },
  {
    q: "Which hashing algorithm is appropriate for storing passwords?",
    options: ["MD5", "SHA-256", "bcrypt with salt rounds", "Base64"],
  },
];

function AssessmentPlayer() {
  const { assessmentId } = Route.useParams();
  const aQuery = useAssessment(assessmentId);

  return (
    <AppShell
      roleKey="assessments"
      title="Assessment"
      subtitle="Loading…"
      actions={
        <>
          <Badge className="bg-error/10 text-error border-0 font-semibold">
            <Timer className="mr-1 size-3.5" /> 18:42 left
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            Attempt 1 of 3
          </Badge>
        </>
      }
    >
      <QueryState<Assessment> query={aQuery} error={{ title: "Assessment unavailable" }}>
        {(a) => {
          if (a.status !== "available") {
            return (
              <Card className="bg-card shadow-soft border">
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground text-sm font-semibold">
                    This assessment isn't open for you right now.
                  </p>
                  <Link
                    to="/app/assessments"
                    className="hover:text-primary mt-2 inline-block text-sm font-bold"
                  >
                    Back to assessments
                  </Link>
                </CardContent>
              </Card>
            );
          }
          return (
            <>
              <div className="bg-warning/10 text-warning mb-5 flex flex-wrap items-center gap-3 rounded-2xl border border-warning/20 p-4 text-sm">
                <MonitorUp className="size-4 shrink-0" />
                <p className="flex-1 text-xs font-semibold">
                  Proctoring active: tab-lock on, webcam sampling every 30s, clipboard and paste
                  disabled. Leaving the window is flagged for review.
                </p>
                <ShieldCheck className="size-4 shrink-0" />
              </div>

              <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
                <div className="space-y-5">
                  <Card className="bg-card shadow-soft border">
                    <CardContent className="p-6">
                      <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                        Question 1 · single choice
                      </p>
                      <h2 className="font-display mt-3 text-lg font-extrabold">{questions[0].q}</h2>
                      <div className="mt-5 space-y-3">
                        {questions[0].options.map((opt, i) => (
                          <label
                            key={opt}
                            className={cn(
                              "flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors",
                              i === 1
                                ? "border-primary/60 bg-primary/5"
                                : "hover:border-primary/40 hover:bg-primary/5",
                            )}
                          >
                            <input
                              type="radio"
                              name="q1"
                              defaultChecked={i === 1}
                              className="text-primary accent-primary"
                            />
                            <span className="text-sm font-semibold">{opt}</span>
                          </label>
                        ))}
                      </div>
                      <p className="text-muted-foreground mt-4 flex items-center gap-1.5 text-xs">
                        <AlertTriangle className="size-3.5" /> Unanswered questions count as wrong.
                      </p>
                    </CardContent>
                  </Card>

                  <div className="flex items-center justify-between gap-3">
                    <Button variant="outline" className="font-semibold" disabled>
                      <ChevronLeft className="mr-1 size-4" /> Previous
                    </Button>
                    <Button className="bg-gradient-brand border-0">
                      Next <ChevronRight className="ml-1 size-4" />
                    </Button>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Card className="bg-card shadow-soft border">
                      <CardContent className="p-4">
                        <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                          Timer
                        </p>
                        <p className="font-display mt-2 flex items-center gap-2 text-xl font-extrabold">
                          <Clock className="text-error size-5" /> 18:42
                        </p>
                        <p className="text-muted-foreground text-xs">
                          Auto-submit at 0:00 · 20 minutes total
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-card shadow-soft border">
                      <CardContent className="p-4">
                        <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                          Submit
                        </p>
                        <Button className="bg-gradient-brand mt-3 w-full border-0">
                          <Send className="mr-1.5 size-4" /> Submit assessment
                        </Button>
                        <p className="text-muted-foreground mt-2 text-[11px]">
                          You can review flagged questions before submitting.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-5">
                  <Card className="bg-card shadow-soft border">
                    <CardContent className="p-4">
                      <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                        Question navigator
                      </p>
                      <div className="mt-3 grid grid-cols-5 gap-2">
                        {Array.from({ length: a.questions }).map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            className={cn(
                              "grid aspect-square place-items-center rounded-lg text-xs font-bold transition-colors",
                              i === 0
                                ? "bg-primary text-white"
                                : i % 3 === 0
                                  ? "bg-success/15 text-success"
                                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary",
                            )}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                      <div className="mt-4 flex flex-wrap gap-3 border-t pt-3 text-[11px] font-semibold">
                        <span className="flex items-center gap-1.5">
                          <span className="bg-primary size-2.5 rounded-sm" /> Current
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="bg-success/60 size-2.5 rounded-sm" /> Answered
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="bg-muted size-2.5 rounded-sm" /> Unanswered
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card shadow-soft border">
                    <CardContent className="space-y-3 p-4">
                      <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                        Rules
                      </p>
                      {[
                        "One attempt per 20-minute window",
                        "Auto-save every answer as you go",
                        "Flag any answer to review before submit",
                        "Results published after the window closes",
                      ].map((r) => (
                        <p key={r} className="flex items-start gap-2 text-xs font-semibold">
                          <CheckCircle2 className="text-success mt-0.5 size-3.5 shrink-0" /> {r}
                        </p>
                      ))}
                    </CardContent>
                  </Card>

                  <Link
                    to="/app/assessments"
                    className="text-muted-foreground hover:text-primary flex items-center gap-2 text-sm font-semibold transition-colors"
                  >
                    <ArrowLeft className="size-4" /> Exit to assessments
                  </Link>
                </div>
              </div>
            </>
          );
        }}
      </QueryState>
    </AppShell>
  );
}
