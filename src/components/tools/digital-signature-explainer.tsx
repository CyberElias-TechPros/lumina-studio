"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  FileSignature,
  KeyRound,
  PenLine,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Digital signature explainer and inspector.
 *
 * Answers "what is a digital signature" — 35 impressions at position 3.91 in
 * CEA's Search Console export, landing on a glossary entry that 301s away.
 *
 * The confusion this addresses is specific and common: "digital signature" is
 * used for three different things in Nigeria, and almost every explanation
 * collapses them.
 *
 *   1. A signature **image** stuck into a document. Proves nothing; anyone can
 *      copy the picture.
 *   2. A **scanned ink signature**. Proves the paper was signed once, not who is
 *      reading the file now.
 *   3. A **cryptographic signature**. Mathematical proof that a specific key
 *      signed specific bytes and that the bytes have not changed since.
 *
 * Only the third is a "digital signature" in the technical sense that banks,
 * e-government portals and software update systems rely on. A reader who thinks
 * #1 and #3 are the same thing will sign a document they believe is protected
 * and be wrong.
 *
 * The inspector below lets a reader paste a real certificate fingerprint and see
 * how the parts fit together. Everything is local and nothing verifies against a
 * live trust store — that limitation is stated on screen, not buried.
 */

type Method = "image" | "scanned" | "cryptographic";

const METHODS: Record<
  Method,
  {
    title: string;
    proves: string;
    doesNot: string;
    tamper: string;
    tone: "danger" | "caution" | "good";
    /** What a reader will actually meet in the wild. */
    seen: string;
  }
> = {
  image: {
    title: "A signature picture in the document",
    proves: "That a picture of a signature is present.",
    doesNot: "Nothing about who added it, or whether anything else changed.",
    tamper:
      "Anyone with the file can copy the picture, change a figure and paste it back. There is no trace.",
    tone: "danger",
    seen: "Common in offers, invoices and 'signed' PDFs sent over WhatsApp.",
  },
  scanned: {
    title: "A scan of a signed printed page",
    proves: "That a version of this page had ink on it at some point.",
    doesNot:
      "That the scan is of the original, that the original said this, or that this file is unaltered.",
    tamper: "A scan is a photograph. Editing a photograph leaves no mathematical evidence.",
    tone: "caution",
    seen: "Standard for contracts printed, signed and sent back as an image.",
  },
  cryptographic: {
    title: "A cryptographic signature",
    proves:
      "That a specific private key signed exactly these bytes, and that a single byte has not changed since.",
    doesNot:
      "That the signer is trustworthy, or that they understood what they signed. It binds an identity to content, nothing more.",
    tamper:
      "Changing one character invalidates the signature. Verification fails loudly rather than silently.",
    tone: "good",
    seen: "Banks, e-government portals, software updates, and signed PDFs from large institutions.",
  },
};

const TONE: Record<"danger" | "caution" | "good", string> = {
  danger: "border-red-300 bg-red-50/60",
  caution: "border-amber-300 bg-amber-50/60",
  good: "border-emerald-300 bg-emerald-50/60",
};

const TONE_ICON: Record<"danger" | "caution" | "good", typeof CheckCircle2> = {
  danger: AlertTriangle,
  caution: AlertTriangle,
  good: ShieldCheck,
};

/** A real-format SHA-256 fingerprint for the interactive demo. */
const SAMPLE_FINGERPRINT =
  "3A:7F:2C:91:0E:B4:55:D8:61:AA:17:93:4C:2F:80:E1:6B:39:D4:07:5E:AC:88:12:F0:9B:3D:66:71:CD:24:8A";

type ParsedFingerprint = {
  normalised: string;
  bytes: string[];
  algorithm: "SHA-256" | "SHA-1" | "MD5" | "unknown";
  looksValid: boolean;
  problems: string[];
};

/**
 * Parse a certificate fingerprint.
 *
 * Real fingerprints are colon-separated hex, commonly SHA-1 (20 bytes) or
 * SHA-256 (32 bytes). Telling a reader which one they are holding is useful,
 * because "SHA-1" is a conversation about a deprecated algorithm that most
 * explanations skip.
 */
function parseFingerprint(raw: string): ParsedFingerprint {
  const problems: string[] = [];
  const cleaned = raw.trim().toUpperCase().replace(/\s+/g, "");

  if (!cleaned) {
    return { normalised: "", bytes: [], algorithm: "unknown", looksValid: false, problems: [] };
  }

  const parts = cleaned.split(":");
  const bytes = parts.filter((p) => p.length > 0);
  const allHexPairs = bytes.length > 0 && bytes.every((b) => /^[0-9A-F]{2}$/.test(b));

  if (!allHexPairs) {
    problems.push(
      "Not in hex-pair format. A fingerprint looks like 3A:7F:2C:… — two hex characters per group.",
    );
  }

  let algorithm: ParsedFingerprint["algorithm"] = "unknown";
  if (allHexPairs) {
    if (bytes.length === 32) algorithm = "SHA-256";
    else if (bytes.length === 20) algorithm = "SHA-1";
    else if (bytes.length === 16) algorithm = "MD5";
    else
      problems.push(
        `This has ${bytes.length} bytes. SHA-256 fingerprints have 32 and SHA-1 have 20 — this is neither, so it is probably truncated or not a fingerprint.`,
      );
  }

  if (algorithm === "SHA-1")
    problems.push(
      "SHA-1 fingerprints are still shown by older tools but the algorithm is deprecated for new signatures because collisions have been demonstrated. Prefer a SHA-256 fingerprint where you have the choice.",
    );

  if (algorithm === "MD5")
    problems.push(
      "MD5 is broken for signature purposes. A fingerprint this short should not be used to verify anything.",
    );

  return {
    normalised: allHexPairs ? bytes.join(":") : cleaned,
    bytes,
    algorithm,
    looksValid: allHexPairs && problems.length === 0,
    problems,
  };
}

