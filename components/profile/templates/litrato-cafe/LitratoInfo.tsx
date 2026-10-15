"use client";

import { useEffect, useRef, useState } from "react";
import type { ElementType } from "react";

import {
  FaCalendarCheck,
  FaCar,
  FaCheck,
  FaChevronRight,
  FaCoffee,
  FaConciergeBell,
  FaDirections,
  FaEnvelope,
  FaFacebookF,
  FaGlobe,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaParking,
  FaPaw,
  FaPhoneAlt,
  FaRegCopy,
  FaShoppingBag,
  FaStar,
  FaStore,
  FaTiktok,
  FaTree,
  FaTwitter,
  FaUtensils,
  FaWhatsapp,
  FaWifi,
  FaYoutube,
} from "react-icons/fa";

import type { BusinessProfile } from "@/lib/profiles";
import { litratoColors as c, litratoContainerClass } from "./litrato-styles";
import { FaMotorcycle } from "react-icons/fa6";

type Props = {
  profile: BusinessProfile;
};

/*
 * Service names come from your profile data. Matching ignores case and
 * extra spaces, and anything unrecognised falls back to a store icon.
 */
const serviceIcons: Record<string, ElementType> = {
  delivery: FaMotorcycle,
  "in-store pickup": FaStore,
  pickup: FaStore,
  "pick-up": FaStore,
  takeout: FaShoppingBag,
  takeaway: FaShoppingBag,
  reservations: FaCalendarCheck,
  "dine-in": FaUtensils,
  "dine in": FaUtensils,
  coffee: FaCoffee,
  catering: FaConciergeBell,
  wifi: FaWifi,
  "wi-fi": FaWifi,
  "free wi-fi": FaWifi,
  parking: FaParking,
  "pet-friendly": FaPaw,
  "pet friendly": FaPaw,
  "outdoor seating": FaTree,
};

const socialIcons: Record<string, ElementType> = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  tiktok: FaTiktok,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
  whatsapp: FaWhatsapp,
  x: FaTwitter,
};

const socialLabels: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  whatsapp: "WhatsApp",
  x: "X",
};

// "https://www.example.com/path" -> "example.com"
function prettyUrl(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/*
 * =============================================================
 * CONTACT ROW
 * The main area is the link; the copy button sits beside it (a
 * button can't live inside an anchor).
 * =============================================================
 */

type ContactRowProps = {
  icon: ElementType;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  copied?: boolean;
  onCopy?: () => void;
};

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  external,
  copied,
  onCopy,
}: ContactRowProps) {
  return (
    <div
      className="flex items-center gap-2 rounded-2xl border bg-white pr-3 transition hover:-translate-y-0.5"
      style={{ borderColor: c.border }}
    >
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="litrato-info-focus flex min-w-0 flex-1 items-center gap-4 rounded-2xl p-4"
      >
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
          style={{
            backgroundColor: c.sageLight,
            color: c.sageDark,
          }}
        >
          <Icon aria-hidden="true" />
        </span>

        <span className="min-w-0">
          <span className="block text-xs" style={{ color: c.muted }}>
            {label}
          </span>

          <span className="mt-1 block break-all text-sm font-semibold">
            {value}
          </span>
        </span>
      </a>

      {onCopy && (
        <button
          type="button"
          onClick={onCopy}
          aria-label={
            copied ? `${label} copied` : `Copy ${label.toLowerCase()}`
          }
          className="litrato-info-focus flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition hover:bg-black/5"
          style={{
            borderColor: c.border,
            color: copied ? c.sageDark : c.muted,
          }}
        >
          {copied ? <FaCheck size={13} /> : <FaRegCopy size={14} />}
        </button>
      )}
    </div>
  );
}

/*
 * =============================================================
 * MAIN SECTION
 * =============================================================
 */

