"use client";

import Image from "next/image";

import type {
  PersonalProfile,
  ProfileService,
  Testimonial,
} from "@/lib/profiles";

import {
  FaWhatsapp,
  FiArrowUpRight,
  FiBriefcase,
  FiGlobe,
  FiHeart,
  FiHome,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiPieChart,
  FiShield,
  FiStar,
  FiUser,
  FiUsers,
  SocialIcon,
  socialColor,
} from "./icons";

/* -------------------------------------------------------------------------- */
/* SECTION HEADING                                                            */
/* -------------------------------------------------------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  icon,
}: {
  eyebrow?: string;
  title: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      {eyebrow && (
        <div className="mb-2 flex items-center gap-2">
          {icon && (
            <span className="text-[#123B73] dark:text-[#D9B45B]">
              {icon}
            </span>
          )}

          <span className="h-px w-5 bg-[#C99A35]" />

          <span
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[#315887]
              dark:text-[#D9B45B]
            "
          >
            {eyebrow}
          </span>
        </div>
      )}

      <h2
        className="
          text-[25px]
          font-semibold
          leading-tight
          tracking-[-0.04em]
          text-[#102C52]
          dark:text-white
        "
      >
        {title}
      </h2>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SERVICES                                                                   */
/* -------------------------------------------------------------------------- */

