import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarClock,
  ClipboardList,
  FileWarning,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useGovAudits, useGovOverview } from "@/lib/query/government";
import type { GovAudit, GovKpi } from "@/lib/api/government";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/government/audit")({
  head: () => ({
    meta: [
      { title: "Audit Module — CEA-OS" },
      { name: "description", content: "Schedule, findings and remediation." },
    ],
  }),
  component: GovernmentAudit,
});

const kpiMeta: Record<string, { icon: LucideIcon; tone: string }> = {
  "Audits (year)": { icon: ClipboardList, tone: "bg-primary/10 text-primary" },
  "Open findings": { icon: FileWarning, tone: "bg-warning/10 text-warning" },
  "Score (latest)": { icon: ShieldCheck, tone: "bg-success/10 text-success" },
  "Next audit": { icon: CalendarClock, tone: "bg-learning/10 text-learning" },
};

const defaultKpiMeta: { icon: LucideIcon; tone: string } = {
  icon: ClipboardList,
  tone: "bg-primary/10 text-primary",
};

const auditTones: Record<string, string> = {
  Closed: "bg-success/10 text-success",
  Planned: "bg-primary/10 text-primary",
  Open: "bg-warning/10 text-warning",
};

function GovernmentAudit() {
  const overviewQuery = useGovOverview();
  const auditsQuery = useGovAudits();

  return (
    <AppShell
      roleKey="admin"
      title="Audit module"
      subtitle="Next audit Sep 18 · 1 open finding · remediation on track"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">On track</Badge>
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
            <Search className="text-primary size-4" /> Audits
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<GovAudit[]>
            query={auditsQuery}
            error={{ title: "Audits unavailable" }}
            empty={{
              title: "No audits",
              description: "Scheduled and completed audits will show here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((a) => (
                  <div
                    key={a.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{a.title}</p>
                      <p className="text-muted-foreground text-xs">{a.detail}</p>
                    </div>
                    <Badge
                      className={cn(
                        "border-0 font-semibold",
                        auditTones[a.status] ?? "bg-primary/10 text-primary",
                      )}
                    >
                      {a.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      Details
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
