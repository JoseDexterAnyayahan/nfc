
"use client";

import { useState } from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import {
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa6";
import type {
  CalixCategory,
  CalixPackage,
} from "@/lib/packages/calix";
import PackageCard from "./PackageCard";
import PackageDialog from "./PackageDialog";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

type Props = {
  category: CalixCategory;
  profileId: string;
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5CD91] focus-visible:ring-offset-2 focus-visible:ring-offset-[#031319]";

const linkBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-none border px-4 text-sm font-medium transition duration-300";

export default function PackageCategory({
  category,
  profileId,
}: Props) {
  const [selectedPackage, setSelectedPackage] =
    useState<CalixPackage | null>(null);

  const groups = category.groups.filter(
    (group) => group.packages.length > 0,
  );

  const totalPackages = groups.reduce(
    (sum, group) => sum + group.packages.length,
    0,
  );

  return (
    <main
      className={`${poppins.className} min-h-screen bg-[#031319] px-5 pb-16 pt-8 text-[#C0A08E] sm:pt-10 md:px-10 md:pb-20 md:pt-12`}
    >
      <div className="mx-auto max-w-6xl">
        {/* Back button */}
        <Link
          href={`/b/${profileId}`}
          className={`${linkBase} border-[#D6B779]/30 text-[#E5CD91] hover:border-[#D6B779] hover:bg-[#262B28] ${focusRing}`}
        >
          <FaArrowLeft aria-hidden="true" size={12} />
          Back to Profile
        </Link>

        {/* Header */}
        <header className="mt-12 text-center sm:mt-14">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#B89553]" />

            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#D6B779]">
              CALIX FILMS AND PHOTOGRAPHY
            </p>

            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#B89553]" />
          </div>

          <h1 className="mx-auto max-w-3xl text-balance text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            {category.title}
          </h1>

          <div
            aria-hidden="true"
            className="mx-auto mt-6 flex items-center justify-center gap-2"
          >
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#B89553]" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#E5CD91]" />
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#B89553]" />
          </div>

          <p className="mt-5 text-sm text-[#C0A08E]/65 sm:text-base">
            Choose the package that suits your celebration. Explore the full
            inclusions and details of each option.
          </p>

          {totalPackages > 0 && (
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B779]">
              {totalPackages}{" "}
              {totalPackages === 1 ? "Package" : "Packages"} Available
            </p>
          )}
        </header>

        {/* Sticky category navigation */}
        {groups.length > 1 && (
          <nav
            aria-label={`${category.title} sections`}
            className="sticky top-0 z-30 -mx-5 mt-10 border-y border-[#D6B779]/20 bg-[#031319]/95 px-5 py-3 backdrop-blur-xl md:-mx-10 md:px-10"
          >
            <div className="relative">
              <div className="overflow-x-auto overscroll-x-contain [scrollbar-width:thin] [scrollbar-color:#B89553_transparent]">
                <ul className="mx-auto flex w-max min-w-full items-center gap-2 md:justify-center">
                  {groups.map((group) => (
                    <li key={group.id} className="shrink-0">
                      <a
                        href={`#group-${group.id}`}
                        className={`${linkBase} min-h-10 border-[#D6B779]/25 px-4 text-xs text-[#C0A08E] hover:border-[#E5CD91] hover:bg-[#B89553]/10 hover:text-[#E5CD91] ${focusRing}`}
                      >
                        {group.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile swipe hint */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-0 flex h-full items-center bg-gradient-to-l from-[#031319] via-[#031319]/90 to-transparent pl-8 pr-2 sm:hidden"
              >
                <FaArrowRight
                  size={12}
                  className="animate-pulse text-[#E5CD91]"
                />
              </div>
            </div>

            <p className="mt-2 text-center text-[9px] font-medium uppercase tracking-[0.2em] text-[#C0A08E]/40 sm:hidden">
              Swipe to see more categories
            </p>
          </nav>
        )}

        {/* Package groups */}
        <div className="mt-12 space-y-16 sm:mt-14 sm:space-y-20">
          {groups.map((group, index) => (
            <section
              key={group.id}
              id={`group-${group.id}`}
              aria-labelledby={`group-title-${group.id}`}
              className="scroll-mt-28"
            >
              {/* Group heading */}
              <div className="mb-7 flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-xs font-semibold tracking-[0.2em] text-[#E5CD91]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="h-px w-8 bg-[#B89553]/50" />
                  </div>

                  <h2
                    id={`group-title-${group.id}`}
                    className="text-xl font-bold tracking-tight text-white sm:text-2xl"
                  >
                    {group.title}
                  </h2>

                  <div
                    aria-hidden="true"
                    className="mt-3 h-1 w-14 bg-gradient-to-r from-[#B89553] to-[#E5CD91]"
                  />
                </div>

                <span className="shrink-0 pb-1 text-[10px] font-medium uppercase tracking-[0.15em] text-[#C0A08E]/50 sm:text-xs">
                  {group.packages.length}{" "}
                  {group.packages.length === 1 ? "Option" : "Options"}
                </span>
              </div>

              {/* Package cards */}
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.packages.map((item) => (
                  <li key={item.id} className="flex">
                    <PackageCard
                      item={item}
                      onSelect={setSelectedPackage}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Bottom navigation */}
        <div className="mt-20 flex flex-col items-center border-t border-[#D6B779]/15 pt-10">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-8 bg-[#B89553]/40" />
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#C0A08E]/40">
              Make your moments timeless
            </p>
            <span className="h-px w-8 bg-[#B89553]/40" />
          </div>

          <Link
            href={`/b/${profileId}`}
            className={`${linkBase} min-h-12 border-[#D6B779] bg-gradient-to-r from-[#B89553] to-[#E5CD91] px-6 font-semibold text-[#031319] hover:brightness-110 ${focusRing}`}
          >
            <FaArrowLeft aria-hidden="true" size={12} />
            Back to Profile
          </Link>
        </div>
      </div>

      {/* Package details dialog */}
      <PackageDialog
        item={selectedPackage}
        onClose={() => setSelectedPackage(null)}
      />
    </main>
  );
}
