"use client";

import Image from "next/image";

import type { PersonalProfile } from "@/lib/profiles";

import { Star } from "../icons";

type Props = {
  profile: PersonalProfile;
};

export default function TestimonialsSection({
  profile,
}: Props) {
  const testimonials =
    profile.testimonials ?? [];

  if (!testimonials.length) {
    return null;
  }

  return (
    <section
      id="reviews"
      className="scroll-mt-24 px-6 pt-24"
    >
      {/* HEADER */}

      <div className="mb-9">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#b68b4a]" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.32em] text-[#a97b38]">
            04 / Patient Stories
          </span>
        </div>

        <h2 className="mt-4 max-w-[320px] text-[28px] font-semibold leading-[1.12] tracking-[-0.045em] text-[#152b2f] dark:text-[#f4f0e8]">
          Trusted by patients.
        </h2>
      </div>

      {/* TESTIMONIALS */}

      <div className="space-y-10">
        {testimonials.map(
          (testimonial, index) => (
            <article
              key={`${testimonial.id}-${index}`}
              className="relative border-t border-[#d8d3c9] pt-7 dark:border-[#29393b]"
            >
              <span className="absolute -top-[7px] left-0 font-serif text-[42px] leading-none text-[#b58a45]">
                “
              </span>

              <p className="pl-7 font-medium text-[17px] leading-[1.6] tracking-[-0.02em] text-[#1a3034] dark:text-[#eeeae4]">
                {testimonial.message}
              </p>

              <div className="mt-7 flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  {testimonial.avatar ? (
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#dce5e1]">
                      <Image
                        src={
                          testimonial.avatar
                        }
                        alt={
                          testimonial.name
                        }
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#dce5e1] text-[13px] font-semibold text-[#162b2f] dark:bg-[#1d3032] dark:text-[#eeeae4]">
                      {testimonial.name
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-semibold text-[#172b2f] dark:text-[#eeeae4]">
                      {testimonial.name}
                    </p>

                    {testimonial.role && (
                      <p className="mt-0.5 text-[9px] text-[#7b8585] dark:text-[#899596]">
                        {testimonial.role}
                      </p>
                    )}
                  </div>
                </div>

                {testimonial.rating &&
                  testimonial.rating > 0 && (
                    <div className="flex shrink-0 gap-0.5">
                      {Array.from({
                        length: Math.min(
                          testimonial.rating,
                          5,
                        ),
                      }).map(
                        (_, starIndex) => (
                          <Star
                            key={
                              starIndex
                            }
                            className="h-3.5 w-3.5 fill-[#b58a45] text-[#b58a45]"
                          />
                        ),
                      )}
                    </div>
                  )}
              </div>
            </article>
          ),
        )}
      </div>
    </section>
  );
}