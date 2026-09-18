"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { Poppins } from "next/font/google";

import type { PersonalProfile } from "@/lib/profiles";

import {
  FiCamera,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiMoon,
  FiShare2,
  FiSun,
  FiUserPlus,
  FiVideo,
} from "./icons";

import {
  ContactSection,
  LocationSection,
  PortfolioSection,
  ServicesSection,
  TestimonialsSection,
} from "./sections";

const poppins = Poppins({
  variable: "--font-poppins-videographer",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type Props = {
  profile: PersonalProfile;
};

function escapeVCardValue(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

async function imageToBase64(imageUrl: string) {
  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error("Failed to load image");
    }

    const blob = await response.blob();
    const mimeType = blob.type || "image/jpeg";

    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result;

        if (typeof result !== "string") {
          reject(new Error("Invalid image"));
          return;
        }

        const comma = result.indexOf(",");

        if (comma === -1) {
          reject(new Error("Invalid image data"));
          return;
        }

        resolve(result.substring(comma + 1));
      };

      reader.onerror = () => {
        reject(new Error("Image read failed"));
      };

      reader.readAsDataURL(blob);
    });

    return {
      base64,
      mimeType,
    };
  } catch (error) {
    console.error("Profile image error:", error);
    return null;
  }
}

export default function VideographerTemplate({
  profile,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    setMounted(true);

    const stored = localStorage.getItem(
      "dextap-videographer-theme",
    );

    if (stored === "dark") {
      setDarkMode(true);
    } else if (stored === "light") {
      setDarkMode(false);
    } else {
      setDarkMode(
        window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches,
      );
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");

      localStorage.setItem(
        "dextap-videographer-theme",
        "dark",
      );
    } else {
      root.classList.remove("dark");

      localStorage.setItem(
        "dextap-videographer-theme",
        "light",
      );
    }
  }, [darkMode, mounted]);

  useEffect(() => {
    const sections = [
      "home",
      "services",
      "portfolio",
      "reviews",
      "contact",
      "location",
    ];

    const observers: IntersectionObserver[] = [];

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);

      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId);
          }
        },
        {
          rootMargin: "-30% 0px -55% 0px",
          threshold: 0,
        },
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: profile.name,
          text: `${profile.name}${
            profile.title ? ` — ${profile.title}` : ""
          }`,
          url,
        });

        return;
      }

      await navigator.clipboard.writeText(url);

      alert("Profile link copied to clipboard.");
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        return;
      }

      try {
        await navigator.clipboard.writeText(url);

        alert("Profile link copied to clipboard.");
      } catch {
        alert("Unable to share this profile.");
      }
    }
  };

  const handleSaveContact = async () => {
    try {
      const fullName = profile.name.trim();

      const parts = fullName.split(/\s+/);

      const firstName = parts[0] || "";

      const lastName =
        parts.slice(1).join(" ") || "";

      const avatar = profile.avatar
        ? await imageToBase64(profile.avatar)
        : null;

      const lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",

        `FN:${escapeVCardValue(fullName)}`,

        `N:${escapeVCardValue(
          lastName,
        )};${escapeVCardValue(
          firstName,
        )};;;`,

        profile.company
          ? `ORG:${escapeVCardValue(
              profile.company,
            )}`
          : "",

        profile.title
          ? `TITLE:${escapeVCardValue(
              profile.title,
            )}`
          : "",

        profile.email
          ? `EMAIL;TYPE=INTERNET:${escapeVCardValue(
              profile.email,
            )}`
          : "",

        profile.phone
          ? `TEL;TYPE=CELL:${escapeVCardValue(
              profile.phone,
            )}`
          : "",

        profile.whatsapp
          ? `TEL;TYPE=WORK:${escapeVCardValue(
              profile.whatsapp,
            )}`
          : "",

        profile.website
          ? `URL:${escapeVCardValue(
              profile.website,
            )}`
          : "",

        profile.location
          ? `ADR;TYPE=WORK:;;${escapeVCardValue(
              profile.location,
            )};;;;`
          : "",
      ];

      if (avatar) {
        const imageType = avatar.mimeType
          .toLowerCase()
          .includes("png")
          ? "PNG"
          : "JPEG";

        lines.push(
          `PHOTO;ENCODING=b;TYPE=${imageType}:${avatar.base64}`,
        );
      }

      lines.push("END:VCARD");

      const vcard = lines
        .filter(Boolean)
        .join("\r\n");

      const blob = new Blob([vcard], {
        type: "text/vcard;charset=utf-8",
      });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = `${fullName
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
      console.error("Save contact error:", error);

      alert(
        "Unable to save the contact. Please try again.",
      );
    }
  };

  const services = profile.services ?? [];
  const portfolio = profile.portfolio ?? [];
  const testimonials = profile.testimonials ?? [];

  const websiteHref = profile.website
    ? profile.website.startsWith("http")
      ? profile.website
      : `https://${profile.website}`
    : "";

  return (
    <main
      className={`
        ${poppins.variable}

        min-h-dvh
        w-full

        bg-[#e8e3d9]
        font-[family-name:var(--font-poppins-videographer)]
        text-[#171613]

        dark:bg-[#020202]
        dark:text-[#f5f1e8]

        sm:flex
        sm:justify-center
        sm:px-5
        sm:py-10
      `}
    >
      <div
        className="
          relative
          w-full
          max-w-[430px]
          overflow-hidden

          bg-[#fbfaf7]

          shadow-[0_30px_100px_rgba(0,0,0,0.16)]

          dark:bg-[#080807]
          dark:shadow-[0_30px_100px_rgba(0,0,0,0.6)]

          sm:rounded-[34px]
        "
      >
        {/* =========================================================
            HERO
        ========================================================= */}

        <section
          id="home"
          className="relative scroll-mt-0"
        >
          <div className="relative h-[525px] overflow-hidden">
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              priority
              sizes="(max-width: 430px) 100vw, 430px"
              className="
                object-cover
                object-center
                scale-[1.01]
              "
            />

            {/* Cinematic overlay */}
            <div
              className="
                absolute
                inset-0

                bg-gradient-to-b
                from-black/35
                via-black/5
                to-black/95
              "
            />

            {/* Left cinematic shadow */}
            <div
              className="
                absolute
                inset-y-0
                left-0
                w-1/2
                bg-gradient-to-r
                from-black/25
                to-transparent
              "
            />

            {/* Gold cinematic glow */}
            <div
              className="
                absolute
                bottom-20
                left-1/2
                h-44
                w-80
                -translate-x-1/2
                rounded-full
                bg-[#c6a15b]/18
                blur-[85px]
              "
            />

            {/* Top gold hairline */}
            <div
              className="
                absolute
                left-5
                right-5
                top-0
                h-px
                bg-gradient-to-r
                from-transparent
                via-[#e4c477]/70
                to-transparent
              "
            />

            {/* Creative label */}
            <div className="absolute left-5 top-5">
              <div
                className="
                  inline-flex
                  items-center
                  gap-2

                  rounded-full
                  border
                  border-[#e6c982]/30

                  bg-black/25

                  px-3.5
                  py-2

                  shadow-[0_8px_30px_rgba(0,0,0,0.18)]

                  backdrop-blur-xl
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#e0bd69] shadow-[0_0_12px_rgba(224,189,105,0.8)]" />

                <FiCamera
                  size={11}
                  className="text-[#e6c982]"
                />

                <span
                  className="
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-[0.2em]
                    text-[#f4e7c5]
                  "
                >
                  Visual Artist
                </span>
              </div>
            </div>

            {/* Theme */}
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
                  border-white/20

                  bg-black/25

                  text-[#f4e7c5]

                  shadow-[0_8px_30px_rgba(0,0,0,0.18)]

                  backdrop-blur-xl

                  transition-all
                  duration-300

                  hover:border-[#e6c982]/50
                  hover:bg-black/45

                  active:scale-95

                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#e0bd69]/60
                  focus:ring-offset-2
                  focus:ring-offset-black
                "
              >
                {darkMode ? (
                  <FiSun size={16} />
                ) : (
                  <FiMoon size={16} />
                )}
              </button>
            ) : (
              <div
                className="
                  absolute
                  right-5
                  top-5
                  h-10
                  w-10
                  rounded-full
                  border
                  border-white/20
                  bg-black/25
                  backdrop-blur-xl
                "
              />
            )}

            {/* Hero information */}
            <div
              className="
                absolute
                bottom-0
                left-0
                right-0
                p-5
                pb-12
              "
            >
              <div
                className="
                  mb-4
                  flex
                  items-center
                  gap-2
                "
              >
                <span className="h-px w-7 bg-[#d7b86d]" />

                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-[#e6c982]
                  "
                >
                  Available for projects
                </p>
              </div>

              <h1
                className="
                  max-w-[360px]
                  text-[39px]
                  font-semibold
                  leading-[0.98]
                  tracking-[-0.055em]
                  text-white
                "
              >
                {profile.name}
              </h1>

              {profile.title && (
                <p
                  className="
                    mt-3
                    text-[13px]
                    font-medium
                    tracking-[0.01em]
                    text-white/75
                  "
                >
                  {profile.title}
                </p>
              )}

              {profile.location && (
                <div
                  className="
                    mt-3
                    flex
                    items-center
                    gap-1.5
                    text-[10px]
                    text-white/55
                  "
                >
                  <FiMapPin size={12} />

                  <span>
                    {profile.location}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* =======================================================
              PREMIUM PROFILE CARD
          ======================================================= */}

          <div
            className="
              relative
              z-10
              -mt-9

              rounded-t-[34px]

              border-t
              border-[#c6a15b]/20

              bg-[#fbfaf7]

              px-5
              pb-9
              pt-6

              dark:border-[#c6a15b]/15
              dark:bg-[#080807]
            "
          >
            {/* Gold center detail */}
            <div
              className="
                absolute
                left-1/2
                top-0
                h-[2px]
                w-14
                -translate-x-1/2
                -translate-y-px
                rounded-full
                bg-[#c6a15b]
              "
            />

            {/* Profile mini row */}
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                {profile.company && (
                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-[#9a7838]

                      dark:text-[#d6ba73]
                    "
                  >
                    {profile.company}
                  </p>
                )}

                <p
                  className="
                    mt-1
                    text-[10px]
                    text-black/40

                    dark:text-white/35
                  "
                >
                  Cinematic stories. Real moments.
                </p>
              </div>

              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-[#c6a15b]/25

                  bg-[#f5eddb]

                  text-[#8b6b32]

                  shadow-[0_6px_20px_rgba(198,161,91,0.12)]

                  dark:border-[#c6a15b]/20
                  dark:bg-[#c6a15b]/[0.08]
                  dark:text-[#dfc47e]
                "
              >
                <FiCamera size={18} />
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-7 grid grid-cols-3 gap-3">
              {profile.email && (
                <ActionButton
                  href={`mailto:${profile.email}`}
                  icon={<FiMail size={17} />}
                  label="Email"
                />
              )}

              {profile.website && (
                <ActionButton
                  href={websiteHref}
                  icon={<FiGlobe size={17} />}
                  label="Website"
                  external
                />
              )}

              <button
                type="button"
                onClick={handleShare}
                className="
                  group
                  flex
                  flex-col
                  items-center
                  gap-1.5

                  text-[8px]
                  font-medium
                  text-black/45

                  dark:text-white/40
                "
              >
                <span
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center

                    rounded-full

                    border
                    border-[#c6a15b]/25

                    bg-white

                    text-[#8b6b32]

                    shadow-[0_6px_20px_rgba(0,0,0,0.04)]

                    transition-all
                    duration-300

                    group-hover:-translate-y-1
                    group-hover:border-[#c6a15b]/55
                    group-hover:bg-[#f5eddb]
                    group-hover:shadow-[0_10px_25px_rgba(198,161,91,0.15)]

                    dark:bg-white/[0.035]
                    dark:text-[#dfc47e]

                    dark:group-hover:bg-[#c6a15b]/10
                  "
                >
                  <FiShare2 size={17} />
                </span>

                Share
              </button>
            </div>

            {/* Bio */}
            {profile.bio && (
              <div className="relative mx-auto mt-7 max-w-[350px]">
                <div className="absolute left-1/2 top-0 h-px w-8 -translate-x-1/2 bg-[#c6a15b]/30" />

                <p
                  className="
                    pt-4
                    text-center
                    text-[11px]
                    leading-[1.9]
                    text-black/50

                    dark:text-white/45
                  "
                >
                  {profile.bio}
                </p>
              </div>
            )}

            {/* Save contact */}
            <button
              type="button"
              onClick={handleSaveContact}
              className="
                group
                mt-7
                flex
                h-[56px]
                w-full
                items-center
                justify-center
                gap-2.5

                rounded-full

                border
                border-[#ecd79e]/60

                bg-gradient-to-r
                from-[#c9a65f]
                via-[#e1c57c]
                to-[#c6a15b]

                text-[11px]
                font-semibold
                uppercase
                tracking-[0.08em]
                text-[#17140e]

                shadow-[0_12px_30px_rgba(198,161,91,0.2)]

                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:shadow-[0_16px_38px_rgba(198,161,91,0.28)]

                active:scale-[0.98]

                focus:outline-none
                focus:ring-2
                focus:ring-[#c6a15b]/60
                focus:ring-offset-2
                focus:ring-offset-[#fbfaf7]

                dark:from-[#b9934e]
                dark:via-[#d4b66d]
                dark:to-[#a98443]

                dark:focus:ring-offset-[#080807]
              "
            >
              <FiUserPlus
                size={17}
                className="transition-transform duration-300 group-hover:scale-110"
              />

              Save Contact
            </button>
          </div>
        </section>

        {/* =========================================================
            SERVICES
        ========================================================= */}

        {services.length > 0 && (
          <ServicesSection services={services} />
        )}

        {/* =========================================================
            PORTFOLIO
        ========================================================= */}

        {portfolio.length > 0 && (
          <PortfolioSection portfolio={portfolio} />
        )}

        {/* =========================================================
            REVIEWS
        ========================================================= */}

        {testimonials.length > 0 && (
          <TestimonialsSection
            testimonials={testimonials}
          />
        )}

        {/* =========================================================
            CONTACT
        ========================================================= */}

        <ContactSection profile={profile} />

        {/* =========================================================
            LOCATION
        ========================================================= */}

        <LocationSection profile={profile} />

        {/* =========================================================
            CTA
        ========================================================= */}

        <section className="px-5 py-11">
          <div
            className="
              relative
              overflow-hidden

              rounded-[30px]

              border
              border-[#c6a15b]/25

              bg-[#151411]

              p-7
              text-center

              shadow-[0_20px_50px_rgba(0,0,0,0.14)]

              dark:bg-[#10100e]
              dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]
            "
          >
            {/* Gold glow */}
            <div
              className="
                absolute
                left-1/2
                top-[-100px]
                h-48
                w-72
                -translate-x-1/2
                rounded-full
                bg-[#c6a15b]/18
                blur-[70px]
              "
            />

            {/* Decorative lines */}
            <div
              className="
                absolute
                left-6
                right-6
                top-5
                h-px
                bg-gradient-to-r
                from-transparent
                via-[#c6a15b]/35
                to-transparent
              "
            />

            <div className="relative">
              <p
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.24em]
                  text-[#d9bd78]
                "
              >
                Have a project?
              </p>

              <h2
                className="
                  mt-3
                  text-[26px]
                  font-semibold
                  leading-[1.1]
                  tracking-[-0.045em]
                  text-white
                "
              >
                Let's create something memorable.
              </h2>

              <p
                className="
                  mx-auto
                  mt-3
                  max-w-[280px]
                  text-[10px]
                  leading-[1.7]
                  text-white/45
                "
              >
                From the first frame to the final edit,
                let's bring your story to life.
              </p>

              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="
                    mt-6
                    inline-flex
                    h-11
                    items-center
                    gap-2

                    rounded-full

                    border
                    border-[#ead28f]/60

                    bg-gradient-to-r
                    from-[#c9a65f]
                    to-[#e0c27a]

                    px-6

                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.1em]
                    text-[#17140e]

                    transition-all
                    duration-300

                    hover:-translate-y-0.5
                    hover:shadow-[0_12px_28px_rgba(198,161,91,0.25)]
                  "
                >
                  <FiMail size={14} />

                  Get In Touch
                </a>
              )}
            </div>
          </div>
        </section>

        {/* =========================================================
            FOOTER
        ========================================================= */}

        <footer
          className="
            border-t
            border-[#c6a15b]/10

            px-5
            pb-28
            pt-8

            text-center
          "
        >
          <a
            href="https://dextap.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              gap-2

              text-[10px]
              font-semibold
              text-[#92723a]

              transition

              hover:text-[#b18d4a]

              dark:text-[#cbb06e]
              dark:hover:text-[#e2c47d]
            "
          >
            <span
              className="
                flex
                h-5
                w-5
                items-center
                justify-center

                rounded-md

                border
                border-[#c6a15b]/20

                bg-[#f2e8d0]

                text-[7px]
                font-bold
                text-[#80652f]

                dark:bg-[#c6a15b]/10
                dark:text-[#d9bd78]
              "
            >
              DT
            </span>

            Powered by DexTap
          </a>

          <p
            className="
              mt-2
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-black/20

              dark:text-white/15
            "
          >
            Digital Business Card
          </p>
        </footer>

        {/* =========================================================
            BOTTOM NAVIGATION
        ========================================================= */}

        <nav
          className="
            fixed
            bottom-3
            left-1/2
            z-50

            w-[calc(100%-24px)]
            max-w-[406px]

            -translate-x-1/2

            rounded-[24px]

            border
            border-[#c6a15b]/20

            bg-[#fbfaf7]/92

            px-2
            py-2

            shadow-[0_18px_55px_rgba(0,0,0,0.18)]

            backdrop-blur-2xl

            dark:border-[#c6a15b]/15
            dark:bg-[#11110f]/92
            dark:shadow-[0_18px_55px_rgba(0,0,0,0.55)]
          "
        >
          <div className="grid grid-cols-5 gap-1">
            <NavItem
              href="#home"
              label="Home"
              active={activeSection === "home"}
              icon={<FiCamera size={15} />}
            />

            <NavItem
              href="#services"
              label="Services"
              active={activeSection === "services"}
              icon={<FiVideo size={15} />}
            />

            <NavItem
              href="#portfolio"
              label="Work"
              active={activeSection === "portfolio"}
              icon={<FiCamera size={15} />}
            />

            <NavItem
              href="#reviews"
              label="Reviews"
              active={activeSection === "reviews"}
              icon={<FiUserPlus size={15} />}
            />

            <NavItem
              href="#contact"
              label="Contact"
              active={activeSection === "contact"}
              icon={<FiMail size={15} />}
            />
          </div>
        </nav>
      </div>
    </main>
  );
}

function ActionButton({
  href,
  icon,
  label,
  external,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={
        external
          ? "noopener noreferrer"
          : undefined
      }
      className="
        group
        flex
        flex-col
        items-center
        gap-1.5

        text-[8px]
        font-medium
        text-black/45

        dark:text-white/40
      "
    >
      <span
        className="
          flex
          h-12
          w-12
          items-center
          justify-center

          rounded-full

          border
          border-[#c6a15b]/25

          bg-white

          text-[#8b6b32]

          shadow-[0_6px_20px_rgba(0,0,0,0.04)]

          transition-all
          duration-300

          group-hover:-translate-y-1
          group-hover:border-[#c6a15b]/55
          group-hover:bg-[#f5eddb]
          group-hover:shadow-[0_10px_25px_rgba(198,161,91,0.15)]

          dark:border-[#c6a15b]/15
          dark:bg-white/[0.035]
          dark:text-[#dfc47e]

          dark:group-hover:bg-[#c6a15b]/10
        "
      >
        {icon}
      </span>

      {label}
    </a>
  );
}

function NavItem({
  href,
  label,
  active,
  icon,
}: {
  href: string;
  label: string;
  active: boolean;
  icon: ReactNode;
}) {
  return (
    <a
      href={href}
      className={`
        group

        flex
        min-w-0
        flex-col
        items-center
        justify-center
        gap-1

        rounded-[17px]

        py-2

        text-[7px]
        font-medium

        transition-all
        duration-300

        focus:outline-none
        focus:ring-2
        focus:ring-[#c6a15b]/50

        ${
          active
            ? `
              bg-[#f1e5c9]
              text-[#80632e]

              shadow-[inset_0_0_0_1px_rgba(198,161,91,0.12)]

              dark:bg-[#c6a15b]/10
              dark:text-[#e0c47e]
            `
            : `
              text-black/35

              hover:bg-black/[0.03]
              hover:text-[#80632e]

              dark:text-white/30
              dark:hover:bg-white/[0.04]
              dark:hover:text-[#d8bc79]
            `
        }
      `}
    >
      <span
        className={`
          transition-transform
          duration-300

          ${
            active
              ? "scale-105"
              : "group-hover:-translate-y-0.5"
          }
        `}
      >
        {icon}
      </span>

      <span>{label}</span>
    </a>
  );
}