import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Headphones, MonitorCheck, Video, Wifi } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/it/remote-support")({
  head: () => ({
    meta: [
      { title: "Remote Support — CEA-OS" },
      { name: "description", content: "Start secure remote sessions." },
    ],
  }),
  component: ItRemoteSupport,
});

const sessions = [
  {
    s: "Ms. Chidera — Lab 2 projector",
    d: "Active · 12 min",
    s2: "Live",
    tone: "bg-success/10 text-success",
  },
  {
    s: "Mrs. Obi — Wi-Fi dropouts",
    d: "Scheduled 14:30",
    s2: "Upcoming",
    tone: "bg-primary/10 text-primary",
  },
  {
    s: "Registrar — printer queue",
    d: "Completed · 8 min",
    s2: "Done",
    tone: "bg-learning/10 text-learning",
  },
];

function ItRemoteSupport() {
  return (
    <AppShell
      roleKey="instructor"
      title="Remote support"
      subtitle="4 sessions today · avg. 11 min to resolve"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            1 live session
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
            label: "Today",
            value: "4",
            delta: "1 live",
            icon: Headphones,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Avg. duration",
            value: "11 min",
            delta: "target < 15",
            icon: MonitorCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "First-touch fix",
            value: "78%",
            delta: "of sessions",
            icon: Video,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Video sessions",
            value: "3",
            delta: "of 4 today",
            icon: Wifi,
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
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <MonitorCheck className="text-primary size-4" /> Sessions
          </CardTitle>
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            Start session
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          {sessions.map((s) => (
            <div key={s.s} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{s.s}</p>
                <p className="text-muted-foreground text-xs">{s.d}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", s.tone)}>{s.s2}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Join
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
