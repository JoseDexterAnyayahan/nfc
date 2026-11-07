import type { BusinessProfile } from "@/lib/profiles";
import {
  FaArrowUp,
  FaCamera,
  FaEnvelope,
  FaLocationDot,
  FaPhone,
} from "react-icons/fa6";

import SocialLinks from "./SocialLinks";

type Props = {
  profile: BusinessProfile;
};

export default function Footer({ profile }: Props) {
  const phone = profile.phone?.trim() ?? "";
  const email = profile.email?.trim() ?? "";
  const location = profile.location?.trim() ?? "";

  const digits = phone.replace(/\D/g, "");

  const internationalPhone = digits.startsWith("0")
    ? `63${digits.slice(1)}`
    : digits;

  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="relative overflow-hidden bg-[#000000] px-5 pb-36 pt-16 md:px-10 md:pb-40 md:pt-20"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#B89553]/5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#56463A]/10 blur-3xl"
      />

      {/* Top gold accent */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B89553]/60 to-transparent"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Main footer */}
        <div className="grid gap-12 border-b border-[#C0A08E]/10 pb-12 md:grid-cols-[1.2fr_0.8fr] md:gap-16">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center gap-4 md:justify-start">

              <div>
                <h3 className="text-lg font-bold tracking-[0.16em] text-[#E5CD91] sm:text-xl">
                  {profile.businessName}
                </h3>

                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.35em] text-[#C0A08E]/50">
                  {profile.tagline || "PHOTO • VIDEO"}
                </p>
              </div>
            </div>

          </div>


        </div>



        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 pt-7 text-center md:flex-row md:text-left">
          <p className="text-[10px] leading-5 text-[#C0A08E]/30">
            © {currentYear} {profile.businessName}.
            <span className="hidden sm:inline"> All rights reserved.</span>
          </p>

          <a
            href="https://dextap.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#C0A08E]/30 transition hover:text-[#D6B779]"
          >
            <span>Powered by</span>

            <span className="font-semibold text-[#C0A08E]/50 transition group-hover:text-[#D6B779]">
              DexTap
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
