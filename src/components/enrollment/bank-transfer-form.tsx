import { useState } from "react";
import { BadgeCheck, CheckCircle2, ClipboardCopy, Landmark, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatNaira } from "@/lib/api/enrollments";
import { reportBankTransfer } from "@/lib/api/enrollments";
import { ApiError } from "@/lib/errors";
import { cn } from "@/lib/utils";
import { formatFee } from "./meta";

export const ACADEMY_ACCOUNT = {
  name: "Cyber Elias Academy Ltd",
  bank: "UBA",
  number: "1028649972",
} as const;

/**
 * Bank-transfer instructions + proof report.
 *
 * The account is public and fixed (UBA), and every report lands in a review
 * queue — a student saying "I paid" never marks money as received by itself.
 */
export function BankTransferForm({
  refCode,
  deposit,
  due,
}: {
  refCode: string;
  deposit: number | null;
  due: number;
}) {
  const [kind, setKind] = useState<"deposit" | "full">(deposit !== null ? "deposit" : "full");
  const [amount, setAmount] = useState(String(deposit ?? due));
  const [senderName, setSenderName] = useState("");
  const [bankReference, setBankReference] = useState("");
  const [paidOn, setPaidOn] = useState(() => new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  async function copyAccount() {
    try {
      await navigator.clipboard.writeText("1028649972");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setMessage("");
    try {
      const result = await reportBankTransfer(refCode, {
        kind,
        amount: Number(amount),
        senderName,
        bankReference: bankReference || undefined,
        paidOn: paidOn || undefined,
        note: note || undefined,
      });
      setState("done");
      setMessage(result.message);
    } catch (err) {
      setState("error");
      setMessage(
        err instanceof ApiError
          ? err.message
          : "Could not save that just now — please try again or WhatsApp us.",
      );
    }
  }

  const inputClass =
    "border-input bg-background focus-visible:ring-ring w-full rounded-lg border px-3 py-2 text-sm focus-visible:ring-1 focus-visible:outline-none";

  return (
    <div className="mt-4 space-y-3">
      <div className="border-primary/25 bg-primary/5 rounded-lg border px-4 py-3 text-sm leading-relaxed">
        <p className="font-semibold">Transfer to</p>
        <dl className="mt-2 grid gap-1 text-xs">
          <div className="flex justify-between gap-3">
            <dt className="text-muted-foreground">Account name</dt>
            <dd className="text-right font-semibold">Cyber Elias Academy Ltd</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted-foreground">Bank</dt>
            <dd className="text-right font-semibold">UBA</dd>
          </div>
          <div className="flex items-center justify-end gap-2">
            <dt className="text-muted-foreground mr-auto">Account number</dt>
            <dd className="font-mono font-bold tracking-wide">1028649972</dd>
            <button
              type="button"
              onClick={() => void copyAccount()}
              aria-label="Copy account number"
              className="text-primary hover:bg-primary/10 grid size-6 place-items-center rounded"
            >
              {copied ? (
                <CheckCircle2 className="size-3.5" />
              ) : (
                <ClipboardCopy className="size-3.5" />
              )}
            </button>
          </div>
        </dl>
        <p className="text-muted-foreground mt-2 text-xs">
          Use <span className="font-mono font-semibold">{refCode}</span> as the transfer
          description/narration, then report it below so finance can match it the same day.
        </p>
      </div>

      {state === "done" ? (
        <div className="rounded-lg bg-success/10 px-4 py-3">
          <p className="text-success flex items-center gap-2 text-sm font-bold">
            <BadgeCheck className="size-4.5" /> Transfer reported
          </p>
          <p className="text-success/90 mt-1 text-xs">{message}</p>
          <p className="text-muted-foreground mt-2 text-xs">
            Track progress any time with{" "}
            <a
              href={`/apply/status/${refCode}`}
              className="text-primary font-semibold underline-offset-2 hover:underline"
            >
              your status page
            </a>
            .
          </p>
        </div>
      ) : (
        <form onSubmit={(e) => void submit(e)} className="space-y-2.5">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <Landmark className="text-primary size-4" /> Already sent the transfer? Tell us
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            <label className="text-xs font-medium">
              What did you send?
              <select
                value={kind}
                onChange={(e) => {
                  const next = e.target.value === "deposit" ? "deposit" : "full";
                  setKind(next);
                  setAmount(String(next === "deposit" ? (deposit ?? due) : due));
                }}
                className={cn(inputClass, "mt-1")}
              >
                {deposit !== null && (
                  <option value="deposit">Deposit — {formatFee(deposit)}</option>
                )}
                <option value="full">Full payment — {formatFee(due)}</option>
              </select>
            </label>
            <label className="text-xs font-medium">
              Amount sent (₦)
              <input
                type="number"
                min={1}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className={cn(inputClass, "mt-1")}
              />
            </label>
            <label className="text-xs font-medium sm:col-span-2">
              Name on the transfer
              <input
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                required
                maxLength={80}
                placeholder="As it appears on the receipt"
                className={cn(inputClass, "mt-1")}
              />
            </label>
            <label className="text-xs font-medium">
              Bank reference / teller no. (optional)
              <input
                value={bankReference}
                onChange={(e) => setBankReference(e.target.value)}
                maxLength={80}
                className={cn(inputClass, "mt-1")}
              />
            </label>
            <label className="text-xs font-medium">
              Date sent
              <input
                type="date"
                value={paidOn}
                onChange={(e) => setPaidOn(e.target.value)}
                className={cn(inputClass, "mt-1")}
              />
            </label>
            <label className="text-xs font-medium sm:col-span-2">
              Anything finance should know? (optional)
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={300}
                placeholder="e.g. sent from my brother's GTBank account"
                className={cn(inputClass, "mt-1")}
              />
            </label>
          </div>
          {state === "error" && <p className="text-error text-xs">{message}</p>}
          <Button
            type="submit"
            disabled={state === "sending"}
            className="h-10 w-full font-semibold"
          >
            {state === "sending" && <Loader2 className="size-4 animate-spin" />}
            Report my transfer
          </Button>
          <p className="text-muted-foreground text-[11px]">
            We never count a transfer as paid until finance confirms it against the bank statement.
            Your seat is held meanwhile.
          </p>
        </form>
      )}
    </div>
  );
}
