import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, GraduationCap, ShieldCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/parent/invitation/accept")({
  head: () => ({
    meta: [
      { title: "Accept Invitation — CEA-OS" },
      { name: "description", content: "Accept your parent portal invitation." },
    ],
  }),
  component: ParentInvitationAccept,
});

function ParentInvitationAccept() {
  return (
    <AppShell
      roleKey="student"
      title="Parent invitation"
      subtitle="Cyber Elias Academy · secure family access"
    >
      <div className="mx-auto max-w-2xl">
        <Card className="bg-card shadow-elevated border">
          <CardContent className="p-8">
            <span className="bg-success/10 text-success grid size-12 place-items-center rounded-2xl">
              <BadgeCheck className="size-6" />
            </span>
            <p className="font-display mt-5 text-xl font-extrabold">
              You've been invited by Ada Okafor
            </p>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              The school shared this invitation with{" "}
              <strong className="text-foreground">Chiamaka Okafor</strong> (guardian). Accepting
              gives you view of Ada's progress, attendance, bills and school communication — and
              lets you pay fees online.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { icon: GraduationCap, t: "Progress", d: "Grades & reports" },
                { icon: Users, t: "Attendance", d: "Live records" },
                { icon: ShieldCheck, t: "Billing", d: "Pay online" },
              ].map((f) => (
                <div key={f.t} className="rounded-xl border p-4 text-center">
                  <f.icon className="text-primary mx-auto size-5" />
                  <p className="mt-2 text-xs font-bold">{f.t}</p>
                  <p className="text-muted-foreground text-[11px]">{f.d}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-muted/50 p-4 text-xs text-muted-foreground">
              <p className="font-bold text-foreground">What happens next</p>
              <p className="mt-1">
                1. Create or sign in to your parent account · 2. Verify your phone number · 3.
                Access unlocks instantly and the school is notified.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="flex-1 font-semibold">
                <Link to="/auth/sign-up">Create parent account</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1 font-semibold">
                <Link to="/auth/sign-in">I already have an account</Link>
              </Button>
            </div>

            <p className="text-muted-foreground mt-4 text-center text-[11px]">
              Invitation expires Aug 30, 2026 ·{" "}
              <span className="text-foreground font-semibold">
                <Badge className="bg-muted text-muted-foreground border-0 font-semibold">
                  Ref: PINV-2026-4471
                </Badge>
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
