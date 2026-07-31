import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Inbox, Phone, PhoneCall, PhoneMissed, Voicemail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
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

const calls = [
  {
    n: "Mrs. Okafor (parent)",
    t: "Billing question",
    d: "10:12 · 6 min",
    kind: "Answered",
    tone: "bg-success/10 text-success",
    icon: PhoneCall,
  },
  {
    n: "TechHub Ltd",
    t: "Partnership inquiry",
    d: "09:40 · 4 min",
    kind: "Answered",
    tone: "bg-success/10 text-success",
    icon: PhoneCall,
  },
  {
    n: "Unknown",
    t: "Missed — voicemail",
    d: "09:05",
    kind: "Missed",
    tone: "bg-destructive/10 text-destructive",
    icon: PhoneMissed,
  },
  {
    n: "NGO partner",
    t: "Program update",
    d: "08:30 · 8 min",
    kind: "Answered",
    tone: "bg-success/10 text-success",
    icon: PhoneCall,
  },
];

function ReceptionistPhoneLog() {
  return (
    <AppShell
      roleKey="student"
      title="Phone log"
      subtitle="Front desk · 14 calls today"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">93% answered</Badge>
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
            value: "14",
            delta: "12 answered",
            icon: Phone,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Missed",
            value: "1",
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
          {calls.map((c) => (
            <div key={c.n} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <span className={cn("grid size-9 shrink-0 place-items-center rounded-lg", c.tone)}>
                <c.icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{c.n}</p>
                <p className="text-muted-foreground text-xs">
                  {c.t} · {c.d}
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", c.tone)}>{c.kind}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                {c.kind === "Missed" ? "Call back" : "Notes"}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
