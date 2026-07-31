import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, FileText, Send, Target, Timer, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/mentor/sessions/$sessionId")({
  head: () => ({
    meta: [
      { title: "Session Detail — CEA-OS" },
      { name: "description", content: "Session notes, action items and follow-ups." },
    ],
  }),
  component: MentorSessionDetail,
});

const actions = [
  { t: "Share demo-day checklist with Ada", done: true },
  { t: "Send EXPLAIN practice exercise", done: true },
  { t: "Book follow-up interview prep", done: false },
  { t: "Endorse 'Database Design' skill", done: false },
];

function MentorSessionDetail() {
  return (
    <AppShell
      roleKey="instructor"
      title="Goal review — Ada Okafor"
      subtitle="Fri, Aug 21 · 16:00–16:45 · Video"
      actions={
        <>
          <Badge className="bg-primary/10 text-primary border-0 font-semibold">45 minutes</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/mentor/sessions">
              <ArrowLeft className="size-4" /> All sessions
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Timer className="text-primary size-4" /> Session agenda
              </CardTitle>
              <Badge variant="secondary" className="font-semibold">
                Prepared Aug 20
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { m: "00–10", t: "Goal recap: demo day, certification, interview readiness" },
                { m: "10–25", t: "Review NaijaEats schema + query plan homework" },
                { m: "25–40", t: "Interview prep: STAR format drills" },
                { m: "40–45", t: "Next actions and check-in date" },
              ].map((a) => (
                <div key={a.t} className="flex items-center gap-3 rounded-xl border p-3">
                  <Badge variant="secondary" className="w-14 shrink-0 justify-center font-bold">
                    {a.m}
                  </Badge>
                  <p className="text-sm font-medium">{a.t}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <FileText className="text-primary size-4" /> Session notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="rounded-xl border p-3 text-xs leading-relaxed">
                Ada's API schema is well-normalised. Reviewed EXPLAIN output on the orders table —
                the index on (customer_id, created_at) cut the query from 180ms to 22ms.
              </p>
              <p className="rounded-xl border p-3 text-xs leading-relaxed">
                STAR format still needs practice — she describes outcomes well but skips the
                "Action" step. Drilled one answer together.
              </p>
              <div className="flex gap-2">
                <Button size="sm" className="font-semibold">
                  <Send className="size-4" /> Save notes
                </Button>
                <Button variant="outline" size="sm" className="font-semibold">
                  <Video className="size-4" /> Start session
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Target className="text-primary size-4" /> Action items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {actions.map((a) => (
                <div
                  key={a.t}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-3",
                    a.done && "opacity-60",
                  )}
                >
                  <CheckCircle2
                    className={cn(
                      "size-4 shrink-0",
                      a.done ? "text-success" : "text-muted-foreground",
                    )}
                  />
                  <p className="text-sm font-medium">{a.t}</p>
                </div>
              ))}
              <p className="text-muted-foreground pt-1 text-xs">
                2 of 4 complete — overdue items roll into next week's review.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <CheckCircle2 className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Endorse a skill</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Endorsements from mentors weigh into the OSKM skill scores employers see on Ada's
                certificate.
              </p>
              <Button className="bg-ink-foreground text-ink mt-4 w-full font-semibold hover:bg-ink-foreground/90">
                Endorse Database Design
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
