"use client";

import { memo } from "react";
import { CURRENCIES, type Currency } from "@/lib/types/pricing";
import { useBillingCycle, useCurrency } from "@/lib/hooks/usePricingStore";

const CURRENCY_LIST = Object.values(CURRENCIES);

/**
 * Subscribes only to `currency` via useCurrency(). When the billing cycle
 * changes elsewhere, this component's external-store subscription is not
 * notified, so it never re-renders — verify in React DevTools Profiler by
 * toggling the cycle and watching this node stay unhighlighted.
 */
function CurrencySwitcherImpl() {
  const [currency, setCurrency] = useCurrency();

  return (
    <div
      role="radiogroup"
      aria-label="Select currency"
      className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1"
    >
      {CURRENCY_LIST.map((c) => {
        const active = c.code === currency;
        return (
          <button
            key={c.code}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setCurrency(c.code as Currency)}
            className={[
              "relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors",
              "duration-[var(--dur-micro)] ease-[var(--ease-out-micro)]",
              active
                ? "bg-forsythia text-oceanic-noir"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
            ].join(" ")}
          >
            {c.code}
          </button>
        );
      })}
    </div>
  );
}

export const CurrencySwitcher = memo(CurrencySwitcherImpl);

/**
 * Subscribes only to `cycle`. Switching currency does not notify this
 * component's subscription, so it stays idle while the price text updates
 * elsewhere on the page.
 */
function BillingToggleImpl() {
  const [cycle, setCycle] = useBillingCycle();
  const isAnnual = cycle === "annual";

  return (
    <div className="inline-flex items-center gap-3">
      <span
        className={`text-sm font-medium transition-colors duration-[var(--dur-micro)] ${
          !isAnnual ? "text-[var(--text-primary)]" : "text-[var(--text-tertiary)]"
        }`}
      >
        Monthly
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isAnnual}
        aria-label="Toggle annual billing"
        onClick={() => setCycle(isAnnual ? "monthly" : "annual")}
        className="relative h-7 w-12 rounded-full bg-white/10 transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out-micro)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
      >
        <span
          className="absolute top-1 left-1 h-5 w-5 rounded-full bg-forsythia transition-transform duration-[var(--dur-micro)] ease-[var(--ease-out-micro)]"
          style={{ transform: isAnnual ? "translateX(20px)" : "translateX(0)" }}
        />
      </button>
      <span
        className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-[var(--dur-micro)] ${
          isAnnual ? "text-[var(--text-primary)]" : "text-[var(--text-tertiary)]"
        }`}
      >
        Annual
        <span className="rounded-full bg-forsythia/15 px-1.5 py-0.5 text-[11px] font-semibold text-forsythia">
          −20%
        </span>
      </span>
    </div>
  );
}

export const BillingToggle = memo(BillingToggleImpl);
