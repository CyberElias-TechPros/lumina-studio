import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Mail, MailCheck, MessagesSquare, Send, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admissions/communication")({
  head: () => ({
    meta: [
      { title: "Communication — CEA-OS" },
      { name: "description", content: "Offer letters and communication templates." },
    ],
  }),
  component: AdmissionsCommunication,
});

const templates = [
  { t: "Offer letter — full-time", u: "Sent 24x this month", tone: "bg-success/10 text-success" },
  { t: "Assessment invitation", u: "Sent 89x this month", tone: "bg-primary/10 text-primary" },
  { t: "Interview confirmation", u: "Sent 64x this month", tone: "bg-learning/10 text-learning" },
];

function AdmissionsCommunication() {
  return (
    <AppShell
      roleKey="instructor"
      title="Communication center"
      subtitle="Email + in-app · 98% delivery rate"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Deliveries OK</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/admissions">
              <ArrowLeft className="size-4" /> Admissions hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Sent (30d)",
            value: "412",
            delta: "10 templates",
            icon: Mail,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Open rate",
            value: "71%",
            delta: "vs 45% bench",
            icon: MailCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Offers out",
            value: "24",
            delta: "11 accepted",
            icon: Send,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Templates",
            value: "10",
            delta: "3 drafts",
            icon: MessagesSquare,
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
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <UserRound className="text-primary size-4" /> Templates
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {templates.map((t) => (
            <div key={t.t} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{t.t}</p>
                <p className="text-muted-foreground text-xs">{t.u}</p>
              </div>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Edit
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
