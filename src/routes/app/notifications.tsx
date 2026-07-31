import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Bell, CheckCheck, Inbox, Settings2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — CEA-OS" },
      { name: "description", content: "Your in-app notification centre." },
    ],
  }),
  component: Notifications,
});

const notifications = [
  {
    t: "New grade: Backend & APIs — A",
    d: "10 min ago",
    tone: "bg-success/10 text-success",
    unread: true,
  },
  {
    t: "Term 3 instalment due Sep 1",
    d: "2 hours ago",
    tone: "bg-warning/10 text-warning",
    unread: true,
  },
  {
    t: "Mr. Adeyemi replied to your question",
    d: "Yesterday",
    tone: "bg-primary/10 text-primary",
    unread: true,
  },
  {
    t: "Live class starts in 15 min — Cloud & DevOps",
    d: "Today, 09:45",
    tone: "bg-learning/10 text-learning",
    unread: false,
  },
  {
    t: "Attendance record updated (QR check-in)",
    d: "Jul 28",
    tone: "bg-muted-foreground/10 text-muted-foreground",
    unread: false,
  },
];

function Notifications() {
  return (
    <AppShell
      roleKey="student"
      title="Notifications"
      subtitle="3 unread · delivered on app, email and SMS"
      actions={
        <>
          <Badge className="bg-primary/10 text-primary border-0 font-semibold">3 unread</Badge>
          <Button variant="outline" size="sm" className="font-semibold">
            <CheckCheck className="size-4" /> Mark all read
          </Button>
          <Button variant="ghost" size="sm" className="font-semibold">
            <Settings2 className="size-4" /> Preferences
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Unread",
            value: "3",
            delta: "1 urgent",
            icon: Inbox,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "This week",
            value: "14",
            delta: "grades, classes, bills",
            icon: Bell,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Quiet hours",
            value: "21:00–08:00",
            delta: "deliveries held",
            icon: Settings2,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Channels",
            value: "App · Email",
            delta: "SMS for urgent",
            icon: Sparkles,
            tone: "bg-success/10 text-success",
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
            <Bell className="text-primary size-4" /> Recent notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {notifications.map((n) => (
            <div
              key={n.t + n.d}
              className={cn(
                "flex items-center gap-3 py-4 first:pt-0 last:pb-0",
                !n.unread && "opacity-60",
              )}
            >
              <span className={cn("grid size-9 shrink-0 place-items-center rounded-lg", n.tone)}>
                <Bell className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{n.t}</p>
                <p className="text-muted-foreground text-xs">{n.d}</p>
              </div>
              {n.unread && <span className="bg-primary size-2 shrink-0 rounded-full" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
