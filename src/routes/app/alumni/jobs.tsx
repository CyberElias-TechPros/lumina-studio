import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BriefcaseBusiness, ExternalLink, Send, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/alumni/jobs")({
  head: () => ({
    meta: [
      { title: "Alumni Job Board — CEA-OS" },
      { name: "description", content: "Browse jobs and refer fellow alumni." },
    ],
  }),
  component: AlumniJobs,
});

const jobs = [
  {
    t: "Senior Backend Engineer",
    c: "Paystack",
    s: "Lagos · Hybrid",
    y: "2–5 yrs exp",
    via: "Employer post",
  },
  {
    t: "Product Designer",
    c: "Flutterwave",
    s: "Lagos · Remote",
    y: "Mid-level",
    via: "Alumni referral",
  },
  { t: "DevOps Engineer", c: "Andela", s: "Remote", y: "3+ yrs exp", via: "Alumni referral" },
  { t: "Data Analyst", c: "Kuda", s: "Lagos · Hybrid", y: "Entry-friendly", via: "Employer post" },
];

function AlumniJobs() {
  return (
    <AppShell
      roleKey="instructor"
      title="Alumni job board"
      subtitle="64 roles · 18 posted this week"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            4 referrals made
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/alumni/hub">
              <ArrowLeft className="size-4" /> Alumni hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Open roles",
            value: "64",
            delta: "+18 this week",
            icon: BriefcaseBusiness,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Referral bonus",
            value: "₦100k",
            delta: "per successful hire",
            icon: Send,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "My referrals",
            value: "4",
            delta: "2 hired",
            icon: Users,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Alumni-only roles",
            value: "12",
            delta: "exclusive access",
            icon: ExternalLink,
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
            <BriefcaseBusiness className="text-primary size-4" /> Featured roles
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {jobs.map((j) => (
            <div key={j.t} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                <BriefcaseBusiness className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{j.t}</p>
                <p className="text-muted-foreground text-xs">
                  {j.c} · {j.s} · {j.y}
                </p>
              </div>
              <Badge
                className={cn(
                  "border-0 font-semibold",
                  j.via === "Alumni referral"
                    ? "bg-warning/10 text-warning"
                    : "bg-primary/10 text-primary",
                )}
              >
                {j.via}
              </Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Refer
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
