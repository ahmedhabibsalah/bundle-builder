import { BuilderPanel } from "./components/accordion/BuilderPanel";
import { ReviewPanel } from "./components/review/ReviewPanel";
import "./App.css";

function App() {
  return (
    <div className="app-layout">
      <main className="builder-col">
        <BuilderPanel />
      </main>
      <aside className="review-col">
        <ReviewPanel />
      </aside>
    </div>
  );
}

export default App;
