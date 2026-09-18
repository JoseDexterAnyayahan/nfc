"use client";

import { Poppins } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import {
  FiArrowRight,
  FiChevronRight,
  FiGlobe,
  FiHome,
  FiMapPin,
  FiMoon,
  FiShare2,
  FiSun,
  FiBriefcase,
  FiImage,
  FiMessageCircle,
  FiMap,
} from "react-icons/fi";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

import type { PersonalProfile } from "@/lib/profiles";

import QuickActions from "./sections/QuickActions";
import ServicesSection from "./sections/ServicesSection";
import ResultsSection from "./sections/ResultsSection";
import AboutSection from "./sections/AboutSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import AppointmentSection from "./sections/AppointmentSection";

const dentistPoppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

type Props = {
  profile: PersonalProfile;
};

type NavSection = "home" | "services" | "results" | "reviews" | "contact";

/* =========================================================
   SOCIAL ICON
========================================================= */

function SocialIcon({ platform }: { platform: string }) {
  const iconClass = "h-[18px] w-[18px]";

  switch (platform) {
    case "facebook":
      return <FaFacebookF className={iconClass} />;

    case "instagram":
      return <FaInstagram className={iconClass} />;

    case "linkedin":
      return <FaLinkedinIn className={iconClass} />;

    case "tiktok":
      return <FaTiktok className={iconClass} />;

    case "youtube":
      return <FaYoutube className={iconClass} />;

    case "whatsapp":
      return <FaWhatsapp className={iconClass} />;

    case "x":
      return <FaXTwitter className={iconClass} />;

    default:
      return <FiGlobe className={iconClass} />;
  }
}

/* =========================================================
   SOCIAL LABEL
========================================================= */

function getSocialLabel(platform: string) {
  switch (platform) {
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

    case "x":
      return "X";

    default:
      return "Website";
  }
}

/* =========================================================
   CLINIC SOCIAL SECTION
========================================================= */

