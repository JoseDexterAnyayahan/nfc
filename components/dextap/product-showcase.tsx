import Image from "next/image";
import {
  FiCreditCard,
  FiRadio,
  FiShare2,
} from "react-icons/fi";

const features = [
  {
    icon: FiRadio,
    title: "NFC enabled",
    description: "Connect with a simple tap.",
  },
  {
    icon: FiCreditCard,
    title: "Physical card",
    description: "A card people can actually keep.",
  },
  {
    icon: FiShare2,
    title: "Digital profile",
    description: "Your information in one place.",
  },
];

export default function ProductShowcase() {
  return (
    <section
      id="dextap-card"
      className="
        scroll-mt-28
        border-t border-black/[0.08]
        px-5 py-20
        sm:px-8 sm:py-24
        lg:px-12 lg:py-28
        dark:border-white/[0.08]
      "
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div>
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
                <FiRadio
                  size={13}
                  strokeWidth={1.6}
                  className="rotate-90"
                />
              </span>

              <p
                className="
                  text-[10px] font-semibold uppercase
                  tracking-[0.3em]
                  text-black/40
                  dark:text-white/40
                "
              >
                01 — The DexTap Card
              </p>
            </div>
          </div>

          <div>
            <h2
              className="
                max-w-3xl
                text-4xl font-semibold
                leading-[0.95]
                tracking-[-0.06em]
                sm:text-5xl
                lg:text-6xl
              "
            >
              Your business card,
              <br />
              <span className="text-black/25 dark:text-white/25">
                reimagined.
              </span>
            </h2>

            <p
              className="
                mt-6 max-w-xl
                text-sm leading-7
                text-black/50
                dark:text-white/50
                sm:text-base
              "
            >
              A physical card that connects directly to your digital profile.
              One simple tap makes sharing your information faster, easier,
              and more memorable.
            </p>
          </div>
        </div>

        {/* Main Showcase */}
        <div
          className="
            relative mt-14
            min-h-[520px]
            overflow-hidden
            rounded-[2rem]
            border border-black/[0.08]
            bg-[#f5f5f5]
            dark:border-white/[0.08]
            dark:bg-[#111111]
          "
        >
          {/* Subtle background circles */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute -right-32 -top-32
              h-[34rem] w-[34rem]
              rounded-full
              border border-black/[0.035]
              dark:border-white/[0.035]
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute -right-12 -top-12
              h-[24rem] w-[24rem]
              rounded-full
              border border-black/[0.035]
              dark:border-white/[0.035]
            "
          />

          {/* Content */}
          <div
            className="
              relative z-10
              grid min-h-[520px]
              lg:grid-cols-[0.8fr_1.2fr]
            "
          >
            {/* Left Content */}
            <div
              className="
                relative z-20
                flex flex-col justify-center
                px-6 py-12
                sm:px-10
                lg:px-14 lg:py-14
              "
            >
              <p
                className="
                  text-[9px] font-semibold
                  uppercase tracking-[0.25em]
                  text-black/35
                  dark:text-white/35
                "
              >
                Physical + Digital
              </p>

              <h3
                className="
                  mt-4
                  max-w-md
                  text-3xl font-semibold
                  leading-[0.95]
                  tracking-[-0.05em]
                  sm:text-4xl
                "
              >
                One card.
                <br />
                <span className="text-black/30 dark:text-white/30">
                  More connections.
                </span>
              </h3>

              <p
                className="
                  mt-6
                  max-w-sm
                  text-xs leading-6
                  text-black/50
                  dark:text-white/50
                "
              >
                Hand someone your DexTap card and give them instant access to
                your digital profile, contact details, business information,
                social links, and more.
              </p>

              {/* Features */}
              <div
                className="
                  mt-8
                  space-y-4
                  border-t border-black/[0.08]
                  pt-6
                  dark:border-white/[0.08]
                "
              >
                {features.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.title}
                      className="flex items-center gap-3"
                    >
                      <span
                        className="
                          flex h-8 w-8 shrink-0
                          items-center justify-center
                          rounded-full
                          border border-black/[0.08]
                          bg-white
                          text-black
                          dark:border-white/[0.08]
                          dark:bg-white/[0.05]
                          dark:text-white
                        "
                      >
                        <Icon size={13} strokeWidth={1.5} />
                      </span>

                      <div>
                        <p className="text-[11px] font-semibold">
                          {feature.title}
                        </p>

                        <p
                          className="
                            mt-0.5
                            text-[10px]
                            text-black/40
                            dark:text-white/40
                          "
                        >
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Card Area */}
            <div
              className="
                relative
                flex min-h-[360px]
                items-center
                lg:min-h-full
              "
            >
              {/* Large Card Image */}
              <div
                className="
                  absolute
                  -right-[8%]
                  top-1/2
                  w-[115%]
                  -translate-y-1/2
                  sm:-right-[5%]
                  sm:w-[105%]
                  lg:-right-[12%]
                  lg:w-[125%]
                "
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/images/dextap-card.png"
                    alt="DexTap NFC digital business card"
                    fill
                    sizes="
                      (max-width: 640px) 100vw,
                      (max-width: 1024px) 65vw,
                      800px
                    "
                    className="
                      object-cover
                      object-center
                    "
                  />

                  {/* LEFT FADE */}
                  <div
                    className="
                      pointer-events-none
                      absolute inset-y-0 left-0
                      w-[45%]
                      bg-gradient-to-r
                      from-[#f5f5f5]
                      via-[#f5f5f5]/90
                      to-transparent
                      dark:from-[#111111]
                      dark:via-[#111111]/90
                      dark:to-transparent
                    "
                  />

                  {/* TOP FADE */}
                  <div
                    className="
                      pointer-events-none
                      absolute inset-x-0 top-0
                      h-[100%]
                      bg-gradient-to-b
                      from-[#f5f5f5]
                      to-transparent
                      dark:from-[#1111115d]
                      dark:to-transparent
                    "
                  />

                  {/* BOTTOM FADE */}
                  <div
                    className="
                      pointer-events-none
                      absolute inset-x-0 bottom-0
                      h-[100%]
                      bg-gradient-to-t
                      from-[#f5f5f5]
                      to-transparent
                      dark:from-[#1111115d]
                      dark:to-transparent
                    "
                  />
                </div>
              </div>

              {/* NFC Label */}
              <div
                className="
                  absolute
                  bottom-8
                  right-6
                  z-20
                  flex items-center gap-2
                  rounded-full
                  border border-black/[0.08]
                  bg-white/75
                  px-3 py-2
                  text-[9px] font-semibold
                  uppercase tracking-[0.15em]
                  text-black/60
                  backdrop-blur-md
                  dark:border-white/[0.08]
                  dark:bg-black/60
                  dark:text-white/60
                  sm:right-10
                  lg:right-14
                "
              >
                <FiRadio
                  size={11}
                  strokeWidth={1.7}
                  className="rotate-90"
                />
                NFC Ready
              </div>
            </div>
          </div>

          {/* Bottom Label */}
          <div
            className="
              absolute bottom-0 left-0 z-20
              hidden
              px-6 py-5
              sm:px-10
              lg:block lg:px-14
            "
          >
            <p
              className="
                text-[9px] font-semibold
                uppercase tracking-[0.2em]
                text-black/25
                dark:text-white/25
              "
            >
              Tap. Share. Connect.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}