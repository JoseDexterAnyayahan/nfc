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

const actionBase =
  "flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-none border border-[#E3E8F0] bg-white px-3 py-3 text-sm font-semibold text-[#292929] transition hover:border-[#1D5FD1] hover:bg-[#F7F9FC] active:scale-[0.98]";

const disabledAction =
  "flex min-h-12 min-w-0 cursor-not-allowed items-center justify-center gap-2 rounded-none border border-[#E8EDF4] bg-[#F7F9FC] px-3 py-3 text-sm font-semibold text-[#292929] opacity-50";

const TAGLINE = "Serving the community with strength and stability";

function escapeVCard(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r\n|\n|\r/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function getNameParts(name: string) {
  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return {
      firstName: parts[0],
      lastName: "",
    };
  }

  return {
    firstName: parts.slice(0, -1).join(" "),
    lastName: parts[parts.length - 1],
  };
}

async function getAvatarPhoto(avatar?: string) {
  if (!avatar) return null;

  try {
    const response = await fetch(avatar, {
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error("Unable to fetch profile photo.");
    }

    const blob = await response.blob();
    const mimeType = blob.type.toLowerCase();

    if (mimeType !== "image/jpeg" && mimeType !== "image/png") {
      console.warn(
        "Profile photo must be JPEG or PNG to embed in vCard.",
      );

      return null;
    }

    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result;

        if (typeof result !== "string") {
          reject(new Error("Unable to read profile photo."));
          return;
        }

        resolve(result.split(",")[1] ?? "");
      };

      reader.onerror = () => {
        reject(new Error("Unable to read profile photo."));
      };

      reader.readAsDataURL(blob);
    });

    if (!base64) return null;

    return {
      base64,
      type: mimeType === "image/png" ? "PNG" : "JPEG",
    };
  } catch (error) {
    console.error("Unable to include profile photo:", error);
    return null;
  }
}

