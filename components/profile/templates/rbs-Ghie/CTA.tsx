"use client";

import { useState } from "react";
import {
  Check,
  Mail,
  UserPlus,
  Loader2,
  Phone,
  ArrowUpRight,
} from "lucide-react";

import type { BusinessProfile } from "@/lib/profiles";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9B90F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717]";

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
      throw new Error("Unable to fetch profile avatar.");
    }

    const blob = await response.blob();
    const mimeType = blob.type.toLowerCase();

    if (mimeType !== "image/jpeg" && mimeType !== "image/png") {
      console.warn("Avatar must be a JPEG or PNG to embed in the vCard.");
      return null;
    }

    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result;

        if (typeof result !== "string") {
          reject(new Error("Unable to read avatar image."));
          return;
        }

        resolve(result.split(",")[1] ?? "");
      };

      reader.onerror = () => reject(new Error("Unable to read avatar image."));

      reader.readAsDataURL(blob);
    });

    if (!base64) return null;

    return {
      base64,
      type: mimeType === "image/png" ? "PNG" : "JPEG",
    };
  } catch (error) {
    console.error("Unable to include avatar in contact:", error);
    return null;
  }
}

function getSocialUrl(platform: string, url: string) {
  return `${platform}: ${url}`;
}

export default function CTA({ profile }: { profile: BusinessProfile }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSaveContact = async () => {
    if (saving) return;

    setSaving(true);
    setSaved(false);

    try {
      const fullName =
        profile.contactName?.trim() ||
        profile.businessName?.trim() ||
        "Contact";

      const { firstName, lastName } = getNameParts(fullName);

      const phone = profile.phone?.trim() ?? "";
      const email = profile.email?.trim() ?? "";
      const businessName = profile.businessName?.trim() ?? "";
      const title = profile.contactTitle?.trim() ?? "";
      const location = profile.location?.trim() ?? "";
      const website = profile.locationUrl?.trim() ?? "";

      const socials = (profile.socials ?? []).filter((social) =>
        social.url?.trim(),
      );

      // Fetch the actual profile avatar, not the business logo or banner.
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
        lines.push(`TEL;TYPE=CELL,VOICE:${escapeVCard(phone)}`);
      }

      if (email) {
        lines.push(`EMAIL;TYPE=INTERNET:${escapeVCard(email)}`);
      }

      if (location) {
        lines.push(`ADR;TYPE=WORK:;;${escapeVCard(location)};;;;`);
      }

      if (website) {
        lines.push(`URL:${escapeVCard(website)}`);
      }

      socials.forEach((social) => {
        lines.push(
          `URL:${escapeVCard(getSocialUrl(social.platform, social.url))}`,
        );
      });

      if (photo) {
        lines.push(`PHOTO;ENCODING=b;TYPE=${photo.type}:${photo.base64}`);
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

      window.setTimeout(() => URL.revokeObjectURL(url), 2000);

      setSaved(true);

      window.setTimeout(() => {
        setSaved(false);
      }, 3500);
    } catch (error) {
      console.error("Unable to save contact:", error);
    } finally {
      setSaving(false);
    }
  };

  const email = profile.email?.trim() ?? "";
  const phone = profile.phone?.trim() ?? "";

  const contactName = profile.contactName?.trim() || profile.businessName;

  const businessName = profile.businessName?.trim() || "";
  const title = profile.contactTitle?.trim() || "Professional Contact";

  const phoneLink = phone.replace(/[^\d+]/g, "");

  return (
    <section className="w-full">
      <div className="relative isolate overflow-hidden border border-[#26364A] bg-[#171717] px-5 py-10 text-white shadow-[0_12px_40px_rgba(15,35,65,0.12)] sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        {/* Decorative background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/[0.08]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full border border-[#F9B90F]/10"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-36 -left-24 h-80 w-80 rounded-full border border-white/[0.08]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F9B90F]/[0.025] blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center border border-[#F9B90F]/30 bg-[#F9B90F]/10 text-[#F9B90F] shadow-[0_0_30px_rgba(249,185,15,0.06)] sm:h-16 sm:w-16">
            <UserPlus size={27} strokeWidth={1.7} />
          </div>

          {/* Heading */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-7 bg-[#F9B90F]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#F9B90F] sm:text-xs">
              Keep in Touch
            </p>

            <span className="h-[2px] w-7 bg-[#F9B90F]" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Save My Contact
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
            Save {contactName} directly to your phone and keep the important
            contact details ready whenever you need them.
          </p>

          {/* Contact preview */}
          <div className="mx-auto mt-8 flex max-w-md items-center gap-4 border border-white/10 bg-white/[0.04] p-4 text-left backdrop-blur-sm sm:p-5">
            {profile.avatar ? (
              <div className="h-14 w-14 shrink-0 overflow-hidden border border-[#F9B90F]/30 bg-[#262626]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profile.avatar}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-[#F9B90F]/30 bg-[#F9B90F]/10 text-[#F9B90F]">
                <UserPlus size={22} />
              </div>
            )}

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white sm:text-base">
                {contactName}
              </p>

              <p className="mt-1 truncate text-xs text-white/50 sm:text-sm">
                {title}
              </p>

              {businessName && (
                <p className="mt-1 truncate text-[11px] font-medium uppercase tracking-wider text-[#F9B90F]/80">
                  {businessName}
                </p>
              )}
            </div>
          </div>

          {/* Save button - always on top */}
          <div className="mx-auto mt-8 max-w-md">
            <button
              type="button"
              onClick={handleSaveContact}
              disabled={saving}
              className={`flex min-h-14 w-full items-center justify-center gap-3 border border-[#F9B90F] bg-[#F9B90F] px-6 py-4 text-sm font-bold text-[#171717] shadow-[0_8px_25px_rgba(249,185,15,0.12)] transition hover:border-[#FFD65C] hover:bg-[#FFD65C] hover:shadow-[0_10px_30px_rgba(249,185,15,0.18)] disabled:cursor-wait disabled:opacity-70 ${focusRing}`}
            >
              {saving ? (
                <Loader2 size={19} className="animate-spin" />
              ) : saved ? (
                <Check size={19} />
              ) : (
                <UserPlus size={19} />
              )}

              <span>
                {saving
                  ? "Preparing Contact..."
                  : saved
                    ? "Contact Downloaded"
                    : "Save to Contacts"}
              </span>
            </button>
          </div>

          {/* Call and Email - equal-sized buttons below Save */}
          <div className="mx-auto mt-3 grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
            {phone && (
              <a
                href={`tel:${phoneLink}`}
                className={`flex min-h-14 w-full items-center justify-center gap-2 border border-white/20 bg-white/[0.04] px-4 py-4 text-sm font-bold text-white transition hover:border-[#F9B90F]/60 hover:bg-white/10 ${focusRing}`}
              >
                <Phone size={17} className="shrink-0 text-[#F9B90F]" />
                <span>Call Me</span>
                <ArrowUpRight size={14} className="shrink-0 text-white/40" />
              </a>
            )}

            {email && (
              <a
                href={`mailto:${email}`}
                className={`flex min-h-14 w-full min-w-0 items-center justify-center gap-2 border border-white/20 bg-white/[0.04] px-4 py-4 text-sm font-bold text-white transition hover:border-[#F9B90F]/60 hover:bg-white/10 ${focusRing}`}
              >
                <Mail size={17} className="shrink-0 text-[#F9B90F]" />
                <span className="truncate">Email Me</span>
                <ArrowUpRight size={14} className="shrink-0 text-white/40" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
