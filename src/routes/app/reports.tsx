import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BarChart3,
  Download,
  FileBarChart2,
  FileText,
  Filter,
  Plus,
  Share2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/reports")({
  head: () => ({
    meta: [
      { title: "Report Builder — CEA-OS" },
      { name: "description", content: "Self-service reports across the academy." },
    ],
  }),
  component: ReportBuilder,
});

const templates = [
  {
    t: "Attendance summary — by cohort",
    cat: "Academics",
    uses: "14 runs",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Grade distribution — by course",
    cat: "Academics",
    uses: "9 runs",
    tone: "bg-learning/10 text-learning",
  },
  {
    t: "Revenue by stream (tuition, services)",
    cat: "Finance",
    uses: "11 runs",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Placement outcomes — by cohort",
    cat: "Career",
    uses: "8 runs",
    tone: "bg-warning/10 text-warning",
  },
];

function ReportBuilder() {
  return (
    <AppShell
      roleKey="instructor"
      title="Report builder"
      subtitle="Self-service analytics across every module"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Scheduled: weekly
          </Badge>
          <Button size="sm">
            <Plus className="size-4" /> New report
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Saved reports",
            value: "6",
            delta: "shared with 3 roles",
            icon: FileBarChart2,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Runs this month",
            value: "42",
            delta: "avg 11 templates",
            icon: BarChart3,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Scheduled",
            value: "3",
            delta: "weekly delivery",
            icon: FileText,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Data sources",
            value: "12",
            delta: "all modules live",
            icon: Filter,
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
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <FileBarChart2 className="text-primary size-4" /> Popular templates
          </CardTitle>
          <Button variant="outline" size="sm" className="font-semibold">
            <Filter className="size-3.5" /> Filter
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          {templates.map((t) => (
            <div key={t.t} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                <FileText className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{t.t}</p>
                <p className="text-muted-foreground text-xs">
                  {t.cat} · {t.uses}
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                <Button variant="outline" size="sm" className="font-semibold">
                  <Download className="size-3.5" /> Run
                </Button>
                <Button variant="ghost" size="sm" className="text-primary font-semibold">
                  <Share2 className="size-3.5" /> Share
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
