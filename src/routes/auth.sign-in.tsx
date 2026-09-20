import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowRight, Eye, EyeOff, Link2, Loader2, LockKeyhole, Mail, MailCheck } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignIn } from "@/lib/auth/session";
import { requestMagicLink } from "@/lib/api/auth";

export const Route = createFileRoute("/auth/sign-in")({
  head: () => ({
    meta: [
      { title: "Sign in — Cyber Elias Academy" },
      {
        name: "description",
        content: "Sign in to your Cyber Elias Academy account.",
      },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [magic, setMagic] = useState(false);
  const [sent, setSent] = useState(false);
  const [devToken, setDevToken] = useState<string | undefined>(undefined);
  const [remember, setRemember] = useState(true);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const passwordSignIn = useSignIn();
  const magicLink = useMutation({
    mutationFn: requestMagicLink,
    onSuccess: (result) => {
      const dev = (result as { devToken?: string }).devToken;
      setDevToken(dev);
      setSent(true);
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : "Could not send the sign-in link.");
    },
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (magic) {
      const email = emailRef.current?.value.trim() ?? "";
      if (!email) return;
      magicLink.mutate({ email });
      return;
    }

    const email = emailRef.current?.value.trim() ?? "";
    const password = passwordRef.current?.value ?? "";
    passwordSignIn.mutate(
      { email, password, remember },
      {
        onSuccess: (result) => {
          if ("user" in result) {
            navigate({ to: "/app" });
          } else {
            navigate({ to: "/auth/mfa", search: { email } });
          }
        },
        onError: (err) => {
          setError(err instanceof Error ? err.message : "Sign in failed.");
        },
      },
    );
  };

  const busy = passwordSignIn.isPending || magicLink.isPending;

  return (
    <div className="bg-muted/40 grid min-h-screen place-items-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <Link
            to="/"
            className="bg-primary mx-auto grid size-11 place-items-center rounded-lg text-white"
          >
            <span className="font-display text-sm font-semibold">CE</span>
          </Link>
          <h1 className="font-display mt-4 text-2xl font-semibold">Sign in</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            For students and staff of Cyber Elias Academy.
          </p>
        </div>

        <div className="border-border bg-card rounded-lg border p-6 sm:p-8">
          {sent ? (
            <div className="text-center">
              <span className="bg-success/10 text-success mx-auto grid size-12 place-items-center rounded-full">
                <MailCheck className="size-6" />
              </span>
              <h2 className="font-display mt-4 text-lg font-semibold">Check your inbox</h2>
              <p className="text-muted-foreground mt-2 text-sm">
                We sent a one-time sign-in link. It expires in 15 minutes.
              </p>
              {devToken && (
                <Button asChild className="mt-6">
                  <Link to="/auth/magic-link" search={{ token: devToken }}>
                    Open sign-in link (dev) <ArrowRight className="ml-1.5 size-4" />
                  </Link>
                </Button>
              )}
              <button
                type="button"
                onClick={() => {
                  const email = emailRef.current?.value.trim() ?? "";
                  if (email) magicLink.mutate({ email });
                }}
                disabled={magicLink.isPending}
                className="text-muted-foreground hover:text-foreground mt-3 block w-full text-center text-xs"
              >
                Resend link
              </button>
            </div>
          ) : (
            <>
              <form onSubmit={submit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <Mail className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                    <Input
                      id="email"
                      ref={emailRef}
                      type="email"
                      placeholder="you@example.com"
                      className="pl-9"
                      required
                    />
                  </div>
                </div>

                {!magic && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to="/auth/forgot-password"
                        className="text-primary hover:text-primary/80 text-xs"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <LockKeyhole className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                      <Input
                        id="password"
                        ref={passwordRef}
                        type={show ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-9 pr-10"
                        required={!magic}
                      />
                      <button
                        type="button"
                        onClick={() => setShow((s) => !s)}
                        className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                      >
                        {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>
                )}

                <label className="flex items-center gap-2 text-sm">
                  <Checkbox checked={remember} onCheckedChange={(c) => setRemember(!!c)} /> Remember
                  me
                </label>

                {error && <p className="text-error text-sm">{error}</p>}

                <Button type="submit" disabled={busy} className="w-full">
                  {busy && <Loader2 className="mr-1.5 size-4 animate-spin" />}
                  {magic ? "Send sign-in link" : "Sign in"}
                </Button>
              </form>

              <button
                type="button"
                onClick={() => setMagic((m) => !m)}
                className="text-primary mt-3 flex w-full items-center justify-center gap-1.5 text-xs"
              >
                <Link2 className="size-3.5" />
                {magic ? "Use password instead" : "Sign in with a link instead"}
              </button>
            </>
          )}
        </div>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          New here?{" "}
          <Link to="/auth/sign-up" className="text-primary underline-offset-2 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
