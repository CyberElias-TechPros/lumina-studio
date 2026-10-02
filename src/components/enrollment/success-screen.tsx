import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  CalendarPlus,
  CheckCircle2,
  ClipboardCopy,
  Clock3,
  Loader2,
  Mail,
  MessageCircle,
  PartyPopper,
  Receipt,
  Landmark,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  startEnrollmentPayment,
  verifyEnrollmentPayment,
  formatNaira,
  reportBankTransfer,
} from "@/lib/api/enrollments";
import { ApiError } from "@/lib/errors";
import { cn } from "@/lib/utils";
import { feeFor, formatFee, type ProgramMeta } from "./meta";

interface SuccessScreenProps {
  refCode: string;
  meta: ProgramMeta | null;
  plan: string;
  method: string;
  phone: string;
  /** Set when returning from the Paystack redirect (auto-verify on load). */
  payReference?: string;
  onPaidState?: (status: "unpaid" | "deposit_paid" | "paid") => void;
}

const ACADEMY_WA = "2349058628386";

/** ICS invite for the long-form cohort start (first class day). */
function cohortIcsHref(title: string): string {
  // 2 Nov 2026 10:00 WAT (UTC+1) = 09:00 UTC.
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Cyber Elias Academy//Enrollment//EN",
    "BEGIN:VEVENT",
    `UID:cea-${title.toLowerCase().replace(/\s+/g, "-")}@cea.ng`,
    "DTSTAMP:20260925T000000Z",
    "DTSTART:20261102T090000Z",
    "DTEND:20261102T110000Z",
    `SUMMARY:${title} — first class day (Cyber Elias Academy)`,
    "LOCATION:24/26 Ebony Road\\, Off Rumuola Road\\, Port Harcourt",
    "DESCRIPTION:Arrive 10 minutes early. Bring your laptop and a notebook.",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}

