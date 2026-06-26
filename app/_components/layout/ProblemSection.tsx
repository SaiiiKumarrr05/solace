import { Icon } from "@/app/_components/ui/Icon";

const PROBLEMS = [
  {
    icon: "cog" as const,
    title: "Pipelines built on cron and hope",
    description:
      "A nightly script breaks at 2am, nobody notices until finance asks why yesterday's numbers are missing.",
  },
  {
    icon: "chart-pie" as const,
    title: "No record of why a number changed",
    description:
      "Three teams transform the same data differently, and tracing a discrepancy back to its source takes a week.",
  },
  {
    icon: "arrow-path" as const,
    title: "Manual syncs that don't scale",
    description:
      "Every new source means another one-off script, another credential to rotate, another thing that quietly drifts.",
  },
];

export function ProblemSection() {
  return (
    <section aria-labelledby="problem-heading" className="container-shell pt-20 pb-12 md:pt-28 md:pb-16">
      <div className="mx-auto max-w-2xl text-center">
        <span className="font-display text-xs tracking-[0.18em] text-forsythia uppercase">
          The problem
        </span>
        <h2
          id="problem-heading"
          className="mt-4 text-balance font-display text-3xl font-medium tracking-tight md:text-4xl"
        >
          Most data infrastructure was never designed to run itself.
        </h2>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {PROBLEMS.map((p) => (
          <div
            key={p.title}
            className="rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.02] p-7"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[var(--text-secondary)]">
              <Icon name={p.icon} size={18} />
            </div>
            <h3 className="mt-5 font-display text-base font-medium">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              {p.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
