"use client";

import { useEffect, useRef, useState } from "react";
import { FAQ_ITEMS } from "@/lib/config/content";
import { Icon } from "@/app/_components/ui/Icon";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="container-shell pt-20 pb-12 md:pt-28 md:pb-16"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.4fr]">
        <div>
          <span className="font-display text-xs tracking-[0.18em] text-forsythia uppercase">
            FAQ
          </span>
          <h2
            id="faq-heading"
            className="mt-4 text-balance font-display text-3xl font-medium tracking-tight md:text-4xl"
          >
            Common questions, answered plainly.
          </h2>
          <p className="mt-4 text-[var(--text-secondary)]">
            Can&apos;t find what you&apos;re looking for? Reach our team directly.
          </p>
        </div>

        <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
          {FAQ_ITEMS.map((item, index) => (
            <FaqRow
              key={item.question}
              item={item}
              open={openIndex === index}
              onToggle={() => setOpenIndex((curr) => (curr === index ? null : index))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqRow({
  item,
  open,
  onToggle,
}: {
  item: (typeof FAQ_ITEMS)[number];
  open: boolean;
  onToggle: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const target = open ? panel.scrollHeight : 0;
    const start = open ? 0 : panel.scrollHeight;
    panel.style.height = `${start}px`;
    const animation = panel.animate(
      [{ height: `${start}px` }, { height: `${target}px` }],
      { duration: 350, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "forwards" },
    );
    animation.onfinish = () => {
      panel.style.height = open ? "auto" : "0px";
    };
    return () => animation.cancel();
  }, [open]);

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-[15px] font-medium">{item.question}</span>
        <Icon
          name="chevron-down"
          size={18}
          className="shrink-0 text-[var(--text-tertiary)] transition-transform duration-[var(--dur-micro)] ease-[var(--ease-out-micro)]"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <div ref={panelRef} style={{ height: open ? "auto" : 0, overflow: "hidden" }}>
        <p className="pb-5 pr-8 text-sm leading-relaxed text-[var(--text-secondary)]">
          {item.answer}
        </p>
      </div>
    </div>
  );
}
