"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, CalendarDays, Table2, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import type { GrwCohort } from "@/lib/api/growth";
import { useGrwCohorts } from "@/lib/query/growth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/growth/cohorts")({
  head: () => ({
    meta: [
      { title: "Cohort Retention — CEA-OS" },
      { name: "description", content: "Weekly cohort retention grid." },
    ],
  }),
  component: CohortRetention,
});

const cohortTones = [
  "bg-primary/10 text-primary",
  "bg-success/10 text-success",
  "bg-learning/10 text-learning",
  "bg-success/10 text-success",
  "bg-warning/10 text-warning",
];

function CohortRetention() {
  const cohortsQuery = useGrwCohorts();

  return (
    <AppShell
      roleKey="growth"
      title="Cohort retention"
      subtitle="Weekly cohorts · 2026 · best cohort 93% week-2"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">W4 best</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/growth">
              <ArrowLeft className="size-4" /> Growth hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Cohorts tracked",
            value: "12",
            delta: "weekly since Apr",
            icon: CalendarDays,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Week-2 retention",
            value: "90.2%",
            delta: "+3.1 pts vs W1",
            icon: Users,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Best cohort",
            value: "93%",
            delta: "week of Jul 13",
            icon: TrendingUp,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Week-6 retention",
            value: "68%",
            delta: "avg of 3 cohorts",
            icon: Table2,
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
            <Table2 className="text-primary size-4" /> Retention grid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <QueryState<GrwCohort[]>
            query={cohortsQuery}
            error={{ title: "Cohort data unavailable" }}
            empty={{
              title: "No cohorts yet",
              description: "Cohort retention data will appear here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cohort</TableHead>
                    <TableHead>W1</TableHead>
                    <TableHead>W2</TableHead>
                    <TableHead>W3</TableHead>
                    <TableHead>W4</TableHead>
                    <TableHead>W5</TableHead>
                    <TableHead>W6</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((c, i) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-semibold">{c.name}</TableCell>
                      <TableCell className="font-bold">{c.w1}%</TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            "border-0 font-semibold",
                            cohortTones[i % cohortTones.length],
                          )}
                        >
                          {c.w2 != null ? `${c.w2}%` : "\u2014"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {c.w3 != null ? `${c.w3}%` : "\u2014"}
                      </TableCell>
                      <TableCell className="font-semibold">
                        {c.w4 != null ? `${c.w4}%` : "\u2014"}
                      </TableCell>
                      <TableCell className="font-semibold">
                        {c.w5 != null ? `${c.w5}%` : "\u2014"}
                      </TableCell>
                      <TableCell className="font-semibold">
                        {c.w6 != null ? `${c.w6}%` : "\u2014"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
