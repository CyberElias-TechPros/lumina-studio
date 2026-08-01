import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock3, Plane } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useLeaveRequests } from "@/lib/query/hr";
import type { LeaveRequest } from "@/lib/api/hr";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/hr/leave")({
  head: () => ({
    meta: [
      { title: "Leave — CEA-OS" },
      { name: "description", content: "Leave requests, balances and calendar." },
    ],
  }),
  component: HrLeave,
});

function daysBetween(from: string, to: string): number {
  const ms = Date.parse(to) - Date.parse(from);
  return Number.isFinite(ms) && ms >= 0 ? Math.round(ms / 86_400_000) + 1 : 0;
}

function HrLeave() {
  const query = useLeaveRequests();
  const requests = query.data?.pages.flatMap((p) => p.items) ?? [];

  const approved = requests.filter((r) => r.status === "Approved").length;
  const pending = requests.filter((r) => r.status === "Pending").length;
  const days = requests.reduce((s, r) => s + daysBetween(r.from, r.to), 0);

  return (
    <AppShell
      roleKey="instructor"
      title="Leave management"
      subtitle={`${requests.length} open · ${approved} approved · ${pending} pending`}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Balances healthy
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/hr">
              <ArrowLeft className="size-4" /> HR hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Open requests",
            value: String(requests.length),
            delta: `${pending} pending`,
            icon: CalendarDays,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Days requested",
            value: String(days),
            delta: "across open requests",
            icon: Plane,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Approved",
            value: String(approved),
            delta: "avg 2.4 days",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Pending",
            value: String(pending),
            delta: "awaiting review",
            icon: Clock3,
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
            <CalendarDays className="text-primary size-4" /> Requests
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<LeaveRequest[]> query={query} error={{ title: "Leave requests unavailable" }}>
            {(rows) => (
              <>
                {rows.map((r) => (
                  <div
                    key={r.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">
                        {r.employee} · {r.type.toLowerCase()} leave
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {r.from}–{r.to} · {daysBetween(r.from, r.to)} days
                      </p>
                    </div>
                    <Badge
                      className={cn(
                        "border-0 font-semibold",
                        r.status === "Approved"
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning",
                      )}
                    >
                      {r.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      {r.status === "Pending" ? "Review" : "View"}
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
