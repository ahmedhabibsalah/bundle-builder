# Wyze Bundle Builder

A pixel-perfect React prototype of a multi-step security system bundle builder with a live review panel.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Stack

- **React 18** + **TypeScript**
- **Vite** — build tool
- **Zustand** (with `persist` middleware) — global state + localStorage persistence
- **CSS Modules** — scoped, zero-runtime styling

## Project Structure

```
src/
├── data/
│   └── products.json         # Single source of truth — all products, steps, initial cart
├── types/
│   └── index.ts              # TypeScript interfaces (Product, CartEntry, Variant, Step…)
├── store/
│   └── bundleStore.ts        # Zustand store — cart, accordion, variants, persistence
└── components/
    ├── accordion/
    │   ├── BuilderPanel.tsx       # Left column — renders all 4 accordion steps
    │   ├── AccordionStep.tsx      # Individual step header + content + Next button
    │   └── StepIcons.tsx          # SVG icons for each step
    ├── cards/
    │   ├── ProductGrid.tsx        # 2-column responsive grid
    │   ├── ProductCard.tsx        # Card with badge, variants, stepper, pricing
    │   └── QuantityStepper.tsx    # Shared stepper component
    ├── review/
    │   ├── ReviewPanel.tsx        # Right column — live summary
    │   └── ReviewPanel.module.css
    └── Toast.tsx                  # Save confirmation toast
```

## Features

### Builder

- 4-step accordion, Step 1 open by default
- "N selected" counter per step, live
- Product cards from JSON — badge, variants, stepper, pricing
- Each variant tracks its own quantity independently
- Steppers synced between cards and review panel

### Review Panel

- Live updates on every selection/quantity change
- Grouped by: Cameras → Sensors → Accessories → Plan → Shipping
- Strikethrough compare-at prices, savings callout in green
- Checkout placeholder + Save my system for later

### Persistence

Everything persists to `localStorage` via Zustand `persist` middleware (key: `wyze-bundle-storage`). Cart, active variants, accordion step, and saved snapshot all survive page reload and return visits.

### Responsive

| Breakpoint | Layout                                        |
| ---------- | --------------------------------------------- |
| > 1024px   | Two columns — builder + sticky review (360px) |
| 860–1024px | Two columns — builder + review (300px)        |
| ≤ 860px    | Single column — builder above review          |
| ≤ 480px    | Tight padding for small phones                |

## Images

Place product images in `/public/`:

- `cam1.jpg`, `cam2.png`, `cam3.png`, `cam4.png`, `cam5.png`
- `sensor1.jpg`, `sensor2.jpg`
- `satisfaction-badge.png`

## Decisions & Tradeoffs

- **Zustand over Redux** — lighter API for this scope; persist middleware is one line
- **CSS Modules** — pixel-perfect Figma fidelity is easier with named classes and exact values
- **No backend** — products served from local JSON; the bonus API was not implemented
- **Font** — Figma uses Gilroy (commercial). Inter is used as the closest free substitute. Swap `font-family` in `src/index.css` if Gilroy is available
