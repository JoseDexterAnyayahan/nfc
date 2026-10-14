"use client";

import { useState } from "react";
import {
  FaAddressCard,
  FaEnvelope,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";

import type { BusinessProfile } from "@/lib/profiles";
import { kntoColors as c } from "./knto-styles";

type Props = {
  profile: BusinessProfile;
  onSaveContact: () => void;
};

export default function KntoHeader({
  profile,
  onSaveContact,
}: Props) {
  const [bannerFailed, setBannerFailed] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  const mapsUrl =
    profile.locationUrl ||
    (profile.location
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          profile.location
        )}`
      : undefined);

  const actionBase =
    "group inline-flex min-h-12 min-w-0 items-center justify-center gap-2 border px-2.5 py-3 text-[10px] font-semibold uppercase transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] sm:min-h-[50px] sm:gap-2.5 sm:px-5 sm:tracking-[0.1em]";

  const secondaryActionStyle = {
    borderColor: c.line,
    color: c.ink,
    backgroundColor: c.paper,
  };

  return (
    <header
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: c.paper, color: c.ink }}
    >
      {/* =========================================
          HERO BANNER
      ========================================== */}
      <div
        className="relative h-52 overflow-hidden xs:h-60 sm:h-80 lg:h-[390px]"
        style={{ backgroundColor: c.espresso }}
      >
        {/* Actual banner image */}
        {!bannerFailed && profile.banner ? (
          <img
            src={profile.banner}
            alt={`${profile.businessName} banner`}
            className="absolute inset-0 h-full w-full object-cover object-center"
            onError={() => setBannerFailed(true)}
          />
        ) : (
          /* Fallback banner when no image is available */
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

        {/* Vintage cinematic overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,15,12,0.30) 0%, rgba(20,15,12,0.04) 30%, rgba(20,15,12,0.18) 55%, rgba(20,15,12,0.78) 100%)",
          }}
        />

        {/* Subtle inner frame */}
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

        {/* Tagline in the banner */}
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

      {/* =========================================
          BUSINESS IDENTITY
      ========================================== */}
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

            {/* Business name and tagline */}
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

          {/* =========================================
              RESPONSIVE QUICK ACTIONS

              Mobile:
              Save Contact = 70%
              Directions   = 30%

              Call and Email share the next row.
          ========================================== */}
          <div className="mt-7 grid grid-cols-10 gap-2 sm:mt-8 sm:flex sm:flex-wrap sm:gap-3">
            {/* Save Contact: 70% on mobile */}
            <button
              type="button"
              onClick={onSaveContact}
              className={`${actionBase} col-span-7 sm:col-span-auto sm:min-w-[165px]`}
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

            {/* Directions: 30% on mobile */}
            {mapsUrl && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open KNTO KLSK directions in Google Maps"
                className={`${actionBase} col-span-3 gap-1 px-1 text-[9px] tracking-[-0.02em] sm:col-span-auto sm:gap-2 sm:px-5 sm:text-[10px] sm:tracking-[0.1em]`}
                style={secondaryActionStyle}
              >
                <FaMapMarkerAlt
                  className="shrink-0"
                  size={13}
                />

                <span className="truncate">Directions</span>

                <FaExternalLinkAlt
                  className="hidden shrink-0 sm:block"
                  size={9}
                />
              </a>
            )}

            {/* Call */}
            {profile.phone && (
              <a
                href={`tel:${profile.phone.replace(/[^\d+]/g, "")}`}
                className={`${actionBase} col-span-5 sm:col-span-auto sm:min-w-[110px]`}
                style={secondaryActionStyle}
              >
                <FaPhone
                  className="shrink-0 transition-transform duration-300 group-hover:rotate-[-8deg]"
                  size={12}
                />
                <span>Call</span>
              </a>
            )}

            {/* Email */}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className={`${actionBase} col-span-5 sm:col-span-auto sm:min-w-[120px]`}
                style={secondaryActionStyle}
              >
                <FaEnvelope
                  className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
                  size={13}
                />
                <span>Email</span>
              </a>
            )}
          </div>

          {/* Decorative divider */}
          <div
            className="mt-7 h-px w-full sm:mt-8"
            style={{
              background: `linear-gradient(90deg, ${c.gold} 0%, ${c.line} 35%, ${c.line} 100%)`,
            }}
          />

          {/* Small brand signature */}
          <div className="mt-3 flex items-center justify-between gap-3">
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