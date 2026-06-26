import { STAT_ITEMS } from "@/lib/config/content";

export function StatsSection() {
  return (
    <section aria-label="Key metrics" className="container-shell py-4">
      <div className="grid grid-cols-1 gap-8 rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.02] p-8 sm:grid-cols-3 md:p-12">
        {STAT_ITEMS.map((stat, i) => (
          <div
            key={stat.label}
            className={[
              "flex flex-col gap-2",
              i > 0 ? "sm:border-l sm:border-white/10 sm:pl-8" : "",
            ].join(" ")}
          >
            <p className="font-display text-4xl font-medium tracking-tight text-forsythia tabular-nums md:text-5xl">
              {stat.value}
            </p>
            <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
