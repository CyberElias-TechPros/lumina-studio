"use client";

import { useState } from "react";
import { CheckCircle2, ClipboardCopy } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProgramMeta } from "./meta";
import { TUITION_POLICY } from "@/data/academy/tuition-policy";

export function SuccessScreen({
  refCode,
  meta,
}: {
  refCode: string;
  meta: ProgramMeta | null;
  plan?: string;
  method?: string;
  phone?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="text-center">
        <CheckCircle2 className="text-success mx-auto size-12" />
        <h1 className="font-display mt-4 text-3xl font-bold">Application received</h1>
        <p className="text-muted-foreground mt-3">
          We have your request for {meta?.title ?? "your course"}. No payment is due yet, and this
          does not reserve a place.
        </p>
        <div className="mt-5 flex items-center justify-center gap-3 rounded-xl border p-4">
          <span className="font-mono font-bold">{refCode}</span>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Copy reference"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(refCode);
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
          >
            {copied ? <CheckCircle2 className="size-4" /> : <ClipboardCopy className="size-4" />}
          </Button>
        </div>
      </div>
      <div className="space-y-4 rounded-xl border bg-card p-6">
        <h2 className="font-display text-lg font-bold">A confirmed offer comes before payment</h2>
        <ol className="list-decimal space-y-3 pl-5 text-sm">
          <li>
            Keep your reference. Your application is saved even if a confirmation email does not
            arrive.
          </li>
          <li>
            Open your private status page using a sign-in link sent to your application email.
          </li>
          <li>
            Review the actual class dates, equipment/practice arrangements, fee and tuition terms.
            If no class is ready, your request stays interest-only.
          </li>
          <li>
            Only after accepting that offer should you pay. Verified payments, receipts, balances
            and learner access appear on the same page.
          </li>
        </ol>
        <p className="text-muted-foreground text-sm">{TUITION_POLICY.support}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild>
          <a href={`/apply/status/${refCode}`}>Open my application</a>
        </Button>
        <Button asChild variant="outline">
          <a href="/classes">Explore free class notes</a>
        </Button>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        Need help with an unusual case?{" "}
        <a
          className="text-primary underline"
          href={`https://wa.me/2349058628386?text=${encodeURIComponent(`Hello CEA, I need help with application ${refCode}.`)}`}
        >
          WhatsApp CEA
        </a>
        .
      </p>
    </div>
  );
}