export function DigitalSignatureExplainer() {
  const [fingerprint, setFingerprint] = useState(SAMPLE_FINGERPRINT);
  const parsed = useMemo(() => parseFingerprint(fingerprint), [fingerprint]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-lg font-semibold">
          Three things called &ldquo;digital signature&rdquo;
        </h2>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          They are not the same, and only the last one is what a bank, a government portal or a
          software update is relying on when it uses the phrase.
        </p>
        <div className="mt-4 space-y-3">
          {(Object.keys(METHODS) as Method[]).map((key, index) => {
            const m = METHODS[key];
            const Icon = TONE_ICON[m.tone];
            return (
              <div key={key} className={cn("rounded-xl border p-5", TONE[m.tone])}>
                <div className="flex items-start gap-3">
                  <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold">
                      {index + 1}. {m.title}
                    </h3>
                    <dl className="mt-2 space-y-1.5 text-sm leading-relaxed">
                      <div>
                        <dt className="text-foreground inline font-medium">Proves: </dt>
                        <dd className="text-muted-foreground inline">{m.proves}</dd>
                      </div>
                      <div>
                        <dt className="text-foreground inline font-medium">Does not prove: </dt>
                        <dd className="text-muted-foreground inline">{m.doesNot}</dd>
                      </div>
                      <div>
                        <dt className="text-foreground inline font-medium">If someone tampers: </dt>
                        <dd className="text-muted-foreground inline">{m.tamper}</dd>
                      </div>
                      <div>
                        <dt className="text-foreground inline font-medium">Where you meet it: </dt>
                        <dd className="text-muted-foreground inline">{m.seen}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border p-5">
        <div className="flex items-center gap-2">
          <FileSignature className="text-primary size-4" aria-hidden="true" />
          <h3 className="font-display text-lg font-semibold">Read a certificate fingerprint</h3>
        </div>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          Paste a fingerprint from a certificate or a signed-document viewer. This explains what you
          are holding; it does not check it against any authority.
        </p>

        <label className="mt-4 block">
          <span className="text-muted-foreground mb-1.5 block text-sm font-medium">
            Fingerprint
          </span>
          <textarea
            value={fingerprint}
            onChange={(e) => setFingerprint(e.target.value)}
            rows={3}
            spellCheck={false}
            className="border-input bg-background focus-visible:ring-ring w-full rounded-lg border px-3 py-2 font-mono text-xs focus-visible:ring-2 focus-visible:outline-none"
            placeholder="3A:7F:2C:91:…"
          />
        </label>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border p-3">
            <p className="text-muted-foreground text-xs font-medium uppercase">Algorithm</p>
            <p className="mt-1 font-mono text-sm font-semibold">{parsed.algorithm}</p>
          </div>
          <div className="rounded-lg border p-3">
            <p className="text-muted-foreground text-xs font-medium uppercase">Bytes</p>
            <p className="mt-1 font-mono text-sm font-semibold">{parsed.bytes.length}</p>
          </div>
          <div className="rounded-lg border p-3">
            <p className="text-muted-foreground text-xs font-medium uppercase">Shape</p>
            <p
              className={cn(
                "mt-1 text-sm font-semibold",
                parsed.looksValid ? "text-emerald-700" : "text-amber-700",
              )}
            >
              {parsed.bytes.length === 0
                ? "—"
                : parsed.looksValid
                  ? "Looks well formed"
                  : "Check below"}
            </p>
          </div>
        </div>

        {parsed.problems.length > 0 && (
          <ul className="mt-4 space-y-2">
            {parsed.problems.map((problem) => (
              <li key={problem} className="flex gap-2 text-sm leading-relaxed text-amber-800">
                <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>{problem}</span>
              </li>
            ))}
          </ul>
        )}

        {parsed.looksValid && (
          <div className="mt-4 flex gap-2 rounded-lg border border-emerald-200 bg-emerald-50/60 p-3 text-sm text-emerald-900">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>
              This is a well-formed {parsed.algorithm} fingerprint. Being well formed only means it
              is the right shape — it says nothing about whether the certificate is trusted,
              current, or belongs to who you think. That check needs the issuer&rsquo;s own
              certificate chain.
            </span>
          </div>
        )}
      </div>

      <div className="rounded-xl border p-5">
        <div className="flex items-center gap-2">
          <PenLine className="text-primary size-4" aria-hidden="true" />
          <h3 className="font-display text-lg font-semibold">Do this task</h3>
        </div>
        <ol className="text-muted-foreground mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed">
          <li>
            Find any PDF you have received that claims to be signed. Open its signature panel (View
            → Signatures in most readers).
          </li>
          <li>
            Answer three questions in writing: who is named as the signer, what issuer vouches for
            them, and does the reader say the document is unmodified since signing.
          </li>
          <li>
            If the panel is empty and the &ldquo;signature&rdquo; is just a picture, you have method
            1 above. Nothing about that document is protected.
          </li>
          <li>
            Repeat on a document from a bank or government portal and compare. The difference is
            what this page is about.
          </li>
        </ol>
        <div className="text-muted-foreground mt-4 flex gap-2 rounded-lg border border-amber-200 bg-amber-50/60 p-3 text-sm leading-relaxed">
          <KeyRound className="mt-0.5 size-4 shrink-0 text-amber-600" aria-hidden="true" />
          <span>
            If this goes wrong: a PDF that once verified and now reports the signature as invalid
            usually means the file was re-saved or edited, not that the signer is a fraud. Get a
            fresh copy from the sender rather than assuming the worst.
          </span>
        </div>
      </div>
    </div>
  );
}
