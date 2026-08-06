import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FlaskConical, Percent, Timer, TrendingUp, Users } from "lucide-react";
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
import { useBdTests } from "@/lib/query/behavioral";
import type { BdTest } from "@/lib/api/behavioral";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/behavioral-design/ab-tests")({
  head: () => ({
    meta: [
      { title: "A/B Test Designer — CEA-OS" },
      {
        name: "description",
        content: "Behavioral experiments with variants, sample sizes and lift.",
      },
    ],
  }),
  component: AbTestDesigner,
});

const tones = [
  "bg-success/10 text-success",
  "bg-primary/10 text-primary",
  "bg-warning/10 text-warning",
  "bg-muted-foreground/10 text-muted-foreground",
];

function AbTestDesigner() {
  const testsQuery = useBdTests();

  return (
    <AppShell
      roleKey="behavioral-design"
      title="A/B test designer"
      subtitle="7 live · 12 completed this year · avg lift +7.4%"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">2 winning</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/behavioral-design">
              <ArrowLeft className="size-4" /> Behavior hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Live tests",
            value: "7",
            delta: "3 nearing power",
            icon: FlaskConical,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Completed",
            value: "12",
            delta: "this year",
            icon: Timer,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Sample (30d)",
            value: "8.4k",
            delta: "across live tests",
            icon: Users,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Avg. lift",
            value: "+7.4%",
            delta: "median significant",
            icon: TrendingUp,
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
            <Percent className="text-primary size-4" /> Experiments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <QueryState<BdTest[]>
            query={testsQuery}
            error={{ title: "Experiments unavailable" }}
            empty={{
              title: "No experiments",
              description: "Tests you run will show here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Experiment</TableHead>
                    <TableHead>Variants</TableHead>
                    <TableHead>Sample</TableHead>
                    <TableHead>Lift</TableHead>
                    <TableHead>Significance</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((t, i) => (
                    <TableRow key={t.id}>
                      <TableCell className="font-semibold">{t.name}</TableCell>
                      <TableCell>{t.variants}</TableCell>
                      <TableCell className="text-muted-foreground">{t.sampleLabel}</TableCell>
                      <TableCell
                        className={cn("font-bold", t.liftLabel.startsWith("+") && "text-success")}
                      >
                        {t.liftLabel}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{t.sigLabel}</TableCell>
                      <TableCell>
                        <Badge className={cn("border-0 font-semibold", tones[i % tones.length])}>
                          {t.status}
                        </Badge>
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
