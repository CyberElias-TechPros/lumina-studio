import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowRight, KeyRound, Loader2, ShieldAlert, ShieldCheck } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion";
import { useMagicLinkVerify } from "@/lib/auth/session";

export const Route = createFileRoute("/auth/magic-link")({
  validateSearch: z.object({
    token: z.string().optional(),
  }),
  head: () => ({
    meta: [
      { title: "Signing you in — Cyber Elias Academy" },
      {
        name: "description",
        content: "Verifying your one-time sign-in link.",
      },
    ],
  }),
  component: MagicLinkPage,
});

function MagicLinkPage() {
  const { token } = Route.useSearch();
  const navigate = useNavigate();
  const verify = useMagicLinkVerify();

  useEffect(() => {
    if (token && verify.isIdle) {
      verify.mutate(token, {
        onSuccess: (result) => {
          if ("mfaRequired" in result) {
            navigate({ to: "/auth/mfa", search: { email: "" } });
            return;
          }
          const pendingInvite = sessionStorage.getItem("cea_pending_invite");
          sessionStorage.removeItem("cea_pending_invite");
          if (pendingInvite) {
            navigate({
              to: "/app/parent/invitation/accept",
              search: { token: pendingInvite },
            });
          } else {
            navigate({ to: "/app" });
          }
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!token) {
    return (
      <AuthShell>
        <span className="bg-muted text-muted-foreground mx-auto grid size-14 place-items-center rounded-full">
          <KeyRound className="size-7" />
        </span>
        <h2 className="font-display mt-4 text-lg font-extrabold">No sign-in link found</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          This page verifies a one-time sign-in link. Request a new link to continue.
        </p>
        <Button asChild className="mt-6">
          <Link to="/auth/sign-in">
            Go to sign in <ArrowRight className="ml-1.5 size-4" />
          </Link>
        </Button>
      </AuthShell>
    );
  }

  if (verify.isPending) {
    return (
      <AuthShell>
        <Loader2 className="text-primary mx-auto size-10 animate-spin" />
        <h2 className="font-display mt-4 text-lg font-extrabold">Signing you in</h2>
        <p className="text-muted-foreground mt-2 text-sm">Verifying your one-time link…</p>
      </AuthShell>
    );
  }

  if (verify.isError) {
    return (
      <AuthShell>
        <span className="bg-error/10 text-error mx-auto grid size-14 place-items-center rounded-full">
          <ShieldAlert className="size-7" />
        </span>
        <h2 className="font-display mt-4 text-lg font-extrabold">This link didn't work</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          {verify.error instanceof Error
            ? verify.error.message
            : "The link is invalid or has expired."}
        </p>
        <Button asChild className="mt-6">
          <Link to="/auth/sign-in">
            Request a new link <ArrowRight className="ml-1.5 size-4" />
          </Link>
        </Button>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <span className="bg-success/10 text-success mx-auto grid size-14 place-items-center rounded-full">
        <ShieldCheck className="size-7" />
      </span>
      <h2 className="font-display mt-4 text-lg font-extrabold">You're signed in</h2>
      <p className="text-muted-foreground mt-2 text-sm">Taking you to your dashboard…</p>
    </AuthShell>
  );
}

function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted/40 grid min-h-screen place-items-center px-4 py-16">
      <div className="w-full max-w-md">
        <Reveal>
          <Card className="bg-card border">
            <CardContent className="p-6 text-center sm:p-8">{children}</CardContent>
          </Card>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-muted-foreground mt-6 text-center text-sm">
            <Link to="/" className="text-primary font-bold underline-offset-2 hover:underline">
              Back to home
            </Link>
          </p>
        </Reveal>
      </div>
    </div>
  );
}
