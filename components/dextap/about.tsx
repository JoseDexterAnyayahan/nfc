import {
  FiLayers,
  FiZap,
  FiCheck,
} from "react-icons/fi";

const principles = [
  {
    icon: FiLayers,
    title: "Simple by design",
    description:
      "Clear interfaces and straightforward experiences without unnecessary complexity.",
  },
  {
    icon: FiZap,
    title: "Built to be useful",
    description:
      "Digital tools created around real needs, practical workflows, and everyday use.",
  },
  {
    icon: FiCheck,
    title: "Made with purpose",
    description:
      "Every detail has a reason — from how it looks to how it works.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="
        scroll-mt-28
        border-t border-black/[0.08]
        px-5 py-24
        sm:px-8
        lg:px-12 lg:py-32
        dark:border-white/[0.08]
      "
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          {/* Section Label */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="flex items-center gap-3">
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
                <FiLayers size={13} strokeWidth={1.6} />
              </span>

              <p
                className="
                  text-[10px] font-semibold uppercase
                  tracking-[0.3em]
                  text-black/40
                  dark:text-white/40
                "
              >
                02 — About
              </p>
            </div>

            <p
              className="
                mt-6 max-w-xs
                text-xs leading-6
                text-black/40
                dark:text-white/40
              "
            >
              Digital solutions built around simplicity, usefulness, and
              better everyday experiences.
            </p>
          </div>

          {/* Main Content */}
          <div>
            <h2
              className="
                max-w-4xl
                text-4xl font-semibold
                leading-[1]
                tracking-[-0.055em]
                sm:text-5xl
                lg:text-6xl
              "
            >
              Technology should feel{" "}
              <span className="text-black/25 dark:text-white/25">
                simple.
              </span>
            </h2>

            <div
              className="
                mt-10
                max-w-2xl
                space-y-6
                text-sm leading-7
                text-black/55
                dark:text-white/55
                sm:text-base
              "
            >
              <p>
                DexTap is a digital solutions brand focused on creating
                practical technology for modern businesses and professionals.
              </p>

              <p>
                From digital business cards and NFC experiences to custom web
                solutions, we create products that are easy to use, visually
                refined, and built around real-world needs.
              </p>

              <p>
                We believe technology does not need to feel complicated to be
                powerful. Our approach is to remove unnecessary steps and make
                digital experiences feel natural from the moment they are
                opened to the moment they are used.
              </p>
            </div>

            {/* Principles */}
            <div
              className="
                mt-14
                grid
                overflow-hidden
                rounded-2xl
                border border-black/[0.08]
                bg-black/[0.015]
                sm:grid-cols-3
                dark:border-white/[0.08]
                dark:bg-white/[0.02]
              "
            >
              {principles.map((principle, index) => {
                const Icon = principle.icon;

                return (
                  <div
                    key={principle.title}
                    className={`
                      p-5
                      sm:p-6
                      ${
                        index !== principles.length - 1
                          ? "border-b border-black/[0.08] sm:border-b-0 sm:border-r dark:border-white/[0.08]"
                          : ""
                      }
                    `}
                  >
                    <div
                      className="
                        flex h-9 w-9 items-center justify-center
                        rounded-full
                        border border-black/[0.08]
                        bg-white
                        text-black
                        dark:border-white/[0.08]
                        dark:bg-white/[0.05]
                        dark:text-white
                      "
                    >
                      <Icon size={14} strokeWidth={1.5} />
                    </div>

                    <h3
                      className="
                        mt-5
                        text-xs font-semibold
                        tracking-[-0.01em]
                      "
                    >
                      {principle.title}
                    </h3>

                    <p
                      className="
                        mt-2
                        text-[11px] leading-5
                        text-black/45
                        dark:text-white/45
                      "
                    >
                      {principle.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Closing Statement */}
            <div
              className="
                mt-12
                flex items-start gap-3
                border-l-2
                border-black/10
                pl-5
                dark:border-white/10
              "
            >
              <FiCheck
                size={15}
                strokeWidth={1.7}
                className="mt-1 shrink-0 text-black/50 dark:text-white/50"
              />

              <p
                className="
                  max-w-xl
                  text-xs leading-6
                  text-black/45
                  dark:text-white/45
                "
              >
                The goal is simple: create digital experiences that people
                understand quickly, use naturally, and remember for the right
                reasons.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}