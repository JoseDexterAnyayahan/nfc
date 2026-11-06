import { Poppins } from "next/font/google";
import type { BusinessProfile } from "@/lib/profiles";

import Hero from "./Hero";
import About from "./About";
import Featured from "./Featured";
import Packages from "./Packages";
import Location from "./Location";
import CTA from "./CTA";
import Footer from "./Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-calix-poppins",
});

type Props = {
  profile: BusinessProfile;
};

export default function CalixFilms({ profile }: Props) {
  return (
    <main className={`${poppins.className} min-h-screen bg-[#031319]`}>
      <Hero profile={profile} />
      <Featured profile={profile} />
      <Packages profile={profile} />
      <Location profile={profile} />
      <CTA profile={profile} />
      <Footer profile={profile} />
    </main>
  );
}