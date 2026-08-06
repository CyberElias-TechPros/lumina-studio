import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  FileCheck,
  History,
  Send,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useGovFilings, useGovOverview } from "@/lib/query/government";
import type { GovFiling, GovKpi } from "@/lib/api/government";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/government/filings")({
  head: () => ({
    meta: [
      { title: "Filings & Timeline — CEA-OS" },
      { name: "description", content: "Regulatory submissions and deadlines." },
    ],
  }),
  component: GovernmentFilings,
});

const kpiMeta: Record<string, { icon: LucideIcon; tone: string }> = {
  "Filed (year)": { icon: FileCheck, tone: "bg-success/10 text-success" },
  Upcoming: { icon: CalendarClock, tone: "bg-warning/10 text-warning" },
  Overdue: { icon: CheckCircle2, tone: "bg-primary/10 text-primary" },
  "Avg. lead time": { icon: History, tone: "bg-learning/10 text-learning" },
};

const defaultKpiMeta: { icon: LucideIcon; tone: string } = {
  icon: FileCheck,
  tone: "bg-primary/10 text-primary",
};

const filingTones: Record<string, string> = {
  Filed: "bg-success/10 text-success",
  Draft: "bg-warning/10 text-warning",
};

function GovernmentFilings() {
  const overviewQuery = useGovOverview();
  const filingsQuery = useGovFilings();

  return (
    <AppShell
      roleKey="admin"
      title="Filings & timeline"
      subtitle="14 filings this year · 0 overdue · 2 upcoming"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">0 overdue</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/government">
              <ArrowLeft className="size-4" /> Compliance portal
            </Link>
          </Button>
        </>
      }
    >
      <QueryState<GovKpi[]>
        query={overviewQuery}
        error={{ title: "Metrics unavailable" }}
        empty={{ title: "No metrics", description: "Compliance metrics will appear here." }}
        isEmpty={(rows) => rows.length === 0}
      >
        {(rows) => (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {rows.map((k) => {
              const meta = kpiMeta[k.metric] ?? defaultKpiMeta;
              return (
                <Card key={k.id} className="bg-card shadow-soft border">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                        {k.metric}
                      </p>
                      <span className={cn("grid size-8 place-items-center rounded-lg", meta.tone)}>
                        <meta.icon className="size-4" />
                      </span>
                    </div>
                    <p className="font-display mt-3 text-2xl font-extrabold">{k.valueLabel}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs font-semibold">{k.delta}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </QueryState>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Send className="text-primary size-4" /> Recent filings
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<GovFiling[]>
            query={filingsQuery}
            error={{ title: "Filings unavailable" }}
            empty={{ title: "No filings", description: "Submissions history will show here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((f) => (
                  <div
                    key={f.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{f.title}</p>
                      <p className="text-muted-foreground text-xs">{f.detail}</p>
                    </div>
                    <Badge
                      className={cn(
                        "border-0 font-semibold",
                        filingTones[f.status] ?? "bg-success/10 text-success",
                      )}
                    >
                      {f.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      View
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
