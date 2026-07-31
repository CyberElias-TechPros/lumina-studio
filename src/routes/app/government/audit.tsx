import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarClock,
  ClipboardList,
  FileWarning,
  Search,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/government/audit")({
  head: () => ({
    meta: [
      { title: "Audit Module — CEA-OS" },
      { name: "description", content: "Schedule, findings and remediation." },
    ],
  }),
  component: GovernmentAudit,
});

const audits = [
  {
    a: "Institutional audit · FY 2025",
    d: "Completed Mar 12 · 92/100",
    s: "Closed",
    tone: "bg-success/10 text-success",
  },
  {
    a: "Facilities compliance check",
    d: "Scheduled Sep 18",
    s: "Planned",
    tone: "bg-primary/10 text-primary",
  },
  {
    a: "Financial record inspection",
    d: "Finding #2 · remediation due Aug 30",
    s: "Open",
    tone: "bg-warning/10 text-warning",
  },
];

function GovernmentAudit() {
  return (
    <AppShell
      roleKey="admin"
      title="Audit module"
      subtitle="Next audit Sep 18 · 1 open finding · remediation on track"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">On track</Badge>
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
            label: "Audits (year)",
            value: "3",
            delta: "2 completed",
            icon: ClipboardList,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Open findings",
            value: "1",
            delta: "low priority",
            icon: FileWarning,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Score (latest)",
            value: "92",
            delta: "of 100",
            icon: ShieldCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Next audit",
            value: "Sep 18",
            delta: "planned",
            icon: CalendarClock,
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
            <Search className="text-primary size-4" /> Audits
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {audits.map((a) => (
            <div key={a.a} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{a.a}</p>
                <p className="text-muted-foreground text-xs">{a.d}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", a.tone)}>{a.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Details
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
