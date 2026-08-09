import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, CalendarClock, Target, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import {
  useIntMentorSessionItems,
  useIntMentorSessions,
  useIntMilestoneItems,
} from "@/lib/query/internDashboard";
import type { IntMentorSession } from "@/lib/api/internDashboard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/intern/mentorship")({
  head: () => ({
    meta: [
      { title: "Mentorship — CEA-OS" },
      { name: "description", content: "Sessions and notes with your mentor." },
    ],
  }),
  component: InternMentorship,
});

const MINUTES_PER_HOUR = 60;

function minutesToHours(minutes: number): string {
  return `${(minutes / MINUTES_PER_HOUR).toFixed(1)}h`;
}

function InternMentorship() {
  const sessionsQuery = useIntMentorSessions();
  const sessions = useIntMentorSessionItems();
  const milestones = useIntMilestoneItems();

  const completed = sessions.filter((s) => s.status === "completed");
  const next = sessions.find((s) => s.status === "upcoming");
  const mentoredMinutes = completed.reduce((n, s) => n + parseInt(s.durationText, 10) || 0, 0);
  const goalsSet = milestones.length;
  const goalsAchieved = milestones.filter((m) => m.status === "done").length;

  return (
    <AppShell
      roleKey="intern"
      title="Mentorship"
      subtitle={
        sessions.length > 0
          ? `Mentor: Ms. Chidera · DevOps lead · ${next ? `next ${next.dateText}` : "no upcoming session"}`
          : "Mentor: Ms. Chidera · DevOps lead"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {sessions.length} sessions
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/intern">
              <ArrowLeft className="size-4" /> Intern hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Sessions",
            value: sessions.length > 0 ? String(sessions.length) : "—",
            delta: "of 8 planned",
            icon: CalendarClock,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Hours mentored",
            value: sessions.length > 0 ? minutesToHours(mentoredMinutes) : "—",
            delta: "in 2026",
            icon: Target,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Goals set",
            value: milestones.length > 0 ? String(goalsSet) : "—",
            delta: `${goalsAchieved} achieved`,
            icon: BookOpen,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Next session",
            value: next ? next.dateText : "—",
            delta: next ? next.durationText : "none booked",
            icon: UserRound,
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

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <CalendarClock className="text-primary size-4" /> Sessions
          </CardTitle>
          <Button variant="outline" size="sm" className="font-semibold">
            Book session
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<IntMentorSession[]>
            query={sessionsQuery}
            error={{ title: "Sessions unavailable" }}
            empty={{ title: "No sessions yet", description: "Booked sessions will show here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((s) => (
                  <div
                    key={s.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{s.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {s.dateText} · {s.durationText}
                      </p>
                    </div>
                    <Badge
                      className={cn(
                        "border-0 font-semibold",
                        s.status === "upcoming"
                          ? "bg-primary/10 text-primary"
                          : "bg-success/10 text-success",
                      )}
                    >
                      {s.status === "upcoming" ? "Upcoming" : "Completed"}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      Notes
                    </Button>
                  </div>
                ))}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
