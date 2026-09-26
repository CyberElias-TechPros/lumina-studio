import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useAccount, useSendEmailVerification, useVerifyEmail } from "@/lib/query/account";
import { useSession } from "@/lib/auth/session";
import { isMockMode } from "@/lib/env";
import { ArrowRight, CheckCircle2, MailCheck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/motion";

export const Route = createFileRoute("/auth/verify-email")({
  head: () => ({
    meta: [
      { title: "Verify email — Cyber Elias Academy" },
      {
        name: "description",
        content: "Confirm your email address to activate your Cyber Elias Academy account.",
      },
    ],
  }),
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [devCode, setDevCode] = useState<string | null>(null);
  const { data: session, isPending: sessionLoading } = useSession();
  const signedIn = Boolean(session?.user) || isMockMode;
  const account = useAccount(signedIn);
  const verify = useVerifyEmail();
  const resend = useSendEmailVerification();
  const done = account.data?.emailVerified === true;

  useEffect(() => {
    const stored = sessionStorage.getItem("cea_dev_verify_code");
    if (stored) {
      setDevCode(stored);
      sessionStorage.removeItem("cea_dev_verify_code");
    }
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const setDigit = (i: number, v: string) => {
    const clean = v.replace(/\D/g, "");
    if (clean.length > 1) {
      // Paste of the whole code.
      const next = clean.slice(0, 6).split("");
      while (next.length < 6) next.push("");
      setDigits(next);
      document.getElementById(`otp-${Math.min(clean.length, 5)}`)?.focus();
      return;
    }
    const next = [...digits];
    next[i] = clean.slice(0, 1);
    setDigits(next);
    if (clean && i < 5) {
      document.getElementById(`otp-${i + 1}`)?.focus();
    }
  };

  const code = digits.join("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    verify.mutate(code, {
      onError: (err) => setError(err instanceof Error ? err.message : "Verification failed."),
    });
  };

  const sendAgain = () => {
    setError(null);
    setInfo(null);
    resend.mutate(undefined, {
      onSuccess: (r) => {
        setCooldown(60);
        if (r.devCode) setDevCode(r.devCode);
        setInfo(
          r.sent
            ? "A new code is on its way."
            : "We couldn't send email right now — try again shortly.",
        );
      },
      onError: (err) => setError(err instanceof Error ? err.message : "Could not resend the code."),
    });
  };

  if (!sessionLoading && !signedIn) {
    return (
      <div className="bg-muted/40 grid min-h-screen place-items-center px-4 py-16">
        <Card className="bg-card w-full max-w-md border">
          <CardContent className="p-6 text-center sm:p-8">
            <h1 className="font-display text-xl font-extrabold">Sign in to verify your email</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Your verification code works once you&apos;re signed in to your account.
            </p>
            <Button asChild className="mt-6">
              <Link to="/auth/sign-in">Sign in</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-muted/40 grid min-h-screen place-items-center px-4 py-16">
      <div className="w-full max-w-md">
        <Reveal>
          <Card className="bg-card border">
            <CardContent className="p-6 sm:p-8">
              {done ? (
                <div className="text-center">
                  <span className="bg-success/10 text-success mx-auto grid size-14 place-items-center rounded-full">
                    <CheckCircle2 className="size-7" />
                  </span>
                  <h1 className="font-display mt-4 text-xl font-extrabold">Email verified</h1>
                  <p className="text-muted-foreground mt-2 text-sm">Your account is active.</p>
                  <Button asChild className="mt-6">
                    <Link to="/app">
                      Go to my dashboard <ArrowRight className="ml-1.5 size-4" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <>
                  <span className="bg-primary/10 text-primary mx-auto grid size-14 place-items-center rounded-full">
                    <MailCheck className="size-7" />
                  </span>
                  <h1 className="font-display mt-4 text-center text-xl font-extrabold">
                    Verify your email
                  </h1>
                  <p className="text-muted-foreground mt-2 text-center text-sm">
                    We sent a 6-digit code to{" "}
                    <strong className="text-foreground">
                      {account.data?.email ?? "your email"}
                    </strong>
                    . It expires in 10 minutes.
                  </p>
                  {devCode && (
                    <p className="bg-muted mt-3 rounded-md px-3 py-2 text-center text-xs">
                      Development code: <strong>{devCode}</strong>
                    </p>
                  )}
                  <form className="mt-6 space-y-4" onSubmit={submit}>
                    <div className="space-y-1.5">
                      <Label htmlFor="otp-0">Enter the code</Label>
                      <div className="flex justify-between gap-2">
                        {digits.map((d, i) => (
                          <Input
                            key={i}
                            id={`otp-${i}`}
                            inputMode="numeric"
                            autoComplete={i === 0 ? "one-time-code" : "off"}
                            aria-label={`Digit ${i + 1}`}
                            value={d}
                            onChange={(e) => setDigit(i, e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Backspace" && !digits[i] && i > 0) {
                                document.getElementById(`otp-${i - 1}`)?.focus();
                              }
                            }}
                            className="h-13 w-12 text-center text-lg font-extrabold"
                          />
                        ))}
                      </div>
                    </div>
                    {error && (
                      <p className="text-error bg-error/10 rounded-lg px-3 py-2 text-sm">{error}</p>
                    )}
                    {info && <p className="text-muted-foreground text-center text-xs">{info}</p>}
                    <Button
                      type="submit"
                      disabled={code.length !== 6 || verify.isPending}
                      className="w-full"
                    >
                      {verify.isPending && <Loader2 className="mr-1.5 size-4 animate-spin" />}
                      Verify email <ArrowRight className="ml-1.5 size-4" />
                    </Button>
                  </form>
                  <button
                    type="button"
                    onClick={sendAgain}
                    disabled={cooldown > 0 || resend.isPending}
                    className="text-muted-foreground hover:text-foreground mt-4 flex w-full items-center justify-center gap-1.5 text-xs font-bold disabled:opacity-60"
                  >
                    <RotateCcw className="size-3.5" />
                    {cooldown > 0
                      ? `Resend code (0:${String(cooldown).padStart(2, "0")})`
                      : "Resend code"}
                  </button>
                  <Link
                    to="/app"
                    className="text-muted-foreground hover:text-foreground mt-2 block text-center text-xs"
                  >
                    Skip for now
                  </Link>
                </>
              )}
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </div>
  );
}
