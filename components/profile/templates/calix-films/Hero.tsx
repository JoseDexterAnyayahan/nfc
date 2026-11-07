
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { BusinessProfile } from "@/lib/profiles";
import {
  FaAddressCard,
  FaCheck,
  FaEnvelope,
  FaLocationDot,
  FaPhone,
  FaShareNodes,
} from "react-icons/fa6";
import SocialLinks from "./SocialLinks";
import { UserPlus } from "lucide-react";

type Props = {
  profile: BusinessProfile;
};

const DEFAULT_TAGLINE = "PHOTO • VIDEO";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5CD91] focus-visible:ring-offset-2 focus-visible:ring-offset-[#031319]";

const actionBase =
  "inline-flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-none border px-2 text-xs font-semibold tracking-wide transition-all duration-300 active:scale-[0.98] sm:px-4 sm:text-sm";

const primaryAction = `${actionBase} border-[#E5CD91] bg-gradient-to-r from-[#E5CD91] to-[#D6B779] text-[#031319] shadow-lg shadow-[#B89553]/10 hover:from-[#F0DDA8] hover:to-[#E5CD91]`;

const secondaryAction = `${actionBase} border-[#D6B779]/40 bg-[#031319]/40 text-[#E5CD91] hover:border-[#E5CD91] hover:bg-[#D6B779]/10`;

const disabledAction = `${actionBase} cursor-not-allowed border-[#D6B779]/15 bg-transparent text-[#C0A08E]/30`;

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function escapeVCard(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r\n|\r|\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

// Converts an image Blob into Base64 for the vCard PHOTO field.
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== "string") {
        reject(new Error("Unable to read profile photo."));
        return;
      }

      const base64 = result.split(",")[1];

      if (!base64) {
        reject(new Error("Unable to encode profile photo."));
        return;
      }

      resolve(base64);
    };

    reader.onerror = () => {
      reject(new Error("Unable to read profile photo."));
    };

    reader.readAsDataURL(blob);
  });
}

// vCard lines must be folded at 75 UTF-8 bytes.
function foldVCardLine(line: string) {
  const characters = Array.from(line);
  const result: string[] = [];

  let currentLine = "";
  let byteLength = 0;

  for (const character of characters) {
    const characterBytes = new TextEncoder().encode(character).length;

    if (byteLength + characterBytes > 75) {
      result.push(currentLine);
      currentLine = ` ${character}`;
      byteLength = 1 + characterBytes;
    } else {
      currentLine += character;
      byteLength += characterBytes;
    }
  }

  if (currentLine) {
    result.push(currentLine);
  }

  return result.join("\r\n");
}

// Ensures the exported photo uses a widely supported JPEG or PNG format.
async function prepareContactPhoto(blob: Blob) {
  const mimeType = blob.type.toLowerCase();

  if (mimeType === "image/jpeg") {
    return {
      blob,
      type: "JPEG",
    };
  }

  if (mimeType === "image/png") {
    return {
      blob,
      type: "PNG",
    };
  }

  // Convert other image formats, such as WebP, to JPEG.
  const bitmap = await createImageBitmap(blob);

  try {
    const canvas = document.createElement("canvas");

    canvas.width = bitmap.width;
    canvas.height = bitmap.height;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Unable to process profile photo.");
    }

    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0);

    const jpegBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (result) {
            resolve(result);
          } else {
            reject(new Error("Unable to convert profile photo."));
          }
        },
        "image/jpeg",
        0.92,
      );
    });

    return {
      blob: jpegBlob,
      type: "JPEG",
    };
  } finally {
    bitmap.close();
  }
}

