
import Link from "next/link";
import {
  ArrowUp,
  Heart,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export default function GhieFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--ghie-border)] bg-white">
      {/* Subtle decorative accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-[var(--ghie-gold)]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 h-64 w-64 rounded-full bg-[var(--ghie-blue)]/5 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-10 sm:px-7 sm:py-12">
        <div className="flex flex-col items-center text-center">
          {/* Back to top */}
          <a
            href="#home"
            aria-label="Back to top"
            className="group mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--ghie-border)] bg-white text-[var(--ghie-blue)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--ghie-gold)] hover:bg-[var(--ghie-blue-dark)] hover:text-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ghie-gold)] focus-visible:ring-offset-2"
          >
            <ArrowUp
              size={19}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </a>

          {/* Name and tagline */}
          <div>
            <div className="mb-2 flex items-center justify-center gap-2">
              <Sparkles
                size={14}
                className="text-[var(--ghie-gold)]"
              />
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--ghie-muted)]">
                Create Lasting Impacts
              </span>
              <Sparkles
                size={14}
                className="text-[var(--ghie-gold)]"
              />
            </div>

            <p className="text-lg font-bold tracking-tight text-[var(--ghie-text)] sm:text-xl">
              Rosalie “Ghie” F. Larracas
            </p>

            <p className="mt-2 max-w-sm text-xs leading-relaxed text-[var(--ghie-muted)] sm:text-sm">
              Connecting people, inspiring service, and creating meaningful
              change in the community.
            </p>
          </div>

          {/* Divider */}
          <div className="my-8 flex w-full max-w-xs items-center gap-3">
            <div className="h-px flex-1 bg-[var(--ghie-border)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--ghie-gold)]" />
            <div className="h-px flex-1 bg-[var(--ghie-border)]" />
          </div>

          {/* DexTap credit */}
          <p className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-[var(--ghie-muted)]">
            Crafted with
            <Heart
              size={12}
              className="fill-[var(--ghie-gold)] text-[var(--ghie-gold)]"
            />
            and powered by
            <Link
              href="https://dextap.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 font-bold text-[var(--ghie-blue)] transition-colors hover:text-[var(--ghie-blue-dark)] focus-visible:outline-none focus-visible:underline"
            >
              DexTap
              <ArrowUpRight
                size={12}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </p>

          {/* Copyright */}
          <div className="mt-5 flex flex-col items-center gap-1 sm:flex-row sm:gap-2">
            <p className="text-[10px] font-medium text-[var(--ghie-muted)]">
              © {new Date().getFullYear()} Rosalie “Ghie” F. Larracas.
            </p>
            <span className="hidden text-[var(--ghie-border)] sm:inline">
              •
            </span>
            <p className="text-[10px] text-[var(--ghie-muted)]">
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
