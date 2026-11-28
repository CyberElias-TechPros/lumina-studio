"use client";

import { useMemo, useState } from "react";
import { Check, Dices, Eye, EyeOff, ShieldCheck, ShieldAlert, ShieldX, X } from "lucide-react";
import { cn } from "@/lib/utils";

/** A small sample of passwords that appear on every leaked-password list. */
const COMMON = new Set(
  [
    "password",
    "password1",
    "123456",
    "12345678",
    "123456789",
    "qwerty",
    "qwerty123",
    "abc123",
    "letmein",
    "monkey",
    "dragon",
    "iloveyou",
    "1234567",
    "111111",
    "123123",
    "admin",
    "welcome",
    "login",
    "starwars",
    "shadow",
    "sunshine",
    "ashley",
    "michael",
    "ninja",
    "mustang",
    "password123",
    "qwertyuiop",
    "1q2w3e4r",
    "passw0rd",
    "nigeria",
    "lagos",
    "cea",
  ].map((p) => p.toLowerCase()),
);

function poolSize(pw: string) {
  let pool = 0;
  if (/[a-z]/.test(pw)) pool += 26;
  if (/[A-Z]/.test(pw)) pool += 26;
  if (/[0-9]/.test(pw)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) pool += 33;
  return pool || 1;
}

function formatDuration(seconds: number) {
  if (!Number.isFinite(seconds)) return "forever";
  if (seconds < 1) return "instantly";
  const minute = 60,
    hour = 3600,
    day = 86400,
    year = 31557600;
  if (seconds < minute) return `${Math.round(seconds)}s`;
  if (seconds < hour) return `${Math.round(seconds / minute)}m`;
  if (seconds < day) return `${Math.round(seconds / hour)}h`;
  if (seconds < year) return `${Math.round(seconds / day)} days`;
  const years = seconds / year;
  if (years < 1e3) return `${Math.round(years)} years`;
  if (years < 1e6) return `${Math.round(years / 1e3)}k years`;
  if (years < 1e9) return `${Math.round(years / 1e6)}m years`;
  return `${Math.round(years / 1e9)}bn years`;
}

