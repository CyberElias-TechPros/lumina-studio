"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, CheckCircle2, Clock3, MessageSquare, MonitorCheck, Send } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useTicketDetail, useUpdateTicketStatus, useAddTicketEvent } from "@/lib/query/it";
import type { TicketDetail } from "@/lib/api/it";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/it/tickets/$id")({
  head: () => ({
    meta: [
      { title: "Ticket — CEA-OS" },
      { name: "description", content: "Ticket detail and resolution flow." },
    ],
  }),
  component: ItTicketDetail,
});

const priorityLabel: Record<string, string> = {
  P1: "P1 · High",
  P2: "P2 · Normal",
  P3: "P3 · Low",
};

const NEXT_STATUS: Record<string, "queued" | "in-progress" | "resolved" | "closed"> = {
  queued: "in-progress",
  "in-progress": "resolved",
  resolved: "closed",
};

function StatusActions({ id, status }: { id: string; status: string }) {
  const update = useUpdateTicketStatus(id);
  const next = NEXT_STATUS[status];
  if (!next) {
    return <Badge className="bg-success/10 text-success border-0 font-semibold">Closed</Badge>;
  }
  return (
    <Button
      size="sm"
      className="bg-gradient-brand shadow-glow w-full border-0 font-semibold"
      disabled={update.isPending}
      onClick={() => update.mutate(next)}
    >
      <CheckCircle2 className="size-4" /> Move to {next}
    </Button>
  );
}

function ReplyBox({ id }: { id: string }) {
  const addEvent = useAddTicketEvent(id);
  const [text, setText] = useState("");
  const submit = () => {
    const trimmed = text.trim();
    if (!trimmed || addEvent.isPending) return;
    addEvent.mutate(trimmed, { onSuccess: () => setText("") });
  };
  return (
    <>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="bg-muted placeholder:text-muted-foreground min-h-20 w-full resize-none rounded-xl border-0 p-3 text-sm font-medium outline-none"
        placeholder="Update the reporter…"
      />
      <Button
        size="sm"
        className="bg-gradient-brand shadow-glow w-full border-0 font-semibold"
        disabled={addEvent.isPending || text.trim().length === 0}
        onClick={submit}
      >
        <Send className="size-3.5" /> Send update
      </Button>
    </>
  );
}

function ItTicketDetail() {
  const { id } = Route.useParams();
  const detail = useTicketDetail(id);
  const ticket = detail.data;

  return (
    <AppShell
      roleKey="it"
      title={ticket ? `${ticket.id} · ${ticket.subject}` : "Ticket"}
      subtitle={
        ticket
          ? `${priorityLabel[ticket.priority] ?? ticket.priority} · ${ticket.sla} · reported by ${ticket.reporter}`
          : "Loading ticket…"
      }
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">
            {ticket ? `${ticket.sla} · ${ticket.elapsed}` : "—"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/it/tickets">
              <ArrowLeft className="size-4" /> Ticket hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <MessageSquare className="text-primary size-4" /> Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <QueryState<TicketDetail>
              query={detail}
              error={{ title: "Ticket unavailable" }}
              empty={{
                title: "Ticket not found",
                description: "This ticket may have been removed.",
              }}
              isEmpty={(row) => row.events.length === 0}
            >
              {(row) => (
                <>
                  {row.events.map((a) => (
                    <div
                      key={`${a.whenText}-${a.event}`}
                      className="flex items-center gap-3 rounded-xl border p-3"
                    >
                      <Badge className="border-0 bg-primary/10 shrink-0 font-semibold text-primary">
                        {a.whenText}
                      </Badge>
                      <p className="text-sm font-semibold">{a.event}</p>
                    </div>
                  ))}
                </>
              )}
            </QueryState>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <MonitorCheck className="text-primary size-4" /> Resolution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground text-xs font-semibold">
                Diagnose and replace the faulty part. Log the replacement in the asset record, then
                confirm with the reporter. Spare parts available in store.
              </p>
              {ticket && <StatusActions id={id} status={ticket.status} />}
              <Button variant="outline" size="sm" className="w-full font-semibold" disabled>
                <Clock3 className="size-3.5" /> Escalate
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <MessageSquare className="text-primary size-4" /> Reply to reporter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ReplyBox id={id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
