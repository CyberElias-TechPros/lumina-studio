import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock3, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useIntTimesheetItems, useIntTimesheets } from "@/lib/query/internDashboard";
import type { IntTimesheet } from "@/lib/api/internDashboard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/intern/timesheet")({
  head: () => ({
    meta: [
      { title: "Timesheet — CEA-OS" },
      { name: "description", content: "Log hours and track approvals." },
    ],
  }),
  component: InternTimesheet,
});

function InternTimesheet() {
  const timesheetsQuery = useIntTimesheets();
  const timesheets = useIntTimesheetItems();

  const total = timesheets.reduce((n, w) => n + w.hours, 0);
  const approvedHours = timesheets
    .filter((w) => w.status === "approved")
    .reduce((n, w) => n + w.hours, 0);
  const approvalRate = total > 0 ? Math.round((approvedHours / total) * 100) : 0;
  const thisWeek = timesheets[0]?.hours ?? 0;

  return (
    <AppShell
      roleKey="student"
      title="Timesheet"
      subtitle={
        timesheets.length > 0
          ? `${total}h logged · 40h/week target · ${approvalRate}% approved`
          : "Loading your timesheet…"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {approvalRate}% approved
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
            label: "This week",
            value: timesheets.length > 0 ? `${thisWeek}h` : "—",
            delta: "logged so far",
            icon: Clock3,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Total logged",
            value: timesheets.length > 0 ? `${total}h` : "—",
            delta: "of 480 target",
            icon: Timer,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Approved",
            value: timesheets.length > 0 ? `${approvedHours}h` : "—",
            delta: `${approvalRate}% rate`,
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Weeks",
            value: timesheets.length > 0 ? String(timesheets.length) : "—",
            delta: "of 12 completed",
            icon: CalendarDays,
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
            <CalendarDays className="text-primary size-4" /> Weekly log
          </CardTitle>
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            Log hours
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<IntTimesheet[]>
            query={timesheetsQuery}
            error={{ title: "Timesheet unavailable" }}
            empty={{ title: "No hours logged", description: "Weekly entries will show here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((w) => (
                  <div
                    key={w.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{w.weekLabel}</p>
                      <p className="text-muted-foreground text-xs">{w.hours}h logged</p>
                    </div>
                    <Badge
                      className={cn(
                        "border-0 font-semibold",
                        w.status === "approved"
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning",
                      )}
                    >
                      {w.status === "approved" ? "Approved" : "Pending"}
                    </Badge>
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
