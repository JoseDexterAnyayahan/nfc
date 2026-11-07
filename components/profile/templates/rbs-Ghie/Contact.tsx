"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Copy,
  Mail,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok, FaViber } from "react-icons/fa6";
import type { ReactNode } from "react";

import type { BusinessProfile } from "@/lib/profiles";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D5FD1] focus-visible:ring-offset-2";

const socialIcons: Record<string, ReactNode> = {
  facebook: <FaFacebookF size={16} aria-hidden="true" />,
  instagram: <FaInstagram size={18} aria-hidden="true" />,
  tiktok: <FaTiktok size={16} aria-hidden="true" />,
};

const socialLabels: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
};

// True platform colors.
const socialStyles: Record<string, string> = {
  facebook: "bg-[#1877F2] hover:bg-[#166FE5]",

  instagram:
    "bg-[linear-gradient(45deg,#F9CE34_0%,#F77737_25%,#E1306C_50%,#C13584_75%,#833AB4_100%)]",

  tiktok: "bg-[#010101] hover:shadow-[3px_3px_0_#FE2C55,-3px_-3px_0_#25F4EE]",
};

const fallbackSocialStyle = "bg-[#171717] hover:bg-[#333333]";

// Normalize Philippine mobile numbers for Viber.
function toViberNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.startsWith("00") ? digits.slice(2) : digits;

  if (normalized.startsWith("63")) return normalized;

  if (normalized.startsWith("0")) {
    return `63${normalized.slice(1)}`;
  }

  if (normalized.length === 10 && normalized.startsWith("9")) {
    return `63${normalized}`;
  }

  return "";
}

