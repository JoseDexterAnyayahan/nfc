"use client";

import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  FaArrowRight,
  FaCheck,
  FaEnvelope,
  FaFacebookF,
  FaGlobe,
  FaPhoneAlt,
  FaRegCopy,
  FaWhatsapp,
} from "react-icons/fa";
import { FaTelegram, FaViber } from "react-icons/fa6";
import type { BusinessProfile } from "@/lib/profiles";
import {
  tamtechContainerClass,
  tamtechSectionClass,
} from "./tamtech-styles";

type Props = {
  profile: BusinessProfile;
};

const COMPANY_NAME = "Tamaraw Technohub";
const DEFAULT_CONTACT = "Wendell";
const DEFAULT_WEBSITE = "https://tamtechhub.com/";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0874E8] focus-visible:ring-offset-2";

const cardBase =
  "rounded-2xl border border-[var(--tamtech-border)] bg-[var(--tamtech-card)]";

function getHost(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
}

function useCopy() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      // Clipboard can be blocked on non-HTTPS pages; the link still works.
    }
  };

  return { copiedKey, copy };
}

type PrimaryContact = {
  key: string;
  label: string;
  title: string;
  detail: string;
  href: string;
  icon: IconType;
  tone: "blue" | "mint";
  copyValue: string;
};

type Messenger = {
  label: string;
  href: string;
  icon: IconType;
  brand: string;
};

