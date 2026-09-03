import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { PageHeader } from "../components/Layout.tsx";
import { Button, Card, CardHeader, ErrorState, Field, Input, Spinner, Textarea, useToast } from "../components/ui.tsx";
import { invalidateAll, useApiMutation, useBusiness } from "../api/hooks.ts";
import { useAuth } from "../lib/auth.tsx";
import type { BusinessProfile } from "../api/types.ts";

/** Every field the PATCH accepts, as strings so empty boxes stay empty. */
type FormState = Record<string, string | boolean | number>;

function toForm(business: BusinessProfile): FormState {
  return {
    name: business.name,
    legalName: business.legalName ?? "",
    rcNumber: business.rcNumber ?? "",
    tin: business.tin ?? "",
    addressLine1: business.addressLine1 ?? "",
    addressLine2: business.addressLine2 ?? "",
    city: business.city ?? "",
    state: business.state ?? "",
    country: business.country,
    phone: business.phone ?? "",
    email: business.email ?? "",
    website: business.website ?? "",
    currency: business.currency,
    currencySymbol: business.currencySymbol,
    invoicePrefix: business.invoicePrefix,
    invoiceSeries: business.invoiceSeries,
    waybillPrefix: business.waybillPrefix,
    waybillSeries: business.waybillSeries,
    purchasePrefix: business.purchasePrefix,
    paymentTermsDays: business.paymentTermsDays,
    taxEnabled: business.taxEnabled,
    taxRateBp: business.taxRateBp,
    taxLabel: business.taxLabel,
    bankName: business.bankName ?? "",
    bankAccountName: business.bankAccountName ?? "",
    bankAccountNumber: business.bankAccountNumber ?? "",
    invoiceNotes: business.invoiceNotes ?? "",
    invoiceFooter: business.invoiceFooter ?? "",
  };
}

