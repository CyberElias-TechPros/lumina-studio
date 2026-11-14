"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link, useNavigate } from "@/lib/next-compat/router";
import { z } from "zod";
import { useState } from "react";
import { BadgeCheck, GraduationCap, Loader2, ShieldAlert, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useInvitation, useAcceptInvitation } from "@/lib/query/invitations";
import { useSession, useSignOut } from "@/lib/auth/session";
import { ApiError } from "@/lib/errors";

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
  const signOut = useSignOut();
  const sessionUnavailable =
    session.isError && (!(session.error instanceof ApiError) || session.error.status !== 401);

  const goSignIn = () => {
    if (token) sessionStorage.setItem(PENDING_KEY, token);
    void navigate({ to: "/auth/sign-in" });
  };

  const switchAccount = () => {
    setLocalError("");
    signOut.mutate(undefined, {
      onSuccess: () => goSignIn(),
      onError: (error) =>
        setLocalError(error instanceof Error ? error.message : "Could not sign out. Try again."),
    });
  };

  const onAccept = () => {
    if (!token) return;
    setLocalError("");
    accept.mutate(token, {
      onSuccess: () => sessionStorage.removeItem(PENDING_KEY),
      onError: (err) => {
        if (err instanceof ApiError && err.status === 401) {
          setLocalError(
            "Sign in to the parent account selected by the academy, then accept again.",
          );
        } else {
          setLocalError(err instanceof Error ? err.message : "Could not accept the invitation.");
        }
      },
    });
  };

  return (
    <main className="bg-muted/40 min-h-screen px-4 py-16" aria-label="Parent invitation">
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

            {token &&
              invitation.data &&
              invitation.data.status !== "pending" &&
              !accept.isSuccess && (
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

            {token &&
              invitation.data &&
              (invitation.data.status === "pending" || accept.isSuccess) && (
                <>
                  {accept.isSuccess ? (
                    <div className="text-center">
                      <span className="bg-success/10 text-success mx-auto grid size-12 place-items-center rounded-2xl">
                        <BadgeCheck className="size-6" />
                      </span>
                      <p className="font-display mt-5 text-xl font-extrabold">
                        You're now connected
                      </p>
                      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                        Your parent account is linked to{" "}
                        <strong className="text-foreground">{accept.data?.studentName}</strong>. You
                        can now open the parent dashboard for their available records.
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
                        Parent account invitation
                      </p>
                      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                        Sign in to the parent account selected by the academy and verify its email.
                        The academy must confirm the family relationship before issuing the
                        invitation.
                      </p>

                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        {[
                          { icon: GraduationCap, t: "Progress", d: "Grades & reports" },
                          { icon: Users, t: "Attendance", d: "Attendance records" },
                          { icon: ShieldCheck, t: "Billing", d: "Billing records" },
                        ].map((f) => (
                          <div key={f.t} className="rounded-xl border p-4 text-center">
                            <f.icon className="text-primary mx-auto size-5" />
                            <p className="mt-2 text-xs font-bold">{f.t}</p>
                            <p className="text-muted-foreground text-[11px]">{f.d}</p>
                          </div>
                        ))}
                      </div>

                      {session.isPending ? (
                        <p className="text-muted-foreground mt-6 text-sm">Checking your sign-in…</p>
                      ) : sessionUnavailable ? (
                        <div className="mt-6 space-y-2">
                          <p role="alert" className="text-destructive text-sm">
                            Could not check your sign-in. Try again.
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => void session.refetch()}
                          >
                            Retry
                          </Button>
                        </div>
                      ) : session.data?.user ? (
                        <div className="mt-6 space-y-3">
                          <p className="text-muted-foreground text-xs">
                            Signed in as {session.data.user.email}.
                          </p>
                          <Button
                            onClick={onAccept}
                            disabled={accept.isPending || signOut.isPending}
                            className="w-full font-semibold"
                          >
                            {accept.isPending && <Loader2 className="mr-1.5 size-4 animate-spin" />}
                            Accept invitation
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={switchAccount}
                            disabled={accept.isPending || signOut.isPending}
                            className="w-full font-semibold"
                          >
                            {signOut.isPending ? "Signing out…" : "Use a different account"}
                          </Button>
                        </div>
                      ) : (
                        <div className="mt-6 flex flex-wrap gap-3">
                          <Button onClick={goSignIn} className="flex-1 font-semibold">
                            Sign in to the intended parent account
                          </Button>
                          <p className="text-muted-foreground w-full text-xs">
                            If your sign-in link opens in a different tab or device, reopen this
                            invitation after signing in.
                          </p>
                        </div>
                      )}

                      {session.data?.user && (
                        <p className="text-muted-foreground mt-3 text-xs">
                          Need to verify your email?{" "}
                          <Link
                            to="/auth/verify-email"
                            onClick={() => sessionStorage.setItem(PENDING_KEY, token)}
                            className="text-primary underline"
                          >
                            Open email verification
                          </Link>
                          , then return to this invitation.
                        </p>
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
    </main>
  );
}