export function SuccessScreen({
  refCode,
  meta,
  plan,
  method,
  phone,
  payReference,
  onPaidState,
}: SuccessScreenProps) {
  const [payState, setPayState] = useState<
    | { status: "idle" }
    | { status: "starting" }
    | { status: "checking" }
    | { status: "paid"; amount: number }
    | { status: "pending" }
    | { status: "error"; message: string }
  >({ status: "idle" });
  const [copied, setCopied] = useState(false);

  const { due } = meta ? feeFor(meta, plan) : { due: 0 };
  const deposit =
    meta && (plan === "50-50" || plan === "deposit-monthly")
      ? meta.kind === "short"
        ? Math.round(meta.fee / 2)
        : Math.round(meta.fee * 0.3)
      : null;

  const verifiedRef = useRef<string | null>(null);
  useEffect(() => {
    if (payReference && verifiedRef.current !== payReference) {
      verifiedRef.current = payReference;
      void checkPayment(payReference);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payReference]);

  async function copyRef() {
    try {
      await navigator.clipboard.writeText(refCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  async function pay(kind: "deposit" | "full") {
    setPayState({ status: "starting" });
    try {
      const session = await startEnrollmentPayment(refCode, kind);
      // Production: Paystack hosted checkout. Mock: our own pay-return page,
      // which simulates a completed payment on verify.
      window.location.assign(session.authorizationUrl);
    } catch (err) {
      setPayState({
        status: "error",
        message:
          err instanceof ApiError
            ? err.message
            : "We could not start the payment. Try again or contact us on WhatsApp.",
      });
    }
  }

  async function checkPayment(reference: string) {
    setPayState({ status: "checking" });
    try {
      const result = await verifyEnrollmentPayment(refCode, reference);
      if (result.status === "success" || result.enrollmentPaymentStatus !== "unpaid") {
        const full = result.enrollmentPaymentStatus === "paid";
        setPayState({ status: "paid", amount: result.amount });
        onPaidState?.(full ? "paid" : "deposit_paid");
      } else if (result.status === "failed") {
        setPayState({
          status: "error",
          message: "That payment did not go through. You can try again.",
        });
      } else {
        setPayState({ status: "pending" });
      }
    } catch (err) {
      setPayState({
        status: "error",
        message: err instanceof ApiError ? err.message : "Could not verify the payment right now.",
      });
    }
  }

  const waText = encodeURIComponent(
    `Hello Cyber Elias Academy! I just registered for ${meta?.title ?? "a course"} (ref ${refCode}).`,
  );
  const waPersonal = phone
    ? `https://wa.me/${ACADEMY_WA}?text=${waText}&contact=${phone.replace(/\D/g, "")}`
    : `https://wa.me/${ACADEMY_WA}?text=${waText}`;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="text-center">
        <span className="bg-success/10 text-success mx-auto grid size-14 place-items-center rounded-full">
          <PartyPopper className="size-7" />
        </span>
        <h1 className="font-display mt-5 text-2xl font-extrabold sm:text-3xl">
          You&rsquo;re in — see you soon!
        </h1>
        <p className="text-muted-foreground mx-auto mt-3 max-w-md text-sm leading-relaxed">
          Your registration for{" "}
          <strong className="text-foreground">{meta?.title ?? "your course"}</strong> is in. A
          confirmation email is on its way — and a person will call or WhatsApp you within 24
          working hours.
        </p>
        <div className="bg-muted mx-auto mt-6 inline-flex items-center gap-3 rounded-xl border px-5 py-3">
          <p className="text-muted-foreground text-sm">Your reference</p>
          <p className="font-mono text-base font-bold tracking-widest">{refCode}</p>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={copyRef}
            aria-label="Copy reference"
          >
            {copied ? (
              <CheckCircle2 className="text-success size-4" />
            ) : (
              <ClipboardCopy className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Payment card */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <p className="font-display flex items-center gap-2 text-base font-bold">
            <Wallet className="text-primary size-4.5" />
            {method === "bank-transfer" ? "Pay by bank transfer" : "Pay to confirm your seat"}
          </p>

          {payState.status === "checking" && (
            <p className="text-muted-foreground mt-4 flex items-center gap-2 text-sm">
              <Loader2 className="text-primary size-4 animate-spin" /> Checking your payment…
            </p>
          )}

          {payState.status === "paid" && (
            <div className="mt-4 rounded-lg bg-success/10 px-4 py-3">
              <p className="text-success flex items-center gap-2 text-sm font-bold">
                <BadgeCheck className="size-4.5" /> Payment confirmed
                {payState.amount ? ` — ${formatNaira(payState.amount)}` : ""}
              </p>
              <p className="text-success/90 mt-1 text-xs">
                Receipt sent to your email. Your seat is held.
              </p>
            </div>
          )}

          {payState.status === "pending" && (
            <div className="mt-4 rounded-lg bg-warning/10 px-4 py-3">
              <p className="text-warning flex items-center gap-2 text-sm font-bold">
                <Clock3 className="size-4.5" /> Payment in progress
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                We usually confirm within a minute. Keep this page open — or track it any time with
                your reference.
              </p>
            </div>
          )}

          {(payState.status === "idle" ||
            payState.status === "starting" ||
            payState.status === "error") && (
            <>
              {payState.status === "error" && (
                <p className="text-error mt-3 text-sm">{payState.message}</p>
              )}
              {method === "paystack" ? (
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {deposit !== null && (
                    <Button
                      onClick={() => pay("deposit")}
                      disabled={payState.status === "starting"}
                      className="h-11 font-semibold"
                    >
                      {payState.status === "starting" ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Wallet className="size-4" />
                      )}{" "}
                      Pay {formatFee(deposit)} deposit
                    </Button>
                  )}
                  <Button
                    onClick={() => pay("full")}
                    disabled={payState.status === "starting"}
                    variant={deposit !== null ? "outline" : "default"}
                    className={cn(
                      "h-11 font-semibold",
                      deposit !== null && "border-primary/40 text-primary",
                    )}
                  >
                    Pay {formatFee(due)} in full
                    {meta?.kind === "long" && plan === "full-10-off" ? " (10% off applied)" : ""}
                  </Button>
                </div>
              ) : (
                <BankTransferForm refCode={refCode} deposit={deposit} due={due} />
              )}
              <p className="text-muted-foreground mt-3 text-xs">
                Prefer to pay later? No problem — your details are safe. Use{" "}
                <a
                  href={`/apply/status/${refCode}`}
                  className="text-primary font-semibold underline-offset-2 hover:underline"
                >
                  track my application
                </a>{" "}
                to pay any time with your reference.
              </p>
            </>
          )}
        </CardContent>
      </Card>

      {/* What happens next */}
      <Card className="mt-4">
        <CardContent className="p-6">
          <p className="font-display flex items-center gap-2 text-base font-bold">
            <Mail className="text-primary size-4.5" /> What happens next
          </p>
          <ol className="mt-4 space-y-4">
            {[
              {
                icon: Mail,
                title: "Confirmation (instant)",
                desc: "Email with your reference, fee summary and this payment link. Save your reference — it unlocks everything.",
              },
              {
                icon: MessageCircle,
                title: "We reach out (within 24 working hours)",
                desc: "A call or WhatsApp to confirm your dates, answer questions and note anything we should know before day one.",
              },
              {
                icon: Receipt,
                title: "Seat confirmed on payment",
                desc: "Pay the deposit (or full fee) — your seat is held and a receipt is sent automatically by email and WhatsApp.",
              },
              {
                icon: CalendarPlus,
                title: "Welcome pack before day one",
                desc: "Class schedule, what to bring, room/location details and every class note — published online from week one.",
              },
            ].map((s, i) => (
              <li key={s.title} className="flex gap-3">
                <span className="bg-primary/10 text-primary grid size-8 shrink-0 place-items-center rounded-full">
                  <s.icon className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-bold">
                    {i + 1}. {s.title}
                  </p>
                  <p className="text-muted-foreground mt-0.5 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          {meta?.kind === "long" && (
            <a
              href={cohortIcsHref(meta.title)}
              download={`${meta.slug}-first-class.ics`}
              className="text-primary mt-4 inline-flex items-center gap-1.5 text-xs font-semibold underline-offset-2 hover:underline"
            >
              <CalendarPlus className="size-3.5" /> Add first class day (Mon 2 Nov 2026, 10:00) to
              your calendar
            </a>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <a href={waPersonal}>
            <MessageCircle className="size-4.5" /> Chat with us on WhatsApp
          </a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href={`/apply/status/${refCode}`}>
            <BadgeCheck className="size-4.5" /> Track my application
          </a>
        </Button>
        <Button asChild size="lg" variant="ghost">
          <Link to="/classes">Browse all courses</Link>
        </Button>
      </div>
    </div>
  );
}

/**
 * Bank-transfer instructions + proof report.
 *
 * The account is public and fixed (UBA), and every report lands in a review
 * queue — a student saying "I paid" never marks money as received by itself.
 */
function BankTransferForm({
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
