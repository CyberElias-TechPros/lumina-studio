"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTurnstile } from "@/components/turnstile";
import { requestMagicLink } from "@/lib/api/auth";

/** Reuses verified email + HttpOnly sessions; reference numbers alone never reveal records. */
export function ApplicantAccess({
  reference,
  receipt = false,
}: {
  reference: string;
  receipt?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [devToken, setDevToken] = useState<string>();
  const turnstile = useTurnstile();
  const returnTo = `/apply/${receipt ? "receipt" : "status"}/${reference.toUpperCase()}`;
  return (
    <div className="space-y-4 rounded-xl border bg-card p-6">
      <h2 className="font-display text-lg font-bold">Open your private application</h2>
      <p className="text-muted-foreground text-sm">
        Use the email on your application. A one-time sign-in link verifies it; you do not need a
        password. A reference alone cannot reveal a receipt or payment details.
      </p>
      <form
        className="space-y-3"
        onSubmit={async (event) => {
          event.preventDefault();
          setBusy(true);
          setMessage("");
          try {
            const result = await requestMagicLink({
              email,
              returnTo,
              turnstileToken: turnstile.token,
            });
            if (result.sent === false)
              throw new Error(
                "We could not send the link. Please try again later or contact help@cea.ng. Do not submit or pay again.",
              );
            setMessage(
              "Check your inbox for a one-time link. It expires in 15 minutes. Open it to return to this application.",
            );
            if (process.env.NODE_ENV !== "production") setDevToken(result.devToken);
          } catch (error) {
            setMessage(error instanceof Error ? error.message : "Could not request the link.");
            turnstile.reset();
          } finally {
            setBusy(false);
          }
        }}
      >
        <Label htmlFor="applicant-email">Application email</Label>
        <Input
          id="applicant-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <turnstile.Widget />
        <Button disabled={busy || !turnstile.ready} type="submit">
          {busy ? "Requesting link…" : "Email me a secure sign-in link"}
        </Button>
      </form>
      {message && (
        <p className="text-sm" role="status">
          {message}
        </p>
      )}
      {devToken && (
        <a
          className="text-primary underline"
          href={`/auth/magic-link?token=${encodeURIComponent(devToken)}&returnTo=${encodeURIComponent(returnTo)}`}
        >
          Open development sign-in link
        </a>
      )}
      <p className="text-muted-foreground text-xs">
        Already signed in with another account?{" "}
        <a className="underline" href="/auth/sign-in">
          Sign in with your application email
        </a>
        . Never share a sign-in link.
      </p>
    </div>
  );
}
