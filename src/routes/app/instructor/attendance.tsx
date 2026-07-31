import { createFileRoute } from "@tanstack/react-router";
import { Camera, CheckCircle2, ListChecks, QrCode, ScanLine, Users, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/instructor/attendance")({
  head: () => ({
    meta: [
      { title: "Attendance Marker — CEA-OS" },
      { name: "description", content: "Mark attendance via QR, manual entry or bulk upload." },
    ],
  }),
  component: AttendanceMarker,
});

const roster = [
  { name: "Amara Nwosu", status: "present" },
  { name: "Dapo Olu", status: "present" },
  { name: "Zainab K.", status: "present" },
  { name: "Chidi Eze", status: "late" },
  { name: "Halima Sani", status: "present" },
  { name: "Tunde Bakare", status: "absent" },
  { name: "Ngozi Umeh", status: "present" },
  { name: "Samuel Adebayo", status: "absent" },
];

function AttendanceMarker() {
  const present = roster.filter((r) => r.status === "present").length;
  const late = roster.filter((r) => r.status === "late").length;

  return (
    <AppShell
      roleKey="instructor"
      title="Attendance marker"
      subtitle="Backend & APIs · live class · Mon 10:00 · 42 enrolled"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            QR window open
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            Opened 09:58 · closes 10:15
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Present",
            value: String(present),
            delta: "scanned or manual",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Late",
            value: String(late),
            delta: "marked in list",
            icon: Users,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Absent",
            value: "2",
            delta: "auto-flagged",
            icon: XCircle,
            tone: "bg-error/10 text-error",
          },
          {
            label: "Live QR scans",
            value: "31",
            delta: "window open",
            icon: QrCode,
            tone: "bg-primary/10 text-primary",
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1.5fr]">
        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <QrCode className="text-primary size-4" /> QR check-in
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-ink relative mx-auto grid aspect-square w-44 place-items-center overflow-hidden rounded-2xl">
                <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:24px_24px]" />
                <div className="relative grid grid-cols-3 gap-1 p-4">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "size-4 rounded-[2px]",
                        [0, 2, 6, 8].includes(i)
                          ? "bg-white"
                          : i % 2 === 0
                            ? "bg-white/70"
                            : "bg-white/30",
                      )}
                    />
                  ))}
                </div>
              </div>
              <p className="text-center text-xs font-bold">
                Class code: <span className="font-mono text-primary">C15-BE-081</span>
              </p>
              <Button size="sm" className="bg-gradient-brand w-full border-0">
                <Camera className="mr-1.5 size-4" /> Scan student QR
              </Button>
              <p className="text-muted-foreground text-center text-[11px] font-semibold">
                Students scan the projected code from the app. Geofence: campus only.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="font-semibold">
              <ScanLine className="mr-1.5 size-4" /> Bulk upload (CSV)
            </Button>
            <Button variant="outline" className="font-semibold">
              <ListChecks className="mr-1.5 size-4" /> Manual list
            </Button>
          </div>
        </div>

        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Users className="text-primary size-4" /> Roster · {roster.length} shown
            </CardTitle>
            <Badge variant="secondary" className="font-semibold">
              tap to override
            </Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            {roster.map((r) => (
              <div key={r.name} className="flex items-center gap-3 rounded-xl border p-3">
                <span className="bg-gradient-brand text-primary-foreground font-display grid size-8 shrink-0 place-items-center rounded-full text-[10px] font-bold">
                  {r.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <p className="min-w-0 flex-1 truncate text-sm font-bold">{r.name}</p>
                <Badge
                  className={cn(
                    "w-20 justify-center border-0 font-semibold",
                    r.status === "present" && "bg-success/10 text-success",
                    r.status === "late" && "bg-warning/10 text-warning",
                    r.status === "absent" && "bg-error/10 text-error",
                  )}
                >
                  {r.status}
                </Badge>
              </div>
            ))}
            <Button className="bg-gradient-brand w-full border-0">
              Save attendance · sync gradebook
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
