import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock3, FileText, Handshake, Inbox, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { CliProposal } from "@/lib/query/clientEngagement";
import { useCliProposals } from "@/lib/query/clientEngagement";
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

function statusTone(s: string) {
  const l = s.toLowerCase();
  if (l.includes("signed")) return "bg-success/10 text-success";
  if (l.includes("negotiat")) return "bg-warning/10 text-warning";
  if (l.includes("open")) return "bg-primary/10 text-primary";
  return "bg-muted-foreground/10 text-muted-foreground";
}

function ClientProposals() {
  const proposalsQuery = useCliProposals();

  return (
    <AppShell
      roleKey="client"
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
          <QueryState<CliProposal[]>
            query={proposalsQuery}
            error={{ title: "Proposals unavailable" }}
            empty={{
              title: "No proposals",
              description: "Your proposals will appear here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((p) => (
                  <div
                    key={p.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{p.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {p.amount} · {p.scope}
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", statusTone(p.status))}>
                      {p.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      Review
                    </Button>
                  </div>
                ))}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
