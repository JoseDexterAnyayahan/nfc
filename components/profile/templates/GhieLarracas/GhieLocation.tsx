
"use client";

import {
  ExternalLink,
  MapPin,
  Navigation,
  Map,
  ArrowUpRight,
  Compass,
} from "lucide-react";

const MAP_URL = "https://maps.app.goo.gl/KLAKn6kdj51yqG4d8";

const EMBED_URL =
  "https://maps.google.com/maps?q=Pinamalayan%2C%20Oriental%20Mindoro&t=&z=14&ie=UTF8&iwloc=&output=embed";

export default function GhieLocation() {
  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="relative overflow-hidden bg-[var(--ghie-surface)] py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-7 lg:px-8">

        {/* Section Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--ghie-border)] bg-white/70 px-4 py-2">
            <MapPin
              size={14}
              className="text-[var(--ghie-blue)]"
            />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--ghie-blue)]">
              Find Our Location
            </span>
          </div>

          <h2
            id="location-heading"
            className="mt-5 text-3xl font-bold tracking-tight text-[var(--ghie-text)] sm:text-4xl"
          >
            Come and Find Us
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[var(--ghie-muted)] sm:text-base">
            We're located in Pinamalayan, Oriental Mindoro.
            Use the map below to find our location and plan
            your visit with ease.
          </p>
        </div>

        {/* Location Card */}
        <div className="mt-10 overflow-hidden rounded-[28px] border border-[var(--ghie-border)] bg-white shadow-[0_12px_45px_rgba(0,0,0,0.06)]">

          {/* Map */}
          <div className="relative h-[280px] w-full bg-gray-100 sm:h-[380px] lg:h-[450px]">
            <iframe
              title="Google Maps showing Pinamalayan, Oriental Mindoro"
              src={EMBED_URL}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
              allowFullScreen
            />
          </div>

          {/* Location Details */}
          <div className="p-5 sm:p-7 lg:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--ghie-blue)]/10 text-[var(--ghie-blue)]">
                  <MapPin size={22} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--ghie-muted)]">
                    Visit Us
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-[var(--ghie-text)] sm:text-xl">
                    Pinamalayan, Oriental Mindoro
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[var(--ghie-muted)]">
                    Find our location through Google Maps
                    and get directions for your visit.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
                <a
                  href={MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get directions to our location on Google Maps"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--ghie-blue)] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[var(--ghie-blue)]/15 transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--ghie-blue-dark)] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ghie-blue)] focus-visible:ring-offset-2"
                >
                  <Navigation size={17} />
                  Get Directions
                  <ArrowUpRight size={16} />
                </a>

                <a
                  href={MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open location in Google Maps"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[var(--ghie-border)] bg-white px-6 py-3 text-sm font-bold text-[var(--ghie-text)] transition duration-300 hover:border-[var(--ghie-blue)] hover:bg-[var(--ghie-blue)]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ghie-blue)] focus-visible:ring-offset-2"
                >
                  <Map size={17} />
                  Open Map
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Bottom Information */}
            <div className="mt-7 flex items-center gap-3 border-t border-[var(--ghie-border)] pt-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--ghie-mint-dark)]/10 text-[var(--ghie-mint-dark)]">
                <Compass size={17} />
              </div>

              <p className="text-xs leading-5 text-[var(--ghie-muted)] sm:text-sm">
                <span className="font-semibold text-[var(--ghie-text)]">
                  Need directions?
                </span>{" "}
                Tap Get Directions to navigate using Google Maps.
              </p>
            </div>
          </div>
        </div>

        {/* Closing Text */}
        <p className="mt-7 text-center text-xs text-[var(--ghie-muted)]">
          We look forward to welcoming you!
        </p>
      </div>
    </section>
  );
}
