"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Poppins } from "next/font/google";

import type { PersonalProfile } from "@/lib/profiles";

import {
  FiArrowUpRight,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiMoon,
  FiPhone,
  FiShare2,
  FiUserPlus,
  FiSun,
} from "react-icons/fi";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa6";

const poppins = Poppins({
  variable: "--font-poppins",
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
    console.error("Unable to load profile image:", error);

    return null;
  }
}

function SocialIcon({ platform }: { platform: string }) {
  switch (platform.toLowerCase()) {
    case "facebook":
      return <FaFacebookF size={17} />;

    case "instagram":
      return <FaInstagram size={18} />;

    case "linkedin":
      return <FaLinkedinIn size={17} />;

    case "tiktok":
      return <FaTiktok size={18} />;

    case "youtube":
      return <FaYoutube size={18} />;

    case "whatsapp":
      return <FaWhatsapp size={18} />;

    default:
      return <FiGlobe size={18} />;
  }
}

function socialColor(platform: string) {
  switch (platform.toLowerCase()) {
    case "facebook":
      return "text-[#1877F2]";

    case "instagram":
      return "text-[#E4405F]";

    case "linkedin":
      return "text-[#0A66C2]";

    case "tiktok":
      return "text-[#111111] dark:text-white";

    case "youtube":
      return "text-[#FF0000]";

    case "whatsapp":
      return "text-[#25D366]";

    default:
      return "text-[#171717] dark:text-white";
  }
}

