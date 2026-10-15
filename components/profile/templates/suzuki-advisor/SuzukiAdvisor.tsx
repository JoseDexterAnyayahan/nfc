
"use client";

import { useCallback } from "react";
import type { BusinessProfile } from "@/lib/profiles";
import { Poppins } from "next/font/google";
import {
  FaArrowRight,
  FaMapMarkerAlt,
  FaRegAddressCard,
} from "react-icons/fa";

import SuzukiHero from "./SuzukiHero";
import SuzukiContact from "./SuzukiContact";
import SuzukiAbout from "./SuzukiAbout";
import SuzukiFooter from "./SuzukiFooter";
import SuzukiFloatingActions from "./SuzukiFloatingActions";

import {
  suzukiContainerClass,
  suzukiProfileClassName,
  suzukiProfileVariables,
} from "./suzuki-styles";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-suzuki-poppins",
});

type Props = {
  profile: BusinessProfile;
};

const DEFAULT_MAP_URL =
  "https://maps.app.goo.gl/r18QAyNbBniHH6kA6";

const DEALERSHIP_NAME = "Suzuki Auto Calapan";
const DEALERSHIP_ADDRESS =
  "Suzuki Auto Calapan, Oriental Mindoro";

/**
 * Escapes text values for vCard 3.0.
 */
function escapeVCard(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r\n|\r|\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

/**
 * Folds vCard lines to a maximum of 75 UTF-8 bytes.
 * Continuation lines begin with one space.
 */
function foldVCardLine(line: string): string {
  const encoder = new TextEncoder();
  const output: string[] = [];

  let current = "";
  let byteCount = 0;

  for (const character of line) {
    const characterBytes = encoder.encode(character).length;

    if (byteCount + characterBytes > 75 && current) {
      output.push(current);
      current = ` ${character}`;
      byteCount = 1 + characterBytes;
    } else {
      current += character;
      byteCount += characterBytes;
    }
  }

  if (current) {
    output.push(current);
  }

  return output.join("\r\n");
}

/**
 * Separates a display name into vCard N components.
 *
 * Example:
 * Jhon Loyd B. Caganan
 * given: Jhon
 * additional: Loyd B.
 * family: Caganan
 */
function splitContactName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  if (parts.length <= 1) {
    return {
      given: parts[0] || fullName,
      additional: "",
      family: "",
    };
  }

  return {
    given: parts[0],
    additional: parts.slice(1, -1).join(" "),
    family: parts[parts.length - 1],
  };
}

/**
 * Converts the avatar into an embedded JPEG or PNG photo.
 *
 * Data URLs and images that permit browser fetching are supported.
 * If a remote host blocks access through CORS, the contact can still
 * be downloaded, but its embedded photo will be omitted.
 */
async function getAvatarPhoto(
  avatar?: string,
): Promise<{ type: "JPEG" | "PNG"; base64: string } | null> {
  if (!avatar) return null;

  try {
    const response = await fetch(avatar);

    if (!response.ok) return null;

    const blob = await response.blob();
    const mime = blob.type.toLowerCase();

    let type: "JPEG" | "PNG";

    if (mime === "image/jpeg" || mime === "image/jpg") {
      type = "JPEG";
    } else if (mime === "image/png") {
      type = "PNG";
    } else {
      // Convert unsupported formats such as WebP to PNG when possible.
      if (
        typeof document === "undefined" ||
        typeof URL.createObjectURL !== "function"
      ) {
        return null;
      }

      const temporaryUrl = URL.createObjectURL(blob);

      try {
        const image = new Image();
        image.src = temporaryUrl;

        await new Promise<void>((resolve, reject) => {
          image.onload = () => resolve();
          image.onerror = () =>
            reject(new Error("Unable to load avatar image."));
        });

        if (!image.naturalWidth || !image.naturalHeight) {
          return null;
        }

        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        const context = canvas.getContext("2d");

        if (!context) return null;

        context.drawImage(image, 0, 0);

        const pngDataUrl = canvas.toDataURL("image/png");
        const base64 = pngDataUrl.split(",")[1];

        if (!base64) return null;

        return { type: "PNG", base64 };
      } finally {
        URL.revokeObjectURL(temporaryUrl);
      }
    }

    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result !== "string") {
          reject(new Error("Unable to read avatar."));
          return;
        }

        const encoded = reader.result.split(",")[1];

        if (!encoded) {
          reject(new Error("Invalid avatar data."));
          return;
        }

        resolve(encoded);
      };

      reader.onerror = () =>
        reject(new Error("Unable to read avatar image."));

      reader.readAsDataURL(blob);
    });

    return { type, base64 };
  } catch (error) {
    console.warn(
      "Could not embed the profile avatar in the contact file. Check the image URL and CORS settings.",
      error,
    );

    return null;
  }
}

