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
import { AppShell } from "@/components/app/app-shell";
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

const mentees = [
  {
    id: "ada-okafor",
    name: "Ada Okafor",
    track: "Backend specialisation",
    next: "Aug 21 · 16:00",
    tone: "bg-gradient-learning",
  },
  {
    id: "tobi-adeyemi",
    name: "Tobi Adeyemi",
    track: "DevOps",
    next: "Aug 22 · 11:00",
    tone: "bg-gradient-erp",
  },
  {
    id: "zainab-yusuf",
    name: "Zainab Yusuf",
    track: "Product design",
    next: "Aug 25 · 14:30",
    tone: "bg-gradient-services",
  },
];

const goals = [
  { t: "NaijaEats demo day", pct: 90, d: "Ada · Aug 30" },
  { t: "CI/CD certification", pct: 55, d: "Tobi · Sep 20" },
  { t: "Portfolio launch", pct: 40, d: "Zainab · Sep 5" },
];

function MentorDashboard() {
  return (
    <AppShell
      roleKey="instructor"
      title="Mentor dashboard"
      subtitle="3 mentees · 2 sessions this week"
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
            value: "3",
            delta: "1 new this term",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Sessions this week",
            value: "4",
            delta: "2 upcoming",
            icon: CalendarDays,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Goals on track",
            value: "7/9",
            delta: "2 at risk",
            icon: Target,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Endorsements",
            value: "14",
            delta: "this term",
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
              {mentees.map((m) => (
                <div key={m.id} className={cn("rounded-2xl p-4 text-white", m.tone)}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-display text-sm font-extrabold">{m.name}</p>
                      <p className="text-white/70 text-xs">{m.track}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className="bg-white/15 text-white border-0 font-semibold">
                        {m.next}
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
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Target className="text-primary size-4" /> Goals in flight
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {goals.map((g) => (
                <div key={g.t}>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>{g.t}</span>
                    <span className="text-muted-foreground">{g.d}</span>
                  </div>
                  <div className="bg-muted mt-1.5 h-1.5 overflow-hidden rounded-full">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        g.pct >= 60 ? "bg-success" : g.pct >= 40 ? "bg-warning" : "bg-destructive",
                      )}
                      style={{ width: `${g.pct}%` }}
                    />
                  </div>
                </div>
              ))}
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
              <Button asChild variant="outline" size="sm" className="w-full font-semibold">
                <Link to="/app/mentor/mentees/$menteeId/career" params={{ menteeId: "ada-okafor" }}>
                  Career tracker
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <FolderGit2 className="text-primary size-4" /> Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {["Interview question bank", "CV rubric v3", "Session templates"].map((r) => (
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
                Tobi asked about the DevOps exam pattern — 2 messages waiting.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
