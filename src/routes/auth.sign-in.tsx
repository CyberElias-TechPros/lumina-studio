import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  Link2,
  Loader2,
  LockKeyhole,
  Mail,
  MailCheck,
  ShieldCheck,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/motion";
import { useSignIn } from "@/lib/auth/session";
import { requestMagicLink } from "@/lib/api/auth";

export const Route = createFileRoute("/auth/sign-in")({
  head: () => ({
    meta: [
      { title: "Sign in — CEA-OS | Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Sign in to CEA-OS — one identity for learning, career, services, ERP and community.",
      },
      { property: "og:title", content: "Sign in — CEA-OS" },
      { property: "og:description", content: "One identity for all five engines of CEA-OS." },
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
    <div className="bg-muted/40 relative grid min-h-screen place-items-center overflow-hidden px-4 py-16">
      <div className="bg-gradient-brand absolute -top-32 -right-32 size-96 rounded-full opacity-10 blur-3xl" />
      <div className="bg-gradient-learning absolute -bottom-40 -left-32 size-96 rounded-full opacity-10 blur-3xl" />

      <div className="relative w-full max-w-md">
        <Reveal>
          <div className="mb-6 text-center">
            <Link
              to="/"
              className="bg-gradient-brand shadow-glow mx-auto grid size-12 place-items-center rounded-2xl"
            >
              <span className="font-display text-lg font-extrabold text-white">CE</span>
            </Link>
            <h1 className="font-display mt-4 text-2xl font-extrabold">Welcome back</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              One account for all five engines of CEA-OS.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <Card className="bg-card shadow-elevated border">
            <CardHeader className="p-0" />
            <CardContent className="p-6 sm:p-8">
              {sent ? (
                <div className="text-center">
                  <span className="bg-success/10 text-success mx-auto grid size-14 place-items-center rounded-full">
                    <MailCheck className="size-7" />
                  </span>
                  <h2 className="font-display mt-4 text-lg font-extrabold">Check your inbox</h2>
                  <p className="text-muted-foreground mt-2 text-sm">
                    We sent a one-time sign-in link to your email. It expires in 15 minutes.
                  </p>
                  {devToken && (
                    <Button asChild className="bg-gradient-brand shadow-glow mt-6 border-0">
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
                    className="text-muted-foreground hover:text-foreground mt-3 block w-full text-center text-xs font-bold"
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
                            className="text-primary hover:text-primary/80 text-xs font-bold"
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

                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-sm font-medium">
                        <Checkbox checked={remember} onCheckedChange={(c) => setRemember(!!c)} />{" "}
                        Remember me
                      </label>
                      <Link
                        to="/contact"
                        className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs font-semibold"
                      >
                        <ShieldCheck className="size-3.5" /> Trouble signing in?
                      </Link>
                    </div>

                    {error && (
                      <p className="bg-error/10 text-error rounded-lg px-3 py-2 text-xs font-semibold">
                        {error}
                      </p>
                    )}

                    <Button
                      type="submit"
                      disabled={busy}
                      className="bg-gradient-brand shadow-glow w-full border-0"
                    >
                      {busy && <Loader2 className="mr-1.5 size-4 animate-spin" />}
                      {magic ? "Send magic link" : "Sign in"}{" "}
                      {!busy && <ArrowRight className="ml-1.5 size-4" />}
                    </Button>
                  </form>

                  <button
                    type="button"
                    onClick={() => setMagic((m) => !m)}
                    className="text-primary hover:text-primary/80 mt-3 flex w-full items-center justify-center gap-1.5 text-xs font-bold"
                  >
                    <Link2 className="size-3.5" />
                    {magic ? "Use password instead" : "Sign in with a magic link"}
                  </button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <span className="text-muted-foreground bg-card relative px-3 text-xs font-semibold">
                      or continue with
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="font-semibold">
                      Google
                    </Button>
                    <Button variant="outline" className="font-semibold">
                      Microsoft
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-muted-foreground mt-6 text-center text-sm">
            New to CEA?{" "}
            <Link
              to="/auth/sign-up"
              className="text-primary font-bold underline-offset-2 hover:underline"
            >
              Create an account
            </Link>
          </p>
          <div className="text-muted-foreground mt-3 flex items-center justify-center gap-1.5 text-center text-xs">
            <KeyRound className="size-3.5" /> SSO enabled for partner organisations — ask your
            admin.
          </div>
        </Reveal>
      </div>
    </div>
  );
}
