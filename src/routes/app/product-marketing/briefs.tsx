import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ClipboardList, FileCheck, FileText, PenTool, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/product-marketing/briefs")({
  head: () => ({
    meta: [
      { title: "Campaign Briefs — CEA-OS" },
      {
        name: "description",
        content: "Brief templates with objectives, audiences and success metrics.",
      },
    ],
  }),
  component: CampaignBriefs,
});

const briefs = [
  {
    t: "Parent app beta launch",
    objective: "1,000 waitlist signups in 3 weeks",
    audience: "Diaspora parents 35-55",
    channels: "Meta + LinkedIn + Email",
    metric: "Waitlist CVR ≥ 12%",
    status: "Approved",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Talent pass employer outreach",
    objective: "20 new employer signups this quarter",
    audience: "HR leaders · Lagos tech",
    channels: "LinkedIn + Events",
    metric: "Demo requests ≥ 40",
    status: "In review",
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "Data & AI track teaser",
    objective: "Pre-launch awareness for Oct track",
    audience: "Working adults 22-35",
    channels: "TikTok + YouTube + SMS",
    metric: "CTR ≥ 3.5%",
    status: "Draft",
    tone: "bg-muted-foreground/10 text-muted-foreground",
  },
  {
    t: "Open day · Lekki campus",
    objective: "350 attendees, 120 applications",
    audience: "Prospects · Lagos",
    channels: "Instagram + Radio",
    metric: "Apply rate ≥ 30%",
    status: "Approved",
    tone: "bg-success/10 text-success",
  },
];

function CampaignBriefs() {
  return (
    <AppShell
      roleKey="product-marketing"
      title="Campaign briefs"
      subtitle="12 briefs this quarter · 5 live · budget ₦18.4m"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">5 live</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/product-marketing">
              <ArrowLeft className="size-4" /> PM hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Briefs (Q3)",
            value: "12",
            delta: "5 live",
            icon: FileText,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "In review",
            value: "3",
            delta: "2 owner follow-ups",
            icon: ClipboardList,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Approved",
            value: "7",
            delta: "of 12 total",
            icon: FileCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Budget allocated",
            value: "₦18.4m",
            delta: "74% spent",
            icon: Send,
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

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {briefs.map((b) => (
          <Card key={b.t} className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <PenTool className="text-primary size-4" /> {b.t}
              </CardTitle>
              <Badge className={cn("border-0 font-semibold", b.tone)}>{b.status}</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { l: "Objective", v: b.objective },
                { l: "Audience", v: b.audience },
                { l: "Channels", v: b.channels },
                { l: "Success metric", v: b.metric },
              ].map((f) => (
                <div key={f.l} className="rounded-xl border p-3">
                  <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                    {f.l}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold">{f.v}</p>
                </div>
              ))}
              <div className="flex items-center justify-between pt-1 text-xs font-semibold">
                <span className="text-muted-foreground">Budget burn</span>
                <span>74%</span>
              </div>
              <Progress value={74} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
