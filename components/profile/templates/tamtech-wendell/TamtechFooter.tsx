import Image from "next/image";
import { FaArrowUp, FaGlobe } from "react-icons/fa";
import type { BusinessProfile } from "@/lib/profiles";
import { tamtechContainerClass } from "./tamtech-styles";

type Props = {
  profile: BusinessProfile;
};

const COMPANY_NAME = "Tamaraw Technohub Inc.";
const DEFAULT_CONTACT = "Wendell Lozano";
const DEFAULT_TITLE = "Operations Manager";
const DEFAULT_WEBSITE = "https://tamtechhub.com/";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Location", href: "#location" },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0874E8] focus-visible:ring-offset-2";

export default function TamtechFooter({ profile }: Props) {
  const contactName = profile.contactName || DEFAULT_CONTACT;
  const contactTitle = profile.contactTitle || DEFAULT_TITLE;
  const website = profile.website || DEFAULT_WEBSITE;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white">
      {/* Brand accent, matches the hero */}
      <div aria-hidden="true" className="flex h-1 w-full overflow-hidden">
        <div className="w-1/2 bg-[#0874E8]" />
        <div className="w-1/2 bg-[#42CDA5]" />
      </div>

      <div className="border-t border-[var(--tamtech-border)] pb-[max(2rem,env(safe-area-inset-bottom))] pt-10">
        <div
          className={`${tamtechContainerClass} flex flex-col gap-8 md:flex-row md:items-start md:justify-between`}
        >
          {/* Identity */}
          <div className="flex min-w-0 items-center gap-4">
            {profile.logo ? (
              <Image
                src={profile.logo}
                alt={`${COMPANY_NAME} logo`}
                width={56}
                height={56}
                className="h-14 w-14 shrink-0 rounded-xl border border-[#E1EAF4] bg-white object-contain p-1.5"
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#0874E8]/10 text-sm font-extrabold text-[#0874E8]"
              >
                TT
              </span>
            )}

            <div className="min-w-0">
              <p className="text-base font-extrabold text-[#172B45]">
                {COMPANY_NAME}
              </p>
              <p className="mt-0.5 text-sm text-slate-600">
                {contactName}
                <span aria-hidden="true" className="px-1.5 text-slate-300">
                  ·
                </span>
                {contactTitle}
              </p>
            </div>
          </div>

          {/* Navigation and website */}
          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`rounded text-sm font-semibold text-slate-600 transition hover:text-[#0874E8] ${focusRing}`}
              >
                {link.label}
              </a>
            ))}

            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded text-sm font-semibold text-[#0874E8] transition hover:text-[#0558B5] ${focusRing}`}
            >
              <FaGlobe size={14} aria-hidden="true" />
              Company website
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </nav>
        </div>

        <div
          className={`${tamtechContainerClass} mt-8 flex flex-col-reverse items-center gap-4 border-t border-[#E1EAF4] pt-6 sm:flex-row sm:justify-between`}
        >
          <div className="flex flex-col items-center gap-1 text-center text-xs text-slate-500 sm:items-start sm:text-left">
            <p>
              &copy; {year} {COMPANY_NAME} All rights reserved.
            </p>
            <p>
              Digital business card powered by{" "}
              <a
                href="https://dextap.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded font-bold text-[#0874E8] hover:underline ${focusRing}`}
              >
                DexTap
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              .
            </p>
          </div>

          <a
            href="#top"
            className={`inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0874E8]/10 px-4 text-sm font-semibold text-[#0874E8] transition hover:bg-[#42CDA5]/20 active:scale-95 ${focusRing}`}
          >
            <FaArrowUp size={13} aria-hidden="true" />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}