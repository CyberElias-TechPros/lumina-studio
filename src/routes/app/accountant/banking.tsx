import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Banknote, Building2, CheckCircle2, Landmark, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/accountant/banking")({
  head: () => ({
    meta: [
      { title: "Banking — CEA-OS" },
      { name: "description", content: "Bank reconciliation across accounts." },
    ],
  }),
  component: AccountantBanking,
});

const accounts = [
  { a: "Main — GTB 0123…", b: "₦18.2m", s: "Reconciled", tone: "bg-success/10 text-success" },
  { a: "Payroll — Access 4567…", b: "₦4.9m", s: "Reconciled", tone: "bg-success/10 text-success" },
  {
    a: "Scholarship — UBA 7890…",
    b: "₦1.7m",
    s: "1 item pending",
    tone: "bg-warning/10 text-warning",
  },
];

function AccountantBanking() {
  return (
    <AppShell
      roleKey="instructor"
      title="Banking reconciliation"
      subtitle="3 accounts · ₦24.8m total · last sync 07:00 today"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">98% matched</Badge>
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
            label: "Accounts",
            value: "3",
            delta: "all linked",
            icon: Building2,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Total balance",
            value: "₦24.8m",
            delta: "as of today",
            icon: Wallet,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Pending items",
            value: "1",
            delta: "₦240k transfer",
            icon: Landmark,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Match rate",
            value: "98%",
            delta: "30-day rolling",
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
            <Banknote className="text-primary size-4" /> Accounts
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {accounts.map((a) => (
            <div key={a.a} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{a.a}</p>
                <p className="text-muted-foreground text-xs">Balance {a.b}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", a.tone)}>{a.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Reconcile
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
