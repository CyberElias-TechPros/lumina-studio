import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Banknote, CheckCircle2, Clock3, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/accountant/payroll")({
  head: () => ({
    meta: [
      { title: "Payroll — CEA-OS" },
      { name: "description", content: "Salaries, deductions and payslips." },
    ],
  }),
  component: AccountantPayroll,
});

const payslips = [
  {
    p: "Full-time staff (86)",
    v: "₦9.6m",
    d: "Run Aug 1",
    s: "Paid",
    tone: "bg-success/10 text-success",
  },
  {
    p: "Instructors (part-time)",
    v: "₦1.8m",
    d: "Run Aug 2",
    s: "Processing",
    tone: "bg-primary/10 text-primary",
  },
  {
    p: "Stipends — interns (8)",
    v: "₦620k",
    d: "Run Aug 1",
    s: "Awaiting approval",
    tone: "bg-warning/10 text-warning",
  },
];

function AccountantPayroll() {
  return (
    <AppShell
      roleKey="instructor"
      title="Payroll"
      subtitle="August run · ₦12.0m gross · payslips by Aug 3"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">On schedule</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/accountant">
              <ArrowLeft className="size-4" /> Finance hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Gross (Aug)",
            value: "₦12.0m",
            delta: "94 employees",
            icon: UserRound,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Deductions",
            value: "₦2.6m",
            delta: "tax + pension",
            icon: Banknote,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Net pay",
            value: "₦9.4m",
            delta: "transferred",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Pending runs",
            value: "2",
            delta: "due today",
            icon: Clock3,
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
            <Banknote className="text-primary size-4" /> August runs
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {payslips.map((p) => (
            <div key={p.p} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{p.p}</p>
                <p className="text-muted-foreground text-xs">
                  {p.v} · {p.d}
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", p.tone)}>{p.s}</Badge>
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
