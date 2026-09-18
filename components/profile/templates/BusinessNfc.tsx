"use client";

import { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import {
  FiArrowUpRight,
  FiChevronRight,
  FiGlobe,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiMoon,
  FiPhone,
  FiSend,
  FiShare2,
  FiSun,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";

import type { BusinessProfile as BusinessProfileType } from "@/lib/profiles";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/* ============================================================
   MAIN TEMPLATE
============================================================ */

export default function BusinessNfc({
  profile,
}: {
  profile: BusinessProfileType;
}) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const website = profile.website || profile.link;

  /* ============================================================
     THEME
  ============================================================ */

  useEffect(() => {
    setMounted(true);

    const storedTheme = localStorage.getItem(
      "dextap-business-nfc-theme",
    );

    if (storedTheme === "dark") {
      setDarkMode(true);
    } else if (storedTheme === "light") {
      setDarkMode(false);
    } else {
      setDarkMode(
        window.matchMedia("(prefers-color-scheme: dark)").matches,
      );
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");

      localStorage.setItem(
        "dextap-business-nfc-theme",
        "dark",
      );
    } else {
      root.classList.remove("dark");

      localStorage.setItem(
        "dextap-business-nfc-theme",
        "light",
      );
    }
  }, [darkMode, mounted]);

  /* ============================================================
     SHARE
  ============================================================ */

  const handleShare = async () => {
    const shareData = {
      title: profile.businessName,
      text:
        profile.tagline ||
        `Connect with ${profile.businessName}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(
          window.location.href,
        );

        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }
    } catch {
      // User cancelled sharing.
    }
  };

  /* ============================================================
     CONTACT ACTIONS
  ============================================================ */

  const handleEmail = () => {
    window.location.href = `mailto:${profile.email}`;
  };

  const handlePhone = () => {
    window.location.href = `tel:${profile.phone}`;
  };

  const handleWhatsApp = () => {
    if (!profile.whatsapp) return;

    const number = profile.whatsapp.replace(
      /[^0-9+]/g,
      "",
    );

    const cleanNumber = number.startsWith("+")
      ? number.substring(1)
      : number;

    window.open(
      `https://wa.me/${cleanNumber}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleWebsite = () => {
    if (!website) return;

    window.open(
      website,
      "_blank",
      "noopener,noreferrer",
    );
  };

  /* ============================================================
     SOCIAL ICON
  ============================================================ */

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <FaFacebookF size={15} />;

      case "instagram":
        return <FiInstagram size={17} />;

      case "tiktok":
        return <FaTiktok size={16} />;

      case "linkedin":
        return <span className="text-[14px] font-semibold">in</span>;

      case "youtube":
        return <FiSend size={16} />;

      case "x":
        return (
          <span className="text-[14px] font-semibold">
            X
          </span>
        );

      default:
        return <FiGlobe size={17} />;
    }
  };

  /* ============================================================
     SOCIAL LABEL
  ============================================================ */

  const getSocialLabel = (platform: string) => {
    switch (platform) {
      case "facebook":
        return "Facebook";

      case "instagram":
        return "Instagram";

      case "tiktok":
        return "TikTok";

      case "linkedin":
        return "LinkedIn";

      case "youtube":
        return "YouTube";

      case "x":
        return "X";

      default:
        return platform;
    }
  };

  /* ============================================================
     UI
  ============================================================ */

  return (
    <main
      className={`${poppins.variable} min-h-screen bg-[#eef0eb] font-[family-name:var(--font-poppins)] text-[#172018] transition-colors duration-300 dark:bg-[#101411] dark:text-[#f3f5f1] px-3 py-3 sm:px-5 sm:py-6 md:py-10`}
    >
      <div className="mx-auto w-full max-w-[520px] overflow-hidden rounded-[30px] bg-[#f8f9f5] shadow-[0_25px_80px_rgba(24,35,27,0.14)] transition-colors duration-300 dark:bg-[#181d19] dark:shadow-[0_25px_80px_rgba(0,0,0,0.4)] sm:rounded-[36px]">
        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative overflow-hidden bg-[#1d2820] dark:bg-[#151b17]">
          {/* Banner */}

          <div className="relative h-[190px] sm:h-[220px]">
            {profile.logo ? (
              <img
                src={profile.logo}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-[#29362c]" />
            )}

            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-[#1d2820] dark:to-[#151b17]" />

            {/* Top Controls */}

            <div className="absolute left-5 right-5 top-5 z-20 flex items-center justify-between sm:left-6 sm:right-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white backdrop-blur-md">
                <span className="text-[9px] font-semibold tracking-[0.18em]">
                  NFC
                </span>
              </div>

              {mounted ? (
                <button
                  type="button"
                  onClick={() =>
                    setDarkMode((value) => !value)
                  }
                  aria-label={
                    darkMode
                      ? "Switch to light mode"
                      : "Switch to dark mode"
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white backdrop-blur-md transition hover:bg-white/15 active:scale-95"
                >
                  {darkMode ? (
                    <FiSun size={16} />
                  ) : (
                    <FiMoon size={16} />
                  )}
                </button>
              ) : (
                <div className="h-9 w-9 rounded-full border border-white/10 bg-black/20 backdrop-blur-md" />
              )}
            </div>
          </div>

          {/* Hero Content */}

          <div className="relative px-5 pb-6 sm:px-7 sm:pb-8">
            {/* =================================================
                LOGO
            ================================================== */}

            <div className="-mt-[52px] mb-5 flex h-[94px] w-[94px] items-center justify-center overflow-hidden rounded-[25px] border-[5px] border-[#1d2820] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] dark:border-[#151b17] sm:h-[102px] sm:w-[102px]">
              {profile.banner ? (
                <img
                  src={profile.banner}
                  alt={profile.businessName}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-xl font-semibold text-[#1d2820]">
                  {profile.businessName
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
              )}
            </div>

            {/* Business Name */}

            <div>
              <h1 className="max-w-[430px] text-[29px] font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-[34px]">
                {profile.businessName}
              </h1>

              {profile.tagline && (
                <p className="mt-2 max-w-[400px] text-[12px] font-medium leading-5 tracking-[0.01em] text-[#c5cec5] sm:text-[13px]">
                  {profile.tagline}
                </p>
              )}
            </div>

            {/* Contact Person */}

            {(profile.contactName ||
              profile.contactTitle) && (
              <div className="mt-5">
                {profile.contactName && (
                  <p className="text-[13px] font-semibold text-white">
                    {profile.contactName}
                  </p>
                )}

                {profile.contactTitle && (
                  <p className="mt-0.5 text-[11px] font-medium text-[#9eaa9f]">
                    {profile.contactTitle}
                  </p>
                )}
              </div>
            )}

            {/* Location */}

            {profile.location && (
              <div className="mt-4 flex items-start gap-2 text-[#aeb9af]">
                <FiMapPin
                  size={15}
                  className="mt-0.5 shrink-0"
                />

                {profile.locationUrl ? (
                  <a
                    href={profile.locationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] leading-5 transition hover:text-white"
                  >
                    {profile.location}
                  </a>
                ) : (
                  <span className="text-[11px] leading-5">
                    {profile.location}
                  </span>
                )}
              </div>
            )}

            {/* Main Actions */}

            <div className="mt-6 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleShare}
                className="flex h-[48px] items-center justify-center gap-2 rounded-[15px] bg-[#dce5d7] px-3 text-[12px] font-semibold text-[#1c2920] transition active:scale-[0.98] hover:bg-white"
              >
                <FiShare2 size={16} />

                {copied
                  ? "Copied"
                  : "Share Profile"}
              </button>

              <button
                type="button"
                onClick={handleEmail}
                className="flex h-[48px] items-center justify-center gap-2 rounded-[15px] border border-white/12 bg-white/[0.06] px-3 text-[12px] font-semibold text-white transition active:scale-[0.98] hover:bg-white/[0.1]"
              >
                <FiMail size={16} />
                Contact
              </button>
            </div>
          </div>
        </section>

        {/* =====================================================
            PROFILE CONTENT
        ====================================================== */}

        <div className="px-4 pb-5 pt-4 transition-colors duration-300 dark:bg-[#181d19] sm:px-6 sm:pb-7 sm:pt-5">
          {/* =================================================
              QUICK ACTIONS
          ================================================== */}

          <section>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={handlePhone}
                className="flex min-h-[82px] flex-col items-center justify-center rounded-[20px] border border-[#e6e9e3] bg-white px-2 transition active:scale-[0.98] hover:-translate-y-0.5 hover:shadow-sm dark:border-[#2b322c] dark:bg-[#202620] dark:hover:bg-[#252c25]"
              >
                <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#edf1eb] text-[#344538] dark:bg-[#303a31] dark:text-[#d6dfd4]">
                  <FiPhone size={16} />
                </span>

                <span className="text-[11px] font-semibold text-[#273329] dark:text-[#e7ebe5]">
                  Call
                </span>
              </button>

              <button
                type="button"
                onClick={handleEmail}
                className="flex min-h-[82px] flex-col items-center justify-center rounded-[20px] border border-[#e6e9e3] bg-white px-2 transition active:scale-[0.98] hover:-translate-y-0.5 hover:shadow-sm dark:border-[#2b322c] dark:bg-[#202620] dark:hover:bg-[#252c25]"
              >
                <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#edf1eb] text-[#344538] dark:bg-[#303a31] dark:text-[#d6dfd4]">
                  <FiMail size={16} />
                </span>

                <span className="text-[11px] font-semibold text-[#273329] dark:text-[#e7ebe5]">
                  Email
                </span>
              </button>

              <button
                type="button"
                onClick={handleWhatsApp}
                disabled={!profile.whatsapp}
                className="flex min-h-[82px] flex-col items-center justify-center rounded-[20px] border border-[#e6e9e3] bg-white px-2 transition active:scale-[0.98] hover:-translate-y-0.5 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-40 dark:border-[#2b322c] dark:bg-[#202620]"
              >
                <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#edf1eb] text-[#344538] dark:bg-[#303a31] dark:text-[#d6dfd4]">
                  <FaWhatsapp size={17} />
                </span>

                <span className="text-[11px] font-semibold text-[#273329] dark:text-[#e7ebe5]">
                  WhatsApp
                </span>
              </button>
            </div>
          </section>

          <div className="my-6 h-px bg-[#e4e7e1] dark:bg-[#2b322c]" />

          {/* =================================================
              ABOUT
          ================================================== */}

          {profile.bio && (
            <section>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#879188] dark:text-[#89968b]">
                    About
                  </p>

                  <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.035em] text-[#1c271f] dark:text-[#f0f3ee]">
                    About the Business
                  </h2>
                </div>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#edf1eb] text-[#405342] dark:bg-[#303a31] dark:text-[#d4ddd3]">
                  <FiMessageCircle size={16} />
                </div>
              </div>

              <p className="mt-4 text-[12px] leading-[1.85] text-[#69736b] dark:text-[#a5aea6]">
                {profile.bio}
              </p>
            </section>
          )}

          {/* =================================================
              SERVICES
          ================================================== */}

          {profile.services &&
            profile.services.length > 0 && (
              <>
                <div className="my-6 h-px bg-[#e4e7e1] dark:bg-[#2b322c]" />

                <section>
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#879188] dark:text-[#89968b]">
                        Explore
                      </p>

                      <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.035em] text-[#1c271f] dark:text-[#f0f3ee]">
                        Products & Services
                      </h2>
                    </div>

                    <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-[#1f2b22] px-2.5 text-[10px] font-semibold text-white dark:bg-[#dce5d7] dark:text-[#1c2920]">
                      {profile.services.length}
                    </span>
                  </div>

                  <div className="mt-4 overflow-hidden rounded-[21px] border border-[#e4e8e1] bg-white dark:border-[#2b322c] dark:bg-[#202620]">
                    {profile.services.map(
                      (service, index) => (
                        <div
                          key={`${service.name}-${index}`}
                          className={`flex items-start gap-3 px-4 py-4 ${
                            index !==
                            profile.services!.length - 1
                              ? "border-b border-[#e8ebe6] dark:border-[#2b322c]"
                              : ""
                          }`}
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#edf1eb] text-[9px] font-bold text-[#354438] dark:bg-[#303a31] dark:text-[#d6dfd4]">
                            {String(index + 1).padStart(
                              2,
                              "0",
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="text-[12px] font-semibold leading-5 text-[#263229] dark:text-[#edf1eb]">
                              {service.name}
                            </h3>

                            {service.description && (
                              <p className="mt-1 text-[10px] leading-[1.7] text-[#7a847c] dark:text-[#9da79f]">
                                {service.description}
                              </p>
                            )}
                          </div>

                          <FiChevronRight
                            size={15}
                            className="mt-1 shrink-0 text-[#a0a8a1] dark:text-[#737d75]"
                          />
                        </div>
                      ),
                    )}
                  </div>
                </section>
              </>
            )}

          {/* =================================================
              WEBSITE
          ================================================== */}

          {website && (
            <>
              <div className="my-6 h-px bg-[#e4e7e1] dark:bg-[#2b322c]" />

              <button
                type="button"
                onClick={handleWebsite}
                className="flex w-full items-center gap-3.5 rounded-[20px] border border-[#e3e7e1] bg-white p-3.5 text-left transition active:scale-[0.99] hover:shadow-sm dark:border-[#2b322c] dark:bg-[#202620] dark:hover:bg-[#252c25]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf1eb] text-[#344538] dark:bg-[#303a31] dark:text-[#d6dfd4]">
                  <FiGlobe size={18} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8b958d] dark:text-[#89968b]">
                    Website
                  </span>

                  <span className="mt-0.5 block truncate text-[11px] font-semibold text-[#29352c] dark:text-[#edf1eb]">
                    Visit our website
                  </span>
                </span>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f1f3ef] text-[#657067] dark:bg-[#303730] dark:text-[#c1c9c2]">
                  <FiArrowUpRight size={15} />
                </span>
              </button>
            </>
          )}

          {/* =================================================
              CONTACT
          ================================================== */}

          <div className="my-6 h-px bg-[#e4e7e1] dark:bg-[#2b322c]" />

          <section>
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#879188] dark:text-[#89968b]">
              Get in touch
            </p>

            <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.035em] text-[#1c271f] dark:text-[#f0f3ee]">
              Contact
            </h2>

            <div className="mt-4 space-y-2">
              {/* Phone */}

              <button
                type="button"
                onClick={handlePhone}
                className="flex w-full items-center gap-3 rounded-[18px] border border-[#e5e9e4] bg-white p-3 text-left transition active:scale-[0.99] hover:bg-[#fafbf9] dark:border-[#2b322c] dark:bg-[#202620] dark:hover:bg-[#252c25]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#edf1eb] text-[#39493c] dark:bg-[#303a31] dark:text-[#d6dfd4]">
                  <FiPhone size={15} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-[8px] font-semibold uppercase tracking-[0.14em] text-[#8a948b] dark:text-[#89968b]">
                    Phone
                  </span>

                  <span className="mt-0.5 block truncate text-[11px] font-semibold text-[#29352c] dark:text-[#edf1eb]">
                    {profile.phone}
                  </span>
                </span>

                <FiChevronRight
                  size={14}
                  className="shrink-0 text-[#9aa39c] dark:text-[#737d75]"
                />
              </button>

              {/* Email */}

              <button
                type="button"
                onClick={handleEmail}
                className="flex w-full items-center gap-3 rounded-[18px] border border-[#e5e9e4] bg-white p-3 text-left transition active:scale-[0.99] hover:bg-[#fafbf9] dark:border-[#2b322c] dark:bg-[#202620] dark:hover:bg-[#252c25]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#edf1eb] text-[#39493c] dark:bg-[#303a31] dark:text-[#d6dfd4]">
                  <FiMail size={15} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-[8px] font-semibold uppercase tracking-[0.14em] text-[#8a948b] dark:text-[#89968b]">
                    Email
                  </span>

                  <span className="mt-0.5 block truncate text-[11px] font-semibold text-[#29352c] dark:text-[#edf1eb]">
                    {profile.email}
                  </span>
                </span>

                <FiChevronRight
                  size={14}
                  className="shrink-0 text-[#9aa39c] dark:text-[#737d75]"
                />
              </button>

              {/* Location */}

              {profile.location && (
                <div className="flex items-start gap-3 rounded-[18px] border border-[#e5e9e4] bg-white p-3 dark:border-[#2b322c] dark:bg-[#202620]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#edf1eb] text-[#39493c] dark:bg-[#303a31] dark:text-[#d6dfd4]">
                    <FiMapPin size={15} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-[8px] font-semibold uppercase tracking-[0.14em] text-[#8a948b] dark:text-[#89968b]">
                      Location
                    </span>

                    <span className="mt-0.5 block text-[11px] font-semibold leading-5 text-[#29352c] dark:text-[#edf1eb]">
                      {profile.location}
                    </span>
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* =================================================
              SOCIALS
          ================================================== */}

          {profile.socials &&
            profile.socials.length > 0 && (
              <>
                <div className="my-6 h-px bg-[#e4e7e1] dark:bg-[#2b322c]" />

                <section>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#879188] dark:text-[#89968b]">
                    Connect
                  </p>

                  <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.035em] text-[#1c271f] dark:text-[#f0f3ee]">
                    Follow Us
                  </h2>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {profile.socials.map(
                      (social) => (
                        <a
                          key={social.platform}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex min-h-[46px] items-center gap-2.5 rounded-[16px] border border-[#e4e8e2] bg-white px-3 transition active:scale-[0.98] hover:bg-[#fafbf9] dark:border-[#2b322c] dark:bg-[#202620] dark:hover:bg-[#252c25]"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#edf1eb] text-[#39493c] dark:bg-[#303a31] dark:text-[#d6dfd4]">
                            {getSocialIcon(
                              social.platform,
                            )}
                          </span>

                          <span className="truncate text-[10px] font-semibold text-[#29352c] dark:text-[#edf1eb]">
                            {getSocialLabel(
                              social.platform,
                            )}
                          </span>
                        </a>
                      ),
                    )}
                  </div>
                </section>
              </>
            )}

          {/* =================================================
              FOOTER
          ================================================== */}

          <div className="mt-7 border-t border-[#e4e7e1] pt-6 text-center dark:border-[#2b322c]">
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-[#1f2b22] text-[8px] font-bold tracking-[0.15em] text-white dark:bg-[#dce5d7] dark:text-[#1c2920]">
              NFC
            </div>

            <a
              href="https://dextap.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 block text-[10px] font-semibold text-[#6f796f] transition hover:text-[#1f2b22] dark:text-[#a0aaa1] dark:hover:text-white"
            >
              Powered by DexTap
            </a>

            <p className="mt-0.5 text-[8px] text-[#9ba39d] dark:text-[#6f7971]">
              Digital business identity
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}