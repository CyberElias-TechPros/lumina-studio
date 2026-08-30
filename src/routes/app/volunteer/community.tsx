import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle, MessagesSquare, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useVolGroups, useVolGroupItems } from "@/lib/query/volunteerReceptionist";
import type { VolGroup } from "@/lib/api/volunteerReceptionist";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/volunteer/community")({
  head: () => ({
    meta: [
      { title: "Community — CEA-OS" },
      { name: "description", content: "Chat with fellow volunteers and organizers." },
    ],
  }),
  component: VolunteerCommunity,
});

const tones = [
  "bg-primary/10 text-primary",
  "bg-learning/10 text-learning",
  "bg-success/10 text-success",
];

function VolunteerCommunity() {
  const groupsQuery = useVolGroups();
  const groups = useVolGroupItems();

  const online = groups.reduce((n, g) => n + g.online, 0);

  return (
    <AppShell
      roleKey="volunteer"
      title="Community"
      subtitle="Chat, forums and announcements"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {groups.length > 0 ? `${online} online` : "12 online"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/volunteer">
              <ArrowLeft className="size-4" /> Volunteer portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Groups",
            value: groups.length > 0 ? String(groups.length) : "—",
            delta: "3 active today",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Members",
            value: groups.length > 0 ? String(groups.reduce((n, g) => n + g.members, 0)) : "—",
            delta: "+12 this month",
            icon: MessageCircle,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Messages (7d)",
            value: "340",
            delta: "coordinators active",
            icon: MessagesSquare,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Announcements",
            value: "2",
            delta: "this week",
            icon: MessageCircle,
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
            <Users className="text-primary size-4" /> Your groups
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<VolGroup[]>
            query={groupsQuery}
            error={{ title: "Groups unavailable" }}
            empty={{ title: "No groups yet", description: "Your volunteer groups will show here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((g, i) => (
                  <div
                    key={g.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{g.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {g.members} members · {g.online} online
                      </p>
                    </div>
                    <span
                      className={cn("size-2.5 rounded-full", i === 1 ? "bg-success" : "bg-primary")}
                    />
                    <Button asChild variant="outline" size="sm" className="shrink-0 font-semibold">
                      <Link to="/app/chat">Open chat</Link>
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
