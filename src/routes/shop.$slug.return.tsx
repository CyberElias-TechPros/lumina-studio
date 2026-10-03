"use client";

import { useEffect, useState } from "react";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link, notFound } from "@/lib/next-compat/router";
import { z } from "zod";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  Loader2,
  MessageCircle,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell } from "@/components/marketing/shell";
import { formatNaira, getDigitalProduct } from "@/data/digital-products";
import { fetchShopOrder, type ShopOrder } from "@/lib/api/shop";
import { ApiError } from "@/lib/errors";

export const Route = createFileRoute("/shop/$slug/return")({
  parseParams: (params) => ({ slug: params.slug }),
  stringifyParams: (params) => ({ slug: params.slug }),
  validateSearch: (search: Record<string, unknown>) =>
    z.object({ reference: z.string().optional() }).parse(search),
  loader: ({ params }) => {
    const product = getDigitalProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: () => ({
    meta: [
      {
        title: "Order complete — Cyber Elias Academy",
        name: "robots",
        content: "noindex,nofollow",
      },
    ],
  }),
  component: ReturnPage,
});

type ReturnState =
  | { status: "loading" }
  | { status: "paid"; order: ShopOrder }
  | { status: "pending" }
  | { status: "failed" }
  | { status: "review"; order: ShopOrder }
  | { status: "error"; message: string };

function ReturnPage() {
  const { product } = Route.useLoaderData();
  const { reference } = Route.useSearch();
  const [state, setState] = useState<ReturnState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!reference) {
      setState({
        status: "error",
        message: "We could not find a payment reference on this page.",
      });
      return;
    }
    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const order = await fetchShopOrder(reference);
        if (cancelled) return;
        if (order.status === "success") {
          setState({ status: "paid", order });
        } else if (order.status === "review") {
          setState({ status: "review", order });
        } else if (order.status === "failed") {
          setState({ status: "failed" });
        } else {
          setState({ status: "pending" });
        }
      } catch (err) {
        if (cancelled) return;
        setState({
          status: "error",
          message:
            err instanceof ApiError
              ? err.message
              : "We could not confirm your payment. It usually appears within a minute.",
        });
      }
    }, 600);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [reference, attempt]);

  return (
    <PageShell>
      <section className="container-page py-12 md:py-16">
        <div className="mx-auto max-w-xl">
          <Card className="border-card shadow-soft">
            <CardContent className="p-8 text-center">
              {state.status === "loading" && (
                <>
                  <Loader2 className="text-primary mx-auto size-10 animate-spin" />
                  <p className="font-display mt-5 text-lg font-bold">Confirming with Paystack…</p>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    This usually takes a few seconds. Do not press pay again.
                  </p>
                </>
              )}

              {state.status === "paid" && (
                <>
                  <span className="bg-success/10 text-success mx-auto grid size-14 place-items-center rounded-full">
                    <BadgeCheck className="size-7" />
                  </span>
                  <p className="font-display mt-5 text-lg font-bold">Payment confirmed</p>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    We received {formatNaira(state.order.amount)} for {product.title}. Your download
                    link is on its way to {state.order.email}.
                  </p>
                  <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
                    If you do not see the email within one business day, message us on WhatsApp with
                    reference <code className="font-mono">{state.order.reference}</code>.
                  </p>
                </>
              )}

              {state.status === "review" && (
                <>
                  <span className="bg-warning/10 text-warning mx-auto grid size-14 place-items-center rounded-full">
                    <Clock3 className="size-7" />
                  </span>
                  <p className="font-display mt-5 text-lg font-bold">Payment under review</p>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    We received your payment of {formatNaira(state.order.amount)} but the amount on
                    file did not match. Our team will confirm and email you the download link.
                    Reference <code className="font-mono">{state.order.reference}</code>.
                  </p>
                </>
              )}

              {state.status === "pending" && (
                <>
                  <span className="bg-warning/10 text-warning mx-auto grid size-14 place-items-center rounded-full">
                    <Clock3 className="size-7" />
                  </span>
                  <p className="font-display mt-5 text-lg font-bold">Payment in progress</p>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    Paystack has not confirmed yet. Check back in a minute — or refresh manually.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-5"
                    onClick={() => setAttempt((a) => a + 1)}
                  >
                    <RefreshCw className="size-4" /> Check again
                  </Button>
                </>
              )}

              {state.status === "failed" && (
                <>
                  <span className="bg-error/10 text-error mx-auto grid size-14 place-items-center rounded-full">
                    <XCircle className="size-7" />
                  </span>
                  <p className="font-display mt-5 text-lg font-bold">Payment did not go through</p>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    Nothing was charged. You can try again any time from the product page.
                  </p>
                </>
              )}

              {state.status === "error" && (
                <>
                  <span className="bg-warning/10 text-warning mx-auto grid size-14 place-items-center rounded-full">
                    <Clock3 className="size-7" />
                  </span>
                  <p className="font-display mt-5 text-lg font-bold">Just a moment</p>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {state.message}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-5"
                    onClick={() => setAttempt((a) => a + 1)}
                  >
                    <RefreshCw className="size-4" /> Check again
                  </Button>
                </>
              )}

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild size="sm">
                  <Link to="/shop">
                    Browse the shop <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href="https://wa.me/2349058628386">
                    <MessageCircle className="size-4" /> WhatsApp us
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
