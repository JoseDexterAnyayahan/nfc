"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import type { BusinessProfile } from "@/lib/profiles";

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
  profile: BusinessProfile;
};

/*
 * ============================================================
 * VCARD HELPERS
 * ============================================================
 */

function escapeVCardValue(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

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
        `Failed to load image: ${response.status}`
      );
    }

    const blob = await response.blob();

    const mimeType =
      blob.type || "image/jpeg";

    const base64 = await new Promise<string>(
      (resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          const result = reader.result;

          if (typeof result !== "string") {
            reject(
              new Error(
                "Unable to convert image"
              )
            );

            return;
          }

          const commaIndex =
            result.indexOf(",");

          if (commaIndex === -1) {
            reject(
              new Error(
                "Invalid image data"
              )
            );

            return;
          }

          resolve(
            result.substring(
              commaIndex + 1
            )
          );
        };

        reader.onerror = () => {
          reject(
            new Error(
              "Failed to read image"
            )
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
      "Unable to load profile image:",
      error
    );

    return null;
  }
}

export default function BusinessBanner({
  profile,
}: Props) {
  const {
    resolvedTheme,
    setTheme,
  } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const socials =
    profile.socials ?? [];

  /*
   * ============================================================
   * SHARE
   * ============================================================
   */

  const handleShare = async () => {
    if (
      typeof window === "undefined"
    ) {
      return;
    }

    try {
      if (navigator.share) {
        await navigator.share({
          title: profile.businessName,

          text: profile.tagline
            ? `${profile.businessName} — ${profile.tagline}`
            : profile.businessName,

          url: window.location.href,
        });
      } else if (
        navigator.clipboard
      ) {
        await navigator.clipboard.writeText(
          window.location.href
        );
      }
    } catch {
      // User cancelled share.
    }
  };

  /*
   * ============================================================
   * SAVE BUSINESS CONTACT
   * ============================================================
   */

  const handleSaveContact = async () => {
    try {
      /*
       * If a contact person exists,
       * use their name as the contact name.
       *
       * Otherwise use the business name.
       */
      const contactName =
        profile.contactName?.trim() ||
        profile.businessName.trim();

      /*
       * Split contact name for N field.
       */
      const nameParts =
        contactName.split(/\s+/);

      const firstName =
        nameParts[0] || "";

      const lastName =
        nameParts
          .slice(1)
          .join(" ") || "";

      /*
       * Get avatar.
       *
       * The representative's avatar is used
       * as the contact photo.
       */
      const avatar = profile.avatar
        ? await imageToBase64(
            profile.avatar
          )
        : null;

      const lines = [
        "BEGIN:VCARD",

        "VERSION:3.0",

        /*
         * Actual person's name.
         */
        `FN:${escapeVCardValue(
          contactName
        )}`,

        /*
         * Structured name.
         */
        `N:${escapeVCardValue(
          lastName
        )};${escapeVCardValue(
          firstName
        )};;;`,

        /*
         * Business name.
         *
         * This remains the organization.
         */
        `ORG:${escapeVCardValue(
          profile.businessName
        )}`,

        /*
         * Contact person's position.
         */
        profile.contactTitle
          ? `TITLE:${escapeVCardValue(
              profile.contactTitle
            )}`
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
          ? `URL:${escapeVCardValue(
              profile.website
            )}`
          : "",

        /*
         * Address.
         */
        profile.location
          ? `ADR;TYPE=WORK:;;${escapeVCardValue(
              profile.location
            )};;;;`
          : "",
      ];

      /*
       * ========================================================
       * EMBED AVATAR
       * ========================================================
       */

      if (avatar) {
        const imageType =
          avatar.mimeType
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
       * Create vCard.
       */
      const vcard = lines
        .filter(Boolean)
        .join("\r\n");

      const blob = new Blob(
        [vcard],
        {
          type: "text/vcard;charset=utf-8",
        }
      );

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      /*
       * File name is based on
       * the contact person's name.
       */
      link.download = `${contactName
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase()}.vcf`;

      document.body.appendChild(
        link
      );

      link.click();

      document.body.removeChild(
        link
      );

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

  const getSocialIcon = (
    platform: string
  ) => {
    switch (
      platform.toLowerCase()
    ) {
      case "facebook":
        return (
          <FaFacebookF size={16} />
        );

      case "instagram":
        return (
          <FaInstagram size={17} />
        );

      case "linkedin":
        return (
          <FaLinkedinIn size={16} />
        );

      case "tiktok":
        return (
          <FaTiktok size={17} />
        );

      case "youtube":
        return (
          <FaYoutube size={17} />
        );

      case "x":
        return (
          <FaXTwitter size={16} />
        );

      default:
        return (
          <FiGlobe size={17} />
        );
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
    bg-background
    text-foreground
    transition-all
    duration-200
    hover:border-[#2f80ed]
    hover:text-[#2f80ed]
  `;

  const contactRowClass = `
    group
    flex
    items-center
    gap-4
    rounded-xl
    border
    border-border
    bg-background
    px-4
    py-3
    transition-all
    duration-200
    hover:border-[#2f80ed]/50
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
          BACKGROUND
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
            bg-[#2f80ed]/10
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
            bg-[#2f80ed]/10
            blur-3xl
          "
        />
      </div>

      {/* ======================================================
          PHONE PROFILE
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
            THEME TOGGLE
            ==================================================== */}

        <button
          type="button"
          onClick={() =>
            setTheme(
              resolvedTheme ===
                "dark"
                ? "light"
                : "dark"
            )
          }
          aria-label={
            !mounted
              ? "Toggle theme"
              : resolvedTheme ===
                "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
          }
          className="
            absolute
            right-5
            top-5
            z-30

            flex
            h-10
            w-10
            items-center
            justify-center

            rounded-full
            border
            border-white/30

            bg-black/10
            text-white

            backdrop-blur-md

            transition-all

            hover:bg-black/20

            sm:right-6
            sm:top-6
          "
        >
          {mounted &&
            (resolvedTheme ===
            "dark" ? (
              <FiSun size={17} />
            ) : (
              <FiMoon size={17} />
            ))}
        </button>

        {/* ====================================================
            BANNER
            ==================================================== */}

        <div
          className="
            relative
            h-[190px]
            w-full
            overflow-hidden
            bg-[#2f80ed]
          "
        >
          {profile.banner ? (
            <Image
              src={profile.banner}
              alt={`${profile.businessName} banner`}
              fill
              priority
              className="
                object-cover
              "
            />
          ) : (
            <div
              className="
                absolute
                inset-0
                bg-[#2f80ed]
              "
            />
          )}

          {/* Banner overlay */}
          <div
            className="
              absolute
              inset-0
              bg-black/10
            "
          />

          {/* ==================================================
              BUSINESS LOGO
              ================================================== */}

          <div
            className="
              absolute
              left-1/2
              top-8
              flex
              -translate-x-1/2
              flex-col
              items-center
            "
          >
            <div
              className="
                relative
                h-16
                w-16
                overflow-hidden
                rounded-xl
                bg-white
                p-2
                shadow-lg
              "
            >
              <Image
                src={profile.logo}
                alt={profile.businessName}
                fill
                className="
                  object-contain
                  p-2
                "
              />
            </div>

            <p
              className="
                mt-2
                max-w-[280px]
                text-center
                text-sm
                font-semibold
                tracking-wide
                text-white
                drop-shadow
              "
            >
              {profile.businessName}
            </p>
          </div>
        </div>

        {/* ====================================================
            CONTENT
            ==================================================== */}

        <div
          className="
            relative
            px-5
            pb-8
            sm:px-7
          "
        >
          {/* ==================================================
              AVATAR
              ================================================== */}

          {profile.avatar && (
            <div
              className="
                relative
                -mt-14
                flex
                justify-center
              "
            >
              <div
                className="
                  rounded-2xl
                  bg-background
                  p-1.5
                  shadow-lg
                "
              >
                <div
                  className="
                    relative
                    h-28
                    w-28
                    overflow-hidden
                    rounded-xl
                    border
                    border-border
                  "
                >
                  <Image
                    src={profile.avatar}
                    alt={
                      profile.contactName ||
                      profile.businessName
                    }
                    fill
                    className="
                      object-cover
                    "
                  />
                </div>
              </div>
            </div>
          )}

          {/* ==================================================
              BUSINESS INFORMATION
              ================================================== */}

          <div className="text-center">
            <h1
              className="
                mt-4
                text-2xl
                font-semibold
                tracking-tight
                text-foreground
              "
            >
              {profile.businessName}
            </h1>

            {profile.contactName && (
              <p
                className="
                  mt-1
                  text-sm
                  font-medium
                  text-foreground
                "
              >
                {profile.contactName}
              </p>
            )}

            {profile.contactTitle && (
              <p
                className="
                  mt-0.5
                  text-sm
                  text-muted-foreground
                "
              >
                {profile.contactTitle}
              </p>
            )}

            {profile.tagline && (
              <p
                className="
                  mt-2
                  text-sm
                  text-muted-foreground
                "
              >
                {profile.tagline}
              </p>
            )}
          </div>

          {/* ==================================================
              SOCIALS + SHARE
              MAX 4 SOCIALS + 1 SHARE
              ================================================== */}

          <div
            className="
              mt-6
              flex
              items-center
              justify-center
              gap-3
            "
          >
            {socials
              .slice(0, 4)
              .map(
                (
                  social,
                  index
                ) => (
                  <a
                    key={`${social.platform}-${index}`}
                    href={
                      social.url
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={
                      social.platform
                    }
                    className={
                      iconButtonClass
                    }
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
              onClick={
                handleShare
              }
              aria-label="Share business profile"
              className={
                iconButtonClass
              }
            >
              <FiShare2
                size={17}
              />
            </button>
          </div>

          {/* ==================================================
              CONTACT INFORMATION
              ================================================== */}

          <div
            className="
              mt-7
              space-y-3
            "
          >
            {/* Phone */}
            {profile.phone && (
              <a
                href={`tel:${profile.phone}`}
                className={
                  contactRowClass
                }
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#2f80ed]/10
                    text-[#2f80ed]
                  "
                >
                  <FiPhone
                    size={18}
                  />
                </div>

                <div
                  className="
                    min-w-0
                    flex-1
                  "
                >
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

                  <p
                    className="
                      mt-0.5
                      truncate
                      text-sm
                      font-medium
                    "
                  >
                    {profile.phone}
                  </p>
                </div>

                <FiPhone
                  size={16}
                  className="
                    text-[#2f80ed]
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
                className={
                  contactRowClass
                }
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#2f80ed]/10
                    text-[#2f80ed]
                  "
                >
                  <FaWhatsapp
                    size={18}
                  />
                </div>

                <div
                  className="
                    min-w-0
                    flex-1
                  "
                >
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

                  <p
                    className="
                      mt-0.5
                      truncate
                      text-sm
                      font-medium
                    "
                  >
                    {profile.whatsapp}
                  </p>
                </div>

                <FaWhatsapp
                  size={17}
                  className="
                    text-[#2f80ed]
                  "
                />
              </a>
            )}

            {/* Email */}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className={
                  contactRowClass
                }
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#2f80ed]/10
                    text-[#2f80ed]
                  "
                >
                  <FiMail
                    size={18}
                  />
                </div>

                <div
                  className="
                    min-w-0
                    flex-1
                  "
                >
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

                  <p
                    className="
                      mt-0.5
                      truncate
                      text-sm
                      font-medium
                    "
                  >
                    {profile.email}
                  </p>
                </div>

                <FiMail
                  size={16}
                  className="
                    text-[#2f80ed]
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
                className={
                  contactRowClass
                }
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#2f80ed]/10
                    text-[#2f80ed]
                  "
                >
                  <FiGlobe
                    size={18}
                  />
                </div>

                <div
                  className="
                    min-w-0
                    flex-1
                  "
                >
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

                  <p
                    className="
                      mt-0.5
                      truncate
                      text-sm
                      font-medium
                    "
                  >
                    {profile.website.replace(
                      /^https?:\/\//,
                      ""
                    )}
                  </p>
                </div>

                <FiGlobe
                  size={16}
                  className="
                    text-[#2f80ed]
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
                className={
                  contactRowClass
                }
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#2f80ed]/10
                    text-[#2f80ed]
                  "
                >
                  <FiMapPin
                    size={18}
                  />
                </div>

                <div
                  className="
                    min-w-0
                    flex-1
                  "
                >
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

                  <p
                    className="
                      mt-0.5
                      text-sm
                      font-medium
                    "
                  >
                    {profile.location}
                  </p>
                </div>

                <FiMapPin
                  size={16}
                  className="
                    text-[#2f80ed]
                  "
                />
              </a>
            )}
          </div>

          {/* ==================================================
              ADD TO CONTACTS
              ================================================== */}

          <Button
            type="button"
            onClick={
              handleSaveContact
            }
            className="
              mt-5
              h-14
              w-full
              rounded-xl

              bg-[#2f80ed]
              text-white

              text-sm
              font-semibold

              shadow-lg
              shadow-[#2f80ed]/20

              transition-all

              hover:bg-[#2474df]
              hover:text-white

              active:scale-[0.99]
            "
          >
            <FiUserPlus
              size={19}
              className="mr-2"
            />

            Add to Contacts
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
              className="
                h-3.5
                w-3.5
              "
              strokeWidth={2}
            />

            <span>
              Powered by{" "}
              <span
                className="
                  font-semibold
                  text-foreground
                "
              >
                DexTap
              </span>
            </span>
          </a>
        </div>
      </section>
    </main>
  );
}