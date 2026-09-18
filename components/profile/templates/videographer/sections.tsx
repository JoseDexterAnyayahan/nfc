"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import type {
  PersonalProfile,
  PortfolioItem,
  ProfileService,
  Testimonial,
} from "@/lib/profiles";

import {
  FaWhatsapp,
  FiArrowUpRight,
  FiCamera,
  FiChevronRight,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiPhone,
  FiPlay,
  FiStar,
  FiVideo,
  SocialIcon,
  socialColor,
} from "./icons";

/* =========================================================
   SECTION HEADING
========================================================= */

export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <div className="mb-2.5 flex items-center gap-2.5">
          <span
            className="
              h-px
              w-7
              bg-gradient-to-r
              from-[#c6a15b]
              to-[#e6c982]
            "
          />

          <span
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.24em]
              text-[#9c7839]

              dark:text-[#d8bc79]
            "
          >
            {eyebrow}
          </span>
        </div>
      )}

      <h2
        className="
          text-[27px]
          font-semibold
          leading-[1.05]
          tracking-[-0.045em]
          text-[#171613]

          dark:text-[#f5f1e8]
        "
      >
        {title}
      </h2>
    </div>
  );
}

/* =========================================================
   SERVICES
========================================================= */

export function ServicesSection({
  services,
}: {
  services: ProfileService[];
}) {
  return (
    <section
      id="services"
      className="
        scroll-mt-6
        border-t
        border-[#c6a15b]/10
        px-5
        py-12
      "
    >
      <SectionHeading
        eyebrow="What I Do"
        title="Services"
      />

      <div className="space-y-3">
        {services.map((service, index) => {
          const serviceName = service.name.toLowerCase();

          const isVideo =
            serviceName.includes("video") ||
            serviceName.includes("film") ||
            serviceName.includes("cinematic");

          return (
            <div
              key={`${service.name}-${index}`}
              className="
                group
                relative
                flex
                items-center
                gap-4

                overflow-hidden

                rounded-[22px]

                border
                border-[#c6a15b]/15

                bg-white

                p-4

                shadow-[0_8px_25px_rgba(0,0,0,0.025)]

                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:border-[#c6a15b]/35
                hover:shadow-[0_16px_35px_rgba(0,0,0,0.07)]

                dark:border-[#c6a15b]/10
                dark:bg-white/[0.025]
                dark:shadow-none
                dark:hover:bg-[#c6a15b]/[0.04]
              "
            >
              {/* Gold hover accent */}
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  top-0
                  w-[2px]

                  origin-bottom
                  scale-y-0

                  bg-gradient-to-b
                  from-[#e6c982]
                  to-[#9c7839]

                  transition-transform
                  duration-300

                  group-hover:scale-y-100
                "
              />

              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center

                  rounded-2xl

                  border
                  border-[#c6a15b]/20

                  bg-gradient-to-br
                  from-[#f8f1df]
                  to-[#eee1c3]

                  text-[#957237]

                  shadow-[0_5px_18px_rgba(198,161,91,0.08)]

                  dark:border-[#c6a15b]/20
                  dark:bg-[#c6a15b]/[0.08]
                  dark:text-[#dfc47e]
                "
              >
                {isVideo ? (
                  <FiVideo size={20} />
                ) : (
                  <FiCamera size={20} />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h3
                  className="
                    text-[13px]
                    font-semibold
                    tracking-[-0.01em]
                    text-[#1a1916]

                    dark:text-white
                  "
                >
                  {service.name}
                </h3>

                {service.description && (
                  <p
                    className="
                      mt-1.5
                      text-[10px]
                      leading-[1.65]
                      text-black/45

                      dark:text-white/40
                    "
                  >
                    {service.description}
                  </p>
                )}
              </div>

              <FiChevronRight
                size={16}
                className="
                  shrink-0

                  text-[#b99a5a]/60

                  transition-all
                  duration-300

                  group-hover:translate-x-1
                  group-hover:text-[#9c7839]

                  dark:text-[#c6a15b]/50
                "
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* =========================================================
   PORTFOLIO
========================================================= */

export function PortfolioSection({
  portfolio,
}: {
  portfolio: PortfolioItem[];
}) {
  return (
    <section
      id="portfolio"
      className="
        scroll-mt-6
        border-t
        border-[#c6a15b]/10
        px-5
        py-12
      "
    >
      <SectionHeading
        eyebrow="Selected Work"
        title="Portfolio"
      />

      <div className="grid grid-cols-2 gap-3">
        {portfolio.map((project) => (
          <PortfolioCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}

function PortfolioCard({
  project,
}: {
  project: PortfolioItem;
}) {
  const content = (
    <div className="relative aspect-[0.78] overflow-hidden">
      {/* Thumbnail */}

      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(max-width: 430px) 45vw, 190px"
        className="
          object-cover

          transition-transform
          duration-700
          ease-out

          group-hover:scale-105
        "
      />

      {/* Cinematic gradient */}

      <div
        className="
          absolute
          inset-0

          bg-gradient-to-b
          from-black/5
          via-black/10
          to-black/90
        "
      />

      {/* Gold edge glow */}

      <div
        className="
          absolute
          inset-0

          opacity-0

          ring-1
          ring-inset
          ring-[#e1c47c]/60

          transition-opacity
          duration-300

          group-hover:opacity-100
        "
      />

      {/* Play button */}

      {project.videoUrl && (
        <div
          className="
            absolute
            left-1/2
            top-1/2

            flex
            h-12
            w-12
            -translate-x-1/2
            -translate-y-1/2

            items-center
            justify-center

            rounded-full

            border
            border-white/30

            bg-black/40

            text-white

            shadow-[0_8px_30px_rgba(0,0,0,0.3)]

            backdrop-blur-md

            transition-all
            duration-300

            group-hover:scale-110
            group-hover:border-[#f0d68f]
            group-hover:bg-[#c6a15b]/95
            group-hover:text-black
          "
          aria-hidden="true"
        >
          <FiPlay
            size={17}
            className="ml-0.5"
          />
        </div>
      )}

      {/* Project information */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          p-3.5
        "
      >
        <p
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-[#e6c982]
          "
        >
          {project.category}
        </p>

        <h3
          className="
            mt-1
            text-[13px]
            font-semibold
            leading-tight
            text-white
          "
        >
          {project.title}
        </h3>

        {project.videoUrl && (
          <div
            className="
              mt-2
              flex
              items-center
              gap-1.5
              text-[8px]
              font-medium
              uppercase
              tracking-[0.12em]
              text-white/55
            "
          >
            <FiPlay size={9} />

            Watch Video
          </div>
        )}
      </div>
    </div>
  );

  /* ==========================================================
     VIDEO PROJECT

     project.image = local thumbnail
     project.videoUrl = external video URL
  ========================================================== */

  if (project.videoUrl) {
    return (
      <a
        href={project.videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch ${project.title}`}
        className="
          group
          block

          overflow-hidden
          rounded-[22px]

          border
          border-[#c6a15b]/15

          bg-white

          shadow-[0_8px_25px_rgba(0,0,0,0.04)]

          transition-all
          duration-300

          hover:-translate-y-1
          hover:border-[#c6a15b]/35
          hover:shadow-[0_18px_40px_rgba(0,0,0,0.1)]

          focus:outline-none
          focus:ring-2
          focus:ring-[#c6a15b]/60

          dark:border-[#c6a15b]/10
          dark:bg-white/[0.025]
          dark:shadow-none
        "
      >
        {content}
      </a>
    );
  }

  /* ==========================================================
     NORMAL IMAGE PROJECT
  ========================================================== */

  return (
    <div
      className="
        group

        overflow-hidden
        rounded-[22px]

        border
        border-[#c6a15b]/15

        bg-white

        shadow-[0_8px_25px_rgba(0,0,0,0.04)]

        dark:border-[#c6a15b]/10
        dark:bg-white/[0.025]
        dark:shadow-none
      "
    >
      {content}
    </div>
  );
}

/* =========================================================
   TESTIMONIALS
========================================================= */

export function TestimonialsSection({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <section
      id="reviews"
      className="
        scroll-mt-6
        border-t
        border-[#c6a15b]/10
        px-5
        py-12
      "
    >
      <SectionHeading
        eyebrow="Client Feedback"
        title="What Clients Say"
      />

      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <article
            key={testimonial.id}
            className="
              relative
              overflow-hidden

              rounded-[25px]

              border
              border-[#c6a15b]/15

              bg-white

              p-5

              shadow-[0_10px_30px_rgba(0,0,0,0.035)]

              dark:border-[#c6a15b]/10
              dark:bg-white/[0.025]
              dark:shadow-none
            "
          >
            {/* Decorative gold line */}

            <div
              className="
                absolute
                left-0
                top-0
                h-full
                w-[2px]

                bg-gradient-to-b
                from-[#e6c982]
                via-[#c6a15b]
                to-transparent
              "
            />

            <div className="flex items-center justify-between">
              <span
                className="
                  font-serif
                  text-[40px]
                  leading-none
                  text-[#c6a15b]
                "
              >
                “
              </span>

              <div className="flex gap-0.5">
                {Array.from({
                  length: testimonial.rating ?? 5,
                }).map((_, index) => (
                  <FiStar
                    key={index}
                    size={13}
                    className="
                      fill-[#c6a15b]
                      text-[#c6a15b]
                    "
                  />
                ))}
              </div>
            </div>

            <p
              className="
                mt-1
                text-[12px]
                leading-[1.8]
                text-black/60

                dark:text-white/55
              "
            >
              {testimonial.message}
            </p>

            <div className="mt-5 flex items-center gap-3">
              {testimonial.avatar ? (
                <div
                  className="
                    relative
                    h-10
                    w-10
                    overflow-hidden
                    rounded-full

                    border
                    border-[#c6a15b]/30
                  "
                >
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center

                    rounded-full

                    border
                    border-[#c6a15b]/15

                    bg-[#f5eddb]

                    text-[12px]
                    font-semibold
                    text-[#8b6b32]

                    dark:bg-[#c6a15b]/10
                    dark:text-[#d9bd78]
                  "
                >
                  {testimonial.name
                    .charAt(0)
                    .toUpperCase()}
                </div>
              )}

              <div>
                <p className="text-[11px] font-semibold">
                  {testimonial.name}
                </p>

                {testimonial.role && (
                  <p
                    className="
                      mt-0.5
                      text-[9px]
                      text-black/40

                      dark:text-white/35
                    "
                  >
                    {testimonial.role}
                  </p>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   CONTACT
========================================================= */

export function ContactSection({
  profile,
}: {
  profile: PersonalProfile;
}) {
  const socials = profile.socials ?? [];

  const websiteHref = profile.website
    ? profile.website.startsWith("http")
      ? profile.website
      : `https://${profile.website}`
    : "";

  const whatsappHref = profile.whatsapp
    ? `https://wa.me/${profile.whatsapp.replace(
        /[^0-9]/g,
        "",
      )}`
    : "";

  return (
    <section
      id="contact"
      className="
        scroll-mt-6
        border-t
        border-[#c6a15b]/10
        px-5
        py-12
      "
    >
      <SectionHeading
        eyebrow="Get In Touch"
        title="Let's Work Together"
      />

      <div
        className="
          overflow-hidden

          rounded-[25px]

          border
          border-[#c6a15b]/15

          bg-white

          shadow-[0_10px_30px_rgba(0,0,0,0.03)]

          dark:border-[#c6a15b]/10
          dark:bg-white/[0.025]
          dark:shadow-none
        "
      >
        {profile.whatsapp && (
          <ContactRow
            icon={
              <span className="text-[#25D366]">
                <FaWhatsapp />
              </span>
            }
            label="WhatsApp"
            value={profile.whatsapp}
            href={whatsappHref}
            external
          />
        )}

        {profile.email && (
          <ContactRow
            icon={<FiMail size={18} />}
            label="Email"
            value={profile.email}
            href={`mailto:${profile.email}`}
          />
        )}

        {profile.phone && (
          <ContactRow
            icon={<FiPhone size={18} />}
            label="Phone"
            value={profile.phone}
            href={`tel:${profile.phone}`}
          />
        )}

        {profile.website && (
          <ContactRow
            icon={<FiGlobe size={18} />}
            label="Website"
            value={profile.website.replace(
              /^https?:\/\//,
              "",
            )}
            href={websiteHref}
            external
          />
        )}
      </div>

      {socials.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {socials
            .slice(0, 6)
            .map((social, index) => (
              <a
                key={`${social.platform}-${index}`}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.platform}
                className="
                  group

                  flex
                  h-12
                  items-center
                  justify-center

                  rounded-2xl

                  border
                  border-[#c6a15b]/12

                  bg-white

                  shadow-[0_5px_18px_rgba(0,0,0,0.025)]

                  transition-all
                  duration-300

                  hover:-translate-y-0.5
                  hover:border-[#c6a15b]/35
                  hover:bg-[#f8f2e5]
                  hover:shadow-[0_10px_25px_rgba(198,161,91,0.1)]

                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#c6a15b]/50

                  dark:border-[#c6a15b]/10
                  dark:bg-white/[0.025]
                  dark:shadow-none
                  dark:hover:bg-[#c6a15b]/[0.06]
                "
              >
                <span
                  className={`
                    transition-transform
                    duration-300
                    group-hover:scale-110

                    ${socialColor(
                      social.platform,
                    )}
                  `}
                >
                  <SocialIcon
                    platform={social.platform}
                  />
                </span>
              </a>
            ))}
        </div>
      )}
    </section>
  );
}

/* =========================================================
   CONTACT ROW
========================================================= */

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={
        external
          ? "noopener noreferrer"
          : undefined
      }
      className="
        group

        flex
        items-center
        gap-3

        border-b
        border-[#c6a15b]/10

        px-4
        py-4

        last:border-b-0

        transition-all
        duration-300

        hover:bg-[#fcf8ed]

        dark:hover:bg-[#c6a15b]/[0.04]
      "
    >
      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center

          rounded-xl

          border
          border-[#c6a15b]/15

          bg-gradient-to-br
          from-[#f7efdc]
          to-[#eee1c4]

          text-[#8b6b32]

          dark:border-[#c6a15b]/15
          dark:bg-[#c6a15b]/10
          dark:text-[#d9bd78]
        "
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.16em]
            text-[#806b3e]

            dark:text-[#bda96f]
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            truncate
            text-[11px]
            font-medium
          "
        >
          {value}
        </p>
      </div>

      <FiArrowUpRight
        size={15}
        className="
          shrink-0

          text-[#b4955a]/50

          transition-all
          duration-300

          group-hover:translate-x-0.5
          group-hover:text-[#9c7839]

          dark:text-white/25
        "
      />
    </a>
  );
}

/* =========================================================
   LOCATION
========================================================= */

export function LocationSection({
  profile,
}: {
  profile: PersonalProfile;
}) {
  if (!profile.location) {
    return null;
  }

  const locationUrl =
    profile.locationUrl ??
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      profile.location,
    )}`;

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    profile.location,
  )}&output=embed`;

  return (
    <section
      id="location"
      className="
        scroll-mt-6
        border-t
        border-[#c6a15b]/10
        px-5
        py-12
      "
    >
      <SectionHeading
        eyebrow="Find Me"
        title="Location"
      />

      <div
        className="
          overflow-hidden

          rounded-[25px]

          border
          border-[#c6a15b]/15

          bg-white

          shadow-[0_10px_30px_rgba(0,0,0,0.03)]

          dark:border-[#c6a15b]/10
          dark:bg-white/[0.025]
          dark:shadow-none
        "
      >
        <div className="relative h-[210px]">
          <iframe
            title={`${profile.name} location`}
            src={mapUrl}
            className="
              absolute
              inset-0
              h-full
              w-full
              border-0
              grayscale-[0.15]
            "
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />

          {/* Map cinematic overlay */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-black/10
              to-transparent
            "
          />
        </div>

        <a
          href={locationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            group

            flex
            items-center
            justify-between
            gap-3

            border-t
            border-[#c6a15b]/10

            px-4
            py-4

            transition-all
            duration-300

            hover:bg-[#fcf8ed]

            dark:hover:bg-[#c6a15b]/[0.04]
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center

                rounded-xl

                border
                border-[#c6a15b]/15

                bg-gradient-to-br
                from-[#f7efdc]
                to-[#eee1c4]

                text-[#8b6b32]

                dark:border-[#c6a15b]/15
                dark:bg-[#c6a15b]/10
                dark:text-[#d9bd78]
              "
            >
              <FiMapPin size={17} />
            </div>

            <div className="min-w-0">
              <p
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-[#806b3e]

                  dark:text-[#bda96f]
                "
              >
                Based in
              </p>

              <p
                className="
                  mt-1
                  truncate
                  text-[11px]
                  font-medium
                "
              >
                {profile.location}
              </p>
            </div>
          </div>

          <FiArrowUpRight
            size={16}
            className="
              shrink-0

              text-[#a88645]

              transition-transform
              duration-300

              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
            "
          />
        </a>
      </div>
    </section>
  );
}