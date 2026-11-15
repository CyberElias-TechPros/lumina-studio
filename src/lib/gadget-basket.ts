/** Browser-only selections: no customer details or prices are persisted. */
export type BasketEntry = { image: string; quantity: number };
export const BASKET_LIMIT = 10;
export const QUANTITY_LIMIT = 10;
export const BASKET_KEY = "cea:gadget-basket:v1";

export function readBasket(raw: string | null): BasketEntry[] {
  if (!raw || raw.length > 10000) return [];
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    const seen = new Set<string>();
    const result: BasketEntry[] = [];
    for (const item of data) {
      if (
        !item ||
        typeof item !== "object" ||
        typeof item.image !== "string" ||
        item.image.length > 500 ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > QUANTITY_LIMIT
      )
        continue;
      let url: URL;
      try {
        url = new URL(item.image);
      } catch {
        continue;
      }
      if (
        url.protocol !== "https:" ||
        url.hostname !== "images.afkit.ng" ||
        url.port ||
        url.username ||
        url.password ||
        url.hash ||
        seen.has(item.image)
      )
        continue;
      seen.add(item.image);
      result.push({ image: item.image, quantity: item.quantity });
      if (result.length === BASKET_LIMIT) break;
    }
    return result;
  } catch {
    return [];
  }
}
