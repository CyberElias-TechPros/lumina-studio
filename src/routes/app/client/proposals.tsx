import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock3, FileText, Handshake, Inbox, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/client/proposals")({
  head: () => ({
    meta: [
      { title: "Proposals — CEA-OS" },
      { name: "description", content: "View, accept and negotiate proposals." },
    ],
  }),
  component: ClientProposals,
});

const proposals = [
  {
    p: "Learning platform rebuild",
    v: "₦8.4m · 12 weeks · scope v2",
    s: "Open",
    tone: "bg-primary/10 text-primary",
  },
  {
    p: "Mobile app MVP",
    v: "₦12.0m · 16 weeks · scope v1",
    s: "Negotiating",
    tone: "bg-warning/10 text-warning",
  },
  {
    p: "Data migration project",
    v: "₦3.2m · 6 weeks · completed",
    s: "Signed",
    tone: "bg-success/10 text-success",
  },
];

function ClientProposals() {
  return (
    <AppShell
      roleKey="instructor"
      title="Proposals"
      subtitle="2 active · median response 2 days"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">2 open</Badge>
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
            label: "Open",
            value: "1",
            delta: "awaiting review",
            icon: Inbox,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Negotiating",
            value: "1",
            delta: "scope discussions",
            icon: Handshake,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Signed (year)",
            value: "4",
            delta: "₦31.4m total",
            icon: ThumbsUp,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Avg. cycle",
            value: "9 days",
            delta: "proposal → signed",
            icon: Clock3,
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
            <FileText className="text-primary size-4" /> Proposals
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {proposals.map((p) => (
            <div key={p.p} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{p.p}</p>
                <p className="text-muted-foreground text-xs">{p.v}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", p.tone)}>{p.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Review
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
