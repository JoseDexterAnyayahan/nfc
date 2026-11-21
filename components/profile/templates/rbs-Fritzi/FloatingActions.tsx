
"use client";

import { useEffect, useState } from "react";
import {
  UserPlus,
  Phone,
  Mail,
  ArrowUp,
  Check,
  Loader2,
} from "lucide-react";

import type { BusinessProfile } from "@/lib/profiles";

type Props = {
  profile: BusinessProfile;
};

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
      console.warn("Profile photo must be JPEG or PNG.");
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

function getSocialLabel(platform: string) {
  return platform.charAt(0).toUpperCase() + platform.slice(1);
}

export default function FloatingActions({ profile }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

      const businessName = profile.businessName?.trim() ?? "";
      const title = profile.contactTitle?.trim() ?? "";
      const phone = profile.phone?.trim() ?? "";
      const email = profile.email?.trim() ?? "";
      const location = profile.location?.trim() ?? "";

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

      if (profile.locationUrl?.trim()) {
        lines.push(`URL:${escapeVCard(profile.locationUrl.trim())}`);
      }

      (profile.socials ?? []).forEach((social) => {
        if (!social.url?.trim()) return;

        lines.push(
          `URL:${escapeVCard(social.url.trim())}`,
          `NOTE:${escapeVCard(getSocialLabel(social.platform))}`,
        );
      });

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

      window.setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (error) {
      console.error("Unable to save contact:", error);
      alert("Unable to save contact. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const phoneLink = profile.phone?.replace(/[^\d+]/g, "");

  return (
    <>
      {/* Floating Contact Actions */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 w-full px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 transition-all duration-300 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0"
        }`}
      >
        <nav
          aria-label="Quick contact actions"
          className="mx-auto flex w-full max-w-md items-center gap-2 border border-[#E7EAF0] bg-white/95 p-2 shadow-[0_12px_45px_rgba(23,43,69,0.18)] backdrop-blur-xl"
        >
          {/* Save Contact - 70% */}
          <button
            type="button"
            onClick={handleSaveContact}
            disabled={saving}
            aria-label="Save contact"
            className="flex min-w-0 flex-[7] items-center justify-center gap-2 bg-[#F9B90F] px-3 py-4 text-[#171717] transition-all duration-200 hover:bg-[#FFD65C] active:scale-[0.98] disabled:cursor-wait disabled:opacity-75"
          >
            {saving ? (
              <Loader2 size={19} className="shrink-0 animate-spin" />
            ) : saved ? (
              <Check size={19} strokeWidth={2.3} className="shrink-0" />
            ) : (
              <UserPlus size={19} strokeWidth={2.2} className="shrink-0" />
            )}

            <span className="truncate text-xs font-bold sm:text-sm">
              {saving
                ? "Preparing Contact..."
                : saved
                  ? "Contact Downloaded"
                  : "Save Contact"}
            </span>
          </button>

          {/* Call - 15%, icon only */}
          <a
            href={phoneLink ? `tel:${phoneLink}` : undefined}
            aria-label="Call contact"
            title="Call"
            aria-disabled={!phoneLink}
            className={`flex min-w-0 flex-[1.5] items-center justify-center bg-[#F4F6F9] py-4 text-[#0B4FA8] transition-all duration-200 hover:bg-[#0B4FA8] hover:text-white active:scale-[0.97] ${
              !phoneLink ? "pointer-events-none opacity-40" : ""
            }`}
          >
            <Phone size={21} strokeWidth={2.2} />
          </a>

          {/* Email - 15%, icon only */}
          <a
            href={
              profile.email
                ? `mailto:${profile.email.trim()}`
                : undefined
            }
            aria-label="Email contact"
            title="Email"
            aria-disabled={!profile.email}
            className={`flex min-w-0 flex-[1.5] items-center justify-center bg-[#F4F6F9] py-4 text-[#0B4FA8] transition-all duration-200 hover:bg-[#0B4FA8] hover:text-white active:scale-[0.97] ${
              !profile.email ? "pointer-events-none opacity-40" : ""
            }`}
          >
            <Mail size={21} strokeWidth={2.2} />
          </a>
        </nav>
      </div>

      {/* Back to Top */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-28 right-4 z-40 flex h-11 w-11 items-center justify-center border border-[#E7EAF0] bg-white/95 text-[#0B4FA8] shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#F9B90F] hover:bg-[#F9B90F] hover:text-[#171717] sm:right-6 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp size={19} strokeWidth={2.3} />
      </button>
    </>
  );
}
