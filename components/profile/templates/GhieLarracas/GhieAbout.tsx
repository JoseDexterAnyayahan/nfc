import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronDown,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import { FaFacebookF } from "react-icons/fa";

import { ghieContainerClass, ghieSectionClass } from "./GhieStyles";

// Featured activities and social media posts
const featuredMoments = [
  {
    title: "Bringing More Love to Buli Schools",
    category: "Education & Community Service",
    description:
      "Supporting Buli schools through twin education projects that promote learning and create better opportunities for students.",
    image: "/profiles/business/ghie-larracas/featured/community-outreach.jpg",
    postUrl: "https://www.facebook.com/share/p/1ETh4kQgUY/",
  },
  {
    title: "Growing a Greener Wawa",
    category: "Environmental Conservation",
    description:
      "Returning to Wawa for another mangrove planting activity while monitoring the growth of previously planted seedlings.",
    image: "/profiles/business/ghie-larracas/featured/acts-of-kindness.jpg",
    postUrl: "https://www.facebook.com/share/p/1DjXmnbebd/",
  },
  {
    title: "A Safer Beginning for Mangyan Mothers",
    category: "Healthcare & Global Partnership",
    description:
      "Supporting the establishment of the Philippines' first solar-powered birthing facility for indigenous communities in Bongabong through an international Rotary partnership.",
    image: "/profiles/business/ghie-larracas/featured/rotary-activities.jpg",
    postUrl: "https://www.facebook.com/share/p/1FCZgDfXS8/",
  },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ghie-blue)] focus-visible:ring-offset-2";

const eyebrow = "text-[11px] font-bold uppercase tracking-[0.18em] sm:text-xs";

