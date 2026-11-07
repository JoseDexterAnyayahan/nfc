
"use client";

import Image from "next/image";
import { ArrowUpRight, Camera } from "lucide-react";
import type { BusinessProfile } from "@/lib/profiles";

const featuredMoments = [
  {
    id: 1,
    category: "Community",
    title: "Scam Awareness Run 2026",
    description:
      "Promoting scam awareness and financial resilience through community involvement.",
    image: "/profiles/business/rbs-ghie/moments/scam-awareness.jpg",
    url: "https://www.facebook.com/share/p/1CVvDjuGLT/",
  },
  {
    id: 2,
    category: "Digital Banking",
    title: "Smarter Banking Services",
    description:
      "Taking another step toward more convenient and improved banking services.",
    image: "/profiles/business/rbs-ghie/moments/atm.jpg",
    url: "https://www.facebook.com/share/p/1EjBnxp6xA/",
  },
  {
    id: 3,
    category: "Loans & Financing",
    title: "Drive Home Your Dream",
    description:
      "Explore flexible auto, motorcycle, business, and agricultural financing options.",
    image: "/profiles/business/rbs-ghie/moments/car.jpg",
    url: "https://www.facebook.com/share/p/1Edi45baJe/",
  },
];

export default function Featured({
  profile,
}: {
  profile: BusinessProfile;
}) {
  return (
    <section className="w-full">
      {/* Section Heading */}
      <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-[2px] w-7 bg-[#F9B90F]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B4FA8]">
              {profile.businessName}
            </span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-[#171717] sm:text-3xl">
            Featured Moments
          </h2>

          <p className="mt-2 max-w-lg text-xs leading-relaxed text-[#77716A] sm:text-sm">
            A glimpse of our initiatives, services, and commitment to the
            community.
          </p>
        </div>

        <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0B4FA8] text-white sm:flex">
          <Camera size={19} />
        </div>
      </div>

      {/* Equal-sized Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredMoments.map((moment) => (
          <a
            key={moment.id}
            href={moment.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${moment.title} on Facebook`}
            className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#E7EAF0] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#0B4FA8]/30 hover:shadow-xl"
          >
            {/* Fixed Image Ratio */}
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-[#EEF2F7]">
              <Image
                src={moment.image}
                alt={moment.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

              <span className="absolute bottom-4 left-4 rounded-full bg-[#F9B90F] px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-[#171717]">
                {moment.category}
              </span>

              <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#0B4FA8] shadow-sm transition-colors group-hover:bg-[#F9B90F] group-hover:text-[#171717]">
                <ArrowUpRight size={17} />
              </div>
            </div>

            {/* Uniform Text Area */}
            <div className="flex flex-1 flex-col p-5 sm:p-5">
              <h3 className="line-clamp-1 min-h-[1.5rem] text-base font-bold text-[#171717] transition-colors group-hover:text-[#0B4FA8]">
                {moment.title}
              </h3>

              <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-xs leading-5 text-[#77716A]">
                {moment.description}
              </p>

              <div className="mt-auto flex items-center justify-between border-t border-[#EEF0F3] pt-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#0B4FA8]">
                  View on Facebook
                </span>

                <ArrowUpRight
                  size={15}
                  className="text-[#0B4FA8] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
