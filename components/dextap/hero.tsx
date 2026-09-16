import {
  FiArrowDownRight,
  FiCheck,
  FiRadio,
} from "react-icons/fi";

const details = [
  {
    label: "Based in",
    value: "Philippines",
  },
  {
    label: "Focus",
    value: "Digital Solutions",
  },
  {
    label: "Approach",
    value: "Simple. Useful. Modern.",
  },
  {
    label: "Availability",
    value: "Open for Projects",
  },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      {/* Subtle background detail */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-32 top-1/2
          h-[28rem] w-[28rem]
          -translate-y-1/2
          rounded-full
          border border-black/[0.035]
          dark:border-white/[0.035]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-16 top-1/2
          h-[20rem] w-[20rem]
          -translate-y-1/2
          rounded-full
          border border-black/[0.035]
          dark:border-white/[0.035]
        "
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="max-w-5xl">
          {/* Tagline */}
          <div className="mb-8 flex items-center gap-3">
            <span
              className="
                flex h-8 w-8 items-center justify-center
                rounded-full
                border border-black/10
                bg-black
                text-white
                dark:border-white/10
                dark:bg-white
                dark:text-black
              "
            >
              <FiRadio
                size={14}
                strokeWidth={1.6}
                className="rotate-90"
              />
            </span>

            <p
              className="
                text-[10px] font-semibold
                uppercase tracking-[0.3em]
                text-black/50
                dark:text-white/50
              "
            >
              Tap. Share. Connect.
            </p>
          </div>

          {/* Main Heading */}
          <h1
            className="
              text-[clamp(3.5rem,10vw,8.5rem)]
              font-semibold
              leading-[0.88]
              tracking-[-0.075em]
            "
          >
            We build
            <br />
            <span className="text-black/25 dark:text-white/25">
              digital
            </span>{" "}
            experiences.
          </h1>

          {/* Description + CTA */}
          <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <p
              className="
                max-w-md
                text-sm leading-7
                text-black/55
                dark:text-white/55
                sm:text-base
              "
            >
              DexTap creates practical digital solutions that help businesses
              build a stronger presence, connect with customers, and simplify
              everyday interactions through technology.
            </p>

            <a
              href="#what-we-do"
              className="
                group flex w-fit items-center gap-3
                text-xs font-semibold
                uppercase tracking-[0.18em]
              "
            >
              Explore

              <span
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full
                  border border-black/15
                  transition-all duration-300
                  group-hover:bg-black
                  group-hover:text-white
                  dark:border-white/15
                  dark:group-hover:bg-white
                  dark:group-hover:text-black
                "
              >
                <FiArrowDownRight
                  size={15}
                  className="
                    transition-transform duration-300
                    group-hover:rotate-[-45deg]
                  "
                />
              </span>
            </a>
          </div>
        </div>

        {/* Bottom Information */}
        <div
          className="
            mt-24
            grid grid-cols-2
            border-t border-black/[0.08]
            pt-6
            dark:border-white/[0.08]
            sm:grid-cols-4
          "
        >
          {details.map((detail, index) => (
            <div
              key={detail.label}
              className={`
                ${index >= 2 ? "mt-7 sm:mt-0" : ""}
                ${index % 2 === 1 ? "pl-5 sm:pl-0" : ""}
                ${
                  index !== 0
                    ? "sm:border-l sm:border-black/[0.08] sm:pl-6 dark:sm:border-white/[0.08]"
                    : ""
                }
              `}
            >
              <p
                className="
                  text-[9px] font-medium
                  uppercase tracking-[0.2em]
                  text-black/35
                  dark:text-white/35
                "
              >
                {detail.label}
              </p>

              <div className="mt-2 flex items-center gap-2">
                {detail.label === "Availability" && (
                  <span
                    className="
                      h-1.5 w-1.5 rounded-full
                      bg-black
                      dark:bg-white
                    "
                  />
                )}

                <p className="text-xs font-medium">
                  {detail.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Brand Statement */}
        <div className="mt-10 flex items-center gap-3">
          <FiCheck
            size={13}
            strokeWidth={1.8}
            className="text-black/35 dark:text-white/35"
          />

          <p
            className="
              text-[10px] uppercase
              tracking-[0.16em]
              text-black/30
              dark:text-white/30
            "
          >
            Technology made simple
          </p>
        </div>
      </div>
    </section>
  );
}