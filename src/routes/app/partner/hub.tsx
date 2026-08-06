import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Handshake, Megaphone, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import {
  usePtnAgreementItems,
  usePtnCollaborationItems,
  usePtnReferralItems,
  usePtnReportItems,
} from "@/lib/query/supplierPartner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/partner/hub")({
  head: () => ({
    meta: [
      { title: "Partner Hub — CEA-OS" },
      {
        name: "description",
        content: "Agreements, collaborations, referrals and reports for partners.",
      },
    ],
  }),
  component: PartnerHub,
});

const actions = [
  {
    icon: Handshake,
    label: "Agreements",
    desc: "MOUs, contracts, terms",
    path: "/app/partner/agreements",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: Megaphone,
    label: "Collaborations",
    desc: "Co-branded events & programs",
    path: "/app/partner/collaborations",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: TrendingUp,
    label: "Referrals",
    desc: "Track referrals & payouts",
    path: "/app/partner/referrals",
    tone: "bg-success/10 text-success",
  },
  {
    icon: Users,
    label: "Resources & reports",
    desc: "Brand kit, impact, revenue share",
    path: "/app/partner/reports",
    tone: "bg-warning/10 text-warning",
  },
];

function PartnerHub() {
  const referrals = usePtnReferralItems();
  const collaborations = usePtnCollaborationItems();
  const agreements = usePtnAgreementItems();
  const reports = usePtnReportItems();

  const enrolled = referrals.filter((r) => r.status === "Enrolled").length;
  const upcoming = collaborations.filter((c) => c.status === "scheduled").length;
  const activeAgreements = agreements.filter((a) => a.status === "active");
  const renewal = agreements.find((a) => a.renewLabel);
  const revenueShare = reports.find((r) => r.kind === "revenue-share")?.valueLabel ?? "—";

  return (
    <AppShell
      roleKey="student"
      title="Partnership hub"
      subtitle="TechHub Ltd · partner since 2025 · Q3 2026"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {agreements.length > 0
              ? `${activeAgreements.length} active agreement${activeAgreements.length === 1 ? "" : "s"}`
              : "—"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/partner">
              <ArrowLeft className="size-4" /> Partner portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Referrals sent",
            value: referrals.length > 0 ? String(referrals.length) : "—",
            delta: `${enrolled} enrolled`,
            icon: TrendingUp,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Revenue share",
            value: revenueShare,
            delta: "Q3 to date",
            icon: Handshake,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Co-branded events",
            value: collaborations.length > 0 ? String(collaborations.length) : "—",
            delta: `${upcoming} upcoming`,
            icon: Megaphone,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Agreement status",
            value: activeAgreements.length > 0 ? "Live" : "—",
            delta: renewal?.renewLabel ?? "no renewals",
            icon: Users,
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
            <Handshake className="text-primary size-4" /> Workspace
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {actions.map((a) => (
            <Link
              key={a.path}
              to={a.path}
              className="group bg-card shadow-soft hover:shadow-elevated flex flex-col rounded-xl border p-4 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <span className={cn("grid size-9 place-items-center rounded-lg", a.tone)}>
                  <a.icon className="size-4" />
                </span>
                <ArrowRight className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
              </div>
              <p className="font-display mt-3 text-sm font-extrabold">{a.label}</p>
              <p className="text-muted-foreground mt-1 text-xs">{a.desc}</p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
