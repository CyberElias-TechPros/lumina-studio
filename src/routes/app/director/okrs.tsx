import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, CircleStar, Flag, Plus, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useDirOkrs } from "@/lib/query/director";
import type { DirOkr } from "@/lib/api/director";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/director/okrs")({
  head: () => ({
    meta: [
      { title: "OKRs — CEA-OS" },
      { name: "description", content: "Strategic planning and quarterly objectives." },
    ],
  }),
  component: DirectorOkrs,
});

interface GroupedOkr {
  objective: string;
  pct: number;
  krs: Array<{ k: string; pct: number }>;
}

function groupOkrs(rows: DirOkr[]): GroupedOkr[] {
  const map = new Map<string, Array<{ k: string; pct: number }>>();
  for (const row of rows) {
    const krs = map.get(row.objectiveLabel) ?? [];
    krs.push({ k: row.krLabel, pct: row.pct });
    map.set(row.objectiveLabel, krs);
  }
  return Array.from(map, ([objective, krs]) => ({
    objective,
    pct: Math.round(krs.reduce((sum, kr) => sum + kr.pct, 0) / krs.length),
    krs,
  }));
}

function pctTone(pct: number) {
  if (pct >= 75) return "bg-success/10 text-success";
  if (pct >= 40) return "bg-primary/10 text-primary";
  return "bg-warning/10 text-warning";
}

function DirectorOkrs() {
  const okrsQuery = useDirOkrs();
  return (
    <AppShell
      roleKey="director"
      title="Strategic planning · OKRs"
      subtitle="Q3 2026 cycle · 3 objectives · 9 key results · check-in week 6"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            3 due for check-in
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/director">
              <ArrowLeft className="size-4" /> Director portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Objectives",
            value: "3",
            delta: "2 on track",
            icon: Target,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Key results",
            value: "9",
            delta: "6 on track",
            icon: CircleStar,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Cycle progress",
            value: "62%",
            delta: "week 6 of 13",
            icon: ArrowUpRight,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Confidence",
            value: "High",
            delta: "1 flagged risk",
            icon: Flag,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <QueryState<DirOkr[]>
          query={okrsQuery}
          empty={{ title: "No OKRs yet" }}
          error={{ title: "Failed to load OKRs" }}
          isEmpty={(rows) => rows.length === 0}
        >
          {(rows) =>
            groupOkrs(rows).map((o) => (
              <Card key={o.objective} className="bg-card shadow-soft border">
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                    <Target className={cn("size-4", pctTone(o.pct))} /> {o.objective}
                  </CardTitle>
                  <Badge className={cn("border-0 font-semibold", pctTone(o.pct))}>{o.pct}%</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  {o.krs.map((k) => (
                    <div key={k.k}>
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span>{k.k}</span>
                        <span>{k.pct}%</span>
                      </div>
                      <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
                        <div
                          className="bg-gradient-brand h-full rounded-full"
                          style={{ width: `${k.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))
          }
        </QueryState>
        <div className="flex items-center justify-center">
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            <Plus className="size-4" /> New objective
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