export function SettingsPage() {
  const { data, isLoading, error, refetch } = useBusiness();
  const { can } = useAuth();
  const toast = useToast();
  const [form, setForm] = useState<FormState | null>(null);

  useEffect(() => {
    if (data) setForm(toForm(data.business));
  }, [data]);

  const save = useApiMutation<Record<string, unknown>, unknown>({
    path: "/settings/business",
    method: "PATCH",
    invalidate: invalidateAll,
  });

  if (isLoading || !form) return <Spinner label="Loading settings" />;
  if (error) return <ErrorState error={error} onRetry={() => void refetch()} />;

  const readOnly = !can("manage:settings");
  const set = (key: string, value: string | boolean | number) => setForm((c) => (c ? { ...c, [key]: value } : c));
  const text = (key: string) => String(form[key] ?? "");

  return (
    <>
      <PageHeader
        title="Settings"
        description="Your business profile, document numbering and payment details."
        actions={
          !readOnly && (
            <Button
              loading={save.isPending}
              onClick={() =>
                save.mutate(
                  { ...form },
                  {
                    onSuccess: () => toast.push("success", "Settings saved."),
                    onError: (err) => toast.push("error", err instanceof Error ? err.message : "Could not save."),
                  },
                )
              }
            >
              <Save className="h-4 w-4" aria-hidden />
              Save changes
            </Button>
          )
        }
      />

      {readOnly && (
        <p className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">
          You can view these settings but not change them — that needs the owner role.
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Business" subtitle="Printed at the top of every document." />
          <div className="space-y-3 p-4">
            <Field label="Trading name" htmlFor="b-name" required>
              <Input id="b-name" value={text("name")} disabled={readOnly} onChange={(e) => set("name", e.target.value)} required />
            </Field>
            <Field label="Legal name" htmlFor="b-legal">
              <Input id="b-legal" value={text("legalName")} disabled={readOnly} onChange={(e) => set("legalName", e.target.value)} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="RC number" htmlFor="b-rc">
                <Input id="b-rc" value={text("rcNumber")} disabled={readOnly} onChange={(e) => set("rcNumber", e.target.value)} />
              </Field>
              <Field label="TIN" htmlFor="b-tin">
                <Input id="b-tin" value={text("tin")} disabled={readOnly} onChange={(e) => set("tin", e.target.value)} />
              </Field>
            </div>
            <Field label="Address" htmlFor="b-addr">
              <Input id="b-addr" value={text("addressLine1")} disabled={readOnly} onChange={(e) => set("addressLine1", e.target.value)} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="City" htmlFor="b-city">
                <Input id="b-city" value={text("city")} disabled={readOnly} onChange={(e) => set("city", e.target.value)} />
              </Field>
              <Field label="State" htmlFor="b-state">
                <Input id="b-state" value={text("state")} disabled={readOnly} onChange={(e) => set("state", e.target.value)} />
              </Field>
              <Field label="Phone" htmlFor="b-phone">
                <Input id="b-phone" value={text("phone")} disabled={readOnly} onChange={(e) => set("phone", e.target.value)} />
              </Field>
              <Field label="Email" htmlFor="b-email">
                <Input id="b-email" type="email" value={text("email")} disabled={readOnly} onChange={(e) => set("email", e.target.value)} />
              </Field>
            </div>
            <Field label="Website" htmlFor="b-web" hint="Include https://">
              <Input id="b-web" value={text("website")} disabled={readOnly} onChange={(e) => set("website", e.target.value)} placeholder="https://" />
            </Field>
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader title="Document numbering" subtitle="Format: PREFIX-YEAR-SERIES-NUMBER" />
            <div className="space-y-3 p-4">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Invoice prefix" htmlFor="b-inv-prefix">
                  <Input id="b-inv-prefix" value={text("invoicePrefix")} disabled={readOnly} onChange={(e) => set("invoicePrefix", e.target.value.toUpperCase())} />
                </Field>
                <Field label="Invoice series" htmlFor="b-inv-series">
                  <Input id="b-inv-series" value={text("invoiceSeries")} disabled={readOnly} onChange={(e) => set("invoiceSeries", e.target.value.toUpperCase())} />
                </Field>
                <Field label="Waybill prefix" htmlFor="b-wb-prefix">
                  <Input id="b-wb-prefix" value={text("waybillPrefix")} disabled={readOnly} onChange={(e) => set("waybillPrefix", e.target.value.toUpperCase())} />
                </Field>
                <Field label="Waybill series" htmlFor="b-wb-series">
                  <Input id="b-wb-series" value={text("waybillSeries")} disabled={readOnly} onChange={(e) => set("waybillSeries", e.target.value.toUpperCase())} />
                </Field>
              </div>
              <p className="rounded-lg bg-ink-50 px-3 py-2 font-mono text-xs text-ink-600">
                {text("invoicePrefix")}-{new Date().getFullYear()}-{text("invoiceSeries")}-01
              </p>
              <Field label="Payment terms (days)" htmlFor="b-terms">
                <Input
                  id="b-terms"
                  value={String(form.paymentTermsDays ?? 14)}
                  disabled={readOnly}
                  inputMode="numeric"
                  className="tnum text-right"
                  onChange={(e) => set("paymentTermsDays", Number.parseInt(e.target.value, 10) || 0)}
                />
              </Field>
            </div>
          </Card>

          <Card>
            <CardHeader title="Tax" subtitle="Off by default — simple totals." />
            <div className="space-y-3 p-4">
              <label className="flex items-center gap-2 text-sm text-ink-700">
                <input
                  type="checkbox"
                  checked={Boolean(form.taxEnabled)}
                  disabled={readOnly}
                  onChange={(e) => set("taxEnabled", e.target.checked)}
                />
                Add tax to invoices
              </label>
              {Boolean(form.taxEnabled) && (
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Tax label" htmlFor="b-tax-label">
                    <Input id="b-tax-label" value={text("taxLabel")} disabled={readOnly} onChange={(e) => set("taxLabel", e.target.value)} />
                  </Field>
                  <Field label="Rate (basis points)" htmlFor="b-tax-bp" hint="750 = 7.5%">
                    <Input
                      id="b-tax-bp"
                      value={String(form.taxRateBp ?? 0)}
                      disabled={readOnly}
                      inputMode="numeric"
                      className="tnum text-right"
                      onChange={(e) => set("taxRateBp", Number.parseInt(e.target.value, 10) || 0)}
                    />
                  </Field>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <CardHeader title="Bank details" subtitle="Printed on invoices for payment." />
            <div className="space-y-3 p-4">
              <Field label="Bank" htmlFor="b-bank">
                <Input id="b-bank" value={text("bankName")} disabled={readOnly} onChange={(e) => set("bankName", e.target.value)} />
              </Field>
              <Field label="Account name" htmlFor="b-acct-name">
                <Input id="b-acct-name" value={text("bankAccountName")} disabled={readOnly} onChange={(e) => set("bankAccountName", e.target.value)} />
              </Field>
              <Field label="Account number" htmlFor="b-acct-num">
                <Input id="b-acct-num" value={text("bankAccountNumber")} disabled={readOnly} onChange={(e) => set("bankAccountNumber", e.target.value)} />
              </Field>
            </div>
          </Card>
        </div>
      </div>

      <Card className="mt-4">
        <CardHeader title="Invoice defaults" subtitle="Pre-filled on every new invoice." />
        <div className="space-y-3 p-4">
          <Field label="Standard notes" htmlFor="b-notes">
            <Textarea id="b-notes" value={text("invoiceNotes")} disabled={readOnly} rows={3} onChange={(e) => set("invoiceNotes", e.target.value)} />
          </Field>
          <Field label="Footer" htmlFor="b-footer">
            <Textarea id="b-footer" value={text("invoiceFooter")} disabled={readOnly} rows={2} onChange={(e) => set("invoiceFooter", e.target.value)} />
          </Field>
        </div>
      </Card>
    </>
  );
}
