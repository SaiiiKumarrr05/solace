export function CtaSection() {
  return (
    <section id="cta" aria-labelledby="cta-heading" className="container-shell py-24">
      <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-white/10 bg-gradient-to-br from-nocturnal to-[var(--surface-1)] px-8 py-16 text-center md:px-16">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-forsythia/25 blur-[100px]"
        />
        <h2
          id="cta-heading"
          className="relative text-balance font-display text-3xl font-medium tracking-tight md:text-4xl"
        >
          Stop maintaining pipelines. Start shipping decisions.
        </h2>
        <p className="relative mx-auto mt-4 max-w-md text-balance text-[var(--text-secondary)]">
          Set up your first connector in under ten minutes — no credit card
          required.
        </p>
        <form
          className="relative mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          aria-label="Start your free trial"
        >
          <label htmlFor="trial-email" className="sr-only">
            Work email
          </label>
          <input
            id="trial-email"
            type="email"
            required
            placeholder="you@company.com"
            className="w-full rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus-visible:border-forsythia/60"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-forsythia px-6 py-3 text-sm font-semibold text-oceanic-noir transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out-micro)] hover:bg-deep-saffron"
          >
            Start free trial
          </button>
        </form>
      </div>
    </section>
  );
}
