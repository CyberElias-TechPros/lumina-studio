import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, Banknote, Gift, TrendingUp, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { usePtnReferralItems, usePtnReferrals } from "@/lib/query/supplierPartner";
import type { PtnReferral } from "@/lib/api/supplierPartner";
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

const statusMeta: Record<string, string> = {
  Enrolled: "bg-success/10 text-success",
  Applied: "bg-primary/10 text-primary",
  Contacted: "bg-warning/10 text-warning",
};

function PartnerReferrals() {
  const referralsQuery = usePtnReferrals();
  const referrals = usePtnReferralItems();

  const enrolled = referrals.filter((r) => r.status === "Enrolled");
  const conversion =
    referrals.length > 0 ? Math.round((enrolled.length / referrals.length) * 100) : 0;

  return (
    <AppShell
      roleKey="student"
      title="Referral portal"
      subtitle={
        referrals.length > 0
          ? `${referrals.length} referrals · ${enrolled.length} enrolled · share stats auto-synced`
          : "Referral tracking"
      }
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
            value: referrals.length > 0 ? String(referrals.length) : "—",
            delta: "recent referrals",
            icon: UserRound,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Enrolled",
            value: referrals.length > 0 ? String(enrolled.length) : "—",
            delta: `${conversion}% conversion`,
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
          <QueryState<PtnReferral[]>
            query={referralsQuery}
            error={{ title: "Referrals unavailable" }}
            empty={{
              title: "No referrals",
              description: "Referrals via your partner link show here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((r) => (
                  <div
                    key={r.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                      <UserRound className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{r.name}</p>
                      <p className="text-muted-foreground text-xs">Referred via partner link</p>
                    </div>
                    <p className="text-sm font-semibold">{r.valueLabel}</p>
                    <Badge
                      className={cn(
                        "border-0 font-semibold",
                        statusMeta[r.status] ?? "bg-muted text-muted-foreground",
                      )}
                    >
                      {r.status}
                    </Badge>
                  </div>
                ))}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
