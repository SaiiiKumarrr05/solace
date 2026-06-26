"use client";

import { useEffect, useRef } from "react";
import { BENTO_ITEMS } from "@/lib/config/bento";
import { Icon } from "@/app/_components/ui/Icon";
import type { BentoAccordionApi } from "@/lib/hooks/useBentoAccordion";

interface AccordionListProps {
  api: BentoAccordionApi;
}

export function AccordionList({ api }: AccordionListProps) {
  const { isOpen, onSelect, activeIndex } = api;

  return (
    <div role="list" className="flex flex-col divide-y divide-white/10 border-y border-white/10">
      {BENTO_ITEMS.map((item, index) => (
        <AccordionRow
          key={item.id}
          index={index}
          item={item}
          open={isOpen(index)}
          onToggle={() => onSelect(index)}
          /* When the active index changes via the desktop hover hand-off
             (i.e. not from a click on *this* row), scroll it into view so
             the "Context Lock" hand-off is visible after a resize. */
          shouldRevealOnMount={activeIndex === index}
        />
      ))}
    </div>
  );
}

function AccordionRow({
  item,
  open,
  onToggle,
  shouldRevealOnMount,
}: {
  index: number;
  item: (typeof BENTO_ITEMS)[number];
  open: boolean;
  onToggle: () => void;
  shouldRevealOnMount: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const hasRevealedRef = useRef(false);

  // Native WAAPI height animation: measure the natural content height,
  // animate from 0 -> that height, no third-party transition engine.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const targetHeight = open ? panel.scrollHeight : 0;
    const startHeight = open ? 0 : panel.scrollHeight;

    panel.style.height = `${startHeight}px`;
    const animation = panel.animate(
      [{ height: `${startHeight}px` }, { height: `${targetHeight}px` }],
      { duration: 350, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "forwards" },
    );

    animation.onfinish = () => {
      panel.style.height = open ? "auto" : "0px";
    };

    return () => animation.cancel();
  }, [open]);

  useEffect(() => {
    if (shouldRevealOnMount && !hasRevealedRef.current) {
      hasRevealedRef.current = true;
      rowRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
    if (!shouldRevealOnMount) hasRevealedRef.current = false;
  }, [shouldRevealOnMount]);

  return (
    <div ref={rowRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`panel-${item.id}`}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="flex items-center gap-3">
          <span
            className={[
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors",
              "duration-[var(--dur-micro)] ease-[var(--ease-out-micro)]",
              open
                ? "border-forsythia/40 bg-forsythia text-oceanic-noir"
                : "border-white/15 text-[var(--text-secondary)]",
            ].join(" ")}
          >
            <Icon name={item.icon} size={16} />
          </span>
          <span className="font-display text-[15px] font-medium">{item.title}</span>
        </span>
        <Icon
          name="chevron-down"
          size={18}
          className="shrink-0 text-[var(--text-tertiary)] transition-transform duration-[var(--dur-micro)] ease-[var(--ease-out-micro)]"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <div
        id={`panel-${item.id}`}
        ref={panelRef}
        style={{ height: open ? "auto" : 0, overflow: "hidden" }}
      >
        <div className="pb-5 pl-12">
          <p className="text-[13px] leading-relaxed text-[var(--text-secondary)]">
            {item.description}
          </p>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="font-display text-lg font-medium text-forsythia">
              {item.metric.value}
            </span>
            <span className="text-[11px] text-[var(--text-tertiary)]">{item.metric.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
