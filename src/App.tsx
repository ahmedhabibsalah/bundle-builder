import { useBundleStore, getCartTotal } from './store/bundleStore';
import data from './data/products.json';
import type { Product } from './types';

const products = data.products as unknown as Product[];

function App() {
  const { cart, activeStep, activeVariants } = useBundleStore();
  const { total, compareAtTotal } = getCartTotal(cart, products);
  const cartEntries = Object.values(cart);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ color: '#4B3EE8' }}>✅ Step 1 — Data & State OK</h1>

      <section style={{ marginBottom: '1.5rem' }}>
        <h2>📋 Steps loaded ({data.steps.length})</h2>
        <ul>
          {data.steps.map((s) => (
            <li key={s.id} style={{ fontWeight: activeStep === s.id ? 'bold' : 'normal' }}>
              Step {s.id}: {s.title} {activeStep === s.id ? '← active' : ''}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: '1.5rem' }}>
        <h2>🛒 Cart ({cartEntries.length} line items)</h2>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ background: '#f0f0f8', textAlign: 'left' }}>
              <th style={{ padding: '6px 10px' }}>Product</th>
              <th style={{ padding: '6px 10px' }}>Variant</th>
              <th style={{ padding: '6px 10px' }}>Qty</th>
            </tr>
          </thead>
          <tbody>
            {cartEntries.map((entry, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '6px 10px' }}>{entry.productId}</td>
                <td style={{ padding: '6px 10px' }}>{entry.variantId ?? '—'}</td>
                <td style={{ padding: '6px 10px' }}>{entry.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: '1.5rem' }}>
        <h2>🎨 Active variants</h2>
        <ul>
          {Object.entries(activeVariants).map(([pid, vid]) => (
            <li key={pid}>{pid} → <strong>{vid}</strong></li>
          ))}
        </ul>
      </section>

      <section>
        <h2>💰 Totals</h2>
        <p>Compare-at: <s>${compareAtTotal.toFixed(2)}</s></p>
        <p>Active total: <strong style={{ color: '#4B3EE8' }}>${total.toFixed(2)}</strong></p>
        <p>Savings: <span style={{ color: '#22c55e' }}>${(compareAtTotal - total).toFixed(2)}</span></p>
      </section>
    </div>
  );
}

export default App;
