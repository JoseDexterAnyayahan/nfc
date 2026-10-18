
"use client";

import { useCallback } from "react";
import { Poppins } from "next/font/google";
import {
  FaArrowRight,
  FaCheck,
  FaDownload,
  FaEnvelope,
  FaFacebookF,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaShieldAlt,
} from "react-icons/fa";
import type { BusinessProfile } from "@/lib/profiles";

import TamtechHero from "./TamtechHero";
import TamtechContact from "./TamtechContact";
import TamtechAbout from "./TamtechAbout";
import TamtechLocation from "./TamtechLocation";
import TamtechFooter from "./TamtechFooter";
import TamtechFloatingActions from "./TamtechFloatingActions";

import {
  tamtechContainerClass,
  tamtechProfileVariables,
} from "./tamtech-styles";
import { FaUserPlus } from "react-icons/fa6";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

type Props = {
  profile: BusinessProfile;
};

function escapeVCard(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r\n|\r|\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function splitName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length <= 1) {
    return {
      given: parts[0] || name,
      family: "",
      additional: "",
    };
  }

  return {
    given: parts[0],
    family: parts[parts.length - 1],
    additional: parts.slice(1, -1).join(" "),
  };
}

function foldVCardLine(line: string) {
  const encoder = new TextEncoder();
  const output: string[] = [];
  let current = "";
  let bytes = 0;

  for (const char of line) {
    const charBytes = encoder.encode(char).length;

    if (bytes + charBytes > 75 && current) {
      output.push(current);
      current = ` ${char}`;
      bytes = 1 + charBytes;
    } else {
      current += char;
      bytes += charBytes;
    }
  }

  if (current) output.push(current);

  return output.join("\r\n");
}

/**
 * Converts the user's profile avatar into JPEG or PNG base64 data.
 * This deliberately uses profile.avatar, never profile.logo or profile.banner.
 */
async function getAvatarPhoto(
  src?: string,
): Promise<{ type: "JPEG" | "PNG"; base64: string } | null> {
  if (!src || typeof window === "undefined") return null;

  let temporaryUrl: string | undefined;

  try {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);

    let blob: Blob;

    try {
      const response = await fetch(src, {
        signal: controller.signal,
        mode: "cors",
        credentials: "same-origin",
      });

      if (!response.ok) {
        throw new Error(`Avatar request failed: ${response.status}`);
      }

      blob = await response.blob();
    } finally {
      window.clearTimeout(timeout);
    }

    if (!blob.type.startsWith("image/")) {
      throw new Error("The avatar URL did not return an image.");
    }

    let outputBlob: Blob;
    let type: "JPEG" | "PNG";

    if (blob.type.toLowerCase() === "image/jpeg") {
      outputBlob = blob;
      type = "JPEG";
    } else if (blob.type.toLowerCase() === "image/png") {
      outputBlob = blob;
      type = "PNG";
    } else {
      temporaryUrl = URL.createObjectURL(blob);

      const image = new Image();
      image.src = temporaryUrl;

      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("Avatar could not be decoded."));
      });

      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Could not process the avatar.");
      }

      context.drawImage(image, 0, 0);

      const converted = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, "image/jpeg", 0.88);
      });

      if (!converted) {
        throw new Error("Could not convert the avatar.");
      }

      outputBlob = converted;
      type = "JPEG";
    }

    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result !== "string") {
          reject(new Error("Could not read avatar data."));
          return;
        }

        const data = reader.result.split(",")[1];

        if (!data) {
          reject(new Error("Avatar data was empty."));
          return;
        }

        resolve(data);
      };

      reader.onerror = () => reject(new Error("Could not read avatar data."));
      reader.readAsDataURL(outputBlob);
    });

    return { type, base64 };
  } catch (error) {
    console.warn(
      "The contact will be saved without an embedded photo because the avatar could not be fetched.",
      error,
    );

    return null;
  } finally {
    if (temporaryUrl) URL.revokeObjectURL(temporaryUrl);
  }
}

function getFacebookUrl(profile: BusinessProfile) {
  return (
    profile.socials?.find((social) => social.platform === "facebook")?.url ||
    "https://www.facebook.com/tamarawtechnohubinc"
  );
}

