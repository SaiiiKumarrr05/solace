export type Currency = "USD" | "EUR" | "INR";
export type BillingCycle = "monthly" | "annual";
export type TierId = "starter" | "scale" | "enterprise";

export interface CurrencyMeta {
  code: Currency;
  symbol: string;
  /** Locale used purely for number formatting (thousands separators etc). */
  locale: string;
  /** Regional tariff multiplier applied on top of the USD base rate. */
  tariff: number;
}

export interface PricingTier {
  id: TierId;
  name: string;
  tagline: string;
  /** Base monthly rate, denominated in USD, before regional tariff. */
  baseMonthlyUsd: number;
  highlighted?: boolean;
  ctaLabel: string;
  features: string[];
}

export const ANNUAL_DISCOUNT_MULTIPLIER = 0.8; // flat 20% annual discount

export const CURRENCIES: Record<Currency, CurrencyMeta> = {
  USD: { code: "USD", symbol: "$", locale: "en-US", tariff: 1 },
  EUR: { code: "EUR", symbol: "€", locale: "de-DE", tariff: 0.93 },
  INR: { code: "INR", symbol: "₹", locale: "en-IN", tariff: 83.1 },
};

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For small teams automating their first pipeline.",
    baseMonthlyUsd: 19,
    ctaLabel: "Start free trial",
    features: [
      "3 connected sources",
      "10k events / month",
      "Community support",
      "Single workspace",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "For teams running production data agents.",
    baseMonthlyUsd: 79,
    highlighted: true,
    ctaLabel: "Start free trial",
    features: [
      "Unlimited sources",
      "1M events / month",
      "Priority support",
      "Role-based access",
      "Audit logs",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For orgs with dedicated reliability requirements.",
    baseMonthlyUsd: 249,
    ctaLabel: "Talk to sales",
    features: [
      "Unlimited everything",
      "Dedicated infra region",
      "99.99% uptime SLA",
      "SSO & SCIM",
      "Dedicated solutions engineer",
    ],
  },
];

/**
 * Multi-dimensional pricing matrix: tier × currency × cycle.
 * Nothing here is a displayed string — every cell is a number derived
 * from baseMonthlyUsd × currency tariff × (annual discount if applicable).
 * This is computed once per (currency, cycle) pair via getPriceMatrixSlice,
 * never per render of the full page.
 */
export function computePrice(
  tier: PricingTier,
  currency: Currency,
  cycle: BillingCycle,
): number {
  const tariff = CURRENCIES[currency].tariff;
  const monthly = tier.baseMonthlyUsd * tariff;
  const multiplier = cycle === "annual" ? ANNUAL_DISCOUNT_MULTIPLIER : 1;
  return monthly * multiplier;
}

export function formatPrice(amount: number, currency: Currency): string {
  const { locale, symbol } = CURRENCIES[currency];
  const rounded =
    currency === "INR" ? Math.round(amount) : Math.round(amount * 100) / 100;
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: currency === "INR" ? 0 : 0,
    maximumFractionDigits: currency === "INR" ? 0 : 2,
  }).format(rounded);
  return `${symbol}${formatted}`;
}