export function PasswordStrength() {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const analysis = useMemo(() => {
    const pw = password;
    const pool = poolSize(pw);
    const entropy = pw.length * Math.log2(pool);
    // Assume an offline attacker doing 1e11 guesses per second.
    const crackSeconds = Math.pow(pool, pw.length) / 2 / 1e11;

    const checks = [
      { id: "length", label: "At least 12 characters", pass: pw.length >= 12 },
      {
        id: "case",
        label: "Upper + lower case letters",
        pass: /[a-z]/.test(pw) && /[A-Z]/.test(pw),
      },
      { id: "digit", label: "Contains a digit", pass: /[0-9]/.test(pw) },
      { id: "symbol", label: "Contains a symbol (!, @, #…)", pass: /[^a-zA-Z0-9]/.test(pw) },
      { id: "common", label: "Not a common leaked password", pass: !COMMON.has(pw.toLowerCase()) },
      {
        id: "sequence",
        label: "No obvious sequences (abc, 123)",
        pass: !/(?:abc|bcd|cde|def|efg|123|234|345|456|567|678|789|qwe|wer|ert|asd|sdf)/i.test(pw),
      },
      { id: "repeat", label: "No character repeated 3× in a row", pass: !/(.)\1\1/.test(pw) },
    ];
    const passed = checks.filter((c) => c.pass).length;

    let score = 0;
    if (entropy >= 28) score = 1;
    if (entropy >= 48) score = 2;
    if (entropy >= 64) score = 3;
    if (entropy >= 80 && passed >= 6) score = 4;
    if (!pw) score = 0;

    const labels = ["Nothing yet", "Very weak", "Weak", "Strong", "Excellent"];
    const tones = [
      { bar: "bg-muted", text: "text-muted-foreground", Icon: ShieldAlert },
      { bar: "bg-[#f87171]", text: "text-[#f87171]", Icon: ShieldX },
      { bar: "bg-[#fbbf24]", text: "text-[#fbbf24]", Icon: ShieldAlert },
      { bar: "bg-[#34d399]", text: "text-[#34d399]", Icon: ShieldCheck },
      { bar: "bg-[#2f6bff]", text: "text-[#8ec4ff]", Icon: ShieldCheck },
    ];

    return { entropy, crackSeconds, checks, passed, score, ...tones[score], label: labels[score] };
  }, [password]);

  const generate = () => {
    const alphabet = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789!@#$%^&*-_=+?";
    const bytes = new Uint32Array(18);
    crypto.getRandomValues(bytes);
    const next = [...bytes].map((b) => alphabet[b % alphabet.length]).join("");
    setPassword(next);
    setVisible(true);
  };

  return (
    <div className="border-foreground/10 bg-card overflow-hidden rounded-xl border">
      <div className="border-foreground/10 border-b px-4 py-3 sm:px-6">
        <p className="text-muted-foreground font-mono text-[9px] tracking-[0.24em] uppercase">
          Checked locally — your password never leaves this page
        </p>
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <label htmlFor="pw-input" className="sr-only">
              Password to check
            </label>
            <input
              id="pw-input"
              type={visible ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Type a password…"
              autoComplete="new-password"
              spellCheck={false}
              autoCapitalize="off"
              className="border-foreground/12 bg-foreground/[0.03] placeholder:text-muted-foreground/60 h-14 w-full rounded-xl border pr-14 pl-4 font-mono text-base tracking-wide outline-none transition-shadow focus:ring-2 focus:ring-[color-mix(in_oklab,var(--primary-glow)_55%,transparent)]"
            />
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              aria-label={visible ? "Hide password" : "Show password"}
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 grid size-9 -translate-y-1/2 cursor-pointer place-items-center rounded-lg transition-colors"
            >
              {visible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>
          <button
            type="button"
            onClick={generate}
            className="border-foreground/15 bg-foreground/[0.04] hover:bg-foreground/[0.08] inline-flex h-14 cursor-pointer items-center justify-center gap-2 rounded-xl border px-5 text-sm font-semibold transition-colors"
          >
            <Dices className="size-4.5" />
            Generate strong
          </button>
        </div>

        {/* Meter */}
        <div className="mt-6">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <analysis.Icon className={cn("size-5", analysis.text)} aria-hidden="true" />
              <span className={analysis.text}>{analysis.label}</span>
            </span>
            <span className="text-muted-foreground font-mono text-[10px] tracking-[0.18em] uppercase tabular-nums">
              {password ? `${Math.round(analysis.entropy)} bits of entropy` : "—"}
            </span>
          </div>
          <div
            className="bg-foreground/8 mt-2 grid h-2.5 grid-cols-4 gap-1.5 overflow-hidden rounded-full"
            role="meter"
            aria-valuemin={0}
            aria-valuemax={4}
            aria-valuenow={analysis.score}
            aria-label="Password strength"
          >
            {[1, 2, 3, 4].map((segment) => (
              <div
                key={segment}
                className={cn(
                  "h-full rounded-full transition-colors duration-300",
                  analysis.score >= segment ? analysis.bar : "bg-transparent",
                )}
              />
            ))}
          </div>
          <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
            {password ? (
              <>
                Estimated time to crack offline:{" "}
                <strong className="text-foreground">{formatDuration(analysis.crackSeconds)}</strong>{" "}
                (at 100 billion guesses per second).
              </>
            ) : (
              "Type above or generate a strong password — nothing is sent anywhere."
            )}
          </p>
        </div>

        {/* Checklist */}
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {analysis.checks.map((check) => (
            <li key={check.id} className="flex items-start gap-2.5 text-sm leading-snug">
              {check.pass ? (
                <Check className="text-success mt-0.5 size-4 shrink-0" strokeWidth={3} />
              ) : (
                <X className="mt-0.5 size-4 shrink-0 text-[#f87171]/70" strokeWidth={3} />
              )}
              <span className={check.pass ? "text-foreground" : "text-muted-foreground"}>
                {check.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
