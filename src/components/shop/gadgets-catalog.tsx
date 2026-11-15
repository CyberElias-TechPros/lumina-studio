"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import data from "@/data/supplier/afkit-observations.json";
import { env } from "@/lib/env";
import {
  BASKET_KEY,
  BASKET_LIMIT,
  QUANTITY_LIMIT,
  readBasket,
  type BasketEntry,
} from "@/lib/gadget-basket";

type Gadget = {
  image: string;
  title: string;
  condition: string;
  observedQuantity?: number | null;
  priceKobo?: number | null;
};
type Catalog = { observedAt: string | null; fresh: boolean; items: Gadget[] };

export function GadgetsCatalog() {
  const [search, setSearch] = useState("");
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [basket, setBasket] = useState<BasketEntry[]>([]);
  const [basketReady, setBasketReady] = useState(false);
  const [basketNotice, setBasketNotice] = useState("");
  useEffect(() => {
    try {
      setBasket(readBasket(window.localStorage.getItem(BASKET_KEY)));
    } catch {
      /* storage unavailable */
    }
    setBasketReady(true);
  }, []);
  useEffect(() => {
    if (!basketReady) return;
    try {
      window.localStorage.setItem(BASKET_KEY, JSON.stringify(basket));
    } catch {
      /* still usable this session */
    }
  }, [basket, basketReady]);
  useEffect(() => {
    if (!env.apiUrl) return;
    let disposed = false;
    let controller: AbortController | null = null;
    async function refresh() {
      controller?.abort();
      controller = new AbortController();
      const current = controller;
      const timeout = window.setTimeout(() => current.abort(), 10_000);
      try {
        const response = await fetch(`${env.apiUrl}/v1/gadgets/catalog`, {
          cache: "no-store",
          signal: current.signal,
        });
        if (!response.ok) throw new Error("Catalogue unavailable");
        const payload: Catalog = await response.json();
        if (!Array.isArray(payload.items) || payload.items.length === 0)
          throw new Error("No observations");
        if (!disposed) setCatalog(payload);
      } catch {
        if (!disposed && current === controller) setCatalog(null);
      } finally {
        window.clearTimeout(timeout);
      }
    }
    void refresh();
    const timer = window.setInterval(() => void refresh(), 5 * 60_000);
    return () => {
      disposed = true;
      controller?.abort();
      window.clearInterval(timer);
    };
  }, []);
  useEffect(() => {
    if (!catalog?.fresh || !catalog.observedAt) return;
    const expiry = Date.parse(catalog.observedAt) + 18 * 60 * 60_000;
    if (!Number.isFinite(expiry)) {
      setCatalog(null);
      return;
    }
    const hideIfExpired = () => {
      if (Date.now() >= expiry)
        setCatalog((current) =>
          current?.observedAt === catalog.observedAt ? { ...current, fresh: false } : current,
        );
    };
    const timer = window.setTimeout(hideIfExpired, Math.max(0, expiry - Date.now()));
    document.addEventListener("visibilitychange", hideIfExpired);
    window.addEventListener("focus", hideIfExpired);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", hideIfExpired);
      window.removeEventListener("focus", hideIfExpired);
    };
  }, [catalog?.fresh, catalog?.observedAt]);
  const items: Gadget[] = catalog?.items ?? data.observations;
  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return items.filter((item) => item.title.toLocaleLowerCase().includes(query));
  }, [search, items]);
  const basketItems = basket.map((entry) => ({
    ...entry,
    item: items.find((item) => item.image === entry.image),
  }));
  const canQuote =
    catalog?.fresh &&
    basketItems.length > 0 &&
    basketItems.every(
      ({ item }) =>
        item &&
        Number.isSafeInteger(item.priceKobo) &&
        item.priceKobo! > 0 &&
        item.observedQuantity !== 0,
    );
  const subtotalValue = canQuote
    ? basketItems.reduce((sum, { item, quantity }) => sum + item!.priceKobo! * quantity, 0)
    : null;
  const subtotal =
    subtotalValue !== null && Number.isSafeInteger(subtotalValue) ? subtotalValue : null;
  const money = (kobo: number) =>
    `₦${(kobo / 100).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const unavailable = basketItems.some(
    ({ item }) => !item || (catalog?.fresh && item.observedQuantity === 0),
  );
  const basketMessage = `Hello Cyber Elias Academy! I'd like to order these gadgets:\n${basketItems.map(({ item, quantity }) => `\n${quantity} × ${item?.title}\nPhoto reference: ${item?.image}`).join("\n")}`;
  const basketHref = `https://wa.me/2349058628386?text=${encodeURIComponent(basketMessage)}`;
  function addToBasket(item: Gadget) {
    if (!basketReady) return;
    const current = basket.find((entry) => entry.image === item.image);
    if (current && current.quantity >= QUANTITY_LIMIT) {
      setBasketNotice(`Maximum ${QUANTITY_LIMIT} per item.`);
      return;
    }
    if (!current && basket.length >= BASKET_LIMIT) {
      setBasketNotice(`Maximum ${BASKET_LIMIT} different items per basket.`);
      return;
    }
    setBasket((prev) =>
      current
        ? prev.map((entry) =>
            entry.image === item.image ? { ...entry, quantity: entry.quantity + 1 } : entry,
          )
        : [...prev, { image: item.image, quantity: 1 }],
    );
    setBasketNotice("Added to your basket.");
  }
  return (
    <>
      <p className="text-muted-foreground mt-6 text-sm">
        Prices and availability may change before your order is confirmed. Delivery is quoted
        separately.
      </p>
      <section
        id="gadget-basket"
        aria-labelledby="basket-heading"
        className="bg-muted/40 mt-6 rounded-xl border p-5"
      >
        <h2 id="basket-heading" className="font-display text-lg font-semibold">
          Your basket ({basket.reduce((sum, item) => sum + item.quantity, 0)})
        </h2>
        <p className="text-muted-foreground mt-2 text-sm" role="status">
          {basketNotice}
        </p>
        {basket.length === 0 ? (
          <p className="text-muted-foreground mt-2 text-sm">Add gadgets to build your order.</p>
        ) : (
          <>
            <ul className="mt-4 space-y-4">
              {basketItems.map(({ image, quantity, item }) => (
                <li
                  key={image}
                  className="flex flex-wrap items-center justify-between gap-3 border-b pb-4"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{item?.title ?? "Item no longer in catalogue"}</p>
                    <p className="text-muted-foreground text-sm">
                      {!item || (catalog?.fresh && item.observedQuantity === 0)
                        ? "Currently unavailable"
                        : catalog?.fresh && item.priceKobo != null
                          ? `${money(item.priceKobo)} each`
                          : "Price on request"}
                    </p>
                  </div>
                  <label className="text-sm">
                    Quantity{" "}
                    <select
                      aria-label={`Quantity for ${item?.title ?? "unavailable item"}`}
                      className="bg-background ml-2 rounded-md border p-2"
                      value={quantity}
                      onChange={(event) =>
                        setBasket((prev) =>
                          prev.map((entry) =>
                            entry.image === image
                              ? { ...entry, quantity: Number(event.target.value) }
                              : entry,
                          ),
                        )
                      }
                    >
                      {Array.from({ length: QUANTITY_LIMIT }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setBasket((prev) => prev.filter((entry) => entry.image !== image))
                    }
                    aria-label={`Remove ${item?.title ?? "unavailable item"}`}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-semibold">
              {subtotal === null
                ? "Subtotal available when all item prices are known."
                : `Subtotal: ${money(subtotal)}`}
            </p>
            {unavailable ? (
              <p className="text-muted-foreground mt-2 text-sm">
                Remove unavailable items to continue.
              </p>
            ) : basketHref.length > 8000 ? (
              <p className="text-muted-foreground mt-2 text-sm">
                Please split this basket into smaller orders.
              </p>
            ) : (
              <Button asChild className="mt-4">
                <a href={basketHref} rel="nofollow noopener noreferrer">
                  Send basket on WhatsApp
                </a>
              </Button>
            )}
          </>
        )}
      </section>
      <div className="mt-8 max-w-lg">
        <label className="mb-2 block text-sm font-semibold" htmlFor="gadget-search">
          Search gadgets
        </label>
        <Input
          id="gadget-search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Try iPhone, Dell, laptop stand..."
        />
        <p className="text-muted-foreground mt-2 text-sm" role="status">
          {filtered.length} {filtered.length === 1 ? "item" : "items"} shown
        </p>
      </div>
      {filtered.length === 0 ? (
        <p className="text-muted-foreground mt-8">No matches. Try a different search.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            const message = `Hello Cyber Elias Academy! I'd like to order this gadget:\n${item.title}\nPhoto reference: ${item.image}`;
            return (
              <Card
                key={item.image}
                className="border-card flex h-full flex-col overflow-hidden shadow-soft"
              >
                <div className="bg-muted aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-contain"
                  />
                </div>
                <CardContent className="flex flex-1 flex-col p-5">
                  {(item.condition === "used" || item.condition === "new") && (
                    <div>
                      <Badge variant="outline">
                        {item.condition === "used" ? "UK used" : "New"}
                      </Badge>
                    </div>
                  )}
                  <h2 className="font-display mt-4 text-base font-semibold leading-snug">
                    {item.title}
                  </h2>
                  {catalog?.fresh && item.priceKobo != null ? (
                    <p className="mt-3 text-lg font-semibold">
                      Price: ₦
                      {(item.priceKobo / 100).toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  ) : (
                    <p className="text-muted-foreground mt-3 text-sm">Price on request</p>
                  )}
                  <div className="mt-auto pt-5">
                    <Button
                      className="w-full"
                      disabled={!basketReady || (catalog?.fresh && item.observedQuantity === 0)}
                      onClick={() => addToBasket(item)}
                    >
                      {catalog?.fresh && item.observedQuantity === 0
                        ? "Currently unavailable"
                        : "Add to basket"}
                    </Button>
                    {basket.length > 0 && (
                      <a
                        href="#gadget-basket"
                        className="text-primary mt-2 block text-center text-sm underline"
                      >
                        View basket ({basket.reduce((sum, entry) => sum + entry.quantity, 0)})
                      </a>
                    )}
                    {!(catalog?.fresh && item.observedQuantity === 0) && (
                      <Button variant="outline" asChild className="mt-2 w-full">
                        <a
                          href={`https://wa.me/2349058628386?text=${encodeURIComponent(message)}`}
                          rel="nofollow noopener noreferrer"
                        >
                          Order on WhatsApp
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
