"use client";

import { useState } from "react";
import {
  FiGlobe,
  FiPhone,
  FiMail,
} from "react-icons/fi";

import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa6";

type SocialItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const socials: SocialItem[] = [
  {
    label: "Phone",
    href: "tel:+639668830150",
    icon: <FiPhone />,
  },
  {
    label: "Email",
    href: "mailto:dextap2026@gmail.com",
    icon: <FiMail />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/jaydee.anyayahan",
    icon: <FaFacebookF />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/jyd.wrld/",
    icon: <FaInstagram />,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@unsaidjd",
    icon: <FaTiktok />,
  },
];

export default function FloatingSocials() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* =================================================
          DESKTOP FLOATING SOCIALS
      ================================================= */}

      <div
        className="
          fixed
          right-5
          top-1/2
          z-[100]
          hidden
          -translate-y-1/2
          flex-col
          items-center
          gap-2
          lg:flex
        "
      >
        {/* Vertical line */}

        <div
          className="
            absolute
            bottom-0
            left-1/2
            top-0
            -z-10
            w-px
            -translate-x-1/2
            bg-black/10
            dark:bg-white/10
          "
        />

        {socials.map(
          (social) => (
            <a
              key={social.label}
              href={social.href}
              target={
                social.href.startsWith(
                  "http",
                )
                  ? "_blank"
                  : undefined
              }
              rel={
                social.href.startsWith(
                  "http",
                )
                  ? "noreferrer"
                  : undefined
              }
              aria-label={
                social.label
              }
              title={
                social.label
              }
              className="
                group
                relative
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-black/10
                bg-white
                text-black
                shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:scale-105
                hover:border-black
                hover:bg-black
                hover:text-white
                dark:border-white/10
                dark:bg-[#111]
                dark:text-white
                dark:hover:border-white
                dark:hover:bg-white
                dark:hover:text-black
              "
            >
              <span
                className="
                  text-[16px]
                "
              >
                {social.icon}
              </span>

              {/* Tooltip */}

              <span
                className="
                  pointer-events-none
                  absolute
                  right-[calc(100%+10px)]
                  top-1/2
                  -translate-y-1/2
                  translate-x-2
                  whitespace-nowrap
                  rounded-full
                  bg-black
                  px-3
                  py-1.5
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.12em]
                  text-white
                  opacity-0
                  transition-all
                  duration-200
                  group-hover:translate-x-0
                  group-hover:opacity-100
                  dark:bg-white
                  dark:text-black
                "
              >
                {social.label}
              </span>
            </a>
          ),
        )}
      </div>

      {/* =================================================
          MOBILE FLOATING SOCIALS
      ================================================= */}

      <div
        className="
          fixed
          bottom-5
          right-5
          z-[100]
          lg:hidden
        "
      >
        {/* Expanded social buttons */}

        <div
          className={`
            absolute
            bottom-[58px]
            right-0
            flex
            flex-col
            items-center
            gap-2
            transition-all
            duration-300
            ${
              open
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none translate-y-4 opacity-0"
            }
          `}
        >
          {socials.map(
            (social, index) => (
              <a
                key={social.label}
                href={social.href}
                target={
                  social.href.startsWith(
                    "http",
                  )
                    ? "_blank"
                    : undefined
                }
                rel={
                  social.href.startsWith(
                    "http",
                  )
                    ? "noreferrer"
                    : undefined
                }
                aria-label={
                  social.label
                }
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-black/10
                  bg-white
                  text-black
                  shadow-[0_8px_25px_rgba(0,0,0,0.12)]
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:bg-black
                  hover:text-white
                  dark:border-white/10
                  dark:bg-[#111]
                  dark:text-white
                  dark:hover:bg-white
                  dark:hover:text-black
                "
                style={{
                  transitionDelay: open
                    ? `${index * 35}ms`
                    : "0ms",
                }}
              >
                <span className="text-[16px]">
                  {social.icon}
                </span>
              </a>
            ),
          )}
        </div>

        {/* =================================================
            MOBILE GLOBE TOGGLE
        ================================================= */}

        <button
          type="button"
          onClick={() =>
            setOpen(
              (value) => !value,
            )
          }
          aria-label={
            open
              ? "Close social links"
              : "Open social links"
          }
          aria-expanded={open}
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-black/10
            bg-white
            text-black
            shadow-[0_10px_35px_rgba(0,0,0,0.15)]
            transition-all
            duration-300
            hover:scale-105
            dark:border-white/10
            dark:bg-[#111]
            dark:text-white
          "
        >
          <FiGlobe
            className={`
              h-[20px]
              w-[20px]
              transition-transform
              duration-300
              ${
                open
                  ? "rotate-180"
                  : "rotate-0"
              }
            `}
          />
        </button>
      </div>
    </>
  );
}