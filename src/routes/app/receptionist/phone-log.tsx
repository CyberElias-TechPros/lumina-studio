import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Inbox, Phone, PhoneCall, PhoneMissed, Voicemail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useRecCalls, useRecCallItems } from "@/lib/query/volunteerReceptionist";
import type { RecCall } from "@/lib/api/volunteerReceptionist";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/receptionist/phone-log")({
  head: () => ({
    meta: [
      { title: "Phone Log — CEA-OS" },
      { name: "description", content: "Track calls, messages and follow-ups." },
    ],
  }),
  component: ReceptionistPhoneLog,
});

function ReceptionistPhoneLog() {
  const callsQuery = useRecCalls();
  const calls = useRecCallItems();

  const missed = calls.filter((c) => c.kind === "missed").length;
  const answered = calls.length > 0 ? calls.length - missed : 0;

  return (
    <AppShell
      roleKey="receptionist"
      title="Phone log"
      subtitle={`Front desk · ${calls.length > 0 ? `${calls.length} calls today` : "14 calls today"}`}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {calls.length > 0
              ? `${Math.round((answered / calls.length) * 100)}% answered`
              : "93% answered"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/receptionist">
              <ArrowLeft className="size-4" /> Front desk
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Calls today",
            value: calls.length > 0 ? String(calls.length) : "—",
            delta: "12 answered",
            icon: Phone,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Missed",
            value: calls.length > 0 ? String(missed) : "—",
            delta: "voicemail left",
            icon: PhoneMissed,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Avg. wait",
            value: "18s",
            delta: "target < 30s",
            icon: Clock,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Follow-ups due",
            value: "3",
            delta: "today",
            icon: Voicemail,
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
            <Inbox className="text-primary size-4" /> Today's calls
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<RecCall[]>
            query={callsQuery}
            error={{ title: "Phone log unavailable" }}
            empty={{ title: "No calls", description: "Today's calls will show here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((c) => {
                  const missedCall = c.kind === "missed";
                  const tone = missedCall
                    ? "bg-destructive/10 text-destructive"
                    : "bg-success/10 text-success";
                  const Icon = missedCall ? PhoneMissed : PhoneCall;
                  return (
                    <div
                      key={c.id}
                      className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                    >
                      <span
                        className={cn("grid size-9 shrink-0 place-items-center rounded-lg", tone)}
                      >
                        <Icon className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">{c.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {c.topic} · {c.timeLabel}
                        </p>
                      </div>
                      <Badge className={cn("border-0 font-semibold", tone)}>
                        {missedCall ? "Missed" : "Answered"}
                      </Badge>
                      <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                        {missedCall ? "Call back" : "Notes"}
                      </Button>
                    </div>
                  );
                })}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
