"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  LifeBuoy,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { useCliTicketItems } from "@/lib/query/clientEngagement";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/client/")({
  head: () => ({
    meta: [
      { title: "Client Portal — CEA-OS" },
      { name: "description", content: "Support requests, billing, calendar and messages." },
    ],
  }),
  component: ClientHub,
});

const screens = [
  {
    icon: LifeBuoy,
    label: "Support tickets",
    desc: "Log issues and track SLA",
    path: "/app/client/support",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: MessageSquare,
    label: "Messages",
    desc: "Direct threads with delivery leads",
    path: "/app/messages",
    tone: "bg-warning/10 text-warning",
  },
  {
    icon: CreditCard,
    label: "Billing & invoices",
    desc: "View payments and receipts",
    path: "/app/billing",
    tone: "bg-success/10 text-success",
  },
  {
    icon: CalendarDays,
    label: "Calendar",
    desc: "Upcoming reviews and check-ins",
    path: "/app/calendar",
    tone: "bg-learning/10 text-learning",
  },
];

function ClientHub() {
  const tickets = useCliTicketItems();

  const open = tickets.filter((t) => t.status !== "solved").length;
  const solved = tickets.filter((t) => t.status === "solved").length;
  const inProgress = tickets.filter((t) => /progress|open/i.test(t.status)).length;

  return (
    <AppShell
      roleKey="client"
      title="Client portal"
      subtitle="CEA Studio · client workspace"
      actions={
        <>
          <Badge className="bg-primary/10 text-primary border-0 font-semibold">
            {open} open support {open === 1 ? "ticket" : "tickets"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/client">
              <ArrowLeft className="size-4" /> Client portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Open tickets",
            value: String(open),
            delta: inProgress > 0 ? `${inProgress} in progress` : "active support queue",
            icon: LifeBuoy,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Resolved tickets",
            value: String(solved),
            delta: "completed requests",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Total requests",
            value: String(tickets.length),
            delta: "logged on your account",
            icon: MessageSquare,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Delivery SLA",
            value: "< 24h",
            delta: "studio response target",
            icon: CalendarDays,
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
