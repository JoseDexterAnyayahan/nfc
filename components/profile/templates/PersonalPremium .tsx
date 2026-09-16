"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import { useTheme } from "next-themes";

import type { PersonalProfile } from "@/lib/profiles";

import {
  FiPhone,
  FiMail,
  FiGlobe,
  FiMapPin,
  FiUserPlus,
  FiShare2,
  FiSun,
  FiMoon,
} from "react-icons/fi";

import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

import { Nfc } from "lucide-react";

import { Button } from "@/components/ui/button";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type Props = {
  profile: PersonalProfile;
};

/*
 * ============================================================
 * VCARD HELPERS
 * ============================================================
 */

/**
 * Escape characters required by the vCard specification.
 */
function escapeVCardValue(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/**
 * Convert an image URL into Base64.
 *
 * This is done in the browser so the avatar can be embedded
 * directly into the .vcf file.
 */
async function imageToBase64(
  imageUrl: string
): Promise<{
  base64: string;
  mimeType: string;
} | null> {
  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to load avatar: ${response.status}`
      );
    }

    const blob = await response.blob();

    const mimeType = blob.type || "image/jpeg";

    const base64 = await new Promise<string>(
      (resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          const result = reader.result;

          if (typeof result !== "string") {
            reject(
              new Error("Unable to convert avatar to Base64")
            );
            return;
          }

          /*
           * FileReader returns:
           *
           * data:image/png;base64,XXXXXX
           *
           * We only need:
           *
           * XXXXXX
           */
          const commaIndex = result.indexOf(",");

          if (commaIndex === -1) {
            reject(
              new Error("Invalid Base64 image data")
            );
            return;
          }

          resolve(result.substring(commaIndex + 1));
        };

        reader.onerror = () => {
          reject(
            new Error("Failed to read avatar image")
          );
        };

        reader.readAsDataURL(blob);
      }
    );

    return {
      base64,
      mimeType,
    };
  } catch (error) {
    console.error(
      "Unable to load profile avatar:",
      error
    );

    return null;
  }
}

export default function PersonalPremium({
  profile,
}: Props) {
  const { resolvedTheme, setTheme } = useTheme();

  const socials = profile.socials ?? [];

  /*
   * ============================================================
   * SHARE PROFILE
   * ============================================================
   */
  const handleShare = async () => {
    if (typeof window === "undefined") return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: profile.name,
          text: profile.title
            ? `${profile.name} — ${profile.title}`
            : profile.name,
          url: window.location.href,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(
          window.location.href
        );
      }
    } catch {
      // User cancelled the share dialog.
    }
  };

  /*
   * ============================================================
   * SAVE CONTACT
   * ============================================================
   */
  const handleSaveContact = async () => {
    try {
      /*
       * Get avatar first.
       *
       * The avatar is embedded into the vCard instead of
       * simply referencing the website image URL.
       */
      const avatar = profile.avatar
        ? await imageToBase64(profile.avatar)
        : null;

      /*
       * --------------------------------------------------------
       * IMPORTANT:
       *
       * FN = Full Name
       *
       * N  = Structured Name
       *
       * ORG = Company
       *
       * Therefore the contact will be:
       *
       * Cel Carandang
       *
       * and NOT:
       *
       * Cel Carandang Consulting
       * --------------------------------------------------------
       */

      const firstName =
        profile.name.trim().split(/\s+/)[0] || "";

      const lastName =
        profile.name
          .trim()
          .split(/\s+/)
          .slice(1)
          .join(" ") || "";

      const lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",

        /*
         * Person's actual name.
         */
        `FN:${escapeVCardValue(profile.name)}`,

        /*
         * Structured first/last name.
         */
        `N:${escapeVCardValue(
          lastName
        )};${escapeVCardValue(firstName)};;;`,

        /*
         * Job title.
         */
        profile.title
          ? `TITLE:${escapeVCardValue(profile.title)}`
          : "",

        /*
         * Company.
         *
         * This does NOT become the contact's name.
         */
        profile.company
          ? `ORG:${escapeVCardValue(profile.company)}`
          : "",

        /*
         * Phone.
         */
        profile.phone
          ? `TEL;TYPE=CELL:${escapeVCardValue(
              profile.phone
            )}`
          : "",

        /*
         * WhatsApp.
         *
         * Stored as another phone number because vCard
         * applications generally recognize TEL reliably.
         */
        profile.whatsapp
          ? `TEL;TYPE=WORK:${escapeVCardValue(
              profile.whatsapp
            )}`
          : "",

        /*
         * Email.
         */
        profile.email
          ? `EMAIL;TYPE=INTERNET:${escapeVCardValue(
              profile.email
            )}`
          : "",

        /*
         * Website.
         */
        profile.website
          ? `URL:${escapeVCardValue(profile.website)}`
          : "",

        /*
         * Location.
         */
        profile.location
          ? `ADR;TYPE=WORK:;;${escapeVCardValue(
              profile.location
            )};;;;`
          : "",
      ];

      /*
       * --------------------------------------------------------
       * EMBED PROFILE IMAGE
       * --------------------------------------------------------
       *
       * vCard supports:
       *
       * PHOTO;ENCODING=b;TYPE=JPEG:BASE64_DATA
       *
       * or
       *
       * PHOTO;ENCODING=b;TYPE=PNG:BASE64_DATA
       */
      if (avatar) {
        const imageType = avatar.mimeType
          .toLowerCase()
          .includes("png")
          ? "PNG"
          : "JPEG";

        lines.push(
          `PHOTO;ENCODING=b;TYPE=${imageType}:${avatar.base64}`
        );
      }

      lines.push("END:VCARD");

      /*
       * Remove empty lines.
       */
      const vcard = lines
        .filter(Boolean)
        .join("\r\n");

      /*
       * Create the .vcf file.
       */
      const blob = new Blob([vcard], {
        type: "text/vcard;charset=utf-8",
      });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      /*
       * The downloaded file is based on the PERSON'S NAME,
       * not the company.
       *
       * Example:
       *
       * cel-carandang.vcf
       */
      link.download = `${profile.name
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase()}.vcf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      /*
       * Clean up object URL.
       */
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);
    } catch (error) {
      console.error(
        "Failed to create contact:",
        error
      );

      alert(
        "Unable to save the contact. Please try again."
      );
    }
  };

  /*
   * ============================================================
   * SOCIAL ICON
   * ============================================================
   */
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <FaFacebookF size={16} />;

      case "instagram":
        return <FaInstagram size={17} />;

      case "linkedin":
        return <FaLinkedinIn size={16} />;

      case "tiktok":
        return <FaTiktok size={17} />;

      case "youtube":
        return <FaYoutube size={17} />;

      case "x":
        return <FaXTwitter size={16} />;

      default:
        return <FiGlobe size={17} />;
    }
  };

  /*
   * ============================================================
   * STYLES
   * ============================================================
   */
  const iconButtonClass = `
    flex
    h-11
    w-11
    shrink-0
    items-center
    justify-center
    rounded-full
    border
    border-border
    bg-card
    text-foreground
    transition-all
    duration-200
    hover:border-[#d8a944]
    hover:text-[#d8a944]
  `;

  const contactRowClass = `
    group
    flex
    items-center
    gap-4
    rounded-2xl
    border
    border-border
    bg-card
    px-4
    py-3.5
    transition-all
    duration-200
    hover:border-[#d8a944]/50
    hover:shadow-sm
  `;

  return (
    <main
      className={`
        ${poppins.className}
        min-h-dvh
        w-full
        bg-muted/40
        text-foreground

        sm:flex
        sm:items-center
        sm:justify-center
        sm:px-6
        sm:py-10
      `}
    >
      {/* ======================================================
          DESKTOP BACKGROUND
          ====================================================== */}
      <div
        className="
          pointer-events-none
          fixed
          inset-0
          hidden
          overflow-hidden
          sm:block
        "
        aria-hidden="true"
      >
        <div
          className="
            absolute
            -left-32
            -top-32
            h-96
            w-96
            rounded-full
            bg-[#d8a944]/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-32
            -right-32
            h-96
            w-96
            rounded-full
            bg-[#d8a944]/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-80
            w-80
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-primary/5
            blur-3xl
          "
        />
      </div>

      {/* ======================================================
          PROFILE CARD
          ====================================================== */}
      <section
        className="
          relative
          min-h-dvh
          w-full
          overflow-hidden
          bg-background
          text-foreground

          sm:min-h-0
          sm:max-w-[430px]
          sm:rounded-[2rem]
          sm:border
          sm:border-border
          sm:shadow-2xl
          sm:shadow-black/10
        "
      >
        {/* ====================================================
            TOP RIGHT THEME BUTTON
            ==================================================== */}
        <button
          type="button"
          onClick={() =>
            setTheme(
              resolvedTheme === "dark"
                ? "light"
                : "dark"
            )
          }
          aria-label={
            resolvedTheme === "dark"
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
          className="
            absolute
            right-5
            top-5
            z-20
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-border
            bg-card
            text-foreground
            shadow-sm
            transition-all
            duration-200
            hover:border-[#d8a944]
            hover:text-[#d8a944]
            sm:right-6
            sm:top-6
          "
        >
          {resolvedTheme === "dark" ? (
            <FiSun size={17} />
          ) : (
            <FiMoon size={17} />
          )}
        </button>

        {/* ====================================================
            GOLD GLOW
            ==================================================== */}
        <div
          className="
            pointer-events-none
            absolute
            -top-32
            left-1/2
            h-72
            w-72
            -translate-x-1/2
            rounded-full
            bg-[#d8a944]/10
            blur-3xl
          "
          aria-hidden="true"
        />

        <div
          className="
            relative
            px-5
            pb-8
            pt-12
            sm:px-7
            sm:pb-9
            sm:pt-14
          "
        >
          {/* ==================================================
              PROFILE HEADER
              ================================================== */}
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="relative">
              <div
                className="
                  absolute
                  inset-0
                  rounded-full
                  bg-[#d8a944]/20
                  blur-2xl
                "
                aria-hidden="true"
              />

              <div
                className="
                  relative
                  rounded-full
                  border
                  border-[#d8a944]/70
                  p-[3px]
                "
              >
                <div className="rounded-full bg-background p-[3px]">
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    width={112}
                    height={112}
                    priority
                    className="
                      h-24
                      w-24
                      rounded-full
                      object-cover
                      sm:h-28
                      sm:w-28
                    "
                  />
                </div>
              </div>
            </div>

            {/* Name */}
            <h1
              className="
                mt-5
                text-2xl
                font-semibold
                tracking-[-0.02em]
                text-foreground
                sm:text-[28px]
              "
            >
              {profile.name}
            </h1>

            {/* Title */}
            {profile.title && (
              <p
                className="
                  mt-1
                  text-sm
                  font-medium
                  text-[#c99b36]
                  dark:text-[#d8a944]
                "
              >
                {profile.title}
              </p>
            )}

            {/* Company */}
            {profile.company && (
              <p className="mt-1 text-xs text-muted-foreground">
                {profile.company}
              </p>
            )}

            {/* ==================================================
                4 SOCIALS + 1 SHARE
                ================================================== */}
            <div className="mt-6 flex items-center justify-center gap-3">
              {socials.slice(0, 4).map(
                (social, index) => (
                  <a
                    key={`${social.platform}-${index}`}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className={iconButtonClass}
                  >
                    {getSocialIcon(
                      social.platform
                    )}
                  </a>
                )
              )}

              {/* Share */}
              <button
                type="button"
                onClick={handleShare}
                aria-label="Share profile"
                className={iconButtonClass}
              >
                <FiShare2 size={17} />
              </button>
            </div>
          </div>

          {/* ==================================================
              CONTACT INFORMATION
              ================================================== */}
          <div className="mt-7 space-y-3">
            {/* Phone */}
            {profile.phone && (
              <a
                href={`tel:${profile.phone}`}
                className={contactRowClass}
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#d8a944]/10
                    text-[#c99b36]
                    dark:text-[#d8a944]
                  "
                >
                  <FiPhone size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className="
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-wider
                      text-muted-foreground
                    "
                  >
                    Phone
                  </p>

                  <p className="mt-0.5 truncate text-sm font-medium text-foreground">
                    {profile.phone}
                  </p>
                </div>

                <FiPhone
                  size={16}
                  className="
                    text-[#c99b36]
                    transition-transform
                    group-hover:translate-x-0.5
                    dark:text-[#d8a944]
                  "
                />
              </a>
            )}

            {/* WhatsApp */}
            {profile.whatsapp && (
              <a
                href={`https://wa.me/${profile.whatsapp.replace(
                  /\D/g,
                  ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={contactRowClass}
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#d8a944]/10
                    text-[#c99b36]
                    dark:text-[#d8a944]
                  "
                >
                  <FaWhatsapp size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className="
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-wider
                      text-muted-foreground
                    "
                  >
                    WhatsApp
                  </p>

                  <p className="mt-0.5 truncate text-sm font-medium text-foreground">
                    {profile.whatsapp}
                  </p>
                </div>

                <FaWhatsapp
                  size={16}
                  className="
                    text-[#c99b36]
                    dark:text-[#d8a944]
                  "
                />
              </a>
            )}

            {/* Email */}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className={contactRowClass}
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#d8a944]/10
                    text-[#c99b36]
                    dark:text-[#d8a944]
                  "
                >
                  <FiMail size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className="
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-wider
                      text-muted-foreground
                    "
                  >
                    Email
                  </p>

                  <p className="mt-0.5 truncate text-sm font-medium text-foreground">
                    {profile.email}
                  </p>
                </div>

                <FiMail
                  size={16}
                  className="
                    text-[#c99b36]
                    transition-transform
                    group-hover:translate-x-0.5
                    dark:text-[#d8a944]
                  "
                />
              </a>
            )}

            {/* Website */}
            {profile.website && (
              <a
                href={
                  profile.website.startsWith(
                    "http"
                  )
                    ? profile.website
                    : `https://${profile.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className={contactRowClass}
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#d8a944]/10
                    text-[#c99b36]
                    dark:text-[#d8a944]
                  "
                >
                  <FiGlobe size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className="
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-wider
                      text-muted-foreground
                    "
                  >
                    Website
                  </p>

                  <p className="mt-0.5 truncate text-sm font-medium text-foreground">
                    {profile.website.replace(
                      /^https?:\/\//,
                      ""
                    )}
                  </p>
                </div>

                <FiGlobe
                  size={16}
                  className="
                    text-[#c99b36]
                    transition-transform
                    group-hover:translate-x-0.5
                    dark:text-[#d8a944]
                  "
                />
              </a>
            )}

            {/* Location */}
            {profile.location && (
              <a
                href={
                  profile.locationUrl ||
                  undefined
                }
                target={
                  profile.locationUrl
                    ? "_blank"
                    : undefined
                }
                rel={
                  profile.locationUrl
                    ? "noopener noreferrer"
                    : undefined
                }
                onClick={
                  !profile.locationUrl
                    ? (event) =>
                        event.preventDefault()
                    : undefined
                }
                className={contactRowClass}
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#d8a944]/10
                    text-[#c99b36]
                    dark:text-[#d8a944]
                  "
                >
                  <FiMapPin size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className="
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-wider
                      text-muted-foreground
                    "
                  >
                    Location
                  </p>

                  <p className="mt-0.5 truncate text-sm font-medium text-foreground">
                    {profile.location}
                  </p>
                </div>

                <FiMapPin
                  size={16}
                  className="
                    text-[#c99b36]
                    transition-transform
                    group-hover:translate-x-0.5
                    dark:text-[#d8a944]
                  "
                />
              </a>
            )}
          </div>

          {/* ==================================================
              SAVE CONTACT
              ================================================== */}
          <Button
            type="button"
            onClick={handleSaveContact}
            className="
              mt-5
              h-14
              w-full
              rounded-2xl
              border-0
              bg-[#e5b94f]
              text-sm
              font-semibold
              text-black
              shadow-[0_8px_30px_rgba(229,185,79,0.15)]
              transition-all
              hover:bg-[#efc968]
              hover:text-black
              active:scale-[0.99]
            "
          >
            <FiUserPlus
              size={18}
              className="mr-2"
            />

            Save Contact
          </Button>

          {/* ==================================================
              DEXTAP
              ================================================== */}
          <a
            href="https://dextap.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-8
              flex
              w-full
              items-center
              justify-center
              gap-1.5
              text-xs
              font-medium
              text-muted-foreground
              transition-opacity
              hover:opacity-70
              sm:w-fit
              sm:justify-start
            "
            aria-label="Powered by DexTap"
          >
            <Nfc
              className="h-3.5 w-3.5"
              strokeWidth={2}
            />

            <span>
              Powered by{" "}
              <span className="font-semibold text-foreground">
                DexTap
              </span>
            </span>
          </a>
        </div>
      </section>
    </main>
  );
}