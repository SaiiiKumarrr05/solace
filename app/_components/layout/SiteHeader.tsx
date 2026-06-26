"use client";

import { useState } from "react";
import { NAV_LINKS } from "@/lib/config/content";
import { Icon } from "@/app/_components/ui/Icon";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[var(--surface-0)]/80 backdrop-blur-md">
      <div className="container-shell flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-forsythia">
            <span className="font-display text-[13px] font-bold text-oceanic-noir">S</span>
          </span>
          <span className="font-display text-[15px] font-medium">Solace</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--text-secondary)] transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out-micro)] hover:text-[var(--text-primary)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#cta"
            className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          >
            Sign in
          </a>
          <a
            href="#pricing"
            className="rounded-full bg-forsythia px-4 py-2 text-sm font-semibold text-oceanic-noir transition-colors duration-[var(--dur-micro)] ease-[var(--ease-out-micro)] hover:bg-deep-saffron"
          >
            Start free trial
          </a>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 md:hidden"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <Icon name={menuOpen ? "x-mark" : "chevron-down"} size={18} />
        </button>
      </div>

      {menuOpen && (
        <nav
          aria-label="Mobile"
          className="container-shell flex flex-col gap-1 border-t border-white/[0.06] py-4 md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-2 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-white/5 hover:text-[var(--text-primary)]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#pricing"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-full bg-forsythia px-4 py-2.5 text-center text-sm font-semibold text-oceanic-noir"
          >
            Start free trial
          </a>
        </nav>
      )}
    </header>
  );
}
