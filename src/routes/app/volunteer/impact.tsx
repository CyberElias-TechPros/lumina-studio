import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, HeartHandshake, Sprout, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/volunteer/impact")({
  head: () => ({
    meta: [
      { title: "Impact Dashboard — CEA-OS" },
      { name: "description", content: "The difference your volunteering makes." },
    ],
  }),
  component: VolunteerImpact,
});

const impacts = [
  { i: "Learners mentored", v: "14", d: "across 3 cohorts", tone: "bg-primary/10 text-primary" },
  { i: "Outreach events", v: "6", d: "640 people reached", tone: "bg-learning/10 text-learning" },
  { i: "Hours served", v: "47", d: "estimated ₦2.3m value", tone: "bg-success/10 text-success" },
  { i: "Communities", v: "2", d: "Ikeja + Abeokuta", tone: "bg-warning/10 text-warning" },
];

function VolunteerImpact() {
  return (
    <AppShell
      roleKey="student"
      title="Impact dashboard"
      subtitle="Your contribution · 2026"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Top 10% volunteer
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/volunteer">
              <ArrowLeft className="size-4" /> Volunteer portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {impacts.map((k) => (
          <Card key={k.i} className="bg-card shadow-soft border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                  {k.i}
                </p>
                <span className={cn("grid size-8 place-items-center rounded-lg", k.tone)}>
                  <HeartHandshake className="size-4" />
                </span>
              </div>
              <p className="font-display mt-3 text-2xl font-extrabold">{k.v}</p>
              <p className="text-muted-foreground mt-0.5 text-xs font-semibold">{k.d}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Sprout className="text-primary size-4" /> Hours by month
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { m: "July", pct: 34 },
              { m: "June", pct: 42 },
              { m: "May", pct: 12 },
              { m: "April", pct: 8 },
            ].map((x) => (
              <div key={x.m}>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>{x.m}</span>
                  <span>{x.pct}% of year</span>
                </div>
                <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
                  <div
                    className="bg-gradient-brand h-full rounded-full"
                    style={{ width: `${x.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
          <CardContent className="p-6">
            <Users className="text-success size-5" />
            <p className="font-display mt-3 text-base font-extrabold">Your ripple</p>
            <p className="text-ink-foreground/70 mt-1 text-sm">
              14 mentored learners, 6 outreach events, and an estimated ₦2.3m of value given back to
              the community this year. Keep going — the 60h appreciation tier is 13h away.
            </p>
            <Button
              asChild
              size="sm"
              className="bg-gradient-brand shadow-glow mt-4 border-0 font-semibold"
            >
              <Link to="/app/volunteer/opportunities">
                Find next event <TrendingUp className="ml-1 size-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
