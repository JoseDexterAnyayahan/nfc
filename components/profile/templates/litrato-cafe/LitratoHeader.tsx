"use client";

import { useState } from "react";
import type { ElementType } from "react";
import {
  FaShareAlt,
  FaCheck,
  FaChevronRight,
  FaCoffee,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUserPlus,
  FaExternalLinkAlt,
} from "react-icons/fa";
import type { BusinessProfile } from "@/lib/profiles";
import { litratoColors as c, litratoContainerClass } from "./litrato-styles";

type Props = {
  profile: BusinessProfile;
  onSaveContact: () => void;
};

/*
 * =============================================================
 * CONTACT TILE
 * One tappable tile in the card that overlaps the hero.
 * =============================================================
 */

type ContactTileProps = {
  icon: ElementType;
  label: string;
  value: string;
  hint: string;
  href: string;
  external?: boolean;
  divider?: boolean;
  breakAll?: boolean;
};

function ContactTile({
  icon: Icon,
  label,
  value,
  hint,
  href,
  external,
  divider,
  breakAll,
}: ContactTileProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`litrato-tile group flex min-w-0 items-center gap-4 px-5 py-5 transition-colors duration-300 hover:bg-black/[0.02] active:bg-black/[0.04] sm:px-6 sm:py-7 lg:px-8 ${
        divider ? "border-t sm:border-l sm:border-t-0" : ""
      }`}
      style={{ borderColor: c.border }}
    >
      <span
        className="litrato-tile-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition duration-300 group-hover:scale-105 sm:h-14 sm:w-14"
        style={{
          backgroundColor: c.sageLight,
          color: c.sageDark,
        }}
      >
        <Icon size={17} aria-hidden="true" />
      </span>

      <span className="min-w-0 flex-1">
        <span
          className="block text-[10px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: c.sageDark }}
        >
          {label}
        </span>

        <span
          className={`mt-1.5 flex items-center gap-1.5 text-sm font-semibold sm:text-[15px] ${
            breakAll ? "break-all" : ""
          }`}
        >
          {value}
          {external && (
            <FaExternalLinkAlt
              size={10}
              className="shrink-0 opacity-50"
              aria-hidden="true"
            />
          )}
        </span>

        <span
          className="mt-0.5 block text-xs"
          style={{ color: c.muted }}
        >
          {hint}
        </span>
      </span>

      <FaChevronRight
        size={12}
        className="shrink-0 opacity-30 transition duration-300 group-hover:translate-x-1 group-hover:opacity-60 sm:hidden"
        aria-hidden="true"
      />
    </a>
  );
}

/*
 * =============================================================
 * HEADER
 * =============================================================
 */