export function ServicesSection({
  services,
}: {
  services: ProfileService[];
}) {
  return (
    <section
      id="services"
      className="scroll-mt-5 px-5 py-10"
    >
      <SectionHeading
        eyebrow="Protection & Planning"
        title="Services I Offer"
        icon={<FiShield size={15} />}
      />

      <div className="grid grid-cols-2 gap-3">
        {services.map((service, index) => {
          const name =
            service.name.toLowerCase();

          let Icon = FiShield;

          if (name.includes("life")) {
            Icon = FiUsers;
          } else if (name.includes("health")) {
            Icon = FiHeart;
          } else if (name.includes("accident")) {
            Icon = FiBriefcase;
          } else if (
            name.includes("investment") ||
            name.includes("financial")
          ) {
            Icon = FiPieChart;
          } else if (
            name.includes("property") ||
            name.includes("home")
          ) {
            Icon = FiHome;
          }

          return (
            <div
              key={`${service.name}-${index}`}
              className="
                group
                rounded-[20px]
                border
                border-[#123B73]/12
                bg-white
                p-4
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#C99A35]/40
                hover:shadow-[0_15px_35px_rgba(18,59,115,0.08)]
                dark:border-white/10
                dark:bg-white/[0.025]
                dark:hover:border-[#D9B45B]/30
              "
            >
              <div
                className="
                  mb-4
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#EAF1F9]
                  text-[#123B73]
                  dark:bg-[#D9B45B]/10
                  dark:text-[#E1C477]
                "
              >
                <Icon size={21} />
              </div>

              <h3
                className="
                  text-[12px]
                  font-semibold
                  text-[#102C52]
                  dark:text-white
                "
              >
                {service.name}
              </h3>

              {service.description && (
                <p
                  className="
                    mt-2
                    text-[9px]
                    leading-[1.65]
                    text-black/45
                    dark:text-white/40
                  "
                >
                  {service.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* TRUST                                                                      */
/* -------------------------------------------------------------------------- */

export function TrustSection() {
  const items = [
    {
      icon: <FiUsers size={21} />,
      title: "Client First",
      description:
        "Your goals and peace of mind are my priority.",
    },
    {
      icon: <FiStar size={21} />,
      title: "Trusted Guidance",
      description:
        "Clear advice and practical protection options.",
    },
    {
      icon: <FiShield size={21} />,
      title: "Ongoing Support",
      description:
        "I'm with you every step of the way.",
    },
  ];

  return (
    <section className="px-5 py-4">
      <div
        className="
          overflow-hidden
          rounded-[24px]
          border
          border-[#123B73]/15
          bg-gradient-to-br
          from-[#F1F6FC]
          via-white
          to-[#EDF3FA]
          p-5
          dark:border-[#D9B45B]/15
          dark:from-[#0D1A2A]
          dark:via-[#0B111A]
          dark:to-[#11100D]
        "
      >
        <div className="mb-5 flex items-center gap-2">
          <FiShield
            size={15}
            className="text-[#123B73] dark:text-[#D9B45B]"
          />

          <p
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[#315887]
              dark:text-[#D9B45B]
            "
          >
            Why Choose Me
          </p>
        </div>

        <div className="grid grid-cols-3">
          {items.map((item, index) => (
            <div
              key={item.title}
              className={`
                px-2
                text-center
                ${
                  index !== 0
                    ? "border-l border-[#123B73]/15 dark:border-white/10"
                    : ""
                }
              `}
            >
              <div className="flex justify-center text-[#123B73] dark:text-[#D9B45B]">
                {item.icon}
              </div>

              <h3
                className="
                  mt-3
                  text-[10px]
                  font-semibold
                  text-[#102C52]
                  dark:text-white
                "
              >
                {item.title}
              </h3>

              <p
                className="
                  mt-1.5
                  text-[8px]
                  leading-[1.55]
                  text-black/45
                  dark:text-white/40
                "
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* TESTIMONIALS                                                               */
/* -------------------------------------------------------------------------- */

export function TestimonialsSection({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  if (!testimonials.length) {
    return null;
  }

  return (
    <section
      id="reviews"
      className="scroll-mt-5 px-5 py-10"
    >
      <SectionHeading
        eyebrow="Client Trust"
        title="What My Clients Say"
        icon={<FiMessageCircle size={15} />}
      />

      <div className="space-y-3">
        {testimonials.map((testimonial) => (
          <article
            key={testimonial.id}
            className="
              rounded-[22px]
              border
              border-[#123B73]/12
              bg-white
              p-4
              dark:border-white/10
              dark:bg-white/[0.025]
            "
          >
            <div className="flex items-start gap-3">
              {testimonial.avatar ? (
                <div
                  className="
                    relative
                    h-11
                    w-11
                    shrink-0
                    overflow-hidden
                    rounded-full
                    border
                    border-[#C99A35]/30
                  "
                >
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#EAF1F9]
                    text-[#123B73]
                    dark:bg-[#D9B45B]/10
                    dark:text-[#D9B45B]
                  "
                >
                  <FiUser size={18} />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p
                      className="
                        text-[11px]
                        font-semibold
                        text-[#102C52]
                        dark:text-white
                      "
                    >
                      {testimonial.name}
                    </p>

                    {testimonial.role && (
                      <p
                        className="
                          mt-0.5
                          text-[8px]
                          text-black/40
                          dark:text-white/35
                        "
                      >
                        {testimonial.role}
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 gap-0.5">
                    {Array.from({
                      length: testimonial.rating ?? 5,
                    }).map((_, index) => (
                      <FiStar
                        key={index}
                        size={11}
                        className="fill-[#C99A35] text-[#C99A35]"
                      />
                    ))}
                  </div>
                </div>

                <p
                  className="
                    mt-3
                    text-[10px]
                    leading-[1.7]
                    text-black/55
                    dark:text-white/50
                  "
                >
                  "{testimonial.message}"
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* CONTACT                                                                    */
/* -------------------------------------------------------------------------- */

export function ContactSection({
  profile,
}: {
  profile: PersonalProfile;
}) {
  const socials = profile.socials ?? [];

  return (
    <section
      id="contact"
      className="scroll-mt-5 px-5 py-10"
    >
      <SectionHeading
        eyebrow="Let's Connect"
        title="Contact & Connect"
        icon={<FiUser size={15} />}
      />

      <div
        className="
          overflow-hidden
          rounded-[24px]
          border
          border-[#123B73]/12
          bg-white
          dark:border-white/10
          dark:bg-white/[0.025]
        "
      >
        {profile.phone && (
          <ContactRow
            icon={<FiPhone size={17} />}
            label="Phone"
            value={profile.phone}
            href={`tel:${profile.phone}`}
          />
        )}

        {profile.whatsapp && (
          <ContactRow
            icon={
              <span className="text-[#25D366]">
                <FaWhatsapp size={18} />
              </span>
            }
            label="WhatsApp"
            value={profile.whatsapp}
            href={`https://wa.me/${profile.whatsapp.replace(
              /[^0-9]/g,
              "",
            )}`}
            external
          />
        )}

        {profile.email && (
          <ContactRow
            icon={<FiMail size={17} />}
            label="Email"
            value={profile.email}
            href={`mailto:${profile.email}`}
          />
        )}

        {profile.website && (
          <ContactRow
            icon={<FiGlobe size={17} />}
            label="Website"
            value={profile.website.replace(
              /^https?:\/\//,
              "",
            )}
            href={
              profile.website.startsWith("http")
                ? profile.website
                : `https://${profile.website}`
            }
            external
          />
        )}

        {profile.location && (
          <ContactRow
            icon={<FiMapPin size={17} />}
            label="Location"
            value={profile.location}
            href={
              profile.locationUrl ??
              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                profile.location,
              )}`
            }
            external
          />
        )}
      </div>

      {socials.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {socials.slice(0, 6).map(
            (social, index) => (
              <a
                key={`${social.platform}-${index}`}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.platform}
                className="
                  flex
                  h-12
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-[#123B73]/10
                  bg-white
                  transition
                  hover:-translate-y-0.5
                  hover:border-[#C99A35]/35
                  dark:border-white/10
                  dark:bg-white/[0.025]
                "
              >
                <span
                  className={socialColor(
                    social.platform,
                  )}
                >
                  <SocialIcon
                    platform={social.platform}
                  />
                </span>
              </a>
            ),
          )}
        </div>
      )}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* CONTACT ROW                                                                */
/* -------------------------------------------------------------------------- */

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={
        external ? "_blank" : undefined
      }
      rel={
        external
          ? "noopener noreferrer"
          : undefined
      }
      className="
        flex
        items-center
        gap-3
        border-b
        border-[#123B73]/10
        px-4
        py-4
        last:border-b-0
        transition
        hover:bg-[#F5F8FC]
        dark:hover:bg-white/[0.035]
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
          bg-[#EAF1F9]
          text-[#123B73]
          dark:bg-[#D9B45B]/10
          dark:text-[#D9B45B]
        "
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p
          className="
            text-[8px]
            font-medium
            uppercase
            tracking-[0.15em]
            text-[#315887]
            dark:text-[#BFA45F]
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            truncate
            text-[10px]
            font-medium
            text-[#102C52]
            dark:text-white
          "
        >
          {value}
        </p>
      </div>

      <FiArrowUpRight
        size={15}
        className="shrink-0 text-black/25 dark:text-white/25"
      />
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/* LOCATION                                                                   */
/* -------------------------------------------------------------------------- */

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

  const mapUrl =
    `https://www.google.com/maps?q=${encodeURIComponent(
      profile.location,
    )}&output=embed`;

  return (
    <section
      id="location"
      className="scroll-mt-5 px-5 py-10"
    >
      <SectionHeading
        eyebrow="Find Me"
        title="My Location"
        icon={<FiMapPin size={15} />}
      />

      <div
        className="
          overflow-hidden
          rounded-[24px]
          border
          border-[#123B73]/12
          bg-white
          dark:border-white/10
          dark:bg-white/[0.025]
        "
      >
        <div className="relative h-[190px]">
          <iframe
            title={`${profile.name} location`}
            src={mapUrl}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <a
          href={locationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex
            items-center
            justify-between
            border-t
            border-[#123B73]/10
            px-4
            py-4
            transition
            hover:bg-[#F5F8FC]
            dark:hover:bg-white/[0.035]
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
                bg-[#EAF1F9]
                text-[#123B73]
                dark:bg-[#D9B45B]/10
                dark:text-[#D9B45B]
              "
            >
              <FiMapPin size={17} />
            </div>

            <div className="min-w-0">
              <p
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.14em]
                  text-[#315887]
                  dark:text-[#BFA45F]
                "
              >
                Based in
              </p>

              <p className="mt-1 truncate text-[10px] font-medium">
                {profile.location}
              </p>
            </div>
          </div>

          <FiArrowUpRight
            size={16}
            className="text-[#315887] dark:text-[#D9B45B]"
          />
        </a>
      </div>
    </section>
  );
}