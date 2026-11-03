
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Check,
  ChevronRight,
  Gift,
  ImageOff,
  Plus,
  Sparkles,
  X,
} from "lucide-react";
import type { PixeePackage } from "../pixeeplates.types";

const money = (price: number) => `₱${price.toLocaleString("en-PH")}`;

export default function PixeePackageCard({
  pkg,
}: {
  pkg: PixeePackage;
}) {
  const [open, setOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const priceLabel =
    pkg.priceLabel ??
    (pkg.price !== undefined ? money(pkg.price) : "Inquire for rate");

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const lists = [
    { title: "Package Inclusions", items: pkg.inclusions, icon: Check },
    { title: "Optional Add-ons", items: pkg.optionalAddons, icon: Plus },
    { title: "Freebies", items: pkg.free, icon: Gift },
    { title: "Special Offers", items: pkg.specialOffer, icon: Gift },
    {
      title: "Additional Notes",
      items: pkg.notes ? [pkg.notes] : [],
      icon: Check,
    },
  ];

  const renderPackageImage = (modal = false) => {
    if (imageFailed) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#40321c] via-[#171717] to-black text-[#d6b56d]/60">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d6b56d]/20 bg-[#d6b56d]/[0.06]">
            <ImageOff size={25} strokeWidth={1.2} />
          </div>

          <span className="text-[9px] font-medium uppercase tracking-[0.24em]">
            Package photo
          </span>
        </div>
      );
    }

    return (
      <Image
        src={pkg.thumbnail}
        alt={`${pkg.name} package`}
        fill
        priority={modal}
        sizes={
          modal
            ? "(max-width: 768px) 100vw, 672px"
            : "(max-width: 640px) 82vw, (max-width: 1024px) 45vw, 30vw"
        }
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        onError={() => setImageFailed(true)}
      />
    );
  };

  return (
    <>
      {/* Package Card */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View ${pkg.name} details`}
        className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[#171717] text-left shadow-[0_8px_24px_rgba(0,0,0,0.16)] transition-[border-color,box-shadow,background-color] duration-300 hover:border-[#d6b56d]/55 hover:bg-[#1b1a17] hover:shadow-[0_12px_36px_rgba(201,164,92,0.13)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b56d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
      >
        {/* Image */}
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-gradient-to-br from-[#40321c] via-[#171717] to-black">
          {renderPackageImage()}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent opacity-90" />

          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent" />

          {/* Price badge */}
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d6b56d]/40 bg-black/75 px-3.5 py-2 text-[11px] font-semibold tracking-wide text-[#e4c982] shadow-lg backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d6b56d]" />
              {priceLabel}
            </span>
          </div>
        </div>

        {/* Card Information */}
        <div className="flex min-h-[140px] flex-1 flex-col p-5">
          <div className="flex-1">
            <h3 className="text-base font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-[#e4c982] sm:text-lg">
              {pkg.name}
            </h3>

            {pkg.subtitle && (
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/45">
                {pkg.subtitle}
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

      {/* Package Details Dialog */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={`package-${pkg.id}`}
            className="relative flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#c9a45c]/30 bg-[#151515] text-white shadow-[0_25px_100px_rgba(0,0,0,0.7)] sm:rounded-3xl"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close package details"
              className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#d6b56d] hover:bg-[#d6b56d] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b56d]"
            >
              <X size={18} />
            </button>

            {/* Scrollable Content */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              {/* Hero Image */}
              <div className="relative aspect-[16/8] w-full overflow-hidden bg-gradient-to-br from-[#40321c] via-[#171717] to-black">
                {renderPackageImage(true)}

                <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-black/10 to-transparent" />

                <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-[#d6b56d]/40 bg-black/65 px-3.5 py-2 text-xs font-semibold text-[#e4c982] shadow-lg backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d6b56d]" />
                  {priceLabel}
                </span>
              </div>

              {/* Package Details */}
              <div className="px-5 pb-8 pt-2 sm:px-8">
                <div className="mb-5">
                  <p className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#d6b56d]">
                    <Sparkles size={12} />
                    PIXEEPLATES
                    <span className="text-white/25">/</span>
                    PACKAGE DETAILS
                  </p>

                  <h3
                    id={`package-${pkg.id}`}
                    className="mt-3 pr-8 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
                  >
                    {pkg.name}
                  </h3>

                  {pkg.subtitle && (
                    <p className="mt-2 text-sm leading-relaxed text-white/45">
                      {pkg.subtitle}
                    </p>
                  )}

                  {pkg.description && (
                    <p className="mt-4 text-sm leading-7 text-white/65">
                      {pkg.description}
                    </p>
                  )}
                </div>

                <div className="h-px bg-gradient-to-r from-[#d6b56d]/40 via-white/10 to-transparent" />

                {/* Package Lists */}
                {lists.map(({ title, items, icon: Icon }) =>
                  items?.length ? (
                    <div key={title} className="mt-7">
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
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#d6b56d]/20 bg-[#d6b56d]/[0.08] text-[#d6b56d]">
                              <Icon size={12} />
                            </span>

                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null,
                )}

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
                onClick={() => setOpen(false)}
                className="w-full rounded-xl bg-gradient-to-r from-[#c9a45c] to-[#e4c982] px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#17130b] shadow-[0_4px_18px_rgba(201,164,92,0.12)] transition-all duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#151515]"
              >
                Close Details
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
