import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Filter, Flame, PhoneCall, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/marketing/leads")({
  head: () => ({
    meta: [
      { title: "Leads — CEA-OS" },
      { name: "description", content: "Score, route and nurture leads." },
    ],
  }),
  component: MarketingLeads,
});

const leads = [
  {
    n: "Tola Bakare",
    s: "92 — hot",
    d: "Referred · contacted",
    tone: "bg-success/10 text-success",
  },
  {
    n: "Musa Danjuma",
    s: "78 — warm",
    d: "Web form · follow up",
    tone: "bg-primary/10 text-primary",
  },
  { n: "Ngozi Eze", s: "55 — cool", d: "Event lead", tone: "bg-warning/10 text-warning" },
];

function MarketingLeads() {
  return (
    <AppShell
      roleKey="instructor"
      title="Lead management"
      subtitle="412 leads · 96 hot · routing to admissions"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Auto-routing on
          </Badge>
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
            label: "Total",
            value: "412",
            delta: "+11% MoM",
            icon: UserRound,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Hot (90+)",
            value: "96",
            delta: "routed to admissions",
            icon: Flame,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Warm (70–89)",
            value: "148",
            delta: "nurture sequence",
            icon: PhoneCall,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Cool (<70)",
            value: "168",
            delta: "newsletter only",
            icon: Filter,
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
            <Flame className="text-primary size-4" /> Top leads
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {leads.map((l) => (
            <div key={l.n} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{l.n}</p>
                <p className="text-muted-foreground text-xs">{l.d}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", l.tone)}>{l.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Open
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
