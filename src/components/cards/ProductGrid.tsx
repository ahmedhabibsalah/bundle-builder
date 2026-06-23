import { ProductCard } from "./ProductCard";
import { useBundleStore, getQuantity } from "../../store/bundleStore";
import type { Product } from "../../types";
import styles from "./ProductGrid.module.css";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const {
    cart,
    activeVariants,
    setActiveVariant,
    incrementQuantity,
    decrementQuantity,
  } = useBundleStore();

  return (
    <div className={styles.grid}>
      {products.map((product) => {
        const activeVariantId = product.variants?.length
          ? (activeVariants[product.id] ?? product.variants[0].id)
          : undefined;

        const quantity = getQuantity(cart, product.id, activeVariantId);

        return (
          <ProductCard
            key={product.id}
            product={product}
            activeVariantId={activeVariantId}
            quantity={quantity}
            onVariantSelect={(variantId) =>
              setActiveVariant(product.id, variantId)
            }
            onIncrement={() => incrementQuantity(product.id, activeVariantId)}
            onDecrement={() => decrementQuantity(product.id, activeVariantId)}
          />
        );
      })}
    </div>
  );
}
