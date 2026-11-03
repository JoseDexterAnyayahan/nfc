
"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import {
  Check,
  ChevronRight,
  Gift,
  ImageOff,
  Plus,
  Sparkles,
  X,
} from "lucide-react";

export type PixeeServiceItem = {
  id: string;
  name: string;
  subtitle?: string;
  priceLabel: string;
  thumbnail: string;
  description?: string;
  details: ReactNode;
};

export function PixeeDetailList({
  title,
  items,
}: {
  title: string;
  items?: string[];
}) {
  if (!items?.length) return null;

  return (
    <div className="mt-7">
      <h4 className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d6b56d]">
        <span className="h-px w-5 bg-[#d6b56d]/50" />
        {title}
      </h4>

      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={`${title}-${index}`}
            className="flex items-start gap-3 text-sm leading-relaxed text-white/70"
          >
            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d6b56d]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PixeeRateGrid({
  rates,
}: {
  rates: { guests: number; price: number | null }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {rates.map((rate) => (
        <div
          key={rate.guests}
          className="rounded-xl border border-white/[0.07] bg-black/30 p-3 transition-colors duration-300 hover:border-[#d6b56d]/25"
        >
          <p className="text-[10px] text-white/45">
            {rate.guests} guests
          </p>

          <p className="mt-2 text-sm font-semibold text-[#e2c47d]">
            {rate.price !== null
              ? `₱${rate.price.toLocaleString("en-PH")}`
              : "Inquire"}
          </p>
        </div>
      ))}
    </div>
  );
}

export function PixeeSectionHeading({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <h4 className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d6b56d]">
      <span className="h-px w-5 bg-[#d6b56d]/50" />
      {children}
    </h4>
  );
}

