import { Icon } from "@/app/_components/ui/Icon";

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="container-shell relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-10%] right-[-10%] h-[420px] w-[420px] rounded-full bg-forsythia/20 blur-[120px]"
        style={{ animation: "pulse-glow 6s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[380px] w-[380px] rounded-full bg-nocturnal/40 blur-[120px]"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-[var(--text-secondary)] opacity-0"
          style={{ animation: "fade-up 420ms 0ms var(--ease-out-micro) forwards" }}
        >
          <Icon name="cog" size={14} className="text-forsythia" />
          Now orchestrating 40,000+ pipeline runs daily
        </span>

        <h1
          className="mt-6 text-balance font-display text-[2.5rem] leading-[1.08] font-medium tracking-tight opacity-0 md:text-[3.75rem]"
          style={{ animation: "fade-up 460ms 60ms var(--ease-out-micro) forwards" }}
        >
          Your data infrastructure,
          <br />
          running itself.
        </h1>

        <p
          className="mx-auto mt-6 max-w-xl text-balance text-base text-[var(--text-secondary)] opacity-0 md:text-lg"
          style={{ animation: "fade-up 460ms 120ms var(--ease-out-micro) forwards" }}
        >
          Solace connects your sources, defines intent in plain language, and
          runs agent pipelines that ingest, transform, and act on your data —
          without a single nightly cron job.
        </p>

        <div
          className="mt-9 flex flex-col items-center justify-center gap-3 opacity-0 sm:flex-row"
          style={{ animation: "fade-up 460ms 180ms var(--ease-out-micro) forwards" }}
        >
          <a
            href="#pricing"
            className="w-full rounded-full bg-forsythia px-6 py-3.5 text-center text-sm font-semibold text-oceanic-noir transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out-micro)] hover:bg-deep-saffron sm:w-auto"
          >
            Start free trial
          </a>
          <a
            href="#platform"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-[var(--text-primary)] transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out-micro)] hover:border-white/30 hover:bg-white/5 sm:w-auto"
          >
            See how it works
            <Icon name="chevron-right" size={14} />
          </a>
        </div>
      </div>

      <div
        className="relative mx-auto mt-16 max-w-4xl rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.02] p-2 opacity-0 md:mt-20"
        style={{ animation: "fade-up 500ms 220ms var(--ease-out-micro) forwards" }}
      >
        <DashboardPreview />
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <div className="rounded-[calc(var(--radius-lg)-4px)] border border-white/10 bg-[var(--surface-1)] p-5 md:p-7">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-deep-saffron" />
          <span className="h-2.5 w-2.5 rounded-full bg-forsythia" />
          <span className="h-2.5 w-2.5 rounded-full bg-mystic-mint" />
        </div>
        <span className="font-display text-[11px] text-[var(--text-tertiary)]">
          pipeline.solace.run
        </span>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Active pipelines", value: "184" },
          { label: "Events / sec", value: "2,408" },
          { label: "Uptime", value: "99.99%" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-[var(--radius-md)] border border-white/10 bg-white/[0.02] p-4"
          >
            <p className="font-display text-2xl font-medium tabular-nums">{stat.value}</p>
            <p className="mt-1 text-xs text-[var(--text-tertiary)]">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
