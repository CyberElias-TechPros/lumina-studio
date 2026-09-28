import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Loader2, Lock, ShieldCheck, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageShell } from "@/components/marketing/shell";
import { useTurnstile } from "@/components/turnstile";
import { ApiError } from "@/lib/errors";
import { formatNaira, getDigitalProduct, productPath, returnPath } from "@/data/digital-products";
import { startShopCheckout } from "@/lib/api/shop";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/shop/$slug/checkout")({
  parseParams: (params) => ({ slug: params.slug }),
  stringifyParams: (params) => ({ slug: params.slug }),
  validateSearch: (search: Record<string, unknown>) => z.object({}).parse(search),
  loader: ({ params }) => {
    const product = getDigitalProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    return getPageHead({
      title: p ? `Checkout — ${p.title}` : "Checkout",
      description: p
        ? `Pay ${formatNaira(p.price)} for ${p.title}. Paystack handles the card payment; the file is delivered electronically after confirmation.`
        : "Checkout",
      path: p ? `/shop/${p.slug}/checkout` : "/shop",
      noIndex: true,
    });
  },
  component: CheckoutPage,
});

function CheckoutPage() {
  const { product } = Route.useLoaderData();
  const turnstile = useTurnstile();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const trimmedEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail)) {
      setFieldErrors({ email: "Enter a valid email address." });
      return;
    }
    if (trimmedEmail.length > 254) {
      setFieldErrors({ email: "Email is too long." });
      return;
    }
    if (name.length > 120) {
      setFieldErrors({ name: "Name is too long." });
      return;
    }

    setSubmitting(true);
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "https://www.cea.ng";
      const redirectUrl = `${origin}${returnPath(product.slug)}`;
      const response = await startShopCheckout({
        productSlug: product.slug,
        email: trimmedEmail.toLowerCase(),
        name: name.trim() || undefined,
        redirectUrl,
        turnstileToken: turnstile.token,
      });
      // Real Paystack: bounce the buyer to the hosted checkout. Mock mode:
      // same URL — the only difference is the buyer can still proceed because
      // no real Paystack call was made server-side.
      window.location.assign(response.authorizationUrl);
    } catch (err) {
      turnstile.reset();
      if (err instanceof ApiError && err.fieldErrors) {
        setFieldErrors(
          Object.fromEntries(
            Object.entries(err.fieldErrors).map(([k, v]) => [k, v[0] ?? "Invalid."]),
          ),
        );
        return;
      }
      setError(
        err instanceof ApiError
          ? err.message
          : "We could not start your checkout. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageShell>
      <section className="container-page py-12 md:py-16">
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link to={productPath(product.slug)}>
            <ArrowLeft className="size-4" /> Back to {product.title}
          </Link>
        </Button>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <form className="space-y-5" onSubmit={submit}>
            <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Checkout
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Pay once, get the file by email within one business day. We never create an account
              for you — the download link is delivered to the email below.
            </p>

            <div className="space-y-2">
              <Label htmlFor="email">Email for the download</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="you@business.ng"
                className="h-11"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting}
                autoComplete="email"
              />
              {fieldErrors.email && <p className="text-error text-xs">{fieldErrors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Your name (optional)</Label>
              <Input
                id="name"
                type="text"
                placeholder="Ada Obi"
                className="h-11"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={submitting}
                autoComplete="name"
              />
              {fieldErrors.name && <p className="text-error text-xs">{fieldErrors.name}</p>}
            </div>

            <turnstile.Widget />

            {error && (
              <p className="text-error bg-error/10 rounded-md px-3 py-2 text-sm">{error}</p>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={submitting || !turnstile.ready}
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Redirecting to Paystack…
                </>
              ) : (
                <>
                  <Lock className="size-4" /> Pay {formatNaira(product.price)} securely
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
            <p className="text-muted-foreground text-xs">
              You will be redirected to Paystack to enter your card details. We never see or store
              your card number.
            </p>
          </form>

          <Card className="border-card h-fit shadow-soft">
            <CardContent className="space-y-5 p-6">
              <div>
                <Badge variant="outline">Order summary</Badge>
                <h2 className="font-display mt-3 text-lg font-semibold">{product.title}</h2>
                <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>
              <div className="text-muted-foreground flex items-center justify-between border-t pt-4 text-sm">
                <span>One-time price</span>
                <span className="text-foreground font-display text-base font-semibold tabular-nums">
                  {formatNaira(product.price)}
                </span>
              </div>
              <div className="text-muted-foreground flex items-center justify-between text-sm">
                <span>Delivery</span>
                <span className="text-foreground">Free (electronic)</span>
              </div>
              <div className="text-muted-foreground flex items-center justify-between border-t pt-4 text-sm">
                <span className="font-display text-foreground text-base font-semibold">
                  Total today
                </span>
                <span className="font-display text-foreground text-base font-semibold tabular-nums">
                  {formatNaira(product.price)}
                </span>
              </div>
              <ul className="text-muted-foreground space-y-2 border-t pt-4 text-xs">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 size-3.5 shrink-0" /> 14-day refund window,
                  including a change of mind.
                </li>
                <li className="flex items-start gap-2">
                  <Smartphone className="mt-0.5 size-3.5 shrink-0" /> Paystack supports cards,
                  transfers and USSD. No extra fee at the bank page.
                </li>
                <li className="flex items-start gap-2">
                  <Lock className="mt-0.5 size-3.5 shrink-0" /> This is a one-off purchase. No
                  subscription, no recurring charge.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
