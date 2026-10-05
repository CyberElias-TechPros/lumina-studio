/**
 * Typed accessors for the public digital shop.
 *
 * The single source of truth is `digital-products.json`. Both the public shop
 * pages and the Google Merchant Center feed generators read from the same
 * file so a price change in one place updates the live site, the XML feed
 * and the CSV feed on the next build.
 */
import data from "./digital-products.json";

export interface DigitalProduct {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  productType: "template" | "spreadsheet" | "planner";
  price: number;
  priceCurrency: "NGN";
  availability: "in_stock" | "out_of_stock" | "preorder";
  condition: "new" | "refurbished" | "used";
  gtin: string;
  mpn: string;
  image: string;
  imageAlt: string;
  downloadSizeKb: number;
  fileFormat: string;
  deliveryHours: number;
  tags: string[];
  highlights: string[];
  requirements: string[];
  license: string;
}

interface DigitalProductsFile {
  currency: "NGN";
  country: "NG";
  storeUrl: string;
  products: DigitalProduct[];
}

const file = data as DigitalProductsFile;

export const shopCurrency = file.currency;
export const shopCountry = file.country;
export const shopStoreUrl = file.storeUrl;
export const digitalProducts: DigitalProduct[] = file.products;

export function getDigitalProduct(slug: string): DigitalProduct | undefined {
  return digitalProducts.find((p) => p.slug === slug);
}

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

/** Customer-facing wording for the operator-managed email delivery window. */
export function deliveryWindowLabel(hours: number): string {
  return hours === 24 ? "within one business day" : `within ${hours} hours`;
}

/** Build the public product detail URL. */
export function productPath(slug: string): string {
  return `/shop/${slug}`;
}

/** Build the checkout start URL (email form lives there). */
export function checkoutPath(slug: string): string {
  return `/shop/${slug}/checkout`;
}

/** Build the post-payment return URL Google sees after Paystack redirects. */
export function returnPath(slug: string): string {
  return `/shop/${slug}/return`;
}
