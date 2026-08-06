import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ClipboardCheck, Eye, FileCheck2, ShieldCheck, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { DepObservation } from "@/lib/api/department";
import { useDepObservations } from "@/lib/query/department";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/department/quality")({
  head: () => ({
    meta: [
      { title: "Quality Assurance — CEA-OS" },
      { name: "description", content: "Class observations and course evaluations." },
    ],
  }),
  component: DepartmentQuality,
});

const observationTones: Record<string, string> = {
  Scheduled: "bg-primary/10 text-primary",
  Completed: "bg-success/10 text-success",
  Pending: "bg-warning/10 text-warning",
};

function DepartmentQuality() {
  const observationsQuery = useDepObservations();

  return (
    <AppShell
      roleKey="instructor"
      title="Quality assurance"
      subtitle="Observations, evaluations and standards"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            4.6★ avg course rating
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/department-head">
              <ArrowLeft className="size-4" /> Department overview
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Observations this term",
            value: "6",
            delta: "3 scheduled",
            icon: Eye,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Course evaluations",
            value: "14",
            delta: "avg 4.6★",
            icon: Star,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Standards met",
            value: "100%",
            delta: "NUC + internal",
            icon: ShieldCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Follow-ups open",
            value: "2",
            delta: "re-observe by Oct",
            icon: ClipboardCheck,
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
            <FileCheck2 className="text-primary size-4" /> Observations & evaluations
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<DepObservation[]>
            query={observationsQuery}
            error={{ title: "Observations unavailable" }}
            empty={{
              title: "No observations yet",
              description: "Class observations and course evaluations will appear here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((o) => (
                  <div
                    key={o.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                      <Eye className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{o.title}</p>
                      <p className="text-muted-foreground text-xs">{o.detail}</p>
                    </div>
                    <Badge
                      className={cn(
                        "border-0 font-semibold",
                        observationTones[o.status] ?? "bg-muted text-muted-foreground",
                      )}
                    >
                      {o.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      Open
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
