import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarClock,
  History,
  Landmark,
  MessageSquare,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/government/")({
  head: () => ({
    meta: [
      { title: "Compliance Portal — CEA-OS" },
      { name: "description", content: "Secure government access to CEA compliance data." },
    ],
  }),
  component: GovernmentHub,
});

const screens = [
  {
    icon: Building2,
    label: "Institutional data",
    desc: "Profile, enrolment, finances",
    path: "/app/government/institution",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: ScrollText,
    label: "Regulatory reports",
    desc: "Filings-ready exports",
    path: "/app/government/reports",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: ShieldCheck,
    label: "Documentation library",
    desc: "Policies, certificates",
    path: "/app/government/documents",
    tone: "bg-success/10 text-success",
  },
  {
    icon: CalendarClock,
    label: "Audit module",
    desc: "Schedule, findings",
    path: "/app/government/audit",
    tone: "bg-warning/10 text-warning",
  },
  {
    icon: History,
    label: "Filings & timeline",
    desc: "Submissions history",
    path: "/app/government/filings",
    tone: "bg-career/10 text-career",
  },
  {
    icon: MessageSquare,
    label: "Messaging",
    desc: "Secure comms with CEA",
    path: "/app/government/messaging",
    tone: "bg-services/10 text-services",
  },
];

function GovernmentHub() {
  return (
    <AppShell
      roleKey="admin"
      title="Compliance portal"
      subtitle="Federal Ministry of Education · read-only access · IP-whitelisted"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Accredited</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/government">
              <ArrowLeft className="size-4" /> Government portal
            </Link>
          </Button>
        </>
      }
    >
      <Card className="bg-gradient-ink shadow-soft border-0 text-white">
        <CardContent className="flex flex-wrap items-center gap-4 p-5">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10">
            <Landmark className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-extrabold">
              Accreditation status — Cyber Elias Academy
            </p>
            <p className="mt-0.5 text-xs text-white/70">
              Full accreditation · score 92/100 · next review Feb 2027 · all compliance obligations
              current
            </p>
          </div>
          <Badge className="border-0 bg-white/10 font-semibold text-white">Valid</Badge>
        </CardContent>
      </Card>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Compliance score",
            value: "92",
            delta: "of 100",
            icon: ShieldCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Open findings",
            value: "1",
            delta: "low priority",
            icon: CalendarClock,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Filings (year)",
            value: "14",
            delta: "0 overdue",
            icon: History,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Next review",
            value: "2027",
            delta: "Feb · on track",
            icon: Landmark,
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

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Landmark className="text-primary size-4" /> Compliance modules
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {screens.map((s) => (
            <Link
              key={s.path}
              to={s.path}
              className="group bg-card shadow-soft hover:shadow-elevated flex flex-col rounded-xl border p-4 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <span className={cn("grid size-9 place-items-center rounded-lg", s.tone)}>
                  <s.icon className="size-4" />
                </span>
                <ArrowRight className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
              </div>
              <p className="font-display mt-3 text-sm font-extrabold">{s.label}</p>
              <p className="text-muted-foreground mt-1 text-xs">{s.desc}</p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
