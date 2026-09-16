"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FiArrowUp,
  FiMail,
} from "react-icons/fi";

const navigation = [
  {
    label: "About",
    href: "#about",
  },
  {
    label: "What We Do",
    href: "#what-we-do",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="px-5 pb-6 pt-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Main Footer */}
        <div
          className="
            border-t border-black/[0.08]
            py-10
            dark:border-white/[0.08]
          "
        >
          <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
            {/* Brand */}
            <div className="max-w-sm">
              <Link
                href="/"
                className="group inline-flex items-center gap-3"
                aria-label="DexTap Home"
              >
                {/* Logo */}
                <div
                  className="
                    relative h-10 w-10 shrink-0
                    overflow-hidden rounded-full
                    border border-black/[0.08]
                    bg-white
                    transition-transform duration-300
                    group-hover:scale-105
                    dark:border-white/[0.08]
                    dark:bg-black
                  "
                >
                  <Image
                    src="/dextap-logo.png"
                    alt="DexTap"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>

                {/* Brand Name */}
                <span
                  className="
                    text-lg font-semibold
                    tracking-[-0.045em]
                  "
                >
                  DexTap
                </span>
              </Link>

              <p
                className="
                  mt-4
                  text-xs leading-6
                  text-black/45
                  dark:text-white/45
                "
              >
                Digital experiences designed to make connecting, sharing, and
                interacting simpler.
              </p>

              <p
                className="
                  mt-5
                  text-[9px] font-semibold
                  uppercase tracking-[0.25em]
                  text-black/35
                  dark:text-white/35
                "
              >
                Tap. Share. Connect.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-3 sm:items-end">
              <p
                className="
                  mb-1
                  text-[9px] font-semibold
                  uppercase tracking-[0.22em]
                  text-black/30
                  dark:text-white/30
                "
              >
                Navigate
              </p>

              <nav className="flex flex-wrap gap-x-6 gap-y-3 sm:justify-end">
                {navigation.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="
                      text-[11px] font-medium
                      text-black/50
                      transition-colors
                      hover:text-black
                      dark:text-white/50
                      dark:hover:text-white
                    "
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Contact + Back To Top */}
          <div
            className="
              mt-10
              flex flex-col gap-4
              border-t border-black/[0.06]
              pt-6
              dark:border-white/[0.06]
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* Email */}
            <a
              href="mailto:dextap2026@gmail.com"
              className="
                group flex w-fit items-center gap-3
                text-[11px] font-medium
                text-black/45
                transition-colors
                hover:text-black
                dark:text-white/45
                dark:hover:text-white
              "
            >
              <span
                className="
                  flex h-8 w-8 items-center justify-center
                  rounded-full
                  border border-black/[0.08]
                  transition-colors
                  group-hover:border-black/20
                  dark:border-white/[0.08]
                  dark:group-hover:border-white/20
                "
              >
                <FiMail size={13} />
              </span>

              dextap2026@gmail.com
            </a>

            {/* Back To Top */}
            <button
              type="button"
              onClick={scrollToTop}
              className="
                group flex w-fit items-center gap-3
                text-[9px] font-semibold
                uppercase tracking-[0.2em]
                text-black/40
                transition-colors
                hover:text-black
                dark:text-white/40
                dark:hover:text-white
              "
            >
              Back to top

              <span
                className="
                  flex h-8 w-8 items-center justify-center
                  rounded-full
                  border border-black/[0.08]
                  transition-all duration-300
                  group-hover:-translate-y-0.5
                  group-hover:border-black/20
                  dark:border-white/[0.08]
                  dark:group-hover:border-white/20
                "
              >
                <FiArrowUp size={13} />
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Footer */}
        <div
          className="
            flex flex-col gap-3
            border-t border-black/[0.06]
            py-5
            text-[9px]
            uppercase tracking-[0.16em]
            text-black/30
            dark:border-white/[0.06]
            dark:text-white/30
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <span>
            © {new Date().getFullYear()} DexTap. All rights reserved.
          </span>

          <span>Built in the Philippines</span>
        </div>
      </div>
    </footer>
  );
}