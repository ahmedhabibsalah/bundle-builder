import React from "react";
import {
  CameraIcon,
  PlanIcon,
  SensorsIcon,
  ProtectionIcon,
  ChevronDown,
  ChevronUp,
} from "./StepIcons";
import type { StepIconKey } from "../../types";
import styles from "./AccordionStep.module.css";

const iconMap: Record<StepIconKey, React.ReactNode> = {
  cameras: <CameraIcon />,
  plan: <PlanIcon />,
  sensors: <SensorsIcon />,
  protection: <ProtectionIcon />,
};

interface AccordionStepProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  iconKey: StepIconKey;
  isOpen: boolean;
  selectedCount: number;
  onToggle: () => void;
  onNext?: () => void;
  nextLabel?: string;
  children?: React.ReactNode;
}

export function AccordionStep({
  stepNumber,
  totalSteps,
  title,
  iconKey,
  isOpen,
  selectedCount,
  onToggle,
  onNext,
  nextLabel,
  children,
}: AccordionStepProps) {
  return (
    <div className={`${styles.step} ${isOpen ? styles.stepOpen : ""}`}>
      {/* ── "STEP X OF 4" label ── */}
      <div className={styles.stepLabelRow}>
        <p className={styles.stepLabel}>
          Step {stepNumber} of {totalSteps}
        </p>
      </div>

      {/* ── Header row ── */}
      <button
        className={styles.header}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className={styles.headerInner}>
          <span className={styles.headerLeft}>
            <span className={styles.icon}>{iconMap[iconKey]}</span>
            <span className={styles.title}>{title}</span>
          </span>
          <span className={styles.headerRight}>
            {selectedCount > 0 && (
              <span className={styles.selectedBadge}>
                {selectedCount} selected
              </span>
            )}
            <span className={styles.chevron}>
              {isOpen ? <ChevronUp /> : <ChevronDown />}
            </span>
          </span>
        </div>
      </button>

      {/* ── Expanded content ── */}
      {isOpen && (
        <div className={styles.content}>
          {children}
          {onNext && (
            <div className={styles.nextRow}>
              <button className={styles.nextButton} onClick={onNext}>
                Next: {nextLabel}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
