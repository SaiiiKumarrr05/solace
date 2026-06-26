import { PRICING_TIERS } from "@/lib/types/pricing";
import { PricingStoreProvider } from "@/lib/hooks/usePricingStore";
import { BillingToggle, CurrencySwitcher } from "./PricingControls";
import { TierCard } from "./TierCard";

export function PricingSection() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="container-shell pt-20 pb-12 md:pt-28 md:pb-16"
    >
      <PricingStoreProvider>
        <div className="flex flex-col items-center text-center">
          <span className="font-display text-xs tracking-[0.18em] text-forsythia uppercase">
            Pricing
          </span>
          <h2
            id="pricing-heading"
            className="mt-4 max-w-xl text-balance font-display text-3xl font-medium tracking-tight md:text-4xl"
          >
            One rate card. Three currencies. Zero surprises.
          </h2>
          <p className="mt-4 max-w-md text-balance text-[var(--text-secondary)]">
            Every figure below is computed live from a single configuration
            matrix — switch currency or cycle and watch only the numbers move.
          </p>

          <div className="mt-9 flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
            <BillingToggle />
            <CurrencySwitcher />
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-[var(--text-tertiary)]">
          All prices in INR and EUR are converted from a USD base rate via a
          fixed regional tariff and rounded for display. Annual plans apply a
          flat 20% discount to the monthly rate.
        </p>
      </PricingStoreProvider>
    </section>
  );
}
