"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import data from "@/data/supplier/afkit-observations.json";
import { env } from "@/lib/env";

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
  return (
    <>
      <p className="text-muted-foreground mt-6 text-sm">
        Guide prices are shown where available. Delivery is quoted separately.
      </p>
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
                      Estimated price: ₦
                      {(item.priceKobo / 100).toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  ) : (
                    <p className="text-muted-foreground mt-3 text-sm">Price on request</p>
                  )}
                  <div className="mt-auto pt-5">
                    <Button asChild className="w-full">
                      <a href={`https://wa.me/2349058628386?text=${encodeURIComponent(message)}`}>
                        Order on WhatsApp
                      </a>
                    </Button>
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