export default function TamtechWendell({ profile }: Props) {
  const saveContact = useCallback(async () => {
    const name = profile.contactName?.trim() || "Wendell Lozano";
    const title = profile.contactTitle?.trim() || "Operations Manager";
    const organization = "Tamaraw Technohub Inc.";
    const phone = profile.phone?.trim() || "09664795198";
    const email = profile.email?.trim() || "wendell@tamtechhub.com";
    const website = profile.website || "https://tamtechhub.com/";
    const facebookUrl = getFacebookUrl(profile);
    const location = profile.location?.trim() || "";
    const directionsUrl = profile.locationUrl?.trim() || "";

    const { given, family, additional } = splitName(name);

    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `PRODID:-//DexTap//Tamaraw Technohub Contact//EN`,
      `FN:${escapeVCard(name)}`,
      `N:${escapeVCard(family)};${escapeVCard(given)};${escapeVCard(additional)};;`,
      `ORG:${escapeVCard(organization)}`,
      `TITLE:${escapeVCard(title)}`,
    ];

    if (phone) {
      const normalizedPhone = phone.replace(/[^\d+*#;,]/g, "");

      // The same number is also used for WhatsApp, Viber and Telegram.
      lines.push(`TEL;TYPE=CELL,VOICE:${normalizedPhone}`);
    }

    if (email) {
      lines.push(`EMAIL;TYPE=INTERNET,WORK:${escapeVCard(email)}`);
    }

    if (website) {
      lines.push(`URL:${escapeVCard(website)}`);
    }

    if (facebookUrl) {
      lines.push(
        `X-SOCIALPROFILE;TYPE=facebook:${escapeVCard(facebookUrl)}`,
      );
    }

    if (location) {
      lines.push(`ADR;TYPE=WORK:;;${escapeVCard(location)};;;;`);
    }

    if (directionsUrl) {
      lines.push(
        `NOTE:${escapeVCard(`Office directions: ${directionsUrl}`)}`,
      );
    }

    // Embed Wendell's personal avatar, not the company logo or banner.
    const photo = await getAvatarPhoto(profile.avatar);

    if (photo) {
      lines.push(
        `PHOTO;ENCODING=b;TYPE=${photo.type}:${photo.base64}`,
      );
    }

    lines.push("END:VCARD");

    const contents =
      lines.map(foldVCardLine).join("\r\n") + "\r\n";

    const blob = new Blob([contents], {
      type: "text/vcard;charset=utf-8",
    });

    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    const filename =
      name
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase() || "wendell-lozano";

    anchor.href = objectUrl;
    anchor.download = `${filename}.vcf`;
    anchor.style.display = "none";

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    window.setTimeout(() => {
      URL.revokeObjectURL(objectUrl);
    }, 10_000);
  }, [profile]);

  const shareProfile = useCallback(async () => {
    const name = profile.contactName || "Wendell Lozano";

    const shareData = {
      title: `${name} | Tamaraw Technohub`,
      text: `${name} — ${profile.contactTitle || "Operations Manager"}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareData.url);
        window.alert("Profile link copied.");
      } else {
        window.prompt("Copy this profile link:", shareData.url);
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Could not share the profile.", error);
      }
    }
  }, [profile]);

  const phone = profile.phone?.replace(/[^\d+]/g, "") || "09664795198";
  const email = profile.email || "wendell@tamtechhub.com";
  const website = profile.website || "https://tamtechhub.com/";
  const directionsUrl = profile.locationUrl;

  return (
    <div
      style={tamtechProfileVariables}
      className={`${poppins.className} min-h-screen w-full min-w-0 overflow-x-clip bg-[var(--tamtech-page)] text-[var(--tamtech-text)]`}
    >
      <main
        id="top"
        className="w-full min-w-0 overflow-x-clip pb-28"
      >
        <TamtechHero
          profile={profile}
          onSaveContact={saveContact}
          onShare={shareProfile}
        />

        <TamtechContact profile={profile} />

        <TamtechAbout profile={profile} />

        <TamtechLocation profile={profile} />

        {/* Enhanced connection CTA */}
        <section className="relative w-full min-w-0 overflow-hidden bg-white py-12 sm:py-16">
          <div className={`${tamtechContainerClass} min-w-0`}>
            <div className="relative isolate overflow-hidden rounded-[28px] bg-[#0C2543] shadow-xl shadow-blue-950/10">
              {/* Brand gradients */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(66,205,165,0.28),transparent_48%),radial-gradient(ellipse_at_bottom_left,rgba(8,116,232,0.35),transparent_55%)]"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border border-white/10 sm:h-80 sm:w-80"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-12 h-48 w-48 rounded-full border-[24px] border-white/[0.04] sm:h-60 sm:w-60"
              />

              <div className="relative grid min-w-0 gap-8 p-6 sm:p-9 md:grid-cols-[minmax(0,1fr)_minmax(220px,0.65fr)] md:items-center md:gap-10 md:p-12">
                {/* CTA message */}
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#42CDA5]/30 bg-[#42CDA5]/10 px-3 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#42CDA5]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8CE9CE] sm:text-xs">
                      Stay connected
                    </span>
                  </div>

                  <h2 className="mt-5 max-w-xl break-words text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
                    Let&apos;s build a{" "}
                    <span className="text-[#66DDBB]">
                      connection.
                    </span>
                  </h2>

                  <p className="mt-4 max-w-xl break-words text-sm leading-7 text-slate-300 sm:text-base">
                    Keep Wendell&apos;s professional contact details close
                    at hand. Save his contact for future inquiries,
                    coordination, and business connections.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 text-xs text-slate-300 sm:text-sm">
                    <span className="inline-flex items-center gap-2">
                      <FaCheck className="text-[#66DDBB]" />
                      Contact details
                    </span>

                    <span className="inline-flex items-center gap-2">
                      <FaCheck className="text-[#66DDBB]" />
                      Company information
                    </span>

                    <span className="inline-flex items-center gap-2">
                      <FaCheck className="text-[#66DDBB]" />
                      Profile photo when supported
                    </span>
                  </div>
                </div>

                {/* Contact card */}
                <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-md sm:p-6">
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0874E8] text-white shadow-lg shadow-blue-950/20">
                      <FaUserPlus size={17} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <h3 className="break-words text-base font-bold text-white">
                        Save Wendell&apos;s contact
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-slate-300">
                        Download a contact card for your phone or address
                        book.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={saveContact}
                    className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0874E8] to-[#1596E8] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/20 transition hover:brightness-110 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#66DDBB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C2543]"
                  >
                    <FaUserPlus size={14} />
                    Save Contact
                    <FaArrowRight size={12} />
                  </button>

                  <p className="mt-3 text-center text-[11px] leading-5 text-slate-400">
                    Your device may ask you to confirm adding the contact.
                  </p>
                </div>
              </div>

              {/* Contact shortcuts */}
              <div className="relative grid grid-cols-1 border-t border-white/10 sm:grid-cols-3">
                <a
                  href={`tel:${phone}`}
                  className="flex min-w-0 items-center gap-3 px-6 py-4 transition hover:bg-white/[0.05] sm:px-7"
                >
                  <FaPhoneAlt className="shrink-0 text-[#66DDBB]" size={15} />
                  <span className="min-w-0">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Call
                    </span>
                    <span className="mt-1 block truncate text-sm font-semibold text-white">
                      {profile.phone || "09664795198"}
                    </span>
                  </span>
                </a>

                <a
                  href={`mailto:${email}`}
                  className="flex min-w-0 items-center gap-3 border-t border-white/10 px-6 py-4 transition hover:bg-white/[0.05] sm:border-l sm:border-t-0 sm:px-7"
                >
                  <FaEnvelope className="shrink-0 text-[#66DDBB]" size={15} />
                  <span className="min-w-0">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Email
                    </span>
                    <span className="mt-1 block truncate text-sm font-semibold text-white">
                      {email}
                    </span>
                  </span>
                </a>

                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-w-0 items-center gap-3 border-t border-white/10 px-6 py-4 transition hover:bg-white/[0.05] sm:border-l sm:border-t-0 sm:px-7"
                >
                  <FaGlobe className="shrink-0 text-[#66DDBB]" size={15} />
                  <span className="min-w-0">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Website
                    </span>
                    <span className="mt-1 block truncate text-sm font-semibold text-white">
                      tamtechhub.com
                    </span>
                  </span>
                </a>
              </div>
            </div>

            {/* Optional directions and trust note */}
            <div className="mt-5 flex flex-col gap-3 text-xs leading-6 text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-start gap-2">
                <FaShieldAlt className="mt-1 shrink-0 text-[#0874E8]" />
                Contact details are provided for professional communication.
              </p>

              {directionsUrl && (
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-[#0874E8] transition hover:text-[#0558B5]"
                >
                  <FaMapMarkerAlt size={12} />
                  Get directions
                  <FaArrowRight size={11} />
                </a>
              )}

              <a
                href={getFacebookUrl(profile)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-[#0874E8] transition hover:text-[#0558B5]"
              >
                <FaFacebookF size={12} />
                Company Facebook
                <FaArrowRight size={11} />
              </a>
            </div>
          </div>
        </section>

        <TamtechFooter profile={profile} />
      </main>

      {/* Fixed action bar remains outside main content. */}
      <TamtechFloatingActions
        profile={profile}
        onSaveContact={saveContact}
      />
    </div>
  );
}
