import {
  FiCreditCard,
  FiGlobe,
  FiCode,
  FiSmartphone,
  FiCheck,
} from "react-icons/fi";

const services = [
  {
    number: "01",
    icon: FiCreditCard,
    title: "Digital Business Cards",
    description:
      "Professional digital business cards that make sharing your identity, contact details, and business information simple and instant.",
    features: ["NFC ready", "Shareable link"],
  },
  {
    number: "02",
    icon: FiSmartphone,
    title: "NFC Solutions",
    description:
      "Physical-to-digital experiences that connect NFC products with useful digital information in a single tap.",
    features: ["Tap to connect", "Fast access"],
  },
  {
    number: "03",
    icon: FiGlobe,
    title: "Digital Profiles",
    description:
      "Personal and business profiles that bring essential information, links, social platforms, and contact options into one place.",
    features: ["Personal profiles", "Business profiles"],
  },
  {
    number: "04",
    icon: FiCode,
    title: "Custom Digital Solutions",
    description:
      "Websites and digital applications built around specific requirements, workflows, and business goals.",
    features: ["Custom built", "Business focused"],
  },
];

export default function WhatWeDo() {
  return (
    <section
      id="what-we-do"
      className="scroll-mt-28 border-t border-black/[0.08] px-5 py-24 sm:px-8 lg:px-12 lg:py-32 dark:border-white/[0.08]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          {/* Section Introduction */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="flex items-center gap-3">
              <span
                className="
                  flex h-8 w-8 items-center justify-center
                  rounded-full
                  border border-black/10
                  bg-black text-white
                  dark:border-white/10
                  dark:bg-white
                  dark:text-black
                "
              >
                <FiCode size={13} strokeWidth={1.6} />
              </span>

              <p
                className="
                  text-[10px] font-semibold uppercase
                  tracking-[0.3em]
                  text-black/40
                  dark:text-white/40
                "
              >
                03 — What We Do
              </p>
            </div>

            <h2
              className="
                mt-7
                max-w-sm
                text-4xl font-semibold
                leading-[0.98]
                tracking-[-0.055em]
                sm:text-5xl
              "
            >
              Digital tools
              <br />
              <span className="text-black/30 dark:text-white/30">
                made useful.
              </span>
            </h2>

            <p
              className="
                mt-7 max-w-xs
                text-sm leading-7
                text-black/50
                dark:text-white/50
              "
            >
              We create practical digital experiences that make it easier for
              people and businesses to connect, share information, and build
              their presence online.
            </p>
          </div>

          {/* Services */}
          <div
            className="
              grid
              overflow-hidden
              rounded-[1.75rem]
              border border-black/[0.08]
              bg-black/[0.02]
              dark:border-white/[0.08]
              dark:bg-white/[0.02]
              sm:grid-cols-2
            "
          >
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.number}
                  className="
                    group relative
                    flex min-h-[320px]
                    flex-col
                    border-b border-black/[0.08]
                    p-6
                    transition-colors duration-300
                    hover:bg-black/[0.025]
                    sm:p-8
                    sm:nth-[2n]:border-r-0
                    dark:border-white/[0.08]
                    dark:hover:bg-white/[0.025]
                  "
                >
                  {/* Top */}
                  <div className="flex items-start justify-between">
                    <div
                      className="
                        flex h-11 w-11 items-center justify-center
                        rounded-xl
                        border border-black/[0.09]
                        bg-white
                        transition-all duration-300
                        group-hover:border-black/20
                        group-hover:bg-black
                        group-hover:text-white
                        dark:border-white/[0.09]
                        dark:bg-white/[0.04]
                        dark:group-hover:border-white/20
                        dark:group-hover:bg-white
                        dark:group-hover:text-black
                      "
                    >
                      <Icon size={17} strokeWidth={1.5} />
                    </div>

                    <span
                      className="
                        text-[10px] font-medium
                        tracking-[0.08em]
                        text-black/25
                        dark:text-white/25
                      "
                    >
                      {service.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="mt-10">
                    <h3
                      className="
                        text-lg font-semibold
                        tracking-[-0.025em]
                      "
                    >
                      {service.title}
                    </h3>

                    <p
                      className="
                        mt-3
                        max-w-sm
                        text-xs leading-6
                        text-black/50
                        dark:text-white/50
                      "
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mt-auto flex flex-wrap gap-2 pt-8">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="
                          inline-flex items-center gap-1.5
                          rounded-full
                          border border-black/[0.08]
                          bg-white/70
                          px-2.5 py-1.5
                          text-[9px] font-medium
                          text-black/45
                          dark:border-white/[0.08]
                          dark:bg-white/[0.04]
                          dark:text-white/45
                        "
                      >
                        <FiCheck
                          size={10}
                          strokeWidth={2}
                          className="text-black/50 dark:text-white/50"
                        />

                        {feature}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}