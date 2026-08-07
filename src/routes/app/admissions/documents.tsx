import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  FileCheck2,
  FileText,
  Hourglass,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useAdmChecks, useAdmDocOverview } from "@/lib/query/admissionsExtras";
import type { AdmDocCheck, AdmDocKpi } from "@/lib/api/admissionsExtras";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admissions/documents")({
  head: () => ({
    meta: [
      { title: "Documents — CEA-OS" },
      { name: "description", content: "Document verification checklists." },
    ],
  }),
  component: AdmissionsDocuments,
});

function checkTone(status: string) {
  if (/complete|verified|done|ok|approved/i.test(status)) return "bg-success/10 text-success";
  if (/pending|review|draft|overdue/i.test(status)) return "bg-warning/10 text-warning";
  if (/reject|fail|error/i.test(status)) return "bg-destructive/10 text-destructive";
  return "bg-primary/10 text-primary";
}

const kpiMeta: Record<string, { icon: LucideIcon; tone: string }> = {
  Verified: { icon: BadgeCheck, tone: "bg-success/10 text-success" },
  Pending: { icon: Hourglass, tone: "bg-warning/10 text-warning" },
  Rejected: { icon: FileText, tone: "bg-primary/10 text-primary" },
  "Avg. verify": { icon: FileCheck2, tone: "bg-learning/10 text-learning" },
};

const defaultKpiMeta: { icon: LucideIcon; tone: string } = {
  icon: BadgeCheck,
  tone: "bg-primary/10 text-primary",
};

function AdmissionsDocuments() {
  const overviewQuery = useAdmDocOverview();
  const checksQuery = useAdmChecks();
  return (
    <AppShell
      roleKey="instructor"
      title="Document verification"
      subtitle="118 applicants · 91% doc completeness"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Within SLA</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/admissions">
              <ArrowLeft className="size-4" /> Admissions hub
            </Link>
          </Button>
        </>
      }
    >
      <QueryState<AdmDocKpi[]>
        query={overviewQuery}
        error={{ title: "Metrics unavailable" }}
        empty={{ title: "No metrics", description: "Document metrics will appear here." }}
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
            <FileCheck2 className="text-primary size-4" /> Checklists
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<AdmDocCheck[]>
            query={checksQuery}
            error={{ title: "Failed to load checklists" }}
            empty={{
              title: "No checklists",
              description: "Document checklists will appear here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(items) =>
              items.map((c) => (
                <div
                  key={c.id}
                  className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{c.name}</p>
                    <p className="text-muted-foreground text-xs">{c.detail}</p>
                  </div>
                  <Badge className={cn("border-0 font-semibold", checkTone(c.status))}>
                    {c.status}
                  </Badge>
                  <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                    Open
                  </Button>
                </div>
              ))
            }
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
