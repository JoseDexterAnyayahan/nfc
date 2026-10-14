"use client";

import {
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaDirections,
  FaLocationArrow,
} from "react-icons/fa";

import { kntoColors as c } from "./knto-styles";

type KntoLocationProps = {
  location: string;
  locationUrl?: string;
};

export default function KntoLocation({
  location,
  locationUrl,
}: KntoLocationProps) {
  const mapsUrl =
    locationUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      location
    )}`;

  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    location
  )}&output=embed`;

  return (
    <section
      id="knto-location"
      className="py-8 sm:py-12 lg:py-16"
      style={{ color: c.ink }}
    >
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <div className="mb-5 flex items-end justify-between gap-4 sm:mb-7">
          <div className="min-w-0">
            <p
              className="text-[9px] font-semibold uppercase tracking-[0.2em] sm:text-[10px] sm:tracking-[0.23em]"
              style={{ color: c.wood }}
            >
              Find the house
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl lg:text-4xl">
              Come on over.
            </h2>

            <p
              className="mt-2 max-w-md text-xs leading-6 sm:text-sm"
              style={{ color: c.muted }}
            >
              Good coffee, good music, and good company are waiting for you.
            </p>
          </div>

          <div
            className="hidden h-12 w-12 shrink-0 items-center justify-center border sm:flex"
            style={{
              borderColor: c.line,
              color: c.gold,
              backgroundColor: c.cream,
            }}
            aria-hidden="true"
          >
            <FaMapMarkerAlt size={18} />
          </div>
        </div>

        {/* Main location card */}
        <div
          className="overflow-hidden border"
          style={{
            borderColor: c.line,
            backgroundColor: c.paper,
          }}
        >
          {/* Embedded Google Maps */}
          <div
            className="relative w-full overflow-hidden"
            style={{
              height: "clamp(220px, 48vw, 380px)",
              backgroundColor: c.cream,
            }}
          >
            <iframe
              title={`Google Maps location for ${location}`}
              src={embedUrl}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />

          </div>

          {/* Location details */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex items-start gap-3 sm:gap-4">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center border sm:h-12 sm:w-12"
                style={{
                  borderColor: c.line,
                  color: c.gold,
                  backgroundColor: c.cream,
                }}
              >
                <FaMapMarkerAlt size={16} />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="text-[9px] font-semibold uppercase tracking-[0.18em] sm:text-[10px] sm:tracking-[0.2em]"
                  style={{ color: c.wood }}
                >
                  Our address
                </p>

                <p className="mt-2 break-words text-sm font-medium leading-6 sm:text-base sm:leading-7">
                  {location}
                </p>

                <p
                  className="mt-1 text-xs leading-5 sm:text-sm"
                  style={{ color: c.muted }}
                >
                  Calapan City, Oriental Mindoro, Philippines
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-5 grid grid-cols-1 gap-2.5 min-[380px]:grid-cols-2 sm:mt-6 sm:gap-3">
              {/* Primary directions action */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get directions to KNTO KLSK using Google Maps"
                className="group flex min-h-12 min-w-0 items-center justify-center gap-2 border px-3 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.08em] transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:min-h-[52px] sm:gap-2.5 sm:px-5 sm:text-[11px] sm:tracking-[0.12em]"
                style={{
                  borderColor: c.espresso,
                  backgroundColor: c.espresso,
                  color: c.cream,
                }}
              >
                <FaDirections
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                  size={16}
                />

                <span>Get Directions</span>

                <FaExternalLinkAlt
                  className="shrink-0"
                  size={9}
                />
              </a>

              {/* Secondary location action */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-12 min-w-0 items-center justify-center gap-2 border px-3 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.08em] transition-all duration-300 hover:-translate-y-0.5 sm:min-h-[52px] sm:gap-2.5 sm:px-5 sm:text-[11px] sm:tracking-[0.12em]"
                style={{
                  borderColor: c.line,
                  backgroundColor: c.paper,
                  color: c.ink,
                }}
              >
                <FaLocationArrow
                  className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
                  size={12}
                  style={{ color: c.gold }}
                />

                <span>View on Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom brand detail */}
        <div className="mt-3 flex flex-col gap-1.5 min-[400px]:flex-row min-[400px]:items-center min-[400px]:justify-between sm:mt-4">
          <p
            className="text-[8px] font-medium uppercase tracking-[0.15em] sm:text-[9px] sm:tracking-[0.2em]"
            style={{ color: c.muted }}
          >
            Your next favorite spot
          </p>

          <p
            className="text-[8px] font-medium uppercase tracking-[0.15em] sm:text-[9px] sm:tracking-[0.2em]"
            style={{ color: c.muted }}
          >
            Drop in. Stay awhile.
          </p>
        </div>
      </div>
    </section>
  );
}