export default function Contact({ profile }: { profile: BusinessProfile }) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);

      if (timer.current) clearTimeout(timer.current);

      timer.current = setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      // Clipboard can be blocked on non-HTTPS pages; links still work.
    }
  };

  const phone = profile.phone?.trim() ?? "";
  const phoneHref = phone.replace(/[^\d+]/g, "");
  const email = profile.email?.trim() ?? "";
  const location = profile.location?.trim() ?? "";
  const viberNumber = toViberNumber(phone);

  const encodedLocation = encodeURIComponent(location);

  const mapEmbedUrl = location
    ? `https://maps.google.com/maps?q=${encodedLocation}&output=embed`
    : "";

  // Prefer the saved Maps link; otherwise open directions to the address.
  const mapUrl =
    profile.locationUrl ||
    `https://www.google.com/maps/dir/?api=1&destination=${encodedLocation}`;

  const socials = (profile.socials ?? []).filter((social) => social.url);

  const rowBase =
    "flex min-w-0 items-stretch border border-[#E3E8F0] bg-white shadow-[0_3px_12px_rgba(15,35,65,0.04)] transition hover:border-[#1D5FD1]";

  const rowLink = `group flex min-w-0 flex-1 items-center gap-3 p-3 sm:gap-4 sm:p-4 ${focusRing}`;

  const iconBox =
    "flex h-10 w-10 shrink-0 items-center justify-center bg-[#EEF3FA] text-[#0B4FA8] transition group-hover:bg-[#171717] group-hover:text-[#F9B90F] sm:h-11 sm:w-11";

  const copyButton = (key: string, value: string, label: string) => (
    <button
      type="button"
      onClick={() => copy(key, value)}
      aria-label={copiedKey === key ? `${label} copied` : `Copy ${label}`}
      className={`flex w-11 shrink-0 items-center justify-center border-l border-[#E3E8F0] text-[#5B6575] transition hover:bg-[#F7F9FC] hover:text-[#0B4FA8] sm:w-12 ${focusRing}`}
    >
      {copiedKey === key ? (
        <Check size={16} aria-hidden="true" className="text-[#1D5FD1]" />
      ) : (
        <Copy size={16} aria-hidden="true" />
      )}
    </button>
  );

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-10 w-full min-w-0"
    >
      {/* HEADING */}
      <div className="mb-8 text-center">
        <div className="mb-3 flex items-center justify-center gap-3">
          <span aria-hidden="true" className="h-[2px] w-8 bg-[#F9B90F]" />

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0B4FA8]">
            Stay Connected
          </p>

          <span aria-hidden="true" className="h-[2px] w-8 bg-[#F9B90F]" />
        </div>

        <h2
          id="contact-heading"
          className="text-balance text-3xl font-bold text-[#171717] sm:text-4xl"
        >
          Connect with Ma&apos;am Ghie
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#5B6575] sm:text-base">
          Reach out through her available contact channels and social media
          accounts.
        </p>
      </div>

      {/* CONTACT AND MAP GRID */}
      <div
        className={`grid w-full min-w-0 grid-cols-1 items-start gap-5 sm:gap-6 ${
          location
            ? "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-stretch"
            : ""
        }`}
      >
        {/* CONTACT CHANNELS */}
        <div className="flex min-w-0 flex-col gap-3">
          {phone && (
            <div className={rowBase}>
              <a href={`tel:${phoneHref}`} className={rowLink}>
                <span aria-hidden="true" className={iconBox}>
                  <Phone size={19} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#5B6575]">
                    Call
                  </span>

                  <span className="mt-0.5 block break-words text-sm font-bold text-[#171717] sm:text-base">
                    {phone}
                  </span>
                </span>

                <ChevronRight
                  size={18}
                  aria-hidden="true"
                  className="shrink-0 text-[#C4CCD8] transition group-hover:translate-x-0.5 group-hover:text-[#1D5FD1]"
                />
              </a>

              {copyButton("phone", phone, "phone number")}
            </div>
          )}

          {email && (
            <div className={rowBase}>
              <a href={`mailto:${email}`} className={rowLink}>
                <span aria-hidden="true" className={iconBox}>
                  <Mail size={19} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#5B6575]">
                    Email
                  </span>

                  <span className="mt-0.5 block break-all text-sm font-bold text-[#171717] sm:text-base">
                    {email}
                  </span>
                </span>

                <ChevronRight
                  size={18}
                  aria-hidden="true"
                  className="shrink-0 text-[#C4CCD8] transition group-hover:translate-x-0.5 group-hover:text-[#1D5FD1]"
                />
              </a>

              {copyButton("email", email, "email address")}
            </div>
          )}

          {viberNumber && (
            <div className={`${rowBase} hover:border-[#7360bd]`}>
              <a
                href={`viber://chat?number=%2B${viberNumber}`}
                className={rowLink}
              >
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#7360bd]/10 text-[#7360bd] sm:h-11 sm:w-11"
                >
                  <FaViber size={20} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#5B6575]">
                    Viber
                  </span>

                  <span className="mt-0.5 block text-sm font-bold text-[#171717] sm:text-base">
                    Message on Viber
                  </span>
                </span>

                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="shrink-0 text-[#C4CCD8] transition group-hover:text-[#7360bd]"
                />
              </a>
            </div>
          )}

          {/* SOCIAL MEDIA */}
          {socials.length > 0 && (
            <div className="mt-1 border border-[#E3E8F0] bg-[#F7F9FC] p-3 sm:p-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#5B6575]">
                Follow on Social Media
              </p>

              <ul className="flex flex-wrap gap-2.5">
                {socials.map((social) => {
                  const label =
                    socialLabels[social.platform] || social.platform;

                  return (
                    <li key={`${social.platform}-${social.url}`}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label} (opens in a new tab)`}
                        title={label}
                        className={`flex h-12 min-w-12 items-center justify-center gap-2 px-4 text-sm font-semibold capitalize text-white shadow-sm transition hover:-translate-y-0.5 hover:brightness-110 active:scale-95 ${
                          socialStyles[social.platform] ?? fallbackSocialStyle
                        } ${focusRing}`}
                      >
                        {socialIcons[social.platform]}

                        <span className="hidden sm:inline">{label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* MAP */}
        {location && (
          <div className="flex min-w-0 w-full flex-col overflow-hidden border border-[#E3E8F0] bg-white shadow-[0_5px_18px_rgba(15,35,65,0.05)]">
            {/* MAP HEADER */}
            <div className="flex min-w-0 items-center justify-between gap-3 border-b border-[#E3E8F0] px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0B4FA8]">
                  Find Us Here
                </p>

                <h3 className="mt-1 break-words text-sm font-bold text-[#171717] sm:text-base">
                  {profile.businessName}
                </h3>
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#EEF3FA] text-[#1D5FD1]">
                <MapPin size={19} />
              </div>
            </div>

            {/* EMBEDDED MAP */}
            <div className="relative h-[260px] w-full shrink-0 overflow-hidden bg-[#EEF3FA] min-[480px]:h-[300px] sm:h-[340px] lg:h-[380px] xl:h-[420px]">
              <iframe
                title={`Map showing ${profile.businessName}`}
                src={mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 block h-full w-full border-0"
              />
            </div>

            {/* MAP ADDRESS AND ACTIONS */}
            <div className="flex min-w-0 flex-col gap-3 border-t border-[#E3E8F0] border-b-4 border-b-[#F9B90F] p-3 sm:p-4">
              <div className="flex min-w-0 items-start gap-3">
                <MapPin
                  size={18}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[#1D5FD1]"
                />

                <p className="min-w-0 break-words text-sm font-semibold leading-6 text-[#171717]">
                  {location}
                </p>
              </div>

              <div className="flex w-full gap-2">
                <button
                  type="button"
                  onClick={() => copy("location", location)}
                  aria-label={
                    copiedKey === "location" ? "Address copied" : "Copy address"
                  }
                  className={`flex h-12 w-12 shrink-0 items-center justify-center border border-[#E3E8F0] bg-white text-[#5B6575] transition hover:border-[#1D5FD1] hover:text-[#0B4FA8] ${focusRing}`}
                >
                  {copiedKey === "location" ? (
                    <Check
                      size={16}
                      aria-hidden="true"
                      className="text-[#1D5FD1]"
                    />
                  ) : (
                    <Copy size={16} aria-hidden="true" />
                  )}
                </button>

                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex min-h-12 min-w-0 flex-1 items-center justify-center gap-2 border border-[#171717] bg-[#171717] px-3 text-center text-xs font-bold text-white transition hover:border-[#0B4FA8] hover:bg-[#0B4FA8] sm:px-5 sm:text-sm ${focusRing}`}
                >
                  <Navigation
                    size={16}
                    aria-hidden="true"
                    className="shrink-0 text-[#F9B90F]"
                  />

                  <span>Get Directions</span>

                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ACCESSIBLE COPY FEEDBACK */}
      <p className="sr-only" role="status" aria-live="polite">
        {copiedKey ? "Copied to clipboard" : ""}
      </p>
    </section>
  );
}
