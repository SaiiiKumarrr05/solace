# Solace — Frontend Battle, Phase 1 Submission
 **Hackathon** - **12h**

A premium landing page for an AI data-automation platform, built for the
**Next-Gen AI Platform Speed Run** brief: matrix-driven pricing with
render-isolated currency/billing controls, and a Bento-grid feature
showcase that collapses into a context-locked Accordion on mobile.

Live brand: **Solace** — "Your data infrastructure, running itself."

---

## 1. Requirements

- Node.js **20+** (built and tested on Node 22)
- npm (ships with Node)

No other global tooling is required. There is no backend/database — this
is a fully static-renderable marketing site.

## 2. Install & run

```bash
# from the project root (the folder containing package.json)
npm install

npm run dev
# → http://localhost:3000
```

### Production build (what gets deployed)

```bash
npm run build
npm run start
# → http://localhost:3000
```

### Other useful scripts

```bash
npm run lint        # ESLint (flat config, Next.js + React Hooks rules)
npx tsc --noEmit     # Type-check only, no build output
```

## 3. Which files to look at

| Area | Path | Why it matters |
|---|---|---|
| Pricing engine (Feature 1) | `lib/types/pricing.ts` | The multi-dimensional matrix: tier × currency × cycle. No hardcoded display values — every number is `baseMonthlyUsd × tariff × (0.8 if annual)`. |
| Render isolation store | `lib/hooks/usePricingStore.tsx` | A `useSyncExternalStore`-backed store, **not** `useState` + Context. Currency and cycle are separate subscriptions so toggling one never notifies subscribers of the other. |
| Price leaf node | `app/_components/pricing/PriceText.tsx` | The *only* component subscribed to both currency and cycle. Everything around it is `React.memo`-wrapped with stable props, so it cannot re-render when this leaf updates. |
| Tier card | `app/_components/pricing/TierCard.tsx` | Memoized; holds no pricing-state hook itself. |
| Bento/Accordion shared state (Feature 2) | `lib/hooks/useBentoAccordion.ts` | One `activeIndex` is the single source of truth for desktop hover *and* mobile accordion-open state — see the comment block for why this makes the "Context Lock Constraint" automatic rather than something that has to be explicitly synced on resize. |
| Bento grid (desktop) | `app/_components/bento/BentoGrid.tsx` | |
| Accordion (mobile) | `app/_components/bento/AccordionList.tsx` | Native WAAPI `element.animate()` height transitions — no animation library. |
| Wrapper that mounts both | `app/_components/bento/BentoSection.tsx` | Both views are always mounted; CSS (`hidden md:block` / `md:hidden`) switches which is visible, so crossing the breakpoint is a pure CSS change, not a remount. |
| Design tokens | `app/globals.css` | Exact hex values from the provided color palette, motion durations/easing curves copied verbatim from the brief (150–200ms micro, 300–400ms layout). |
| Icons | `app/_components/ui/Icon.tsx` | Inlines the exact paths from `public/svg/*.svg` (the provided asset pack) as themeable React components using `currentColor`. |

## 4. Verifying the two "do-not-violate" requirements yourself

**Re-render isolation (pricing):** Open React DevTools → Profiler (or just
the Components panel with "Highlight updates" on) → toggle the billing
switch or currency pills in the Pricing section. Only the price `<span>`
text nodes should flash; the tier cards, headings, and the rest of the
page must not.

**Context-lock (bento → accordion):** On a desktop-width viewport, hover
any Bento card in the Platform section, then shrink the browser below the
`md` breakpoint (767px) without moving the mouse off the card. The
Accordion panel for that exact card opens automatically on mobile — this
was verified programmatically in development with Playwright (hover card
index 2 on desktop → resize → `aria-expanded="true"` lands on index 2's
panel, with all others `false`).

## 5. Deployment

This is a standard Next.js App Router project — push the repo and import
it into Vercel (zero config needed), or run `npm run build && npm run
start` behind any Node host. There is no environment variable or secret
required.

## 6. Notes on assets used

- **Color palette**: all six hex values from `colorPallet.pdf` are wired
  into CSS custom properties in `app/globals.css` (Arctic Powder, Mystic
  Mint, Forsythia, Deep Saffron, Nocturnal Expedition, Oceanic Noir).
- **Typography**: JetBrains Mono (display/numerals) + Inter (body/UI), as
  specified in `fonts.pdf`. Self-hosted via `@fontsource/*` packages
  rather than `next/font/google`, so the build has no runtime dependency
  on Google Fonts' CDN.
- **SVGs**: every icon in `public/svg/` from the asset pack is used
  somewhere in the UI (stats, bento cards, nav, accordion chevrons, FAQ,
  pricing feature bullets) via the shared `Icon` component — none are
  decorative-only or unused.


