
import Image from "next/image";
import {
  Sparkles,
  ArrowUpRight,
  HeartHandshake,
} from "lucide-react";

import {
  ghieContainerClass,
  ghieSectionClass,
} from "./GhieStyles";

// Featured activities and social media posts
const featuredMoments = [
  {
    title: "Bringing More Love to Buli Schools",
    category: "Education & Community Service",
    description:
      "Supporting Buli schools through twin education projects that promote learning and create better opportunities for students.",
    image:
      "/profiles/business/ghie-larracas/featured/community-outreach.jpg",
    postUrl: "https://www.facebook.com/share/p/1ETh4kQgUY/",
  },
  {
    title: "Growing a Greener Wawa",
    category: "Environmental Conservation",
    description:
      "Returning to Wawa for another mangrove planting activity while monitoring the growth of previously planted seedlings.",
    image:
      "/profiles/business/ghie-larracas/featured/acts-of-kindness.jpg",
    postUrl: "https://www.facebook.com/share/p/1DjXmnbebd/",
  },
  {
    title: "A Safer Beginning for Mangyan Mothers",
    category: "Healthcare & Global Partnership",
    description:
      "Supporting the establishment of the Philippines' first solar-powered birthing facility for indigenous communities in Bongabong through an international Rotary partnership.",
    image:
      "/profiles/business/ghie-larracas/featured/rotary-activities.jpg",
    postUrl: "https://www.facebook.com/share/p/1FCZgDfXS8/",
  },
];

export default function GhieAbout() {
  return (
    <section
      id="about"
      className={`${ghieSectionClass} relative overflow-hidden`}
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
              size={14}
              className="text-[var(--ghie-gold)]"
            />

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--ghie-blue)] sm:text-xs">
              A Heart for Service
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-[var(--ghie-text)] sm:text-4xl lg:text-5xl">
            About{" "}
            <span className="text-[var(--ghie-blue)]">
              Ghie
            </span>
          </h2>

          <div className="mx-auto mt-5 flex items-center justify-center gap-2">
            <span className="h-[2px] w-10 rounded-full bg-[var(--ghie-mint)]" />
            <span className="h-2 w-2 rotate-45 bg-[var(--ghie-gold)]" />
            <span className="h-[2px] w-10 rounded-full bg-[var(--ghie-mint)]" />
          </div>

          <div className="mt-7 space-y-5 text-sm leading-7 text-[var(--ghie-muted)] sm:text-base sm:leading-8">
            <p>
              Rosalie “Ghie” F. Larracas is a community-minded
              leader and Past President of the Rotary Club of
              Pinamalayan Central. Guided by the spirit of
              service, she values meaningful connections and
              the importance of helping individuals and
              communities in need.
            </p>

            <p>
              Her message is simple: create lasting impacts
              through compassion, collaboration, and service
              to others.
            </p>
          </div>
        </div>

        {/* Featured moments heading */}
        <div className="mt-14 flex flex-col gap-3 sm:mt-20 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--ghie-mint-dark)] sm:text-xs">
              Stories of Service
            </p>

            <h3 className="mt-2 text-2xl font-bold tracking-tight text-[var(--ghie-text)] sm:text-3xl">
              Featured Moments
            </h3>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--ghie-muted)]">
              A glimpse of the activities, people, and moments
              that reflect a commitment to creating lasting
              impacts.
            </p>
          </div>

          <div className="hidden items-center gap-2 text-xs font-semibold text-[var(--ghie-blue)] sm:flex">
            <span>Explore the stories</span>
            <ArrowUpRight size={16} />
          </div>
        </div>

        {/* Featured image gallery */}
        <div className="mt-7 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 [grid-auto-rows:1fr]">
          {featuredMoments.map((moment, index) => (
            <a
              key={moment.title}
              href={moment.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${moment.title} social media post`}
              className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-[var(--ghie-border)] bg-[var(--ghie-card)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(23,43,69,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ghie-blue)] focus-visible:ring-offset-4"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-[var(--ghie-surface)]">
                <Image
                  src={moment.image}
                  alt={moment.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#071D38]/65 via-transparent to-transparent" />

                <span className="absolute bottom-4 left-4 max-w-[85%] truncate rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                  {moment.category}
                </span>

                <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[var(--ghie-blue)] opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight size={19} />
                </div>
              </div>

              {/* Featured content */}
              <div className="flex min-h-0 flex-1 flex-col p-5 sm:p-6">

                {/* Featured number */}
                <div className="mb-3 flex h-3 shrink-0 items-center gap-2">
                  <span className="h-[2px] w-6 shrink-0 rounded-full bg-[var(--ghie-mint)]" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--ghie-muted)]">
                    Featured {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title - Fixed space for 2 lines */}
                <h4 className="line-clamp-2 min-h-[56px] text-lg font-bold leading-7 text-[var(--ghie-text)] transition-colors group-hover:text-[var(--ghie-blue)]">
                  {moment.title}
                </h4>

                {/* Description - Fixed space for 3 lines */}
                <p className="mt-2 line-clamp-3 min-h-[72px] text-sm leading-6 text-[var(--ghie-muted)]">
                  {moment.description}
                </p>

                {/* Bottom-aligned footer */}
                <div className="mt-auto flex min-h-[38px] shrink-0 items-center justify-between border-t border-[var(--ghie-border)] pt-4">
                  <span className="text-xs font-semibold text-[var(--ghie-blue)]">
                    View social media post
                  </span>

                  <ArrowUpRight
                    size={17}
                    className="shrink-0 text-[var(--ghie-blue)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Closing statement */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-[var(--ghie-blue)]/10 bg-gradient-to-r from-[var(--ghie-blue)]/[0.06] via-white to-[var(--ghie-mint)]/[0.09] px-6 py-8 text-center sm:mt-14 sm:px-10 sm:py-10">
          <Sparkles
            size={22}
            className="mx-auto text-[var(--ghie-gold)]"
          />

          <p className="mt-3 text-lg font-bold leading-relaxed text-[var(--ghie-text)] sm:text-2xl">
            “Create Lasting{" "}
            <span className="text-[var(--ghie-blue)]">
              Impacts.
            </span>”
          </p>

          <p className="mt-2 text-xs leading-6 text-[var(--ghie-muted)] sm:text-sm">
            Compassion in action. Connections that matter.
            Service with purpose.
          </p>
        </div>
      </div>
    </section>
  );
}
