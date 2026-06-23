import { useState, useCallback } from "react";
import { BuilderPanel } from "./components/accordion/BuilderPanel";
import { ReviewPanel } from "./components/review/ReviewPanel";
import { Toast } from "./components/Toast";
import "./App.css";

export default function App() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
  }, []);

  const hideToast = useCallback(() => setToastVisible(false), []);

  return (
    <>
      <div className="app-layout">
        <main className="builder-col">
          <BuilderPanel />
        </main>
        <aside className="review-col">
          <ReviewPanel
            onSave={() => showToast("Your system has been saved!")}
          />
        </aside>
      </div>
      <Toast message={toastMsg} visible={toastVisible} onHide={hideToast} />
    </>
  );
}