export default function PixeeServiceSection({
  id,
  title,
  description,
  items,
}: {
  id: string;
  title: string;
  description: string;
  items: PixeeServiceItem[];
}) {
  const [selected, setSelected] = useState<PixeeServiceItem | null>(null);
  const [failedImages, setFailedImages] = useState<string[]>([]);

  const isSingleItem = items.length === 1;

  useEffect(() => {
    if (!selected) return;

    const previousOverflow = document.body.style.overflow;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  const renderImage = (
    item: PixeeServiceItem,
    imageId: string,
    isModal = false,
  ) => {
    const failed = failedImages.includes(imageId);

    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#40321c] via-[#171717] to-black">
        {!failed ? (
          <Image
            src={item.thumbnail}
            alt={item.name}
            fill
            sizes={
              isModal
                ? "(max-width: 768px) 100vw, 672px"
                : "(max-width: 640px) 82vw, (max-width: 1024px) 45vw, 30vw"
            }
            className={
              isModal
                ? "object-cover"
                : "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            }
            onError={() =>
              setFailedImages((current) =>
                current.includes(imageId)
                  ? current
                  : [...current, imageId],
              )
            }
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 text-[#d6b56d]/60">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d6b56d]/20 bg-[#d6b56d]/[0.06]">
              <ImageOff size={25} strokeWidth={1.2} />
            </div>

            <span className="text-[9px] font-medium uppercase tracking-[0.24em]">
              Service photo
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      id={id}
      className="scroll-mt-20 space-y-8 py-12 sm:space-y-10 sm:py-16"
    >
      {/* Section Heading */}
      <div className="mx-auto max-w-xl px-4 text-center">
        <div className="mb-3 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#c9a45c]/50" />

          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#d6b56d]">
            More ways to celebrate
          </p>

          <span className="h-px w-8 bg-[#c9a45c]/50" />
        </div>

        <h2 className="text-3xl font-semibold tracking-wide text-white sm:text-4xl">
          {title}
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-white/50">
          {description}
        </p>
      </div>

      {/* Service Cards */}
      <div
        className={`pixee-carousel flex items-stretch gap-4 px-4 pb-5 sm:gap-5 ${
          isSingleItem
            ? "justify-center overflow-x-hidden"
            : "snap-x snap-mandatory overflow-x-auto scroll-smooth"
        }`}
        aria-label={`${title} options`}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex shrink-0 snap-start ${
              isSingleItem
                ? "w-full max-w-[320px]"
                : "w-[82%] max-w-[320px] sm:w-[calc((100%-2.5rem)/3)] sm:max-w-none"
            }`}
          >
            <button
              type="button"
              onClick={() => setSelected(item)}
              aria-label={`View ${item.name} details`}
              className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[#171717] text-left shadow-[0_8px_24px_rgba(0,0,0,0.16)] transition-[border-color,box-shadow,background-color] duration-300 hover:border-[#d6b56d]/55 hover:bg-[#1b1a17] hover:shadow-[0_12px_36px_rgba(201,164,92,0.13)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b56d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
            >
              {/* Card Image */}
              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-gradient-to-br from-[#40321c] via-[#171717] to-black">
                {renderImage(item, item.id)}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent opacity-90" />

                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent" />

                {/* Price Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#d6b56d]/40 bg-black/75 px-3.5 py-2 text-[11px] font-semibold tracking-wide text-[#e4c982] shadow-lg backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d6b56d]" />
                    {item.priceLabel}
                  </span>
                </div>
              </div>

              {/* Card Information */}
              <div className="flex min-h-[140px] flex-1 flex-col p-5">
                <div className="flex-1">
                  <h3 className="text-base font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-[#e4c982] sm:text-lg">
                    {item.name}
                  </h3>

                  {item.subtitle && (
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/45">
                      {item.subtitle}
                    </p>
                  )}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-3">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#d6b56d]/75">
                    Explore package
                  </span>

                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d6b56d]/20 text-[#d6b56d] transition-all duration-300 group-hover:border-[#d6b56d] group-hover:bg-[#d6b56d] group-hover:text-black">
                    <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Service Details Dialog */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelected(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="pixee-service-dialog-title"
            className="relative flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#c9a45c]/30 bg-[#151515] text-white shadow-[0_25px_100px_rgba(0,0,0,0.7)] sm:rounded-3xl"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close service details"
              className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#d6b56d] hover:bg-[#d6b56d] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b56d]"
            >
              <X size={18} />
            </button>

            {/* Scrollable Dialog Content */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              {/* Hero Image */}
              <div className="relative aspect-[16/8] w-full overflow-hidden bg-gradient-to-br from-[#40321c] via-[#171717] to-black">
                {renderImage(selected, `${selected.id}-dialog`, true)}

                <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-black/10 to-transparent" />

                <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-[#d6b56d]/40 bg-black/65 px-3.5 py-2 text-xs font-semibold text-[#e4c982] shadow-lg backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d6b56d]" />
                  {selected.priceLabel}
                </span>
              </div>

              {/* Service Information */}
              <div className="px-5 pb-8 pt-2 sm:px-8">
                <div className="mb-5">
                  <p className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#d6b56d]">
                    <Sparkles size={12} />
                    PIXEEPLATES
                    <span className="text-white/25">/</span>
                    SERVICE DETAILS
                  </p>

                  <h3
                    id="pixee-service-dialog-title"
                    className="mt-3 pr-8 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
                  >
                    {selected.name}
                  </h3>

                  {selected.subtitle && (
                    <p className="mt-2 text-sm leading-relaxed text-white/45">
                      {selected.subtitle}
                    </p>
                  )}

                  {selected.description && (
                    <p className="mt-4 text-sm leading-7 text-white/65">
                      {selected.description}
                    </p>
                  )}
                </div>

                <div className="h-px bg-gradient-to-r from-[#d6b56d]/40 via-white/10 to-transparent" />

                {/* Existing Service Details */}
                {selected.details}

                {/* Contact Note */}
                <div className="relative mt-9 overflow-hidden rounded-2xl border border-[#c9a45c]/20 bg-gradient-to-br from-[#c9a45c]/[0.10] to-transparent p-5">
                  <div className="absolute -right-5 -top-8 h-28 w-28 rounded-full bg-[#d6b56d]/[0.06] blur-2xl" />

                  <div className="relative">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-[#d6b56d]/25 bg-[#d6b56d]/10 text-[#e4c982]">
                      <Sparkles size={16} />
                    </div>

                    <p className="text-sm font-semibold text-[#e4c982]">
                      Make your event memorable
                    </p>

                    <p className="mt-2 text-xs leading-relaxed text-white/55">
                      Contact PIXEEPLATES for availability, reservations, and
                      package inquiries.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fixed Bottom Action */}
            <div className="shrink-0 border-t border-white/10 bg-[#151515]/95 px-5 py-3 backdrop-blur-xl sm:px-8">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="w-full rounded-xl bg-gradient-to-r from-[#c9a45c] to-[#e4c982] px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#17130b] shadow-[0_4px_18px_rgba(201,164,92,0.12)] transition-all duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#151515]"
              >
                Close Details
              </button>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
