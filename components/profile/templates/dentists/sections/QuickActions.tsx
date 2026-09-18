"use client";

import type { PersonalProfile } from "@/lib/profiles";

import {
  ArrowRight,
  CalendarDays,
  Mail,
  MessageCircle,
  Phone,
  UserPlus,
} from "../icons";

type Props = {
  profile: PersonalProfile;
};

type SecondaryActionProps = {
  icon: React.ElementType;
  label: string;
  description: string;
  href?: string;
  onClick?: () => void;
};

function SecondaryAction({
  icon: Icon,
  label,
  description,
  href,
  onClick,
}: SecondaryActionProps) {
  const content = (
    <>
      {/* Icon */}
      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          border-[#d9d4ca]
          bg-[#f6f3ed]
          text-[#263b3e]
          transition-all
          duration-200
          group-hover:border-[#b58a45]
          group-hover:bg-[#b58a45]
          group-hover:text-white
          dark:border-[#344648]
          dark:bg-[#18282a]
          dark:text-[#dfe5e2]
          dark:group-hover:border-[#b58a45]
          dark:group-hover:bg-[#b58a45]
          dark:group-hover:text-white
        "
      >
        <Icon className="h-[17px] w-[17px] stroke-[1.5]" />
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p
          className="
            text-[11px]
            font-semibold
            tracking-[-0.01em]
            text-[#1b3033]
            dark:text-[#eeeae3]
          "
        >
          {label}
        </p>

        <p
          className="
            mt-0.5
            truncate
            text-[9px]
            leading-tight
            text-[#7b8585]
            dark:text-[#8e9a9b]
          "
        >
          {description}
        </p>
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="
          group
          flex
          min-h-[72px]
          w-full
          items-center
          gap-3
          rounded-[14px]
          border
          border-[#ded9cf]
          bg-[#fbfaf7]
          px-3.5
          text-left
          transition-all
          duration-200
          hover:border-[#c8b080]
          hover:bg-[#f7f4ee]
          active:scale-[0.985]
          dark:border-[#2c3e40]
          dark:bg-[#142224]
          dark:hover:border-[#75603b]
          dark:hover:bg-[#19292b]
        "
      >
        {content}
      </button>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={
          href.startsWith("http")
            ? "_blank"
            : undefined
        }
        rel={
          href.startsWith("http")
            ? "noreferrer"
            : undefined
        }
        className="
          group
          flex
          min-h-[72px]
          w-full
          items-center
          gap-3
          rounded-[14px]
          border
          border-[#ded9cf]
          bg-[#fbfaf7]
          px-3.5
          text-left
          transition-all
          duration-200
          hover:border-[#c8b080]
          hover:bg-[#f7f4ee]
          active:scale-[0.985]
          dark:border-[#2c3e40]
          dark:bg-[#142224]
          dark:hover:border-[#75603b]
          dark:hover:bg-[#19292b]
        "
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className="
        flex
        min-h-[72px]
        w-full
        items-center
        gap-3
        rounded-[14px]
        border
        border-[#ded9cf]
        bg-[#fbfaf7]
        px-3.5
        dark:border-[#2c3e40]
        dark:bg-[#142224]
      "
    >
      {content}
    </div>
  );
}

export default function QuickActions({
  profile,
}: Props) {
  /* =====================================================
     SAVE CONTACT
  ===================================================== */

  const saveContact = () => {
    const escapeVCardValue = (value: string) =>
      value
        .replace(/\\/g, "\\\\")
        .replace(/;/g, "\\;")
        .replace(/,/g, "\\,")
        .replace(/\r?\n/g, "\\n");

    const vCard = [
      "BEGIN:VCARD",
      "VERSION:3.0",

      `FN:${escapeVCardValue(profile.name)}`,

      profile.title
        ? `TITLE:${escapeVCardValue(profile.title)}`
        : "",

      profile.company
        ? `ORG:${escapeVCardValue(profile.company)}`
        : "",

      profile.phone
        ? `TEL;TYPE=CELL:${escapeVCardValue(profile.phone)}`
        : "",

      profile.email
        ? `EMAIL:${escapeVCardValue(profile.email)}`
        : "",

      profile.website
        ? `URL:${escapeVCardValue(profile.website)}`
        : "",

      profile.location
        ? `ADR:;;${escapeVCardValue(profile.location)}`
        : "",

      "END:VCARD",
    ]
      .filter(Boolean)
      .join("\r\n");

    const blob = new Blob(
      [vCard],
      {
        type: "text/vcard;charset=utf-8",
      },
    );

    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");

    anchor.href = url;

    anchor.download = `${profile.name
      .replace(/\s+/g, "-")
      .toLowerCase()}.vcf`;

    document.body.appendChild(anchor);

    anchor.click();

    anchor.remove();

    URL.revokeObjectURL(url);
  };

  /* =====================================================
     LINKS
  ===================================================== */

  const whatsappHref = profile.whatsapp
    ? `https://wa.me/${profile.whatsapp.replace(
        /[^0-9]/g,
        "",
      )}`
    : undefined;

  const appointmentHref = `mailto:${
    profile.email
  }?subject=${encodeURIComponent(
    "Appointment Request",
  )}`;

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div
      className="
        relative
        z-20
        mx-5
        -mt-2
        overflow-hidden
        rounded-[20px]
        border
        border-[#ddd8ce]
        bg-[#fbfaf7]
        shadow-[0_18px_45px_rgba(22,43,47,0.10)]
        dark:border-[#293b3d]
        dark:bg-[#111d1f]
        dark:shadow-[0_18px_45px_rgba(0,0,0,0.28)]
      "
    >
      {/* =================================================
          PRIMARY ACTION
      ================================================= */}

      <div className="p-3">
        <a
          href={appointmentHref}
          className="
            group
            flex
            min-h-[68px]
            items-center
            justify-between
            rounded-[15px]
            bg-[#162b2f]
            px-4
            text-white
            transition-all
            duration-200
            hover:bg-[#203b3f]
            active:scale-[0.99]
            dark:bg-[#b58a45]
            dark:hover:bg-[#c69b55]
          "
        >
          <div className="flex items-center gap-3.5">
            {/* Calendar icon */}
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-white/15
                bg-white/10
              "
            >
              <CalendarDays className="h-[18px] w-[18px] stroke-[1.5]" />
            </div>

            {/* Appointment text */}
            <div>
              <p
                className="
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-white/55
                "
              >
                Schedule a visit
              </p>

              <p
                className="
                  mt-1
                  text-[13px]
                  font-semibold
                  tracking-[-0.015em]
                  text-white
                "
              >
                Book an Appointment
              </p>
            </div>
          </div>

          {/* Arrow */}
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#b58a45]
              transition-transform
              duration-200
              group-hover:translate-x-1
              dark:bg-white/15
            "
          >
            <ArrowRight className="h-[16px] w-[16px]" />
          </div>
        </a>
      </div>

      {/* =================================================
          SECONDARY ACTIONS
      ================================================= */}

      <div
        className="
          border-t
          border-[#e1ddd5]
          px-3
          pb-3
          dark:border-[#293b3d]
        "
      >
        <div className="grid grid-cols-2 gap-2.5 pt-3">
          <SecondaryAction
            icon={Phone}
            label="Call"
            description="Call directly"
            href={`tel:${profile.phone}`}
          />

          <SecondaryAction
            icon={MessageCircle}
            label="WhatsApp"
            description="Send a message"
            href={whatsappHref}
          />

          <SecondaryAction
            icon={Mail}
            label="Email"
            description="Send an email"
            href={`mailto:${profile.email}`}
          />

          <SecondaryAction
            icon={UserPlus}
            label="Save Contact"
            description="Add to contacts"
            onClick={saveContact}
          />
        </div>
      </div>
    </div>
  );
}