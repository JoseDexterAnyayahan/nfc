"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaArrowRight,
  FaCheck,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
  FaRegCopy,
} from "react-icons/fa";
import type { BusinessProfile } from "@/lib/profiles";
import {
  tamtechContainerClass,
  tamtechSectionClass,
} from "./tamtech-styles";

type Props = {
  profile: BusinessProfile;
};

const COMPANY_NAME = "Tamaraw Technohub Inc.";

const DEFAULT_ADDRESS =
  "5th Floor, Megalife Building, Juan Luna Street, San Vicente, Calapan City, Oriental Mindoro 5200, Philippines";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0874E8] focus-visible:ring-offset-2";

export default function TamtechLocation({ profile }: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const address = profile.location || DEFAULT_ADDRESS;
  const encodedAddress = encodeURIComponent(address);

  // A saved Maps link wins. Otherwise open turn-by-turn directions to the address.
  const directionsUrl =
    profile.locationUrl ||
    `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;

  const viewMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked on non-HTTPS pages; directions still work.
    }
  };

  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className={`${tamtechSectionClass} scroll-mt-24 bg-[var(--tamtech-page)]`}
    >
      <div className={tamtechContainerClass}>
        <div className="mb-8 max-w-2xl">
          <h2
            id="location-heading"
            className="text-3xl font-extrabold tracking-tight text-[var(--tamtech-text)] sm:text-4xl"
          >
            Visit our office
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--tamtech-muted)] sm:text-base">
            Find us on the map, then open Google Maps for directions from
            wherever you are.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
          {/* Address and actions */}
          <div className="flex min-w-0 flex-col justify-between gap-6 rounded-3xl border border-[var(--tamtech-border)] bg-[var(--tamtech-card)] p-5 shadow-sm sm:p-7">
            <div className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#42CDA5]/15 text-[#168D6B]"
              >
                <FaMapMarkerAlt size={19} />
              </span>

              <div className="min-w-0">
                <h3 className="text-lg font-bold text-[var(--tamtech-text)]">
                  {COMPANY_NAME}
                </h3>
                <address className="mt-2 text-sm not-italic leading-7 text-[var(--tamtech-muted)] sm:text-base">
                  {address}
                </address>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0874E8] px-5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-[#0558B5] active:scale-[0.98] ${focusRing}`}
              >
                Get directions
                <FaArrowRight size={12} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>

              <button
                type="button"
                onClick={copyAddress}
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[var(--tamtech-border)] bg-[var(--tamtech-surface)] px-5 text-sm font-semibold text-[var(--tamtech-text)] transition hover:border-[#0874E8] hover:bg-[#0874E8]/5 active:scale-[0.98] ${focusRing}`}
              >
                {copied ? (
                  <FaCheck
                    size={13}
                    aria-hidden="true"
                    className="text-[#25AF87]"
                  />
                ) : (
                  <FaRegCopy
                    size={13}
                    aria-hidden="true"
                    className="text-[#0874E8]"
                  />
                )}
                {copied ? "Address copied" : "Copy address"}
              </button>

              <p className="sr-only" role="status" aria-live="polite">
                {copied ? "Address copied to clipboard" : ""}
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="relative min-w-0 overflow-hidden rounded-3xl border border-[var(--tamtech-border)] bg-[var(--tamtech-surface)] shadow-sm">
            <iframe
              title={`Map showing ${COMPANY_NAME}`}
              src={`https://maps.google.com/maps?q=${encodedAddress}&z=16&output=embed`}
              className="block h-[300px] w-full sm:h-[380px] lg:h-full lg:min-h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />

            {/* Fallback if the embed is blocked or slow to load */}
            <a
              href={viewMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-lg bg-white/95 px-3 py-2 text-xs font-semibold text-[#172B45] shadow-md backdrop-blur transition hover:bg-white ${focusRing}`}
            >
              View larger map
              <FaExternalLinkAlt size={10} aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}