import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Banknote, CalendarClock, CheckCircle2, Hourglass } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/accountant/billing")({
  head: () => ({
    meta: [
      { title: "Billing — CEA-OS" },
      { name: "description", content: "Accounts payable and payment schedules." },
    ],
  }),
  component: AccountantBilling,
});

const bills = [
  {
    b: "OfficeMate · INV-8821",
    v: "₦385,000",
    d: "Due Aug 10",
    s: "Scheduled",
    tone: "bg-primary/10 text-primary",
  },
  {
    b: "GasMaster · INV-8795",
    v: "₦96,000",
    d: "Due Aug 7",
    s: "Scheduled",
    tone: "bg-learning/10 text-learning",
  },
  {
    b: "Compton Power · INV-8770",
    v: "₦210,000",
    d: "Paid Jul 30",
    s: "Paid",
    tone: "bg-success/10 text-success",
  },
];

function AccountantBilling() {
  return (
    <AppShell
      roleKey="instructor"
      title="Billing · AP"
      subtitle="₦4.2m payable · 0 overdue · avg. payment 11 days"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Healthy AP</Badge>
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
            label: "Payable",
            value: "₦4.2m",
            delta: "8 open bills",
            icon: Banknote,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Due this week",
            value: "₦1.1m",
            delta: "3 bills",
            icon: CalendarClock,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Paid (30d)",
            value: "₦3.8m",
            delta: "11 bills",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "On-time rate",
            value: "96%",
            delta: "last quarter",
            icon: Hourglass,
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
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Banknote className="text-primary size-4" /> Upcoming bills
          </CardTitle>
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            Schedule payment
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          {bills.map((b) => (
            <div key={b.b} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{b.b}</p>
                <p className="text-muted-foreground text-xs">
                  {b.v} · {b.d}
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", b.tone)}>{b.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Pay
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
