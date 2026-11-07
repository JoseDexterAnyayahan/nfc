"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  UserPlus,
  Phone,
  Mail,
  Share2,
  MapPin,
  Check,
  Loader2,
  BadgeCheck,
} from "lucide-react";
import { FaViber } from "react-icons/fa6";

import type { BusinessProfile } from "@/lib/profiles";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D5FD1] focus-visible:ring-offset-2";

// Boxy action buttons (square corners). The avatar stays round.
const actionBase =
  "flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-none border border-[#E3E8F0] bg-white px-3 py-3 text-sm font-semibold text-[#292929] transition hover:border-[#1D5FD1] hover:bg-[#F7F9FC] active:scale-[0.98]";

const disabledAction =
  "flex min-h-12 min-w-0 cursor-not-allowed items-center justify-center gap-2 rounded-none border border-[#E8EDF4] bg-[#F7F9FC] px-3 py-3 text-sm font-semibold text-[#292929] opacity-50";

const TAGLINE = "Serving the community with strength and stability";

export default function Hero({ profile }: { profile: BusinessProfile }) {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );

  const phone = profile.phone || "";
  const phoneHref = phone.replace(/[^\d+]/g, "");
  const email = profile.email || "";
  const avatarSrc = profile.avatar || "";
  const name = profile.contactName || profile.businessName;

  // Normalize Philippine mobile numbers for Viber.
  const digits = phone.replace(/\D/g, "");
  const normalizedDigits = digits.startsWith("00") ? digits.slice(2) : digits;

  const viberNumber = normalizedDigits.startsWith("63")
    ? normalizedDigits
    : normalizedDigits.startsWith("0")
      ? `63${normalizedDigits.slice(1)}`
      : normalizedDigits.length === 10 && normalizedDigits.startsWith("9")
        ? `63${normalizedDigits}`
        : "";

  const escapeVCard = (value: string) =>
    value
      .replace(/\\/g, "\\\\")
      .replace(/\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");

  const handleSave = () => {
    if (saving) return;

    try {
      setSaving(true);
      setSaveError(false);

      const vcard = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${escapeVCard(name)}`,
        `ORG:${escapeVCard(profile.businessName)}`,
        profile.contactTitle
          ? `TITLE:${escapeVCard(profile.contactTitle)}`
          : "",
        phone ? `TEL;TYPE=CELL:${escapeVCard(phone)}` : "",
        email ? `EMAIL;TYPE=INTERNET:${escapeVCard(email)}` : "",
        profile.location
          ? `ADR;TYPE=WORK:;;${escapeVCard(profile.location)};;;;`
          : "",
        profile.locationUrl ? `URL:${escapeVCard(profile.locationUrl)}` : "",
        "END:VCARD",
      ]
        .filter(Boolean)
        .join("\r\n");

      const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${name.trim().replace(/\s+/g, "-")}.vcf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.setTimeout(() => URL.revokeObjectURL(url), 1500);
    } catch (error) {
      console.error("Unable to save contact:", error);
      setSaveError(true);
    } finally {
      // Keep the busy state visible long enough to register as feedback.
      window.setTimeout(() => setSaving(false), 500);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: profile.businessName,
          text: [profile.contactName, profile.contactTitle]
            .filter(Boolean)
            .join(" | "),
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        if (copyTimer.current) clearTimeout(copyTimer.current);
        copyTimer.current = setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Unable to share:", error);
      }
    }
  };

  return (
    <section
      id="home"
      aria-labelledby="sbs-profile-name"
      className="relative mx-auto w-full overflow-hidden rounded-xl border border-[#E3E8F0] bg-white shadow-[0_18px_55px_rgba(0,0,0,0.07)]"
    >
      {/* COVER PHOTO: image only, no text on the banner */}
      <div className="relative aspect-[2114/744] w-full overflow-hidden bg-[#E6EBF2] lg:aspect-auto lg:h-[340px]">
        {profile.banner ? (
          <Image
            src={profile.banner}
            alt=""
            fill
            priority
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="object-cover object-center"
          />
        ) : (
          <div
            aria-hidden="true"
            className="h-full w-full bg-gradient-to-r from-[#171717] via-[#14264A] to-[#1D5FD1]"
          />
        )}
      </div>

      {/* PROFILE CONTENT */}
      <div className="relative px-5 pb-9 sm:px-9 sm:pb-11 lg:px-12">
        {/* AVATAR */}
        <div className="relative z-10 -mt-14 flex justify-center sm:-mt-[4.5rem]">
          <div className="relative h-28 w-28 shrink-0 rounded-full border-[5px] border-white bg-white shadow-[0_8px_30px_rgba(0,0,0,0.16)] sm:h-36 sm:w-36 lg:h-40 lg:w-40">
            <div className="relative h-full w-full overflow-hidden rounded-full bg-[#EEF2F8]">
              {avatarSrc && !imageFailed ? (
                <Image
                  key={avatarSrc}
                  src={avatarSrc}
                  alt={`${name} profile photo`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 144px, 160px"
                  className="object-cover object-center"
                  onError={() => setImageFailed(true)}
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="flex h-full w-full items-center justify-center bg-[#171717] text-4xl font-bold text-[#F9B90F] sm:text-5xl"
                >
                  {name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <span
              aria-hidden="true"
              className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-[3px] border-white bg-[#F9B90F] sm:bottom-2 sm:right-2"
            />
          </div>
        </div>

        {/* NAME AND POSITION */}
        <div className="mx-auto mt-5 max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0B4FA8] sm:text-xs">
            {profile.contactTitle || "General Manager"}
          </p>

          <h1
            id="sbs-profile-name"
            className="mt-2 truncate text-[clamp(1.1rem,5.4vw,2.25rem)] font-bold leading-tight tracking-tight text-[#171717]"
          >
            {profile.contactName}
          </h1>

          <div
            aria-hidden="true"
            className="mx-auto mt-4 h-[2px] w-12 bg-[#F9B90F]"
          />

          <p className="mx-auto mt-4 max-w-md text-balance text-sm font-medium italic leading-relaxed text-[#5B6575] sm:text-base">
            {TAGLINE}
          </p>

          {profile.location && (
            <a
              href={profile.locationUrl || "#contact"}
              target={profile.locationUrl ? "_blank" : undefined}
              rel={profile.locationUrl ? "noopener noreferrer" : undefined}
              className={`mt-4 inline-flex max-w-full items-start justify-center gap-2 rounded-sm text-sm font-medium text-[#5B6575] transition hover:text-[#0B4FA8] ${focusRing}`}
            >
              <MapPin
                size={16}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-[#1D5FD1]"
              />
              <span className="min-w-0 break-words text-left">
                {profile.location}
              </span>
              {profile.locationUrl && (
                <span className="sr-only">(opens in a new tab)</span>
              )}
            </a>
          )}
        </div>

        {/* BUSINESS IDENTITY */}
        <div className="mx-auto mt-7 flex max-w-2xl items-center gap-4 border border-[#E3E8F0] bg-[#F7F9FC] p-3 sm:gap-5 sm:p-4">
          {/* Logo box: the artwork has white side margins, so it is scaled up
              inside an overflow-hidden frame to fill the box. */}
          <div className="relative aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-none border border-[#E3E8F0] bg-white sm:h-28 sm:w-28">
            {profile.logo ? (
              <Image
                src={profile.logo}
                alt={`${profile.businessName} logo`}
                fill
                sizes="(max-width: 640px) 80px, 112px"
                className="scale-[1] object-contain"
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex h-full w-full items-center justify-center bg-[#171717] text-xl font-bold text-[#F9B90F]"
              >
                {profile.businessName.charAt(0)}
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0B4FA8] sm:text-xs">
              <BadgeCheck
                size={14}
                aria-hidden="true"
                className="shrink-0 text-[#1D5FD1]"
              />
              Official Business Profile
            </p>
            <h2 className="mt-1.5 text-base font-bold leading-snug text-[#171717] sm:text-lg">
              {profile.businessName}
            </h2>
            <p className="mt-0.5 text-xs text-[#5B6575] sm:text-sm">
              Professional Banking
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mx-auto mt-6 max-w-2xl">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className={`group flex min-h-14 w-full items-center justify-center gap-2 rounded-none border-b-4 border-[#F9B90F] bg-[#171717] px-5 py-4 text-sm font-semibold tracking-wide text-white shadow-md transition hover:bg-[#0B4FA8] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 ${focusRing}`}
          >
            {saving ? (
              <Loader2
                size={19}
                aria-hidden="true"
                className="animate-spin"
              />
            ) : (
              <UserPlus
                size={19}
                aria-hidden="true"
                className="text-[#F9B90F] transition-transform group-hover:scale-110"
              />
            )}
            {saving ? "Preparing Contact..." : "Save Contact"}
          </button>

          {saveError && (
            <p
              role="alert"
              className="mt-3 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              Unable to save contact. Please try again.
            </p>
          )}

          <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
            {phoneHref ? (
              <a href={`tel:${phoneHref}`} className={`${actionBase} ${focusRing}`}>
                <Phone
                  size={16}
                  aria-hidden="true"
                  className="shrink-0 text-[#1D5FD1]"
                />
                Call
              </a>
            ) : (
              <span aria-disabled="true" className={disabledAction}>
                <Phone size={16} aria-hidden="true" className="shrink-0 text-[#1D5FD1]" />
                Call
              </span>
            )}

            {email ? (
              <a href={`mailto:${email}`} className={`${actionBase} ${focusRing}`}>
                <Mail
                  size={16}
                  aria-hidden="true"
                  className="shrink-0 text-[#1D5FD1]"
                />
                Email
              </a>
            ) : (
              <span aria-disabled="true" className={disabledAction}>
                <Mail size={16} aria-hidden="true" className="shrink-0 text-[#1D5FD1]" />
                Email
              </span>
            )}

            {viberNumber ? (
              <a
                href={`viber://chat?number=%2B${viberNumber}`}
                className={`${actionBase} hover:border-[#7360bd] ${focusRing}`}
              >
                <FaViber
                  size={17}
                  aria-hidden="true"
                  className="shrink-0 text-[#7360bd]"
                />
                Viber
              </a>
            ) : (
              <span aria-disabled="true" className={disabledAction}>
                <FaViber size={17} aria-hidden="true" className="shrink-0 text-[#7360bd]" />
                Viber
              </span>
            )}

            <button
              type="button"
              onClick={handleShare}
              className={`${actionBase} ${focusRing}`}
            >
              {copied ? (
                <Check
                  size={16}
                  aria-hidden="true"
                  className="shrink-0 text-green-600"
                />
              ) : (
                <Share2
                  size={16}
                  aria-hidden="true"
                  className="shrink-0 text-[#1D5FD1]"
                />
              )}
              {copied ? "Copied" : "Share"}
            </button>
          </div>

          <p className="sr-only" role="status" aria-live="polite">
            {copied ? "Profile link copied to clipboard" : ""}
          </p>
        </div>

        {/* BOTTOM ACCENT */}
        <div
          aria-hidden="true"
          className="mx-auto mt-10 flex h-[3px] w-24 overflow-hidden"
        >
          <span className="w-1/3 bg-[#171717]" />
          <span className="w-1/3 bg-[#F9B90F]" />
          <span className="w-1/3 bg-[#1D5FD1]" />
        </div>
      </div>
    </section>
  );
}