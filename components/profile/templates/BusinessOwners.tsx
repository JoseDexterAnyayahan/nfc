"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import {
  FiArrowUpRight,
  FiBriefcase,
  FiCode,
  FiCreditCard,
  FiGlobe,
  FiLayers,
  FiMail,
  FiMapPin,
  FiMoon,
  FiPhone,
  FiShare2,
  FiSun,
  FiUserPlus,
  FiWifi,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa6";

import type { BusinessProfile } from "@/lib/profiles";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type Service = {
  name: string;
  description?: string;
};

type BusinessOwnerProfile = BusinessProfile & {
  bio?: string;
  services?: Service[];
};

/* ============================================================
   HELPERS
============================================================ */

function escapeVCardValue(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

const imageToBase64 = async (
  src: string,
): Promise<{ base64: string; type: string } | null> => {
  const response = await fetch(src);

  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.status}`);
  }

  const blob = await response.blob();

  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result as string;

      // Remove: data:image/png;base64,
      // leaving only the actual Base64 content.
      const encoded = result.split(",")[1];

      resolve(encoded);
    };

    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

  const type = blob.type.split("/").pop()?.toUpperCase() || "PNG";

  return {
    base64,
    type,
  };
};

/* ============================================================
   SOCIAL ICON
============================================================ */

function SocialIcon({ platform }: { platform: string }) {
  switch (platform.toLowerCase()) {
    case "facebook":
      return <FaFacebookF size={15} />;

    case "instagram":
      return <FaInstagram size={15} />;

    case "linkedin":
      return <FaLinkedinIn size={15} />;

    case "tiktok":
      return <FaTiktok size={15} />;

    default:
      return <FiGlobe size={16} />;
  }
}

/* ============================================================
   SERVICE ICON
============================================================ */

function ServiceIcon({ name }: { name: string }) {
  const value = name.toLowerCase();

  if (
    value.includes("digital business card") ||
    value.includes("business card")
  ) {
    return <FiCreditCard size={17} />;
  }

  if (value.includes("nfc") || value.includes("contactless")) {
    return <FiWifi size={17} />;
  }

  if (value.includes("digital profile") || value.includes("profile")) {
    return <FiLayers size={17} />;
  }

  if (
    value.includes("custom") ||
    value.includes("web") ||
    value.includes("development") ||
    value.includes("software")
  ) {
    return <FiCode size={17} />;
  }

  if (value.includes("business") || value.includes("consult")) {
    return <FiBriefcase size={17} />;
  }

  return <FiGlobe size={17} />;
}

/* ============================================================
   MAIN TEMPLATE
============================================================ */

export default function BusinessOwners({
  profile,
}: {
  profile: BusinessProfile;
}) {
  const data = profile as BusinessOwnerProfile;

  const [sharing, setSharing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const contactName = data.contactName?.trim() || data.businessName;

  /* ============================================================
     THEME
  ============================================================ */

  useEffect(() => {
    setMounted(true);

    const storedTheme = localStorage.getItem("dextap-business-owner-theme");

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

      localStorage.setItem("dextap-business-owner-theme", "dark");
    } else {
      root.classList.remove("dark");

      localStorage.setItem("dextap-business-owner-theme", "light");
    }
  }, [darkMode, mounted]);

  /* ============================================================
     SHARE
  ============================================================ */

  const handleShare = async () => {
    setSharing(true);

    try {
      if (navigator.share) {
        await navigator.share({
          title: data.businessName,
          text: data.tagline || `Connect with ${data.businessName}`,
          url: window.location.href,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {
      // User cancelled sharing.
    } finally {
      setSharing(false);
    }
  };

  /* ============================================================
     SAVE CONTACT
  ============================================================ */

  const handleSaveContact = async () => {
    const imageSource = data.banner || data.avatar || data.logo;

    let photoBase64 = "";
    let photoType = "PNG";

    if (imageSource) {
      try {
        const result = await imageToBase64(imageSource);

        if (result) {
          photoBase64 = result.base64;
          photoType = result.type;
        }
      } catch (error) {
        console.error("Failed to load contact photo:", error);
      }
    }

    const vCard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${escapeVCardValue(contactName)}`,
      `ORG:${escapeVCardValue(data.businessName)}`,
      `TITLE:${escapeVCardValue(data.contactTitle || "")}`,

      data.email ? `EMAIL;TYPE=WORK:${escapeVCardValue(data.email)}` : "",

      data.phone ? `TEL;TYPE=WORK:${escapeVCardValue(data.phone)}` : "",

      data.website ? `URL:${escapeVCardValue(data.website)}` : "",

      data.location
        ? `ADR;TYPE=WORK:;;${escapeVCardValue(data.location)};;;;`
        : "",

      photoBase64 ? `PHOTO;ENCODING=b;TYPE=${photoType}:${photoBase64}` : "",

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
    link.download = `${contactName || data.businessName}.vcf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* ============================================================
     DATA
  ============================================================ */

  const socials = data.socials?.slice(0, 4) ?? [];

  const locationUrl =
    data.locationUrl ||
    (data.location
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          data.location,
        )}`
      : "#");

  /* ============================================================
     UI
  ============================================================ */

  return (
    <main
      className={`${poppins.variable} min-h-screen bg-[#e7e7e5] font-[family-name:var(--font-poppins)] text-[#111111] dark:bg-[#050505] dark:text-white`}
    >
      <div className="relative mx-auto w-full max-w-[520px]">
        {/* =====================================================
            HERO / STICKY IMAGE
        ====================================================== */}

        <div
          className={`sticky top-0 z-0 h-[100svh] overflow-hidden transition-colors duration-500 ${
            darkMode ? "bg-[#0d0d0d]" : "bg-[#f5f5f5]"
          }`}
        >
          <div className="absolute inset-x-0 top-0 h-[68svh] overflow-hidden">
            <Image
              src={data.banner || data.avatar || data.logo}
              alt={data.businessName}
              fill
              priority
              sizes="(max-width: 520px) 100vw, 520px"
              className="object-cover object-[center_25%]"
            />

            {/* Bottom readability gradient */}
            <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          </div>

          {/* Top controls */}
          <div className="absolute left-5 right-5 top-5 z-20 flex items-center justify-between">
            <div className="rounded-full border border-white/15 bg-black/25 px-3.5 py-2 text-[9px] font-medium uppercase tracking-[0.22em] text-white backdrop-blur-xl">
              Business Profile
            </div>

            {mounted ? (
              <button
                type="button"
                onClick={() => setDarkMode((value) => !value)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/25 text-white backdrop-blur-xl transition hover:bg-black/40"
                aria-label={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {darkMode ? <FiSun size={17} /> : <FiMoon size={17} />}
              </button>
            ) : (
              <div className="h-10 w-10 rounded-full border border-white/15 bg-black/25 backdrop-blur-xl" />
            )}
          </div>

          {/* Owner name */}
          <div className="absolute bottom-[24svh] left-6 right-6 z-10 text-white">
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/70">
              {data.contactTitle || "Business Owner"}
            </p>

            <p className="mt-1 text-3xl font-semibold tracking-[-0.04em]">
              {contactName}
            </p>
          </div>
        </div>

        {/* =====================================================
            SCROLLING PROFILE SHEET
        ====================================================== */}

        <div className="relative z-10 -mt-[48svh] min-h-[155svh] rounded-t-[36px] bg-[#fafafa] px-5 pb-14 pt-5 shadow-[0_-25px_80px_rgba(0,0,0,0.12)] dark:bg-[#0d0d0d] dark:shadow-[0_-25px_80px_rgba(0,0,0,0.45)]">
          {/* Sheet handle */}

          <div className="mx-auto h-1 w-10 rounded-full bg-black/15 dark:bg-white/15" />

          {/* =================================================
              LOGO
          ================================================== */}

          <section className="pt-7">
            <div className="flex justify-center">
              <div
                className="
                  relative
                  h-[104px]
                  w-[104px]
                  shrink-0
                  overflow-hidden
                  rounded-full
                  border-[5px]
                  border-[#fafafa]
                  bg-[#fafafa]
                  shadow-[0_14px_40px_rgba(0,0,0,0.15)]
                  dark:border-[#0d0d0d]
                  dark:bg-[#0d0d0d]
                  dark:shadow-[0_14px_40px_rgba(0,0,0,0.45)]
                "
              >
                <div className="absolute inset-[5px] overflow-hidden rounded-full">
                  <Image
                    src={data.logo}
                    alt={`${data.businessName} logo`}
                    fill
                    sizes="94px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* =================================================
                BUSINESS NAME
            ================================================== */}

            <div className="mt-6 text-center">
              <h1 className="text-[30px] font-semibold leading-[1.08] tracking-[-0.045em]">
                {data.businessName}
              </h1>

              {data.tagline && (
                <p className="mx-auto mt-3 max-w-[330px] text-[13px] leading-5 text-black/50 dark:text-white/45">
                  {data.tagline}
                </p>
              )}
            </div>

            {/* =================================================
                OWNER / POSITION
            ================================================== */}

            <div className="mt-5 text-center">
              {data.contactName && (
                <p className="text-[14px] font-semibold">{data.contactName}</p>
              )}

              {data.contactTitle && (
                <p className="mt-1 text-[12px] text-black/45 dark:text-white/40">
                  {data.contactTitle}
                </p>
              )}
            </div>

            {/* =================================================
                FIELD OF BUSINESS
            ================================================== */}

            <div className="mt-7 rounded-2xl border border-black/[0.07] bg-white px-4 py-4 dark:border-white/[0.08] dark:bg-white/[0.025]">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/35 dark:text-white/30">
                Field of Business
              </p>

              <p className="mt-1.5 text-[13px] font-medium">
                {data.tagline || "Business & Professional Services"}
              </p>
            </div>

            {/* =================================================
                ADDRESS
            ================================================== */}

            {data.location && (
              <a
                href={locationUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex items-center justify-between rounded-2xl border border-black/[0.07] bg-white px-4 py-4 transition hover:bg-black/[0.02] dark:border-white/[0.08] dark:bg-white/[0.025] dark:hover:bg-white/[0.04]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black/[0.045] dark:bg-white/[0.07]">
                    <FiMapPin size={16} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[9px] uppercase tracking-[0.15em] text-black/35 dark:text-white/30">
                      Address
                    </p>

                    <p className="mt-1 truncate text-[12px] font-medium">
                      {data.location}
                    </p>
                  </div>
                </div>

                <FiArrowUpRight
                  size={16}
                  className="shrink-0 text-black/30 dark:text-white/30"
                />
              </a>
            )}
          </section>

          {/* =====================================================
              ACTIONS
          ====================================================== */}

          <div className="mt-7 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleSaveContact}
              className="flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#111111] text-[12px] font-semibold text-white transition hover:bg-black active:scale-[0.98] dark:bg-white dark:text-[#111111] dark:hover:bg-white/90"
            >
              <FiUserPlus size={17} />
              Save Contact
            </button>

            <button
              type="button"
              onClick={handleShare}
              disabled={sharing}
              className="flex h-[52px] items-center justify-center gap-2 rounded-full border border-black/[0.09] bg-white text-[12px] font-semibold text-[#111111] transition hover:bg-black/[0.025] active:scale-[0.98] disabled:opacity-50 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.07]"
            >
              <FiShare2 size={17} />

              {sharing ? "Sharing..." : "Share Contact"}
            </button>
          </div>

          {/* =====================================================
              BIO
          ====================================================== */}

          {data.bio && (
            <section className="mt-12">
              <SectionTitle title="Bio" />

              <p className="mt-5 text-[13px] leading-7 text-black/60 dark:text-white/55">
                {data.bio}
              </p>
            </section>
          )}

          {/* =====================================================
              BASIC INFORMATION
          ====================================================== */}

          <section className="mt-12">
            <SectionTitle title="Basic Information" />

            <div className="mt-5 overflow-hidden rounded-2xl border border-black/[0.08] bg-white dark:border-white/[0.08] dark:bg-white/[0.025]">
              {data.email && (
                <InfoItem
                  icon={<FiMail size={17} />}
                  label="Email"
                  value={data.email}
                  href={`mailto:${data.email}`}
                />
              )}

              {data.phone && (
                <InfoItem
                  icon={<FiPhone size={17} />}
                  label="Contact Number"
                  value={data.phone}
                  href={`tel:${data.phone}`}
                />
              )}

              {data.website && (
                <InfoItem
                  icon={<FiGlobe size={17} />}
                  label="Business Website"
                  value={data.website.replace(/^https?:\/\//, "")}
                  href={data.website}
                  external
                />
              )}

              {data.location && (
                <InfoItem
                  icon={<FiMapPin size={17} />}
                  label="Address"
                  value={data.location}
                  href={locationUrl}
                  external
                />
              )}
            </div>
          </section>

          {/* =====================================================
              WHAT WE DO
          ====================================================== */}

          {data.services && data.services.length > 0 && (
            <section className="mt-12">
              <SectionTitle title="What We Do" />

              <div className="mt-5 space-y-2.5">
                {data.services.map((service, index) => (
                  <div
                    key={`${service.name}-${index}`}
                    className="
                          group
                          flex
                          items-start
                          gap-4
                          rounded-2xl
                          border
                          border-black/[0.08]
                          bg-white
                          p-4
                          transition
                          hover:border-black/[0.14]
                          dark:border-white/[0.08]
                          dark:bg-white/[0.025]
                          dark:hover:border-white/[0.15]
                        "
                  >
                    {/* Service Icon */}

                    <div
                      className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-black/[0.045]
                            text-black/65
                            dark:bg-white/[0.07]
                            dark:text-white/70
                          "
                    >
                      <ServiceIcon name={service.name} />
                    </div>

                    {/* Service Content */}

                    <div className="min-w-0 pt-0.5">
                      <h3 className="text-[13px] font-semibold">
                        {service.name}
                      </h3>

                      {service.description && (
                        <p className="mt-1.5 text-[11px] leading-5 text-black/50 dark:text-white/45">
                          {service.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* =====================================================
              CONNECT
          ====================================================== */}

          {socials.length > 0 && (
            <section className="mt-12">
              <SectionTitle title="Connect" />

              <div className="mt-5 flex flex-wrap gap-2.5">
                {socials.map((social, index) => (
                  <a
                    key={`${social.platform}-${index}`}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.platform}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-black/[0.09] bg-white transition hover:-translate-y-0.5 hover:border-black/20 dark:border-white/[0.1] dark:bg-white/[0.025] dark:hover:border-white/20"
                  >
                    <SocialIcon platform={social.platform} />
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* =====================================================
              LOCATION
          ====================================================== */}

          {data.location && (
            <section className="mt-12">
              <SectionTitle title="Location" />

              <div className="mt-5 overflow-hidden rounded-2xl border border-black/[0.08] dark:border-white/[0.08]">
                <div className="relative h-[220px]">
                  <iframe
                    title={`${data.businessName} location`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      data.location,
                    )}&output=embed`}
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                  />
                </div>

                <a
                  href={locationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between bg-white px-4 py-4 text-[12px] font-semibold dark:bg-white/[0.025]"
                >
                  <span>Open in Google Maps</span>

                  <FiArrowUpRight size={16} />
                </a>
              </div>
            </section>
          )}

          {/* =====================================================
              REVIEW CTA
          ====================================================== */}

          {data.reviewUrl && (
            <section className="mt-12">
              <a
                href={data.reviewUrl}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-2xl bg-[#111111] p-5 text-white transition hover:bg-[#181818] dark:bg-white dark:text-[#111111] dark:hover:bg-white/90"
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/45 dark:text-black/40">
                      Customer Feedback
                    </p>

                    <h3 className="mt-2 text-[17px] font-semibold tracking-[-0.02em]">
                      Leave us a review
                    </h3>

                    <p className="mt-1.5 text-[11px] leading-5 text-white/55 dark:text-black/50">
                      Share your experience and help others discover the
                      business.
                    </p>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 dark:border-black/10">
                    <FiArrowUpRight size={17} />
                  </div>
                </div>
              </a>
            </section>
          )}

          {/* =====================================================
              FOOTER
          ====================================================== */}

          <footer className="mt-16 border-t border-black/[0.08] pt-8 text-center dark:border-white/[0.08]">
            <div className="flex items-center justify-center gap-2.5">
              <div className="relative h-7 w-7 overflow-hidden rounded-lg">
                <Image
                  src="/dextap-logo.png"
                  alt="DexTap"
                  fill
                  sizes="28px"
                  className="object-contain"
                />
              </div>

              <span className="text-[12px] font-semibold tracking-[-0.01em]">
                DexTap
              </span>
            </div>

            <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.18em] text-black/30 dark:text-white/25">
              Digital Business Card
            </p>

            <p className="mt-5 text-[9px] text-black/25 dark:text-white/20">
              Created by DexTap
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}

/* ==============================================================
   SECTION TITLE
================================================================ */

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40 dark:text-white/35">
        {title}
      </h2>

      <div className="h-px flex-1 bg-black/[0.08] dark:bg-white/[0.08]" />
    </div>
  );
}

/* ==============================================================
   INFO ITEM
================================================================ */

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
      rel={external ? "noreferrer" : undefined}
      className="flex items-center gap-3 border-b border-black/[0.07] px-4 py-4 last:border-b-0 transition hover:bg-black/[0.02] dark:border-white/[0.07] dark:hover:bg-white/[0.035]"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black/[0.045] dark:bg-white/[0.06]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[9px] font-medium uppercase tracking-[0.13em] text-black/35 dark:text-white/30">
          {label}
        </p>

        <p className="mt-1 truncate text-[12px] font-medium">{value}</p>
      </div>

      <FiArrowUpRight
        size={15}
        className="shrink-0 text-black/25 dark:text-white/25"
      />
    </a>
  );
}
