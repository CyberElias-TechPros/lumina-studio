import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Eye, EyeOff, KeyRound, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/motion";

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
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    navigate({ to: "/app" });
  };

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
              <form onSubmit={submit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <Mail className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-9"
                      required
                    />
                  </div>
                </div>

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
                      type={show ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-9 pr-10"
                      required
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

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Checkbox defaultChecked /> Remember me
                  </label>
                  <Link
                    to="/auth/mfa"
                    className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs font-semibold"
                  >
                    <ShieldCheck className="size-3.5" /> Use 2FA
                  </Link>
                </div>

                {error && (
                  <p className="bg-error/10 text-error rounded-lg px-3 py-2 text-xs font-semibold">
                    {error}
                  </p>
                )}

                <Button type="submit" className="bg-gradient-brand shadow-glow w-full border-0">
                  Sign in <ArrowRight className="ml-1.5 size-4" />
                </Button>
              </form>

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
