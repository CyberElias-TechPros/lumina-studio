import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Banknote, CheckCircle2, Clock3, UserRoundCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/hr/payroll-input")({
  head: () => ({
    meta: [
      { title: "Payroll Input — CEA-OS" },
      { name: "description", content: "Changes that flow to finance for payroll." },
    ],
  }),
  component: HrPayrollInput,
});

const changes = [
  {
    c: "New starter — K. Okafor",
    d: "Effective Aug 1",
    s: "Sent to finance",
    tone: "bg-success/10 text-success",
  },
  {
    c: "Salary revision — 3 staff",
    d: "Approved by director",
    s: "Sent to finance",
    tone: "bg-primary/10 text-primary",
  },
  {
    c: "Leaver — J. Okonkwo",
    d: "Effective Aug 15",
    s: "Draft",
    tone: "bg-warning/10 text-warning",
  },
];

function HrPayrollInput() {
  return (
    <AppShell
      roleKey="instructor"
      title="Payroll input"
      subtitle="3 changes for August · cut-off Aug 5"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">On schedule</Badge>
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
            label: "Changes (Aug)",
            value: "5",
            delta: "3 sent",
            icon: UserRoundCheck,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Sent to finance",
            value: "3",
            delta: "2 this week",
            icon: Banknote,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Drafts",
            value: "2",
            delta: "need review",
            icon: Clock3,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Cut-off",
            value: "Aug 5",
            delta: "4 days away",
            icon: CheckCircle2,
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
            <Banknote className="text-primary size-4" /> August changes
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {changes.map((c) => (
            <div key={c.c} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{c.c}</p>
                <p className="text-muted-foreground text-xs">{c.d}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", c.tone)}>{c.s}</Badge>
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
