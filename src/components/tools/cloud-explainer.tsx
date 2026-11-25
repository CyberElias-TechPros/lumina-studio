"use client";

import { useMemo, useState } from "react";
import { Cloud, CloudOff, Download, HardDrive, Smartphone, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * "What is the cloud, really?" visual explainer.
 *
 * Built directly from the GSC cluster: "what is the cloud" (×11 variants),
 * "how to use the cloud", "how do you use cloud", "what is ccloud",
 * "what is in the cloud", "content in the cloud", "cloud computing meaning".
 *
 * The mistake behind nearly all of those searches is the same: people believe
 * "the cloud" is a vague place in the sky rather than somebody else's computer
 * in a building. This component makes that concrete, then shows exactly which
 * of their own files are in the cloud right now (photos, WhatsApp backup,
 * Google account, email) and what happens when the data bundle runs out.
 *
 * No external requests. Everything runs from local state.
 */

type Store = {
  id: string;
  name: string;
  where: string;
  offline: boolean;
  note: string;
  icon: React.ReactNode;
};

const STORES: Store[] = [
  {
    id: "photos",
    name: "Google Photos",
    where: "Google's server in Europe or the US",
    offline: true,
    note: "Photos stay visible on your phone only while the copy exists on your device. Free up space and they must be downloaded again.",
    icon: <Smartphone className="size-4" />,
  },
  {
    id: "whatsapp",
    name: "WhatsApp backup",
    where: "Google Drive",
    offline: false,
    note: "Runs at 2 a.m. on Wi-Fi by default. Turn Wi-Fi off and backups silently stop — the usual reason a new phone has no old chats.",
    icon: <Cloud className="size-4" />,
  },
  {
    id: "docs",
    name: "Google Docs / Sheets",
    where: "Google Drive",
    offline: true,
    note: "Edits save to the server every few seconds. Offline mode must be switched on in Drive settings before it works without data.",
    icon: <Upload className="size-4" />,
  },
  {
    id: "email",
    name: "Gmail",
    where: "Google's mail servers",
    offline: true,
    note: "Messages live on the server. The phone keeps only a copy of recent mail; older mail needs a connection to open.",
    icon: <Download className="size-4" />,
  },
  {
    id: "local",
    name: "Files on this device",
    where: "Your own phone or laptop",
    offline: false,
    note: "Not the cloud. If the device is lost, stolen or reset, these files are gone unless something copied them elsewhere.",
    icon: <HardDrive className="size-4" />,
  },
];

const SCENARIOS = [
  {
    id: "no-data",
    label: "No data bundle left",
    detail:
      "Anything marked cloud-only stops opening. Files already downloaded to the device keep working. This is why a downloaded song plays on a bus with no signal and a streamed one does not.",
  },
  {
    id: "new-phone",
    label: "New phone, same Google account",
    detail:
      "Contacts, calendar and email return immediately because they were never on the old phone. Photos return only if backup was on. WhatsApp chats return only from the last backup.",
  },
  {
    id: "lost-phone",
    label: "Phone lost or stolen",
    detail:
      "The cloud copy survives; the device copy is gone. Signing in on another device is the whole recovery — provided the account password is known and two-step verification can be completed.",
  },
  {
    id: "no-money",
    label: "Subscription not renewed",
    detail:
      "Paid storage above the free 15 GB stops accepting new uploads and eventually makes files read-only. Google does not delete immediately, but nothing new is saved in the meantime.",
  },
] as const;

/** A rough, honest per-action data estimate for a Nigerian bundle. */
const COSTS = [
  { action: "Send a text-only WhatsApp message", size: 0.002, unit: "KB" },
  { action: "Send one photo on WhatsApp (compressed)", size: 0.1, unit: "MB" },
  { action: "Send the same photo by email, full size", size: 3.5, unit: "MB" },
  { action: "Stream one song on Spotify", size: 4, unit: "MB" },
  { action: "Watch 10 minutes of YouTube at 480p", size: 40, unit: "MB" },
  { action: "Watch 10 minutes of YouTube at 1080p", size: 150, unit: "MB" },
  { action: "One minute of WhatsApp video call", size: 8, unit: "MB" },
  { action: "Back up a month of photos to Google Photos", size: 420, unit: "MB" },
] as const;

function toMB(size: number, unit: string) {
  if (unit === "KB") return size / 1000;
  return size;
}

function fmtMB(mb: number) {
  if (mb < 1) return `${Math.round(mb * 1000)} KB`;
  if (mb < 1000) return `${mb.toLocaleString("en-NG", { maximumFractionDigits: 1 })} MB`;
  return `${(mb / 1000).toLocaleString("en-NG", { maximumFractionDigits: 2 })} GB`;
}

export function CloudExplainer() {
  const [bundle, setBundle] = useState(1024);
  const [scenario, setScenario] = useState<(typeof SCENARIOS)[number]["id"]>("no-data");

  const active = SCENARIOS.find((item) => item.id === scenario)!;

  const answers = useMemo(() => {
    return COSTS.map((cost) => {
      const mb = toMB(cost.size, cost.unit);
      return {
        ...cost,
        label: fmtMB(mb),
        times: mb > 0 ? Math.floor(bundle / mb) : Infinity,
      };
    });
  }, [bundle]);

  return (
    <div className="space-y-5">
      {/* ── The plain answer ──────────────────────────────────────────── */}
      <section className="border-foreground/10 bg-card overflow-hidden rounded-2xl border">
        <div className="border-foreground/10 border-b px-5 py-3.5">
          <p className="text-muted-foreground font-mono text-[9px] tracking-[0.24em] uppercase">
            What the cloud is, in one paragraph
          </p>
        </div>
        <div className="p-5">
          <p className="font-display text-xl leading-snug font-semibold tracking-tight text-balance">
            &ldquo;The cloud&rdquo; is somebody else&rsquo;s computer in a building with reliable
            power and a fast internet line, running all year.
          </p>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            When you upload, a copy of your file travels over your data and is stored on that
            computer. When you open it on another phone, your phone asks that computer for it. There
            is no sky involved and no magic: it is a rental. Google, Microsoft and Apple own the
            building; you rent space inside it and reach it using the same bundle you use for
            WhatsApp.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="border-foreground/10 rounded-xl border p-3.5">
              <p className="text-primary font-mono text-[9px] tracking-[0.18em] uppercase">
                What it solves
              </p>
              <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
                A stolen phone, a wiped laptop, a small storage card, and working from two devices.
              </p>
            </div>
            <div className="border-foreground/10 rounded-xl border p-3.5">
              <p className="text-primary font-mono text-[9px] tracking-[0.18em] uppercase">
                What it costs
              </p>
              <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
                Data to upload and download, plus a monthly fee once you pass the free limit — 15 GB
                for a Google account.
              </p>
            </div>
            <div className="border-foreground/10 rounded-xl border p-3.5">
              <p className="text-primary font-mono text-[9px] tracking-[0.18em] uppercase">
                What it is not
              </p>
              <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
                Not a backup of everything automatically. Something is in the cloud only if you or
                an app actually put it there.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Where your own files actually are ─────────────────────────── */}
      <section className="border-foreground/10 bg-card overflow-hidden rounded-2xl border">
        <div className="border-foreground/10 border-b px-5 py-3.5">
          <p className="text-muted-foreground font-mono text-[9px] tracking-[0.24em] uppercase">
            Where the things on your phone actually live
          </p>
        </div>
        <ul className="divide-foreground/10 divide-y">
          {STORES.map((store) => (
            <li key={store.id} className="flex items-start gap-3 px-5 py-4">
              <span className="bg-foreground/[0.06] text-muted-foreground mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg">
                {store.icon}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <p className="text-foreground text-sm font-semibold">{store.name}</p>
                  <span
                    className={cn(
                      "rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-[0.12em] uppercase",
                      store.id === "local"
                        ? "border-foreground/15 text-muted-foreground"
                        : "border-primary/30 bg-primary/8 text-primary",
                    )}
                  >
                    {store.id === "local" ? "on device only" : "in the cloud"}
                  </span>
                </div>
                <p className="text-muted-foreground mt-0.5 font-mono text-[10px]">{store.where}</p>
                <p className="text-muted-foreground mt-1.5 text-[11px] leading-relaxed">
                  {store.note}
                </p>
              </div>
              <span className="mt-1 shrink-0">
                {store.offline ? (
                  <CloudOff className="text-muted-foreground/50 size-4" aria-label="Needs a connection" />
                ) : (
                  <Cloud className="text-success/70 size-4" aria-label="Works without a connection" />
                )}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── What happens when… ────────────────────────────────────────── */}
      <section className="border-foreground/10 bg-card overflow-hidden rounded-2xl border">
        <div className="border-foreground/10 border-b px-5 py-3.5">
          <p className="text-muted-foreground font-mono text-[9px] tracking-[0.24em] uppercase">
            What happens when…
          </p>
        </div>
        <div className="p-5">
          <div className="flex flex-wrap gap-1.5">
            {SCENARIOS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setScenario(item.id)}
                className={cn(
                  "cursor-pointer rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors",
                  scenario === item.id
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-foreground/10 text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="text-foreground mt-4 text-sm leading-relaxed">{active.detail}</p>
        </div>
      </section>

      {/* ── Bundle maths ─────────────────────────────────────────────── */}
      <section className="border-foreground/10 bg-card overflow-hidden rounded-2xl border">
        <div className="border-foreground/10 flex flex-wrap items-center justify-between gap-2 border-b px-5 py-3.5">
          <p className="text-muted-foreground font-mono text-[9px] tracking-[0.24em] uppercase">
            What your data bundle buys
          </p>
          <div className="flex items-center gap-1">
            {[500, 1024, 2048, 10240].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setBundle(value)}
                className={cn(
                  "cursor-pointer rounded-md px-2 py-1 font-mono text-[10px] transition-colors",
                  bundle === value
                    ? "bg-primary/12 text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {value >= 1024 ? `${value / 1024} GB` : `${value} MB`}
              </button>
            ))}
          </div>
        </div>
        <div className="p-5">
          <label className="block">
            <span className="text-muted-foreground font-mono text-[9px] tracking-[0.2em] uppercase">
              Bundle size in MB
            </span>
            <div className="mt-1.5 flex items-center gap-3">
              <input
                type="range"
                min={100}
                max={10240}
                step={100}
                value={bundle}
                onChange={(event) => setBundle(Number(event.target.value))}
                aria-label="Data bundle size in megabytes"
                className="accent-primary h-1.5 w-full cursor-pointer"
              />
              <span className="font-display shrink-0 text-lg font-semibold tabular-nums">
                {fmtMB(bundle)}
              </span>
            </div>
          </label>

          <ul className="mt-5 space-y-1.5">
            {answers.map((row) => (
              <li
                key={row.action}
                className="hover:bg-foreground/[0.03] flex items-center justify-between gap-3 rounded-lg px-2.5 py-2"
              >
                <span className="text-muted-foreground min-w-0 flex-1 text-xs leading-snug">
                  {row.action}
                </span>
                <span className="text-muted-foreground shrink-0 font-mono text-[10px]">
                  {row.label}
                </span>
                <span className="text-foreground shrink-0 font-mono text-xs font-semibold tabular-nums">
                  {row.times >= 1000
                    ? `${Math.floor(row.times / 1000).toLocaleString("en-NG")}k×`
                    : `${row.times.toLocaleString("en-NG")}×`}
                </span>
              </li>
            ))}
          </ul>

          <p className="text-muted-foreground mt-4 border-t border-foreground/10 pt-4 text-[11px] leading-relaxed">
            Rule of thumb on a Nigerian bundle: <strong className="text-foreground">text is
            almost free, photos are cheap, video is expensive</strong>. A single 1080p YouTube
            session can cost more data than a month of WhatsApp messages. Set video apps to 480p
            and download music on Wi-Fi to make a 1 GB bundle last a week.
          </p>
        </div>
      </section>
    </div>
  );
}
