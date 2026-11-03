
"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Mail,
  Phone,
  Share2,
  UserPlus,
  MapPin,
} from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

import type { BusinessProfile } from "@/lib/profiles";

export default function PixeeHero({
  profile,
}: {
  profile: BusinessProfile;
}) {
  const [copied, setCopied] = useState(false);

  const facebook = profile.socials?.find(
    (social) => social.platform === "facebook"
  );

  const instagram = profile.socials?.find(
    (social) => social.platform === "instagram"
  );

  const tiktok = profile.socials?.find(
    (social) => social.platform === "tiktok"
  );

  const phone = profile.phone || "";
  const email = profile.email || "";
  const location = profile.location || "";

  const escapeVCard = (value: string) =>
    value
      .replace(/\\/g, "\\\\")
      .replace(/\r?\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");

  const blobToBase64 = (blob: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result;

        if (typeof result !== "string") {
          reject(new Error("Unable to read logo image."));
          return;
        }

        resolve(result.split(",")[1]);
      };

      reader.onerror = () => reject(
        new Error("Unable to convert logo image.")
      );

      reader.readAsDataURL(blob);
    });

  const handleSaveContact = async () => {
    try {
      const contactName = profile.contactName || profile.businessName;
      const businessName = profile.businessName;
      const contactTitle = profile.contactTitle || "Event Services";

      // Fetch the actual business logo.
      const logoResponse = await fetch(
        new URL(profile.logo, window.location.origin).toString()
      );

      if (!logoResponse.ok) {
        throw new Error("Unable to load PIXEEPLATES logo.");
      }

      const logoBlob = await logoResponse.blob();
      const logoBase64 = await blobToBase64(logoBlob);

      const logoMimeType = logoBlob.type.toLowerCase();

      const photoType = logoMimeType.includes("jpeg") ||
        logoMimeType.includes("jpg")
        ? "JPEG"
        : logoMimeType.includes("webp")
          ? "WEBP"
          : "PNG";

      const vCardLines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${escapeVCard(contactName)}`,
        `N:${escapeVCard(contactName)};;;;`,
        `ORG:${escapeVCard(businessName)}`,
        `TITLE:${escapeVCard(contactTitle)}`,
        phone ? `TEL;TYPE=CELL:${escapeVCard(phone)}` : "",
        email ? `EMAIL;TYPE=WORK:${escapeVCard(email)}` : "",
        location
          ? `ADR;TYPE=WORK:;;${escapeVCard(location)};;;;`
          : "",
        `URL:${window.location.href}`,
        facebook
          ? `X-SOCIALPROFILE;TYPE=facebook:${escapeVCard(facebook.url)}`
          : "",
        instagram
          ? `X-SOCIALPROFILE;TYPE=instagram:${escapeVCard(instagram.url)}`
          : "",
        tiktok
          ? `X-SOCIALPROFILE;TYPE=tiktok:${escapeVCard(tiktok.url)}`
          : "",
        `PHOTO;ENCODING=b;TYPE=${photoType}:${logoBase64}`,
        "END:VCARD",
      ].filter(Boolean);

      const vCard = vCardLines.join("\r\n");

      const blob = new Blob([vCard], {
        type: "text/vcard;charset=utf-8",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      const fileName = businessName
        .trim()
        .replace(/[^\w-]+/g, "-")
        .replace(/^-+|-+$/g, "");

      link.href = url;
      link.download = `${fileName || "business-contact"}.vcf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error("Unable to save PIXEEPLATES contact:", error);
      alert(
        "Unable to prepare the contact card. Please check your connection and try again."
      );
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: profile.businessName,
      text: `Discover ${profile.businessName} — ${profile.tagline || "Event Services"}.`,
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
    <section className="overflow-hidden rounded-3xl border border-[#c9a45c]/25 bg-[#0d0d0d] shadow-xl">

      {/* Banner */}
      <div className="relative aspect-[1774/887] w-full overflow-hidden">
        {profile.banner && (
          <Image
            src={profile.banner}
            alt={`${profile.businessName} banner`}
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        )}
      </div>

      {/* Profile */}
      <div className="px-4 pb-7 sm:px-8 sm:pb-9">

        {/* Centered logo */}
        <div className="relative z-10 mx-auto -mt-14 flex h-28 w-28 items-center justify-center rounded-2xl border-4 border-[#0d0d0d] bg-white shadow-xl sm:-mt-16 sm:h-32 sm:w-32">
          <div className="relative h-full w-full overflow-hidden rounded-xl">
            <Image
              src={profile.logo}
              alt={`${profile.businessName} logo`}
              fill
              priority
              sizes="128px"
              className="object-contain p-2"
            />
          </div>
        </div>

        {/* Business name */}
        <div className="mt-4 text-center">
          <h1 className="text-2xl font-bold tracking-[0.06em] sm:text-4xl">
            <span className="text-[#d6b56d]">PIXEE</span>
            <span className="ml-2 text-white">PLATES</span>
          </h1>

          <p className="mt-2 text-xs text-white/55 sm:text-sm">
            {profile.tagline || "Event Services"}
          </p>

          {location && (
            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-white/45">
              <MapPin size={13} className="text-[#d6b56d]" />
              {location}
            </div>
          )}
        </div>

        {/* Contact actions */}
        <div className="mx-auto mt-6 max-w-2xl">
          <button
            type="button"
            onClick={handleSaveContact}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#b38a42] via-[#e0c17b] to-[#b38a42] px-5 py-3.5 text-sm font-semibold text-[#17120a] shadow-md transition hover:brightness-110 active:scale-[0.99]"
          >
            <UserPlus size={17} />
            Save Contact
          </button>

          <div className="mt-3 grid grid-cols-3 gap-2.5">
            <a
              href={phone ? `tel:${phone}` : undefined}
              aria-disabled={!phone}
              className={`flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-2 py-3 text-xs font-medium text-white transition hover:border-[#c9a45c]/50 hover:bg-[#c9a45c]/10 hover:text-[#e4c982] sm:text-sm ${
                !phone ? "pointer-events-none opacity-40" : ""
              }`}
            >
              <Phone size={15} className="text-[#d6b56d]" />
              Call
            </a>

            <a
              href={email ? `mailto:${email}` : undefined}
              aria-disabled={!email}
              className={`flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-2 py-3 text-xs font-medium text-white transition hover:border-[#c9a45c]/50 hover:bg-[#c9a45c]/10 hover:text-[#e4c982] sm:text-sm ${
                !email ? "pointer-events-none opacity-40" : ""
              }`}
            >
              <Mail size={15} className="text-[#d6b56d]" />
              Email
            </a>

            <button
              type="button"
              onClick={handleShare}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-2 py-3 text-xs font-medium text-white transition hover:border-[#c9a45c]/50 hover:bg-[#c9a45c]/10 hover:text-[#e4c982] sm:text-sm"
            >
              <Share2 size={15} className="text-[#d6b56d]" />
              {copied ? "Copied" : "Share"}
            </button>
          </div>
        </div>

        {/* Social links */}
        {(facebook || instagram || tiktok) && (
          <div className="mt-6 flex items-center justify-center gap-3">
            {facebook && (
              <a
                href={facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c9a45c]/30 text-[#d6b56d] transition hover:bg-[#c9a45c] hover:text-black"
              >
                <FaFacebookF size={14} />
              </a>
            )}

            {instagram && (
              <a
                href={instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c9a45c]/30 text-[#d6b56d] transition hover:bg-[#c9a45c] hover:text-black"
              >
                <FaInstagram size={15} />
              </a>
            )}

            {tiktok && (
              <a
                href={tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c9a45c]/30 text-[#d6b56d] transition hover:bg-[#c9a45c] hover:text-black"
              >
                <SiTiktok size={14} />
              </a>
            )}
          </div>
        )}
      </div>

      <div className="h-1 bg-gradient-to-r from-transparent via-[#c9a45c] to-transparent" />
    </section>
  );
}
