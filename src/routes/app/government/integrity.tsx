import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Database,
  FileSearch,
  Fingerprint,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useGovChecks, useGovOverview } from "@/lib/query/government";
import type { GovCheck, GovKpi } from "@/lib/api/government";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/government/integrity")({
  head: () => ({
    meta: [
      { title: "Data Integrity — CEA-OS" },
      { name: "description", content: "Verification of institutional data." },
    ],
  }),
  component: GovernmentIntegrity,
});

const kpiMeta: Record<string, { icon: LucideIcon; tone: string }> = {
  "Checks (30d)": { icon: Database, tone: "bg-primary/10 text-primary" },
  "Pass rate": { icon: CheckCircle2, tone: "bg-success/10 text-success" },
  Discrepancies: { icon: ShieldAlert, tone: "bg-warning/10 text-warning" },
  "Hash verified": { icon: Fingerprint, tone: "bg-learning/10 text-learning" },
};

const defaultKpiMeta: { icon: LucideIcon; tone: string } = {
  icon: Database,
  tone: "bg-primary/10 text-primary",
};

const checkTones: Record<string, string> = {
  Pass: "bg-success/10 text-success",
  Flagged: "bg-warning/10 text-warning",
};

function GovernmentIntegrity() {
  const overviewQuery = useGovOverview();
  const checksQuery = useGovChecks();

  return (
    <AppShell
      roleKey="government"
      title="Data integrity verification"
      subtitle="Automated cross-checks · nightly · hash-verified"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Passing</Badge>
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
            <FileSearch className="text-primary size-4" /> Cross-checks
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<GovCheck[]>
            query={checksQuery}
            error={{ title: "Checks unavailable" }}
            empty={{ title: "No checks", description: "Automated cross-checks will show here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{c.title}</p>
                      <p className="text-muted-foreground text-xs">{c.detail}</p>
                    </div>
                    <Badge
                      className={cn(
                        "border-0 font-semibold",
                        checkTones[c.status] ?? "bg-success/10 text-success",
                      )}
                    >
                      {c.status}
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
