import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, FileCheck, FileText, ScrollText, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/government/reports")({
  head: () => ({
    meta: [
      { title: "Regulatory Reports — CEA-OS" },
      { name: "description", content: "Reports prepared for regulatory filing." },
    ],
  }),
  component: GovernmentReports,
});

const reports = [
  {
    r: "Annual compliance report · 2025/26",
    d: "Fiscal year close · filed",
    s: "Filed",
    tone: "bg-success/10 text-success",
  },
  {
    r: "Student enrolment census · Q2",
    d: "Due Aug 15 · ready",
    s: "Ready",
    tone: "bg-primary/10 text-primary",
  },
  {
    r: "Financial statement · audited",
    d: "FY 2025 · approved",
    s: "Filed",
    tone: "bg-success/10 text-success",
  },
];

function GovernmentReports() {
  return (
    <AppShell
      roleKey="admin"
      title="Regulatory reports"
      subtitle="12 reports · auto-prepared quarterly · filings-ready"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">0 overdue</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/government">
              <ArrowLeft className="size-4" /> Compliance portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Reports",
            value: "12",
            delta: "this fiscal year",
            icon: FileText,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Filed",
            value: "9",
            delta: "on time",
            icon: FileCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Ready",
            value: "3",
            delta: "awaiting cycle",
            icon: ScrollText,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Avg. prep time",
            value: "4 days",
            delta: "down 2 days",
            icon: Timer,
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
            <Download className="text-primary size-4" /> Recent reports
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {reports.map((r) => (
            <div key={r.r} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{r.r}</p>
                <p className="text-muted-foreground text-xs">{r.d}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", r.tone)}>{r.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                <Download className="size-3.5" /> Export
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
