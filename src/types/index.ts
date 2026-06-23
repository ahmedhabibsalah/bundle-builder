// ─── Variant ────────────────────────────────────────────────────────────────
export interface Variant {
  id: string; // e.g. "white" | "black" | "grey"
  label: string; // display label
  swatchColor?: string; // hex or css color for the swatch circle
  swatchImage?: string; // optional image override per variant
}

// ─── Product ─────────────────────────────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  description?: string;
  learnMoreUrl?: string;
  image: string | null; // path or URL (null for icon-only items)
  badge?: string; // e.g. "Save 22%"
  compareAtPrice?: number; // struck-through price
  price: number; // active price
  priceLabel?: string; // e.g. "/mo" for plans
  variants?: Variant[]; // if absent → no color selector
  /** Is this item pre-seeded in the review (sensor/plan/accessory), not addable by the user in this view */
  preSeeded?: boolean;
  /** Category this product belongs to */
  category: "cameras" | "sensors" | "accessories" | "plan" | "shipping";
}

// ─── Step ────────────────────────────────────────────────────────────────────
export interface Step {
  id: number; // 1-4
  title: string;
  iconKey: StepIconKey;
  productCategory: Product["category"];
}

export type StepIconKey = "cameras" | "plan" | "sensors" | "protection";

// ─── Cart / Selection state ───────────────────────────────────────────────────
/**
 * Key format: `${productId}__${variantId}` for products with variants,
 * or just `${productId}` for products without.
 */
export type CartKey = string;

export interface CartEntry {
  productId: string;
  variantId?: string; // undefined for variant-less products
  quantity: number;
}

export type CartMap = Record<CartKey, CartEntry>;

// ─── Active variant selection per card ───────────────────────────────────────
/** Which variant is currently "active" (highlighted) on each product card */
export type ActiveVariantMap = Record<string, string>; // productId → variantId
