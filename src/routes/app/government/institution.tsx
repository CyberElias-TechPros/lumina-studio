import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Banknote,
  Building2,
  GraduationCap,
  Landmark,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useGovFacts, useGovOverview } from "@/lib/query/government";
import type { GovFact, GovKpi } from "@/lib/api/government";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/government/institution")({
  head: () => ({
    meta: [
      { title: "Institutional Data — CEA-OS" },
      { name: "description", content: "Read-only institutional profile." },
    ],
  }),
  component: GovernmentInstitution,
});

const kpiMeta: Record<string, { icon: LucideIcon; tone: string }> = {
  Students: { icon: GraduationCap, tone: "bg-primary/10 text-primary" },
  Staff: { icon: Users, tone: "bg-learning/10 text-learning" },
  "Revenue (FY)": { icon: Banknote, tone: "bg-success/10 text-success" },
  Facilities: { icon: Building2, tone: "bg-warning/10 text-warning" },
};

const defaultKpiMeta: { icon: LucideIcon; tone: string } = {
  icon: GraduationCap,
  tone: "bg-primary/10 text-primary",
};

const factTones = [
  "bg-primary/10 text-primary",
  "bg-learning/10 text-learning",
  "bg-success/10 text-success",
  "bg-warning/10 text-warning",
];

function GovernmentInstitution() {
  const overviewQuery = useGovOverview();
  const factsQuery = useGovFacts();

  return (
    <AppShell
      roleKey="government"
      title="Institutional data"
      subtitle="Read-only · updated Jul 31 · data verified by 2 officers"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Verified</Badge>
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
            <Landmark className="text-primary size-4" /> Registration
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<GovFact[]>
            query={factsQuery}
            error={{ title: "Institutional facts unavailable" }}
            empty={{ title: "No records", description: "Registration details will show here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((f, i) => (
                  <div
                    key={f.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{f.label}</p>
                      <p className="text-muted-foreground text-xs">{f.value}</p>
                    </div>
                    <Badge
                      className={cn("border-0 font-semibold", factTones[i % factTones.length])}
                    >
                      On file
                    </Badge>
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
