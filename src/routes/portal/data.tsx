import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Database,
  FileBarChart,
  LineChart,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/data")({
  head: () => ({
    meta: [
      { title: "Data & Analytics — CEA-OS" },
      {
        name: "description",
        content: "Reports, cohorts analytics and data quality for the data office.",
      },
    ],
  }),
  component: DataPortal,
});

const reports = [
  { t: "Cohort outcomes report · Q3", s: "Published Aug 1", tone: "bg-success/10 text-success" },
  {
    t: "Channel attribution · applications",
    s: "Draft · review Tue",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Employer demand forecast 2027",
    s: "In progress · ETA Aug 20",
    tone: "bg-warning/10 text-warning",
  },
];

const dataQuality = [
  { l: "OSKM records complete", v: 96 },
  { l: "Learner profiles enriched", v: 91 },
  { l: "Placement outcomes captured", v: 88 },
];

function DataPortal() {
  return (
    <AppShell
      roleKey="admin"
      title="Data & analytics"
      subtitle="Reports, models, data quality"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Pipeline fresh: 2h ago
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            GDPR-aligned
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Active dashboards",
            value: "14",
            delta: "3 new this quarter",
            icon: BarChart3,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Scheduled reports",
            value: "9",
            delta: "weekly digest",
            icon: FileBarChart,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Data sources",
            value: "12",
            delta: "5 engines + CRM",
            icon: Database,
            tone: "bg-erp/10 text-erp",
          },
          {
            label: "Model accuracy",
            value: "91%",
            delta: "placement forecast",
            icon: TrendingUp,
            tone: "bg-success/10 text-success",
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <FileBarChart className="text-primary size-4" /> Report queue
            </CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-primary font-semibold">
              <Link to="/portal/executive">
                Executive view <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {reports.map((r) => (
              <div key={r.t} className="flex items-center justify-between rounded-xl border p-3.5">
                <span className="text-sm font-semibold">{r.t}</span>
                <Badge className={cn("border-0 font-semibold", r.tone)}>{r.s}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <LineChart className="text-primary size-4" /> Data quality
            </CardTitle>
            <Users className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent className="space-y-5">
            {dataQuality.map((d) => (
              <div key={d.l}>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>{d.l}</span>
                  <span className="font-display text-sm font-extrabold">{d.v}%</span>
                </div>
                <Progress value={d.v} className="mt-1.5 h-2" />
              </div>
            ))}
            <p className="text-muted-foreground border-t pt-3 text-xs">
              Target: 95% completeness across all entities by Q4.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