export default function LitratoInfo({ profile }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const copyTimer = useRef<number | null>(null);

  const [mapActive, setMapActive] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  /*
   * The map ignores touches/scroll until it's tapped, so scrolling the
   * page on a phone never gets trapped inside the embedded map. Tapping
   * anywhere outside it locks it again.
   */
  useEffect(() => {
    if (!mapActive) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!mapRef.current?.contains(event.target as Node)) {
        setMapActive(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [mapActive]);

  useEffect(() => {
    return () => {
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
    };
  }, []);

  const copyText = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }

    setCopiedKey(key);

    if (copyTimer.current) window.clearTimeout(copyTimer.current);

    copyTimer.current = window.setTimeout(() => {
      setCopiedKey(null);
    }, 1800);
  };

  /*
   * =========================================================
   * DATA
   * =========================================================
   */

  const services = profile.services ?? [];

  const phone = profile.phone?.trim() ?? "";
  const email = profile.email?.trim() ?? "";
  const website = profile.website?.trim() ?? "";
  const address = profile.location?.trim() ?? "";
  const reviewUrl = profile.reviewUrl?.trim() ?? "";

  const phoneHref = phone ? `tel:${phone.replace(/[^0-9+]/g, "")}` : "";

  // The map and the directions link both follow the profile's location.
  const mapQuery = address || profile.businessName;

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    mapQuery,
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const directionsUrl =
    profile.locationUrl?.trim() ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      mapQuery,
    )}`;

  const socialItems = (profile.socials ?? [])
    .map((social, index) => {
      const platform = social.platform.toLowerCase();

      return {
        key: `${platform}-${index}`,
        label: socialLabels[platform] ?? social.platform,
        href: social.url?.trim() ?? "",
        icon: socialIcons[platform],
      };
    })
    .filter((item) => Boolean(item.icon && item.href));

  const hasContactRows = Boolean(phone || email || website);

  return (
    <>
      <style>{`
        .litrato-info-focus:focus-visible {
          outline: 2px solid ${c.sageDark};
          outline-offset: 3px;
        }

        .litrato-social-icon {
          background-color: ${c.sageLight};
        }

        @media (min-width: 640px) {
          .litrato-social-icon {
            background-color: transparent !important;
            width: auto !important;
            height: auto !important;
          }
        }
      `}</style>

      {/* Screen-reader confirmation for the copy buttons */}
      <span className="sr-only" role="status" aria-live="polite">
        {copiedKey ? `${copiedKey} copied to clipboard` : ""}
      </span>

      {/* SERVICES */}
      {services.length > 0 && (
        <section
          className="relative overflow-hidden py-14 sm:py-16"
          style={{ backgroundColor: c.surface }}
        >
          <div className={litratoContainerClass}>
            <div className="flex items-center gap-3">
              <span
                className="h-px w-8 sm:w-10"
                style={{ backgroundColor: c.sageDark }}
                aria-hidden="true"
              />
              <p
                className="text-xs font-semibold tracking-[0.24em]"
                style={{ color: c.sageDark }}
              >
                YOUR KIND OF COFFEE STOP
              </p>
            </div>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Make yourself at home.
            </h2>

            <p
              className="mt-3 max-w-xl text-sm leading-6 sm:text-base"
              style={{ color: c.muted }}
            >
              Whether you are staying for a while or grabbing something to go,
              make Litrato part of your day.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
              {services.map((service, index) => {
                const Icon =
                  serviceIcons[service.name.trim().toLowerCase()] ?? FaStore;

                const isFeatured = index === 0 && services.length > 1;

                // Avoid a lonely half-width card at the end on mobile
                const isOrphan =
                  services.length > 2 &&
                  index === services.length - 1 &&
                  (services.length - 1) % 2 === 1;

                const spanClass =
                  isFeatured || isOrphan ? "col-span-2 sm:col-span-1" : "";

                return (
                  <div
                    key={`${service.name}-${index}`}
                    className={`litrato-service-card group relative flex min-h-36 overflow-hidden rounded-3xl border p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md active:scale-[0.98] sm:min-h-40 sm:flex-col sm:items-start sm:rounded-2xl sm:p-5 ${
                      isFeatured
                        ? "litrato-service-featured flex-row items-center gap-4"
                        : isOrphan
                          ? "flex-row items-center gap-4"
                          : "flex-col items-start"
                    } ${spanClass}`}
                    style={{
                      backgroundColor: c.background,
                      borderColor: c.border,
                    }}
                  >
                    {/* Oversized watermark icon */}
                    <Icon
                      aria-hidden="true"
                      className="litrato-service-mark pointer-events-none absolute -bottom-4 -right-3 rotate-[-12deg] text-[88px] opacity-[0.07] transition duration-500 group-hover:rotate-0 group-hover:scale-110 sm:text-[96px]"
                      style={{ color: c.sageDark }}
                    />

                    {/* Index number */}
                    <span
                      className="litrato-service-index absolute right-4 top-3 text-[10px] font-semibold tracking-[0.2em] opacity-40"
                      style={{ color: c.sageDark }}
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className="litrato-service-icon relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg transition duration-300 group-hover:scale-105 sm:h-10 sm:w-10 sm:rounded-full sm:text-base"
                      style={{
                        backgroundColor: c.sageLight,
                        color: c.sageDark,
                      }}
                    >
                      <Icon aria-hidden="true" />
                    </span>

                    <div
                      className={`relative min-w-0 ${
                        isFeatured || isOrphan ? "" : "mt-auto pt-6"
                      } sm:mt-auto sm:pt-5`}
                    >
                      <span className="block text-sm font-semibold sm:font-medium">
                        {service.name}
                      </span>

                      {service.description && (
                        <span
                          className="litrato-service-desc mt-1 block text-xs leading-5"
                          style={{ color: c.muted }}
                        >
                          {service.description}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* LOCATION AND CONTACT */}
      <section id="litrato-location" className="py-14 sm:py-20">
        <div className={litratoContainerClass}>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* LOCATION */}
            <div>
              <p
                className="text-xs font-semibold tracking-[0.24em]"
                style={{ color: c.sageDark }}
              >
                COME VISIT US
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Your next coffee stop.
              </h2>

              <p className="mt-3 text-sm leading-6" style={{ color: c.muted }}>
                Find your way to Litrato Café and make time for a good cup, great company, and memorable moments.
              </p>

              <div
                className="mt-7 overflow-hidden rounded-2xl border bg-white"
                style={{ borderColor: c.border }}
              >
                <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                  <div className="flex min-w-0 flex-1 items-start gap-4">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: c.sageLight,
                        color: c.sageDark,
                      }}
                    >
                      <FaMapMarkerAlt aria-hidden="true" />
                    </span>

                    <div className="min-w-0">
                      <h3 className="font-semibold">{profile.businessName}</h3>

                      <p
                        className="mt-1 text-sm leading-6"
                        style={{ color: c.muted }}
                      >
                        {address || "Open the map for directions to the café."}
                      </p>
                    </div>
                  </div>

                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="litrato-info-focus inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition hover:-translate-y-0.5"
                    style={{
                      backgroundColor: c.sageDark,
                      color: "#FFFFFF",
                    }}
                  >
                    <FaDirections aria-hidden="true" />
                    Get directions
                  </a>
                </div>

                <div
                  ref={mapRef}
                  className="relative h-[300px] w-full"
                  style={{ backgroundColor: c.sageLight }}
                >
                  <iframe
                    title={`${profile.businessName} location map`}
                    src={mapEmbedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className={`absolute inset-0 h-full w-full border-0 ${
                      mapActive ? "" : "pointer-events-none"
                    }`}
                  />

                  {!mapActive && (
                    <button
                      type="button"
                      onClick={() => setMapActive(true)}
                      aria-label="Tap to explore the map"
                      className="litrato-info-focus absolute inset-0 flex items-end justify-center pb-4"
                    >
                      <span className="rounded-full bg-black/60 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                        Tap to explore the map
                      </span>
                    </button>
                  )}
                </div>

                <p className="px-5 py-3 text-xs" style={{ color: c.muted }}>
                  For the exact location, use the Get directions button.
                </p>
              </div>
            </div>

            {/* CONTACT AND REVIEW */}
            <div>
              <p
                className="text-xs font-semibold tracking-[0.24em]"
                style={{ color: c.sageDark }}
              >
                LET&apos;S CONNECT
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                We&apos;d love to hear from you.
              </h2>

              <p className="mt-3 text-sm leading-6" style={{ color: c.muted }}>
                Questions, reservations, or just want to say hello? Reach out
                through the contact details below.
              </p>

              {hasContactRows && (
                <div className="mt-7 space-y-3">
                  {phone && (
                    <ContactRow
                      icon={FaPhoneAlt}
                      label="Phone"
                      value={phone}
                      href={phoneHref}
                      copied={copiedKey === "Phone"}
                      onCopy={() => copyText("Phone", phone)}
                    />
                  )}

                  {email && (
                    <ContactRow
                      icon={FaEnvelope}
                      label="Email"
                      value={email}
                      href={`mailto:${email}`}
                      copied={copiedKey === "Email"}
                      onCopy={() => copyText("Email", email)}
                    />
                  )}

                  {website && (
                    <ContactRow
                      icon={FaGlobe}
                      label="Website"
                      value={prettyUrl(website)}
                      href={website}
                      external
                    />
                  )}
                </div>
              )}

              {/* GOOGLE REVIEW */}
              {reviewUrl && (
                <div
                  className="mt-7 rounded-2xl p-6 sm:p-7"
                  style={{ backgroundColor: c.sageLight }}
                >
                  <div
                    className="flex items-center gap-1"
                    role="img"
                    aria-label="Five stars"
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className="text-sm"
                        style={{ color: c.gold }}
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <h3 className="mt-4 text-xl font-semibold">
                    Enjoyed your Litrato moment?
                  </h3>

                  <p
                    className="mt-2 text-sm leading-6"
                    style={{ color: c.muted }}
                  >
                    Share your experience with a Google review. Your feedback
                    helps other coffee lovers discover the café.
                  </p>

                  <a
                    href={reviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="litrato-info-focus mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition hover:-translate-y-0.5"
                    style={{
                      backgroundColor: c.sageDark,
                      color: "#FFFFFF",
                    }}
                  >
                    <FaStar aria-hidden="true" />
                    Write a Google review
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* SOCIAL LINKS: full width, list on mobile, pills on larger screens */}
          {socialItems.length > 0 && (
            <div
              className="mt-10 border-t pt-8 lg:mt-14"
              style={{ borderColor: c.border }}
            >
              <p className="mb-4 text-sm font-semibold">Follow the moments</p>

              <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {socialItems.map(({ key, label, href, icon: Icon }) => (
                  <li key={key} className="sm:w-auto">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit Litrato Café on ${label}`}
                      className="litrato-info-focus flex h-14 w-full items-center gap-4 rounded-2xl border bg-white px-4 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-sm sm:h-12 sm:w-auto sm:gap-2.5 sm:rounded-full sm:px-5"
                      style={{
                        borderColor: c.border,
                        color: c.sageDark,
                      }}
                    >
                      <span className="litrato-social-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
                        <Icon className="text-base" aria-hidden="true" />
                      </span>

                      <span>{label}</span>

                      <FaChevronRight
                        className="ml-auto text-xs opacity-50 sm:hidden"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
