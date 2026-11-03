
"use client";

import type { BusinessProfile } from "@/lib/profiles";
import { Poppins } from "next/font/google";

import PixeeHero from "./PixeeHero";
import PixeeAbout from "./PixeeAbout";
import PixeePackages from "./Packages/PixeePackages";
import PixeePerfumeBar from "./Packages/PixeePerfumeBar";
import PixeeGrazingTable from "./Packages/PixeeGrazingTable";
import PixeeFrozenCocktails from "./Packages/PixeeFrozenCocktails";
import PixeeDesserts from "./Packages/PixeeDesserts";
import PixeeCrewMeals from "./Packages/PixeeCrewMeals";
import PixeeCoffeeMilkteaBar from "./Packages/PixeeCoffeeMilkteaBar";
import PixeeContact from "./PixeeContact";
import PixeeFooter from "./PixeeFooter";
import PixeeFloatingActions from "./PixeeFloatingActions";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function PixeePlates({
  profile,
}: {
  profile: BusinessProfile;
}) {
  return (
    <main
      className={`${poppins.className} min-h-screen bg-[#0b0b0b] px-4 py-6 text-white sm:px-6`}
    >
      <div className="mx-auto max-w-5xl">
        <PixeeHero profile={profile} />

        <PixeeAbout />

        <div className="mx-auto max-w-4xl">
          <PixeePackages />

          <div className="my-8 h-px bg-gradient-to-r from-transparent via-[#c9a45c]/40 to-transparent" />

          <PixeePerfumeBar />

          <div className="my-8 h-px bg-gradient-to-r from-transparent via-[#c9a45c]/40 to-transparent" />

          <PixeeGrazingTable />

          <div className="my-8 h-px bg-gradient-to-r from-transparent via-[#c9a45c]/40 to-transparent" />

          <PixeeFrozenCocktails />

          <div className="my-8 h-px bg-gradient-to-r from-transparent via-[#c9a45c]/40 to-transparent" />

          <PixeeDesserts />

          <div className="my-8 h-px bg-gradient-to-r from-transparent via-[#c9a45c]/40 to-transparent" />

          <PixeeCrewMeals />

          <div className="my-8 h-px bg-gradient-to-r from-transparent via-[#c9a45c]/40 to-transparent" />

          <PixeeCoffeeMilkteaBar />

          <div className="my-8 h-px bg-gradient-to-r from-transparent via-[#c9a45c]/40 to-transparent" />
        </div>

        {/* Contact Information */}
        <PixeeContact profile={profile} />

        <PixeeFooter profile={profile} />
        <PixeeFloatingActions profile={profile} />
      </div>
    </main>
  );
}
