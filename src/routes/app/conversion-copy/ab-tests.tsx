import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, FlaskConical, Timer, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { CcpTest } from "@/lib/query/conversionCopy";
import { useCcpTests } from "@/lib/query/conversionCopy";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/conversion-copy/ab-tests")({
  head: () => ({
    meta: [
      { title: "A/B Test Dashboard — CEA-OS" },
      { name: "description", content: "Copy test results and winners." },
    ],
  }),
  component: CopyAbTests,
});

const testTones = [
  "bg-success/10 text-success",
  "bg-success/10 text-success",
  "bg-primary/10 text-primary",
];

function CopyAbTests() {
  const testsQuery = useCcpTests();

  return (
    <AppShell
      roleKey="instructor"
      title="A/B test dashboard"
      subtitle="6 running · 14 concluded this month · 11 winners deployed"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">6 running</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/conversion-copy/library">
              <ArrowLeft className="size-4" /> Library
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Running",
            value: "6",
            delta: "3 landing · 3 email",
            icon: FlaskConical,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Concluded",
            value: "14",
            delta: "this month",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Winner rate",
            value: "79%",
            delta: "stat. significant",
            icon: TrendingUp,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Avg. duration",
            value: "9 days",
            delta: "to significance",
            icon: Timer,
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
            <TrendingUp className="text-primary size-4" /> Tests
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<CcpTest[]>
            query={testsQuery}
            error={{ title: "Tests unavailable" }}
            empty={{
              title: "No tests yet",
              description: "Copy test results and winners will show here.",
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
                      <p className="text-sm font-bold">{t.title}</p>
                      <p className="text-muted-foreground text-xs">{t.result}</p>
                    </div>
                    <Badge
                      className={cn("border-0 font-semibold", testTones[i % testTones.length])}
                    >
                      {t.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      Results
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
