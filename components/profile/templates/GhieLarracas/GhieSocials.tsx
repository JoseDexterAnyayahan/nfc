
"use client";

import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaViber,
} from "react-icons/fa6";

import { ArrowUpRight, Heart, Sparkles } from "lucide-react";

import { ghieCardClass } from "./GhieStyles";

const socialLinks = [
  {
    name: "Facebook",
    handle: "ghie.larracas",
    href: "https://www.facebook.com/ghie.larracas",
    icon: FaFacebookF,
    color: "#1877F2",
    description: "Follow her updates and community activities.",
  },
  {
    name: "Instagram",
    handle: "@ghieferriol",
    href: "https://www.instagram.com/ghieferriol/",
    icon: FaInstagram,
    color: "#E4405F",
    description: "Explore photos and memorable moments.",
  },
  {
    name: "TikTok",
    handle: "@ghielarracas",
    href: "https://www.tiktok.com/@ghielarracas",
    icon: FaTiktok,
    color: "#111111",
    description: "Discover short videos and shared experiences.",
  },
  {
    name: "Viber",
    handle: "09175832730",
    href: "viber://chat?number=%2B639175832730",
    icon: FaViber,
    color: "#7360F2",
    description: "Connect directly through Viber.",
  },
];

export default function GhieSocials() {
  return (
    <section
      id="socials"
      className="relative overflow-hidden py-14 sm:py-20"
    >
      {/* Decorative background elements */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[var(--ghie-blue)] opacity-[0.035] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-[var(--ghie-mint)] opacity-[0.06] blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-7 lg:px-8">

        {/* Section heading */}
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--ghie-blue)]/15 bg-[var(--ghie-blue)]/[0.06] px-3.5 py-2">
              <Heart
                size={13}
                className="text-[var(--ghie-gold)]"
              />

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--ghie-blue)]">
                Stay Connected
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-[var(--ghie-text)] sm:text-3xl lg:text-4xl">
              Connect with{" "}
              <span className="text-[var(--ghie-blue)]">
                Ghie
              </span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--ghie-muted)] sm:text-base">
              Stay updated with her activities, stories, and
              community initiatives. Follow her social platforms
              or reach out through your preferred channel.
            </p>
          </div>

          <div className="hidden items-center gap-2 pb-1 text-xs font-semibold text-[var(--ghie-blue)] sm:flex">
            <Sparkles size={15} className="text-[var(--ghie-gold)]" />
            <span>Let's stay connected</span>
          </div>
        </div>

        {/* Social media cards */}
        <div className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">

          {socialLinks.map((social) => {
            const Icon = social.icon;

            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Connect with Ghie on ${social.name}: ${social.handle}`}
                className={`${ghieCardClass} group relative flex h-full min-w-0 flex-col overflow-hidden p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(23,43,69,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ghie-blue)] focus-visible:ring-offset-4 sm:p-5`}
              >
                {/* Brand accent */}
                <div
                  className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                  style={{ backgroundColor: social.color }}
                />

                {/* Icon and arrow */}
                <div className="flex items-start justify-between gap-2">

                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-105 sm:h-12 sm:w-12"
                    style={{
                      color: social.color,
                      backgroundColor: `${social.color}12`,
                    }}
                  >
                    <Icon size={21} />
                  </div>

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--ghie-muted)] transition-all duration-300 group-hover:bg-[var(--ghie-blue)] group-hover:text-white">
                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                </div>

                {/* Social information */}
                <div className="mt-5 min-w-0 flex-1">

                  <h3 className="truncate text-sm font-bold text-[var(--ghie-text)] transition-colors group-hover:text-[var(--ghie-blue)] sm:text-base">
                    {social.name}
                  </h3>

                  <p className="mt-1 truncate text-xs font-medium text-[var(--ghie-muted)]">
                    {social.handle}
                  </p>

                  <p className="mt-3 line-clamp-2 min-h-10 text-xs leading-5 text-[var(--ghie-muted)]">
                    {social.description}
                  </p>
                </div>

                {/* Bottom action */}
                <div className="mt-4 flex items-center justify-between border-t border-[var(--ghie-border)] pt-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--ghie-blue)] sm:text-xs">
                    {social.name === "Viber" ? "Send a message" : "Visit profile"}
                  </span>

                  <ArrowUpRight
                    size={15}
                    className="shrink-0 text-[var(--ghie-blue)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </div>
              </a>
            );
          })}

        </div>

        {/* Closing message */}
        <div className="mt-7 flex flex-col items-center justify-center gap-2 text-center sm:mt-9 sm:flex-row">
          <Heart
            size={14}
            className="shrink-0 text-[var(--ghie-gold)]"
          />

          <p className="text-xs leading-6 text-[var(--ghie-muted)]">
            Every connection creates an opportunity to share,
            inspire, and make a lasting impact.
          </p>
        </div>

      </div>
    </section>
  );
}
