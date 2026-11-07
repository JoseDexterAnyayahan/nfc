"use client";

import { useState } from "react";
import type { BusinessProfile } from "@/lib/profiles";
import { FaAddressBook, FaEnvelope, FaPhone } from "react-icons/fa6";

type Props = {
  profile: BusinessProfile;
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B779] focus-visible:ring-offset-2 focus-visible:ring-offset-[#56463A]";

const actionBase =
  "inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-none border px-6 text-sm font-semibold tracking-wide transition duration-300 active:scale-[0.98] sm:w-auto sm:px-7";

const primaryAction = `${actionBase} border-[#D6B779] bg-gradient-to-r from-[#B89553] via-[#E5CD91] to-[#B89553] text-[#21190F] shadow-[0_4px_20px_rgba(214,183,121,0.15)] hover:brightness-110 hover:shadow-[0_6px_25px_rgba(214,183,121,0.25)]`;

const secondaryAction = `${actionBase} border-[#D6B779]/50 bg-[#D6B779]/5 text-[#E5CD91] hover:border-[#E5CD91] hover:bg-[#D6B779]/15`;

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

export default function CTA({ profile }: Props) {
  const [saving, setSaving] = useState(false);

  const phone = profile.phone?.trim() ?? "";
  const email = profile.email?.trim() ?? "";

  const digits = phone.replace(/\D/g, "");

  const internationalPhone = digits.startsWith("0")
    ? `63${digits.slice(1)}`
    : digits;

  const contactName =
    profile.contactName?.trim() || profile.businessName;

  const saveContact = async () => {
    if (saving) return;

    setSaving(true);

    try {
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

      const currentUrl = window.location.href;

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
        `URL:${currentUrl}`,
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
      console.error("Save contact failed:", error);

      window.alert(
        "Unable to save the contact right now. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="relative scroll-mt-24 overflow-hidden bg-[#56463A] px-5 py-16 text-center sm:py-20 md:px-10 md:py-24"
    >
      {/* Decorative golden frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 border border-[#D6B779]/20 sm:inset-5"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#D6B779]/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-56 w-56 rounded-full bg-[#B89553]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl">
        <div className="mb-7 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#D6B779]" />

          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#E5CD91] sm:text-xs sm:tracking-[0.35em]">
            Let&apos;s create something memorable
          </p>

          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#D6B779]" />
        </div>

        <h2
          id="cta-heading"
          className="text-balance text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl"
        >
          Your Moments Deserve to Be{" "}
          <span className="bg-gradient-to-r from-[#B89553] via-[#F0DDA8] to-[#B89553] bg-clip-text text-transparent">
            Remembered.
          </span>
        </h2>

        <div
          aria-hidden="true"
          className="mx-auto mt-7 flex items-center justify-center gap-2"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#B89553]" />

          <span className="h-2 w-2 rotate-45 border border-[#E5CD91] bg-[#B89553]" />

          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#B89553]" />
        </div>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-7 text-[#E5D9C8]/80">
          Let us be part of your special occasion. Get in touch with us to
          discuss your photography and videography needs.
        </p>

        <div className="mx-auto mt-10 flex max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
          <button
            type="button"
            onClick={saveContact}
            disabled={saving}
            className={`${primaryAction} ${focusRing} disabled:cursor-wait disabled:opacity-70`}
          >
            <FaAddressBook aria-hidden="true" size={17} />

            {saving ? "Preparing Contact..." : "Save Contact"}
          </button>

          {digits && (
            <a
              href={`tel:+${internationalPhone}`}
              className={`${secondaryAction} ${focusRing}`}
            >
              <FaPhone aria-hidden="true" size={14} />
              Call Now
            </a>
          )}

          {email && (
            <a
              href={`mailto:${email}`}
              className={`${secondaryAction} ${focusRing}`}
            >
              <FaEnvelope aria-hidden="true" size={14} />
              Send an Email
            </a>
          )}
        </div>

        <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.3em] text-[#D6B779]/50">
          CALIX FILMS AND PHOTOGRAPHY
        </p>
      </div>
    </section>
  );
}