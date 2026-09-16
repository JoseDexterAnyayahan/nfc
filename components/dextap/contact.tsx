import {
  FiArrowUpRight,
  FiMail,
  FiPhone,
  FiMessageCircle,
} from "react-icons/fi";

export default function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-28 border-t border-black/[0.08] px-5 py-24 sm:px-8 lg:px-12 lg:py-32 dark:border-white/[0.08]"
    >
      <div className="mx-auto max-w-6xl">
        <div
          className="
            relative overflow-hidden rounded-[2rem]
            border border-black/[0.08]
            bg-[#f5f5f5]
            px-6 py-12
            text-black
            shadow-[0_20px_80px_rgba(0,0,0,0.06)]
            sm:px-10 sm:py-16
            lg:px-16 lg:py-20
            dark:border-white/[0.1]
            dark:bg-[#111111]
            dark:text-white
            dark:shadow-[0_20px_80px_rgba(0,0,0,0.3)]
          "
        >
          {/* Subtle background detail */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute -right-24 -top-24
              h-72 w-72 rounded-full
              border border-black/[0.04]
              dark:border-white/[0.04]
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute -right-12 -top-12
              h-48 w-48 rounded-full
              border border-black/[0.04]
              dark:border-white/[0.04]
            "
          />

          <div className="relative">
            <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
              {/* Content */}
              <div>
                <div className="flex items-center gap-3">
                  <span
                    className="
                      flex h-8 w-8 items-center justify-center
                      rounded-full
                      border border-black/10
                      bg-white
                      text-black
                      dark:border-white/10
                      dark:bg-white/10
                      dark:text-white
                    "
                  >
                    <FiMessageCircle size={14} />
                  </span>

                  <p
                    className="
                      text-[10px] font-semibold uppercase
                      tracking-[0.3em]
                      text-black/40
                      dark:text-white/40
                    "
                  >
                    04 — Contact
                  </p>
                </div>

                <h2
                  className="
                    mt-7 max-w-3xl
                    text-4xl font-semibold
                    leading-[0.95]
                    tracking-[-0.06em]
                    sm:text-6xl
                    lg:text-7xl
                  "
                >
                  Have an idea?
                  <br />
                  <span className="text-black/35 dark:text-white/35">
                    Let's build it.
                  </span>
                </h2>

                <p
                  className="
                    mt-8 max-w-md
                    text-sm leading-7
                    text-black/50
                    dark:text-white/50
                  "
                >
                  Tell us what you're working on, what you need, or simply
                  start a conversation. We're always open to discussing new
                  ideas and digital possibilities.
                </p>
              </div>

              {/* CTA */}
              <a
                href="mailto:dextap2026@gmail.com"
                className="
                  group flex w-fit items-center gap-3
                  rounded-full
                  bg-black
                  px-5 py-3
                  text-xs font-semibold text-white
                  shadow-lg shadow-black/10
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:shadow-xl hover:shadow-black/15
                  dark:bg-white
                  dark:text-black
                  dark:shadow-white/5
                  dark:hover:shadow-white/10
                "
              >
                Get in touch

                <span
                  className="
                    flex h-7 w-7 items-center justify-center
                    rounded-full
                    bg-white/15
                    text-white
                    transition-transform duration-300
                    group-hover:rotate-45
                    dark:bg-black/10
                    dark:text-black
                  "
                >
                  <FiArrowUpRight size={13} />
                </span>
              </a>
            </div>

            {/* Contact Information */}
            <div
              className="
                mt-16
                grid
                gap-5
                border-t border-black/[0.08]
                pt-6
                dark:border-white/[0.08]
                sm:grid-cols-2
              "
            >
              {/* Email */}
              <a
                href="mailto:dextap2026@gmail.com"
                className="
                  group flex items-center gap-3
                  rounded-xl
                  py-2
                  text-xs
                  text-black/50
                  transition-colors
                  hover:text-black
                  dark:text-white/50
                  dark:hover:text-white
                "
              >
                <span
                  className="
                    flex h-9 w-9 items-center justify-center
                    rounded-full
                    border border-black/[0.08]
                    bg-white
                    transition-all
                    group-hover:border-black/15
                    group-hover:bg-black
                    group-hover:text-white
                    dark:border-white/[0.08]
                    dark:bg-white/[0.04]
                    dark:group-hover:border-white/15
                    dark:group-hover:bg-white
                    dark:group-hover:text-black
                  "
                >
                  <FiMail size={14} />
                </span>

                <span className="truncate">dextap2026@gmail.com</span>
              </a>

              {/* Phone */}
              <a
                href="tel:+639668830150"
                className="
                  group flex items-center gap-3
                  rounded-xl
                  py-2
                  text-xs
                  text-black/50
                  transition-colors
                  hover:text-black
                  sm:justify-end
                  dark:text-white/50
                  dark:hover:text-white
                "
              >
                <span
                  className="
                    flex h-9 w-9 items-center justify-center
                    rounded-full
                    border border-black/[0.08]
                    bg-white
                    transition-all
                    group-hover:border-black/15
                    group-hover:bg-black
                    group-hover:text-white
                    dark:border-white/[0.08]
                    dark:bg-white/[0.04]
                    dark:group-hover:border-white/15
                    dark:group-hover:bg-white
                    dark:group-hover:text-black
                  "
                >
                  <FiPhone size={14} />
                </span>

                <span>+63 966 883 0150</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}