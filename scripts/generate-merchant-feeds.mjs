// Generates the Google Merchant Center feed files (XML + CSV) from
// src/data/digital-products.json. The two files are byte-identical in
// product data — they only differ in encoding. The Shop pages and the
// feeds share the JSON source so a price change in one place updates
// everything on the next build.
//
// Output paths are the same ones referenced in src/routes/merchant.tsx
// and in the user's Merchant Center scheduled-fetch configuration.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const root = resolve(process.cwd());
const SOURCE = resolve(root, "src/data/digital-products.json");
const XML_OUT = resolve(root, "public/feeds/google-merchant.xml");
const CSV_OUT = resolve(root, "public/feeds/google-merchant.csv");

const SITE_URL = "https://www.cea.ng";

const REQUIRED_COLUMNS = [
  "id",
  "title",
  "description",
  "link",
  "image_link",
  "price",
  "availability",
  "condition",
  "brand",
  "mpn",
  "google_product_category",
  "shipping",
  "tax",
];

function csvEscape(value) {
  const str = value === null || value === undefined ? "" : String(value);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function buildXml(products) {
  const items = products
    .map((p) => {
      const link = `${SITE_URL}/shop/${p.slug}`;
      const imageLink = `${SITE_URL}${p.image}`;
      const productPath = `/shop/${p.slug}`;
      return [
        "    <item>",
        `      <g:id>${escapeXml(p.id)}</g:id>`,
        `      <title>${escapeXml(p.title)}</title>`,
        `      <description>${escapeXml(p.longDescription ?? p.shortDescription)}</description>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <g:image_link>${escapeXml(imageLink)}</g:image_link>`,
        `      <g:price>${escapeXml(`${p.price} ${p.priceCurrency}`)}</g:price>`,
        `      <g:availability>${escapeXml(p.availability)}</g:availability>`,
        `      <g:condition>${escapeXml(p.condition)}</g:condition>`,
        `      <g:brand>Cyber Elias Academy</g:brand>`,
        `      <g:mpn>${escapeXml(p.mpn)}</g:mpn>`,
        p.gtin ? `      <g:gtin>${escapeXml(p.gtin)}</g:gtin>` : "",
        `      <g:google_product_category>${escapeXml(categoryFor(p.category))}</g:google_product_category>`,
        `      <g:shipping>`,
        `        <g:country>NG</g:country>`,
        `        <g:service>Electronic</g:service>`,
        `        <g:price>0.00 NGN</g:price>`,
        `      </g:shipping>`,
        `      <g:tax>`,
        `        <g:country>NG</g:country>`,
        `        <g:rate>0</g:rate>`,
        `      </g:tax>`,
        `      <g:product_type>${escapeXml(p.productType ?? p.category)}</g:product_type>`,
        `      <g:link>${escapeXml(link)}</g:link>`,
        `      <g:mobile_link>${escapeXml(link)}</g:mobile_link>`,
        `      <g:item_group_id>${escapeXml(p.id)}</g:item_group_id>`,
        `      <g:shipping_weight>${escapeXml(`${p.downloadSizeKb} g`)}</g:shipping_weight>`,
        `      <g:custom_label_0>digital</g:custom_label_0>`,
        `      <g:custom_label_1>${escapeXml(p.productType ?? "template")}</g:custom_label_1>`,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Cyber Elias Academy shop</title>
    <link>${SITE_URL}/shop</link>
    <description>One-time digital products from Cyber Elias Academy: website starter, invoice and stock sheet, weekly social content planner. Pay once, download the file.</description>
${items}
  </channel>
</rss>
`;
}

function buildCsv(products) {
  const rows = [
    REQUIRED_COLUMNS.join(","),
    ...products.map((p) => {
      const link = `${SITE_URL}/shop/${p.slug}`;
      const imageLink = `${SITE_URL}${p.image}`;
      const cells = {
        id: p.id,
        title: p.title,
        description: p.longDescription ?? p.shortDescription,
        link,
        image_link: imageLink,
        price: `${p.price} ${p.priceCurrency}`,
        availability: p.availability,
        condition: p.condition,
        brand: "Cyber Elias Academy",
        mpn: p.mpn,
        google_product_category: categoryFor(p.category),
        shipping: "NG::Electronic:0.00 NGN",
        tax: "NG::0",
      };
      return REQUIRED_COLUMNS.map((c) => csvEscape(cells[c] ?? "")).join(",");
    }),
  ];
  return `${rows.join("\n")}\n`;
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Maps a CEA product category to Google's published taxonomy node.
 * The full taxonomy lives at https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.txt.
 * We only ship a few categories, so a small map keeps the feed readable.
 */
function categoryFor(category) {
  const map = {
    "Web templates": "Software > Website Templates",
    "Spreadsheet templates": "Office Supplies > Spreadsheet Templates",
    "Marketing templates": "Office Supplies > Marketing Templates",
  };
  return map[category] ?? "Software";
}

async function main() {
  const raw = readFileSync(SOURCE, "utf8");
  const data = JSON.parse(raw);
  const products = Array.isArray(data.products) ? data.products : [];

  mkdirSync(dirname(XML_OUT), { recursive: true });
  writeFileSync(XML_OUT, buildXml(products));
  writeFileSync(CSV_OUT, buildCsv(products));

  console.log(
    `merchant feed: ${products.length} products -> ${XML_OUT} and ${CSV_OUT}`,
  );
}

main().catch((err) => {
  console.error("generate-merchant-feeds failed:", err);
  process.exit(1);
});
