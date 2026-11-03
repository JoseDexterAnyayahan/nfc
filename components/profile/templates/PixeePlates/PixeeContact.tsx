
"use client";

import {
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  ArrowUpRight,
  Navigation,
  Clock,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

import { SiTiktok } from "react-icons/si";

import type { BusinessProfile } from "@/lib/profiles";
import { pixeePhoneNumbers } from "@/lib/profiles/business/pixeeplates";

const GOOGLE_MAPS_URL =
  "https://maps.app.goo.gl/nYepDGsmWdMBJxL87";

export default function PixeeContact({
  profile,
}: {
  profile: BusinessProfile;
}) {
  const facebook = profile.socials?.find(
    (social) => social.platform === "facebook"
  );

  const instagram = profile.socials?.find(
    (social) => social.platform === "instagram"
  );

  const tiktok = profile.socials?.find(
    (social) => social.platform === "tiktok"
  );

  const mapQuery = profile.location || GOOGLE_MAPS_URL;

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    mapQuery
  )}&output=embed`;

  return (
    <section
      id="contact"
      className="relative space-y-10 py-16 sm:py-20"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#c9a45c]/[0.06] blur-[100px]" />

      {/* Section Heading */}
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#c9a45c]/60" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#c9a45c]">
            Get in Touch
          </p>
          <span className="h-px w-8 bg-[#c9a45c]/60" />
        </div>

        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Let's Make It
          <span className="block font-normal text-[#d6b56d]">
            Memorable.
          </span>
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/50">
          Have an event coming up? We'd love to be part of it.
          Reach out to us and let's create something special
          together.
        </p>
      </div>

      {/* Main Contact Layout */}
      <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-[1.05fr_0.95fr]">

        {/* LEFT: MAP */}
        <div className="group overflow-hidden rounded-[28px] border border-[#c9a45c]/20 bg-[#151515]">
          <div className="relative h-[280px] overflow-hidden sm:h-[360px] lg:h-full lg:min-h-[470px]">
            <iframe
              title="PIXEEPLATES location on Google Maps"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0 opacity-80 grayscale-[0.5] transition duration-700 group-hover:grayscale-0"
            />

            {/* Map Overlay Label */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-5 sm:p-7">
              <div className="flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-[#c9a45c] p-1.5 text-black">
                      <MapPin size={13} />
                    </span>

                    <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#e4c982]">
                      Find Us Here
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white sm:text-xl">
                    PIXEEPLATES
                  </h3>

                  <p className="mt-1 line-clamp-2 text-xs text-white/60">
                    {profile.location || "Our Location"}
                  </p>
                </div>

                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open PIXEEPLATES location in Google Maps"
                  className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d6b56d]/40 bg-black/70 text-[#e4c982] backdrop-blur-md transition hover:bg-[#d6b56d] hover:text-black"
                >
                  <Navigation size={17} />
                </a>
              </div>
            </div>
          </div>

          {/* Map Footer */}
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 border-t border-white/10 px-5 py-4 transition hover:bg-white/[0.03] sm:px-7"
          >
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-[#d6b56d]" />
              <span className="text-xs font-medium text-white/70">
                Open location in Google Maps
              </span>
            </div>

            <ArrowUpRight
              size={17}
              className="text-[#d6b56d]"
            />
          </a>
        </div>

        {/* RIGHT: CONTACT INFORMATION */}
        <div className="flex flex-col rounded-[28px] border border-[#c9a45c]/20 bg-[#151515] p-6 sm:p-8 lg:p-9">

          {/* Card Heading */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c9a45c]">
              Contact Information
            </p>

            <h3 className="mt-2 text-2xl font-semibold text-white">
              Connect With Us
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/45">
              For bookings, inquiries, and collaborations,
              contact us through any of the channels below.
            </p>
          </div>

          {/* Contact Details */}
          <div className="mt-8 space-y-6">

            {/* Phone Numbers */}
            {pixeePhoneNumbers.map((number) => (
              <a
                key={number}
                href={`tel:${number}`}
                className="group flex items-center gap-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#c9a45c]/20 bg-[#c9a45c]/[0.08] text-[#d6b56d] transition group-hover:border-[#d6b56d]/60 group-hover:bg-[#c9a45c] group-hover:text-black">
                  <Phone size={17} />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35">
                    Phone Number
                  </p>

                  <p className="mt-1 break-all text-sm font-medium text-white transition group-hover:text-[#d6b56d]">
                    {number}
                  </p>
                </div>

                <ArrowUpRight
                  size={16}
                  className="shrink-0 text-white/20 transition group-hover:text-[#d6b56d]"
                />
              </a>
            ))}

            {/* Email */}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="group flex items-center gap-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#c9a45c]/20 bg-[#c9a45c]/[0.08] text-[#d6b56d] transition group-hover:border-[#d6b56d]/60 group-hover:bg-[#c9a45c] group-hover:text-black">
                  <Mail size={17} />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35">
                    Email Address
                  </p>

                  <p className="mt-1 break-all text-sm font-medium text-white transition group-hover:text-[#d6b56d]">
                    {profile.email}
                  </p>
                </div>

                <ArrowUpRight
                  size={16}
                  className="shrink-0 text-white/20 transition group-hover:text-[#d6b56d]"
                />
              </a>
            )}

            {/* Location */}
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#c9a45c]/20 bg-[#c9a45c]/[0.08] text-[#d6b56d] transition group-hover:border-[#d6b56d]/60 group-hover:bg-[#c9a45c] group-hover:text-black">
                <MapPin size={17} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35">
                  Location
                </p>

                <p className="mt-1 text-sm font-medium leading-5 text-white transition group-hover:text-[#d6b56d]">
                  {profile.location || "View our location"}
                </p>
              </div>

              <ExternalLink
                size={15}
                className="shrink-0 text-white/20 transition group-hover:text-[#d6b56d]"
              />
            </a>
          </div>

          {/* Social Links */}
          <div className="mt-auto pt-9">
            <div className="mb-5 h-px bg-gradient-to-r from-[#c9a45c]/40 via-white/10 to-transparent" />

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d6b56d]">
                  Follow Our Journey
                </p>

                <p className="mt-1 text-xs text-white/40">
                  Stay connected with PIXEEPLATES.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {facebook && (
                  <a
                    href={facebook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="PIXEEPLATES on Facebook"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a45c]/25 text-white/70 transition hover:border-[#d6b56d] hover:bg-[#c9a45c] hover:text-black"
                  >
                    <FaFacebookF size={16} />
                  </a>
                )}

                {instagram && (
                  <a
                    href={instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="PIXEEPLATES on Instagram"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a45c]/25 text-white/70 transition hover:border-[#d6b56d] hover:bg-[#c9a45c] hover:text-black"
                  >
                    <FaInstagram size={17} />
                  </a>
                )}

                {tiktok && (
                  <a
                    href={tiktok.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="PIXEEPLATES on TikTok"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a45c]/25 text-white/70 transition hover:border-[#d6b56d] hover:bg-[#c9a45c] hover:text-black"
                  >
                    <SiTiktok size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Call to Action */}
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 rounded-2xl border border-[#c9a45c]/15 bg-[#c9a45c]/[0.04] px-6 py-6 text-center sm:flex-row sm:text-left">
        <div>
          <p className="text-sm font-semibold text-white">
            Planning something special?
          </p>

          <p className="mt-1 text-xs text-white/45">
            Let PIXEEPLATES help bring your celebration to life.
          </p>
        </div>

        {pixeePhoneNumbers[0] && (
          <a
            href={`tel:${pixeePhoneNumbers[0]}`}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#d6b56d] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#e4c982]"
          >
            Contact Us
            <ArrowUpRight size={15} />
          </a>
        )}
      </div>
    </section>
  );
}
