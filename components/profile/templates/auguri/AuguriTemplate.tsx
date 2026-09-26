"use client";

import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import type { BusinessProfile } from "@/lib/profiles";

import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock3,
  Copy,
  ExternalLink,
  MapPin,
  Moon,
  Navigation,
  Phone,
  Share2,
  ShoppingBag,
  Sparkles,
  Sun,
  UtensilsCrossed,
} from "lucide-react";

import { FaFacebookF, FaInstagram } from "react-icons/fa6";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

type Props = {
  profile: BusinessProfile;
};

const FAVORITES_URL = "https://www.facebook.com/share/p/1EwZd3XEKU/";

const DEFAULT_LOCATION =
  "2nd Floor Calapan Town Center, J.P. Rizal St., Camilmil, Calapan City (beside Shakey’s), Calapan, Philippines, 5200";

const DEFAULT_LOCATION_URL =
  "https://www.bing.com/maps/default.aspx?v=2&pc=FACEBK&mid=8100&where1=2nd%20Floor%20Calapan%20Town%20Center%2C%20J.P.%20Rizal%20St.%2C%20Camilmil%2C%20Calapan%20City%20%28beside%20Shakey%E2%80%99s%29%2C%20Calapan%2C%20Philippines%2C%205200&FORM=FBKPL1";

const DEFAULT_FACEBOOK = "https://www.facebook.com/augurimilkteahouse";

const DEFAULT_INSTAGRAM = "https://www.instagram.com/auguri.calapan/";

const DEFAULT_PHONE = "0960 211 1905";

const DEFAULT_EMAIL = "augurimilkteahouse@gmail.com";

