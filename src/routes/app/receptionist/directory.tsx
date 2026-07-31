import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Phone, Search, UserRound, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/receptionist/directory")({
  head: () => ({
    meta: [
      { title: "Staff Directory — CEA-OS" },
      { name: "description", content: "Find staff, extensions and offices." },
    ],
  }),
  component: ReceptionistDirectory,
});

const staff = [
  {
    n: "Mr. Adeyemi",
    r: "Instructor · Backend",
    x: "Ext 210",
    o: "Block B, R12",
    tone: "bg-primary/10 text-primary",
  },
  {
    n: "Ms. Chidera",
    r: "Instructor · DevOps",
    x: "Ext 211",
    o: "Block B, R13",
    tone: "bg-learning/10 text-learning",
  },
  {
    n: "Mrs. Obi",
    r: "Mentor coordinator",
    x: "Ext 134",
    o: "Block A, R04",
    tone: "bg-success/10 text-success",
  },
  {
    n: "Registrar's office",
    r: "Records & billing",
    x: "Ext 100",
    o: "Block A, R01",
    tone: "bg-warning/10 text-warning",
  },
];

function ReceptionistDirectory() {
  return (
    <AppShell
      roleKey="student"
      title="Staff directory"
      subtitle="94 staff · 6 departments · all extensions live"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Updated today</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/receptionist">
              <ArrowLeft className="size-4" /> Front desk
            </Link>
          </Button>
        </>
      }
    >
      <div className="bg-card shadow-soft flex flex-wrap items-center gap-2 rounded-2xl border p-3">
        <div className="bg-muted flex min-w-0 flex-1 items-center gap-2 rounded-xl px-3 py-2">
          <Search className="text-muted-foreground size-4 shrink-0" />
          <input
            className="placeholder:text-muted-foreground w-full bg-transparent text-sm font-medium outline-none"
            placeholder="Name, department, extension…"
          />
        </div>
        <Button size="sm" className="font-semibold">
          Search
        </Button>
      </div>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Users className="text-primary size-4" /> Frequently needed
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {staff.map((s) => (
            <div key={s.n} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <span className={cn("grid size-9 shrink-0 place-items-center rounded-lg", s.tone)}>
                <UserRound className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{s.n}</p>
                <p className="text-muted-foreground text-xs">
                  {s.r} · {s.o}
                </p>
              </div>
              <Badge variant="secondary" className="font-semibold">
                {s.x}
              </Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                <Phone className="size-3.5" /> Call
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
