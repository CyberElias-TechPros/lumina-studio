import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  BadgeCheck,
  Bell,
  Download,
  KeyRound,
  Loader2,
  MailWarning,
  MonitorSmartphone,
  ShieldCheck,
  Trash2,
  UserRound,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QueryState } from "@/components/ui/query-state";
import {
  useAccount,
  useChangePassword,
  useDeleteAccount,
  useExportAccountData,
  useUpdateAccount,
} from "@/lib/query/account";
import { useSessionRole } from "@/lib/auth/session";
import { ApiError } from "@/lib/errors";
import type { Account } from "@/lib/api/account";

export const Route = createFileRoute("/app/account")({
  head: () => ({
    meta: [
      { title: "Account & security — CEA-OS" },
      { name: "description", content: "Manage your profile, password, privacy and data." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AccountPage,
});

function errorText(err: unknown, fallback: string): string {
  return err instanceof ApiError || err instanceof Error ? err.message : fallback;
}

function AccountPage() {
  const role = useSessionRole();
  const query = useAccount();

  return (
    <AppShell roleKey={role} title="Account & security" subtitle="Profile · password · privacy">
      <QueryState<Account> query={query}>
        {(account) => (
          <div className="mx-auto grid max-w-4xl gap-6">
            <ProfileCard
              name={account.name}
              phone={account.phone}
              email={account.email}
              roleKey={account.roleKey}
              emailVerified={account.emailVerified}
            />
            <PasswordCard hasPassword={account.hasPassword} />
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShieldCheck className="size-4" /> Sign-in security
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-3 text-sm">
                <Badge
                  className={
                    account.mfaEnabled
                      ? "bg-success/10 text-success border-0"
                      : "bg-warning/10 text-warning border-0"
                  }
                >
                  Two-factor {account.mfaEnabled ? "on" : "off"}
                </Badge>
                <p className="text-muted-foreground flex-1">
                  Manage your authenticator app and sign out devices you don&apos;t recognise.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/auth/new-device">
                    <MonitorSmartphone className="mr-1.5 size-4" /> Devices &amp; two-factor
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link to="/app/notifications">
                    <Bell className="mr-1.5 size-4" /> Notification preferences
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <PrivacyCard hasPassword={account.hasPassword} mfaEnabled={account.mfaEnabled} />
          </div>
        )}
      </QueryState>
    </AppShell>
  );
}

function ProfileCard(props: {
  name: string;
  phone: string | null;
  email: string;
  roleKey: string;
  emailVerified: boolean;
}) {
  const [name, setName] = useState(props.name);
  const [phone, setPhone] = useState(props.phone ?? "");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const update = useUpdateAccount();
  useEffect(() => {
    setName(props.name);
    setPhone(props.phone ?? "");
  }, [props.name, props.phone]);

  const dirty = name.trim() !== props.name || phone.trim() !== (props.phone ?? "");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <UserRound className="size-4" /> Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            setMsg(null);
            update.mutate(
              { name: name.trim(), phone: phone.trim() || null },
              {
                onSuccess: () => setMsg({ ok: true, text: "Profile saved." }),
                onError: (err) => setMsg({ ok: false, text: errorText(err, "Could not save.") }),
              },
            );
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="acc-name">Full name</Label>
            <Input id="acc-name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="acc-phone">Phone</Label>
            <Input
              id="acc-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+234…"
              inputMode="tel"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Email</Label>
            <div className="flex items-center gap-2 text-sm">
              <span className="truncate">{props.email}</span>
              {props.emailVerified ? (
                <Badge className="bg-success/10 text-success border-0">
                  <BadgeCheck className="mr-1 size-3" /> Verified
                </Badge>
              ) : (
                <Link
                  to="/auth/verify-email"
                  className="text-warning inline-flex items-center gap-1 text-xs font-bold"
                >
                  <MailWarning className="size-3.5" /> Verify now
                </Link>
              )}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Role</Label>
            <p className="text-sm capitalize">{props.roleKey.replace(/-/g, " ")}</p>
          </div>
          <div className="flex items-center gap-3 sm:col-span-2">
            <Button type="submit" disabled={!dirty || update.isPending}>
              {update.isPending && <Loader2 className="mr-1.5 size-4 animate-spin" />}
              Save changes
            </Button>
            {msg && (
              <p className={msg.ok ? "text-success text-sm" : "text-error text-sm"}>{msg.text}</p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function PasswordCard({ hasPassword }: { hasPassword: boolean }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const change = useChangePassword();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <KeyRound className="size-4" /> {hasPassword ? "Change password" : "Set a password"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!hasPassword && (
          <p className="text-muted-foreground mb-4 text-sm">
            You sign in with email links. Add a password to sign in without waiting for an email.
          </p>
        )}
        <form
          className="grid gap-4 sm:grid-cols-3"
          onSubmit={(e) => {
            e.preventDefault();
            setMsg(null);
            if (next !== confirm) {
              setMsg({ ok: false, text: "The new passwords don't match." });
              return;
            }
            change.mutate(
              { currentPassword: hasPassword ? current : undefined, newPassword: next },
              {
                onSuccess: () => {
                  setCurrent("");
                  setNext("");
                  setConfirm("");
                  setMsg({ ok: true, text: "Password updated. Other devices were signed out." });
                },
                onError: (err) =>
                  setMsg({ ok: false, text: errorText(err, "Could not update password.") }),
              },
            );
          }}
        >
          {hasPassword && (
            <div className="space-y-1.5">
              <Label htmlFor="pw-current">Current password</Label>
              <Input
                id="pw-current"
                type="password"
                autoComplete="current-password"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                required
              />
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="pw-new">New password</Label>
            <Input
              id="pw-new"
              type="password"
              autoComplete="new-password"
              minLength={8}
              value={next}
              onChange={(e) => setNext(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pw-confirm">Confirm new password</Label>
            <Input
              id="pw-confirm"
              type="password"
              autoComplete="new-password"
              minLength={8}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center gap-3 sm:col-span-3">
            <Button type="submit" disabled={change.isPending || next.length < 8}>
              {change.isPending && <Loader2 className="mr-1.5 size-4 animate-spin" />}
              {hasPassword ? "Update password" : "Set password"}
            </Button>
            {msg && (
              <p className={msg.ok ? "text-success text-sm" : "text-error text-sm"}>{msg.text}</p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function PrivacyCard({ hasPassword, mfaEnabled }: { hasPassword: boolean; mfaEnabled: boolean }) {
  const exportData = useExportAccountData();
  const del = useDeleteAccount();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Download className="size-4" /> Your data &amp; privacy
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 text-sm">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-muted-foreground flex-1">
            Download a copy of the personal data CEA holds about you (profile, courses, grades,
            payments, certificates, sign-in history).
          </p>
          <Button
            variant="outline"
            onClick={() => exportData.mutate()}
            disabled={exportData.isPending}
          >
            {exportData.isPending ? (
              <Loader2 className="mr-1.5 size-4 animate-spin" />
            ) : (
              <Download className="mr-1.5 size-4" />
            )}
            Export my data
          </Button>
        </div>
        {exportData.isError && (
          <p className="text-error">{errorText(exportData.error, "Export failed.")}</p>
        )}
        <div className="border-error/30 flex flex-wrap items-center gap-3 rounded-lg border p-4">
          <p className="text-muted-foreground flex-1">
            Delete your account permanently. Your profile is erased and you&apos;re signed out
            everywhere. Payment and certificate records are kept without your contact details, as
            the law requires.{" "}
            <Link to="/privacy" className="underline">
              Privacy policy
            </Link>
          </p>
          <Button variant="destructive" onClick={() => setOpen(true)}>
            <Trash2 className="mr-1.5 size-4" /> Delete account
          </Button>
        </div>
      </CardContent>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete your account?</DialogTitle>
            <DialogDescription>
              This cannot be undone. Type <strong>DELETE</strong> to confirm.
            </DialogDescription>
          </DialogHeader>
          <form
            id="delete-account-form"
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              setError(null);
              del.mutate(
                {
                  confirm: "DELETE",
                  password: hasPassword ? password : undefined,
                  code: mfaEnabled ? code : undefined,
                },
                {
                  onSuccess: () => void navigate({ to: "/" }),
                  onError: (err) => setError(errorText(err, "Could not delete the account.")),
                },
              );
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="del-confirm">Confirmation</Label>
              <Input
                id="del-confirm"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="DELETE"
                autoComplete="off"
              />
            </div>
            {hasPassword && (
              <div className="space-y-1.5">
                <Label htmlFor="del-password">Password</Label>
                <Input
                  id="del-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            )}
            {mfaEnabled && (
              <div className="space-y-1.5">
                <Label htmlFor="del-code">Authenticator code</Label>
                <Input
                  id="del-code"
                  inputMode="numeric"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>
            )}
            {error && <p className="text-error text-sm">{error}</p>}
          </form>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              form="delete-account-form"
              variant="destructive"
              disabled={confirm !== "DELETE" || del.isPending}
            >
              {del.isPending && <Loader2 className="mr-1.5 size-4 animate-spin" />}
              Delete permanently
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
