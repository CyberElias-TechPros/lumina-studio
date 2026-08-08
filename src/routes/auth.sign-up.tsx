import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  HeartHandshake,
  Loader2,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/motion";
import { SceneArt } from "@/components/art/scene-art";
import { cn } from "@/lib/utils";
import { useSignUp } from "@/lib/auth/session";

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
  const [error, setError] = useState("");
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const signUp = useSignUp();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const name =
      `${firstNameRef.current?.value.trim() ?? ""} ${lastNameRef.current?.value.trim() ?? ""}`.trim();
    const email = emailRef.current?.value.trim() ?? "";
    const password = passwordRef.current?.value ?? "";
    signUp.mutate(
      { name, email, password, roleKey: role },
      {
        onSuccess: () => {
          const pendingInvite = sessionStorage.getItem("cea_pending_invite");
          sessionStorage.removeItem("cea_pending_invite");
          if (pendingInvite) {
            void navigate({
              to: "/app/parent/invitation/accept",
              search: { token: pendingInvite },
            });
          } else {
            void navigate({ to: "/app" });
          }
        },
        onError: (err) => {
          setError(err instanceof Error ? err.message : "Could not create your account.");
        },
      },
    );
  };

  return (
    <div className="bg-muted/40 relative grid min-h-screen place-items-center overflow-hidden px-4 py-16">
      <div className="bg-gradient-services absolute -top-32 -left-32 size-96 rounded-full opacity-10 blur-3xl" />
      <div className="bg-gradient-community absolute -right-32 -bottom-32 size-96 rounded-full opacity-10 blur-3xl" />

      <div className="relative w-full max-w-lg">
        <Reveal>
          <div className="relative mb-8 h-28 overflow-hidden rounded-2xl border sm:h-32">
            <SceneArt variant="graduate" labelled={false} />
          </div>
        </Reveal>
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

                <form className="mt-6 space-y-4" onSubmit={submit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="first">First name</Label>
                      <Input id="first" ref={firstNameRef} placeholder="First name" required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="last">Last name</Label>
                      <Input id="last" ref={lastNameRef} placeholder="Last name" required />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      ref={emailRef}
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      ref={passwordRef}
                      type="password"
                      placeholder="8+ characters"
                      required
                    />
                  </div>

                  {error && (
                    <p className="bg-error/10 text-error rounded-lg px-3 py-2 text-xs font-semibold">
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={signUp.isPending}
                    className="bg-gradient-brand shadow-glow w-full border-0"
                  >
                    {signUp.isPending && <Loader2 className="mr-1.5 size-4 animate-spin" />}
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
