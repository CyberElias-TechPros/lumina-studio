"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, BadgePercent, Gift, Share2, Users, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { GrwReferralCampaign } from "@/lib/api/growth";
import { useGrwReferrals } from "@/lib/query/growth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/growth/referrals")({
  head: () => ({
    meta: [
      { title: "Referral Program — CEA-OS" },
      { name: "description", content: "Referral campaigns, invite stats and payouts." },
    ],
  }),
  component: ReferralManager,
});

function referralTone(status: string) {
  switch (status) {
    case "Live":
      return "bg-success/10 text-success";
    case "Scheduled":
      return "bg-warning/10 text-warning";
    default:
      return "bg-muted-foreground/10 text-muted-foreground";
  }
}

function ReferralManager() {
  const referralsQuery = useGrwReferrals();

  return (
    <AppShell
      roleKey="growth"
      title="Referral program"
      subtitle="2 live campaigns · 18% of signups · payout cycle Aug 5"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            18% of signups
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/growth">
              <ArrowLeft className="size-4" /> Growth hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Active referrers",
            value: "214",
            delta: "+18% MoM",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Invites sent",
            value: "498",
            delta: "30-day",
            icon: Share2,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Converted",
            value: "33",
            delta: "6.6% invite CVR",
            icon: Gift,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Payouts (Aug)",
            value: "₦1.74m",
            delta: "due Aug 5",
            icon: Wallet,
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
            <BadgePercent className="text-primary size-4" /> Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <QueryState<GrwReferralCampaign[]>
            query={referralsQuery}
            error={{ title: "Referral data unavailable" }}
            empty={{
              title: "No campaigns yet",
              description: "Referral campaigns will appear here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Reward</TableHead>
                    <TableHead>Invites</TableHead>
                    <TableHead>Conversions</TableHead>
                    <TableHead>Paid out</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-semibold">{c.name}</TableCell>
                      <TableCell className="text-muted-foreground">{c.reward}</TableCell>
                      <TableCell>{c.invites}</TableCell>
                      <TableCell>{c.conversions}</TableCell>
                      <TableCell className="text-muted-foreground">{c.paidOut}</TableCell>
                      <TableCell>
                        <Badge className={cn("border-0 font-semibold", referralTone(c.status))}>
                          {c.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </QueryState>
        </CardContent>
      </Card>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Gift className="text-primary size-4" /> Referral loop health
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5 sm:grid-cols-3">
          {[
            { l: "Invite→signup CVR", v: 6.6, s: "target 8%" },
            { l: "Signup→first lesson", v: 71, s: "target 70%" },
            { l: "Referral share of CAC", v: 18, s: "target 25%" },
          ].map((x) => (
            <div key={x.l}>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-muted-foreground">{x.l}</span>
                <span>{x.v}%</span>
              </div>
              <Progress value={x.v} className="mt-1.5 h-2" />
              <p className="text-muted-foreground mt-1 text-[10px] font-semibold">{x.s}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
