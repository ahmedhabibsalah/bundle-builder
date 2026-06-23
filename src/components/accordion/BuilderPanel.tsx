import { AccordionStep } from "./AccordionStep";
import { useBundleStore, getSelectedCount } from "../../store/bundleStore";
import data from "../../data/products.json";
import type { Product } from "../../types";
import styles from "./BuilderPanel.module.css";

const products = data.products as unknown as Product[];

const stepNextLabels: Record<number, string> = {
  1: "Choose your plan",
  2: "Choose your sensors",
  3: "Add extra protection",
};

export function BuilderPanel() {
  const { activeStep, setActiveStep, cart } = useBundleStore();

  return (
    <div className={styles.builder}>
      <h1 className={styles.heading}>Let's get started!</h1>

      <div className={styles.steps}>
        {data.steps.map((step, index) => {
          const stepProducts = products.filter(
            (p) => p.category === step.productCategory,
          );
          const productIds = stepProducts.map((p) => p.id);
          const selectedCount = getSelectedCount(cart, productIds);
          const isLast = index === data.steps.length - 1;

          return (
            <AccordionStep
              key={step.id}
              stepNumber={step.id}
              totalSteps={data.steps.length}
              title={step.title}
              iconKey={step.iconKey as any}
              isOpen={activeStep === step.id}
              selectedCount={selectedCount}
              onToggle={() =>
                setActiveStep(activeStep === step.id ? 0 : step.id)
              }
              onNext={!isLast ? () => setActiveStep(step.id + 1) : undefined}
              nextLabel={stepNextLabels[step.id]}
            >
              <div className={styles.placeholder}>
                Products will render here in Step 3
              </div>
            </AccordionStep>
          );
        })}
      </div>
    </div>
  );
}
