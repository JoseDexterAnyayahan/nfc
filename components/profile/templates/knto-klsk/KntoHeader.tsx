
"use client";

import { useState } from "react";
import {
  FaAddressCard,
  FaEnvelope,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaShareAlt,
  FaCheck,
  FaCopy,
} from "react-icons/fa";

import type { BusinessProfile } from "@/lib/profiles";
import { kntoColors as c } from "./knto-styles";

type Props = {
  profile: BusinessProfile;
  onSaveContact: () => void;
};

const contactEmail = "kntoklsk@gmail.com";
const contactPhone = "0966 401 4224";
const contactAddress =
  "2nd Floor, Osmeña cor. Bonifacio St., Ilaya, Calapan City 5200, Calapan, Philippines, 5200";

const contactMapsUrl =
  "https://maps.app.goo.gl/Cbi8GqnQLy9FngaRA";

const profileUrl = "https://dextap.vercel.app/b/knto-klsk";

export default function KntoHeader({
  profile,
  onSaveContact,
}: Props) {
  const [bannerFailed, setBannerFailed] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [copied, setCopied] = useState(false);

  const mapsUrl = profile.locationUrl || contactMapsUrl;

  const actionBase =
    "group inline-flex min-h-12 min-w-0 items-center justify-center gap-2 border px-2.5 py-3 text-[10px] font-semibold uppercase transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] sm:min-h-[50px] sm:gap-2.5 sm:px-5 sm:tracking-[0.1em]";

  const secondaryActionStyle = {
    borderColor: c.line,
    color: c.ink,
    backgroundColor: c.paper,
  };

  const handleShare = async () => {
    const shareData = {
      title: profile.businessName || "KNTO KLSK",
      text: "DROP THE NEEDLE. SIP THE MOMENTS. Visit KNTO KLSK on DexTap.",
      url: profileUrl,
    };

    try {
      if (typeof navigator.share === "function") {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Sharing can be cancelled by the user.
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      // Fallback for browsers where native sharing or clipboard access fails.
      try {
        const textArea = document.createElement("textarea");
        textArea.value = profileUrl;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";

        document.body.appendChild(textArea);
        textArea.select();

        const successful = document.execCommand("copy");
        textArea.remove();

        if (successful) {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        }
      } catch {
        console.error("Unable to share or copy the KNTO KLSK link.");
      }
    }
  };

  return (
    <header
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: c.paper, color: c.ink }}
    >
      {/* HERO BANNER */}
      <div
        className="relative h-52 overflow-hidden sm:h-80 lg:h-[390px]"
        style={{ backgroundColor: c.espresso }}
      >
        {!bannerFailed && profile.banner ? (
          <img
            src={profile.banner}
            alt={`${profile.businessName} banner`}
            className="absolute inset-0 h-full w-full object-cover object-center"
            onError={() => setBannerFailed(true)}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background:
                "radial-gradient(ellipse at 50% 35%, #70533D 0%, #38271F 48%, #211B17 100%)",
            }}
          >
            <div
              className="select-none text-center font-black uppercase leading-none tracking-[-0.04em]"
              style={{ color: "rgba(244,235,221,0.09)" }}
              aria-hidden="true"
            >
              <p className="text-5xl sm:text-7xl lg:text-8xl">
                KNTO
              </p>
              <p className="my-3 text-[9px] tracking-[0.55em] sm:text-xs">
                THE LISTENING HOUSE
              </p>
              <p className="text-5xl sm:text-7xl lg:text-8xl">
                KLSK
              </p>
            </div>
          </div>
        )}

        {/* Vintage overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,15,12,0.30) 0%, rgba(20,15,12,0.04) 30%, rgba(20,15,12,0.18) 55%, rgba(20,15,12,0.78) 100%)",
          }}
        />

        {/* Inner frame */}
        <div
          className="pointer-events-none absolute inset-3 border sm:inset-5"
          style={{ borderColor: "rgba(244,235,221,0.20)" }}
        />

        {/* Top label */}
        <div className="absolute left-6 top-6 z-10 sm:left-10 sm:top-9">
          <span
            className="inline-flex items-center border px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm sm:text-[10px] sm:tracking-[0.22em]"
            style={{
              borderColor: "rgba(244,235,221,0.35)",
              backgroundColor: "rgba(33,27,23,0.38)",
              color: c.cream,
            }}
          >
            Coffee · Music · Moments
          </span>
        </div>

        {/* Banner tagline */}
        <div className="absolute bottom-7 right-7 z-10 max-w-[75%] text-right sm:bottom-10 sm:right-10">
          <p
            className="text-[9px] font-medium uppercase tracking-[0.16em] sm:text-xs sm:tracking-[0.24em]"
            style={{ color: "rgba(244,235,221,0.92)" }}
          >
            Drop the needle.
          </p>
          <p
            className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.16em] sm:text-xs sm:tracking-[0.24em]"
            style={{ color: "rgba(244,235,221,0.92)" }}
          >
            Sip the moments.
          </p>
        </div>
      </div>

      {/* BUSINESS IDENTITY */}
      <div
        className="relative"
        style={{ backgroundColor: c.paper, color: c.ink }}
      >
        <div className="mx-auto w-full max-w-5xl px-5 pb-7 sm:px-8 sm:pb-9 lg:px-10">
          {/* Logo and business name */}
          <div className="flex min-w-0 flex-col items-start sm:flex-row sm:items-end sm:gap-6">
            {/* Overlapping logo */}
            <div
              className="relative z-10 -mt-14 flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden border-[4px] shadow-xl sm:-mt-20 sm:h-36 sm:w-36 sm:border-[5px]"
              style={{
                borderColor: c.paper,
                backgroundColor: c.cream,
                boxShadow: "0 10px 30px rgba(33,27,23,0.18)",
              }}
            >
              {!logoFailed && profile.logo ? (
                <img
                  src={profile.logo}
                  alt={`${profile.businessName} logo`}
                  className="h-full w-full object-contain p-1.5 sm:p-2.5"
                  onError={() => setLogoFailed(true)}
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <span
                    className="font-extrabold tracking-[-0.10em]"
                    style={{
                      color: c.espresso,
                      fontSize: "clamp(1.5rem, 6vw, 2.5rem)",
                    }}
                  >
                    K·K
                  </span>
                  <span
                    className="mt-1 text-[7px] font-semibold uppercase tracking-[0.16em] sm:text-[9px] sm:tracking-[0.2em]"
                    style={{ color: c.wood }}
                  >
                    KNTO KLSK
                  </span>
                </div>
              )}
            </div>

            {/* Name and tagline */}
            <div className="mt-5 min-w-0 flex-1 sm:mt-0 sm:pb-1">
              <p
                className="text-[9px] font-semibold uppercase leading-relaxed tracking-[0.16em] sm:text-[10px] sm:tracking-[0.22em]"
                style={{ color: c.wood }}
              >
                Your neighborhood listening house
              </p>
              <h1 className="mt-2 break-words text-3xl font-semibold leading-[1.12] tracking-[-0.055em] sm:text-4xl lg:text-5xl">
                {profile.businessName}
              </h1>
              <p
                className="mt-3 max-w-xl text-[10px] font-medium leading-6 tracking-[0.09em] sm:text-xs sm:tracking-[0.12em] lg:text-sm"
                style={{ color: c.muted }}
              >
                {profile.tagline || "DROP THE NEEDLE. SIP THE MOMENTS."}
              </p>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="mt-7 grid grid-cols-10 gap-2 sm:mt-8 sm:flex sm:flex-wrap sm:gap-3">
            {/* Save Contact */}
            <button
              type="button"
              onClick={onSaveContact}
              className={`${actionBase} col-span-7 sm:min-w-[165px]`}
              style={{
                borderColor: c.espresso,
                backgroundColor: c.espresso,
                color: c.cream,
              }}
            >
              <FaAddressCard
                className="shrink-0 transition-transform duration-300 group-hover:scale-110"
                size={15}
              />
              <span className="truncate">Save Contact</span>
            </button>

            {/* Directions */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open KNTO KLSK directions"
              className={`${actionBase} col-span-3 gap-1 px-1 text-[9px] tracking-[-0.02em] sm:gap-2 sm:px-5 sm:text-[10px] sm:tracking-[0.1em]`}
              style={secondaryActionStyle}
            >
              <FaMapMarkerAlt className="shrink-0" size={13} />
              <span className="truncate">Directions</span>
              <FaExternalLinkAlt
                className="hidden shrink-0 sm:block"
                size={9}
              />
            </a>
          </div>

          {/* DIVIDER */}
          <div
            className="mt-7 h-px w-full sm:mt-8"
            style={{
              background: `linear-gradient(90deg, ${c.gold} 0%, ${c.line} 35%, ${c.line} 100%)`,
            }}
          />

          {/* CONTACT DETAILS */}
          <div className="mt-5 sm:mt-6">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p
                className="text-[9px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: c.wood }}
              >
                Visit &amp; get in touch
              </p>

              {/* Share profile link — far right */}
              <button
                type="button"
                onClick={handleShare}
                aria-label="Share KNTO KLSK profile"
                title={copied ? "Link copied!" : "Share profile"}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center border transition-all duration-200 hover:opacity-70 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  borderColor: c.line,
                  backgroundColor: c.paper,
                  color: c.wood,
                }}
              >
                {copied ? (
                  <FaCheck size={14} />
                ) : (
                  <FaShareAlt size={14} />
                )}
              </button>
            </div>

            {copied && (
              <p
                className="mb-3 text-right text-[10px] font-medium"
                role="status"
                style={{ color: c.wood }}
              >
                <FaCopy className="mr-1 inline" size={10} />
                Profile link copied
              </p>
            )}

            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3">
              {/* Email detail */}
              <a
                href={`mailto:${contactEmail}`}
                className="group flex min-w-0 items-start gap-3 border-b py-3 transition-colors sm:border-b-0 sm:py-2"
                style={{ borderColor: c.line }}
              >
                <span
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center"
                  style={{
                    backgroundColor: c.cream,
                    color: c.wood,
                  }}
                >
                  <FaEnvelope size={13} />
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className="block text-[8px] font-semibold uppercase tracking-[0.16em]"
                    style={{ color: c.muted }}
                  >
                    Email us
                  </span>
                  <span className="mt-1 block break-all text-xs leading-5 transition-colors group-hover:underline group-hover:underline-offset-4">
                    {contactEmail}
                  </span>
                </span>
              </a>

              {/* Phone detail */}
              <a
                href={`tel:${contactPhone.replace(/[^\d+]/g, "")}`}
                className="group flex min-w-0 items-start gap-3 border-b py-3 transition-colors sm:border-b-0 sm:py-2"
                style={{ borderColor: c.line }}
              >
                <span
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center"
                  style={{
                    backgroundColor: c.cream,
                    color: c.wood,
                  }}
                >
                  <FaPhone size={13} />
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className="block text-[8px] font-semibold uppercase tracking-[0.16em]"
                    style={{ color: c.muted }}
                  >
                    Call us
                  </span>
                  <span className="mt-1 block text-xs leading-5 transition-colors group-hover:underline group-hover:underline-offset-4">
                    {contactPhone}
                  </span>
                </span>
              </a>

              {/* Address detail */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-w-0 items-start gap-3 border-b py-3 transition-colors sm:col-span-2 sm:border-b-0 sm:py-3 lg:col-span-1"
                style={{ borderColor: c.line }}
              >
                <span
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center"
                  style={{
                    backgroundColor: c.cream,
                    color: c.wood,
                  }}
                >
                  <FaMapMarkerAlt size={14} />
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className="block text-[8px] font-semibold uppercase tracking-[0.16em]"
                    style={{ color: c.muted }}
                  >
                    Visit us
                  </span>
                  <span className="mt-1 block break-words text-xs leading-5 transition-colors group-hover:underline group-hover:underline-offset-4">
                    {contactAddress}
                  </span>
                  <span
                    className="mt-1.5 inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.1em]"
                    style={{ color: c.wood }}
                  >
                    Open map
                    <FaExternalLinkAlt size={8} />
                  </span>
                </span>
              </a>
            </div>
          </div>

          {/* BRAND SIGNATURE */}
          <div
            className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t pt-3"
            style={{ borderColor: c.line }}
          >
            <span
              className="text-[8px] font-medium uppercase tracking-[0.16em] sm:text-[9px] sm:tracking-[0.2em]"
              style={{ color: c.muted }}
            >
              Est. for good moments
            </span>
            <span
              className="text-[8px] font-medium uppercase tracking-[0.16em] sm:text-[9px] sm:tracking-[0.2em]"
              style={{ color: c.muted }}
            >
              Calapan City
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}