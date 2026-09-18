import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CheckCircle2, KeyRound, ShieldCheck, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/motion";
import { useMfaVerify } from "@/lib/auth/session";
import { ApiError } from "@/lib/errors";

export const Route = createFileRoute("/auth/mfa")({
  validateSearch: (search: Record<string, unknown>) => ({
    email: typeof search.email === "string" ? search.email : "",
  }),
  head: () => ({
    meta: [
      { title: "Two-factor authentication — Cyber Elias Academy" },
      {
        name: "description",
        content: "Confirm it's you with a second factor — app code or recovery key.",
      },
    ],
  }),
  component: MfaPage,
});

function MfaPage() {
  const navigate = useNavigate();
  const { email } = Route.useSearch();
  const [method, setMethod] = useState<"app" | "recovery">("app");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const verify = useMfaVerify();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmed = code.trim();
    if (trimmed.length === 0) {
      setError("Enter your code or recovery key.");
      return;
    }
    verify.mutate(trimmed, {
      onSuccess: () => navigate({ to: "/app" }),
      onError: (err) => {
        setError(
          err instanceof ApiError ? err.message : "We couldn't verify that code. Try again.",
        );
      },
    });
  };

  return (
    <div className="bg-muted/40 grid min-h-screen place-items-center px-4 py-16">
      <div className="w-full max-w-md">
        <Reveal>
          <Card className="bg-card border">
            <CardContent className="p-6 sm:p-8">
              {verify.isSuccess ? (
                <div className="text-center">
                  <span className="bg-success/10 text-success mx-auto grid size-14 place-items-center rounded-full">
                    <CheckCircle2 className="size-7" />
                  </span>
                  <h1 className="font-display mt-4 text-xl font-extrabold">Identity confirmed</h1>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Second factor verified. Taking you to your dashboard…
                  </p>
                  <Button asChild className="mt-6">
                    <Link to="/app">
                      Continue <ArrowRight className="ml-1.5 size-4" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <>
                  <span className="bg-primary/10 text-primary mx-auto grid size-14 place-items-center rounded-full">
                    <ShieldCheck className="size-7" />
                  </span>
                  <h1 className="font-display mt-4 text-center text-xl font-extrabold">
                    Two-factor authentication
                  </h1>
                  <p className="text-muted-foreground mt-2 text-center text-sm">
                    One more step to confirm it's you.
                    {email && <span className="font-semibold text-foreground"> ({email})</span>}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setMethod("app")}
                      className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-bold transition-colors ${
                        method === "app"
                          ? "border-primary bg-primary/5 text-primary"
                          : "bg-background text-muted-foreground"
                      }`}
                    >
                      <Smartphone className="size-4" /> App code
                    </button>
                    <button
                      onClick={() => setMethod("recovery")}
                      className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-bold transition-colors ${
                        method === "recovery"
                          ? "border-primary bg-primary/5 text-primary"
                          : "bg-background text-muted-foreground"
                      }`}
                    >
                      <KeyRound className="size-4" /> Recovery key
                    </button>
                  </div>

                  <form className="mt-5 space-y-4" onSubmit={submit}>
                    <div className="space-y-1.5">
                      <Label htmlFor="mfa-code">
                        {method === "app"
                          ? "6-digit code from your authenticator app"
                          : "Recovery key (24 characters)"}
                      </Label>
                      <Input
                        id="mfa-code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder={method === "app" ? "••••••" : "cea-XXXX-XXXX"}
                        className={
                          method === "app"
                            ? "text-center font-mono text-lg tracking-[0.5em]"
                            : "font-mono"
                        }
                        autoFocus
                        disabled={verify.isPending}
                      />
                    </div>
                    {error && (
                      <p className="text-error bg-error/10 rounded-lg px-3 py-2 text-sm">{error}</p>
                    )}
                    <Button type="submit" className="w-full" disabled={verify.isPending}>
                      {verify.isPending ? "Verifying…" : "Confirm"}{" "}
                      <ArrowRight className="ml-1.5 size-4" />
                    </Button>
                  </form>

                  <p className="text-muted-foreground mt-4 text-center text-xs">
                    Lost your device?{" "}
                    <Link
                      to="/contact"
                      className="text-primary font-semibold underline-offset-2 hover:underline"
                    >
                      Contact support
                    </Link>{" "}
                    with your ID document.
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </div>
  );
}
