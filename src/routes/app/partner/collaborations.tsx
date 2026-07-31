import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Megaphone, Sparkles, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/partner/collaborations")({
  head: () => ({
    meta: [
      { title: "Collaborations — CEA-OS" },
      { name: "description", content: "Co-branded events, programs and campaigns." },
    ],
  }),
  component: PartnerCollaborations,
});

const collabs = [
  {
    c: "Tech Skills Bootcamp",
    d: "Aug 22 · Ikeja HQ",
    s: "Scheduled",
    tone: "bg-primary/10 text-primary",
  },
  {
    c: "Employer roundtable",
    d: "Sep 10 · VI campus",
    s: "Confirmed",
    tone: "bg-success/10 text-success",
  },
  {
    c: "Hackathon sponsorship",
    d: "Proposal with marketing",
    s: "In discussion",
    tone: "bg-warning/10 text-warning",
  },
];

function PartnerCollaborations() {
  return (
    <AppShell
      roleKey="student"
      title="Collaborations"
      subtitle="3 co-branded programs this quarter"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">2 confirmed</Badge>
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
            label: "This quarter",
            value: "3",
            delta: "2 confirmed",
            icon: CalendarDays,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Reach (est.)",
            value: "1,400",
            delta: "prospects + alumni",
            icon: Users,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Co-branded content",
            value: "6",
            delta: "assets shipped",
            icon: Megaphone,
            tone: "bg-success/10 text-success",
          },
          {
            label: "New leads (est.)",
            value: "85",
            delta: "attribution pending",
            icon: Sparkles,
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
            <Megaphone className="text-primary size-4" /> Co-branded programs
          </CardTitle>
          <Button variant="outline" size="sm" className="font-semibold">
            Propose event
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          {collabs.map((c) => (
            <div key={c.c} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{c.c}</p>
                <p className="text-muted-foreground text-xs">{c.d}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", c.tone)}>{c.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Details
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
