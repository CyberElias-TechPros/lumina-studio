"use client";

import { useTurnstile } from "@/components/turnstile";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/motion";
import { useForgotPassword } from "@/lib/auth/session";
import { ApiError } from "@/lib/errors";

export const Route = createFileRoute("/auth/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset password — Cyber Elias Academy" },
      {
        name: "description",
        content: "Reset your Cyber Elias Academy password. We will email you a link.",
      },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const forgot = useForgotPassword();
  const turnstile = useTurnstile();
  const sent = forgot.isSuccess;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    forgot.mutate(
      { email: email.trim(), turnstileToken: turnstile.token },
      {
        onError: (err) => {
          turnstile.reset();
          setError(
            err instanceof ApiError
              ? err.message
              : "We couldn't send a reset link. Please try again.",
          );
        },
      },
    );
  };

  return (
    <div className="bg-muted/40 grid min-h-screen place-items-center px-4 py-16">
      <div className="w-full max-w-md">
        <Reveal>
          <Card className="bg-card border">
            <CardContent className="p-6 sm:p-8">
              {sent ? (
                <div className="text-center">
                  <span className="bg-primary/10 text-primary mx-auto grid size-14 place-items-center rounded-full">
                    <Send className="size-6" />
                  </span>
                  <h1 className="font-display mt-4 text-xl font-extrabold">Check your email</h1>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    If an account exists for that address, you'll get a reset link within a minute.
                    The link expires in 30 minutes.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <Button asChild variant="outline">
                      <Link to="/auth/sign-in">
                        <ArrowLeft className="mr-1.5 size-4" /> Sign in
                      </Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    to="/auth/sign-in"
                    className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs font-bold"
                  >
                    <ArrowLeft className="size-3.5" /> Back to sign in
                  </Link>
                  <h1 className="font-display mt-4 text-2xl font-semibold">
                    Forgot your password?
                  </h1>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Enter your email and we'll send you a reset link.
                  </p>
                  <form className="mt-6 space-y-4" onSubmit={submit}>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email address</Label>
                      <div className="relative">
                        <Mail className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="pl-9"
                          required
                          disabled={forgot.isPending}
                        />
                      </div>
                    </div>
                    <turnstile.Widget />
                    {error && (
                      <p className="text-error bg-error/10 rounded-lg px-3 py-2 text-sm">{error}</p>
                    )}
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={forgot.isPending || !turnstile.ready}
                    >
                      {forgot.isPending ? "Sending…" : "Send reset link"}{" "}
                      <ArrowRight className="ml-1.5 size-4" />
                    </Button>
                  </form>
                </>
              )}
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </div>
  );
}
