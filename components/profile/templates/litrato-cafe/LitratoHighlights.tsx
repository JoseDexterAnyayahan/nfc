"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaTimes,
} from "react-icons/fa";
import type { BusinessProfile } from "@/lib/profiles";
import {
  litratoColors as c,
  litratoContainerClass,
} from "./litrato-styles";

type Photo = {
  src: string;
  title: string;
  caption: string;
  /**
   * Link to this photo's social media post (Facebook, Instagram, TikTok…).
   * The "See more" button only appears when this is filled in.
   */
  url?: string;
};

type Props = {
  profile: BusinessProfile;
};

const NO_PHOTOS: Photo[] = [];

const pad = (value: number) => String(value).padStart(2, "0");

// Trimmed post link, or "" when none has been added yet.
const getPostUrl = (photo: Photo | null | undefined) =>
  photo?.url?.trim() || "";

const clampTwoLines: CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

export default function LitratoHighlights({ profile }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const [scrollState, setScrollState] = useState({
    canLeft: false,
    canRight: false,
    progress: 0,
    thumb: 1,
  });

  const photos: Photo[] = profile.highlights ?? NO_PHOTOS;
  const total = photos.length;

  const activePhoto = activeIndex !== null ? (photos[activeIndex] ?? null) : null;
  const isOpen = activePhoto !== null;

  const closeViewer = useCallback(() => setActiveIndex(null), []);

  // Loops around at both ends.
  const showRelative = useCallback(
    (delta: number) => {
      setActiveIndex((current) =>
        current === null || total === 0
          ? current
          : (current + delta + total) % total,
      );
    },
    [total],
  );

  /*
   * Gallery controls stay in sync with the track: arrows disable at
   * the ends, and the slim progress bar follows the scroll position.
   */
  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    let frame = 0;

    const update = () => {
      frame = 0;

      const max = track.scrollWidth - track.clientWidth;

      setScrollState({
        canLeft: track.scrollLeft > 4,
        canRight: track.scrollLeft < max - 4,
        progress: max > 0 ? track.scrollLeft / max : 0,
        thumb:
          track.scrollWidth > 0
            ? Math.min(1, track.clientWidth / track.scrollWidth)
            : 1,
      });
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();

    track.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);

      track.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [total]);

  /*
   * While the viewer is open:
   *  - the page behind can't scroll (html + body locked), with the
   *    disappearing scrollbar compensated so nothing shifts sideways,
   *  - Escape closes, arrow keys navigate, Tab stays inside the dialog,
   *  - focus moves in, and returns to the card that opened it.
   */
  useEffect(() => {
    if (!isOpen) return;

    const { body, documentElement } = document;

    const previous = {
      bodyOverflow: body.style.overflow,
      htmlOverflow: documentElement.style.overflow,
      bodyOverscroll: body.style.overscrollBehavior,
      htmlOverscroll: documentElement.style.overscrollBehavior,
      bodyPaddingRight: body.style.paddingRight,
    };

    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    documentElement.style.overscrollBehavior = "none";

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeViewer();
        return;
      }

      if (event.key === "ArrowRight") {
        showRelative(1);
        return;
      }

      if (event.key === "ArrowLeft") {
        showRelative(-1);
        return;
      }

      if (event.key === "Tab") {
        const dialog = dialogRef.current;

        if (!dialog) return;

        const focusable = Array.from(
          dialog.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
        );

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (!dialog.contains(active)) {
          event.preventDefault();
          first.focus();
        } else if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      body.style.overflow = previous.bodyOverflow;
      documentElement.style.overflow = previous.htmlOverflow;
      body.style.overscrollBehavior = previous.bodyOverscroll;
      documentElement.style.overscrollBehavior = previous.htmlOverscroll;
      body.style.paddingRight = previous.bodyPaddingRight;

      triggerRef.current?.focus();
    };
  }, [isOpen, closeViewer, showRelative]);

  // Warm the neighbouring photos so prev/next feels instant.
  useEffect(() => {
    if (activeIndex === null || total < 2) return;

    [1, -1].forEach((delta) => {
      const neighbour = photos[(activeIndex + delta + total) % total];

      if (neighbour) {
        const preload = new Image();
        preload.src = neighbour.src;
      }
    });
  }, [activeIndex, photos, total]);

  const scrollGallery = (direction: "left" | "right") => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    trackRef.current?.scrollBy({
      left: direction === "right" ? 340 : -340,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const markImageFailed = (src: string) => {
    setFailedImages((current) =>
      current.includes(src) ? current : [...current, src],
    );
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const start = touchStartRef.current;

    touchStartRef.current = null;

    if (!start) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    // A deliberate horizontal swipe — not a tap or a vertical drag.
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      showRelative(dx < 0 ? 1 : -1);
    }
  };

  if (total === 0) return null;

  const activePostUrl = getPostUrl(activePhoto);

  const isScrollable = scrollState.thumb < 0.999;

  return (
    <section id="litrato-highlights" className="py-14 sm:py-20">
      <style>{`
        @keyframes litratoFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .litrato-fade {
          animation: litratoFade 0.28s ease-out both;
        }

        .litrato-card:focus-visible,
        .litrato-control:focus-visible,
        .litrato-link:focus-visible {
          outline: 2px solid ${c.sageDark};
          outline-offset: 3px;
        }

        .litrato-link:focus-visible {
          outline-color: #ffffff;
          outline-offset: 2px;
        }

        .litrato-viewer button:focus-visible,
        .litrato-viewer a:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .litrato-fade {
            animation: none;
          }
        }
      `}</style>

      <div className={litratoContainerClass}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p
              className="text-xs font-semibold tracking-[0.24em]"
              style={{ color: c.sageDark }}
            >
              A LITTLE LOOK INSIDE
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
              Moments at{" "}
              <span className="font-normal italic">Litrato.</span>
            </h2>

            <p
              className="mt-3 max-w-xl text-sm leading-6 sm:text-base"
              style={{ color: c.muted }}
            >
              From your first sip to the little moments in between.
            </p>
          </div>

          {isScrollable && (
            <div className="mb-1 hidden shrink-0 gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scrollGallery("left")}
                disabled={!scrollState.canLeft}
                aria-label="Previous photos"
                className="litrato-control flex h-11 w-11 items-center justify-center rounded-full border transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
                style={{ borderColor: c.border }}
              >
                <FaChevronLeft />
              </button>

              <button
                type="button"
                onClick={() => scrollGallery("right")}
                disabled={!scrollState.canRight}
                aria-label="Next photos"
                className="litrato-control flex h-11 w-11 items-center justify-center rounded-full border transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
                style={{ borderColor: c.border }}
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>

        <div
          ref={trackRef}
          className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4"
          style={{
            scrollbarWidth: "none",
          }}
        >
          {photos.map((photo, index) => {
            const postUrl = getPostUrl(photo);

            return (
              /*
               * The card is a wrapper, not a single button: the photo is
               * one button (opens the viewer) and "See more" is its own
               * link (opens the post). They're siblings, so neither click
               * triggers the other.
               */
              <div
                key={photo.src}
                className="group relative w-[78vw] max-w-[360px] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[320px]"
              >
                <button
                  type="button"
                  onClick={(event) => {
                    triggerRef.current = event.currentTarget;
                    setActiveIndex(index);
                  }}
                  className="litrato-card block w-full rounded-2xl text-left"
                  aria-label={`Open photo: ${photo.title}`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#E5E8DE]">
                    {!failedImages.includes(photo.src) ? (
                      <img
                        src={photo.src}
                        alt={photo.title}
                        loading="lazy"
                        onError={() => markImageFailed(photo.src)}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
                        <span className="text-2xl font-semibold">
                          {profile.businessName}
                        </span>
                        <span className="text-sm" style={{ color: c.muted }}>
                          Add your featured photo
                        </span>
                      </div>
                    )}

                    <div
                      className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-5 pt-20 text-white ${
                        postUrl ? "pb-16" : "pb-5"
                      }`}
                    >
                      <p className="text-lg font-semibold">{photo.title}</p>

                      <p
                        className="mt-1 text-xs leading-5 text-white/85"
                        style={clampTwoLines}
                      >
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </button>

                {postUrl && (
                  <a
                    href={postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`See more about ${photo.title} (opens in a new tab)`}
                    className="litrato-link absolute bottom-5 left-5 z-10 inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/35"
                  >
                    See more
                    <FaExternalLinkAlt size={10} />
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {isScrollable && (
          <div
            className="mt-1 h-1 w-full overflow-hidden rounded-full"
            style={{ backgroundColor: c.sageLight }}
            aria-hidden="true"
          >
            <div
              className="h-full rounded-full"
              style={{
                backgroundColor: c.sage,
                width: `${scrollState.thumb * 100}%`,
                marginLeft: `${scrollState.progress * (1 - scrollState.thumb) * 100}%`,
              }}
            />
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs" style={{ color: c.muted }}>
            Swipe to explore the gallery
          </p>

          {profile.seeMoreUrl?.trim() && (
            <a
              href={profile.seeMoreUrl}
              target="_blank"
              rel="noreferrer"
              className="litrato-control inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition hover:-translate-y-0.5"
              style={{
                backgroundColor: c.sageLight,
                color: c.sageDark,
              }}
            >
              See more photos <FaArrowRight />
            </a>
          )}
        </div>
      </div>

      {activePhoto && activeIndex !== null && (
        <div
          ref={dialogRef}
          className="litrato-viewer litrato-fade fixed inset-0 z-[100] flex items-center justify-center overflow-hidden overscroll-none bg-black/95 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          onClick={closeViewer}
          onTouchStart={(event) => {
            const touch = event.touches[0];
            touchStartRef.current = { x: touch.clientX, y: touch.clientY };
          }}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top bar */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 sm:p-6">
            <span
              className="rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-medium tabular-nums text-white backdrop-blur-md"
              aria-live="polite"
            >
              {pad(activeIndex + 1)} / {pad(total)}
            </span>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                closeViewer();
              }}
              aria-label="Close photo"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25"
            >
              <FaTimes />
            </button>
          </div>

          {/* Prev / next */}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showRelative(-1);
                }}
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25 sm:left-5"
              >
                <FaChevronLeft />
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showRelative(1);
                }}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25 sm:right-5"
              >
                <FaChevronRight />
              </button>
            </>
          )}

          {/* Photo + details */}
          <div
            className="max-h-full w-full max-w-4xl overflow-y-auto overscroll-contain"
            onClick={(event) => event.stopPropagation()}
          >
            {!failedImages.includes(activePhoto.src) ? (
              <img
                key={activePhoto.src}
                src={activePhoto.src}
                alt={activePhoto.title}
                onError={() => markImageFailed(activePhoto.src)}
                className="litrato-fade mx-auto max-h-[68vh] w-auto max-w-full rounded-xl object-contain"
              />
            ) : (
              <div className="flex min-h-64 items-center justify-center rounded-xl bg-white/10 p-8 text-white">
                Photo unavailable
              </div>
            )}

            <div className="px-12 py-5 text-center text-white sm:px-0">
              <h3 className="text-xl font-semibold">{activePhoto.title}</h3>

              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-white/70">
                {activePhoto.caption}
              </p>

              {activePostUrl && (
                <a
                  href={activePostUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-white/15 px-5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/25"
                >
                  See more <FaExternalLinkAlt size={12} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}