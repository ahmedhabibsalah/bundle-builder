import { useEffect, useState } from "react";
import styles from "./Toast.module.css";

interface ToastProps {
  message: string;
  visible: boolean;
  onHide: () => void;
}

export function Toast({ message, visible, onHide }: ToastProps) {
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (visible) {
      setRender(true);
      const t = setTimeout(() => {
        onHide();
      }, 3000);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setRender(false), 300);
      return () => clearTimeout(t);
    }
  }, [visible, onHide]);

  if (!render) return null;

  return (
    <div
      className={`${styles.toast} ${visible ? styles.visible : styles.hidden}`}
    >
      <span className={styles.icon}>✓</span>
      {message}
    </div>
  );
}