function ClinicSocialSection({ profile }: { profile: PersonalProfile }) {
  if (!profile.socials?.length) {
    return null;
  }

  return (
    <section
      id="socials"
      className="
        scroll-mt-24
        px-6
        pt-16
      "
    >
      {/* Section heading */}

      <div
        className="
          mb-8
          flex
          items-end
          gap-4
        "
      >
        <div>
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-[#aa7a34]
            "
          >
            Stay Connected
          </p>

          <h2
            className="
    mt-1
    text-[25px]
    font-medium
    tracking-[-0.02em]
    text-[#162b2f]
    dark:text-[#f2eee6]
  "
          >
            Find us online
          </h2>
        </div>
      </div>

      {/* Description */}

      <p
        className="
          max-w-[330px]
          text-[11px]
          leading-[1.8]
          text-[#737e7f]
          dark:text-[#929d9e]
        "
      >
        Follow our clinic for dental tips, updates, smile transformations, and
        the latest information from our practice.
      </p>

      {/* Social links */}

      <div className="mt-7 space-y-2">
        {profile.socials.map((social, index) => (
          <a
            key={`${social.platform}-${index}`}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            className="
                group
                flex
                min-h-[62px]
                items-center
                justify-between
                border-t
                border-[#d9d4ca]
                py-3
                transition-colors
                dark:border-[#293638]
              "
          >
            {/* Left */}

            <div
              className="
                  flex
                  items-center
                  gap-4
                "
            >
              {/* Icon */}

              <div
                className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#d9d4ca]
                    bg-[#fbfaf7]
                    text-[#263b3e]
                    transition-all
                    duration-200
                    group-hover:border-[#b58a45]
                    group-hover:bg-[#b58a45]
                    group-hover:text-white
                    dark:border-[#344648]
                    dark:bg-[#172527]
                    dark:text-[#dfe5e2]
                    dark:group-hover:border-[#b58a45]
                    dark:group-hover:bg-[#b58a45]
                    dark:group-hover:text-white
                  "
              >
                <SocialIcon platform={social.platform} />
              </div>

              {/* Text */}

              <div>
                <p
                  className="
                      text-[11px]
                      font-semibold
                      text-[#172b2f]
                      dark:text-[#eeeae3]
                    "
                >
                  {getSocialLabel(social.platform)}
                </p>

                <p
                  className="
                      mt-0.5
                      text-[9px]
                      text-[#7b8585]
                      dark:text-[#899596]
                    "
                >
                  Follow our clinic
                </p>
              </div>
            </div>

            {/* Arrow */}

            <FiArrowRight
              className="
                  h-[16px]
                  w-[16px]
                  text-[#aa7a34]
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
            />
          </a>
        ))}

        <div
          className="
            border-t
            border-[#d9d4ca]
            dark:border-[#293638]
          "
        />
      </div>
    </section>
  );
}

/* =========================================================
   BOTTOM NAV ICON
========================================================= */

function BottomNavIcon({ section }: { section: NavSection }) {
  const className = "h-[17px] w-[17px]";

  switch (section) {
    case "home":
      return <FiHome className={className} />;

    case "services":
      return <FiBriefcase className={className} />;

    case "results":
      return <FiImage className={className} />;

    case "reviews":
      return <FiMessageCircle className={className} />;

    case "contact":
      return <FiMap className={className} />;

    default:
      return null;
  }
}

/* =========================================================
   BOTTOM NAV ITEM
========================================================= */

function BottomNavItem({
  label,
  section,
  active,
  onClick,
}: {
  label: string;
  section: NavSection;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Go to ${label}`}
      aria-current={active ? "page" : undefined}
      className={`
        group
        relative
        flex
        min-h-[62px]
        flex-col
        items-center
        justify-center
        rounded-[14px]
        px-1
        transition-all
        duration-200
        active:scale-[0.95]
        ${active ? "bg-white/[0.09]" : "hover:bg-white/[0.05]"}
      `}
    >
      {/* Active indicator */}

      <span
        className={`
          absolute
          top-0
          h-[2px]
          rounded-full
          transition-all
          duration-300
          ${
            active
              ? "w-7 bg-[#d0a760] opacity-100"
              : "w-0 bg-[#d0a760] opacity-0"
          }
        `}
      />

      {/* Icon */}

      <span
        className={`
          flex
          h-7
          w-7
          items-center
          justify-center
          transition-all
          duration-200
          ${
            active
              ? "translate-y-[-1px] text-[#d5ae69]"
              : "text-white/50 group-hover:text-white/80"
          }
        `}
      >
        <BottomNavIcon section={section} />
      </span>

      {/* Label */}

      <span
        className={`
          mt-0.5
          whitespace-nowrap
          text-[8px]
          font-medium
          tracking-[0.02em]
          transition-colors
          ${active ? "text-white" : "text-white/50 group-hover:text-white/80"}
        `}
      >
        {label}
      </span>
    </button>
  );
}

/* =========================================================
   MAIN TEMPLATE
========================================================= */

export default function DentistTemplate({ profile }: Props) {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const [activeSection, setActiveSection] = useState<NavSection>("home");

  /* =======================================================
     MOUNT
  ======================================================= */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* =======================================================
     SCROLL-AWARE NAVIGATION
  ======================================================= */

  useEffect(() => {
    const sections: {
      id: string;
      nav: NavSection;
    }[] = [
      {
        id: "top",
        nav: "home",
      },
      {
        id: "services",
        nav: "services",
      },
      {
        id: "results",
        nav: "results",
      },
      {
        id: "reviews",
        nav: "reviews",
      },
      {
        id: "contact",
        nav: "contact",
      },
    ];

    const handleScroll = () => {
      /*
       * We use a point near the upper
       * part of the viewport rather
       * than the exact viewport top.
       *
       * This makes the active section
       * feel more natural underneath
       * the sticky header.
       */

      const marker = window.scrollY + 140;

      let current: NavSection = "home";

      for (const section of sections) {
        const element = document.getElementById(section.id);

        if (!element) {
          continue;
        }

        if (element.offsetTop <= marker) {
          current = section.nav;
        }
      }

      /*
       * When we're very close to
       * the bottom, make Contact active.
       */

      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80;

      if (nearBottom) {
        current = "contact";
      }

      setActiveSection(current);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);

      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  /* =======================================================
     SCROLL TO SECTION
  ======================================================= */

  const scrollTo = (id: string, section: NavSection) => {
    /*
     * Immediately move the
     * navigation indicator.
     */

    setActiveSection(section);

    const element = document.getElementById(id);

    if (!element) {
      return;
    }

    /*
     * Account for the sticky
     * header and bottom navigation.
     */

    const headerOffset = 72;

    const elementPosition = element.getBoundingClientRect().top;

    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: "smooth",
    });
  };

  /* =======================================================
     SHARE PROFILE
  ======================================================= */

  const shareProfile = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: profile.name,

          text: profile.title
            ? `${profile.name} — ${profile.title}`
            : profile.name,

          url,
        });
      } catch {
        /*
         * User cancelled
         * native share.
         */
      }

      return;
    }

    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt("Copy this profile link:", url);
    }
  };

  /* =======================================================
     THEME
  ======================================================= */

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  /* =======================================================
     INITIALS
  ======================================================= */

  const initials = profile.name
    .replace(/^Dr\.\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main
      className={`
        ${dentistPoppins.className}
        min-h-screen
        bg-[#f6f3ed]
        text-[#162b2f]
        antialiased
        dark:bg-[#0d1517]
        dark:text-[#f2eee6]
      `}
    >
      <div
        className="
          mx-auto
          min-h-screen
          w-full
          max-w-[430px]
          overflow-x-hidden
          bg-[#f6f3ed]
          shadow-[0_0_70px_rgba(20,35,38,0.08)]
          dark:bg-[#0d1517]
        "
      >
        {/* =================================================
            TOP NAVIGATION
        ================================================= */}

        <header
          className="
            sticky
            top-0
            z-50
            border-b
            border-[#ded9cf]/80
            bg-[#f6f3ed]/90
            backdrop-blur-xl
            dark:border-[#29393b]
            dark:bg-[#0d1517]/90
          "
        >
          <div
            className="
              flex
              h-[58px]
              items-center
              justify-between
              px-5
            "
          >
            {/* Logo */}

            <button
              type="button"
              onClick={() => scrollTo("top", "home")}
              className="
                group
                flex
                items-center
                gap-2.5
              "
              aria-label="Go to top"
            >
              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#cfc9be]
                  text-[10px]
                  font-semibold
                  tracking-[0.08em]
                  text-[#162b2f]
                  transition
                  group-hover:border-[#b58a45]
                  dark:border-[#334345]
                  dark:text-[#f2eee6]
                "
              >
                {initials}
              </span>

              <span
                className="
                  hidden
                  max-w-[190px]
                  truncate
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#697576]
                  sm:block
                  dark:text-[#929d9e]
                "
              >
                {profile.company || "Dental Care"}
              </span>
            </button>

            {/* Header actions */}

            <div
              className="
                flex
                items-center
                gap-1
              "
            >
              {/* Share */}

              <button
                type="button"
                onClick={shareProfile}
                aria-label="Share profile"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  text-[#24393d]
                  transition
                  hover:bg-black/5
                  dark:text-[#eeeae4]
                  dark:hover:bg-white/5
                "
              >
                <FiShare2 className="h-[17px] w-[17px]" />
              </button>

              {/* Theme */}

              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  text-[#24393d]
                  transition
                  hover:bg-black/5
                  dark:text-[#eeeae4]
                  dark:hover:bg-white/5
                "
              >
                {!mounted || theme !== "dark" ? (
                  <FiSun className="h-[17px] w-[17px]" />
                ) : (
                  <FiMoon className="h-[17px] w-[17px]" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* =================================================
            HERO
        ================================================= */}

        <section
          id="top"
          className="
            scroll-mt-20
            px-5
            pb-6
            pt-6
          "
        >
          <div
            className="
              relative
              overflow-hidden
              rounded-[25px]
              bg-[#dbe4e1]
              dark:bg-[#19292b]
            "
          >
            <div className="relative aspect-[0.88]">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                priority
                sizes="(max-width: 430px) 100vw, 430px"
                className="object-cover"
              />

              {/* Image gradient */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#10272b]/90
                  via-[#10272b]/15
                  to-transparent
                "
              />

              {/* Top label */}

              <div
                className="
                  absolute
                  left-5
                  top-5
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/20
                    bg-black/15
                    px-3
                    py-1.5
                    backdrop-blur-md
                  "
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d5ae69]" />

                  <span
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-white/90
                    "
                  >
                    {profile.title || "Dental Care"}
                  </span>
                </div>
              </div>

              {/* Hero content */}

              <div
                className="
                  absolute
                  bottom-5
                  left-5
                  right-5
                "
              >
                <p
                  className="
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.28em]
                    text-[#d9b978]
                  "
                >
                  {profile.company || "Professional Dental Care"}
                </p>

                <h1
                  className="
                    mt-2
                    text-[35px]
                    font-semibold
                    leading-[1.03]
                    tracking-[-0.055em]
                    text-white
                  "
                >
                  {profile.name}
                </h1>

                {profile.bio && (
                  <p
                    className="
                      mt-3
                      max-w-[315px]
                      text-[10px]
                      leading-[1.65]
                      text-white/70
                    "
                  >
                    {profile.bio}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Location / Website */}

          <div
            className="
              mt-4
              flex
              items-center
              justify-between
              gap-4
            "
          >
            {profile.location ? (
              <a
                href={profile.locationUrl || "#"}
                target={profile.locationUrl ? "_blank" : undefined}
                rel={profile.locationUrl ? "noreferrer" : undefined}
                className="
                  group
                  flex
                  min-w-0
                  items-center
                  gap-2
                  text-[10px]
                  text-[#6e7a7b]
                  transition
                  hover:text-[#162b2f]
                  dark:text-[#929d9e]
                  dark:hover:text-[#f2eee6]
                "
              >
                <FiMapPin
                  className="
                    h-3.5
                    w-3.5
                    shrink-0
                    text-[#b58a45]
                  "
                />

                <span className="truncate">{profile.location}</span>

                <FiChevronRight
                  className="
                    h-3
                    w-3
                    shrink-0
                    transition-transform
                    group-hover:translate-x-0.5
                  "
                />
              </a>
            ) : (
              <div />
            )}

            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noreferrer"
                aria-label="Visit website"
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#d6d1c7]
                  text-[#162b2f]
                  transition
                  hover:border-[#b58a45]
                  hover:bg-white
                  dark:border-[#334446]
                  dark:text-[#eeeae4]
                  dark:hover:bg-[#172527]
                "
              >
                <FiGlobe className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </section>

        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <QuickActions profile={profile} />

        {/* =================================================
            SERVICES
        ================================================= */}

        <ServicesSection profile={profile} />

        {/* =================================================
            RESULTS
        ================================================= */}

        <ResultsSection profile={profile} />

        {/* =================================================
            ABOUT
        ================================================= */}

        <AboutSection profile={profile} />

        {/* =================================================
            TESTIMONIALS
        ================================================= */}

        <TestimonialsSection profile={profile} />

        {/* =================================================
            SOCIAL MEDIA
        ================================================= */}

        <ClinicSocialSection profile={profile} />

        {/* =================================================
            APPOINTMENT
        ================================================= */}

        <AppointmentSection profile={profile} />

        {/* =================================================
              POWERED BY DEXTAP
          ================================================= */}

        <div
          className="
              flex
              items-center
              justify-center
              gap-2
              px-6
              pt-6
            "
        >
          <span
            className="
                text-[8px]
                font-medium
                uppercase
                tracking-[0.22em]
                text-[#8b9291]
                dark:text-[#667374]
              "
          >
            Powered by
          </span>

          <a
            href="https://dextap.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="
      text-[9px]
      font-semibold
      tracking-[0.08em]
      text-[#162b2f]
      transition-colors
      hover:text-[#b58a45]
      dark:text-[#eeeae4]
      dark:hover:text-[#d5ae69]
    "
          >
            DexTap
          </a>
        </div>

        {/* =================================================
            BOTTOM NAVIGATION
        ================================================= */}

        <nav
          className="
            fixed
            bottom-0
            left-1/2
            z-50
            w-full
            max-w-[430px]
            -translate-x-1/2
            border-t
            border-white/10
            bg-[#162b2f]/95
            px-3
            pb-[calc(8px+env(safe-area-inset-bottom))]
            pt-2.5
            text-white
            shadow-[0_-15px_40px_rgba(20,35,38,0.16)]
            backdrop-blur-xl
          "
        >
          <div
            className="
              grid
              grid-cols-5
              gap-1
            "
          >
            <BottomNavItem
              label="Home"
              section="home"
              active={activeSection === "home"}
              onClick={() => scrollTo("top", "home")}
            />

            <BottomNavItem
              label="Services"
              section="services"
              active={activeSection === "services"}
              onClick={() => scrollTo("services", "services")}
            />

            <BottomNavItem
              label="Results"
              section="results"
              active={activeSection === "results"}
              onClick={() => scrollTo("results", "results")}
            />

            <BottomNavItem
              label="Reviews"
              section="reviews"
              active={activeSection === "reviews"}
              onClick={() => scrollTo("reviews", "reviews")}
            />

            <BottomNavItem
              label="Contact"
              section="contact"
              active={activeSection === "contact"}
              onClick={() => scrollTo("contact", "contact")}
            />
          </div>
        </nav>

        {/* Bottom navigation breathing room */}

        <div className="h-24" />
      </div>
    </main>
  );
}
