"use client";

import { createRef, useEffect, useRef, useState } from "react";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { getPageHead } from "@/lib/seo";
import { PageShell, PageHero } from "@/components/marketing/shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Download,
  Copy,
  RefreshCw,
  QrCode,
  Palette,
  Clock,
  Shield,
  Link as LinkIcon,
  FileImage,
} from "lucide-react";
import type { ReactNode } from "react";
import "@/styles.css";
import QRCodeFactory from "qrcode-generator";

/* ------------------------------------------------------------------ */
/*  CEA Lab — QR Code Generator                                       */
/*  Ecosystem: General-purpose utilities · CEA Tool Directory          */
/*  Route: /tools/qr-code                                             */
/* ------------------------------------------------------------------ */

export const Route = createFileRoute("/tools/qr-code")({
  head: () =>
    getPageHead({
      title: "QR Code Generator — CEA Lab",
      description:
        "Create customizable QR codes for links, text, contacts and more. Adjust colours, size and error correction, then download as PNG. Free browser tool from Cyber Elias Academy.",
      path: "/tools/qr-code",
      type: "website",
    }),
  component: QrCodeGenerator,
});

/* ------------------------------------------------------------------ */
/*  Options                                                           */
/* ------------------------------------------------------------------ */

type ErrorCorrection = "L" | "M" | "Q" | "H";

const ERROR_CORRECTION_OPTIONS: {
  value: ErrorCorrection;
  label: string;
  description: string;
}[] = [
  { value: "L", label: "Low (L)", description: "~7% recovery — smallest density" },
  { value: "M", label: "Medium (M)", description: "~15% recovery — good balance" },
  { value: "Q", label: "Quartile (Q)", description: "~25% recovery — more redundant" },
  { value: "H", label: "High (H)", description: "~30% recovery — best for damaged codes" },
];

