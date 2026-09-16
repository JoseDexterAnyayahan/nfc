"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import type { BusinessProfile } from "@/lib/profiles";

import {
  FiArrowUpRight,
  FiCoffee,
  FiMail,
  FiMapPin,
  FiMoon,
  FiPhone,
  FiShare2,
  FiStar,
  FiSun,
  FiUserPlus,
} from "react-icons/fi";

import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";

import { Nfc } from "lucide-react";
import { Button } from "@/components/ui/button";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type Props = {
  profile: BusinessProfile;
};

/* ============================================================
   VCARD HELPERS
   ============================================================ */

function escapeVCardValue(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

async function imageToBase64(imageUrl: string): Promise<{
  base64: string;
  mimeType: string;
} | null> {
  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to load image: ${response.status}`);
    }

    const blob = await response.blob();
    const mimeType = blob.type || "image/jpeg";

    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result;

        if (typeof result !== "string") {
          reject(new Error("Unable to convert image"));
          return;
        }

        const commaIndex = result.indexOf(",");

        if (commaIndex === -1) {
          reject(new Error("Invalid image data"));
          return;
        }

        resolve(result.substring(commaIndex + 1));
      };

      reader.onerror = () => {
        reject(new Error("Failed to read image"));
      };

      reader.readAsDataURL(blob);
    });

    return {
      base64,
      mimeType,
    };
  } catch (error) {
    console.error("Unable to load business logo:", error);
    return null;
  }
}

/* ============================================================
   SOCIAL ICON
   ============================================================ */

function getSocialIcon(platform: string) {
  switch (platform.toLowerCase()) {
    case "facebook":
      return <FaFacebookF size={15} />;

    case "instagram":
      return <FaInstagram size={17} />;

    case "tiktok":
      return <FaTiktok size={16} />;

    default:
      return null;
  }
}

/* ============================================================
   COMPONENT
   ============================================================ */

export default function BusinessCoffee({ profile }: Props) {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const socials = profile.socials ?? [];

  /* ==========================================================
     SHARE
     ========================================================== */

  const handleShare = async () => {
    if (typeof window === "undefined") return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: profile.businessName,
          text: profile.tagline
            ? `${profile.businessName} — ${profile.tagline}`
            : profile.businessName,
          url: window.location.href,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {
      // User cancelled sharing.
    }
  };

  /* ==========================================================
     SAVE CONTACT
     ========================================================== */

  const handleSaveContact = async () => {
    try {
      const contactName =
        profile.contactName?.trim() || profile.businessName.trim();

      const nameParts = contactName.split(/\s+/);

      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      const logo = profile.logo ? await imageToBase64(profile.logo) : null;

      const lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",

        `FN:${escapeVCardValue(contactName)}`,

        `N:${escapeVCardValue(lastName)};${escapeVCardValue(firstName)};;;`,

        `ORG:${escapeVCardValue(profile.businessName)}`,

        profile.contactTitle
          ? `TITLE:${escapeVCardValue(profile.contactTitle)}`
          : "",

        profile.phone ? `TEL;TYPE=CELL:${escapeVCardValue(profile.phone)}` : "",

        profile.email
          ? `EMAIL;TYPE=INTERNET:${escapeVCardValue(profile.email)}`
          : "",

        profile.website ? `URL:${escapeVCardValue(profile.website)}` : "",

        profile.location
          ? `ADR;TYPE=WORK:;;${escapeVCardValue(profile.location)};;;;`
          : "",
      ];

      if (logo) {
        const imageType = logo.mimeType.toLowerCase().includes("png")
          ? "PNG"
          : "JPEG";

        lines.push(`PHOTO;ENCODING=b;TYPE=${imageType}:${logo.base64}`);
      }

      lines.push("END:VCARD");

      const vcard = lines.filter(Boolean).join("\r\n");

      const blob = new Blob([vcard], {
        type: "text/vcard;charset=utf-8",
      });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = `${profile.businessName
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase()}.vcf`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);
    } catch (error) {
      console.error("Failed to create contact:", error);

      alert("Unable to save the contact. Please try again.");
    }
  };

  /* ==========================================================
     STYLES
     ========================================================== */

  const iconButtonClass = `
    flex
    h-11
    w-11
    shrink-0
    items-center
    justify-center
    rounded-full
    border
    border-border/80
    bg-background/80
    text-foreground
    backdrop-blur-sm
    transition-all
    duration-200
    hover:-translate-y-0.5
    hover:border-[#8b5e3c]/50
    hover:bg-[#8b5e3c]/5
    hover:text-[#70462f]
    hover:shadow-sm
    dark:hover:border-[#b88963]/50
    dark:hover:bg-[#b88963]/10
    dark:hover:text-[#c49a78]
  `;

  const contactCardClass = `
    group
    flex
    items-center
    gap-4
    rounded-2xl
    border
    border-border/80
    bg-background
    px-4
    py-4
    transition-all
    duration-200
    hover:-translate-y-0.5
    hover:border-[#8b5e3c]/40
    hover:shadow-md
    dark:hover:border-[#b88963]/40
  `;

  return (
    <main
      className={`
        ${poppins.className}
        min-h-dvh
        w-full
        bg-[#e8dfd5]
        text-[#201814]
        dark:bg-[#0a0807]
        dark:text-[#f2ece6]
        sm:flex
        sm:items-center
        sm:justify-center
        sm:px-6
        sm:py-10
      `}
    >
      {/* ======================================================
          DESKTOP AMBIENT BACKGROUND
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
            -left-40
            -top-40
            h-[520px]
            w-[520px]
            rounded-full
            bg-[#8b5e3c]/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-48
            -right-40
            h-[560px]
            w-[560px]
            rounded-full
            bg-[#5b3928]/10
            blur-3xl
          "
        />
      </div>

      {/* ======================================================
          PHONE / PROFILE
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
          sm:shadow-black/15
        "
      >
        {/* ====================================================
            THEME TOGGLE
            ==================================================== */}

        <button
          type="button"
          onClick={() => {
            if (!mounted) return;

            setTheme(resolvedTheme === "dark" ? "light" : "dark");
          }}
          aria-label={
            !mounted
              ? "Toggle theme"
              : resolvedTheme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
          }
          className="
            absolute
            right-5
            top-5
            z-40
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/25
            bg-black/25
            text-white
            shadow-lg
            backdrop-blur-md
            transition-all
            hover:scale-105
            hover:bg-black/40
            sm:right-6
            sm:top-6
          "
        >
          {!mounted ? (
            <FiSun size={17} />
          ) : resolvedTheme === "dark" ? (
            <FiSun size={17} />
          ) : (
            <FiMoon size={17} />
          )}
        </button>

        {/* ====================================================
            HERO BANNER
            ==================================================== */}

        <div
          className="
            relative
            h-[210px]
            w-full
            overflow-hidden
            bg-[#3b2418]
          "
        >
          {profile.banner ? (
            <Image
              src={profile.banner}
              alt={`${profile.businessName} banner`}
              fill
              priority
              sizes="430px"
              className="object-cover"
            />
          ) : (
            <div
              className="
                absolute
                inset-0
                bg-[#3b2418]
              "
            />
          )}

          {/* Dark cinematic overlay */}

          <div
            className="
              absolute
              inset-0
              bg-black/20
            "
          />

          {/* Warm bottom fade */}

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-32
              bg-gradient-to-t
              from-black/60
              via-black/15
              to-transparent
            "
          />
        </div>

        {/* ====================================================
            CENTER LOGO
            ==================================================== */}

        <div
          className="
    relative
    -mt-14

    flex
    justify-center
    z-10
  "
        >
          <div
            className="
      relative

      h-28
      w-28

      overflow-hidden

      rounded-full

      border-[5px]
      border-background

      bg-background

      shadow-xl
    "
          >
            <Image
              src={profile.logo}
              alt={profile.businessName}
              fill
              sizes="112px"
              className="
        object-contain
      "
            />
          </div>
        </div>

        {/* ====================================================
            CONTENT
            ==================================================== */}

        <div
          className="
            px-5
            pb-10
            pt-5
            sm:px-7
          "
        >
          {/* ==================================================
              BUSINESS IDENTITY
              ================================================== */}

          <div className="text-center">
            <p
              className="
                mb-2
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-[#8b5e3c]
                dark:text-[#b88963]
              "
            >
              Welcome to
            </p>

            <h1
              className="
                text-[28px]
                font-semibold
                leading-tight
                tracking-[-0.04em]
                text-foreground
              "
            >
              {profile.businessName}
            </h1>

            {profile.tagline && (
              <p
                className="
                  mx-auto
                  mt-2
                  max-w-[320px]
                  text-sm
                  leading-relaxed
                  text-muted-foreground
                "
              >
                {profile.tagline}
              </p>
            )}

            {profile.contactName && (
              <div className="mt-4">
                <p
                  className="
                    text-sm
                    font-semibold
                    text-foreground
                  "
                >
                  {profile.contactName}
                </p>

                {profile.contactTitle && (
                  <p
                    className="
                      mt-0.5
                      text-xs
                      text-muted-foreground
                    "
                  >
                    {profile.contactTitle}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* ==================================================
              SOCIALS
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
            {socials.slice(0, 4).map((social, index) => {
              const icon = getSocialIcon(social.platform);

              if (!icon) return null;

              return (
                <a
                  key={`${social.platform}-${index}`}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className={iconButtonClass}
                >
                  {icon}
                </a>
              );
            })}

            <button
              type="button"
              onClick={handleShare}
              aria-label="Share business profile"
              className={iconButtonClass}
            >
              <FiShare2 size={17} />
            </button>
          </div>

          {/* ==================================================
              DECORATIVE DIVIDER
              ================================================== */}

          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />

            <FiCoffee
              size={14}
              className="
                text-[#8b5e3c]
                dark:text-[#b88963]
              "
            />

            <div className="h-px flex-1 bg-border" />
          </div>

          {/* ==================================================
              GOOGLE REVIEW CARD
              ================================================== */}

          {profile.reviewUrl && (
            <a
              href={profile.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                relative
                block
                overflow-hidden
                rounded-[1.35rem]
                border
                border-[#8b5e3c]/25
                bg-[#8b5e3c]/[0.07]
                px-5
                py-5
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-[#8b5e3c]/50
                hover:shadow-lg
                dark:border-[#b88963]/25
                dark:bg-[#b88963]/[0.08]
                dark:hover:border-[#b88963]/50
              "
            >
              <div
                className="
                  relative
                  flex
                  items-center
                  gap-4
                "
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#3b2418]
                    text-[#fff8f1]
                    shadow-md
                    dark:bg-[#b88963]
                    dark:text-[#1a110c]
                  "
                >
                  <FiStar size={20} strokeWidth={2} />
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-[#70462f]
                      dark:text-[#c49a78]
                    "
                  >
                    Your feedback matters
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      font-semibold
                      text-foreground
                    "
                  >
                    Enjoyed your coffee?
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-xs
                      text-muted-foreground
                    "
                  >
                    Leave us a Google review
                  </p>
                </div>

                <FiArrowUpRight
                  size={19}
                  className="
                    shrink-0
                    text-[#8b5e3c]
                    transition-transform
                    duration-200
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    dark:text-[#b88963]
                  "
                />
              </div>
            </a>
          )}

          {/* ==================================================
              CONTACT
              ================================================== */}

          <div className="mt-5 space-y-3">
            {profile.phone && (
              <a href={`tel:${profile.phone}`} className={contactCardClass}>
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#8b5e3c]/10
                    text-[#70462f]
                    transition-colors
                    group-hover:bg-[#8b5e3c]/15
                    dark:bg-[#b88963]/10
                    dark:text-[#c49a78]
                  "
                >
                  <FiPhone size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-muted-foreground
                    "
                  >
                    Call us
                  </p>

                  <p
                    className="
                      mt-1
                      truncate
                      text-sm
                      font-medium
                    "
                  >
                    {profile.phone}
                  </p>
                </div>

                <FiArrowUpRight
                  size={16}
                  className="
                    text-[#8b5e3c]
                    dark:text-[#b88963]
                  "
                />
              </a>
            )}

            {profile.email && (
              <a href={`mailto:${profile.email}`} className={contactCardClass}>
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#8b5e3c]/10
                    text-[#70462f]
                    dark:bg-[#b88963]/10
                    dark:text-[#c49a78]
                  "
                >
                  <FiMail size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-muted-foreground
                    "
                  >
                    Email
                  </p>

                  <p
                    className="
                      mt-1
                      truncate
                      text-sm
                      font-medium
                    "
                  >
                    {profile.email}
                  </p>
                </div>

                <FiArrowUpRight
                  size={16}
                  className="
                    text-[#8b5e3c]
                    dark:text-[#b88963]
                  "
                />
              </a>
            )}
          </div>

          {/* ==================================================
              LOCATION
              ================================================== */}

          {profile.location && (
            <div className="mt-5">
              <div className="mb-3 flex items-end justify-between">
                <div>
                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-[#8b5e3c]
                      dark:text-[#b88963]
                    "
                  >
                    Visit us
                  </p>

                  <h2
                    className="
                      mt-1
                      text-base
                      font-semibold
                    "
                  >
                    Find our coffee shop
                  </h2>
                </div>

                <FiMapPin
                  size={18}
                  className="
                    text-[#8b5e3c]
                    dark:text-[#b88963]
                  "
                />
              </div>

              <div
                className="
                  overflow-hidden
                  rounded-[1.35rem]
                  border
                  border-border
                  bg-muted
                  shadow-sm
                "
              >
                <div
                  className="
                    relative
                    h-[205px]
                    w-full
                  "
                >
                  <iframe
                    title={`${profile.businessName} location`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      profile.location,
                    )}&output=embed`}
                    className="
                      h-full
                      w-full
                      border-0
                    "
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                  <div
                    className="
                      pointer-events-none
                      absolute
                      left-3
                      top-3
                      flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-border/50
                      bg-background/95
                      px-3
                      py-1.5
                      text-[10px]
                      font-semibold
                      shadow-md
                      backdrop-blur
                    "
                  >
                    <FiMapPin
                      size={13}
                      className="
                        text-[#8b5e3c]
                        dark:text-[#b88963]
                      "
                    />

                    <span>Our Location</span>
                  </div>
                </div>

                {profile.locationUrl && (
                  <a
                    href={profile.locationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      border-t
                      border-border
                      px-4
                      py-3
                      text-xs
                      font-semibold
                      text-[#70462f]
                      transition-colors
                      hover:bg-[#8b5e3c]/5
                      dark:text-[#c49a78]
                      dark:hover:bg-[#b88963]/5
                    "
                  >
                    Open in Google Maps
                    <FiArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* ==================================================
              ADD TO CONTACTS
              ================================================== */}

          <Button
            type="button"
            onClick={handleSaveContact}
            className="
              mt-6
              h-14
              w-full
              rounded-2xl
              border-0
              bg-[#3b2418]
              text-sm
              font-semibold
              text-[#fff8f1]
              shadow-lg
              shadow-[#3b2418]/20
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-[#4b2d1e]
              hover:text-[#fff8f1]
              hover:shadow-xl
              active:translate-y-0
              active:scale-[0.99]
              dark:bg-[#b88963]
              dark:text-[#1a110c]
              dark:hover:bg-[#c49a78]
              dark:hover:text-[#1a110c]
            "
          >
            <FiUserPlus size={18} className="mr-2" />
            Add to Contacts
          </Button>

          {/* ==================================================
              FOOTER
              ================================================== */}

          <div
            className="
              mt-9
              flex
              flex-col
              items-center
              gap-3
            "
          >
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-border" />

              <FiCoffee
                size={13}
                className="
                  text-[#8b5e3c]
                  dark:text-[#b88963]
                "
              />

              <div className="h-px w-8 bg-border" />
            </div>

            <a
              href="https://dextap.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                items-center
                justify-center
                gap-1.5
                text-[11px]
                font-medium
                text-muted-foreground
                transition-opacity
                hover:opacity-70
              "
              aria-label="Powered by DexTap"
            >
              <Nfc className="h-3.5 w-3.5" strokeWidth={2} />

              <span>
                Powered by{" "}
                <span className="font-semibold text-foreground">DexTap</span>
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
