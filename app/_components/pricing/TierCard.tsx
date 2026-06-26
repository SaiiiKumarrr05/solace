import { memo } from "react";
import type { PricingTier } from "@/lib/types/pricing";
import { PriceText } from "./PriceText";
import { Icon } from "@/app/_components/ui/Icon";

interface TierCardProps {
  tier: PricingTier;
}

/**
 * Wrapped in React.memo with a single stable prop (`tier`, which never
 * changes identity across renders). This card subscribes to nothing —
 * it has no hook into the pricing store — so its only possible reason to
 * re-render is a parent re-render, which memo blocks since `tier` is
 * referentially stable. Only <PriceText> inside it reads pricing state.
 */
function TierCardImpl({ tier }: TierCardProps) {
  return (
    <div
      className={[
        "group relative flex flex-col rounded-[var(--radius-lg)] border p-7 transition-colors",
        "duration-[var(--dur-micro)] ease-[var(--ease-out-micro)]",
        tier.highlighted
          ? "border-forsythia/40 bg-gradient-to-b from-forsythia/[0.08] to-transparent"
          : "border-white/10 bg-white/[0.02] hover:border-white/20",
      ].join(" ")}
    >
      {tier.highlighted && (
        <span className="absolute -top-3 left-7 rounded-full bg-forsythia px-3 py-1 text-[11px] font-semibold tracking-wide text-oceanic-noir uppercase">
          Most adopted
        </span>
      )}

      <h3 className="font-display text-lg font-medium">{tier.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
        {tier.tagline}
      </p>

      <div className="mt-6">
        <PriceText tier={tier} />
      </div>

      <a
        href="#cta"
        className={[
          "mt-7 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all",
          "duration-[var(--dur-micro)] ease-[var(--ease-out-micro)]",
          tier.highlighted
            ? "bg-forsythia text-oceanic-noir hover:bg-deep-saffron"
            : "border border-white/15 text-[var(--text-primary)] hover:border-white/30 hover:bg-white/5",
        ].join(" ")}
      >
        {tier.ctaLabel}
      </a>

      <ul className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
            <Icon
              name="arrow-trending-up"
              size={14}
              className="mt-0.5 shrink-0 text-forsythia"
              aria-hidden
            />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

export const TierCard = memo(TierCardImpl);
