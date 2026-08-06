import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  FileStack,
  FolderOpen,
  ShieldCheck,
  Timer,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useGovDocuments, useGovOverview } from "@/lib/query/government";
import type { GovDocument, GovKpi } from "@/lib/api/government";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/government/documents")({
  head: () => ({
    meta: [
      { title: "Documentation Library — CEA-OS" },
      { name: "description", content: "Policies, certificates and compliance docs." },
    ],
  }),
  component: GovernmentDocuments,
});

const kpiMeta: Record<string, { icon: LucideIcon; tone: string }> = {
  Documents: { icon: FileStack, tone: "bg-primary/10 text-primary" },
  Policies: { icon: ShieldCheck, tone: "bg-success/10 text-success" },
  Certificates: { icon: BadgeCheck, tone: "bg-learning/10 text-learning" },
  "Expiring < 90d": { icon: Timer, tone: "bg-warning/10 text-warning" },
};

const defaultKpiMeta: { icon: LucideIcon; tone: string } = {
  icon: FileStack,
  tone: "bg-primary/10 text-primary",
};

const docTones: Record<string, string> = {
  Current: "bg-success/10 text-success",
  Reviewing: "bg-warning/10 text-warning",
};

function GovernmentDocuments() {
  const overviewQuery = useGovOverview();
  const docsQuery = useGovDocuments();

  return (
    <AppShell
      roleKey="admin"
      title="Documentation library"
      subtitle="64 documents · versioned · digitally signed"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Signed</Badge>
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
            <FolderOpen className="text-primary size-4" /> Policies
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<GovDocument[]>
            query={docsQuery}
            error={{ title: "Documents unavailable" }}
            empty={{ title: "No documents", description: "Policies will show here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((d) => (
                  <div
                    key={d.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{d.title}</p>
                      <p className="text-muted-foreground text-xs">{d.versionLabel}</p>
                    </div>
                    <Badge
                      className={cn(
                        "border-0 font-semibold",
                        docTones[d.status] ?? "bg-success/10 text-success",
                      )}
                    >
                      {d.status}
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
