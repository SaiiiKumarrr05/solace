"use client";

import { BENTO_ITEMS } from "@/lib/config/bento";
import { useBentoAccordion } from "@/lib/hooks/useBentoAccordion";
import { BentoGrid } from "./BentoGrid";
import { AccordionList } from "./AccordionList";

export function BentoSection() {
  // One hook instance, one activeIndex — both <BentoGrid> and
  // <AccordionList> below read from it. Neither view "hands off" state to
  // the other on resize; they were always reading the same value, so a
  // resize mid-hover simply swaps which component renders that value.
  const api = useBentoAccordion(BENTO_ITEMS.length);

  return (
    <section
      id="platform"
      aria-labelledby="platform-heading"
      className="container-shell pt-20 pb-12 md:pt-28 md:pb-16"
    >
      <div className="mx-auto max-w-2xl text-center">
        <span className="font-display text-xs tracking-[0.18em] text-forsythia uppercase">
          Platform
        </span>
        <h2
          id="platform-heading"
          className="mt-4 text-balance font-display text-3xl font-medium tracking-tight md:text-4xl"
        >
          Six primitives. One coherent system.
        </h2>
        <p className="mt-4 text-balance text-[var(--text-secondary)]">
          Hover a card on desktop to preview it — resize the window mid-hover
          and the same card opens as an accordion panel below, no state lost.
        </p>
      </div>

      <div className="mt-14">
        {/* Both are always mounted; CSS visibility (hidden md:block /
            md:hidden) switches which is on screen, so there is no
            component-mount-flash when crossing the breakpoint and no
            re-fetch of shared state. */}
        <div className="hidden md:block">
          <BentoGrid api={api} />
        </div>
        <div className="md:hidden">
          <AccordionList api={api} />
        </div>
      </div>
    </section>
  );
}
