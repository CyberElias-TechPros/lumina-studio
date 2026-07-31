import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Inbox, TrendingUp, UserPlus, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/mentor/requests")({
  head: () => ({
    meta: [
      { title: "Mentorship Requests — CEA-OS" },
      { name: "description", content: "Accept or decline mentorship requests." },
    ],
  }),
  component: MentorRequests,
});

const requests = [
  {
    name: "Hauwa Bello",
    track: "Cloud & DevOps · Cohort 16",
    why: "Wants help planning her AWS certification path.",
    tone: "bg-learning/10 text-learning",
  },
  {
    name: "Seun Adeleke",
    track: "Full-Stack · Cohort 16",
    why: "Career switcher from civil engineering — needs a roadmap.",
    tone: "bg-primary/10 text-primary",
  },
];

function MentorRequests() {
  return (
    <AppShell
      roleKey="instructor"
      title="Mentorship requests"
      subtitle="2 pending · respond within 7 days"
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">2 pending</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/mentor">
              <ArrowLeft className="size-4" /> Dashboard
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Pending",
            value: "2",
            delta: "respond by Aug 25",
            icon: Inbox,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Accepted this term",
            value: "1",
            delta: "Zainab Yusuf",
            icon: UserPlus,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Declined",
            value: "0",
            delta: "this term",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Success rate",
            value: "100%",
            delta: "3 of 3 matches kept",
            icon: TrendingUp,
            tone: "bg-learning/10 text-learning",
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

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {requests.map((r) => (
          <Card key={r.name} className="bg-card shadow-soft border">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-sm font-extrabold">{r.name}</p>
                  <p className="text-muted-foreground text-xs">{r.track}</p>
                </div>
                <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl", r.tone)}>
                  <UserPlus className="size-5" />
                </span>
              </div>
              <p className="text-muted-foreground mt-3 text-xs leading-relaxed">{r.why}</p>
              <div className="mt-4 flex gap-2">
                <Button size="sm" className="flex-1 font-semibold">
                  Accept
                </Button>
                <Button variant="outline" size="sm" className="flex-1 font-semibold">
                  Decline
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
