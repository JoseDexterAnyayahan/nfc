
import type { BusinessProfile } from "@/lib/profiles";
import {
  Building2,
  MapPin,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

export default function Footer({ profile }: { profile: BusinessProfile }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden border-t border-[#E8E8E8] bg-white">
      {/* Black and yellow accent */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-[#171717] via-[#F9B90F] to-[#171717]"
      />

      <div className="mx-auto max-w-6xl px-5 pb-32 pt-9 sm:px-8 sm:pb-28 sm:pt-11 lg:px-10 lg:pb-28">
        <div className="flex flex-col items-center justify-between gap-7 md:flex-row">
          {/* Business Information */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="mb-3 flex h-9 w-9 items-center justify-center border border-[#F9B90F]/50 bg-[#F9B90F]/10 text-[#171717]">
              <Building2 size={17} strokeWidth={1.8} />
            </div>

            <h3 className="text-sm font-bold tracking-tight text-[#171717] sm:text-base">
              {profile.businessName}
            </h3>

            {profile.contactName && (
              <p className="mt-1 text-xs text-[#77716A]">
                {profile.contactName}
                {profile.contactTitle ? ` · ${profile.contactTitle}` : ""}
              </p>
            )}

            {profile.location && (
              <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-[#929292] md:justify-start">
                <MapPin size={12} className="shrink-0 text-[#B88A00]" />
                <span>{profile.location}</span>
              </div>
            )}
          </div>

          {/* Minimal DexTap Branding */}
          <a
            href="https://dextap.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit DexTap website"
            className="group inline-flex items-center gap-1.5 border-b border-transparent pb-1 text-xs font-semibold text-[#777777] transition hover:border-[#F9B90F] hover:text-[#171717]"
          >
            Powered by{" "}
            <span className="font-extrabold tracking-wide text-[#F9B90F]">
              DexTap
            </span>
            <ArrowUpRight
              size={13}
              className="text-[#A0A0A0] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#F9B90F]"
            />
          </a>
        </div>

        {/* Divider */}
        <div className="my-7 h-px bg-[#EEEEEE]" />

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-2 text-[10px] text-[#929292]">
            <ShieldCheck size={13} className="shrink-0 text-[#B88A00]" />
            <span>
              © {year} {profile.businessName}. All rights reserved.
            </span>
          </div>

          <p className="text-[10px] tracking-wide text-[#999999]">
            Designed for meaningful connections.
          </p>
        </div>
      </div>
    </footer>
  );
}
