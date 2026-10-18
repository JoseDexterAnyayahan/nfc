"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FaArrowDown,
  FaArrowRight,
  FaEnvelope,
  FaGlobe,
  FaPhoneAlt,
  FaShareAlt,
} from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import type { BusinessProfile } from "@/lib/profiles";
import { tamtechContainerClass } from "./tamtech-styles";

type Props = {
  profile: BusinessProfile;
  onSaveContact: () => void | Promise<void>;
  onShare: () => void | Promise<void>;
};

const COMPANY_NAME = "Tamaraw Technohub Inc.";
const DEFAULT_TITLE = "Operations Manager";
const DEFAULT_WEBSITE = "https://tamtechhub.com/";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0874E8] focus-visible:ring-offset-2";

const actionBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition active:scale-[0.98] disabled:pointer-events-none sm:px-5";

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function getHost(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
}

export default function TamtechHero({
  profile,
  onSaveContact,
  onShare,
}: Props) {
  const [busy, setBusy] = useState<"save" | "share" | null>(null);

  const phone = profile.phone?.replace(/[^\d+]/g, "") ?? "";
  const email = profile.email?.trim() ?? "";

  const name = profile.contactName || profile.businessName;
  const title = profile.contactTitle || DEFAULT_TITLE;
  const website = profile.website || DEFAULT_WEBSITE;
  const websiteHost = getHost(website);

  // Prevents double taps and gives the button a short "working" state.
  const run = async (
    key: "save" | "share",
    handler: () => void | Promise<void>,
  ) => {
    if (busy) return;
    setBusy(key);
    try {
      await handler();
    } finally {
      setBusy(null);
    }
  };

  return (
    <section
      id="top"
      aria-labelledby="profile-name"
      className="relative w-full min-w-0 overflow-hidden bg-white"
    >
      {/* Cover banner */}
      <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-[#0874E8] via-[#0874E8] to-[#42CDA5] sm:h-56 lg:h-72">
        {profile.banner ? (
          <Image
            src={profile.banner}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : (
          <>
            <div
              aria-hidden="true"
              className="absolute -right-12 -top-20 h-64 w-64 rounded-full border-[28px] border-white/10 sm:h-80 sm:w-80"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-28 left-[18%] h-64 w-64 rounded-full bg-white/10 blur-3xl"
            />
          </>
        )}

        {/* Bottom fade keeps the banner label readable on any image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#10243B]/55 via-transparent to-black/10"
        />
      </div>

      {/* Profile identity */}
      <div className={`${tamtechContainerClass} pb-8 sm:pb-10`}>
        <div className="flex min-w-0 flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          {/* Avatar + name. The avatar overlaps the banner; the text starts
              below it so it never collides with the cover image. */}
          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:gap-6">
            <div className="relative -mt-14 h-28 w-28 shrink-0 rounded-3xl border-4 border-white bg-white shadow-xl sm:-mt-20 sm:h-36 sm:w-36">
              <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-[#F0F7FF]">
                {profile.avatar ? (
                  <Image
                    src={profile.avatar}
                    alt={`${name} profile photo`}
                    fill
                    priority
                    sizes="(max-width: 640px) 112px, 144px"
                    className="object-cover object-center"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0874E8]/10 to-[#42CDA5]/20 text-3xl font-extrabold text-[#0874E8] sm:text-4xl"
                  >
                    {getInitials(name)}
                  </div>
                )}
              </div>

              {/* Company logo badge */}
              <span
                title={COMPANY_NAME}
                className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border-2 border-white bg-white shadow-md sm:h-11 sm:w-11"
              >
                {profile.logo ? (
                  <Image
                    src={profile.logo}
                    alt={`${COMPANY_NAME} logo`}
                    width={44}
                    height={44}
                    className="h-full w-full object-contain p-1"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="text-xs font-extrabold text-[#0874E8]"
                  >
                    TT
                  </span>
                )}
              </span>
            </div>

            <div className="min-w-0 sm:pt-4">
              <h1
                id="profile-name"
                className="break-words text-3xl font-extrabold leading-tight tracking-tight text-[#172B45] sm:text-4xl lg:text-5xl"
              >
                {name}
              </h1>

              <p className="mt-1.5 text-base font-semibold text-[#0874E8] sm:text-lg">
                {title}
              </p>

              <p className="mt-1 text-sm text-slate-600 sm:text-base">
                {COMPANY_NAME}
              </p>

            
            </div>
          </div>

          {/* Actions. Mobile: Save Contact full width, three equal buttons below.
              Desktop: a single row aligned to the right of the identity block. */}
          <div className="grid min-w-0 grid-cols-3 gap-2.5 sm:flex sm:flex-wrap sm:gap-3 lg:shrink-0 lg:flex-nowrap lg:pt-4">
            <button
              type="button"
              onClick={() => run("save", onSaveContact)}
              disabled={busy !== null}
              className={`${actionBase} col-span-3 bg-[#0874E8] text-white shadow-md shadow-blue-600/20 hover:bg-[#0558B5] disabled:opacity-70 ${focusRing}`}
            >
              <FaUserPlus size={15} aria-hidden="true" />
              {busy === "save" ? "Saving…" : "Save Contact"}
            </button>

            {phone ? (
              <a
                href={`tel:${phone}`}
                className={`${actionBase} border border-[#E1EAF4] bg-white text-[#172B45] hover:border-[#0874E8] hover:bg-[#F6FAFF] ${focusRing}`}
              >
                <FaPhoneAlt
                  size={14}
                  aria-hidden="true"
                  className="text-[#0874E8]"
                />
                Call
              </a>
            ) : (
              <span
                aria-disabled="true"
                className={`${actionBase} cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400`}
              >
                <FaPhoneAlt size={14} aria-hidden="true" />
                Call
              </span>
            )}

            {email ? (
              <a
                href={`mailto:${email}`}
                className={`${actionBase} border border-[#E1EAF4] bg-white text-[#172B45] hover:border-[#42CDA5] hover:bg-[#42CDA5]/10 ${focusRing}`}
              >
                <FaEnvelope
                  size={14}
                  aria-hidden="true"
                  className="text-[#25AF87]"
                />
                Email
              </a>
            ) : (
              <span
                aria-disabled="true"
                className={`${actionBase} cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400`}
              >
                <FaEnvelope size={14} aria-hidden="true" />
                Email
              </span>
            )}

            <button
              type="button"
              onClick={() => run("share", onShare)}
              disabled={busy !== null}
              className={`${actionBase} border border-[#E1EAF4] bg-white text-[#172B45] hover:border-[#0874E8] hover:bg-[#F6FAFF] disabled:opacity-70 ${focusRing}`}
            >
              <FaShareAlt
                size={13}
                aria-hidden="true"
                className="text-[#0874E8]"
              />
              <span className="sm:hidden">Share</span>
              <span className="hidden sm:inline">Share Profile</span>
            </button>
          </div>
        </div>

        {/* Scroll cue */}
        <a
          href="#contact"
          className={`mt-7 inline-flex items-center gap-2 rounded-md text-sm font-semibold text-slate-500 transition hover:text-[#0874E8] ${focusRing}`}
        >
          Explore contact options
          <FaArrowDown
            size={11}
            aria-hidden="true"
            className="text-[#42CDA5]"
          />
        </a>
      </div>

      {/* Brand accent */}
      <div aria-hidden="true" className="flex h-1 w-full overflow-hidden">
        <div className="w-1/2 bg-[#0874E8]" />
        <div className="w-1/2 bg-[#42CDA5]" />
      </div>
    </section>
  );
}