export default function AuguriTemplate({ profile }: Props) {
  /*
   * =========================================================
   * LOCAL THEME
   * =========================================================
   */

  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  /*
   * =========================================================
   * PROFILE DATA
   * =========================================================
   */

  const businessName = profile.businessName || "auguri";

  const tagline = profile.tagline || "More than just milktea.";

  const logo = profile.logo || "/profiles/business/auguri/logo.png";

  const banner = profile.banner || "/profiles/business/auguri/banner.jpg";

  const location = profile.location || DEFAULT_LOCATION;

  const locationUrl = profile.locationUrl || DEFAULT_LOCATION_URL;

  const phone = profile.phone || DEFAULT_PHONE;

  const email = profile.email || DEFAULT_EMAIL;

  const facebook =
    profile.socials?.find((social) => social.platform === "facebook")?.url ||
    DEFAULT_FACEBOOK;

  const instagram =
    profile.socials?.find((social) => social.platform === "instagram")?.url ||
    DEFAULT_INSTAGRAM;

  /*
   * =========================================================
   * EMBEDDED MAP
   * =========================================================
   */

  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    "Auguri Miltea House, 2nd Floor Calapan Town Center, J.P. Rizal St., Camilmil, Calapan City, Oriental Mindoro, Philippines",
  )}&output=embed`;

  /*
   * =========================================================
   * SHARE
   * =========================================================
   */

  const handleShare = async () => {
    const shareData = {
      title: businessName,
      text: tagline,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(window.location.href);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // User cancelled sharing.
    }
  };

  /*
   * =========================================================
   * SAVE CONTACT
   * =========================================================
   */

  const handleSaveContact = () => {
    const vCard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${businessName}`,
      `ORG:${businessName}`,
      `TEL:${phone.replace(/\s/g, "")}`,
      `EMAIL:${email}`,
      `ADR:;;${location};;;`,
      `URL:${window.location.href}`,
      `NOTE:${tagline}`,
      "END:VCARD",
    ].join("\r\n");

    const blob = new Blob([vCard], {
      type: "text/vcard;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `${businessName.replace(/\s+/g, "-").toLowerCase()}.vcf`;

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(url);
  };

  /*
   * =========================================================
   * COLORS
   * =========================================================
   */

  const colors = {
    page: isDark ? "#15100C" : "#F8F3EA",

    section: isDark ? "#1C1510" : "#FFFDF8",

    card: isDark ? "#211912" : "#FFFFFF",

    text: isDark ? "#F5EEE3" : "#30241C",

    muted: isDark ? "#B8ADA0" : "#776B60",

    gold: isDark ? "#D0AD72" : "#B78A4A",

    goldLight: isDark ? "#C49C61" : "#D3B37D",

    border: isDark ? "#49382A" : "#E5D8C5",
  };

  /*
   * =========================================================
   * FAVORITES
   * =========================================================
   */

  const favorites = [
    {
      number: "01",
      title: "Milk Tea",
      description:
        "Discover one of the drinks that makes Auguri more than just milktea.",
      icon: ShoppingBag,
    },
    {
      number: "02",
      title: "Signature Drinks",
      description:
        "Refreshing choices made for conversations, catch-ups, and slow afternoons.",
      icon: Sparkles,
    },
    {
      number: "03",
      title: "Food & Snacks",
      description:
        "Something delicious to pair with your favorite Auguri drink.",
      icon: UtensilsCrossed,
    },
    {
      number: "04",
      title: "Good Moments",
      description:
        "A place to relax, meet friends, celebrate, and simply enjoy the moment.",
      icon: ShoppingBag,
    },
  ];

  /*
   * =========================================================
   * SOCIAL BUTTON
   * =========================================================
   */

  const socialButton = `
    flex
    h-11
    w-11
    items-center
    justify-center
    rounded-full
    border
    transition-all
    duration-300
    hover:-translate-y-1
  `;

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <main
      className={`${poppins.className} min-h-dvh w-full overflow-x-hidden transition-colors duration-500`}
      style={{
        backgroundColor: colors.page,
        color: colors.text,
      }}
    >
      {/* =====================================================
          TOP BAR
          ===================================================== */}

      <header
        className="
          sticky
          top-0
          z-50
          border-b
          backdrop-blur-xl
        "
        style={{
          backgroundColor: isDark
            ? "rgba(21,16,12,0.88)"
            : "rgba(248,243,234,0.88)",
          borderColor: colors.border,
        }}
      >
        <div
          className="
            mx-auto
            flex
            h-16
            max-w-5xl
            items-center
            justify-between
            px-5
            sm:px-8
          "
        >
          {/* BRAND */}

          <a
            href="#top"
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                overflow-hidden
                rounded-full
                border
              "
              style={{
                borderColor: colors.border,
                backgroundColor: colors.card,
              }}
            >
              <img
                src={logo}
                alt={`${businessName} logo`}
                className="
                  h-full
                  w-full
                  rounded-full
                  object-cover
                "
              />
            </div>

            <div>
              <p
                className="
                  text-[12px]
                  font-semibold
                  uppercase
                  tracking-[0.24em]
                "
                style={{
                  color: colors.text,
                }}
              >
                {businessName}
              </p>

              <p
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.18em]
                "
                style={{
                  color: colors.gold,
                }}
              >
                Miltea House
              </p>
            </div>
          </a>

          {/* ACTIONS */}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              aria-label="Share Auguri"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                transition-all
                duration-300
                hover:-translate-y-0.5
              "
              style={{
                borderColor: colors.border,
                backgroundColor: colors.card,
                color: colors.text,
              }}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Share2 className="h-4 w-4" />
              )}
            </button>

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
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                transition-all
                duration-300
                hover:-translate-y-0.5
              "
              style={{
                borderColor: colors.border,
                backgroundColor: colors.card,
                color: colors.gold,
              }}
            >
              {!mounted ? (
                <Sun className="h-4 w-4" />
              ) : resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          HERO
          ===================================================== */}

      <section
        id="top"
        className="
          relative
          overflow-hidden
          px-5
          pb-20
          pt-14
          sm:px-8
          sm:pb-28
          sm:pt-20
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            -right-32
            -top-32
            h-80
            w-80
            rounded-full
            blur-3xl
          "
          style={{
            backgroundColor: `${colors.gold}18`,
          }}
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-40
            -left-40
            h-96
            w-96
            rounded-full
            blur-3xl
          "
          style={{
            backgroundColor: `${colors.gold}10`,
          }}
        />

        <div
          className="
            relative
            mx-auto
            max-w-5xl
          "
        >
          {/* =================================================
              HERO CARD WITH BANNER
              ================================================= */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[2.5rem]
              border
            "
            style={{
              borderColor: colors.border,
              backgroundColor: colors.section,
            }}
          >
            {/* =================================================
                BANNER
                ================================================= */}

            <div
              className="
                relative
                h-56
                w-full
                overflow-hidden
                sm:h-72
                lg:h-80
              "
            >
              <img
                src={banner}
                alt={`${businessName} banner`}
                className="
                  h-full
                  w-full
                  object-cover
                "
              />

              {/* Main overlay */}

              <div
                className="absolute inset-0"
                style={{
                  background: isDark
                    ? "linear-gradient(to bottom, rgba(21,16,12,0.10), rgba(21,16,12,0.78))"
                    : "linear-gradient(to bottom, rgba(48,36,28,0.05), rgba(48,36,28,0.62))",
                }}
              />

              {/* Soft gold tint */}

              <div
                className="
                  absolute
                  inset-0
                "
                style={{
                  background:
                    "linear-gradient(120deg, rgba(183,138,74,0.18), transparent 55%)",
                }}
              />

              {/* Banner label */}

              <div
                className="
                  absolute
                  left-6
                  top-6
                  rounded-full
                  border
                  px-4
                  py-2
                  backdrop-blur-md
                  sm:left-8
                  sm:top-8
                "
                style={{
                  borderColor: "rgba(255,255,255,0.28)",
                  backgroundColor: "rgba(0,0,0,0.16)",
                }}
              >
                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-white
                  "
                >
                  More than just milktea
                </p>
              </div>
            </div>

            {/* =================================================
                HERO CONTENT
                ================================================= */}

            <div
              className="
                relative
                px-6
                pb-12
                pt-0
                sm:px-12
                sm:pb-16
                lg:px-20
              "
            >
              <div
                className="
                  relative
                  mx-auto
                  -mt-16
                  flex
                  max-w-2xl
                  flex-col
                  items-center
                  text-center
                  sm:-mt-20
                "
              >
                {/* LOGO */}

                <div
                  className="
                    relative
                    z-10
                    flex
                    h-32
                    w-32
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    border-[5px]
                    shadow-xl
                    sm:h-40
                    sm:w-40
                  "
                  style={{
                    borderColor: colors.section,
                    backgroundColor: colors.card,
                  }}
                >
                  <img
                    src={logo}
                    alt={`${businessName} logo`}
                    className="
                      h-full
                      w-full
                      rounded-full
                      object-cover
                    "
                  />
                </div>

                {/* ESTABLISHED */}

                <div
                  className="
                    mt-7
                    flex
                    items-center
                    gap-3
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.32em]
                  "
                  style={{
                    color: colors.gold,
                  }}
                >
                  <span
                    className="h-px w-8"
                    style={{
                      backgroundColor: colors.gold,
                    }}
                  />
                  EST. 2022
                  <span
                    className="h-px w-8"
                    style={{
                      backgroundColor: colors.gold,
                    }}
                  />
                </div>

                {/* BUSINESS NAME */}

                <h1
                  className="
                    mt-4
                    text-5xl
                    font-semibold
                    lowercase
                    tracking-[-0.06em]
                    sm:text-7xl
                  "
                  style={{
                    color: colors.text,
                  }}
                >
                  {businessName}
                </h1>

                {/* TAGLINE */}

                <p
                  className="
                    mt-5
                    max-w-lg
                    text-sm
                    leading-7
                    sm:text-base
                  "
                  style={{
                    color: colors.muted,
                  }}
                >
                  {tagline}
                </p>

                <p
                  className="
                    mt-4
                    max-w-md
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.22em]
                  "
                  style={{
                    color: colors.gold,
                  }}
                >
                  Drinks · Food · Good Moments
                </p>

                {/* HERO ACTIONS */}

                <div
                  className="
                    mt-9
                    flex
                    w-full
                    flex-col
                    gap-3
                    sm:w-auto
                    sm:flex-row
                  "
                >
                  <a
                    href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                    className="
                      inline-flex
                      h-12
                      items-center
                      justify-center
                      gap-2
                      rounded-full
                      px-7
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                    "
                    style={{
                      backgroundColor: colors.text,
                      color: colors.page,
                    }}
                  >
                    <Phone className="h-4 w-4" />
                    Contact Us
                  </a>

                  <a
                    href={locationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      inline-flex
                      h-12
                      items-center
                      justify-center
                      gap-2
                      rounded-full
                      border
                      px-7
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                    "
                    style={{
                      borderColor: colors.border,
                      color: colors.text,
                      backgroundColor: colors.card,
                    }}
                  >
                    <MapPin className="h-4 w-4" />
                    Find Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SOCIAL STRIP
          ===================================================== */}

      <section
        className="border-y px-5 py-6 sm:px-8"
        style={{
          borderColor: colors.border,
          backgroundColor: colors.card,
        }}
      >
        <div
          className="
            mx-auto
            flex
            max-w-5xl
            flex-col
            items-center
            justify-between
            gap-5
            sm:flex-row
          "
        >
          <div className="text-center sm:text-left">
            <p
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.28em]
              "
              style={{
                color: colors.gold,
              }}
            >
              Follow Auguri
            </p>

            <p
              className="mt-1 text-xs"
              style={{
                color: colors.muted,
              }}
            >
              Stay connected with our latest updates.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className={socialButton}
              style={{
                borderColor: colors.border,
                backgroundColor: colors.section,
                color: colors.text,
              }}
            >
              <FaFacebookF size={15} />
            </a>

            <a
              href={instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className={socialButton}
              style={{
                borderColor: colors.border,
                backgroundColor: colors.section,
                color: colors.text,
              }}
            >
              <FaInstagram size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================
          STORY
          ===================================================== */}

      <section
        className="
          px-5
          py-20
          sm:px-8
          sm:py-28
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-5xl
            gap-12
            lg:grid-cols-[0.75fr_1.25fr]
            lg:items-center
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.3em]
              "
              style={{
                color: colors.gold,
              }}
            >
              01 — Our Story
            </p>

            <h2
              className="
                mt-4
                max-w-sm
                text-4xl
                font-semibold
                leading-tight
                tracking-[-0.04em]
                sm:text-5xl
              "
              style={{
                color: colors.text,
              }}
            >
              More than
              <br />
              just milktea.
            </h2>
          </div>

          <div>
            <p
              className="
                max-w-2xl
                text-base
                leading-8
                sm:text-lg
              "
              style={{
                color: colors.muted,
              }}
            >
              Auguri is a place where drinks, food, and good company come
              together. Whether you are meeting friends, taking a break, or
              simply looking for something refreshing, Auguri is made for
              moments worth enjoying.
            </p>

            <div
              className="
                mt-8
                h-px
                w-20
              "
              style={{
                backgroundColor: colors.gold,
              }}
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          FAVORITES
          ===================================================== */}

      <section
        className="
          px-5
          pb-20
          sm:px-8
          sm:pb-28
        "
      >
        <div className="mx-auto max-w-5xl">
          <div
            className="
              mb-10
              flex
              flex-col
              justify-between
              gap-4
              sm:flex-row
              sm:items-end
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                "
                style={{
                  color: colors.gold,
                }}
              >
                02 — Our Favorites
              </p>

              <h2
                className="
                  mt-3
                  text-3xl
                  font-semibold
                  tracking-[-0.04em]
                  sm:text-4xl
                "
                style={{
                  color: colors.text,
                }}
              >
                Something for
                <br className="sm:hidden" />
                every moment.
              </h2>
            </div>

            <a
              href={FAVORITES_URL}
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex
                items-center
                gap-2
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.16em]
              "
              style={{
                color: colors.gold,
              }}
            >
              See Facebook
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div
            className="
              grid
              gap-4
              sm:grid-cols-2
            "
          >
            {favorites.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.number}
                  href={FAVORITES_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[2rem]
                    border
                    p-6
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    sm:p-8
                  "
                  style={{
                    borderColor: colors.border,
                    backgroundColor: colors.card,
                  }}
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <span
                      className="
                        text-[9px]
                        font-semibold
                        tracking-[0.28em]
                      "
                      style={{
                        color: colors.gold,
                      }}
                    >
                      {item.number}
                    </span>

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                      style={{
                        borderColor: colors.border,
                        color: colors.gold,
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="mt-12">
                    <h3
                      className="
                        text-xl
                        font-semibold
                        tracking-[-0.02em]
                      "
                      style={{
                        color: colors.text,
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-3
                        max-w-md
                        text-sm
                        leading-7
                      "
                      style={{
                        color: colors.muted,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div
                    className="
                      mt-7
                      flex
                      items-center
                      justify-between
                      border-t
                      pt-5
                    "
                    style={{
                      borderColor: colors.border,
                    }}
                  >
                    <span
                      className="
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                      "
                      style={{
                        color: colors.gold,
                      }}
                    >
                      View on Facebook
                    </span>

                    <ChevronRight
                      className="
                        h-4
                        w-4
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                      style={{
                        color: colors.gold,
                      }}
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          INFORMATION
          ===================================================== */}

      <section
        className="
          px-5
          pb-20
          sm:px-8
          sm:pb-28
        "
      >
        <div
          className="
            mx-auto
            max-w-5xl
            rounded-[2rem]
            border
            p-6
            sm:p-10
          "
          style={{
            borderColor: colors.border,
            backgroundColor: colors.section,
          }}
        >
          <div
            className="
              mb-10
              flex
              items-center
              gap-4
            "
          >
            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.3em]
              "
              style={{
                color: colors.gold,
              }}
            >
              03
            </span>

            <div
              className="h-px flex-1"
              style={{
                backgroundColor: colors.border,
              }}
            />

            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
              "
              style={{
                color: colors.muted,
              }}
            >
              Visit Auguri
            </span>
          </div>

          <div
            className="
              grid
              gap-8
              md:grid-cols-2
            "
          >
            {/* LOCATION */}

            <a
              href={locationUrl}
              target="_blank"
              rel="noreferrer"
              className="
                group
                flex
                gap-4
                rounded-2xl
                border
                p-5
                transition-all
                duration-300
                hover:-translate-y-0.5
              "
              style={{
                borderColor: colors.border,
                backgroundColor: colors.card,
              }}
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                "
                style={{
                  backgroundColor: `${colors.gold}16`,
                  color: colors.gold,
                }}
              >
                <MapPin className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                  "
                  style={{
                    color: colors.gold,
                  }}
                >
                  Location
                </p>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                  "
                  style={{
                    color: colors.text,
                  }}
                >
                  {location}
                </p>

                <span
                  className="
                    mt-3
                    inline-flex
                    items-center
                    gap-1
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                  "
                  style={{
                    color: colors.gold,
                  }}
                >
                  Open Maps
                  <ExternalLink className="h-3 w-3" />
                </span>
              </div>
            </a>

            {/* VISIT */}

            <div
              className="
                flex
                gap-4
                rounded-2xl
                border
                p-5
              "
              style={{
                borderColor: colors.border,
                backgroundColor: colors.card,
              }}
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                "
                style={{
                  backgroundColor: `${colors.gold}16`,
                  color: colors.gold,
                }}
              >
                <Clock3 className="h-5 w-5" />
              </div>

              <div>
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                  "
                  style={{
                    color: colors.gold,
                  }}
                >
                  Visit Us
                </p>

                <p
                  className="
                    mt-2
                    text-sm
                    font-medium
                  "
                  style={{
                    color: colors.text,
                  }}
                >
                  Come and enjoy Auguri.
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    leading-6
                  "
                  style={{
                    color: colors.muted,
                  }}
                >
                  Check our Facebook page for the latest store hours and
                  announcements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT
          ===================================================== */}

      <section
        className="
          px-5
          pb-20
          sm:px-8
          sm:pb-28
        "
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-10">
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.3em]
              "
              style={{
                color: colors.gold,
              }}
            >
              04 — Contact
            </p>

            <h2
              className="
                mt-3
                text-3xl
                font-semibold
                tracking-[-0.04em]
                sm:text-4xl
              "
              style={{
                color: colors.text,
              }}
            >
              Let’s connect.
            </h2>
          </div>

          <div
            className="
              grid
              gap-4
              sm:grid-cols-2
            "
          >
            {/* PHONE */}

            <a
              href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
              className="
                group
                flex
                items-center
                gap-4
                rounded-2xl
                border
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
              "
              style={{
                borderColor: colors.border,
                backgroundColor: colors.card,
              }}
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                "
                style={{
                  backgroundColor: `${colors.gold}16`,
                  color: colors.gold,
                }}
              >
                <Phone className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                  "
                  style={{
                    color: colors.gold,
                  }}
                >
                  Phone
                </p>

                <p
                  className="
                    mt-1
                    truncate
                    text-sm
                    font-medium
                  "
                  style={{
                    color: colors.text,
                  }}
                >
                  {phone}
                </p>
              </div>

              <ArrowUpRight
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
                style={{
                  color: colors.gold,
                }}
              />
            </a>

            {/* EMAIL */}

            <a
              href={`mailto:${email}`}
              className="
                group
                flex
                items-center
                gap-4
                rounded-2xl
                border
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
              "
              style={{
                borderColor: colors.border,
                backgroundColor: colors.card,
              }}
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                "
                style={{
                  backgroundColor: `${colors.gold}16`,
                  color: colors.gold,
                }}
              >
                <span className="text-sm">@</span>
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                  "
                  style={{
                    color: colors.gold,
                  }}
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
                  style={{
                    color: colors.text,
                  }}
                >
                  {email}
                </p>
              </div>

              <ArrowUpRight
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
                style={{
                  color: colors.gold,
                }}
              />
            </a>

            {/* FACEBOOK */}

            <a
              href={facebook}
              target="_blank"
              rel="noreferrer"
              className="
                group
                flex
                items-center
                gap-4
                rounded-2xl
                border
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
              "
              style={{
                borderColor: colors.border,
                backgroundColor: colors.card,
              }}
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                "
                style={{
                  backgroundColor: `${colors.gold}16`,
                  color: colors.gold,
                }}
              >
                <FaFacebookF size={17} />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                  "
                  style={{
                    color: colors.gold,
                  }}
                >
                  Facebook
                </p>

                <p
                  className="
                    mt-1
                    truncate
                    text-sm
                    font-medium
                  "
                  style={{
                    color: colors.text,
                  }}
                >
                  Auguri Miltea House
                </p>
              </div>

              <ArrowUpRight
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
                style={{
                  color: colors.gold,
                }}
              />
            </a>

            {/* INSTAGRAM */}

            <a
              href={instagram}
              target="_blank"
              rel="noreferrer"
              className="
                group
                flex
                items-center
                gap-4
                rounded-2xl
                border
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
              "
              style={{
                borderColor: colors.border,
                backgroundColor: colors.card,
              }}
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                "
                style={{
                  backgroundColor: `${colors.gold}16`,
                  color: colors.gold,
                }}
              >
                <FaInstagram size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                  "
                  style={{
                    color: colors.gold,
                  }}
                >
                  Instagram
                </p>

                <p
                  className="
                    mt-1
                    truncate
                    text-sm
                    font-medium
                  "
                  style={{
                    color: colors.text,
                  }}
                >
                  @auguri.calapan
                </p>
              </div>

              <ArrowUpRight
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
                style={{
                  color: colors.gold,
                }}
              />
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================
          REVIEW CTA
          ===================================================== */}

      <section
        className="
          px-5
          pb-20
          sm:px-8
          sm:pb-28
        "
      >
        <div
          className="
            relative
            mx-auto
            max-w-5xl
            overflow-hidden
            rounded-[2.5rem]
            px-7
            py-12
            text-center
            sm:px-12
            sm:py-16
          "
          style={{
            backgroundColor: colors.text,
          }}
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-56
              w-56
              rounded-full
              border
            "
            style={{
              borderColor: `${colors.gold}30`,
            }}
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-24
              -left-24
              h-64
              w-64
              rounded-full
              border
            "
            style={{
              borderColor: `${colors.gold}20`,
            }}
          />

          <div className="relative">
            <p
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.3em]
              "
              style={{
                color: colors.goldLight,
              }}
            >
              Your Experience Matters
            </p>

            <h2
              className="
                mt-4
                text-3xl
                font-semibold
                tracking-[-0.04em]
                sm:text-4xl
              "
              style={{
                color: colors.page,
              }}
            >
              Enjoyed Auguri?
            </h2>

            <p
              className="
                mx-auto
                mt-4
                max-w-md
                text-sm
                leading-7
              "
              style={{
                color: "#C7BEB4",
              }}
            >
              Share your experience and help others discover Auguri.
            </p>

            <a
              href={
                profile.reviewUrl ||
                "https://search.google.com/local/writereview"
              }
              target="_blank"
              rel="noreferrer"
              className="
                mt-7
                inline-flex
                h-12
                items-center
                justify-center
                gap-2
                rounded-full
                px-7
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.16em]
                transition-all
                duration-300
                hover:-translate-y-0.5
              "
              style={{
                backgroundColor: colors.gold,
                color: "#211810",
              }}
            >
              Leave a Review
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAP — MOST BOTTOM
          ===================================================== */}

      <section
        className="
          px-5
          pb-16
          sm:px-8
          sm:pb-20
        "
      >
        <div className="mx-auto max-w-5xl">
          {/* MAP HEADER */}

          <div
            className="
              mb-7
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                "
                style={{
                  color: colors.gold,
                }}
              >
                05 — Find Us
              </p>

              <h2
                className="
                  mt-3
                  text-3xl
                  font-semibold
                  tracking-[-0.04em]
                  sm:text-4xl
                "
                style={{
                  color: colors.text,
                }}
              >
                Come visit Auguri.
              </h2>
            </div>

            <a
              href={locationUrl}
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex
                items-center
                gap-2
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.16em]
              "
              style={{
                color: colors.gold,
              }}
            >
              Open in Maps
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* MAP CARD */}

          <div
            className="
              overflow-hidden
              rounded-[2rem]
              border
              shadow-sm
            "
            style={{
              borderColor: colors.border,
              backgroundColor: colors.card,
            }}
          >
            {/* MAP */}

            <div
              className="
                relative
                h-[320px]
                w-full
                sm:h-[400px]
              "
            >
              <iframe
                src={mapEmbedUrl}
                title="Auguri Miltea House location"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  border-0
                "
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* MAP INFORMATION */}

            <div
              className="
                flex
                flex-col
                gap-5
                border-t
                p-5
                sm:flex-row
                sm:items-center
                sm:justify-between
                sm:p-6
              "
              style={{
                borderColor: colors.border,
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                  "
                  style={{
                    backgroundColor: `${colors.gold}16`,
                    color: colors.gold,
                  }}
                >
                  <MapPin className="h-5 w-5" />
                </div>

                <div>
                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                    "
                    style={{
                      color: colors.gold,
                    }}
                  >
                    Auguri Miltea House
                  </p>

                  <p
                    className="
                      mt-1
                      max-w-xl
                      text-xs
                      leading-6
                    "
                    style={{
                      color: colors.muted,
                    }}
                  >
                    {location}
                  </p>
                </div>
              </div>

              <a
                href={locationUrl}
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex
                  h-11
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  border
                  px-5
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                "
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.section,
                  color: colors.text,
                }}
              >
                <Navigation className="h-4 w-4" />
                Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SAVE CONTACT
          ===================================================== */}

      <section
        className="
          px-5
          pb-20
          sm:px-8
        "
      >
        <div
          className="
            mx-auto
            max-w-5xl
            text-center
          "
        >
          <button
            type="button"
            onClick={handleSaveContact}
            className="
              inline-flex
              h-12
              items-center
              justify-center
              gap-2
              rounded-full
              border
              px-7
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.16em]
              transition-all
              duration-300
              hover:-translate-y-0.5
            "
            style={{
              borderColor: colors.border,
              backgroundColor: colors.card,
              color: colors.text,
            }}
          >
            <Copy className="h-4 w-4" />
            Save Auguri Contact
          </button>
        </div>
      </section>

      {/* =====================================================
          FOOTER
          ===================================================== */}

      <footer
        className="
          border-t
          px-5
          pb-28
          pt-10
          sm:px-8
        "
        style={{
          borderColor: colors.border,
        }}
      >
        <div
          className="
            mx-auto
            flex
            max-w-5xl
            flex-col
            items-center
            justify-between
            gap-6
            text-center
            sm:flex-row
            sm:text-left
          "
        >
          <div>
            <p
              className="
                text-xl
                font-semibold
                lowercase
                tracking-[-0.03em]
              "
              style={{
                color: colors.text,
              }}
            >
              {businessName}
            </p>

            <p
              className="
                mt-1
                text-[9px]
                uppercase
                tracking-[0.2em]
              "
              style={{
                color: colors.gold,
              }}
            >
              More than just milktea.
            </p>
          </div>

          <div
            className="
              flex
              items-center
              gap-2
              text-[8px]
              font-medium
              uppercase
              tracking-[0.2em]
            "
          >
            <span
              style={{
                color: colors.muted,
              }}
            >
              Powered by
            </span>

            <a
              href="https://dextap.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors"
              style={{
                color: colors.text,
              }}
            >
              DexTap
            </a>
          </div>
        </div>
      </footer>

      {/* =====================================================
          MOBILE BOTTOM ACTION BAR
          ===================================================== */}

      <div
        className="
          fixed
          bottom-4
          left-1/2
          z-50
          w-[calc(100%-2rem)]
          max-w-md
          -translate-x-1/2
          sm:hidden
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            rounded-full
            border
            p-2
            shadow-2xl
            backdrop-blur-xl
          "
          style={{
            borderColor: colors.border,
            backgroundColor: isDark
              ? "rgba(33,25,18,0.94)"
              : "rgba(255,253,248,0.94)",
          }}
        >
          <a
            href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
            className="
              flex
              h-11
              flex-1
              items-center
              justify-center
              gap-2
              rounded-full
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.12em]
            "
            style={{
              backgroundColor: colors.text,
              color: colors.page,
            }}
          >
            <Phone className="h-4 w-4" />
            Call
          </a>

          <a
            href={locationUrl}
            target="_blank"
            rel="noreferrer"
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
            "
            style={{
              borderColor: colors.border,
              color: colors.gold,
            }}
          >
            <Navigation className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={handleShare}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
            "
            style={{
              borderColor: colors.border,
              color: colors.gold,
            }}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Share2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