export default function GhieAbout() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className={`${ghieSectionClass} relative scroll-mt-24 overflow-hidden`}
    >
      {/* Decorative background elements */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[var(--ghie-blue)] opacity-[0.045] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-[var(--ghie-mint)] opacity-[0.07] blur-3xl"
      />

      <div className={`${ghieContainerClass} relative`}>
        {/* About introduction */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--ghie-blue)]/15 bg-[var(--ghie-blue)]/[0.06] px-4 py-2">
            <HeartHandshake
              size={15}
              aria-hidden="true"
              className="text-[var(--ghie-gold)]"
            />

            <span className={`${eyebrow} text-[var(--ghie-blue)]`}>
              A Heart for Service
            </span>
          </div>

          <h2
            id="about-heading"
            className="mt-5 text-3xl font-bold tracking-tight text-[var(--ghie-text)] sm:text-4xl lg:text-5xl"
          >
            About <span className="text-[var(--ghie-blue)]">Ghie</span>
          </h2>

          <div
            aria-hidden="true"
            className="mx-auto mt-5 flex items-center justify-center gap-2"
          >
            <span className="h-[2px] w-10 rounded-full bg-[var(--ghie-mint)]" />
            <span className="h-2 w-2 rotate-45 bg-[var(--ghie-gold)]" />
            <span className="h-[2px] w-10 rounded-full bg-[var(--ghie-mint)]" />
          </div>

          {/* Short visible introduction */}
          <div className="mx-auto mt-7 max-w-2xl">
            <h3 className="text-xl font-bold tracking-tight text-[var(--ghie-text)] sm:text-2xl">
              A Leader Guided by Service
            </h3>

            <p className="mt-3 text-pretty text-base leading-8 text-[var(--ghie-muted)] sm:text-lg sm:leading-9">
              Rosalie “Ghie” F. Larracas is a community-minded leader whose
              passion for service and commitment to making a difference have
              guided her journey in Rotary.
            </p>
          </div>

          {/* Expandable full biography */}
          <details className="group mx-auto mt-7 max-w-2xl overflow-hidden rounded-2xl border border-[var(--ghie-border)] bg-[var(--ghie-card)] text-left shadow-sm transition-shadow duration-300 open:border-[var(--ghie-blue)]/25 open:shadow-md">
            <summary
              className={`flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-4 transition-colors hover:bg-[var(--ghie-blue)]/[0.03] sm:p-5 [&::-webkit-details-marker]:hidden ${focusRing}`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--ghie-blue)]/[0.08] text-[var(--ghie-blue)]"
                >
                  <HeartHandshake size={20} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-bold text-[var(--ghie-text)] sm:text-base">
                    Discover Her Story
                  </p>

                  <p className="mt-0.5 text-xs leading-5 text-[var(--ghie-muted)] sm:text-sm">
                    Her leadership journey and commitment to service
                  </p>
                </div>
              </div>

              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--ghie-blue)]/[0.07] text-[var(--ghie-blue)] transition-transform duration-300 group-open:rotate-180"
              >
                <ChevronDown size={19} />
              </span>
            </summary>

            <div className="border-t border-[var(--ghie-border)] px-5 py-6 sm:px-7 sm:py-7">
              {/* Leadership timeline */}
              <ol className="space-y-7">
                <li className="relative border-l-2 border-[var(--ghie-mint)] pl-6">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-[var(--ghie-card)] bg-[var(--ghie-mint)]"
                  />

                  <p className="inline-block rounded-full bg-[var(--ghie-mint)]/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--ghie-mint-dark)]">
                    Rotary Year 2020–2021
                  </p>

                  <h4 className="mt-2 text-base font-bold text-[var(--ghie-text)]">
                    Transforming President
                  </h4>

                  <p className="mt-2 text-sm leading-7 text-[var(--ghie-muted)] sm:text-base sm:leading-8">
                    She served as the Transforming President of the Rotary Club
                    of Pinamalayan Central, demonstrating her dedication to
                    leadership, community development, and the Rotary spirit of
                    Service Above Self.
                  </p>
                </li>

                <li className="relative border-l-2 border-[var(--ghie-mint)] pl-6">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-[var(--ghie-card)] bg-[var(--ghie-mint)]"
                  />

                  <p className="inline-block rounded-full bg-[var(--ghie-mint)]/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--ghie-mint-dark)]">
                    Rotary Year 2025–2026
                  </p>

                  <h4 className="mt-2 text-base font-bold text-[var(--ghie-text)]">
                    Assistant Governor
                  </h4>

                  <p className="mt-2 text-sm leading-7 text-[var(--ghie-muted)] sm:text-base sm:leading-8">
                    Her commitment to service continued to grow, leading her to
                    become an Assistant Governor for Area 2, Group 13, Rotary
                    International District 3820.
                  </p>
                </li>
              </ol>

              {/* Philosophy and mission */}
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-[var(--ghie-blue)]/[0.05] p-4 sm:p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--ghie-mint-dark)]">
                    Her Philosophy
                  </p>

                  <p className="mt-2 text-sm leading-7 text-[var(--ghie-muted)]">
                    Guided by the values of compassion, collaboration, and
                    meaningful service, Ghie believes that true leadership is
                    not measured by titles but by the positive and lasting
                    impact one creates in the lives of others.
                  </p>
                </div>

                <div className="rounded-xl bg-[var(--ghie-mint)]/[0.08] p-4 sm:p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--ghie-mint-dark)]">
                    Her Mission
                  </p>

                  <p className="mt-2 text-sm leading-7 text-[var(--ghie-muted)]">
                    Her mission is simple: to inspire people, build meaningful
                    connections, and create lasting change through service to
                    communities.
                  </p>
                </div>
              </div>
            </div>
          </details>
        </div>

        {/* Featured moments heading */}
        <div className="mt-16 flex flex-col gap-4 sm:mt-24 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={`${eyebrow} text-[var(--ghie-mint-dark)]`}>
              Stories of Service
            </p>

            <h3 className="mt-2 text-2xl font-bold tracking-tight text-[var(--ghie-text)] sm:text-3xl">
              Featured Moments
            </h3>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--ghie-muted)] sm:text-base sm:leading-7">
              A glimpse of the activities, people, and moments that reflect a
              commitment to creating lasting impacts.
            </p>
          </div>

          <a
            href="#featured-moments"
            className={`hidden items-center gap-2 rounded-md text-sm font-semibold text-[var(--ghie-blue)] transition hover:text-[var(--ghie-blue)]/80 sm:inline-flex ${focusRing}`}
          >
            <span>Explore the stories</span>
            <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>

        {/* Featured image gallery */}
        <ul
          id="featured-moments"
          className="mt-7 grid scroll-mt-24 grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featuredMoments.map((moment, index) => (
            <li key={moment.title} className="flex">
              <a
                href={moment.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${moment.title} social media post (opens in a new tab)`}
                className={`group flex min-w-0 flex-1 flex-col overflow-hidden rounded-3xl border border-[var(--ghie-border)] bg-[var(--ghie-card)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--ghie-blue)]/30 hover:shadow-[0_18px_45px_rgba(23,43,69,0.12)] focus-visible:ring-offset-4 ${focusRing}`}
              >
                {/* Thumbnail */}
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-[var(--ghie-surface)]">
                  <Image
                    src={moment.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#071D38]/70 via-transparent to-transparent"
                  />

                  <span className="absolute bottom-4 left-4 max-w-[85%] rounded-full border border-white/25 bg-[#071D38]/45 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                    {moment.category}
                  </span>

                  {/* Always visible on touch, reveals on hover for desktop */}
                  <div
                    aria-hidden="true"
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[var(--ghie-blue)] shadow-lg transition-all duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100"
                  >
                    <ArrowUpRight size={19} />
                  </div>
                </div>

                {/* Featured content */}
                <div className="flex min-h-0 flex-1 flex-col p-5 sm:p-6">
                  {/* Featured number */}
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-[2px] w-6 shrink-0 rounded-full bg-[var(--ghie-mint)]"
                    />

                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--ghie-muted)]">
                      Featured {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-lg font-bold leading-7 text-[var(--ghie-text)] transition-colors group-hover:text-[var(--ghie-blue)] sm:text-xl sm:leading-8">
                    {moment.title}
                  </h4>

                  {/* Description */}
                  <p className="mt-2 text-sm leading-6 text-[var(--ghie-muted)] sm:text-base sm:leading-7">
                    {moment.description}
                  </p>

                  {/* Bottom-aligned footer */}
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--ghie-border)] pt-4">
                    <span className="flex min-w-0 items-center gap-2 text-sm font-semibold text-[var(--ghie-blue)]">
                      <FaFacebookF
                        size={13}
                        aria-hidden="true"
                        className="shrink-0"
                      />
                      View social media post
                    </span>

                    <ArrowUpRight
                      size={17}
                      aria-hidden="true"
                      className="shrink-0 text-[var(--ghie-blue)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>

        {/* Closing statement */}
        <div className="relative mt-12 overflow-hidden rounded-3xl border border-[var(--ghie-blue)]/10 bg-gradient-to-r from-[var(--ghie-blue)]/[0.06] via-white to-[var(--ghie-mint)]/[0.09] px-6 py-9 text-center sm:mt-16 sm:px-10 sm:py-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full border-[18px] border-[var(--ghie-blue)]/[0.05]"
          />

          <Sparkles
            size={24}
            aria-hidden="true"
            className="relative mx-auto text-[var(--ghie-gold)]"
          />

          <p className="relative mt-3 text-balance text-xl font-bold leading-relaxed text-[var(--ghie-text)] sm:text-3xl">
            “Create Lasting{" "}
            <span className="text-[var(--ghie-blue)]">Impacts.</span>”
          </p>

          <p className="relative mx-auto mt-3 max-w-md text-balance text-sm leading-6 text-[var(--ghie-muted)] sm:text-base sm:leading-7">
            Compassion in action. Connections that matter. Service with purpose.
          </p>
        </div>
      </div>
    </section>
  );
}
