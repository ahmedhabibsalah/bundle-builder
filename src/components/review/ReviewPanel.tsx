import { useBundleStore, getCartTotal } from "../../store/bundleStore";
import { QuantityStepper } from "../cards/QuantityStepper";
import data from "../../data/products.json";
import type { Product } from "../../types";
import styles from "./ReviewPanel.module.css";

const products = data.products as unknown as Product[];

const CATEGORY_LABELS: Record<string, string> = {
  cameras: "Cameras",
  sensors: "Sensors",
  accessories: "Accessories",
  plan: "Home Monitoring Plan",
  shipping: "Shipping",
};

const CATEGORY_ORDER = [
  "cameras",
  "sensors",
  "accessories",
  "plan",
  "shipping",
];

function WyzeShieldIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.89691 4.86531C3.89691 4.86531 2.64014 5.09172 2.64014 6.15624V13.9018C2.64014 18.0439 8.70116 22.6534 10.7614 24.0226C11.172 24.2981 11.7032 24.2981 12.1137 24.0226C14.174 22.6534 20.235 18.0439 20.235 13.9018V6.15624C20.235 5.09172 18.9783 4.86531 18.9783 4.86531L12.1669 2.71257C11.6919 2.56244 11.1832 2.56244 10.7083 2.71257L3.89691 4.86531Z"
        fill="#E7EFFD"
      />
      <path
        d="M5.41984 3.94548L12.2932 1.77724C12.6656 1.65954 13.0644 1.65954 13.4368 1.77724L20.2481 3.92998C20.9873 4.26028 21.1321 4.43513 21.1321 4.70622V12.4518C21.1321 13.3565 20.7994 14.3254 20.2262 15.3145C19.6548 16.3005 18.8637 17.2731 17.9953 18.1751C16.2578 19.9797 14.2609 21.4503 13.2508 22.1215C13.0156 22.2794 12.7143 22.2794 12.481 22.1228C11.4691 21.4503 9.47208 19.9797 7.73466 18.1751C6.86628 17.2731 6.07512 16.3005 5.50376 15.3145C4.93052 14.3254 4.5979 13.3565 4.5979 12.4518V4.70622C4.5979 4.43513 4.74264 4.26028 4.96677 4.12498C5.07912 4.05716 5.19615 4.01069 5.28782 3.98123L5.41984 3.94548Z"
        stroke="#0046C7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="7"
        fontWeight="700"
        fill="#0046C7"
        fontFamily="sans-serif"
      >
        CAM
      </text>
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 9H17V19H3V9Z"
        stroke="#0AA288"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M17 13H21L24 16V19H17V13Z"
        stroke="#0AA288"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="20.5" r="1.5" stroke="#0AA288" strokeWidth="1.5" />
      <circle cx="21.5" cy="20.5" r="1.5" stroke="#0AA288" strokeWidth="1.5" />
      <path
        d="M5 12H10"
        stroke="#0AA288"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlanThumb() {
  return (
    <div className={styles.thumbIcon}>
      <WyzeShieldIcon />
    </div>
  );
}

function ShippingThumb() {
  return (
    <div className={styles.thumbIcon}>
      <TruckIcon />
    </div>
  );
}

export function ReviewPanel() {
  const { cart, incrementQuantity, decrementQuantity, saveSystem } =
    useBundleStore();
  const { total, compareAtTotal } = getCartTotal(cart, products);
  const savings = compareAtTotal - total;

  const grouped: Record<
    string,
    Array<{
      product: Product;
      variantId?: string;
      quantity: number;
      key: string;
    }>
  > = {};

  for (const [key, entry] of Object.entries(cart)) {
    if (entry.quantity === 0) continue;
    const product = products.find((p) => p.id === entry.productId);
    if (!product) continue;
    const cat = product.category;
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push({
      product,
      variantId: entry.variantId,
      quantity: entry.quantity,
      key,
    });
  }

  return (
    <div className={styles.panel}>
      <p className={styles.reviewLabel}>Review</p>

      <div className={styles.header}>
        <h2 className={styles.title}>Your security system</h2>
        <p className={styles.subtitle}>
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>
      </div>

      <div className={styles.lineItems}>
        {CATEGORY_ORDER.filter((cat) => grouped[cat]?.length).map((cat) => (
          <div key={cat} className={styles.group}>
            <p className={styles.groupLabel}>{CATEGORY_LABELS[cat]}</p>
            <div className={styles.groupItems}>
              {grouped[cat].map(({ product, variantId, quantity, key }) => {
                const linePrice = product.price * quantity;
                const isPlan = product.category === "plan";
                const isShipping = product.category === "shipping";
                const isFree = product.price === 0;
                const isPreSeeded = !!product.preSeeded;

                return (
                  <div key={key} className={styles.lineItem}>
                    {/* ── Thumbnail ── */}
                    {isPlan ? (
                      <PlanThumb />
                    ) : isShipping ? (
                      <ShippingThumb />
                    ) : (
                      <div className={styles.thumb}>
                        <img
                          src={product.image ?? ""}
                          alt={product.name}
                          className={styles.thumbImg}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      </div>
                    )}

                    {/* ── Name ── */}
                    <span className={styles.itemName}>
                      {isPlan ? (
                        <>
                          <span className={styles.cam}>Cam</span>{" "}
                          <span className={styles.unlimited}>Unlimited</span>
                        </>
                      ) : (
                        product.name
                      )}
                      {variantId && (
                        <span className={styles.variantTag}>
                          {" "}
                          ({variantId})
                        </span>
                      )}
                    </span>

                    {/* ── Stepper ── */}
                    {!isPlan && (
                      <QuantityStepper
                        quantity={quantity}
                        onIncrement={() =>
                          incrementQuantity(product.id, variantId)
                        }
                        onDecrement={() =>
                          decrementQuantity(product.id, variantId)
                        }
                        minZero={!isPreSeeded}
                      />
                    )}

                    {/* ── Pricing ── */}
                    <div className={styles.itemPricing}>
                      {product.compareAtPrice != null && !isFree && (
                        <span className={styles.itemCompareAt}>
                          $
                          {isPlan
                            ? `${product.compareAtPrice.toFixed(2)}/mo`
                            : (product.compareAtPrice * quantity).toFixed(2)}
                        </span>
                      )}
                      <span
                        className={`${styles.itemPrice} ${isFree ? styles.itemFree : ""}`}
                      >
                        {isFree
                          ? "FREE"
                          : isPlan
                            ? `$${product.price.toFixed(2)}/mo`
                            : `$${linePrice.toFixed(2)}`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ── Summary ── */}
      <div className={styles.summary}>
        <div className={styles.summaryTop}>
          <img
            src="/satisfaction-badge.png"
            alt="100% Wyze satisfaction guarantee"
            className={styles.badge}
          />
          <div className={styles.summaryRight}>
            <span className={styles.financeTag}>as low as $19.19/mo</span>
            <div className={styles.totals}>
              <span className={styles.compareAtTotal}>
                ${compareAtTotal.toFixed(2)}
              </span>
              <span className={styles.activeTotal}>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {savings > 0 && (
          <p className={styles.savingsLine}>
            Congrats! You're saving ${savings.toFixed(2)} on your security
            bundle!
          </p>
        )}

        <button
          className={styles.checkoutBtn}
          onClick={() =>
            alert(
              "Order placed! Thank you for building your Wyze security system.",
            )
          }
        >
          Checkout
        </button>

        <button className={styles.saveLink} onClick={saveSystem}>
          Save my system for later
        </button>
      </div>
    </div>
  );
}
