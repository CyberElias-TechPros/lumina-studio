/** The supplier supplies no structured category; classify only recognisable titles. */
export function gadgetCategory(
  title: string,
): "laptops" | "phones" | "monitors" | "accessories" | "other" {
  const t = title.toLowerCase();
  if (
    /\b(mouse|charger|dock(?:ing)?|flash drive|pouch|stand|keyboard|headphones|earbuds|adapter|cable)\b/.test(
      t,
    )
  )
    return "accessories";
  if (/\b(monitor|display|aoc|p2419h)\b|\b\d{2}[- ]inch\b/.test(t)) return "monitors";
  if (/\b(iphone|ipad|pixel|galaxy|smartphone|tablet)\b/.test(t)) return "phones";
  if (
    /\b(laptop|notebook|macbook|elitebook|probook|zbook|latitude|precision|inspiron|thinkpad|ideapad|alienware|nitro|xps)\b/.test(
      t,
    )
  )
    return "laptops";
  return "other";
}

export type SortOrder = "featured" | "name" | "price-low" | "price-high";
export function compareShopItems<T>(
  a: T,
  b: T,
  sort: SortOrder,
  title: (v: T) => string,
  price: (v: T) => number | null,
): number {
  if (sort === "featured") return 0;
  if (sort === "name") return title(a).localeCompare(title(b));
  const pa = price(a),
    pb = price(b);
  if (pa === null || pb === null) return pa === pb ? 0 : pa === null ? 1 : -1;
  return sort === "price-low" ? pa - pb : pb - pa;
}
