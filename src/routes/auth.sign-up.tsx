import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auth/sign-up")({
  head: () => ({
    meta: [
      { title: "Create account — CEA-OS | Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Join CEA-OS as a student, instructor, employer or partner. One identity, five engines.",
      },
      { property: "og:title", content: "Create account — CEA-OS" },
      {
        property: "og:description",
        content: "Join CEA-OS — one identity for learning, career, services, ERP and community.",
      },
    ],
  }),
  component: SignUpPage,
});

const roles = [
  {
    id: "student",
    label: "Student / Applicant",
    icon: GraduationCap,
    desc: "Apply, learn and grow",
  },
  { id: "instructor", label: "Instructor", icon: UserRound, desc: "Teach and build courses" },
  { id: "employer", label: "Employer", icon: BriefcaseBusiness, desc: "Hire and post roles" },
  {
    id: "partner",
    label: "Partner / Client",
    icon: Building2,
    desc: "Services, ERP, sponsorships",
  },
  { id: "alumni", label: "Alumni", icon: HeartHandshake, desc: "Network and give back" },
];

function SignUpPage() {
  const [role, setRole] = useState("student");
  const [done, setDone] = useState(false);

  return (
    <div className="bg-muted/40 relative grid min-h-screen place-items-center overflow-hidden px-4 py-16">
      <div className="bg-gradient-services absolute -top-32 -left-32 size-96 rounded-full opacity-10 blur-3xl" />
      <div className="bg-gradient-community absolute -right-32 -bottom-32 size-96 rounded-full opacity-10 blur-3xl" />

      <div className="relative w-full max-w-lg">
        <Reveal>
          <div className="mb-6 text-center">
            <Link
              to="/"
              className="bg-gradient-brand shadow-glow mx-auto grid size-12 place-items-center rounded-2xl"
            >
              <span className="font-display text-lg font-extrabold text-white">CE</span>
            </Link>
            <h1 className="font-display mt-4 text-2xl font-extrabold">Create your account</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              One identity that follows you across every engine.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <Card className="bg-card shadow-elevated border">
            <CardContent className="p-6 sm:p-8">
              {done ? (
                <div className="text-center">
                  <span className="bg-success/10 text-success mx-auto grid size-14 place-items-center rounded-full">
                    <CheckCircle2 className="size-7" />
                  </span>
                  <h2 className="font-display mt-4 text-xl font-extrabold">Check your inbox</h2>
                  <p className="text-muted-foreground mt-2 text-sm">
                    We sent a verification link to your email. Confirm it to activate your{" "}
                    <strong className="text-foreground">
                      {roles.find((r) => r.id === role)?.label}
                    </strong>{" "}
                    account.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <Button asChild className="bg-gradient-brand shadow-glow border-0">
                      <Link to="/auth/verify-email">
                        I have a code <ArrowRight className="ml-1.5 size-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/auth/sign-in">Back to sign in</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <Label>I want to join as</Label>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {roles.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setRole(r.id)}
                        className={cn(
                          "flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all",
                          role === r.id
                            ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                            : "bg-background hover:border-primary/40",
                        )}
                      >
                        <span
                          className={cn(
                            "grid size-9 shrink-0 place-items-center rounded-lg",
                            role === r.id
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground",
                          )}
                        >
                          <r.icon className="size-4" />
                        </span>
                        <span>
                          <span className="block text-sm font-bold">{r.label}</span>
                          <span className="text-muted-foreground block text-xs">{r.desc}</span>
                        </span>
                      </button>
                    ))}
                  </div>

                  <form
                    className="mt-6 space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setDone(true);
                    }}
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="first">First name</Label>
                        <Input id="first" placeholder="First name" required />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="last">Last name</Label>
                        <Input id="last" placeholder="Last name" required />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email address</Label>
                      <Input id="email" type="email" placeholder="you@example.com" required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" placeholder="8+ characters" required />
                    </div>
                    <Button type="submit" className="bg-gradient-brand shadow-glow w-full border-0">
                      Create account <ArrowRight className="ml-1.5 size-4" />
                    </Button>
                  </form>

                  <p className="text-muted-foreground mt-4 text-center text-xs">
                    By creating an account you agree to our{" "}
                    <Link
                      to="/faq"
                      className="text-primary font-semibold underline-offset-2 hover:underline"
                    >
                      terms
                    </Link>
                    .
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-muted-foreground mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/auth/sign-in"
              className="text-primary font-bold underline-offset-2 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </Reveal>
      </div>
    </div>
  );
}
