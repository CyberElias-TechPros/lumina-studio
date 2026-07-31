import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Briefcase,
  CalendarDays,
  Heart,
  Mail,
  ScanFace,
  UserCheck,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/hr")({
  head: () => ({
    meta: [
      { title: "People & HR — CEA-OS" },
      {
        name: "description",
        content: "People operations: onboarding, attendance, leave, performance and culture.",
      },
    ],
  }),
  component: HrPortal,
});

const onboarding = [
  { name: "Chidinma Eze", role: "Product Designer", progress: 4, steps: 6 },
  { name: "Samuel Adebayo", role: "Ops Intern", progress: 6, steps: 6 },
  { name: "Ngozi Umeh", role: "Mentor", progress: 2, steps: 6 },
];

const leaves = [
  {
    name: "Emeka Obi",
    type: "Annual · 5 days",
    when: "Aug 10–14",
    status: "Approved",
    tone: "bg-success/10 text-success",
  },
  {
    name: "Aisha Bello",
    type: "Sick · 2 days",
    when: "Aug 3–4",
    status: "Approved",
    tone: "bg-success/10 text-success",
  },
  {
    name: "Dapo Olu",
    type: "Study · 3 days",
    when: "Aug 17–19",
    status: "Pending",
    tone: "bg-warning/10 text-warning",
  },
];

function HrPortal() {
  return (
    <AppShell
      roleKey="instructor"
      title="People & HR"
      subtitle="Onboarding, attendance, leave and culture · 41 team members"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Attendance 96%
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            41 staff · 12 interns
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Open roles",
            value: "5",
            delta: "2 in review",
            icon: Briefcase,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Onboarding",
            value: "3",
            delta: "1 completes today",
            icon: UserCheck,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Leave requests",
            value: "7",
            delta: "2 pending",
            icon: CalendarDays,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "eNPS",
            value: "72",
            delta: "+4 this quarter",
            icon: Heart,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <UserCheck className="text-primary size-4" /> Onboarding · this week
            </CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-primary font-semibold">
              <Link to="/careers">
                Careers page <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {onboarding.map((o) => (
              <div key={o.name} className="rounded-xl border p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="bg-gradient-brand text-white font-display grid size-10 shrink-0 place-items-center rounded-full text-xs font-bold">
                      {o.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <div>
                      <p className="text-sm font-bold">{o.name}</p>
                      <p className="text-muted-foreground text-xs">{o.role}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="font-semibold">
                    Step {o.progress} of {o.steps}
                  </Badge>
                </div>
                <div className="bg-muted mt-3 h-1.5 overflow-hidden rounded-full">
                  <div
                    className="bg-gradient-brand h-full rounded-full"
                    style={{ width: `${(o.progress / o.steps) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <CalendarDays className="text-primary size-4" /> Leave calendar
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y">
              {leaves.map((l) => (
                <div
                  key={l.name}
                  className="flex flex-wrap items-center justify-between gap-2 py-3 first:pt-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-bold">{l.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {l.type} · {l.when}
                    </p>
                  </div>
                  <Badge className={cn("border-0 font-semibold", l.tone)}>{l.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Award className="text-primary size-4" /> Culture pulse
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { t: "Recognition given", v: "14 shoutouts", tone: "bg-success/10 text-success" },
                { t: "One-on-ones due", v: "3 of 41", tone: "bg-primary/10 text-primary" },
                { t: "ID cards pending", v: "2 prints", tone: "bg-warning/10 text-warning" },
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
              <ScanFace className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Biometric check</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Attendance sync 96% this month. 2 devices flagged for firmware update.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
