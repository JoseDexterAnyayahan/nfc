
"use client";

import { Poppins } from "next/font/google";
import { FaArrowRight, FaCheck } from "react-icons/fa6";
import type { CalixPackage } from "@/lib/packages/calix";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

type Props = {
  item: CalixPackage;
  onSelect: (item: CalixPackage) => void;
};

const VISIBLE_INCLUSIONS = 4;

const GOLD = "#E5CD91";
const WARM_GOLD = "#D6B779";
const ANTIQUE_GOLD = "#B89553";

export default function PackageCard({ item, onSelect }: Props) {
  const visible = item.inclusions.slice(0, VISIBLE_INCLUSIONS);
  const hiddenCount = Math.max(
    item.inclusions.length - VISIBLE_INCLUSIONS,
    0,
  );

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      aria-label={`View full details for ${item.name}`}
      className={`${poppins.className} group relative flex h-full w-full flex-col overflow-hidden rounded-none border border-[#D6B779]/20 bg-gradient-to-br from-[#262B28] via-[#202522] to-[#031319] p-5 text-left transition-all duration-500 hover:-translate-y-1 hover:border-[#E5CD91]/60 hover:shadow-xl hover:shadow-black/40 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5CD91] focus-visible:ring-offset-2 focus-visible:ring-offset-[#031319] sm:p-6`}
    >
      {/* Decorative gold accent */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-[2px] w-full origin-left scale-x-25 bg-gradient-to-r from-[#B89553] via-[#E5CD91] to-transparent transition-transform duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />

      {/* Corner detail */}
      <span
        aria-hidden="true"
        className="absolute right-0 top-0 h-12 w-12 border-r border-t border-[#E5CD91]/15 transition-all duration-500 group-hover:h-16 group-hover:w-16 group-hover:border-[#E5CD91]/40"
      />

      {/* Package label */}
      <div className="flex items-center gap-3">
        <span className="h-px w-7 bg-[#B89553]" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D6B779] sm:text-xs">
          Package
        </p>
      </div>

      {/* Package name */}
      <h3 className="mt-4 text-xl font-semibold leading-snug tracking-wide text-[#E5CD91] transition-colors duration-300 group-hover:text-white sm:text-2xl">
        {item.name}
      </h3>

      {/* Price */}
      <div className="mt-6 flex items-baseline gap-1 text-white">
        <span className="text-lg font-medium text-[#D6B779]">₱</span>
        <span className="text-3xl font-bold tracking-tight sm:text-4xl">
          {item.price.toLocaleString("en-PH")}
        </span>
      </div>

      <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#C0A08E]/45">
        Package investment
      </p>

      {/* Divider */}
      <div
        aria-hidden="true"
        className="mt-6 h-px w-full bg-gradient-to-r from-[#B89553]/50 via-[#D6B779]/20 to-transparent"
      />

      {/* Inclusions */}
      <div className="mt-5 flex-1">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C0A08E]/55">
          What's included
        </p>

        <ul className="space-y-3">
          {visible.map((inclusion) => (
            <li
              key={inclusion}
              className="flex items-start gap-3 text-sm leading-6 text-[#C0A08E]/80 transition-colors duration-300 group-hover:text-[#E5CD91]/90"
            >
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center border border-[#B89553]/30 bg-[#B89553]/10 text-[#E5CD91]">
                <FaCheck size={9} />
              </span>

              <span className="min-w-0 break-words">{inclusion}</span>
            </li>
          ))}

          {hiddenCount > 0 && (
            <li className="pl-8 text-xs font-semibold tracking-wide text-[#D6B779]">
              +{hiddenCount} more{" "}
              {hiddenCount === 1 ? "inclusion" : "inclusions"}
            </li>
          )}
        </ul>
      </div>

      {/* View details */}
      <div className="mt-7 flex items-center justify-between border-t border-[#D6B779]/20 pt-5">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#E5CD91] transition-colors duration-300 group-hover:text-white">
          View Full Details
        </span>

        <span className="flex h-9 w-9 items-center justify-center border border-[#B89553]/40 text-[#E5CD91] transition-all duration-300 group-hover:border-[#E5CD91] group-hover:bg-[#E5CD91] group-hover:text-[#031319]">
          <FaArrowRight
            aria-hidden="true"
            size={12}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>

      {/* Bottom accent */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#E5CD91] transition-all duration-500 group-hover:w-full"
      />
    </button>
  );
}