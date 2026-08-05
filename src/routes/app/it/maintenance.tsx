import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarClock, Clock3, Hammer, MonitorCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useItWindows, useItWindowItems } from "@/lib/query/it";
import type { ItWindow } from "@/lib/api/it";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/it/maintenance")({
  head: () => ({
    meta: [
      { title: "Maintenance — CEA-OS" },
      { name: "description", content: "Scheduled maintenance windows." },
    ],
  }),
  component: ItMaintenance,
});

const statusTone: Record<string, string> = {
  scheduled: "bg-warning/10 text-warning",
  done: "bg-success/10 text-success",
  running: "bg-primary/10 text-primary",
};

function ItMaintenance() {
  const query = useItWindows();
  const windows = useItWindowItems();

  const upcoming = windows.filter((w) => w.status === "scheduled").length;
  const done = windows.filter((w) => w.status === "done").length;
  const next = windows
    .find((w) => w.status === "scheduled")
    ?.windowText.split("·")[0]
    .trim();

  return (
    <AppShell
      roleKey="instructor"
      title="Scheduled maintenance"
      subtitle={
        windows.length > 0
          ? `${upcoming} upcoming window${upcoming === 1 ? "" : "s"}${next ? ` · next ${next}` : ""}`
          : "Loading windows…"
      }
      actions={
        <>
          <Badge
            className={cn(
              "border-0 font-semibold",
              upcoming > 0 ? "bg-warning/10 text-warning" : "bg-success/10 text-success",
            )}
          >
            {upcoming > 0 ? `${upcoming} upcoming` : "Zero incidents"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/it-support">
              <ArrowLeft className="size-4" /> IT Support portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Upcoming",
            value: upcoming > 0 ? String(upcoming) : "0",
            delta: next ? `next ${next}` : "none planned",
            icon: CalendarClock,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Completed (30d)",
            value: done > 0 ? String(done) : "—",
            delta: "within plan",
            icon: Hammer,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Scheduled",
            value: windows.length > 0 ? String(windows.length) : "—",
            delta: "total windows",
            icon: Clock3,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Running",
            value: windows.some((w) => w.status === "running") ? "1" : "0",
            delta: "right now",
            icon: MonitorCheck,
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
            <CalendarClock className="text-primary size-4" /> Windows
          </CardTitle>
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            Schedule
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<ItWindow[]>
            query={query}
            error={{ title: "Windows unavailable" }}
            empty={{
              title: "No windows yet",
              description: "Scheduled maintenance will show here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) =>
              rows.map((w) => (
                <div
                  key={w.id}
                  className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{w.title}</p>
                    <p className="text-muted-foreground text-xs">{w.windowText}</p>
                  </div>
                  <Badge
                    className={cn(
                      "border-0 font-semibold capitalize",
                      statusTone[w.status] ?? "bg-muted/20 text-muted-foreground",
                    )}
                  >
                    {w.status}
                  </Badge>
                  <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                    Details
                  </Button>
                </div>
              ))
            }
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
