import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useState } from "react";
import { BadgeCheck, GraduationCap, Loader2, ShieldAlert, ShieldCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";
import { useInvitation, useAcceptInvitation } from "@/lib/query/invitations";
import { useSession } from "@/lib/auth/session";

export const Route = createFileRoute("/app/parent/invitation/accept")({
  validateSearch: z.object({
    token: z.string().optional(),
  }),
  head: () => ({
    meta: [
      { title: "Accept Invitation — CEA-OS" },
      { name: "description", content: "Accept your parent portal invitation." },
    ],
  }),
  component: ParentInvitationAccept,
});

const PENDING_KEY = "cea_pending_invite";

function ParentInvitationAccept() {
  const { token } = Route.useSearch();
  const navigate = useNavigate();
  const [localError, setLocalError] = useState("");
  const invitation = useInvitation(token);
  const accept = useAcceptInvitation();
  const session = useSession();

  const goSignUp = () => {
    if (token) sessionStorage.setItem(PENDING_KEY, token);
    void navigate({ to: "/auth/sign-up" });
  };
  const goSignIn = () => {
    if (token) sessionStorage.setItem(PENDING_KEY, token);
    void navigate({ to: "/auth/sign-in" });
  };

  const onAccept = () => {
    if (!token) return;
    setLocalError("");
    accept.mutate(token, {
      onSuccess: () => sessionStorage.removeItem(PENDING_KEY),
      onError: (err) => {
        if (
          err instanceof Error &&
          /authentication required|unauthorized|sign in/i.test(err.message)
        ) {
          setLocalError(
            "Sign in to the account you want to use as the guardian, then accept again.",
          );
        } else {
          setLocalError(err instanceof Error ? err.message : "Could not accept the invitation.");
        }
      },
    });
  };

  return (
    <AppShell
      roleKey="parent"
      title="Parent invitation"
      subtitle="Cyber Elias Academy · secure family access"
    >
      <div className="mx-auto max-w-2xl">
        <Card className="bg-card shadow-elevated border">
          <CardContent className="p-8">
            {!token && (
              <div className="text-center">
                <span className="bg-warning/10 text-warning mx-auto grid size-12 place-items-center rounded-2xl">
                  <ShieldAlert className="size-6" />
                </span>
                <p className="font-display mt-5 text-lg font-extrabold">No invitation link found</p>
                <p className="text-muted-foreground mt-2 text-sm">
                  This page verifies a one-time parent invitation link. Ask the school to share the
                  link again, or sign in to your account.
                </p>
                <Button onClick={goSignIn} className="mt-6 font-semibold">
                  Go to sign in
                </Button>
              </div>
            )}

            {token && invitation.isPending && (
              <div className="py-10 text-center">
                <Loader2 className="text-primary mx-auto size-8 animate-spin" />
                <p className="text-muted-foreground mt-3 text-sm">Verifying your invitation…</p>
              </div>
            )}

            {token && invitation.isError && (
              <div className="text-center">
                <span className="bg-error/10 text-error mx-auto grid size-12 place-items-center rounded-2xl">
                  <ShieldAlert className="size-6" />
                </span>
                <p className="font-display mt-5 text-lg font-extrabold">This link didn't work</p>
                <p className="text-muted-foreground mt-2 text-sm">
                  {invitation.error instanceof Error
                    ? invitation.error.message
                    : "The invitation is invalid or has expired."}
                </p>
                <Button onClick={goSignIn} className="mt-6 font-semibold">
                  Sign in to your account
                </Button>
              </div>
            )}

            {token && invitation.data && invitation.data.status !== "pending" && (
              <div className="text-center">
                <span
                  className={cn(
                    "mx-auto grid size-12 place-items-center rounded-2xl",
                    invitation.data.status === "accepted"
                      ? "bg-success/10 text-success"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {invitation.data.status === "accepted" ? (
                    <BadgeCheck className="size-6" />
                  ) : (
                    <ShieldAlert className="size-6" />
                  )}
                </span>
                <p className="font-display mt-5 text-lg font-extrabold">
                  {invitation.data.status === "accepted"
                    ? "Invitation already accepted"
                    : invitation.data.status === "revoked"
                      ? "Invitation revoked"
                      : "Invitation expired"}
                </p>
                <p className="text-muted-foreground mt-2 text-sm">
                  {invitation.data.status === "accepted"
                    ? "This link has already been used. Sign in to your parent account to continue."
                    : "Ask the school to issue a new invitation link."}
                </p>
                <Button onClick={goSignIn} className="mt-6 font-semibold">
                  Go to sign in
                </Button>
              </div>
            )}

            {token && invitation.data && invitation.data.status === "pending" && (
              <>
                {accept.isSuccess ? (
                  <div className="text-center">
                    <span className="bg-success/10 text-success mx-auto grid size-12 place-items-center rounded-2xl">
                      <BadgeCheck className="size-6" />
                    </span>
                    <p className="font-display mt-5 text-xl font-extrabold">You're now connected</p>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      Your guardian account is linked to{" "}
                      <strong className="text-foreground">{invitation.data.studentName}</strong>.
                      You can now view their progress, attendance, bills and school communication.
                    </p>
                    <Button asChild className="mt-6 font-semibold">
                      <Link to="/app/parent">Open parent dashboard</Link>
                    </Button>
                  </div>
                ) : (
                  <>
                    <span className="bg-success/10 text-success grid size-12 place-items-center rounded-2xl">
                      <BadgeCheck className="size-6" />
                    </span>
                    <p className="font-display mt-5 text-xl font-extrabold">
                      You've been invited by {invitation.data.studentName}
                    </p>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      The school shared this invitation with{" "}
                      <strong className="text-foreground">{invitation.data.guardianName}</strong>{" "}
                      (guardian). Accepting gives you view of progress, attendance, bills and school
                      communication — and lets you pay fees online.
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

                    {!session.isLoading && session.data?.user ? (
                      <Button
                        onClick={onAccept}
                        disabled={accept.isPending}
                        className="mt-6 w-full font-semibold"
                      >
                        {accept.isPending && <Loader2 className="mr-1.5 size-4 animate-spin" />}
                        Accept invitation
                      </Button>
                    ) : (
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Button onClick={goSignUp} className="flex-1 font-semibold">
                          Create parent account
                        </Button>
                        <Button
                          onClick={goSignIn}
                          variant="outline"
                          className="flex-1 font-semibold"
                        >
                          I already have an account
                        </Button>
                      </div>
                    )}

                    {(localError || (accept.isError && !localError)) && (
                      <p className="bg-error/10 text-error mt-4 rounded-lg px-3 py-2 text-xs font-semibold">
                        {localError ||
                          (accept.error instanceof Error
                            ? accept.error.message
                            : "Could not accept the invitation.")}
                      </p>
                    )}

                    <p className="text-muted-foreground mt-4 text-center text-[11px]">
                      Invitation expires{" "}
                      {new Date(invitation.data.expiresAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
