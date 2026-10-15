
"use client";

import {
  FaArrowRight,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFacebookF,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import type { BusinessProfile } from "@/lib/profiles";
import {
  suzukiContainerClass,
  suzukiSectionClass,
} from "./suzuki-styles";

type Props = {
  profile: BusinessProfile;
};

export default function SuzukiContact({ profile }: Props) {
  const facebookUrl = profile.socials?.find(
    (social) => social.platform === "facebook"
  )?.url;

  const phone = profile.phone.replace(/[^\d+]/g, "");

  const contactItems = [
    {
      label: "PHONE",
      title: "Give me a call",
      detail: profile.phone,
      description: "Speak with me directly",
      href: `tel:${phone}`,
      icon: FaPhoneAlt,
      accent: "blue",
      external: false,
    },
    {
      label: "EMAIL",
      title: "Send an email",
      detail: profile.email,
      description: "For inquiries and follow-ups",
      href: `mailto:${profile.email}`,
      icon: FaEnvelope,
      accent: "red",
      external: false,
    },
  ];

  return (
    <section
      id="contact"
      className={`${suzukiSectionClass} scroll-mt-24 bg-[var(--suzuki-page)]`}
    >
      <div className={suzukiContainerClass}>
        {/* Section heading */}
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1 w-7 rounded-full bg-[var(--suzuki-red)]" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--suzuki-blue)]">
                Get in touch
              </p>
            </div>

            <h2 className="text-3xl font-bold leading-tight tracking-tight text-[var(--suzuki-text)] sm:text-4xl">
              Let&apos;s connect.
              <span className="mt-1 block text-[var(--suzuki-muted)]">
                I&apos;m here to help.
              </span>
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-[var(--suzuki-muted)] sm:text-base">
              Have a question about your vehicle&apos;s service? Choose the
              contact method that works best for you.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-full border border-[var(--suzuki-border)] bg-[var(--suzuki-card)] px-3.5 py-2 sm:self-auto">
            <span className="h-2 w-2 rounded-full bg-[var(--suzuki-blue)]" />
            <span className="text-xs font-medium text-[var(--suzuki-muted)]">
              Service Advisor
            </span>
          </div>
        </div>

        {/* Primary contact methods */}
        <div className="grid gap-4 sm:grid-cols-2">
          {contactItems.map((item) => {
            const Icon = item.icon;
            const isRed = item.accent === "red";

            return (
              <a
                key={item.label}
                href={item.href}
                className="group relative flex min-w-0 items-center gap-4 overflow-hidden rounded-2xl border border-[var(--suzuki-border)] bg-[var(--suzuki-card)] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--suzuki-blue)] hover:shadow-lg hover:shadow-black/[0.04] sm:p-6"
              >
                <span
                  className={`absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                    isRed
                      ? "bg-[var(--suzuki-red)]"
                      : "bg-[var(--suzuki-blue)]"
                  }`}
                />

                <span
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ${
                    isRed
                      ? "bg-[var(--suzuki-red)]/10 text-[var(--suzuki-red)]"
                      : "bg-[var(--suzuki-blue)]/10 text-[var(--suzuki-blue)]"
                  }`}
                >
                  <Icon size={21} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-bold tracking-[0.18em] text-[var(--suzuki-muted)]">
                    {item.label}
                  </span>

                  <span className="mt-1.5 block text-base font-semibold text-[var(--suzuki-text)] sm:text-lg">
                    {item.title}
                  </span>

                  <span className="mt-1 block break-words text-sm text-[var(--suzuki-muted)]">
                    {item.detail}
                  </span>

                  <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[var(--suzuki-blue)]">
                    {item.description}
                    <FaArrowRight
                      size={10}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </span>
              </a>
            );
          })}
        </div>

        {/* Secondary connection options */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {/* Facebook */}
          {facebookUrl && (
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-w-0 items-center gap-4 rounded-2xl border border-[var(--suzuki-border)] bg-[var(--suzuki-card)] p-4 transition hover:border-[var(--suzuki-blue)] sm:p-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--suzuki-blue)]/10 text-[var(--suzuki-blue)]">
                <FaFacebookF size={18} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-[var(--suzuki-text)]">
                  Connect on Facebook
                </span>
                <span className="mt-1 block text-xs text-[var(--suzuki-muted)]">
                  Visit my personal profile
                </span>
              </span>

              <FaExternalLinkAlt
                size={13}
                className="shrink-0 text-[var(--suzuki-muted)] transition group-hover:text-[var(--suzuki-blue)]"
              />
            </a>
          )}

          {/* Dealership location */}
          {profile.locationUrl && (
            <a
              href={profile.locationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-w-0 items-center gap-4 rounded-2xl border border-[var(--suzuki-border)] bg-[var(--suzuki-card)] p-4 transition hover:border-[var(--suzuki-red)] sm:p-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--suzuki-red)]/10 text-[var(--suzuki-red)]">
                <FaMapMarkerAlt size={18} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-[var(--suzuki-text)]">
                  Visit the dealership
                </span>
                <span className="mt-1 block break-words text-xs text-[var(--suzuki-muted)]">
                  {profile.location || "Suzuki Auto Calapan"}
                </span>
              </span>

              <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-[var(--suzuki-blue)]">
                Directions
                <FaArrowRight
                  size={10}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </a>
          )}
        </div>

        {/* Closing note */}
        <div className="mt-7 flex items-start gap-3 rounded-xl border border-[var(--suzuki-border)] bg-[var(--suzuki-card)]/60 p-4 sm:items-center">
          <span className="mt-0.5 h-8 w-1 shrink-0 rounded-full bg-[var(--suzuki-red)] sm:mt-0" />

          <p className="text-xs leading-6 text-[var(--suzuki-muted)] sm:text-sm">
            Prefer a quick conversation? Call or email me directly, and I&apos;ll
            be happy to assist with your inquiry.
          </p>
        </div>
      </div>
    </section>
  );
}
