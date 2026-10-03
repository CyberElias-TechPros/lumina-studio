"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, ArrowRight, Clock3, HandHeart, HeartHandshake, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import {
  useVolHourItems,
  useVolMetricItems,
  useVolOpportunityItems,
} from "@/lib/query/volunteerReceptionist";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/volunteer/")({
  head: () => ({
    meta: [
      { title: "Volunteer Hub — CEA-OS" },
      { name: "description", content: "Opportunities, hours, impact and certificates." },
    ],
  }),
  component: VolunteerHub,
});

const screens = [
  {
    icon: HeartHandshake,
    label: "Opportunities",
    desc: "Open roles to join",
    path: "/app/volunteer/opportunities",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: Users,
    label: "My Volunteering",
    desc: "Active commitments",
    path: "/app/volunteer/my-volunteering",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: Clock3,
    label: "Hours Tracker",
    desc: "Log and review hours",
    path: "/app/volunteer/hours",
    tone: "bg-success/10 text-success",
  },
  {
    icon: HandHeart,
    label: "Impact",
    desc: "Community outcomes",
    path: "/app/volunteer/impact",
    tone: "bg-warning/10 text-warning",
  },
];

function VolunteerHub() {
  const hours = useVolHourItems();
  const metrics = useVolMetricItems();
  const opportunities = useVolOpportunityItems();

  const logged = hours.reduce((n, h) => n + h.hours, 0);
  const openRoles = opportunities.filter((o) => o.slotsFilled < o.slotsTotal).length;
  const impact =
    metrics.find(
      (m) => m.metric.toLowerCase().includes("serve") || m.metric.toLowerCase().includes("impact"),
    )?.valueLabel ?? (metrics.length > 0 ? metrics[0].valueLabel : "—");

  return (
    <AppShell
      roleKey="volunteer"
      title="Volunteer hub"
      subtitle="Give time that compounds"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {openRoles > 0 ? `${openRoles} open roles` : "No open roles"}
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
        {[
          {
            label: "Hours logged",
            value: hours.length > 0 ? String(Math.round(logged)) : "—",
            delta: "this month",
            icon: Clock3,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Open roles",
            value: opportunities.length > 0 ? String(openRoles) : "—",
            delta: "across programs",
            icon: HeartHandshake,
            tone: "bg-success/10 text-success",
          },
          {
            label: "People served",
            value: impact,
            delta: "this month",
            icon: Users,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Certificates",
            value: "4",
            delta: "earned to date",
            icon: HandHeart,
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
        <CardContent className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-4">
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
