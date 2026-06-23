import { BuilderPanel } from "./components/accordion/BuilderPanel";
import "./App.css";

function App() {
  return (
    <div className="app-layout">
      <main className="builder-col">
        <BuilderPanel />
      </main>
      <aside className="review-col">
        {/* Review panel coming in Step 4 */}
        <div className="review-placeholder">
          <p>REVIEW</p>
          <h2>Your security system</h2>
          <p style={{ color: "#9499b0", fontSize: 14 }}>
            Review panel coming in Step 4
          </p>
        </div>
      </aside>
    </div>
  );
}

export default App;
