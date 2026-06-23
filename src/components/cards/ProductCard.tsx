import { QuantityStepper } from "./QuantityStepper";
import type { Product } from "../../types";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  activeVariantId?: string;
  quantity: number;
  onVariantSelect: (variantId: string) => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function ProductCard({
  product,
  activeVariantId,
  quantity,
  onVariantSelect,
  onIncrement,
  onDecrement,
}: ProductCardProps) {
  const isSelected = quantity > 0;

  return (
    <div className={`${styles.card} ${isSelected ? styles.cardSelected : ""}`}>
      {/* ── Image + badge ── */}
      <div className={styles.imageWrap}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
            onError={(e) => {
              (e.target as HTMLImageElement).style.opacity = "0.1";
            }}
          />
        ) : (
          <div className={styles.imagePlaceholder} />
        )}
        {product.badge && <span className={styles.badge}>{product.badge}</span>}
      </div>

      {/* ── Content ── */}
      <div className={styles.content}>
        {/* Title + description */}
        <div className={styles.info}>
          <p className={styles.name}>{product.name}</p>
          {product.description && (
            <p className={styles.description}>
              {product.description}{" "}
              {product.learnMoreUrl && (
                <a href={product.learnMoreUrl} className={styles.learnMore}>
                  Learn More
                </a>
              )}
            </p>
          )}
        </div>

        {/* Variant chips */}
        {product.variants && product.variants.length > 0 && (
          <div className={styles.variants}>
            {product.variants.map((v) => {
              const isActive = activeVariantId === v.id;
              return (
                <button
                  key={v.id}
                  className={`${styles.variantChip} ${isActive ? styles.variantChipActive : ""}`}
                  onClick={() => onVariantSelect(v.id)}
                  aria-pressed={isActive}
                >
                  {v.swatchColor && (
                    <span
                      className={styles.swatch}
                      style={{
                        background: v.swatchColor,
                        border:
                          v.swatchColor === "#FFFFFF"
                            ? "1px solid #ccc"
                            : "none",
                      }}
                    />
                  )}
                  <span className={styles.variantLabel}>{v.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Stepper + price */}
        <div className={styles.footer}>
          <QuantityStepper
            quantity={quantity}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
          <div className={styles.pricing}>
            {product.compareAtPrice != null && (
              <span className={styles.compareAt}>
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
            <span className={styles.price}>
              {product.price === 0
                ? "FREE"
                : `$${product.price.toFixed(2)}${product.priceLabel ?? ""}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
