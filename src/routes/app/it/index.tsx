"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, ArrowRight, Boxes, Bug, GitBranch, Rocket, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { useItTickets, useItTicketItems } from "@/lib/query/it";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/it/")({
  head: () => ({
    meta: [
      { title: "IT Hub — CEA-OS" },
      { name: "description", content: "Tickets, assets, licenses and maintenance." },
    ],
  }),
  component: ItHub,
});

const screens = [
  {
    icon: Wrench,
    label: "Tickets",
    desc: "Support queue, SLAs",
    path: "/app/it/tickets",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: Boxes,
    label: "Assets",
    desc: "Devices, inventory",
    path: "/app/it/assets",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: GitBranch,
    label: "Remote Support",
    desc: "Sessions, handoff",
    path: "/app/it/remote-support",
    tone: "bg-success/10 text-success",
  },
  {
    icon: Bug,
    label: "Monitoring",
    desc: "Systems health",
    path: "/app/it/monitoring",
    tone: "bg-warning/10 text-warning",
  },
];

function ItHub() {
  const tickets = useItTicketItems();

  const open = tickets.filter((t) => t.status !== "solved").length;
  const high = tickets.filter((t) => t.priority === "P1" && t.status !== "solved").length;

  return (
    <AppShell
      roleKey="it"
      title="IT hub"
      subtitle="Support, assets and systems"
      actions={
        <>
          <Badge
            className={cn(
              "border-0 font-semibold",
              high > 0 ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success",
            )}
          >
            {high > 0 ? `${high} high priority` : "All clear"}
          </Badge>
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
            label: "Open tickets",
            value: tickets.length > 0 ? String(open) : "—",
            delta: `${tickets.length} total`,
            icon: Wrench,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Assets",
            value: "142",
            delta: "8 checked out",
            icon: Boxes,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Licenses",
            value: "36",
            delta: "3 expiring soon",
            icon: Rocket,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Maintenance",
            value: "5",
            delta: "1 overdue",
            icon: Bug,
            tone: "bg-destructive/10 text-destructive",
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
