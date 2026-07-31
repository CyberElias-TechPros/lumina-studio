import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Mail, MailCheck, MailOpen, Send, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/marketing/email")({
  head: () => ({
    meta: [
      { title: "Email Marketing — CEA-OS" },
      { name: "description", content: "Campaigns, lists, opens and clicks." },
    ],
  }),
  component: MarketingEmail,
});

const campaigns = [
  {
    c: "Deadline reminder — Fall",
    l: "2,400",
    o: "68%",
    s: "Sent",
    tone: "bg-success/10 text-success",
  },
  { c: "Scholarship update", l: "1,900", o: "72%", s: "Sent", tone: "bg-primary/10 text-primary" },
  { c: "Cohort 16 welcome", l: "—", o: "—", s: "Draft", tone: "bg-warning/10 text-warning" },
];

function MarketingEmail() {
  return (
    <AppShell
      roleKey="instructor"
      title="Email marketing"
      subtitle="12k subscribers · 71% avg. open rate"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Deliverable</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/marketing">
              <ArrowLeft className="size-4" /> Marketing hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Subscribers",
            value: "12k",
            delta: "+8% this month",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Open rate",
            value: "71%",
            delta: "vs 45% bench",
            icon: MailOpen,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Click rate",
            value: "6.2%",
            delta: "vs 2.5% bench",
            icon: MailCheck,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Sent (30d)",
            value: "9",
            delta: "24k emails",
            icon: Send,
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
            <Mail className="text-primary size-4" /> Campaigns
          </CardTitle>
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            New email
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          {campaigns.map((c) => (
            <div key={c.c} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{c.c}</p>
                <p className="text-muted-foreground text-xs">
                  {c.l} recipients · {c.o} opened
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", c.tone)}>{c.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                View
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
