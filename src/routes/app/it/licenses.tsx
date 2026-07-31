import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, AlertTriangle, CalendarClock, KeyRound, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/it/licenses")({
  head: () => ({
    meta: [
      { title: "Licenses — CEA-OS" },
      { name: "description", content: "Software license management." },
    ],
  }),
  component: ItLicenses,
});

const licenses = [
  {
    l: "Adobe Creative Cloud",
    s: "24 seats · 20 used",
    e: "Renews Oct 2026",
    tone: "bg-primary/10 text-primary",
  },
  {
    l: "Microsoft 365",
    s: "120 seats · 96 used",
    e: "Renews Jan 2027",
    tone: "bg-success/10 text-success",
  },
  {
    l: "Figma Pro",
    s: "30 seats · 18 used",
    e: "Renews Sep 2026",
    tone: "bg-warning/10 text-warning",
  },
];

function ItLicenses() {
  return (
    <AppShell
      roleKey="instructor"
      title="Software licenses"
      subtitle="14 products · ₦4.2m/yr · 82% utilization"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">On budget</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/it-support">
              <ArrowLeft className="size-4" /> IT Support portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Products",
            value: "14",
            delta: "2 free tier",
            icon: ShieldCheck,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Seats used",
            value: "82%",
            delta: "of 412",
            icon: KeyRound,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Renewals (90d)",
            value: "3",
            delta: "next Sep 2026",
            icon: CalendarClock,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Compliance",
            value: "100%",
            delta: "no pirated use",
            icon: AlertTriangle,
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
            <KeyRound className="text-primary size-4" /> Key products
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {licenses.map((l) => (
            <div key={l.l} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{l.l}</p>
                <p className="text-muted-foreground text-xs">{l.s}</p>
              </div>
              <Badge variant="secondary" className="font-semibold">
                {l.e}
              </Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Manage
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
