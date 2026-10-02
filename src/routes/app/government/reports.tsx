import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Download,
  FileCheck,
  FileText,
  ScrollText,
  Timer,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useGovOverview, useGovReports } from "@/lib/query/government";
import type { GovKpi, GovReport } from "@/lib/api/government";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/government/reports")({
  head: () => ({
    meta: [
      { title: "Regulatory Reports — CEA-OS" },
      { name: "description", content: "Reports prepared for regulatory filing." },
    ],
  }),
  component: GovernmentReports,
});

const kpiMeta: Record<string, { icon: LucideIcon; tone: string }> = {
  Reports: { icon: FileText, tone: "bg-primary/10 text-primary" },
  Filed: { icon: FileCheck, tone: "bg-success/10 text-success" },
  Ready: { icon: ScrollText, tone: "bg-learning/10 text-learning" },
  "Avg. prep time": { icon: Timer, tone: "bg-warning/10 text-warning" },
};

const defaultKpiMeta: { icon: LucideIcon; tone: string } = {
  icon: FileText,
  tone: "bg-primary/10 text-primary",
};

const reportTones: Record<string, string> = {
  Filed: "bg-success/10 text-success",
  Ready: "bg-primary/10 text-primary",
};

function GovernmentReports() {
  const overviewQuery = useGovOverview();
  const reportsQuery = useGovReports();

  return (
    <AppShell
      roleKey="government"
      title="Regulatory reports"
      subtitle="No reports prepared yet — they appear here once generated"
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
            <Download className="text-primary size-4" /> Recent reports
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<GovReport[]>
            query={reportsQuery}
            error={{ title: "Reports unavailable" }}
            empty={{ title: "No reports", description: "Prepared reports will show here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((r) => (
                  <div
                    key={r.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{r.title}</p>
                      <p className="text-muted-foreground text-xs">{r.detail}</p>
                    </div>
                    <Badge
                      className={cn(
                        "border-0 font-semibold",
                        reportTones[r.status] ?? "bg-success/10 text-success",
                      )}
                    >
                      {r.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      <Download className="size-3.5" /> Export
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
