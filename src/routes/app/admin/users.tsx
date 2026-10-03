"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, ShieldCheck, UserCheck, UserPlus, Users } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import {
  useAdminUsers,
  useAdminUserItems,
  useProvisionUser,
  useUpdateUser,
} from "@/lib/query/admin";
import { useCreateInvitation } from "@/lib/query/invitations";
import type { AdminUser } from "@/lib/api/admin";
import { cn } from "@/lib/utils";

const ROLES = ["student", "instructor", "hr", "finance", "mentor", "admin", "employer"];
const STATUSES = ["active", "suspended"];

export const Route = createFileRoute("/app/admin/users")({
  head: () => ({
    meta: [
      { title: "User Management — CEA-OS" },
      { name: "description", content: "Accounts, access and status." },
    ],
  }),
  component: AdminUsers,
});

function statusTone(status: string): string {
  if (status === "Active") return "bg-success/10 text-success";
  if (status === "Suspended") return "bg-destructive/10 text-destructive";
  return "bg-warning/10 text-warning";
}

function AdminUsers() {
  const query = useAdminUsers();
  const rows = useAdminUserItems();
  const provision = useProvisionUser();
  const createInvite = useCreateInvitation();
  const [provisionOpen, setProvisionOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roleKey, setRoleKey] = useState("student");
  const [manageUser, setManageUser] = useState<AdminUser | null>(null);
  const [manageRole, setManageRole] = useState("");
  const [manageStatus, setManageStatus] = useState("");
  const update = useUpdateUser(manageUser?.id ?? "");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteStudentId, setInviteStudentId] = useState("");

  const submitProvision = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || provision.isPending) return;
    provision.mutate(
      { name: name.trim(), email: email.trim(), roleKey },
      {
        onSuccess: () => {
          setName("");
          setEmail("");
          setRoleKey("student");
          setProvisionOpen(false);
        },
      },
    );
  };

  const openManage = (u: AdminUser) => {
    setManageUser(u);
    setManageRole(u.role);
    setManageStatus(u.status);
  };

  const submitManage = () => {
    if (!manageUser) return;
    const roleKey = manageRole.toLowerCase();
    const status = manageStatus.toLowerCase();
    update.mutate(
      {
        ...(roleKey !== manageUser.role.toLowerCase() ? { roleKey } : {}),
        ...(status !== manageUser.status.toLowerCase() ? { status } : {}),
      },
      { onSuccess: () => setManageUser(null) },
    );
  };

  const active = rows.filter((u) => u.status === "Active").length;
  const pending = rows.filter((u) => u.status === "Invited").length;

  return (
    <AppShell
      roleKey="admin"
      title="User management"
      subtitle={`${rows.length} accounts · ${active} active`}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {pending} pending
          </Badge>
          <Button size="sm" onClick={() => setProvisionOpen(true)}>
            <UserPlus className="size-4" /> Provision user
          </Button>
          <Button size="sm" variant="outline" onClick={() => setInviteOpen(true)}>
            Invite guardian
          </Button>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/admin">
              <ArrowLeft className="size-4" /> Admin hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total users",
            value: String(rows.length),
            delta: "across system",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Active",
            value: String(active),
            delta: "seeded accounts",
            icon: UserCheck,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Roles",
            value: String(new Set(rows.map((u) => u.role)).size),
            delta: "distinct roles",
            icon: ShieldCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Pending invites",
            value: String(pending),
            delta: "awaiting sign-in",
            icon: UserPlus,
            tone: "bg-warning/10 text-warning",
          },
        ].map((k) => (
          <Card key={k.label} className="bg-card shadow-soft border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                  {k.label}
                </p>
                <span className={cn("grid size-8 place-items-center rounded-lg", k.tone)}>
                  <k.icon className="size-4" />
                </span>
              </div>
              <p className="font-display mt-3 text-2xl font-extrabold">{k.value}</p>
              <p className="text-muted-foreground mt-0.5 text-xs font-semibold">{k.delta}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Users className="text-primary size-4" /> Accounts
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<AdminUser[]> query={query} error={{ title: "Users unavailable" }}>
            {(users) => (
              <>
                {users.map((u) => (
                  <div
                    key={u.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-brand font-display text-xs font-extrabold text-white">
                      {u.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{u.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {u.email} · {u.role} · seen {u.lastSeen}
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", statusTone(u.status))}>
                      {u.status}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0 font-semibold"
                      onClick={() => openManage(u)}
                    >
                      Manage
                    </Button>
                  </div>
                ))}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
      <ProvisionDialog
        open={provisionOpen}
        onOpenChange={setProvisionOpen}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        roleKey={roleKey}
        setRoleKey={setRoleKey}
        onSubmit={submitProvision}
        isPending={provision.isPending}
      />
      <ManageUserDialog
        user={manageUser}
        open={manageUser !== null}
        onOpenChange={(open) => !open && setManageUser(null)}
        role={manageRole}
        setRole={setManageRole}
        status={manageStatus}
        setStatus={setManageStatus}
        onSubmit={submitManage}
        isPending={update.isPending}
      />
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite a guardian</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              value={inviteStudentId}
              onChange={(e) => setInviteStudentId(e.target.value)}
              placeholder="Student ID (e.g. 00000000-0000-4000-8000-000000000001)"
            />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setInviteOpen(false)} type="button">
              Cancel
            </Button>
            <Button
              disabled={createInvite.isPending || !inviteStudentId.trim()}
              onClick={() => {
                createInvite.mutate(
                  { studentId: inviteStudentId.trim(), guardianName: "Guardian" },
                  {
                    onSuccess: () => {
                      setInviteStudentId("");
                      setInviteOpen(false);
                    },
                  },
                );
              }}
            >
              Send invite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}

function ProvisionDialog({
  open,
  onOpenChange,
  name,
  setName,
  email,
  setEmail,
  roleKey,
  setRoleKey,
  onSubmit,
  isPending,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  setName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  roleKey: string;
  setRoleKey: (v: string) => void;
  onSubmit: (event: React.FormEvent) => void;
  isPending: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Provision a new user</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-3">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@cea.ng"
            type="email"
          />
          <select
            value={roleKey}
            onChange={(e) => setRoleKey(e.target.value)}
            className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !name.trim() || !email.trim()}>
              Provision
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ManageUserDialog({
  user,
  open,
  onOpenChange,
  role,
  setRole,
  status,
  setStatus,
  onSubmit,
  isPending,
}: {
  user: AdminUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: string;
  setRole: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  onSubmit: () => void;
  isPending: boolean;
}) {
  if (!user) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Manage {user.name} · {user.email}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <p className="text-muted-foreground mb-1 text-xs font-semibold">Role</p>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-muted-foreground mb-1 text-xs font-semibold">Status</p>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isPending}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
