"use client";

import Image from "next/image";

import type { PersonalProfile } from "@/lib/profiles";

type Props = {
  profile: PersonalProfile;
};

export default function ResultsSection({
  profile,
}: Props) {
  const results =
    profile.dentistResults ?? [];

  if (!results.length) {
    return null;
  }

  return (
    <section
      id="results"
      className="scroll-mt-24 px-6 pt-24"
    >
      {/* HEADER */}

      <div className="mb-9">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#b68b4a]" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.32em] text-[#a97b38]">
            02 / Results
          </span>
        </div>

        <h2 className="mt-4 text-[28px] font-semibold leading-[1.12] tracking-[-0.045em] text-[#152b2f] dark:text-[#f4f0e8]">
          See the difference.
        </h2>

        <p className="mt-3 max-w-[320px] text-[11px] leading-[1.8] text-[#788384] dark:text-[#929e9f]">
          A glimpse of treatment outcomes.
          Individual results may vary depending
          on each patient's needs and treatment
          plan.
        </p>
      </div>

      {/* RESULTS */}

      <div className="space-y-12">
        {results.map(
          (result, index) => (
            <article
              key={`${result.before}-${index}`}
            >
              <div className="grid grid-cols-2 gap-2">
                {/* BEFORE */}

                <div className="overflow-hidden rounded-[14px] bg-[#e4e0d7] dark:bg-[#1b292b]">
                  <div className="relative aspect-[0.9]">
                    <Image
                      src={result.before}
                      alt="Before dental treatment"
                      fill
                      sizes="(max-width: 430px) 50vw, 215px"
                      className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                    />

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-3 pt-10">
                      <span className="text-[8px] font-semibold uppercase tracking-[0.22em] text-white">
                        Before
                      </span>
                    </div>
                  </div>
                </div>

                {/* AFTER */}

                <div className="overflow-hidden rounded-[14px] bg-[#e4e0d7] dark:bg-[#1b292b]">
                  <div className="relative aspect-[0.9]">
                    <Image
                      src={result.after}
                      alt="After dental treatment"
                      fill
                      sizes="(max-width: 430px) 50vw, 215px"
                      className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                    />

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-3 pt-10">
                      <span className="text-[8px] font-semibold uppercase tracking-[0.22em] text-white">
                        After
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {(result.title ||
                result.description) && (
                <div className="mt-6">
                  {result.title && (
                    <h3 className="text-[18px] font-semibold leading-tight tracking-[-0.025em] text-[#162b2f] dark:text-[#f4f0e8]">
                      {result.title}
                    </h3>
                  )}

                  {result.description && (
                    <p className="mt-2 max-w-[340px] text-[11px] leading-[1.8] text-[#758081] dark:text-[#919c9d]">
                      {result.description}
                    </p>
                  )}
                </div>
              )}
            </article>
          ),
        )}
      </div>
    </section>
  );
}