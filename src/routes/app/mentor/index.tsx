import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  FolderGit2,
  MessageSquare,
  Target,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import {
  useMntConversationItems,
  useMntGoalItems,
  useMntGoals,
  useMntMenteeItems,
  useMntMentees,
  useMntResourceItems,
  useMntSessions,
  useMntSessionItems,
} from "@/lib/query/mentorDashboard";
import type { MntGoal, MntMentee } from "@/lib/api/mentorDashboard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/mentor/")({
  head: () => ({
    meta: [
      { title: "Mentor Dashboard — CEA-OS" },
      { name: "description", content: "Your mentees, sessions and goals." },
    ],
  }),
  component: MentorDashboard,
});

const menteeTone = ["bg-gradient-learning", "bg-gradient-erp", "bg-gradient-services"];

function MenteeRow({ m, tone }: { m: MntMentee; tone: string }) {
  return (
    <div className={cn("rounded-2xl p-4 text-white", tone)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-display text-sm font-extrabold">{m.name}</p>
          <p className="text-white/70 text-xs">{m.track}</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-white/15 text-white border-0 font-semibold">
            {m.cohort} · since {m.sinceDate}
          </Badge>
          <Button
            asChild
            size="sm"
            className="bg-white/15 text-white font-semibold hover:bg-white/25"
          >
            <Link to="/app/mentor/mentees/$menteeId" params={{ menteeId: m.id }}>
              View <ArrowRight className="ml-1 size-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function MentorDashboard() {
  const menteesQuery = useMntMentees();
  const mentees = useMntMenteeItems();
  const sessions = useMntSessionItems();
  const goalsQuery = useMntGoals();
  const goals = useMntGoalItems();
  const resources = useMntResourceItems();
  const conversations = useMntConversationItems();

  const upcoming = sessions.filter((s) => s.status === "upcoming").length;
  const onTrack = goals.filter((g) => g.status === "on track").length;
  const atRisk = goals.filter((g) => g.status === "needs focus").length;
  const unread = conversations.reduce((n, c) => n + c.unread, 0);
  const unreadRow = conversations.find((c) => c.unread > 0);

  const menteeName = (id: string) => mentees.find((m) => m.id === id)?.name ?? id;
  const quickLinks = resources.flatMap((r) => r.items).slice(0, 3);

  return (
    <AppShell
      roleKey="instructor"
      title="Mentor dashboard"
      subtitle={
        mentees.length > 0
          ? `${mentees.length} mentees · ${upcoming} sessions this week`
          : "Loading your caseload…"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Mentor of the month
          </Badge>
          <Button asChild size="sm">
            <Link to="/app/mentor/requests">View requests</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Mentees",
            value: mentees.length > 0 ? String(mentees.length) : "—",
            delta: "on your caseload",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Sessions this week",
            value: sessions.length > 0 ? String(upcoming) : "—",
            delta: "upcoming",
            icon: CalendarDays,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Goals on track",
            value: goals.length > 0 ? `${onTrack}/${goals.length}` : "—",
            delta: atRisk > 0 ? `${atRisk} at risk` : "none at risk",
            icon: Target,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Unread messages",
            value: conversations.length > 0 ? String(unread) : "—",
            delta: unread > 0 ? "across mentees" : "all caught up",
            icon: CheckCircle2,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Users className="text-primary size-4" /> My mentees
              </CardTitle>
              <Button asChild variant="ghost" size="sm" className="text-primary font-semibold">
                <Link to="/app/mentor/sessions">
                  Sessions <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <QueryState<MntMentee[]>
                query={menteesQuery}
                error={{ title: "Mentees unavailable" }}
                empty={{
                  title: "No mentees yet",
                  description: "Mentees assigned to you will show here.",
                }}
                isEmpty={(rows) => rows.length === 0}
              >
                {(rows) => (
                  <>
                    {rows.map((m, i) => (
                      <MenteeRow key={m.id} m={m} tone={menteeTone[i % menteeTone.length]} />
                    ))}
                  </>
                )}
              </QueryState>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Target className="text-primary size-4" /> Goals in flight
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <QueryState<MntGoal[]>
                query={goalsQuery}
                error={{ title: "Goals unavailable" }}
                empty={{
                  title: "No goals yet",
                  description: "Goals from your mentees will show here.",
                }}
                isEmpty={(rows) => rows.length === 0}
              >
                {(rows) => (
                  <>
                    {rows.map((g) => (
                      <div key={g.id}>
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span>{g.title}</span>
                          <span className="text-muted-foreground">
                            {menteeName(g.menteeId)} · {g.dueDate}
                          </span>
                        </div>
                        <div className="bg-muted mt-1.5 h-1.5 overflow-hidden rounded-full">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              g.progressPct >= 60
                                ? "bg-success"
                                : g.progressPct >= 40
                                  ? "bg-warning"
                                  : "bg-destructive",
                            )}
                            style={{ width: `${g.progressPct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </QueryState>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <BriefcaseBusiness className="text-primary size-4" /> Career tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { t: "Applications reviewed", v: "6", tone: "bg-primary/10 text-primary" },
                { t: "Mock interviews run", v: "4", tone: "bg-learning/10 text-learning" },
                { t: "Referrals made", v: "2", tone: "bg-success/10 text-success" },
              ].map((x) => (
                <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.t}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                </div>
              ))}
              {mentees[0] && (
                <Button asChild variant="outline" size="sm" className="w-full font-semibold">
                  <Link
                    to="/app/mentor/mentees/$menteeId/career"
                    params={{ menteeId: mentees[0].id }}
                  >
                    Career tracker
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <FolderGit2 className="text-primary size-4" /> Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickLinks.map((r) => (
                <Button
                  asChild
                  key={r}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start font-semibold"
                >
                  <Link to="/app/mentor/resources">{r}</Link>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <MessageSquare className="text-warning size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Unread</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                {unreadRow
                  ? `${unreadRow.name} — ${unreadRow.preview} · ${unread} messages waiting.`
                  : "No unread messages — you're all caught up."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