export default function LitratoHeader({ profile, onSaveContact }: Props) {
  const [copied, setCopied] = useState(false);

  const profileUrl = "https://dextap.vercel.app/b/litrato-cafe";

  const phone = profile.phone?.trim() ?? "";
  const email = profile.email?.trim() ?? "";
  const phoneHref = phone ? `tel:${phone.replace(/[^0-9+]/g, "")}` : "";
  const directionsHref = profile.locationUrl || "#litrato-location";

  function flashCopied() {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  async function handleShare() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: profile.businessName,
          text: `${profile.tagline || ""} — Visit ${profile.businessName} on DexTap.`,
          url: profileUrl,
        });
        return;
      }

      await navigator.clipboard.writeText(profileUrl);
      flashCopied();
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;

      try {
        await navigator.clipboard.writeText(profileUrl);
        flashCopied();
      } catch {
        window.prompt("Copy the Litrato Café profile link:", profileUrl);
      }
    }
  }

  return (
    <header>
      <style>{`
        @keyframes litrato-rise {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: none; }
        }

        @keyframes litrato-steam {
          0%   { opacity: 0;   transform: translateY(6px) scaleX(1); }
          40%  { opacity: 0.7; }
          100% { opacity: 0;   transform: translateY(-16px) scaleX(1.6); }
        }

        .litrato-rise {
          animation: litrato-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .litrato-steam {
          opacity: 0;
          animation: litrato-steam 2.8s ease-in-out infinite;
        }

        .litrato-tile:hover .litrato-tile-icon {
          background-color: ${c.sageDark} !important;
          color: #ffffff !important;
        }

        .litrato-header-focus:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          .litrato-rise,
          .litrato-steam {
            animation: none !important;
          }
        }
      `}</style>

      {/* HERO */}
      <section className="relative isolate min-h-[720px] overflow-hidden sm:min-h-[780px]">
        <img
          src={profile.banner || "/profiles/business/litrato-cafe/banner.jpg"}
          alt={`${profile.businessName} interior`}
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />

        {/* Soft cinematic overlay */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(24,29,22,0.32) 0%, rgba(24,29,22,0.10) 24%, rgba(24,29,22,0.42) 52%, rgba(24,29,22,0.92) 100%)",
          }}
        />

        {/* Warm glow, like light from a cafe window */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 70% 45% at 15% 88%, rgba(180,154,104,0.28), transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div
          className={`${litratoContainerClass} relative flex min-h-[720px] flex-col sm:min-h-[780px]`}
        >
          {/* Top navigation */}
          <div className="flex items-center justify-between gap-4 pt-5 sm:pt-7">
            <div className="flex min-w-0 items-center gap-3">
              {profile.logo && (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/40 bg-white shadow-xl sm:h-14 sm:w-14">
                  <img
                    src={profile.logo}
                    alt={`${profile.businessName} logo`}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="min-w-0">
                <p className="truncate text-xs font-semibold tracking-[0.18em] text-white sm:text-sm">
                  {profile.businessName.toUpperCase()}
                </p>
                <p className="mt-1 text-[10px] tracking-[0.16em] text-white/70 sm:text-xs">
                  COFFEE · COMMUNITY · MOMENTS
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <span
                role="status"
                aria-live="polite"
                className={`rounded-full border border-white/30 bg-black/25 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-xl transition duration-300 ${
                  copied
                    ? "translate-x-0 opacity-100"
                    : "pointer-events-none translate-x-2 opacity-0"
                }`}
              >
                {copied ? "Link copied" : ""}
              </span>

              <button
                type="button"
                onClick={handleShare}
                aria-label="Share Litrato Café"
                className="litrato-header-focus flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/15 text-white shadow-lg backdrop-blur-xl transition duration-300 hover:scale-105 hover:bg-white/20"
              >
                {copied ? <FaCheck size={15} /> : <FaShareAlt size={15} />}
              </button>
            </div>
          </div>

          {/* Hero content */}
          <div className="mt-auto max-w-3xl pb-20 pt-24 sm:pb-24 sm:pt-32">
            {/* Welcome eyebrow with steaming cup */}
            <div
              className="litrato-rise mb-6 flex items-center gap-3.5"
              style={{ animationDelay: "0.05s" }}
            >
              <span
                className="relative flex h-11 w-11 items-center justify-center rounded-full border text-[#E7D9BB] backdrop-blur-md"
                style={{
                  borderColor: "rgba(212,196,161,0.55)",
                  backgroundColor: "rgba(255,255,255,0.08)",
                }}
                aria-hidden="true"
              >
                <span
                  className="litrato-steam absolute -top-3 left-[34%] h-3 w-[2px] rounded-full bg-white/70 blur-[1px]"
                  style={{ animationDelay: "0s" }}
                />
                <span
                  className="litrato-steam absolute -top-4 left-1/2 h-4 w-[2px] rounded-full bg-white/70 blur-[1px]"
                  style={{ animationDelay: "0.9s" }}
                />
                <span
                  className="litrato-steam absolute -top-3 left-[66%] h-3 w-[2px] rounded-full bg-white/70 blur-[1px]"
                  style={{ animationDelay: "1.7s" }}
                />
                <FaCoffee size={17} />
              </span>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#F1E7D3] sm:text-xs">
                  A little moment, beautifully brewed
                </p>
                <p className="mt-1 text-[11px] tracking-wide text-white/60 sm:text-xs">
                  Come in, settle in, stay a while.
                </p>
              </div>
            </div>

            <h1
              className="litrato-rise text-[clamp(3.5rem,12vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.075em] text-white"
              style={{ animationDelay: "0.15s" }}
            >
              Litrato
              <br />
              <span className="mt-2 inline-block font-normal italic tracking-[-0.065em] text-[#E7D9BB]">
                Café.
              </span>
            </h1>

            <div
              className="litrato-rise mt-7 flex flex-wrap items-center gap-x-3 gap-y-2"
              style={{ animationDelay: "0.25s" }}
            >
              <span className="text-xs font-semibold tracking-[0.24em] text-white sm:text-sm">
                {profile.tagline || "SHOT IN EVERY SIP"}
              </span>
              <span className="h-1 w-1 rounded-full bg-[#D4C4A1]" />
              <span className="text-[10px] tracking-[0.18em] text-white/70 sm:text-xs">
                EST. 2022
              </span>
            </div>

            <p
              className="litrato-rise mt-5 max-w-md text-sm leading-7 text-white/85 sm:text-base sm:leading-8"
              style={{ animationDelay: "0.35s" }}
            >
              {profile.bio ||
                "Your place for good coffee, beautiful spaces, and moments worth keeping."}
            </p>

            {/* CTA: 70% Save Contact / 30% Directions */}
            <div
              className="litrato-rise mt-8 grid w-full max-w-md grid-cols-[7fr_3fr] gap-2.5 sm:gap-3"
              style={{ animationDelay: "0.45s" }}
            >
              <button
                type="button"
                onClick={onSaveContact}
                className="litrato-header-focus group flex min-h-[56px] min-w-0 items-center justify-center gap-2.5 rounded-2xl px-3 text-xs font-semibold shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98] sm:min-h-[60px] sm:px-5 sm:text-sm"
                style={{
                  backgroundColor: c.background,
                  color: c.text,
                }}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: c.sageLight,
                    color: c.sageDark,
                  }}
                >
                  <FaUserPlus
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
                <span className="truncate">Save Contact</span>
              </button>

              <a
                href={directionsHref}
                target={profile.locationUrl ? "_blank" : undefined}
                rel={profile.locationUrl ? "noreferrer" : undefined}
                className="litrato-header-focus flex min-h-[56px] min-w-0 items-center justify-center gap-1.5 rounded-2xl border border-white/40 bg-white/10 px-2 text-[11px] font-semibold text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/20 active:scale-[0.98] sm:min-h-[60px] sm:gap-2 sm:px-3 sm:text-xs"
              >
                <FaMapMarkerAlt className="shrink-0" aria-hidden="true" />
                <span className="truncate">Directions</span>
              </a>
            </div>

            <div
              className="litrato-rise mt-5 flex items-center gap-2 text-[10px] tracking-wide text-white/65 sm:text-xs"
              style={{ animationDelay: "0.55s" }}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/30">
                <FaCheck size={9} aria-hidden="true" />
              </span>
              Keep our details with you, wherever you go.
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CARD (overlaps the hero) */}
      <section
        className="relative z-10 pb-2 sm:pb-2"
        style={{ backgroundColor: c.background }}
      >
        <div className={litratoContainerClass}>
          <div
            className="-translate-y-10 overflow-hidden rounded-3xl border shadow-[0_24px_60px_-24px_rgba(48,53,45,0.35)] sm:-translate-y-12"
            style={{
              backgroundColor: c.surface,
              borderColor: c.border,
            }}
          >
            {/* Warm accent line */}
            <div
              className="h-1 w-full"
              style={{
                background: `linear-gradient(90deg, ${c.sage}, ${c.gold}, ${c.sage})`,
              }}
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3">
              <ContactTile
                icon={FaPhoneAlt}
                label="Call us"
                value={phone}
                hint="Tap to call"
                href={phoneHref}
              />

              <ContactTile
                icon={FaEnvelope}
                label="Email us"
                value={email}
                hint="Write to us anytime"
                href={`mailto:${email}`}
                breakAll
                divider
              />

              <ContactTile
                icon={FaMapMarkerAlt}
                label="Find us"
                value="Google Maps"
                hint="Get directions to the café"
                href={directionsHref}
                external={Boolean(profile.locationUrl)}
                divider
              />
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}