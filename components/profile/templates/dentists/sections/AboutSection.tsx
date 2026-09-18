"use client";

import Image from "next/image";

import type { PersonalProfile } from "@/lib/profiles";

import {
  ShieldCheck,
  Sparkles,
} from "../icons";

type Props = {
  profile: PersonalProfile;
};

export default function AboutSection({
  profile,
}: Props) {
  const credentials =
    profile.dentistCredentials ?? [];

  return (
    <section
      id="about"
      className="scroll-mt-24 px-6 pt-24"
    >
      {/* HEADER */}

      <div className="mb-9">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#b68b4a]" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.32em] text-[#a97b38]">
            03 / About
          </span>
        </div>

        <h2 className="mt-4 text-[28px] font-semibold leading-[1.12] tracking-[-0.045em] text-[#152b2f] dark:text-[#f4f0e8]">
          Meet your dentist.
        </h2>
      </div>

      {/* PROFILE */}

      <div className="grid grid-cols-[118px_1fr] items-start gap-6">
        <div className="relative">
          <div className="relative aspect-square overflow-hidden rounded-full bg-[#dce5e1] ring-1 ring-[#d4cec3] dark:bg-[#1c2c2e] dark:ring-[#304143]">
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              sizes="118px"
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#f6f3ed] bg-[#162b2f] text-white dark:border-[#0d1517]">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
        </div>

        <div>
          <h3 className="text-[20px] font-semibold leading-[1.15] tracking-[-0.03em] text-[#162b2f] dark:text-[#f4f0e8]">
            {profile.name}
          </h3>

          {profile.title && (
            <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#a87935]">
              {profile.title}
            </p>
          )}

          {profile.company && (
            <p className="mt-2 text-[10px] text-[#788384] dark:text-[#919c9d]">
              {profile.company}
            </p>
          )}

          {profile.bio && (
            <p className="mt-4 text-[11px] leading-[1.8] text-[#707c7d] dark:text-[#929d9e]">
              {profile.bio}
            </p>
          )}
        </div>
      </div>

      {/* CREDENTIALS */}

      {credentials.length > 0 && (
        <div className="mt-10 border-t border-[#d8d3c9] dark:border-[#29393b]">
          {credentials.map(
            (credential, index) => (
              <div
                key={`${credential.title}-${index}`}
                className="flex items-center gap-4 border-b border-[#d8d3c9] py-5 dark:border-[#29393b]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#162b2f] text-white dark:bg-[#b58a45]">
                  {index === 0 ? (
                    <Sparkles className="h-3.5 w-3.5" />
                  ) : (
                    <ShieldCheck className="h-3.5 w-3.5" />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#162b2f] dark:text-[#eeeae4]">
                    {credential.title}
                  </p>

                  {credential.institution && (
                    <p className="mt-1 text-[10px] leading-relaxed text-[#788384] dark:text-[#919c9d]">
                      {credential.institution}
                    </p>
                  )}
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </section>
  );
}