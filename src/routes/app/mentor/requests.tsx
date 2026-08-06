import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Inbox, TrendingUp, UserPlus, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useMntRequestItems, useMntRequests } from "@/lib/query/mentorDashboard";
import type { MntRequest } from "@/lib/api/mentorDashboard";
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

const requestTone = ["bg-learning/10 text-learning", "bg-primary/10 text-primary"];

function MentorRequests() {
  const requestsQuery = useMntRequests();
  const requests = useMntRequestItems();

  const pending = requests.filter((r) => r.status === "pending").length;
  const accepted = requests.filter((r) => r.status === "accepted").length;
  const declined = requests.filter((r) => r.status === "declined").length;

  return (
    <AppShell
      roleKey="instructor"
      title="Mentorship requests"
      subtitle={
        requests.length > 0 ? `${pending} pending · respond within 7 days` : "Loading requests…"
      }
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">
            {requests.length > 0 ? `${pending} pending` : "—"}
          </Badge>
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
            value: requests.length > 0 ? String(pending) : "—",
            delta: "respond by Aug 25",
            icon: Inbox,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Accepted this term",
            value: requests.length > 0 ? String(accepted) : "—",
            delta: "matches confirmed",
            icon: UserPlus,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Declined",
            value: requests.length > 0 ? String(declined) : "—",
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
        <QueryState<MntRequest[]>
          query={requestsQuery}
          error={{ title: "Requests unavailable" }}
          empty={{
            title: "No requests",
            description: "New mentorship requests will show here.",
          }}
          isEmpty={(rows) => rows.length === 0}
        >
          {(rows) => (
            <>
              {rows.map((r, i) => (
                <Card key={r.id} className="bg-card shadow-soft border">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-sm font-extrabold">{r.requesterName}</p>
                        <p className="text-muted-foreground text-xs">{r.track}</p>
                      </div>
                      <span
                        className={cn(
                          "grid size-10 shrink-0 place-items-center rounded-xl",
                          requestTone[i % requestTone.length],
                        )}
                      >
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
            </>
          )}
        </QueryState>
      </div>
    </AppShell>
  );
}
