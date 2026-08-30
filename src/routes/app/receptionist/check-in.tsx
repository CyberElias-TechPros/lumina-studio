import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, BadgeCheck, Bell, Camera, DoorOpen, QrCode, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import {
  useCheckInVisitor,
  useNotifyQueueHost,
  useRecQueue,
  useRecQueueItems,
} from "@/lib/query/volunteerReceptionist";
import type { RecQueueEntry } from "@/lib/api/volunteerReceptionist";
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

function ReceptionistCheckIn() {
  const queueQuery = useRecQueue();
  const queue = useRecQueueItems();
  const checkIn = useCheckInVisitor();
  const notifyHost = useNotifyQueueHost();
  const [fullName, setFullName] = useState("");
  const [hostLabel, setHostLabel] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("");

  const submitCheckIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!fullName.trim() || !hostLabel.trim() || !purpose.trim() || checkIn.isPending) return;
    checkIn.mutate(
      {
        fullName: fullName.trim(),
        hostLabel: hostLabel.trim(),
        phone: phone.trim(),
        purpose: purpose.trim(),
      },
      {
        onSuccess: () => {
          setFullName("");
          setHostLabel("");
          setPhone("");
          setPurpose("");
          toast.success("Visitor checked in", {
            description: "The visitor was added to the on-site register.",
          });
        },
      },
    );
  };

  return (
    <AppShell
      roleKey="receptionist"
      title="Visitor check-in"
      subtitle={`Front desk · Ikeja campus · ${queue.length > 0 ? `${queue.length} visitors waiting` : "3 visitors today"}`}
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
            <form onSubmit={submitCheckIn}>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <input
                  className="bg-muted placeholder:text-muted-foreground h-10 rounded-lg border-0 px-3 text-sm font-medium outline-none"
                  placeholder="Full name"
                  aria-label="Visitor full name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  maxLength={160}
                  required
                />
                <input
                  className="bg-muted placeholder:text-muted-foreground h-10 rounded-lg border-0 px-3 text-sm font-medium outline-none"
                  placeholder="Who are you visiting"
                  aria-label="Host name"
                  value={hostLabel}
                  onChange={(event) => setHostLabel(event.target.value)}
                  maxLength={160}
                  required
                />
                <input
                  className="bg-muted placeholder:text-muted-foreground h-10 rounded-lg border-0 px-3 text-sm font-medium outline-none"
                  placeholder="Phone number"
                  aria-label="Visitor phone number"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  maxLength={40}
                  type="tel"
                />
                <input
                  className="bg-muted placeholder:text-muted-foreground h-10 rounded-lg border-0 px-3 text-sm font-medium outline-none"
                  placeholder="Purpose of visit"
                  aria-label="Visit purpose"
                  value={purpose}
                  onChange={(event) => setPurpose(event.target.value)}
                  maxLength={160}
                  required
                />
              </div>
              {checkIn.error && (
                <p role="alert" className="text-destructive mt-3 text-sm">
                  {checkIn.error.message}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                <Button type="submit" className="font-semibold" disabled={checkIn.isPending}>
                  <BadgeCheck className="size-4" />{" "}
                  {checkIn.isPending ? "Checking in…" : "Check in"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="font-semibold"
                  onClick={() => toast.info("QR scanning is available when a camera is connected.")}
                >
                  <QrCode className="size-4" /> Scan visitor QR
                </Button>
              </div>
            </form>
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
              <QueryState<RecQueueEntry[]>
                query={queueQuery}
                error={{ title: "Queue unavailable" }}
                empty={{ title: "Queue empty", description: "Waiting visitors will show here." }}
                isEmpty={(rows) => rows.length === 0}
              >
                {(rows) => (
                  <>
                    {rows.map((v) => (
                      <div key={v.id} className="rounded-xl border p-3">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-bold">{v.name}</p>
                          <Badge className="border-0 font-semibold bg-warning/10 text-warning">
                            {v.timeLabel}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mt-1 text-xs">
                          Visiting {v.hostLabel} · {v.purpose}
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-2 font-semibold"
                          disabled={v.notified === 1 || notifyHost.isPending}
                          onClick={() =>
                            notifyHost.mutate(v.id, {
                              onSuccess: () => toast.success(`Host notified for ${v.name}`),
                            })
                          }
                        >
                          <Bell className="size-3.5" />{" "}
                          {v.notified === 1 ? "Host notified" : "Notify host"}
                        </Button>
                      </div>
                    ))}
                  </>
                )}
              </QueryState>
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
