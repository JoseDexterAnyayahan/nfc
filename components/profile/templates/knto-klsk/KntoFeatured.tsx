"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaExpandAlt,
  FaTimes,
} from "react-icons/fa";

import { kntoColors as c } from "./knto-styles";

const featuredPhotos = [
  {
    src: "/profiles/business/knto-klsk/featured-1.jpg",
    title: "The House Special",
    caption: "A little something worth coming back for.",
  },
  {
    src: "/profiles/business/knto-klsk/featured-2.jpg",
    title: "Coffee & Company",
    caption: "Good drinks, better conversations.",
  },
  {
    src: "/profiles/business/knto-klsk/featured-3.jpg",
    title: "Slow Moments",
    caption: "Take your time. Stay a while.",
  },
  {
    src: "/profiles/business/knto-klsk/featured-4.jpg",
    title: "Inside the House",
    caption: "A familiar place with its own kind of rhythm.",
  },
];

export default function KntoFeatured() {
  const trackRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const [failedImages, setFailedImages] = useState<string[]>([]);
  const [activePhoto, setActivePhoto] = useState<
    (typeof featuredPhotos)[number] | null
  >(null);

  /*
   * While the photo viewer is open:
   *  - the page behind it can't scroll (html + body overflow locked),
   *  - the vanishing scrollbar is compensated for so the layout
   *    doesn't jump sideways,
   *  - Escape closes the viewer,
   *  - focus moves to the close button and returns to the photo
   *    that opened it afterwards.
   * Everything is restored on close or unmount.
   */
  useEffect(() => {
    if (!activePhoto) return;

    const { body, documentElement } = document;

    const previous = {
      htmlOverflow: documentElement.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
    };

    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    documentElement.style.overflow = "hidden";
    body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActivePhoto(null);
        return;
      }

      // The close button is the only focusable element in the
      // viewer, so keep focus on it instead of the page behind.
      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      documentElement.style.overflow = previous.htmlOverflow;
      body.style.overflow = previous.bodyOverflow;
      body.style.paddingRight = previous.bodyPaddingRight;

      triggerRef.current?.focus();
    };
  }, [activePhoto]);

  const scrollGallery = (direction: "left" | "right") => {
    trackRef.current?.scrollBy({
      left: direction === "right" ? 330 : -330,
      behavior: "smooth",
    });
  };

  const markImageFailed = (src: string) => {
    setFailedImages((current) =>
      current.includes(src) ? current : [...current, src]
    );
  };

  return (
    <section id="knto-featured" className="py-10 sm:py-14">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.23em]"
            style={{ color: c.wood }}
          >
            A taste of the house
          </p>
          <h2
            className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl"
            style={{ color: c.ink }}
          >
            Featured moments
          </h2>
          <p
            className="mt-2 max-w-md text-xs leading-6 sm:text-sm"
            style={{ color: c.muted }}
          >
            From your favorite cup to the atmosphere that brings it all
            together.
          </p>
        </div>

        <div className="hidden shrink-0 gap-2 sm:flex">
          <button
            type="button"
            aria-label="Previous photos"
            onClick={() => scrollGallery("left")}
            className="flex h-10 w-10 items-center justify-center border transition-colors hover:bg-[#38271F] hover:text-[#F4EBDD]"
            style={{ borderColor: c.line, color: c.espresso }}
          >
            <FaChevronLeft size={12} />
          </button>
          <button
            type="button"
            aria-label="Next photos"
            onClick={() => scrollGallery("right")}
            className="flex h-10 w-10 items-center justify-center border transition-colors hover:bg-[#38271F] hover:text-[#F4EBDD]"
            style={{ borderColor: c.line, color: c.espresso }}
          >
            <FaChevronRight size={12} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: `${c.gold} ${c.soft}`,
        }}
      >
        {featuredPhotos.map((photo, index) => {
          const imageFailed = failedImages.includes(photo.src);

          return (
            <button
              key={photo.src}
              type="button"
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setActivePhoto(photo);
              }}
              className="group w-[78%] shrink-0 snap-start text-left sm:w-[48%] lg:w-[32%]"
              aria-label={`View ${photo.title}`}
            >
              <div
                className="relative aspect-[4/5] overflow-hidden border"
                style={{
                  backgroundColor: c.soft,
                  borderColor: c.line,
                }}
              >
                {!imageFailed ? (
                  <img
                    src={photo.src}
                    alt={photo.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={() => markImageFailed(photo.src)}
                  />
                ) : (
                  <div
                    className="flex h-full w-full flex-col items-center justify-center p-6 text-center"
                    style={{
                      background:
                        "linear-gradient(145deg, #E9DFD0 0%, #D9CABB 48%, #604633 150%)",
                    }}
                  >
                    <span
                      className="text-[9px] font-semibold uppercase tracking-[0.24em]"
                      style={{ color: c.wood }}
                    >
                      KNTO KLSK · PHOTO {index + 1}
                    </span>
                    <span
                      className="mt-5 max-w-[200px] text-xl font-semibold tracking-tight"
                      style={{ color: c.espresso }}
                    >
                      {photo.title}
                    </span>
                    <span
                      className="mt-3 text-xs leading-6"
                      style={{ color: c.wood }}
                    >
                      Add your photo to bring this moment to life.
                    </span>
                  </div>
                )}

                <div
                  className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 pt-16 text-left"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 0%, rgba(25,19,15,0.82) 100%)",
                    color: c.paper,
                  }}
                >
                  <div>
                    <p className="text-sm font-semibold">{photo.title}</p>
                    <p className="mt-1 text-[10px] leading-5 text-white/75">
                      {photo.caption}
                    </p>
                  </div>
                  <FaExpandAlt
                    className="mb-1 shrink-0 opacity-80 transition-transform group-hover:scale-110"
                    size={13}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <p
        className="mt-1 text-[9px] font-medium uppercase tracking-[0.18em] sm:hidden"
        style={{ color: c.muted }}
      >
        Swipe to see more photos →
      </p>

      {/* Enlarged photo viewer */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overscroll-contain bg-black/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          onClick={() => setActivePhoto(null)}
        >
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close photo viewer"
            onClick={() => setActivePhoto(null)}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-white/30 text-white transition-colors hover:bg-white/10"
          >
            <FaTimes size={16} />
          </button>

          <div
            className="max-h-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            {failedImages.includes(activePhoto.src) ? (
              <div
                className="flex min-h-64 min-w-64 items-center justify-center p-10 text-center sm:min-w-96"
                style={{ backgroundColor: c.cream, color: c.espresso }}
              >
                Photo not added yet.
              </div>
            ) : (
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="max-h-[75vh] max-w-full object-contain"
                onError={() => markImageFailed(activePhoto.src)}
              />
            )}

            <div className="pt-4 text-white">
              <h3 className="text-lg font-semibold">{activePhoto.title}</h3>
              <p className="mt-1 text-sm text-white/70">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}