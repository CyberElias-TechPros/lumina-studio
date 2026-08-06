import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, FlaskConical, Lightbulb, Rocket, TrendingUp } from "lucide-react";
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
import type { GrwExperiment } from "@/lib/api/growth";
import { useGrwExperiments } from "@/lib/query/growth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/growth/experiments")({
  head: () => ({
    meta: [
      { title: "Experiment Builder — CEA-OS" },
      { name: "description", content: "Growth experiments with hypotheses, variants and results." },
    ],
  }),
  component: ExperimentBuilder,
});

function experimentTone(status: string) {
  switch (status) {
    case "Winning":
    case "Won":
      return "bg-success/10 text-success";
    case "Live":
    case "Running":
      return "bg-primary/10 text-primary";
    case "In test":
      return "bg-warning/10 text-warning";
    case "Draft":
      return "bg-muted-foreground/10 text-muted-foreground";
    default:
      return "bg-muted-foreground/10 text-muted-foreground";
  }
}

function ExperimentBuilder() {
  const experimentsQuery = useGrwExperiments();

  return (
    <AppShell
      roleKey="growth"
      title="Experiment builder"
      subtitle="9 live · 4 in design · 2 wins this quarter"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">2 wins Q3</Badge>
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
            label: "Live experiments",
            value: "9",
            delta: "2 near power",
            icon: FlaskConical,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Wins (YTD)",
            value: "7",
            delta: "4 shipped",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Hypotheses",
            value: "24",
            delta: "in backlog",
            icon: Lightbulb,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Avg. uplift",
            value: "+8.2%",
            delta: "across wins",
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
            <Rocket className="text-primary size-4" /> Experiments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <QueryState<GrwExperiment[]>
            query={experimentsQuery}
            error={{ title: "Experiment data unavailable" }}
            empty={{
              title: "No experiments yet",
              description: "Growth experiments will appear here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Experiment</TableHead>
                    <TableHead>Hypothesis</TableHead>
                    <TableHead>Variant</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell className="font-semibold">{e.title}</TableCell>
                      <TableCell className="max-w-[280px] text-muted-foreground">
                        {e.hypothesis}
                      </TableCell>
                      <TableCell>{e.variant}</TableCell>
                      <TableCell
                        className={cn("font-bold", e.result.startsWith("+") && "text-success")}
                      >
                        {e.result}
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("border-0 font-semibold", experimentTone(e.status))}>
                          {e.status}
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
