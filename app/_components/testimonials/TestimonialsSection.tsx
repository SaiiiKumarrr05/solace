import { TESTIMONIALS } from "@/lib/config/content";

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="container-shell pt-20 pb-12 md:pt-28 md:pb-16"
    >
      <div className="mx-auto max-w-2xl text-center">
        <span className="font-display text-xs tracking-[0.18em] text-forsythia uppercase">
          Customers
        </span>
        <h2
          id="testimonials-heading"
          className="mt-4 text-balance font-display text-3xl font-medium tracking-tight md:text-4xl"
        >
          Teams that stopped babysitting pipelines.
        </h2>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col justify-between rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.02] p-7"
          >
            <blockquote className="text-[15px] leading-relaxed text-[var(--text-primary)]">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 border-t border-white/10 pt-5">
              <p className="text-sm font-medium">{t.name}</p>
              <p className="mt-0.5 text-xs text-[var(--text-tertiary)]">
                {t.role}, {t.company}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
