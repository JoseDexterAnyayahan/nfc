
"use client";

import PixeeRetroBooth from "./PixeeRetroBooth";
import PixeeRedbox from "./PixeeRedbox";
import PixeeVogueBooth from "./PixeeVogueBooth";
import PixeeMagazineBooth from "./PixeeMagazineBooth";
import PixeeVideoGuestbook from "./PixeeVideoGuestbook";

export default function PixeePackages() {
  return (
    <section
      id="packages"
      className="scroll-mt-20 space-y-8 py-12 sm:space-y-10 sm:py-16"
    >
      {/* Section heading */}
      <div className="mx-auto max-w-xl px-4 text-center">
        <div className="mb-3 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#c9a45c]/50" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#d6b56d]">
            Made for your moments
          </p>
          <span className="h-px w-8 bg-[#c9a45c]/50" />
        </div>

        <h2 className="text-3xl font-semibold tracking-wide text-white sm:text-4xl">
          Photobooth Packages
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-white/50">
          Discover our photobooth experiences, thoughtfully prepared to make
          every celebration memorable.
        </p>
      </div>

      {/* Horizontal package carousel */}
      <div
        className="pixee-carousel flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto scroll-smooth px-4 pb-5 sm:gap-5"
        aria-label="Photobooth packages"
      >
        <div className="flex w-[82%] max-w-[320px] shrink-0 snap-start sm:w-[calc((100%-2.5rem)/3)] sm:max-w-none [&>*]:h-full [&>*]:w-full">
          <PixeeRetroBooth />
        </div>

        <div className="flex w-[82%] max-w-[320px] shrink-0 snap-start sm:w-[calc((100%-2.5rem)/3)] sm:max-w-none [&>*]:h-full [&>*]:w-full">
          <PixeeRedbox />
        </div>

        <div className="flex w-[82%] max-w-[320px] shrink-0 snap-start sm:w-[calc((100%-2.5rem)/3)] sm:max-w-none [&>*]:h-full [&>*]:w-full">
          <PixeeVogueBooth />
        </div>

        <div className="flex w-[82%] max-w-[320px] shrink-0 snap-start sm:w-[calc((100%-2.5rem)/3)] sm:max-w-none [&>*]:h-full [&>*]:w-full">
          <PixeeMagazineBooth />
        </div>

        <div className="flex w-[82%] max-w-[320px] shrink-0 snap-start sm:w-[calc((100%-2.5rem)/3)] sm:max-w-none [&>*]:h-full [&>*]:w-full">
          <PixeeVideoGuestbook />
        </div>
      </div>

      {/* Scroll hint */}
      <p className="px-5 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-white/35">
        Swipe or scroll to explore packages
      </p>
    </section>
  );
}
