import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth.tsx";
import { Button, Field, Input, errorMessage } from "../components/ui.tsx";
import { apiFetch } from "../api/client.ts";

interface Bootstrap {
  needsOwner: boolean;
  business: { name: string; currencySymbol: string };
}

export function AuthPage({ mode }: { mode: "login" | "register" }) {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("DELGRA LTD");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [needsOwner, setNeedsOwner] = useState<boolean | null>(null);

  // On a brand-new workspace there is no account to sign into, so we send the
  // visitor to signup instead of showing a login form that can never succeed.
  useEffect(() => {
    let cancelled = false;
    apiFetch<Bootstrap>("/bootstrap")
      .then((result) => {
        if (cancelled) return;
        setNeedsOwner(result.needsOwner);
        if (result.business?.name) setBusinessName(result.business.name);
        if (result.needsOwner && mode === "login") navigate("/register", { replace: true });
      })
      .catch(() => {
        if (!cancelled) setNeedsOwner(false);
      });
    return () => {
      cancelled = true;
    };
  }, [mode, navigate]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "login") {
        await signIn(email, password);
      } else {
        await signUp({ businessName, name, email, password });
      }
      navigate("/", { replace: true });
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-900 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-lg font-bold text-white">
            DL
          </div>
          <h1 className="text-xl font-semibold text-white">Delgra Ledger</h1>
          <p className="text-sm text-brand-200">
            {mode === "login" ? "Sign in to manage invoices and waybills." : "Set up your business workspace."}
          </p>
        </div>

        <form onSubmit={onSubmit} className="card space-y-4 p-6">
          {needsOwner && mode === "register" && (
            <p className="rounded-lg bg-brand-50 px-3 py-2 text-sm text-brand-800">
              This is a fresh workspace — the first account becomes the owner.
            </p>
          )}

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
              {error}
            </p>
          )}

          {mode === "register" && (
            <>
              <Field label="Business name" htmlFor="businessName" required>
                <Input
                  id="businessName"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  autoComplete="organization"
                  required
                />
              </Field>
              <Field label="Your full name" htmlFor="name" required>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </Field>
            </>
          )}

          <Field label="Email" htmlFor="email" required>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </Field>

          <Field
            label="Password"
            htmlFor="password"
            required
            hint={mode === "register" ? "At least 10 characters." : undefined}
          >
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              minLength={mode === "register" ? 10 : undefined}
              required
            />
          </Field>

          <Button type="submit" loading={busy} className="w-full">
            {mode === "login" ? "Sign in" : "Create workspace"}
          </Button>

          <p className="text-center text-sm text-ink-500">
            {mode === "login" ? (
              <>
                No account yet?{" "}
                <Link to="/register" className="font-medium text-brand-700 hover:underline">
                  Set one up
                </Link>
              </>
            ) : (
              <>
                Already registered?{" "}
                <Link to="/login" className="font-medium text-brand-700 hover:underline">
                  Sign in
                </Link>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
