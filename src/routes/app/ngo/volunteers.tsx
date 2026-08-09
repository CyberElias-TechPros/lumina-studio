import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarClock, CheckCircle2, Users, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { NgoTeam } from "@/lib/api/ngo";
import { useNgoTeams } from "@/lib/query/ngo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/ngo/volunteers")({
  head: () => ({
    meta: [
      { title: "Volunteer Coordination — CEA-OS" },
      { name: "description", content: "Volunteer teams for programs." },
    ],
  }),
  component: NgoVolunteers,
});

const tones = [
  "bg-primary/10 text-primary",
  "bg-success/10 text-success",
  "bg-warning/10 text-warning",
  "bg-muted-foreground/10 text-muted-foreground",
];

function NgoVolunteers() {
  const teamsQuery = useNgoTeams();

  return (
    <AppShell
      roleKey="ngo"
      title="Volunteer coordination"
      subtitle="86 registered · 14 active this week · 1,240 hours logged"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Active</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/ngo">
              <ArrowLeft className="size-4" /> Partnership hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Registered",
            value: "86",
            delta: "all programs",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Active now",
            value: "14",
            delta: "this week",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Hours logged",
            value: "1,240",
            delta: "2026",
            icon: CalendarClock,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Open roles",
            value: "19",
            delta: "3 teams",
            icon: UserPlus,
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
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Users className="text-primary size-4" /> Teams
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<NgoTeam[]>
            query={teamsQuery}
            error={{ title: "Teams unavailable" }}
            empty={{
              title: "No teams yet",
              description: "Volunteer teams will appear here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((t, i) => (
                  <div
                    key={t.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{t.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {t.volunteers} volunteers · {t.slots}
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", tones[i % tones.length])}>
                      {t.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      Manage
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
