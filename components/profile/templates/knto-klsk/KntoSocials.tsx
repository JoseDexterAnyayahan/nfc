"use client";

import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaEnvelope,
  FaExternalLinkAlt,
} from "react-icons/fa";

import type { BusinessProfile } from "@/lib/profiles";
import { kntoColors as c } from "./knto-styles";

type SocialPlatform = "instagram" | "tiktok" | "facebook";

const socialConfig: Record<
  SocialPlatform,
  {
    label: string;
    Icon: typeof FaFacebookF;
    color: string;
  }
> = {
  instagram: {
    label: "Instagram",
    Icon: FaInstagram,
    color: "#E4405F",
  },
  tiktok: {
    label: "TikTok",
    Icon: FaTiktok,
    color: "#111111",
  },
  facebook: {
    label: "Facebook",
    Icon: FaFacebookF,
    color: "#1877F2",
  },
};

const socialOrder: SocialPlatform[] = [
  "instagram",
  "tiktok",
  "facebook",
];

const contactEmail = "kntoklsk@gmail.com";

export default function KntoSocials({
  profile,
}: {
  profile: BusinessProfile;
}) {
  const socials = (profile.socials ?? [])
    .filter(
      (social) =>
        (social.platform === "instagram" ||
          social.platform === "tiktok" ||
          social.platform === "facebook") &&
        Boolean(social.url)
    )
    .sort(
      (a, b) =>
        socialOrder.indexOf(a.platform as SocialPlatform) -
        socialOrder.indexOf(b.platform as SocialPlatform)
    );

  return (
    <section
      id="knto-socials"
      className="py-8 sm:py-10"
      style={{ color: c.ink }}
    >
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
        {/* Minimal heading */}
        <div className="mb-5">
          <p
            className="text-[9px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: c.wood }}
          >
            Stay connected
          </p>

          <h2 className="mt-1.5 text-xl font-semibold tracking-tight sm:text-2xl">
            Follow the house.
          </h2>

          <p
            className="mt-1.5 text-xs leading-5 sm:text-sm"
            style={{ color: c.muted }}
          >
            Keep up with the latest from KNTO KLSK.
          </p>
        </div>

        {/* Simple vertical link list */}
        <div
          className="border-y"
          style={{ borderColor: c.line }}
        >
          {socials.map((social) => {
            const platform =
              social.platform as SocialPlatform;
            const config = socialConfig[platform];

            if (!config) return null;

            const { Icon, label, color } = config;

            return (
              <a
                key={platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit KNTO KLSK on ${label}`}
                className="group flex min-h-[54px] items-center gap-3 border-b px-1 py-3 transition-colors duration-200 last:border-b-0 hover:bg-[#F4EBDD]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset"
                style={{
                  borderColor: c.line,
                  color: c.ink,
                }}
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center"
                  style={{ color }}
                >
                  <Icon size={17} />
                </span>

                <span className="flex-1 text-xs font-medium sm:text-sm">
                  {label}
                </span>

                <span
                  className="text-[10px] transition-colors group-hover:underline sm:text-xs"
                  style={{ color: c.muted }}
                >
                  Visit profile
                </span>

                <FaExternalLinkAlt
                  size={9}
                  className="shrink-0 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  style={{ color }}
                />
              </a>
            );
          })}

          {/* Email */}
          <a
            href={`mailto:${contactEmail}`}
            aria-label={`Email KNTO KLSK at ${contactEmail}`}
            className="group flex min-h-[54px] items-center gap-3 border-t px-1 py-3 transition-colors duration-200 hover:bg-[#F4EBDD]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset"
            style={{
              borderColor: c.line,
              color: c.ink,
            }}
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center"
              style={{ color: c.wood }}
            >
              <FaEnvelope size={16} />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block text-xs font-medium sm:text-sm">
                Email
              </span>

              <span
                className="mt-0.5 block break-all text-[10px] sm:text-xs"
                style={{ color: c.muted }}
              >
                {contactEmail}
              </span>
            </span>

            <FaExternalLinkAlt
              size={9}
              className="shrink-0 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
              style={{ color: c.wood }}
            />
          </a>
        </div>

        {/* Subtle closing tagline */}
        <p
          className="mt-4 text-[9px] uppercase tracking-[0.15em]"
          style={{ color: c.muted }}
        >
          Drop the needle. Sip the moments.
        </p>
      </div>
    </section>
  );
}
