import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock, Flag, Rocket, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { usePmLaunches, usePmReadiness } from "@/lib/query/productMarketing";
import type { PmLaunch, PmReadinessItem } from "@/lib/api/productMarketing";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/product-marketing/launch-calendar")({
  head: () => ({
    meta: [
      { title: "Launch Calendar — CEA-OS" },
      { name: "description", content: "Upcoming launches with dates, phases, owners and status." },
    ],
  }),
  component: LaunchCalendar,
});

const statusTones: Record<string, string> = {
  done: "bg-success/10 text-success",
  complete: "bg-success/10 text-success",
  approved: "bg-success/10 text-success",
  "on track": "bg-primary/10 text-primary",
  "in progress": "bg-primary/10 text-primary",
  building: "bg-primary/10 text-primary",
  "in review": "bg-warning/10 text-warning",
  "at risk": "bg-warning/10 text-warning",
  discovery: "bg-warning/10 text-warning",
  upcoming: "bg-warning/10 text-warning",
  queued: "bg-error/10 text-error",
};

function toneFor(status: string): string {
  return statusTones[status.toLowerCase()] ?? "bg-muted-foreground/10 text-muted-foreground";
}

function LaunchCalendar() {
  const launchesQuery = usePmLaunches();
  const readinessQuery = usePmReadiness();

  return (
    <AppShell
      roleKey="product-marketing"
      title="Launch calendar"
      subtitle="Q3-Q4 2026 · 4 launches · next: parent app Aug 14"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">2 on track</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/product-marketing">
              <ArrowLeft className="size-4" /> PM hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Upcoming launches",
            value: "4",
            delta: "this half",
            icon: Rocket,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "In build",
            value: "2",
            delta: "beta + talent pass",
            icon: Flag,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Owners",
            value: "4",
            delta: "1 owner per launch",
            icon: UserRound,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Days to next",
            value: "14",
            delta: "parent app beta",
            icon: Clock,
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
            <CalendarDays className="text-primary size-4" /> Upcoming launches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <QueryState<PmLaunch[]>
            query={launchesQuery}
            error={{ title: "Launches unavailable" }}
            empty={{
              title: "No launches",
              description: "Upcoming launches will show here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Launch</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Phase</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((l) => (
                      <TableRow key={l.id}>
                        <TableCell className="font-semibold">{l.name}</TableCell>
                        <TableCell>{l.dateLabel}</TableCell>
                        <TableCell className="text-muted-foreground">{l.phase}</TableCell>
                        <TableCell className="text-muted-foreground">{l.owner}</TableCell>
                        <TableCell>
                          <Badge className={cn("border-0 font-semibold", toneFor(l.status))}>
                            {l.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Flag className="text-primary size-4" /> Launch readiness · parent app
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <QueryState<PmReadinessItem[]>
            query={readinessQuery}
            error={{ title: "Readiness unavailable" }}
            empty={{
              title: "No readiness items",
              description: "Launch readiness scores will show here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((r) => (
                  <div key={r.id}>
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-sm font-bold">{r.label}</span>
                      <Badge className={cn("border-0 font-semibold", toneFor(r.status))}>
                        {r.status}
                      </Badge>
                    </div>
                    <Progress value={r.pct} className="mt-1.5 h-2" />
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
