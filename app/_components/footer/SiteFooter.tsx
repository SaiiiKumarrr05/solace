import { NAV_LINKS } from "@/lib/config/content";

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: ["Platform", "Pricing", "Changelog", "Status"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Press"],
  },
  {
    title: "Resources",
    links: ["Documentation", "API reference", "Community", "Support"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security", "DPA"],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="container-shell py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-5">
          <div className="col-span-2">
            <a href="#top" className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-forsythia">
                <span className="font-display text-[13px] font-bold text-oceanic-noir">S</span>
              </span>
              <span className="font-display text-[15px] font-medium">Solace</span>
            </a>
            <p className="mt-4 max-w-xs text-sm text-[var(--text-secondary)]">
              Autonomous data infrastructure for teams that would rather ship
              decisions than maintain scripts.
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-display text-xs tracking-[0.1em] text-[var(--text-tertiary)] uppercase">
                {col.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href={NAV_LINKS.find((n) => n.label === link)?.href ?? "#"}
                      className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--text-tertiary)]">
            © {new Date().getFullYear()} Solace, Inc. All rights reserved.
          </p>
        </div>
      </div>

      <div aria-hidden className="overflow-hidden border-t border-white/[0.06] py-2">
        <p className="container-shell font-display text-[clamp(4rem,18vw,11rem)] leading-none font-bold tracking-tighter text-white/[0.04] select-none">
          solace
        </p>
      </div>
    </footer>
  );
}
