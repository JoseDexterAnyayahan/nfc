
"use client";

import { Poppins } from "next/font/google";

import type { BusinessProfile } from "@/lib/profiles";

import GhieHero from "./GhieHero";
import GhieAbout from "./GhieAbout";
import GhieSocials from "./GhieSocials";
import GhieLocation from "./GhieLocation";
import GhieCTA from "./GhieCTA";
import GhieFooter from "./GhieFooter";
import GhieFloatingActions from "./GhieFloatingActions";

import { ghieProfileVariables } from "./GhieStyles";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function GhieLarracas({
  profile,
}: {
  profile: BusinessProfile;
}) {
  return (
    <main
      style={ghieProfileVariables}
      className={`${poppins.className} relative min-h-screen overflow-hidden bg-[var(--ghie-page)] text-[var(--ghie-text)] antialiased selection:bg-[var(--ghie-mint)] selection:text-white`}
    >
      {/* Decorative background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-140px] top-[500px] h-72 w-72 rounded-full bg-[var(--ghie-mint)] opacity-[0.07] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-140px] top-[1100px] h-80 w-80 rounded-full bg-[var(--ghie-blue)] opacity-[0.06] blur-3xl"
      />

      {/* Hero */}
      <div
        id="home"
        className="relative mx-auto w-full max-w-6xl px-4 pb-8 pt-5 sm:px-7 sm:pb-12 sm:pt-8 lg:px-8"
      >
        <GhieHero profile={profile} />
      </div>

      {/* Main sections */}
      <div className="relative">
        <GhieAbout />
        <GhieSocials />
        <GhieLocation />
        <GhieCTA profile={profile} />
      </div>

      {/* Footer */}
      <div className="relative">
        <GhieFooter />
      </div>

      {/* Floating actions */}
      <GhieFloatingActions profile={profile} />

      {/* Bottom spacing for floating actions */}
      <div className="h-28 sm:h-32" aria-hidden="true" />
    </main>
  );
}
