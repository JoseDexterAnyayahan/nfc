"use client";

import type {
  PersonalProfile,
  ProfileService,
} from "@/lib/profiles";

import { ArrowRight } from "../icons";

type Props = {
  profile: PersonalProfile;
};

export default function ServicesSection({
  profile,
}: Props) {
  const services: ProfileService[] =
    profile.services ?? [];

  if (!services.length) {
    return null;
  }

  return (
    <section
      id="services"
      className="scroll-mt-24 px-6 pt-24"
    >
      {/* HEADER */}

      <div className="mb-9">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#b68b4a]" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.32em] text-[#a97b38]">
            01 / Services
          </span>
        </div>

        <h2 className="mt-4 max-w-[330px] text-[28px] font-semibold leading-[1.12] tracking-[-0.045em] text-[#152b2f] dark:text-[#f4f0e8]">
          Care designed around your smile.
        </h2>

        <p className="mt-3 max-w-[320px] text-[11px] leading-[1.8] text-[#788384] dark:text-[#929e9f]">
          Personalized dental care focused on
          comfort, confidence, and long-term
          oral health.
        </p>
      </div>

      {/* SERVICE LIST */}

      <div className="border-t border-[#d8d3c9] dark:border-[#29393b]">
        {services.map(
          (service, index) => (
            <div
              key={`${service.name}-${index}`}
              className="group border-b border-[#d8d3c9] py-6 dark:border-[#29393b]"
            >
              <div className="flex items-start justify-between gap-5">
                <div className="flex min-w-0 gap-4">
                  <span className="pt-0.5 text-[9px] font-semibold tracking-[0.14em] text-[#b68b4a]">
                    {String(index + 1).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <div className="min-w-0">
                    <h3 className="text-[14px] font-semibold tracking-[-0.015em] text-[#182e32] dark:text-[#eeeae4]">
                      {service.name}
                    </h3>

                    {service.description && (
                      <p className="mt-2 max-w-[275px] text-[11px] leading-[1.75] text-[#758081] dark:text-[#919c9d]">
                        {service.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d6d0c5] transition-all duration-200 group-hover:border-[#b68b4a] group-hover:bg-[#b68b4a] dark:border-[#344547]">
                  <ArrowRight className="h-3.5 w-3.5 text-[#a87935] transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-white" />
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}