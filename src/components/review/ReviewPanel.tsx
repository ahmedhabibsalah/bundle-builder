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
      width="20"
      height="24"
      viewBox="0 0 20 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_74_21711)">
        <path
          d="M1.34153 3.55188C1.34153 3.55188 0 3.79008 0 4.89639V12.9582C0 17.267 6.47248 22.0628 8.66916 23.492C9.10743 23.7778 9.67397 23.7778 10.1122 23.492C12.3143 22.0681 18.7814 17.2723 18.7814 12.9582V4.89639C18.7814 3.79008 17.4399 3.55188 17.4399 3.55188L10.1871 1.31808C9.66863 1.15927 9.11277 1.15927 8.59434 1.31808L1.34153 3.55188Z"
          fill="#E7EFFD"
        />
        <path
          d="M2.97186 2.60961C2.97186 2.60961 3.01461 2.59902 3.04134 2.59373L10.2941 0.359929C10.7003 0.232888 11.1386 0.232888 11.5448 0.359929L18.7976 2.59373C18.7976 2.59373 18.8404 2.60432 18.8671 2.60961C18.8671 2.60961 18.8778 2.60961 18.8938 2.6149C18.9205 2.6202 18.958 2.63078 19.0061 2.64666C19.1023 2.67842 19.2252 2.72606 19.3481 2.79488C19.5833 2.93251 19.7383 3.11248 19.7383 3.38774V11.4495C19.7383 12.3865 19.3855 13.3922 18.7709 14.4244C18.1616 15.4513 17.3171 16.4624 16.3925 17.3993C14.5379 19.2784 12.4053 20.8082 11.331 21.5016C11.0852 21.6604 10.7698 21.6604 10.524 21.5016C9.44433 20.8029 7.31713 19.2731 5.4625 17.394C4.53786 16.4571 3.6934 15.446 3.0841 14.4191C2.4748 13.3922 2.1167 12.3865 2.1167 11.4442V3.38774C2.1167 3.11248 2.26635 2.93251 2.50686 2.79488C2.62445 2.72606 2.74738 2.67842 2.84893 2.64666C2.89703 2.63078 2.93444 2.6202 2.96117 2.6149C2.97186 2.6149 2.98255 2.6149 2.98789 2.60961H2.97186Z"
          stroke="#0046C7"
          strokeWidth="0.5"
        />
        <path
          d="M6.26391 8.30005H5.72409L6.26391 9.55987L5.78823 10.6503L4.77273 8.30005H4.23291L5.62254 11.5396H5.95926L6.53649 10.2057L7.11372 11.5396H7.45044L8.84007 8.30005H8.30025L7.28475 10.6715L6.26925 8.30005H6.26391Z"
          fill="#0046C7"
        />
        <path
          d="M11.4055 8.30005L10.4755 9.93041L9.54549 8.30005H8.96826L10.2403 10.5074V11.5237H10.732V10.5074L11.9827 8.30005H11.4055Z"
          fill="#0046C7"
        />
        <path
          d="M15.0132 11.5396H17.584V10.9838H15.0132V11.5396Z"
          fill="#0046C7"
        />
        <path
          d="M15.0132 8.85585H17.584V8.30005H15.0132V8.85585Z"
          fill="#0046C7"
        />
        <path
          d="M15.0132 10.1898H17.584V9.63403H15.0132V10.1898Z"
          fill="#0046C7"
        />
        <path
          d="M12.1323 8.30005V8.83997H13.8266L11.9292 11.5449H14.6871V11.0103H12.9447L14.8581 8.30534H12.1323V8.30005Z"
          fill="#0046C7"
        />
      </g>
      <defs>
        <clipPath id="clip0_74_21711">
          <rect width="20" height="23.7037" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg
      width="29"
      height="29"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.625 14.5H14.5V16.3125H3.625V14.5ZM1.8125 9.96875H10.875V11.7812H1.8125V9.96875Z"
        fill="#0AA288"
      />
      <path
        d="M27.114 15.0492L24.3953 8.70544C24.3254 8.54245 24.2092 8.40355 24.0612 8.30593C23.9132 8.20831 23.7397 8.15627 23.5624 8.15625H20.8437V6.34375C20.8437 6.1034 20.7482 5.87289 20.5782 5.70293C20.4083 5.53298 20.1778 5.4375 19.9374 5.4375H5.43741V7.25H19.0312V18.6289C18.6185 18.869 18.2573 19.1882 17.9683 19.5683C17.6793 19.9484 17.4683 20.3819 17.3473 20.8438H11.6525C11.4319 19.9895 10.9073 19.245 10.1771 18.7498C9.44685 18.2546 8.56108 18.0427 7.68581 18.1539C6.81054 18.2651 6.00587 18.6916 5.42261 19.3537C4.83936 20.0157 4.51758 20.8677 4.51758 21.75C4.51758 22.6323 4.83936 23.4843 5.42261 24.1463C6.00587 24.8084 6.81054 25.2349 7.68581 25.3461C8.56108 25.4573 9.44685 25.2454 10.1771 24.7502C10.9073 24.255 11.4319 23.5105 11.6525 22.6563H17.3473C17.5445 23.434 17.9953 24.1239 18.6286 24.6166C19.2618 25.1094 20.0413 25.3769 20.8437 25.3769C21.646 25.3769 22.4255 25.1094 23.0587 24.6166C23.692 24.1239 24.1428 23.434 24.34 22.6563H26.2812C26.5215 22.6563 26.752 22.5608 26.922 22.3908C27.0919 22.2209 27.1874 21.9904 27.1874 21.75V15.4063C27.1874 15.2835 27.1624 15.162 27.114 15.0492ZM8.15616 23.5625C7.79768 23.5625 7.44725 23.4562 7.14919 23.257C6.85112 23.0579 6.61881 22.7748 6.48162 22.4436C6.34444 22.1124 6.30855 21.748 6.37848 21.3964C6.44842 21.0448 6.62104 20.7219 6.87453 20.4684C7.12801 20.2149 7.45097 20.0423 7.80256 19.9723C8.15415 19.9024 8.51858 19.9383 8.84977 20.0755C9.18096 20.2127 9.46404 20.445 9.6632 20.743C9.86236 21.0411 9.96866 21.3915 9.96866 21.75C9.96866 22.2307 9.7777 22.6917 9.43779 23.0316C9.09788 23.3715 8.63686 23.5625 8.15616 23.5625ZM20.8437 9.96875H22.9643L24.9073 14.5H20.8437V9.96875ZM20.8437 23.5625C20.4852 23.5625 20.1348 23.4562 19.8367 23.257C19.5386 23.0579 19.3063 22.7748 19.1691 22.4436C19.0319 22.1124 18.996 21.748 19.066 21.3964C19.1359 21.0448 19.3085 20.7219 19.562 20.4684C19.8155 20.2149 20.1385 20.0423 20.4901 19.9723C20.8416 19.9024 21.2061 19.9383 21.5373 20.0755C21.8685 20.2127 22.1515 20.445 22.3507 20.743C22.5499 21.0411 22.6562 21.3915 22.6562 21.75C22.6562 22.2307 22.4652 22.6917 22.1253 23.0316C21.7854 23.3715 21.3244 23.5625 20.8437 23.5625ZM25.3749 20.8438H24.34C24.1403 20.0675 23.6888 19.3794 23.056 18.8874C22.4233 18.3954 21.6452 18.1272 20.8437 18.125V16.3125H25.3749V20.8438Z"
        fill="#0AA288"
      />
    </svg>
  );
}

function PlanThumb() {
  return (
    <div className={styles.thumbIcon2}>
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
                          <span className={styles.unlimited}>
                            {product.name.replace("Cam ", "")}
                          </span>
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
                    {!isPlan && !isShipping && (
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
