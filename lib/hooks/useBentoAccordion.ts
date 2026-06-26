"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";

const MOBILE_BREAKPOINT_QUERY = "(max-width: 767px)";

/**
 * Tracks whether the viewport is currently below the bento → accordion
 * breakpoint. Backed by matchMedia via useSyncExternalStore rather than a
 * resize listener + setState-in-effect: the subscription fires exactly at
 * the breakpoint crossing, and useSyncExternalStore is the React-idiomatic
 * way to read an external, mutable source (the media query's `.matches`)
 * without the "setState synchronously inside an effect" anti-pattern.
 */
function subscribeToBreakpoint(callback: () => void) {
  const mql = window.matchMedia(MOBILE_BREAKPOINT_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getBreakpointSnapshot() {
  return window.matchMedia(MOBILE_BREAKPOINT_QUERY).matches;
}

function useIsMobileViewport(): boolean {
  return useSyncExternalStore(
    subscribeToBreakpoint,
    getBreakpointSnapshot,
    () => false, // server snapshot: assume desktop until hydrated
  );
}

/**
 * The "Context Lock Constraint": a single `activeIndex` is the source of
 * truth for which bento node / accordion panel is open. Desktop hover and
 * mobile accordion-click both write to the *same* piece of state, so there
 * is nothing to "transfer" at the moment of resize — the index that was set
 * by hovering a bento card on desktop is already the index the accordion
 * reads on mobile. Crossing the breakpoint mid-interaction therefore can't
 * lose context, because there is only ever one state variable, not two
 * separate ones being synced after the fact.
 */
export function useBentoAccordion(itemCount: number) {
  const isMobile = useIsMobileViewport();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const hoverIndexRef = useRef<number | null>(null);

  // On desktop, hover sets a transient "preview" active index. We keep the
  // last hovered index in a ref so that even a hover-without-click context
  // (mouse resting over a card) survives the resize, per the brief's
  // "actively hovering ... and abruptly resizes" wording.
  const onHoverStart = useCallback(
    (index: number) => {
      hoverIndexRef.current = index;
      if (!isMobile) setActiveIndex(index);
    },
    [isMobile],
  );

  const onHoverEnd = useCallback(
    (index: number) => {
      if (hoverIndexRef.current === index) hoverIndexRef.current = null;
      // Don't clear activeIndex on hover-end if the user has explicitly
      // selected/focused this panel — only clear transient hover preview.
    },
    [],
  );

  const onSelect = useCallback((index: number) => {
    hoverIndexRef.current = index;
    setActiveIndex((current) => (current === index ? null : index));
  }, []);

  const isOpen = useCallback((index: number) => activeIndex === index, [activeIndex]);

  return {
    isMobile,
    activeIndex,
    isOpen,
    onHoverStart,
    onHoverEnd,
    onSelect,
    itemCount,
  };
}

export type BentoAccordionApi = ReturnType<typeof useBentoAccordion>;
