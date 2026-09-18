"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import {
  FiCopy,
  FiLink,
  FiMail,
  FiMoon,
  FiPhone,
  FiSun,
  FiUserPlus,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa6";

import type { PersonalProfile } from "@/lib/profiles";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/* ============================================================
   SOCIAL ICON
============================================================ */

function SocialIcon({ platform }: { platform: string }) {
  switch (platform.toLowerCase()) {
    case "facebook":
      return <FaFacebookF size={29} />;

    case "instagram":
      return <FaInstagram size={31} />;

    case "linkedin":
      return <FaLinkedinIn size={29} />;

    case "tiktok":
      return <FaTiktok size={31} />;

    case "youtube":
      return <FaYoutube size={31} />;

    case "whatsapp":
      return <FaWhatsapp size={32} />;

    default:
      return <FiLink size={29} />;
  }
}

/* ============================================================
   SOCIAL COLORS
============================================================ */

function getSocialStyle(platform: string) {
  switch (platform.toLowerCase()) {
    case "facebook":
      return {
        background: "#1877F2",
        color: "#FFFFFF",
      };

    case "instagram":
      return {
        background:
          "linear-gradient(135deg, #833AB4 0%, #E1306C 45%, #FD1D1D 70%, #FCAF45 100%)",
        color: "#FFFFFF",
      };

    case "linkedin":
      return {
        background: "#0A66C2",
        color: "#FFFFFF",
      };

    case "tiktok":
      return {
        background: "#000000",
        color: "#FFFFFF",
      };

    case "youtube":
      return {
        background: "#FF0000",
        color: "#FFFFFF",
      };

    case "whatsapp":
      return {
        background: "#25D366",
        color: "#FFFFFF",
      };

    default:
      return {
        background: "#111111",
        color: "#FFFFFF",
      };
  }
}

/* ============================================================
   SOCIAL LABEL
============================================================ */

function getSocialLabel(platform: string) {
  switch (platform.toLowerCase()) {
    case "facebook":
      return "Facebook";

    case "instagram":
      return "Instagram";

    case "linkedin":
      return "LinkedIn";

    case "tiktok":
      return "TikTok";

    case "youtube":
      return "YouTube";

    case "whatsapp":
      return "WhatsApp";

    default:
      return platform;
  }
}

/* ============================================================
   VCARD
============================================================ */

