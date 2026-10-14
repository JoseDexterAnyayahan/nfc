"use client";

import { FaCompactDisc, FaArrowUp } from "react-icons/fa";
import { kntoColors as c } from "./knto-styles";

export default function KntoFooter() {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className="mt-5 border-t"
      style={{
        borderColor: c.line,
        backgroundColor: c.cream,
        color: c.ink,
      }}
    >
      <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 sm:py-9 lg:px-10">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:text-left">
          {/* Brand */}
          <div className="flex min-w-0 flex-col items-center sm:items-start">
            <div className="flex items-center justify-center gap-2.5 sm:justify-start">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
                style={{
                  borderColor: c.line,
                  backgroundColor: c.paper,
                  color: c.wood,
                }}
                aria-hidden="true"
              >
                <FaCompactDisc
                  size={17}
                  className="transition-transform duration-700 group-hover:rotate-180"
                />
              </span>

              <div className="text-left">
                <p className="text-xs font-semibold tracking-[0.18em] sm:text-sm">
                  KNTO KLSK
                </p>

                <p
                  className="mt-0.5 text-[9px] uppercase tracking-[0.13em]"
                  style={{ color: c.muted }}
                >
                  Coffee · Music · Moments
                </p>
              </div>
            </div>

            <p
              className="mt-3 text-[9px] uppercase leading-5 tracking-[0.14em] sm:text-[10px] sm:tracking-[0.16em]"
              style={{ color: c.muted }}
            >
              Drop the needle. Sip the moments.
            </p>
          </div>

          {/* Back to top */}
          <button
            type="button"
            onClick={handleBackToTop}
            aria-label="Back to top of the KNTO KLSK profile"
            className="group inline-flex min-h-10 items-center justify-center gap-2 border px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:min-h-11 sm:px-5 sm:text-[10px]"
            style={{
              borderColor: c.line,
              backgroundColor: c.paper,
              color: c.espresso,
            }}
          >
            Back to top

            <FaArrowUp
              size={10}
              className="transition-transform duration-300 group-hover:-translate-y-1"
            />
          </button>
        </div>

        {/* Divider */}
        <div
          className="my-6 h-px w-full sm:my-7"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${c.line} 20%, ${c.line} 80%, transparent 100%)`,
          }}
        />

        {/* Footer bottom */}
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-left">
          <p
            className="text-[9px] leading-5"
            style={{ color: c.muted }}
          >
            Made for good coffee and better company.
          </p>

          <p
            className="text-[9px] leading-5"
            style={{ color: c.muted }}
          >
            Powered by{" "}
            <a
              href="https://dextap.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:decoration-current"
              style={{ color: c.wood }}
            >
              DexTap
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
