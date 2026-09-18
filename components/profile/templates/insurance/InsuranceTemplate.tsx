"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Poppins } from "next/font/google";

import type { PersonalProfile } from "@/lib/profiles";

import {
  FiArrowRight,
  FiBriefcase,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiMoon,
  FiPhone,
  FiShield,
  FiStar,
  FiSun,
  FiUserPlus,
} from "./icons";

import {
  ContactSection,
  LocationSection,
  ServicesSection,
  TestimonialsSection,
  TrustSection,
} from "./sections";

const poppins = Poppins({
  variable: "--font-poppins-insurance",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type Props = {
  profile: PersonalProfile;
};

/* -------------------------------------------------------------------------- */
/* VCARD HELPERS                                                              */
/* -------------------------------------------------------------------------- */

function escapeVCardValue(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

async function imageToBase64(
  imageUrl: string,
) {
  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(
        "Failed to load image",
      );
    }

    const blob = await response.blob();

    const mimeType =
      blob.type || "image/jpeg";

    const base64 =
      await new Promise<string>(
        (resolve, reject) => {
          const reader = new FileReader();

          reader.onloadend = () => {
            const result =
              reader.result;

            if (
              typeof result !==
              "string"
            ) {
              reject(
                new Error(
                  "Invalid image",
                ),
              );
              return;
            }

            const comma =
              result.indexOf(",");

            if (comma === -1) {
              reject(
                new Error(
                  "Invalid image data",
                ),
              );
              return;
            }

            resolve(
              result.substring(
                comma + 1,
              ),
            );
          };

          reader.onerror = () =>
            reject(
              new Error(
                "Image read failed",
              ),
            );

          reader.readAsDataURL(blob);
        },
      );

    return {
      base64,
      mimeType,
    };
  } catch (error) {
    console.error(
      "Profile image error:",
      error,
    );

    return null;
  }
}

/* -------------------------------------------------------------------------- */
/* MAIN TEMPLATE                                                             */
/* -------------------------------------------------------------------------- */

export default function InsuranceTemplate({
  profile,
}: Props) {
  const [mounted, setMounted] =
    useState(false);

  const [darkMode, setDarkMode] =
    useState(false);

  const [
    activeSection,
    setActiveSection,
  ] = useState("home");

  /* ---------------------------------------------------------------------- */
  /* THEME                                                                   */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    setMounted(true);

    const stored =
      localStorage.getItem(
        "dextap-insurance-theme",
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
    if (!mounted) {
      return;
    }

    const root =
      document.documentElement;

    if (darkMode) {
      root.classList.add("dark");

      localStorage.setItem(
        "dextap-insurance-theme",
        "dark",
      );
    } else {
      root.classList.remove("dark");

      localStorage.setItem(
        "dextap-insurance-theme",
        "light",
      );
    }
  }, [darkMode, mounted]);

  /* ---------------------------------------------------------------------- */
  /* ACTIVE SECTION                                                          */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    const sections = [
      "home",
      "services",
      "reviews",
      "contact",
      "location",
    ];

    const observers: IntersectionObserver[] =
      [];

    sections.forEach(
      (sectionId) => {
        const element =
          document.getElementById(
            sectionId,
          );

        if (!element) {
          return;
        }

        const observer =
          new IntersectionObserver(
            ([entry]) => {
              if (
                entry.isIntersecting
              ) {
                setActiveSection(
                  sectionId,
                );
              }
            },
            {
              rootMargin:
                "-30% 0px -55% 0px",
              threshold: 0,
            },
          );

        observer.observe(element);

        observers.push(observer);
      },
    );

    return () => {
      observers.forEach(
        (observer) =>
          observer.disconnect(),
      );
    };
  }, []);

  /* ---------------------------------------------------------------------- */
  /* SHARE                                                                    */
  /* ---------------------------------------------------------------------- */

  const handleShare =
    async () => {
      const url =
        window.location.href;

      try {
        if (navigator.share) {
          await navigator.share({
            title: profile.name,
            text: `${profile.name}${
              profile.title
                ? ` — ${profile.title}`
                : ""
            }`,
            url,
          });

          return;
        }

        await navigator.clipboard.writeText(
          url,
        );

        alert(
          "Profile link copied to clipboard.",
        );
      } catch (error) {
        if (
          error instanceof
            DOMException &&
          error.name ===
            "AbortError"
        ) {
          return;
        }

        try {
          await navigator.clipboard.writeText(
            url,
          );

          alert(
            "Profile link copied to clipboard.",
          );
        } catch {
          alert(
            "Unable to share this profile.",
          );
        }
      }
    };

  /* ---------------------------------------------------------------------- */
  /* SAVE CONTACT                                                            */
  /* ---------------------------------------------------------------------- */

  const handleSaveContact =
    async () => {
      try {
        const fullName =
          profile.name.trim();

        const parts =
          fullName.split(/\s+/);

        const firstName =
          parts[0] || "";

        const lastName =
          parts
            .slice(1)
            .join(" ") || "";

        const avatar =
          profile.avatar
            ? await imageToBase64(
                profile.avatar,
              )
            : null;

        const lines = [
          "BEGIN:VCARD",
          "VERSION:3.0",

          `FN:${escapeVCardValue(
            fullName,
          )}`,

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
          const imageType =
            avatar.mimeType
              .toLowerCase()
              .includes("png")
              ? "PNG"
              : "JPEG";

          lines.push(
            `PHOTO;ENCODING=b;TYPE=${imageType}:${avatar.base64}`,
          );
        }

        lines.push(
          "END:VCARD",
        );

        const vcard = lines
          .filter(Boolean)
          .join("\r\n");

        const blob = new Blob(
          [vcard],
          {
            type: "text/vcard;charset=utf-8",
          },
        );

        const url =
          URL.createObjectURL(
            blob,
          );

        const link =
          document.createElement(
            "a",
          );

        link.href = url;

        link.download = `${fullName
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .toLowerCase()}.vcf`;

        document.body.appendChild(
          link,
        );

        link.click();

        document.body.removeChild(
          link,
        );

        setTimeout(() => {
          URL.revokeObjectURL(
            url,
          );
        }, 1000);
      } catch (error) {
        console.error(
          "Save contact error:",
          error,
        );

        alert(
          "Unable to save the contact. Please try again.",
        );
      }
    };

  const services =
    profile.services ?? [];

  const testimonials =
    profile.testimonials ?? [];

  return (
    <main
      className={`
        ${poppins.variable}

        min-h-dvh
        w-full

        bg-[#E9EEF5]

        font-[family-name:var(--font-poppins-insurance)]

        text-[#102C52]

        dark:bg-[#020508]
        dark:text-[#F5F7FA]

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

          bg-[#FBFCFE]

          shadow-[0_30px_100px_rgba(15,43,78,0.16)]

          dark:bg-[#080C11]

          dark:shadow-[0_30px_100px_rgba(0,0,0,0.6)]

          sm:rounded-[32px]
        "
      >
        {/* ================================================================ */}
        {/* HERO                                                             */}
        {/* ================================================================ */}

        <section
          id="home"
          className="relative scroll-mt-0"
        >
          {/* ------------------------------------------------------------ */}
          {/* BANNER                                                       */}
          {/* ------------------------------------------------------------ */}

          <div className="relative h-[480px] overflow-hidden">
            {profile.banner ? (
              <Image
                src={profile.banner}
                alt=""
                fill
                priority
                sizes="(max-width: 430px) 100vw, 430px"
                className="
                  object-cover
                  object-center
                "
              />
            ) : (
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-br
                  from-[#123B73]
                  via-[#092752]
                  to-[#061326]
                "
              />
            )}

            {/* Dark cinematic overlay */}

            <div
              className="
                absolute
                inset-0

                bg-gradient-to-b

                from-[#061A34]/75
                via-[#092752]/20
                to-[#061326]/95
              "
            />

            {/* Blue glow */}

            <div
              className="
                absolute
                -left-20
                top-24

                h-48
                w-48

                rounded-full

                bg-[#4D83BA]/20

                blur-[80px]
              "
            />

            {/* Gold glow */}

            <div
              className="
                absolute
                -right-20
                bottom-24

                h-48
                w-48

                rounded-full

                bg-[#D9B45B]/20

                blur-[80px]
              "
            />

            {/* -------------------------------------------------------- */}
            {/* BRAND                                                     */}
            {/* -------------------------------------------------------- */}

            <div className="absolute left-5 top-5 z-10">
              <div className="flex items-center gap-2.5">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center

                    rounded-xl

                    border
                    border-[#D9B45B]/45

                    bg-[#061A34]/65

                    text-[#E1C477]

                    shadow-[0_8px_25px_rgba(0,0,0,0.2)]

                    backdrop-blur-xl
                  "
                >
                  <FiShield size={19} />
                </div>

                <div>
                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.17em]
                      text-white
                    "
                  >
                    Protect Today
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[8px]
                      uppercase
                      tracking-[0.16em]
                      text-[#E1C477]
                    "
                  >
                    Secure Tomorrow
                  </p>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------- */}
            {/* THEME                                                     */}
            {/* -------------------------------------------------------- */}

            {mounted ? (
              <button
                type="button"
                onClick={() =>
                  setDarkMode(
                    (value) =>
                      !value,
                  )
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

                  text-white

                  backdrop-blur-xl

                  transition

                  hover:border-[#D9B45B]/40
                  hover:bg-black/45

                  active:scale-95
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
                "
              />
            )}

            {/* -------------------------------------------------------- */}
            {/* HERO CONTENT                                              */}
            {/* -------------------------------------------------------- */}

            <div
              className="
                absolute
                bottom-0
                left-0
                right-0
                z-10

                px-5
                pb-10
              "
            >
              {/* Portrait */}

              <div className="flex justify-center">
                <div
                  className="
                    relative

                    h-[118px]
                    w-[118px]

                    overflow-hidden

                    rounded-full

                    border-[4px]
                    border-white

                    bg-white

                    shadow-[0_15px_45px_rgba(0,0,0,0.35)]
                  "
                >
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    sizes="118px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Professional badge */}

              <div className="mt-4 flex justify-center">
                <div
                  className="
                    inline-flex
                    items-center
                    gap-1.5

                    rounded-full

                    border
                    border-[#D9B45B]/40

                    bg-[#061A34]/65

                    px-3
                    py-1.5

                    shadow-[0_8px_25px_rgba(0,0,0,0.15)]

                    backdrop-blur-xl
                  "
                >
                  <FiShield
                    size={11}
                    className="text-[#E1C477]"
                  />

                  <span
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.13em]
                      text-white
                    "
                  >
                    Insurance Professional
                  </span>
                </div>
              </div>

              {/* Name */}

              <h1
                className="
                  mt-3

                  text-center

                  text-[34px]

                  font-semibold

                  leading-[1]

                  tracking-[-0.055em]

                  text-white
                "
              >
                {profile.name}
              </h1>

              {/* Title */}

              {profile.title && (
                <p
                  className="
                    mt-2

                    text-center

                    text-[13px]

                    font-medium

                    text-[#E1C477]
                  "
                >
                  {profile.title}
                </p>
              )}

              {/* Bio */}

              {profile.bio && (
                <p
                  className="
                    mx-auto

                    mt-3

                    max-w-[325px]

                    text-center

                    text-[10px]

                    leading-[1.7]

                    text-white/75
                  "
                >
                  {profile.bio}
                </p>
              )}
            </div>
          </div>

          {/* ========================================================== */}
          {/* QUICK ACTIONS                                               */}
          {/* ========================================================== */}

          <div
            className="
              relative
              z-10

              -mt-5

              rounded-t-[30px]

              bg-[#FBFCFE]

              px-5
              pb-7
              pt-6

              dark:bg-[#080C11]
            "
          >
            <div className="grid grid-cols-4 gap-2">
              {profile.phone && (
                <QuickAction
                  href={`tel:${profile.phone}`}
                  icon={
                    <FiPhone size={17} />
                  }
                  label="Call"
                />
              )}

              {profile.whatsapp && (
                <QuickAction
                  href={`https://wa.me/${profile.whatsapp.replace(
                    /[^0-9]/g,
                    "",
                  )}`}
                  icon={
                    <span className="text-[#25D366]">
                      <FiMessageCircle
                        size={18}
                      />
                    </span>
                  }
                  label="WhatsApp"
                  external
                />
              )}

              {profile.email && (
                <QuickAction
                  href={`mailto:${profile.email}`}
                  icon={
                    <FiMail size={17} />
                  }
                  label="Email"
                />
              )}

              <button
                type="button"
                onClick={
                  handleSaveContact
                }
                className="
                  flex
                  min-w-0
                  flex-col
                  items-center
                  justify-center
                  gap-2

                  rounded-2xl

                  bg-[#C99A35]

                  px-2
                  py-3

                  text-[8px]
                  font-semibold
                  text-white

                  shadow-[0_10px_25px_rgba(201,154,53,0.2)]

                  transition

                  hover:-translate-y-0.5
                  hover:bg-[#D7AA45]

                  active:scale-[0.98]
                "
              >
                <FiUserPlus size={18} />

                Save Contact
              </button>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SERVICES                                                         */}
        {/* ================================================================ */}

        {services.length > 0 && (
          <ServicesSection
            services={services}
          />
        )}

        {/* ================================================================ */}
        {/* TRUST                                                            */}
        {/* ================================================================ */}

        <TrustSection />

        {/* ================================================================ */}
        {/* REVIEWS                                                          */}
        {/* ================================================================ */}

        {testimonials.length > 0 && (
          <TestimonialsSection
            testimonials={
              testimonials
            }
          />
        )}

        {/* ================================================================ */}
        {/* CONTACT                                                          */}
        {/* ================================================================ */}

        <ContactSection
          profile={profile}
        />

        {/* ================================================================ */}
        {/* LOCATION                                                         */}
        {/* ================================================================ */}

        <LocationSection
          profile={profile}
        />

        {/* ================================================================ */}
        {/* CTA                                                              */}
        {/* ================================================================ */}

        <section className="px-5 py-10">
          <div
            className="
              relative
              overflow-hidden

              rounded-[26px]

              bg-[#092752]

              p-6

              shadow-[0_18px_45px_rgba(9,39,82,0.18)]

              dark:bg-[#0D1B2D]
            "
          >
            {/* Gold glow */}

            <div
              className="
                absolute
                -right-10
                -top-16

                h-40
                w-40

                rounded-full

                bg-[#D9B45B]/15

                blur-3xl
              "
            />

            {/* Blue glow */}

            <div
              className="
                absolute
                -bottom-16
                -left-10

                h-40
                w-40

                rounded-full

                bg-[#3E78B8]/20

                blur-3xl
              "
            />

            <div
              className="
                relative
                flex
                items-start
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

                  border
                  border-[#D9B45B]/35

                  bg-[#D9B45B]/10

                  text-[#E1C477]
                "
              >
                <FiShield size={23} />
              </div>

              <div className="min-w-0">
                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-[#E1C477]
                  "
                >
                  Plan Ahead
                </p>

                <h2
                  className="
                    mt-2

                    text-[21px]

                    font-semibold

                    leading-[1.15]

                    tracking-[-0.04em]

                    text-white
                  "
                >
                  Let's Build Your
                  Secure Future
                </h2>

                <p
                  className="
                    mt-2

                    text-[9px]

                    leading-[1.65]

                    text-white/60
                  "
                >
                  The right protection
                  starts with
                  understanding your
                  goals.
                </p>

                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="
                      mt-5

                      inline-flex

                      h-10

                      items-center

                      gap-2

                      rounded-full

                      bg-[#D9B45B]

                      px-5

                      text-[9px]

                      font-semibold

                      uppercase

                      tracking-[0.08em]

                      text-[#092752]

                      transition

                      hover:bg-[#E4C675]
                    "
                  >
                    Let's Talk

                    <FiArrowRight
                      size={14}
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* FOOTER                                                           */}
        {/* ================================================================ */}

        <footer
          className="
            border-t
            border-[#123B73]/10

            px-5
            pb-28
            pt-7

            text-center

            dark:border-white/10
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

              text-[#315887]

              transition

              hover:text-[#123B73]

              dark:text-[#D9B45B]
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

                bg-[#EAF1F9]

                text-[7px]
                font-bold

                text-[#123B73]

                dark:bg-[#D9B45B]/10
                dark:text-[#D9B45B]
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

              tracking-[0.18em]

              text-black/20

              dark:text-white/15
            "
          >
            Digital Business Card
          </p>
        </footer>

        {/* ================================================================ */}
        {/* BOTTOM NAV                                                       */}
        {/* ================================================================ */}

        <nav
          className="
            fixed
            bottom-3
            left-1/2
            z-50

            w-[calc(100%-24px)]

            max-w-[406px]

            -translate-x-1/2

            rounded-[22px]

            border
            border-[#123B73]/12

            bg-[#FBFCFE]/90

            px-2
            py-2

            shadow-[0_15px_50px_rgba(9,39,82,0.15)]

            backdrop-blur-2xl

            dark:border-white/10

            dark:bg-[#0B1119]/90

            dark:shadow-[0_15px_50px_rgba(0,0,0,0.55)]
          "
        >
          <div className="grid grid-cols-5 gap-1">
            <NavItem
              href="#home"
              label="Home"
              active={
                activeSection ===
                "home"
              }
              icon={
                <FiShield size={16} />
              }
            />

            <NavItem
              href="#services"
              label="Services"
              active={
                activeSection ===
                "services"
              }
              icon={
                <FiBriefcase
                  size={16}
                />
              }
            />

            <NavItem
              href="#reviews"
              label="Reviews"
              active={
                activeSection ===
                "reviews"
              }
              icon={
                <FiStar size={16} />
              }
            />

            <NavItem
              href="#contact"
              label="Contact"
              active={
                activeSection ===
                "contact"
              }
              icon={
                <FiPhone size={16} />
              }
            />

            <NavItem
              href="#location"
              label="Location"
              active={
                activeSection ===
                "location"
              }
              icon={
                <FiMapPin size={16} />
              }
            />
          </div>
        </nav>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* QUICK ACTION                                                               */
/* -------------------------------------------------------------------------- */

function QuickAction({
  href,
  icon,
  label,
  external,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={
        external ? "_blank" : undefined
      }
      rel={
        external
          ? "noopener noreferrer"
          : undefined
      }
      className="
        flex
        min-w-0
        flex-col
        items-center
        justify-center
        gap-2

        rounded-2xl

        border
        border-[#123B73]/10

        bg-[#EEF4FB]

        px-2
        py-3

        text-[#123B73]

        transition

        hover:-translate-y-0.5
        hover:border-[#C99A35]/30

        dark:border-white/10
        dark:bg-white/[0.035]
        dark:text-[#D9B45B]
      "
    >
      {icon}

      <span className="text-[8px] font-semibold">
        {label}
      </span>
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/* NAV ITEM                                                                   */
/* -------------------------------------------------------------------------- */

function NavItem({
  href,
  label,
  active,
  icon,
}: {
  href: string;
  label: string;
  active: boolean;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={`
        flex
        min-w-0
        flex-col
        items-center
        justify-center
        gap-1

        rounded-[16px]

        py-2

        text-[7px]

        font-medium

        transition

        ${
          active
            ? `
              bg-[#E5EDF7]
              text-[#123B73]

              dark:bg-[#D9B45B]/10
              dark:text-[#E1C477]
            `
            : `
              text-black/35

              hover:bg-black/[0.03]

              dark:text-white/30
              dark:hover:bg-white/[0.04]
            `
        }
      `}
    >
      {icon}

      <span>{label}</span>
    </a>
  );
}