const SIZE_OPTIONS = [
  { value: 2, label: "2× (small)" },
  { value: 3, label: "3× (medium)" },
  { value: 4, label: "4× (large)" },
  { value: 5, label: "5× (extra large)" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

function _(r: unknown): HTMLCanvasElement {
  return r as HTMLCanvasElement;
}

export function QrCodeGenerator() {
  const inputRef = createRef<HTMLInputElement>();
  const canvasRef = createRef<HTMLCanvasElement>();
  const [text, setText] = useState("");
  const [ecLevel, setEcLevel] = useState<ErrorCorrection>("M");
  const [matrixSize, setMatrixSize] = useState(3);
  const [fgColor, setFgColor] = useState("#0f172a");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasRenderedRef = useRef(false);

  /* ---- Regenerate QR code (debounced) ---- */

  const generate = (val: string, ec: ErrorCorrection, size: number, fg: string, bg: string) => {
    if (!val.trim()) {
      setImageUrl(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Version 0 = automatic selection of smallest QR version that fits the data.
      const qr: QRCodeInstance = QRCodeFactory(0, ec);
      qr.addData(val);
      qr.make();
      if (!canvasRef.current) {
        setLoading(false);
        return;
      }
      const canvas = _(canvasRef.current);
      canvas.width = 0;
      canvas.height = 0;
      const scale = size;
      const moduleCount = qr.getModuleCount();
      canvas.width = moduleCount * scale;
      canvas.height = moduleCount * scale;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setLoading(false);
        return;
      }
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = fg;
      for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
          if (qr.isDark(row, col)) {
            ctx.fillRect(col * scale, row * scale, scale, scale);
          }
        }
      }
      setImageUrl(canvas.toDataURL("image/png"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not generate QR code. Try shorter text.");
      setImageUrl(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      generate(text, ecLevel, matrixSize, fgColor, bgColor);
    }, 350);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [text, ecLevel, matrixSize, fgColor, bgColor]);

  /* ---- First paint: render initial state ---- */

  useEffect(() => {
    if (!hasRenderedRef.current) {
      hasRenderedRef.current = true;
      if (text.trim()) generate(text, ecLevel, matrixSize, fgColor, bgColor);
    }
  }, []);

  /* ---- Actions ---- */

  const downloadPng = () => {
    if (!canvasRef.current || !imageUrl) return;
    const c = _(canvasRef.current);
    const link = document.createElement("a");
    link.download = "cea-qr-code.png";
    link.href = c.toDataURL("image/png");
    link.click();
  };

  const copyImage = async () => {
    if (!canvasRef.current || !imageUrl) return;
    try {
      const blob = await (await fetch(imageUrl)).blob();
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  const presetLinks: { label: string; value: string }[] = [
    { label: "CEA homepage", value: "https://cyberelias.com" },
    {
      label: "Text message",
      value: "https://wa.me/2349012345678?text=Hi%2C%20I%27m%20interested%20in%20your%20services",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageShell>
        <PageHero
          eyebrow="CEA Lab · General-purpose utilities"
          title="QR Code Generator"
          description="Create customizable QR codes for links, text, contacts and more. Adjust colours, size and error correction, then download or share."
        />

        {/* ---- Explore / Practice panel ---- */}
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <LinkIcon className="h-4 w-4 text-foreground" />
                    Enter content to encode
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="qr-text">Text or URL</Label>
                      <Input
                        id="qr-text"
                        ref={inputRef}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="https://example.com or any text…"
                        className="text-sm"
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="qr-presets">Quick presets</Label>
                      <Select
                        value={text}
                        onValueChange={(v) => {
                          setText(v);
                          inputRef.current?.focus();
                        }}
                        disabled={loading}
                      >
                        <SelectTrigger id="qr-presets" className="text-sm">
                          <SelectValue placeholder="Select a preset…" />
                        </SelectTrigger>
                        <SelectContent>
                          {presetLinks.map((p) => (
                            <SelectItem key={p.label} value={p.value}>
                              {p.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="qr-ec">Error correction</Label>
                      <Select
                        value={ecLevel}
                        onValueChange={(v) => setEcLevel(v as ErrorCorrection)}
                        disabled={loading}
                      >
                        <SelectTrigger id="qr-ec" className="text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ERROR_CORRECTION_OPTIONS.map((o) => (
                            <SelectItem key={o.value} value={o.value}>
                              <div>
                                <div className="font-medium">{o.label}</div>
                                <div className="text-xs text-muted-foreground">{o.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="qr-size">Matrix size</Label>
                      <Select
                        value={String(matrixSize)}
                        onValueChange={(v) => setMatrixSize(Number(v))}
                        disabled={loading}
                      >
                        <SelectTrigger id="qr-size" className="text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {SIZE_OPTIONS.map((o) => (
                            <SelectItem key={o.value} value={String(o.value)}>
                              {o.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="qr-fg">Foreground colour</Label>
                      <div className="flex items-center gap-3">
                        <Input
                          id="qr-fg"
                          type="color"
                          value={fgColor}
                          onChange={(e) => setFgColor(e.target.value)}
                          className="h-10 w-20 cursor-pointer"
                          disabled={loading}
                        />
                        <Input
                          value={fgColor}
                          onChange={(e) => setFgColor(e.target.value)}
                          className="font-mono text-sm"
                          disabled={loading}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="qr-bg">Background colour</Label>
                      <div className="flex items-center gap-3">
                        <Input
                          id="qr-bg"
                          type="color"
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          className="h-10 w-20 cursor-pointer"
                          disabled={loading}
                        />
                        <Input
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          className="font-mono text-sm"
                          disabled={loading}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Error */}
              {error && (
                <Card className="border-destructive/50 bg-destructive/5">
                  <CardContent className="flex items-start gap-3 p-4">
                    <Shield className="mt-0.5 h-4 w-4 text-destructive shrink-0" />
                    <p className="text-sm text-destructive">{error}</p>
                  </CardContent>
                </Card>
              )}

              {/* Try these next */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Try these next</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "QR for a website", value: "https://cyberelias.com" },
                    {
                      label: "QR for plain text",
                      value: "Cyber Elias Academy — Lagos, Nigeria",
                    },
                    {
                      label: "QR for vCard (contact)",
                      value:
                        "BEGIN:VCARD\nVERSION:3.0\nN:Doe, Jane;;;\nFN:Jane Doe\nTEL;TYPE=CELL:08012345678\nEND:VCARD",
                    },
                    {
                      label: "QR for email",
                      value: "mailto:hello@cyberelias.com?subject=CEA%20enquiry",
                    },
                    { label: "QR for SMS", value: "sms:08012345678?body=Hello%20from%20CEA" },
                  ].map((p) => (
                    <Button
                      key={p.label}
                      variant="outline"
                      size="sm"
                      onClick={() => setText(p.value)}
                      className="text-xs"
                    >
                      {p.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview panel */}
            <div className="lg:col-span-5 space-y-6">
              {/* QR preview */}
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Palette className="h-4 w-4 text-foreground" />
                    Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 items-center justify-center p-6">
                  {loading && (
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Generating QR code…
                    </div>
                  )}
                  {!loading && !imageUrl && !error && (
                    <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
                      <QrCode className="h-10 w-10 opacity-40" />
                      <p>Enter text or a URL to generate a QR code</p>
                    </div>
                  )}
                  {!loading && error && imageUrl === null && (
                    <div className="flex flex-col items-center gap-3 text-sm text-destructive">
                      <Shield className="h-8 w-8 opacity-60" />
                      <p>Failed to generate QR code</p>
                    </div>
                  )}
                  {!loading && imageUrl && (
                    <div
                      className="flex flex-col items-center gap-4"
                      style={{ imageRendering: "-webkit-optimize-contrast" }}
                    >
                      <img
                        src={imageUrl}
                        alt="Generated QR code"
                        className="rounded-md border border-border bg-contain bg-center max-h-72"
                        style={{
                          width: "auto",
                          height: "auto",
                          maxWidth: "100%",
                          maxHeight: "280px",
                        }}
                        draggable={false}
                      />
                      <p className="text-xs text-muted-foreground text-center leading-relaxed">
                        Scan with any phone camera to test. Higher error correction = more tolerant
                        of damage or dirt.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Actions */}
              {imageUrl && !loading && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <FileImage className="h-4 w-4 text-foreground" />
                      Export & share
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Button onClick={downloadPng} className="gap-2">
                        <Download className="h-4 w-4" />
                        Download PNG
                      </Button>
                      <Button
                        variant="outline"
                        onClick={copyImage}
                        className={cn("gap-2", copied && "ring-2 ring-foreground/30")}
                      >
                        <Copy className="h-4 w-4" />
                        {copied ? "Copied!" : "Copy image"}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        {text.length > 0 ? `${text.length} characters` : "No content"}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Shield className="h-3 w-3" />
                        EC: {ecLevel} · {matrixSize}× matrix
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* What is a QR code */}
              <Card className="border-foreground/10 bg-card/50">
                <CardContent className="space-y-3 p-5">
                  <h3 className="text-sm font-semibold">What is a QR code?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A QR (Quick Response) code is a two-dimensional barcode that stores data in a
                    square grid of black and white modules. A phone camera can read it instantly —
                    no app required for most content types.
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {[
                      { label: "URLs", desc: "Open websites instantly" },
                      { label: "Text", desc: "Share notes and messages" },
                      { label: "Contacts", desc: "vCard — save to contacts" },
                      { label: "Wi-Fi", desc: "Join networks without typing" },
                      { label: "Email / SMS", desc: "Pre-filled messages" },
                      { label: "Payments", desc: "Payment links and IDs" },
                    ].map((f) => (
                      <div
                        key={f.label}
                        className="rounded-lg border border-border/50 bg-background p-3"
                      >
                        <div className="font-medium text-foreground">{f.label}</div>
                        <div className="text-muted-foreground mt-0.5">{f.desc}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* ---- Practice tasks ---- */}
          <div className="mt-10 space-y-6">
            <div className="flex items-center gap-3 text-sm font-medium">
              <Clock className="h-4 w-4 text-foreground" />
              Practice tasks
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Link to your portfolio",
                  hint: "Encode your portfolio URL and test it with your phone camera.",
                },
                {
                  title: "Share contact details",
                  hint: "Create a vCard QR so someone can save your phone number with one scan.",
                },
                {
                  title: "Wi-Fi login card",
                  hint: "Generate a Wi-Fi QR for your home or lab network — guests scan to join.",
                },
                {
                  title: "Email link",
                  hint: "Make a QR that opens a pre-filled email to your instructor.",
                },
                {
                  title: "Review error correction",
                  hint: "Encode the same text at L, M, Q and H — compare the density differences.",
                },
                {
                  title: "Colour test",
                  hint: "Use a dark foreground on a light background. Try a light foreground — what happens?",
                },
              ].map((t, i) => (
                <Card
                  key={i}
                  className="group cursor-pointer transition-colors hover:border-foreground/20 hover:bg-card/50"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/50 bg-background text-xs font-medium text-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{t.title}</p>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          {t.hint}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* ---- Footer note ---- */}
          <p className="mt-12 text-center text-xs text-muted-foreground">
            CEA Lab — Learn · Practice · Experiment · Assess · Build. Free browser tools from Cyber
            Elias Academy, Lagos.
          </p>
        </div>
      </PageShell>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  QR code instance interface                                        */
/* ------------------------------------------------------------------ */

interface QRCodeInstance {
  addData(data: string, mode?: string): void;
  make(): void;
  getModuleCount(): number;
  isDark(row: number, col: number): boolean;
}
