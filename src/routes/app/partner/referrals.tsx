import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, Banknote, Gift, TrendingUp, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/partner/referrals")({
  head: () => ({
    meta: [
      { title: "Referrals — CEA-OS" },
      { name: "description", content: "Track referrals and payouts." },
    ],
  }),
  component: PartnerReferrals,
});

const referrals = [
  { n: "Tola Bakare", s: "Enrolled", v: "₦120,000", tone: "bg-success/10 text-success" },
  { n: "Musa Danjuma", s: "Applied", v: "Pending", tone: "bg-primary/10 text-primary" },
  { n: "Ngozi Eze", s: "Contacted", v: "—", tone: "bg-warning/10 text-warning" },
];

function PartnerReferrals() {
  return (
    <AppShell
      roleKey="student"
      title="Referral portal"
      subtitle="34 referrals · 8 enrolled · ₦1.9m share earned"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Payout due Aug 15
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/partner/hub">
              <ArrowLeft className="size-4" /> Partner hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Referrals",
            value: "34",
            delta: "+6 this month",
            icon: UserRound,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Enrolled",
            value: "8",
            delta: "23.5% conversion",
            icon: BadgeCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Share earned",
            value: "₦1.9m",
            delta: "Q3 to date",
            icon: Banknote,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Pending payout",
            value: "₦480k",
            delta: "4 referrals",
            icon: Gift,
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
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <TrendingUp className="text-primary size-4" /> Recent referrals
          </CardTitle>
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            Refer someone
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          {referrals.map((r) => (
            <div key={r.n} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                <UserRound className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{r.n}</p>
                <p className="text-muted-foreground text-xs">Referred via partner link</p>
              </div>
              <p className="text-sm font-semibold">{r.v}</p>
              <Badge className={cn("border-0 font-semibold", r.tone)}>{r.s}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
