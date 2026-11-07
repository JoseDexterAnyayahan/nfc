"use client";

import { useEffect, useState } from "react";
import {
  UserPlus,
  Phone,
  Mail,
  ArrowUp,
} from "lucide-react";

import type { BusinessProfile } from "@/lib/profiles";

type Props = {
  profile: BusinessProfile;
};

function escapeVCard(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function foldVCardLine(line: string) {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(line);

  if (bytes.length <= 75) {
    return line;
  }

  const parts: string[] = [];
  let current = "";
  let currentBytes = 0;

  for (const char of line) {
    const charBytes = encoder.encode(char).length;

    if (currentBytes + charBytes > 75) {
      parts.push(current);
      current = ` ${char}`;
      currentBytes = 1 + charBytes;
    } else {
      current += char;
      currentBytes += charBytes;
    }
  }

  if (current) {
    parts.push(current);
  }

  return parts.join("\r\n");
}

async function prepareContactPhoto(blob: Blob) {
  const type = blob.type.toLowerCase();

  if (type === "image/jpeg" || type === "image/png") {
    return {
      blob,
      type: type === "image/png" ? "PNG" : "JPEG",
    };
  }

  const bitmap = await createImageBitmap(blob);

  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;

  const context = canvas.getContext("2d");

  if (!context) {
    bitmap.close();
    throw new Error("Unable to prepare contact photo.");
  }

  context.drawImage(bitmap, 0, 0);
  bitmap.close();

  const jpegBlob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/jpeg", 0.92);
  });

  if (!jpegBlob) {
    throw new Error("Unable to convert contact photo.");
  }

  return {
    blob: jpegBlob,
    type: "JPEG",
  };
}

function blobToBase64(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== "string") {
        reject(new Error("Unable to read contact photo."));
        return;
      }

      const base64 = result.split(",")[1];

      if (!base64) {
        reject(new Error("Unable to encode contact photo."));
        return;
      }

      resolve(base64);
    };

    reader.onerror = () => {
      reject(new Error("Unable to read contact photo."));
    };

    reader.readAsDataURL(blob);
  });
}

export default function FloatingActions({ profile }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [saving, setSaving] = useState(false);

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

    try {
      const phone = profile.phone?.trim() ?? "";
      const email = profile.email?.trim() ?? "";

      const digits = phone.replace(/\D/g, "");

      const internationalPhone = digits.startsWith("0")
        ? `63${digits.slice(1)}`
        : digits;

      const contactName =
        profile.contactName?.trim() || profile.businessName;

      let photoBase64 = "";
      let photoType = "JPEG";

      if (profile.avatar) {
        const response = await fetch(profile.avatar, {
          cache: "force-cache",
        });

        if (!response.ok) {
          throw new Error("Unable to load contact photo.");
        }

        const blob = await response.blob();

        if (!blob.type.toLowerCase().startsWith("image/")) {
          throw new Error("Contact photo is not a valid image.");
        }

        const preparedPhoto = await prepareContactPhoto(blob);

        photoType = preparedPhoto.type;
        photoBase64 = await blobToBase64(preparedPhoto.blob);
      }

      const vCardLines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${escapeVCard(contactName)}`,
        `ORG:${escapeVCard(profile.businessName)}`,
        ...(profile.tagline
          ? [`TITLE:${escapeVCard(profile.tagline)}`]
          : []),
        ...(internationalPhone
          ? [`TEL;TYPE=CELL:+${internationalPhone}`]
          : []),
        ...(email
          ? [`EMAIL;TYPE=WORK:${escapeVCard(email)}`]
          : []),
        ...(profile.location
          ? [
              `ADR;TYPE=WORK:;;${escapeVCard(
                profile.location,
              )};;;;`,
            ]
          : []),
        `URL:${window.location.href}`,
        ...(photoBase64
          ? [
              `PHOTO;ENCODING=b;TYPE=${photoType}:${photoBase64}`,
            ]
          : []),
        "END:VCARD",
      ];

      const vCard = vCardLines
        .map(foldVCardLine)
        .join("\r\n");

      const blob = new Blob([vCard], {
        type: "text/vcard;charset=utf-8",
      });

      const fileName = `${profile.businessName
        .replace(/[^a-z0-9]/gi, "-")
        .toLowerCase()}.vcf`;

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Unable to save contact:", error);
      window.alert(
        "Unable to save contact. Please try again.",
      );
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

  const phone = profile.phone?.trim() ?? "";
  const email = profile.email?.trim() ?? "";

  return (
    <>
      {/* Floating Contact Actions */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 w-full px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 transition-all duration-300 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0"
        }`}
      >
        <nav
          aria-label="Quick contact actions"
          className="mx-auto flex w-full max-w-md items-center gap-2 border border-[#D6B779]/30 bg-[#031319]/95 p-2 shadow-[0_12px_45px_rgba(0,0,0,0.45)] backdrop-blur-xl"
        >
          {/* Save Contact */}
          <button
            type="button"
            onClick={handleSaveContact}
            disabled={saving}
            aria-label={`Save ${profile.businessName} contact`}
            className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 border border-[#D6B779] bg-gradient-to-b from-[#E5CD91] to-[#B89553] px-2 py-3 text-[#21190F] transition-all duration-200 hover:brightness-110 active:scale-[0.97] disabled:cursor-wait disabled:opacity-70"
          >
            <UserPlus
              size={20}
              strokeWidth={2.2}
              aria-hidden="true"
            />

            <span className="text-[10px] font-bold sm:text-xs">
              {saving ? "Saving..." : "Save Contact"}
            </span>
          </button>

          {/* Call */}
          {phone && (
            <a
              href={`tel:${phone}`}
              aria-label={`Call ${profile.businessName}`}
              className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 border border-[#D6B779]/30 bg-[#262B28] px-2 py-3 text-[#E5CD91] transition-all duration-200 hover:border-[#D6B779] hover:bg-[#56463A] active:scale-[0.97]"
            >
              <Phone
                size={20}
                strokeWidth={2.2}
                aria-hidden="true"
              />

              <span className="text-[10px] font-semibold sm:text-xs">
                Call
              </span>
            </a>
          )}

          {/* Email */}
          {email && (
            <a
              href={`mailto:${email}`}
              aria-label={`Email ${profile.businessName}`}
              className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 border border-[#D6B779]/30 bg-[#262B28] px-2 py-3 text-[#E5CD91] transition-all duration-200 hover:border-[#D6B779] hover:bg-[#56463A] active:scale-[0.97]"
            >
              <Mail
                size={20}
                strokeWidth={2.2}
                aria-hidden="true"
              />

              <span className="text-[10px] font-semibold sm:text-xs">
                Email
              </span>
            </a>
          )}
        </nav>
      </div>

      {/* Back to Top */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-28 right-4 z-40 flex h-11 w-11 items-center justify-center border border-[#D6B779]/50 bg-[#031319]/95 text-[#E5CD91] shadow-[0_8px_25px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#E5CD91] hover:bg-[#56463A] sm:right-6 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp
          size={19}
          strokeWidth={2.3}
          aria-hidden="true"
        />
      </button>
    </>
  );
}