import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, DollarSign, GraduationCap, HandCoins, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/ngo/scholarships")({
  head: () => ({
    meta: [
      { title: "Scholarships — CEA-OS" },
      { name: "description", content: "Funds, selection and disbursement." },
    ],
  }),
  component: NgoScholarships,
});

const scholarships = [
  {
    s: "Girls in Tech · Cohort 16",
    v: "18 scholars · ₦1.2m in tuition",
    st: "Active",
    tone: "bg-success/10 text-success",
  },
  {
    s: "Merit scholar pool",
    v: "12 scholars · ₦840k in tuition",
    st: "Active",
    tone: "bg-success/10 text-success",
  },
  {
    s: "Refugee STEM fund",
    v: "8 applicants · selection in progress",
    st: "Selecting",
    tone: "bg-warning/10 text-warning",
  },
];

function NgoScholarships() {
  return (
    <AppShell
      roleKey="instructor"
      title="Scholarships"
      subtitle="3 funds · 38 scholars this year · ₦12.4m committed"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">₦12.4m</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/ngo">
              <ArrowLeft className="size-4" /> Partnership hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Scholars",
            value: "38",
            delta: "2026 cohort",
            icon: GraduationCap,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Committed",
            value: "₦12.4m",
            delta: "this year",
            icon: DollarSign,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Applicants",
            value: "212",
            delta: "2027 cycle",
            icon: Users,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Disbursed",
            value: "94%",
            delta: "of committed",
            icon: CheckCircle2,
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
            <HandCoins className="text-primary size-4" /> Funds
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {scholarships.map((s) => (
            <div key={s.s} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{s.s}</p>
                <p className="text-muted-foreground text-xs">{s.v}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", s.tone)}>{s.st}</Badge>
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