export default function SuzukiAdvisor({ profile }: Props) {
  const saveContact = useCallback(async () => {
    const name = (
      profile.contactName ||
      profile.businessName ||
      "Suzuki Contact"
    ).trim();

    const title = profile.contactTitle || "Service Advisor";
    const organization = DEALERSHIP_NAME;
    const phone = profile.phone?.trim();
    const email = profile.email?.trim();
    const address = profile.location || DEALERSHIP_ADDRESS;
    const mapUrl = profile.locationUrl || DEFAULT_MAP_URL;

    const { given, additional, family } = splitContactName(name);

    const lines: string[] = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${escapeVCard(name)}`,
      `N:${escapeVCard(family)};${escapeVCard(given)};${escapeVCard(additional)};;`,
      `ORG:${escapeVCard(organization)}`,
      `TITLE:${escapeVCard(title)}`,
    ];

    if (phone) {
      // Keep a leading + if present and preserve the phone digits.
      const cleanPhone = phone.replace(/[^\d+*#;,]/g, "");

      if (cleanPhone) {
        lines.push(`TEL;TYPE=CELL:${cleanPhone}`);
      }
    }

    if (email) {
      lines.push(`EMAIL;TYPE=INTERNET:${escapeVCard(email)}`);
    }

    if (profile.website) {
      lines.push(`URL:${escapeVCard(profile.website)}`);
    }

    // Save the dealership location as a structured address.
    lines.push(
      `ADR;TYPE=WORK:;;${escapeVCard(address)};;;;`,
    );

    // Keep the map link separate from any personal website.
    lines.push(
      `NOTE:${escapeVCard(`Dealership directions: ${mapUrl}`)}`,
    );

    // Include the profile avatar in the actual contact file when possible.
    const photo = await getAvatarPhoto(profile.avatar);

    if (photo) {
      lines.push(
        `PHOTO;ENCODING=b;TYPE=${photo.type}:${photo.base64}`,
      );
    }

    lines.push("END:VCARD");

    const vcard =
      lines.map(foldVCardLine).join("\r\n") + "\r\n";

    const blob = new Blob([vcard], {
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
        .toLowerCase() || "suzuki-contact";

    anchor.href = objectUrl;
    anchor.download = `${filename}.vcf`;
    anchor.style.display = "none";

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    // Allow mobile browsers time to begin processing the download.
    window.setTimeout(() => {
      URL.revokeObjectURL(objectUrl);
    }, 10_000);
  }, [profile]);

  return (
    <main
      id="top"
      style={suzukiProfileVariables}
      className={`${poppins.className} ${suzukiProfileClassName} min-h-screen bg-[var(--suzuki-page)] pb-28 text-[var(--suzuki-text)] transition-colors duration-300`}
    >
      {/* Hero and primary actions */}
      <SuzukiHero
        profile={profile}
        onSaveContact={saveContact}
      />

      {/* Contact information */}
      <SuzukiContact profile={profile} />

      {/* About and service assistance */}
      <SuzukiAbout profile={profile} />

      {/* Contact CTA and dealership location */}
      <section className="bg-[var(--suzuki-page)] py-10 sm:py-14">
        <div className={suzukiContainerClass}>
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            {/* Save Contact CTA */}
            <div className="relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl bg-[var(--suzuki-blue)] p-6 text-white shadow-lg shadow-blue-950/10 sm:p-8">
              <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full border-[30px] border-white/[0.07]" />

              <div className="pointer-events-none absolute -bottom-16 -left-12 h-48 w-48 rounded-full border-[24px] border-white/[0.05]" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-[var(--suzuki-red)]" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/90">
                    Suzuki Auto Calapan
                  </span>
                </div>

                <h2 className="mt-5 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                  Let&apos;s stay connected.
                </h2>

                <p className="mt-3 max-w-sm text-sm leading-7 text-white/80">
                  Keep Jhon&apos;s contact details handy for your next
                  service inquiry. Save his information or visit the
                  dealership when you need assistance.
                </p>
              </div>

              <div className="relative mt-8">
                <button
                  type="button"
                  onClick={saveContact}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#174A96] shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#174A96] sm:w-auto"
                >
                  <FaRegAddressCard size={16} />
                  Save Contact
                </button>

                <p className="mt-3 text-xs text-white/60">
                  {profile.contactName || profile.businessName}
                  {" · "}
                  {profile.contactTitle || "Service Advisor"}
                </p>
              </div>
            </div>

            {/* Dealership location */}
            <div className="overflow-hidden rounded-3xl border border-[var(--suzuki-border)] bg-[var(--suzuki-card)] shadow-sm">
              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="h-1 w-7 rounded-full bg-[var(--suzuki-red)]" />

                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--suzuki-blue)]">
                      Find us
                    </p>
                  </div>

                  <h3 className="mt-3 text-xl font-bold tracking-tight text-[var(--suzuki-text)]">
                    Visit Suzuki Auto Calapan
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[var(--suzuki-muted)]">
                    {DEALERSHIP_ADDRESS}
                  </p>
                </div>

                <a
                  href={profile.locationUrl || DEFAULT_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--suzuki-blue)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--suzuki-blue)] focus-visible:ring-offset-2"
                >
                  Get Directions
                  <FaArrowRight size={12} />
                </a>
              </div>

              {/* Google Maps embed */}
              <div className="relative px-3 pb-3 sm:px-4 sm:pb-4">
                <div className="overflow-hidden rounded-2xl border border-[var(--suzuki-border)] bg-[var(--suzuki-surface)]">
                  <iframe
                    title="Map showing Suzuki Auto Calapan, Oriental Mindoro"
                    src="https://maps.google.com/maps?q=Suzuki%20Auto%20Calapan%2C%20Oriental%20Mindoro&z=15&output=embed"
                    className="h-[250px] w-full sm:h-[280px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-[var(--suzuki-border)] px-5 py-4 sm:px-6">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--suzuki-blue)]/10 text-[var(--suzuki-blue)]">
                  <FaMapMarkerAlt size={14} />
                </span>

                <p className="text-xs leading-5 text-[var(--suzuki-muted)]">
                  Open the map for the dealership location and
                  directions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SuzukiFooter profile={profile} />

      {/* Floating actions reuse the exact same saveContact function */}
      <SuzukiFloatingActions
        profile={profile}
        onSaveContact={saveContact}
      />
    </main>
  );
}
