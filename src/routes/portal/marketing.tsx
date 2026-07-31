import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  ChartNoAxesColumn,
  FileText,
  LayoutTemplate,
  Lightbulb,
  Mail,
  Megaphone,
  MessageSquare,
  MousePointerClick,
  Search,
  Send,
  Share2,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/marketing")({
  head: () => ({
    meta: [
      { title: "Marketing — CEA-OS" },
      {
        name: "description",
        content: "Marketing: campaigns, leads, content calendar and channel performance.",
      },
    ],
  }),
  component: MarketingPortal,
});

const campaigns = [
  {
    name: "Apply Aug 2026 cohort",
    channel: "Meta + Google",
    leads: 148,
    conv: "6.2%",
    status: "Live",
    tone: "bg-success/10 text-success",
  },
  {
    name: "Scholarship giveaway",
    channel: "Instagram",
    leads: 92,
    conv: "4.8%",
    status: "Live",
    tone: "bg-success/10 text-success",
  },
  {
    name: "Alumni stories series",
    channel: "LinkedIn",
    leads: 41,
    conv: "3.1%",
    status: "Scheduled",
    tone: "bg-primary/10 text-primary",
  },
];

const calendar = [
  {
    t: "Cohort apply deadline push",
    d: "Aug 7",
    status: "Planned",
    tone: "bg-primary/10 text-primary",
  },
  { t: "Open day recap reels", d: "Aug 12", status: "Planned", tone: "bg-primary/10 text-primary" },
  {
    t: "Employer partner spotlight",
    d: "Aug 18",
    status: "Draft",
    tone: "bg-warning/10 text-warning",
  },
];

const screens = [
  {
    icon: LayoutTemplate,
    label: "Hub",
    desc: "Marketing overview",
    path: "/app/marketing",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: Megaphone,
    label: "Campaigns",
    desc: "Paid and organic campaigns",
    path: "/app/marketing/campaigns",
    tone: "bg-success/10 text-success",
  },
  {
    icon: CalendarDays,
    label: "Content calendar",
    desc: "Plan content and posts",
    path: "/app/marketing/content-calendar",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: Mail,
    label: "Email",
    desc: "Newsletters and sequences",
    path: "/app/marketing/email",
    tone: "bg-warning/10 text-warning",
  },
  {
    icon: LayoutTemplate,
    label: "Landing pages",
    desc: "Build and test pages",
    path: "/app/marketing/landing-pages",
    tone: "bg-career/10 text-career",
  },
  {
    icon: Users,
    label: "Leads",
    desc: "Lead capture and follow-up",
    path: "/app/marketing/leads",
    tone: "bg-community/10 text-community",
  },
  {
    icon: Search,
    label: "SEO",
    desc: "Keywords and rankings",
    path: "/app/marketing/seo",
    tone: "bg-erp/10 text-erp",
  },
  {
    icon: Share2,
    label: "Social",
    desc: "Channels and scheduling",
    path: "/app/marketing/social",
    tone: "bg-services/10 text-services",
  },
  {
    icon: ChartNoAxesColumn,
    label: "Analytics",
    desc: "Funnel performance",
    path: "/app/marketing/analytics",
    tone: "bg-ink/10 text-ink",
  },
  {
    icon: FileText,
    label: "Reports",
    desc: "Marketing reports",
    path: "/app/marketing/reports",
    tone: "bg-error/10 text-error",
  },
];

function MarketingPortal() {
  return (
    <AppShell
      roleKey="instructor"
      title="Marketing"
      subtitle="Campaigns, leads and content · Aug 2026 intake"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Spend on track
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            ₦1.8m / ₦4.2m Q3
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Leads this month",
            value: "412",
            delta: "+18% MoM",
            icon: MousePointerClick,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Applications",
            value: "96",
            delta: "avg 4.1% conv",
            icon: Send,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Content pieces",
            value: "23",
            delta: "5 scheduled",
            icon: Megaphone,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Engagement",
            value: "7.8%",
            delta: "top: reels",
            icon: BarChart3,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <TrendingUp className="text-primary size-4" /> Campaigns
            </CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-primary font-semibold">
              <Link to="/apply">
                Apply funnel <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="divide-y">
            {campaigns.map((c) => (
              <div
                key={c.name}
                className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                  <Lightbulb className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{c.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {c.channel} · {c.leads} leads · {c.conv} conv
                  </p>
                </div>
                <Badge className={cn("border-0 font-semibold", c.tone)}>{c.status}</Badge>
                <Button variant="outline" size="sm" className="shrink-0">
                  Details
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <CalendarDays className="text-primary size-4" /> Content calendar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {calendar.map((c) => (
                <div
                  key={c.t}
                  className="flex items-center justify-between gap-2 rounded-xl border p-3"
                >
                  <div>
                    <p className="text-sm font-semibold">{c.t}</p>
                    <p className="text-muted-foreground text-xs">{c.d}</p>
                  </div>
                  <Badge className={cn("border-0 font-semibold", c.tone)}>{c.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <MessageSquare className="text-primary size-4" /> Inbox & social
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { t: "DM responses pending", v: "14", tone: "bg-primary/10 text-primary" },
                { t: "Story replies to reply", v: "8", tone: "bg-learning/10 text-learning" },
                { t: "WhatsApp leads unread", v: "3", tone: "bg-warning/10 text-warning" },
              ].map((x) => (
                <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.t}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <BarChart3 className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Cohort projection</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                On current pacing, the Aug intake closes at ~115% of target seats.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <LayoutTemplate className="text-primary size-4" /> Workspace
          </CardTitle>
          <Badge variant="secondary" className="font-semibold">
            {screens.length} modules
          </Badge>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
