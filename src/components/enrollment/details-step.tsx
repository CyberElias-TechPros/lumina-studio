"use client";

import { UserRound, Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { CITIES, EDUCATION_LEVELS, EXPERIENCE_LEVELS, REFERRAL_SOURCES } from "./types";
import type { EnrollmentDraft } from "./types";

interface DetailsStepProps {
  draft: EnrollmentDraft;
  update: (patch: Partial<EnrollmentDraft>) => void;
  errors: Record<string, string>;
}

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm">
        {label}{" "}
        {optional && <span className="text-muted-foreground text-xs font-normal">· optional</span>}
      </Label>
      {children}
      {error && <p className="text-error text-xs">{error}</p>}
    </div>
  );
}

/**
 * Step 4 — everything the academy needs from the student: identity,
 * contact, background, goals and logistics.
 */
export function DetailsStep({ draft, update, errors }: DetailsStepProps) {
  const set = (key: keyof EnrollmentDraft) => (value: string) =>
    update({ [key]: value } as Partial<EnrollmentDraft>);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-muted-foreground flex items-center gap-2 text-[11px] font-bold tracking-wide uppercase">
          <UserRound className="text-primary size-3.5" /> Your details
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Field id="firstName" label="First name" error={errors.firstName}>
            <Input
              id="firstName"
              placeholder="Adaeze"
              value={draft.firstName}
              onChange={(e) => set("firstName")(e.target.value)}
              autoComplete="given-name"
            />
          </Field>
          <Field id="lastName" label="Last name" error={errors.lastName}>
            <Input
              id="lastName"
              placeholder="Okafor"
              value={draft.lastName}
              onChange={(e) => set("lastName")(e.target.value)}
              autoComplete="family-name"
            />
          </Field>
          <Field id="email" label="Email address" error={errors.email}>
            <Input
              id="email"
              type="email"
              placeholder="adaeze@example.com"
              value={draft.email}
              onChange={(e) => set("email")(e.target.value)}
              autoComplete="email"
            />
          </Field>
          <Field id="phone" label="Phone (WhatsApp)" error={errors.phone}>
            <Input
              id="phone"
              type="tel"
              placeholder="+234 800 000 0000"
              value={draft.phone}
              onChange={(e) => set("phone")(e.target.value)}
              autoComplete="tel"
            />
          </Field>
          <Field id="city" label="City / State" error={errors.city}>
            <Select value={draft.city || undefined} onValueChange={set("city")}>
              <SelectTrigger id="city">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {CITIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field id="birthYear" label="Birth year" optional>
            <Input
              id="birthYear"
              type="number"
              min={1950}
              max={2012}
              placeholder="2003"
              value={draft.birthYear}
              onChange={(e) => set("birthYear")(e.target.value)}
            />
          </Field>
          <Field id="gender" label="Gender" optional>
            <Select value={draft.gender || undefined} onValueChange={set("gender")}>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Prefer not to say" />
              </SelectTrigger>
              <SelectContent>
                {["female", "male", "other", "prefer-not"].map((g) => (
                  <SelectItem key={g} value={g}>
                    {g === "prefer-not" ? "Prefer not to say" : g[0].toUpperCase() + g.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field id="educationLevel" label="Education level" optional>
            <Select value={draft.educationLevel || undefined} onValueChange={set("educationLevel")}>
              <SelectTrigger id="educationLevel">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {EDUCATION_LEVELS.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
      </div>

      <div className="border-border/70 border-t pt-5">
        <p className="text-muted-foreground flex items-center gap-2 text-[11px] font-bold tracking-wide uppercase">
          <Wallet className="text-primary size-3.5" /> Background &amp; goals
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Field id="experienceLevel" label="Prior experience in this field" optional>
            <Select
              value={draft.experienceLevel || undefined}
              onValueChange={set("experienceLevel")}
            >
              <SelectTrigger id="experienceLevel">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {EXPERIENCE_LEVELS.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field id="employer" label="Current job / school / business" optional>
            <Input
              id="employer"
              placeholder="e.g. NYSC, bank teller, own shop"
              value={draft.employer}
              onChange={(e) => set("employer")(e.target.value)}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field id="goal" label="What do you want to achieve with this course?" optional>
              <Textarea
                id="goal"
                rows={3}
                maxLength={600}
                placeholder="e.g. Get hired in an office job, start my own design business, fix and maintain machines…"
                value={draft.goal}
                onChange={(e) => set("goal")(e.target.value)}
              />
            </Field>
          </div>
          <Field id="referredBy" label="How did you hear about CEA?" optional>
            <Select value={draft.referredBy || undefined} onValueChange={set("referredBy")}>
              <SelectTrigger id="referredBy">
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                {REFERRAL_SOURCES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <div className="flex items-center justify-between rounded-lg border px-4 py-3">
            <div>
              <p className="text-sm font-semibold">I have a laptop (or reliable access to one)</p>
              <p className="text-muted-foreground text-xs">
                Typing &amp; Computer Basics can run entirely on academy machines
              </p>
            </div>
            <Switch
              id="hasLaptop"
              checked={draft.hasLaptop}
              onCheckedChange={(v) => update({ hasLaptop: v })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
