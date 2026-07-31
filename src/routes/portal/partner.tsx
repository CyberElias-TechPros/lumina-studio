import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgePercent,
  Building2,
  Handshake,
  Megaphone,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/partner")({
  head: () => ({
    meta: [
      { title: "Partner Portal — CEA-OS" },
      {
        name: "description",
        content:
          "Referrals, co-branded programmes, sponsorships and performance reports for CEA partners.",
      },
    ],
  }),
  component: PartnerPortal,
});

const referrals = [
  {
    name: "Kaduna State ICT",
    program: "Public sector cohort",
    stage: "Signed",
    value: "₦18.4m",
    tone: "bg-success/10 text-success",
  },
  {
    name: "Greenfield Schools",
    program: "Student dev academy",
    stage: "Negotiating",
    value: "₦9.2m",
    tone: "bg-warning/10 text-warning",
  },
  {
    name: "Arewa Microfinance",
    program: "Cybersecurity training",
    stage: "Proposal",
    value: "₦6.8m",
    tone: "bg-primary/10 text-primary",
  },
];

function PartnerPortal() {
  return (
    <AppShell
      roleKey="employer"
      title="Partner portal"
      subtitle="Sabin Holdings · Education & public sector partner"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Gold partner · 2026
          </Badge>
          <Button asChild variant="outline" size="sm" className="ml-auto">
            <Link to="/partners">Partner programme</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Pipeline value",
            value: "₦34.4m",
            delta: "3 active deals",
            icon: Handshake,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Referrals sent",
            value: "12",
            delta: "6 converted",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Co-branded learners",
            value: "214",
            delta: "+38 this term",
            icon: Building2,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Commission earned",
            value: "₦3.1m",
            delta: "paid quarterly",
            icon: TrendingUp,
            tone: "bg-career/10 text-career",
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Handshake className="text-primary size-4" /> Active partnerships
            </CardTitle>
            <Badge variant="secondary" className="font-semibold">
              3 in play
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {referrals.map((r) => (
              <div key={r.name} className="rounded-xl border p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold">{r.name}</p>
                    <p className="text-muted-foreground text-xs">{r.program}</p>
                  </div>
                  <Badge className={cn("border-0 font-semibold", r.tone)}>{r.stage}</Badge>
                </div>
                <div className="text-muted-foreground mt-3 flex items-center justify-between border-t pt-3 text-xs font-semibold">
                  <span>Contract value</span>
                  <span className="font-display text-foreground text-sm font-extrabold">
                    {r.value}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <BadgePercent className="text-primary size-4" /> Referral programme
              </CardTitle>
              <Badge className="bg-career/10 text-career border-0 font-semibold">
                10% commission
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  t: "Refer an organisation",
                  d: "Send a warm intro via the partner link — 5 minutes.",
                },
                { t: "We run the process", d: "CEA handles the pitch, pilot and contracting." },
                { t: "You earn quarterly", d: "10% of first-year contract value, paid quarterly." },
              ].map((s, i) => (
                <div key={s.t} className="flex items-start gap-3 rounded-xl border p-3.5">
                  <span className="text-gradient font-display text-lg font-extrabold">{i + 1}</span>
                  <div>
                    <p className="text-sm font-bold">{s.t}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs">{s.d}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Megaphone className="text-primary size-4" /> Co-branding
              </CardTitle>
              <Badge variant="secondary" className="font-semibold">
                New
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Put your name on a CEA cohort. Certificates, campus signage and employer spotlights
                carry your brand.
              </p>
              <Button asChild variant="outline" size="sm" className="mt-4">
                <Link to="/partners">
                  See packages <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <p className="text-ink-foreground/60 text-xs font-bold tracking-[0.16em] uppercase">
                Partner report
              </p>
              <p className="font-display mt-2 text-lg font-extrabold">Q2 2026 is your best yet</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                214 learners trained under co-branded programmes, 87% completion, 71% placement.
              </p>
              <Button asChild size="sm" className="bg-gradient-brand shadow-glow mt-4 border-0">
                <Link to="/portal/executive">
                  Executive reports <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
