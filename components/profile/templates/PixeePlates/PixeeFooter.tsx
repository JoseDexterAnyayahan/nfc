
"use client";

import {
  ArrowUpRight,
  Camera,
  Coffee,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Utensils,
} from "lucide-react";

import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

import type { BusinessProfile } from "@/lib/profiles";
import { pixeePhoneNumbers } from "@/lib/profiles/business/pixeeplates";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/nYepDGsmWdMBJxL87";

export default function PixeeFooter({
  profile,
}: {
  profile: BusinessProfile;
}) {
  const facebook = profile.socials?.find(
    (social) => social.platform === "facebook",
  );

  const instagram = profile.socials?.find(
    (social) => social.platform === "instagram",
  );

  const tiktok = profile.socials?.find(
    (social) => social.platform === "tiktok",
  );

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    {
      label: "Photobooth Packages",
      id: "packages",
      icon: Camera,
    },
    {
      label: "Perfume Bar",
      id: "perfume-bar",
      icon: Sparkles,
    },
    {
      label: "Grazing Table",
      id: "grazing-table",
      icon: Utensils,
    },
    {
      label: "Frozen Cocktails",
      id: "frozen-cocktails",
      icon: Coffee,
    },
    {
      label: "Desserts",
      id: "desserts",
      icon: Sparkles,
    },
    {
      label: "Crew Meals",
      id: "crew-meals",
      icon: Utensils,
    },
    {
      label: "Coffee & Milktea Bar",
      id: "coffee-milktea-bar",
      icon: Coffee,
    },
  ];

  return (
    <footer className="relative mt-16 overflow-hidden border-t border-[#c9a45c]/20 bg-[#090909]">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-[#c9a45c]/[0.05] blur-[100px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#c9a45c]/[0.04] blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-5 pb-32 pt-14 sm:px-8 sm:pb-28 sm:pt-16">
        {/* Footer Main Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-[1.2fr_0.8fr_1fr] md:gap-12">

          {/* BRAND */}
          <div>
            <a
              href="#home"
              className="inline-block text-2xl font-semibold tracking-[0.18em] text-[#d6b56d]"
            >
              PIXEE<span className="text-white">PLATES</span>
            </a>

            <p className="mt-5 max-w-xs text-sm leading-7 text-white/45">
              Making every celebration more memorable through thoughtfully
              curated experiences, food, drinks, and creative event services.
            </p>

            {/* Social Media */}
            <div className="mt-7">
              <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#c9a45c]">
                Follow Our Journey
              </p>

              <div className="flex items-center gap-2.5">
                {facebook && (
                  <a
                    href={facebook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="PIXEEPLATES Facebook"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-[#d6b56d]/50 hover:bg-[#c9a45c] hover:text-black"
                  >
                    <FaFacebookF size={15} />
                  </a>
                )}

                {instagram && (
                  <a
                    href={instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="PIXEEPLATES Instagram"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-[#d6b56d]/50 hover:bg-[#c9a45c] hover:text-black"
                  >
                    <FaInstagram size={16} />
                  </a>
                )}

                {tiktok && (
                  <a
                    href={tiktok.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="PIXEEPLATES TikTok"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-[#d6b56d]/50 hover:bg-[#c9a45c] hover:text-black"
                  >
                    <SiTiktok size={15} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d6b56d]">
              Explore
            </p>

            <div className="space-y-4">
              {quickLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className="group flex items-center gap-3 text-sm text-white/45 transition hover:text-[#d6b56d]"
                  >
                    <Icon
                      size={15}
                      className="shrink-0 text-[#c9a45c]/60 transition group-hover:text-[#d6b56d]"
                    />

                    <span>{link.label}</span>

                    <ArrowUpRight
                      size={13}
                      className="ml-auto opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d6b56d]">
              Get in Touch
            </p>

            <div className="space-y-5">
              {pixeePhoneNumbers.map((number) => (
                <a
                  key={number}
                  href={`tel:${number}`}
                  className="group flex items-start gap-3 text-sm text-white/50 transition hover:text-[#d6b56d]"
                >
                  <Phone
                    size={16}
                    className="mt-0.5 shrink-0 text-[#c9a45c]"
                  />
                  <span>{number}</span>
                </a>
              ))}

              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="group flex items-start gap-3 text-sm text-white/50 transition hover:text-[#d6b56d]"
                >
                  <Mail
                    size={16}
                    className="mt-0.5 shrink-0 text-[#c9a45c]"
                  />
                  <span className="break-all">{profile.email}</span>
                </a>
              )}

              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 text-sm text-white/50 transition hover:text-[#d6b56d]"
              >
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-[#c9a45c]"
                />

                <span className="min-w-0 flex-1 leading-6">
                  {profile.location || "View our location"}
                  <span className="mt-1 flex items-center gap-1 text-[10px] text-[#c9a45c]">
                    Open Google Maps
                    <ArrowUpRight size={11} />
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* BACK TO TOP */}
        <div className="mt-12 flex justify-center border-t border-white/10 pt-6 sm:justify-end">
          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="group inline-flex items-center gap-2 rounded-full border border-[#c9a45c]/30 px-5 py-2.5 text-xs font-medium tracking-wide text-[#d6b56d] transition hover:border-[#d6b56d] hover:bg-[#c9a45c]/10 hover:text-[#e4c982]"
          >
            Back to Top
            <ArrowUpRight className="h-4 w-4 rotate-[-45deg] transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="mt-8 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-7 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-[11px] tracking-wide text-white/35">
              © {currentYear} PIXEEPLATES. All rights reserved.
            </p>

            <p className="mt-2 text-[10px] text-white/25">
              Crafted for celebrations and memorable experiences.
            </p>
          </div>

          <a
            href="https://dextap.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-xs text-white/40 transition hover:text-[#d6b56d]"
          >
            <span>Powered by</span>

            <span className="font-semibold tracking-wide text-white/60 transition group-hover:text-[#d6b56d]">
              DexTap
            </span>

            <ArrowUpRight
              size={13}
              className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
