"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import data from "@/data/supplier/afkit-observations.json";
import { env } from "@/lib/env";
import { Link } from "@/lib/next-compat/router";
import {
  digitalProducts,
  formatNaira,
  productPath,
  deliveryWindowLabel,
} from "@/data/digital-products";
import { gadgetCategory, compareShopItems, type SortOrder } from "@/lib/shop-filters";
import {
  BASKET_KEY,
  BASKET_LIMIT,
  QUANTITY_LIMIT,
  readBasket,
  type BasketEntry,
} from "@/lib/gadget-basket";
import { createGadgetOrder, lookupGadgetOrder, type GadgetOrderReceipt } from "@/lib/api/gadgets";
import { getErrorMessage } from "@/lib/errors";

type Gadget = {
  image: string;
  title: string;
  condition: string;
  observedQuantity?: number | null;
  priceKobo?: number | null;
};
type Catalog = { observedAt: string | null; fresh: boolean; items: Gadget[] };

export function GadgetsCatalog({ includeDigital = false }: { includeDigital?: boolean }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [condition, setCondition] = useState("all");
  const [sort, setSort] = useState<SortOrder>("featured");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [basket, setBasket] = useState<BasketEntry[]>([]);
  const [basketReady, setBasketReady] = useState(false);
  const [basketNotice, setBasketNotice] = useState("");
  const [checking, setChecking] = useState(false);
  const [priceCheck, setPriceCheck] = useState<{
    key: string;
    subtotalKobo?: number;
    error?: string;
    expiresAt: number;
  } | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [submittingOrder, setSubmittingOrder] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [orderReceipt, setOrderReceipt] = useState<GadgetOrderReceipt | null>(null);
  const [trackOpen, setTrackOpen] = useState(false);
  const [trackRef, setTrackRef] = useState("");
  const [trackEmail, setTrackEmail] = useState("");
  const [tracking, setTracking] = useState(false);
  const [trackError, setTrackError] = useState("");
  const [trackedOrder, setTrackedOrder] = useState<GadgetOrderReceipt | null>(null);
  const basketKey = JSON.stringify(basket);

  async function submitOrder(event: React.FormEvent) {
    event.preventDefault();
    if (!basket.length || submittingOrder) return;
    setSubmittingOrder(true);
    setOrderError("");
    try {
      const receipt = await createGadgetOrder({
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        customerPhone: customerPhone.trim(),
        deliveryAddress: deliveryAddress.trim() || undefined,
        notes: orderNotes.trim() || undefined,
        items: basket.map((entry) => ({ image: entry.image, quantity: entry.quantity })),
      });
      setOrderReceipt(receipt);
      setBasket([]);
      setCheckoutOpen(false);
      setBasketNotice(`Order ${receipt.ref} submitted.`);
    } catch (error) {
      setOrderError(getErrorMessage(error));
    } finally {
      setSubmittingOrder(false);
    }
  }

  async function handleTrackOrder(event: React.FormEvent) {
    event.preventDefault();
    const cleanRef = trackRef.trim();
    if (!cleanRef || tracking) return;
    setTracking(true);
    setTrackError("");
    setTrackedOrder(null);
    try {
      const found = await lookupGadgetOrder(cleanRef, trackEmail.trim() || undefined);
      setTrackedOrder(found);
    } catch (error) {
      setTrackError(getErrorMessage(error));
    } finally {
      setTracking(false);
    }
  }
  useEffect(() => {
    if (!priceCheck) return;
    const timeout = window.setTimeout(
      () => setPriceCheck(null),
      Math.max(0, priceCheck.expiresAt - Date.now()),
    );
    return () => window.clearTimeout(timeout);
  }, [priceCheck]);
  async function checkPrices() {
    if (!env.apiUrl || !basket.length || checking) return;
    const key = basketKey;
    setChecking(true);
    setPriceCheck(null);
    try {
      const response = await fetch(`${env.apiUrl}/v1/gadgets/price-check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: basket }),
      });
      if (!response.ok) throw new Error("Price check failed");
      const result = (await response.json()) as { observedAt: string; subtotalKobo: number };
      const expiry = Math.min(
        Date.now() + 5 * 60_000,
        Date.parse(result.observedAt) + 18 * 60 * 60_000,
      );
      if (
        !Number.isFinite(expiry) ||
        expiry <= Date.now() ||
        !Number.isSafeInteger(result.subtotalKobo) ||
        result.subtotalKobo <= 0
      )
        throw new Error("Invalid price check");
      setPriceCheck({ key, subtotalKobo: result.subtotalKobo, expiresAt: expiry });
    } catch {
      setPriceCheck({
        key,
        error: "Could not check these prices. Review your basket or try again later.",
        expiresAt: Date.now() + 5 * 60_000,
      });
    } finally {
      setChecking(false);
    }
  }
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
  const min = minPrice === "" ? null : Number(minPrice);
  const max = maxPrice === "" ? null : Number(maxPrice);
  const priceInvalid =
    (min !== null && (!Number.isFinite(min) || min < 0)) ||
    (max !== null && (!Number.isFinite(max) || max < 0)) ||
    (min !== null && max !== null && min > max);
  function priceMatches(kobo: number | null | undefined) {
    if (priceInvalid) return false;
    if (min === null && max === null) return true;
    return (
      kobo != null && (min === null || kobo >= min * 100) && (max === null || kobo <= max * 100)
    );
  }
  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return items
      .filter(
        (item) =>
          item.title.toLocaleLowerCase().includes(query) &&
          category !== "digital" &&
          (category === "all" || gadgetCategory(item.title) === category) &&
          (condition === "all" || item.condition === condition) &&
          priceMatches(catalog?.fresh ? item.priceKobo : null),
      )
      .sort((a, b) =>
        compareShopItems(
          a,
          b,
          sort,
          (v) => v.title,
          (v) => (catalog?.fresh ? (v.priceKobo ?? null) : null),
        ),
      );
    // priceMatches is derived only from these primitive filter values.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, items, category, condition, sort, minPrice, maxPrice, catalog?.fresh]);
  const digital =
    includeDigital && (category === "all" || category === "digital") && condition === "all"
      ? digitalProducts
          .filter(
            (item) =>
              `${item.title} ${item.shortDescription} ${item.tags.join(" ")}`
                .toLocaleLowerCase()
                .includes(search.trim().toLocaleLowerCase()) && priceMatches(item.price * 100),
          )
          .sort((a, b) =>
            compareShopItems(
              a,
              b,
              sort,
              (v) => v.title,
              (v) => v.price * 100,
            ),
          )
      : [];
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
        Gadget prices and availability may change before your order is confirmed. Delivery is quoted
        separately for gadgets.
      </p>
      <section
        id="gadget-basket"
        aria-labelledby="basket-heading"
        className="bg-muted/40 mt-6 rounded-xl border p-5"
      >
        <h2 id="basket-heading" className="font-display text-lg font-semibold">
          Gadget basket ({basket.reduce((sum, item) => sum + item.quantity, 0)})
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
            <div className="mt-4">
              <Button variant="outline" onClick={checkPrices} disabled={!env.apiUrl || checking}>
                {checking ? "Checking prices…" : "Check latest basket prices"}
              </Button>
              {priceCheck?.key === basketKey && (
                <p role="status" className="text-muted-foreground mt-2 text-sm">
                  {priceCheck.error ??
                    `Latest item subtotal: ${money(priceCheck.subtotalKobo!)}. Delivery is separate; this is not an order or a stock reservation.`}
                </p>
              )}
            </div>
            {unavailable ? (
              <p className="text-muted-foreground mt-2 text-sm">
                Remove unavailable items to continue.
              </p>
            ) : (
              <div className="mt-4 flex flex-wrap gap-3">
                <Button type="button" onClick={() => setCheckoutOpen((open) => !open)}>
                  {checkoutOpen ? "Hide order form" : "Place order request"}
                </Button>
                {basketHref.length <= 8000 && (
                  <Button variant="outline" asChild>
                    <a href={basketHref} rel="nofollow noopener noreferrer">
                      Send basket on WhatsApp
                    </a>
                  </Button>
                )}
              </div>
            )}
            {checkoutOpen && !unavailable && (
              <form
                onSubmit={submitOrder}
                className="bg-background mt-4 grid gap-3 rounded-xl border p-4 sm:grid-cols-2"
              >
                <p className="text-muted-foreground text-xs sm:col-span-2">
                  Prices are verified against the latest supplier catalogue on submit. Our team
                  confirms stock and delivery before payment.
                </p>
                <label className="space-y-1 text-xs font-semibold">
                  <span>Full name</span>
                  <Input
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Adaeze Okafor"
                    required
                  />
                </label>
                <label className="space-y-1 text-xs font-semibold">
                  <span>Email address</span>
                  <Input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </label>
                <label className="space-y-1 text-xs font-semibold">
                  <span>Phone / WhatsApp number</span>
                  <Input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+2348012345678"
                    required
                  />
                </label>
                <label className="space-y-1 text-xs font-semibold">
                  <span>Delivery address (optional)</span>
                  <Input
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="City, state, landmark"
                  />
                </label>
                <label className="space-y-1 text-xs font-semibold sm:col-span-2">
                  <span>Notes (optional)</span>
                  <Input
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Specs check, pickup preference, etc."
                  />
                </label>
                {orderError && (
                  <p role="alert" className="text-destructive text-xs font-semibold sm:col-span-2">
                    {orderError}
                  </p>
                )}
                <div className="flex justify-end gap-2 sm:col-span-2">
                  <Button type="button" variant="outline" onClick={() => setCheckoutOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submittingOrder}>
                    {submittingOrder ? "Submitting order…" : "Confirm order request"}
                  </Button>
                </div>
              </form>
            )}
          </>
        )}

        {orderReceipt && (
          <div className="bg-background mt-4 rounded-xl border p-4" role="status">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-display text-base font-bold">
                Order submitted: {orderReceipt.ref}
              </p>
              <Badge variant="secondary" className="capitalize">
                {orderReceipt.status.replaceAll("_", " ")}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              Server-verified subtotal: {money(orderReceipt.subtotalKobo)}. Save your reference{" "}
              <strong>{orderReceipt.ref}</strong> to track confirmation and fulfillment below.
            </p>
          </div>
        )}

        <div className="mt-4 border-t pt-4">
          <button
            type="button"
            className="text-primary text-xs font-semibold underline"
            onClick={() => setTrackOpen((v) => !v)}
          >
            {trackOpen ? "Hide order tracker" : "Track an existing gadget order"}
          </button>
          {trackOpen && (
            <form onSubmit={handleTrackOrder} className="mt-3 flex flex-wrap items-end gap-2">
              <label className="space-y-1 text-xs font-semibold">
                <span>Order reference</span>
                <Input
                  value={trackRef}
                  onChange={(e) => setTrackRef(e.target.value)}
                  placeholder="CEA-GDG-2026-104218"
                  className="h-9"
                  required
                />
              </label>
              <label className="space-y-1 text-xs font-semibold">
                <span>Email used on order</span>
                <Input
                  type="email"
                  value={trackEmail}
                  onChange={(e) => setTrackEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-9"
                />
              </label>
              <Button type="submit" size="sm" disabled={tracking}>
                {tracking ? "Checking…" : "Check status"}
              </Button>
            </form>
          )}
          {trackError && (
            <p role="alert" className="text-destructive mt-2 text-xs font-semibold">
              {trackError}
            </p>
          )}
          {trackedOrder && (
            <div className="bg-background mt-3 rounded-lg border p-3 text-xs">
              <p className="font-semibold">
                {trackedOrder.ref} ·{" "}
                <span className="capitalize">{trackedOrder.status.replaceAll("_", " ")}</span>
              </p>
              <p className="text-muted-foreground mt-1">
                Subtotal: {money(trackedOrder.subtotalKobo)} · {trackedOrder.items.length} item(s)
              </p>
              {trackedOrder.adminNote && (
                <p className="mt-1">Note from Academy: {trackedOrder.adminNote}</p>
              )}
            </div>
          )}
        </div>
      </section>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="text-sm font-semibold" htmlFor="gadget-search">
          {includeDigital ? "Search products" : "Search gadgets"}
          <Input
            id="gadget-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name..."
            className="mt-2"
          />
        </label>
        <label className="text-sm font-semibold">
          Category
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="bg-background mt-2 block w-full rounded-md border p-2"
          >
            <option value="all">All {includeDigital ? "products" : "gadgets"}</option>
            {includeDigital && <option value="digital">Digital products</option>}
            <option value="laptops">Laptops</option>
            <option value="phones">Phones &amp; tablets</option>
            <option value="monitors">Monitors</option>
            <option value="accessories">Accessories</option>
            <option value="other">Other gadgets</option>
          </select>
        </label>
        <label className="text-sm font-semibold">
          Condition
          <select
            value={condition}
            onChange={(event) => setCondition(event.target.value)}
            className="bg-background mt-2 block w-full rounded-md border p-2"
          >
            <option value="all">All conditions</option>
            <option value="new">New</option>
            <option value="used">UK used</option>
          </select>
        </label>
        <label className="text-sm font-semibold">
          Sort within each section
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOrder)}
            className="bg-background mt-2 block w-full rounded-md border p-2"
          >
            <option value="featured">Featured</option>
            <option value="name">Name A–Z</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </label>
        <label className="text-sm font-semibold">
          Minimum price (₦)
          <Input
            className="mt-2"
            type="number"
            min="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </label>
        <label className="text-sm font-semibold">
          Maximum price (₦)
          <Input
            className="mt-2"
            type="number"
            min="0"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </label>
      </div>
      {priceInvalid && (
        <p className="text-destructive mt-3 text-sm" role="alert">
          Enter a valid price range.
        </p>
      )}
      {(min !== null || max !== null) && (
        <p className="text-muted-foreground mt-2 text-sm">
          Items without a current price are excluded from price filters.
        </p>
      )}
      {includeDigital && (
        <section className="mt-8" aria-labelledby="digital-heading">
          <h2 id="digital-heading" className="font-display text-xl font-semibold">
            Digital products
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Pay online; our team emails your file within one business day.
          </p>
          {digital.length === 0 ? (
            <p className="text-muted-foreground mt-4">No digital products match these filters.</p>
          ) : (
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {digital.map((product) => (
                <Card key={product.id} className="flex flex-col overflow-hidden">
                  <div className="bg-muted aspect-[4/3]">
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="flex flex-1 flex-col p-5">
                    <Badge variant="outline" className="w-fit">
                      Digital · {product.category}
                    </Badge>
                    <h3 className="font-display mt-4 font-semibold">
                      <Link to={productPath(product.slug)} className="hover:underline">
                        {product.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground mt-2 text-sm">{product.shortDescription}</p>
                    <p className="text-muted-foreground mt-2 text-xs">
                      Email delivery {deliveryWindowLabel(product.deliveryHours)}
                    </p>
                    <p className="mt-3 text-lg font-semibold">{formatNaira(product.price)}</p>
                    <Button asChild className="mt-auto w-full">
                      <Link to={productPath(product.slug)}>View &amp; buy</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      )}
      <section className="mt-8" aria-label="Gadgets">
        {includeDigital && (
          <h2 id="gadgets-heading" className="font-display text-xl font-semibold">
            Gadgets
          </h2>
        )}
        <p className="text-muted-foreground mt-2 text-sm" role="status">
          {filtered.length} {filtered.length === 1 ? "item" : "items"} shown
        </p>
        {filtered.length === 0 ? (
          <p className="text-muted-foreground mt-8">
            No matches. Try a different search or filter.
          </p>
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
      </section>
    </>
  );
}
