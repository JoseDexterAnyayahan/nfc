
"use client";

import { useEffect, useRef, useState } from "react";
import type { BusinessProfile } from "@/lib/profiles";
import {
  FaArrowRight,
  FaCheck,
  FaLocationDot,
  FaRegCopy,
  FaUpRightFromSquare,
} from "react-icons/fa6";

type Props = {
  profile: BusinessProfile;
};

const FALLBACK_LOCATION = "Calapan City, Oriental Mindoro";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5CD91] focus-visible:ring-offset-2 focus-visible:ring-offset-[#031319]";

const actionBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-none border px-6 text-sm font-semibold tracking-wide transition duration-300 active:scale-[0.98]";

export default function Location({ profile }: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const address = profile.location?.trim() || FALLBACK_LOCATION;
  const encoded = encodeURIComponent(address);

  const mapEmbedUrl = `https://www.google.com/maps?q=${encoded}&output=embed`;
  const searchUrl = `https://www.google.com/maps/search/?api=1&query=${encoded}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encoded}`;

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);

      if (timer.current) clearTimeout(timer.current);

      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked on non-HTTPS pages.
    }
  };

  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="scroll-mt-24 bg-[#031319] px-5 py-16 sm:py-20 md:px-10 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mb-12 text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#B89553]" />

            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#D6B779]">
              Find Our Studio
            </p>

            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#B89553]" />
          </div>

          <h2
            id="location-heading"
            className="text-3xl font-bold tracking-tight text-white md:text-5xl"
          >
            Visit{" "}
            <span className="bg-gradient-to-r from-[#B89553] via-[#F0DDA8] to-[#B89553] bg-clip-text text-transparent">
              Our Location
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#C0A08E]/65">
            Every great story starts somewhere. Find us and let&apos;s create
            something memorable together.
          </p>
        </div>

        {/* Location content */}
        <div className="grid items-stretch gap-8 md:grid-cols-2 md:gap-10">
          {/* Address and actions */}
          <div className="flex min-w-0 flex-col justify-center border border-[#D6B779]/15 bg-[#262B28] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-[#B89553]" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D6B779]">
                Our Address
              </p>
            </div>

            <div className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#D6B779]/25 bg-[#B89553]/10 text-[#E5CD91]"
              >
                <FaLocationDot size={18} />
              </span>

              <div className="min-w-0 pt-1">
                <p className="text-xs uppercase tracking-[0.2em] text-[#C0A08E]/45">
                  Located at
                </p>

                <address className="mt-2 break-words text-lg font-semibold not-italic leading-7 text-white sm:text-xl">
                  {address}
                </address>
              </div>
            </div>

            <div className="my-8 h-px w-full bg-gradient-to-r from-[#B89553]/40 via-[#B89553]/10 to-transparent" />

            <p className="text-sm leading-7 text-[#C0A08E]/60">
              Planning to visit? Get directions through Google Maps or copy
              our address for easy navigation.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${actionBase} border-[#D6B779] bg-gradient-to-r from-[#B89553] to-[#E5CD91] text-[#031319] hover:brightness-110 ${focusRing}`}
              >
                Get Directions
                <FaArrowRight aria-hidden="true" size={12} />
                <span className="sr-only">(opens in a new tab)</span>
              </a>

              <button
                type="button"
                onClick={copyAddress}
                className={`${actionBase} border-[#D6B779]/35 bg-transparent text-[#E5CD91] hover:border-[#E5CD91] hover:bg-[#B89553]/10 ${focusRing}`}
              >
                {copied ? (
                  <FaCheck aria-hidden="true" size={13} />
                ) : (
                  <FaRegCopy aria-hidden="true" size={13} />
                )}

                {copied ? "Address copied" : "Copy address"}
              </button>
            </div>

            <p className="sr-only" role="status" aria-live="polite">
              {copied ? "Address copied to clipboard" : ""}
            </p>

            {/* Bottom accent */}
            <div className="mt-10 flex items-center gap-3">
              <span className="h-px w-8 bg-[#B89553]/50" />
              <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#C0A08E]/35">
                We look forward to meeting you
              </span>
            </div>
          </div>

          {/* Google Maps */}
          <div className="group relative min-h-[320px] overflow-hidden border border-[#D6B779]/20 bg-[#262B28] sm:min-h-[380px] md:min-h-[430px]">
            <iframe
              title="CALIX Films and Photography location"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0 grayscale contrast-110 transition duration-700 group-hover:grayscale-0"
            />

            {/* Gold frame */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-3 border border-[#D6B779]/30 transition duration-500 group-hover:inset-4 group-hover:border-[#E5CD91]/60"
            />

            {/* Open Google Maps */}
            <a
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute bottom-6 left-6 inline-flex items-center gap-2 border border-[#D6B779]/40 bg-[#031319]/95 px-4 py-3 text-xs font-semibold tracking-wide text-[#E5CD91] backdrop-blur transition hover:border-[#E5CD91] hover:bg-[#262B28] ${focusRing}`}
            >
              Open in Google Maps
              <FaUpRightFromSquare aria-hidden="true" size={11} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#B89553]/40" />
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#C0A08E]/40">
            CALIX Films and Photography
          </p>
          <span className="h-px w-8 bg-[#B89553]/40" />
        </div>
      </div>
    </section>
  );
}
