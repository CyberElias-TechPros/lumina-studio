import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChartNoAxesColumn, Download, FileText, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
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

const reports = [
  {
    r: "Student outcomes · Q2 2026",
    v: "92% completion · 84% placement",
    s: "Published",
    tone: "bg-success/10 text-success",
  },
  {
    r: "Instructor performance · Q2",
    v: "Avg score 4.6 · 14 observations",
    s: "Published",
    tone: "bg-success/10 text-success",
  },
  {
    r: "Curriculum audit · draft",
    v: "Due Aug 20 · 3 programs",
    s: "Draft",
    tone: "bg-warning/10 text-warning",
  },
];

function DeptReports() {
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
          {reports.map((r) => (
            <div key={r.r} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{r.r}</p>
                <p className="text-muted-foreground text-xs">{r.v}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", r.tone)}>{r.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                View
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
