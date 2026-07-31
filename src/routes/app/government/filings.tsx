import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarClock, CheckCircle2, FileCheck, History, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/government/filings")({
  head: () => ({
    meta: [
      { title: "Filings & Timeline — CEA-OS" },
      { name: "description", content: "Regulatory submissions and deadlines." },
    ],
  }),
  component: GovernmentFilings,
});

const filings = [
  {
    f: "Q2 enrolment census",
    d: "Filed Jul 14 · ref FED-2026-0142",
    s: "Filed",
    tone: "bg-success/10 text-success",
  },
  {
    f: "Tuition fee schedule",
    d: "Due Aug 30 · drafted",
    s: "Draft",
    tone: "bg-warning/10 text-warning",
  },
  {
    f: "Annual returns 2025",
    d: "Filed Apr 02 · ref FED-2026-0089",
    s: "Filed",
    tone: "bg-success/10 text-success",
  },
];

function GovernmentFilings() {
  return (
    <AppShell
      roleKey="admin"
      title="Filings & timeline"
      subtitle="14 filings this year · 0 overdue · 2 upcoming"
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
            label: "Filed (year)",
            value: "14",
            delta: "100% on time",
            icon: FileCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Upcoming",
            value: "2",
            delta: "next Aug 30",
            icon: CalendarClock,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Overdue",
            value: "0",
            delta: "all clear",
            icon: CheckCircle2,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Avg. lead time",
            value: "11 days",
            delta: "before deadline",
            icon: History,
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
            <Send className="text-primary size-4" /> Recent filings
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {filings.map((f) => (
            <div key={f.f} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{f.f}</p>
                <p className="text-muted-foreground text-xs">{f.d}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", f.tone)}>{f.s}</Badge>
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