export default function Hero({ profile }: Props) {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimer.current) {
        clearTimeout(copyTimer.current);
      }
    };
  }, []);

  const displayName =
    profile.contactName?.trim() || profile.businessName;

  const phone = profile.phone?.trim() ?? "";
  const phoneDigits = phone.replace(/\D/g, "");

  const internationalPhone = phoneDigits
    ? phoneDigits.startsWith("0")
      ? `63${phoneDigits.slice(1)}`
      : phoneDigits
    : "";

  const phoneHref = internationalPhone
    ? `+${internationalPhone}`
    : "";

  const email = profile.email?.trim() ?? "";
  const location = profile.location?.trim() ?? "";
  const bannerSrc = profile.banner;

  const saveContact = async () => {
    if (saving) return;

    setSaving(true);

    try {
      if (!profile.avatar) {
        throw new Error("No profile avatar is available to save.");
      }

      // Fetch the actual avatar image, not the logo or cover banner.
      const photoResponse = await fetch(profile.avatar, {
        cache: "force-cache",
      });

      if (!photoResponse.ok) {
        throw new Error("Unable to download the profile photo.");
      }

      const originalPhoto = await photoResponse.blob();

      if (!originalPhoto.type.startsWith("image/")) {
        throw new Error("The profile avatar is not a valid image.");
      }

      // Prepare the image for contact-app compatibility.
      const photo = await prepareContactPhoto(originalPhoto);
      const photoBase64 = await blobToBase64(photo.blob);

      const vCardLines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${escapeVCard(displayName)}`,
        `ORG:${escapeVCard(profile.businessName)}`,
        profile.tagline
          ? `TITLE:${escapeVCard(profile.tagline)}`
          : "",
        phoneHref ? `TEL;TYPE=CELL:${phoneHref}` : "",
        email ? `EMAIL;TYPE=WORK:${escapeVCard(email)}` : "",
        location
          ? `ADR;TYPE=WORK:;;${escapeVCard(location)};;;;`
          : "",
        `URL:${escapeVCard(window.location.href)}`,
        `PHOTO;ENCODING=b;TYPE=${photo.type}:${photoBase64}`,
        "END:VCARD",
      ].filter(Boolean);

      // Fold long lines according to the vCard specification.
      const vCard = vCardLines
        .map(foldVCardLine)
        .join("\r\n") + "\r\n";

      const contactBlob = new Blob([vCard], {
        type: "text/vcard;charset=utf-8",
      });

      const downloadUrl = URL.createObjectURL(contactBlob);
      const link = document.createElement("a");

      const fileName = profile.businessName
        .replace(/[^a-z0-9]/gi, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase();

      link.href = downloadUrl;
      link.download = `${fileName || "contact"}.vcf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.setTimeout(() => {
        URL.revokeObjectURL(downloadUrl);
      }, 1500);
    } catch (error) {
      console.error("Unable to save contact:", error);

      window.alert(
        error instanceof Error
          ? error.message
          : "Unable to create the contact file. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const shareProfile = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: profile.businessName,
          text: profile.tagline || profile.businessName,
          url,
        });

        return;
      }

      await navigator.clipboard.writeText(url);

      setCopied(true);

      if (copyTimer.current) {
        clearTimeout(copyTimer.current);
      }

      copyTimer.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Unable to share profile:", error);
      }
    }
  };

  return (
    <section
      id="top"
      aria-labelledby="profile-name"
      className="relative w-full min-w-0 overflow-hidden bg-[#031319]"
    >
      {/* Cover banner */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-[#262B28] via-[#031319] to-[#031319] sm:h-60 md:h-72 lg:h-[360px] xl:h-[420px]">
        {bannerSrc && (
          <Image
            src={bannerSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#031319] via-[#031319]/35 to-[#031319]/10"
        />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#B89553]/60 to-transparent"
        />
      </div>

      {/* Profile identity */}
      <div className="relative mx-auto w-full max-w-6xl px-5 pb-12 sm:px-6 sm:pb-16">
        <div className="flex min-w-0 flex-col gap-7 lg:gap-8">
          {/* Avatar and business information */}
          <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:gap-7 lg:gap-9">
            <div className="relative -mt-14 h-28 w-28 shrink-0 sm:-mt-16 sm:h-36 sm:w-36 lg:-mt-20 lg:h-44 lg:w-44">
              <div className="relative h-full w-full overflow-hidden border-4 border-[#031319] bg-[#262B28] shadow-2xl shadow-black/40">
                {profile.avatar ? (
                  <Image
                    src={profile.avatar}
                    alt={displayName}
                    fill
                    priority
                    sizes="(max-width: 640px) 112px, (max-width: 1024px) 144px, 176px"
                    className="object-cover object-center"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex h-full w-full items-center justify-center text-3xl font-bold tracking-widest text-[#E5CD91] sm:text-4xl"
                  >
                    {getInitials(displayName)}
                  </span>
                )}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 border border-[#E5CD91]/30"
                />
              </div>

              {/* Business logo badge */}
              {profile.logo && (
                <span
                  title={`${profile.businessName} logo`}
                  className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center overflow-hidden border-2 border-[#031319] bg-[#262B28] shadow-lg sm:h-11 sm:w-11 lg:h-12 lg:w-12"
                >
                  <Image
                    src={profile.logo}
                    alt={`${profile.businessName} logo`}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 border border-[#E5CD91]/40"
                  />
                </span>
              )}
            </div>

            <div className="min-w-0 sm:pt-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D6B779] sm:text-xs">
                {profile.tagline || DEFAULT_TAGLINE}
              </p>

              <h1
                id="profile-name"
                className="mt-2 max-w-3xl break-words text-2xl font-bold leading-tight tracking-wide text-white min-[400px]:text-3xl sm:text-4xl lg:text-5xl"
              >
                {profile.businessName}
              </h1>

              {profile.contactName && (
                <p className="mt-3 text-sm font-medium tracking-wide text-[#E5CD91]/80 sm:text-base">
                  {profile.contactName}
                </p>
              )}

              {location && (
                <p className="mt-3 flex items-start gap-2 text-xs text-[#C0A08E]/70 sm:text-sm">
                  <FaLocationDot
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-[#D6B779]"
                  />
                  <span className="min-w-0 break-words">{location}</span>
                </p>
              )}
            </div>
          </div>

          {/* Profile actions */}
          <div className="grid w-full min-w-0 grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3 lg:max-w-2xl">
            <button
              type="button"
              onClick={saveContact}
              disabled={saving}
              className={`${primaryAction} col-span-3 disabled:cursor-wait disabled:opacity-70 sm:col-span-1 ${focusRing}`}
            >
              <UserPlus aria-hidden="true" />
              {saving ? "Preparing..." : "Save Contact"}
            </button>

            {phoneHref ? (
              <a
                href={`tel:${phoneHref}`}
                className={`${secondaryAction} ${focusRing}`}
              >
                <FaPhone aria-hidden="true" />
                Call
              </a>
            ) : (
              <span aria-disabled="true" className={disabledAction}>
                <FaPhone aria-hidden="true" />
                Call
              </span>
            )}

            {email ? (
              <a
                href={`mailto:${email}`}
                className={`${secondaryAction} ${focusRing}`}
              >
                <FaEnvelope aria-hidden="true" />
                Email
              </a>
            ) : (
              <span aria-disabled="true" className={disabledAction}>
                <FaEnvelope aria-hidden="true" />
                Email
              </span>
            )}

            <button
              type="button"
              onClick={shareProfile}
              className={`${secondaryAction} ${focusRing}`}
            >
              {copied ? (
                <FaCheck aria-hidden="true" />
              ) : (
                <FaShareNodes aria-hidden="true" />
              )}
              {copied ? "Copied!" : "Share"}
            </button>
          </div>

          <p className="sr-only" role="status" aria-live="polite">
            {copied ? "Profile link copied to clipboard" : ""}
          </p>
        </div>

        {/* Personal socials */}
        {profile.socials?.length ? (
          <div className="mt-9 flex min-w-0 flex-col gap-4 border-t border-[#D6B779]/15 pt-6 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-3">
            <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C0A08E]/55">
              Personal Socials
            </p>

            <div className="min-w-0">
              <SocialLinks socials={profile.socials} />
            </div>
          </div>
        ) : null}
      </div>

      {/* Bottom gold accent */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-[#B89553] to-transparent"
      />
    </section>
  );
}
