import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CircleDot, GitBranch, ListChecks, Split, Workflow } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/design/flows")({
  head: () => ({
    meta: [
      { title: "User Flow Diagrammer — CEA-OS" },
      { name: "description", content: "User flow cards with step lists and decision points." },
    ],
  }),
  component: UserFlows,
});

const flows = [
  {
    t: "Enrolment flow",
    steps: 7,
    decisions: 2,
    status: "Mapped",
    tone: "bg-success/10 text-success",
    list: [
      "Landing",
      "Course pick",
      "Payment",
      "Parent consent",
      "Onboarding",
      "First lesson",
      "Streak set",
    ],
  },
  {
    t: "Job application flow",
    steps: 5,
    decisions: 1,
    status: "In review",
    tone: "bg-warning/10 text-warning",
    list: ["Job search", "Profile check", "Apply", "Skills test", "Interview booking"],
  },
  {
    t: "Referral claim flow",
    steps: 4,
    decisions: 1,
    status: "Draft",
    tone: "bg-primary/10 text-primary",
    list: ["Invite link", "Signup", "First lesson", "Reward claim"],
  },
];

function UserFlows() {
  return (
    <AppShell
      roleKey="design"
      title="User flow diagrammer"
      subtitle="14 flows mapped · 3 updated this week · a11y check on"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">AA verified</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/design">
              <ArrowLeft className="size-4" /> Design hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Flows",
            value: "14",
            delta: "9 shipped",
            icon: Workflow,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Total steps",
            value: "83",
            delta: "avg 5.9 per flow",
            icon: CircleDot,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Decision points",
            value: "21",
            delta: "4 critical",
            icon: Split,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Steps tested",
            value: "58",
            delta: "70% coverage",
            icon: ListChecks,
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

      <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {flows.map((f) => (
          <Card key={f.t} className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <GitBranch className="text-primary size-4" /> {f.t}
              </CardTitle>
              <Badge className={cn("border-0 font-semibold", f.tone)}>{f.status}</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold">
                <span className="text-muted-foreground">{f.steps} steps</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-warning">{f.decisions} decision points</span>
              </div>
              <div className="space-y-1.5">
                {f.list.map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <span className="bg-muted text-muted-foreground grid size-5 shrink-0 place-items-center rounded-md text-[10px] font-extrabold">
                      {i + 1}
                    </span>
                    <span className="text-xs font-semibold">{s}</span>
                    {i < f.list.length - 1 && (
                      <span className="text-muted-foreground/50 text-[10px]">→</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
