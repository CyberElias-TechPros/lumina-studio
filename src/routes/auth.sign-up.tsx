import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useSignUp } from "@/lib/auth/session";

export const Route = createFileRoute("/auth/sign-up")({
  head: () => ({
    meta: [
      { title: "Create account — Cyber Elias Academy" },
      {
        name: "description",
        content: "Create a Cyber Elias Academy account.",
      },
    ],
  }),
  component: SignUpPage,
});

const roles = [
  { id: "student", label: "Student", desc: "Apply and take classes" },
  { id: "instructor", label: "Instructor", desc: "Teach at the centre" },
  { id: "employer", label: "Employer", desc: "Staff account" },
  { id: "partner", label: "Partner", desc: "Organisation contact" },
  { id: "alumni", label: "Alumni", desc: "Past student" },
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
    <div className="bg-muted/40 grid min-h-screen place-items-center px-4 py-16">
      <div className="w-full max-w-lg">
        <div className="mb-6 text-center">
          <Link
            to="/"
            className="bg-primary mx-auto grid size-11 place-items-center rounded-lg text-white"
          >
            <span className="font-display text-sm font-semibold">CE</span>
          </Link>
          <h1 className="font-display mt-4 text-2xl font-semibold">Create an account</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            For Cyber Elias Academy students and staff.
          </p>
        </div>

        <div className="border-border bg-card rounded-lg border p-6 sm:p-8">
          <Label>I am a</Label>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={cn(
                  "rounded-lg border p-3 text-left text-sm",
                  role === r.id ? "border-primary bg-primary/5" : "hover:border-primary/40",
                )}
              >
                <span className="block font-medium">{r.label}</span>
                <span className="text-muted-foreground block text-xs">{r.desc}</span>
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

            {error && <p className="text-error text-sm">{error}</p>}

            <Button type="submit" disabled={signUp.isPending} className="w-full">
              {signUp.isPending && <Loader2 className="mr-1.5 size-4 animate-spin" />}
              Create account
            </Button>
          </form>

          <p className="text-muted-foreground mt-4 text-center text-xs">
            By creating an account you agree to our{" "}
            <Link to="/terms" className="text-primary underline-offset-2 hover:underline">
              terms
            </Link>
            .
          </p>
        </div>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link to="/auth/sign-in" className="text-primary underline-offset-2 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