export default function Hero({
  profile,
}: {
  profile: BusinessProfile;
}) {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
      if (saveTimer.current) clearTimeout(saveTimer.current);
    },
    [],
  );

  const phone = profile.phone?.trim() || "";
  const phoneHref = phone.replace(/[^\d+]/g, "");
  const email = profile.email?.trim() || "";
  const avatarSrc = profile.avatar || "";
  const name = profile.contactName?.trim() || profile.businessName;

  // Normalize Philippine mobile numbers for Viber.
  const digits = phone.replace(/\D/g, "");

  const normalizedDigits = digits.startsWith("00")
    ? digits.slice(2)
    : digits;

  const viberNumber = normalizedDigits.startsWith("63")
    ? normalizedDigits
    : normalizedDigits.startsWith("0")
      ? `63${normalizedDigits.slice(1)}`
      : normalizedDigits.length === 10 &&
          normalizedDigits.startsWith("9")
        ? `63${normalizedDigits}`
        : "";

  const handleSave = async () => {
    if (saving) return;

    setSaving(true);
    setSaved(false);
    setSaveError(false);

    try {
      const fullName = name.trim() || "Contact";
      const { firstName, lastName } = getNameParts(fullName);

      const businessName = profile.businessName?.trim() || "";
      const title = profile.contactTitle?.trim() || "";
      const location = profile.location?.trim() || "";
      const locationUrl = profile.locationUrl?.trim() || "";

      // Fetch the same avatar displayed in the profile.
      const photo = await getAvatarPhoto(profile.avatar);

      const lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${escapeVCard(lastName)};${escapeVCard(firstName)};;;`,
        `FN:${escapeVCard(fullName)}`,
      ];

      if (businessName) {
        lines.push(`ORG:${escapeVCard(businessName)}`);
      }

      if (title) {
        lines.push(`TITLE:${escapeVCard(title)}`);
      }

      if (phone) {
        lines.push(
          `TEL;TYPE=CELL,VOICE:${escapeVCard(phone)}`,
        );
      }

      if (email) {
        lines.push(
          `EMAIL;TYPE=INTERNET:${escapeVCard(email)}`,
        );
      }

      if (location) {
        lines.push(
          `ADR;TYPE=WORK:;;${escapeVCard(location)};;;;`,
        );
      }

      // Include the map/location link.
      if (locationUrl) {
        lines.push(`URL:${escapeVCard(locationUrl)}`);
      }

      // Include all available social media links.
      (profile.socials ?? []).forEach((social) => {
        const socialUrl = social.url?.trim();

        if (!socialUrl) return;

        lines.push(`URL:${escapeVCard(socialUrl)}`);
      });

      // Embed the actual profile avatar, not the business logo or banner.
      if (photo) {
        lines.push(
          `PHOTO;ENCODING=b;TYPE=${photo.type}:${photo.base64}`,
        );
      }

      lines.push("END:VCARD");

      const vcard = lines.join("\r\n") + "\r\n";

      const blob = new Blob([vcard], {
        type: "text/vcard;charset=utf-8",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      const safeFilename = fullName
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
        .trim()
        .replace(/\s+/g, "-");

      link.href = url;
      link.download = `${safeFilename || "Contact"}.vcf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 2000);

      setSaved(true);

      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
      }

      saveTimer.current = setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (error) {
      console.error("Unable to save contact:", error);
      setSaveError(true);
    } finally {
      setSaving(false);
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

        if (copyTimer.current) {
          clearTimeout(copyTimer.current);
        }

        copyTimer.current = setTimeout(() => {
          setCopied(false);
        }, 2000);
      }
    } catch (error) {
      if (
        error instanceof Error &&
        error.name !== "AbortError"
      ) {
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
      {/* COVER PHOTO */}
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

            {/* GREEN ONLINE INDICATOR */}
            <span
              aria-label="Online"
              title="Online"
              className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-[3px] border-white bg-[#22C55E] shadow-[0_0_0_2px_rgba(34,197,94,0.15)] sm:bottom-2 sm:right-2"
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
              target={
                profile.locationUrl ? "_blank" : undefined
              }
              rel={
                profile.locationUrl
                  ? "noopener noreferrer"
                  : undefined
              }
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
                <span className="sr-only">
                  (opens in a new tab)
                </span>
              )}
            </a>
          )}
        </div>

        {/* BUSINESS IDENTITY */}
        <div className="mx-auto mt-7 flex max-w-2xl items-center gap-4 border border-[#E3E8F0] bg-[#F7F9FC] p-3 sm:gap-5 sm:p-4">
          {/* ROUND BUSINESS LOGO */}
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-white bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] sm:h-28 sm:w-28">
            {profile.logo ? (
              <Image
                src={profile.logo}
                alt={`${profile.businessName} logo`}
                fill
                sizes="(max-width: 640px) 80px, 112px"
                className="scale-110 object-contain p-1"
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
            ) : saved ? (
              <Check
                size={19}
                aria-hidden="true"
                className="text-[#22C55E]"
              />
            ) : (
              <UserPlus
                size={19}
                aria-hidden="true"
                className="text-[#F9B90F] transition-transform group-hover:scale-110"
              />
            )}

            {saving
              ? "Preparing Contact..."
              : saved
                ? "Contact Downloaded"
                : "Save Contact"}
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
              <a
                href={`tel:${phoneHref}`}
                className={`${actionBase} ${focusRing}`}
              >
                <Phone
                  size={16}
                  aria-hidden="true"
                  className="shrink-0 text-[#1D5FD1]"
                />
                Call
              </a>
            ) : (
              <span
                aria-disabled="true"
                className={disabledAction}
              >
                <Phone
                  size={16}
                  aria-hidden="true"
                  className="shrink-0 text-[#1D5FD1]"
                />
                Call
              </span>
            )}

            {email ? (
              <a
                href={`mailto:${email}`}
                className={`${actionBase} ${focusRing}`}
              >
                <Mail
                  size={16}
                  aria-hidden="true"
                  className="shrink-0 text-[#1D5FD1]"
                />
                Email
              </a>
            ) : (
              <span
                aria-disabled="true"
                className={disabledAction}
              >
                <Mail
                  size={16}
                  aria-hidden="true"
                  className="shrink-0 text-[#1D5FD1]"
                />
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
              <span
                aria-disabled="true"
                className={disabledAction}
              >
                <FaViber
                  size={17}
                  aria-hidden="true"
                  className="shrink-0 text-[#7360bd]"
                />
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

          <p
            className="sr-only"
            role="status"
            aria-live="polite"
          >
            {copied
              ? "Profile link copied to clipboard"
              : ""}
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