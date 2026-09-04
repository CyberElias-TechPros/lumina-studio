import { useState } from "react";
import { UserPlus } from "lucide-react";
import { PageHeader } from "../components/Layout.tsx";
import { Badge, Button, Card, ErrorState, Field, Input, Modal, Select, Spinner, Table, Td, useToast } from "../components/ui.tsx";
import { invalidateAll, useApiMutation, useUsers } from "../api/hooks.ts";
import { useAuth } from "../lib/auth.tsx";
import { formatDateTime, titleCase } from "../lib/money.ts";
import type { Role } from "../api/types.ts";

const ROLES: Role[] = ["owner", "manager", "staff", "viewer"];

const ROLE_HELP: Record<Role, string> = {
  owner: "Full control, including team and settings.",
  manager: "Everything except team and settings. Can void and delete.",
  staff: "Day-to-day records. Cannot void, delete, or export.",
  viewer: "Read-only. Useful for an accountant.",
};

export function TeamPage() {
  const { data, isLoading, error, refetch } = useUsers();
  const { user: me } = useAuth();
  const toast = useToast();
  const [creating, setCreating] = useState(false);
  const [tempPassword, setTempPassword] = useState<string | null>(null);

  const update = useApiMutation<Record<string, unknown>, unknown>({
    path: (body) => `/users/${(body as { id: string }).id}`,
    method: "PATCH",
    invalidate: invalidateAll,
  });

  return (
    <>
      <PageHeader title="Team" description="Roles are enforced by the API on every request, not just hidden here."
        actions={<Button onClick={() => setCreating(true)}><UserPlus className="h-4 w-4" aria-hidden />Add person</Button>} />

      <Card>
        {isLoading ? <Spinner label="Loading team" /> : error ? (
          <ErrorState error={error} onRetry={() => void refetch()} />
        ) : (
          <Table head={["Name", "Email", "Role", "Last sign-in", "Sessions", "Status", ""]}>
            {data!.data.map((person) => (
              <tr key={person.id} className="hover:bg-ink-50">
                <Td className="font-medium">
                  {person.name}
                  {person.id === me?.id && <span className="ml-1 text-xs text-ink-500">(you)</span>}
                </Td>
                <Td className="text-ink-600">{person.email}</Td>
                <Td>
                  <Select
                    value={person.role}
                    disabled={person.id === me?.id}
                    aria-label={`Role for ${person.name}`}
                    className="w-32"
                    onChange={(e) =>
                      update.mutate(
                        { id: person.id, role: e.target.value },
                        {
                          onSuccess: () => toast.push("success", `${person.name} is now ${e.target.value}.`),
                          onError: (err) => toast.push("error", err instanceof Error ? err.message : "Could not change role."),
                        },
                      )
                    }
                  >
                    {ROLES.map((role) => (<option key={role} value={role}>{titleCase(role)}</option>))}
                  </Select>
                </Td>
                <Td className="text-ink-600 whitespace-nowrap">{formatDateTime(person.lastLoginAt)}</Td>
                <Td className="tnum">{person.activeSessions}</Td>
                <Td>
                  <Badge tone={person.isActive ? "green" : "neutral"}>
                    {person.isActive ? (person.mustChangePassword ? "Password reset due" : "Active") : "Disabled"}
                  </Badge>
                </Td>
                <Td className="text-right">
                  {person.id !== me?.id && (
                    <button
                      type="button"
                      className="text-sm font-medium text-red-700 hover:underline"
                      onClick={() =>
                        update.mutate(
                          { id: person.id, isActive: !person.isActive },
                          {
                            onSuccess: () => toast.push("success", person.isActive ? "Access removed." : "Access restored."),
                            onError: (err) => toast.push("error", err instanceof Error ? err.message : "Could not update."),
                          },
                        )
                      }
                    >
                      {person.isActive ? "Disable" : "Re-enable"}
                    </button>
                  )}
                </Td>
              </tr>
            ))}
          </Table>
        )}
      </Card>

      <Modal open={creating} onClose={() => setCreating(false)} title="Add a person">
        <UserForm onDone={(password) => { setCreating(false); if (password) setTempPassword(password); }} />
      </Modal>

      <Modal open={tempPassword !== null} onClose={() => setTempPassword(null)} title="Temporary password">
        <p className="mb-2 text-sm text-ink-600">
          Share this once — it will not be shown again. They will be asked to change it at first sign-in.
        </p>
        <Input readOnly value={tempPassword ?? ""} onFocus={(e) => e.currentTarget.select()} className="font-mono" />
        <Button className="mt-3 w-full" onClick={() => { void navigator.clipboard.writeText(tempPassword ?? ""); toast.push("success", "Copied."); }}>
          Copy password
        </Button>
      </Modal>
    </>
  );
}

function UserForm({ onDone }: { onDone: (temporaryPassword: string | null) => void }) {
  const toast = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("staff");

  const save = useApiMutation<Record<string, unknown>, { temporaryPassword: string | null }>({
    path: "/users", invalidate: invalidateAll, idempotent: true,
  });

  return (
    <form className="space-y-3" onSubmit={(e) => { e.preventDefault();
      save.mutate({ name, email, role }, {
        onSuccess: (result) => { toast.push("success", "Person added."); onDone(result.temporaryPassword); },
        onError: (err) => toast.push("error", err instanceof Error ? err.message : "Could not add."),
      });
    }}>
      <Field label="Full name" htmlFor="u-name" required><Input id="u-name" value={name} onChange={(e) => setName(e.target.value)} required /></Field>
      <Field label="Email" htmlFor="u-email" required><Input id="u-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></Field>
      <Field label="Role" htmlFor="u-role" hint={ROLE_HELP[role]}>
        <Select id="u-role" value={role} onChange={(e) => setRole(e.target.value as Role)}>
          {ROLES.map((r) => (<option key={r} value={r}>{titleCase(r)}</option>))}
        </Select>
      </Field>
      <p className="text-xs text-ink-500">A temporary password is generated and shown once.</p>
      <Button type="submit" loading={save.isPending} className="w-full">Add person</Button>
    </form>
  );
}