export default function PersonalPremium({ profile }: Props) {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setMounted(true);

    const storedTheme = localStorage.getItem("dextap-personal-theme");

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

      localStorage.setItem("dextap-personal-theme", "dark");
    } else {
      root.classList.remove("dark");

      localStorage.setItem("dextap-personal-theme", "light");
    }
  }, [darkMode, mounted]);

  const socials = profile.socials ?? [];

  const locationUrl = useMemo(() => {
    if (profile.locationUrl) {
      return profile.locationUrl;
    }

    if (!profile.location) {
      return "#";
    }

    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      profile.location,
    )}`;
  }, [profile.location, profile.locationUrl]);

  const mapEmbedUrl = useMemo(() => {
    if (!profile.location) {
      return "";
    }

    return `https://www.google.com/maps?q=${encodeURIComponent(
      profile.location,
    )}&output=embed`;
  }, [profile.location]);

  const handleShare = async () => {
    const shareUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: profile.name,
          text: `${profile.name}${profile.title ? ` — ${profile.title}` : ""}`,
          url: shareUrl,
        });

        return;
      }

      await navigator.clipboard.writeText(shareUrl);

      alert("Profile link copied to clipboard.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      try {
        await navigator.clipboard.writeText(shareUrl);

        alert("Profile link copied to clipboard.");
      } catch {
        alert("Unable to share this profile.");
      }
    }
  };

  const handleSaveContact = async () => {
    try {
      const fullName = profile.name.trim();

      const nameParts = fullName.split(/\s+/);

      const firstName = nameParts[0] || "";

      const lastName = nameParts.slice(1).join(" ") || "";

      const avatar = profile.avatar
        ? await imageToBase64(profile.avatar)
        : null;

      const lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",

        `FN:${escapeVCardValue(fullName)}`,

        `N:${escapeVCardValue(lastName)};${escapeVCardValue(firstName)};;;`,

        profile.company ? `ORG:${escapeVCardValue(profile.company)}` : "",

        profile.title ? `TITLE:${escapeVCardValue(profile.title)}` : "",

        profile.email
          ? `EMAIL;TYPE=INTERNET:${escapeVCardValue(profile.email)}`
          : "",

        profile.phone ? `TEL;TYPE=CELL:${escapeVCardValue(profile.phone)}` : "",

        profile.whatsapp
          ? `TEL;TYPE=WORK:${escapeVCardValue(profile.whatsapp)}`
          : "",

        profile.website ? `URL:${escapeVCardValue(profile.website)}` : "",

        profile.location
          ? `ADR;TYPE=WORK:;;${escapeVCardValue(profile.location)};;;;`
          : "",
      ];

      if (avatar) {
        const imageType = avatar.mimeType.toLowerCase().includes("png")
          ? "PNG"
          : "JPEG";

        lines.push(`PHOTO;ENCODING=b;TYPE=${imageType}:${avatar.base64}`);
      }

      lines.push("END:VCARD");

      const vcard = lines.filter(Boolean).join("\r\n");

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
      console.error("Failed to create contact:", error);

      alert("Unable to save the contact. Please try again.");
    }
  };

  return (
    <main
      className={`
        ${poppins.variable}

        min-h-dvh
        w-full

        bg-[#eeeae1]
        font-[family-name:var(--font-poppins)]
        text-[#171613]

        dark:bg-[#050505]
        dark:text-[#f5f1e8]

        sm:flex
        sm:items-center
        sm:justify-center
        sm:px-5
        sm:py-10
      `}
    >
      <section
        className="
          relative
          z-10
          min-h-dvh
          w-full
          overflow-hidden

          bg-[#fbfaf6]

          dark:bg-[#0c0c0b]

          sm:min-h-0
          sm:max-w-[430px]
          sm:rounded-[32px]

          sm:border
          sm:border-[#b89b5e]/20

          sm:shadow-[0_30px_100px_rgba(0,0,0,0.15)]

          dark:sm:border-[#c6a15b]/15
          dark:sm:shadow-[0_30px_100px_rgba(0,0,0,0.5)]
        "
      >
        {/* HERO IMAGE */}
        <div
          className="
            relative
            h-[330px]
            w-full
            overflow-hidden

            bg-[#ded8ca]

            dark:bg-[#171613]
          "
        >
          <Image
            src={profile.avatar}
            alt={profile.name}
            fill
            priority
            sizes="(max-width: 430px) 100vw, 430px"
            className="object-cover object-center"
          />

          <div
            className="
              absolute
              inset-0

              bg-gradient-to-b
              from-black/10
              via-transparent
              to-black/65
            "
          />

          {/* Subtle gold glow */}
          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              left-1/2
              h-32
              w-64
              -translate-x-1/2
              rounded-full
              bg-[#c6a15b]/10
              blur-3xl
            "
          />

          {/* PROFILE LABEL */}
          <div
            className="
              absolute
              left-5
              top-5

              rounded-full

              border
              border-[#e6c982]/30

              bg-black/20

              px-3.5
              py-2

              text-[9px]
              font-medium
              uppercase
              tracking-[0.18em]
              text-[#f4e7c5]

              backdrop-blur-xl
            "
          >
            Personal Profile
          </div>

          {/* THEME BUTTON */}
          {mounted ? (
            <button
              type="button"
              onClick={() => setDarkMode((value) => !value)}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
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
                border-[#e6c982]/30

                bg-black/20

                text-[#f4e7c5]

                backdrop-blur-xl

                transition-all

                hover:border-[#e6c982]/50
                hover:bg-black/40

                active:scale-95
              "
            >
              {darkMode ? <FiSun size={17} /> : <FiMoon size={17} />}
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
                border-[#e6c982]/30

                bg-black/20

                backdrop-blur-xl
              "
            />
          )}
        </div>

        {/* CONTENT */}
        <div
          className="
            relative
            z-10
            -mt-8

            rounded-t-[34px]

            bg-[#fbfaf6]

            px-5
            pb-10
            pt-6

            dark:bg-[#0c0c0b]

            sm:px-7
          "
        >
          {/* AVATAR */}
          <div
            className="
              absolute
              -top-[48px]
              left-1/2
              -translate-x-1/2
            "
          >
            <div
              className="
                relative
                h-[96px]
                w-[96px]
                overflow-hidden

                rounded-full

                border-[5px]
                border-[#fbfaf6]

                bg-[#fbfaf6]

                shadow-[0_14px_40px_rgba(0,0,0,0.18)]

                dark:border-[#0c0c0b]
                dark:bg-[#0c0c0b]

                dark:shadow-[0_14px_40px_rgba(0,0,0,0.55)]
              "
            >
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
          </div>

          {/* NAME */}
          <div
            className="
              pt-[46px]
              text-center
            "
          >
            <h1
              className="
                text-[30px]
                font-semibold
                leading-[1.08]
                tracking-[-0.045em]
              "
            >
              {profile.name}
            </h1>

            {profile.title && (
              <p
                className="
                  mt-2

                  text-[13px]
                  font-medium

                  text-[#806b3e]

                  dark:text-[#cbb47c]
                "
              >
                {profile.title}
              </p>
            )}

            {profile.company && (
              <p
                className="
                  mt-1

                  text-[11px]

                  text-black/35

                  dark:text-white/35
                "
              >
                {profile.company}
              </p>
            )}
          </div>

          {/* EMAIL / WEBSITE / SHARE */}
          <div
            className="
              mt-5
              flex
              items-center
              justify-center
              gap-2.5
            "
          >
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-[#b89b5e]/20

                  bg-white

                  text-[#171613]

                  shadow-[0_5px_18px_rgba(0,0,0,0.05)]

                  transition

                  hover:-translate-y-0.5
                  hover:border-[#b89b5e]/45
                  hover:bg-[#f7f0df]
                  hover:text-[#9a7838]
                  hover:shadow-md

                  dark:border-[#c6a15b]/20
                  dark:bg-white/[0.04]
                  dark:text-white

                  dark:hover:border-[#c6a15b]/45
                  dark:hover:bg-[#c6a15b]/10
                  dark:hover:text-[#e2c982]
                "
              >
                <FiMail size={18} />
              </a>
            )}

            {profile.website && (
              <a
                href={
                  profile.website.startsWith("http")
                    ? profile.website
                    : `https://${profile.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-[#b89b5e]/20

                  bg-white

                  text-[#171613]

                  shadow-[0_5px_18px_rgba(0,0,0,0.05)]

                  transition

                  hover:-translate-y-0.5
                  hover:border-[#b89b5e]/45
                  hover:bg-[#f7f0df]
                  hover:text-[#9a7838]
                  hover:shadow-md

                  dark:border-[#c6a15b]/20
                  dark:bg-white/[0.04]
                  dark:text-white

                  dark:hover:border-[#c6a15b]/45
                  dark:hover:bg-[#c6a15b]/10
                  dark:hover:text-[#e2c982]
                "
              >
                <FiGlobe size={18} />
              </a>
            )}

            {/* SHARE */}
            <button
              type="button"
              onClick={handleShare}
              aria-label="Share profile"
              className="
                flex
                h-11
                w-11
                items-center
                justify-center

                rounded-full


                  border
                  border-[#b89b5e]/20

                  bg-white

                  text-[#171613]

                  shadow-[0_5px_18px_rgba(0,0,0,0.05)]

                  transition

                  hover:-translate-y-0.5
                  hover:border-[#b89b5e]/45
                  hover:bg-[#f7f0df]
                  hover:text-[#9a7838]
                  hover:shadow-md

                  dark:border-[#c6a15b]/20
                  dark:bg-white/[0.04]
                  dark:text-white

                  dark:hover:border-[#c6a15b]/45
                  dark:hover:bg-[#c6a15b]/10
                  dark:hover:text-[#e2c982]
              "
            >
              <FiShare2 size={18} />
            </button>
          </div>

          {/* SOCIALS */}
          {socials.length > 0 && (
            <section
              className="
                mt-6

                rounded-[24px]

                border
                border-[#b89b5e]/15

                bg-white

                p-4

                shadow-[0_8px_30px_rgba(0,0,0,0.035)]

                dark:border-[#c6a15b]/12
                dark:bg-white/[0.025]
                dark:shadow-none
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]

                    text-[#806b3e]

                    dark:text-[#bda96f]
                  "
                >
                  Social
                </p>

                <div
                  className="
                    ml-3
                    h-px
                    flex-1

                    bg-[#b89b5e]/15

                    dark:bg-[#c6a15b]/12
                  "
                />
              </div>

              <div
                className="
                  mt-4

                  grid
                  grid-cols-3
                  gap-2.5
                "
              >
                {socials.slice(0, 6).map((social, index) => (
                  <a
                    key={`${social.platform}-${index}`}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className="
                          flex
                          h-[54px]
                          items-center
                          justify-center

                          rounded-2xl

                          border
                          border-[#b89b5e]/15

                          bg-[#fcfaf5]

                          transition-all
                          duration-200

                          hover:-translate-y-0.5
                          hover:border-[#b89b5e]/35
                          hover:bg-[#f7f0df]
                          hover:shadow-md

                          dark:border-[#c6a15b]/10
                          dark:bg-white/[0.025]

                          dark:hover:border-[#c6a15b]/30
                          dark:hover:bg-[#c6a15b]/[0.07]
                        "
                  >
                    <span className={socialColor(social.platform)}>
                      <SocialIcon platform={social.platform} />
                    </span>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* SAVE CONTACT */}
          <button
            type="button"
            onClick={handleSaveContact}
            className="
              mt-5

              flex
              h-[57px]
              w-full
              items-center
              justify-center
              gap-2.5

              rounded-full

              bg-[#171613]

              text-[13px]
              font-semibold
              text-[#f8f1df]

              shadow-[0_12px_30px_rgba(0,0,0,0.15)]

              transition-all
              duration-200

              hover:-translate-y-0.5

              hover:bg-[#29261f]

              hover:shadow-[0_16px_35px_rgba(0,0,0,0.20)]

              active:scale-[0.98]

              dark:bg-[#d5b76a]
              dark:text-[#16140f]

              dark:hover:bg-[#e0c47e]

              dark:shadow-[0_12px_30px_rgba(198,161,91,0.12)]
            "
          >
            <FiUserPlus size={18} />
            Save Contact
          </button>

          {/* DIVIDER */}
          <div
            className="
              my-8
              h-px

              bg-[#b89b5e]/15

              dark:bg-[#c6a15b]/12
            "
          />

          {/* CONTACT */}
          <section>
            <SectionTitle title="Contact" />

            <div
              className="
                mt-5

                overflow-hidden
                rounded-[22px]

                border
                border-[#b89b5e]/15

                bg-white

                shadow-[0_6px_25px_rgba(0,0,0,0.035)]

                dark:border-[#c6a15b]/12
                dark:bg-white/[0.025]
                dark:shadow-none
              "
            >
              {profile.email && (
                <InfoItem
                  icon={<FiMail size={17} />}
                  label="Email"
                  value={profile.email}
                  href={`mailto:${profile.email}`}
                />
              )}

              {profile.phone && (
                <InfoItem
                  icon={<FiPhone size={17} />}
                  label="Phone"
                  value={profile.phone}
                  href={`tel:${profile.phone}`}
                />
              )}

              {profile.whatsapp && (
                <InfoItem
                  icon={<FaWhatsapp size={18} />}
                  label="WhatsApp"
                  value={profile.whatsapp}
                  href={`https://wa.me/${profile.whatsapp.replace(
                    /[^0-9]/g,
                    "",
                  )}`}
                  external
                />
              )}

              {profile.website && (
                <InfoItem
                  icon={<FiGlobe size={17} />}
                  label="Website"
                  value={profile.website.replace(/^https?:\/\//, "")}
                  href={
                    profile.website.startsWith("http")
                      ? profile.website
                      : `https://${profile.website}`
                  }
                  external
                />
              )}
            </div>
          </section>

          {/* LOCATION */}
          {profile.location && (
            <section className="mt-10">
              <SectionTitle title="Location" />

              <div
                className="
                  mt-5

                  overflow-hidden
                  rounded-[22px]

                  border
                  border-[#b89b5e]/15

                  bg-white

                  shadow-[0_8px_30px_rgba(0,0,0,0.06)]

                  dark:border-[#c6a15b]/12
                  dark:bg-white/[0.025]
                  dark:shadow-none
                "
              >
                <div
                  className="
                    relative
                    h-[220px]
                    w-full
                    overflow-hidden
                  "
                >
                  <iframe
                    title={`${profile.name} location`}
                    src={mapEmbedUrl}
                    className="
                      absolute
                      inset-0
                      h-full
                      w-full
                      border-0
                    "
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>

                <a
                  href={locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4

                    border-t
                    border-[#b89b5e]/15

                    bg-white

                    px-4
                    py-4

                    transition

                    hover:bg-[#fcf8ed]

                    dark:border-[#c6a15b]/12
                    dark:bg-white/[0.025]
                    dark:hover:bg-[#c6a15b]/[0.05]
                  "
                >
                  <div
                    className="
                      flex
                      min-w-0
                      items-center
                      gap-3
                    "
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

                        bg-[#f5eddb]

                        text-[#8b6b32]

                        dark:bg-[#c6a15b]/10
                        dark:text-[#d9bd78]
                      "
                    >
                      <FiMapPin size={17} />
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                          text-[8px]
                          font-medium
                          uppercase
                          tracking-[0.14em]

                          text-[#806b3e]

                          dark:text-[#bda96f]
                        "
                      >
                        Address
                      </p>

                      <p
                        className="
                          mt-1
                          truncate
                          text-[11px]
                          font-medium
                        "
                      >
                        {profile.location}
                      </p>
                    </div>
                  </div>

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center

                      rounded-full

                      bg-[#f5eddb]

                      text-[#8b6b32]

                      dark:bg-[#c6a15b]/10
                      dark:text-[#d9bd78]
                    "
                  >
                    <FiArrowUpRight size={15} />
                  </div>
                </a>
              </div>
            </section>
          )}

          {/* FOOTER */}
          <footer
            className="
              mt-12

              border-t
              border-[#b89b5e]/15

              pt-6
              text-center

              dark:border-[#c6a15b]/12
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

                text-[#806b3e]

                transition

                hover:text-[#9a7838]

                dark:text-[#bda96f]
                dark:hover:text-[#e0c47e]
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

                  bg-[#f1e7cf]

                  dark:bg-[#c6a15b]/10
                "
              >
                <span
                  className="
                    text-[7px]
                    font-bold
                    text-[#806b3e]

                    dark:text-[#d9bd78]
                  "
                >
                  DT
                </span>
              </span>

              <span>
                Powered by <span className="font-semibold">DexTap</span>
              </span>
            </a>

            <p
              className="
                mt-2

                text-[8px]
                font-medium
                uppercase
                tracking-[0.18em]

                text-black/25

                dark:text-white/20
              "
            >
              Digital Business Card
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <h2
        className="
          shrink-0

          text-[9px]
          font-semibold
          uppercase
          tracking-[0.2em]

          text-[#806b3e]

          dark:text-[#bda96f]
        "
      >
        {title}
      </h2>

      <div
        className="
          ml-1
          h-px
          flex-1

          bg-[#b89b5e]/15

          dark:bg-[#c6a15b]/12
        "
      />
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="
        flex
        items-center
        gap-3

        border-b
        border-[#b89b5e]/12

        px-4
        py-4

        last:border-b-0

        transition

        hover:bg-[#fcf8ed]

        dark:border-[#c6a15b]/10
        dark:hover:bg-[#c6a15b]/[0.04]
      "
    >
      <div
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center

          rounded-xl

          bg-[#f5eddb]

          text-[#8b6b32]

          dark:bg-[#c6a15b]/10
          dark:text-[#d9bd78]
        "
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p
          className="
            text-[8px]
            font-medium
            uppercase
            tracking-[0.14em]

            text-[#806b3e]

            dark:text-[#bda96f]
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            truncate
            text-[11px]
            font-medium
          "
        >
          {value}
        </p>
      </div>

      <FiArrowUpRight
        size={15}
        className="
          shrink-0

          text-[#b89b5e]/45

          dark:text-[#c6a15b]/40
        "
      />
    </a>
  );
}
