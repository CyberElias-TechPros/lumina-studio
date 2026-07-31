import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BarChart3,
  FileBarChart2,
  Landmark,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/ops/reports")({
  head: () => ({
    meta: [
      { title: "Ops Reports — CEA-OS" },
      { name: "description", content: "Operational efficiency and cost per branch." },
    ],
  }),
  component: OperationsReports,
});

const rows = [
  { m: "Ikeja HQ", c: "₦8.2 / seat-day", u: "86%", t: "+4%", up: true },
  { m: "Victoria Island", c: "₦9.6 / seat-day", u: "79%", t: "+1%", up: true },
  { m: "Abeokuta", c: "₦11.4 / seat-day", u: "53%", t: "-3%", up: false },
];

const reports = [
  {
    r: "Monthly operations report",
    d: "July · published Aug 2",
    tone: "bg-success/10 text-success",
  },
  {
    r: "Energy & fuel consumption",
    d: "Q2 · published Jul 15",
    tone: "bg-primary/10 text-primary",
  },
  {
    r: "Supplier performance review",
    d: "July · published Jul 31",
    tone: "bg-learning/10 text-learning",
  },
];

function OperationsReports() {
  return (
    <AppShell
      roleKey="instructor"
      title="Reports & analytics"
      subtitle="Efficiency, cost per branch · updated daily 07:00"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Efficiency 91%
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/operations">
              <ArrowLeft className="size-4" /> Operations
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Efficiency score",
            value: "91%",
            delta: "target 85%+",
            icon: BarChart3,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Cost per seat-day",
            value: "₦9.2",
            delta: "across campuses",
            icon: Landmark,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Utilization",
            value: "82%",
            delta: "peak 94%",
            icon: TrendingUp,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Incidents (30d)",
            value: "0",
            delta: "down from 3",
            icon: TrendingDown,
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
            <Landmark className="text-primary size-4" /> Cost per branch · July
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {rows.map((r) => (
            <div
              key={r.m}
              className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0 last:pb-0"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{r.m}</p>
                <p className="text-muted-foreground text-xs">Utilization {r.u}</p>
              </div>
              <p className="text-sm font-semibold">{r.c}</p>
              <Badge
                className={cn(
                  "border-0 font-semibold",
                  r.up ? "bg-success/10 text-success" : "bg-error/10 text-error",
                )}
              >
                {r.t}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <FileBarChart2 className="text-primary size-4" /> Published reports
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {reports.map((r) => (
            <div key={r.r} className="flex flex-wrap items-center gap-3 rounded-xl border p-3">
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
