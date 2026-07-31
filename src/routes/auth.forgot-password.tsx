import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/motion";

export const Route = createFileRoute("/auth/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset password — CEA-OS | Cyber Elias Academy" },
      {
        name: "description",
        content: "Reset your CEA-OS password. We'll email you a secure link.",
      },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="bg-muted/40 relative grid min-h-screen place-items-center overflow-hidden px-4 py-16">
      <div className="bg-gradient-brand absolute -top-32 -right-32 size-96 rounded-full opacity-10 blur-3xl" />
      <div className="relative w-full max-w-md">
        <Reveal>
          <Card className="bg-card shadow-elevated border">
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
                    <Button asChild className="bg-gradient-brand shadow-glow border-0">
                      <Link to="/auth/reset-password">
                        Enter the code <ArrowRight className="ml-1.5 size-4" />
                      </Link>
                    </Button>
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
                  <h1 className="font-display mt-4 text-2xl font-extrabold">
                    Forgot your password?
                  </h1>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Enter your email and we'll send you a reset link.
                  </p>
                  <form
                    className="mt-6 space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                  >
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
                    <Button type="submit" className="bg-gradient-brand shadow-glow w-full border-0">
                      Send reset link <ArrowRight className="ml-1.5 size-4" />
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
