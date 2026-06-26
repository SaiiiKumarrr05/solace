"use client";

import { BENTO_ITEMS } from "@/lib/config/bento";
import { Icon } from "@/app/_components/ui/Icon";
import type { BentoAccordionApi } from "@/lib/hooks/useBentoAccordion";

interface BentoGridProps {
  api: BentoAccordionApi;
}

export function BentoGrid({ api }: BentoGridProps) {
  const { isOpen, onHoverStart, onHoverEnd, onSelect } = api;

  return (
    <div
      role="list"
      className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[180px]"
    >
      {BENTO_ITEMS.map((item, index) => {
        const active = isOpen(index);
        const featured = item.span.includes("row-span-2");
        return (
          <div key={item.id} role="listitem" className={item.span}>
            <button
              type="button"
              aria-pressed={active}
              onMouseEnter={() => onHoverStart(index)}
              onMouseLeave={() => onHoverEnd(index)}
              onFocus={() => onHoverStart(index)}
              onClick={() => onSelect(index)}
              className={[
                "group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[var(--radius-lg)] border p-6 text-left",
                "transition-[border-color,background-color,transform] duration-[var(--dur-micro)] ease-[var(--ease-out-micro)]",
                active
                  ? "border-forsythia/50 bg-forsythia/[0.06]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]",
              ].join(" ")}
            >
              {featured && <ConnectorDiagram active={active} />}

              <div
                className={[
                  "relative z-10 flex items-center justify-center rounded-full border transition-colors",
                  "duration-[var(--dur-micro)] ease-[var(--ease-out-micro)]",
                  featured ? "h-12 w-12" : "h-10 w-10",
                  active
                    ? "border-forsythia/40 bg-forsythia text-oceanic-noir"
                    : "border-white/15 text-[var(--text-secondary)] group-hover:border-white/30",
                ].join(" ")}
              >
                <Icon name={item.icon} size={featured ? 20 : 18} />
              </div>

              <div className="relative z-10">
                <h3
                  className={[
                    "font-display font-medium",
                    featured ? "text-xl" : "text-base",
                  ].join(" ")}
                >
                  {item.title}
                </h3>
                <p
                  className={[
                    "mt-2 leading-relaxed text-[var(--text-secondary)]",
                    featured ? "max-w-sm text-sm" : "text-[13px]",
                  ].join(" ")}
                >
                  {item.description}
                </p>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span
                    className={[
                      "font-display font-medium text-forsythia",
                      featured ? "text-2xl" : "text-xl",
                    ].join(" ")}
                  >
                    {item.metric.value}
                  </span>
                  <span className="text-[11px] text-[var(--text-tertiary)]">
                    {item.metric.label}
                  </span>
                </div>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Decorative connector mesh for the featured ingestion cell — built from
 * plain SVG lines/circles on-brand with the forsythia accent, not a stock
 * illustration. Purely ambient: aria-hidden, ignored by screen readers.
 */
function ConnectorDiagram({ active }: { active: boolean }) {
  const nodes = [
    [60, 30],
    [30, 70],
    [90, 75],
    [55, 95],
  ];
  return (
    <svg
      aria-hidden
      viewBox="0 0 320 160"
      preserveAspectRatio="xMaxYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
    >
      {nodes.map(([x, y], i) => (
        <line
          key={`l-${i}`}
          x1="260"
          y1="40"
          x2={x + 170}
          y2={y + 20}
          stroke="var(--mystic-mint)"
          strokeOpacity={active ? 0.35 : 0.16}
          strokeWidth="1"
          style={{ transition: "stroke-opacity var(--dur-micro) var(--ease-out-micro)" }}
        />
      ))}
      <circle cx="260" cy="40" r="5" fill="var(--forsythia)" />
      {nodes.map(([x, y], i) => (
        <circle
          key={`c-${i}`}
          cx={x + 170}
          cy={y + 20}
          r="3.5"
          fill="var(--mystic-mint)"
          opacity={active ? 0.55 : 0.32}
          style={{ transition: "opacity var(--dur-micro) var(--ease-out-micro)" }}
        />
      ))}
    </svg>
  );
}
