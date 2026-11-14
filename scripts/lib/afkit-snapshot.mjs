/** Runs in an isolated browser page. Only recognizes one unambiguous card
 * per image; HTML is not trusted and text is never executed or published. */
export function extractVisibleCards() {
  const cards = [];
  const images = [...document.querySelectorAll("img")];
  for (const image of images) {
    let url;
    try {
      url = new URL(image.currentSrc || image.src, location.href);
    } catch {
      continue;
    }
    if (
      url.protocol !== "https:" ||
      url.hostname !== "images.afkit.ng" ||
      url.username ||
      url.password
    )
      continue;
    let node = image.parentElement;
    let card = null;
    for (let depth = 0; node && depth < 10; depth++, node = node.parentElement) {
      const titles = node.querySelectorAll("h2");
      const pictures = node.querySelectorAll("img");
      if (
        titles.length === 1 &&
        pictures.length === 1 &&
        /\badd to cart\b/i.test(node.innerText || "")
      ) {
        card = node;
        break;
      }
    }
    if (!card) continue;
    const heading = card.querySelector("h2")?.innerText?.replace(/\s+/g, " ").trim() || "";
    const text = card.innerText || "";
    const before = text.slice(0, text.search(/\badd to cart\b/i));
    const quantities = [...before.matchAll(/(?:^|\n)\s*(\d+)\s+left\s*(?=\n|$)/gi)];
    const conditions = [...before.matchAll(/(?:^|\n)\s*(UK Used|Brand New)\s*(?=\n|$)/gi)];
    const priceTokens = [...before.matchAll(/₦\s*([\d,]+(?:\.\d+)?)/g)].map((m) => m[1]);
    if (
      !heading ||
      heading.length > 1000 ||
      priceTokens.length === 0 ||
      priceTokens.length > 2 ||
      quantities.length > 1 ||
      conditions.length > 1
    )
      continue;
    cards.push({
      imageUrl: url.href,
      title: heading,
      quantity: quantities.length ? quantities[0][1] : null,
      condition: conditions.length ? conditions[0][1] : null,
      prices: priceTokens,
    });
  }
  const total = document.body?.innerText?.match(/DISCOVERED\s+([\d,]+)\s+GADGETS/i);
  return { total: total ? Number(total[1].replace(/,/g, "")) : null, cards };
}

/** Produce a human review snapshot, not a sales catalog or merchant feed. */
export function renderSnapshot(cards, observedAt) {
  const lines = [
    `# Afkit observed listing — ${observedAt}`,
    "",
    "Review only. No stable supplier SKU, wholesale cost, product rights, current availability or fulfillment has been verified.",
    "",
  ];
  for (const card of cards) {
    lines.push(
      `![Observation](${card.imageUrl})`,
      "",
      ...(card.quantity === null ? [] : [`${card.quantity} left`, ""]),
      ...(card.condition === null ? [] : [card.condition, ""]),
      `## ${card.title}`,
      "",
      card.prices.map((p) => `₦${p}`).join(""),
      "",
      "Add to cart",
      "",
    );
  }
  return lines.join("\n");
}
