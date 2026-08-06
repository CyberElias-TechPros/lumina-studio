import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChartNoAxesColumn, Download, FileText, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { DepReport } from "@/lib/api/department";
import { useDepReports } from "@/lib/query/department";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/department/reports")({
  head: () => ({
    meta: [
      { title: "Reports & Analytics — CEA-OS" },
      { name: "description", content: "Department performance reports." },
    ],
  }),
  component: DeptReports,
});

const reportTones: Record<string, string> = {
  Published: "bg-success/10 text-success",
  Draft: "bg-warning/10 text-warning",
  Archived: "bg-muted-foreground/10 text-muted-foreground",
};

function DeptReports() {
  const reportsQuery = useDepReports();

  return (
    <AppShell
      roleKey="instructor"
      title="Reports & analytics"
      subtitle="Software Engineering · FY 2026 · auto-generated"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">12 reports</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/department-head">
              <ArrowLeft className="size-4" /> Dept head portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Reports (year)",
            value: "12",
            delta: "4 per quarter",
            icon: FileText,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Completion rate",
            value: "92%",
            delta: "+3 pts YoY",
            icon: TrendingUp,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Placement rate",
            value: "84%",
            delta: "within 6 months",
            icon: ChartNoAxesColumn,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Exports (30d)",
            value: "6",
            delta: "by stakeholders",
            icon: Download,
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
            <FileText className="text-primary size-4" /> Recent reports
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<DepReport[]>
            query={reportsQuery}
            error={{ title: "Reports unavailable" }}
            empty={{
              title: "No reports yet",
              description: "Department performance reports will appear here.",
            }}
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
                        reportTones[r.status] ?? "bg-muted text-muted-foreground",
                      )}
                    >
                      {r.status}
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
