import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BarChart3, FileBarChart2, HeartPulse, TrendingDown, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/hr/reports")({
  head: () => ({
    meta: [
      { title: "HR Reports — CEA-OS" },
      { name: "description", content: "Turnover, satisfaction and compliance reports." },
    ],
  }),
  component: HrReports,
});

const reports = [
  { r: "Monthly HR report — July", d: "Published Aug 1", tone: "bg-success/10 text-success" },
  { r: "Turnover analysis — Q2", d: "Published Jul 15", tone: "bg-primary/10 text-primary" },
  { r: "eNPS pulse — July", d: "Published Jul 30", tone: "bg-learning/10 text-learning" },
];

function HrReports() {
  return (
    <AppShell
      roleKey="instructor"
      title="HR reports"
      subtitle="Turnover 8% · eNPS 61 · compliance 100%"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">All current</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/hr">
              <ArrowLeft className="size-4" /> HR hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Turnover",
            value: "8%",
            delta: "benchmark 12%",
            icon: TrendingDown,
            tone: "bg-success/10 text-success",
          },
          {
            label: "eNPS",
            value: "61",
            delta: "+4 vs Q2",
            icon: HeartPulse,
            tone: "bg-community/10 text-community",
          },
          {
            label: "Compliance",
            value: "100%",
            delta: "documents",
            icon: BarChart3,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Headcount",
            value: "94",
            delta: "+3 net hires",
            icon: Users,
            tone: "bg-learning/10 text-learning",
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
            <FileBarChart2 className="text-primary size-4" /> Published reports
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {reports.map((r) => (
            <div key={r.r} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{r.r}</p>
                <p className="text-muted-foreground text-xs">{r.d}</p>
              </div>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Open
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
