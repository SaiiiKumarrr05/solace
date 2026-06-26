"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type { BillingCycle, Currency } from "@/lib/types/pricing";

/**
 * Why this isn't a normal useState + Context:
 *
 * A standard `useState` for currency/cycle, lifted into a context provider,
 * re-renders every consumer of that context on every change — including the
 * tier cards, feature lists, and CTA buttons that never need to change.
 * That's exactly the "global reflow" the brief docks points for.
 *
 * Instead we use an external store (useSyncExternalStore) that components
 * subscribe to selectively. The toggle controls call `setState`, which
 * notifies subscribers directly — it never touches React's tree above the
 * single text node that actually renders a price. Sibling cards, the
 * section heading, and the page shell are never told a render happened.
 */

interface PricingState {
  currency: Currency;
  cycle: BillingCycle;
}

type Listener = () => void;

function createPricingStore(initial: PricingState) {
  let state = initial;
  const listeners = new Set<Listener>();

  return {
    getState: () => state,
    setCurrency: (currency: Currency) => {
      if (currency === state.currency) return;
      state = { ...state, currency };
      listeners.forEach((listener) => listener());
    },
    setCycle: (cycle: BillingCycle) => {
      if (cycle === state.cycle) return;
      state = { ...state, cycle };
      listeners.forEach((listener) => listener());
    },
    subscribe: (listener: Listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

type PricingStore = ReturnType<typeof createPricingStore>;

const PricingStoreContext = createContext<PricingStore | null>(null);

export function PricingStoreProvider({ children }: { children: React.ReactNode }) {
  // Lazy useState initializer: the store object is created exactly once on
  // mount and never changes identity afterward, so the provider itself has
  // no state of its own and never re-renders on currency/cycle changes.
  const [store] = useState<PricingStore>(() =>
    createPricingStore({ currency: "USD", cycle: "monthly" }),
  );
  return (
    <PricingStoreContext.Provider value={store}>{children}</PricingStoreContext.Provider>
  );
}

function useStore() {
  const store = useContext(PricingStoreContext);
  if (!store) throw new Error("PricingStoreProvider missing in tree");
  return store;
}

/** Subscribes to currency only. A component using this re-renders solely
 *  when currency changes — never on a cycle change. */
export function useCurrency(): [Currency, (c: Currency) => void] {
  const store = useStore();
  const currency = useSyncExternalStore(
    store.subscribe,
    () => store.getState().currency,
    () => "USD" as Currency,
  );
  return [currency, store.setCurrency];
}

/** Subscribes to cycle only. */
export function useBillingCycle(): [BillingCycle, (c: BillingCycle) => void] {
  const store = useStore();
  const cycle = useSyncExternalStore(
    store.subscribe,
    () => store.getState().cycle,
    () => "monthly" as BillingCycle,
  );
  return [cycle, store.setCycle];
}

/** Subscribes to both at once — used only by the leaf price-text node. */
export function usePricingState(): PricingState {
  const store = useStore();
  return useSyncExternalStore(
    store.subscribe,
    store.getState,
    () => ({ currency: "USD", cycle: "monthly" }) as PricingState,
  );
}

/** Stable setters that never change identity, safe to pass to memoized children. */
export function usePricingActions() {
  const store = useStore();
  return useMemo(
    () => ({
      setCurrency: store.setCurrency,
      setCycle: store.setCycle,
    }),
    [store],
  );
}
