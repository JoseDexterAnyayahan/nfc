"use client";

import type { PersonalProfile } from "@/lib/profiles";

import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
} from "../icons";

type Props = {
  profile: PersonalProfile;
};

export default function AppointmentSection({
  profile,
}: Props) {
  const appointmentHref =
    `mailto:${profile.email}?subject=${encodeURIComponent(
      "Appointment Request",
    )}`;

  return (
    <section
      id="contact"
      className="scroll-mt-24 px-6 pb-20 pt-24"
    >
      <div className="relative overflow-hidden rounded-[24px] bg-[#162b2f] px-6 py-8 text-white shadow-[0_20px_50px_rgba(22,43,47,0.18)]">
        {/* DECORATIVE CIRCLES */}

        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border border-[#c69b55]/15" />

        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border border-[#c69b55]/15" />

        <div className="pointer-events-none absolute bottom-[-80px] left-[-80px] h-44 w-44 rounded-full border border-white/5" />

        {/* CONTENT */}

        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="h-px w-7 bg-[#c69b55]" />

            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#d9b978]">
              Appointment
            </p>
          </div>

          <h2 className="mt-5 max-w-[290px] text-[31px] font-semibold leading-[1.08] tracking-[-0.045em]">
            Your smile deserves thoughtful care.
          </h2>

          <p className="mt-4 max-w-[285px] text-[11px] leading-[1.8] text-white/65">
            Ready to take the next step? Get in
            touch to discuss your dental needs
            and schedule a visit.
          </p>

          {/* DETAILS */}

          <div className="mt-7 space-y-3">
            {profile.location && (
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-[#c69b55]" />

                <span className="text-[10px] text-white/70">
                  {profile.location}
                </span>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Clock3 className="h-4 w-4 shrink-0 text-[#c69b55]" />

              <span className="text-[10px] text-white/70">
                Contact for available schedule
              </span>
            </div>
          </div>

          {/* CTA */}

          <a
            href={appointmentHref}
            className="mt-8 inline-flex w-full items-center justify-between rounded-[11px] bg-[#c69b55] px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.13em] text-white transition-all duration-200 hover:bg-[#d5aa68] active:scale-[0.99]"
          >
            <span className="flex items-center gap-3">
              <CalendarDays className="h-4 w-4" />

              Book an Appointment
            </span>

            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}