import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
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
  const [done, setDone] = useState(false);

  const setDigit = (i: number, v: string) => {
    const next = [...digits];
    next[i] = v.replace(/\D/g, "").slice(0, 1);
    setDigits(next);
    if (v && i < 5) {
      document.getElementById(`otp-${i + 1}`)?.focus();
    }
  };

  const code = digits.join("");

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
                  <p className="text-muted-foreground mt-2 text-sm">
                    Your account is active.
                  </p>
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
                    <strong className="text-foreground">ada@example.com</strong>. It expires in 10
                    minutes.
                  </p>
                  <form
                    className="mt-6 space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setDone(true);
                    }}
                  >
                    <div className="space-y-1.5">
                      <Label htmlFor="otp-0">Enter the code</Label>
                      <div className="flex justify-between gap-2">
                        {digits.map((d, i) => (
                          <Input
                            key={i}
                            id={`otp-${i}`}
                            inputMode="numeric"
                            value={d}
                            onChange={(e) => setDigit(i, e.target.value)}
                            className="h-13 w-12 text-center text-lg font-extrabold"
                          />
                        ))}
                      </div>
                    </div>
                    <Button type="submit" disabled={code.length !== 6} className="w-full">
                      Verify email <ArrowRight className="ml-1.5 size-4" />
                    </Button>
                  </form>
                  <button className="text-muted-foreground hover:text-foreground mt-4 flex w-full items-center justify-center gap-1.5 text-xs font-bold">
                    <RotateCcw className="size-3.5" /> Resend code (0:48)
                  </button>
                </>
              )}
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </div>
  );
}