export default function TamtechContact({ profile }: Props) {
  const { copiedKey, copy } = useCopy();

  const firstName =
    profile.contactName?.trim().split(/\s+/)[0] || DEFAULT_CONTACT;

  const phone = profile.phone?.replace(/[^\d+]/g, "") ?? "";
  const email = profile.email?.trim() ?? "";

  // Local PH numbers (09xx…) become 639xx… for chat deep links.
  const internationalPhone = phone.startsWith("0")
    ? `63${phone.slice(1)}`
    : phone.replace(/^\+/, "");

  const website = profile.website || DEFAULT_WEBSITE;
  const websiteHost = getHost(website);

  const facebookUrl = profile.socials?.find(
    (social) => social.platform === "facebook",
  )?.url;

  const primary: PrimaryContact[] = [
    ...(phone
      ? [
          {
            key: "phone",
            label: "Phone",
            title: `Call ${firstName}`,
            detail: profile.phone,
            href: `tel:${phone}`,
            icon: FaPhoneAlt,
            tone: "blue" as const,
            copyValue: profile.phone,
          },
        ]
      : []),
    ...(email
      ? [
          {
            key: "email",
            label: "Email",
            title: "Send an email",
            detail: email,
            href: `mailto:${email}`,
            icon: FaEnvelope,
            tone: "mint" as const,
            copyValue: email,
          },
        ]
      : []),
  ];

  const greeting = encodeURIComponent(
    `Hi ${firstName}, I found your ${COMPANY_NAME} profile and would like to get in touch.`,
  );

  // Chat links only make sense when there is a number to open.
  const messaging: Messenger[] = internationalPhone
    ? [
        {
          label: "WhatsApp",
          href: `https://wa.me/${internationalPhone}?text=${greeting}`,
          icon: FaWhatsapp,
          brand: "#25D366",
        },
        {
          label: "Viber",
          href: `viber://chat?number=%2B${internationalPhone}`,
          icon: FaViber,
          brand: "#7360F2",
        },
        {
          label: "Telegram",
          href: `https://t.me/+${internationalPhone}`,
          icon: FaTelegram,
          brand: "#229ED9",
        },
      ]
    : [];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className={`${tamtechSectionClass} scroll-mt-24 bg-[var(--tamtech-page)]`}
    >
      <div className={tamtechContainerClass}>
        <div className="mb-8 max-w-2xl">
          <h2
            id="contact-heading"
            className="text-3xl font-extrabold tracking-tight text-[var(--tamtech-text)] sm:text-4xl"
          >
            Let&apos;s connect
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--tamtech-muted)] sm:text-base">
            Reach {firstName} for professional inquiries and business
            connections. A call or message gets the quickest reply.
          </p>
        </div>

        {/* Primary: phone and email */}
        {primary.length > 0 && (
          <ul
            className={`grid gap-4 ${
              primary.length > 1 ? "sm:grid-cols-2" : ""
            }`}
          >
            {primary.map((item) => {
              const Icon = item.icon;
              const isCopied = copiedKey === item.key;

              return (
                <li
                  key={item.key}
                  className={`${cardBase} flex min-w-0 items-stretch transition hover:-translate-y-0.5 hover:border-[#0874E8] hover:shadow-lg`}
                >
                  <a
                    href={item.href}
                    className={`flex min-w-0 flex-1 items-center gap-4 rounded-2xl p-5 ${focusRing}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                        item.tone === "mint"
                          ? "bg-[#42CDA5]/15 text-[#168D6B]"
                          : "bg-[#0874E8]/10 text-[#0874E8]"
                      }`}
                    >
                      <Icon size={19} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-medium text-[var(--tamtech-muted)]">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-base font-bold text-[var(--tamtech-text)]">
                        {item.title}
                      </span>
                      <span
                        title={item.detail}
                        className="mt-0.5 block truncate text-sm text-[var(--tamtech-muted)]"
                      >
                        {item.detail}
                      </span>
                    </span>
                  </a>

                  <button
                    type="button"
                    onClick={() => copy(item.key, item.copyValue)}
                    aria-label={
                      isCopied
                        ? `${item.label} copied`
                        : `Copy ${item.label.toLowerCase()}`
                    }
                    className={`m-2 flex w-11 shrink-0 items-center justify-center self-center rounded-xl text-[var(--tamtech-muted)] transition hover:bg-[#0874E8]/10 hover:text-[#0874E8] ${focusRing} h-11`}
                  >
                    {isCopied ? (
                      <FaCheck size={14} aria-hidden="true" />
                    ) : (
                      <FaRegCopy size={14} aria-hidden="true" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {/* Messaging apps */}
        {messaging.length > 0 && (
          <div className={`${cardBase} mt-6 p-5 sm:p-6`}>
            <h3 className="text-base font-bold text-[var(--tamtech-text)]">
              Message on your preferred app
            </h3>
            <p className="mt-1 text-sm text-[var(--tamtech-muted)]">
              Opens a chat with {firstName} in the app you choose.
            </p>

            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {messaging.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-[var(--tamtech-border)] bg-[var(--tamtech-surface)] px-4 py-3 text-sm font-semibold text-[var(--tamtech-text)] transition hover:border-[#42CDA5] hover:bg-[#42CDA5]/10 active:scale-[0.98] ${focusRing}`}
                    >
                      <Icon
                        size={18}
                        aria-hidden="true"
                        style={{ color: item.brand }}
                      />
                      {item.label}
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Company links: website first, then Facebook */}
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-bold text-[var(--tamtech-text)]">
            {COMPANY_NAME} online
          </h3>

          <ul className="grid gap-3">
            <li>
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardBase} group flex min-w-0 items-center gap-4 p-4 transition hover:border-[#0874E8] hover:shadow-md ${focusRing}`}
              >
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0874E8]/10 text-[#0874E8]"
                >
                  <FaGlobe size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-[var(--tamtech-text)]">
                    Visit our website
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-[var(--tamtech-muted)]">
                    {websiteHost}
                  </span>
                </span>
                <FaArrowRight
                  size={13}
                  aria-hidden="true"
                  className="shrink-0 text-[#0874E8] transition-transform group-hover:translate-x-1"
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>

            {facebookUrl && (
              <li>
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cardBase} group flex min-w-0 items-center gap-4 p-4 transition hover:border-[#0874E8] hover:shadow-md ${focusRing}`}
                >
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0874E8]/10 text-[#0874E8]"
                  >
                    <FaFacebookF size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-[var(--tamtech-text)]">
                      {COMPANY_NAME} on Facebook
                    </span>
                    <span className="mt-0.5 block text-xs text-[var(--tamtech-muted)]">
                      Visit the company page
                    </span>
                  </span>
                  <FaArrowRight
                    size={13}
                    aria-hidden="true"
                    className="shrink-0 text-[#0874E8] transition-transform group-hover:translate-x-1"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* Screen readers get confirmation when something is copied */}
        <p className="sr-only" role="status" aria-live="polite">
          {copiedKey ? "Copied to clipboard" : ""}
        </p>
      </div>
    </section>
  );
}