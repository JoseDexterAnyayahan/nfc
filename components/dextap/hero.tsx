import { FiArrowDownRight, FiCheck } from "react-icons/fi";
import { Nfc } from "lucide-react";

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
      {/* Subtle background detail — a slow, ambient drift so the
          page never feels perfectly static, even at rest. */}
      <div
        aria-hidden="true"
        className="
          dextap-spin-slow
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
          dextap-spin-slow-reverse
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
          {/* Tagline — the badge carries the one signature motion
              on this page: a quiet NFC "tap" pulse, since that's
              literally what DexTap does. */}
          <div
            className="dextap-in mb-8 flex items-center gap-3"
            style={{ animationDelay: "0ms" }}
          >
            <span className="relative flex h-8 w-8 items-center justify-center">
              <span className="dextap-ping absolute inset-0 rounded-full bg-black/40 dark:bg-white/40" />

              <span
                className="dextap-ping absolute inset-0 rounded-full bg-black/40 dark:bg-white/40"
                style={{ animationDelay: "1.1s" }}
              />

              <span
                className="
                  relative flex h-8 w-8 items-center justify-center
                  rounded-full
                  border border-black/10
                  bg-black
                  text-white
                  dark:border-white/10
                  dark:bg-white
                  dark:text-black
                "
              >
                <Nfc size={14} strokeWidth={1.8} />
              </span>
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
              dextap-in
              text-[clamp(3.5rem,10vw,8.5rem)]
              font-semibold
              leading-[0.88]
              tracking-[-0.075em]
            "
            style={{ animationDelay: "90ms" }}
          >
            We build
            <br />
            <span className="text-black/25 dark:text-white/25">
              digital
            </span>{" "}
            experiences.
          </h1>

          {/* Description + CTA */}
          <div
            className="dextap-in mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
            style={{ animationDelay: "220ms" }}
          >
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
                dextap-in
                ${index >= 2 ? "mt-7 sm:mt-0" : ""}
                ${index % 2 === 1 ? "pl-5 sm:pl-0" : ""}
                ${
                  index !== 0
                    ? "sm:border-l sm:border-black/[0.08] sm:pl-6 dark:sm:border-white/[0.08]"
                    : ""
                }
              `}
              style={{ animationDelay: `${340 + index * 60}ms` }}
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
                  <span className="relative flex h-1.5 w-1.5 items-center justify-center">
                    <span className="dextap-pulse absolute h-1.5 w-1.5 rounded-full bg-black dark:bg-white" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-black dark:bg-white" />
                  </span>
                )}

                <p className="text-xs font-medium">
                  {detail.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Brand Statement */}
        <div
          className="dextap-in mt-10 flex items-center gap-3"
          style={{ animationDelay: "620ms" }}
        >
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

      {/*
        Plain CSS only — no client component, no hooks, nothing
        to hydrate. Runs identically on server and client.
      */}
      <style>{`
        @keyframes dextapFadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dextapPing {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }

        @keyframes dextapPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(2.2);
            opacity: 0;
          }
        }

        @keyframes dextapSpin {
          from { transform: translateY(-50%) rotate(0deg); }
          to { transform: translateY(-50%) rotate(360deg); }
        }

        @keyframes dextapSpinReverse {
          from { transform: translateY(-50%) rotate(0deg); }
          to { transform: translateY(-50%) rotate(-360deg); }
        }

        .dextap-in {
          animation: dextapFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .dextap-ping {
          animation: dextapPing 2.2s cubic-bezier(0.2, 0.7, 0.4, 1) infinite;
        }

        .dextap-pulse {
          animation: dextapPulse 2s ease-out infinite;
        }

        .dextap-spin-slow {
          animation: dextapSpin 90s linear infinite;
        }

        .dextap-spin-slow-reverse {
          animation: dextapSpinReverse 70s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .dextap-in {
            animation: none;
            opacity: 1;
            transform: none;
          }
          .dextap-ping,
          .dextap-pulse,
          .dextap-spin-slow,
          .dextap-spin-slow-reverse {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}