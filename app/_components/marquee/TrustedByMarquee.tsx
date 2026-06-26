import { TRUSTED_LOGOS } from "@/lib/config/content";

export function TrustedByMarquee() {
  const doubled = [...TRUSTED_LOGOS, ...TRUSTED_LOGOS];

  return (
    <section aria-label="Trusted by" className="border-y border-white/[0.06] py-10">
      <div className="container-shell">
        <p className="text-center text-xs tracking-[0.18em] text-[var(--text-tertiary)] uppercase">
          Powering data operations at
        </p>
      </div>

      <div
        className="relative mt-6 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <ul
          aria-hidden
          className="flex w-max items-center gap-16"
          style={{ animation: "marquee-scroll 32s linear infinite" }}
        >
          {doubled.map((name, i) => (
            <li
              key={`${name}-${i}`}
              className="font-display text-sm whitespace-nowrap text-[var(--text-tertiary)]"
            >
              {name}
            </li>
          ))}
        </ul>
        {/* Real, crawlable list for SEO/AT — visually hidden, marquee above is decorative */}
        <ul className="sr-only">
          {TRUSTED_LOGOS.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
