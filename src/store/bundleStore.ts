import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartMap, CartEntry, ActiveVariantMap } from '../types';
import data from '../data/products.json';

interface BundleState {
  // ── Accordion ────────────────────────────────────────────────────────────
  activeStep: number;
  setActiveStep: (step: number) => void;

  // ── Cart ─────────────────────────────────────────────────────────────────
  cart: CartMap;
  setQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  incrementQuantity: (productId: string, variantId: string | undefined) => void;
  decrementQuantity: (productId: string, variantId: string | undefined) => void;

  // ── Active variant per card ───────────────────────────────────────────────
  activeVariants: ActiveVariantMap;
  setActiveVariant: (productId: string, variantId: string) => void;

  // ── Persistence helpers ───────────────────────────────────────────────────
  savedSystem: CartMap | null;
  saveSystem: () => void;
  loadSavedSystem: () => void;
}

function cartKey(productId: string, variantId?: string): string {
  return variantId ? `${productId}__${variantId}` : productId;
}

export const useBundleStore = create<BundleState>()(
  persist(
    (set, get) => ({
      // ── Accordion ──────────────────────────────────────────────────────
      activeStep: 1,
      setActiveStep: (step) => set({ activeStep: step }),

      // ── Cart (seeded from JSON) ────────────────────────────────────────
      cart: data.initialCart as CartMap,

      setQuantity: (productId, variantId, quantity) => {
        const key = cartKey(productId, variantId);
        set((state) => {
          if (quantity <= 0) {
            const next = { ...state.cart };
            delete next[key];
            return { cart: next };
          }
          const entry: CartEntry = { productId, quantity };
          if (variantId) entry.variantId = variantId;
          return { cart: { ...state.cart, [key]: entry } };
        });
      },

      incrementQuantity: (productId, variantId) => {
        const key = cartKey(productId, variantId);
        set((state) => {
          const current = state.cart[key]?.quantity ?? 0;
          const entry: CartEntry = { productId, quantity: current + 1 };
          if (variantId) entry.variantId = variantId;
          return { cart: { ...state.cart, [key]: entry } };
        });
      },

      decrementQuantity: (productId, variantId) => {
        const key = cartKey(productId, variantId);
        set((state) => {
          const current = state.cart[key]?.quantity ?? 0;
          if (current <= 1) {
            const next = { ...state.cart };
            delete next[key];
            return { cart: next };
          }
          const entry: CartEntry = { productId, quantity: current - 1 };
          if (variantId) entry.variantId = variantId;
          return { cart: { ...state.cart, [key]: entry } };
        });
      },

      // ── Active variants (seeded from JSON) ────────────────────────────
      activeVariants: data.initialActiveVariants as ActiveVariantMap,

      setActiveVariant: (productId, variantId) =>
        set((state) => ({
          activeVariants: { ...state.activeVariants, [productId]: variantId },
        })),

      // ── Persistence ───────────────────────────────────────────────────
      savedSystem: null,

      saveSystem: () => {
        const { cart } = get();
        set({ savedSystem: cart });
      },

      loadSavedSystem: () => {
        const { savedSystem } = get();
        if (savedSystem) set({ cart: savedSystem });
      },
    }),
    {
      name: 'wyze-bundle-storage', // localStorage key
      partialize: (state) => ({
        cart: state.cart,
        activeVariants: state.activeVariants,
        savedSystem: state.savedSystem,
      }),
    }
  )
);

// ─── Derived selectors (used in components) ──────────────────────────────────

/** Get the current quantity for a specific product+variant combo */
export function getQuantity(cart: CartMap, productId: string, variantId?: string): number {
  return cart[cartKey(productId, variantId)]?.quantity ?? 0;
}

/** Count distinct products selected in a given category */
export function getSelectedCount(cart: CartMap, productIds: string[]): number {
  return productIds.filter((id) =>
    Object.values(cart).some((entry) => entry.productId === id && entry.quantity > 0)
  ).length;
}

/** Total one-time price from cart (excludes monthly plan) */
export function getCartTotal(cart: CartMap, products: { id: string; price: number; compareAtPrice?: number | null; category: string }[]): {
  total: number;
  compareAtTotal: number;
} {
  let total = 0;
  let compareAtTotal = 0;

  for (const entry of Object.values(cart)) {
    if (entry.quantity === 0) continue;
    const product = products.find((p) => p.id === entry.productId);
    if (!product || product.category === 'shipping') continue;
    total += product.price * entry.quantity;
    compareAtTotal += (product.compareAtPrice ?? product.price) * entry.quantity;
  }

  return { total, compareAtTotal };
}
