"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import data from "@/data/supplier/afkit-observations.json";

export function GadgetsCatalog() {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return data.observations.filter((item) => item.title.toLocaleLowerCase().includes(query));
  }, [search]);
  return (
    <>
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
            const message = `Hello Cyber Elias Academy! Please confirm the current price, condition, availability and delivery for this Afkit item:\n${item.title}\nPhoto reference: ${item.image}`;
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
                  <div>
                    <Badge variant="outline">
                      {item.condition === "used"
                        ? "UK used (supplier listing)"
                        : "New (supplier listing)"}
                    </Badge>
                  </div>
                  <h2 className="font-display mt-4 text-base font-semibold leading-snug">
                    {item.title}
                  </h2>
                  <p className="text-muted-foreground mt-3 text-sm">
                    Price and availability to be confirmed.
                  </p>
                  <div className="mt-auto pt-5">
                    <Button asChild className="w-full">
                      <a href={`https://wa.me/2349058628386?text=${encodeURIComponent(message)}`}>
                        Ask about this item
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
