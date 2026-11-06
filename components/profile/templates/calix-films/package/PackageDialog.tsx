
"use client";

import { useEffect } from "react";
import type { CalixPackage } from "@/lib/packages/calix";
import { FaXmark, FaCheck } from "react-icons/fa6";

type Props = {
  item: CalixPackage | null;
  onClose: () => void;
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5CD91] focus-visible:ring-offset-2 focus-visible:ring-offset-[#031319]";

export default function PackageDialog({ item, onClose }: Props) {
  useEffect(() => {
    if (!item) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [item]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/85 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="package-title"
        className="relative max-h-[85dvh] w-full max-w-lg overflow-y-auto overscroll-contain border border-[#D6B779]/30 bg-[#031319] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.6)] sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Top gold accent */}
        <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#B89553] via-[#F0DDA8] to-[#B89553]" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-7 bg-[#B89553]" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D6B779]">
                Package Details
              </p>
            </div>

            <h2
              id="package-title"
              className="text-2xl font-bold leading-tight text-white sm:text-3xl"
            >
              {item.name}
            </h2>
          </div>

          {/* Boxy close icon */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close package details"
            className={`flex h-10 w-10 shrink-0 items-center justify-center border border-[#D6B779]/30 bg-[#262B28] text-[#E5CD91] transition hover:border-[#E5CD91] hover:bg-[#B89553]/15 hover:text-white ${focusRing}`}
          >
            <FaXmark size={17} />
          </button>
        </div>

        {/* Price */}
        <div className="mt-8 border border-[#D6B779]/15 bg-[#262B28]/60 p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C0A08E]/50">
            Package Price
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-[#E5CD91] sm:text-4xl">
            ₱{item.price.toLocaleString("en-PH")}
          </p>
        </div>

        {/* Divider */}
        <div className="my-7 h-px bg-gradient-to-r from-[#B89553]/50 via-[#D6B779]/15 to-transparent" />

        {/* Inclusions */}
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white">
              Package Inclusions
            </h3>

            <span className="h-px flex-1 bg-[#D6B779]/15" />
          </div>

          <ul className="mt-5 space-y-4">
            {item.inclusions.map((inclusion, index) => (
              <li
                key={inclusion}
                className="flex items-start gap-3 text-sm leading-6 text-[#C0A08E]/80"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-[#D6B779]/30 bg-[#B89553]/10">
                  <FaCheck size={10} className="text-[#E5CD91]" />
                </span>

                {inclusion}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom action */}
        <div className="mt-9 border-t border-[#D6B779]/15 pt-6">
          <button
            type="button"
            onClick={onClose}
            className={`flex min-h-12 w-full items-center justify-center border border-[#D6B779] bg-gradient-to-r from-[#B89553] to-[#E5CD91] px-6 text-sm font-bold uppercase tracking-[0.15em] text-[#031319] transition duration-300 hover:brightness-110 active:scale-[0.99] ${focusRing}`}
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