function escapeVCardValue(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/* ============================================================
   MAIN TEMPLATE
============================================================ */

export default function PersonalSocial({
  profile,
}: {
  profile: PersonalProfile;
}) {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);

  /* ============================================================
     THEME
  ============================================================ */

  useEffect(() => {
    setMounted(true);

    const storedTheme = localStorage.getItem("dextap-personal-social-theme");

    if (storedTheme === "dark") {
      setDarkMode(true);
    } else if (storedTheme === "light") {
      setDarkMode(false);
    } else {
      setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");

      localStorage.setItem("dextap-personal-social-theme", "dark");
    } else {
      root.classList.remove("dark");

      localStorage.setItem("dextap-personal-social-theme", "light");
    }
  }, [darkMode, mounted]);

  /* ============================================================
     COPY PROFILE LINK
  ============================================================ */

  const handleCopyLink = async () => {
    try {
      const profileUrl = window.location.href;

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(profileUrl);
      } else {
        const textarea = document.createElement("textarea");

        textarea.value = profileUrl;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        document.execCommand("copy");

        document.body.removeChild(textarea);
      }

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      // Clipboard unavailable.
    }
  };

  /* ============================================================
     SAVE CONTACT
  ============================================================ */

  const handleSaveContact = () => {
    const vCard = [
      "BEGIN:VCARD",
      "VERSION:3.0",

      `FN:${escapeVCardValue(profile.name)}`,

      profile.company ? `ORG:${escapeVCardValue(profile.company)}` : "",

      profile.title ? `TITLE:${escapeVCardValue(profile.title)}` : "",

      profile.email ? `EMAIL;TYPE=WORK:${escapeVCardValue(profile.email)}` : "",

      profile.phone ? `TEL;TYPE=CELL:${escapeVCardValue(profile.phone)}` : "",

      profile.website ? `URL:${escapeVCardValue(profile.website)}` : "",

      profile.location
        ? `ADR;TYPE=WORK:;;${escapeVCardValue(profile.location)};;;;`
        : "",

      "END:VCARD",
    ]
      .filter(Boolean)
      .join("\r\n");

    const blob = new Blob([vCard], {
      type: "text/vcard;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${profile.name}.vcf`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* ============================================================
     CONTACT ACTIONS
  ============================================================ */

  const handlePhone = () => {
    if (!profile.phone) return;

    window.location.href = `tel:${profile.phone}`;
  };

  const handleEmail = () => {
    if (!profile.email) return;

    window.location.href = `mailto:${profile.email}`;
  };

  /* ============================================================
     SOCIALS
  ============================================================ */

  const socials = profile.socials?.slice(0, 6) ?? [];

  return (
    <main
      className={`${poppins.variable} min-h-screen bg-[#d9dad8] px-0 py-0 font-[family-name:var(--font-poppins)] text-[#111111] transition-colors duration-500 dark:bg-[#050505] dark:text-white sm:px-4 sm:py-5 md:px-6 md:py-8`}
    >
      {/* ========================================================
          OUTER MOBILE CARD
      ========================================================= */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[520px]
          overflow-hidden
          rounded-none
          bg-[#eeeeec]
          shadow-none
          transition-colors
          duration-500
          dark:bg-[#111111]

          sm:rounded-[36px]
          sm:shadow-[0_25px_80px_rgba(0,0,0,0.15)]

          dark:sm:shadow-[0_25px_80px_rgba(0,0,0,0.5)]
        "
      >
        {/* ======================================================
            PHOTO + PROFILE CARD AREA
        ======================================================= */}

        <section className="relative h-[575px] overflow-visible">
          {/* ====================================================
              PHOTO
          ===================================================== */}

          <div className="absolute inset-x-0 top-0 h-[430px] overflow-hidden">
            {profile.avatar ? (
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                priority
                sizes="(max-width: 520px) 100vw, 520px"
                className="object-cover object-center"
              />
            ) : (
              <div className="h-full w-full bg-[#222222]" />
            )}

            {/* Subtle photo overlay */}

            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

            {/* Bottom photo fade */}

            <div className="absolute inset-x-0 bottom-0 h-[150px] bg-gradient-to-t from-black/25 via-black/5 to-transparent" />
          </div>

          {/* ====================================================
              TOP CONTROLS
          ===================================================== */}

          <div className="absolute left-5 right-5 top-5 z-40 flex items-center justify-between">
            {/* Personal Profile */}

            <div className="rounded-full border border-white/25 bg-black/25 px-4 py-2.5 text-[9px] font-medium uppercase tracking-[0.2em] text-white shadow-lg backdrop-blur-xl">
              Personal Profile
            </div>

            {/* Dark / Light */}

            {mounted ? (
              <button
                type="button"
                onClick={() => setDarkMode((value) => !value)}
                aria-label={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/25 text-white shadow-lg backdrop-blur-xl transition hover:bg-black/40 active:scale-95"
              >
                {darkMode ? <FiSun size={17} /> : <FiMoon size={17} />}
              </button>
            ) : (
              <div className="h-10 w-10 rounded-full border border-white/25 bg-black/25 backdrop-blur-xl" />
            )}
          </div>

          {/* ====================================================
              GLASS PROFILE CARD

              This deliberately overlaps the bottom edge
              of the photo.
          ===================================================== */}

          <div
            className="
              absolute
              bottom-[-45px]
              left-5
              right-5
              z-30

              overflow-hidden
              rounded-[32px]

              border
              border-white/60

              bg-white/[0.78]

              px-6
              pb-7
              pt-7

              shadow-[0_18px_55px_rgba(0,0,0,0.18)]

              backdrop-blur-2xl

              sm:left-6
              sm:right-6

              dark:border-white/20
              dark:bg-[#202020]/[0.78]
              dark:shadow-[0_18px_55px_rgba(0,0,0,0.45)]
            "
          >
            {/* Glass highlight */}

            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/90 dark:bg-white/30" />

            {/* ==================================================
                NAME
            =================================================== */}

            <div className="text-center">
              <h1 className="text-[29px] font-semibold leading-[1.08] tracking-[-0.045em] text-[#111111] dark:text-white">
                {profile.name}
              </h1>

              {profile.title && (
                <p className="mt-2 text-[13px] font-medium text-black/50 dark:text-white/50">
                  {profile.title}
                </p>
              )}
            </div>

            {/* ==================================================
                ACTION ICONS
            =================================================== */}

            <div className="mt-5 flex justify-center gap-6">
              {/* Call */}

              <button
                type="button"
                onClick={handlePhone}
                aria-label="Call"
                className="
                  flex
                  h-[52px]
                  w-[52px]
                  items-center
                  justify-center
                  rounded-full

                  border
                  border-white/90

                  bg-white/80

                  text-[#111111]

                  shadow-[0_4px_14px_rgba(0,0,0,0.06)]

                  backdrop-blur-md

                  transition
                  hover:bg-white
                  active:scale-95

                  dark:border-white/20
                  dark:bg-white/90
                  dark:text-black
                "
              >
                <FiPhone size={22} />
              </button>

              {/* Email */}

              <button
                type="button"
                onClick={handleEmail}
                aria-label="Email"
                className="
                  flex
                  h-[52px]
                  w-[52px]
                  items-center
                  justify-center
                  rounded-full

                  border
                  border-white/90

                  bg-white/80

                  text-[#111111]

                  shadow-[0_4px_14px_rgba(0,0,0,0.06)]

                  backdrop-blur-md

                  transition
                  hover:bg-white
                  active:scale-95

                  dark:border-white/20
                  dark:bg-white/90
                  dark:text-black
                "
              >
                <FiMail size={22} />
              </button>

              {/* Copy Link */}

              <button
                type="button"
                onClick={handleCopyLink}
                aria-label="Copy profile link"
                className="
                  relative
                  flex
                  h-[52px]
                  w-[52px]
                  items-center
                  justify-center
                  rounded-full

                  border
                  border-white/90

                  bg-white/80

                  text-[#111111]

                  shadow-[0_4px_14px_rgba(0,0,0,0.06)]

                  backdrop-blur-md

                  transition
                  hover:bg-white
                  active:scale-95

                  dark:border-white/20
                  dark:bg-white/90
                  dark:text-black
                "
              >
                {copied ? <FiCopy size={20} /> : <FiLink size={22} />}
              </button>
            </div>

            {/* Copy status */}

            <div className="mt-2 h-4 text-center">
              {copied && (
                <p className="text-[10px] font-medium text-black/50 dark:text-white/50">
                  Profile link copied
                </p>
              )}
            </div>

            {/* ==================================================
                SAVE CONTACT
            =================================================== */}

            <button
              type="button"
              onClick={handleSaveContact}
              className="
    mt-1
    flex
    h-[57px]
    w-full
    items-center
    justify-center
    gap-2.5
    rounded-full

    bg-[#171717]
    text-white

    shadow-[0_10px_25px_rgba(0,0,0,0.17)]

    transition
    hover:bg-black
    active:scale-[0.98]

    dark:bg-white
    dark:text-[#171717]
    dark:hover:bg-[#eeeeee]
    dark:shadow-[0_10px_25px_rgba(0,0,0,0.35)]
  "
            >
              <FiUserPlus size={19} />
              Save Contact
            </button>
          </div>
        </section>

        {/* ======================================================
            SOCIAL MEDIA SECTION

            IMPORTANT:
            This is a SEPARATE CARD just like the reference.
        ======================================================= */}

        <section className="relative z-20 px-5 pb-8 pt-16 sm:px-6">
          {socials.length > 0 && (
            <div
              className="
                rounded-[30px]

                bg-[#e3e3e1]

                p-4

                shadow-[0_5px_25px_rgba(0,0,0,0.04)]

                transition-colors
                duration-500

                dark:bg-[#1c1c1c]
                dark:shadow-none
              "
            >
              {/* ==================================================
                  SOCIAL GRID

                  3 columns
                  2 rows
              =================================================== */}

              <div className="grid grid-cols-3 gap-3">
                {socials.map((social, index) => {
                  const style = getSocialStyle(social.platform);

                  return (
                    <a
                      key={`${social.platform}-${index}`}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex
                        min-h-[132px]
                        flex-col
                        items-center
                        justify-center

                        rounded-[23px]

                        bg-white

                        px-2
                        py-4

                        shadow-[0_4px_15px_rgba(0,0,0,0.035)]

                        transition

                        hover:-translate-y-1
                        hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]

                        active:scale-[0.97]

                        dark:bg-[#242424]
                        dark:shadow-none
                      "
                    >
                      {/* Social icon */}

                      <div
                        className="
                          flex
                          h-[66px]
                          w-[66px]
                          items-center
                          justify-center
                          rounded-full
                          shadow-sm
                        "
                        style={{
                          background: style.background,
                          color: style.color,
                        }}
                      >
                        <SocialIcon platform={social.platform} />
                      </div>

                      {/* Social name */}

                      <span
                        className="
                          mt-3
                          text-[11px]
                          font-medium
                          text-[#202020]
                          dark:text-white
                        "
                      >
                        {getSocialLabel(social.platform)}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* ====================================================
              FOOTER
          ===================================================== */}

          <div className="mt-7 border-t border-black/[0.06] pt-6 text-center dark:border-white/[0.07]">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-black/25 dark:text-white/25">
              Digital Business Card
            </p>

            <a
              href="https://dextap.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-[10px] font-semibold text-black/45 transition hover:text-black dark:text-white/45 dark:hover:text-white"
            >
              Powered by DexTap
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
