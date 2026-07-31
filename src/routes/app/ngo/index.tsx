import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, HandCoins, Heart, Megaphone, Users, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/ngo/")({
  head: () => ({
    meta: [
      { title: "Partnership Hub — CEA-OS" },
      { name: "description", content: "NGO partnership workspace with Cyber Elias Academy." },
    ],
  }),
  component: NgoHub,
});

const screens = [
  {
    icon: HandCoins,
    label: "Scholarships",
    desc: "Funds, selection",
    path: "/app/ngo/scholarships",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: Megaphone,
    label: "Community programs",
    desc: "Outreach, beneficiaries",
    path: "/app/ngo/programs",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: Users,
    label: "Volunteer coordination",
    desc: "Delivery teams",
    path: "/app/ngo/volunteers",
    tone: "bg-success/10 text-success",
  },
  {
    icon: Wallet,
    label: "Donations",
    desc: "Inbound & outbound",
    path: "/app/ngo/donations",
    tone: "bg-warning/10 text-warning",
  },
  {
    icon: Heart,
    label: "Impact reports",
    desc: "Outcomes, stories",
    path: "/app/ngo/reports",
    tone: "bg-career/10 text-career",
  },
];

function NgoHub() {
  return (
    <AppShell
      roleKey="instructor"
      title="Partnership hub"
      subtitle="Lift Africa Foundation · 3 active programs · 2026"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Active</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/ngo">
              <ArrowLeft className="size-4" /> NGO portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Scholarships funded",
            value: "38",
            delta: "₦12.4m disbursed",
            icon: HandCoins,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Programs",
            value: "3",
            delta: "2 ongoing",
            icon: Megaphone,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Volunteers",
            value: "86",
            delta: "14 active",
            icon: Users,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Impact (2026)",
            value: "1,240",
            delta: "beneficiaries",
            icon: Heart,
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
            <Heart className="text-primary size-4" /> Programs
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {screens.map((s) => (
            <Link
              key={s.path}
              to={s.path}
              className="group bg-card shadow-soft hover:shadow-elevated flex flex-col rounded-xl border p-4 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <span className={cn("grid size-9 place-items-center rounded-lg", s.tone)}>
                  <s.icon className="size-4" />
                </span>
                <ArrowRight className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
              </div>
              <p className="font-display mt-3 text-sm font-extrabold">{s.label}</p>
              <p className="text-muted-foreground mt-1 text-xs">{s.desc}</p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
