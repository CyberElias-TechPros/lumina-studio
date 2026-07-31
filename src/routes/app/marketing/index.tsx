import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Funnel, Mail, Megaphone, Search, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/marketing/")({
  head: () => ({
    meta: [
      { title: "Marketing Hub — CEA-OS" },
      { name: "description", content: "Campaigns, leads, content and analytics." },
    ],
  }),
  component: MarketingHub,
});

const screens = [
  {
    icon: Megaphone,
    label: "Campaigns",
    desc: "Multi-channel, ROI",
    path: "/app/marketing/campaigns",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: Mail,
    label: "Email",
    desc: "Campaigns, lists, opens",
    path: "/app/marketing/email",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: Funnel,
    label: "Leads",
    desc: "Score and route",
    path: "/app/marketing/leads",
    tone: "bg-success/10 text-success",
  },
  {
    icon: Search,
    label: "SEO",
    desc: "Keywords, rank tracking",
    path: "/app/marketing/seo",
    tone: "bg-warning/10 text-warning",
  },
  {
    icon: Users,
    label: "Social",
    desc: "Scheduler, posts",
    path: "/app/marketing/social",
    tone: "bg-career/10 text-career",
  },
];

function MarketingHub() {
  return (
    <AppShell
      roleKey="instructor"
      title="Marketing hub"
      subtitle="Q3 · ₦1.4m spend · CAC ₦96k · ROAS 4.2x"
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">
            ROAS below target
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/marketing">
              <ArrowLeft className="size-4" /> Marketing portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Leads (MTD)",
            value: "412",
            delta: "+11% MoM",
            icon: Funnel,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "CAC",
            value: "₦96k",
            delta: "target ₦90k",
            icon: Users,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "ROAS",
            value: "4.2x",
            delta: "target 5x",
            icon: Megaphone,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Spend (MTD)",
            value: "₦1.4m",
            delta: "on budget",
            icon: Mail,
            tone: "bg-success/10 text-success",
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
            <Megaphone className="text-primary size-4" /> Workspace
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
