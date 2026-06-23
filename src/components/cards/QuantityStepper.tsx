import styles from "./QuantityStepper.module.css";

interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  minZero?: boolean;
}

export function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
  minZero = true,
}: QuantityStepperProps) {
  const atMin = minZero ? quantity <= 0 : quantity <= 1;

  return (
    <div className={styles.stepper}>
      <button
        className={`${styles.btn} ${atMin ? styles.btnDisabled : styles.btnActive}`}
        onClick={onDecrement}
        disabled={atMin}
        aria-label="Decrease quantity"
      >
        <span className={styles.icon}>−</span>
      </button>
      <span className={styles.qty}>{quantity}</span>
      <button
        className={`${styles.btn} ${styles.btnActive}`}
        onClick={onIncrement}
        aria-label="Increase quantity"
      >
        <span className={styles.icon}>+</span>
      </button>
    </div>
  );
}
