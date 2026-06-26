"use client";

import { memo } from "react";
import { computePrice, formatPrice, type PricingTier } from "@/lib/types/pricing";
import { usePricingState } from "@/lib/hooks/usePricingStore";

interface PriceTextProps {
  tier: PricingTier;
}

/**
 * This is the ONLY node in the pricing section subscribed to both currency
 * and cycle. It is a leaf: no children depend on it, and nothing above it
 * in the tree reads pricing state, so a change here cannot ripple upward.
 * The tier card around it (features list, CTA, border, glow) is wrapped in
 * React.memo and receives no props derived from pricing state, so it is
 * structurally incapable of re-rendering when this text updates.
 */
function PriceTextImpl({ tier }: PriceTextProps) {
  const { currency, cycle } = usePricingState();
  const amount = computePrice(tier, currency, cycle);
  const period = cycle === "annual" ? "/mo, billed yearly" : "/month";

  return (
    <p className="flex items-baseline gap-1.5">
      <span className="font-display text-[2.75rem] font-medium tracking-tight tabular-nums">
        {formatPrice(amount, currency)}
      </span>
      <span className="text-sm text-[var(--text-tertiary)]">{period}</span>
    </p>
  );
}

export const PriceText = memo(PriceTextImpl);
