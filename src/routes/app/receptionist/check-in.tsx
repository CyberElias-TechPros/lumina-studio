import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, Bell, Camera, DoorOpen, QrCode, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/receptionist/check-in")({
  head: () => ({
    meta: [
      { title: "Visitor Check-In — CEA-OS" },
      { name: "description", content: "Capture visitor ID, print badges and notify hosts." },
    ],
  }),
  component: ReceptionistCheckIn,
});

const queue = [
  {
    n: "Oluwaseun Adebayo",
    h: "Mr. Adeyemi",
    t: "Meeting · 10:00",
    status: "Waiting",
    tone: "bg-warning/10 text-warning",
  },
  {
    n: "Mrs. Ngozi Eze",
    h: "Registrar",
    t: "Records · 10:30",
    status: "Waiting",
    tone: "bg-warning/10 text-warning",
  },
];

function ReceptionistCheckIn() {
  return (
    <AppShell
      roleKey="student"
      title="Visitor check-in"
      subtitle="Front desk · Ikeja campus · 3 visitors today"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Desk open</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/receptionist">
              <ArrowLeft className="size-4" /> Front desk
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Camera className="text-primary size-4" /> Capture visitor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 grid aspect-video place-items-center rounded-xl border">
              <span className="bg-primary/10 text-primary grid size-16 place-items-center rounded-2xl">
                <Camera className="size-8" />
              </span>
              <p className="text-muted-foreground text-xs font-semibold">
                Camera preview — ID capture
              </p>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input
                className="bg-muted placeholder:text-muted-foreground h-10 rounded-lg border-0 px-3 text-sm font-medium outline-none"
                placeholder="Full name"
              />
              <input
                className="bg-muted placeholder:text-muted-foreground h-10 rounded-lg border-0 px-3 text-sm font-medium outline-none"
                placeholder="Who are you visiting"
              />
              <input
                className="bg-muted placeholder:text-muted-foreground h-10 rounded-lg border-0 px-3 text-sm font-medium outline-none"
                placeholder="Phone number"
              />
              <input
                className="bg-muted placeholder:text-muted-foreground h-10 rounded-lg border-0 px-3 text-sm font-medium outline-none"
                placeholder="Purpose of visit"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button className="font-semibold">
                <BadgeCheck className="size-4" /> Check in
              </Button>
              <Button variant="outline" className="font-semibold">
                <QrCode className="size-4" /> Scan visitor QR
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <UserRound className="text-primary size-4" /> Waiting to see host
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {queue.map((v) => (
                <div key={v.n} className="rounded-xl border p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold">{v.n}</p>
                    <Badge className={cn("border-0 font-semibold", v.tone)}>{v.status}</Badge>
                  </div>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Visiting {v.h} · {v.t}
                  </p>
                  <Button size="sm" variant="outline" className="mt-2 font-semibold">
                    <Bell className="size-3.5" /> Notify host
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <DoorOpen className="text-warning size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Badge printing</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Badges auto-print with the visitor's name, host and photo. Access zones are set from
                the badge colour.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
