import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  FileText,
  LifeBuoy,
  MessageSquare,
  PenTool,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { useCliTickets, useCliTicketItems } from "@/lib/query/clientEngagement";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/client/")({
  head: () => ({
    meta: [
      { title: "Client Portal — CEA-OS" },
      { name: "description", content: "Proposals, contracts, invoices and support." },
    ],
  }),
  component: ClientHub,
});

const screens = [
  {
    icon: PenTool,
    label: "Proposals",
    desc: "Review, approve scope",
    path: "/app/client/proposals",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: FileText,
    label: "Contracts",
    desc: "Sign and track SOWs",
    path: "/app/client/contracts",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: Banknote,
    label: "Invoices",
    desc: "Payments and history",
    path: "/app/client/invoices",
    tone: "bg-success/10 text-success",
  },
  {
    icon: MessageSquare,
    label: "Messages",
    desc: "Threads with the team",
    path: "/app/client/messages",
    tone: "bg-warning/10 text-warning",
  },
];

function ClientHub() {
  const tickets = useCliTicketItems();

  const open = tickets.filter((t) => t.status !== "solved").length;

  return (
    <AppShell
      roleKey="client"
      title="Client portal"
      subtitle="CEA Studio · client workspace"
      actions={
        <>
          <Badge className="bg-primary/10 text-primary border-0 font-semibold">
            {open} open support tickets
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
            value: tickets.length > 0 ? String(open) : "—",
            delta: "across all projects",
            icon: LifeBuoy,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Invoices",
            value: "₦12.4m",
            delta: "1 awaiting payment",
            icon: Banknote,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Active contracts",
            value: "3",
            delta: "2 in delivery",
            icon: FileText,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Proposals",
            value: "2",
            delta: "1 awaiting approval",
            icon: PenTool,
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
