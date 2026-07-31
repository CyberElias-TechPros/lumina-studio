import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BarChart3, FileBarChart2, Funnel, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admissions/reports")({
  head: () => ({
    meta: [
      { title: "Reports — CEA-OS" },
      { name: "description", content: "Conversion, sources and demographics." },
    ],
  }),
  component: AdmissionsReports,
});

const sources = [
  { s: "Digital ads", pct: 38 },
  { s: "Referrals", pct: 24 },
  { s: "Events", pct: 18 },
  { s: "Partners", pct: 12 },
  { s: "Organic", pct: 8 },
];

const reports = [
  { r: "Fall intake funnel report", d: "Aug 1 · PDF", tone: "bg-success/10 text-success" },
  { r: "Source & demographics", d: "Jul 31 · PDF", tone: "bg-primary/10 text-primary" },
];

function AdmissionsReports() {
  return (
    <AppShell
      roleKey="instructor"
      title="Reports"
      subtitle="Conversion 15.5% · top source: digital ads"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Weekly cadence
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/admissions">
              <ArrowLeft className="size-4" /> Admissions hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Lead→app",
            value: "28.6%",
            delta: "412 leads",
            icon: Funnel,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "App→enrol",
            value: "54.2%",
            delta: "118 apps",
            icon: TrendingUp,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Avg. age",
            value: "22.4",
            delta: "19–35 range",
            icon: Users,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Top source",
            value: "Ads",
            delta: "38% of apps",
            icon: BarChart3,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Users className="text-primary size-4" /> Application sources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sources.map((s) => (
              <div key={s.s}>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>{s.s}</span>
                  <span>{s.pct}%</span>
                </div>
                <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
                  <div
                    className="bg-gradient-brand h-full rounded-full"
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <FileBarChart2 className="text-primary size-4" /> Published reports
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {reports.map((r) => (
              <div
                key={r.r}
                className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
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
      </div>
    </AppShell>
  );
}
