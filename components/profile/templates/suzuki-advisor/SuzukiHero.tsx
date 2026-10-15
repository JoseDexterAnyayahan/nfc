"use client";

import { useState } from "react";
import {
  FaCheck,
  FaDownload,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaShareAlt,
} from "react-icons/fa";
import type { BusinessProfile } from "@/lib/profiles";
import {
  suzukiContainerClass,
  suzukiPrimaryButtonClass,
  suzukiSecondaryButtonClass,
} from "./suzuki-styles";
import { FaUserPlus } from "react-icons/fa6";

type Props = {
  profile: BusinessProfile;
  onSaveContact: () => void;
};

function getInitials(name: string) {
  return name
    .replace(/[^A-Za-z\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 3)
    .join("")
    .toUpperCase();
}

export default function SuzukiHero({ profile, onSaveContact }: Props) {
  const [copied, setCopied] = useState(false);

  const name = profile.contactName || profile.businessName;
  const title = profile.contactTitle || "Service Advisor";
  const phone = profile.phone.replace(/[^\d+]/g, "");
  const hasMap = Boolean(profile.locationUrl);

  const shareProfile = async () => {
    const shareData = {
      title: name,
      text: `${name} — ${title} at Suzuki Auto Calapan`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Unable to share profile:", error);
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-[var(--suzuki-card)]">
      <style>{`
        @keyframes suzuki-rise {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: none; }
        }
        .suzuki-rise {
          animation: suzuki-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .suzuki-rise { animation: none !important; }
        }
      `}</style>

      {/* COVER BANNER */}
      <div className="relative h-52 w-full overflow-hidden sm:h-64 lg:h-80">
        {profile.banner ? (
          <img
            src={profile.banner}
            alt={`${profile.businessName} cover`}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, var(--suzuki-blue) 0%, #0b2a5b 100%)",
            }}
          />
        )}

        {/* Overlay: darkens the top for the brand bar, fades into the card */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,16,32,0.65) 0%, rgba(8,16,32,0.15) 45%, rgba(8,16,32,0.35) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Brand bar + share */}
        <div
          className={`${suzukiContainerClass} relative flex items-center justify-between gap-4 pt-5 sm:pt-7`}
        >
          <div className="flex items-center gap-2.5 rounded-full border border-white/25 bg-black/20 px-4 py-2 backdrop-blur-md">
            <span className="text-sm font-extrabold tracking-[0.14em] text-white sm:text-base">
              SUZUKI
            </span>
            <span className="h-4 w-1 rounded-full bg-[var(--suzuki-red)]" />
            <span className="text-[10px] font-medium tracking-[0.14em] text-white/80 sm:text-xs">
              AUTO CALAPAN
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              role="status"
              aria-live="polite"
              className={`rounded-full border border-white/30 bg-black/30 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md transition duration-300 ${
                copied
                  ? "translate-x-0 opacity-100"
                  : "pointer-events-none translate-x-2 opacity-0"
              }`}
            >
              {copied ? "Link copied" : ""}
            </span>

            <button
              type="button"
              onClick={shareProfile}
              aria-label="Share profile"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white shadow-lg backdrop-blur-md transition duration-300 hover:scale-105 hover:bg-white/20"
            >
              {copied ? <FaCheck /> : <FaShareAlt />}
            </button>
          </div>
        </div>
      </div>

      {/* PROFILE CONTENT */}
      <div className={`${suzukiContainerClass} relative pb-10 sm:pb-14`}>
        <div className="flex flex-col items-center md:flex-row md:items-end md:gap-10">
          {/* Avatar overlapping the banner */}
          <div className="suzuki-rise relative -mt-16 shrink-0 sm:-mt-20 md:-mt-24">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={name}
                className="h-[150px] w-[116px] rounded-2xl border-4 border-[var(--suzuki-card)] object-cover object-top shadow-xl sm:h-[180px] sm:w-[138px] md:h-[210px] md:w-[162px] md:rounded-3xl"
              />
            ) : (
              <div className="flex h-[150px] w-[116px] items-center justify-center rounded-2xl border-4 border-[var(--suzuki-card)] bg-[var(--suzuki-blue)] text-3xl font-bold tracking-tight text-white shadow-xl sm:h-[180px] sm:w-[138px] md:h-[210px] md:w-[162px] md:rounded-3xl md:text-4xl">
                {getInitials(name)}
              </div>
            )}

            <span className="absolute -bottom-1.5 -right-1.5 h-7 w-7 rounded-full border-4 border-[var(--suzuki-card)] bg-[var(--suzuki-blue)] sm:h-8 sm:w-8" />
          </div>

          {/* Name block */}
          <div
            className="suzuki-rise mt-5 text-center md:mb-2 md:mt-0 md:text-left"
            style={{ animationDelay: "0.08s" }}
          >
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-[var(--suzuki-text)] sm:text-4xl lg:text-5xl">
              {name}
            </h1>

            <p className="mt-2 text-lg font-semibold text-[var(--suzuki-blue)] sm:text-xl">
              {title}
            </p>

            <p className="mt-2 inline-flex items-center gap-2 text-sm text-[var(--suzuki-muted)]">
              <FaMapMarkerAlt className="text-xs text-[var(--suzuki-red)]" />
              {profile.location || "Suzuki Auto Calapan"}
            </p>
          </div>
        </div>

        {/* Bio + actions */}
        <div className="mt-8 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-12">
          <p
            className="suzuki-rise mx-auto max-w-xl text-center text-sm leading-7 text-[var(--suzuki-muted)] sm:text-base sm:leading-8 md:mx-0 md:text-left"
            style={{ animationDelay: "0.16s" }}
          >
            {profile.bio ||
              "Your direct contact for service inquiries, customer assistance, and connecting with Suzuki Auto Calapan."}
          </p>

          <div
            className="suzuki-rise mx-auto grid w-full max-w-md grid-cols-2 gap-2.5 md:mx-0 md:max-w-none"
            style={{ animationDelay: "0.24s" }}
          >
            <button
              type="button"
              onClick={onSaveContact}
              className={`${suzukiPrimaryButtonClass} col-span-2`}
            >
              <FaUserPlus />
              <span>Save Contact</span>
            </button>

            <a href={`tel:${phone}`} className={suzukiSecondaryButtonClass}>
              <FaPhoneAlt />
              <span>Call</span>
            </a>

            <a
              href={profile.locationUrl || "#"}
              target={hasMap ? "_blank" : undefined}
              rel={hasMap ? "noreferrer" : undefined}
              className={suzukiSecondaryButtonClass}
            >
              <FaMapMarkerAlt />
              <span>Directions</span>
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM DIVIDER: racing-style slanted stripes */}
      <div className="relative h-2.5 w-full overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[var(--suzuki-border)]" />
        <div
          className="absolute inset-y-0 left-0 w-[58%] bg-[var(--suzuki-blue)]"
          style={{
            clipPath: "polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)",
          }}
        />
        <div
          className="absolute inset-y-0 left-[58%] w-[12%] bg-[var(--suzuki-red)]"
          style={{
            clipPath: "polygon(14px 0, 100% 0, calc(100% - 14px) 100%, 0 100%)",
          }}
        />
      </div>
    </section>
  );
}
