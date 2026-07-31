import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/motion";

export const Route = createFileRoute("/auth/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset password — CEA-OS | Cyber Elias Academy" },
      {
        name: "description",
        content: "Choose a new password for your CEA-OS account.",
      },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);

  const checks = [
    { rule: "8+ characters", test: (p: string) => p.length >= 8 },
    { rule: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
    { rule: "One number or symbol", test: (p: string) => /[0-9!@#$%^&*]/.test(p) },
  ];
  const [pw, setPw] = useState("");

  return (
    <div className="bg-muted/40 relative grid min-h-screen place-items-center overflow-hidden px-4 py-16">
      <div className="bg-gradient-erp absolute -top-32 -left-32 size-96 rounded-full opacity-10 blur-3xl" />
      <div className="relative w-full max-w-md">
        <Reveal>
          <Card className="bg-card shadow-elevated border">
            <CardContent className="p-6 sm:p-8">
              {done ? (
                <div className="text-center">
                  <span className="bg-success/10 text-success mx-auto grid size-14 place-items-center rounded-full">
                    <CheckCircle2 className="size-7" />
                  </span>
                  <h1 className="font-display mt-4 text-xl font-extrabold">Password updated</h1>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Your password has been reset. You can sign in with the new one now.
                  </p>
                  <Button asChild className="bg-gradient-brand shadow-glow mt-6 border-0">
                    <Link to="/auth/sign-in">Sign in</Link>
                  </Button>
                </div>
              ) : (
                <>
                  <Link
                    to="/auth/forgot-password"
                    className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs font-bold"
                  >
                    <ArrowLeft className="size-3.5" /> Request a new link
                  </Link>
                  <h1 className="font-display mt-4 text-2xl font-extrabold">Set a new password</h1>
                  <p className="text-muted-foreground mt-1 text-sm">
                    For account <strong className="text-foreground">ada@example.com</strong>
                  </p>
                  <form
                    className="mt-6 space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setDone(true);
                    }}
                  >
                    <div className="space-y-1.5">
                      <Label htmlFor="code">Reset code</Label>
                      <Input
                        id="code"
                        placeholder="6-digit code from your email"
                        className="font-mono"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="pw">New password</Label>
                      <div className="relative">
                        <LockKeyhole className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                        <Input
                          id="pw"
                          type={show ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-9 pr-10"
                          value={pw}
                          onChange={(e) => setPw(e.target.value)}
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
                    <ul className="space-y-1.5">
                      {checks.map((c) => (
                        <li key={c.rule} className="flex items-center gap-2 text-xs">
                          <span
                            className={
                              c.test(pw)
                                ? "text-success inline-grid size-4 place-items-center rounded-full bg-success/10"
                                : "bg-muted text-muted-foreground inline-grid size-4 place-items-center rounded-full"
                            }
                          >
                            {c.test(pw) && <CheckCircle2 className="size-3" />}
                          </span>
                          <span className={c.test(pw) ? "font-semibold" : "text-muted-foreground"}>
                            {c.rule}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button type="submit" className="bg-gradient-brand shadow-glow w-full border-0">
                      Reset password <ShieldCheck className="ml-1.5 size-4" />
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
