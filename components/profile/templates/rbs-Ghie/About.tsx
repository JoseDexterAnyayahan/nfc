import Image from "next/image";
import {
  ArrowUpRight,
  BadgeCheck,
  Handshake,
  Landmark,
  MapPin,
  ShieldCheck,
  Users,
  UserRound,
} from "lucide-react";

import type { BusinessProfile } from "@/lib/profiles";

const TAGLINE = "Serving the community with strength and stability";

// Three values taken straight from the tagline.
const pillars = [
  {
    label: "Strength",
    text: "Sound, dependable banking",
    icon: ShieldCheck,
  },
  {
    label: "Stability",
    text: "Steady support you can rely on",
    icon: BadgeCheck,
  },
  {
    label: "Community",
    text: "Rooted in the people we serve",
    icon: Users,
  },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D5FD1] focus-visible:ring-offset-2";

export default function About({ profile }: { profile: BusinessProfile }) {
  const name = profile.contactName || "Management Representative";
  const title = profile.contactTitle || "General Manager";

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-10"
    >
      <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
        {/* VISUAL / BANK IDENTITY */}
        <div className="relative">
          <div className="relative flex h-full flex-col overflow-hidden border border-[#E3E8F0] bg-white shadow-[0_16px_45px_rgba(15,35,65,0.08)]">
            {/* Image */}
            <div className="relative min-h-[320px] flex-1 overflow-hidden bg-[#000000] sm:min-h-[420px]">
              {profile.logo ? (
                <Image
                  src={profile.logo}
                  alt=""
                  fill
                 sizes="(max-width: 640px) 80px, 112px"
                className="scale-[1] object-contain"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-br from-[#14264A] via-[#0B4FA8] to-[#171717]"
                />
              )}

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#101D35]/95 via-[#101D35]/35 to-transparent"
              />

              {/* Bank identity overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-9">
                <div
                  aria-hidden="true"
                  className="mb-5 flex h-14 w-14 items-center justify-center border border-white/25 bg-white/10 text-[#F9B90F] backdrop-blur-sm"
                >
                  <Landmark size={27} strokeWidth={1.7} />
                </div>

                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F9B90F] sm:text-xs">
                  Community Banking
                </p>

                <h3 className="mt-3 max-w-md text-balance text-2xl font-bold leading-tight sm:text-3xl">
                  {profile.businessName}
                </h3>

                <div
                  aria-hidden="true"
                  className="mt-4 h-[3px] w-14 bg-[#F9B90F]"
                />

                <p className="mt-4 max-w-sm text-sm font-medium leading-relaxed text-white/85 sm:text-base">
                  {TAGLINE}
                </p>
              </div>
            </div>

            {/* Values strip, taken from the tagline */}
            <ul className="grid grid-cols-1 divide-y divide-[#E3E8F0] border-t border-[#E3E8F0] bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;

                return (
                  <li key={pillar.label} className="flex items-start gap-3 p-4 sm:flex-col sm:gap-2 sm:p-5">
                    <Icon
                      size={20}
                      strokeWidth={1.8}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-[#1D5FD1]"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0B4FA8]">
                        {pillar.label}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-[#5B6575]">
                        {pillar.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Decorative accent */}
          <div
            aria-hidden="true"
            className="absolute -bottom-3 -right-3 -z-10 h-24 w-24 border-b-[3px] border-r-[3px] border-[#F9B90F]"
          />
        </div>

        {/* CONTENT */}
        <div className="relative flex flex-col justify-center">
          <div className="mb-5 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-[2px] w-9 bg-[#F9B90F]"
            />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0B4FA8]">
              About the Bank
            </p>
          </div>

          <h2
            id="about-heading"
            className="max-w-xl text-balance text-3xl font-bold leading-[1.2] tracking-tight text-[#171717] sm:text-4xl lg:text-[2.65rem]"
          >
            Banking Rooted in the{" "}
            <span className="text-[#0B4FA8]">Community</span>
          </h2>

          <div
            aria-hidden="true"
            className="my-6 h-[3px] w-14 bg-[#F9B90F]"
          />

          <p className="text-base leading-8 text-[#5B6575]">
            {profile.bio ||
              `${profile.businessName} is committed to serving the community with strength and stability, offering professional banking with a personal connection. Every customer is treated as a neighbor, and every relationship is built on trust.`}
          </p>

          {/* HIGHLIGHTS */}
          <ul className="mt-8 space-y-3">
            <li className="flex items-start gap-4 border border-[#E3E8F0] bg-white p-4 shadow-[0_5px_18px_rgba(15,35,65,0.035)] transition hover:border-[#1D5FD1] sm:p-5">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#EEF3FA] text-[#0B4FA8]"
              >
                <UserRound size={22} strokeWidth={1.8} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0B4FA8]">
                  Leadership
                </p>
                <p className="mt-1 text-base font-bold text-[#171717]">
                  {name}
                </p>
                <p className="mt-0.5 text-sm text-[#5B6575]">{title}</p>
              </div>
            </li>

            {profile.location && (
              <li className="flex items-start gap-4 border border-[#E3E8F0] bg-white p-4 shadow-[0_5px_18px_rgba(15,35,65,0.035)] transition hover:border-[#1D5FD1] sm:p-5">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#EEF3FA] text-[#0B4FA8]"
                >
                  <MapPin size={22} strokeWidth={1.8} />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0B4FA8]">
                    Where We Serve
                  </p>
                  <p className="mt-1 break-words text-base font-bold text-[#171717]">
                    {profile.location}
                  </p>
                </div>
              </li>
            )}

            <li className="flex items-start gap-4 border border-[#E3E8F0] bg-white p-4 shadow-[0_5px_18px_rgba(15,35,65,0.035)] transition hover:border-[#1D5FD1] sm:p-5">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#EEF3FA] text-[#0B4FA8]"
              >
                <Handshake size={22} strokeWidth={1.8} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0B4FA8]">
                  Our Promise
                </p>
                <p className="mt-1 text-base font-bold text-[#171717]">
                  Professional Banking. Personal Connection.
                </p>
              </div>
            </li>
          </ul>

          {/* LINK */}
          <a
            href="#contact"
            className={`group mt-8 inline-flex min-h-12 w-full items-center justify-center gap-3 self-start rounded-none border border-[#171717] bg-[#171717] px-6 py-3 text-sm font-semibold text-white transition hover:border-[#0B4FA8] hover:bg-[#0B4FA8] sm:w-auto ${focusRing}`}
          >
            Connect With Me
            <ArrowUpRight
              size={17}
              aria-hidden="true"
              className="text-[#F9B90F] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}