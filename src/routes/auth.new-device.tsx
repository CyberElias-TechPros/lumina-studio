import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  CheckCircle2,
  Copy,
  KeyRound,
  Laptop,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/motion";
import {
  useDevices,
  useRevokeDevice,
  useMfaSetup,
  useMfaEnable,
  useMfaDisable,
} from "@/lib/auth/session";
import { useSessionUser } from "@/components/app/session-provider";
import { ApiError } from "@/lib/errors";

export const Route = createFileRoute("/auth/new-device")({
  head: () => ({
    meta: [
      { title: "Account security — Cyber Elias Academy" },
      {
        name: "description",
        content: "Manage your signed-in devices and two-factor authentication.",
      },
    ],
  }),
  component: SecurityPage,
});

function SecurityPage() {
  const navigate = useNavigate();
  const user = useSessionUser();
  const { data: devicesData, isPending } = useDevices();
  const revoke = useRevokeDevice();

  const [mfaSetupData, setMfaSetupData] = useState<{
    secret: string;
    otpauth: string;
    recoveryCodes: string[];
    enabled: boolean;
  } | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const setup = useMfaSetup();
  const enable = useMfaEnable();
  const disable = useMfaDisable();

  const isMfaEnabled = mfaSetupData?.enabled ?? false;

  const runMfaSetup = () => {
    setError(null);
    setup.mutate(undefined, {
      onSuccess: (data) => {
        setMfaSetupData(data);
        setNotice(
          "Scan the QR or enter the secret in your authenticator app, then confirm with a code.",
        );
      },
      onError: (err) => setError(err instanceof ApiError ? err.message : "MFA setup failed."),
    });
  };

  const runMfaEnable = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    enable.mutate(code.trim(), {
      onSuccess: () => {
        setMfaSetupData((prev) => (prev ? { ...prev, enabled: true } : prev));
        setCode("");
        setNotice("Two-factor authentication is now enabled.");
      },
      onError: (err) =>
        setError(err instanceof ApiError ? err.message : "That code didn't verify."),
    });
  };

  const runMfaDisable = () => {
    setError(null);
    disable.mutate(code.trim(), {
      onSuccess: () => {
        setMfaSetupData(null);
        setCode("");
        setNotice("Two-factor authentication is now off.");
      },
      onError: (err) =>
        setError(err instanceof ApiError ? err.message : "That code didn't verify."),
    });
  };

  const devices = devicesData?.items ?? [];

  return (
    <div className="bg-muted/40 grid min-h-screen place-items-center px-4 py-16">
      <div className="w-full max-w-lg">
        <Reveal>
          <Card className="bg-card border">
            <CardContent className="p-6 sm:p-8">
              <span className="bg-primary/10 text-primary mx-auto grid size-14 place-items-center rounded-full">
                <ShieldCheck className="size-7" />
              </span>
              <h1 className="font-display mt-4 text-center text-xl font-extrabold">
                Account security
              </h1>
              <p className="text-muted-foreground mt-2 text-center text-sm">
                {user?.email ?? "Signed in"} — manage your devices and two-factor authentication.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 rounded-xl border p-4">
                  <ShieldAlert className="text-primary size-5" />
                  <div className="flex-1">
                    <p className="text-sm font-bold">
                      Two-factor authentication{" "}
                      <span
                        className={
                          isMfaEnabled
                            ? "bg-success/10 text-success ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold"
                            : "bg-muted text-muted-foreground ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold"
                        }
                      >
                        {isMfaEnabled ? "On" : "Off"}
                      </span>
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {isMfaEnabled
                        ? "Sign-ins require a code from your authenticator app."
                        : "Add an authenticator app to protect your account."}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={runMfaSetup}
                    disabled={setup.isPending}
                  >
                    {setup.isPending ? "Generating…" : isMfaEnabled ? "Reconfigure" : "Set up"}
                  </Button>
                </div>

                {mfaSetupData && (
                  <div className="space-y-3 rounded-xl border p-4">
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div>
                        <Label className="text-[10px] tracking-wide uppercase">Secret</Label>
                        <div className="mt-1 flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
                          <code className="min-w-0 flex-1 truncate font-mono text-xs">
                            {mfaSetupData.secret}
                          </code>
                          <button
                            type="button"
                            onClick={() => {
                              void navigator.clipboard.writeText(mfaSetupData.secret);
                              setCopied("secret");
                              setTimeout(() => setCopied(null), 1500);
                            }}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Copy className="size-3.5" />
                          </button>
                        </div>
                      </div>
                      <div>
                        <Label className="text-[10px] tracking-wide uppercase">Recovery keys</Label>
                        <p className="text-muted-foreground mt-1 text-[11px] leading-snug">
                          Save these — each can be used once to get back in.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {mfaSetupData.recoveryCodes.map((rc) => (
                        <button
                          key={rc}
                          type="button"
                          onClick={() => {
                            void navigator.clipboard.writeText(rc);
                            setCopied(rc);
                            setTimeout(() => setCopied(null), 1500);
                          }}
                          className="rounded-md bg-muted px-2 py-1 font-mono text-[11px]"
                          title="Click to copy"
                        >
                          {copied === rc ? "Copied ✓" : rc}
                        </button>
                      ))}
                    </div>
                    {!isMfaEnabled && (
                      <form className="flex gap-2" onSubmit={runMfaEnable}>
                        <Input
                          placeholder="6-digit code"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          className="max-w-32 font-mono"
                          required
                        />
                        <Button type="submit" size="sm" disabled={enable.isPending}>
                          {enable.isPending ? "Confirming…" : "Confirm & enable"}
                        </Button>
                      </form>
                    )}
                    {isMfaEnabled && (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Current code to disable"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          className="max-w-40 font-mono"
                        />
                        <Button type="button" variant="outline" size="sm" onClick={runMfaDisable}>
                          Disable
                        </Button>
                      </div>
                    )}
                    <a
                      href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                        `Cyber Elias Academy recovery keys for ${user?.email ?? ""}\n\n${mfaSetupData.recoveryCodes.join("\n")}\n\nSecret: ${mfaSetupData.secret}\n`,
                      )}`}
                      download="cea-recovery-keys.txt"
                      className="text-primary text-xs font-semibold underline-offset-2 hover:underline"
                    >
                      Download recovery keys
                    </a>
                  </div>
                )}

                {notice && (
                  <p className="text-primary bg-primary/10 rounded-lg px-3 py-2 text-sm">
                    {notice}
                  </p>
                )}
                {error && (
                  <p className="text-error bg-error/10 rounded-lg px-3 py-2 text-sm">{error}</p>
                )}

                <div className="rounded-xl border p-4">
                  <div className="flex items-center gap-2">
                    <Laptop className="text-muted-foreground size-4" />
                    <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                      Signed-in devices ({devices.length})
                    </p>
                  </div>
                  {isPending ? (
                    <p className="text-muted-foreground mt-3 text-sm">Loading devices…</p>
                  ) : devices.length === 0 ? (
                    <p className="text-muted-foreground mt-3 text-sm">No active devices.</p>
                  ) : (
                    <div className="mt-3 space-y-2">
                      {devices.map((d) => (
                        <div key={d.id} className="flex items-center gap-3 rounded-lg border p-3">
                          <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                            <Smartphone className="size-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold">
                              {d.deviceLabel}
                              {d.current && (
                                <span className="bg-success/10 text-success ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold">
                                  This device
                                </span>
                              )}
                            </p>
                            <p className="text-muted-foreground flex items-center gap-1 text-xs">
                              <MapPin className="size-3" /> {d.ip || "unknown IP"} ·{" "}
                              {new Date(d.createdAt).toLocaleString()}
                            </p>
                          </div>
                          {!d.current && d.active && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => revoke.mutate(d.id)}
                              disabled={revoke.isPending}
                              className="text-error hover:text-error"
                            >
                              Revoke
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button asChild className="flex-1">
                  <Link to="/app">
                    Back to dashboard <CheckCircle2 className="ml-1.5 size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/app">
                    Done <KeyRound className="ml-1.5 size-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-muted-foreground mt-6 text-center text-xs">
            We will email you if a new device signs in.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
